---
tipo: checklist
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
relacionado:
  - "[[Dedalo/checklists/_indice|_indice]]"
---

# Checklist de Prontidão Brownfield

**Checklist ID:** CCM-CL-006
**Referenced by:** project-integrator
**Purpose:** Verificação de prontidão antes de integrar o Claude Code a um projeto existente (brownfield). Garante que o repositório seja analisado, que as convenções sejam descobertas, que os arquivos sensíveis sejam mapeados e que os riscos sejam mitigados.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - PRONTIDÃO BROWNFIELD

Este checklist é usado ANTES de adicionar a configuração do Claude Code a um
projeto existente. Ele garante que entendamos a base de código, protejamos
arquivos sensíveis e integremos sem perturbar os workflows existentes.

ABORDAGEM DE EXECUÇÃO:
1. Analise a estrutura do repositório e o tooling existente
2. Descubra as convenções e patterns já em uso
3. Mapeie TODOS os arquivos sensíveis e segredos
4. Avalie as considerações de equipe para as escolhas de configuração
5. Documente os riscos e prepare o plano de rollback
6. Todos os itens CRITICAL devem passar antes de iniciar a integração

Integração brownfield feita de forma descuidada expõe segredos e quebra workflows.
Reserve tempo para entender antes de modificar.]]

---

## 1. Análise do Repositório

- [ ] O repositório Git está inicializado e tem histórico de commits
- [ ] O `.gitignore` existe e cobre os padrões comuns (node_modules, saída de build, arquivos de SO)
- [ ] Há um pipeline de CI/CD presente (GitHub Actions, GitLab CI, Jenkins, etc.)
- [ ] O repositório tem uma estratégia de branching definida (main/develop, trunk-based, etc.)
- [ ] O gerenciador de pacotes está identificado (npm, yarn, pnpm, bun) com lockfile presente
- [ ] O sistema de build está identificado e funcional (`npm run build` ou equivalente funciona)
- [ ] A linguagem e o framework do projeto estão documentados ou são identificáveis

## 2. Tooling Existente

- [ ] Há um linter configurado (ESLint, Prettier, etc.) com rules existentes
- [ ] Há um framework de testes presente (Jest, Vitest, Mocha, pytest, etc.)
- [ ] As rules de formatação de código estão definidas e aplicadas
- [ ] Existem pre-commit hooks (husky, lint-staged, etc.)
- [ ] Arquivos de configuração de IDE estão presentes (.vscode/, .idea/, etc.)
- [ ] Outras ferramentas de codificação com IA estão configuradas (Copilot, rules do Cursor, etc.)

## 3. Descoberta de Convenções

- [ ] Os padrões de nomenclatura estão identificados (camelCase, PascalCase, kebab-case para arquivos)
- [ ] A estrutura de diretórios está mapeada (src/, lib/, app/, components/, etc.)
- [ ] O estilo de import está identificado (absoluto vs relativo, path aliases)
- [ ] Os patterns de tratamento de erros estão documentados (try/catch, tipos Result, error boundaries)
- [ ] A abordagem de gerenciamento de estado está identificada (se projeto frontend)
- [ ] Os patterns de API estão documentados (REST, GraphQL, tRPC, etc.)
- [ ] A convenção de nomenclatura de arquivos de teste está identificada (*.test.ts, *.spec.ts, __tests__/)

## 4. Arquivos Sensíveis

- [ ] Todos os arquivos `.env` localizados e catalogados (CRITICAL)
- [ ] Arquivos de credenciais identificados (service accounts, API keys, certificados) (CRITICAL)
- [ ] A abordagem de gerenciamento de segredos está documentada (vault, env vars, arquivos de config)
- [ ] O `.gitignore` já exclui arquivos de segredos (verifique, não presuma)
- [ ] Nenhum segredo commitado encontrado no histórico do git (rode um secret scanner se disponível)
- [ ] Arquivos de chave privada (*.key, *.pem, *.p12) localizados e mapeados
- [ ] As strings de conexão com banco de dados identificadas e seu método de armazenamento documentado

## 5. Considerações de Equipe

- [ ] O tamanho da equipe está documentado (solo, equipe pequena, equipe grande)
- [ ] A preferência de modo de permissão está decidida (explore para solo, ask para equipes, auto para CI confiável)
- [ ] A estratégia de settings compartilhados vs locais está decidida (settings.json vs settings.local.json)
- [ ] O processo de code review existente está documentado (revisões de PR, pair programming)
- [ ] A familiaridade da equipe com ferramentas de codificação com IA está avaliada
- [ ] O plano de comunicação para apresentar o Claude Code aos membros da equipe está definido

## 6. Avaliação de Riscos

- [ ] Os caminhos críticos estão identificados (auth, pagamentos, processamento de dados) que precisam de deny rules extras
- [ ] Existe um plano de rollback (é possível remover o diretório .claude/ de forma limpa) (CRITICAL)
- [ ] Não existe um diretório .claude/ que seria sobrescrito
- [ ] A integração não modificará o CI/CD existente sem aprovação explícita
- [ ] O escopo da primeira integração é limitado (comece com CLAUDE.md + settings, adicione rules incrementalmente)
- [ ] Há um ambiente de teste disponível para validar a integração antes do rollout para toda a equipe

---

## Critérios de PASS/FAIL

**PASS:** Todos os itens marcados como (CRITICAL) estão marcados. Os arquivos sensíveis estão totalmente mapeados. O plano de rollback está documentado. A avaliação de riscos está completa, com mitigações para cada risco identificado.

**FAIL:** Qualquer item (CRITICAL) não marcado. Arquivos sensíveis não totalmente identificados. Nenhum plano de rollback. Avaliação de riscos incompleta.

**Ação em caso de FAIL:** Conclua o mapeamento de arquivos sensíveis antes de qualquer trabalho de integração. Documente o plano de rollback. Se forem encontrados segredos no histórico do git, resolva esse problema de segurança antes de prosseguir com a integração do Claude Code.
