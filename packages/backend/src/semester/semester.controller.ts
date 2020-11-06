import { Controller } from '@nestjs/common';
import {Crud} from "@nestjsx/crud";
import {Period} from "@planisto/university";
import {ApiTags} from "@nestjs/swagger";

@Crud({
    model: { type: Period }
})
@ApiTags('Semester')
@Controller('semester')
export class SemesterController {}
