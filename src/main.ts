/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import { getCurrentUser } from '@nextcloud/auth'
import { createApp } from 'vue'
import Mission from './views/AppMission.vue'
import Access from './views/DataAccess.vue'
import Location from './views/DataLocation.vue'
import Manifesto from './views/UserManifesto.vue'

const isAdmin = getCurrentUser()?.isAdmin ?? false

const apps = [
	{ el: '#privacy-mission', component: Mission },
	{ el: '#privacy-manifesto', component: Manifesto },
	{ el: '#privacy-access', component: Access },
	{ el: '#privacy-location', component: Location },
] as const

for (const { el, component } of apps) {
	const mountEl = document.querySelector(el)
	if (mountEl) {
		createApp(component)
			.provide('isAdmin', isAdmin)
			.mount(mountEl)
	}
}
