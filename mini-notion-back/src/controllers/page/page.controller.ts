import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { PageDTO } from "src/dtos/pages.dto";
import { Page } from "src/mongodb/interfaces/page.interface";
import { PageService } from "src/services/page/page.service";

@Controller("page")
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Post("create")
    async createPage(@Body() newPage: PageDTO): Promise<Page> {
        return await this.pageService.createPage(newPage);
    }

    @Get("all")
    async getAllPages(): Promise<Page[]> {
        return this.pageService.getAllPages();
    }

    @Get("id/:pageID")
    async getPageById(@Param("pageID") pageID: string): Promise<Page> {
        return await this.pageService.getPageById(pageID);
    }

    @Patch("update/id/:pageID")
    async updatePage(@Param("pageID") pageID: string, @Body() newPage: PageDTO): Promise<Page> {
        return await this.pageService.updatePageById(pageID, newPage);
    }

    @Delete("delete/id/:pageID")
    async deletePageById(@Param("pageID") pageID: string): Promise<Page> {
        return await this.pageService.deletePageById(pageID);
    }
}
