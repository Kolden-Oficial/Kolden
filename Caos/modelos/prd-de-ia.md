# PRD de IA — <Nome do Agente>

| Campo | Valor |
|---|---|
| Versão | 1.0 |
| Data | AAAA-MM-DD |
| Autor | <usuário> + Caos |
| Status | rascunho / aprovado / em produção |
| Nome mitológico | <nome escolhido na Rodada 0> |
| Pronúncia | <pronúncia em pt-BR> |

## 1. Missão
Uma frase: qual problema este agente resolve e para quem.

## 2. Resultados de sucesso (KPIs)
Mínimo 3 indicadores mensuráveis, sendo **pelo menos 1 anti-falha** (um indicador
que mede a ausência do pior caso). Ex.: "reduz tempo de análise de 2h para 15min",
"zero alterações de orçamento sem aprovação humana", "0 respostas a cliente sem fonte citada".

## 3. Persona
- Nome mitológico: <nome> — Justificativa: <por que este nome ecoa a missão do agente>
- Tom de voz:
- Soft skills (em comportamento observável):
- Nível de autonomia:
- Reação a erro e a pedidos fora do escopo:

## 4. Hard skills
- Conhecimentos de domínio:
- Tarefas que executa (verbos):
- Fora de escopo (o que NÃO faz):

## 5. Ferramentas e integrações
| Ferramenta | Função no agente | Acesso (API/MCP/CLI) | Credencial |
|---|---|---|---|
| | | | Infisical: <caminho> |

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

## 12. Histórico de versões
| Versão | Data | Mudança |
|---|---|---|
| 1.0 | | Criação |
