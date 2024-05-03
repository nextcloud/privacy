<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
return [
	'routes' => [
		['name' => 'personal#getReadableLocation', 'url' => 'api/location', 'verb' => 'GET'],
		['name' => 'admin#setReadableLocation', 'url' => 'api/location', 'verb' => 'POST'],
		['name' => 'personal#getAdmins', 'url' => '/api/admins', 'verb' => 'GET'],
		['name' => 'admin#addAdditionalAdmin', 'url' => 'api/admins', 'verb' => 'POST'],
		['name' => 'admin#deleteAdditionalAdmin', 'url' => 'api/admins/{id}', 'verb' => 'DELETE'],
		['name' => 'admin#setFullDiskEncryption', 'url' => 'api/fullDiskEncryption', 'verb' => 'POST'],
	]
];
