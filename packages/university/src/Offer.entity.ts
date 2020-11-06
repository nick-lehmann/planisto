import {BaseEntity, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Course} from "./Course.entity";
import {Semester} from "./Semester.entity";

@Entity()
export class Offer extends BaseEntity {
    @ManyToOne(type => Course, course => course.offers, { nullable: false })
    @JoinColumn({ referencedColumnName: 'name' })
    @PrimaryColumn({ type: 'varchar', length: 255 })
    course: Course

    @ManyToOne(type => Semester, semester => semester.offers, { nullable: false })
    @JoinColumn({ referencedColumnName: 'id'})
    @PrimaryColumn({ type: 'integer'})
    semester: Semester
}