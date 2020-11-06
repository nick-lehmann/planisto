import { Controller, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import { Course } from '@planisto/university';
import { CoursesService } from './courses.service';
import {ApiTags} from "@nestjs/swagger";

@Crud({
    model: { type: Course }
})
@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
    constructor(private service: CoursesService) {}
}
