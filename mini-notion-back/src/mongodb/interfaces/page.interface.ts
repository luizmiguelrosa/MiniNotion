import { Document, ObjectId } from "mongoose";

export interface Page extends Document {
    readonly _id: ObjectId;
    readonly name: string;
    readonly parentPage: ObjectId;
    readonly content: [];
}
