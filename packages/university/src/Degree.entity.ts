import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Module } from './Module.entity.js';
import { University } from './University.entity.js';

export type DegreeID = number

/**
 * A programme offered by a university where the student is issued
 * a certificated after successful completion.
 *
 * Example:
 * - Bachelor Informatik
 * - Master Informatik
 */
@Entity()
export class Degree {
  @PrimaryGeneratedColumn() 
  id!: DegreeID
  
	@Column({ type: 'varchar', length: 100, nullable: false })
	name: string;

	// TODO: Add transformer
	@Column({ type: 'varchar', length: 8, nullable: false })
	totalCredits: ECTSCredits;
  
  @ManyToOne(type => University, university => university.degress)
  @JoinColumn({ name: 'universityID' })
  university: University
  
  @Column()
  universityID: number

	@ManyToMany((type) => Module, (module) => module.degrees)
	modules: Module[];

	@ManyToOne((type) => Degree, { nullable: true })
	requires?: Degree | null;

	// enrollments: Enrollment[]

	constructor(init: Partial<Degree>) {
		Object.assign(this, init);
	}

	get currentCredits(): ECTSCredits {
		return this.modules
			.filter((module) => module.completed)
			.reduce((total, module) => module.credits + total, 0);
	}

	get progress(): number {
		return this.currentCredits / this.totalCredits;
	}

	get finished(): boolean {
		return this.modules.every((module) => module.completed);
	}
}

export type ECTSCredits = number;
