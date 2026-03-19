<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection :name="t('privacy', 'Your {serverName} account', { serverName })">
		<p>{{ t('privacy', 'Your data represents who you are and can easily be abused. We at Nextcloud believe that you have a right to decide what happens with your data. Nextcloud protects your rights as defined in the User Data Manifesto!') }}</p>
	</NcSettingsSection>
</template>

<script setup lang="ts">
import { getCapabilities } from '@nextcloud/capabilities'
import { translate as t } from '@nextcloud/l10n'
import { NcSettingsSection } from '@nextcloud/vue'

// @ts-expect-error - theming capabilities exist but are not typed yet
const serverName = getCapabilities()?.theming?.name || 'Nextcloud'
</script>
