<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCA\Privacy\AppInfo\Application;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\Settings\IIconSection;

class PrivacySection implements IIconSection {

	public function __construct(
		private IURLGenerator $url,
		private IL10N $l,
	) {
	}

	#[\Override]
	public function getID(): string {
		return Application::APP_ID;
	}

	#[\Override]
	public function getName(): string {
		return $this->l->t('Privacy');
	}

	#[\Override]
	public function getPriority(): int {
		return 70;
	}

	#[\Override]
	public function getIcon(): string {
		return $this->url->imagePath(Application::APP_ID, 'app-dark.svg');
	}
}
