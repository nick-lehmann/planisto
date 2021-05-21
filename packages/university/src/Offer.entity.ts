import {BaseEntity, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {Course} from "./Course.entity";
import {Period} from "./Period.entitiy";
import {Module} from "./Module.entity";

@Entity()
@Index(['course', 'period', 'modulee'], {unique: true})
export class Offer extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(type => Course, course => course.offers, { nullable: false })
    @JoinColumn({ referencedColumnName: 'name' })
    course: Course

    @ManyToOne(type => Period, semester => semester.offers, { nullable: false })
    @JoinColumn()
    period: Period

    @ManyToOne(type => Module, {nullable: false})
    @JoinColumn()
    modulee: Module

    constructor(init: Partial<Offer>) {
        super(); Object.assign(this, init)
    }
}