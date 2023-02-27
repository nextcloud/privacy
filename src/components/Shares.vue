<!--
  - @copyright Copyright (c) 2019 Georg Ehrke <oc.list@georgehrke.com>
  - @author Georg Ehrke <oc.list@georgehrke.com>
  -
  - @license GNU AGPL version 3 or any later version
  -
  - This program is free software: you can redistribute it and/or modify
  - it under the terms of the GNU Affero General Public License as
  - published by the Free Software Foundation, either version 3 of the
  - License, or (at your option) any later version.
  -
  - This program is distributed in the hope that it will be useful,
  - but WITHOUT ANY WARRANTY; without even the implied warranty of
  - MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
  - GNU Affero General Public License for more details.
  -
  - You should have received a copy of the GNU Affero General Public License
  - along with this program. If not, see <http://www.gnu.org/licenses/>.
  -
  -->

<template>
	<div class="who-has-access">
		<span :class="{hidden: !isLoading}" class="icon icon-loading" />
		<span :class="{hidden: !isEmptyList}">
			{{ $t('privacy', 'You don\'t have any shares with individual users.') }}
		</span>
		<NcAvatar v-for="uid in uniqueShareUIDs"
			:key="uid"
			:user="uid"
			:display-name="uidDisplaynameMap[uid]"
			:size="64"
			:show-user-status="false" />
	</div>
</template>

<script>
import Vue from 'vue'

import HttpClient from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'
import { showError } from '@nextcloud/dialogs'
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'

export default {
	name: 'Shares',
	components: {
		NcAvatar,
	},
	data() {
		return {
			uniqueShareUIDs: [],
			uidDisplaynameMap: {},
			isLoading: true,
		}
	},
	computed: {
		/**
		 * Checks if the list of shares is empty
		 *
		 * @return {boolean}
		 */
		isEmptyList() {
			return this.isLoading === false && this.uniqueShareUIDs.length === 0
		},
	},
	/**
	 * This function is called on mount of the Vue component
	 * It loads the people shared with
	 */
	async mounted() {
		const url = generateOcsUrl('/apps/files_sharing/api/v1/shares?format=json&shared_with_me=false')
		const currentUserId = getCurrentUser().uid

		try {
			const resp = await HttpClient.get(url)
			resp.data.ocs.data.forEach((d) => {
				if (d.share_with === currentUserId) {
					return
				}

				switch (d.share_type) {
				case 0:
					if (this.uniqueShareUIDs.indexOf(d.share_with) === -1) {
						this.uniqueShareUIDs.push(d.share_with)
						Vue.set(this.uidDisplaynameMap, d.share_with, d.share_with_displayname)
					}
					break

				default:
					break
				}
			})
		} catch (error) {
			console.error(error)
			showError('Error loading information about shares.')
		} finally {
			this.isLoading = false
		}
	},
}
</script>
