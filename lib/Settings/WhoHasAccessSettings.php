<?php

declare(strict_types=1);
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCA\Privacy\AppInfo\Application;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IAppConfig;
use OCP\AppFramework\Services\IInitialState;
use OCP\Encryption\IManager as IEncryptionManager;
use OCP\Settings\ISettings;
use Throwable;

class WhoHasAccessSettings implements ISettings {

	/**
	 * @psalm-suppress UndefinedClass
	 */
	public function __construct(
		private IAppConfig $appConfig,
		private IEncryptionManager $encryptionManager,
		private IInitialState $initialState,
	) {
	}

	#[\Override]
	public function getForm(): TemplateResponse {
		\OCP\Util::addScript(Application::APP_ID, 'privacy-main');
		\OCP\Util::addStyle(Application::APP_ID, 'privacy-main');

		$isHomeStorageEncrypted = false;
		$isMasterKeyEnabled = false;
		if ($this->encryptionManager->isEnabled()) {
			try {
				$moduleId = $this->encryptionManager->getDefaultEncryptionModuleId();
				if ($moduleId === 'OC_DEFAULT_MODULE') {
					/**
					 * @psalm-suppress UndefinedDocblockClass, UndefinedClass
					 * @var \OCA\Encryption\Util $util
					 */
					$util = \OCP\Server::get(\OCA\Encryption\Util::class);
					/** @psalm-suppress UndefinedDocblockClass */
					$isHomeStorageEncrypted = $util->shouldEncryptHomeStorage();
					/** @psalm-suppress UndefinedDocblockClass */
					$isMasterKeyEnabled = $util->isMasterKeyEnabled();
				}
			} catch (Throwable $e) {
			}
		}

		$this->initialState->provideInitialState('fullDiskEncryptionEnabled', $this->appConfig->getAppValueBool('fullDiskEncryptionEnabled', false));
		$this->initialState->provideInitialState('serverSideEncryptionEnabled', $this->encryptionManager->isEnabled());
		$this->initialState->provideInitialState('homeStorageEncryptionEnabled', $isHomeStorageEncrypted);
		$this->initialState->provideInitialState('masterKeyEncryptionEnabled', $isMasterKeyEnabled);

		return new TemplateResponse(Application::APP_ID, 'who-has-access');
	}

	#[\Override]
	public function getSection(): string {
		return Application::APP_ID;
	}

	#[\Override]
	public function getPriority(): int {
		return 10;
	}
}
