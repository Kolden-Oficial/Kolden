---
tipo: checklist
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/checklists/_indice|_indice]]"
---

# Checklist de Revisão Multi-Agente

**Checklist ID:** CCM-CL-004
**Referenced by:** swarm-orchestrator
**Purpose:** Validação pós-conclusão depois que uma equipe de agentes termina o trabalho. Garante que todas as saídas estejam presentes, mescladas sem conflito, atendam aos padrões de qualidade e que todos os recursos temporários sejam limpos.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - REVISÃO MULTI-AGENTE

Este checklist valida a saída combinada de uma execução multi-agente.
Execute-o DEPOIS que todos os agentes tenham concluído ou atingido o timeout.

ABORDAGEM DE EXECUÇÃO:
1. Verifique se cada agente retornou um resultado (ou documente por que não retornou)
2. Verifique se há conflitos de merge entre as saídas dos agentes
3. Valide cada saída em relação aos seus critérios de aceitação
4. Limpe todos os worktrees, branches e artefatos temporários
5. Execute testes de integração no resultado combinado
6. Todos os itens CRITICAL devem passar para que a execução da equipe seja considerada bem-sucedida

Pular a revisão pós-execução leva a recursos órfãos e falhas ocultas.]]

---

## 1. Completude das Saídas

- [ ] Todos os agentes lançados retornaram resultados (sem falhas silenciosas) (CRITICAL)
- [ ] Agentes que atingiram o timeout têm seu trabalho parcial documentado
- [ ] A saída de cada agente corresponde ao escopo da subtarefa atribuída
- [ ] Nenhum agente produziu saída vazia ou placeholder
- [ ] Os relatórios de status de cada agente são coletados e revisados
- [ ] Agentes que encontraram erros registraram o motivo da falha

## 2. Validação do Merge

- [ ] Sem conflitos em nível de arquivo entre as saídas dos agentes (CRITICAL)
- [ ] Se existirem conflitos, eles são resolvidos com justificativa documentada
- [ ] Formatação de código consistente em todas as saídas dos agentes (mesma configuração de lint aplicada)
- [ ] Nenhum nome duplicado de função/variável/componente introduzido por diferentes agentes
- [ ] As declarações de import são consistentes (sem versões de dependências conflitantes)
- [ ] Arquivos de configuração compartilhados (package.json, tsconfig, etc.) são mesclados corretamente

## 3. Verificação de Qualidade

- [ ] A saída de cada agente atende aos critérios de aceitação de sua subtarefa (CRITICAL)
- [ ] `npm run lint` passa na base de código combinada
- [ ] `npm run typecheck` passa na base de código combinada (se TypeScript)
- [ ] Os testes unitários do trabalho de cada agente passam individualmente
- [ ] Nenhuma regressão introduzida (os testes existentes ainda passam)
- [ ] O código segue os padrões e patterns de codificação do projeto

## 4. Limpeza de Worktree

- [ ] Todos os worktrees criados para esta execução são mesclados ou removidos (CRITICAL)
- [ ] Nenhum branch órfão remanescente do trabalho dos agentes
- [ ] Os arquivos temporários criados pelos agentes são limpos
- [ ] Os artefatos de build específicos dos agentes são removidos
- [ ] O diretório `.git/worktrees/` não tem entradas obsoletas
- [ ] As regras de proteção de branch são restauradas se modificadas temporariamente

## 5. Teste de Integração

- [ ] A saída combinada compila/builda com sucesso (CRITICAL)
- [ ] `npm test` passa na base de código integrada completa
- [ ] Os workflows de ponta a ponta afetados pelas mudanças ainda funcionam
- [ ] Os contratos de API entre componentes escritos por diferentes agentes são compatíveis
- [ ] Nenhuma dependência circular introduzida entre os novos módulos
- [ ] Os benchmarks de desempenho estão dentro da faixa aceitável (sem degradação significativa)

---

## Critérios de PASS/FAIL

**PASS:** Todos os agentes retornaram resultados. Sem conflitos de merge não resolvidos. A base de código combinada passa em lint, typecheck e testes. Todos os worktrees limpos.

**FAIL:** Algum agente não produziu saída sem motivo documentado. Existem conflitos de merge não resolvidos. Os testes combinados falham. Worktrees ou branches órfãos permanecem.

**Ação em caso de FAIL:** Para saídas ausentes, determine a causa raiz e reexecute o agente individual se necessário. Para conflitos de merge, resolva manualmente e documente. Para falhas de teste, identifique qual saída de agente causa a falha e corrija. Para recursos órfãos, execute os comandos de limpeza.
