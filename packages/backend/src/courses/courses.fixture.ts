import { Course, Extent } from '@planisto/university';

export const courseFixtures = {
	'CompilerBau': new Course({
		name: 'Compilerbau',
		extent: new Extent({ lecture: 2, exercise: 0, practical: 0 }),
		teachers: ['Prof. Castrillon-Mazo'],
		institute: '',
		exam: 'P(s)',
		master: true
	}),
	'DIA': new Course({
		name: 'Datenintegration und -analyse ',
		extent: new Extent({ lecture: 2, exercise: 2, practical: 0 }),
		teachers: ['Prof. Lehner', 'Dr. Hartmann'],
		institute: '',
		exam: 'P(m)',
		master: true
	})
};