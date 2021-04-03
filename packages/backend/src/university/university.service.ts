import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { University } from '@planisto/university/src';
import { Connection } from 'typeorm';

@Injectable()
export class UniversityService extends TypeOrmCrudService<University> {
	constructor(private connection: Connection) {
		super(connection.getRepository<University>(University));
	}
}
