import { Department } from "./Department.entity"
import {Entity, ManyToOne, PrimaryColumn} from "typeorm";

@Entity()
export class Faculty {
    @PrimaryColumn({ type: 'varchar', length: 255 })
    name: string
    //
    // @ManyToOne(type => Department, department => department.faculty)
    // departments: Department[]
}