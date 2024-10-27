import { IPostRepository } from "../domain/IPostRepository";

export const getPostsByUserUseCase = async (
    postRepository: IPostRepository,
    userId: number
) => {
    return await postRepository.findByUser(userId);
};
