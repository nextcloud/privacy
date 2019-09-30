<template>
	<div class="who-has-access">
		<!-- eslint-disable-next-line vue/no-v-html -->
		<p v-show="!isEditing" v-html="label" />
		<Actions v-if="isAdmin && !isEditing">
			<ActionButton icon="icon-rename" @click="openEditFullDiskEncryptionForm" />
		</Actions>
		<div v-if="isEditing" v-click-outside="cancelEditFullDiskEncryptionForm">
			<form>
				<input id="fullDiskEncryptionEnabledCheckbox" v-model="fullDiskEncryptionEnabled"
					:disabled="isSavingChanges" type="checkbox" name="fullDiskEncryptionEnabledCheckbox"
					class="checkbox" @change="saveFullDiskEncryptionForm">
				<label for="fullDiskEncryptionEnabledCheckbox">
					{{ checkboxLabel }}
				</label>
			</form>
		</div>
	</div>
</template>

<script>
import HttpClient from 'nextcloud-axios'
import ClickOutside from 'vue-click-outside'

import { generateUrl } from 'nextcloud-server/dist/router'

import Actions from 'nextcloud-vue/dist/Components/Actions'
import ActionButton from 'nextcloud-vue/dist/Components/ActionButton'

export default {
	name: 'Encryption',
	components: {
		Actions,
		ActionButton
	},
	directives: {
		ClickOutside
	},
	data() {
		return {
			fullDiskEncryptionEnabled: false,
			serverSideEncryptionEnabled: false,
			isAdmin: true,
			isEditing: false,
			isSavingChanges: false
		}
	},
	computed: {
		label() {
			if (!this.serverSideEncryptionEnabled && !this.fullDiskEncryptionEnabled) {
				return t('privacy', 'Your files are not protected by encryption.')
			} else if (this.serverSideEncryptionEnabled && !this.fullDiskEncryptionEnabled) {
				return t('privacy', 'Your files are encrypted with {linkopen}server-side-encryption ↗{linkclose}.')
					.replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" title="" rel="noreferrer noopener">')
					.replace('{linkclose}', '</a>')
			} else if (!this.serverSideEncryptionEnabled && this.fullDiskEncryptionEnabled) {
				return t('privacy', 'This server is protected with full-disk-encryption.')
			} else {
				return t('privacy', 'Your files are encrypted with {linkopen}server-side-encryption ↗{linkclose}. Additionally, this server is protected with full-disk-encryption.')
					.replace('{linkopen}', '<a href="https://nextcloud.com/blog/encryption-in-nextcloud/" target="_blank" title="" rel="noreferrer noopener">')
					.replace('{linkclose}', '</a>')
			}
		},
		checkboxLabel() {
			return t('privacy', 'This server is using full-disk-encryption.')
		}
	},
	created() {
		this.fullDiskEncryptionEnabled = this.$parent.fullDiskEncryptionEnabled
		this.serverSideEncryptionEnabled = this.$parent.serverSideEncryptionEnabled
		this.isAdmin = OC.isUserAdmin()
	},
	methods: {
		openEditFullDiskEncryptionForm() {
			setTimeout(() => {
				this.isEditing = true
			}, 0)
		},
		cancelEditFullDiskEncryptionForm() {
			this.isEditing = false
		},
		saveFullDiskEncryptionForm() {
			const url = generateUrl('/apps/privacy/api/fullDiskEncryption')
			this.isSavingChanges = true

			HttpClient.post(url, { enabled: this.fullDiskEncryptionEnabled ? '1' : '0' }).then(resp => {
				this.isSavingChanges = false
				this.isEditing = false
			})
		}
	}
}
</script>
