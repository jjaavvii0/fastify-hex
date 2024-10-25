import { User } from "./User";

export interface IUserRepository {
    create(user: Omit<User, "id">): Promise<User>;
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    // update(id: number, user: Partial<User>): Promise<User>;
    // delete(id: number): Promise<void>;
}
