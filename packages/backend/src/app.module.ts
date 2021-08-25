import { Module as NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
	Course,
	Degree,
	Department,
	Faculty,
	Module,
	Offer,
	Period,
	Student,
	University
} from '@planisto/university';
import { Connection } from 'typeorm';
import {
	CoursesController,
	coursesFixtures,
	CoursesModule,
	CoursesService
} from './courses/index.js';
import { DegreeModule as DegreesModule, degreesFixtures } from './degrees/index.js';
import { loadFixtures, TypeormFixture } from './helpers/index.js';
import {
	moduleFixtures,
	ModulesController,
	ModulesModule,
	ModulesService
} from './modules/index.js';
import { offersFixtures, OffersModule, OffersService } from './offers/index.js';
import { periodFixture, PeriodModule } from './period/index.js';
import { SemesterModule } from './semester/index.js';
import { universityFixture } from './university/index.js';

export const ALL_ENTITIES = [
	Course,
	Degree,
	Department,
	Faculty,
	Module,
	Offer,
	Period,
	Student,
	University
];

@NestModule({
	imports: [
		TypeOrmModule.forRoot({
			type: 'postgres',
			host: 'localhost',
			port: 5432,
			username: 'planisto',
			password: 'very_secret',
			database: 'planisto',
			synchronize: true,
			entities: ALL_ENTITIES,
			logging: 'all'
		}),
		CoursesModule,
		ModulesModule,
		OffersModule,
		SemesterModule,
		DegreesModule,
		PeriodModule
	],
	controllers: [CoursesController, ModulesController],
	providers: [ModulesService, CoursesService, OffersService]
})
export class AppModule {
	constructor(private connection: Connection) {}

	async onModuleInit() {
		const fixtures: TypeormFixture<unknown>[] = [
			{
				entity: University,
				fixture: universityFixture
			},
			{
				entity: Period,
				fixture: periodFixture
			},
			{
				entity: Degree,
				fixture: degreesFixtures
			},
			{
				entity: Module,
				fixture: moduleFixtures
			},
			{
				entity: Course,
				fixture: coursesFixtures
			},
			{
				entity: Offer,
				fixture: offersFixtures
			}
		];

		await loadFixtures(fixtures, this.connection);

		console.debug(`IDs of offers: ${offersFixtures.map((offer) => offer.id)}`);
	}
}
