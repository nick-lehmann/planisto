import { Course, Extent } from '@planisto/university';
import type { ObjectFixture } from '../helpers/index.js';

const dummyCourses = {};
for (let i = 0; i < 20; i++) {
	dummyCourses[`dummy${i}`] = new Course({
		name: `Dummy ${i}`,
		extent: new Extent({ lecture: 2, exercise: 4, practical: 8 }),
		teachers: ['Max Mustermann'],
		institute: '',
		exam: 'do not care'
	});
}

export const coursesFixtures: ObjectFixture<Course> = {
	CompilerBau: new Course({
		name: 'Compilerbau',
		extent: new Extent({ lecture: 2, exercise: 0, practical: 0 }),
		teachers: ['Prof. Castrillon-Mazo'],
		institute: '',
		exam: 'P(s)'
	}),
	DIA: new Course({
		name: 'Datenintegration und -analyse ',
		extent: new Extent({ lecture: 2, exercise: 2, practical: 0 }),
		teachers: ['Prof. Lehner', 'Dr. Hartmann'],
		institute: '',
		exam: 'P(m)'
	}),
	...dummyCourses
};
