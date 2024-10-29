import { Post } from "./Post";

export interface IPostRepository {
    create(post: Omit<Post, "id">): Promise<Post>;
    findAll(): Promise<Post[]>;
    delete(id: number): Promise<string>;
    update(post: Partial<Post>): Promise<Post | null>;
    findByUser(id: number): Promise<Post[]>;
}
