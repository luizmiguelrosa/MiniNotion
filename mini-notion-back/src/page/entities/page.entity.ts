import { ObjectId } from "mongoose";
import { Element } from "./element.entity";

export class Page {
    readonly userID: ObjectId;
    readonly _id: ObjectId;
    readonly name: string;
    readonly parentPage: ObjectId;
    content: Element[];
}
