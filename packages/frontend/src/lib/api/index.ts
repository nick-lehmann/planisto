import { ApiResource } from './resource';
import { Course, Degree, Module, Offer } from '@planisto/university';

class API {
	constructor(
		public courses = new ApiResource<Course>('courses', Course, 'name'),
		public modules = new ApiResource<Module>('modules', Module, 'name'),
		public offers = new ApiResource<Offer>('offers', Offer, 'id'),
		public degrees = new ApiResource<Degree>('degrees', Degree, 'name')
	) {
	}
}

export const api = new API();