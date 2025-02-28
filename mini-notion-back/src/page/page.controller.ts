import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from "@nestjs/common";
import { PageService } from "./page.service";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { CreateElementDTO } from "./dto/create-element.dto";
import { Page } from "./entities/page.entity";
import { Types } from "mongoose";
import { UpdateElementDTO } from "./dto/update-element.dto";
import { AuthGuard } from "src/auth/auth.guard";

@UseGuards(AuthGuard)
@Controller("page")
export class PageController {
    constructor(private readonly pageService: PageService) {}

    @Post()
    async create(@Request() request, @Body() newPage: CreatePageDto): Promise<Page> {
        return this.pageService.create(newPage, request.user.sub);
    }

    @Post("/:id/:position")
    async createElementInPage(
        @Request() request,
        @Param("id") id: string,
        @Param("position") position: number,
        @Body() newElement: CreateElementDTO,
    ): Promise<Page> {
        return this.pageService.createElementInPage(
            request.user.sub,
            id,
            position,
            newElement,
        );
    }

    @Get()
    async findAll(@Request() request): Promise<Page[]> {
        return this.pageService.findAll(request.user.sub);
    }

    @Get(":id")
    async findOne(@Request() request, @Param("id") id: string): Promise<Page> {
        return this.pageService.findOne(request.user.sub, id);
    }

    @Patch(":id")
    async update(
        @Request() request,
        @Param("id") id: string,
        @Body() newPage: UpdatePageDto,
    ): Promise<Page> {
        return this.pageService.update(request.user.sub, id, newPage);
    }

    @Patch(":id/:elementID")
    async updateElementInPage(
        @Request() request,
        @Param("id") id: string,
        @Param("elementID") elementID: Types.ObjectId,
        @Body() newPage: UpdateElementDTO,
    ): Promise<Page> {
        return this.pageService.updateElementInPage(
            request.user.sub,
            id,
            elementID,
            newPage,
        );
    }

    @Delete(":id")
    async remove(@Param("id") id: string): Promise<Page> {
        return this.pageService.remove(id);
    }

    @Delete(":id/:elementID")
    async removeElementInPage(
        @Request() request,
        @Param("id") id: string,
        @Param("elementID") elementID: Types.ObjectId,
    ): Promise<Page> {
        return this.pageService.removeElementInPage(
            request.user.sub,
            id,
            elementID,
        );
    }
}
