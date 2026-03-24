<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection
		class="location"
		:name="t('privacy', 'Where is your data?')">
		<div class="location__description">
			<span v-show="country">{{ t('privacy', 'Your data is located in:') }} <strong>{{ country }}</strong>.</span>
			<span v-show="!country">{{ t('privacy', 'An admin has not selected the location of the server yet.') }}</span>
			<NcButton
				v-if="isAdmin"
				:aria-label="!isEditingLocation ? t('privacy', 'Change data location') : t('privacy', 'Cancel')"
				:title="!isEditingLocation ? t('privacy', 'Change data location') : t('privacy', 'Cancel')"
				@click="isEditingLocation = !isEditingLocation">
				<template #icon>
					<Pencil v-if="!isEditingLocation" :size="20" />
					<Close v-else :size="20" />
				</template>
			</NcButton>
		</div>

		<div
			v-show="isEditingLocation"
			class="location__select">
			<label for="data-region-input">{{ t('privacy', 'Region') }}</label>
			<NcSelect
				inputId="data-region-input"
				:placeholder="t('privacy', 'Please select a region')"
				:disabled="isSavingChanges"
				:loading="isSavingChanges"
				:reduce="(option: CountryOption) => option.code"
				:modelValue="selectedCountry"
				:options="options"
				@update:modelValue="onChange" />
		</div>

		<MapSvg
			class="location__map"
			aria-hidden="true" />
	</NcSettingsSection>
</template>

<script setup lang="ts">
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { loadState } from '@nextcloud/initial-state'
import { translate as t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import { NcButton, NcSelect, NcSettingsSection } from '@nextcloud/vue'
import { computed, inject, onMounted, ref, watch } from 'vue'
import Close from 'vue-material-design-icons/Close.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import MapSvg from '../components/WorldMap.vue'
import { getCountryList, getNameForCountryCode } from '../nameProvider.ts'
import logger from '../utils/logger.ts'

interface CountryOption {
	code: string
	label: string
}

const isAdmin = inject<boolean>('isAdmin', false)

const selectedCountry = ref<string>('')
const isEditingLocation = ref(false)
const isSavingChanges = ref(false)

const country = computed(() => getNameForCountryCode(selectedCountry.value))
const options = computed(() => getCountryList())

watch(selectedCountry, (newCountry, oldCountry) => {
	if (oldCountry !== '') {
		const oldElm = document.querySelector<HTMLElement>('.location #' + oldCountry)
		if (oldElm) {
			oldElm.style.fill = ''
		}
	}

	if (newCountry !== '') {
		const newElm = document.querySelector<HTMLElement>('.location #' + newCountry)
		if (newElm) {
			newElm.style.fill = 'var(--color-primary-element)'
		}
	}
})

onMounted(() => {
	selectedCountry.value = loadState<string>('privacy', 'location')
	if (selectedCountry.value !== '') {
		const elm = document.querySelector<HTMLElement>('.location #' + selectedCountry.value)
		if (elm) {
			elm.style.fill = '#e6605c'
		}
	}
})

/**
 * Saves changes to the location form
 *
 * @param code The new country code
 */
async function onChange(code: string | null) {
	const url = generateOcsUrl('/apps/privacy/api/v1/location')
	isSavingChanges.value = true

	try {
		await axios.post(url, { code: code ?? '' })
		selectedCountry.value = code ?? ''
	} catch (error) {
		logger.error('Error saving new location of the server.', { error })
		showError(t('privacy', 'Error saving new location of the server'))
	} finally {
		isEditingLocation.value = false
		isSavingChanges.value = false
	}
}
</script>

<style scoped lang="scss">
.location {
	max-width: 500px;
	fill: var(--color-text-lighter);

	:deep(svg > path),
	:deep(svg > g) {
		fill: #dddddd;
		stroke: #f4f4f4;
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
