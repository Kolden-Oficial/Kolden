# Checklist de Auditoria de Integração

**Checklist ID:** CCM-CL-005
**Referenced by:** project-integrator
**Purpose:** Auditar a qualidade de uma integração existente do Claude Code em um projeto. Produz uma nota com pontuação (A-F) para identificar lacunas e priorizar melhorias.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO - AUDITORIA DE INTEGRAÇÃO

Este checklist avalia quão bem o Claude Code está integrado a um projeto.
Use-o para auditar configurações existentes e identificar oportunidades de melhoria.

ABORDAGEM DE EXECUÇÃO:
1. Verifique cada item em relação ao estado real do projeto
2. Marque [x] para presente e correto, [ ] para ausente ou incorreto, [N/A] para não aplicável
3. Conte os itens marcados vs o total de itens aplicáveis
4. Calcule a pontuação e a nota
5. Priorize as lacunas por categoria (segurança primeiro, depois estrutura, depois otimização)

Esta auditoria é não destrutiva -- apenas lê e reporta.]]

---

## 1. Estrutura de Diretórios

- [ ] O diretório `.claude/` existe na raiz do projeto
- [ ] O `.claude/settings.json` está presente e é um JSON válido
- [ ] O diretório `.claude/rules/` existe com pelo menos um arquivo de rule
- [ ] O `.claude/CLAUDE.md` existe
- [ ] O diretório `.claude/agents/` existe (se o projeto usa agentes customizados)
- [ ] O diretório `.claude/skills/` existe (se o projeto usa skills customizadas)

## 2. Qualidade da Configuração

- [ ] Existem deny rules para `.env` e padrões comuns de arquivos de segredos (CRITICAL)
- [ ] Existem deny rules para `node_modules/`, `.git/objects` e diretórios binários grandes
- [ ] O modo de permissão está definido em um nível apropriado (não `auto` para repositórios não confiáveis)
- [ ] As allow rules têm escopo restrito (sem padrões abrangentes `*`)
- [ ] Os settings seguem o princípio do menor privilégio
- [ ] Os overrides locais (`settings.local.json`) estão no gitignore

## 3. Saúde do CLAUDE.md

- [ ] O CLAUDE.md existe e não está vazio (CRITICAL)
- [ ] O CLAUDE.md tem menos de 500 linhas (menos de 200 preferível)
- [ ] Sem referências obsoletas de caminhos de arquivos (todos os caminhos mencionados resolvem para arquivos existentes)
- [ ] As instruções são específicas deste projeto (não boilerplate genérico)
- [ ] As seções gerenciadas (se presentes) têm marcadores de início/fim correspondentes
- [ ] Sem instruções contraditórias dentro do documento
- [ ] Os exemplos de código são sintaticamente válidos e usam os patterns atuais do projeto

## 4. Cobertura de Hooks

- [ ] Existe pelo menos um hook de controle de danos (PreToolUse para comandos destrutivos)
- [ ] Os hooks foram testados (não apenas escritos e nunca validados)
- [ ] Os scripts de hooks tratam erros de forma elegante (sem exceções não tratadas)
- [ ] Os hooks têm timeouts explícitos para evitar bloqueios
- [ ] Os hooks PostToolUse não engolem erros silenciosamente

## 5. Integração MCP

- [ ] Os servidores MCP estão configurados em `.claude/mcp.json` ou equivalente (se MCP for usado)
- [ ] Os servidores configurados são acessíveis e autenticados
- [ ] O orçamento de contexto para ferramentas MCP está documentado ou dentro de limites razoáveis
- [ ] A prioridade de seleção de ferramentas MCP está documentada (ferramentas nativas preferidas)
- [ ] Sem servidores MCP redundantes (cada um serve a um propósito distinto)

## 6. Cobertura de Rules

- [ ] Existem rules baseadas em caminho para os principais diretórios de código-fonte (src/, lib/, tests/)
- [ ] Sem rules órfãs (rules que referenciam padrões de arquivos inexistentes)
- [ ] As rules usam o frontmatter `paths:` para carregamento com escopo por caminho (não sempre carregado)
- [ ] O conteúdo total de rules sempre carregadas permanece abaixo de 1000 linhas combinadas
- [ ] As rules não duplicam conteúdo já presente no CLAUDE.md
- [ ] A nomenclatura dos arquivos de rules segue a convenção kebab-case

## 7. Definições de Agentes

- [ ] Se `.claude/agents/` existir, cada arquivo de agente tem estrutura válida
- [ ] As definições de agentes incluem descrições claras de papel e escopo
- [ ] O acesso a ferramentas do agente está restrito ao que cada agente precisa
- [ ] As listas de comandos dos agentes referenciam arquivos de task válidos
- [ ] Sem instruções conflitantes entre as definições de agentes

---

## Pontuação

**Cálculo:** (Itens marcados) / (Total de itens - itens N/A) x 100

| Grade | Faixa de Pontuação | Interpretação |
|-------|------------|----------------|
| A | 90-100% | Integração excelente, pronta para produção |
| B | 80-89% | Boa integração, melhorias menores necessárias |
| C | 70-79% | Integração adequada, várias lacunas a resolver |
| D | 60-69% | Abaixo da média, lacunas significativas presentes |
| F | Abaixo de 60% | Integração ruim, retrabalho importante necessário |

## Ordem de Prioridade de Correção

1. **Itens CRITICAL** (deny rules de segurança, existência do CLAUDE.md) -- corrija imediatamente
2. **Cobertura de hooks** -- previne danos acidentais
3. **Cobertura de rules** -- melhora a precisão do agente
4. **Qualidade da configuração** -- otimiza o desempenho
5. **Definições de agentes** -- aprimora o workflow da equipe
