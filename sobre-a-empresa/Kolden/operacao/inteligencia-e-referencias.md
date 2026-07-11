---
id: inteligencia-e-referencias
titulo: "Inteligência e Referências Internas"
resumo: "Catálogo do conhecimento interno reutilizável da Kolden: metodologias (BLACK BOOK de Conrado Adolpho, OKR), referências técnicas (mapeamento exaustivo do ecossistema de APIs da Meta), material de gestão e de produto. Para cada item: o que é, onde está (fileId no Drive), como usar."
categoria: operacao
palavras-chave: [inteligencia, referencias, metodologia, black-book, conrado-adolpho, okr, api-meta, marketing, gestao, biblioteca-interna]
status: rascunho
atualizado-em: 2026-06-25
relacionados: [processos, metricas-e-okrs, planejamento-estrategico, ofertas-e-produtos]
fontes: [drive--06-templates-e-ferramentas]
tipo: nota
area: operacao
up: "[[sobre-a-empresa/Kolden/operacao/_MOC-operacao]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/leia-me|leia-me]]"
  - "[[sobre-a-empresa/Kolden/operacao/planejamento-estrategico|planejamento estratégico]]"
---

# Inteligência e Referências Internas

> Absorvido da área **"06 | Templates & Ferramentas" → subpastas "Inteligência Interna", "Novos Produtos" e raiz** do Drive (2026-06-25). Este é o catálogo da **biblioteca de conhecimento interno** da Kolden — metodologias densas, referências técnicas e material de gestão que os agentes consultam para fundamentar decisões. A maioria dos itens é **binário (PDF)** preservado no Drive; aqui registramos **o que é, o fileId e como usar** — o conteúdo bruto dos PDFs não é transcrito (são livros/ebooks de terceiros, material de referência). O item textual de alto valor (Mapeamento API Meta) foi sintetizado abaixo.
>
> **Credenciais nunca entram aqui — via Infisical (Art. VII).**

## 1. Referência técnica — Ecossistema de APIs da Meta (sintetizado)

Documento de pesquisa institucional **"Mapeamento API Meta: Funcionalidades e Plataformas"** (Google Doc, ~80 KB, 57 referências citadas). É uma análise exaustiva e reutilizável do ecossistema de APIs da Meta — **não é material de um cliente específico** (apesar de viver na pasta "Novos Produtos"). Serve como base de arquitetura para qualquer automação de Ads/social/mensageria da Kolden e dos clientes.

- **fileId:** `1nzYjxJF1whvt_SiP-8c8wXZai_cizLFkv-zx6OFsHZM` (Doc, exportável em markdown).
- **Cruzamento:** complementa `sobre-a-empresa/Ferramentas/Meta/ferramentas.md` (que cobre só a **Conversions API / CAPI**). Este mapeamento cobre o **ecossistema inteiro**.

Pilares cobertos:

| Pilar | O que destrava | Notas de arquitetura |
|---|---|---|
| **Marketing API (Core)** | CRUD em massa de campanhas/ad sets/ads; testes A/B programáticos; regras de automação condicionais (escala de orçamento por ROAS, stop-loss, dayparting, lance dinâmico por CPA); Insights API (entrega, engajamento, custo, conversão); Custom/Core Audiences (hash SHA-256, mín. 100 usuários/país, Targeting Search API); Catalog API + Advantage+. | Hierarquia: Business Manager → Ad Accounts → Campaigns → Ad Sets → Ads. `object_story_spec`, `url_tags` (UTM). |
| **Facebook Graph API (orgânico)** | Pages API (agendamento, moderação em escala), Page Insights (métricas legadas depreciam — manutenção contínua por versão v19/v20…), Social Plugins/Login. | Modelo Nós/Arestas/Campos. |
| **Instagram Graph API** | Só contas profissionais (Business/Creator); publicação (Reels/Stories via contêineres de mídia em 2 etapas), Insights, moderação de comentários, `mentioned_media`. Rate limiting por **Business Use Case (BUC)** — exige filas assíncronas + backoff exponencial. | `VIDEO` descontinuado → usar `REELS`. DMs **não** suportadas pela Graph clássica → Messaging API. |
| **WhatsApp Business Platform** | On-Premises vs **Cloud API** (recomendada); janela de sessão de 24h; **Message Templates** (Autenticação/Utilitárias/Marketing, pré-aprovadas); Product Message Templates (catálogo); **WhatsApp Flows** (mini-apps em formulário JSON na GUI); Programmable Voice. | Até 20 números/WABA (1.000 com OBA verde). |
| **Messenger Platform** | Rich messaging (templates/bubbles, `title` ≤80 chars), botões `web_url`/`postback`, pagamentos nativos; reply/push/broadcast/multicast/narrowcast; **Handover Protocol** (transbordo bot→humano via `messaging_handovers`). | Integra com Cognigy/ManyChat/ChatBot Builder/Zendesk como Secondary Receivers. |
| **Webhooks (orientado a eventos)** | Push assíncrono (vs polling); handshake TLS (sem self-signed), Verify Token, batched payload array (~25 MB/req); responder 200 OK rápido e desacoplar processamento (filas RabbitMQ/SQS/Kafka). | Filtragem por objeto/campo nas subscrições. |
| **SDKs e governança** | Business SDKs (PHP, Ruby, Python `facebook-business`); tokens de **curto prazo (~1h)**, **long-lived (~60 dias)** e **System User Token (permanente, server-to-server)**; escopos (`ads_management`, `ads_read`, `pages_manage_ads`); **App Review** + Live Mode (screencasts, verificação de PJ). | Lógica sensível sempre **server-side**, nunca client-side. |

## 2. Metodologias de marketing e gestão (biblioteca de referência — binários no Drive)

| Item | O que é | fileId(s) | Como usar |
|---|---|---|---|
| **BLACK BOOK — Conrado Adolpho** | Metodologia "8Ps / 8i" do marketing digital (caps. 1–11 em 8 PDFs): funil de aquisição, cliente de 1ª compra, cliente recorrente, não-cliente, etc. Material de referência denso de marketing de resposta direta. | `14W-fQDFf7wigFg5sFVQ4vxxbQ54zXYmS`, `14elIyYk1MsdyZD5QiZMJP6zbixe6YrGa`, `14gmP5NxzAQsZS52S94RDvxpuME_5JrCE`, `14knxEQSGgkCWp_w3KGxEy9WhqkzVra71`, `14is2DgVBbU4zsSVJOsIGbI8tGs-e_GZu`, `14oJw9ZiTfJWy_CjePggQ59Eab392rq71`, `14wdWUhrIr9ICgI3KSbeEglz-Ct_3jFmO`, `15-RH8oLWhPXGrJOCmpUQ9Sc0ZgpRdQiV` | Fundamento de estratégia de funil e copy para Caliope/Peitho/Aletheia. PDFs — abrir no Drive. |
| **Guia Definitivo — OKR** | Guia de gestão por OKR (Objectives & Key Results). | `1rPPil0E_qC73dXJwb1N3EIHDc3dWSknM` | Base para preencher `metricas-e-okrs.md` (hoje template vazio). PDF. |
| **RESUMO OKR** | Resumo executivo do OKR (condensado do guia). | `1eG9iaCIGY-T_xVJWH2k4yNP8ahelv_B1` | Idem; versão rápida. PDF. |
| **Metodologia para Cursos (Mapa Mental)** | "METODOLOGIA NO MAPA MENTAL" — método de produção/estruturação de cursos/infoprodutos. | `12UjXyvOCACUw_PIR4WK7FFvF83MGbgMW` | Referência para a frente de Novos Produtos / infoprodutos. PDF. |
| **Operação Kolden** | Pitch/visão institucional da operação Kolden (legado, formato apresentação). | `1Sy_zUteSzLVWn94gLW3U6lXNaUg49R7e` | Contexto histórico de posicionamento. PDF. Cruzar com `mercado-e-posicionamento/`. |
| **Rotina de liderança** | Documento de cadência/rotina de liderança (gestão de pessoas). | `1v6E_RdtoxJXIJ1EsJmcaiqiM6XNWUaTRD1aC7qQ7Szc` | Referência de gestão; candidato a área Pessoas/Cultura. Doc. |
| **Ebook — Cora Conta PJ (Gestão de Cobranças)** | Ebook de terceiro (banco Cora) sobre gestão de cobranças/financeiro PJ. | `1dGSQM80ZmTc7EwEJ13hnOjIDrXTFuboH` | Referência financeira pontual. PDF de terceiro — baixo valor incremental. |
| **Lista de Campos do Facebook Ads** | Planilha com dicionário de campos do Facebook Ads (referência de targeting/relatório). | `14UXCEkqbkKgUsVO5nI0GljJ-MSz54hm7` | Apoio operacional ao gestor de tráfego; complementa o mapeamento API Meta (§1). `.xlsx`. |

## 3. Notas de absorção

- **Reclassificação vs passada-02:** o "Mapeamento API Meta" (`1nzYjxJF…`) havia sido **descartado pela passada-02** como "mapeamento p/ cliente". Verificação arquivo-a-arquivo mostrou que é **referência técnica institucional reutilizável** (ecossistema completo de APIs Meta, 57 fontes). Foi **re-absorvido aqui** (§1).
- O **"[🔱 Kolden Flow] O Sistema Operacional Completo para Agências…"** é, fisicamente, apenas uma **pasta-container** com 1 doc dentro (`[Bazze] Briefing Clickup`, briefing de cliente já descartado pela 02). Não existe um "sistema operacional" textual para absorver sob esse nome — apenas o rótulo da pasta. Registrado para evitar expectativa falsa.
- Os PDFs (BLACK BOOK, OKR, Metodologia, Operação Kolden, Ebook Cora) são **binários preservados no Drive** — catalogados por fileId, não transcritos (material de referência/terceiros). Quem precisar do conteúdo abre no Drive.

## Perguntas-guia
- O Guia/Resumo OKR deve ser destilado para preencher de fato `metricas-e-okrs.md`?
- A "Rotina de liderança" inaugura uma área Pessoas/Cultura no cérebro?
- O mapeamento API Meta (§1) deve virar base de um manual técnico em `Ferramentas/Meta/` (hoje só CAPI)?
