import { IsString, IsOptional, IsNotEmpty, IsNumber } from "class-validator";

export class UpdateElementDTO {
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
