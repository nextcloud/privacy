<template>
	<div class="who-has-access">
		<span :class="{hidden: !isLoading}" class="icon icon-loading" />
		<div v-for="admin in admins" :key="admin.id" class="admin-avatar-container">
			<avatar :user="admin.internal ? admin.id : null"
				:display-name="admin.displayname" :size="64" :is-no-user="!admin.internal"
			/>
			<span v-if="!admin.internal" class="icon icon-close"
				@click="deleteAdditionalAdmin(admin)"
			/>
		</div>

		<div v-if="isAdmin">
			<div v-if="!isAdding" class="addAdditionalAdmin" @click="openNewAdmin">
				+
			</div>
			<form v-if="isAdding" v-click-outside="closeNewAdmin" class="addAdditionalAdminFormContainer"
				@submit.prevent="addAdditionalAdmin"
			>
				<input v-model="newAdditionalAdminInputField" type="text" maxlength="64"
					autocomplete="new-password" autocorrect="off" autocapitalize="off"
					spellcheck="false"
				>
				<input type="submit" value="" class="icon-confirm">
				<!-- add icon-loading -->
			</form>
		</div>
	</div>
</template>

<script>
import { generateUrl } from 'nextcloud-server/dist/router'
import HttpClient from 'nextcloud-axios'
import Vue from 'vue'
import ClickOutside from 'vue-click-outside'

export default {
	name: 'Admins',
	directives: {
		ClickOutside
	},
	data: () => ({
		admins: [],
		newAdditionalAdminInputField: '',
		isAdmin: false,
		isLoading: true,
		isAdding: false,
		isSavingChanges: false
	}),
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
			this.isAdding = true
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
