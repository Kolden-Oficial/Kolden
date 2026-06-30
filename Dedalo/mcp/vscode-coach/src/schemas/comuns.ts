import { z } from "zod";

export const verbosidadeSchema = z
  .enum(["concise", "detailed"])
  .default("concise")
  .describe(
    "Nível de detalhe da resposta. 'concise' = resumo + próximo passo (default). 'detailed' = payload estruturado completo.",
  );

export const workspacePathSchema = z
  .string()
  .min(1)
  .describe(
    "Caminho absoluto do workspace VS Code. Em Windows use barras normais (C:/foo) ou duplas (C:\\\\foo).",
  );

export const stackSchema = z
  .string()
  .min(2)
  .describe(
    "Identificador da stack do projeto. Suportadas v1: react-ts, react-vite, nextjs, node-express, node-fastify, python-fastapi, python-django, python-data, go, rust.",
  );

export const personaSchema = z
  .enum(["frontend", "backend", "devops", "fullstack", "data"])
  .describe("Persona do desenvolvedor — define o conjunto opinionado de atalhos/snippets/perfil.");
