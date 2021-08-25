import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { University } from '@planisto/university';
import { UniversityService } from './university.service.js';

@Crud({
	model: { type: University }
})
@Controller('university')
export class UniversityController {
	constructor(private service: UniversityService) {}
}
