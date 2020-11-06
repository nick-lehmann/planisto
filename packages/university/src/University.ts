import {Course} from "./Course.entity";
import {Module} from "./Module.entity";
import {Entity, PrimaryColumn} from "typeorm";

@Entity()
export class University {
    @PrimaryColumn({ type: 'varchar', length: 255})
    name: string

    courses: Course[]
    modules: Module[]

    // constructor(courses: Course[]) {
        // this.courses = courses
        // this.modules = uniqueModules(courses)
    // }

    /**
     * Moves a course to a new module if the move is valid.
     * 
     * @param course 
     * @param to 
     */
    moveCourse(course: Course, to: Module) {
        if (!to.acceptsCourse(course)) return
        const oldModule = this.moduleByCourse(course)
        if (oldModule != null)
            oldModule.removeCourse(course)
        to.addCourse(course)
    }

    /**
     * Return the module that currently contains the given course. 
     * 
     * @param course 
     */
    moduleByCourse(course: Course): Module | null {
        for (const module of this.modules)
            if (module.courses.indexOf(course) >= 0)
                return module
        return null
    }
}


/**
 * Returns a set of unique module names from the
 * given list of courses.
 * 
 * @param {Array} courses 
 */
function uniqueModules(courses: Course[]): Module[] {
    const modules = {}

    for (const rawCourse of courses) {
        const course = new Course(rawCourse)
        for (const rawModule of course.possibleModules) {
            // if (!(rawModule.name in modules))
            //     modules[rawModule.name] = new Module(rawModule)
            // modules[rawModule.name].courses.push()
        }
    }
    return Object.values(modules)
}
