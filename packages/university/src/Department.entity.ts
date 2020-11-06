import type { Course } from "./Course.entity"
import {Entity, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Faculty} from "./Faculty.entity";

@Entity()
export class Department {
    @PrimaryColumn({ type: 'varchar' })
    name: string
    //
    // @ManyToOne(type => Faculty, faculty => faculty.departments)
    // @JoinColumn()
    // @PrimaryColumn()
    // faculty: Faculty
    //
    // courses: Course[]
}