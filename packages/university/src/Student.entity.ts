import { Column, Entity, PrimaryColumn } from 'typeorm';
// import {Enrollment} from "./Enrollment.entity";

@Entity()
export class Student {
	@PrimaryColumn({ type: 'varchar', length: 255, nullable: false })
	email!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	firstName!: string;

	@Column({ type: 'varchar', length: 100, nullable: false })
	lastName!: string;

	// @ManyToMany('Course', (course: Course) => course.favorites)
	// favoriteCourses: Course[];

	// @OneToMany(type => Enrollment, enrollment => enrollment.student)
	// enrollments: Enrollment[]
}
