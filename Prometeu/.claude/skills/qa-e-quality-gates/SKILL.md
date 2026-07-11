---
name: qa-e-quality-gates
description: Use ao desenhar a estratégia de teste de uma feature, escolher onde investir esforço de teste (unitário vs integração vs e2e), montar um loop de verificação adversarial, ou definir gates de qualidade avançados (regressão, canary, auditoria de produção) antes de marcar uma story como Done. Acione no @qa quando o QA gate inicial passou mas você quer profundidade, ou quando uma decisão técnica importante precisa de convergência por múltiplas vozes. Fornece o ARSENAL de teste/verificação; quem EXECUTA o checklist é `checklist-runner`.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# QA & Quality Gates Avançados

Disciplina de **prova de que funciona — e continua funcionando**: pirâmide de testes
com esforço no lugar certo, loops de verificação que convergem em vez de divergir, e
gates que pegam regressão antes do usuário. Complementa o ciclo QA do AIOX
(`spec-build-review`, `qa-gate`) e o executor `checklist-runner` com as *técnicas* de
teste e verificação adversarial.

## 1. Onde investir o teste (pirâmide, não ampulheta)
- **Base larga de unitários:** rápidos, determinísticos, isolam lógica. A maioria dos
  casos de borda vive aqui — barato testar, barato manter.
- **Meio de integração:** contratos entre módulos, queries reais contra banco de teste,
  serialização. Pega o que o unitário com mock esconde.
- **Topo fino de e2e:** só os fluxos críticos de ponta a ponta (o caminho do dinheiro).
  e2e é caro e frágil — poucos, estáveis, sobre o que importa de verdade.
- **Anti-padrão (ampulheta):** muitos e2e, poucos unitários → suíte lenta, flaky e cara.
  Se você está testando lógica via e2e, empurre o teste para baixo na pirâmide.

## 2. TDD como design, não cerimônia
- **Red → Green → Refactor:** escreva o teste que falha, faça passar do jeito mais simples,
  então limpe com a rede de segurança verde. O teste primeiro **molda a interface** —
  código difícil de testar é sinal de design acoplado, conserte o design.
- **Teste comportamento, não implementação:** asserções sobre o contrato observável, não
  sobre detalhes internos — senão todo refactor quebra testes que deveriam continuar verdes.
- **Um motivo de falha por teste:** quando quebra, o nome do teste já diz o quê e onde.

## 3. Loop de verificação adversarial (convergência)
Para decisão técnica de peso ou saída que precisa ser **robusta**, não confie numa só passada:
- **Council (múltiplas vozes):** instancie perspectivas distintas (ex.: correção,
  segurança, simplicidade, performance) sobre o mesmo artefato; a tensão entre elas expõe
  o que uma só voz perde. Sintetize o consenso e nomeie os trade-offs em disputa.
- **Método dois-agentes com convergência:** um produz, outro critica adversarialmente,
  itera até estabilizar (sem novas objeções materiais) ou bater o teto de iterações.
  Convergência é o critério de parada — não "uma rodada e pronto", nem loop infinito.
- **Verification loop:** cada correção re-roda a verificação inteira; uma correção que
  reabre outro problema não fechou nada. Pare em verde estável, com teto de iterações
  para escalar em vez de girar.

## 4. Gates avançados (além do unitário)
- **Teste de regressão:** todo bug corrigido vira um teste que falharia antes do fix —
  o bug nunca volta sem alguém ver vermelho. Mantenha a suíte de regressão crescendo.
- **Canary watch:** ao soltar em produção, observe métricas-chave da fração canário
  (erro, latência, saturação) contra a baseline antes de promover 100% — rollback rápido
  se desviar.
- **Auditoria de produção:** verificação periódica do que está rodando de verdade
  (config drift, dependência vulnerável, recurso esquecido) — o que passou no CI ainda
  pode apodrecer em prod.
- **Cobertura como sinal, não meta:** persiga caminhos não testados de valor, não o número.
  100% de cobertura com asserções fracas é teatro; 70% sobre o fluxo crítico com asserções
  fortes vale mais.

## Veredicto do gate (alinhe ao AIOX)
`PASS` (segue) · `CONCERNS` (segue com ressalva registrada) · `FAIL` (volta ao `@dev` com
feedback específico) · `WAIVED` (dispensado com justificativa explícita e dono). Nunca
"FAIL silencioso": toda reprovação aponta o item e o caminho de correção.

## Gate de saída
- Esforço de teste distribuído como pirâmide (base unitária larga, topo e2e fino).
- Bug corrigido tem teste de regressão correspondente.
- Decisão crítica passou por verificação adversarial com critério de convergência.
- Veredicto do gate explícito e acionável; nenhuma falha engolida.

## Quando NÃO usar
- Executar um checklist `.md` já escrito → `checklist-runner` (executor).
- Validar a qualidade dos *requisitos* da spec (não do código) → `checklist-de-requisitos`.
- Rodar a revisão automatizada do CodeRabbit → `coderabbit-review`.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (`skills/{tdd-workflow,e2e-testing,ai-regression-testing,production-audit,canary-watch}/`, `skills/{python,go,rust,react}-testing/`, `skills/{council,santa-method,verification-loop}/`, `agents/{tdd-guide,pr-test-analyzer,e2e-runner}.md`) — licença MIT. Princípios (G12/G6) extraídos e reescritos em PT-BR; sem cópia literal. Arsenal de teste/verificação que complementa o `checklist-runner` e o `spec-build-review` já existentes no Prometeu.*
