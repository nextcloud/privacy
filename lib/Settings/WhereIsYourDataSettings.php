<?php
/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */
namespace OCA\Privacy\Settings;

use OCP\AppFramework\Http\TemplateResponse;
use OCP\IConfig;
use OCP\IInitialStateService;
use OCP\Settings\ISettings;

/**
 * Class WhereIsMyDataSettings
 *
 * @package OCA\Privacy\Settings
 */
class WhereIsYourDataSettings implements ISettings {

	/** @var IInitialStateService */
	private $initialStateService;

	/** @var IConfig */
	private $config;

	/**
	 * MissionSettings constructor.
	 *
	 * @param IInitialStateService $initialStateService
	 * @param IConfig $config
	 */
	public function __construct(IInitialStateService $initialStateService,
		IConfig $config) {
		$this->initialStateService = $initialStateService;
		$this->config = $config;
	}

	/**
	 * @return TemplateResponse
	 */
	public function getForm():TemplateResponse {
		$location = $this->config->getAppValue('privacy', 'readableLocation');
		$this->initialStateService->provideInitialState('privacy', 'location', $location ?: '');

		return new TemplateResponse('privacy', 'where-is-your-data');
	}

	/**
	 * @return string
	 */
	public function getSection():string {
		return 'privacy';
	}

	/**
	 * @return int
	 */
	public function getPriority():int {
		return 15;
	}
}
