import { InjectModel } from "@nestjs/mongoose";
import { User } from "./entities/user.entity";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";

export class UserRepository {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
    ) {}

    async create(newUser: CreateUserDto): Promise<User> {
        const saveUser = new this.userModel(newUser);
        return await saveUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find({}, { __v: false });
    }

    async findOne(id: string) {
        return await this.userModel.findById(id, { __v: false });
    }

    async findByUsername(username: string): Promise<User> {
        return (
            await this.userModel
                .find({ username: username }, { __v: false })
                .exec()
        )[0];
    }

    async findByEmail(email: string): Promise<User> {
        return (
            await this.userModel.find({ email: email }, { __v: false }).exec()
        )[0];
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`;
    }

    remove(id: number) {
        return `This action removes a #${id} user`;
    }
}
