import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserRepository } from "./users.repository";
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
    constructor(private readonly userRepository: UserRepository) {}

    async create(newUser: CreateUserDto): Promise<User> {
        if (await this.findByUsername(newUser.username))
            throw new BadRequestException("Username already exists");

        if (await this.findByEmail(newUser.email))
            throw new BadRequestException("Email already used");

        return await this.userRepository.create(newUser);
    }

    async findAll(): Promise<User[]> {
        const users = await this.userRepository.findAll();

        return users;
    }

    async findOne(id: string): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async findByUsername(username: string): Promise<User> {
        return await this.userRepository.findByUsername(username);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.userRepository.findByEmail(email);
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
