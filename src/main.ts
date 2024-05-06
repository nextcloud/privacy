/**
 * SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

import Vue from 'vue'
import { translate as t } from '@nextcloud/l10n'
import { getCurrentUser } from '@nextcloud/auth'

import Access from './views/Access.vue'
import Location from './views/Location.vue'
import Manifesto from './views/Manifesto.vue'
import Mission from './views/Mission.vue'

const provide = {
	t,
	isAdmin: getCurrentUser()?.isAdmin,
}

// eslint-disable-next-line no-new
new Vue({
	el: '#privacy-mission',
	render: h => h(Mission),
	provide,
})

// eslint-disable-next-line no-new
new Vue({
	el: '#privacy-manifesto',
	render: h => h(Manifesto),
	provide,
})

// eslint-disable-next-line no-new
new Vue({
	el: '#privacy-access',
	render: h => h(Access),
	provide,
})

// eslint-disable-next-line no-new
new Vue({
	el: '#privacy-location',
	render: h => h(Location),
	provide,
})
