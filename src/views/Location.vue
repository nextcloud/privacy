<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection class="location"
		:name="t('privacy', 'Where is your data?')">
		<div class="location__description">
			<span v-show="country">{{ t('privacy', 'Your data is located in:') }} <strong>{{ country }}</strong>.</span>
			<span v-show="!country">{{ t('privacy', 'An admin has not selected the location of the server yet.') }}</span>
			<NcButton v-if="isAdmin"
				:aria-label="!isEditingLocation ? t('privacy', 'Change data location') : t('privacy', 'Cancel')"
				:title="!isEditingLocation ? t('privacy', 'Change data location') : t('privacy', 'Cancel')"
				@click="isEditingLocation = !isEditingLocation">
				<template #icon>
					<Pencil v-if="!isEditingLocation" :size="20" />
					<Close v-else :size="20" />
				</template>
			</NcButton>
		</div>

		<div v-show="isEditingLocation"
			class="location__select">
			<label for="data-region-input">{{ t('privacy', 'Region') }}</label>
			<NcSelect input-id="data-region-input"
				:placeholder="t('privacy', 'Please select a region')"
				:disabled="isSavingChanges"
				:loading="isSavingChanges"
				:reduce="option => option.code"
				:value="selectedCountry"
				:options="options"
				@input="onChange" />
		</div>

		<MapSvg class="location__map"
			aria-hidden="true" />
	</NcSettingsSection>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'

import Close from 'vue-material-design-icons/Close.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'

import { loadState } from '@nextcloud/initial-state'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'

import MapSvg from '../components/Map.vue'

import {
	getCountryList,
	getNameForCountryCode,
} from '../nameProvider.js'

export default {
	name: 'Location',

	components: {
		Close,
		MapSvg,
		NcButton,
		NcSelect,
		NcSettingsSection,
		Pencil,
	},

	inject: [
		't',
		'isAdmin',
	],

	data() {
		return {
			selectedCountry: '',
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
				const oldElm = document.querySelector('.location #' + oldCountry)

				if (oldElm) {
					oldElm.style.fill = null
				}
			}

			if (newCountry !== '') {
				const newElm = document.querySelector('.location #' + newCountry)

				if (newElm) {
					newElm.style.fill = 'var(--color-primary-element)'
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
			const elm = document.querySelector('.location #' + this.selectedCountry)
			if (elm) {
				elm.style.fill = '#e6605c'
			}
		}
	},

	methods: {
		/**
		 * Saves changes to the location form
		 *
		 * @param {null | string} code The new country code
		 * @return {Promise<void>}
		 */
		async onChange(code) {
			const url = generateUrl('/apps/privacy/api/location')
			this.isSavingChanges = true

			try {
				await axios.post(url, { code: code ?? '' })
				this.selectedCountry = code ?? ''
			} catch (error) {
				console.error(error)
				showError(t('privacy', 'Error saving new location of the server'))
			} finally {
				this.isEditingLocation = false
				this.isSavingChanges = false
			}
		},
	},
}
</script>

<style scoped lang="scss">
.location {
	max-width: 500px;
	fill: var(--color-text-lighter);

	:deep {
		> svg {
			> path,
			> g {
				fill: #dddddd;
				stroke: #f4f4f4;
			}
		}
	}

	&__description {
		display: flex;
		align-items: center;
		gap: 0 4px;
	}

	&__select {
		display: flex;
		flex-direction: column;
		gap: 2px 0;
	}

	&__map {
		margin-top: 16px;
	}
}
</style>
