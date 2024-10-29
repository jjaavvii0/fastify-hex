import request from "supertest";
import { server } from "../../../server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const testUser = {
    email: "testingUser@email.com",
    password: "123456",
};

beforeAll(async () => {
    await server.ready();
    const hashedPassword = await bcrypt.hash(testUser.password, SALT_ROUNDS);
    await prisma.user.create({
        data: { ...testUser, password: hashedPassword },
    });
});

afterAll(async () => {
    await prisma.user.delete({
        where: { email: testUser.email },
    });
    await server.close();
});

describe("Auth Routes", () => {
    it("should authenticate a user and return a token", async () => {
        const response = await request(server.server)
            .post("/api/auth")
            .send({ email: testUser.email, password: testUser.password });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("user");
        expect(response.body).toHaveProperty("token");
        expect(response.headers["set-cookie"]).toBeDefined();
    });

    it("should fail authentication with wrong credentials", async () => {
        const response = await request(server.server)
            .post("/api/auth")
            .send({ email: "wrong@example.com", password: "wrongpassword" });

        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty("error");
    });
});
