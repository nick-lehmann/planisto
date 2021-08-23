import { Module } from '@nestjs/common';
import { DegreesController } from './degrees.controller';
import { DegreesService } from './degrees.service';

@Module({
	controllers: [DegreesController],
	providers: [DegreesService]
})
export class DegreeModule {}
