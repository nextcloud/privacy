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
use OCP\IGroupManager;
use OCP\IRequest;

class PersonalController extends Controller {
	public function __construct(
		string $appName,
		IRequest $request,
		private IConfig $config,
		private IGroupManager $groupManager,
		private IDBConnection $dbConnection,
	) {
		parent::__construct($appName, $request);
	}

	/**
	 * Returns all admin users (internal group admins and external privacy admins).
	 *
	 * @NoAdminRequired
	 */
	public function getAdmins(): JSONResponse {
		$admins = [];

		// Internal admin group members
		$group = $this->groupManager->get('admin');
		if ($group !== null) {
			foreach ($group->getUsers() as $user) {
				if ($user->isEnabled()) {
					$admins[] = [
						'id' => $user->getUID(),
						'displayname' => $user->getDisplayName(),
						'internal' => true,
					];
				}
			}
		}

		// External privacy admins from DB
		foreach ($this->getDbPrivacyAdmins() as $row) {
			$admins[] = [
				'id' => (int)$row['id'],
				'displayname' => (string)$row['displayname'],
				'internal' => false,
			];
		}

		return new JSONResponse($admins, Http::STATUS_OK);
	}

	/**
	 * Fetches additional admins from the privacy_admins table.
	 *
	 * @return array<int, array{id: int, displayname: string}>
	 */
	private function getDbPrivacyAdmins(): array {
		$qb = $this->dbConnection->getQueryBuilder();
		$qb->select(['id', 'displayname'])
			->from('privacy_admins')
			->orderBy('id', 'ASC');
		return $qb->executeQuery()->fetchAll(\PDO::FETCH_ASSOC) ?: [];
	}
}
