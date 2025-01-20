import { IsMongoId, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ObjectId } from "mongoose";

export class ElementsDTO {
    @IsOptional()
    @IsMongoId()
    readonly _id: ObjectId;

    @IsNotEmpty()
    @IsString()
    readonly type: string;

    @IsOptional()
    @IsString()
    readonly text: string;

    @IsOptional()
    @IsNumber()
    readonly level: number;
}
