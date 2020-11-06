import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn} from "typeorm";
// import {Enrollment} from "./Enrollment.entity";

@Entity()
export class Student extends BaseEntity {
    @PrimaryColumn({ type: 'varchar', length: 255, nullable: false})
    email: string

    @Column({ type: 'varchar', length: 100 })
    firstName: string

    @Column({ type: 'varchar', length: 100 })
    lastName: string

    // @OneToMany(type => Enrollment, enrollment => enrollment.student)
    // enrollments: Enrollment[]
}