import { Exclude, Expose } from "class-transformer";
import { ObjectId } from "mongoose";

export class User {
    @Exclude()
    readonly _id: ObjectId;

    @Expose()
    username: string;

    @Exclude()
    password: string;

    @Expose()
    name: string;

    @Expose()
    surname: string;

    @Expose()
    email: string;

    constructor(partial: Partial<User>) {
        Object.assign(this, partial);
    }
}
