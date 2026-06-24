---
titulo: Avaliação de maturidade de design — Kolden (3 lentes de DesignOps)
status: rascunho-proposta
data: 2026-06-23
autor: Harmonia/dave-malouf
---

# Avaliação de maturidade de design — Kolden

> Modelo das **três lentes** de DesignOps (Pessoas, Processo, Ofício) cruzado com a
> escala de maturidade de cinco níveis: **Ad Hoc (1) → Emergente (2) → Definido (3) →
> Gerenciado (4) → Otimizado (5)**. Toda nota tem evidência por caminho de arquivo.
> Insumo: frentes F5 e F7 de `auditoria-2026/01-auditoria-integrada.md`.

Toda organização tem operações — a questão é se elas são **desenhadas ou acidentais**.
Na Kolden, o Ofício foi desenhado; o Processo e as Pessoas são, hoje, acidentais.

## Placar de maturidade

| Lente | Estágio | Nível | Veredito |
|-------|---------|:-----:|----------|
| **Ofício** (No que trabalhamos) | Definido | **3** | preservar, não engordar |
| **Processo** (Como trabalhamos) | Emergente | **2** | gargalo nº 2 — instrumentar |
| **Pessoas / Cultura** (Como trabalhamos juntos) | Emergente | **2** | gargalo nº 1 — dar mandato |
| — | **Média** | **~2,3** | **ofício maduro mascarando operação acidental** |

O perfil é clássico e perigoso: uma lente bem à frente das outras duas. O risco não é
falta de qualidade visual — é que a qualidade visual **regride** quando Processo e
Pessoas não a sustentam. Tokens sem change-request derivam na primeira pressão de prazo.

---

## Lente 1 — Pessoas & Cultura: **Emergente (2)**

**O ofício tem dono; a operação não tem RACI.**

### O que sustenta o nível 2 (não é nível 1)
- Existe um dono nomeado: `design-system/leia-me.md` §Governança atribui a disciplina ao
  squad **Harmonia** (design ops), e `AGENTS.md` confirma Harmonia = design ops.
- Há cultura forte e diferenciada — soberania de dados, vendor-agnóstico (`CLAUDE.md` §1)
  e uma identidade interna real (PT-BR, panteão grego, Ritual de Encerramento em
  `AGENTS.md`/`CLAUDE.md` §6).

### Lacunas que impedem o nível 3 (Definido)
- **Dono é um squad, não um RACI.** `01-auditoria-integrada.md` F7-01: ninguém sabe quem
  *aprova* vs. quem *revisa* vs. quem *evangeliza*. Mandato nominal, não operacional.
- **Marca e cultura nunca foram fundidas** (F7-04): a marca externa
  (`01-fundamentos/identidade-visual.md`, `CLAUDE.md`: soberania) e a cultura interna
  (`AGENTS.md`: mitologia + Ritual) coexistem sem um único documento que as cruze. A
  coerência soberania ⇄ self-hosted é genuína, mas está garantida por sorte, não por desenho.
- **Sem prova de adoção** (F7-06): a força de trabalho que consome o design system
  (incluindo agentes Pheme/Hermes e produtos `omiron`/`CataLogo`) nunca foi registrada
  usando os tokens Kolden. Os produtos reais usam shadcn/ui sem rastro de import.

> Princípio Malouf: *processo e ferramentas falham sem a cultura certa.* A cultura existe
> — falta dar a ela **mandato e articulação**, não inventá-la.

---

## Lente 2 — Processo & Fluxo de Trabalho: **Emergente (2)**

**Sabe-se o que propagar; não se sabe como pedir, revisar e versionar.**

### O que sustenta o nível 2
- Há uma regra de propagação explícita: `design-system/leia-me.md` §Governança define que
  mudança de valor passa por atualizar `02-tokens/tokens.json` e propagar para
  `tokens.css` + `tailwind.tokens.js`.
- Há um gate de qualidade nomeado: `Harmonia/checklists/output-quality.md` (WCAG 2.1 AA),
  e o contraste WCAG está materializado em token (`accent.contrast`, F5-03).

### Lacunas que impedem o nível 3 (Definido)
- **Sem change-request / validação / versionamento** (F7-02): `leia-me.md` descreve *o que*
  propagar, nunca *como solicitar, revisar e registrar*. Não há CHANGELOG nem cadência de refresh.
- **Sincronização de tokens é manual e parcial** (F5-02): o Tailwind embute
  `lineHeight`/`letterSpacing` que não existem como token no JSON; os cabeçalhos pedem
  "mantenha sincronizado" à mão. Sem Style Dictionary/CI, os três formatos divergem em silêncio.
- **Sem status & roadmap da marca** (F7-03): um glob de `marca/**` retorna só
  fundamentos/tokens/componentes/aplicações — nenhum documento de estado ou plano.

> Princípio Malouf: sem change-request, a "fonte de verdade" deriva na primeira pressão de
> prazo. Processo é o que protege o Ofício quando ninguém está olhando.

---

## Lente 3 — Ofício & Entrega: **Definido (3)**

**A lente madura — e exatamente por isso, a que NÃO precisa de mais investimento agora.**

### O que sustenta o nível 3 (e impede ir além sozinho)
- **Tokens DTCG válidos** com hierarquia global→alias (`02-tokens/tokens.json`), em 3
  formatos sincronizados nos valores (F5).
- **Componentes starter funcionais e acessíveis** (`03-componentes/leia-me.md` +
  `starter/index.html`): botão/link/input com hover/active/focus-visible/disabled,
  texto ink sobre scarlet (5.43:1 AA), foco visível 2px, erro via `aria-invalid`.
- **Contraste calculado em token** — ponto alto raro (F5-03).

### Por que NÃO é Gerenciado (4)
- Falta a camada `component.*` de tokens (F5-01); o starter ainda tem 3 vazamentos de
  hardcode (F5-05); não há estado `loading` apesar de exigido (F5-04); sistema é dark-only
  sem tema claro tokenizado (F5-06); e **não há componente em código de produção
  (React/Vue) nem Figma library** — só HTML (F5-07).

O Ofício está em 3 não por falta de capricho, mas porque subir para 4 (Gerenciado) **depende
de Processo e Pessoas**: um componente React canônico sem change-request e sem adoção medida
não é maturidade — é mais artefato órfão.

---

## Diagnóstico do gargalo — por que mais componentes é anti-padrão

O instinto natural diante de um design system é produzir mais: mais componentes, biblioteca
React, Storybook, Figma. **Na Kolden, isso é o movimento errado.** (F7-07)

1. **O gargalo é Pessoas/Processo (2), não Ofício (3).** Investir na lente já madura é
   reforçar o que já funciona e ignorar o que trava. Em maturidade, o sistema avança pela
   lente mais fraca, não pela mais forte.
2. **Engordar o Ofício sem Processo cria dívida.** Cada novo componente é mais superfície
   para derivar sem change-request, mais formato para dessincronizar sem CI. Mais ofício
   sobre processo emergente = mais entropia futura, não mais maturidade.
3. **Sem adoção medida, novo componente é teatro.** O teste de Dan Mall — *"as pessoas
   querem usar?"* — não tem resposta hoje (F7-06). Produtos reais usam shadcn/ui. Produzir
   um 6º componente antes de provar que o 1º foi adotado é otimizar a métrica errada.
4. **É o reducionismo de eficiência ao contrário.** Não se trata de "fazer design mais
   rápido"; trata-se de proteger o valor que o design já produz. O valor da Kolden hoje é
   uma identidade visual coerente — proteger esse valor é **dar-lhe governança e adoção**,
   não fabricar mais peças que ninguém usa.

**Conclusão:** congelar o backlog de novos componentes até Processo e Pessoas chegarem a
Definido (3). As duas intervenções de maior alavancagem são **change-request (F7-02)** e
**fusão marca↔cultura com RACI (F7-01/04)**.

---

## Roadmap de maturidade em fases

Objetivo: levar **cada lente ao próximo nível** — Pessoas 2→3, Processo 2→3, Ofício
mantido em 3 e preparado para 4 só *depois*. Cada item tem dono.

### Fase 1 — Fundação (mês 1–2): dar mandato e instrumento
*Foco: Pessoas e Processo. Ofício em modo congelado/preservação.*

- **RACI mínimo de design** → `marca/governanca.md`. Dono Harmonia/`design-chief`,
  aprovador Aglaia/`brand-chief`, gatilhos de quando acionar cada um. **Dono: Harmonia.** (F7-01)
- **Fluxo de change-request + CHANGELOG** → issue/template → revisão Harmonia → propagação
  tokens.json→css→tailwind → entrada datada no CHANGELOG. **Dono: Harmonia/dave-malouf.** (F7-02)
- **Documento de fusão marca↔cultura** (1 página, brand toolbox de Yohn) ligando cada valor
  de marca ao comportamento interno, nomeando a experiência do agente. **Dono: Aglaia + Harmonia.** (F7-04)
- **Status & roadmap da marca** → `marca/status-e-roadmap.md` usando esta auditoria como
  insumo. **Dono: Harmonia.** (F7-03)
- *Marco:* existe um caminho escrito para alterar a marca sem derivar. RACI publicado.

### Fase 2 — Construção (mês 3–6): fechar o ciclo de processo + piloto de adoção
*Foco: Processo a Definido; primeira prova de adoção.*

- **CI de tokens (Style Dictionary)**: tokenizar `line-height`/`letter-spacing` no JSON,
  gerar CSS/Tailwind via `npm run tokens` com check de CI. Encerra o drift manual. **Dono: Harmonia/ui-engineer.** (F5-02)
- **Refresh trimestral**: cadência fixa de revisão da marca (q1/q2/q3/q4), com retrospectiva
  curta — a 4ª lei (reflection) virando rito, não evento. **Dono: Harmonia.** (F7-02)
- **Piloto de adoção**: portar **um** componente real de `omiron` ou `CataLogo` (hoje em
  shadcn/ui) para os tokens Kolden, e registrar o aprendizado. É o teste de Mall na prática.
  **Dono: Harmonia + time do produto.** (F7-06)
- **Métricas de adoção** (2–3, leves): nº de produtos consumindo tokens Kolden; nº de peças
  aprovadas via checklist; nº de change-requests processados por trimestre. **Dono: Harmonia.**
- *Marco:* Processo = Definido (3). Existe ≥1 produto provando que os tokens são usáveis fora do starter.

### Fase 3 — Escala (mês 6–12): só então engordar o Ofício
*Foco: Ofício 3→4, agora apoiado em processo e adoção reais.*

- **Componente em código de produção** (pacote React + preset Tailwind existente) com
  Storybook + addon a11y, **somente após** o piloto da Fase 2 provar demanda. (F5-07)
- **Figma library** com Variables (Tokens Studio), camada `component.*` de tokens (F5-01),
  estado `loading` (F5-04) e tema claro tokenizado (F5-06).
- **Adoção como prática incorporada**, não produto: evangelismo, onboarding de quem cria
  peças, checklist de auditoria no fluxo do Pheme.
- *Marco:* Ofício = Gerenciado (4); DesignOps começa a ficar "invisível" — incorporado a
  como a Kolden naturalmente trabalha.

---

## As 4 leis de Malouf aplicadas à Kolden

| Lei | Onde cumpre | Onde falha |
|-----|-------------|------------|
| **Fidelity** (apoiar cada estágio com a fidelidade certa) | Boa nas pontas extremas: tokens DTCG abstratos (alta abstração) e starter HTML funcional (entrega concreta) convivem (`02-tokens/`, `03-componentes/starter/`). | **Falta o meio:** não há camada de exploração nem componente de produção entre o token cru e o HTML estático. Sem React/Figma, designers não têm fidelidade intermediária para iterar (F5-07). |
| **Collaboration** (agendá-la, não improvisá-la) | Papéis de squad existem (Harmonia design ops, Aglaia brand). | **Colaboração é ad hoc:** sem RACI nem change-request, design×produto×marca interagem por improviso. Produtos reais foram a shadcn/ui sem conversar com a marca (F7-01, F7-06). |
| **Cohesion** (alinhar a uma visão única, prevenir drift) | Forte no visual: scarlet/ink/off-white tokenizado, K partido como ativo distintivo único e consistente (F4, F5-03). | **Drift em três frentes:** posicionamento triplo contraditório (`CLAUDE.md` soberania vs. `tom-visual.md` LTV, F1-02); sincronização manual de tokens que diverge em silêncio (F5-02); marca e produto em stacks separadas (F7-06). |
| **Reflection** (criar espaços de avaliação contínua) | Esta auditoria existe; o Ritual de Encerramento institui auto-reflexão por sessão (`AGENTS.md`). | **Sem reflexão sobre a marca em si:** nenhum refresh trimestral, nenhum CHANGELOG, nenhuma retrospectiva de design system. A reflexão hoje é por agente, não pelo sistema de marca (F7-02, F7-03). |

**Síntese das leis:** a Kolden é forte em *cohesion visual* e *fidelity nas pontas*, e fraca
em *collaboration* e *reflection* — exatamente as duas leis que vivem nas lentes de
Pessoas e Processo. As quatro leis confirmam o diagnóstico: o gargalo é operacional, não de ofício.
