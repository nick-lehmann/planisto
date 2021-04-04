import { writable } from 'svelte/store'

const availableLanguages = [{
	name: 'German',
	value: 'de'
}, {
	name: 'English',
	value: 'en'
}];

export const languages = writable(availableLanguages)