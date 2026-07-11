---
id: processos
titulo: "Processos e SOPs"
resumo: "Processos operacionais e SOPs da Kolden: onboarding de cliente no GHL, catálogo de serviços de entrega, organização de ferramentas/acessos e processos comerciais (prospecção, kick-off/QNP, debriefing, daily/sprint)."
categoria: operacao
palavras-chave: [processos, sop, operacao, fluxos, ghl, onboarding, escopo, prospeccao, comercial, kickoff, debriefing, daily]
status: rascunho
atualizado-em: 2026-06-25
relacionados: [metricas-e-okrs, juridico-e-compliance, planejamento-estrategico, area-receita, ofertas-e-produtos]
fontes: [drive--00-gestao-empresarial, drive--02-comercial]
tipo: nota
area: operacao
up: "[[sobre-a-empresa/Kolden/operacao/_MOC-operacao]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/leia-me|leia-me]]"
  - "[[sobre-a-empresa/Kolden/operacao/planejamento-estrategico|planejamento estratégico]]"
---

# Processos e SOPs

> Seções 1–3 absorvidas da área "00 | Gestão Empresarial > 03 | Processos & POPs" do Drive (2026-06-25). **Credenciais nunca entram aqui — via Infisical.**

## Lista de processos
| Processo | Objetivo | Dono | Status |
|---|---|---|---|
| Onboarding de cliente no GHL | Padronizar setup do cliente no GoHighLevel | <a definir> | esboço |
| Entrega de serviços de marketing | Executar o escopo contratado | Bloco Marketing | catálogo definido |
| Organização de ferramentas/acessos | Centralizar credenciais e custos | <a definir> | planilha (no Drive) |

## 1. SOP — Onboarding de cliente no GoHighLevel ([K] Processos GHL)
Checklist de dados e setup capturado no onboarding (documento "[K] Processos GHL"). Campos a coletar do cliente:
- **Informações gerais:** nome fantasia, razão social, e-mail/telefone comercial, domínio com marca, site, nicho, moeda.
- **Informações da empresa:** tipo de empresa, setor, tipo de ID de registro, CNPJ, regiões de operação.
- **Endereço físico:** rua, cidade, estado, país, fuso horário, idioma da plataforma e de comunicação externa.
- **Representante autorizado:** nome, sobrenome, e-mail, cargo, telefone (com código do país).
- **Detalhes comerciais:** setor, tamanho da empresa (Pequena 1–10 / Média 11–100 / Grande 101–500 / Muito grande 501+), objetivos (gerar leads, aumentar vendas, entender tráfego, engajamento/retenção).

Passos operacionais documentados:
1. Logar com a conta principal do cliente no Gmail (pelo celular).
2. _(demais passos ainda não detalhados no documento)._

Processos de Design: download das fontes personalizadas do cliente; configurar cores globais personalizadas.

Ferramentas tocadas no onboarding: Cloudflare (DNS), Google Agenda, Google (centralizar tudo se possível), Facebook, LinkedIn, TikTok.

> A subpasta "Estrutura de Arquivos" sob Processos & POPs é um **template organizacional genérico** (6 grandes blocos: Gestão Empresarial, RH Cultura, Gestão de Produtos, Comercial, Projetos, Operacional), quase todo vazio — esqueleto de pastas para clientes, não processo populado. Ver mapa de decisão da absorção.

## 2. Catálogo de serviços (escopo de entrega)
Frentes de serviço entregues ao cliente (Anexo I — Escopo de Serviços Detalhado). Cada uma tem um fluxo próprio:

1. **Consultoria de Marketing & Vendas** — encontros quinzenais (Google Meet): avaliação inicial → planejamento estratégico → implementação → acompanhamento.
2. **Gestão Avançada de CRM** — definição de necessidades → indicação do CRM ideal → configuração → treinamento → personalização → integração com automação de marketing.
3. **Copywriting** — análise do negócio e estratégia de conteúdo → scripts de criativos estáticos e vídeos (Facebook/Google Ads) → copy de legendas → cronograma mensal → revisão por feedback.
4. **Tráfego Pago (Facebook e Google)** — definição de objetivo/público → planejamento (orçamento, duração, segmentação) → execução (testes A/B, monitoramento diário, ajustes) → análise de resultados.
5. **Google Meu Negócio / Business Profile** — criar/otimizar perfil → relatório de melhorias → estratégia de posicionamento (top 3 no mapa) → treinamento (solicitar e responder avaliações, manter atualizado) → monitoramento.
6. **Automação Inteligente (ManyChat)** — definição de necessidades → configuração → criação de chatbots → fluxos de conversa → análises/insights → ajustes.
7. **Inteligência de Dados** — dashboards customizados → análise via Google Analytics → relatórios simplificados → ranking de melhores anúncios → gráficos/tabelas → resumo + próximas ações.
8. **Suporte & Auxílio Integrado** — dúvidas diárias via WhatsApp; encontros quinzenais de treinamento/consultoria; relatório completo mensal (WhatsApp ou e-mail).

> Esse catálogo também define o nicho da Kolden: **assessoria de marketing digital para negócios locais.**

## 3. Organização de ferramentas e acessos
Existe a planilha **"[K] Central de Ferramentas e Acessos"** no Drive (subpasta "Organização de Ferramentas"), que cataloga o stack da empresa por categoria, com login, custo, frequência de pagamento e status. **Essa planilha contém senhas em texto plano e por isso NÃO foi absorvida** — a gestão de segredos da Kolden é via Infisical (regra de ouro). Aqui fica apenas o mapa de categorias e ferramentas ativas pagas (sem credenciais):

| Categoria | Ferramentas mapeadas |
|---|---|
| Infraestrutura/Hospedagem | Cloudflare (DNS), Registro.br, Hostinger |
| Bancos de dados/Backend | Neon, Supabase |
| Monitoramento | Sentry, Browserbase, Firecrawl |
| Vendas/CRM | Kommo, GoHighLevel (~R$ 545/mês) |
| Design/Conteúdo | Leonardo.ai, Genially, Coolors, Gamma, Canva, CapCut (~R$ 66/mês), Figma |
| LLMs | ChatGPT, Hugging Face, Claude Code (~R$ 117/mês), DeepSeek |
| Eng. de software/Agentes | Infisical, LobeHub (~R$ 125/mês), Cursor, Lovable (~R$ 251/mês), GitHub, Docker |
| Voz/áudio | ElevenLabs |
| Roteadores de IA | Eden AI, OpenRouter |
| Busca/scraping | Apify, PhantomBuster |

> Há também uma planilha "[CLIENTE] Central de Acesso e Ferramentas" (.xlsx, binário) na Estrutura de Arquivos — registrada, não aberta. O catálogo canônico vivo de ferramentas da Kolden é `sobre-a-empresa/Ferramentas/ferramentas.md`.

## 4. Processo comercial (prospecção → fechamento)

> Absorvido da área comercial do Drive ("06 | Templates & Ferramentas", 2026-06-25). O catálogo de ofertas, precificação e modelo de proposta vive em `mercado-e-posicionamento/ofertas-e-produtos.md`; o board de sócios, pipeline e funil em `areas/receita.md`. Aqui ficam os **SOPs/scripts** comerciais.

### 4.1 SOP — Prospecção ativa (cold outreach)
Estrutura documentada (doc "Script de PROSPECÇÃO para Clínicas de Estética", generalizável a outros nichos):
1. **Informações/abertura de valor** — 6 ganchos de interesse (desafios do mercado, como se destacar, 3 pilares de sucesso, o que os grandes experts fazem, a chave do digital, como receber 5–10 interessados/dia).
2. **Abordagem** — confirmação do contato ("esse número é da [empresa]?") → identificação (Ronan Silva, CEO da Kolden, Assessoria de Performance) → proposta de reunião de 30 min de diagnóstico.
3. **Ramificações SIM / NÃO** — textos-base prontos (versão crua + versão refinada por LLM), incluindo follow-up para quem não respondeu ("percebi que você ainda não executa um processo de Follow-up qualificado…").

Estrutura macro de prospecção ativa (pasta "PROSPECÇÃO ATIVA"): `00 Protocolos → 01 ICP → 02 Pontos de Contato (Cold Call em blocos + Cold Mail em 5 e-mails: despertar interesse, follow-up, assunto importante, break-up) → 03 Fluxo de Cadência → 04 Listas/Banco de Dados`. Os scripts de Cold Call/Cold Mail são templates `.docx` (binários, registrados, não absorvidos).

### 4.2 SOP — Kick-Off / QNP (Questionário de Negócio e Performance 360°)
Documento de entrada que captura 100% do contexto do cliente antes de iniciar. O **QNP Universal** (template aplicável a qualquer nicho) cobre 13 blocos: contexto do negócio, momento atual, financeiro/métricas-chave (faturamento atual × desejado, margem de contribuição), oferta/produtos (ticket, upsell/recorrência), marketing/aquisição, funil de vendas e conversão (CPL/CPA/CAC/LTV), público/mercado (ICP, dores, objeções), posicionamento/PUV, histórico e aprendizados, obstáculos-chave, investimento/expectativa, **expectativa de parceria** (agência tradicional × gestão empresarial executiva orientada a performance — pergunta de qualificação-chave) e objetivo final (visão em 12 meses).

Inclui análise **S.W.O.T** e mapeamento de **públicos** (até 3 personas: sexo, idade, renda, filhos, profissão, interesses, localidade, peculiaridades regionais) e **PUV**.

> Há uma versão preenchida (cliente pizzaria) usada como exemplo — não absorvida (dado de cliente). O **template universal** é o ativo reutilizável. Existe também um "Diagnóstico Estratégico 360°" como applet no Google AI Studio (binário/experimento) que automatiza o QNP.

### 4.3 SOP — Debriefing de lançamento (pós-projeto)
Templates da pasta "Debriefing" (`.docx`/`.xlsx`, binários, registrados): planilha de debriefing de lançamento, documento de debriefing e padrão de estrutura para apresentação de debriefing. Ritual de pós-mortem para projetos de lançamento. A recriar como `sop-debriefing.md` se virar processo vivo.

### 4.4 Rotina operacional (cadência do squad)
Da "Proposta de Parceria: O Squad" e da "Central de Daily":
- **ClickUp obrigatório** — escritório virtual; nenhuma tarefa/comunicação de projeto fora dele; sob a guarda do Account.
- **Daily** (≤30 min) — "o que fiz ontem, o que farei hoje, o que está me travando".
- **Sprint semanal** (sexta) — fechamento da semana e planejamento da próxima.

## Perguntas-guia (a evoluir)
- Quais passos faltam no SOP de onboarding GHL (passo 2 em diante)?
- Cada frente de serviço (§2) merece virar um `sop-<nome>.md` próprio?
- Os scripts de Cold Call/Cold Mail (binários `.docx`) merecem ser transcritos para SOPs vivos?
- O Debriefing deve virar `sop-debriefing.md` próprio?

## Fontes (Drive)
Área "00 | Gestão Empresarial > 03 | Processos & POPs":
- `1HOEuHuX1f2oATgkg24zlGKveo3hFfIamMqS31DM6chw` — [K] Processos GHL.
- `1YotHnY00Cj51VR3A6VXPQX2mO5P4g10nA2CtQ1qcHhQ` — [K] Central de Ferramentas e Acessos (Sheet; NÃO absorvida — contém senhas).
- `1V-vR8fEK40fl2Vqd2l4w32ooa9eyziV3TXVbEpy7h8U` — Anexo I Escopo de Serviços (catálogo §2; doc reside em Jurídico).

Área comercial ("06 | Templates & Ferramentas"):
- `1FbpaNNeRbQ9hNz5IMKDB7E3f2tndoyN4cx--ZrlxVQU` — Script de PROSPECÇÃO para Clínicas de Estética (Doc).
- `1VMTilEhlBZ6nsOgYijSszVcHNFIl2l8Dz3MdFqqBs1k` — QUESTIONÁRIO DE NEGÓCIO & PERFORMANCE (360°) — QNP Universal (Doc).
- `1gOgNHbMF0O7dQb989AghqgqJ38NrLSBYPMLCfyCrq5w` — Kick-Off - QNP (Doc; versão exemplo preenchida não absorvida).
- `1-JiEEaKNAlPqOtJ5Qq7iU_PQBfIVzBTs` — pasta Debriefing (3 templates `.docx`/`.xlsx`, binários).
- `1vQTDbW9Jvf4Wg5CAmLV5MuoBHzQKNQkq-kqfdsi2gys` — Central de Daily - Kolden (Doc; rotina + atas, atas não absorvidas).
