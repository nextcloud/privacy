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
	<NcSettingsSection class="manifesto"
		:name="t('privacy', 'User Data Manifesto 2.0')"
		:description="t('privacy', 'Defining basic rights for people to control their own data in the internet age.')"
		:limit-width="false">
		<div class="manifesto__container">
			<div class="manifesto__section">
				<h3 class="manifesto__heading">
					<strong>{{ t('privacy', 'Control') }}</strong>
					<span>{{ t('privacy', 'over user data access') }}</span>
				</h3>
				<p>{{ t('privacy', 'Data explicitly and willingly uploaded by a user should be under the ultimate control of the user. Users should be able to decide whom to grant direct access to their data and with which permissions and licenses such access should be granted.') }}</p>
			</div>

			<div class="manifesto__section">
				<h3 class="manifesto__heading">
					<strong>{{ t('privacy', 'Knowledge') }}</strong>
					<span>{{ t('privacy', 'of how the data is stored') }}</span>
				</h3>
				<p>{{ t('privacy', 'When the data is uploaded to a specific service provider, users should be informed about where that specific service provider stores the data, how long, in which jurisdiction the specific service provider operates, and which laws apply.') }}</p>
			</div>

			<div class="manifesto__section">
				<h3 class="manifesto__heading">
					<strong>{{ t('privacy', 'Freedom') }}</strong>
					<span>{{ t('privacy', 'to choose a platform') }}</span>
				</h3>
				<p>{{ t('privacy', 'Users should always be able to extract their data from the service at any time without experiencing any vendor lock-in. Open standards for formats and protocols are necessary to guarantee this.') }}</p>
			</div>
		</div>

		<a class="manifesto__link"
			target="_blank"
			rel="noreferrer noopener"
			href="https://nextcloud.com/yourdata">
			{{ t('privacy', 'Learn more ↗') }}
		</a>
	</NcSettingsSection>
</template>

<script>
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'

export default {
	name: 'Manifesto',

	components: {
		NcSettingsSection,
	},

	inject: [
		't',
	],
}
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
