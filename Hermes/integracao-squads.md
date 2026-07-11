---
tipo: nota
area: Hermes
up: "[[Hermes/_MOC-hermes]]"
relacionado:
  - "[[Hermes/README|README]]"
---

# Hermes × Squads — Como os squads rodam no runtime

Os squads (`C:\Kolden\<NomeGrego>\`) são **definições** (agentes, tasks, workflows em PT-BR).
Quem os **executa** é o Hermes — o runtime model-agnostic da Kolden. Este guia mostra como
conectar os dois. Status: orientação inicial (squads em `importado-cru`).

## O que o Hermes oferece aos squads

| Recurso Hermes | Para que serve no squad |
|---|---|
| **OpenRouter** (300+ modelos) | Roda qualquer agente sem amarra a um LLM. Troca de modelo por `/model <provider:model>`. Cumpre o Art. V (agnóstico de modelo). |
| **Gateway WhatsApp/Telegram** (Baileys) | **Entrega**: relatórios, alertas e pedidos de aprovação chegam ao Ronan no celular. Respostas curtas (Regra de ouro nº 5). |
| **Cron** (agendador) | Dispara workflows sem humano: relatório semanal, varreduras, alertas por threshold. |
| **Subagents (contexto isolado)** | Tier 1 dos squads roda em paralelo, cada especialista com seu contexto. |
| **Infisical** | Toda credencial (Meta, Google Ads, GA4...) resolvida em runtime — nunca em texto puro. |

## Padrão de execução (qualquer squad)

1. **Entrada** — comando no Claude Code (`abrir C:\Kolden\<Squad>\` e pedir) ou gatilho do Hermes
   (mensagem no WhatsApp / cron).
2. **Orquestrador (tier 0)** — diagnostica e roteia ao especialista certo (cada squad tem um
   `*-chief` / orquestrador).
3. **Especialistas (tier 1)** — executam via subagents; o Hermes paraleliza quando o workflow permite.
4. **Saída/handoff** — resultado volta ao orquestrador, que sintetiza; entrega final pelo gateway
   (WhatsApp) quando o canal for o celular.
5. **Aprovação** — ações que mudam algo (subir campanha, publicar) **exigem aprovação explícita** do
   Ronan antes de executar (Regra de ouro nº 4).

## Prioridade: Peitho (Tráfego) — primeiro squad a operar via Hermes

O Peitho já tem PRD (`Peitho/prd-de-ia.md`) desenhando os 3 workflows. Plano de ativação:

- **Relatório semanal** → **cron Hermes** (ex.: seg 08h) roda `Peitho/workflows/wf-*` →
  3 plataformas em paralelo (subagents Meta/Google/TikTok) → análise consolidada →
  **entrega no WhatsApp** via gateway. Credenciais Meta/Google Ads via Infisical.
- **Alerta por threshold** → cron a cada N horas: snapshot vs metas → dispara alerta no WhatsApp
  se violação (ROAS/saldo/conta).
- **Análise on-demand** → comando direto no Claude Code (`/peitho ...`).

> Guardrails do Peitho (do PRD): zero autonomia para executar mudanças sem aprovação; sem
> automação de navegador em contas de anúncio; validação de `client_id` antes de agir.

## Próximos passos
1. Configurar o cron do Hermes para o relatório semanal do Peitho (após provisionar Meta/Google Ads no Infisical).
2. Mapear, por squad, quais workflows fazem sentido agendar (Metis: relatório de métricas; Egide: varredura periódica).
3. Refino pelo Ritual do Caos (fase 2) define memória e reflexos de cada squad antes do go-live em produção.
