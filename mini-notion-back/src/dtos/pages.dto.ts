import { IsMongoId, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, ValidateNested } from "class-validator";
import { ElementsDTO } from "./elements.dto";
import { Type } from "class-transformer";
import { ObjectId } from "mongoose";

export class PageDTO {
    @IsOptional()
    @IsMongoId()
    readonly _id: ObjectId;

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly parentPage?: ObjectId;

    /*@IsOptional()
    @ValidateNested({ each: true })
    @Type(() => ElementsDTO)
    readonly content?: ElementsDTO[];*/
}
