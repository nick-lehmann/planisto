import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

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
		origin: '*'
	})

	await app.listen(8000);
}

bootstrap();
