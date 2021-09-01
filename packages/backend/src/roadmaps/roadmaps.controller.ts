import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Roadmap } from '@planisto/university';
import { RoadmapsService } from './roadmaps.service.js';

@Crud({
	model: { type: Roadmap },
	query: {
		join: {
			items: { eager: true },
			'items.course': {
				eager: true,
				allow: ['name']
			},
			'items.period': {
				eager: true,
				allow: ['id']
			}
		}
	}
})
@ApiTags('Roadmaps')
@Controller('roadmaps')
export class RoadmapsController {
	constructor(private service: RoadmapsService) {}
}
