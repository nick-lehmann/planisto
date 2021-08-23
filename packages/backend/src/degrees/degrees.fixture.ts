import { Degree } from '@planisto/university';
import type { ObjectFixture } from '../helpers';

const bachelorComputerScience = new Degree({
	name: 'Bachelor Informatik',
	totalCredits: 180
});

const masterComputerScience = new Degree({
	name: 'Master Informatik',
	totalCredits: 120,
	requires: bachelorComputerScience
});

export const degreesFixtures: ObjectFixture<Degree> = {
	bachelorComputerScience,
	masterComputerScience
};
