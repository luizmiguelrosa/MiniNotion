import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type PageDocument = HydratedDocument<Page>;

class Element {
    @Prop({ type: Types.ObjectId })
    _id: Types.ObjectId;

    @Prop()
    type: string;

    @Prop()
    text: string;

    @Prop()
    level: number;
}

@Schema()
export class Page {
    @Prop({ type: Types.ObjectId, required: true })
    userID: Types.ObjectId;

    @Prop({ type: String, required: true })
    name: string;

    @Prop()
    parentPage: Types.ObjectId;

    @Prop({ type: [Element], default: [] })
    content: Element[];
}

export const PageSchema = SchemaFactory.createForClass(Page);
