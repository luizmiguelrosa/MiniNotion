import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { PageService } from "./page.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { CreateElementDTO } from "./dto/create-element.dto";
import { Page } from "./entities/page.entity";
import { Types } from "mongoose";
import { UpdateElementDTO } from "./dto/update-element.dto";

@Controller("page")
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Post()
    async create(@Body() newPage: CreatePageDto): Promise<Page> {
        return this.pageService.create(newPage);
    }

    @Post("/:id/:position")
    async createElementInPage(@Param("id") id: string, @Param("position") position: number, @Body() newElement: CreateElementDTO): Promise<Page> {
        return this.pageService.createElementInPage(id, position, newElement);
    }

    @Get()
    async findAll(): Promise<Page[]> {
        return this.pageService.findAll();
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<Page> {
        return this.pageService.findOne(id);
    }

    @Patch(":id")
    async update(@Param("id") id: string, @Body() newPage: UpdatePageDto): Promise<Page> {
        return this.pageService.update(id, newPage);
    }

    @Patch(":id/:elementID")
    async updateElementInPage(@Param("id") id: string, @Param("elementID") elementID: Types.ObjectId, @Body() newPage: UpdateElementDTO): Promise<Page> {
        return this.pageService.updateElementInPage(id, elementID, newPage);
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<Page> {
        return this.pageService.remove(id);
    }

    @Delete(":id/:elementID")
    async removeElementInPage(@Param("id") id: string, @Param("elementID") elementID: Types.ObjectId): Promise<Page> {
        return this.pageService.removeElementInPage(id, elementID);
    }
}
