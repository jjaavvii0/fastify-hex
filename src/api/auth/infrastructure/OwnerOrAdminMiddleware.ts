import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { FastifyReply } from "fastify";

export function ownerOrAdminMiddleware(
    resourceIdKey: string,
    resourceType: "post" | "user"
) {
    return async (request: any, reply: FastifyReply ) => {
        const { roles, id: userId } = request.user;

        if (roles.includes("admin")) return;

        const resourceId = parseInt(request.params[resourceIdKey], 10);

        let isOwner = false;
        if (resourceType === "post") {
            const post = await prisma.post.findUnique({
                where: { id: resourceId },
                select: { authorId: true },
            });
            isOwner = post?.authorId === userId;
        } else if (resourceType === "user") {
            const user = await prisma.user.findUnique({
                where: { id: resourceId },
                select: { id: true },
            });
            isOwner = user?.id === userId;
        }

        if (!isOwner) {
            return reply
                .status(403)
                .send({ error: "You can't modify this resource" });
        }
    };
}
