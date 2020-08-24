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
		<!-- eslint-disable-next-line vue/no-v-html -->
		<p v-show="!isEditing" v-html="label" />
		<Actions v-if="$is_admin && !isEditing">
			<ActionButton icon="icon-rename" @click.stop.prevent="openEditFullDiskEncryptionForm" />
		</Actions>
		<div v-if="isEditing" v-click-outside="cancelEditFullDiskEncryptionForm">
			<form>
				<input id="fullDiskEncryptionEnabledCheckbox"
					v-model="fullDiskEncryptionEnabled"
					:disabled="isSavingChanges"
					type="checkbox"
					name="fullDiskEncryptionEnabledCheckbox"
					class="checkbox"
					@change="saveFullDiskEncryptionForm">
				<label for="fullDiskEncryptionEnabledCheckbox">
					{{ $t('privacy', 'This server is using full-disk-encryption.') }}
				</label>
			</form>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'

import HttpClient from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import Actions from '@nextcloud/vue/dist/Components/Actions'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton'
import { loadState } from '@nextcloud/initial-state'
import { showError } from '@nextcloud/dialogs'

export default {
	name: 'Encryption',
	components: {
		Actions,
		ActionButton,
	},
	directives: {
		ClickOutside,
	},
	data() {
		return {
			fullDiskEncryptionEnabled: false,
			serverSideEncryptionEnabled: false,
			isEditing: false,
			isSavingChanges: false,
		}
	},
	computed: {
		label() {
			if (!this.serverSideEncryptionEnabled && !this.fullDiskEncryptionEnabled) {
				return this.$t('privacy', 'Your files are not protected by encryption.')
			} else if (this.serverSideEncryptionEnabled && !this.fullDiskEncryptionEnabled) {
				return this.$t('privacy', 'Your files are encrypted with {linkopen}server-side-encryption ↗{linkclose}.')
					.replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" title="" rel="noreferrer noopener">')
					.replace('{linkclose}', '</a>')
			} else if (!this.serverSideEncryptionEnabled && this.fullDiskEncryptionEnabled) {
				return this.$t('privacy', 'This server is protected with full-disk-encryption.')
			} else {
				return this.$t('privacy', 'Your files are encrypted with {linkopen}server-side-encryption ↗{linkclose}. Additionally, this server is protected with full-disk-encryption.')
					.replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" title="" rel="noreferrer noopener">')
					.replace('{linkclose}', '</a>')
			}
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
	},
	methods: {
		/**
		 * Opens the form to edit the full-disk-encryption-state
		 */
		openEditFullDiskEncryptionForm() {
			this.isEditing = true
		},
		/**
		 * Closes the form to edit the full-disk-encryption-state
		 */
		cancelEditFullDiskEncryptionForm() {
			this.isEditing = false
		},
		/**
		 * Saves the new full-disk-encryption-state
		 *
		 * @returns {Promise<void>}
		 */
		async saveFullDiskEncryptionForm() {
			const url = generateUrl('/apps/privacy/api/fullDiskEncryption')
			this.isSavingChanges = true

			try {
				await HttpClient.post(url, { enabled: this.fullDiskEncryptionEnabled ? '1' : '0' })
			} catch (error) {
				console.error(error)
				showError('Error saving new state of full-disk-encryption')

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
