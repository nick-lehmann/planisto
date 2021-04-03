import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Offer } from '@planisto/university';
import { Connection } from 'typeorm';

@Injectable()
export class OfferService extends TypeOrmCrudService<Offer> {
	constructor(private connection: Connection) {
		super(connection.getRepository<Offer>(Offer));
	}
}
