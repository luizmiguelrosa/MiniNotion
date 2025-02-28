import { Module } from "@nestjs/common";
import { PageService } from "./page.service";
import { PageController } from "./page.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Page, PageSchema } from "src/page/page.schema";
import { PageRepository } from "./page.repository";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Page.name, schema: PageSchema }]),

        AuthModule,
    ],
    controllers: [PageController],
    providers: [PageService, PageRepository],
})
export class PageModule {}
