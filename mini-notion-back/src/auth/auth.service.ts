import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { ObjectId } from "mongoose";
import { CreateUserDto } from "src/users/dto/create-user.dto";

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    async signIn(username: string, password: string): Promise<{ access_token: string, userID: ObjectId }> {
        const user = await this.usersService.findByUsername(username);
        if (!user) throw new BadRequestException("Non-Existing Username");

        if (!(await bcrypt.compare(password, user.password)))
            throw new UnauthorizedException("Password Incorrect");

        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            userID: user._id,
        };
    }

    async register(registerDTO: CreateUserDto): Promise<{ access_token: string, userID: ObjectId }> {
        const user = await this.usersService.create(registerDTO);

        const payload = { sub: user._id, username: user.username };
        return {
            access_token: await this.jwtService.signAsync(payload),
            userID: user._id,
        };
    }
}
