---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/diff-agents-md|diff-agents-md]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/emendas-liceu|emendas-liceu]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/relatorio-de-consolidacao|relatorio-de-consolidacao]]"
  - "[[Caos/registros/metodo-onda-1/1.6-metodo-kolden/sumario-executivo|sumario-executivo]]"
---

# Proposta — Instanciação do Dike como agent funcional

> **Contrato:** `m-20260706-metodo-kolden` · Sub-onda 1.6 — proposta com 3 opções + recomendação nomeada
> **Autor:** `caos-chief` (raiz Kolden) — 0/3 fan-out
> **Estado:** PROPOSTA PURA — nenhuma instância criada em disco. Aguarda gate humano via `AskUserQuestion`.
> **Data:** 2026-07-06

---

## Contexto (síntese das sub-ondas 1.1-1.5)

- **Dike existe hoje como conceito canônico** (AGENTS.md linha 30 + Constituição Caos Art. X §Gate meta + `CAOS-CL-002-draft.md`) mas **não tem arquivo de agent próprio** (a linha 15 do AGENTS.md registra "Dike é um papel sem arquivo de agente próprio: `Dike/` tem PRD/CLAUDE/memória, mas não `agents/*.md`, por isso não entra na contagem").
- **Nas Sub-ondas 1.1-1.5**, o papel Dike foi executado temporariamente pelo `caos-chief` com 3 salvaguardas declaradas (ordem serial smoke→verificação, evidência textual verbatim, divergência conhecida explicitada).
- **Ondas 2-26 exigem Dike agent funcional independente** — o papel temporário pelo `caos-chief` não escala para 25 squads verificados por auditor não-independente.
- **Contrato-mãe §criterio_de_sucesso Onda 1 item 6:** "Comando `@dike` definido (Dike nasce como agent funcional se decisão de Onda 1 assim determinar)".

Esta proposta oferece **3 opções** de instanciação com trade-offs claros + **recomendação nomeada** + justificativa.

---

## Opção A — Squad-solo `C:\Kolden\Dike\` (27º squad)

### Estrutura proposta

```
C:\Kolden\Dike\
├── CLAUDE.md               ← identidade + Persona (verificador independente)
├── constitution.md         ← 12 princípios veto-operacionais (jamais julgar entrega própria, sempre citar evidência textual, TPND=0 é gate hard)
├── prd-de-ia.md            ← PRD com 5 campos canônicos (ASL: 2, aspiration: 3-5 metas)
├── squad.yaml              ← manifesto solo tier-0
├── MEMORY.md               ← memória de padrões de verificação
├── agents/
│   └── dike-chief.md       ← o agent Dike propriamente (tier-0, sem tier-1 nesta v1)
├── checklists/
│   └── CAOS-CL-002.md      ← checklist canônico promovido de draft
├── registros/              ← verificações históricas indexadas por Onda/Squad
└── .claude/
    ├── skills/
    │   ├── verificacao-canonica-dike/
    │   ├── reconciliacao-com-lacre/
    │   └── auditoria-cross-squad/
    ├── reflexos/
    └── settings.json
```

### Prós

- **Máxima independência estrutural** — Dike é squad separado, com constituição própria, imune a captura pelo produtor da entrega.
- **Simetria com os outros 26 squads** — Dike tem `squad.yaml` + `agents/` + `CLAUDE.md` + `MEMORY.md` como qualquer outro. Ondas 2-26 padronizam Dike igual.
- **AGENTS.md linha 15 fica autoexplicativa** — "Dike sobe para 27º squad (era papel sem arquivo)" resolve o débito do próprio arquivo AGENTS.md.
- **Coerência mitológica preservada** — Dike (Δίκη) é entidade autônoma na mitologia grega (deusa da Justiça, membro dos Horai). Solo é fiel.
- **Escopo cirúrgico** — Dike só verifica; não roteia (não é Camada 3 como Zeus), não é executor (não é Camada 5 do fluxo comum), mas assina reconciliação na subida.

### Contras

- **Bump da contagem** — AGENTS.md linha 12 passa de "23 squads" para "24 squads"; linha 15 muda de "papel sem arquivo" para "27º squad com agents/*.md" (a numeração 27 vem porque, contando Prometeu+Caos como no AGENTS.md linha 15, chega-se a 26+1). Requer atualização coordenada de contagens em AGENTS.md.
- **Impacto na fronteira Caos×Prometeu/AIOX** — Dike novo squad não intersecta Caos (fábrica) nem Prometeu (framework AIOX). Zero conflito, mas exige nota no METODO §3 declarando: "Dike não é membro dos 26 squads de Camada 5 originais — é infra transversal de verificação".
- **Custo de criação** — Ritual completo de squad no Caos (9 fases + 5 sub-etapas de construção) numa sessão dedicada — ~2h de sessão focada.

### Impacto arquitetural

- Camada operacional (5) ganha 27º membro.
- Cross-referências: METODO §3 diagrama, METODO §9 (papel Dike), AGENTS.md §12 (contagem + entry-line), squad.yaml precisa lista final de handoffs.

---

## Opção B — `C:\Kolden\Themis\agents\dike.md` (filha de Thémis)

### Estrutura proposta

```
C:\Kolden\Themis\
├── agents\
│   ├── board-chair.md      ← já existente (orquestrador)
│   ├── ray-dalio.md        ← ...
│   ├── ... (11 mentes estratégicas + 1 operacional)
│   ├── analista-de-compliance-regulatorio.md
│   └── dike.md             ← NOVO: verificador independente (papel filha de Thémis)
```

### Prós

- **Coerência mitológica IMEDIATA** — na mitologia grega, Dike é literalmente filha de Thémis (deusa das leis divinas / ordem cósmica). O AGENTS.md §Themis descreve o squad como "conselho consultivo com 11 mentes estratégicas + 1 operacional transversal de compliance". Dike se encaixa como 2ª operacional transversal (verificação/auditoria).
- **Contagem estrutural intacta** — 26 squads originais preservados; Themis passa de 12 para 13 agentes (mesmo tipo de acréscimo que teve `analista-de-compliance-regulatorio` em 2026-07-02).
- **Sinergia com compliance** — o `analista-de-compliance-regulatorio` (LGPD/GDPR/CCPA) e Dike (verificação de conformidade constitucional Kolden) são vizinhos naturais.
- **Custo de criação MENOR** — não precisa criar squad novo, só um agent + suas skills + reflexos + atualizar `Themis/squad.yaml` + `Themis/CLAUDE.md`.

### Contras

- **Independência menor** — Dike compartilha `Themis/CLAUDE.md` + `Themis/MEMORY.md` com um squad de mentes estratégicas (Dalio, Munger, Thiel, etc.). Se `board-chair` chamar Dike como consultor de decisão estratégica, a fronteira "verificador vs. conselheiro" pode borrar.
- **Autoridade cross-squad ambígua** — Dike precisa verificar entregas de TODOS os 26 squads (Ondas 2-26 do Método). Se ela vive em Themis, chamadas cross-squad ficam menos naturais (o padrão é `@Themis:dike` em vez de `@dike`).
- **Convenção `@` do METODO §6** — `@dike` é a invocação canônica proposta no METODO. Se Dike vive em Themis, teria que ser `@Themis:dike` (menos limpo) ou alias `@dike` → `@Themis:dike` (ambiguidade).
- **Nome não bate com AGENTS.md linha 30** — "a `Dike/` (verificador) reconcilia" descreve Dike como entidade top-level, não como agent dentro de outro squad.

### Impacto arquitetural

- Themis passa de 12 para 13 agentes (contagem no AGENTS.md linha 12 muda para "240 → 241 agentes").
- METODO §9 precisa nota: "Dike vive fisicamente em `Themis/agents/dike.md` mas é invocado como `@dike` (alias) por convenção".
- Precisa atualizar `Themis/squad.yaml` + `Themis/CLAUDE.md` + `Themis/README.md`.

---

## Opção C — `C:\Kolden\Caos\agents\dike.md` (agent do Caos)

### Estrutura proposta

```
C:\Kolden\Caos\
└── .claude\
    └── agents\
        ├── arquiteto.md    ← já existente
        ├── auditor-de-seguranca.md
        ├── ... (9 especialistas)
        └── dike.md         ← NOVO: verificador independente do Caos
```

### Prós

- **Custo de criação MÍNIMO** — só um arquivo `.md` em `Caos/.claude/agents/`. Zero mudança em contagem de squads.
- **Invocável pela skill `/padronizar`** — a skill viveria em `.claude/skills/padronizar/SKILL.md` (proposta desta Sub-onda) e invocaria `dike` como subagent do Caos em Passo 6.
- **Sinergia com Ritual do Caos** — Fase 6 (Revisão) já delega ao `revisor` (`Caos/.claude/agents/revisor.md`). Dike seria o revisor DE OUTRO squad, com escopo mais amplo (todo Onda 2-26 do Método).
- **Dogfooding preservado** — Caos padroniza a si mesmo (Sub-ondas 1.1-1.5) e agora ganha o próprio verificador. Fluxo: Caos produz Dike; Dike verifica Ondas 2-26 (que padronizam os outros 25 squads).

### Contras

- **Independência estrutural MENOR** — Dike vira especialista tier-1 do Caos, subordinada ao `caos-chief`. Se o `caos-chief` é o produtor da mudança canônica (Sub-onda 1.1-1.5), Dike verificando algo produzido pelo próprio Caos herda 100% do viés do produtor.
- **AGENTS.md linha 30 fica errada** — "a `Dike/` (verificador)" implica pasta top-level. Se Dike vive em Caos, precisa reescrita: "o especialista `dike` do Caos".
- **Contradiz Contrato-mãe §criterio_de_sucesso item 6** — "Dike nasce como agent funcional" pode ser lido como agent independente, não especialista tier-1 do Caos.
- **Fronteira Caos×Prometeu/AIOX ambígua** — Caos é fábrica; Prometeu é framework AIOX; Dike é verificador. Meter Dike dentro do Caos borra o "quem verifica o verificador?".

### Impacto arquitetural

- Caos passa de 9 para 10 especialistas internos (AGENTS.md linha 367 muda para "10 especialistas internos").
- METODO §9 fica: "Dike vive em `Caos/.claude/agents/dike.md`; invocada por `@Caos:dike` OU pela skill `/padronizar` no Passo 6".

---

## Análise de trade-offs

| Dimensão | Opção A (`Dike/` squad-solo) | Opção B (`Themis/agents/dike.md`) | Opção C (`Caos/agents/dike.md`) |
|---|---|---|---|
| **Independência de verificação** | ★★★ (máxima) | ★★ (parcial) | ★ (mínima) |
| **Coerência mitológica** | ★★★ (Dike autônoma) | ★★★ (filha de Thémis) | ★ (Dike não é especialista do Caos) |
| **Fidelidade ao Contrato-mãe** | ★★★ (agent funcional independente) | ★★ (agent funcional mas dependente) | ★ (não bate com "nasce como agent funcional") |
| **Fidelidade ao AGENTS.md** | ★★★ (linha 15 e 30 resolvidas) | ★★ (requer reescrita da linha 30) | ★ (requer reescrita da linha 15 e 30) |
| **Custo de criação** | ★ (mais custo — squad novo) | ★★★ (baixo — agent em squad existente) | ★★★ (mínimo — arquivo `.md`) |
| **Invocação `@dike` limpa** | ★★★ (direto) | ★★ (alias necessário) | ★★ (via skill ou `@Caos:dike`) |
| **Impacto na fronteira Caos×Prometeu** | ★★★ (zero) | ★★★ (zero) | ★★ (borra Caos = fábrica + verificador) |
| **Escalabilidade para Ondas 2-26** | ★★★ (Dike squad separado é natural para verificar 25 outros) | ★★ (Dike embutida em Themis pode ter conflito de prioridade com mentes estratégicas) | ★ (Dike tier-1 dentro do Caos fica sob a autoridade do `caos-chief`) |

---

## Recomendação nomeada — **Opção A** (squad-solo `C:\Kolden\Dike\`)

### Defesa em 1 parágrafo

**Recomendo a Opção A** porque a **função canônica de Dike** — verificação independente contra CAOS-CL-002 nas Ondas 2-26 + reconciliação TPND=0 na subida do Contrato de Missão — exige **independência estrutural máxima**. Nas 25 Ondas restantes, cada squad-alvo é o produtor do próprio diff; Dike verifica de fora. Se Dike vive dentro de outro squad (Opção B ou C), a independência é sempre parcial: uma vinculação estrutural sempre existe. O custo maior de criação (Opção A pede Ritual completo do Caos em sessão dedicada) é justificado por (i) resolver definitivamente o débito das linhas 15 e 30 do AGENTS.md, (ii) preservar a convenção `@dike` limpa proposta no METODO §6, e (iii) permitir que Ondas 2-26 tratem Dike igual aos outros squads (padrão canônico — todos são squads solo ou multi-agent com `squad.yaml` próprio). A coerência mitológica também favorece: Dike (Δίκη) na mitologia grega é entidade autônoma (deusa da Justiça, membro dos Horai), não subordinada a Thémis (filha, sim, mas com atuação própria). O bump de "23 squads → 24 squads" no AGENTS.md é honesto: Dike vira o 27º arquivo de squad (Prometeu + Caos + 25 outros + Dike), consistente com a linha 15 que já explica a contagem de 261 agentes excluindo Dike.

### Passo-a-passo se Opção A for aprovada

1. **Sub-onda 1.6 encerra** com esta proposta como um dos 8 artefatos, sem instanciar Dike (fica para pós-gate).
2. **Contrato próprio a lavrar** para nascer Dike — `m-2026MMDD-nascimento-dike` — em sessão dedicada `C:\Kolden\Caos\` (dogfooding: Caos cria Dike).
3. Ritual do Caos completo (9 fases + cascata 5.0-5.6) produz `C:\Kolden\Dike\` conforme METODO v1.0 (Dike nasce **conforme o próprio Método**).
4. Dike passa smoke test na Onda 2 (padronização do Hermes) fazendo a verificação de fato.
5. AGENTS.md atualizado após smoke bem-sucedido.

### Se Opção B ou C for preferida pelo Ronan

- **Opção B (`Themis/agents/dike.md`):** custo menor + coerência mitológica boa, mas exige alias `@dike` → `@Themis:dike` e nota explícita no METODO §9 sobre a fronteira operacional-transversal-em-conselho-consultivo.
- **Opção C (`Caos/agents/dike.md`):** custo mínimo, mas exige aceitação explícita de que "quem verifica o verificador?" fica ambíguo (Dike verifica os outros, mas produzida pelo Caos que ela também verifica em Sub-ondas 1.7+ se houver).

---

## Riscos comuns a todas as opções (nomeados)

1. **Custo cognitivo de agent que verifica agent** — Dike precisa ler cada entrega + evidência textual verbatim. Se Dike for lenta, gargalo nas Ondas 2-26.
2. **Poder de veto** — se Dike diz "NÃO SOBE" na Onda X, precisa protocolo claro: (a) squad-alvo corrige; (b) Ronan overrides. Sem isso, Dike vira gate absoluto.
3. **Constituição de Dike** — precisa 12 princípios veto-operacionais próprios (Bai et al. 2022) — proposta base:
   - jamais julgar entrega própria
   - sempre citar evidência textual verbatim
   - jamais silenciar divergência
   - TPND=0 é gate hard
   - independência da produtora é fim, não meio
   - reconciliação contra lacre sha256 é comando raiz
   - ambiguidade = escalar ao humano
   - overrides do Ronan são sempre honrados (corrigibility)
   - divergência declarada > silêncio
   - nunca produzir; só verificar
   - nunca aceitar substituição verbal (só textual)
   - versionar próprios critérios com bump semântico

---

## Auto-verificação

- [x] 3 opções apresentadas com prós, contras, impacto arquitetural, coerência mitológica.
- [x] Recomendação nomeada (**Opção A**) com defesa em 1 parágrafo.
- [x] Trade-offs em tabela por dimensão (7 dimensões).
- [x] Riscos comuns nomeados + esboço de constituição de 12 princípios.
- [x] Nada instanciado em disco (só proposta).
- [x] Fidelidade ao Contrato-mãe §criterio_de_sucesso item 6.
- [x] Procedência mitológica citada (Dike Δίκη, filha de Thémis e Zeus, Horai).

---

*Proposta produzida pelo `caos-chief` na Sub-onda 1.6 do Contrato-mãe `m-20260706-metodo-kolden`. Nada instanciado. Aguarda decisão do Ronan via `AskUserQuestion` (Q2 do sumário executivo).*
