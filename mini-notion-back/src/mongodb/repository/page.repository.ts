import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { PageDTO } from "src/dtos/pages.dto";
import { Page } from "../interfaces/page.interface";

@Injectable()
export class PageRepository {
    constructor(@InjectModel("page") private readonly pageModel: Model<Page>) {}

    async createPage(newPage: PageDTO): Promise<Page> {
        const savePage = new this.pageModel(newPage);
        return await savePage.save();
    }

    async getAllPages(): Promise<Page[]> {
        return await this.pageModel.find({}, { __v: false });
    }

    async getPageById(pageID: string): Promise<Page> {
        return await this.pageModel.findById(pageID, { __v: false });
    }

    async updatePageById(pageID: string, newPage: PageDTO): Promise<Page> {
        return await this.pageModel.findByIdAndUpdate(pageID, newPage, {
            new: true,
            useFindAndModify: false,
        });
    }

    async deletePageById(pageID: string): Promise<Page> {
        return await this.pageModel.findByIdAndDelete(pageID);
    }
}
