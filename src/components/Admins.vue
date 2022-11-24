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
		<span :class="{ hidden: !isLoading }" class="icon icon-loading" />
		<div v-for="admin in admins" :key="admin.id" class="admin-avatar-container">
			<Avatar :user="admin.internal ? admin.id : null"
				:display-name="admin.displayname"
				:size="64"
				:is-no-user="!admin.internal"
				:show-user-status="false" />
			<Actions v-if="!admin.internal">
				<ActionButton icon="icon-close" @click="deleteAdditionalAdmin(admin)">
					{{ $t('privacy', 'Remove external admin') }}
				</ActionButton>
			</Actions>
		</div>

		<div v-if="$is_admin">
			<Actions v-if="!isAdding" class="addAdditionalAdmin">
				<ActionButton icon="icon-add" @click.stop.prevent="openNewAdmin">
					{{ $t('privacy', 'Add external admin') }}
				</ActionButton>
			</Actions>
			<form v-if="isAdding"
				v-click-outside="closeNewAdmin"
				class="addAdditionalAdminFormContainer"
				@submit.prevent="addAdditionalAdmin">
				<input v-model="newAdditionalAdminInputField"
					type="text"
					maxlength="64"
					autocomplete="new-password"
					autocorrect="off"
					autocapitalize="off"
					spellcheck="false"
					:placeholder="$t('privacy', 'Name of external admin')">
				<input type="submit" value="" class="icon-confirm">
				<!-- add icon-loading -->
			</form>
		</div>
	</div>
</template>

<script>
import Vue from 'vue'
import ClickOutside from 'vue-click-outside'
import HttpClient from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'
import { showError } from '@nextcloud/dialogs'
import Actions from '@nextcloud/vue/dist/Components/Actions.js'
import ActionButton from '@nextcloud/vue/dist/Components/ActionButton.js'
import Avatar from '@nextcloud/vue/dist/Components/Avatar.js'

export default {
	name: 'Admins',
	components: {
		Actions,
		ActionButton,
		Avatar,
	},
	directives: {
		ClickOutside,
	},
	data() {
		return {
			admins: [],
			newAdditionalAdminInputField: '',
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
			const resp = await HttpClient.get(url)
			Vue.set(this, 'admins', resp.data)
		} catch (error) {
			console.error(error)
			showError('Error loading additional administrator.')
		} finally {
			this.isLoading = false
		}
	},
	methods: {
		/**
		 * Opens the new Admin dialog
		 */
		openNewAdmin() {
			this.isAdding = true
		},
		/**
		 * Closes the new Admin dialog and resets the input field
		 */
		closeNewAdmin() {
			this.isAdding = false
			this.newAdditionalAdminInputField = ''
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
				const response = await HttpClient.post(url, { name: this.newAdditionalAdminInputField })
				this.admins.push(response.data)
			} catch (error) {
				console.error(error)
				showError('Error adding new administrator.')
			} finally {
				this.isSavingChanges = false
				this.isAdding = false
				this.newAdditionalAdminInputField = ''
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
				await HttpClient.delete(url)

				const index = this.admins.indexOf(admin)
				if (index !== -1) {
					this.admins.splice(index, 1)
				}
			} catch (error) {
				console.error(error)
				showError('Error deleting new administrator.')
			}
		},
	},
}
</script>
