---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/msitarzewski--agency-agents/_indice|_indice]]"
---

# F5 — Decisão executável · bucket **B11 = `academic/`** → Liceu (com handoff Orfeu)

> Baseada em `mapa-de-decisao-b11-academic.md` (F4). Esta F5 é o plano operacional do que **F6 vai escrever**, com gates, ordem de dependência e checklist por arquivo. **Não escreve agentes/dossiês/frameworks aqui** — F5 é o contrato; F6 aplica.
>
> Repositório-fonte: `msitarzewski--agency-agents@a597cb6`, divisão `academic/` (5 arquivos: anthropologist, geographer, historian, narratologist, psychologist).
> Squad-alvo principal: **Liceu** (`C:\Kolden\Liceu\`).
> Aprovação-gate: **PARA AQUI** — F6 só inicia com aprovação humana explícita (Constituição Art. III).

## 1 — Veredito de absorção

| Métrica | Valor |
|---|---|
| Inventário (F3) | 18 IDs (G1–G18) |
| ABSORVIDO | 18 |
| DESCARTADO | 0 |
| PERDIDO | 0 |
| Conferência | `18 + 0 + 0 == 18` ✓ |
| Destino-principal | Liceu (5 dossiês de disciplina + 7 frameworks + 2 anexos + 2 ADAPTs no checklist) |
| Destino-secundário (handoff) | Orfeu (3 frameworks de narratologia consumidos via handoff) + Aglaia/Caliope/Pluto/Argos/Themis/Metis/Aletheia/Hestia (consumo via handoff documentado) |
| Roteamento dispersivo | **Nenhum** — todos os 18 IDs param em Liceu. Os outros squads consomem por contrato de handoff, sem absorver skill. |

## 2 — Mapa final (18 IDs → 14 arquivos novos + 2 evoluídos)

### 2.1 — Dossiês de disciplina (CREATE × 5)

| Arquivo | IDs cobertos | Schema |
|---|---|---|
| `Liceu/mentes/disciplina-antropologia-cultural/dossie.md` | G1 | Variante de `_modelo-dossie.md` para disciplina (ver §3) |
| `Liceu/mentes/disciplina-geografia-fisico-humana/dossie.md` | G4 | idem |
| `Liceu/mentes/disciplina-historiografia/dossie.md` | G7 + G10 (norma anti-eurocentrismo embutida) | idem |
| `Liceu/mentes/disciplina-narratologia/dossie.md` | G11 (sub-mentes Campbell+Snyder por referência ao Orfeu; Propp/Todorov/Genette/McKee pendentes) | idem |
| `Liceu/mentes/disciplina-psicologia-clinica/dossie.md` | G15 | idem |

### 2.2 — Frameworks operacionais (CREATE × 9 — sendo 7 standalone + 2 anexos)

| Arquivo | ID-base | Anexo embutido | Consumidores (handoff) |
|---|---|---|---|
| `Liceu/frameworks/funcao-antes-da-estetica/framework.md` + `procedencia.md` | G2 | — | Aglaia, Caliope |
| `Liceu/frameworks/rito-de-passagem-3-estagios/framework.md` + `procedencia.md` | G3 | — | Caliope, Aglaia, Pluto |
| `Liceu/frameworks/worldbuilding-fisico-bottom-up/framework.md` + `procedencia.md` | G5 | G6 (seção "Regras invioláveis") | Orfeu |
| `Liceu/frameworks/longue-duree-3-camadas/framework.md` + `procedencia.md` | G9 | — | Argos, Themis, Metis |
| `Liceu/frameworks/diagnostico-narrativo-fabula-sjuzhet/framework.md` + `procedencia.md` | G12 | — | Orfeu |
| `Liceu/frameworks/arco-personagem-5-pontos/framework.md` + `procedencia.md` | G13 | — | Orfeu, Caliope |
| `Liceu/frameworks/narratologia-comparada-3-tradicoes/framework.md` + `procedencia.md` | G14 | — | Orfeu, Caliope |
| `Liceu/frameworks/perfil-psicologico-multi-lente/framework.md` + `procedencia.md` | G16 | G17 (seção "Respostas diversas a trauma") | Aletheia, Caliope, Aglaia, Pluto |
| `Liceu/frameworks/dinamica-relacional/framework.md` + `procedencia.md` | G18 | — | Caliope, Pluto, Hestia |

### 2.3 — Evoluções (ADAPT × 2)

| Arquivo | IDs cobertos | Tipo de mudança |
|---|---|---|
| `Liceu/checklists/output-quality.md` (LICEU-CL-001) | G8 | Adiciona rótulo 4-graus explícito (Bem-documentado / Consenso / Em debate / Especulativo) + tipo-de-fonte ao gate de candura |
| `Liceu/checklists/output-quality.md` (LICEU-CL-001) | G10 | Adiciona princípio anti-eurocentrismo como norma transversal nos dossiês de disciplina |

### 2.4 — Atualizações de catálogo/índice (housekeeping)

| Arquivo | Mudança |
|---|---|
| `Liceu/indice-mestre.md` | +5 linhas de disciplina + ~30 linhas de sub-mentes-âncora pendentes (status `pendente-dissecacao`) |
| `Liceu/indice.yaml` | idem em machine-readable |
| `Liceu/linhagens/indice-de-linhagens.yaml` | +5 linhagens-disciplina (antropologia/geografia/historiografia/narratologia/psicologia-clinica); fronteira explícita com `psicanalise-do-desejo` |
| `Liceu/frameworks/indice-de-frameworks.yaml` | +9 frameworks novos |
| `Liceu/README.md` (seção Handoffs) | +linhas: frameworks novos × squads consumidores |
| `Liceu/.claude/skills/catalogo.md` | Sem mudança — habilidades existentes (`dissecacao-de-mente`, `mapeamento-de-linhagem`, `sintese-de-framework`) cobrem o trabalho |
| `Caos/dados/registro-de-entidades.yaml` | Registrar 5 disciplinas + 9 frameworks como entidades novas; rastrear `fonte_absorcao: msitarzewski--agency-agents@a597cb6/academic/` |
| `Caos/dados/repositorios-absorvidos.yaml` | Atualizar entrada do repo com bucket B11 ✓ |

## 3 — Schema-variante para "dossiê de disciplina"

Liceu hoje só tem `mentes/_modelo-dossie.md` (mente individual). F6 cria a variante:

**`Liceu/mentes/_modelo-dossie-disciplina.md`** — segue o esqueleto do `_modelo-dossie.md` (frontmatter + 8 seções), com adaptações:

- **frontmatter** adiciona campos: `tipo: disciplina`, `sub_mentes_ancora` (lista de IDs + caminho canônico ou status `pendente-dissecacao`), `escolas` (lista nomeada com fonte primária), `obras_funadoras` (lista datada).
- **seção 2** (Biografia → Linhagem da disciplina): histórico da formação da disciplina, e não biografia individual.
- **seção 3** (Mental models → Princípios disciplinares): cita escola, não autor único.
- **seção 5** (Engenharia documentada × Mito): mantém o gate, mas o "mito" inclui caricaturas pop da disciplina (ex.: "antropólogo = aquele que estuda tribos").
- **seção 7** (Gancho de operacionalização): lista os frameworks Kolden gerados a partir da disciplina + os squads-consumidores.

Esta variante **não substitui** `_modelo-dossie.md` — coexistem; o `bibliotecario` escolhe pelo tipo.

## 4 — Ordem de aplicação (F6) com gates por etapa

Cascata em **6 etapas dependentes**. Cada etapa só inicia quando a anterior fechou.

### Etapa 1 — Schema da disciplina (gate de modelagem)
- Criar `_modelo-dossie-disciplina.md` (schema novo).
- Atualizar `bibliotecario` (`agents/bibliotecario.md`) para reconhecer `tipo: disciplina` no frontmatter.
- **Gate N0:** schema validado contra `_modelo-dossie.md` existente (campos paralelos + adições documentadas).

### Etapa 2 — Evolução do gate de candura (dependência transversal)
- Editar `checklists/output-quality.md` com G8 (4-graus + tipo-de-fonte) e G10 (anti-eurocentrismo como norma).
- **Gate N1:** revisar contra o original — nenhum item antigo perdido; rastreabilidade preservada.

### Etapa 3 — Dossiês de disciplina (5 arquivos, paralelos)
- 5 dossiês conforme §2.1, todos usando `_modelo-dossie-disciplina.md`.
- **Gate N2 — fato × folclore (LICEU-CL-001 reforçado):** cada dossiê passa pelo checklist com os 4 graus aplicados.
- **Gate N3 — linhagem:** cada dossiê tem ao menos uma escola ou linhagem documentada com fonte primária + ano (ou rótulo "isolado" justificado).

### Etapa 4 — Frameworks operacionais (9 arquivos, paralelos)
- 9 frameworks conforme §2.2, cada um com `framework.md` + `procedencia.md`.
- **Gate N4 — procedência:** cada passo do framework rastreia a mente/escola/obra/ano de origem.
- **Gate N5 — operacionalidade:** framework tem N passos acionáveis (não é resumo teórico).

### Etapa 5 — Atualização de índices e contratos de handoff
- Atualizar `indice-mestre.md`, `indice.yaml`, `linhagens/indice-de-linhagens.yaml`, `frameworks/indice-de-frameworks.yaml`.
- Atualizar `Liceu/README.md` (seção Handoffs com 9 linhas novas).
- **Gate N6 — paridade índice ↔ canônico:** `bibliotecario` valida que `indice-mestre.md` e `indice.yaml` estão em paridade e que todos os caminhos canônicos existem.

### Etapa 6 — Registro no Caos (Fase 8 do Ritual)
- `curador` registra em `Caos/dados/registro-de-entidades.yaml` (5 disciplinas + 9 frameworks) com `fonte_absorcao` apontando para o repo+sha+divisão.
- Atualizar `Caos/dados/repositorios-absorvidos.yaml` (bucket B11 ✓ aplicado).
- Atualizar `MEMORY.md` do Liceu (padrão aprendido: "disciplina como tipo no acervo").
- **Gate de encerramento:** ritual-de-encerramento dispara automaticamente ao final.

## 5 — Maturidade & risco

| Item | Risco | Mitigação |
|---|---|---|
| Volume de arquivos novos (~14) | médio | Aplicação em etapas paralelas dentro de cada etapa (5 dossiês em paralelo, 9 frameworks em paralelo) |
| Schema-variante novo (dossiê-disciplina) | médio | Gate N0 valida contra schema existente antes de criar conteúdo; `bibliotecario` é atualizado primeiro |
| Risco de "dossiê esqueleto" sem fonte primária | alto (sempre) | Gate N2 (fato×folclore) + Gate N3 (linhagem) — Constituição já cobre; reforço operacional via 4-graus de G8 |
| Sub-mentes-âncora pendentes (~30) | baixo | Cataloga como `pendente-dissecacao`; popula sob demanda. Não é dívida técnica oculta — é roadmap explícito |
| Overlap potencial com `psicanalise-do-desejo` | médio | Fronteira documentada explicitamente em `linhagens/indice-de-linhagens.yaml`: psicanálise aplicada ao consumo (existente) × psicologia clínica empírica (nova) |
| Handoffs múltiplos | médio | Documentar no `README.md` do Liceu (seção Handoffs já existe; só estender). Squads-consumidores não absorvem skill — chamam Liceu por gatilho |

## 6 — Definição de Pronto (DoR) — F6

F6 está aprovada para iniciar quando:
- [ ] Ronan aprovou o mapa F4 (`mapa-de-decisao-b11-academic.md`) e esta decisão F5.
- [ ] Schema-variante `_modelo-dossie-disciplina.md` foi revisado pelo arquiteto/bibliotecario antes da escrita dos 5 dossiês.
- [ ] Os 4-graus de candura (G8) foram acordados explicitamente (Bem-documentado / Consenso / Em debate / Especulativo) — Ronan pode preferir nomes alternativos.
- [ ] Capacidade de tempo: F6 é um lote grande (~14 arquivos novos com 2 procedências cada = ~23 escritas), recomenda-se sessão Caos dedicada com `auditoria-de-squad` rodando como benchmark.

## 7 — Critério de aceitação (Done)

F6 está concluída quando:
- [ ] 5 dossiês de disciplina existem e passam LICEU-CL-001 (com 4-graus).
- [ ] 9 frameworks existem com `framework.md` + `procedencia.md` cada — procedência rastreia a obra+ano.
- [ ] `output-quality.md` tem as adições de G8+G10 incorporadas.
- [ ] `indice-mestre.md`, `indice.yaml`, `linhagens/indice-de-linhagens.yaml`, `frameworks/indice-de-frameworks.yaml` estão em paridade.
- [ ] `README.md` do Liceu tem os 9 handoffs novos documentados.
- [ ] `Caos/dados/registro-de-entidades.yaml` e `Caos/dados/repositorios-absorvidos.yaml` registram a absorção com SHA `a597cb6`.
- [ ] `MEMORY.md` do Liceu tem a lição aprendida (padrão "disciplina como tipo no acervo").
- [ ] PERDIDO permanece **0** ao final da F6 (re-conferência contra inventário).

## 8 — Conferência final do invariante de absorção

```
inventário (F3)   : 18 IDs (G1–G18)
absorvido (F5)    : 18 IDs (5 dossiês cobrem G1+G4+G7+G11+G15;
                            9 frameworks cobrem G2+G3+G5+G6+G9+G12+G13+G14+G16+G17+G18;
                            2 ADAPTs cobrem G8+G10)
descartado (F5)   : 0
perdido (F5)      : 0
invariante        : 18 + 0 + 0 == 18  ✓
```

**Veredito F5 — APROVADO PARA F6** mediante aprovação humana (Art. III).
