import { z } from "zod";
import { IUserRepository } from "../domain/IUserRepository";

const uploadProfileImgSchema = z.object({
    userId: z.number().int().positive(),
    filePath: z.string().min(1),
});

export const uploadProfileImgUseCase = async (
    userRepository: IUserRepository,
    userId: number,
    filePath: string
) => {
    const validatedData = uploadProfileImgSchema.parse({ userId, filePath });
    return await userRepository.uploadProfileImg(
        validatedData.userId,
        validatedData.filePath
    );
};
