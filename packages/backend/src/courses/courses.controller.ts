import { Controller, Post } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import { Course } from '@planisto/university';
import { CoursesService } from './courses.service';

// @Crud({
//     model: { type: Course }
// })
@Controller('courses')
export class CoursesController {
    constructor(private service: CoursesService) {}

    @Post('/test')
    async test(): Promise<Course[]> {
        return this.service.getAll()
    }
}
