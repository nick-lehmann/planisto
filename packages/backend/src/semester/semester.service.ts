import { Injectable } from '@nestjs/common';
import {Period} from '@planisto/university'
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm'
// @ts-ignore
import {Connection} from "typeorm";

@Injectable()
export class SemesterService extends TypeOrmCrudService<Period> {
    constructor(private connection: Connection) {
        super(connection.getRepository<Period>(Period))
    }
}
