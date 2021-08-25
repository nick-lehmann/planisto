import { Module } from '@nestjs/common';
import { OffersController } from './offers.controller.js';
import { OffersService } from './offers.service.js';

@Module({
	controllers: [OffersController],
	providers: [OffersService]
})
export class OffersModule {}
