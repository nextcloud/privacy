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
use OCP\IGroupManager;
use OCP\IRequest;

/**
 * Class PersonalController
 *
 * @package OCA\Privacy\Controller
 */
class PersonalController extends Controller {

	/** @var IConfig */
	private $config;

	/** @var IGroupManager */
	private $groupManager;

	/** @var IDBConnection */
	private $dbConnection;

	/**
	 * PersonalController constructor.
	 *
	 * @param string $appName
	 * @param IRequest $request
	 * @param IConfig $config
	 * @param IGroupManager $groupManager
	 * @param IDBConnection $dbConnection
	 */
	public function __construct(string $appName, IRequest $request,
		IConfig $config, IGroupManager $groupManager,
		IDBConnection $dbConnection) {
		parent::__construct($appName, $request);

		$this->config = $config;
		$this->groupManager = $groupManager;
		$this->dbConnection = $dbConnection;
	}

	/**
	 * @NoAdminRequired
	 *
	 * @return JSONResponse
	 */
	public function getAdmins():JSONResponse {
		$adminGroup = $this->groupManager->get('admin');

		// Admin Group should always exist, just catch for safety's sake
		if (!$adminGroup) {
			return new JSONResponse([]);
		}

		$adminUsers = $adminGroup->getUsers();
		$uids = [];
		foreach ($adminUsers as $adminUser) {
			if (!$adminUser->isEnabled()) {
				continue;
			}

			$uids[] = [
				'id' => $adminUser->getUID(),
				'displayname' => $adminUser->getDisplayName(),
				'internal' => true,
			];
		}

		$query = $this->dbConnection->getQueryBuilder();
		$query->select(['id', 'displayname'])
			->from('privacy_admins');
		$stmt = $query->execute();

		foreach ($stmt->fetchAll(\PDO::FETCH_ASSOC) as $row) {
			$uids[] = [
				'id' => (int)$row['id'],
				'displayname' => (string)$row['displayname'],
				'internal' => false,
			];
		}

		return new JSONResponse($uids, Http::STATUS_OK);
	}
}
