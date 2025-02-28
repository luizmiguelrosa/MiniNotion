import { Controller, Get, Post, Body, Patch, Param, Delete } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { plainToClass } from "class-transformer";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    async create(@Body() newUser: CreateUserDto): Promise<User> {
        return await this.usersService.create(newUser);
    }

    @Get()
    async findAll(): Promise<User[]> {
        const users = await this.usersService.findAll();
        return plainToClass(User, users, { excludeExtraneousValues: true });
    }

    @Get(":id")
    async findOne(@Param("id") id: string): Promise<User> {
        const user = await this.usersService.findOne(id);
        return plainToClass(User, user, { excludeExtraneousValues: true });
    }

    @Patch(":id")
    update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(+id, updateUserDto);
    }

    @Delete(":id")
    remove(@Param("id") id: string) {
        return this.usersService.remove(+id);
    }
}
