import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Period } from '@planisto/university';
import { SemesterService } from './semester.service.js';

@Crud({
	model: { type: Period }
})
@ApiTags('Semester')
@Controller('semester')
export class SemesterController {
	constructor(private service: SemesterService) {}
}
