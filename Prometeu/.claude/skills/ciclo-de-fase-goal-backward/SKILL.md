---
name: ciclo-de-fase-goal-backward
description: Use ao executar uma feature/fase de ponta a ponta com rigor — quando precisar de um ciclo plan → execute → verify → validate com portões humanos, planos bite-sized sem placeholders, commit atômico por tarefa, TDD test-first e verificação adversarial que não confia em relatório (existência ≠ implementação; sem evidência fresca, sem alegação de conclusão). Complementa o `spec-build-review` impondo a disciplina goal-backward e o gate de evidência.
---

# Ciclo de Fase Goal-Backward

Metodologia de execução de uma fase com **verificação de trás para frente** (goal-backward):
parte-se do objetivo e dos critérios de sucesso e verifica-se que cada artefato realmente
os satisfaz — não que um arquivo existe. Une quatro disciplinas que o Prometeu ainda não
formalizava junto: ciclo de fase com **portões**, **planos executáveis sem placeholders**,
**TDD test-first** e o **gate de evidência antes de qualquer alegação de conclusão**.

Não substitui o `spec-build-review` (que orquestra os pipelines aiox) nem a **Dike** (que
reconcilia entrega contra o Contrato de Missão). Aqui é a **verificação técnica de fase** —
complementar à verificação de contrato.

## O ciclo (4 etapas, cada uma com seu portão)

```
PLAN ──▶ EXECUTE ──▶ VERIFY ──▶ VALIDATE
  │         │           │           │
 gate     gate        gate        gate
pre-flight revisão   abort/escal.  humano
```

### 1. PLAN — plano bite-sized, sem placeholders
Escreva o plano assumindo um engenheiro **sem contexto** do código e com gosto duvidoso:
caminhos de arquivo exatos, código completo, comandos com saída esperada. **DRY, YAGNI, TDD,
commits frequentes.**

- **Mapa de arquivos primeiro** — cada arquivo com uma responsabilidade clara; arquivos que mudam juntos vivem juntos; divida por responsabilidade, não por camada técnica.
- **Tarefa = a menor unidade que carrega seu próprio ciclo de teste e merece o portão de um revisor fresco.** Cada tarefa termina num entregável testável independentemente.
- **Passo = uma ação de 2-5 min**: "escrever o teste que falha" → "rodar e ver falhar" → "código mínimo" → "rodar e ver passar" → "commit".
- **Bloco de interfaces por tarefa**: `Consome` (assinaturas exatas de tarefas anteriores) e `Produz` (nomes/tipos exatos que tarefas seguintes usam — o implementador só vê a própria tarefa).
- **Restrições globais**: copie verbatim da spec (versão mínima, limites de dependência, regras de naming). Toda tarefa as herda.

🚫 **Falhas de plano (nunca escreva):** "TBD", "TODO", "implementar depois", "adicionar tratamento de erro apropriado", "escrever testes para o acima" (sem o código do teste), "similar à Tarefa N" (repita o código), referências a tipos/funções não definidos em nenhuma tarefa.

**Autorrevisão do plano** (você mesmo, não subagente): (1) cobertura — cada requisito da spec aponta para uma tarefa? (2) varredura de placeholder; (3) consistência de tipos entre tarefas (`clearLayers()` na Tarefa 3 vs. `clearFullLayers()` na Tarefa 7 = bug).

### 2. EXECUTE — TDD + commit atômico
Execute tarefa a tarefa respeitando dependências. Para cada tarefa, o ciclo **RED-GREEN-REFACTOR**:

> **Lei de Ferro do TDD:** NENHUM código de produção sem um teste que falhou antes. Escreveu código antes do teste? Delete e recomece — não guarde "como referência".

- **RED** — um teste mínimo de **um** comportamento, nome claro, código real (mocks só se inevitável).
- **Verifique o RED** — rode e veja **falhar pela razão certa** (feature ausente, não typo). Passou de imediato? Está testando comportamento existente — conserte o teste.
- **GREEN** — o código mínimo para passar. Sem over-engineering (YAGNI).
- **Verifique o GREEN** — rode; o teste passa, os outros continuam verdes, saída limpa.
- **REFACTOR** — só depois do verde; remova duplicação, melhore nomes, mantenha verde.
- **Commit atômico por tarefa**; ao final, registre o que foi feito (SUMMARY) e o estado. **Não confie no SUMMARY como prova** — ele alimenta a verificação, não a substitui.

Detalhe das racionalizações de TDD a derrubar: ver `references/leis-de-ferro.md`.

### 3. VERIFY — adversarial, goal-backward
Postura **adversarial**: o verificador não confia no relatório de execução. Para cada
entregável (must-have), suba pelos 4 níveis:

1. **Existe** — arquivo presente no caminho esperado.
2. **Substantivo** — conteúdo é implementação real, não placeholder/stub.
3. **Conectado (wired)** — ligado ao resto do sistema (é onde os stubs se escondem).
4. **Funcional** — funciona de fato quando invocado.

Níveis 1-3 são checáveis programaticamente; o nível 4 muitas vezes exige humano. Classifique
achados como **BLOCKER** (entregável crítico ausente/stub) ou **WARNING**. Padrões concretos
de detecção de stub e de verificação de wiring (Component→API, API→DB, Form→Handler,
State→Render) por tipo de artefato: ver `references/padroes-de-verificacao.md`.

> **Lei de Ferro da Verificação:** NENHUMA alegação de conclusão sem evidência fresca. Se você não rodou o comando de verificação **nesta** mensagem, não pode dizer que passa. "Deveria funcionar", "tenho confiança", "o agente disse sucesso" não são evidência — rode, leia a saída, confira o exit code, **depois** alegue.

### 4. VALIDATE — portão humano
O que não dá para verificar por máquina (aparência visual, fluxo completo, comportamento
em tempo real, integração com serviço externo, clareza de mensagem de erro) vira **pedido
de verificação humana** com formato Teste / Esperado / Conferir. Só então a fase fecha.

## Taxonomia de portões (todo checkpoint mapeia para um destes)
- **Pre-flight** — valida pré-condições na entrada; bloqueia sem criar trabalho parcial. (Ex.: PLAN.md existe antes de executar.)
- **Revisão** — avalia qualidade do output e devolve ao produtor com feedback específico; **sempre** com teto de iterações (ex.: máx. 3) e detecção de estagnação (se a contagem de issues não cai entre iterações, escala antes).
- **Escalação** — surge issue insolúvel ao humano: pausa, apresenta opções, espera decisão.
- **Abort** — continuar causaria dano/desperdício (contexto criticamente baixo, estado em erro, entregável crítico ausente): para, preserva estado, reporta a razão.

Heurística: comece em pre-flight; se o check ocorre **após** o trabalho produzido, é revisão; se a revisão não resolve, escale; se continuar é perigoso, aborte.

## Modos de profundidade (calibre o esforço de planejamento)
- **spec** — planejamento padrão completo. · **ultraplan** — máxima profundidade para fases de alto risco. · **mvp** — fatia mínima viável (casa com a habilidade `fatiamento-mvp-por-historia`).

---
*Fontes (fundidas): gsd-build/get-shit-done@bdcaab2c (`references/verification-patterns.md`, `gates.md`, `spidr/mvp`, ciclo `plan/execute/verify/validate-phase`) + obra/superpowers@896224c4 (`writing-plans`, `executing-plans`, `test-driven-development`, `verification-before-completion`). Ambas licença MIT (Lex Christopherson; Jesse Vincent). Princípios extraídos e reescritos em PT-BR; sem cópia literal. Complementa `spec-build-review` e a verificação de contrato da Dike.*
