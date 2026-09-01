import type { FastifyRequest, FastifyReply } from "fastify";

export function makeAuthHook(expectedToken: string) {
  return async function authHook(req: FastifyRequest, reply: FastifyReply) {
    const provided = req.headers["x-kolden-token"];
    if (typeof provided !== "string" || provided !== expectedToken) {
      reply.code(401).send({ error: "token invalido ou ausente" });
    }
  };
}
