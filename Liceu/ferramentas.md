# Ferramentas — Liceu (Biblioteca de Mentes)

Catálogo único de toda ferramenta que o squad Liceu pode usar. **Constituição, Artigo IV:** nenhum
agente do Liceu pode citar, invocar ou prometer uma capacidade que não esteja nesta tabela — este
arquivo é a **fonte de verdade** das ferramentas. **Artigo VII:** nenhuma credencial vive em texto puro
em nenhum arquivo do squad; só a referência ao **caminho** no Infisical.

## Regra (não-negociável)

1. **Infisical é SEMPRE o primeiro item e a única fonte de segredos.** Toda chave ou token vem do
   Infisical em runtime. Nada de `.env` versionado com valor; nada de chave em prompt/skill/doc.
2. **Sem invenção de capacidade (Art. IV).** Se não está nesta tabela, o Liceu não tem. Em dúvida, o
   agente diz que não tem a ferramenta — não improvisa.
3. **Sem credencial em texto puro (Art. VII).** A coluna "Credencial" carrega só o **caminho** Infisical.
4. **REUSE primeiro — sem motor próprio.** O Liceu **não cria motor de scraping**: tenta as tools
   nativas do Hermes e as habilidades de pesquisa (`deep-research`/`tech-search`); para fontes hostis ou
   profundas, faz **handoff ao motor já existente do Argos**. Reuso, não duplicação.

## Tabela de ferramentas

| Ferramenta | Função no Liceu | Acesso | Credencial (Infisical) |
|---|---|---|---|
| **Infisical** | **Fonte única de segredos (obrigatória).** Toda credencial abaixo é resolvida aqui em runtime. | MCP `infisical` ou CLI `infisical run` | `/kolden/liceu` (e `INFISICAL_TOKEN`, única em env var do sistema, injetada uma vez pelo humano) |
| **web_search** (Hermes) | Busca web ampla — biografias, obras, papers, descoberta de fontes primárias (backends Exa/Firecrawl/Tavily/Parallel) | tool nativa Hermes | via Infisical (chaves dos backends) |
| **web_extract** (Hermes) | Extração de conteúdo das páginas/obras encontradas na busca | tool nativa Hermes | via Infisical (backends) |
| **browser_*** (Hermes, CDP) | Leitura de fontes dinâmicas: arquivos, acervos digitais, bibliotecas online (render JS, navegação, scroll) | tool nativa Hermes | — |
| **MCP Tavily** | Busca / crawl / extract de fontes acadêmicas e primárias citáveis | MCP | `/kolden/liceu` |
| **MCP Exa** | Busca / fetch semântico de fontes primárias | MCP | `/kolden/liceu` |
| **MCP Firecrawl** | Crawl / scrape de obras e acervos em escala (web pública) | MCP | `/kolden/liceu` (quando exigir chave) |
| **habilidade `deep-research`** (compartilhada) | Pesquisa multi-fonte com verificação adversarial e citação — a espinha do `ceptico-verificador` | skill nativa | via Infisical (LLM) |
| **habilidade `tech-search`** (Prometeu, reuso) | Pesquisa técnica autocontida com workers Haiku — fontes técnicas/datadas | skill | via Infisical (LLM) |
| **Motor do Argos** (`research-synthesizer` / GPT-Researcher) | **Escalada** para fontes hostis/profundas — **handoff ao squad Argos**, **sem motor próprio** | handoff ao squad Argos | `/kolden/argos` (resolvido pelo Argos, não pelo Liceu) |

*Sem invenção de capacidade (Art. IV): nada além desta tabela. Sem credencial em texto puro (Art. VII).
O Liceu **não cria motor próprio** — reusa as tools nativas, as habilidades de pesquisa e, para fontes
difíceis, escala ao motor já existente do Argos (REUSE do Argos).*

## Mapeamento por especialista

Cada agente só usa o que está abaixo (subconjunto da tabela). Fiel ao `squad.yaml` (focus) e ao PRD §5.

| Agente (tier) | Ferramentas que usa |
|---|---|
| **liceu-chief** (0) | Nenhuma de coleta — orquestra, roteia e sintetiza. Lê resultados dos especialistas; protege o gate de candura. Infisical só por delegação. |
| **biografo** (1) | `web_search`, `web_extract`, `browser_*` (Hermes — bio/obras datadas); MCP Tavily / Exa; habilidade `deep-research`; Infisical |
| **cartografo-de-modelos** (1) | `web_search`, `web_extract` (Hermes — modelos da obra primária); MCP Exa / Firecrawl; habilidade `deep-research`; Infisical |
| **ceptico-verificador** (1) | habilidade `deep-research` (verificação adversarial — fato×folclore); `web_search` / `web_extract` (Hermes); MCP Tavily / Exa; **handoff ao motor do Argos** para fontes hostis; Infisical |
| **lexicografo** (1) | `web_extract`, `browser_*` (Hermes — citações no original p/ vocabulário e estilo); MCP Firecrawl; Infisical |
| **genealogista** (2) | `web_search`, `web_extract` (Hermes — confirmar arestas de influência com fonte); MCP Exa / Tavily; `tech-search`; Infisical |
| **bibliotecario** (2) | Nenhuma de coleta — cura `indice-mestre.md` + `indice.yaml` e registro de entidades por referência. Infisical só por delegação. |
| **sintetizador** (3) | Nenhuma de coleta — destila dossiês/linhagens em framework + `procedencia.md`. Lê o acervo já citado. Infisical só por delegação. |
| **ponte-de-encarnacao** (3) | Nenhuma de coleta — prepara o brief de encarnação e faz **handoff ao Caos**. Infisical só por delegação. |

**Capacidades transversais (habilidades de pesquisa):**
- **`deep-research`** (compartilhada): fan-out de buscas, fetch de fontes, verificação adversarial e
  relatório citado — núcleo do trabalho do `ceptico-verificador` e dos dissecadores.
- **`tech-search`** (reuso do Prometeu): pesquisa técnica autocontida com workers, para domínios
  técnicos onde a obra-fonte é um paper/spec datado.
- **Handoff ao motor do Argos**: quando a fonte é hostil (anti-bot, login, render pesado) ou exige
  pesquisa LLM multi-retriever profunda, o `ceptico-verificador` **escala ao Argos** (`research-synthesizer`
  / GPT-Researcher). O Liceu **não tem motor próprio** — é REUSE do motor do Argos.

## Infisical — paths

Convenção do Kolden: `/<projeto>/<ambiente|área>/<NOME_DA_CHAVE>`. O Liceu usa um espaço; o motor do
Argos resolve o seu (não é responsabilidade do Liceu):

| Path | Conteúdo | Quem acessa |
|---|---|---|
| `/kolden/liceu` | Chaves legítimas de pesquisa — backends de busca (Exa/Firecrawl/Tavily), LLM das habilidades de pesquisa (`deep-research`/`tech-search`) | qualquer especialista, conforme o mapeamento acima |
| `/kolden/argos` | **Não é do Liceu.** Resolvido pelo **Argos** quando o Liceu escala uma coleta hostil por handoff. O Liceu nunca lê este path diretamente. | somente o squad Argos |

Resolução em runtime: `infisical run --path=/kolden/liceu -- <comando>` (CLI) ou MCP `infisical`
(`infisical_get_secret(path=...)`). Nunca a chave literal. Se o Infisical falhar: **não continuar** —
logar e escalar ao humano; jamais usar fallback em texto puro.

> **Sem motor próprio.** Diferente do Argos, o Liceu não vendoriza motor de scraping. Toda coleta
> difícil é **handoff ao Argos** (REUSE). Esta é a Restrição 6 do `CLAUDE.md` e a linha final da tabela
> de ferramentas do PRD §5.
