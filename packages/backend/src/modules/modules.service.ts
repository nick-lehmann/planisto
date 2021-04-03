import { Injectable } from '@nestjs/common';
import { Module } from '@planisto/university';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Connection } from 'typeorm';

@Injectable()
export class ModulesService extends TypeOrmCrudService<Module> {
	constructor(private connection: Connection) {
		super(connection.getRepository<Module>(Module));
	}
}
