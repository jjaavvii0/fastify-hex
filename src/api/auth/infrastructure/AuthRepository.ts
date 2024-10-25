import { PrismaClient } from "@prisma/client";
import { IAuthRepository } from "../domain/IAuthRepository";
import { PublicUser } from "../../users/domain/User";
import { LoginCredentials } from "../domain/LoginCredentials";
const prisma = new PrismaClient();

export const authRepository: IAuthRepository = {
    async logUser(credentials: LoginCredentials): Promise<PublicUser | Error> {
        const foundUser = await prisma.user.findFirst({
            where: { email: credentials.email },
        });
        if (!foundUser) throw new Error("Incorrect credentials");
        const validatePassword = foundUser.password == credentials.password;
        if (!validatePassword) throw new Error("Incorrect credentials");

        return {
            id: foundUser.id,
            email: foundUser.email,
            name: foundUser.name ?? undefined,
        } as PublicUser;
    },
};
