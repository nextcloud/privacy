<!--
  - @copyright 2023 Christopher Ng <chrng8@gmail.com>
  -
  - @author Christopher Ng <chrng8@gmail.com>
  -
  - @license AGPL-3.0-or-later
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
