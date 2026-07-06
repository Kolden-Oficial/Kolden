---
id: projeto-nutrios-pro-decisoes
titulo: "NutriOS Pro — Decisões"
resumo: "Log de decisões de arquitetura/produto (ADRs)."
categoria: projeto
palavras-chave: [decisoes, adr, log]
status: em-producao
atualizado-em: 2026-07-03
relacionados: [arquitetura]
---

# Log de Decisões — NutriOS Pro

> Uma entrada por decisão relevante (ADR enxuto). Datas anteriores a 2026-06-24 são aproximadas — extraídas do dossiê-fonte (`assets/relatorio-original.md`), que não data cada decisão individualmente.

## 2026-07-03 — Identidade v2: promoção a `oficial`; v1 arquivada apenas via git
- **Contexto:** Ronan finalizou em 2026-06-30 a versão final da identidade visual (4 arquivos no Drive `1TS2e34HQ6DOSw6cv9vnph8J46K0CG3Mv`: PDF de definições, PNG do logo, `quip.otf`, nota Google Doc sobre "Geometr415 Blk BT"). O material trouxe mudanças materiais em paleta, wordmark e tipografia que não cabiam mais no brandbook v1 sem reescrita.
- **Decisão:** Promover a identidade **v2 (2026-06-30)** a `status: oficial` reescrevendo no lugar os 14 documentos ativos do brandbook + design-system + apresentação. Arquivar a v1 (2026-06-24) apenas via `git log` — sem cópia em subpasta `_arquivo/`. Rota de execução: Contrato de Missão em `Olimpo/contratos/missoes/m-20260703-nutrios-pro-rebrand-v2.yaml` com fan-out Hermes→Zeus→Apolo+Hefesto→Aglaia (brandbook) + Harmonia (tokens), reconciliação Dike.
- **Alternativas consideradas:** Arquivar a v1 em `brandbook/_arquivo/2026-06-24-v1/` (rejeitada — Ronan escolheu reescrever no lugar via AskUserQuestion no plan-mode); diff incremental preservando trechos da v1 (rejeitada — mudanças de paleta e wordmark são estruturais, não incrementais).
- **Consequências:** Rastro histórico da v1 vive só em git. Baloo 2 e Forest Green desaparecem da referência ativa. Voz da marca, posicionamento e arquétipo Cuidador+Mago são **preservados** — o rebrand v2 é de sistema visual, não de estratégia. Assets finais em `assets/2026-06-30-final/` com dossiê `_notas-tipografia.md`.

## 2026-07-03 — Tipografia oficial revisada: Quip + Geometr415 + Inter (revoga Baloo 2)
- **Contexto:** A decisão de tipografia de 2026-06-24 assumiu que o wordmark era "desenhado, não depende de fonte de sistema" e adotou Baloo 2 (display) + Inter (UI). Os assets finais revelaram que (a) o wordmark real é `Quip Regular` de Ahmad Suhadi (`suhadidesign`, 2025), fonte proprietária embalada com o pacote da identidade; e (b) o "O" do símbolo "nö" é derivado de `Geometr415 Blk BT` (Bitstream, comercial) — ativo gráfico do símbolo, não fonte da UI.
- **Decisão:** Tipografia oficial v2:
  - **Display / wordmark / títulos:** `Quip Regular` (Ahmad Suhadi, 2025). Único weight (400). Fallbacks CSS: `"Quip", "Nunito", "Fredoka", system-ui, sans-serif`.
  - **UI / corpo / dados clínicos:** `Inter` (inalterada da v1). Regular/Medium/SemiBold + `tabular-nums` para números clínicos.
  - **Ativo gráfico proprietário:** `Geometr415 Blk BT` — uso restrito ao arquivo estático do símbolo "nö". **Nunca** como webfont.
- **Alternativas consideradas (todas preteridas):** manter Baloo 2 (2026-06-24); Quicksand; Fredoka; IBM Plex Sans; Source Sans 3.
- **Consequências:** "Quip acolhe, Inter informa." (substitui "Baloo 2 acolhe, Inter informa."). O ADR de 2026-06-24 sobre Baloo 2 fica **revogado**. Licença Quip é "All Rights Reserved" (proprietária) — uso interno em `@font-face` local (repo privado) OK; produção pública (`nutriospro.lovable.app`) exige confirmar webfont license com o autor OU servir wordmark como SVG/PNG estático. Registrada como pendência (ver §status.md).

## 2026-07-03 — Paleta v2 expandida (8 cores) + estratégia dual-mode
- **Contexto:** A paleta oficial de 2026-06-24 tinha 5 verdes + preto puro + branco puro (7 cores), dark-first com light derivado. O PDF de definições finais 2026-06-30 (pg 3) trouxe **8 cores** organizadas em dois sistemas coerentes: 4 verdes/frios (dark canônico) + 4 warm/linho (light canônico).
- **Decisão:** Paleta oficial v2 (fonte: `assets/2026-06-30-final/definicoes-finais-logo-cores.pdf` pg 3):
  - **Verde-frio (dark canônico):** Neon Mint `#00E87A`, Aqua Green `#2BBFA0`, Dark Teal `#0F3D35`, Deep Forest `#0D2320`.
  - **Linho-quente (light canônico):** Linen Cream `#F5F0E8`, Warm Linen `#E8DDD0`, Terracotta `#C4976A`, Espresso `#2C2416`.
  - **Estratégia:** dual-mode canônico. A marca vive em DOIS temas coerentes — não é mais "dark-first com light derivado". Cada modo tem sua própria referência semântica.
  - **Substituições sistêmicas:** Forest Green `#0A5C52` → removido (border no dark passa a ser derivação HSL de Dark Teal com +8% luminance); preto puro `#000000` → substituído por Espresso `#2C2416`; branco puro `#FFFFFF` → substituído por Linen Cream `#F5F0E8`.
- **Alternativas consideradas:** manter a paleta v1 e usar as 4 cores warm apenas como accents opt-in (rejeitada — o PDF as trata como parte do sistema canônico, não decorativo).
- **Consequências:** Sistema semanticamente dual (não mais dark-first). O par de CTA muda de `Black/Neon Mint` (v1, 12.82:1) para `Espresso/Neon Mint` (v2, 10.30:1) — mantém AAA. Todos os tokens `--foreground`, `--background`, `--border` no `tokens.css` foram recalibrados. Recharts pode explorar a paleta warm como accent quente (Terracotta) contra o verde frio. Documentado em `brandbook/03-identidade-visual.md §3` + `design-system/02-tokens/leia-me.md §3`.

## 2026-07-03 — Wordmark v2: NUTRIOS PRO caixa-alta bold (revoga lowercase v1)
- **Contexto:** O wordmark v1 (2026-06-24) era `nutriOS pro` — lowercase rounded com "OS" em bold caixa-alta destacado, alusão explícita a *Operating System*. O PNG final de 2026-06-30 revelou wordmark completamente redesenhado: **`NUTRIOS PRO` tudo em caixa-alta bold**, sans-serif geométrica pesada (fonte Quip), peso uniforme.
- **Decisão:** Grafias oficiais v2:
  - **Logotipo (peça de marca):** `NUTRIOS PRO` — caixa-alta bold em Quip. Grafia inegociável no lockup.
  - **Corpo institucional (texto corrido):** `NutriOS Pro` — CamelCase (sobrevive no selo, no footer institucional e em prosa).
  - **Domínio e slug técnico:** `nutriospro` — lowercase.
  - O símbolo "nö" permanece com aspas na nomenclatura ("nö"), significado inalterado: N = início de NUTRI, O = "OS" de NUTRIOS (glyph Geometr415), dot verde alto = pingo do "I" final de NUTRI.
- **Alternativas consideradas:** manter forma v1 com "OS" bold destacado (rejeitada — o material final foi refeito, não é retrocompatível).
- **Consequências:** A regra "não nivelar o OS" da v1 morre. A nova regra é: **nunca substituir Quip por outra fonte no wordmark**, **nunca aplicar variação de peso entre letras** (todas iguais), e o selo mantém CamelCase (é a única exceção editorial autorizada).

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
