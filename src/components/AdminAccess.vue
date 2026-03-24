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

		<NcLoadingIcon
			v-if="isLoading"
			:name="t('privacy', 'Loading administrators\u00a0\u2026')"
			:size="40" />

		<div v-else class="admin__controls">
			<ul class="admin__list">
				<li
					v-for="admin in admins"
					:key="admin.id"
					class="admin__entry">
					<span
						class="admin__user"
						:class="{
							'admin__user--external': !admin.internal,
						}">
						<NcAvatar
							:user="admin.internal ? admin.id : undefined"
							:displayName="admin.displayname"
							:size="44"
							:isNoUser="!admin.internal"
							:showUserStatus="false" />

						<span class="admin__displayname">{{ admin.displayname }}</span>
					</span>

					<NcButton
						v-if="!admin.internal"
						variant="tertiary"
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
				<NcButton
					v-if="isAdmin"
					:aria-label="!isAdding ? t('privacy', 'Add external admin') : t('privacy', 'Cancel')"
					@click="toggleAdd">
					<template #icon>
						<Plus v-if="!isAdding" :size="20" />
						<Close v-else :size="20" />
					</template>
					{{ !isAdding ? t('privacy', 'Add') : t('privacy', 'Cancel') }}
				</NcButton>

				<form
					v-if="isAdding"
					class="admin__form"
					@submit.prevent="addAdditionalAdmin">
					<NcTextField
						ref="addInput"
						v-model="newAdmin"
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

<script setup lang="ts">
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import { NcAvatar, NcButton, NcLoadingIcon, NcTextField } from '@nextcloud/vue'
import { inject, nextTick, onMounted, ref } from 'vue'
import Close from 'vue-material-design-icons/Close.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import logger from '../utils/logger.ts'

interface Admin {
	id: string
	displayname: string
	internal: boolean
}

const isAdmin = inject<boolean>('isAdmin', false)

const admins = ref<Admin[]>([])
const newAdmin = ref('')
const isLoading = ref(true)
const isAdding = ref(false)
const isSavingChanges = ref(false)
const addInput = ref<InstanceType<typeof NcTextField> | null>(null)

/**
 * Load additional admins from the server on mount
 */
onMounted(async () => {
	const url = generateOcsUrl('/apps/privacy/api/v1/admins')
	try {
		const resp = await axios.get(url)
		admins.value = resp.data.ocs.data
	} catch (error) {
		logger.error('Error loading additional administrator.', { error })
		showError(t('privacy', 'Error loading additional administrator.'))
	} finally {
		isLoading.value = false
	}
})

/**
 *
 */
function toggleAdd() {
	if (!isAdding.value) {
		openNewAdmin()
		return
	}
	closeNewAdmin()
}

/**
 * Opens the new Admin dialog
 */
async function openNewAdmin() {
	isAdding.value = true
	await nextTick()
	addInput.value?.focus()
}

/**
 * Closes the new Admin dialog and resets the input field
 */
function closeNewAdmin() {
	isAdding.value = false
	newAdmin.value = ''
}

/**
 * Creates an additional (virtual) admin on the server
 */
async function addAdditionalAdmin() {
	const url = generateOcsUrl('/apps/privacy/api/v1/admins')
	isSavingChanges.value = true

	try {
		const response = await axios.post(url, { displayName: newAdmin.value })
		admins.value.push(response.data.ocs.data)
	} catch (error) {
		logger.error('Error adding new administrator.', { error })
		showError(t('privacy', 'Error adding new administrator.'))
	} finally {
		isSavingChanges.value = false
		isAdding.value = false
		newAdmin.value = ''
	}
}

/**
 * Deletes an additional (virtual) admin from the server
 *
 * @param admin The admin object to delete
 */
async function deleteAdditionalAdmin(admin: Admin) {
	const url = generateOcsUrl('/apps/privacy/api/v1/admins/{id}', { id: admin.id })

	try {
		await axios.delete(url)

		const index = admins.value.indexOf(admin)
		if (index !== -1) {
			admins.value.splice(index, 1)
		}
	} catch (error) {
		logger.error('Error deleting new administrator.', { error })
		showError(t('privacy', 'Error deleting new administrator.'))
	}
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
