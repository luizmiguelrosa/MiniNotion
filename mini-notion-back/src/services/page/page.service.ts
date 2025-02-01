import { BadRequestException, Injectable } from "@nestjs/common";
import { ElementsDTO } from "src/dtos/elements.dto";
import { PageDTO } from "src/dtos/pages.dto";
import { Page } from "src/mongodb/interfaces/page.interface";
import { PageRepository } from "src/mongodb/repository/page.repository";

@Injectable()
export class PageService {
    constructor(private readonly pageRepository: PageRepository) {}

    async isPageExists(pageID: string): Promise<Page> {
        try {
            const pageExists = await this.pageRepository.getPageById(pageID);
            return pageExists;
        } catch (error) {
            throw new BadRequestException("Page ID not exists");
        }
    }

    async createPage(newPage: PageDTO): Promise<Page> {
        return await this.pageRepository.createPage(newPage);
    }

    async createElement(pageID: string, position: number, newElement: ElementsDTO): Promise<Page> {
        const page = this.getPageById(pageID);
        if (position == -1) (await page).content.push(newElement);
        else (await page).content.splice(position, 0, newElement);
        console.log((await page).content);
        return await this.pageRepository.updatePageById(pageID, await page);
    }

    async getAllPages(): Promise<Page[]> {
        return await this.pageRepository.getAllPages();
    }

    async getPageById(pageID: string): Promise<Page> {
        const pageExists = await this.isPageExists(pageID);
        return pageExists;
    }

    async updatePageById(pageID: string, newPage: PageDTO): Promise<Page> {
        await this.isPageExists(pageID);
        return await this.pageRepository.updatePageById(pageID, newPage);
    }

    async updateElementById(pageID: string, elementID: string, newElement: ElementsDTO): Promise<Page> {
        const page = this.getPageById(pageID);
        const index = (await page).content.findIndex(
            (element) => element._id == elementID,
        );

        if (index < 0) throw new BadRequestException("Element ID not exists");

        (await page).content[index] = newElement;

        return await this.pageRepository.updatePageById(pageID, await page);
    }

    async deleteElementById(pageID: string, elementID: string): Promise<Page> {
        const page = this.getPageById(pageID);
        const index = (await page).content.findIndex(
            (element) => element._id == elementID,
        );

        if (index < 0) throw new BadRequestException("Element ID not exists");

        const updatedElements = [...(await page).content];
        updatedElements.splice(index, 1);

        (await page).content = updatedElements;

        return await this.pageRepository.updatePageById(pageID, await page);
    }

    async deletePageById(pageID: string): Promise<Page> {
        await this.isPageExists(pageID);
        return await this.pageRepository.deletePageById(pageID);
    }
}
