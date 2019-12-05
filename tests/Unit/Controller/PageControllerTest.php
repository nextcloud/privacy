<?php

namespace OCA\Privacy\Tests\Unit\Controller;

use PHPUnit_Framework_TestCase;

use OCP\AppFramework\Http\TemplateResponse;

use OCA\Privacy\Controller\PageController;


class PageControllerTest extends PHPUnit_Framework_TestCase {
	private $controller;
	private $userId = 'john';

	protected function setUp(): void {
		$request = $this->getMockBuilder('OCP\IRequest')->getMock();

		$this->controller = new PageController(
			'privacy', $request, $this->userId
		);
	}

	public function testIndex() {
		$result = $this->controller->index();

		$this->assertEquals('index', $result->getTemplateName());
		$this->assertTrue($result instanceof TemplateResponse);
	}

}
