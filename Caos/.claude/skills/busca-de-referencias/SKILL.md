---
name: busca-de-referencias
description: Busca, valida e extrai referências externas (GitHub, Exa, Hugging Face) para fundamentar a criação de um agente. Use na Fase 2 do Ritual (chamada pelo pesquisador antes da síntese) ou isoladamente quando o usuário quiser benchmarking de mercado. Aplica scorecard rigoroso (≥7/10) antes de extrair qualquer padrão. Retorna trechos adaptados prontos para o redator-de-prompts, nunca cópia literal.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/.claude/skills/busca-de-referencias/criterios|criterios]]"
---

# Busca de referências

## Objetivo
Encontrar, validar e adaptar referências reais de agentes e prompts do mercado para acelerar
a criação no Kolden — sem reinventar o que já existe bem resolvido, sem copiar o que é
proprietário. Velocidade com rigor.

## Passo 0 — Receber contexto
Antes de buscar, certifique-se de ter em mãos:
- Domínio do agente (conversacional, tráfego, copy, dados, automação, RAG, outro)
- Keywords extraídas do diagnóstico (Rodada 0 — Alma + Rodada 4 — Corpo)
- Ferramentas mencionadas (para buscar exemplos com a mesma stack)

Se qualquer item estiver ausente, solicite antes de prosseguir.

## Passo 0b — Camada-alvo (obrigatório na Fase 5)
Toda busca declara para QUAL camada referencia: `orquestrador | especialista | habilidade | mcp`.
Na Fase 5 a referência é **obrigatória por camada** — rode uma vez por entidade construída:
- **orquestrador** → escola/figura que define o julgamento do domínio (o que vem primeiro).
- **especialista** → 1 figura humana histórica do sub-domínio (alimenta `heranca-de-especialista`).
- **habilidade** → o método/framework que a habilidade operacionaliza.
- **mcp** → referências de design de tools/integração (alimenta `criacao-de-mcp`).

## Passo 0c — Fonte local primeiro (biblioteca)
**Decisão híbrida do Kolden:** antes de qualquer busca na web, leia o material denso depositado em
`referencias/biblioteca/<dominio>/` (PDFs de livros, planilhas, frameworks, transcrições). É a
fonte **primária**. Se cobrir o necessário com qualidade, pare aqui — a web só **complementa**
lacunas. Material local de figura histórica vai direto para extração (sem re-triagem de score),
desde que a licença permita o uso interno.

## Passo 1 — Busca paralela (complementar, quando o local não basta)

Execute as três buscas em paralelo:

### 1a. GitHub
```
gh search repos "<domínio> agent system prompt" --sort stars --limit 20
gh search repos "<keywords do diagnóstico> agent" --sort updated --limit 10
```
Filtros obrigatórios:
- Stars: ≥ 100
- Última atualização: ≤ 18 meses
- Licença: aberta (MIT, Apache, CC) — sem licença assume-se restrito, descartar

Consulte também os **repositórios âncora pré-validados** em `criterios.md` — eles têm
prioridade e vão direto para extração sem re-triagem.

### 1b. Exa (busca semântica)
```
web_search_exa: "best <domínio> agent prompts 2024 2025"
web_search_exa: "<domínio> AI agent system prompt examples"
web_search_exa: "<keywords> agent prompt engineering"
```
Foco em: posts de blogs técnicos, newsletters de AI (Ben's Bites, The Rundown, TLDR AI),
artigos do Anthropic, OpenAI e Google, comunidade (HN, Reddit r/ClaudeAI, r/PromptEngineering).

### 1c. Hugging Face
```
paper_search: "<domínio> agent" (últimos 24 meses)
hub_repo_search: "<domínio> agent" (modelos e spaces relevantes)
```

## Passo 2 — Triagem (scorecard)

Para cada referência encontrada, aplicar o scorecard de `criterios.md`:

```
Bloqueador (Dim. 5 — Constituição): falhou? → DESCARTAR imediatamente
Pontuar Dim. 1-4 (máx. 10 pontos)
Score < 7  → DESCARTAR + registrar motivo em uma linha
Score ≥ 7  → APROVADA → avançar para extração
```

Máximo **5 referências aprovadas** por execução. Se houver mais de 5 aprovadas, priorize
as de maior score e maior alinhamento com o domínio atual.

## Passo 3 — Extração

Para cada referência aprovada, extrair e adaptar:

| O que extrair | Como adaptar para o Kolden |
|---|---|
| Bloco de persona | Traduzir para pt-BR; converter para formato "você é X, seu tom é Y" |
| Guardrails e restrições | Mapear para PRD §8; restrições absolutas viram candidatas a hook |
| Exemplos de uso e recusa | Reescrever em pt-BR com contexto do agente atual |
| Lógica de escalação | Mapear para critério de escalação do PRD §8 |
| Estrutura de ferramentas | Mapear para stack interna (substituir ferramentas externas equivalentes) |

**NUNCA copiar trecho literal de prompt proprietário.** Extraia o padrão estrutural;
reescreva em português, original, adaptado à Constituição do Kolden.

## Passo 4 — Entrega

```
RELATÓRIO DE REFERÊNCIAS — <nome do agente> | camada-alvo: <orquestrador|especialista|habilidade|mcp>

Fonte local (biblioteca) consultada: <sim/não> — <o que cobriu>

Referências aprovadas (score ≥ 7):
| # | Fonte | Score | Domínio | Blocos extraídos |
|---|---|---|---|---|
| 1 | <url/repo> | <X>/10 | <domínio> | persona, guardrails, exemplos |

Trechos adaptados (prontos para o redator-de-prompts):
--- Bloco de persona ---
<trecho em pt-BR, adaptado>

--- Guardrails sugeridos ---
<lista de restrições extraídas e adaptadas>

--- Exemplos reutilizáveis ---
<exemplos reescritos em pt-BR>

Padrões novos detectados (sugestão para catalogo-de-padroes.yaml):
<padrão — descrição — origem>

Referências descartadas:
| Fonte | Motivo |
|---|---|
| <url> | Score 5/10 — sem persona definida |
```

## Restrições

- NUNCA aprovar referência que viola qualquer artigo NÃO-NEGOCIÁVEL da Constituição.
- NUNCA copiar texto literal de prompt proprietário — extraia estrutura, reescreva.
- Declare explicitamente quando não encontrar referências com score ≥ 7: "nenhuma referência aprovada — domínio sem base estabelecida. Seguir com padrões internos do catálogo."
- Não ultrapasse 20 minutos de busca; se em 10 minutos os repositórios âncora já cobrirem o domínio, pare.

## Autoverificação (antes de entregar)
1. Toda referência aprovada tem score ≥ 7 documentado?
2. Nenhum trecho literal de prompt proprietário está no relatório?
3. Todos os trechos adaptados estão em pt-BR e alinhados com a Constituição?
4. Referências descartadas têm motivo registrado?
