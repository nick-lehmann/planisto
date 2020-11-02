import type { Module } from './Module'
import { Extent } from './Extent'

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
export class Course {
    name: string
    extent: Extent
    teachers: string[]
    institute: string
    exam: string
    master: boolean
    possibleModules: Module[]
    languages: string[]

    // Student can indicate if he/she likes this course
    // Information can be used for basic bookmarks but also for automatic planning
    favorite: boolean = false

    constructor(init: Partial<Course>) { Object.assign(this, init)}
}

export function totalExtentOfCourses(courses: Course[]) {
    return courses.reduce((acc, course) => acc.add(course.extent), new Extent())
}