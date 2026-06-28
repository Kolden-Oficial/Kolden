# Kolden OS

> Backbone operacional da Kolden e plataforma self-hosted de IA da empresa.
> Filosofia: soberania de dados, vendor-agnóstico, testar todas as IAs do mercado.

## 1. Identidade

A **Kolden** é a empresa. O **Kolden OS** é a infraestrutura interna que sustenta as operações da empresa e, ao mesmo tempo, serve como banco de testes vivo de modelos e ferramentas de IA — proprietários e open-source — sob nosso controle.

Princípios:
- **Soberania de dados**: tudo roda localmente ou em infra própria. Nada essencial depende de SaaS de terceiros.
- **Vendor-agnóstico**: testamos todos os provedores de LLM (OpenAI, Anthropic, Google, Mistral, DeepSeek, modelos locais via Ollama, etc.) lado a lado, com chaves trocáveis.
- **Privacidade por padrão**: busca, storage e histórico de conversas vivem dentro da nossa rede.

## 2. Estado atual

- **Repositório**: `Kolden-Oficial/Kolden` (https://github.com/Kolden-Oficial/Kolden.git)
- **Branch principal**: `main`
- **Ambiente**: WSL2 (Linux 6.6, Ubuntu) em `/home/kolden/kolden/`
- **Exposição**: localhost-only. Não há reverse proxy, TLS ou tunnel configurado.
- **Stack ativa (infra de serviços)**: somente LobeHub (`./lobehub/`). Nada mais até segunda ordem.
- **Dois planos do mesmo repositório**: (1) **infra self-hosted** — a stack LobeHub descrita abaixo, que roda no WSL; (2) **workspace de agentes de IA** — squads, fábrica de agentes (Caos), runtime (Hermes) e catálogo de ferramentas, com checkout em `C:\Kolden\` (Windows). O índice operacional do plano de agentes é **`AGENTS.md`** — leia-o antes de operar com squads/agentes. Ver §10.

## 3. Arquitetura técnica

Stack orquestrada por `lobehub/docker-compose.yml`, network bridge `lobe-network`.

| Serviço      | Imagem                          | Portas (host)               | Persistência            | Função                                              |
|--------------|---------------------------------|-----------------------------|-------------------------|------------------------------------------------------|
| lobe         | `lobehub/lobehub`               | `3210`                      | —                       | UI/backend de chat com LLMs                          |
| postgresql   | `paradedb/paradedb:latest-pg17` | `5432`                      | bind `./lobehub/data`   | Banco principal; ParadeDB = Postgres 17 + busca/BM25 |
| redis        | `redis:7-alpine`                | `6379`                      | volume `redis_data`     | Cache, filas, sessão                                 |
| rustfs       | `rustfs/rustfs:latest`          | `9000` (S3), `9001` (admin) | volume `rustfs-data`    | Storage S3-compatível (uploads em conversas)         |
| rustfs-init  | `minio/mc:latest`               | —                           | —                       | Job one-shot: cria bucket `lobe` e aplica policy     |
| searxng      | `searxng/searxng`               | só rede interna             | —                       | Motor de busca web privado consumido pelo LobeHub    |

**Fluxo de dados**: LobeHub fala com Postgres (histórico, embeddings/BM25), Redis (cache/sessão), RustFS (S3 para mídia/avatares), SearxNG (busca web). Tudo via DNS interno do compose.

**Arquivos de configuração relevantes**:
- `lobehub/docker-compose.yml` — orquestração completa
- `lobehub/.env` — secrets e portas (NÃO versionado)
- `lobehub/bucket.config.json` — policy S3 do bucket `lobe` (leitura pública para servir mídia em conversas)
- `lobehub/searxng-settings.yml` — configuração do SearxNG

## 4. Padrões e convenções

- **Idioma**: **PT-BR em tudo** — código, comentários, commits, docs, mensagens de erro custom. Identidade Kolden é em português; manter consistência mesmo em mensagens de commit.
- **Commits**: estilo `tipo: assunto — detalhe` em minúsculas, com travessão (em-dash `—`, não hífen). Referência: `init: Kolden OS — estrutura base`.
- **Estrutura de diretórios**: `kolden/<servico>/` — cada stack docker-compose vive isolada em sua pasta. Configs por serviço ficam dentro da própria pasta.
- **Naming de containers**: prefixo `lobe-` na stack do LobeHub (`lobehub`, `lobe-postgres`, `lobe-redis`, `lobe-rustfs`, `lobe-rustfs-init`, `lobe-searxng`). Próximas stacks devem replicar o padrão `<stack>-<serviço>`.
- **Variáveis**: tudo parametrizado via `.env` no diretório do serviço. Nada hardcoded em `docker-compose.yml`.
- **Volumes**: dados crus em bind mount (`./data`) quando precisar inspecionar; volumes nomeados para o que não precisa ser tocado direto.

## 5. Regras de segurança inegociáveis

Estas regras valem mesmo em dev local. Não negociar.

1. **Nunca versionar secrets**. `.env`, `.env.*`, `*.env`, `*.pem`, `*.key`, `*.cert`, `*.p12` estão no `.gitignore`. Antes de `git add`, conferir.
2. **Nunca usar `git add -A` ou `git add .`** — sempre adicionar arquivos por nome. Evita commitar acidentalmente `.env`, `data/`, `redis_data/`, `s3_data/`.
3. **Não expor portas para a rede**. Hoje 5432, 6379, 9000 e 9001 só ficam acessíveis em localhost porque o WSL2 isola. Se um dia migrar para VPS, *re-bindar para 127.0.0.1* ou colocar atrás de reverse proxy antes de qualquer outra coisa.
4. **`bucket.config.json` torna o bucket `lobe` legível por qualquer um com a URL**. É necessário para servir mídia das conversas. Implicação: nada sensível deve ir parar lá. Tratar como CDN público.
5. **Nunca rodar `--no-verify` em commits** ou bypassar hooks/assinatura sem pedido explícito.
6. **Operações destrutivas exigem confirmação humana** — `docker compose down -v`, `rm -rf` em `data/`, `DROP DATABASE`, `git push --force`, `git reset --hard`. Mesmo que o caminho pareça óbvio, parar e perguntar.
7. **Secrets do `.env` atual** (`KEY_VAULTS_SECRET`, `AUTH_SECRET`, `POSTGRES_PASSWORD`, `RUSTFS_SECRET_KEY`, `JWKS_KEY`) são adequados para localhost. Antes de qualquer exposição externa, **rotacionar todos**.

## 6. Como trabalhamos juntos

Estas são instruções operacionais para o Claude Code em sessões futuras.

### Idioma
PT-BR em tudo o que for produzido — commits, comentários, docs, PRs, mensagens. Inglês só quando o ecossistema impuser (nome de função em lib, chave de config externa, log de terceiro).

### Plan-mode obrigatório antes de mexer em infra
Qualquer alteração em `docker-compose.yml`, `.env`, `bucket.config.json`, `searxng-settings.yml`, volumes, ou que afete dados em `data/` precisa **passar por plan-mode antes**. Edits triviais em arquivos versionados (README, scripts auxiliares) podem ser diretos.

### Commit policy estrita
**Só commitar ou dar push quando o Ronan pedir com todas as letras.** Mesmo após terminar uma tarefa que claramente justifica commit, parar e esperar ordem. Não antecipar. Não sugerir ad nauseam.

### Tom e profundidade
Arquiteto técnico sênior. Direto. Sem otimismo performático ("ótima pergunta!"), sem hedging desnecessário, sem auto-elogio. Quando algo é incerto, dizer que é incerto. Quando uma decisão tem trade-off, nomear o trade-off.

### Escopo
Não adicionar features além do pedido. Não refatorar de carona. Não criar abstrações para "futuro hipotético". Bug fix conserta o bug — ponto.

### Autonomia calibrada
- **OK fazer direto**: leitura de arquivos, busca, edits em arquivos não-críticos versionados, builds e testes locais.
- **Pedir confirmação**: qualquer coisa em §5, qualquer mudança em infra, qualquer ação que toque rede externa, qualquer git destrutivo.

### Política de busca e pesquisa
**Antes de qualquer pesquisa web — direta ou via agent/subagent — declarar ao Ronan a ferramenta E o nível de profundidade (padrão = máximo) e aguardar confirmação.** Ferramenta padrão = **Firecrawl** (soberania de dados); Exa/Tavily quando o resultado pedir; `WebSearch` nativa só como último recurso, declarado. Subagentes de pesquisa: confirmar o disparo antes e configurá-los no poder máximo. Ferramentas de busca conectadas no workspace: ver `sobre-a-empresa/Ferramentas/mcp-status.md`. **Fonte de verdade da regra (e da trava `gate-busca.cjs`): `~/.claude/CLAUDE.md` (global).**

## 7. Comandos críticos

```bash
# Subir a stack
cd ~/kolden/lobehub && docker compose up -d

# Ver status
docker compose ps

# Logs em tempo real (lobe é o serviço principal)
docker compose logs -f lobe

# Derrubar preservando dados
docker compose down

# Derrubar APAGANDO volumes (redis_data, rustfs-data) — DESTRUTIVO
docker compose down -v

# Atualizar imagens
docker compose pull && docker compose up -d

# Acesso ao Postgres (ParadeDB)
docker exec -it lobe-postgres psql -U postgres -d lobechat

# Backup do banco
docker exec lobe-postgres pg_dump -U postgres lobechat > backup_$(date +%Y%m%d).sql

# UIs
# LobeHub:        http://localhost:3210
# RustFS console: http://localhost:9001
```

## 8. Fluxos de trabalho recorrentes

- **Adicionar provedor de LLM novo**: editar `lobehub/.env` com a chave do provedor (vars padrão do LobeHub, e.g. `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`), `docker compose up -d` para reiniciar só o serviço `lobe`. Nunca commitar a chave.
- **Inspecionar mídia armazenada**: console RustFS em `localhost:9001` (login com `RUSTFS_ACCESS_KEY`/`RUSTFS_SECRET_KEY` do `.env`).
- **Resetar instalação preservando uploads**: `docker compose down`, `rm -rf lobehub/data` (apaga só Postgres), `docker compose up -d`.
- **Mudar porta de algum serviço**: editar a variável correspondente em `.env` (`LOBE_PORT`, `RUSTFS_PORT`, `RUSTFS_ADMIN_PORT`), recriar com `docker compose up -d`.

## 9. O que NÃO fazer

- Não escrever em inglês arquivos de identidade do Kolden (READMEs, docs internas, CLAUDE.md).
- Não introduzir nova stack/serviço sem pedido explícito.
- Não alterar `searxng-settings.yml` sem entender o impacto — o arquivo tem 66KB de configuração de motores de busca.
- Não rotacionar secrets sem combinar — quebra a sessão de quem está logado.
- Não usar `mkdir -p data/` à toa — o diretório é criado pelo Postgres na primeira subida com permissões corretas (UID 999).
- Não tentar fazer `git push` para `main` direto sem pedido. Não tem proteção de branch ainda; o cuidado é manual.

## 10. Workspace de agentes de IA (`C:\Kolden\`)

O segundo plano do repositório (ver §2) é o ecossistema de agentes de IA. Seu índice/entrypoint é **`AGENTS.md`** — fonte de verdade para qualquer agente operando na Kolden. Este CLAUDE.md cobre a **infra**; o AGENTS.md cobre os **agentes**. Os dois devem permanecer cruzados e consistentes.

Estado atual (verificado arquivo-a-arquivo):

- **23 squads** (nomes da mitologia grega) — **225 agentes** em `<Squad>/agents/`. Cada squad tem `README.md` + `agents/` + `tasks/` + `workflows/` + `checklists/` + `squad.yaml` (exceções: `Dedalo` usa `config.yaml`; `Liceu` sem `workflows/`; os 6 squads-semente novos têm estrutura mínima). Padrão: 1 orquestrador (tier 0) + especialistas. Marketing & Criação: `Pheme` (9), `Peitho` (16), `Caliope` (23), `Aglaia` (15), `Harmonia` (8), `Orfeu` (12), `Ariadne` (8). Estratégia & Negócios: `Aletheia` (8), `Argos` (15), `Liceu` (9), `Olimpo` (8), `Themis` (11), `Metis` (7), `Pluto` (16), `Dionisio` (7). Engenharia & Segurança: `Dedalo` (8), `Egide` (15). Negócios (squads-semente, 2026-06-28): `Nomos` (5), `Pactolo` (5), `Emporos` (5), `Hestia` (5), `Ananke` (5), `Cairos` (5).
- **`Prometeu/`** — framework de engenharia AIOX com **12 agentes** em `Prometeu/.aiox-core/development/agents/` (base vendorizada `@aiox-squads/core`).
- **`Caos/`** — fábrica de agentes: ritual de criação em 9 fases sob `Caos/constituicao.md`, com **9 especialistas internos** + **23 skills**. Aplica REUSE > ADAPT > CREATE via registro de entidades e o **ledger de repositórios absorvidos** (`Caos/dados/repositorios-absorvidos.yaml`). Absorção de repos externos: skill `ingestao-de-repositorio` (`/absorver`, 8 fases F0→F7 com gate de segurança estática e reconciliação anti-perda).
- **`Hermes/`** — runtime de execução vendorizado da **Nous Research** (`hermes-agent`, docs em inglês). Roda os assistentes (gateways WhatsApp/Telegram/etc., OpenRouter, Infisical). **Não é squad nativo.** Acumula o papel de **camada 2** do sistema hierárquico (tradutor de intenção: DoR + matriz de risco + Contrato de Missão + dono do `USER.md`) — ver `Hermes/camada-2-contrato.md`.
- **`Dike/`** — agente SOLO **verificador** (nascido pelo Ritual do Caos): reconcilia a entrega contra o lacre do Contrato de Missão e localiza o degrau da quebra (TPND=0). Roda na subida, entre o Zeus e o Hermes.
- **`sobre-a-empresa/`** — "cérebro" da empresa em construção (~30 docs, maioria `status: rascunho`). Não afirmar detalhes de negócio enquanto for rascunho. Contém também **`sobre-a-empresa/Ferramentas/`** — catálogo de ~30 tools/APIs/MCPs (`sobre-a-empresa/Ferramentas/ferramentas.md`, `mcp-status.md`). **Credenciais sempre via Infisical** (consistente com §5).
- **`Projetos/`** — `omiron` (Next.js 15) e `CataLogo`/Tracker Flow (React+Vite), além do template `_modelo-projeto/`.
- **Sistema (em `.claude/`)**: `.claude/agent-memory/` (memória persistente do workspace), `.claude/registros/` (logs de auditoria e aprendizado), `.claude/_staging/` (clones de import, temporário).

### Sistema hierárquico de agentes (5 camadas)
Um input do Ronan atravessa 5 camadas: **1. Humano → 2. Hermes** (traduz a intenção, aplica DoR + matriz de risco verde/amarelo/vermelho, **lacra a intenção** num **Contrato de Missão**) **→ 3. Zeus** (orquestrador do Olimpo: decompõe e roteia) **→ 4. Executivos** (os 8 deuses do Olimpo: Zeus/CEO, Poseidon/COO, Apolo/CMO, Hefesto/CTO, Hades/CIO, Atena/CAIO, Plutos/CFO, Afrodite/CRO — cada um com `cargo` + `routing_triggers`) **→ 5. Operacional** (squads de execução). Na **subida**, a **Dike** reconcilia a entrega contra o lacre e localiza o degrau de qualquer quebra antes de o Hermes devolver ao Ronan. O **chassi** é o Contrato de Missão (`Olimpo/contratos/`: schema + template + exemplo); cada camada **assina** sua seção sem apagar as anteriores. O "RH dos agentes" (cartão de identidade + roster) e o tool registry consultável são governados pelo Caos/curador.

Total: **246 agentes** (225 em 23 squads + 12 Prometeu + 9 Caos) — contagem verificada arquivo-a-arquivo em 2026-06-28 (os 6 squads-semente somaram +30). A **Dike** (verificador) é um papel **sem arquivo de agente próprio** (`Dike/` não tem `agents/*.md`), logo **fora da contagem**.

**Lote de absorção 2026-06-26/27:** 31 repositórios GitHub (planilha `repos-claude-github`) clonados, auditados (todos SAFE), inventariados e absorvidos — **91 habilidades novas** em 11 squads (44 âncoras + 47 da absorção exaustiva: Égide cyber full-spectrum +24, Ariadne SEO profundo +11, ECC meta-fábrica +12) + **5 vendors** no catálogo de Ferramentas (Repomix, MarkItDown, MoneyPrinterTurbo, PlaywrightMCP, n8n-MCP) + **5 referências inertes** (prompts vazados/coletâneas, copyleft — só indexadas). Todos os squads tocados têm `catalogo.md`. Ledger: `Caos/dados/repositorios-absorvidos.yaml`; relatório-mestre: `Caos/registros/absorcao/_lote-2026-06-26/RELATORIO-DO-LOTE.md`. A exaustão restante segue o `_lote-2026-06-26/ROADMAP-ESTRUTURA-ROBUSTA.md`.

Convenções (PT-BR, kebab-case), regra de segredos (§5) e commit policy (§6) deste CLAUDE.md valem igualmente no plano de agentes.
