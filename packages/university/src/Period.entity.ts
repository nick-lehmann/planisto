import {
	Column,
	Entity,
	Index,
	JoinColumn,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn
} from 'typeorm';
import { Offer } from './Offer.entity.js';
import { University } from './University.entity.js';

export enum Season {
	WINTER = 'winter',
	SUMMER = 'summer'
}

/**
 * @example
 * parseSemesterString('Sommersemester 2020')
 * @param raw
 */
export function parseSemesterString(raw: string) {
	// const [ rawSeason, year ] = raw.split(' ')
	//
	// let season
	// if (rawSeason.toLowerCase().includes('sommer'))
	//     season = Season.SUMMER
	// if (rawSeason.toLowerCase().includes('winter'))
	//     season = Season.WINTER
	//
	// return new Period({year, season})
}

export type PeriodID = number;

@Entity()
@Index(['name', 'university'], { unique: true })
export class Period {
	@PrimaryGeneratedColumn()
	id: PeriodID;

	@Column({ type: 'varchar', length: 255, nullable: false })
	name: string;

	@ManyToOne((type) => University, (university) => university.periods, { nullable: false })
	@JoinColumn({ name: 'university' })
	university: University;

	@Column({ type: 'date' }) start: Date;
	@Column({ type: 'date' }) end: Date;

	@OneToMany((type) => Offer, (offer) => offer.period)
	offers?: Offer[];

	constructor(init: Partial<Period>) {
		Object.assign(this, init);
	}

	/**
	 * Returns the weekly working time the university expects you to invest.
	 * The calculation is based on the credits you can earn through the selected modules.
	 */
	getWeeklyWorkingTime?(): number {
		return 0;
	}

	/**
	 * Returns the weekly time you have to spend at the university. This does not include any form
	 * of preparation or self study.
	 */
	getWeeklyUniversityTime?(): number {
		return 0;
		// let total = 0
		// for (const module of this.modules)
		//     for (const course of module.courses)
		//         total += course.extent.total()
		// return total
	}
}

export type StudySemester = number;
