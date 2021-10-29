import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'reflect-metadata';
import { AppModule } from './app.module.js';

const PORT = 8000;

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const options = new DocumentBuilder()
		.setTitle('Planisto')
		.setDescription('University managements')
		.setVersion('1.0')
		.build();
	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document);

	app.enableCors({
		origin: true,
		credentials: true
	});

	console.log(`Starting backend on port ${PORT}`);
	await app.listen(PORT);
}

bootstrap();
