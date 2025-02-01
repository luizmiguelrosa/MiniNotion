import { Document, ObjectId } from "mongoose";
import { ElementsDTO } from "src/dtos/elements.dto";

export interface Page extends Document {
    readonly _id: ObjectId;
    readonly name: string;
    readonly parentPage: ObjectId;
    content: ElementsDTO[];
}
