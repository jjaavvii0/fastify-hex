import { CreateUserParams, PublicUser, User } from "./User";

export interface IUserRepository {
    create(user: CreateUserParams): Promise<PublicUser>;
    findById(id: number): Promise<PublicUser | null>;
    findAll(): Promise<PublicUser[]>;
    // update(id: number, user: Partial<User>): Promise<User>;
    // delete(id: number): Promise<void>;
}
