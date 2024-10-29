import { CreateUserParams, PublicUser, User } from "./User";

export interface IUserRepository {
    create(user: CreateUserParams): Promise<PublicUser>;
    findById(id: number): Promise<PublicUser | null>;
    findAll(): Promise<PublicUser[]>;
    update(user: Partial<User>): Promise<PublicUser | null>;
    delete(id: number): Promise<string>;
    uploadProfileImg(idUser: number, filePath: string): Promise<PublicUser | null>;
}
