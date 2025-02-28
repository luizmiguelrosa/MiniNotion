import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { PageRepository } from "./page.repository";
import { Page } from "./entities/page.entity";
import { CreateElementDTO } from "./dto/create-element.dto";
import { UpdateElementDTO } from "./dto/update-element.dto";
import { Types } from "mongoose";

@Injectable()
export class PageService {
    constructor(private readonly pageRepository: PageRepository) {}

    async create(newPageDTO: CreatePageDto, userID: Types.ObjectId): Promise<Page> {
        const newPage = {
            userID: userID,
            ...newPageDTO,
        }
        return this.pageRepository.create(newPage);
    }

    async createElementInPage(userID: Types.ObjectId, id: string, position: number, newElementDTO: CreateElementDTO): Promise<Page> {
        const page = this.findOne(userID, id);
        const newElement = {
            _id: new Types.ObjectId(),
            ...newElementDTO,
        };
        if (position == -1) (await page).content.push(newElement);
        else (await page).content.splice(position, 0, newElement);
        return await this.pageRepository.update(userID, id, await page);
    }

    async findAll(userID: Types.ObjectId): Promise<Page[]> {
        return this.pageRepository.findAll(userID);
    }

    async findOne(userID: Types.ObjectId, id: string): Promise<Page> {
        try {
            return await this.pageRepository.findOne(userID, id);
        } catch (error) {
            throw new BadRequestException("Page ID not exists");
        }
    }

    async update(userID: Types.ObjectId, id: string, newPage: UpdatePageDto): Promise<Page> {
        await this.findOne(userID, id);
        return this.pageRepository.update(userID, id, newPage);
    }

	async updateElementInPage(userID: Types.ObjectId, id: string, elementID: Types.ObjectId, newElementDTO: UpdateElementDTO): Promise<Page> {
        const page = this.findOne(userID, id);
        const index = (await page).content.findIndex(
            (element) => element._id == elementID,
        );

        if (index == -1) throw new BadRequestException("Element ID not exists");

        const newElement = {
            _id: (await page).content[index]._id,
            ...newElementDTO,
        };

        (await page).content[index] = newElement;

        return await this.pageRepository.update(userID, id, await page);
    }

    async remove(id: string): Promise<Page> {
        return await this.pageRepository.delete(id);
    }

    async removeElementInPage(userID: Types.ObjectId, id: string, elementID: Types.ObjectId): Promise<Page> {
        const page = this.findOne(userID, id);
        const index = (await page).content.findIndex(
            (element) => element._id == elementID,
        );

        if (index == -1) throw new BadRequestException("Element ID not exists");

        const updatedElements = [...(await page).content];
        updatedElements.splice(index, 1);

        (await page).content = updatedElements;

        return await this.pageRepository.update(userID, id, await page);
    }
}
