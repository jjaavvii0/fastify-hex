import request from "supertest";
import { server } from "../../../server";
import { PrismaClient } from "@prisma/client";
import { Post } from "../domain/Post";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const testUser = {
    email: "testuser@example.com",
    password: "password123",
    roles: ["admin"],
};

let authToken: string;
let testPostId: number;
let userId: number;

beforeAll(async () => {
    await server.ready();

    const hashedPassword = await bcrypt.hash(testUser.password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: { ...testUser, password: hashedPassword },
    });
    userId = user.id;

    const response = await request(server.server)
        .post("/api/auth")
        .send({ email: testUser.email, password: testUser.password });

    const cookies = Array.isArray(response.headers["set-cookie"])
        ? response.headers["set-cookie"]
        : [response.headers["set-cookie"]];
    authToken = cookies.find((c) => c.startsWith("access_token=")) || "";

    const post = await prisma.post.create({
        data: {
            title: "Test Post",
            content: "This is a test post",
            authorId: user.id,
        },
    });
    testPostId = post.id;
});

afterAll(async () => {
    await prisma.post.deleteMany({});
    await prisma.user.deleteMany({});
    await server.close();
});

describe("Post Routes", () => {
    it("should create a new post", async () => {
        const newPost = {
            title: "New Test Post",
            content: "Content for the new test post",
            authorId: userId,
        };

        const response = await request(server.server)
            .post("/api/posts")
            .set("Cookie", authToken)
            .send(newPost);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");

        await prisma.post.delete({ where: { id: response.body.id } });
    });

    it("should get all posts", async () => {
        const response = await request(server.server).get("/api/posts");

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should update a post by id", async () => {
        const updatedPost = {
            title: "Updated Test Post",
            content: "Updated content",
        };

        const response = await request(server.server)
            .patch(`/api/posts/${testPostId}`)
            .set("Cookie", authToken)
            .send(updatedPost);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("title", updatedPost.title);
        expect(response.body).toHaveProperty("content", updatedPost.content);
    });

    it("should delete a post by id", async () => {
        const tempPost = await prisma.post.create({
            data: {
                title: "Temp Post",
                content: "Temporary content",
                authorId: userId,
            },
        });

        const response = await request(server.server)
            .delete(`/api/posts/${tempPost.id}`)
            .set("Cookie", authToken);
        expect(response.status).toBe(200);

        const postInDb = await prisma.post.findUnique({
            where: { id: tempPost.id },
        });
        expect(postInDb).toBeNull();
    });

    it("should get posts by user ID", async () => {
        const response = await request(server.server)
            .get(`/api/posts/user/${userId}`)
            .set("Cookie", authToken);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);

        response.body.forEach((post: Post) => {
            expect(post).toHaveProperty("authorId", userId);
        });
    });
});
