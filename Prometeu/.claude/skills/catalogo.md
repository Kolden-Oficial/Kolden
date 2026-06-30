# Catálogo de Habilidades — Prometeu

Índice das 22 habilidades próprias em `.claude/skills/` (framework de engenharia AIOX).
**NÃO** inclui o bundle vendorizado `.aiox-core/` nem as 12 personas de agente em
`.claude/skills/AIOX/agents/` (réplica vendorizada dos agentes do aiox-core — `aiox-master`,
`analyst`, `architect`, `data-engineer`, `dev`, `devops`, `pm`, `po`, `qa`, `sm`,
`squad-creator`, `ux-design-expert`).

| Habilidade | Gatilho de invocação | Propósito |
|---|---|---|
| `architect-first` | iniciar feature, refatorar, decisão arquitetural | Filosofia Architect-First: design/doc completos antes do código, acoplamento zero, validação multi-perspectiva |
| `clarificacao-de-ambiguidade` | spec recém-escrita, antes de planejar/implementar | Varre ambiguidade e lacunas de decisão (escopo/dados/NFR/edge cases) de forma estruturada |
| `checklist-de-requisitos` | spec parece pronta, quer gate de qualidade dos requisitos | GERADOR de checklist que valida a qualidade da spec (completude/clareza/consistência/mensurabilidade) |
| `fatiamento-mvp-por-historia` | decompor feature em user stories priorizadas | Fatias P1/P2/P3 independentemente testáveis (desenvolvível/deployável/demonstrável); eixo SPIDR |
| `analise-cross-artefato` | após `tasks.md` e antes de implementar | Análise read-only de consistência spec×plan×tasks×constituição; rastreabilidade requisito→task + severidade |
| `ciclo-de-fase-goal-backward` | executar feature/fase de ponta a ponta com rigor | Ciclo plan→execute→verify→validate, TDD test-first, gate de evidência (existência ≠ implementação) |
| `spec-build-review` | levar ideia informal até código revisado | Orquestra Spec→Build→Review (spec-pipeline/development-cycle/qa-loop) com 2 gates humanos; não dá push |
| `padroes-de-engenharia-idiomatica` | escrever/revisar código de implementação | Código idiomático na linguagem/framework, commits convencionais, refatoração sem gold-plating |
| `engenharia-de-dados` | schema, migrations, pipeline de dados, qualidade de dado | Forma idiomática do dado (Postgres/MySQL/Redis/Prisma): DDL, índice, normalização, idempotência |
| `devops-e-entrega-continua` | projetar CI/CD, IaC, observabilidade, destravar build | Conhecimento de entrega contínua (Docker/K8s/deploy/logs/métricas); informa, não autoriza push (@devops) |
| `qa-e-quality-gates` | estratégia de teste, gates avançados antes de Done | Arsenal de teste (unit/integração/e2e), verificação adversarial, regressão/canary/auditoria de produção |
| `checklist-runner` | validar trabalho contra um checklist `.md` | Motor genérico de execução de checklist (YOLO/interativo) com veredicto pass/fail/partial |
| `coderabbit-review` | revisão automatizada antes de commit/PR/QA gate | CodeRabbit CLI via WSL com loop de auto-fix e filtragem por severidade |
| `mcp-builder` | construir servidor MCP para integrar API/serviço externo | Servidores MCP de alta qualidade em Python (FastMCP) ou Node/TS (MCP SDK) |
| `skill-creator` | criar/atualizar uma skill | Guia de criação de skills eficazes (frontmatter, descrição que dispara invocação, corpo enxuto) |
| `synapse` | entender/gerenciar o motor de contexto SYNAPSE | Domains, regras de contexto, star-commands, brackets, pipeline de 8 layers de injeção |
| `tech-search` | pesquisa técnica aprofundada autocontida | WebSearch+WebFetch+workers Haiku: query→decompose→parallel→evaluate→synthesize; salva em `docs/research/` |
| `micro-sprints-e-decomposicao-de-task` | story com alto risco de descoberta tardia (API externa, debate técnico, spike) | Ciclo de 1-3 dias acoplado à Fase 3 do Story Development Cycle (dev-develop-story). Decomposição em 5 dimensões (escopo/bloqueios/tamanho/confiança/dono), max 8h/task. Dono: sm-river + dev-dex |
| `prfaq-amazon-style` | spec pipeline Fase 4 (Write Spec) / decisão de iniciar projeto de escala / alinhamento de stakeholders | Press Release + FAQ externo + FAQ interno (assunções honestas) estilo Amazon Working Backwards. Linguagem do cliente. 1 página max. Dono: pm-morgan |
| `moscow-kano-mcda` | priorizar backlog/escopo de release (não validação) | MoSCoW classifica (Must/Should/Could/Won't); Kano categoriza (Basic/Performance/Delighter); MCDA pondera em empates. Cross-link bidirecional com Aletheia/priorizacao-rice. Dono: po-pax |
| `matriz-valor-esforco-quick-wins` | MoSCoW empata Should/Could / roadmap em 4 quadrantes para stakeholders | Valor × Esforço (4 quadrantes: Quick Wins / Major Projects / Fill-ins / Time Wasters). Max 30% sprint em Quick Wins. Dono: po-pax |
| `matriz-de-risco-e-contingencia` | mapear riscos de story/sprint/projeto antes de iniciar | Matriz 5x5 (Probabilidade × Impacto); mitigação E contingência (ambos); triggers observáveis e donos. Para risco de runtime SLO use slo-error-budget-burn-rate (B03). Dono: po-pax + sm-river |

## Procedência das 5 skills novas (B04)

Absorvidas em 2026-06-29 do upstream `msitarzewski/agency-agents@a597cb6` divisão `product/` (MIT). Bucket B04 do Ritual de Absorção do Caos. Detalhe em `C:\Kolden\Prometeu\_origem.md`.

**Anexos REUSE em MEMORY.md (sem skill nova):**
- `pm/MEMORY.md` — G10 (outcome-driven + discovery-to-launch ownership) + G13 (PRD embute problem statement + scope IN/OUT)
- `po/MEMORY.md` — G14 (priorização ancorada em rolling average de velocity)
- `sm/MEMORY.md` — G14 + G17 (capacity planning com buffer 20-30% + alerta de outlier + trend analysis)

**Pendência (F6 do B03):** anexo em `estrategias-de-deploy-zero-downtime` (G12 cohort/A-B testing) será aplicado quando essa skill for criada no B03.
