import request from "supertest";
import { server } from "../../../server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();
const SALT_ROUNDS = 10;

const testUser = {
    email: "testuser@example.com",
    password: "password123",
    roles: ["admin"],
};

let authToken: string;

beforeAll(async () => {
    await server.ready();

    const hashedPassword = await bcrypt.hash(testUser.password, SALT_ROUNDS);
    const user = await prisma.user.create({
        data: { ...testUser, password: hashedPassword },
    });

    const response = await request(server.server)
        .post("/api/auth")
        .send({ email: testUser.email, password: testUser.password });

    const cookies = Array.isArray(response.headers["set-cookie"])
        ? response.headers["set-cookie"]
        : [response.headers["set-cookie"]];
    authToken = cookies.find((c) => c.startsWith("access_token=")) || "";
});

afterAll(async () => {
    await prisma.user.deleteMany({});
    await server.close();
});

describe("Socket Routes", () => {
    it("should send a notification to all users", async () => {
        const messageData = { message: "Hello, users!" };

        const response = await request(server.server)
            .post("/api/socket/notification")
            .set("Cookie", authToken)
            .send(messageData);

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty(
            "status",
            "Notification sent to all users"
        );
    });

    it("should return 500 if notification fails", async () => {
        const response = await request(server.server)
            .post("/api/socket/notification")
            .set("Cookie", authToken)
            .send({ message: "" });

        expect(response.status).toBe(500);
        expect(response.body).toHaveProperty("error");
    });
});
