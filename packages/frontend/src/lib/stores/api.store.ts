import { Course, Module } from '@planisto/university';
import { ApiResource } from '../api';

export class PlanistoAPI {
	courses = new ApiResource<Course>('http://localhost:8000/courses', Course, 'name');
	modules = new ApiResource<Course>('http://localhost:8000/modules', Module, 'name');
}

export const api = new PlanistoAPI();
