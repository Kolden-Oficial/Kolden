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
| `criacao-de-squad` | Fase 5, quando arquiteto recomendou topologia SQUAD | Cria time com orquestrador + especialistas tier 1 |
| `consulta-ao-registro` | Fase 0 (antes de criar qualquer entidade) | REUSE > ADAPT > CREATE — evita duplicação |
| `registro-de-entidade` | Fase 8 (Entrega), após aprovação na Fase 6 e score ≥7.0 na Fase 7 | Registra entidade no registry + captura padrões aprendidos |
| `vigia-de-ecossistema` | `/vigia` ou Fase 2 (Pesquisa) | Varredura do estado da arte — MCPs, modelos, comunidade, GitHub |
| `verificacao-de-alinhamento` | SessionStart quando >24h desde última verificação | Detecta referências quebradas, ferramentas sem prompt, credenciais sem Infisical |
| `infisical-padrao` | sempre que precisar de qualquer credencial ou API key | Busca segredos via Infisical MCP/API; nunca em texto puro |
