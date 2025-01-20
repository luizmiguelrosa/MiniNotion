import { Schema } from "mongoose";
import { ElementsSchema } from "./elements.schema";

export const PagesSchema = new Schema({
    name: String,
    parentPage: String,
    content: [ElementsSchema],
});
