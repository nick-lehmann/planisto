import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Degree } from '@planisto/university';
import { ApiTags } from '@nestjs/swagger';
import { DegreesService } from './degrees.service';

@Crud({
	model: { type: Degree }
})
@ApiTags('Degrees')
@Controller('degrees')
export class DegreesController {
	constructor(private service: DegreesService) {}
}
