export interface User {
    id: number;
    email: string;
    password: string;
    name?: string;
    profilePicture?:string;
}

export type PublicUser = Omit<User, "password">;