<?php

/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Controller;

use OCP\AppFramework\Controller;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IConfig;
use OCP\IDBConnection;
use OCP\IRequest;

/**
 * Class AdminController
 *
 * @package OCA\Privacy\Controller
 */
class AdminController extends Controller {

	/** @var IConfig */
	private $config;

	/** @var IDBConnection */
	private $dbConnection;

	/**
	 * AdminController constructor.
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param IConfig $config
	 * @param IDBConnection $dbConnection
	 */
	public function __construct(string $appName, IRequest $request,
		IConfig $config, IDBConnection $dbConnection) {
		parent::__construct($appName, $request);

		$this->config = $config;
		$this->dbConnection = $dbConnection;
	}

	/**
	 * Sets the readable location code for the app.
	 */
	public function setReadableLocation(string $code): JSONResponse {
		$this->config->setAppValue($this->appName, 'readableLocation', $code);
		return new JSONResponse([], Http::STATUS_OK);
	}

	/**
	 * Adds an external privacy admin by display name.
	 */
	public function addAdditionalAdmin(string $displayName): JSONResponse {
		$qb = $this->dbConnection->getQueryBuilder();
		$qb->insert('privacy_admins')
			->setValue('displayname', $qb->createNamedParameter($displayName))
			->executeStatement();

		$id = $qb->getLastInsertId();

		return new JSONResponse([
			'id' => $id,
			'displayname' => $displayName,
			'internal' => false,
		], Http::STATUS_CREATED);
	}

	/**
	 * Removes an external privacy admin by ID.
	 */
	public function deleteAdditionalAdmin(int $id): JSONResponse {
		$qb = $this->dbConnection->getQueryBuilder();
		$qb->delete('privacy_admins')
			->where($query->expr()->eq('id', $qb->createNamedParameter($id)))
			->executeStatement();

		return new JSONResponse([], Http::STATUS_OK);
	}

	/**
	 * Enables or disables full disk encryption indicator (only) for privacy disclosure purposes.
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
