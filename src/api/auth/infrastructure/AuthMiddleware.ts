import jwt from "jsonwebtoken";

export function authMiddleware(request: any, reply: any, next: () => void) {
    const { access_token } = request.cookies;
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
