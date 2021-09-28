import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import type { Course } from './Course.entity.js';
import type { Degree } from './Degree.entity.js';
import type { Module } from './Module.entity.js';
import type { Period } from './Period.entity.js';

export type UniversityID = number

@Entity()
export class University {
  @PrimaryGeneratedColumn() 
  id!: UniversityID
  
	@Column({ type: 'varchar', length: 255, nullable: false })
	name!: string;

	courses!: Course[];
	modules!: Module[];

	@OneToMany('Period', (period: Period) => period.university)
	periods?: Period;
  
  @OneToMany('Degree', (degree: Degree) => degree.university)
  degress: Degree

	constructor(init: Partial<University>) {
		Object.assign(this, init);
	}
}
