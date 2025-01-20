import { Module } from "@nestjs/common";
import { PageController } from "./controllers/page/page.controller";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { PageService } from "./services/page/page.service";
import { PageRepository } from "./mongodb/repository/page.repository";
import { PagesSchema } from "./mongodb/schemas/pages.schema";
import { ConfigModule, ConfigService } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),

        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (
                configService: ConfigService,
            ): Promise<MongooseModuleOptions> => {
                const user = configService.get<string>("MONGO_USER");
                const password = configService.get<string>("MONGO_PASSWORD");
                const host = configService.get<string>("MONGO_HOST");
                const port = configService.get<string>("MONGO_PORT");
                const database = configService.get<string>("MONGO_DATABASE");
                const authSource = configService.get<string>("MONGO_AUTH_SOURCE");

                const credentials = user && password ? `${user}:${password}@` : "";

                console.log(user);
                const uri = `mongodb://${credentials}${host}:${port}/${database}?authSource=${authSource}`;
                return { uri };
            },
            inject: [ConfigService],
        }),

        MongooseModule.forFeature([{ name: "page", schema: PagesSchema }]),
    ],
    controllers: [PageController],
    providers: [PageService, PageRepository],
})
export class AppModule {}
