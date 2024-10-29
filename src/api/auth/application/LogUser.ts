import {z} from "zod"
import { IAuthRepository } from "../domain/IAuthRepository";
import { LoginCredentials } from "../domain/LoginCredentials";

const loginCredentialsSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const logUserUseCase = async (
    authRepository: IAuthRepository,
    credentials: LoginCredentials
) => {
    const validatedCredentials = loginCredentialsSchema.parse(credentials);
    const loggedUser = await authRepository.logUser(validatedCredentials);
    return loggedUser ?? null;
};
