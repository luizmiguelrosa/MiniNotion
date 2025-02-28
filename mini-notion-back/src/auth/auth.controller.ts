import { Body, Controller, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDTO } from "./dto/signin-user.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post("login")
    signIn(@Body() signInDTO: SignInDTO) {
        return this.authService.signIn(signInDTO.username, signInDTO.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("register")
    register(@Body() registerDTO: CreateUserDto) {
        return this.authService.register(registerDTO);
    }
}
