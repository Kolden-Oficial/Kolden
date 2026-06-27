# Mapa de decisão — hesreallyhim--awesome-claude-code

- **slug:** hesreallyhim--awesome-claude-code
- **sha:** 614f102accbcd48206d63a21df64adc984026b40
- **rota:** C (referência). **Decisão dominante:** arquivar em `referencias/` como **biblioteca inerte** (não vira agente).
- Restrição de licença CC-BY-NC-ND-4.0 reforça o uso como índice de consulta (linkar, não republicar derivados). Ver `_procedencia.md`.

`decisao` aqui: **CREATE→referencias** = nova entrada inerte na biblioteca de referências (sem capacidade equivalente já catalogada como índice). **DESCARTE** = não absorver (toolchain específico do repo). **ADAPT** = técnica reaproveitável por um squad existente.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | referencias | Índice mestre de 227 recursos do ecossistema Claude Code — vira referência de descoberta inerte; não há catálogo externo equivalente já arquivado. |
| G2 | CREATE | referencias | Faceta do índice (slash-commands); valor de consulta para dedalo/prometeu, sem absorção item-a-item. |
| G3 | CREATE | referencias | Faceta do índice (tooling) — pista para o vigia-de-ecossistema garimpar ferramentas. |
| G4 | CREATE | referencias | Faceta do índice (workflows/guias) — consulta. |
| G5 | CREATE | referencias | Faceta do índice (CLAUDE.md files) — exemplos de referência para redação de CLAUDE.md. |
| G6 | CREATE | referencias | Faceta do índice (agent skills) — consulta para a fábrica (Caos). |
| G7 | CREATE | referencias | Faceta do índice (hooks) — consulta para criacao-de-hooks. |
| G8 | CREATE | referencias | Faceta do índice (statuslines/output-styles/clientes/docs) — consulta. |
| G9 | CREATE | referencias | Amostras de slash-commands de terceiros — material de consulta; licença própria por item antes de qualquer reuso. |
| G10 | CREATE | referencias | Amostras de CLAUDE.md reais — banco de exemplos para redação; consulta apenas. |
| G11 | CREATE | referencias | Amostras de workflows/guias — consulta. |
| G12 | CREATE | referencias | Espelho de docs oficiais (GitHub Actions/Quickstarts) — preferir a fonte oficial; manter só como ponteiro. |
| G13 | ADAPT | egide | Prompt de avaliação estática de repositório (trust boundaries / execução implícita) — alinha à `verificacao-de-seguranca-de-repo`/auditor-de-seguranca; absorver como técnica/checklist, reescrito em PT-BR, sem cópia literal. |
| G14 | DESCARTE | vendor (inerte) | Toolchain Python de geração do README específico desta lista — sem valor de capacidade para a Kolden; não absorver. |
| G15 | DESCARTE | — | Config/governança da própria lista (categorias, templates, forms) — acoplado ao repo de origem; não absorver. |

**Síntese:** 1 ADAPT (G13 → egide, candidato real de melhoria), 12 CREATE→referencias (índice inerte de consulta), 2 DESCARTE (toolchain/governança do próprio repo). Nenhum REUSE limpo (não há índice externo equivalente já arquivado). Recomendação: arquivar G1 como `referencias/biblioteca/awesome-claude-code/` (ponteiro + nota de licença) e abrir tíquete de ADAPT do G13 para o Egide.
