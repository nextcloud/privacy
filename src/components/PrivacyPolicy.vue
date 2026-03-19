<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<div
		v-if="privacyPolicyUrl"
		class="privacy">
		<h3>{{ t('privacy', 'Privacy policy') }}</h3>

		<a
			class="privacy__link"
			target="_blank"
			rel="noreferrer noopener"
			:href="privacyPolicyUrl">
			{{ t('privacy', 'Read the privacy policy ↗') }}
		</a>
	</div>
</template>

<script setup lang="ts">
import { loadState } from '@nextcloud/initial-state'
import { translate as t } from '@nextcloud/l10n'

const privacyPolicyUrl = loadState<string | null>('privacy', 'privacyPolicyUrl', null)
</script>

<style lang="scss" scoped>
.privacy {
	&__link {
		text-decoration: underline;
	}
}
</style>
