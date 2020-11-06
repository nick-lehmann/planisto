import {Column, Entity, Generated, Index, OneToMany, PrimaryColumn} from "typeorm";
import {Offer} from "./Offer.entity";

export enum Season {
    WINTER,
    SUMMER
}

/**
 * @example
 * parseSemesterString('Sommersemester 2020')
 * @param raw
 */
export function parseSemesterString(raw: string) {
    const [ rawSeason, year ] = raw.split(' ')

    let season
    if (rawSeason.toLowerCase().includes('sommer'))
        season = Season.SUMMER
    if (rawSeason.toLowerCase().includes('winter'))
        season = Season.WINTER
    
    return new Semester({year, season})
}

@Entity()
export class Semester {
    @Index({ unique: true})
    @Generated('increment')
    @Column({ type: 'integer', nullable: false})
    id?: number

    @PrimaryColumn({type: "varchar", length: 5, nullable: false})
    year: string

    @PrimaryColumn({ type: "enum", enum: Season, nullable: false})
    season: Season

    @Column({ type: 'date' }) start?: Date
    @Column({ type: 'date' }) end?: Date

    @OneToMany(type => Offer, offer => offer.semester)
    offers?: Offer[]

    constructor(init: Semester) { Object.assign(this, init) }

    /**
     * Returns the weekly working time the university expects you to invest.
     * The calculation is based on the credits you can earn through the selected modules.
     */
    getWeeklyWorkingTime?(): number {
        return 0
    }

    /**
     * Returns the weekly time you have to spend at the university. This does not include any form
     * of preparation or self study.
     */
    getWeeklyUniversityTime?(): number {
        return 0
        // let total = 0
        // for (const module of this.modules)
        //     for (const course of module.courses)
        //         total += course.extent.total()
        // return total
    }
}

export type StudySemester = number