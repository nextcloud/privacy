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
	<div class="where-is-my-data">
		<p v-show="!isEditingLocation">
			<span v-show="country">{{ $t('privacy', 'Your data is located in:') }} <strong>{{ country }}</strong>.</span>
			<span v-show="!country">{{ $t('privacy', 'The admin has not selected the location of the server yet.') }}</span>
			<NcActions v-if="$is_admin">
				<NcActionButton icon="icon-rename" @click="editLocation">
					{{ t('privacy', 'Change data location') }}
				</NcActionButton>
			</NcActions>
		</p>
		<div v-show="isEditingLocation" class="NcMultiselect-container">
			<NcMultiselect :disabled="isSavingChanges"
				:options="options"
				:searchable="true"
				track-by="code"
				label="label"
				:placeholder="$t('privacy', 'Please select a region')"
				@input="onChange" />
			<span v-show="isSavingChanges" class="icon icon-loading" />
		</div>
		<MapSvg />
	</div>
</template>

<script>
import HttpClient from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import NcMultiselect from '@nextcloud/vue/dist/Components/NcMultiselect.js'
import NcActions from '@nextcloud/vue/dist/Components/NcActions.js'
import NcActionButton from '@nextcloud/vue/dist/Components/NcActionButton.js'
import { loadState } from '@nextcloud/initial-state'
import { showError } from '@nextcloud/dialogs'

import {
	getCountryList,
	getNameForCountryCode,
} from '../nameProvider.js'
import MapSvg from './Map.vue'

export default {
	name: 'Location',
	components: {
		NcActionButton,
		NcActions,
		MapSvg,
		NcMultiselect,
	},
	data() {
		return {
			selectedCountry: 'de',
			isEditingLocation: false,
			isSavingChanges: false,
		}
	},
	computed: {
		country() {
			return getNameForCountryCode(this.$data.selectedCountry)
		},
		options() {
			return getCountryList()
		},
	},
	watch: {
		selectedCountry(newCountry, oldCountry) {
			if (oldCountry !== '') {
				const oldElm = document.querySelector('.where-is-my-data #' + oldCountry)

				if (oldElm) {
					oldElm.style.fill = null
				}
			}

			if (newCountry !== '') {
				const newElm = document.querySelector('.where-is-my-data #' + newCountry)

				if (newElm) {
					newElm.style.fill = 'var(--color-primary)'
				}
			}
		},
	},
	/**
	 * This function is called on mount of the Vue component
	 * It loads the location of the server.
	 */
	mounted() {
		this.selectedCountry = loadState('privacy', 'location')
		if (this.selectedCountry !== '') {
			const elm = document.querySelector('.where-is-my-data #' + this.selectedCountry)
			if (elm) {
				elm.style.fill = '#e6605c'
			}
		}
	},
	methods: {
		/**
		 * Opens the edit location form
		 */
		editLocation() {
			this.isEditingLocation = true
		},
		/**
		 * Saves changes to the location form
		 *
		 * @param {object} value The new country object
		 * @return {Promise<void>}
		 */
		async onChange(value) {
			const url = generateUrl('/apps/privacy/api/location')
			this.isSavingChanges = true

			try {
				await HttpClient.post(url, { code: value.code })
				this.selectedCountry = value.code
			} catch (error) {
				console.error(error)
				showError('Error saving new location of the server')
			} finally {
				this.isEditingLocation = false
				this.isSavingChanges = false
			}
		},
	},
}
</script>

<style scoped lang="scss">
.where-is-my-data {
	fill: var(--color-text-lighter);
}
</style>
