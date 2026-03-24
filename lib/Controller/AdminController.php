<?php

/**
 * SPDX-FileCopyrightText: 2019-2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
declare(strict_types=1);

namespace OCA\Privacy\Controller;

use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\ApiRoute;
use OCP\AppFramework\Http\DataResponse;
use OCP\AppFramework\OCS\OCSBadRequestException;
use OCP\AppFramework\OCSController;
use OCP\AppFramework\Services\IAppConfig;
use OCP\IDBConnection;
use OCP\IRequest;

class AdminController extends OCSController {

	public function __construct(
		string $appName,
		IRequest $request,
		private IAppConfig $appConfig,
		private IDBConnection $dbConnection,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Sets the readable location code for the app.
	 *
	 * @return DataResponse<Http::STATUS_OK, array<empty>, array{}>
	 */
	#[ApiRoute(verb: 'POST', url: '/api/v1/location')]
	public function setReadableLocation(string $code): DataResponse {
		$this->appConfig->setAppValueString('readableLocation', $code);
		return new DataResponse();
	}

	/**
	 * Adds an external privacy admin by display name.
	 *
	 * @return DataResponse<Http::STATUS_CREATED, array{id: int|string, displayname: string, internal: false}, array{}>
	 */
	#[ApiRoute(verb: 'POST', url: '/api/v1/admins')]
	public function addAdditionalAdmin(string $displayName): DataResponse {
		$qb = $this->dbConnection->getQueryBuilder();
		$qb->insert('privacy_admins')
			->setValue('displayname', $qb->createNamedParameter($displayName))
			->executeStatement();

		$id = $qb->getLastInsertId();

		return new DataResponse([
			'id' => $id,
			'displayname' => $displayName,
			'internal' => false,
		], Http::STATUS_CREATED);
	}

	/**
	 * Removes an external privacy admin by ID.
	 *
	 * @return DataResponse<Http::STATUS_OK, array<empty>, array{}>
	 */
	#[ApiRoute(verb: 'DELETE', url: '/api/v1/admins/{id}')]
	public function deleteAdditionalAdmin(int $id): DataResponse {
		$qb = $this->dbConnection->getQueryBuilder();
		$qb->delete('privacy_admins')
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id)))
			->executeStatement();

		return new DataResponse();
	}

	/**
	 * Enables or disables full disk encryption indicator for privacy disclosure purposes.
	 *
	 * @return DataResponse<Http::STATUS_OK, array<empty>, array{}>
	 * @throws OCSBadRequestException Invalid value
	 */
	#[ApiRoute(verb: 'POST', url: '/api/v1/fullDiskEncryption')]
	public function setFullDiskEncryption(string $enabled): DataResponse {
		if (!\in_array($enabled, ['0', '1'], true)) {
			throw new OCSBadRequestException('Value must be 0 or 1');
		}
		$this->appConfig->setAppValueBool('fullDiskEncryptionEnabled', $enabled === '1');
		return new DataResponse();
	}
}
