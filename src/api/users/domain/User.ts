import { Post } from "../../posts/domain/Post";

export interface User {
    id: number;
    email: string;
    password: string;
    name?: string | null;
    profilePicture?: string | null;
    roles: string[];
    posts?: Post[];
}

export type PublicUser = Omit<User, "password">;
export type CreateUserParams = Omit<User, "id">;
