---
tipo: registro
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/mcp-desligamento-2026-06-30|mcp-desligamento-2026-06-30]]"
---

# Briefing de Retomada — Kolden (2026-06-26)

> Gerado após o Ronan relatar "perda" das sessões. **Nada foi perdido em disco** — sumiu o acesso pela UI (lista de `--resume`), provavelmente por troca de conta de login no Claude Code. Este doc é o ponto de retomada consolidado.

## Fontes de verdade (verificadas, íntegras)

- **64 transcripts `.jsonl`** em `C:\Users\Ronan Silva\.claude\projects\C--Kolden\` (+ subprojetos Argos, Liceu, Peitho).
- **MEMORY.md + ~30 memórias** em `...\projects\C--Kolden\memory\`.
- **`C:\Kolden\.claude\registros\`** — `auditoria.log` (212KB) + `aprendizado.log`.
- **`C:\Kolden\.claude\agent-memory\workspace-kolden.md`**.
- **git history** (último commit `c0cd48cd`).

## Mapa de IDs ↔ tema das sessões recentes (para `--resume`)

| ID (prefixo) | Data | Tema |
|---|---|---|
| `4a289d21` | 26/06 11:45 | Hermes → migração Claude Code Max |
| `22005b68` | 26/06 11:24 | Hermes → erro WSL/bash |
| `d69e92a3` | 26/06 11:45 | Auditoria EntreSolos (Peitho) |
| `bdac75ef` | 26/06 11:45 | Checkup pós-troca de conta |
| `556131be` | 26/06 11:42 | Vasculha do Drive (absorção sem perda) |
| `440b9b15` | 26/06 11:43 | Caos → MCP VSCode |
| `8a4d134a` | 26/06 11:43 | Caos → protocolo absorção-sem-perda |
| `77b965ab` | 26/06 11:45 | Caos → absorção marketingskills (Ariadne) |

---

## FRENTES ABERTAS

### 1. Hermes — Migração para Claude Code Max  🔴 INCOMPLETO
- **Onde parou:** diagnóstico feito (OpenRouter esgotado → 402; credencial Max validada em `~/.claude/.credentials.json`). CLI one-shot ainda falha com `"Authorization": "Bearer None"` — token não injetado.
- **Pendente:** editar `C:\Users\Ronan Silva\AppData\Local\hermes\config.yaml` → `model.provider: anthropic`, `model.default: claude-opus-4-8`; depois `hermes gateway restart`; testar `hermes -z "responda: ok"`; higienizar pool (`hermes auth remove openrouter <id>`).
- **Plano existente:** `...\.claude\plans\claude-continue-a-migra-o-declarative-cook.md`.

### 2. Hermes — Erro WSL/bash  ✅ RESOLVIDO (2026-06-25)
- Fix: `setx HERMES_GIT_BASH_PATH "C:\Program Files\Git\bin\bash.exe"` + linha `set` no `Hermes_Gateway.cmd` + restart. Doc: `memory\project_hermes_bash_wsl_stub.md`. Só monitorar; reaplicar se regredir.

### 3. EntreSolos — Auditoria Google Ads (Peitho)  ✅ config feita · 🔴 2 críticos
- **Feito:** 4 docs em `C:\Kolden\sobre-a-empresa\clientes\ativos\` (`entresolos.md`, `-google-ads-config.md`, `-blueprint.md`, `-rsas.md`); leitura first-party das contas Google; **fix de infra** (apex `entresolo.com.br` dava HTTP 421 → Redirect Rule 301 apex→www na Cloudflare, validado ao vivo).
- **Pendente crítico:** (a) 🔴 **GA4 não coleta** desde 22/12/2025 (property `517179541`, tag `G-X9B7XNQXZT` não dispara) — instalar/validar tag GA4 via GTM no `www`; (b) reindexação no Search Console pós-fix; (c) confirmar Customer ID operacional; (d) eventos de conversão (WhatsApp / clique-pra-ligar) não rastreados.
- **Bloqueio externo:** números de Ads não validados ao vivo até sair o developer token (infra-a).

### 4. Checkup pós-troca de conta — Auth Google  ⏳ aguarda Ronan
- **Feito:** diagnóstico completo (toolchain, Infisical, ~30 MCPs ok). Falha real única: troca de conta invalidou ADC **e** `gcloud auth login`; re-login interativo falha (`ERR_CONNECTION_REFUSED` no callback localhost). Afeta MCP `google-analytics`, GTM, Search Console. **Não afeta** Drive/Gmail/Calendar nem `google-drive` local.
- **Plano:** migrar para **Service Account** (key JSON não expira). **Parte A (Ronan, ~30min no Console):** criar SA `kolden-analytics-ro` no projeto `gen-lang-client-0988823565`, gerar key → `C:\Users\Ronan Silva\.config\gcloud-sa\kolden-analytics-ro.json`, habilitar APIs, conceder acesso (GA4/GTM/GSC), informar email+path. **Parte B (Claude):** reapontar MCP, validar ao vivo, atualizar docs. Plano: `...\.claude\plans\claude-precisei-trocar-de-bubbly-chipmunk.md`.

### 5. Vasculha do Drive compartilhado (absorção sem perda)  ✅ concluído · ⏳ ponta final
- **Feito:** 427 itens inventariados/dispostos (fases F0→F7, invariante aritmética fechada, 0 perdidos); cérebro enriquecido (`sobre-a-empresa/README.md` + 7 docs); **27 moves** no Drive via MCP; ledger em `Caos\dados\drive-absorvido.yaml`.
- **Pendente:** consolidar 4 docs de credenciais numa pasta restrita do Drive (`05 Credenciais Financeiras`) — Ronan **cancelou** migração p/ Infisical (sem caminho de escrita seguro); move via MCP read-only, sem abrir valores. Aguarda ordem.

### 6. Caos — MCP VSCode (catálogo)  📋 planejado, não executado
- Plano pronto (`...\.claude\plans\caos-preciso-que-voce-polymorphic-rabin.md`): documentar VSCode como host de MCP. **Falta:** disparar pesquisa (context7 + Firecrawl, nível máximo — exige confirmação) e criar `C:\Kolden\sobre-a-empresa\Ferramentas\VSCode\ferramentas.md` + editar índices.

### 7. Caos — Protocolo absorção-sem-perda  ✅ implementado + commitado
- Skill + reflexos `gate-reconciliacao.{py,sh}` em `Caos\.claude\settings.json` (commit `c0cd48cd`). Resíduo: testar o gate em absorção nova e expandir troubleshooting no SKILL.md.

### 8. Caos — Absorção marketingskills → squad Ariadne  ✅ absorvido + commitado
- Squad **Ariadne** (SEO+CRO): 7 agentes, 9 tasks, workflow, registrado em `registro-de-entidades.yaml` (commit `c0cd48cd`). Status "importado-cru". **Pendente:** Ritual de 9 fases (diagnóstico→PRD→validação), provisionar tools SEO (Semrush/Ahrefs/GSC), teste end-to-end.

---

## PENDÊNCIAS DE INFRAESTRUTURA

- **(a) Google Ads developer token** — 🔴 bloqueado pela Google. API habilitada + ADC ok, falta token aprovado. Ronan: solicitar Basic Access em `ads.google.com/aw/apicenter`; ao sair, gravar em Infisical (`/kolden/producao/GOOGLEADS_DEVELOPER_TOKEN` + `..._LOGIN_CUSTOMER_ID`) e ativar `google-ads-mcp`. Destrava EntreSolos (frente 3) e o squad Peitho.
- **(b) Git remote** — trocar `Koldenoficial/Kolden` → `Kolden-Oficial/Kolden` (org renomeada) e atualizar `C:\Kolden\CLAUDE.md` linha 17. Só sob ordem explícita.

---

## Prioridade sugerida

1. **GA4 do EntreSolos não coleta desde 22/12** (cliente ativo, trava remarketing/conversões) — frente 3a.
2. **Hermes → Claude Max** (gateway WhatsApp/CLI sem backend funcional) — frente 1.
3. **Service Account Google** (destrava GA4/GTM/GSC para o resto) — frente 4, depende de você.
