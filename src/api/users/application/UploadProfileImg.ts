import { IUserRepository } from "../domain/IUserRepository";

export const uploadProfileImgUseCase = async (
    userRepository: IUserRepository,
    userId: number,
    filePath: string,
) => {
    return await userRepository.uploadProfileImg(userId, filePath)
};
