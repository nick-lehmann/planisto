import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Faculty } from './Faculty.entity.js';

@Entity()
export class Department {
	@PrimaryColumn({ type: 'varchar', length: 255 })
	name: string;

	@ManyToOne((type) => Faculty, (faculty) => faculty.departments)
	@JoinColumn()
	@PrimaryColumn({ type: 'integer' })
	faculty?: Faculty;

	// courses: Course[]

	constructor(init: Department) {
		Object.assign(this, init);
	}
}
