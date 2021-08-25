import { Module } from '@nestjs/common';
import { SemesterController } from './semester.controller.js';
import { SemesterService } from './semester.service.js';

@Module({
	providers: [SemesterService],
	controllers: [SemesterController]
})
export class SemesterModule {}
