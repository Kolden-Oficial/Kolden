---
tipo: nota
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/tasks/_indice|_indice]]"
---

# Tarefa: Otimizar o Workflow do Claude Code

**Task ID:** CCM-PI-003
**Version:** 1.0.0
**Command:** `*optimize-workflow`
**Agent:** Conduit (project-integrator)
**Purpose:** Otimizar o workflow do Claude Code para máxima produtividade, analisando padrões de uso, identificando gargalos e configurando permissões, atalhos e automação.

---

## Visão Geral

```
  Configuração Atual
       |
       v
  +---------------------+
  | 1. Analisar Padrões  |
  |    de Uso             |
  +---------------------+
       |
       v
  +---------------------+
  | 2. Identificar       |
  |    Gargalos          |
  +---------------------+
       |
       v
  +---------------------+
  | 3. Otimizar          |
  |    Permissões        |
  +---------------------+
       |
       v
  +---------------------+
  | 4. Configurar Atalhos|
  |    de Teclado        |
  +---------------------+
       |
       v
  +---------------------+
  | 5. Configurar        |
  |    Auto-Memory       |
  +---------------------+
       |
       v
  +---------------------+
  | 6. Gerar             |
  |    Plano de Otimização|
  +---------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| project_path | string | Usuário ou cwd | Sim | Deve conter o diretório .claude/ |
| pain_points | string[] | Usuário | Não | Gargalos descritos (ex.: "muitos prompts de permissão") |
| workflow_type | enum | Usuário | Não | `solo-dev`, `team-review`, `ci-cd`, `exploratory` |

---

## Pré-condições

- A integração do Claude Code existe (diretório .claude/ presente)
- O usuário já usou o Claude Code neste projeto ao menos uma vez

---

## Fases de Execução

### Fase 1: Analisar Padrões de Uso

Examine a configuração atual para inferir padrões de uso:

1. **Análise do CLAUDE.md**: quais instruções estão presentes, o que está faltando
2. **Revisão do settings.json**: regras atuais de allow/deny, quão restritivas
3. **Inventário de regras**: quantas regras, quais domínios cobrem
4. **Presença de hooks**: que automação existe
5. **Inventário de comandos/skills**: comandos e skills customizados definidos
6. **Estimativa de tamanho do projeto**: contagem de arquivos, distribuição de linguagens

Classifique a maturidade da configuração atual:
| Nível | Descrição | Sinais Típicos |
|-------|-------------|---------------|
| Iniciante | Configuração mínima | Apenas CLAUDE.md, sem regras, sem hooks |
| Intermediário | Funcional | CLAUDE.md + settings + algumas regras |
| Avançado | Otimizado | Regras completas, hooks, skills, MCP configurados |
| Expert | Totalmente automatizado | Integração CI/CD, hooks customizados, equipes de agentes |

### Fase 2: Identificar Gargalos

Verifique os assassinos de produtividade comuns:

1. **Prompts de permissão**: settings restritivas demais forçando aprovações repetidas
   - Procure por regras de allow ausentes para comandos comuns (npm, git, ferramentas de build)
   - Verifique se a ferramenta `Bash` não tem allows (causa prompt a cada comando)
2. **Execução lenta de ferramentas**: servidores MCP com alta latência, falta de cache
3. **Inchaço de contexto**: CLAUDE.md acima de 150 linhas, regras always-loaded demais
4. **Falta de automação**: tarefas repetitivas que poderiam ser hooks ou skills
5. **Apodrecimento de contexto (context rot)**: sessões longas sem estratégia de compaction
6. **Instruções redundantes**: orientações duplicadas entre CLAUDE.md e regras

Para cada gargalo encontrado, estime o impacto: ALTO, MÉDIO, BAIXO.

### Fase 3: Otimizar a Estratégia de Permissões

Projete uma estratégia de permissões que equilibre segurança e velocidade:

1. **Allows seguros** (adicionar à lista de allow do settings.json):
   - Comandos de build: `npm run build`, `npm run dev`, `npm test`
   - Comandos de lint: `npm run lint`, `npm run typecheck`
   - Comandos de leitura do git: `git status`, `git diff`, `git log`
   - Language servers e formatadores
2. **Denies inteligentes** (manter ou adicionar à lista de deny):
   - Comandos destrutivos: `rm -rf`, `DROP`, `git push --force`
   - Acesso a produção: URLs de banco de dados, comandos de deploy
   - Caminhos sensíveis: `.env`, credenciais, secrets
3. **Permissões contextuais**: use regras baseadas em caminho para allows específicos de diretório

Apresente uma comparação antes/depois dos prompts de permissão esperados.

### Fase 4: Configurar Atalhos de Teclado

Recomende a configuração de atalhos de teclado para o workflow do usuário:

1. **Atalhos essenciais** (todos os workflows):
   - Escape rápido: cancelar a operação atual
   - Aceitar sugestão: aprovação rápida de uso de ferramenta
   - Compactar contexto: disparar compaction manual
2. **Atalhos de desenvolvimento**:
   - Rodar testes: execução de testes com uma tecla
   - Commit rápido: fluxo de stage + commit
   - Alternar agente: trocar entre modos de agente
3. **Atalhos de revisão**:
   - Próximo arquivo: navegar pelos arquivos alterados
   - Aprovar/rejeitar: ações rápidas de revisão

Forneça trechos de configuração para o keybindings.json do VS Code se aplicável.

### Fase 5: Configurar Auto-Memory

Configure memória persistente para eficiência entre sessões:

1. **Memória do agente**: crie a estrutura `.claude/agent-memory/`
   - MEMORY.md para padrões persistentes entre sessões
   - Arquivos de tópico para conhecimento de domínio
2. **Regras de higiene de memória**:
   - O que salvar: padrões confirmados, preferências do usuário, soluções de depuração
   - O que NÃO salvar: estado específico de sessão, conclusões especulativas
   - Limites de tamanho: MEMORY.md abaixo de 200 linhas
3. **Templates de memória**: pré-popule com convenções do projeto se detectáveis

### Fase 6: Gerar Plano de Otimização

Produza um plano de otimização priorizado:

1. Ordene todas as recomendações por impacto (ALTO primeiro)
2. Agrupe por esforço: Vitórias Rápidas (< 5 min), Médio (5-30 min), Investimento (30+ min)
3. Para cada recomendação, forneça os passos exatos de implementação
4. Estime o tempo total economizado por semana após a otimização

---

## Formato de Saída

```markdown
## Relatório de Otimização de Workflow

**Projeto:** {project_path}
**Maturidade Atual:** {nível}
**Melhoria Estimada:** {X}% menos interrupções

### Gargalos Encontrados

| Gargalo | Impacto | Esforço de Correção |
|------------|--------|------------|
| {descrição} | ALTO/MÉD/BAIXO | Rápido/Médio/Investimento |

### Vitórias Rápidas (Aplicar Agora)

1. **{título}**: {descrição}
   ```json
   // Mudança exata de config
   ```

### Esforço Médio

1. **{título}**: {descrição}
   - Passo 1: ...
   - Passo 2: ...

### Itens de Investimento

1. **{título}**: {descrição}
   - Tempo estimado: {X} minutos
   - Benefício esperado: {descrição}

### Otimização de Permissões

**Antes:** {N} prompts esperados por sessão
**Depois:** {M} prompts esperados por sessão
**Redução:** {X}%
```

---

## Condições de Veto

- **NUNCA** adicione regras de allow para operações destrutivas para reduzir prompts
- **NUNCA** desabilite hooks de segurança por conveniência
- **NUNCA** remova regras de deny sem explicar o tradeoff de segurança
- **NUNCA** faça alterações sem apresentar o plano primeiro -- esta tarefa produz um plano, o usuário o aplica

---

## Critérios de Conclusão

- [ ] Padrões de uso analisados e nível de maturidade classificado
- [ ] Gargalos identificados com avaliação de impacto
- [ ] Estratégia de permissões projetada com comparação antes/depois
- [ ] Atalhos de teclado recomendados para o tipo de workflow
- [ ] Configuração de memória sugerida
- [ ] Plano de otimização priorizado entregue
