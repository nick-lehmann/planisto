import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from '@nestjsx/crud';
import { Module } from '@planisto/university';
import { ModulesService } from './modules.service.js';

@Crud({
	model: { type: Module }
})
@ApiTags('Modules')
@Controller('modules')
export class ModulesController {
	constructor(private service: ModulesService) {}
}
