import { Module } from '@nestjs/common';
import { ModulesController } from './modules.controller.js';
import { ModulesService } from './modules.service.js';

@Module({
	providers: [ModulesService],
	controllers: [ModulesController]
})
export class ModulesModule {}
