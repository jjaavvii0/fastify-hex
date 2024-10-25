export interface User {
    id: number;
    email: string;
    password: string;
    name?: string;
}

export type PublicUser = Omit<User, "password">;