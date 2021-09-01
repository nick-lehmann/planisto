import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Period } from '@planisto/university';
import { PeriodService } from './period.service.js';

@Crud({
	model: { type: Period }
})
@ApiTags('Periods')
@Controller('periods')
export class PeriodController {
	constructor(private service: PeriodService) {}
}
