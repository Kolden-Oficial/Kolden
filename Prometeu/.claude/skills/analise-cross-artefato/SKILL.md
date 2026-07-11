---
name: analise-cross-artefato
description: Use depois que tasks.md foi gerado e ANTES de implementar, para uma análise de consistência somente-leitura entre spec × plan × tasks × constituição — detectar duplicações, ambiguidades, sub-especificação, lacunas de cobertura, deriva de terminologia e violações constitucionais, com tabela de rastreabilidade requisito→task e severidade. Distinto do `spec-critique` (que só compara spec × requisitos).
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Análise Cross-Artefato (consistência spec × plan × tasks)

QA de **consistência entre artefatos** antes da implementação. Enquanto o `spec-critique`
avalia a spec contra os requisitos, esta análise cruza os **três artefatos centrais**
(`spec.md`, `plan.md`, `tasks.md`) mais a **constituição** do projeto, e produz um relatório
de achados com severidade e uma **tabela de cobertura requisito→task**. Fecha o drift que
só aparece quando os três documentos são lidos juntos.

## Restrição absoluta
**ESTRITAMENTE SOMENTE-LEITURA.** Não modifique nenhum arquivo. A saída é um relatório.
Ofereça um plano de remediação opcional, mas só edite se o usuário aprovar explicitamente.
Rode apenas **após** `tasks.md` estar completo.

## Autoridade da constituição
A constituição do projeto é **inegociável** no escopo da análise. Conflito com um princípio
MUST é automaticamente **CRÍTICO** e exige ajustar spec/plan/tasks — nunca diluir ou
reinterpretar o princípio. Mudar o princípio em si é um ato separado, fora desta análise.

## Modelos semânticos (internos, não despeje os artefatos crus)
- **Inventário de requisitos** — para cada `FR-###` e `SC-###`, uma chave estável. Inclua só Critérios de Sucesso que exigem trabalho construível (ex.: infra de load-test, tooling de auditoria); exclua métricas de resultado pós-lançamento e KPIs de negócio.
- **Inventário de ações/stories** — ações discretas do usuário com seus critérios de aceite.
- **Mapa de cobertura de tasks** — cada task mapeada a um ou mais requisitos/stories (por ID explícito ou frase-chave).
- **Conjunto de regras constitucionais** — nomes de princípios + afirmações MUST/SHOULD.

## Passes de detecção (alto sinal; teto de 50 achados, agregue o resto)
- **A. Duplicação** — requisitos quase-duplicados; marque a frase mais fraca para consolidar.
- **B. Ambiguidade** — adjetivos vagos (rápido, escalável, seguro, intuitivo, robusto) sem critério mensurável; placeholders não resolvidos (TODO, ???, `<placeholder>`).
- **C. Sub-especificação** — requisitos com verbo mas sem objeto/resultado mensurável; stories sem aceite; tasks citando arquivos/componentes não definidos na spec/plan.
- **D. Alinhamento constitucional** — requisito/plano em conflito com princípio MUST; seções/gates mandatórios ausentes.
- **E. Lacunas de cobertura** — requisitos com **zero** tasks; tasks sem requisito mapeado; SC construíveis (performance/segurança/disponibilidade) ausentes nas tasks.
- **F. Inconsistência** — deriva de terminologia (mesmo conceito, nomes diferentes); entidades no plan ausentes na spec (ou vice-versa); contradições de ordenação (task de integração antes da fundação, sem dependência); requisitos conflitantes (ex.: um pede Next.js, outro Vue).

## Severidade
- **CRÍTICO** — viola MUST constitucional; artefato central ausente; requisito sem cobertura que bloqueia funcionalidade base.
- **ALTO** — requisito duplicado/conflitante; atributo de segurança/performance ambíguo; critério de aceite não-testável.
- **MÉDIO** — deriva de terminologia; cobertura não-funcional faltando; edge case sub-especificado.
- **BAIXO** — estilo/redação; redundância menor sem afetar ordem de execução.

## Relatório (sem escrita em disco)

```markdown
## Relatório de Análise de Especificação

| ID | Categoria | Severidade | Local(is) | Resumo | Recomendação |
|----|-----------|-----------|-----------|--------|--------------|
| A1 | Duplicação | ALTO | spec.md:L120-134 | Dois requisitos similares... | Fundir; manter a versão mais clara |

### Tabela de Cobertura
| Chave do Requisito | Tem Task? | IDs de Task | Notas |

### Problemas de Alinhamento Constitucional  (se houver)
### Tasks Não-Mapeadas  (se houver)

### Métricas
- Total de requisitos · Total de tasks · Cobertura % (req. com ≥1 task)
- Contagem de ambiguidades · de duplicações · de issues críticas
```

IDs estáveis prefixados pela inicial da categoria (rodar de novo sem mudanças → mesmos IDs/contagens).

## Próximas ações
- Se houver CRÍTICOS: recomende resolver **antes** de implementar.
- Se só BAIXO/MÉDIO: pode avançar, com sugestões de melhoria.
- Sugira comandos concretos (refinar spec, ajustar plan, adicionar cobertura de task X).
- Pergunte se o usuário quer edições de remediação para os top-N — **nunca** aplique automaticamente.

## Princípios
Nunca modifique arquivos · nunca alucine seções ausentes (reporte com precisão) · priorize
violações constitucionais · cite instâncias específicas em vez de regras genéricas · reporte
zero issues graciosamente (relatório de sucesso com estatísticas de cobertura).

---
*Fonte: github/spec-kit@b7e67f5 (`templates/commands/analyze.md`) — licença MIT, Copyright GitHub, Inc. Princípio extraído e reescrito em PT-BR; sem cópia literal. Complementa o `spec-critique` do Prometeu, não o substitui.*
