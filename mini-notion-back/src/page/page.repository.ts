import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Page } from "./entities/page.entity";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";

@Injectable()
export class PageRepository {
    constructor(
        @InjectModel(Page.name) private readonly pageModel: Model<Page>,
    ) {}

    async create(newPage: CreatePageDto): Promise<Page> {
        const savePage = new this.pageModel(newPage);
        return await savePage.save();
    }

    async findAll(): Promise<Page[]> {
        return await this.pageModel.find({}, { content: false, __v: false });
    }

    async findOne(id: string): Promise<Page> {
        return await this.pageModel.findById(id, { __v: false });
    }

    async update(id: string, newPage: UpdatePageDto): Promise<Page> {
        return await this.pageModel
            .findByIdAndUpdate(id, newPage, {
                new: true,
                useFindAndModify: false,
            })
            .select("-__v");
    }

    async delete(id: string): Promise<Page> {
        return await this.pageModel.findByIdAndDelete(id);
    }
}
