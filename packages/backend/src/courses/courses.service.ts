import { Injectable } from '@nestjs/common';
import { Course } from '@planisto/university';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class CoursesService extends TypeOrmCrudService<Course> {
	constructor(private connection: Connection) {
		super(connection.getRepository<Course>(Course));
	}
}
