<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCA\Privacy\AppInfo\Application;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\Settings\ISettings;
use OCP\Support\Subscription\IRegistry;

class MissionSettings implements ISettings {

	/**
	 * @psalm-suppress UndefinedClass
	 */
	public function __construct(
		protected IRegistry $subscription,
		protected IInitialState $initialState,
	) {
	}

	#[\Override]
	public function getForm(): TemplateResponse {
		return new TemplateResponse(Application::APP_ID, 'mission');
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
		return 0;
	}
}
