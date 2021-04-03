import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import {Degree} from '@planisto/university';
import {ApiTags} from "@nestjs/swagger";
import {DegreeService} from "./degree.service";

@Crud({
    model: { type: Degree }
})
@ApiTags('Degrees')
@Controller('degrees')
export class DegreeController {
    constructor(private service: DegreeService) {}
}
