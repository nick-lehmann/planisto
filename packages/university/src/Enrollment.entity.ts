import {BaseEntity, Entity, ManyToOne, PrimaryColumn} from "typeorm";
import {Degree} from "./Degree.entity";
import {Student} from "./Student.entity";

// @Entity()
// export class Enrollment extends BaseEntity {
//     @ManyToOne(type => Degree, degree => degree.enrollments, { nullable: false})
//     @PrimaryColumn()
//     degree: Degree
//
//     @ManyToOne(type => Student)
//     student: Student
// }