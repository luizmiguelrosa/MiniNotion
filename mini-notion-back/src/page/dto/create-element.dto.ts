import { IsNotEmpty, IsString, IsOptional, IsNumber } from "class-validator";

export class CreateElementDTO {
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
