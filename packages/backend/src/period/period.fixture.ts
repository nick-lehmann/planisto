import { Period } from '@planisto/university';
import { TUDresden } from '../university/university.fixture';

export const periodFixture = {
	'summer2020': new Period({
		name: 'Sommersemester 2020',
		start: new Date(2020, 4, 1),
		end: new Date(2020, 9, 30),
		university: TUDresden
	}),
	'winter2020/21': new Period({
		name: 'Wintersemester 2020/21',
		start: new Date(2020, 10, 1),
		end: new Date(2021, 3, 31),
		university: TUDresden
	})
};