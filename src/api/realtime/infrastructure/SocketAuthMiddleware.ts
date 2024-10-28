import jwt from "jsonwebtoken";
import { Socket } from "socket.io";

export function socketAuthMiddleware(
    socket: Socket,
    next: (err?: Error) => void
) {
    const token =
        socket.handshake.auth.token ||
        socket.handshake.headers.cookie?.split("access_token=")[1];
    if (!token) return next(new Error("Authentication error"));

    jwt.verify(
        token,
        process.env.JWT_SECRET || "default_jwt_secret",
        (err: any, decoded: any) => {
            if (err) return next(new Error("Invalid token"));
            socket.data.user = decoded;
            next();
        }
    );
}
