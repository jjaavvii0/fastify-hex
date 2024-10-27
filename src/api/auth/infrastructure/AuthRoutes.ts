import { FastifyInstance } from "fastify";
import { logUserUseCase } from "../application/LogUser";
import { authRepository } from "./AuthRepository";

export async function authRoutes(server: FastifyInstance) {
    server.post("/", async (request, reply) => {
        try {
            const { email, password } = request.body as any;
            const user = await logUserUseCase(authRepository, {
                email,
                password,
            });
            reply.send(user);
        } catch (e) {
            const errorMessage = (e as Error).message || "Authentication failed";
            reply.status(401).send({error:errorMessage})
        }
    });
}
