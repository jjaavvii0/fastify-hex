import { Post } from "./Post";

export interface IPostRepository {
    create(post: Omit<Post, "id">): Promise<Post>;
    findAll(): Promise<Post[]>;
    delete(id: number): Promise<any>;
    update(post: Partial<Post>): Promise<any>;
    findByUser(id: number): Promise<Post[]>;
}
