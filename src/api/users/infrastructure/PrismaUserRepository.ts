import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../domain/IUserRepository";
import { PublicUser, User } from "../domain/User";

const prisma = new PrismaClient();

export const userRepository: IUserRepository = {
    async create(user: Omit<User, "id" | "posts">): Promise<PublicUser> {
        const newUser = await prisma.user.create({
            data: {
                email: user.email,
                password: user.password,
                name: user.name,
                profilePicture: user.profilePicture,
                roles: user.roles,
            },
        });

        const { password, ...publicUser } = newUser;
        return publicUser;
    },

    async findById(id: number): Promise<PublicUser | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        if (!user) return null;

        const { password, ...publicUser } = user;
        return publicUser;
    },

    async findAll(): Promise<PublicUser[]> {
        const users = await prisma.user.findMany();
        return users.map(({ password, ...publicUser }) => publicUser);
    },
};
