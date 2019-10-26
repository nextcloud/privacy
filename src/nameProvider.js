import { getData, getName } from 'country-list'

export function getCountryList() {
	return getData().map(country => {
		return {
			code: country.code,
			label: t('privacy', country.name)
		}
	}).sort((a, b) => a.label < b.label ? -1 : 1)
}

export function getNameForCountryCode(code) {
	const name = getName(code)
	if (name) {
		return t('privacy', name)
	}
	return ''
}
