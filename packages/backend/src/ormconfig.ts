import { ALL_ENTITIES } from '@planisto/university';
import type { ConnectionOptions } from 'typeorm';

const config: ConnectionOptions = {
	type: 'postgres',
	host: 'localhost',
	port: 5433,
	database: 'planisto',
	username: 'planisto',
	password: 'very_secret',
	synchronize: true,
	migrationsRun: false,
	entities: ALL_ENTITIES
};

export default config;
