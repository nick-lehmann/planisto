import { Module } from '@nestjs/common';
import { RoadmapsController } from './roadmaps.controller.js';
import { RoadmapsService } from './roadmaps.service.js';

@Module({
	providers: [RoadmapsService],
	controllers: [RoadmapsController]
})
export class RoadmapsModule {}
