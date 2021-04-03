import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { University } from '@planisto/university/src';
import { UniversityService } from './university.service';

@Crud({
	model: { type: University }
})
@Controller('university')
export class UniversityController {
	constructor(private service: UniversityService) {
	}
}
