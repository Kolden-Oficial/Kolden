# Checklist de Quality Gate Pré-Push

**Checklist ID:** CCM-CL-001
**Referenced by:** config-engineer, roadmap-sentinel
**Purpose:** Validar mudanças de configuração do Claude Code antes de fazer push para o remoto. Garante integridade dos settings, qualidade do CLAUDE.md, correção das rules, segurança dos hooks e sanidade do MCP.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - VALIDAÇÃO PRÉ-PUSH

Este checklist valida mudanças de configuração do Claude Code especificamente.
Ele complementa o pre-push-checklist do framework AIOS, mas foca em
artefatos do diretório .claude/, settings.json, rules, hooks e configuração MCP.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao estado atual do arquivo
2. Marque os itens como [x] Pass, [ ] Fail ou [N/A] Não Aplicável
3. Qualquer falha em item CRITICAL bloqueia o push
4. Falhas não críticas devem ser documentadas com justificativa

Itens CRITICAL são marcados com o sufixo (CRITICAL).]]

---

## 1. Validação de Settings

- [ ] `settings.json` é um JSON válido sem erros de sintaxe (CRITICAL)
- [ ] `settings.json` contém `deny` rules para `.env`, credenciais e segredos (CRITICAL)
- [ ] `settings.json` contém `deny` rules para caminhos protegidos pelo framework (fronteira L1/L2)
- [ ] Nenhuma API key, token ou segredo hardcoded em `settings.json`
- [ ] `settings.local.json` está listado no `.gitignore` se contiver overrides específicos do usuário
- [ ] Os padrões de permissão (`allow`/`deny`) são intencionais e correspondem à postura de segurança do projeto
- [ ] Todas as `allow` rules têm deny rules correspondentes que elas sobrepõem (sem brechas abertas)

## 2. Qualidade do CLAUDE.md

- [ ] O CLAUDE.md existe em `.claude/CLAUDE.md` (CRITICAL)
- [ ] O CLAUDE.md tem menos de 500 linhas no total (recomendado menos de 200 para projetos com auto-memory)
- [ ] Todas as seções `AIOS-MANAGED-START` têm marcadores `AIOS-MANAGED-END` correspondentes (CRITICAL)
- [ ] Sem referências obsoletas de caminhos de arquivos (todos os caminhos mencionados existem no repositório)
- [ ] Sem instruções duplicadas entre o CLAUDE.md e os arquivos `.claude/rules/`
- [ ] Os exemplos de código no CLAUDE.md são sintaticamente válidos
- [ ] Sem comentários TODO ou FIXME deixados no conteúdo do CLAUDE.md

## 3. Validação de Rules

- [ ] Todos os arquivos `.claude/rules/*.md` têm frontmatter YAML válido (se com escopo por caminho)
- [ ] Os valores de `paths:` do frontmatter correspondem a diretórios ou padrões de arquivos existentes
- [ ] Nenhuma rule sempre carregada excede 200 linhas (disciplina de orçamento de contexto)
- [ ] As rules com escopo por caminho só carregam para os tipos de arquivo pretendidos
- [ ] Sem instruções conflitantes entre diferentes arquivos de rules
- [ ] Os nomes dos arquivos de rules seguem a convenção kebab-case
- [ ] Sem rules órfãs (rule referencia arquivos/padrões que não existem mais)

## 4. Segurança dos Hooks

- [ ] Todos os hooks registrados têm configuração explícita de timeout (CRITICAL)
- [ ] Nenhum hook contém loops infinitos ou recursão sem limite (CRITICAL)
- [ ] Os códigos de saída dos hooks seguem a convenção (0 = sucesso, diferente de zero = falha)
- [ ] Os hooks que modificam arquivos usam padrões de escrita atômica (temp + rename)
- [ ] Os hooks PreToolUse não bloqueiam operações de ferramentas essenciais
- [ ] Os hooks PostToolUse tratam erros de forma elegante (sem engolir silenciosamente)
- [ ] Os caminhos de arquivos de hooks no settings.json resolvem para scripts existentes

## 5. Configuração MCP

- [ ] Todos os servidores MCP configurados respondem a health checks (se habilitados)
- [ ] O orçamento de contexto MCP permanece dentro dos limites do projeto (verifique core-config.yaml)
- [ ] Sem entradas de servidor MCP duplicadas na configuração
- [ ] Os servidores MCP que exigem autenticação têm credenciais válidas configuradas
- [ ] MCPs baseados em Docker têm o container em execução e acessível

---

## Critérios de PASS/FAIL

**PASS:** Todos os itens marcados como (CRITICAL) estão marcados. Itens não críticos têm menos de 3 falhas, cada uma com justificativa documentada.

**FAIL:** Qualquer item marcado como (CRITICAL) está não marcado, OU mais de 3 itens não críticos falham sem justificativa.

**Ação em caso de FAIL:** Corrija todos os problemas críticos antes do push. Documente os problemas não críticos como dívida técnica se for adiá-los.
