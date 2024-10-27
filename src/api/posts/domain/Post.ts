import { User } from "../../users/domain/User";

export interface Post {
    id: number;
    title: string;
    content?: string | null;
    authorId: number;
    author?: User;
}
