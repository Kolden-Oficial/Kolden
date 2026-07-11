---
tipo: checklist
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/checklists/agent-quality-gate|agent-quality-gate]]"
  - "[[Prometeu/.aiox-core/development/checklists/issue-triage-checklist|issue-triage-checklist]]"
  - "[[Prometeu/.aiox-core/development/checklists/memory-audit-checklist|memory-audit-checklist]]"
  - "[[Prometeu/.aiox-core/development/checklists/self-critique-checklist|self-critique-checklist]]"
---

# Checklist de Compatibilidade Brownfield

> Story AIOX-DIFF-4.3.2: Checklist formal de compatibilidade retroativa

## Verificação de Compatibilidade Pré-Migração

### 1. Status do Controle de Versão
- [ ] Todas as mudanças commitadas no controle de versão
- [ ] Branch de trabalho criado a partir de main/master
- [ ] Backup remoto verificado (push antes da migração)

### 2. Preservação da Configuração Existente
- [ ] Arquivos `.env` com backup (nunca sobrescritos pelo AIOX)
- [ ] Scripts do `package.json` preservados
- [ ] Configuração de linting existente (.eslintrc, .prettierrc) detectada
- [ ] Workflows de CI/CD (.github/workflows) inventariados

### 3. Compatibilidade de Dependências
- [ ] Versão do Node.js compatível (>=18)
- [ ] Nenhuma dependência global conflitante
- [ ] Lock file (package-lock.json/yarn.lock) preservado

### 4. Análise da Estrutura de Diretórios
- [ ] Status do diretório `docs/` verificado (vazio/existente)
- [ ] `.aiox-core/` não presente (instalação nova)
- [ ] Nenhum conflito de nomes com os diretórios do AIOX

## Verificações Durante a Migração

### 5. Operações Não Destrutivas
- [ ] AIOX cria novos arquivos, nunca sobrescreve os existentes
- [ ] Conflitos de merge expostos para decisão do usuário
- [ ] Arquivos originais preservados com `.backup` em caso de conflito

### 6. Estratégia de Merge de Configuração
- [ ] Entradas existentes do `.gitignore` preservadas + entradas do AIOX adicionadas
- [ ] Config do TypeScript estendido (não substituído) se existente
- [ ] Regras do ESLint mescladas (não sobrescritas)

### 7. Pontos de Rollback
- [ ] Hash do commit pré-migração registrado
- [ ] Arquivos do AIOX claramente identificados (podem ser removidos de forma limpa)
- [ ] Nenhuma modificação no código-fonte existente durante a instalação

## Validação Pós-Migração

### 8. Funcionalidade Existente
- [ ] `npm test` passa (se já existiam testes antes)
- [ ] `npm run build` é bem-sucedido (se existia build)
- [ ] Aplicação inicia normalmente

### 9. Integração do AIOX
- [ ] `npx aiox-core doctor` reporta saudável
- [ ] Ativação de agentes funciona (@dev, @architect, etc.)
- [ ] Docs existentes não duplicados

### 10. Verificação de Rollback
- [ ] `git diff HEAD~1` mostra apenas adições do AIOX
- [ ] `git checkout HEAD~1 -- .` restauraria o estado pré-AIOX
- [ ] Nenhum processo ou arquivo órfão do AIOX

---

## Matriz de Compatibilidade

| Configuração Existente | Comportamento do AIOX | Ação do Usuário Necessária |
|-----------------|---------------|---------------------|
| `.eslintrc.*` | Detectar + preservar | Nenhuma |
| `.prettierrc.*` | Detectar + preservar | Nenhuma |
| `tsconfig.json` | Estender (não substituir) | Revisar os extends |
| `jest.config.*` | Detectar + preservar | Nenhuma |
| `docs/*.md` | Pular (não sobrescrever) | Merge manual se necessário |
| `.github/workflows/*` | Apenas inventariar | Usuário decide a integração |
| Scripts do `package.json` | Preservar todos | Nenhuma |

## Procedimento de Rollback

Se a migração falhar ou não for desejada:

```bash
# Opção 1: Rollback completo para o estado pré-migração
git checkout HEAD~1 -- .

# Opção 2: Remover apenas os arquivos do AIOX
rm -rf .aiox-core/
rm -rf docs/architecture/ docs/prd/ docs/stories/
# Revisar e reverter as entradas do AIOX no .gitignore

# Opção 3: Rollback suave (manter docs, remover runtime)
rm -rf .aiox-core/
```

---

## Uso do Checklist

**Pré-Migração:**
```bash
# Rodar verificação de compatibilidade
npx aiox-core doctor --pre-migration
```

**Pós-Migração:**
```bash
# Validar a migração
npx aiox-core doctor
npm test  # se houver testes
npm run build  # se houver build
```

---

*Checklist de Compatibilidade Brownfield do AIOX v1.0*
*Story AIOX-DIFF-4.3.2*
