import { Module } from '@nestjs/common';
import { UniversityController } from './university.controller.js';
import { UniversityService } from './university.service.js';

@Module({
	controllers: [UniversityController],
	providers: [UniversityService]
})
export class UniversityModule {}
