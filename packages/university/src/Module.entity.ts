import { Extent } from "./Extent"
import type { ECTSCredits } from "./Degree.entity"
import {Entity, Column, PrimaryColumn, ManyToOne, ManyToMany} from 'typeorm'
import {Degree} from "./Degree.entity";
import {Course, totalExtentOfCourses} from "./Course.entity";

// Examples: INF-B-610
export type ModuleCode = string

export type UniversityItemMeta = {
    catalogUrl: string,
    website: string
}

/**
 * A module is something a student has to do and can contain either one course
 * (typical in the earlier semesters) or has multiple courses to choose
 * from. For the latter, certain requirements have to be met.
 */
@Entity()
export class Module {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 100})
    code: string

    @Column({ type: 'varchar', length: 10 })
    extent: Extent

    @Column({ type: 'boolean' })
    mandatory: boolean

    courses: Course[]
    possibleCourses: Course[]
    // credits: ECTSCredits
    credits: any
    preferredStudySemester?: number

    @ManyToMany(type => Degree, degree => degree.modules)
    degrees: Degree[]
    
    /** 
     * Modules can be nested. The parent is only completed if all children were completed.
     * Example: INF-B-610 AQUA Contains of two parts which are completly seperate 
     */
    parent?: Module = null
    children?: Module[] = []

    constructor(init: Partial<Module>) { 
        Object.assign(this, init) 
        if (!this.courses) this.courses = []
    }
    
    acceptsCourse(course: Course): boolean {
        return course.possibleModules.findIndex(module => module.name == this.name) >= 0
    }

    addCourse(course: Course) {
        this.courses = [...this.courses, course]
    }

    removeCourse(course: Course) {
        const index = this.courses.indexOf(course)
        this.courses.splice(index, 1)
    }
    
    containsCourse(course: Course): boolean {
        return this.courses.findIndex(c => c.name == course.name) > -1
    }

    /**
     * Returns the cumulative hours of work from the currently
     * selected courses.
     */
    get currentExtent(): Extent {
        if (this.children.length > 0)
            return this.children
                .map(childModule => childModule.currentExtent)
                .reduce((x,y) => x.add(y), new Extent())
        return totalExtentOfCourses(this.courses)
    }

    /**
     * Returns if the student has an option to choose here. If the total extent of all possible courses
     * is not bigger than the extent of this module, then the student cannot choose.
     */
    studentCanChoose(): boolean {
        return totalExtentOfCourses(this.possibleCourses).biggerThan(this.extent)
    }

    get completed(): boolean {
        if (this.children.length > 0)
            return this.children.map(childModule => childModule.completed).every(Boolean)
        else
            return this.currentExtent.biggerThan(this.extent)
    }
}