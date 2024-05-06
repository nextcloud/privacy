<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection class="access"
		:name="t('privacy', 'Who has access to your data?')">
		<AdminAccess class="access__section" />
		<ShareAccess class="access__section" />
		<Privacy class="access__section" />
		<Encryption class="access__section" />
	</NcSettingsSection>
</template>

<script>
import { loadState } from '@nextcloud/initial-state'

import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'

import AdminAccess from '../components/AdminAccess.vue'
import Encryption from '../components/Encryption.vue'
import Privacy from '../components/Privacy.vue'
import ShareAccess from '../components/ShareAccess.vue'

export default {
	name: 'Access',

	components: {
		AdminAccess,
		Encryption,
		NcSettingsSection,
		Privacy,
		ShareAccess,
	},

	inject: [
		't',
	],

	data() {
		return {
			privacyPolicyUrl: loadState('privacy', 'privacyPolicyUrl'),
		}
	},
}
</script>

<style lang="scss" scoped>
.access {
	&__section {
		margin: 24px 0;

		&:first-of-type {
			margin-top: 0;
		}

		&:last-of-type {
			margin-bottom: 0;
		}
	}
}
</style>
