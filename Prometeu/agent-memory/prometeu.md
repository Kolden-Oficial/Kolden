# Memória do Agente prometeu-chief

> **Distinção canônica:** este arquivo guarda padrões técnicos de execução do agent-chief (prometeu-chief). Padrões estruturais do SQUAD ficam em `Prometeu/MEMORY.md`. MEMORY canônico AIOX interno fica em `.aiox-core/development/agents/<id>/MEMORY.md` (regra da skill `ritual-de-encerramento` § "Regra de resolução da memória" item 1 — NUNCA duplicar).
> **Ratificado:** 2026-07-07 (Sub-onda 3.1 do Contrato-mãe `m-20260706-metodo-kolden`).

## Padrões Ativos

### Padrão INVÓLUCRO sobre MUTAÇÃO (squad vendorizado)
- Squad vendorizado (2ª ocorrência após Hermes/Nous): aplicar METODO por INVÓLUCRO Kolden externa sobre vendor intocado. Vendor SynkraAI/aiox-core ~450 arquivos preservado; camada Kolden 10 CREATE + 3 UPDATE. | 2026-07-07
- Coexistência de constituição dupla (`.aiox-core/constitution.md` AIOX interna + `constitution.md` Kolden externa) com regra de precedência clara ("Kolden Art. X prevalece em conflito") — evita conflito quando escopo é declarado (engenharia vs agent-safety). | 2026-07-07
- Convenção `@` dupla como padrão para squad vendor com agents internos: `@Prometeu` externo Kolden + `@dev`/`@qa`/etc. interno AIOX são camadas semanticamente distintas — declarar co-existência em CLAUDE.md § dedicada evita confusão. | 2026-07-07

### Gitignore de vendor bloqueia artefatos Kolden — solução cirúrgica
- `.gitignore` do vendor pode bloquear `CLAUDE.md`, `.claude/agents/`, `.claude/reflexos/` — vendor SynkraAI faz isso por design (proteger config local do dev). | 2026-07-07
- Solução cirúrgica: APPEND ao final do `.gitignore` com exceções `!` + re-ignorar arquivos vendor específicos (`!.claude/agents/` + `.claude/agents/aiox-*.md` + `!.claude/agents/prometeu-chief.md`). Testar via `git add --dry-run` antes de considerar finalizado. | 2026-07-07
- Ordem no `.gitignore` importa: `!pattern` deve vir DEPOIS do padrão pai que ignora o diretório. Ao abrir dir ignorado, RE-IGNORAR vendor-específicos senão eles entram junto. | 2026-07-07

### Escala e categorias emergentes
- Prometeu tem 12 aiox-agents internos + 57 skills (maior número da Kolden) + MEMORY canônico AIOX interno em `.aiox-core/development/agents/<id>/MEMORY.md` (NUNCA duplicar). | 2026-07-07
- Categoria emergente "skills-como-tools cross-squad": 6 skills do Prometeu (`spec-build-review`, `mcp-builder`, `orquestracao-de-comandos-slash`, `checklist-runner`, `tech-search`, `briefing-padrao`) são consumidas por 25 squads Kolden como tools funcionais. Não modelada em METODO v1.0. Documentar como emergente + candidata emenda METODO v1.1. | 2026-07-07

### Verificação Dike e superação de projeção
- Dike delta INDEPENDENTE por subagente Explore isolado (que NÃO leu baseline) preserva independência real. Validou 8/8 hard PASS na Seção C da Sub-onda 3.1 — SUPEROU projetado baseline de 5/8. | 2026-07-07
- Projetar Dike score baseline conservador é fácil demais: `constitution.md` VO-* + `roteiro-de-teste.md` (OS-1/AB-3/UN-2/GR-1/PR-1) + `ferramentas.md` (grounding_required declarado) + `prd-de-ia.md` frontmatter (5 campos Art. X) fecham juntos os 8 gates canônicos Art. X já na identidade + fronteira, sem depender de agents internos ou skills. | 2026-07-07

### Fan-out e sub-ondas
- Regra fan-out 0/3 por interdependência cross-artefato — 8ª confirmação consecutiva (Sub-ondas 1.1/1.2/1.4/1.5/1.6 + Onda 2 Hermes + Sub-onda 3.1). Regra global do METODO §8. | 2026-07-07
- Sub-ondas 3.1/3.2/3.3 escolhidas em vez de Onda única por escala (12 aiox-agents + 57 skills = 5x maior que Hermes). Cada sub-onda em sessão dedicada (G7). | 2026-07-07

### Decisões consolidadas (não re-decidir)
- Skills públicas do Prometeu ficam em read-only + nota cross-squad no diff (Sub-onda 3.3 aplicará padronização real com gates específicos). | 2026-07-07
- MEMORY canônico AIOX interno NUNCA é duplicado/movido pela camada Kolden externa (respeita regra da skill `ritual-de-encerramento` item 1). | 2026-07-07
- Emenda METODO v1.1 fica para APÓS Sub-ondas 3.2 e 3.3 fecharem 8/8 na Onda 3 inteira (não só 3.1) — respeita G1 do CAOS-CL-002 (escopo cirúrgico). | 2026-07-07
- Q1-Q4 do gate humano da Sub-onda 3.1: todas as opções "Recomendada" aprovadas (bloco G1→G2→G3, deny cirúrgico L1+L2, APPEND em ambos AGENTS.md, emenda METODO após 8/8). | 2026-07-07

### Handoffs Sub-ondas 3.2 e 3.3
- Sub-onda 3.2: 12 aiox-agents internos + refactor MEMORY canônico + `.claude/agents/aiox-*.md` (10 variantes) + APPEND por-agente em `agent-memory/prometeu.md`. Sessão dedicada em `C:\Kolden\Prometeu\`. | 2026-07-07
- Sub-onda 3.3: 57 skills + 6 skills públicas com read-only + nota cross-squad no diff + costura final + smoke test. Sessão dedicada em `C:\Kolden\Prometeu\`. | 2026-07-07
- Onda 4 (após Sub-ondas 3.2/3.3 fecharem): Olimpo (Grupo B Governance) — abre grupo B a partir do dono do Contrato de Missão + orquestrador Zeus. | 2026-07-07

## Candidatos a Promoção

<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->

- **Padrão INVÓLUCRO sobre MUTAÇÃO para squad vendorizado** | Origem: hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | 2ª ocorrência empírica; candidato emenda METODO §5 modelos ou §8 rito v1.1
- **Deny cirúrgico em L1+L2 de vendor via `.claude/settings.json` `permissions.deny`** | Origem: hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | Aprendizado transferido entre squads vendorizados
- **Dike delta INDEPENDENTE por subagente Explore isolado (que NÃO lê baseline)** | Origem: hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | Preserva independência real vs. papel Dike temporário pelo executor
- **Fan-out 0/3 por interdependência cross-artefato** | Origem: caos-chief (Sub-ondas 1.1/1.2/1.4/1.5/1.6) + hermes-chief (Onda 2) + prometeu-chief (Sub-onda 3.1) | Detectado: 2026-07-07 | 8ª confirmação; regra global do METODO §8

## Arquivado

<!-- Padrões não mais relevantes — mantidos para histórico -->

<!-- (vazio nesta primeira safra) -->
