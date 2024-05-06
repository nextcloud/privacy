<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="encryption">
		<h3>{{ t('privacy', 'Encryption') }}</h3>

		<ul class="encryption__list">
			<!-- eslint-disable vue/no-v-html -->
			<li v-for="label in labels"
				:key="label"
				v-html="label" />
			<!--eslint-enable-->
		</ul>

		<div class="encryption__edit">
			<NcButton v-if="isAdmin"
				:aria-label="!isEditing ? t('privacy', 'Edit encryption') : t('privacy', 'Cancel')"
				@click="isEditing = !isEditing">
				<template #icon>
					<Pencil v-if="!isEditing" :size="20" />
					<Close v-else :size="20" />
				</template>
				{{ !isEditing ? t('privacy', 'Edit') : t('privacy', 'Cancel') }}
			</NcButton>

			<NcCheckboxRadioSwitch v-if="isEditing"
				:disabled="isSavingChanges"
				:loading="isSavingChanges"
				:checked.sync="fullDiskEncryptionEnabled"
				@update:checked="saveFullDiskEncryption">
				{{ t('privacy', 'This server is using full-disk-encryption.') }}
			</NcCheckboxRadioSwitch>
		</div>
	</div>
</template>

<script>
import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { loadState } from '@nextcloud/initial-state'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'

import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'

import Close from 'vue-material-design-icons/Close.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'

export default {
	name: 'Encryption',

	components: {
		Close,
		NcButton,
		NcCheckboxRadioSwitch,
		Pencil,
	},

	inject: [
		't',
		'isAdmin',
	],

	data() {
		return {
			fullDiskEncryptionEnabled: false,
			serverSideEncryptionEnabled: false,
			homeStorageEncryptionEnabled: false,
			masterKeyEncryptionEnabled: false,
			isEditing: false,
			isSavingChanges: false,
		}
	},

	computed: {
		labels() {
			const labels = []

			const addLabel = (text) => labels.push(text
				.replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" rel="noreferrer noopener" class="encryption__link">')
				.replace('{linkclose}', '</a>'))

			if (this.serverSideEncryptionEnabled) {
				if (this.homeStorageEncryptionEnabled) {
					if (this.masterKeyEncryptionEnabled) {
						addLabel(t('privacy', 'Your home storage is encrypted using {linkopen}server-side-encryption ↗{linkclose} with a master key. It means that administrators can access your files, but not read their content.'))
						addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with a master key based on their configuration.'))
					} else {
						addLabel(t('privacy', 'Your home storage is encrypted using {linkopen}server-side-encryption ↗{linkclose} with an individual user key. It means that administrators can access your files, but not read their content.'))
						addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with an individual key based on their configuration.'))
					}
				} else {
					if (this.masterKeyEncryptionEnabled) {
						addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with a master key based on their configuration.'))
					} else {
						addLabel(t('privacy', 'Your files on external storages may be encrypted using {linkopen}server-side-encryption ↗{linkclose} with an individual key based on their configuration.'))
					}
				}
			}

			if (this.fullDiskEncryptionEnabled && this.serverSideEncryptionEnabled) {
				labels.push(t('privacy', 'Additionally, this server is protected with full-disk-encryption.'))
			} else if (this.fullDiskEncryptionEnabled && !this.serverSideEncryptionEnabled) {
				labels.push(t('privacy', 'This server is protected with full-disk-encryption.'))
			}

			if (labels.length === 0) {
				labels.push(t('privacy', 'Your files are not protected by encryption.'))
			}

			return labels
		},
	},

	/**
	 * This function is called on mount of the Vue component
	 * It checks if full-disk-encryption or server-side-encryption
	 * are enabled
	 */
	mounted() {
		this.fullDiskEncryptionEnabled = loadState('privacy', 'fullDiskEncryptionEnabled')
		this.serverSideEncryptionEnabled = loadState('privacy', 'serverSideEncryptionEnabled')
		this.homeStorageEncryptionEnabled = loadState('privacy', 'homeStorageEncryptionEnabled')
		this.masterKeyEncryptionEnabled = loadState('privacy', 'masterKeyEncryptionEnabled')
	},

	methods: {
		/**
		 * Saves the new full-disk-encryption-state
		 *
		 * @return {Promise<void>}
		 */
		async saveFullDiskEncryption() {
			const url = generateUrl('/apps/privacy/api/fullDiskEncryption')
			this.isSavingChanges = true

			try {
				await axios.post(url, { enabled: this.fullDiskEncryptionEnabled ? '1' : '0' })
			} catch (error) {
				console.error(error)
				showError(t('privacy', 'Error saving new state of full-disk-encryption'))

				// Reset state
				this.fullDiskEncryptionEnabled = !this.fullDiskEncryptionEnabled
			} finally {
				this.isSavingChanges = false
				this.isEditing = false
			}
		},
	},
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

:deep {
	.encryption__link {
		text-decoration: underline;
	}
}
</style>
