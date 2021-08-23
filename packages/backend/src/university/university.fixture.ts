import { University } from '@planisto/university';
import type { ObjectFixture } from '../helpers';

export const TUDresden = new University({
	name: 'Technische Universität Dresden'
});

export const universityFixture: ObjectFixture<University> = {
	'tu-dresden': TUDresden
};
