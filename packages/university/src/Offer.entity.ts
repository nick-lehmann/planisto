import {BaseEntity, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn} from "typeorm";
import {Course} from "./Course.entity";
import {Period} from "./Period.entitiy";

@Entity()
export class Offer extends BaseEntity {
    @ManyToOne(type => Course, course => course.offers, { nullable: false })
    @JoinColumn({ referencedColumnName: 'name' })
    @PrimaryColumn({ type: 'varchar', length: 255 })
    course: Course

    @ManyToOne(type => Period, semester => semester.offers, { nullable: false })
    @JoinColumn()
    @PrimaryColumn({ type: 'integer'})
    semester: Period
}