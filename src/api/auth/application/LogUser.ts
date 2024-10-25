import { IAuthRepository } from "../domain/IAuthRepository";
import { LoginCredentials } from "../domain/LoginCredentials";

export const logUserUseCase = async (
    authRepository: IAuthRepository,
    credentials: LoginCredentials
) => {
    const loggedUser = await authRepository.logUser(credentials);
    return loggedUser ?? null;
};
