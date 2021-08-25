import { Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Department } from './Department.entity.js';

@Entity()
export class Faculty {
	@PrimaryColumn({ type: 'varchar', length: 255 })
	name: string;

	@ManyToOne((type) => Department, (department) => department.faculty)
	departments: Department[];

	constructor(init: Faculty) {
		Object.assign(this, init);
	}
}
