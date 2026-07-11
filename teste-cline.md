# Kolden OS — 3 pontos-chave

1. **Backbone operacional + plataforma self-hosted de IA** — O Kolden OS é a infraestrutura interna que sustenta as operações da Kolden e serve como banco de testes vivo de modelos e ferramentas de IA (proprietários e open-source), tudo sob controle próprio.

2. **Três princípios fundamentais** — Soberania de dados (tudo roda localmente ou em infra própria, sem dependência essencial de SaaS terceiros), vendor-agnóstico (testa todos os provedores de LLM lado a lado — OpenAI, Anthropic, Google, Mistral, DeepSeek, modelos locais via Ollama) e privacidade por padrão (busca, storage e histórico de conversas dentro da própria rede).

3. **Dois planos no mesmo repositório** — (a) **infra self-hosted**: stack LobeHub orquestrada por Docker Compose no WSL2 (Postgres/ParadeDB, Redis, RustFS/S3, SearxNG); (b) **workspace de agentes de IA**: ecossistema de 24 squads, fábrica de agentes (Caos), runtime (Hermes), verificador (Dike) e catálogo de ferramentas, com checkout em `C:\Kolden\` no Windows.