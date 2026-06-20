# Checklist de Avaliação de Impacto de Mudanças

**Checklist ID:** CCM-CL-002
**Referenced by:** config-engineer, roadmap-sentinel
**Purpose:** Avaliar sistematicamente o impacto das modificações de configuração do Claude Code antes de aplicá-las. Garante compatibilidade retroativa, integridade de segurança e disciplina de orçamento de contexto.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - AVALIAÇÃO DE IMPACTO DE MUDANÇAS

Este checklist é usado ANTES de aplicar mudanças de configuração nos artefatos
do Claude Code (diretório .claude/, settings, rules, hooks, configuração MCP).

ABORDAGEM DE EXECUÇÃO:
1. Identifique todos os arquivos que serão alterados
2. Para cada categoria, avalie o impacto e documente as constatações
3. Impactos de segurança devem ser explicitamente avaliados -- nunca pule
4. Um plano de rollback é obrigatório para qualquer mudança que toque deny rules ou hooks
5. Apresente a avaliação concluída ao usuário para aprovação

Mudanças na configuração do Claude Code afetam TODOS os agentes e sessões.
Trate mudanças de configuração com o mesmo rigor de deploys em produção.]]

---

## 1. Avaliação de Escopo

- [ ] Liste todos os arquivos de settings afetados por esta mudança (settings.json, settings.local.json, CLAUDE.md, rules/)
- [ ] Identifique quais agentes são impactados (verifique as definições de agentes em busca de dependências dos arquivos alterados)
- [ ] Determine se a mudança afeta apenas o projeto atual ou todos os projetos (escopo global vs local)
- [ ] Verifique se a mudança não toca em caminhos protegidos pelo framework (fronteira L1/L2)
- [ ] Documente a motivação da mudança (correção de bug, otimização, nova capacidade, endurecimento de segurança)

## 2. Compatibilidade Retroativa

- [ ] Os fluxos de ativação de agentes existentes continuam funcionando após a mudança
- [ ] Sem regressões de permissão (agentes que antes podiam acessar arquivos ainda conseguem)
- [ ] Comandos customizados definidos em arquivos de agentes ainda resolvem para caminhos de task válidos
- [ ] Workflows que referenciam rules ou settings alterados ainda executam corretamente
- [ ] Integrações de hooks (PreToolUse, PostToolUse) permanecem funcionais
- [ ] Ao remover uma rule ou setting, confirme que nenhum agente ou workflow depende dela

## 3. Impacto de Segurança

- [ ] Deny rules não são enfraquecidas ou removidas sem justificativa de segurança explícita (CRITICAL)
- [ ] Nenhum novo padrão de arquivo sensível é exposto por adições de allow rules (CRITICAL)
- [ ] Mudanças no modo de permissão são intencionais (transições explore/ask/auto documentadas)
- [ ] Padrões de arquivos de segredos (.env, credentials.json, *.key, *.pem) permanecem nas deny rules
- [ ] O acesso ao servidor MCP não é ampliado além do escopo pretendido
- [ ] Os scripts de hooks não introduzem novo acesso de escrita no sistema de arquivos a áreas protegidas

## 4. Impacto de Contexto

- [ ] Calcule o delta de contagem de linhas do CLAUDE.md (antes vs depois da mudança)
- [ ] Conte o delta de arquivos de rules (adicionados, removidos, modificados)
- [ ] Avalie o delta de orçamento de contexto MCP (novos servidores adicionam overhead de contexto)
- [ ] Verifique se o contexto total sempre carregado permanece dentro do orçamento de desempenho
- [ ] Ao adicionar novo conteúdo sempre carregado, identifique o que pode ser movido para rules com escopo por caminho
- [ ] Nenhuma duplicação desnecessária introduzida entre CLAUDE.md, rules e definições de agentes

## 5. Plano de Rollback

- [ ] As mudanças podem ser revertidas com um único git checkout ou passos manuais documentados
- [ ] Existe um backup da configuração atual antes de aplicar as mudanças (CRITICAL)
- [ ] O procedimento de rollback está documentado nas notas da mudança
- [ ] Se a mudança envolver modificações de hooks, a versão anterior do hook é preservada
- [ ] Mudanças em banco de dados ou estado persistente (se houver) têm um caminho de reversão

---

## Critérios de PASS/FAIL

**PASS:** Todos os impactos avaliados e mitigados. A seção de Segurança tem zero itens não marcados. Existe um plano de rollback.

**FAIL:** Qualquer item em Impacto de Segurança está não marcado sem justificativa, OU nenhum plano de rollback documentado, OU avaliação de escopo incompleta.

**Ação em caso de FAIL:** Resolva todas as lacunas de segurança e documente o plano de rollback antes de prosseguir. Escale para o config-engineer se houver incerteza sobre as implicações de segurança.
