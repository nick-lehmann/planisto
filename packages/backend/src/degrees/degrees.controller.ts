import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Degree } from '@planisto/university';
import { DegreesService } from './degrees.service.js';

@Crud({
	model: { type: Degree }
})
@ApiTags('Degrees')
@Controller('degrees')
export class DegreesController {
	constructor(private service: DegreesService) {}
}
