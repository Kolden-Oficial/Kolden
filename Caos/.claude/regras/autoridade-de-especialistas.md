# Autoridade de especialistas — matriz de delegação

Regra de apoio à Constituição (Artigo I, III). Define **quem executa e quem tem autoridade
exclusiva** em cada fase do Ritual de Criação. Nenhum especialista assume a autoridade de
outro; quando uma tarefa está fora do seu escopo, ele delega de volta ao Caos, que roteia.

## Matriz por fase

| Fase | Executor | Autoridade exclusiva | Produz |
|------|----------|----------------------|--------|
| 0. Consulta ao Registro | `curador` | Ler/escrever `dados/registro-de-entidades.yaml` | Veredito REUSE/ADAPT/CREATE |
| 1. Diagnóstico | `diagnosticador` | Conduzir as 7 rodadas e salvar `C:\Kolden\<NomeMitológico>\diagnostico.md` | Diagnóstico (7 faculdades completas) |
| 2. Pesquisa | `pesquisador` | — | Relatório de padrões + antipadrões |
| 3. Arquitetura | `arquiteto` | Decisão solo vs squad; desenho das camadas/tiers | Blueprint |
| 4. PRD de IA | Caos (habilidade `geracao-de-prd`) | Emitir o PRD e pedir aprovação | `prd-de-ia.md` (aguarda aprovação) |
| 5.0 Plano de construção | `arquiteto` | Definir a ordem topológica da cascata a partir do PRD §11 | Plano de construção (sequência 5.1→5.6) |
| 5. Construção (cascata) | Caos + habilidades de criação | Escrever os arquivos do agente em `C:\Kolden\<NomeMitológico>\` na ordem 5.1→5.6 | Estrutura completa do agente |
| 5b. CLAUDE.md | `redator-de-prompts` | Escrever o `CLAUDE.md` do agente criado | Identidade e operação do agente |
| 6. Revisão | `revisor` | **Emitir veredito APROVADO/REPROVADO** | Relatório de auditoria |
| 7. Teste de Comportamento | `testador` | **Aprovar comportamento e maturity score** | Roteiro de teste + score |
| 8. Entrega + Registro | `curador` | Registrar entidade e padrões aprendidos | Entrada no registry + histórico |

## Regras de exclusividade

- **Só o `revisor`** emite o veredito da Fase 6. Nenhum outro especialista "aprova" arquivos.
- **Só o `testador`** aprova o comportamento na Fase 7 e atribui o maturity score (0-10).
- **Só o `curador`** escreve em `dados/registro-de-entidades.yaml` e em `dados/padroes-aprendidos.yaml`.
- **Só o `redator-de-prompts`** escreve o `CLAUDE.md` do agente criado (os demais especialistas não editam a identidade do agente).
- **A aprovação do PRD (Fase 4) é exclusiva do usuário** — nenhum especialista ou o Caos pode
  presumir aprovação (Constituição, Artigo III).

## Escalação

1. Especialista não consegue concluir → devolve ao Caos com o motivo.
2. `revisor` reprova → volta à Fase 5 (Construção) com a lista de correções.
3. `testador` reprova (maturity < 7.0) → volta à Fase 5 com os cenários que falharam.
4. Violação de princípio NÃO-NEGOCIÁVEL detectada em qualquer fase → BLOCK, corrige antes de seguir.
