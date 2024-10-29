import jwt from "jsonwebtoken";
import { FastifyReply } from "fastify";

export function authMiddleware(request: any, reply: FastifyReply, next: () => void) {
    const access_token = request.cookies.access_token || request.headers.access_token;
    if (!access_token) return reply.status(401).send("No token available");
    try {
        const decoded = jwt.verify(
            access_token,
            process.env.JWT_SECRET || "default_jwt_secret"
        );
        request.user = decoded;
        next();
    } catch (e) {
        return reply.status(404).send("Invalid token");
    }
}
