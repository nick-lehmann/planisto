import { Degree } from '@planisto/university';

export const bachelorComputerScience = new Degree({
	name: 'Bachelor Informatik',
	totalCredits: 180
});

export const masterComputerScience = new Degree({
	name: 'Master Informatik',
	totalCredits: 120,
	requires: bachelorComputerScience
});

export const degreesFixtures = [bachelorComputerScience, masterComputerScience];
