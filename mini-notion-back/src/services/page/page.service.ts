import { BadRequestException, Injectable } from "@nestjs/common";
import { PageDTO } from "src/dtos/pages.dto";
import { Page } from "src/mongodb/interfaces/page.interface";
import { PageRepository } from "src/mongodb/repository/page.repository";

@Injectable()
export class PageService {
    constructor(private readonly pageRepository: PageRepository) {}

    async isPageExists(pageID: string): Promise<Page> {
        return await this.pageRepository.getPageById(pageID);
    }

    async createPage(newPage: PageDTO): Promise<Page> {
        return await this.pageRepository.createPage(newPage);
    }

    async getAllPages(): Promise<Page[]> {
        return await this.pageRepository.getAllPages();
    }

    async getPageById(pageID: string): Promise<Page> {
        const pageExists = await this.isPageExists(pageID);
        if (!pageExists) throw new BadRequestException("Page ID not exists");

        return pageExists;
    }

    async updatePageById(pageID: string, newPage: PageDTO): Promise<Page> {
        const pageExists = await this.isPageExists(pageID);
        if (!pageExists) throw new BadRequestException("Page ID not exists");

        return await this.pageRepository.updatePageById(pageID, newPage);
    }

    async deletePageById(pageID: string): Promise<Page> {
        const pageExists = await this.isPageExists(pageID);
        if (!pageExists) throw new BadRequestException("Page ID not exists");

        return await this.pageRepository.deletePageById(pageID);
    }
}
