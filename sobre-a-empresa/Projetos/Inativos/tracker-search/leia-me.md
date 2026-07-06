---
cliente: "Tracker Search (projeto interno / SaaS)"
slug: "tracker-search"
modelo_negocio: "SaaS"
segmento: "Ferramenta interna — monitoramento de ofertas via WhatsApp"
status: "inativo"
drive_folder_id: "1GbGsiC6k594WfYLQC70m6hwK_q01Ijgm"
atualizado_em: "2026-06-25"
---

# Dossiê — Tracker Search

> Compilado a partir do Drive compartilhado da Kolden. Campos sem fonte ficam marcados
> **"sem registro no Drive"**. Não é um cliente externo: é uma **especificação de produto/SaaS interno**.

## 1. Identificação
- **Projeto:** Tracker Search
- **Modelo de negócio:** SaaS / app interno (uso pessoal e entre amigos; sem foco comercial de escala declarado)
- **Segmento / nicho:** assistente de monitoramento automatizado de promoções via WhatsApp ("scraper & alert service")
- **Status:** inativo — especificação madura, sem evidência de build concluído no Drive
- **Pasta no Drive:** [abrir](https://drive.google.com/drive/folders/1GbGsiC6k594WfYLQC70m6hwK_q01Ijgm)

## 2. Contato & Stakeholders
- **Decisor / ponto focal:** interno (criador + círculo de amigos). Sem nome registrado.
- **Canais:** sem registro no Drive

## 3. Contrato
Não se aplica — projeto interno. Sem contrato.

## 4. ICP & Posicionamento
- **Problema:** infoxicação em grupos de promoções (WhatsApp/Telegram); ofertas relevantes ("Nike", "iPhone", "Air Fryer") se perdem no ruído.
- **Solução:** bot que escaneia grupos em tempo real e notifica via WhatsApp apenas quando palavras-chave pré-definidas aparecem; feed limpo + dashboard de gestão (CRUD de keywords).
- **3 personas documentadas:** "Sneakerhead" oportunista (velocidade), "Mestre do Setup" tech-savvy (filtro de ruído de hardware), Amigo "Poupador" casual (simplicidade).
- **Diferenciais:** fricção zero (recebe onde já está), privacidade/foco, custo-eficiência (lean).

## 5. Pesquisa de Mercado
- **Modelo de referência:** bots equivalentes no Telegram (mais abertos a automação que o WhatsApp).
- **Risco-chave de mercado/técnico:** WhatsApp não tem API oficial para ler grupos de terceiros → necessidade de API não-oficial (Evolution API, Baileys, WPPConnect, Z-API) com risco de banimento de número.

## 6. Metas & OKRs
- **Critérios de sucesso registrados:** latência de notificação ≤ 60s após a postagem; zero falsos positivos (notificar só com a keyword); estabilidade 24/7.
- **Restrição-mestra:** desenvolvimento de baixo custo na Lovable (poucos créditos) → lógica de filtro por código puro/Regex, não IA.

## 7. Plano de 90 Dias / Roadmap
Documentação extensa de roadmap (Master Plan + Fila de Implementação) em fases:
- **Fase 1 (MVP "o cérebro"):** motor de filtro de string/Regex, cadastro de keywords, notificação direta no WhatsApp.
- **Fase 2 (refinamento):** dashboard web dark-mode (CRUD), filtro de preço, multi-usuário, deduplicação.
- **Fase 3 (futuro/escala):** IA de categorização/anti-spam, histórico de preços, comandos no chat.

## 8. Serviços / Escopo técnico
Spec de produto **completa**, cobrindo:
- **PRD** (visão, problema, solução, escopo em fases, requisitos funcionais RF01–RF04 e não-funcionais RNF01–RNF03).
- **Personas** (3) com tabela comparativa.
- **User Flows** (onboarding, cadastro de monitoramento, notificação/consumo, retenção/palavras-negativas, erros/exceções).
- **UX/UI** ("Terminal Moderno" dark-mode; design tokens com cores hex, tipografia Inter/Roboto, componentes Offer Card/Keyword Badge).
- **Arquitetura técnica** (stack: Lovable + Supabase + n8n/Pipedream + Evolution API/Baileys; 3 camadas ingestion/relay/output).
- **Banco de dados** (5 entidades: Users, Keywords, Sources, Promotions_Log, Notifications; ERD; dicas de índice/TTL/dedup por hash).
- **Compliance e Riscos** (banimento WhatsApp, ToS Meta, LGPD/zona cinzenta, segurança de chaves, checklist de mitigação).
- **Master Plan** + **Fila de Implementação** (ordem de build com critérios de conclusão).

## 9. Performance & Growth
Sem registro no Drive — produto não lançado/medido.

## 10. Histórico & Check-ins
- Documento único e denso (`Tracker Search.md`, ~52 KB) em formato de spec gerada por IA estrategista de produto, com perguntas de refinamento em aberto ao final de cada seção (origem dos dados, API de WhatsApp a usar, volume de grupos).
- Sem gravações/calls.

## 11. Pendências & Observações — **POR QUE É REUTILIZÁVEL**
**POR QUE É REUTILIZÁVEL:**
- É um **blueprint de SaaS interno pronto para build**, que casa diretamente com **CataLogo / Tracker Flow** (projeto React+Vite do workspace) — mesma família de produto (rastreamento/monitoramento).
- O **modelo de dados de monitoramento de promoções** (Keywords → Sources → Promotions_Log → Notifications com dedup por hash) é reaproveitável para qualquer alerta baseado em keyword.
- A **análise de Compliance/Riscos de automação WhatsApp** (banimento, APIs não-oficiais, LGPD) é um ativo transversal: vale para o **Hermes** (gateway WhatsApp Baileys) e qualquer projeto Kolden que toque WhatsApp.
- O padrão de **arquitetura lean** (Lovable/Supabase + worker externo VPS para o "motor" 24/7, evitando IA por mensagem) é um molde de custo para MVPs internos.

**Pendências em aberto (do próprio doc):** definição da API de WhatsApp, volume de grupos, se há acesso administrativo aos grupos. Build não iniciado conforme registros.

## 12. Fontes (docs do Drive usados)
- `1GbGsiC6k594WfYLQC70m6hwK_q01Ijgm` — pasta raiz "Tracker Search"
- `1-Jgl1KJTBbHo5-uS0bU1PGuc89fbpZye` — "Tracker Search.md" (spec completa: Visão Geral, Análise Estratégica, PRD, Personas, User Flows, UX/UI, Arquitetura, Banco de Dados, Compliance, Master Plan, Fila de Implementação)
