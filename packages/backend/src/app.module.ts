import { Module as NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { ModulesService } from './modules/modules.service';
import { CoursesService } from './courses/courses.service';
import { CoursesController } from './courses/courses.controller';
import { ModulesController } from './modules/modules.controller';
import { OfferService } from './offer/offer.service';
import { Course, Degree, Department, Faculty, Module, Offer, Semester, Student, University} from "@planisto/university";

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
      entities: [Course, Degree, Department, Faculty, Module, Offer, Semester, Student, University]
    })
  ],
  controllers: [
    AppController, 
    CoursesController, 
    ModulesController
  ],
  providers: [
    AppService, 
    ModulesService, 
    CoursesService, OfferService
  ],
})
export class AppModule {}
