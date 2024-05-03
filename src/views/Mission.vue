<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection :name="t('privacy', 'Your {serverName} account', { serverName })">
		<p>{{ t('privacy', 'Your data represents who you are and can easily be abused. We at Nextcloud believe that you have a right to decide what happens with your data. Nextcloud protects your rights as defined in the User Data Manifesto!') }}</p>
	</NcSettingsSection>
</template>

<script>
import { loadState } from '@nextcloud/initial-state'

import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'

export default {
	name: 'Mission',

	components: {
		NcSettingsSection,
	},

	inject: [
		't',
	],

	data() {
		return {
			serverName: loadState('privacy', 'serverName'),
		}
	},
}
</script>
