import { Module } from '@nestjs/common';
import { DegreesController } from './degrees.controller.js';
import { DegreesService } from './degrees.service.js';

@Module({
	controllers: [DegreesController],
	providers: [DegreesService]
})
export class DegreeModule {}
