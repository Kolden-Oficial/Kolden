# Vilela Construction — Workspace

> Cliente: **Vilela Construction Inc.** (Massachusetts, USA — residential construction / remodeling)
> Última atualização deste README: 2026-07-09 (Argos).

## Índice de artefatos

### Dossiê / Discovery
- [`dossie.md`](dossie.md) — **dossiê unificado** (institucional 25/06 + catálogo & preço 09/07). ⭐ Fonte-de-verdade única do cliente.
- [`dossie-site-vilela-construction.md`](dossie-site-vilela-construction.md) — dossiê do site, 09/07.
- [`diagnostico-tracking-2026-07-01.md`](diagnostico-tracking-2026-07-01.md) — diagnóstico de tracking, 01/07.

### Dados brutos e extraídos
- [`dados/_raw/planilha-vilela.xlsx`](dados/_raw/planilha-vilela.xlsx) — XLSX baixado do Drive (31 KB, 2026-07-09).
- [`dados/planilha-vilela.json`](dados/planilha-vilela.json) — dump completo dos 112 serviços + estrutura dos 5 sheets (formato legível).
- [`dados/planilha-vilela.min.json`](dados/planilha-vilela.min.json) — mesmo conteúdo, minificado.
- [`_temp-catalog.json`](_temp-catalog.json) — baseline 2026-07-03 (mantido como âncora histórica).

### Análise
- [`analise/diff-vs-03-07.md`](analise/diff-vs-03-07.md) — **DIFF preço-a-preço** entre a nova versão (09/07) e a baseline (03/07). ⭐
- [`analise/observacoes.md`](analise/observacoes.md) — achados do Argos (padrões, gaps, oportunidades).

### Recortes temáticos
- [`recortes/precos-por-categoria.md`](recortes/precos-por-categoria.md) — min/med/max de cada tier por categoria.
- [`recortes/projetos-fechados-vs-unitarios.md`](recortes/projetos-fechados-vs-unitarios.md) — corte por unidade (Job vs SF/LF/Each).

### Ferramental
- [`_tools/parse.js`](_tools/parse.js) — parser oficial do XLSX (Node + SheetJS).
- [`_tools/diff.js`](_tools/diff.js) — gerador do DIFF.
- [`_tools/to-json.js`](_tools/to-json.js) — parser antigo (baseline 03/07), mantido.

### Subprojetos
- `vilela-bright-space/` — projeto Lovable (**NÃO tocar por esta missão**).
- `_notebooklm/` — material do cliente (**NÃO tocar**).

---

## Resumo executivo (2026-07-09)

**O que o cliente vende.** A Vilela Construction é uma construtora residencial focada no Grande Boston / Eastern Massachusetts. Trabalha com Economy / **Standard (default)** / Premium em 19 categorias — de reparos pontuais ($2/SF de drywall) a projetos fechados de cozinha luxo ($65k).

**Como o cliente precifica.** A planilha 2026 é um *Price Book* interno com **112 serviços** e 3 tiers cada. É acompanhada por um **Estimate Builder** (formulário Excel para o vendedor montar orçamento linha-a-linha) e por regras claras: `Default Tier = Standard`, `Overhead & Profit Target = 25%`, `Small Job Minimum = $350` (pedidos abaixo disso sobem ao mínimo automaticamente).

**Mudança vs. a versão de 03/07.** A nova versão é uma **poda pura**: 18 serviços removidos, 0 adicionados, 0 mudanças reais de preço, 110 mantidos idênticos (+2 idênticos com só ajuste de formatação em `%`). Ver DIFF completo.

**O que foi removido.** As **3 categorias abandonadas** são justamente as mais complexas e de maior ticket:

- **Additions** (5 serviços) — sunroom, second-story, bump-out, in-law suite, one-story
- **Multifamily Conversion** (7 serviços) — single→two-family, basement/attic apartment, fire-rated separation, sub-panels, entradas, kitchen para nova unidade
- **New Construction / Whole-Home** (6 serviços) — new home, ADUs, garage, poured foundation, whole-home remodel

**Leitura de negócio.** O Vilela está apertando o foco em **remodel e serviços unitários** e saindo dos projetos de **construção nova / conversão multifamiliar / add-on estrutural**. Ver `analise/observacoes.md` para o diagnóstico completo do que isso implica.

**Gaps notáveis.**
- Preços em % (Project Management, Rush) foram formatados como número simples (8, 12, 15) sem sufixo `%` explícito — depende de o vendedor lembrar que a `unit = Percent`.
- HVAC só tem 1 serviço (Heat Pump Split System). Cobertura muito rasa para um mercado MA de climatização.
- Windows & Doors listadas com preços por Each variando de $400 a $1.500 — a variação sugere que precisa granulação por tipo de janela/porta (o cliente pode estar unindo casos diferentes numa linha só).

---

## Como reproduzir a extração

```bash
cd _tools
npm install       # já instalado, SheetJS 0.18.5
node parse.js     # regenera dados/planilha-vilela.json
node diff.js      # regenera analise/diff-vs-03-07.md
```

---

_Este README é escrito e mantido pelo Argos como parte do workspace de inteligência do projeto. Não substitui o dossiê principal (`dossie.md`, unificado 09/07) nem os documentos técnicos (`dossie-site-vilela-construction.md`, `diagnostico-tracking-2026-07-01.md`)._
