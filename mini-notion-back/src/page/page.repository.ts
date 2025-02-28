import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Page } from "./entities/page.entity";
import { CreatePageDto } from "./dto/create-page.dto";
import { UpdatePageDto } from "./dto/update-page.dto";
import { Types } from "mongoose";

@Injectable()
export class PageRepository {
    constructor(
        @InjectModel(Page.name) private readonly pageModel: Model<Page>,
    ) {}

    async create(newPage: CreatePageDto): Promise<Page> {
        const savePage = new this.pageModel(newPage);
        return await savePage.save();
    }

    async findAll(userID: Types.ObjectId): Promise<Page[]> {
        return await this.pageModel
            .find({ userID: userID }, { content: false, __v: false })
            .exec();
    }

    async findOne(userID: Types.ObjectId, id: string): Promise<Page> {
        return (
            await this.pageModel
                .find({ userID: userID, _id: id }, { __v: false })
                .exec()
        )[0];
    }

    async update(userID: Types.ObjectId, id: string, newPage: UpdatePageDto): Promise<Page> {
        return await this.pageModel
            .findOneAndUpdate({ userID: userID, _id: id }, newPage, {
                new: true,
                useFindAndModify: false,
            })
            .select("-__v");
    }

    async delete(id: string): Promise<Page> {
        return await this.pageModel.findByIdAndDelete(id);
    }
}
