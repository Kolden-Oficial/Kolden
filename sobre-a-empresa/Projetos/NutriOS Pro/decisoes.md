---
id: projeto-nutrios-pro-decisoes
titulo: "NutriOS Pro — Decisões"
resumo: "Log de decisões de arquitetura/produto (ADRs)."
categoria: projeto
palavras-chave: [decisoes, adr, log]
status: em-producao
atualizado-em: 2026-06-24
relacionados: [arquitetura]
---

# Log de Decisões — NutriOS Pro

> Uma entrada por decisão relevante (ADR enxuto). Datas anteriores a 2026-06-24 são aproximadas — extraídas do dossiê-fonte (`assets/relatorio-original.md`), que não data cada decisão individualmente.

## ~2026 — Modelo de receita: assinatura recorrente em vez de pagamento único
- **Contexto:** O produto nasceu de planilhas vendidas one-off na Hotmart.
- **Decisão:** Cobrar em recorrência mensal (SaaS multi-tenant com assinatura).
- **Alternativas consideradas:** Manter venda avulsa de planilhas/licença única.
- **Consequências:** Busca por longevidade, LTV e suporte contínuo; exige infra de billing (Stripe/gateway, ainda pendente) e retenção como métrica central.

## ~2026 — Nome e domínio: "NutriOS Pro"
- **Contexto:** Nome original NutriCalc/Nutrios; domínio `nutrios` orçado em R$ 30.000 e inacessível.
- **Decisão:** Adotar "NutriOS Pro" e comprar `nutriospro.com.br` por R$ 40.
- **Alternativas consideradas:** Adquirir o domínio `nutrios` premium.
- **Consequências:** Custo de aquisição irrisório; marca "Pro" reforça posicionamento profissional.

## ~2026 — Arquitetura serverless sem backend dedicado (RLS na borda)
- **Contexto:** App recém-criado, equipe enxuta, necessidade de velocidade de entrega.
- **Decisão:** Não usar Backend-for-Frontend; segurança via Row Level Security (RLS) nativo do PostgreSQL/Supabase, com cálculos no frontend.
- **Alternativas consideradas:** Servidor backend isolado entre UI e banco.
- **Consequências:** Baixo custo, velocidade inicial e escalabilidade transparente; em contrapartida, lógica diluída e risco de inconsistência de policies (ver dívida técnica de RLS).

## ~2026 — IA isolada em Edge Functions (Deno)
- **Contexto:** Necessidade de análise por IA (fotos, rótulos, exames, Body 3D) sem sobrecarregar o client.
- **Decisão:** Concentrar IA e administração em 7 Edge Functions Deno, com `verify_jwt = false` e auth manual por header.
- **Alternativas consideradas:** Chamadas de IA direto do frontend.
- **Consequências:** Retaguarda serverless para IA; exige rate limiting próprio (`rate_limit_log`) e cuidado com as secrets `LOVABLE_API_KEY`/`SUPABASE_SERVICE_ROLE_KEY`.

## ~2026 — TMB por classificação corporal
- **Contexto:** Diferentes perfis corporais respondem melhor a diferentes equações preditivas.
- **Decisão:** Selecionar a equação automaticamente pela classificação corporal — Harris-Benedict (eutrófico), Mifflin (sobrepeso), Tinsley.
- **Alternativas consideradas:** Equação única fixa para todos os pacientes.
- **Consequências:** Maior precisão clínica percebida; acopla o cálculo ao enum `body_classification`.

## 2026-06-24 — Integração no monorepo Kolden: repo próprio + gitignore
- **Contexto:** Trazer o código (repo independente, deploy via Lovable) para `Projetos/NutriOS Pro/` mantendo acesso local total.
- **Decisão:** Clonar para `app/` mantendo o `.git` do nutriospro e ignorar a pasta no `.gitignore` do monorepo (padrão `Pheme/deploy/postiz`).
- **Alternativas consideradas:** Flat-tracking no monorepo (igual ao CataLogo), removendo o `.git`.
- **Consequências:** Preserva o deploy Lovable e o `pull`/`push` ao remote original; o código não entra no histórico do monorepo (vive como repo separado).

## 2026-06-24 — Tipografia oficial: Baloo 2 (display) + Inter (UI/dados)
- **Contexto:** O brandbook propunha Baloo 2 + Inter, mas o app carrega Poppins + Inter; a tipografia estava marcada como "proposta a validar".
- **Decisão:** Adotar **Baloo 2** para wordmark/títulos/display (rounded-geométrica, ecoa o monograma "nö") e **Inter** para UI, corpo e dados clínicos (com `tabular-nums`). Baloo 2 substitui Poppins. Validada por Ronan.
- **Alternativas consideradas:** Manter Poppins + Inter; Quicksand/Fredoka (display); IBM Plex Sans/Source Sans 3 (UI). Todas preteridas.
- **Consequências:** "Baloo 2 acolhe, Inter informa." Implica, na Fase 4, ajustar `app/index.html` (trocar o carregamento de Poppins por Baloo 2) e o `fontFamily` em `app/tailwind.config.ts` (`display: "Baloo 2"`).

## 2026-06-24 — Fase 3 (fundação visual) oficializada na documentação
- **Contexto:** Brandbook (posicionamento, voz, identidade visual), auditoria de UI, pacote de tokens (`tokens.css`/`tokens.json`/`tailwind.tokens.js`) e specs de re-skin de componentes estavam completos, porém em `status: rascunho`. O código `app/` segue 100% na identidade antiga (`#0D8070`/`#00FF94`, light-first); o redesign não foi iniciado.
- **Decisão:** Promover os 7 documentos da Fase 3 para `status: oficial`, consolidando a fundação visual como referência fechada. A **aplicação no código `app/` passa a ser a Fase 4**, com roteiro já especificado em `design-system/02-tokens/leia-me.md §4`.
- **Alternativas consideradas:** Aplicar a fundação no código já nesta sessão (baixo risco) ou ir até o re-skin completo (alto risco em produção) — ambas adiadas a pedido de Ronan.
- **Consequências:** A documentação vira fonte de verdade estável; ficam como pendências residuais (não bloqueantes) os arquivos vetoriais SVG/AI do logo/mascote (hoje só PDFs) e a auditoria de contraste in-vivo (depende da Fase 4).

## 2026-06-24 — Direção visual: identidade própria do produto
- **Contexto:** Redesign de todo o visual; o NutriOS Pro já tem logo/paletas próprios (PDFs em `assets/`).
- **Decisão:** Formalizar identidade própria do NutriOS Pro (brandbook + design system dedicado), não reskin da marca-mãe Kolden.
- **Alternativas consideradas:** Aplicar a identidade Kolden (scarlet/ink, Lato+Eurostile); híbrido com governança Kolden.
- **Consequências:** Marca de produto distinta; o design system Kolden serve só como referência de estrutura/governança.
