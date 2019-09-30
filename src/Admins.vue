<template>
	<div class="who-has-access">
		<span :class="{ hidden: !isLoading }" class="icon icon-loading" />
		<div v-for="admin in admins" :key="admin.id" class="admin-avatar-container">
			<Avatar :user="admin.internal ? admin.id : null"
				:display-name="admin.displayname" :size="64" :is-no-user="!admin.internal" />
			<Actions v-if="!admin.internal">
				<ActionButton icon="icon-close" @click="deleteAdditionalAdmin(admin)">
					{{ t('privacy', 'Remove external admin') }}
				</ActionButton>
			</Actions>
		</div>

		<div v-if="isAdmin">
			<Actions v-if="!isAdding" class="addAdditionalAdmin">
				<ActionButton icon="icon-add" @click="openNewAdmin">
					{{ t('privacy', 'Add external admin') }}
				</ActionButton>
			</Actions>
			<form v-if="isAdding"
				v-click-outside="closeNewAdmin"
				class="addAdditionalAdminFormContainer"
				@submit.prevent="addAdditionalAdmin">
				<input v-model="newAdditionalAdminInputField" type="text" maxlength="64"
					autocomplete="new-password" autocorrect="off" autocapitalize="off"
					spellcheck="false" :placeholder="additionalAdminPlaceholderLabel">
				<input type="submit" value="" class="icon-confirm">
				<!-- add icon-loading -->
			</form>
		</div>
	</div>
</template>

<script>
import ClickOutside from 'vue-click-outside'
import HttpClient from 'nextcloud-axios'
import Vue from 'vue'

import Actions from 'nextcloud-vue/dist/Components/Actions'
import ActionButton from 'nextcloud-vue/dist/Components/ActionButton'
import Avatar from 'nextcloud-vue/dist/Components/Avatar'
import { generateUrl } from 'nextcloud-server/dist/router'

export default {
	name: 'Admins',
	components: {
		Actions,
		ActionButton,
		Avatar
	},
	directives: {
		ClickOutside
	},
	data() {
		return {
			admins: [],
			newAdditionalAdminInputField: '',
			isAdmin: false,
			isLoading: true,
			isAdding: false,
			isSavingChanges: false
		}
	},
	mounted() {
		this.isAdmin = OC.isUserAdmin()

		const url = generateUrl('/apps/privacy/api/admins')
		HttpClient.get(url).then(resp => {
			Vue.set(this, 'admins', resp.data)
			this.isLoading = false
		})
	},
	methods: {
		openNewAdmin() {
			setTimeout(() => {
				this.isAdding = true
			}, 0)
		},
		closeNewAdmin() {
			this.isAdding = false
			this.newAdditionalAdminInputField = ''
		},
		addAdditionalAdmin() {
			console.warn(this.newAdditionalAdminInputField)
			const url = generateUrl('/apps/privacy/api/admins')
			this.isSavingChanges = true

			HttpClient.post(url, { name: this.newAdditionalAdminInputField }).then(resp => {
				this.admins.push(resp.data)

				this.isSavingChanges = false
				this.isAdding = false
				this.newAdditionalAdminInputField = ''
			})
		},
		deleteAdditionalAdmin(admin) {
			const url = generateUrl('/apps/privacy/api/admins/{id}', { id: admin.id })
			HttpClient.delete(url).then(resp => {
				const index = this.admins.indexOf(admin)
				this.admins.splice(index, 1)
			})
		}
	}
}
</script>
