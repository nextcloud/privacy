<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="shared">
		<h3>{{ t('privacy', 'People you\'ve shared with') }}</h3>

		<NcLoadingIcon
			v-if="isLoading"
			:name="t('privacy', 'Loading people you\'ve shared with …')"
			:size="40" />

		<p v-else-if="!uniqueShareUIDs.length">
			{{ t('privacy', 'You do not have any shares with individual users.') }}
		</p>

		<ul
			v-else
			class="shared__list">
			<li
				v-for="uid in uniqueShareUIDs"
				:key="uid"
				class="shared__entry">
				<span class="shared__user">
					<NcAvatar
						:user="uid"
						:displayName="uidDisplaynameMap[uid]"
						:size="44"
						:showUserStatus="false" />

					<span class="shared__displayname">{{ uidDisplaynameMap[uid] }}</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<script setup lang="ts">
import { getCurrentUser } from '@nextcloud/auth'
import axios from '@nextcloud/axios'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'
import { generateOcsUrl } from '@nextcloud/router'
import { NcAvatar, NcLoadingIcon } from '@nextcloud/vue'
import { onMounted, ref } from 'vue'
import logger from '../utils/logger.ts'

const uniqueShareUIDs = ref<string[]>([])
const uidDisplaynameMap = ref<Record<string, string>>({})
const isLoading = ref(true)

/**
 * Loads the people this user has shared with on mount
 */
onMounted(async () => {
	const url = generateOcsUrl('/apps/files_sharing/api/v1/shares?format=json&shared_with_me=false')
	const currentUserId = getCurrentUser()?.uid

	try {
		const resp = await axios.get(url)
		resp.data.ocs.data.forEach((d: { share_with: string, share_type: number, share_with_displayname: string }) => {
			if (d.share_with === currentUserId) {
				return
			}

			switch (d.share_type) {
				case 0:
					if (uniqueShareUIDs.value.indexOf(d.share_with) === -1) {
						uniqueShareUIDs.value.push(d.share_with)
						uidDisplaynameMap.value[d.share_with] = d.share_with_displayname
					}
					break

				default:
					break
			}
		})
	} catch (error) {
		logger.error('Error loading information about shares.', { error })
		showError(t('privacy', 'Error loading information about shares.'))
	} finally {
		isLoading.value = false
	}
})
</script>

<style lang="scss" scoped>
.shared {
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
	}

	&__displayname {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
}
</style>
