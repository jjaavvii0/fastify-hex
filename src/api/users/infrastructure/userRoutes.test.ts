import request from "supertest";
import { server } from "../../../server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);

const testUser = {
    email: "testuser@example.com",
    password: "password123",
};

const updatedUserData = {
    name: "UpdatedUser",
};

let userId: number;
let cookie: string;

beforeAll(async () => {
    await server.ready();
    const hashedPassword = await bcrypt.hash(testUser.password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: {
            ...testUser,
            password: hashedPassword,
            roles: ["admin"],
        },
    });
    userId = user.id;

    const response = await request(server.server)
        .post("/api/auth")
        .send({ email: testUser.email, password: testUser.password });
    const cookies = Array.isArray(response.headers["set-cookie"])
        ? response.headers["set-cookie"]
        : [response.headers["set-cookie"]];
    cookie = cookies.find((c) => c.startsWith("access_token=")) || "";
});

afterAll(async () => {
    await prisma.user.delete({
        where: { email: testUser.email },
    });
    await server.close();
});

describe("User Routes", () => {
    it("should create a new user", async () => {
        const newUser = {
            email: "newuser@example.com",
            password: "newpassword123",
        };

        const response = await request(server.server)
            .post("/api/users")
            .send(newUser);

        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty("id");
        await prisma.user.delete({ where: { email: newUser.email } });
    });

    it("should get all users", async () => {
        const response = await request(server.server)
            .get("/api/users")
            .set("Cookie", cookie);

        expect(response.status).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    it("should update a user by id", async () => {
        const response = await request(server.server)
            .patch(`/api/users/${userId}`)
            .set("Cookie", cookie)
            .send(updatedUserData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("name", updatedUserData.name);
    });

    it("should delete a user by id", async () => {
        const tempUser = await prisma.user.create({
            data: {
                email: `tempuser${Date.now()}@example.com`,
                password: "temppassword123",
            },
        });

        const deleteResponse = await request(server.server)
            .delete(`/api/users/${tempUser.id}`)
            .set("Cookie", cookie);
        expect(deleteResponse.status).toBe(200);

        const userInDb = await prisma.user.findUnique({
            where: { id: tempUser.id },
        });
        expect(userInDb).toBeNull();
    });

    it("should upload a profile image for the user", async () => {
        const response = await request(server.server)
            .post(`/api/users/${userId}/uploadProfileImg`)
            .set("Cookie", cookie)
            .attach("profileImage", "uploads/7270334.png");

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user.profilePicture");
    });
});
