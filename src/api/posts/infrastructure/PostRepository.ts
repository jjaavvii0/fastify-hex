import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

const prisma = new PrismaClient();
    


//TODO: handle errors
export const postRepository: IPostRepository = {
    async create(post: Omit<Post, "id">): Promise<Post> {
        const newPost = await prisma.post.create({
            data: {
                title: post.title,
                content: post.content ?? undefined,
                authorId: post.authorId,
            },
        });
        return newPost;
    },
    async findAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany();
        return posts
    },
    async findByUser(authorId: number): Promise<Post[]> {
        const postsOfUser = await prisma.post.findMany({
            where: { authorId: Number(authorId) },
        });
        return postsOfUser;
    },
    async delete(id: number): Promise<string> {
        const deletedPost = await prisma.post.delete({ where: { id } });
        return `Post deleted: ${deletedPost.id}`;
    },
    async update(post: Partial<Post>): Promise<Post | null> {
        if (!post.id) return null;
        const updatedPost = await prisma.post.update({
            where: { id: post.id },
            data: {
                ...(post.title && { title: post.title }),
                ...(post.content && { content: post.content }),
                ...(post.authorId && { authorId: post.authorId }),
            },
        });
        return updatedPost;
    },
};
