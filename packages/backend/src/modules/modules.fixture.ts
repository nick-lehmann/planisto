import { Extent, Module } from '@planisto/university';
import type { ObjectFixture } from '../helpers/index.js';

export const moduleFixtures: ObjectFixture<Module> = {
	vertiefung: new Module({
		name: 'Vertiefung',
		code: 'INF-B-510',
		extent: new Extent({
			lecture: 4,
			practical: 4,
			exercise: 4
		}),
		mandatory: true
	}),
	spezialisierung: new Module({
		name: 'Spezialisierung',
		code: 'INF-B-520',
		extent: new Extent({
			lecture: 4,
			practical: 4,
			exercise: 4
		}),
		mandatory: true
	})
};
