import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";

const prisma = new PrismaClient();

export const userRepository: IUserRepository = {
    async create(user: Omit<User, "id">): Promise<User> {
        const newUser = await prisma.user.create({
            data: { email: user.email, name: user.name },
        });
        return {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name ?? undefined,
        };
    },

    async findById(id: number): Promise<User | null> {
        const user = await prisma.user.findUnique({ where: { id } });
        return user
            ? { id: user.id, email: user.email, name: user.name ?? undefined }
            : null;
    },

    async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users.map((user) => ({
            id: user.id,
            email: user.email,
            name: user.name ?? undefined,
        }));
    },

    //TODO
};
