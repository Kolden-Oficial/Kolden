# Tarefa: Criar Regras Condicionais

**Task ID:** CCM-CONFIG-003
**Version:** 1.0.0
**Command:** `*create-rules`
**Orchestrator:** Sigil (config-engineer)
**Purpose:** Criar regras condicionais em `.claude/rules/` com o frontmatter YAML `paths:` adequado para carregamento eficiente em contexto, garantindo que as regras só sejam ativadas quando os arquivos relevantes estiverem sendo trabalhados.

---

## Visão Geral

```
  +------------------+     +------------------+     +------------------+
  | 1. Identificar   | --> | 2. Criar Arquivo | --> | 3. Escrever o    |
  |    Necessidade   |     |    de Regra com  |     |    Conteúdo da   |
  |    da Regra      |     |    Frontmatter   |     |    Regra         |
  +------------------+     +------------------+     +------------------+
                            +------------------+          |
                                                          v
                            +------------------+     +------------------+
                            | 5. Testar a      | <-- | 4. Validar o     |
                            |    Ativação da   |     |    Carregamento  |
                            |    Regra         |     |    da Regra      |
                            +------------------+     +------------------+
```

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| rule_name | string | Parâmetro do usuário | Sim | Nome de arquivo em kebab-case (ex.: `api-conventions`) |
| rule_type | string | Parâmetro do usuário | Não | `conditional` (padrão) ou `always-on` |
| target_paths | array | Parâmetro do usuário ou autodetectado | Não | Padrões glob para carregamento condicional |
| description | string | Parâmetro do usuário | Não | Propósito da regra |

---

## Pré-condições

- O diretório .claude/ existe (ou será criado)
- Compreensão de quais diretórios/arquivos a regra deve se aplicar
- Não existe arquivo de regra com o mesmo nome (ou o usuário confirma a sobrescrita)

---

## Fases de Execução

### Fase 1: Identificar a Necessidade da Regra

Determine que tipo de regra criar:

1. Pergunte ao usuário qual comportamento ele deseja impor ou qual contexto deseja injetar
2. Categorize a regra:

| Categoria | Exemplos de Regras | Caminhos Típicos |
|----------|---------------|---------------|
| Convenções de API | Padrões de endpoint, tratamento de erros, validação | `src/api/**`, `server/**` |
| Padrões de componentes | Padrões React, estilização, convenções de props | `src/components/**/*.tsx` |
| Convenções de teste | Padrões de teste, estratégias de mock, cobertura | `tests/**`, `**/*.test.*` |
| Regras de banco de dados | Padrões de migração, convenções de query, RLS | `migrations/**`, `supabase/**` |
| Documentação | Formatação de docs, estrutura de README, changelog | `docs/**`, `*.md` |
| Segurança | Validação de entrada, padrões de auth, OWASP | `src/auth/**`, `src/middleware/**` |
| Configuração | Convenções de arquivos de config, padrões de env var | `*.config.*`, `.env.*` |
| Always-on | Convenções de todo o projeto (sem necessidade de paths:) | (nenhum -- carrega sempre) |

3. Se o usuário estiver inseguro: escaneie a estrutura do projeto e sugira regras com base nos diretórios detectados

### Fase 2: Criar o Arquivo de Regra com Frontmatter

1. Determine o caminho do arquivo: `.claude/rules/{rule_name}.md`
2. Para **regras condicionais**, gere o frontmatter YAML `paths:`:

```markdown
---
paths:
  - "src/api/**/*.ts"
  - "src/api/**/*.tsx"
  - "server/**/*.ts"
---
```

**Referência de padrões glob:**
- `*` casa com qualquer segmento único de caminho
- `**` casa com zero ou mais segmentos de caminho (recursivo)
- `*.ts` casa com arquivos TypeScript no diretório atual
- `**/*.ts` casa com arquivos TypeScript recursivamente
- `src/{api,server}/**` casa com múltiplos diretórios
- `**/*.{ts,tsx}` casa com múltiplas extensões usando expansão de chaves

3. Para **regras always-on**, omita o frontmatter inteiramente (sem blocos `---`)
4. Crie subdiretórios se organizar por domínio: `.claude/rules/frontend/`, `.claude/rules/backend/`

### Fase 3: Escrever o Conteúdo da Regra

Escreva o corpo da regra seguindo estas diretrizes:

1. **Comece com um cabeçalho claro** explicando o propósito da regra
2. **Use instruções imperativas** -- diga ao Claude o que fazer, não o que considerar
3. **Seja específico e verificável** -- inclua exemplos de código quando relevante
4. **Mantenha as regras concisas** -- mire em 20-60 linhas por arquivo de regra
5. **Use bullet points** para regras individuais

**Template de regra:**

```markdown
---
paths:
  - "{padrões-glob}"
---
# {Título da Regra}

## Convenções

- {Instrução específica e acionável}
- {Outra instrução com exemplo}

## Padrões

Ao criar {X}, siga este padrão:

```{language}
{exemplo de código}
```

## Antipadrões

- NÃO {coisa específica a evitar}
- NÃO {outra coisa a evitar}
```

### Fase 4: Validar o Carregamento da Regra

1. Verifique se o YAML do frontmatter é válido:
   - Delimitadores `---` adequados (abertura e fechamento)
   - `paths:` é um array YAML (cada item começa com `- `)
   - Padrões glob são strings entre aspas
   - Sem espaços em branco ao final ou caracteres de tabulação no frontmatter
2. Verifique se o arquivo está salvo em `.claude/rules/` (ou em um subdiretório)
3. Verifique se os padrões glob casam com arquivos reais no projeto:
   - Execute um teste de correspondência glob contra a estrutura do projeto
   - Avise se os padrões casarem com zero arquivos (possivelmente incorretos)
   - Avise se os padrões casarem com arquivos demais (excessivamente amplos)

### Fase 5: Testar a Ativação da Regra

1. Explique ao usuário como verificar se a regra carrega:
   - Abra um arquivo que case com um dos padrões glob
   - A regra deve aparecer no contexto do Claude para essa interação
   - Regras sem frontmatter paths: carregam em toda interação
2. Sugira um prompt de teste que dispararia as instruções da regra
3. Se a regra conflitar com o conteúdo do CLAUDE.md, sinalize o conflito:
   - Regras e instruções do CLAUDE.md devem se complementar, não se contradizer
   - Se houver contradição: recomende remover a instrução do CLAUDE.md (o arquivo de regra é mais direcionado)

---

## Formato de Saída

```markdown
## Regra Criada

**Arquivo:** .claude/rules/{rule_name}.md
**Tipo:** {conditional | always-on}
**Linhas:** {N}

### Comportamento de Carregamento

{Para conditional:}
Esta regra carrega quando o Claude lê arquivos que casam com:
- `{padrão-1}` -- casa com {N} arquivos
- `{padrão-2}` -- casa com {N} arquivos

{Para always-on:}
Esta regra carrega em toda interação.

### Resumo do Conteúdo

{Resumo de 1-2 frases sobre o que a regra impõe}

### Verificação

Abra qualquer arquivo que case com os paths acima e peça ao Claude para seguir as
convenções. A regra estará ativa nesse contexto.
```

---

## Condições de Veto

- **NUNCA** crie uma regra que contradiga instruções no CLAUDE.md sem sinalizar o conflito e recomendar a resolução.
- **NUNCA** crie uma regra condicional sem testar que seus padrões glob casam com ao menos um arquivo existente. Avise se houver zero correspondências.
- **NUNCA** escreva um arquivo de regra com mais de 100 linhas. Divida em várias regras focadas.
- **NUNCA** inclua secrets, API keys ou credenciais em arquivos de regra (eles são commitados no git).
- **NUNCA** crie uma regra always-on para conteúdo que deveria ser condicional. Regras always-on grandes desperdiçam o orçamento de contexto em toda interação.

---

## Critérios de Conclusão

- [ ] Necessidade da regra identificada e categorizada
- [ ] Arquivo criado em .claude/rules/ com o caminho correto
- [ ] YAML do frontmatter validado (para regras condicionais)
- [ ] Conteúdo da regra segue o template com instruções específicas e acionáveis
- [ ] Padrões glob testados contra a estrutura do projeto
- [ ] Sem conflitos com instruções existentes no CLAUDE.md
