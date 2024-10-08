<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="admin">
		<h3>{{ t('privacy', 'Administrators') }}</h3>
		<p class="admin__desc">
			{{ t('privacy', 'The following accounts are designated administrators and may potentially have access to your data through system storage or backups. However, they do not have easy access to your data via the web interface or client applications.') }}
		</p>

		<NcLoadingIcon v-if="isLoading"
			:name="t('privacy', 'Loading administrators …')"
			:size="40" />

		<div v-else class="admin__controls">
			<ul class="admin__list">
				<li v-for="admin in admins"
					:key="admin.id"
					class="admin__entry">
					<span class="admin__user"
						:class="{
							'admin__user--external': !admin.internal,
						}">
						<NcAvatar :user="admin.internal ? admin.id : null"
							:display-name="admin.displayname"
							:size="44"
							:is-no-user="!admin.internal"
							:show-user-status="false" />

						<span class="admin__displayname">{{ admin.displayname }}</span>
					</span>

					<NcButton v-if="!admin.internal"
						type="tertiary"
						:aria-label="t('privacy', 'Remove external {propertyName} admin', { propertyName: admin.displayname })"
						:title="t('privacy', 'Remove external {propertyName} admin', { propertyName: admin.displayname })"
						@click="deleteAdditionalAdmin(admin)">
						<template #icon>
							<Close :size="20" />
						</template>
					</NcButton>
				</li>
			</ul>

			<div class="admin__add">
				<NcButton v-if="isAdmin"
					:aria-label="!isAdding ? t('privacy', 'Add external admin') : t('privacy', 'Cancel')"
					@click="toggleAdd">
					<template #icon>
						<Plus v-if="!isAdding" :size="20" />
						<Close v-else :size="20" />
					</template>
					{{ !isAdding ? t('privacy', 'Add') : t('privacy', 'Cancel') }}
				</NcButton>

				<form v-if="isAdding"
					class="admin__form"
					@submit.prevent="addAdditionalAdmin">
					<NcTextField ref="addInput"
						:value.sync="newAdmin"
						:label="t('privacy', 'Name of external admin')"
						maxlength="64"
						autocorrect="off"
						autocapitalize="off"
						spellcheck="false" />
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'

import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'

import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'

import Close from 'vue-material-design-icons/Close.vue'
import Plus from 'vue-material-design-icons/Plus.vue'

export default {
	name: 'AdminAccess',

	components: {
		Close,
		NcAvatar,
		NcButton,
		NcLoadingIcon,
		NcTextField,
		Plus,
	},

	inject: [
		't',
		'isAdmin',
	],

	data() {
		return {
			admins: [],
			newAdmin: '',
			isLoading: true,
			isAdding: false,
			isSavingChanges: false,
		}
	},

	/**
	 * This function is called on mount of the Vue component
	 * It sets the isAdmin property and
	 * loads additional admins from the server
	 */
	async mounted() {
		const url = generateUrl('/apps/privacy/api/admins')
		try {
			const resp = await axios.get(url)
			Vue.set(this, 'admins', resp.data)
		} catch (error) {
			console.error(error)
			showError(t('privacy', 'Error loading additional administrator.'))
		} finally {
			this.isLoading = false
		}
	},

	methods: {
		toggleAdd() {
			if (!this.isAdding) {
				this.openNewAdmin()
				return
			}
			this.closeNewAdmin()
		},

		/**
		 * Opens the new Admin dialog
		 */
		async openNewAdmin() {
			this.isAdding = true
			await this.$nextTick()
			this.$refs.addInput?.focus()
		},

		/**
		 * Closes the new Admin dialog and resets the input field
		 */
		closeNewAdmin() {
			this.isAdding = false
			this.newAdmin = ''
		},

		/**
		 * Creates an additional (virtual) admin on the server
		 *
		 * @return {Promise<void>}
		 */
		async addAdditionalAdmin() {
			const url = generateUrl('/apps/privacy/api/admins')
			this.isSavingChanges = true

			try {
				const response = await axios.post(url, { name: this.newAdmin })
				this.admins.push(response.data)
			} catch (error) {
				console.error(error)
				showError(t('privacy', 'Error adding new administrator.'))
			} finally {
				this.isSavingChanges = false
				this.isAdding = false
				this.newAdmin = ''
			}
		},

		/**
		 * Deletes an additional (virtual) admin from the server
		 *
		 * @param {object} admin The admin object from this.admins
		 * @return {Promise<void>}
		 */
		async deleteAdditionalAdmin(admin) {
			const url = generateUrl('/apps/privacy/api/admins/{id}', { id: admin.id })

			try {
				await axios.delete(url)

				const index = this.admins.indexOf(admin)
				if (index !== -1) {
					this.admins.splice(index, 1)
				}
			} catch (error) {
				console.error(error)
				showError(t('privacy', 'Error deleting new administrator.'))
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.admin {
	&__desc {
		color: var(--color-text-maxcontrast);
		margin-bottom: calc(var(--default-grid-baseline) * 4);
	}

	&__controls {
		display: flex;
		flex-direction: column;
		gap: 10px 0;
	}

	&__list {
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: repeat(auto-fit, 260px);
		gap: 8px;
	}

	&__entry {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 4px 0;
		width: 260px;
	}

	&__user {
		display: flex;
		align-items: center;
		gap: 0 10px;
		width: 100%;

		&--external {
			width: calc(260px - 44px); // Entry - button
		}
	}

	&__displayname {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}

	&__add {
		display: flex;
		flex-direction: column;
		gap: 4px 0;
	}

	&__form {
		max-width: 400px;
	}
}
</style>
