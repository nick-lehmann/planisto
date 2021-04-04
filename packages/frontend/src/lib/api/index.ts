import { ApiResource } from './resource';
import { Course, Degree, Module, Offer } from '@planisto/university';

class API {
	constructor(
		public courses = new ApiResource<Course>('courses', Course),
		public modules = new ApiResource<Module>('modules', Module),
		public offers = new ApiResource<Offer>('offers', Offer),
		public degrees = new ApiResource<Degree>('degrees', Degree)
	) {
	}
}

export const api = new API();