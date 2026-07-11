---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/architect-first/references/architecture-checklist|architecture-checklist]]"
  - "[[Prometeu/.claude/skills/architect-first/references/stop-rules-guide|stop-rules-guide]]"
  - "[[Prometeu/.claude/skills/architect-first/references/testing-strategy-guide|testing-strategy-guide]]"
---

# Checklist de Pré-Implementação

Use este checklist antes de escrever qualquer código para garantir que a validação arquitetural esteja completa.

## Validação de Arquitetura

- [ ] **Arquitetura documentada e validada?**
  - [ ] Diagramas de arquitetura criados
  - [ ] Interações entre componentes definidas
  - [ ] Fluxos de dados mapeados
  - [ ] Pontos de integração identificados
  - [ ] Validação multiagente concluída
  - [ ] Architecture Decision Record (ADR) escrito

## Definição do Caso de Uso Central

- [ ] **Caso de uso central claramente definido?**
  - [ ] Workflow principal do usuário documentado
  - [ ] Critérios de sucesso especificados
  - [ ] Critérios de aceitação escritos
  - [ ] Casos extremos identificados
  - [ ] Cenários de erro mapeados

## Externalização de Configuração

- [ ] **Configuração externalizada para YAML?**
  - [ ] Todos os valores mutáveis identificados
  - [ ] Schema YAML definido
  - [ ] Configuração padrão criada
  - [ ] Regras de validação de configuração especificadas
  - [ ] Nenhum valor hardcoded na implementação planejada
  - [ ] Documentação de configuração escrita

## Estratégia de Testes

- [ ] **Estratégia de testes definida?**
  - [ ] Plano de testes escrito
  - [ ] Casos de teste unitário identificados
  - [ ] Cenários de teste de integração definidos
  - [ ] Metas de cobertura estabelecidas
  - [ ] Requisitos de dados de teste identificados

## Estratégia de Logging

- [ ] **Pontos de logging/observação identificados?**
  - [ ] Pontos-chave de decisão para logging marcados
  - [ ] Níveis de log atribuídos
  - [ ] Pontos de tratamento de erro identificados
  - [ ] Hooks de debugging planejados
  - [ ] Requisitos de monitoramento especificados

## Dependências

- [ ] **Dependências validadas?**
  - [ ] Todas as bibliotecas/pacotes necessários identificados
  - [ ] Compatibilidade de versões verificada
  - [ ] Conformidade de licenças verificada
  - [ ] Acoplamento zero mantido (sem deps cruzadas entre módulos hardcoded)

## Plano de Documentação

- [ ] **Plano de documentação pronto?**
  - [ ] Esboço da documentação de API criado
  - [ ] Exemplos de uso planejados
  - [ ] Esboço do guia de configuração criado
  - [ ] Foco em "como customizar" mantido

## Prontidão para Implementação

- [ ] **Pronto para implementar?**
  - [ ] Todos os itens acima do checklist concluídos
  - [ ] A equipe tem entendimento claro da arquitetura
  - [ ] Primeira tarefa de codificação identificada
  - [ ] Processo de code review estabelecido

---

## Reconhecimento do Escape Hatch de Qualidade

**Lembre-se**: A qualidade do código é negociável SE respaldada por testes.

Você pode prosseguir com:
- ✓ Código "feio" COM testes abrangentes
- ✓ Implementação rápida COM plano de testes + logging
- ✓ 80% de completude de funcionalidade SE o caso central funcionar

Você NÃO deve prosseguir com:
- ✗ Código "feio" SEM testes
- ✗ Valores mutáveis hardcoded
- ✗ Implementação sem o caso central definido

---

## Verificação das Stop Rules

Antes de prosseguir, verifique que NENHUMA destas condições é verdadeira:

- ⛔ Perda de capacidade em relação ao baseline
- ⛔ Decisão estrutural sem validação multiagente
- ⛔ Acoplamento entre módulos
- ⛔ Documentação arquitetural ausente
- ⛔ Código rápido & sujo SEM plano de testes e logs
- ⛔ Valores de configuração mutáveis hardcoded

**Se alguma stop rule for disparada**: PARE e remedie antes de codar.

---

## Aprovação

**Checklist de Pré-Implementação Concluído**: [ ] SIM [ ] NÃO

**Aprovado para Começar a Codar**: [ ] SIM [ ] NÃO

**Aprovador**: _________________ Data: _______

**Primeira Tarefa**: _________________________________________________

**Conclusão Estimada**: _______
