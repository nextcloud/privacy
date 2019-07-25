<template>
	<div class="where-is-my-data">
		<span v-show="isLoading" class="icon icon-loading" />
		<Map v-show="!isLoading" />
		<p v-show="!isEditingLocation && !isLoading">
			<span v-show="country">{{ label }}<strong>{{ country }}.</strong></span>
			<span v-show="!country">{{ labelForNoCountry }}</span>
			<span v-show="isAdmin" class="icon icon-rename" @click="editLocation" />
		</p>
		<div v-show="isEditingLocation && !isLoading" class="multiselect-container">
			<multiselect
				:disabled="isSavingChanges"
				:options="options"
				:searchable="true"
				track-by="code"
				label="label"
				:placeholder="placeholderLabel"
				@input="onChange"
			/>
			<span v-show="isSavingChanges" class="icon icon-loading" />
		</div>
	</div>
</template>

<script>
import Map from './Map.vue'
import HttpClient from 'nextcloud-axios'
import { generateUrl } from 'nextcloud-server/dist/router'

import { Multiselect } from 'nextcloud-vue'
import {
	getCountryList,
	getNameForCountryCode
} from './nameProvider.js'

export default {
	name: 'Location',
	components: {
		Map,
		Multiselect
	},
	data: () => ({
		selectedCountry: 'de',
		isAdmin: false,
		isEditingLocation: false,
		isLoading: true,
		isSavingChanges: false,
	}),
	computed: {
		label() {
			return t('privacy', 'Your data is located in: ')
		},
		labelForNoCountry() {
			return t('privacy', 'The admin hasn\'t selected the location of the server yet.')
		},
		country() {
			return getNameForCountryCode(this.$data.selectedCountry)
		},
		options() {
			return getCountryList()
		},
		placeholderLabel() {
			return t('privacy', 'Please select a country')
		}
	},
	watch: {
		selectedCountry: (newCountry, oldCountry) => {
			const oldElm = document.querySelector('.where-is-my-data #' + oldCountry)
			const newElm = document.querySelector('.where-is-my-data #' + newCountry)

			if (oldElm) {
				oldElm.style.fill = null
			}
			if (newElm) {
				newElm.style.fill = 'var(--color-primary)'
			}
		}
	},
	mounted() {
		this.isAdmin = OC.isUserAdmin()
		const url = generateUrl('/apps/privacy/api/location')

		HttpClient.get(url).then(resp => {
			this.selectedCountry = resp.data.code

			if (this.selectedCountry !== '') {
				const elm = document.querySelector('.where-is-my-data #' + this.selectedCountry)
				if (elm) {
					elm.style.fill = '#e6605c'
				}
			}

			this.isLoading = false
		})
	},
	methods: {
		editLocation() {
			this.isEditingLocation = true
		},
		onChange(value) {
			const url = generateUrl('/apps/privacy/api/location')
			this.isSavingChanges = true

			HttpClient.post(url, { code: value.code }).then(resp => {
				this.selectedCountry = value.code

				this.isEditingLocation = false
				this.isSavingChanges = false
			})
		}
	},
}
</script>
