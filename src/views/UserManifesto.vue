<!--
  - SPDX-FileCopyrightText: 2023 Nextcloud GmbH and Nextcloud contributors
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->

<template>
	<NcSettingsSection
		class="manifesto"
		:name="t('privacy', 'User Data Manifesto 2.0')"
		:description="t('privacy', 'Defining basic rights for people to control their own data in the internet age.')">
		<div class="manifesto__container">
			<div class="manifesto__section">
				<h3 class="manifesto__heading" v-html="headingControl" />
				<p>{{ t('privacy', 'Data explicitly and willingly uploaded by a user should be under the ultimate control of the user. Users should be able to decide whom to grant direct access to their data and with which permissions and licenses such access should be granted.') }}</p>
			</div>

			<div class="manifesto__section">
				<h3 class="manifesto__heading" v-html="headingKnowledge" />
				<p>{{ t('privacy', 'When the data is uploaded to a specific service provider, users should be informed about where that specific service provider stores the data, how long, in which jurisdiction the specific service provider operates, and which laws apply.') }}</p>
			</div>

			<div class="manifesto__section">
				<h3 class="manifesto__heading" v-html="headingFreedom" />
				<p>{{ t('privacy', 'Users should always be able to extract their data from the service at any time without experiencing any vendor lock-in. Open standards for formats and protocols are necessary to guarantee this.') }}</p>
			</div>
		</div>

		<a
			class="manifesto__link"
			target="_blank"
			rel="noreferrer noopener"
			href="https://nextcloud.com/yourdata">
			{{ t('privacy', 'Learn more ↗') }}
		</a>
	</NcSettingsSection>
</template>

<script setup lang="ts">
import { translate as t } from '@nextcloud/l10n'
import { NcSettingsSection } from '@nextcloud/vue'
import DOMPurify from 'dompurify'

/**
 *
 * @param heading
 */
function formatHeading(heading: string): string {
	// TRANSLATORS: Keep the <strong> tags, they are used to make the first word bold.
	return DOMPurify.sanitize(heading)
		.replace('{bold}', '<strong>')
		.replace('{/bold}', '</strong>')
}

// TRANSLATORS: Keep the <strong> tags, they are used to make the first word bold.
const headingControl = formatHeading(t('privacy', '{bold}Control{/bold} over user data access'))
// TRANSLATORS: Keep the <strong> tags, they are used to make the first word bold.
const headingKnowledge = formatHeading(t('privacy', '{bold}Knowledge{/bold} of how the data is stored'))
// TRANSLATORS: Keep the <strong> tags, they are used to make the first word bold.
const headingFreedom = formatHeading(t('privacy', '{bold}Freedom{/bold} to choose a platform'))
</script>

<style lang="scss" scoped>
.manifesto {
	&__container {
		display: grid;
		grid-auto-flow: row;
		grid-template-columns: repeat(auto-fit, minmax(260px, 400px));
		gap: 32px;
		margin: 12px 0;
	}

	&__heading {
		text-align: center;
	}

	&__link {
		text-decoration: underline;
	}
}
</style>
