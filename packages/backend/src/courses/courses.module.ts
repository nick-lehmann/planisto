import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller.js';
import { CoursesService } from './courses.service.js';

@Module({
	providers: [CoursesService],
	controllers: [CoursesController]
})
export class CoursesModule {}
