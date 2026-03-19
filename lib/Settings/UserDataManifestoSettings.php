<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCA\Privacy\AppInfo\Application;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;
use OCP\Support\Subscription\IRegistry;

class UserDataManifestoSettings implements ISettings {

	public function __construct(
		protected IRegistry $subscription,
	) {
	}

	#[\Override]
	public function getForm(): TemplateResponse {
		return new TemplateResponse(Application::APP_ID, 'user-data-manifesto');
	}

	#[\Override]
	public function getSection(): ?string {
		if ($this->subscription->delegateHasValidSubscription()) {
			return null;
		}

		return Application::APP_ID;
	}

	#[\Override]
	public function getPriority(): int {
		return 5;
	}
}
