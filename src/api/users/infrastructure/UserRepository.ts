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

    async update(user: Partial<User>): Promise<PublicUser | null> {
        if (!user.id) return null;
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
                ...(user.email && { email: user.email }),
                ...(user.password && { password: user.password }),
                ...(user.name && { name: user.name }),
                ...(user.profilePicture && {
                    profilePicture: user.profilePicture,
                }),
                ...(user.roles && { roles: user.roles }),
            },
        });
        const { password, ...publicUser } = updatedUser;
        return publicUser;
    },

    async delete(id: number): Promise<string> {
        const deletedUser = await prisma.user.delete({ where: { id } });
        return `User deleted: ${deletedUser.id}`;
    },
    async uploadProfileImg(idUser: number, filePath: string): Promise<PublicUser> {
        const updatedUser = await prisma.user.update({
            where: { id: idUser },
            data: { profilePicture: filePath },
        });
        const { password, ...publicUser } = updatedUser;
        return publicUser;
    },
};
