import { PrismaClient } from "@prisma/client";
import { IPostRepository } from "../domain/IPostRepository";
import { Post } from "../domain/Post";

const prisma = new PrismaClient();

export const postRepository: IPostRepository = {
    async create(post: Omit<Post, "id">): Promise<Post> {
        try {
            const newPost = await prisma.post.create({
                data: {
                    title: post.title,
                    content: post.content ?? undefined,
                    authorId: post.authorId,
                },
            });
            return newPost;
        } catch (error) {
            console.error("Error creating post:", error);
            throw new Error("Failed to create post");
        }
    },

    async findAll(): Promise<Post[]> {
        try {
            const posts = await prisma.post.findMany();
            return posts;
        } catch (error) {
            console.error("Error fetching posts:", error);
            throw new Error("Failed to fetch posts");
        }
    },

    async findByUser(authorId: number): Promise<Post[]> {
        try {
            const postsOfUser = await prisma.post.findMany({
                where: { authorId: Number(authorId) },
            });
            return postsOfUser;
        } catch (error) {
            console.error(`Error fetching posts for user ${authorId}:`, error);
            throw new Error("Failed to fetch user's posts");
        }
    },

    async delete(id: number): Promise<string> {
        try {
            const deletedPost = await prisma.post.delete({ where: { id } });
            return `Post deleted: ${deletedPost.id}`;
        } catch (error) {
            console.error(`Error deleting post with ID ${id}:`, error);
            throw new Error("Failed to delete post");
        }
    },

    async update(post: Partial<Post>): Promise<Post | null> {
        if (!post.id) return null;
        try {
            const updatedPost = await prisma.post.update({
                where: { id: post.id },
                data: {
                    ...(post.title && { title: post.title }),
                    ...(post.content && { content: post.content }),
                    ...(post.authorId && { authorId: post.authorId }),
                },
            });
            return updatedPost;
        } catch (error) {
            console.error(`Error updating post with ID ${post.id}:`, error);
            throw new Error("Failed to update post");
        }
    },
};
