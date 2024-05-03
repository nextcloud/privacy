<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCA\Theming\ThemingDefaults;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\Settings\ISettings;
use OCP\Support\Subscription\IRegistry;

class MissionSettings implements ISettings {

	public function __construct(
		protected IRegistry $subscription,
		protected ThemingDefaults $themingDefaults,
		protected IInitialState $initialState,
	) {
	}

	public function getForm(): TemplateResponse {
		$this->initialState->provideInitialState(
			'serverName',
			$this->themingDefaults->getEntity(),
		);

		return new TemplateResponse('privacy', 'mission');
	}

	public function getSection(): ?string {
		if ($this->subscription->delegateHasValidSubscription()) {
			return null;
		}

		return 'privacy';
	}

	public function getPriority(): int {
		return 0;
	}
}
