import { PrismaClient } from "@prisma/client";
import { IAuthRepository } from "../domain/IAuthRepository";
import { PublicUser } from "../../users/domain/User";
import { LoginCredentials } from "../domain/LoginCredentials";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const prisma = new PrismaClient();

export const authRepository: IAuthRepository = {
    async logUser(credentials: LoginCredentials): Promise<any> {
        try {
            const foundUser = await prisma.user.findFirst({
                where: { email: credentials.email },
            });
            if (!foundUser) throw new Error("Incorrect credentials");

            const isPasswordValid = await bcrypt.compare(credentials.password, foundUser.password);
            if (!isPasswordValid) throw new Error("Incorrect credentials");
            
            const token = jwt.sign(
                {
                    id: foundUser.id,
                    email: foundUser.email,
                    roles: foundUser.roles,
                },
                process.env.JWT_SECRET || "default_jwt_secret",
                { expiresIn: "24h" }
            );
            return {
                user: {
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name ?? undefined,
                },
                token,
            };
        } catch (error) {
            console.error(`Error:`, error);
            throw new Error("Failed to log user");
        }
    },
};
