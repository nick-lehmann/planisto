import { Controller } from '@nestjs/common';
import { Crud } from '@nestjsx/crud'
import { Module } from '@planisto/university';
import {ApiTags} from "@nestjs/swagger";

@Crud({
    model: { type: Module }
})
@ApiTags('Modules')
@Controller('modules')
export class ModulesController {}
