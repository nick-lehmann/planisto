import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Course } from '@planisto/university';
import { CoursesService } from './courses.service';
import { ApiTags } from '@nestjs/swagger';

@Crud({
	model: { type: Course },
	params: {
		'name': {
			field: 'name',
			type: 'string',
			primary: true
		}
	}
})
@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
	constructor(private service: CoursesService) {
	}
}
