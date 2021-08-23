import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Degree } from '@planisto/university';
import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DegreesService extends TypeOrmCrudService<Degree> {
	constructor(private connection: Connection) {
		super(connection.getRepository<Degree>(Degree));
	}
}
