<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="encryption">
		<h3>{{ t('privacy', 'Encryption') }}</h3>

		<ul class="encryption__list">
			<!-- eslint-disable vue/no-v-html -->
			<li
				v-for="label in labels"
				:key="label"
				v-html="label" />
			<!--eslint-enable-->
		</ul>

		<div class="encryption__edit">
			<NcButton
				v-if="isAdmin"
				:aria-label="!isEditing ? t('privacy', 'Edit encryption') : t('privacy', 'Cancel')"
				@click="isEditing = !isEditing">
				<template #icon>
					<Pencil v-if="!isEditing" :size="20" />
					<Close v-else :size="20" />
				</template>
				{{ !isEditing ? t('privacy', 'Edit') : t('privacy', 'Cancel') }}
			</NcButton>

			<NcCheckboxRadioSwitch
				v-if="isEditing"
				v-model="fullDiskEncryptionEnabled"
				:disabled="isSavingChanges"
				:loading="isSavingChanges"
				@update:modelValue="saveFullDiskEncryption">
				{{ t('privacy', 'This server is using full-disk-encryption.') }}
			</NcCheckboxRadioSwitch>
		</div>
	</div>
</template>

<script setup lang="ts">
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { loadState } from '@nextcloud/initial-state'
import { translate as t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import { NcButton, NcCheckboxRadioSwitch } from '@nextcloud/vue'
import { computed, inject, ref } from 'vue'
import Close from 'vue-material-design-icons/Close.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import logger from '../utils/logger.ts'

const isAdmin = inject<boolean>('isAdmin', false)

const fullDiskEncryptionEnabled = ref(loadState<boolean>('privacy', 'fullDiskEncryptionEnabled', false))
const serverSideEncryptionEnabled = ref(loadState<boolean>('privacy', 'serverSideEncryptionEnabled', false))
const homeStorageEncryptionEnabled = ref(loadState<boolean>('privacy', 'homeStorageEncryptionEnabled', false))
const masterKeyEncryptionEnabled = ref(loadState<boolean>('privacy', 'masterKeyEncryptionEnabled', false))
const isEditing = ref(false)
const isSavingChanges = ref(false)

const labels = computed(() => {
	const result: string[] = []

	const addLabel = (text: string) => result.push(text
		.replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" rel="noreferrer noopener" class="encryption__link">')
		.replace('{linkclose}', '</a>'))

	if (serverSideEncryptionEnabled.value) {
		if (homeStorageEncryptionEnabled.value) {
			if (masterKeyEncryptionEnabled.value) {
				addLabel(t('privacy', 'Your home storage is encrypted using {linkopen}server-side-encryption ↗{linkclose} with a master key. It means that administrators can access your files, but not read their content.'))
				addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with a master key based on their configuration.'))
			} else {
				addLabel(t('privacy', 'Your home storage is encrypted using {linkopen}server-side-encryption ↗{linkclose} with an individual user key. It means that administrators can access your files, but not read their content.'))
				addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with an individual key based on their configuration.'))
			}
		} else {
			if (masterKeyEncryptionEnabled.value) {
				addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with a master key based on their configuration.'))
			} else {
				addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with an individual key based on their configuration.'))
			}
		}
	}

	if (fullDiskEncryptionEnabled.value && serverSideEncryptionEnabled.value) {
		result.push(t('privacy', 'Additionally, this server is protected with full-disk-encryption.'))
	} else if (fullDiskEncryptionEnabled.value && !serverSideEncryptionEnabled.value) {
		result.push(t('privacy', 'This server is protected with full-disk-encryption.'))
	}

	if (result.length === 0) {
		result.push(t('privacy', 'Your files are not protected by encryption.'))
	}

	return result
})

/**
 * Saves the new full-disk-encryption-state
 */
async function saveFullDiskEncryption() {
	const url = generateOcsUrl('/apps/privacy/api/v1/fullDiskEncryption')
	isSavingChanges.value = true

	try {
		await axios.post(url, { enabled: fullDiskEncryptionEnabled.value ? '1' : '0' })
	} catch (error) {
		logger.error('Error saving new state of full-disk-encryption.', { error })
		showError(t('privacy', 'Error saving new state of full-disk-encryption'))

		// Reset state
		fullDiskEncryptionEnabled.value = !fullDiskEncryptionEnabled.value
	} finally {
		isSavingChanges.value = false
		isEditing.value = false
	}
}
</script>

<style lang="scss" scoped>
.encryption {
	&__list {
		display: flex;
		flex-direction: column;
		gap: 4px 0;
		margin: 12px 0;
	}

	&__edit {
		display: flex;
		flex-direction: column;
		gap: 4px 0;
	}
}

:deep(.encryption__link) {
	text-decoration: underline;
}
</style>
