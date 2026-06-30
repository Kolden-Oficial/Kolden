# Catálogo de Habilidades — Aletheia

Índice das **10 habilidades** do squad, organizadas por estágio do funil de validação.
Cada uma é modular e tem gatilho de invocação automática pela `description` no frontmatter
do `SKILL.md`.

## Estágio 1 — Descoberta de Cliente

| Habilidade | Gatilho de invocação | Propósito | Especialista |
|---|---|---|---|
| [`roteiro-de-entrevista`](roteiro-de-entrevista/SKILL.md) | Precisa conversar com clientes / validar dor / auditar roteiro | Gera e audita roteiros de entrevista sem viés (The Mom Test) | rob-fitzpatrick |
| [`mapeamento-de-jornada-com-pain-points`](mapeamento-de-jornada-com-pain-points/SKILL.md) | Visualizar jornada cliente do gatilho ao advocacy / identificar pain points por etapa | Journey mapping (não user flow nem sales funnel) com 5 colunas + moments of truth | tony-ulwick |
| [`sintese-de-feedback-multi-canal`](sintese-de-feedback-multi-canal/SKILL.md) | Agregar feedback de N fontes (entrevistas, NPS, suporte, social, reviews, sales) | Schema único de tags + triangulação 3-canais + tema vs sintoma + dor/desejo/ruído | aletheia-chief |

## Estágio 2 — Validação Enxuta

| Habilidade | Gatilho de invocação | Propósito | Especialista |
|---|---|---|---|
| [`mapa-de-assuncoes`](mapa-de-assuncoes/SKILL.md) | Decidir o que testar primeiro / mapear riscos da ideia | Lean Canvas + Assumptions Map (2x2) → riskiest assumption | david-bland, ash-maurya |
| [`desenho-de-experimento`](desenho-de-experimento/SKILL.md) | Há assunção priorizada e é preciso testá-la barato | Menor MVP + test card (sucesso e kill) | eric-ries, david-bland, alberto-savoia |
| [`cadencias-comportamentais-em-validacao`](cadencias-comportamentais-em-validacao/SKILL.md) | Desenhar cadência de pesquisa/validação com participantes (entrevistas seriadas, longitudinal, beta) | Arquitetura de escolha para reduzir drop-off (60-80%→≤25%); 5 princípios comportamentais éticos; cadências por tipo. NÃO é gamification de produto | david-bland, rob-fitzpatrick |
| [`priorizacao-rice`](priorizacao-rice/SKILL.md) | Priorizar hipóteses/experimentos validados por score numérico | (Reach × Impact × Confidence) / Effort — cross-link bidirecional com Prometeu/moscow-kano-mcda | aletheia-chief (Sean McBride/Intercom) |

## Estágio 3 — Mercado & Demanda

| Habilidade | Gatilho de invocação | Propósito | Especialista |
|---|---|---|---|
| [`pesquisa-de-tendencia-e-sinais-fracos`](pesquisa-de-tendencia-e-sinais-fracos/SKILL.md) | Mapear tendências (não modas), detectar sinais fracos, analisar early adopters, transferir padrões cross-industry | Framework Amy Webb (Direção/Velocidade/Escala/Robustez/Conectividade); 10+ fontes; cadência mensal mínima | alberto-savoia, david-bland |
| [`mapa-competitivo-swot-gap`](mapa-competitivo-swot-gap/SKILL.md) | Mapear espaço competitivo com método (não opinião): 3 anéis (direto/indireto/substituto), SWOT rigoroso, gap analysis, positioning map | Bidirecional com Argos (esta=estratégico; Argos=monitoring ao vivo) | steve-blank (Market Type) |
| [`sizing-tam-sam-som-com-ressalva`](sizing-tam-sam-som-com-ressalva/SKILL.md) | Dimensionar TAM/SAM/SOM **apenas** para handoff externo (pitch/oferta/marca) | **NUNCA substitui XYZ Hypothesis de Savoia em validação primária.** Top-down + bottom-up reconciliados; 3 cenários | alberto-savoia (com ressalva) |

## Estágio 4 — Cross-cutting

| Habilidade | Status |
|---|---|
| `otimizacao-de-workflow-lean` | **Pendente F6 do B03** (Lean/Six Sigma — virá da divisão `testing/` upstream) |

## Habilidades compartilhadas do Kolden (fonte única, não duplicar)

- `ritual-de-encerramento` — `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` (auto-aprendizado no Stop).
- `verificacao-de-alinhamento` — checagem diária de pontas soltas (acionada pelo reflexo SessionStart).
- `infisical-padrao` — toda credencial vem do Infisical, nunca em texto puro.

## Procedência das skills novas

Estágios 1-3, **7 skills** absorvidas em 2026-06-29 do upstream `msitarzewski/agency-agents@a597cb6` divisão `product/` (MIT) — bucket B04 do Ritual de Absorção. Detalhe completo em `C:\Kolden\Aletheia\_origem.md`.

## Veto explícito a registrar (cf. CLAUDE.md do squad)

- **`sizing-tam-sam-som-com-ressalva` NUNCA dispara em validação primária** — XYZ Hypothesis de Savoia prevalece. A skill é **handoff only** (para Pluto/Aglaia/board).
- **`cadencias-comportamentais-em-validacao` NÃO é gamification de produto** — psicologia comportamental aplicada a participantes de pesquisa; gamification de usuário final é jurisdição de Harmonia/UX do projeto cliente.
