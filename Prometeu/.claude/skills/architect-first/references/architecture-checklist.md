---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/architect-first/references/pre-implementation-checklist|pre-implementation-checklist]]"
  - "[[Prometeu/.claude/skills/architect-first/references/stop-rules-guide|stop-rules-guide]]"
  - "[[Prometeu/.claude/skills/architect-first/references/testing-strategy-guide|testing-strategy-guide]]"
---

# Checklist de Validação de Arquitetura

Use este checklist ao validar decisões arquiteturais antes da implementação.

## 1. Documentação do Estado Atual

**Mapeie Antes de Modificar** - Documente o que existe antes de fazer mudanças.

- [ ] Arquitetura atual do sistema documentada
  - [ ] Diagrama de componentes criado
  - [ ] Diagrama de fluxo de dados criado
  - [ ] Pontos de integração identificados
  - [ ] Dependências mapeadas

- [ ] Pontos de contato identificados
  - [ ] Todos os módulos que serão afetados listados
  - [ ] Dependências cruzadas entre módulos documentadas
  - [ ] Integrações com sistemas externos anotadas

- [ ] Capacidades de baseline catalogadas
  - [ ] Lista de funcionalidades atuais documentada
  - [ ] Métricas de performance registradas
  - [ ] Workflows de usuário mapeados

## 2. Design da Solução Proposta

**Arquitete Antes de Construir** - Design completo antes do código.

- [ ] Múltiplas opções apresentadas (A/B/C no mínimo)
  - [ ] Opção A: [Nome e breve descrição]
  - [ ] Opção B: [Nome e breve descrição]
  - [ ] Opção C: [Nome e breve descrição]

- [ ] Trade-offs explicitamente documentados
  - [ ] Implicações de performance
  - [ ] Implicações de complexidade
  - [ ] Implicações de manutenibilidade
  - [ ] Implicações de escalabilidade

- [ ] Arquitetura escolhida documentada
  - [ ] Diagrama de arquitetura do sistema
  - [ ] Diagrama de interação entre componentes
  - [ ] Diagrama de fluxo de dados
  - [ ] Schema de configuração (YAML)
  - [ ] Pontos de integração
  - [ ] Contratos de API

## 3. Validação Multiagente

**Sem Decisões Estruturais Unilaterais** - Obtenha validação de múltiplas perspectivas.

- [ ] Validação do Product Owner
  - [ ] Alinhamento com objetivos de negócio confirmado
  - [ ] Valor para o usuário claramente articulado
  - [ ] Prioridade justificada

- [ ] Validação do Arquiteto
  - [ ] Solidez técnica confirmada
  - [ ] Escalabilidade verificada
  - [ ] Segurança revisada
  - [ ] Performance aceitável

- [ ] Validação do Usuário/Stakeholder
  - [ ] Decisão final documentada
  - [ ] Justificativa registrada
  - [ ] Aprovação obtida

## 4. Preservação de Capacidade

**Nunca Perca Capacidade** - Garanta que não haja regressão de funcionalidade.

- [ ] Comparação com o Baseline Gold Standard
  - [ ] Todas as capacidades anteriores mapeadas
  - [ ] O novo design mantém TODAS as capacidades
  - [ ] Quaisquer remoções explicitamente justificadas e aprovadas

- [ ] Paridade de funcionalidades verificada
  - [ ] Tabela de comparação de funcionalidades criada
  - [ ] Caminho de migração para funcionalidades removidas (se houver)
  - [ ] Plano de compatibilidade retroativa

## 5. Validação de Acoplamento Zero

**Modularidade Máxima** - Garanta a independência entre componentes.

- [ ] Independência dos módulos verificada
  - [ ] Cada expansion pack pode rodar independentemente
  - [ ] Sem dependências cruzadas entre módulos hardcoded
  - [ ] Interfaces limpas definidas

- [ ] Configuração externalizada
  - [ ] Todas as referências cruzadas entre módulos na config YAML
  - [ ] Sem caminhos ou identificadores hardcoded
  - [ ] Schema de configuração documentado

- [ ] Script de verificação de acoplamento aprovado
  - [ ] `scripts/check_coupling.py` executado
  - [ ] Todas as violações de acoplamento resolvidas
  - [ ] Princípio de acoplamento zero mantido

## 6. Estratégia de Configuração

**Config > Hardcoding** - Externalize todos os valores mutáveis.

- [ ] Valores mutáveis identificados
  - [ ] Lista de todos os pontos de configuração
  - [ ] Valores padrão definidos
  - [ ] Mecanismos de sobrescrita especificados

- [ ] Configuração YAML criada
  - [ ] Schema de configuração definido
  - [ ] Exemplos de configuração fornecidos
  - [ ] Regras de validação especificadas

- [ ] Sem violações de hardcoding
  - [ ] Todos os caminhos configuráveis
  - [ ] Todos os limiares configuráveis
  - [ ] Todos os pontos de integração configuráveis

## 7. Estratégia de Testes

**Escape Hatch de Qualidade** - Testes como rede de segurança para a implementação.

- [ ] Plano de testes definido
  - [ ] Estratégia de testes unitários
  - [ ] Estratégia de testes de integração
  - [ ] Cenários de testes end-to-end

- [ ] Metas de cobertura de testes estabelecidas
  - [ ] Percentual mínimo de cobertura
  - [ ] Caminhos críticos identificados
  - [ ] Casos extremos documentados

- [ ] Estratégia de logging definida
  - [ ] Pontos-chave de observação identificados
  - [ ] Níveis de log especificados
  - [ ] Hooks de debugging planejados

## 8. Requisitos de Documentação

**Documentação é Inegociável** - Deve preceder a implementação.

- [ ] Architecture Decision Record (ADR) criado
  - [ ] Contexto documentado
  - [ ] Decisão documentada
  - [ ] Consequências documentadas
  - [ ] Use o template: `assets/adr-template.md`

- [ ] Guia de implementação criado
  - [ ] Curto e acionável
  - [ ] Foco em "como customizar"
  - [ ] Exemplos de código incluídos
  - [ ] Exemplos de configuração incluídos

- [ ] Documentação de API criada (se aplicável)
  - [ ] Endpoints documentados
  - [ ] Schemas de request/response
  - [ ] Requisitos de autenticação
  - [ ] Rate limits e restrições

## 9. Avaliação de Riscos

**Mitigue Antes de Implementar** - Identifique e trate riscos antecipadamente.

- [ ] Riscos identificados
  - [ ] Riscos técnicos listados
  - [ ] Riscos de negócio listados
  - [ ] Riscos de cronograma listados

- [ ] Mitigações definidas
  - [ ] Cada risco tem estratégia de mitigação
  - [ ] Viabilidade da mitigação verificada
  - [ ] Planos de contingência documentados

- [ ] Mitigação de riscos validada
  - [ ] `scripts/validate_risk_mitigation.py` executado
  - [ ] Todos os riscos de alta prioridade tratados
  - [ ] Nível de risco aceitável confirmado

## 10. Prontidão para Implementação

**Portão Final** - Pronto para prosseguir ao código.

- [ ] Todos os itens anteriores do checklist concluídos
- [ ] Arquitetura aprovada por todos os stakeholders
- [ ] Acoplamento zero verificado
- [ ] Configuração externalizada
- [ ] Testes definidos
- [ ] Documentação completa
- [ ] Riscos mitigados

---

## Verificação de Disparo das Stop Rules

**Se QUALQUER uma destas for verdadeira, PARE e remedie:**

- ⛔ Perda de capacidade detectada em relação ao baseline
- ⛔ Decisão estrutural sem validação multiagente
- ⛔ Acoplamento entre módulos detectado
- ⛔ Documentação arquitetural ausente
- ⛔ Valores de configuração mutáveis hardcoded

→ Se parar, consulte `stop-rules-guide.md` para os passos de remediação.

---

## Assinatura

- **Product Owner**: _________________ Data: _______
- **Arquiteto**: _________________ Data: _______
- **Desenvolvedor Líder**: _________________ Data: _______

**Arquitetura Aprovada**: [ ] SIM [ ] NÃO

**Prosseguir para Implementação**: [ ] SIM [ ] NÃO
