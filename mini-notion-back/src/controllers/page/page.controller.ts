import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ElementsDTO } from "src/dtos/elements.dto";
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

    @Post("create/:pageID/:position")
    async createElement(@Param("pageID") pageID: string, @Param("position") position: number, @Body() newElement: ElementsDTO): Promise<Page> {
        return await this.pageService.createElement(pageID, position, newElement);
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
    async updatePageById(@Param("pageID") pageID: string, @Body() newPage: PageDTO): Promise<Page> {
        return await this.pageService.updatePageById(pageID, newPage);
    }

    @Patch("update/id/:pageID/:elementID")
    async updateElementById(@Param("pageID") pageID: string, @Param("elementID") elementID: string, @Body() newElement: ElementsDTO): Promise<Page> {
        return await this.pageService.updateElementById(pageID, elementID, newElement);
    }

    @Delete("delete/id/:pageID/:elementID")
    async deleteElementById(@Param("pageID") pageID: string, @Param("elementID") elementID: string): Promise<Page> {
        return await this.pageService.deleteElementById(pageID, elementID);
    }

    @Delete("delete/id/:pageID")
    async deletePageById(@Param("pageID") pageID: string): Promise<Page> {
        return await this.pageService.deletePageById(pageID);
    }
}
