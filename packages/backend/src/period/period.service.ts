import { Injectable } from '@nestjs/common';
import {TypeOrmCrudService} from "@nestjsx/crud-typeorm";
import {Period} from "@planisto/university";
import {Connection} from "typeorm";

@Injectable()
export class PeriodService extends TypeOrmCrudService<Period> {
    constructor(private connection: Connection) {
        super(connection.getRepository<Period>(Period))
    }
}
