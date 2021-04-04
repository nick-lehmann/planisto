import { writable } from 'svelte/store';
import { Department, Faculty } from '@planisto/university';

export const faculties = writable([
	new Faculty({
		name: 'Informatik', departments: [
			new Department({ name: 'Datenbanken' }),
			new Department({ name: 'Compilerbau' })
		]
	}),
	new Faculty({ name: 'Mathematik', departments: [] })
]);