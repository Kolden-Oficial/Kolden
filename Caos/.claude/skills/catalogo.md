# Catálogo de Habilidades — Caos

Índice de todas as habilidades disponíveis nesta sessão. Atualizar sempre que uma
nova habilidade for criada ou removida.

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `diagnostico-de-agente` | usuário pede para criar um agente | Conduz 7 rodadas por faculdade ("O Ser"), detecta domínio, propõe nome mitológico |
| `busca-de-referencias` | Fase 2 (Pesquisa), ou pedido de benchmarking | Busca GitHub + Exa + Hugging Face com scorecard ≥7/10; adapta trechos para o Kolden |
| `geracao-de-prd` | diagnóstico 7/7 completo | Gera o PRD formal para aprovação do usuário antes da construção |
| `criacao-de-skill` | Fase 5 (Construção), para cada habilidade identificada no PRD | Cria habilidades modulares em `<agente>/.claude/skills/` |
| `criacao-de-subagent` | Fase 5 (Construção), para especialistas identificados no PRD | Cria especialistas em `<agente>/.claude/agents/` |
| `criacao-de-hooks` | Fase 5 (Construção), para guardrails que precisam de determinismo | Cria reflexos em `<agente>/.claude/reflexos/` |
| `criacao-de-mcp` | Fase 5.4, quando o PRD pede um MCP/API PRÓPRIO a construir | Wrapper do mcp-builder do Prometeu + camada Kolden (Infisical, registro `tipo: mcp`, pt-BR, checklist N4) |
| `criacao-de-squad` | Fase 5, quando arquiteto recomendou topologia SQUAD | Cria time com orquestrador + especialistas tier 1 |
| `heranca-de-especialista` | Fase 5.6, por camada (orquestrador, cada especialista, cada habilidade) | Mapeia especialistas humanos históricos e gera o bloco biography + core_frameworks (herança de inteligência) |
| `consulta-ao-registro` | Fase 0 (antes de criar qualquer entidade) | REUSE > ADAPT > CREATE — evita duplicação |
| `registro-de-entidade` | Fase 8 (Entrega), após aprovação na Fase 6 e score ≥7.0 na Fase 7 | Registra entidade no registry + captura padrões aprendidos |
| `vigia-de-ecossistema` | `/vigia` ou Fase 2 (Pesquisa) | Varredura do estado da arte — MCPs, modelos, comunidade, GitHub |
| `verificacao-de-alinhamento` | SessionStart quando >24h desde última verificação | Detecta referências quebradas, ferramentas sem prompt, credenciais sem Infisical |
| `infisical-padrao` | sempre que precisar de qualquer credencial ou API key | Busca segredos via Infisical MCP/API; nunca em texto puro |
| `ingestao-de-repositorio` | `/absorver <url>` — Ronan manda um repo do GitHub | Maestro da absorção: 8 fases (F0 histórico → F7 registro) com gates; quarentena, segurança, compreensão, mapeamento, aprimoramento |
| `verificacao-de-seguranca-de-repo` | Fase 2 da absorção, sobre um repo em quarentena | Análise estática (segredos/CVE/padrões/supply-chain) reusando Egide + tasks do Prometeu; veredito SAFE/QUARENTENA/REJEITAR |
| `auditoria-de-squad` | Fase 5 da absorção (benchmark = repo) ou conformação de squad antigo (benchmark = padrão-ouro) | Máquina de diff arquivo-por-arquivo; gera plano de aprimoramento; para para aprovação |
