import { Expose, Type } from 'class-transformer';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Extent, extentTransformer } from './Extent.js';
import type { Module } from './Module.entity.js';
import { Offer } from './Offer.entity.js';

export const stringListTransformer = {
	to(value: string[]) {
		return value.join('/');
	},
	from(raw: string) {
		return raw.split('/');
	}
};

/**
 * A course is a regular event a student has to attend or can choose to attend.
 *
 * Examples:
 * - Programmierung,
 *   => mandatory as it is the only course in a mandatory module
 * - Mathematik 1 für Informatiker
 *   => mandatory as it is part of a mandatory module (that contains only 2 courses)
 * - Programming for Datascience,
 *   => optional as is is part of both mandatory or optional modules
 */
@Entity()
export class Course {
	@PrimaryColumn({ type: 'varchar', length: 255 })
	name: string;

	@Type(() => Extent)
	@Column({ type: 'varchar', length: 10, transformer: extentTransformer })
	extent: Extent;
	@Expose()
	@Column({ type: 'varchar', length: 255, transformer: stringListTransformer })
	teachers: string[];

	@Column({ type: 'varchar', length: 255 })
	institute: string;

	@Column({ type: 'varchar', length: 255 })
	exam: string;

	possibleModules: Module[];
	languages: string[];

	@OneToMany((type) => Offer, (offer) => offer.course)
	offers: Offer[];

	// Student can indicate if he/she likes this course
	// Information can be used for basic bookmarks but also for automatic planning
	// @ManyToMany('Student', (student: Student) => student.favoriteCourses)
	// favorites: boolean = false;

	constructor(init: Partial<Course>) {
		Object.assign(this, init);
	}
}

export function totalExtentOfCourses(courses: Course[]) {
	return courses.reduce((acc, course) => acc.add(course.extent), new Extent());
}
