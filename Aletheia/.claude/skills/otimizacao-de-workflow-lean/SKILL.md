---
name: otimizacao-de-workflow-lean
description: >
  Use quando a demanda for OTIMIZAR UM PROCESSO EXISTENTE — não validar hipótese
  de produto (isso é `mapa-de-assuncoes`), mas encontrar gargalos e desperdício
  num workflow que já roda: onboarding de cliente, fechamento contábil, fila de
  suporte, revisão de PR, ritual de release. Cobre value stream mapping (Toyota),
  hunt de muda (7 desperdícios: superprodução/espera/transporte/superprocessamento/
  estoque/movimento/defeito), matriz impact × effort, e roadmap em 3 fases (quick
  wins 4 semanas, deep changes 12 semanas, transformation 26 semanas). Gatilhos:
  "processo lento", "gargalo", "desperdício", "value stream", "lean", "six sigma",
  "otimizar workflow", "melhorar operação", "muda", "kaizen", "onde estamos
  perdendo tempo". Fronteira: aletheia decide QUE PROCESSO otimizar (via
  discovery); esta skill executa a otimização.
tipo: skill
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
---

# Otimização de workflow — Lean / Six Sigma

Aletheia hoje valida **hipóteses de produto** (assumption mapping, entrevista Mom Test,
experimento). Esta habilidade é primo conceitual: identifica **gargalo em processo que
já existe**, não hipótese sobre produto novo. É o Toyota Production System aplicado a
operações Kolden.

## Fronteira (crítica)

- **`mapa-de-assuncoes` / `desenho-de-experimento` / `roteiro-de-entrevista`** — valida
  ideia de PRODUTO ou FEATURE (você acha que usuário quer X? Prove).
- **AQUI (`otimizacao-de-workflow-lean`)** — otimiza PROCESSO INTERNO ou de operação
  que já roda (onboarding leva 4 semanas — dá pra fazer em 1?).

Sinais que é esta skill:
- "Processo já existe, mas está lento/caro/erra"
- "Fluxo entre times, muitas mãos, muita espera"
- "Métrica operacional é ruim (SLA de suporte, ciclo de fechamento, TAT de release)"

## Value Stream Mapping (VSM)

Mapear o fluxo COMPLETO ponto-a-ponto, sem esconder etapas.

Notação canônica (símbolos Toyota):
- **Caixa de processo** — passo que agrega valor OU não
- **Seta** — fluxo de material/informação (produção puxada vs empurrada)
- **Triângulo com número** — estoque/fila (quantos itens esperando aqui)
- **Kaizen burst** — melhoria proposta

Cada caixa de processo carrega:
- **CT (Cycle Time)** — tempo ativo de execução
- **VA (Value-Add time)** — parte do CT que agrega valor ao cliente
- **WT (Wait Time)** — tempo entre etapas
- **%C&A (Percent Complete & Accurate)** — % de itens que saem do passo prontos e corretos

**Métrica-chave:** **Process Cycle Efficiency = VA / (VA + WT)**.
- <25%: processo ruim, dominado por espera
- 25-50%: ok, mas há espaço
- >50%: bom, otimização marginal
- >85%: excelente

## Hunt de Muda — os 7 desperdícios (Ohno)

Muda = "desperdício" em japonês. Ohno mapeou 7 tipos que sempre aparecem:

| # | Muda | Sinal no workflow | Contra-medida |
|---|---|---|---|
| 1 | **Superprodução** | fazer antes de precisar (relatório sem leitor) | pull system, on-demand |
| 2 | **Espera** | task parada aguardando aprovação/input | reduzir handoff, SLA |
| 3 | **Transporte** | dado passa de sistema A pra B pra C sem uso | pipeline direto |
| 4 | **Superprocessamento** | revisar 3x o que 1x basta | definir "good enough" |
| 5 | **Estoque** | fila de tickets, PR não revisado, task não iniciada | WIP limit |
| 6 | **Movimento** | pessoa/agente troca de contexto sem valor | agrupar por contexto |
| 7 | **Defeito** | erro que volta pra corrigir (retrabalho) | qualidade na fonte |

**Muda extra moderno (Womack): Talento subutilizado.** Pessoa cara fazendo tarefa manual
que script resolve.

## Matriz impact × effort

Depois do VSM + hunt de muda, tem lista de propostas. Priorizar por 2x2:

```
       Impacto ALTO
         │
  Deep   │  Quick
  Change │  Win
  ───────┼───────
  Time   │  Fill-in
  Waster │
         │
       Impacto BAIXO
    ← Esforço BAIXO   Esforço ALTO →
```

- **Quick Wins (top-left):** fazer JÁ. Ganho alto, custo baixo.
- **Deep Changes (top-right):** planejar bem. Ganho alto, custo alto — vale.
- **Fill-ins (bottom-left):** fazer se sobrar tempo.
- **Time Wasters (bottom-right):** NÃO fazer. Custo alto sem ganho.

**Regra dura:** máximo 30% do time em Deep Changes por período. Resto em Quick Wins +
BAU (business as usual). Time inteiro em Deep Changes = ninguém entrega no curto prazo.

## Roadmap em 3 fases

Otimização de workflow raramente é evento único. É roadmap:

### Fase 1 — Quick Wins (4 semanas)
- 3-5 mudanças identificadas na matriz
- Cada uma com ROI mensurável
- Métricas antes/depois
- Objetivo: **cred building** para viabilizar Fase 2

### Fase 2 — Deep Changes (12 semanas)
- 1-2 mudanças estruturais (nova ferramenta, redesenho de etapa)
- Requer buy-in de dono do processo
- Métrica: melhoria de PCE em >20%

### Fase 3 — Transformation (26 semanas)
- Redesenho do workflow inteiro (não incremental)
- Só se Fase 1 + 2 provaram tese
- Envolve mudança de time/estrutura organizacional
- Métrica: métrica-mãe do processo (custo/hora, ciclo total)

## Ferramentas de VSM

- **Miro/Mural** — colaborativo online
- **Draw.io / Excalidraw** — offline, versionável
- **Lucidchart** — enterprise, expensive
- **Kolden padrão:** Excalidraw (versionável em git)

## Métricas operacionais (medir antes e depois)

- **Cycle Time total** — do start ao end
- **Throughput** — itens/semana
- **Rework rate** — % que volta pra corrigir
- **First-time-right** — % que passa sem retrabalho
- **Cost per unit** — custo por item processado
- **PCE** — cycle efficiency (VA/total)

## Ritual mensal (kaizen)

Kaizen = "melhoria contínua". Não é evento anual — é ritmo.

1. **1x/mês:** revisar VSM do workflow-alvo (atualiza métricas)
2. **Retro no time:** 3 propostas de melhoria por membro
3. **Priorizar via matriz impact × effort**
4. **Executar Quick Wins do mês**
5. **Medir e comunicar** — sem medição, não conta.

## Antipatrões

- **VSM sem tempo real medido** — todos os CT são "acho que uns 2 dias". Não vale. Cronometrar.
- **Kaizen que vira teatro** — reunião mensal sem ação = reunião cara.
- **Otimizar processo já morto** — melhor descontinuar do que otimizar. Perguntar "e se paramos de fazer isso?".
- **Local optimum** — melhorar passo 3 que já era rápido, deixar passo 7 (gargalo) intocado.
  Teoria das Restrições (Goldratt): otimize o gargalo primeiro.
- **Batch grande "para eficiência"** — Ohno: batch pequeno + fluxo contínuo ganha de batch grande + fila.

## Handoffs

- **Novo produto/feature** → aletheia hipótese (`mapa-de-assuncoes` + `desenho-de-experimento`).
- **Métrica financeira do ganho** → Plutos (Olimpo).
- **Buy-in de time envolvido** → Zeus (Olimpo) ou dono do processo.
- **Ferramenta nova como parte da otimização** → Conduit (Dédalo `avaliacao-de-ferramentas-mcda`).

## Regras Kolden

- **Nenhuma otimização sem baseline medido.** "Achei que estava lento" não vale.
- **Nenhuma proposta sem dono.** Cada mudança tem responsável.
- **Kaizen mensal é obrigatório** em processos operacionais críticos (suporte, release, fechamento).
- **Registrar em `docs/kaizen/<processo>-<data>.md`** — histórico de mudanças e resultados.

---
## Atribuição
Herança histórica: **Taiichi Ohno** — Toyota Production System (livro 1978), 7 mudas
originais; **Shigeo Shingo** — SMED + Poka-yoke (1960s-80s); **James Womack + Daniel Jones
+ Daniel Roos** — *The Machine That Changed the World* (1990), *Lean Thinking* (1996);
**Eliyahu Goldratt** — *The Goal* (1984), Theory of Constraints; **Mike Rother + John Shook**
— *Learning to See* (1998), formalização do VSM; **Masaaki Imai** — *Kaizen* (1986);
**Motorola/GE** — Six Sigma (1980s-90s, Bill Smith, Jack Welch). Adaptado de
`github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering,
IDs TEST G29, G30, G31, G32.
