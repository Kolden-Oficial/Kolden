---
id: playbook-cerebro-notebooklm
nome: cerebro-notebooklm
titulo: "Cérebro do cliente no NotebookLM"
resumo: "Estruturar base de conhecimento do cliente no Google NotebookLM combinando 4 fontes-padrão para que o time consulte com IA."
categoria: playbook
palavras-chave: [notebooklm, cerebro, kb, base-de-conhecimento, onboarding]
status: oficial
versao: "0.1.0"
atualizado-em: 2026-06-30
ocorrencias: 13   # vezes que apareceu na planilha (todos clientes ativos da época)
---

# Playbook — Cérebro do cliente no NotebookLM

> Origem: tarefa repetida em 13 clientes na planilha "Tarefas Pessoais" — sempre com a mesma
> estrutura de inputs e sempre concluída no mesmo padrão. Promovida a template via F4 desta
> fundação.

## Quando usar

- Onboarding de cliente novo.
- Quando o time perde tempo procurando "o que o cliente já disse" em transcrições/docs soltos.
- Antes de qualquer estratégia (Aletheia, Argos) ou produção (Caliope, Pheme) tocar o cliente
  pela primeira vez.

## Pré-requisitos

- Pasta do cliente no Drive da Kolden organizada (ver `sobre-a-empresa/clientes/`).
- Acesso ao Google NotebookLM com a conta `adm@kolden.com.br` ou `marketing@<cliente>`.
- Credenciais sempre via Infisical (§5 do CLAUDE.md global).

## Os 4 inputs canônicos

Toda execução deste playbook adiciona **estes quatro** inputs ao notebook, na ordem:

1. **Transcrição das reuniões** — todas as calls com o cliente até a data, em ordem cronológica.
   Origem: pasta `<cliente>/02 | Reuniões/` ou `01 | Reuniões e Calls/` no Drive.
2. **Briefing do cliente** — documento de onboarding/briefing assinado. Origem:
   `<cliente>/01 | Briefing/` ou equivalente.
3. **Redes sociais e o que está escrito nelas** — bio + últimos 30 posts dos canais ativos
   (Instagram, TikTok, Facebook, YouTube). Pode ser exportado via Argos.
4. **Pesquisa de mercado** — dossiê de mercado/concorrência (do Argos) + dossiê de cliente
   (`sobre-a-empresa/clientes/ativos/<slug>.md`).

## Passos

1. Criar notebook novo no NotebookLM com o nome `Kolden — <Cliente>`.
2. Adicionar os 4 inputs acima.
3. Validar com 3 perguntas-teste:
   - "Qual é a dor principal do cliente, segundo as reuniões?"
   - "Que linguagem o cliente usa nas redes sociais?"
   - "Quem são os 3 maiores concorrentes mencionados?"
4. Compartilhar acesso de leitura com o squad responsável pelo cliente.
5. Atualizar `clientes/ativos/<slug>.md` seção 10 ("Histórico & Check-ins") com a data de
   criação.
6. Marcar a tarefa no radar como `concluida` via `/tarefa done <id>`.

## Capacidade Kolden

`agente-faz-com-input` — Argos pode **coletar e estruturar** os 4 inputs (transcrições, briefing
parseado, scraping de redes, dossiê de mercado). O **upload final** no NotebookLM é feito pelo
Ronan (humano-no-loop por escolha de soberania — ver §1 do `CLAUDE.md`).

## Critério de feito

- [ ] Notebook criado com nome padronizado.
- [ ] 4 inputs anexados.
- [ ] As 3 perguntas-teste retornam resposta fundamentada em fonte (com citação).
- [ ] Squad responsável tem acesso.
- [ ] Dossiê do cliente atualizado.

## Histórico de execução

Até esta data (2026-06-30), o playbook foi executado em 13 clientes:

| Cliente | ID da tarefa | Status |
|---|---|---|
| Affordable Insulation | KLD-2026-001 | concluída |
| Ariosto Ribeiro | KLD-2026-003 | concluída |
| Brayan's Finish | KLD-2026-008 | concluída |
| Entre Solos | KLD-2026-018 | concluída |
| Mat3vic | KLD-2026-045 | concluída |
| NutriOS Pro | KLD-2026-048 | concluída |
| Revolution Pro | KLD-2026-077 | concluída |
| Rosie | KLD-2026-079 | concluída |
| Instituto Saulo Mendes | KLD-2026-120 | concluída |
| Stass | KLD-2026-122 | concluída |
| Vibrações Celestiais | KLD-2026-125 | concluída |
| Vilela Construction | KLD-2026-128 | concluída |

**Clientes ativos sem cérebro NotebookLM ainda**: Coflow, Clínica Omiron, Freitas Serviços,
CataLogo. Considerar rodar `/tarefa playbook cerebro-notebooklm` para gerar as 4 tarefas
restantes.

## Extração para o Kolden (2026-06-30 em diante)

Desde a sessão `effervescent-eagle` (2026-06-30), o conteúdo dos notebooks pode ser **extraído para o Kolden** via SDK Python — não fica preso à UI do NotebookLM.

**Como roda:**

```bash
uv run --with "notebooklm-py[cookies,browser,markdown]" --with pyyaml \
  python sobre-a-empresa/Ferramentas/NotebookLM/scripts/extract_all.py
```

- **Auth**: storage_state.json em `~/.kolden/notebooklm/` (refresh manual via `notebooklm login --fresh --browser chromium` quando expirar — ~7-30 dias; gap registrado como KLD-2026-135).
- **Saída por cliente**: `sobre-a-empresa/clientes/ativos/<slug>/_notebooklm/` (1 arquivo .md por fonte + `_indice.md`).
- **Saída institucional**: `sobre-a-empresa/_conhecimento-institucional/<slug>/`.
- **Mapeamento de quais notebooks extrair**: `sobre-a-empresa/Ferramentas/NotebookLM/mapeamento.yaml`.
- **Exclui**: PII bancário (Santander) + notebooks vazios.
- **Inclui no frontmatter**: id_fonte, notebook_id, notebook_titulo, titulo, tipo, url_original, summary (AI-gerado), keywords, extraido_em.

**Quando rodar de novo:**

- Adicionou fontes novas num notebook que já foi extraído → re-rode, idempotente (mas atenção: hoje sobrescreve; futura skill `/notebooklm refresh <slug>` fará diff).
- Cookie expirou (verify_auth retorna `RPCError: session expired`) → re-rode `notebooklm login --fresh` + re-extraia.

**Limitações conhecidas:**

- Fontes muito grandes (>~10MB de conteúdo) podem dar `RPCResponseTooLargeError` — falham silenciosamente; check no log.
- Notas/respostas geradas pelo NotebookLM (dentro do chat do notebook) NÃO são extraídas — só as fontes-fonte. Plano B futuro: `notebooklm-mcp-cli` para query dinâmico.

## Evolução pendente

- Avaliar substituir NotebookLM por **Obsidian self-hosted** (tarefa KLD-2026-038 — "Criar
  cérebro para os agents"). Decisão impacta este playbook.
- Quando a skill `audit-contrato` for criada (gap registrado em `/tarefa gaps`), integrar o
  contrato como 5º input.
- **Refresh automático do cookie NotebookLM** (KLD-2026-135) — vira skill ou MCP do Caos.
