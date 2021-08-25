import { Module } from '@nestjs/common';
import { PeriodController } from './period.controller.js';
import { PeriodService } from './period.service.js';

@Module({
	controllers: [PeriodController],
	providers: [PeriodService]
})
export class PeriodModule {}
