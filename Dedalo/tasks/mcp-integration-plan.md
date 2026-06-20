# Tarefa: Planejar a Integração de Servidores MCP

**Task ID:** CCM-PI-005
**Version:** 1.0.0
**Command:** `*mcp-integration-plan`
**Agent:** Conduit (project-integrator)
**Purpose:** Planejar a integração de servidores MCP para um projeto analisando necessidades, mapeando capacidades para servidores disponíveis, estimando o impacto no orçamento de contexto e priorizando por ROI.

---

## Visão Geral

```
  Análise do Projeto
       |
       v
  +---------------------+
  | 1. Analisar         |
  |    Necessidades     |
  +---------------------+
       |
       v
  +---------------------+
  | 2. Mapear Capacidades|
  |    para MCPs Disponíveis |
  +---------------------+
       |
       v
  +---------------------+
  | 3. Estimar Impacto  |
  |    no Orçamento de Contexto |
  +---------------------+
       |
       v
  +---------------------+
  | 4. Priorizar por ROI |
  +---------------------+
       |
       v
  +---------------------+
  | 5. Criar Plano de   |
  |    Integração       |
  +---------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_path | string | Usuário ou cwd | Sim | Diretório de projeto válido |
| budget | enum | Usuário | Não | `minimal` (1-2 MCPs), `standard` (3-5), `full` (sem limite) |
| priorities | string[] | Usuário | Não | ex.: ["documentação", "busca web", "banco de dados", "testes de navegador"] |

---

## Pré-condições

- Diretório do projeto acessível para análise
- Compreensão do ecossistema MCP disponível (oficial + comunidade)

---

## Fases de Execução

### Fase 1: Analisar as Necessidades do Projeto

Examine o projeto para identificar onde servidores MCP agregariam valor:

1. **Stack tecnológica**: quais frameworks, linguagens e bancos de dados são usados
2. **Dependências externas**: APIs consumidas, serviços integrados
3. **Fluxo de desenvolvimento**: quais tarefas os desenvolvedores repetem com frequência
4. **Necessidades de documentação**: quais bibliotecas carecem de boa documentação inline
5. **Necessidades de teste**: testes de navegador, testes de API, cenários E2E
6. **Necessidades de dados**: busca web, scraping, tarefas de pesquisa

Produza uma matriz de necessidades:

| Categoria de Necessidade | Necessidade Específica | Frequência | Solução Atual |
|---------------|---------------|-----------|-----------------|
| Documentação | Consulta a docs do React | Diária | Busca manual no navegador |
| Banco de dados | Execução de queries | Por hora | Copiar e colar no psql |
| Busca | Encontrar exemplos de código | Diária | Busca manual no Google |

### Fase 2: Mapear Capacidades para MCPs Disponíveis

Faça a correspondência das necessidades identificadas com servidores MCP disponíveis:

**MCPs Oficiais/Estáveis:**
| Servidor MCP | Capacidades | Transporte | Melhor Para |
|------------|-------------|-----------|----------|
| context7 | Documentação de bibliotecas | stdio | Docs de framework/biblioteca |
| playwright | Automação de navegador | stdio | Testes web, screenshots |
| postgres/supabase | Queries de banco de dados | stdio | Operações de BD |
| filesystem | Operações de arquivo | stdio | Acesso entre diretórios |

**MCPs da Comunidade:**
| Servidor MCP | Capacidades | Maturidade | Melhor Para |
|------------|-------------|----------|----------|
| exa | Busca web | Estável | Pesquisa, encontrar exemplos |
| apify | Web scraping | Estável | Extração de dados |
| github | API do GitHub | Estável | Gestão de issues/PRs |
| linear/jira | Gestão de projetos | Varia | Acompanhamento de tarefas |

Para cada necessidade, liste os MCPs candidatos com um fit score (1-5).

### Fase 3: Estimar o Impacto no Orçamento de Contexto

Cada servidor MCP tem um custo de contexto. Estime:

1. **Custo de registro de ferramentas**: número de ferramentas expostas, contagem de tokens das descrições
2. **Custo por chamada**: tamanho médio de entrada/saída das chamadas de ferramenta
3. **Latência de inicialização**: tempo para inicializar o servidor
4. **Pegada de memória**: recursos consumidos enquanto roda

Calcule o orçamento de contexto:
```
Overhead total de contexto = soma(tools_por_mcp * media_tokens_descricao)
% da janela de contexto de 200K usada pelos registros de MCP
```

**Diretrizes de orçamento:**
| Nível de Orçamento | Overhead Máx. de MCP | Máx. de Servidores |
|-------------|-----------------|-------------|
| Minimal | < 2% da janela de contexto | 1-2 servidores |
| Standard | < 5% da janela de contexto | 3-5 servidores |
| Full | < 10% da janela de contexto | Sem limite rígido |

Sinalize qualquer MCP que registre mais de 20 ferramentas (pesado em contexto).

### Fase 4: Priorizar por ROI

Pontue cada MCP candidato:

```
ROI = (frequencia_da_necessidade * tempo_economizado_por_uso) / (custo_de_contexto + esforco_de_setup)
```

Onde:
- **frequencia_da_necessidade**: diária=5, semanal=3, mensal=1
- **tempo_economizado_por_uso**: minutos economizados versus a abordagem manual
- **custo_de_contexto**: overhead de tokens (normalizado de 1-5)
- **esforco_de_setup**: dificuldade de configuração (1=trivial, 5=complexo)

Classifique todos os candidatos por pontuação de ROI em ordem decrescente.

### Fase 5: Criar o Plano de Integração

Produza o plano final com rollout em fases:

**Fase A (Dia 1)**: MCPs de maior ROI, configuração nula ou mínima
**Fase B (Semana 1)**: MCPs de ROI médio, setup moderado necessário
**Fase C (Conforme necessário)**: MCPs de ROI menor, adicionar quando surgir necessidade específica

Para cada MCP no plano:
1. Trecho de configuração para o settings.json
2. Variáveis de ambiente ou credenciais necessárias
3. Comando de verificação para testar a conectividade
4. Impacto esperado no orçamento de contexto

---

## Formato de Saída

```markdown
## Plano de Integração de MCP

**Projeto:** {project_path}
**Orçamento:** {budget_level}
**Data:** {YYYY-MM-DD}

### Análise de Necessidades

| Necessidade | Frequência | MCP Correspondente | Pontuação ROI |
|------|-----------|-------------|-----------|
| {need} | {freq} | {mcp} | {score} |

### Orçamento de Contexto

| Servidor MCP | Ferramentas | Tokens Est. | % da Janela |
|------------|-------|-------------|----------|
| {mcp} | {N} | {N} | {N}% |
| **Total** | | | {N}% |

### Plano de Rollout

#### Fase A: Imediato (Dia 1)
1. **{mcp_name}**: {motivo}
   - ROI: {score}
   - Config:
     ```json
     { "mcpServers": { "{name}": { ... } } }
     ```
   - Verificar: {comando}

#### Fase B: Curto prazo (Semana 1)
1. **{mcp_name}**: {motivo}

#### Fase C: Sob demanda
1. **{mcp_name}**: {motivo}

### MCPs Excluídos

| MCP | Motivo da Exclusão |
|-----|---------------------|
| {mcp} | {motivo} |
```

---

## Condições de Veto

- **NUNCA** recomende MCPs que exijam credenciais que o usuário não concordou em fornecer
- **NUNCA** exceda o nível de orçamento declarado sem aprovação explícita do usuário
- **NUNCA** recomende MCPs experimentais ou abandonados sem sinalizar o risco de maturidade
- **NUNCA** instale ou configure MCPs nesta tarefa -- esta tarefa produz apenas um plano

---

## Critérios de Conclusão

- [ ] Necessidades do projeto analisadas com avaliação de frequência
- [ ] MCPs disponíveis mapeados para as necessidades identificadas
- [ ] Orçamento de contexto estimado para cada candidato
- [ ] Pontuações de ROI calculadas e classificadas
- [ ] Plano de integração em fases criado com trechos de configuração
- [ ] Conformidade com o orçamento verificada
- [ ] Plano entregue no formato padrão
