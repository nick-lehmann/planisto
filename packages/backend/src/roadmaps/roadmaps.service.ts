import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Roadmap } from '@planisto/university';
import { Connection } from 'typeorm';

@Injectable()
export class RoadmapsService extends TypeOrmCrudService<Roadmap> {
	constructor(private connection: Connection) {
		super(connection.getRepository<Roadmap>(Roadmap));
	}
}
