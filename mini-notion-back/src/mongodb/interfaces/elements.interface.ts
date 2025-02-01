import { Document, ObjectId } from "mongoose";

export interface Elements extends Document {
    readonly _id: ObjectId;
    readonly type: string;
    readonly text: string;
    readonly level: number;
}
