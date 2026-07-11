---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/rules/_indice|_indice]]"
---

# Consolidação de Handoff — Regra

## Propósito

Evitar a proliferação de YAMLs de handoff individuais em pipelines de longa duração (epics que se estendem por mais de 5 sessões). Consolidar handoffs mais antigos em um único `RUN-LOG.md` por epic/pipeline para manter a legibilidade enquanto se preserva o histórico completo.

## Quando Isto se Aplica

- Qualquer pipeline (epic, iniciativa multi-wave) acumulando handoffs em `.aiox/handoffs/`
- Disparado quando existem **5 ou mais** YAMLs de handoff para o mesmo pipeline
- Aplica-se independentemente do agente (qualquer agente que gere handoffs deve observar)

## Limiar de Disparo

| Contagem de handoffs do pipeline | Ação |
|---|---|
| 1-4 | Manter como YAMLs individuais |
| **5+** | **DEVE consolidar** handoffs mais antigos em `RUN-LOG.md` |
| 5+ recorrente | Reconsolidar a cada 5 novos handoffs |

## Procedimento de Consolidação

### Passo 1 — Identificar os handoffs do pipeline

Pipelines são agrupados por:
- Campo `pipeline_id` no YAML do handoff, OU
- Padrão de nome de arquivo `handoff-{date}-{pipeline-slug}-{wave}.yaml`, OU
- Arquivo `INDEX-{pipeline-slug}.md` que os referencia

### Passo 2 — Criar RUN-LOG.md (se não existir)

Opções de localização (em ordem de prioridade):
1. `business-ai-first/docs/stories/epics/{epic-folder}/RUN-LOG.md` (preferido para pipelines vinculados a epic)
2. `business-ai-first/docs/runlogs/{pipeline-slug}-RUN-LOG.md` (para pipelines cross-epic)
3. `.aiox/run-logs/{pipeline-slug}-RUN-LOG.md` (para pipelines de nível do framework)

### Passo 3 — Anexar waves resumidas

Para cada handoff sendo consolidado, anexe uma seção ao `RUN-LOG.md`:

```markdown
## Wave {N}: {wave_goal} — {date}

**Status:** ✅ DONE | ⚠️ BLOCKED | 🔄 PARTIAL
**Session:** {session_id or hash}
**Agent:** {primary agent}
**Effort:** {actual hours}

### Delivered
- {bullet list of files created/modified}
- {ACs completed with IDs}

### Decisions
- {key architectural/process decisions, link to ADR if applicable}

### Blockers Resolved
- {what got unblocked this wave}

### Carry-forward to next wave
- {open items, not blockers}

### Original handoff
Archived: `.aiox/handoffs/_archive/{filename}.yaml` (or deleted if redundant)
```

### Passo 4 — Arquivar ou excluir os originais

Duas opções:
- **Arquivar** (mais seguro): mover os YAMLs para `.aiox/handoffs/_archive/{pipeline-slug}/` — preserva a trilha de auditoria
- **Excluir** (mais limpo): apenas se o RUN-LOG.md capturar tudo o que é materialmente relevante — reduz a poluição

**Padrão: arquivar**, a menos que o dono do pipeline autorize explicitamente a exclusão.

### Passo 5 — Atualizar o INDEX

Atualize o `INDEX-*.md` do pipeline (ou o README do epic) para referenciar o RUN-LOG.md em vez dos handoffs individuais.

## O que DEVE ser Preservado

No RUN-LOG.md, nunca perca:
- ❗ Contexto estratégico (por que este pipeline existe)
- ❗ Decisões arquiteturais (link para ADRs)
- ❗ Blockers resolvidos (para que não sejam reinvestigados)
- ❗ Mudanças de schema/migration aplicadas em prod
- ❗ Itens em aberto que a próxima sessão deve tratar
- ❗ Arquivos criados/modificados por wave (lista de caminhos, não conteúdo)

## O que PODE ser Descartado

Na consolidação, descarte:
- Passos verbosos de investigação (manteve-se a conclusão, não a busca)
- Alternativas rejeitadas que já foram decididas
- Sequências de chamadas de ferramentas (manteve-se o resultado, não a receita)
- Contexto repetido que vive no plano mestre ou nos ADRs

## O Handoff Mais Recente Permanece Individual

O handoff **mais recente** de um pipeline ativo permanece como `handoff-{latest}.yaml` mesmo após a consolidação. O RUN-LOG.md é para waves fechadas. O handoff ativo é o que a próxima sessão lê primeiro.

## Estrutura de Exemplo (após consolidação)

```text
.aiox/handoffs/
├── INDEX-meta-messaging-pipeline.md       (refs RUN-LOG)
├── handoff-2026-05-15-wave6-current.yaml  (latest, active)
└── _archive/
    └── meta-messaging/
        ├── handoff-2026-05-06-wave1.yaml
        ├── handoff-2026-05-08-wave2.yaml
        ├── handoff-2026-05-10-wave3.yaml
        ├── handoff-2026-05-12-wave4.yaml
        └── handoff-2026-05-14-wave5.yaml

business-ai-first/docs/stories/epics/epic-013-portal-replacement/
└── RUN-LOG.md   (waves 1-5 consolidated, narrative form)
```

## Autoridade

- **Qualquer agente** pode consolidar quando o limiar é atingido
- **Nenhum agente** pode excluir os originais sem autorização explícita do dono do pipeline
- **@devops** é o responsável pela aplicação durante as revisões de git push

## Anti-padrões (NÃO FAÇA)

- ❌ Consolidar o handoff ativo (aquele que a próxima sessão deve ler)
- ❌ Perder resoluções de blockers no resumo
- ❌ Pular referências cruzadas a ADR
- ❌ Consolidar antes do limiar (prematuro)
- ❌ Misturar múltiplos pipelines em um RUN-LOG (cada pipeline = seu próprio log)

## Migração de Handoffs Existentes

YAMLs de handoff existentes que antecedem esta regra devem ser consolidados retroativamente quando cruzarem o limiar de 5+ para o seu pipeline. Não há necessidade de consolidar handoffs órfãos/avulsos.

---

**Estabelecido:** 2026-05-06 (durante a transição Wave 1 → Wave 2 do pipeline meta-messaging)
**Dono:** @aiox-master (Orion)
**Aplicado por:** todos os agentes durante a geração de handoff; @devops durante a revisão de PR
