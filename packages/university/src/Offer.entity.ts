import { Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import type { Course } from './Course.entity.js';
import { Module } from './Module.entity.js';
import { Period } from './Period.entity.js';

@Entity()
@Index(['course', 'period', 'modulee'], { unique: true })
export class Offer {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne('Course', (course: Course) => course.offers, { nullable: false })
	@JoinColumn({ referencedColumnName: 'name' })
	course: Course;

	@ManyToOne((type) => Period, (semester) => semester.offers, { nullable: false })
	@JoinColumn()
	period: Period;

	@ManyToOne((type) => Module, { nullable: false })
	@JoinColumn()
	modulee: Module;

	constructor(init: Partial<Offer>) {
		Object.assign(this, init);
	}
}
