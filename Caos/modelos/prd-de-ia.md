---
# ─── Campos canônicos do Art. X (Constituição v2.5.0) — OBRIGATÓRIOS ───
constitution: <path para <Agent>/constitution.md>       # G1 — 5-15 princípios veto-operacionais (Bai et al. 2022 arXiv 2212.08073)
ASL: <1|2|3|4+>                                          # G2 — Amodei/Anthropic 2023 RSP
aspiration_criteria:                                     # G3 — Simon 1955 QJE 69
  - criterio: "<meta 1>"
    limite: "<número + unidade>"
    fonte_evidencia: "<KPI da §2>"
  - criterio: "<meta 2>"
    limite: "<...>"
    fonte_evidencia: "<...>"
  # 3-5 metas mensuráveis; ausência = BLOCK Fase 4→5
uncertainty_statement: |                                 # G3 — Russell 2019 Human Compatible
  <1-3 parágrafos: espaço latente de intenção que este agente encontrará em uso real
   e como se comporta diante dele — pergunta antes de assumir; oferece 2-3 leituras;
   aceita interrupção mid-task; nunca inventa intenção plausível.>
predictions_scorecard: <true|false|null>                 # G8 — Brooks 2018-2026
  # true → agente publica em Caos/registros/predictions-scorecard-<agente>.md (schema em Sub-onda 1.4)
  # false → decisão registrada (agente não faz previsões datáveis)
  # null → decidir na Rodada Alma (Fase 1)

# ─── Metadados administrativos (herdados) ───
versao: 1.0
data: AAAA-MM-DD
autor: "<usuário> + Caos"
status: <rascunho|aprovado|em-producao>
escopo: <interno|cliente>
cliente: "<conta/cliente — se escopo=cliente>"
nome_mitologico: "<nome escolhido na Rodada 0>"
pronuncia: "<pronúncia em pt-BR>"
loop_pattern: ReAct                                      # P10 — Yao et al. 2022 arXiv 2210.03629 (override só com justificativa arquitetural documentada)
---

# PRD de IA — <Nome do Agente>

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data | AAAA-MM-DD |
| Autor | <usuário> + Caos |
| Status | rascunho / aprovado / em produção |
| Escopo | interno / cliente — <se cliente: conta/cliente> |
| Nome mitológico | <nome escolhido na Rodada 0> |
| Pronúncia | <pronúncia em pt-BR> |
| ASL | <1\|2\|3\|4+> — <resumo em 1 linha do impacto> |
| Constituição | <path> — <resumo em 1 linha do 1º princípio> |
| Loop pattern | ReAct (padrão) — <override se aplicável> |

## 1. Missão
Uma frase: qual problema este agente resolve e para quem.

## 2. Resultados de sucesso (KPIs) — cross-ref `aspiration_criteria` do frontmatter
Mínimo 3 indicadores mensuráveis, sendo **pelo menos 1 anti-falha** (um indicador
que mede a ausência do pior caso). Ex.: "reduz tempo de análise de 2h para 15min",
"zero alterações de orçamento sem aprovação humana", "0 respostas a cliente sem fonte citada".

**Regra v2.5 (Art. X G3):** cada KPI aqui deve ter um `aspiration_criteria` correspondente no frontmatter YAML com `criterio` + `limite` + `fonte_evidencia`. O frontmatter é a versão machine-readable; esta seção é a versão humana. `revisor` compara: KPI sem `aspiration_criteria` correspondente = BLOCK.

## 3. Persona
- Nome mitológico: <nome> — Justificativa: <por que este nome ecoa a missão do agente>
- Tom de voz:
- Soft skills (em comportamento observável):
- Nível de autonomia:
- Reação a erro e a pedidos fora do escopo:
- **Loop de operação:** ReAct (Thought → Action → Observation — Yao et al. 2022). Override só com justificativa arquitetural documentada abaixo: <justificativa se override>
- **Incerteza declarada:** ver `uncertainty_statement` no frontmatter. Materializa: quando input é ambíguo, o agente pergunta antes de agir; oferece 2-3 leituras; aceita interrupção mid-task. Fonte: Russell 2019.

## 4. Hard skills
- Conhecimentos de domínio:
- Tarefas que executa (verbos):
- Fora de escopo (o que NÃO faz):
- **Metodologias / frameworks herdados** (especialistas históricos da área e suas obras/métodos —
  base da herança de inteligência; fonte em `referencias/biblioteca/` ou web score ≥ 7):

## 5. Ferramentas e integrações
| Ferramenta | Função no agente | Acesso (API/MCP/CLI) | **MCP-nativo? (v2.5)** | **`grounding_required`? (v2.5)** | Credencial |
|---|---|---|---|---|---|
| | | | <sim (MCP-nativo) / adapter (MCP wrapping API existente) / não (justificar em §5.3)> | <true se retorna fato datável / false / n/a> | Infisical: <caminho> |

### 5.3 Declaration MCP-nativo vs adapter vs wrapper (Art. IV v2.5.0)
Para **cada** ferramenta acima, declare:
- **MCP-nativo** — a tool foi construída como MCP server puro (`criacao-de-mcp` na Fase 5.4).
- **Adapter (MCP wrapping API existente)** — tool é adapter thin de API pré-existente, exposta como MCP server. Aceitável.
- **Wrapper proprietário** — cliente HTTP customizado com formato non-MCP. **PROIBIDO a partir de v2.5.0.** Se já existir, entra em plano de **dupla-vida de 90 dias**: adapter mantém interface enquanto MCP-nativo é ligado; após 90 dias = BLOCK em Fase 6.

**Declaração de dupla-vida (se aplicável):**
| Wrapper existente | MCP-nativo em construção | Data limite dupla-vida | Owner da migração |
|---|---|---|---|
| <nome> | <nome MCP planejado> | AAAA-MM-DD (+90d) | <agente/humano> |

Fonte: Anthropic 25/nov/2024 "Introducing the Model Context Protocol" (modelcontextprotocol.io); Constituição Art. IV refactored (v2.5.0).

## 6. Memória
- O que persiste entre sessões:
- Onde vive (contexto / Supabase / Neon):
- Quem lê e quem escreve:

## 7. Entradas e saídas
- Gatilhos de acionamento:
- Formatos de entrega:
- Templates obrigatórios:

## 8. Guardrails
- Proibições absolutas (cada uma vira um hook):
- Limites de custo/uso:
- Critérios de escalação para humano:

**Se escopo = cliente (preencher; senão "n/a"):**
- LGPD / PII: que dados pessoais trafegam, base de consentimento, o que nunca vai a log/memória.
- Retenção e expurgo: prazo de guarda e como apaga.
- Isolamento: dados do cliente segregados de outros clientes e do interno da Kolden.
- Handoff: responsável humano pela conta + SLA + protocolo de entrega.
- Fronteira: nunca expor interno da Kolden; recusa cita política.
- Segredos: credenciais em `/kolden/cliente-<x>/` (Infisical), nunca misturadas com as internas.
- Aprovação de produção: dono da conta do cliente (além do Ronan).

## 9. Jornada
- Cenário feliz (passo a passo):
- Pior cenário e comportamento esperado:
- Casos de borda:

## 10. Modos de falha / pré-morte
Levantados no Bloco 9 do diagnóstico. Cada linha é rastreada de ponta a ponta:
a arquitetura (§11) define a mitigação, o revisor confirma que existe e o testador
cria um teste adversarial para ela. Liste todos os modos de falha relevantes.

| Modo de falha | Gatilho | Raio de impacto | Detecção | Mitigação / recuperação |
|---|---|---|---|---|
| <o que dá errado> | <o que dispara> | <quem/o que é afetado e quão grave> | <como se percebe> | <hook, fallback, escalação, rollback> |

## 11. Arquitetura (preenchido pelo blueprint)
- Camada 1 — memória:
- Camada 2 — skills:
- Camada 3 — hooks:
- Camada 4 — subagents:
- Camada 5 — distribuição:
- Mitigação por modo de falha (§10): <modo → componente que o mitiga>
- **Referência histórica herdada (por camada — Fase 5.6):**
  | Camada/entidade | Especialista ou metodologia | Frameworks herdados | Fonte (local/web + score) |
  |---|---|---|---|
  | orquestrador | | | |
  | especialista <id> | | | |
  | habilidade <nome> | | | |

### 11.5 Plano de introspecção (Art. X G5 — WARN)
Que sinal permite ao Ronan entender **por que o agente fez X**? Preencha por camada:

| Camada | Sinal de introspecção | Onde persiste | Cadência de revisão |
|---|---|---|---|
| orquestrador | <trace ReAct + log de roteamento> | `registros/traces/`, `registros/roteamentos/` | <ex.: semanal> |
| especialista <id> | <trace ReAct + decomposição de tool call> | `registros/traces/`, `registros/decomposicoes/` | |
| habilidade <nome> | <log de invocação + args resumidos> | `registros/traces/` | |

**Fonte:** Amodei-Olah-Steinhardt-Christiano-Schulman-Mané 2016 "Concrete Problems in AI Safety" (arXiv 1606.06565) § Interpretability + linhagem Anthropic Circuits (Olah 2020-).
**Severidade:** WARN se ausente; BLOCK se ASL ≥ 3 (herda Art. X G4 + G5).

### 11.6 Tabela auditoria capacidades × risco (Art. X G6 — WARN)
Cada capacidade do agente listada com seu vetor de risco separado. Aumento de capacidade sem re-review de safety = WARN em Fase 6.

| Capacidade | Vetor de risco (ASL contribui?) | Instrumental convergence? (pode acumular recurso além do necessário?) | Mitigação |
|---|---|---|---|
| <ex.: `escrever_em_supabase`> | <sim: mutation ASL-3> | <não: quota configurada> | <hook + rate limit> |
| <ex.: `publicar_no_ghl`> | <sim: efeito externo ASL-3> | <sim, cuidado: pode gerar volume sem gate> | <interrupt-before-mutation + revisão humana em batch >10> |

**Fonte:** Bostrom 2012 "The Superintelligent Will" (Minds and Machines 22) + Bostrom 2014 *Superintelligence* cap. 7 "The Cognitive Superpowers".
**Severidade:** WARN se ausente; obrigatoriedade de re-review a cada acréscimo de capacidade.

## 12. Histórico de versões
| Versão | Data | Mudança |
|---|---|---|
| 1.0 | | Criação |
