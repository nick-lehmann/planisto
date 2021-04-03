import {Module as NestModule} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm'
import {ModulesService} from './modules/modules.service';
import {CoursesService} from './courses/courses.service';
import {CoursesController} from './courses/courses.controller';
import {ModulesController} from './modules/modules.controller';
import {OfferService} from './offer/offer.service';
import {Course, Degree, Department, Faculty, Module, Offer, Period, Student, University} from "@planisto/university";
import {CoursesModule} from "./courses/courses.module";
import { ModulesModule } from './modules/modules.module';
import { OfferModule } from './offer/offer.module';
import { SemesterModule } from './semester/semester.module';
import {Connection} from "typeorm";
import {periodFixture} from "./period/period.fixture";
import {TUDresden} from "./university/university.fixture";
import {DegreeModule} from "./degree/degree.module";
import {PeriodModule} from "./period/period.module";
import {degreesFixtures} from "./degree/degree.fixture";
import {moduleFixtures} from "./modules/modules.fixture";
import {courseFixtures} from "./courses/courses.fixture";
import {offerFixtures} from "./offer/offer.fixtures";

export const ALL_ENTITIES = [Course, Degree, Department, Faculty, Module, Offer, Period, Student, University]

@NestModule({
    imports: [
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5433,
            username: 'planisto',
            password: 'very_secret',
            database: 'planisto',
            synchronize: true,
            entities: ALL_ENTITIES
        }),
        CoursesModule,
        ModulesModule,
        OfferModule,
        SemesterModule,
        DegreeModule,
        PeriodModule
    ],
    controllers: [
        CoursesController,
        ModulesController
    ],
    providers: [
        ModulesService,
        CoursesService,
        OfferService
    ],
})
export class AppModule {
    constructor(private connection: Connection) {}

    async onModuleInit() {
        try {
            await this.connection.getRepository(University).save(TUDresden)
        } catch(e) {}
        try {
            const result = await this.connection.getRepository(Period).save(Object.values(periodFixture))
            console.log(result)
        } catch(e) {
            console.log(e)
        }
        try {
            await this.connection.getRepository(Degree).save(degreesFixtures)
        } catch(e) {}
        try {
            await this.connection.getRepository(Module).save(Object.values(moduleFixtures))
        } catch(e) { console.log(e)}
        try {
            await this.connection.getRepository(Course).save(Object.values(courseFixtures))
        } catch(e) {console.log(e)}
        try {
            await this.connection.getRepository(Offer).save(offerFixtures)
        } catch(e) { console.log(e)}
    }
}
