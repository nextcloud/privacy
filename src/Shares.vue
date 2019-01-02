<template>
	<div class="who-has-access">
		<span :class="{hidden: !isLoading}" class="icon icon-loading" />
		<span :class="{hidden: !isEmptyList}">
			{{ emptyLabel }}
		</span>
		<avatar v-for="uid in uniqueShareUIDs" :key="uid" :user="uid"
			:display-name="uidDisplaynameMap[uid]" :size="64"
		/>
	</div>
</template>

<script>
import { generateOcsUrl } from 'nextcloud-server/dist/router'
import HttpClient from 'nextcloud-axios'
import Vue from 'vue'

export default {
	name: 'Shares',
	data: () => ({
		uniqueShareUIDs: [],
		uidDisplaynameMap: {},
		isLoading: true
	}),
	computed: {
		isEmptyList() {
			return this.isLoading === false && this.uniqueShareUIDs.length === 0
		},
		emptyLabel() {
			return t('privacy', 'You don\'t have any shares with individual users.')
		}
	},
	mounted: function() {
		const url = generateOcsUrl('/apps/files_sharing/api/v1/shares?format=json&shared_with_me=false')
		const currentUserId = OC.getCurrentUser()

		HttpClient.get(url).then(resp => {
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

			this.isLoading = false
		})
	}
}
</script>
