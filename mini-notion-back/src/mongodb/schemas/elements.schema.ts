import { Schema } from "mongoose";

export const ElementsSchema = new Schema({
    type: String,
    text: String,
    level: Number,
});
