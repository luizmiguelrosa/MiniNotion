import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );

    app.enableCors({
        origin: "http://localhost:5173", // Permite somente o frontend acessar
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
        credentials: true, // Permite cookies/sessões
    });
    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
