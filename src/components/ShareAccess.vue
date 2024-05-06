<!--
  - SPDX-FileCopyrightText: 2019 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div class="shared">
		<h3>{{ t('privacy', 'People you\'ve shared with') }}</h3>

		<NcLoadingIcon v-if="isLoading"
			:name="t('privacy', 'Loading people you\'ve shared with …')"
			:size="40" />

		<p v-else-if="!uniqueShareUIDs.length">
			{{ t('privacy', 'You do not have any shares with individual users.') }}
		</p>

		<ul v-else
			class="shared__list">
			<li v-for="uid in uniqueShareUIDs"
				:key="uid"
				class="shared__entry">
				<span class="shared__user">
					<NcAvatar :user="uid"
						:display-name="uidDisplaynameMap[uid]"
						:size="44"
						:show-user-status="false" />

					<span class="shared__displayname">{{ uidDisplaynameMap[uid] }}</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<script>
import Vue from 'vue'

import axios from '@nextcloud/axios'
import { generateOcsUrl } from '@nextcloud/router'
import { getCurrentUser } from '@nextcloud/auth'
import { showError } from '@nextcloud/dialogs'
import { translate as t } from '@nextcloud/l10n'

import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'

export default {
	name: 'ShareAccess',

	components: {
		NcAvatar,
		NcLoadingIcon,
	},

	inject: [
		't',
	],

	data() {
		return {
			uniqueShareUIDs: [],
			uidDisplaynameMap: {},
			isLoading: true,
		}
	},

	/**
	 * This function is called on mount of the Vue component
	 * It loads the people shared with
	 */
	async mounted() {
		const url = generateOcsUrl('/apps/files_sharing/api/v1/shares?format=json&shared_with_me=false')
		const currentUserId = getCurrentUser().uid

		try {
			const resp = await axios.get(url)
			resp.data.ocs.data.forEach((d) => {
				if (d.share_with === currentUserId) {
					return
				}

				switch (d.share_type) {
				case 0:
					if (this.uniqueShareUIDs.indexOf(d.share_with) === -1) {
						this.uniqueShareUIDs.push(d.share_with)
						Vue.set(this.uidDisplaynameMap, d.share_with, d.share_with_displayname)
					}
					break

				default:
					break
				}
			})
		} catch (error) {
			console.error(error)
			showError(t('privacy', 'Error loading information about shares.'))
		} finally {
			this.isLoading = false
		}
	},
}
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
