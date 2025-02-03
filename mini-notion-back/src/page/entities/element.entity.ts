import { Types } from "mongoose";

export class Element {
    readonly _id?: Types.ObjectId;
    readonly type: string;
    readonly text: string;
    readonly level: number;
}