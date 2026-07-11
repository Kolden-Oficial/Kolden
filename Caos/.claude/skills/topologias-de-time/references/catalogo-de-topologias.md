---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/.claude/skills/topologias-de-time/references/orquestradores|orquestradores]]"
---

# Catálogo de topologias de time (detalhe)

Fonte: `revfactory--harness@cceac68e` — `skills/harness/references/agent-design-patterns.md`
(original em coreano). Reescrito em PT-BR, sem cópia literal. Apache-2.0.

## 1. Pipeline (sequencial dependente)
```
[analisar] → [projetar] → [implementar] → [verificar]
```
- **Quando:** cada etapa depende forte do produto da anterior.
- **Exemplo:** escrita de romance — mundo → personagens → enredo → escrita → edição.
- **Armadilha:** o gargalo de uma etapa atrasa o pipeline inteiro; projete as etapas o mais
  independentes possível.
- **Modo:** dependência sequencial limita o ganho de time vivo; só compensa se houver um trecho
  paralelo dentro do pipeline.

## 2. Fan-out/Fan-in (paralelo + integração)
```
          ┌→ [especialista A] ─┐
[distribui]├→ [especialista B] ─┼→ [integra]
          └→ [especialista C] ─┘
```
- **Quando:** a mesma entrada exige análises de perspectivas/áreas diferentes.
- **Exemplo:** pesquisa abrangente — fontes oficiais/mídia/comunidade/contexto em paralelo →
  relatório integrado.
- **Armadilha:** a etapa de **integração** define a qualidade final.
- **Modo:** o padrão **mais natural** para time vivo — membros compartilham descobertas e a
  descoberta de um corrige o rumo de outro em tempo real.

## 3. Expert Pool (roteador → especialista)
```
[roteador] → { especialista A | B | C }
```
- **Quando:** o tipo de entrada exige processamento diferente.
- **Exemplo:** code review — só o especialista de segurança/performance/arquitetura pertinente.
- **Armadilha:** a acurácia de classificação do roteador é o ponto crítico.
- **Modo:** subagente costuma bastar — chama-se só o especialista necessário, time permanente é
  desnecessário.

## 4. Producer-Reviewer (gerar → verificar)
```
[gerar] → [verificar] → (se problema) → re-gerar
```
- **Quando:** garantir qualidade importa e existe critério objetivo de verificação.
- **Exemplo:** webtoon — artista gera → revisor inspeciona → re-gera o painel com problema.
- **Armadilha:** fixe **máximo de 2–3 retries** para evitar loop infinito.
- **Modo:** time vivo útil — feedback gerador↔revisor em tempo real minimiza retrabalho.

## 5. Supervisor (distribuição dinâmica)
```
           ┌→ [worker A]
[supervisor]┼→ [worker B]   ← distribui vendo o estado
           └→ [worker C]
```
- **Quando:** carga variável ou distribuição decidida em runtime.
- **Exemplo:** migração de código em massa — supervisor analisa a lista de arquivos e aloca lotes.
- **Diferença do fan-out:** fan-out fixa a distribuição antes; supervisor ajusta vendo o progresso.
- **Armadilha:** unidade de delegação grande o bastante para o supervisor não virar gargalo.
- **Modo:** casa com a lista de tarefas compartilhada do time vivo (`TaskCreate`; workers se
  auto-atribuem).

## 6. Delegação hierárquica (recursiva, ≤2 níveis)
```
[geral] → [líder A] → [executor A1]
                    → [executor A2]
        → [líder B] → [executor B1]
```
- **Quando:** o problema se decompõe naturalmente em hierarquia.
- **Exemplo:** app full-stack — geral → líder front → (UI/lógica/teste) + líder back → (API/DB/teste).
- **Armadilha:** profundidade ≥3 níveis perde contexto e adiciona latência; **fique em ≤2**.
- **Modo:** time vivo não aninha (membro não cria time). Implemente nível 1 como time, nível 2
  como subagente — ou achate para um único time.

## Padrões compostos
| Composto | Composição | Exemplo |
|---|---|---|
| Fan-out + Producer-Reviewer | gerar em paralelo, revisar cada | tradução multi-idioma — 4 línguas em paralelo → revisor nativo por língua |
| Pipeline + Fan-out | etapa sequencial com um trecho paralelo | análise (seq) → implementação (paralela) → teste de integração (seq) |
| Supervisor + Expert Pool | supervisor chama especialistas dinamicamente | atendimento — supervisor classifica e aloca o especialista certo |

Regra: **comece pelo padrão dominante** e componha o secundário em cima. Para todos os compostos,
o time vivo é o default quando o ambiente o suporta — a comunicação entre membros é o motor da
qualidade; subagente isolado só para tarefas single-shot completamente independentes.

## Seleção de tipo de agente (membro)
| Tipo | Acesso | Uso |
|---|---|---|
| `general-purpose` | tudo (inclui WebSearch/WebFetch) | pesquisa web, tarefa geral |
| `Explore` | só leitura (sem Edit/Write) | exploração/análise de base de código — previne edição acidental |
| `Plan` | só leitura | arquitetura/planejamento |
| custom (`.claude/agents/{nome}.md`) | tudo | papel complexo, reusável entre sessões — persona e protocolo em arquivo |

Princípio da fonte: defina **todo** agente em arquivo (mesmo os built-in) para reuso entre sessões
e para fixar o protocolo de comunicação de time. (Nota Kolden: a fonte fixa `model: opus` para
todo membro — na Kolden, prompts são **agnósticos de modelo** [Constituição Art. V]; trate a
escolha de modelo como decisão de runtime, não a hard-code na definição do agente.)
