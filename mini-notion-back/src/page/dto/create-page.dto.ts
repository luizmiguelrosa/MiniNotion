import { IsNotEmpty, IsString, MinLength, MaxLength, IsOptional } from "class-validator";
import { ObjectId } from "mongoose";

export class CreatePageDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly parentPage?: ObjectId;
}
