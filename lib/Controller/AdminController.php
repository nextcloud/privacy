<?php

/**
 * SPDX-FileCopyrightText: 2019-2026 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
declare(strict_types=1);

namespace OCA\Privacy\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IRequest;

class AdminController extends Controller {

	private IConfig $config;
	private IDBConnection $dbConnection;

	public function __construct(
		string $appName,
		IRequest $request,
		private IConfig $config,
		private IDBConnection $dbConnection
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * @param string $code
	 * @return JSONResponse
	 */
	public function setReadableLocation(string $code): JSONResponse {
		$this->config->setAppValue($this->appName, 'readableLocation', $code);
		return new JSONResponse([], Http::STATUS_OK);
	}

	/**
	 * @param string $name
	 * @return JSONResponse
	 */
	public function addAdditionalAdmin(string $name): JSONResponse {
		$query = $this->dbConnection->getQueryBuilder();
		$query->insert('privacy_admins')
			->setValue('displayname', $query->createNamedParameter($name))
			->executeStatement();

		$id = $query->getLastInsertId();

		return new JSONResponse([
			'id' => $id,
			'displayname' => $name,
			'internal' => false,
		], Http::STATUS_CREATED);
	}

	/**
	 * @param int $id
	 * @return JSONResponse
	 */
	public function deleteAdditionalAdmin(int $id): JSONResponse {
		$query = $this->dbConnection->getQueryBuilder();
		$query->delete('privacy_admins')
			->where($query->expr()->eq('id', $query->createNamedParameter($id)))
			->executeStatement();

		return new JSONResponse([], Http::STATUS_OK);
	}

	/**
	 * @param string $enabled
	 * @return JSONResponse
	 */
	public function setFullDiskEncryption(string $enabled): JSONResponse {
		$allowedValues = ['0', '1'];
		if (!\in_array($enabled, $allowedValues, true)) {
			return new JSONResponse([], HTTP::STATUS_NOT_ACCEPTABLE);
		}

		$this->config->setAppValue('privacy', 'fullDiskEncryptionEnabled', $enabled);
		return new JSONResponse([], HTTP::STATUS_OK);
	}
}
