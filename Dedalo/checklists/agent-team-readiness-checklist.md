---
tipo: checklist
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/checklists/_indice|_indice]]"
---

# Checklist de Prontidão da Equipe de Agentes

**Checklist ID:** CCM-CL-003
**Referenced by:** swarm-orchestrator
**Purpose:** Validação pré-lançamento antes de iniciar equipes de agentes paralelas ou sequenciais. Garante que a decomposição de tarefas seja sólida, que os agentes estejam configurados, que o isolamento esteja planejado e que a recuperação de falhas esteja definida.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - PRONTIDÃO DA EQUIPE DE AGENTES

Este checklist valida se um plano de execução multi-agente é seguro
para lançar. Ele previne desperdício de computação, conflitos de merge e
trabalho órfão ao detectar problemas de configuração antes de qualquer agente ser lançado.

ABORDAGEM DE EXECUÇÃO:
1. Revise o plano de decomposição de tarefas
2. Valide a configuração e o acesso a ferramentas de cada agente
3. Confirme se a estratégia de isolamento previne conflitos
4. Verifique os limites de recursos e as estimativas de custo
5. Garanta que as estratégias de comunicação e merge estejam definidas
6. Todos os itens CRITICAL devem passar antes de qualquer agente ser lançado

Lançar agentes sem validação cria trabalho de limpeza caro.]]

---

## 1. Decomposição de Tarefas

- [ ] Todas as subtarefas estão identificadas com fronteiras de escopo claras (CRITICAL)
- [ ] As dependências entre subtarefas estão mapeadas (quais devem terminar antes de outras começarem)
- [ ] Não existem dependências circulares entre subtarefas (CRITICAL)
- [ ] Cada subtarefa tem um único agente responsável atribuído
- [ ] As saídas das subtarefas estão bem definidas (arquivos, artefatos, relatórios de status)
- [ ] A complexidade estimada por subtarefa está documentada (pequena/média/grande)
- [ ] As subtarefas seguras para paralelismo estão identificadas (sem modificações de arquivos compartilhados)

## 2. Configuração de Agentes

- [ ] Os arquivos de definição de agente (.md) existem para cada agente atribuído (CRITICAL)
- [ ] A seleção de modelo é apropriada para a complexidade da tarefa de cada agente
- [ ] As restrições de ferramentas correspondem às necessidades de cada agente (sem acesso desnecessário a ferramentas)
- [ ] As personas dos agentes não conflitam com os requisitos das subtarefas
- [ ] Os system prompts ou o conteúdo do CLAUDE.md são compatíveis com os papéis dos agentes
- [ ] Cada agente tem acesso aos arquivos específicos que precisa ler/modificar

## 3. Estratégia de Isolamento

- [ ] A decisão de worktree vs workspace compartilhado está tomada e documentada (CRITICAL)
- [ ] A convenção de nomenclatura de branches está definida (ex.: agent/{agent-id}/{subtask-id})
- [ ] Se workspace compartilhado: estratégia de locking em nível de arquivo definida para prevenir conflitos
- [ ] Se isolamento por worktree: branch base de cada worktree identificado
- [ ] Os agentes trabalhando na mesma base de código têm escopos de arquivo não sobrepostos
- [ ] Os arquivos temporários e artefatos de build têm caminhos específicos por agente

## 4. Planejamento de Recursos

- [ ] max_turns está definido para cada agente para prevenir execução descontrolada (CRITICAL)
- [ ] A execução em background vs foreground está decidida por agente
- [ ] O custo total estimado está calculado para todos os agentes
- [ ] O teto de custo está definido (gasto máximo antes de parar)
- [ ] Os limites de timeout estão definidos para o lançamento de cada agente
- [ ] O orçamento de memória/contexto por agente está avaliado (bases de código grandes podem atingir limites)

## 5. Plano de Comunicação

- [ ] Como os agentes compartilham resultados intermediários está definido (arquivos, arquivos de status, stdout)
- [ ] A estratégia de merge para combinar as saídas dos agentes está documentada (CRITICAL)
- [ ] Existe procedimento de resolução de conflitos para mudanças sobrepostas
- [ ] O mecanismo de reporte de status está definido (polling, arquivos de conclusão, eventos)
- [ ] O ponto de integração final está identificado (qual agente ou processo mescla tudo)
- [ ] Os artefatos de handoff entre agentes sequenciais estão especificados

## 6. Plano de Rollback

- [ ] O que acontece se um agente individual falhar está definido (CRITICAL)
- [ ] O procedimento de limpeza para o trabalho parcial de um agente que falhou está documentado
- [ ] Os outros agentes podem continuar de forma independente se um falhar (degradação elegante)
- [ ] O comando de limpeza de worktree está preparado para o pós-execução
- [ ] O estado do Git pode ser restaurado para a baseline pré-lançamento se a equipe inteira falhar
- [ ] A detecção e limpeza de branches órfãos está planejada

---

## Critérios de PASS/FAIL

**PASS:** Todos os itens marcados como (CRITICAL) estão marcados. Todos os agentes têm definições válidas. A decomposição de tarefas não tem dependências circulares. A estratégia de merge está documentada.

**FAIL:** Qualquer item (CRITICAL) não marcado. Arquivo de definição de agente ausente. Dependência circular detectada. Nenhuma estratégia de merge definida.

**Ação em caso de FAIL:** Corrija todas as lacunas críticas antes de lançar qualquer agente. Se a decomposição de tarefas tiver dependências circulares, reestruture o plano. Se faltarem definições de agentes, crie-as primeiro.
