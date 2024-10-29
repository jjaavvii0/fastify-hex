import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "../domain/IUserRepository";
import { PublicUser, User } from "../domain/User";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

export const userRepository: IUserRepository = {
    async create(user: Omit<User, "id" | "posts">): Promise<PublicUser> {
        try {
            const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
            const newUser = await prisma.user.create({
                data: {
                    email: user.email,
                    password: hashedPassword,
                    name: user.name,
                    profilePicture: user.profilePicture,
                    roles: user.roles,
                },
            });
            const { password, ...publicUser } = newUser;
            return publicUser;
        } catch (error) {
            console.error("Error creating user:", error);
            throw new Error("Failed to create user");
        }
    },

    async findById(id: number): Promise<PublicUser | null> {
        try {
            const user = await prisma.user.findUnique({ where: { id } });
            if (!user) return null;
            const { password, ...publicUser } = user;
            return publicUser;
        } catch (error) {
            console.error(`Error finding user with ID ${id}:`, error);
            throw new Error("Failed to find user");
        }
    },

    async findAll(): Promise<PublicUser[]> {
        try {
            const users = await prisma.user.findMany();
            return users.map(({ password, ...publicUser }) => publicUser);
        } catch (error) {
            console.error("Error fetching all users:", error);
            throw new Error("Failed to fetch users");
        }
    },

    async update(user: Partial<User>): Promise<PublicUser | null> {
        if (!user.id) return null;
        try {
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
        } catch (error) {
            console.error(`Error updating user with ID ${user.id}:`, error);
            throw new Error("Failed to update user");
        }
    },

    async delete(id: number): Promise<string> {
        try {
            const deletedUser = await prisma.user.delete({ where: { id } });
            return `User deleted: ${deletedUser.id}`;
        } catch (error) {
            console.error(`Error deleting user with ID ${id}:`, error);
            throw new Error("Failed to delete user");
        }
    },

    async uploadProfileImg(
        idUser: number,
        filePath: string
    ): Promise<PublicUser> {
        try {
            const updatedUser = await prisma.user.update({
                where: { id: idUser },
                data: { profilePicture: filePath },
            });
            const { password, ...publicUser } = updatedUser;
            return publicUser;
        } catch (error) {
            console.error(
                `Error uploading profile image for user ID ${idUser}:`,
                error
            );
            throw new Error("Failed to upload profile image");
        }
    },
};
