<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\Settings\ISettings;
use OCP\Support\Subscription\IRegistry;

class UserDataManifestoSettings implements ISettings {

	/** @var IRegistry */
	protected $subscription;

	public function __construct(IRegistry $subscription) {
		$this->subscription = $subscription;
	}

	public function getForm(): TemplateResponse {
		return new TemplateResponse('privacy', 'user-data-manifesto');
	}

	public function getSection(): ?string {
		if ($this->subscription->delegateHasValidSubscription()) {
			return null;
		}

		return 'privacy';
	}

	public function getPriority(): int {
		return 5;
	}
}
