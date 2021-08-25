import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Course } from '@planisto/university';
import { CoursesService } from './courses.service.js';

@Crud({
	model: { type: Course },
	params: {
		name: {
			field: 'name',
			type: 'string',
			primary: true
		}
	}
})
@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
	constructor(private service: CoursesService) {}
}
