/**
 * Privacy App
 *
 * @author Georg Ehrke
 * @copyright 2019 Georg Ehrke <oc.list@georgehrke.com>
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU AFFERO GENERAL PUBLIC LICENSE
 * License as published by the Free Software Foundation; either
 * version 3 of the License, or any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU AFFERO GENERAL PUBLIC LICENSE for more details.
 *
 * You should have received a copy of the GNU Affero General Public
 * License along with this library.  If not, see <http://www.gnu.org/licenses/>.
 *
 */
import Vue from 'vue'
import { translate, translatePlural } from '@nextcloud/l10n'

import Admins from './components/Admins'
import Location from './components/Location'
import Encryption from './components/Encryption'
import Shares from './components/Shares'

Vue.prototype.$t = translate
Vue.prototype.$n = translatePlural
Vue.prototype.$is_admin = OC.isUserAdmin()

// The nextcloud-vue package does currently rely on t and n
Vue.prototype.t = translate
Vue.prototype.n = translatePlural

export const location = new Vue({
	el: '#privacy_where_location',
	render: h => h(Location),
})
export const admins = new Vue({
	el: '#privacy_access_admins',
	render: h => h(Admins),
})
export const shares = new Vue({
	el: '#privacy_access_shares',
	render: h => h(Shares),
})
export const encryption = new Vue({
	el: '#privacy_access_encryption',
	render: h => h(Encryption),
})
