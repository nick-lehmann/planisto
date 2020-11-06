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
            entities: [Course, Degree, Department, Faculty, Module, Offer, Period, Student, University]
        }),
        CoursesModule,
        ModulesModule,
        OfferModule,
        SemesterModule
    ],
    controllers: [
        CoursesController,
        ModulesController
    ],
    providers: [
        ModulesService,
        CoursesService, OfferService
    ],
})
export class AppModule {
}
