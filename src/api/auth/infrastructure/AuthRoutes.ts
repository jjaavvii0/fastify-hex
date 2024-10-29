import { FastifyInstance } from "fastify";
import { logUserUseCase } from "../application/LogUser";
import { authRepository } from "./AuthRepository";
import { LoginCredentials } from "../domain/LoginCredentials";

export async function authRoutes(server: FastifyInstance) {
    server.post("/", async (request, reply) => {
        try {
            const { email, password } = request.body as LoginCredentials;
            const { user, token } = await logUserUseCase(authRepository, {
                email,
                password,
            });
            reply.setCookie("access_token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "lax",
                maxAge: 24 * 60 * 60,
            });
            reply.status(200).send({user, token});
        } catch (e) {
            const errorMessage =
                (e as Error).message || "Authentication failed";
            reply.status(401).send({ error: errorMessage });
        }
    });
}
