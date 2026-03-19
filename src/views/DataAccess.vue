<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection
		class="access"
		:name="t('privacy', 'Who has access to your data?')">
		<AdminAccess class="access__section" />
		<ShareAccess class="access__section" />
		<Privacy class="access__section" />
		<Encryption class="access__section" />
	</NcSettingsSection>
</template>

<script setup lang="ts">
import { translate as t } from '@nextcloud/l10n'
import { NcSettingsSection } from '@nextcloud/vue'
import AdminAccess from '../components/AdminAccess.vue'
import Encryption from '../components/EncryptionInfo.vue'
import Privacy from '../components/PrivacyPolicy.vue'
import ShareAccess from '../components/ShareAccess.vue'
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
