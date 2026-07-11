---
name: escrita-tecnica-docs-as-code
description: >
  Use quando a demanda for produzir DOCUMENTAÇÃO TÉCNICA operacional — README de
  produto, referência de API, tutorial para novos usuários, explicação de conceito,
  ou how-to guide passo-a-passo — E versionar essa documentação junto com o
  código, com CI gate (link check, spell check, exemplos executáveis). NÃO É copy
  persuasiva de venda (isso é a especialidade dos 33 copywriters do Caliope).
  Cobre o sistema DIÁTAXIS de Daniele Procida (4 tipos com estilo próprio:
  Tutorial / How-to / Reference / Explanation), regra "docs no repo em Markdown",
  ferramentas (Docusaurus, MkDocs Material, Nextra, Mintlify), CI (Vale, lychee
  link check, prettier), e versionamento junto com release. Gatilhos: "escrever
  documentação", "README", "API reference", "tutorial", "how-to", "docs-as-code",
  "Diátaxis", "Docusaurus", "MkDocs", "documentar o produto", "site de docs",
  "changelog", "guia de uso". Skill compartilhada Caliope — qualquer copywriter que
  receba demanda de doc técnica ativa. Fronteira: technical writing operacional,
  NÃO copy persuasiva.
tipo: skill
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
---

# Escrita técnica docs-as-code

Documentação técnica não é "conteúdo" — é **superfície de contato do produto com o usuário
que resolve dor sozinho**. Doc ruim = ticket de suporte, churn, "não sabia que fazia isso".
Esta habilidade é a alternativa profissional ao "README.md com 3 linhas".

## Fronteira

**Caliope escreve copy persuasiva** (venda, awareness, engajamento) — 33 copywriters
canônicos (Halbert, Schwartz, Ogilvy, etc.). Esta skill é diferente: **explicação técnica
operacional**. Quando um agente do Caliope recebe demanda de doc técnica (README, API ref,
tutorial), ele ativa esta skill em vez de mandar chamar Ogilvy.

Sinais que é doc técnica (não copy):
- Público: engenheiro/usuário técnico que quer FAZER algo
- Objetivo: instruir/referenciar, não persuadir
- Tom: preciso, factual, com exemplos executáveis
- Sucesso: usuário resolve sem abrir ticket

## Sistema Diátaxis (Daniele Procida)

Diátaxis é o framework canônico moderno de doc técnica (padrão adotado pelo Python, Django,
Fedora, Cloudflare). Ele mata a bagunça de "misturei tudo num único README".

**4 tipos de doc, cada um com necessidade + estilo próprio:**

### Tutorial (aprendizado)
- **Usuário:** novato, quer se sentir capaz.
- **Objetivo:** levar da mão pelos primeiros passos, gerando sucesso visível.
- **Estilo:** narrativo, encorajador, cada passo funciona. Nunca "isso é óbvio".
- **Formato:** "Vamos construir X juntos" — 15-30 min do início ao fim funcionando.
- **Regra:** o tutorial NÃO explica em profundidade. Só faz. Explicação vai para Explanation.

**Exemplo Kolden:** "Seu primeiro deploy no Kolden OS em 10 minutos".

### How-to Guide (tarefa específica)
- **Usuário:** já sabe usar, quer resolver problema específico.
- **Objetivo:** receita passo-a-passo para completar tarefa.
- **Estilo:** direto, imperativo, sem tutorial-mode.
- **Formato:** "Como fazer X" — assume pré-requisitos, entrega solução.

**Exemplo Kolden:** "Como conectar Kolden OS a um provedor LLM externo".

### Reference (informação exaustiva)
- **Usuário:** já sabe, precisa consultar detalhe.
- **Objetivo:** listar TUDO de forma pesquisável.
- **Estilo:** neutro, denso, exaustivo. Tabela, lista, especificação.
- **Formato:** API reference, config reference, CLI reference.

**Exemplo Kolden:** referência completa de comandos `aiox-core doctor`.

### Explanation (compreensão)
- **Usuário:** quer entender POR QUE, não só COMO.
- **Objetivo:** dar contexto, alternativas, trade-offs.
- **Estilo:** discursivo, honesto sobre decisões arquiteturais.
- **Formato:** essay, "por que escolhemos X", ADR.

**Exemplo Kolden:** "Por que Kolden OS usa Postgres em vez de MySQL".

**Regra dura:** nunca misturar. Se um doc está fazendo tutorial + reference, quebrar em 2.

## Docs-as-code (regra dura)

**Docs moram no repo, em Markdown, versionadas junto com o código.**

Anti-padrões:
- Confluence separado do repo → dessincroniza em 1 sprint
- Notion → não versiona bem
- Google Doc → foi enviado uma vez, ninguém revisa
- Wiki do GitHub → separada do PR, ninguém atualiza

**Correto:** `docs/` no repo. PR que muda comportamento deve mudar doc. Review de PR checa doc.

## Ferramentas Kolden

| Ferramenta | Quando usar |
|---|---|
| **README.md** puro | Projeto pequeno, doc <500 linhas |
| **MkDocs Material** | Doc site clássico (Python-friendly, tema polido, i18n) |
| **Docusaurus** | Doc site JS/TS-friendly, versionamento de release, blog integrado |
| **Nextra** | Doc site Next.js-nativo, MDX, integração com produto Next |
| **Mintlify** | Doc site premium (SaaS pago) — usar só se time não tem tempo de configurar |

**Recomendação Kolden:** **MkDocs Material** para projetos internos (auto-suficiente, sem
build JS pesado) OU **Docusaurus** quando quer versionamento de release + i18n avançado.

## Estrutura de repo canônica

```
docs/
├── index.md                    # landing (o que é o projeto?)
├── tutorials/                  # aprendizado
│   ├── primeiro-passos.md
│   └── construindo-agente.md
├── how-to/                     # tarefas
│   ├── conectar-openai.md
│   └── deploy-em-producao.md
├── reference/                  # informação exaustiva
│   ├── cli.md
│   ├── config.md
│   └── api.md
└── explanation/                # compreensão
    ├── arquitetura.md
    └── por-que-postgres.md
```

## CI obrigatório para doc

Doc sem CI apodrece. Kolden exige:

1. **Link check** — `lychee` roda em `docs/**/*.md`, detecta 404 (interno e externo).
   ```yaml
   - uses: lycheeverse/lychee-action@v1
     with: args: --verbose --no-progress docs/**/*.md
   ```

2. **Spell + style check** — `Vale` com regras customizadas.
   ```yaml
   - uses: errata-ai/vale-action@v2
   ```

3. **Prettier / markdownlint** — formatação consistente.

4. **Exemplos executáveis testados** — código dentro de bloco Markdown roda em CI.
   `pytest-doctestplus` (Python), `mdx-mermaid` para diagrama, testes de snippet.

5. **Build do site** — MkDocs/Docusaurus rodam `build` em cada PR (detecta broken).

## Versionamento junto com release

Cada release tem doc própria. Docusaurus faz isso nativo (`docs-versioned`); MkDocs usa
`mike`. Regra: doc do release 1.2 nunca é editada retroativamente exceto para corrigir erro.

## Métricas de doc

- **TTFHW (Time to First Hello World):** quanto tempo do primeiro clique até primeira ação funcionando?
- **Search log:** o que usuário pesquisa E NÃO ENCONTRA? Gap de doc.
- **404 rate:** links quebrados detectados por usuário (usar analytics).
- **Ticket rate por tópico:** onde suporte responde a mesma pergunta 10 vezes → gap.

## Antipatrões

- **README de 3000 linhas** — quebrar em Diátaxis.
- **Tutorial que assume conhecimento** — não é tutorial, é reference disfarçada.
- **Reference com tom "vamos construir juntos"** — não é reference, é tutorial.
- **Doc sem exemplo executável** — mostrar código que roda, não pseudo.
- **Screenshot sem alt text** — a11y + SEO.
- **Doc traduzida sem manutenção** — pior que só em inglês.

## Handoffs

- **Copy de venda no site** → 33 copywriters Caliope tradicionais.
- **Landing de produto** → Caliope + Ariadne (SEO técnico).
- **Diagrama de arquitetura** → mermaid.js inline OR Excalidraw (Kolden padrão).
- **Vídeo tutorial** → separado, mas linkar no tutorial escrito.

## Regras Kolden

- **Docs em português para produto interno**, inglês só se público-alvo obriga.
- **Docs versionadas com código** (repo, não SaaS externo).
- **Regra "1 PR = 1 doc atualizada"** — feature nova sem doc não passa review.
- **Diátaxis é obrigatório** para produtos com >50 páginas de doc.

---
## Atribuição
Herança histórica: **Daniele Procida** — Diátaxis framework (2017, formalizado 2020,
diataxis.fr); **Anne Gentle** — *Docs Like Code* (2017, movimento docs-as-code);
**Kevin Peters** — Google Developer Documentation Style Guide; **William Zinsser** — *On
Writing Well* (1976, princípios de clareza); **Tom Johnson** — idratherbewriting.com
(API docs canônico); **Mike Pope** — Microsoft doc style; **Divio team** — implementação
Diátaxis; **Read the Docs team** (Eric Holscher) — infra open-source de doc site.
Adaptado de `github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering,
IDs G75, G76, G77.
