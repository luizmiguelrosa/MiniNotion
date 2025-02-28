import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { PageModule } from "./page/page.module";
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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

                const uri = `mongodb://${credentials}${host}:${port}/${database}?authSource=${authSource}`;
                return { uri };
            },
            inject: [ConfigService],
        }),

        PageModule,

        AuthModule,

        UsersModule,
    ],
})
export class AppModule {}
