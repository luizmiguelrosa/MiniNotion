import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class SignInDTO {
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly username: string;

    @IsNotEmpty()
    @MinLength(8)
    readonly password: string;
}
