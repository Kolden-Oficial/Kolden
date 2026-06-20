# Critérios de validação de referências externas

Este documento define o scorecard que toda referência externa deve passar antes de ser
aprovada pela skill `busca-de-referencias`. É um **documento vivo**: atualize os repositórios
âncora e os exemplos conforme novas referências forem validadas.

---

## Scorecard (10 pontos no total)

Cada referência é pontuada nas 5 dimensões abaixo. **Score mínimo para aprovação: 7/10.**
Referências abaixo de 7 são descartadas com justificativa registrada.

| Dimensão | Critério | 0 | 1 | 2 | 3 |
|---|---|---|---|---|---|
| **1. Relevância ao domínio** | O quanto o agente/prompt se alinha ao domínio do agente sendo criado | Diferente | Tangencial | Relacionado | Direto |
| **2. Qualidade técnica** | Presença dos blocos canônicos: persona, objetivo, restrições, exemplos | 0-1 blocos | 2 blocos | 3 blocos | 4 blocos |
| **3. Atualidade** | Data de criação ou última atualização significativa | > 3 anos | 2-3 anos | 12-24 meses | < 12 meses |
| **4. Adoção** | Stars no GitHub / citações / uso em produtos conhecidos | Desconhecido | < 100 stars | 100-999 stars | ≥ 1.000 stars ou produto reconhecido |
| **5. Compatibilidade com a Constituição** | Não viola os 7 artigos (pt-BR não é exigido na fonte externa) | **Bloqueador binário** | — | — | Compatível = pontua; incompatível = descartado sem score |

### Como aplicar o bloqueador (Dimensão 5)
Antes de somar qualquer nota, verifique:
- A referência sugere armazenar credenciais em texto puro? → **DESCARTAR** (Art. VII)
- A referência inventa capacidades que a ferramenta não tem documentada? → **DESCARTAR** (Art. IV)
- A referência é de um único modelo proprietário sem fallback? → **WARN** (Art. V), pode prosseguir com nota na adaptação
- Qualquer outro artigo violado de forma NÃO-NEGOCIÁVEL? → **DESCARTAR**

---

## Processo de triagem

```
Para cada referência encontrada na busca:

1. Aplicar bloqueador (Dim. 5) — se falhar, descartar imediatamente
2. Pontuar Dim. 1 a 4
3. Somar: score < 7 → descartar + registrar motivo
         score ≥ 7 → aprovada → avançar para extração
4. Máximo 5 referências aprovadas por rodada de pesquisa
```

---

## Repositórios âncora (pré-validados)

Estes repositórios já passaram pela triagem e são fontes de primeiro acesso para a busca.
Não precisam ser re-pontuados — vão direto para extração. Valide periodicamente se ainda
estão ativos e atualizados.

| Repositório | Domínio forte | Score histórico | URL |
|---|---|---|---|
| `x1xhlol/system-prompts-and-models-of-ai-tools` | Todos (catálogo de prompts de produtos reais) | 9/10 | https://github.com/x1xhlol/system-prompts-and-models-of-ai-tools |
| `f/awesome-chatgpt-prompts` | Conversacional, copy, criativo | 8/10 | https://github.com/f/awesome-chatgpt-prompts |
| `dair-ai/Prompt-Engineering-Guide` | Todos (fundamentos e padrões) | 9/10 | https://github.com/dair-ai/Prompt-Engineering-Guide |
| `anthropics/anthropic-cookbook` | Agentic, RAG, tool use | 10/10 | https://github.com/anthropics/anthropic-cookbook |
| `microsoft/promptflow` | Automação, orquestração, avaliação | 8/10 | https://github.com/microsoft/promptflow |

---

## Exemplos de referências APROVADAS

### APROVADA — score 9/10
- **Fonte:** Cursor system prompt (x1xhlol/system-prompts-and-models-of-ai-tools)
- **Domínio:** dados, automação, agentic
- **Score:** Relevância 3 + Qualidade 3 + Atualidade 2 + Adoção 1 = 9
- **Blocos extraíveis:** persona de agente de código, restrições de escopo, exemplos de recusa
- **Adaptação necessária:** traduzir para pt-BR; substituir referências a VSCode pela stack interna

### APROVADA — score 7/10
- **Fonte:** Repositório emergente de agente de suporte (GitHub, 200 stars, 18 meses)
- **Domínio:** conversacional
- **Score:** Relevância 3 + Qualidade 2 + Atualidade 1 + Adoção 1 = 7
- **Blocos extraíveis:** lógica de escalação para humano, exemplos de recusa elegante
- **Adaptação necessária:** completar bloco de objetivo ausente; trocar modelo específico por agnóstico

---

## Exemplos de referências REPROVADAS

### REPROVADA — bloqueador
- **Fonte:** Tutorial "Build an AI agent" (blog, 2024)
- **Motivo:** sugere armazenar API key em `.env` com fallback para variável de ambiente em texto
- **Artigo violado:** VII (credencial em texto puro)

### REPROVADA — score 5/10
- **Fonte:** Repo de prompts pessoais sem README (GitHub, 45 stars)
- **Score:** Relevância 2 + Qualidade 1 + Atualidade 2 + Adoção 0 = 5
- **Motivo:** sem persona definida, sem exemplos, sem restrições — estrutura muito pobre

### REPROVADA — muito antiga
- **Fonte:** Artigo de prompting (2021)
- **Score:** Relevância 2 + Qualidade 2 + Atualidade 0 + Adoção 1 = 5
- **Motivo:** anterior ao surgimento de agents modernos (tool use, MCP); padrões obsoletos
