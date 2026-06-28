# Relatório de perda (F6.5) — Pheme · bucket Growth & Lifecycle

- **squad-alvo:** Pheme (`C:/Kolden/Pheme/`)
- **fonte:** `alirezarezvani/claude-skills` @4a3c05b69e64f4925f7fc65c88890f614f79caf0, licença MIT
- **bucket:** Growth/Lifecycle (cluster **G6** do inventário) + recorte de e-mail do **G4**
- **data:** 2026-06-27
- **invariante:** ABSORVIDO + DESCARTADO + DIFERIDO-INCREMENTAL = total avaliado · **PERDIDO = 0**

## Âncoras aplicadas

| repo (skill de origem) | ID | disposição | destino |
|---|---|---|---|
| alirezarezvani/claude-skills · `churn-prevention` | G6.a | ABSORVIDO | `Pheme/.claude/skills/ciclo-de-vida-e-retencao/` (SKILL.md + `references/playbook-cancelamento.md` + `references/guia-dunning.md`) |
| alirezarezvani/claude-skills · `email-sequence` | G4.a | ABSORVIDO | `Pheme/.claude/skills/sequencia-de-nutricao/` (SKILL.md + `references/playbook-sequencias.md`) |
| alirezarezvani/claude-skills · `referral-program` | G6.b | ABSORVIDO | `Pheme/.claude/skills/programa-de-indicacao/` (SKILL.md + `references/mecanicas-de-programa.md`) |
| alirezarezvani/claude-skills · `launch-strategy` | G6.c | ABSORVIDO | `Pheme/.claude/skills/motor-de-lancamento/` (SKILL.md + `references/frameworks-de-lancamento.md`) |

4 habilidades novas criadas. `catalogo.md` do Pheme atualizado (7 → 11 habilidades, novo bloco "Growth & lifecycle").

## INCREMENTAL (não aplicado nesta leva)

| repo (skill de origem) | ID | disposição | motivo |
|---|---|---|---|
| alirezarezvani/claude-skills · `cold-email` | G4.b | DIFERIDO-INCREMENTAL | Cold outreach (não opted-in) é mais aderente a Peitho (tráfego/aquisição) ou Caliope (copy) que a Pheme. A distinção contra nutrição já está documentada dentro de `sequencia-de-nutricao`. Reavaliar no bucket de aquisição. |
| alirezarezvani/claude-skills · `webinar-marketing` | G6.d | DIFERIDO-INCREMENTAL | Motor end-to-end de webinar/evento (registro→show-up→follow-up). Alto valor, mas escopo grande e adjacente; melhor como skill própria numa próxima leva para não inchar este bucket (princípio anti-exaustão). |
| alirezarezvani/claude-skills · `free-tool-strategy` | G6.e | DIFERIDO-INCREMENTAL | "Engineering as marketing" (calculadoras/geradores/checkers para tráfego+lead). Loop de growth válido, mas exige acoplamento a engenharia (Prometeu/Dedalo); diferido para avaliar dono cruzado. |
| alirezarezvani/claude-skills · `marketing-demand-acquisition` | G4/G6.f | DESCARTADO (para Pheme) | Playbook de demand gen multi-canal (Google/LinkedIn/Meta Ads, CAC, MQL/SQL, atribuição). É domínio de **Peitho** (tráfego pago), não de Pheme. Roteado ao bucket de Peitho conforme `mapa-de-decisao.md` (G4 → peitho). Sem perda: registrado aqui. |

## Notas
- **Sobreposições resolvidas:** `email-sequence` (G4) e `churn-prevention`/`referral-program` (G6) compartilham o tema "lifecycle"; fundidos por função em 4 skills distintas (retenção, nutrição, indicação, lançamento) sem duplicar — o dunning ficou em `ciclo-de-vida-e-retencao` e os e-mails que o dunning não cobre ficaram em `sequencia-de-nutricao`, com cruzamento explícito entre as duas.
- **Anti-duplicação:** nenhuma das 7 skills pré-existentes do Pheme (conteúdo/social) foi tocada; o foco ficou 100% em growth/lifecycle, lacuna real do squad.
- **Licença:** MIT em toda a fonte; atribuição (owner/repo@sha + MIT) no rodapé de cada SKILL.md. Sem cópia literal — princípios extraídos e reescritos em pt-BR, exemplos de marca citados como referência pública de método.
- **Não tocado:** `squad.yaml`, `README.md` e demais documentos do Pheme (fora do escopo desta leva).
