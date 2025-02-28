import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import * as bcrypt from "bcrypt";
import { Transform } from "class-transformer";

export class CreateUserDto {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly username: string;

    @IsNotEmpty()
    @MinLength(8)
    @Transform(({ value }) => bcrypt.hashSync(value, 10), { toClassOnly: true })
    readonly password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(30)
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @MaxLength(50)
    readonly surname: string;

    @IsNotEmpty()
    @IsEmail()
    readonly email: string;
}
