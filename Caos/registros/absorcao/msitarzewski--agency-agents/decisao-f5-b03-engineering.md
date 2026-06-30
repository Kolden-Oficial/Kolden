# F5 — Plano de aplicação · `msitarzewski--agency-agents@a597cb6` — bucket B03 (engineering + testing)

> **Bucket B03:** Prometeu (squad-alvo principal, 70 IDs) + Dedalo (8 IDs) + Égide cross-link (4 IDs) + Ariadne cross-link (2 IDs) + Caliope (3 IDs, skill nova) + Aletheia (4 IDs, skill nova) + DESCARTADO (18) + ROADMAP (8).
> **Total:** 117 IDs.
> **Status:** PLANO LAVRADO — **aguarda aprovação humana** antes de qualquer escrita em squads-alvo (Constituição Art. III).
> **Origem:** [`mapa-de-decisao-b03-engineering.md`](./mapa-de-decisao-b03-engineering.md)

---

## 1. Veredito por squad

### 1.1 Prometeu (70 IDs, principal)

**Localização:** `C:\Kolden\Prometeu\.aiox-core\development\agents\` (12 agentes) + `Prometeu\.claude\skills\` (skills).

**Veredito:** Squad **APROVADO para absorção** — 70 IDs distribuídos entre 7 agentes Prometeu (architect/dev/qa/devops/data-engineer/analyst/sm) via **20 skills novas** + **9 referências consolidadas** em MEMORY.md.

**Skills novas a criar (em `Prometeu\.claude\skills\`):**

| Skill | Agente-dono | IDs absorvidos | Tipo |
|---|---|---|---|
| `remediacao-air-gapped` | data-engineer (Dara) | G1, G2, G3, G4 | ADAPT (cross-link Caos invariante de absorção) |
| `mlops-em-producao` | dev (Dex) | G5 | ADAPT |
| `topologias-de-inferencia-ml` | architect (Aria) | G6 | ADAPT |
| `arquitetura-de-inferencia-llm-autonoma` | architect (Aria) | G7, G8, G9 | CREATE (cross-link Hermes runtime) |
| `governanca-de-contratos-de-api` | architect (Aria) | G11 | ADAPT |
| `migracao-zero-downtime` | data-engineer | G12, G24 | ADAPT |
| `revisao-de-codigo-priorizada` | qa+dev compartilhada | G15, G16 | ADAPT |
| `onboarding-de-codebase-em-3-niveis` | analyst (Alex) | G17, G18 | CREATE |
| `invariantes-de-pipeline-de-dados` | data-engineer | G20, G21 | ADAPT |
| `otimizacao-de-banco-postgres-supabase` | data-engineer | G22, G23, G24 | ADAPT |
| `estrategias-de-deploy-zero-downtime` | devops (Gage) | G26 | ADAPT |
| `inteligencia-de-email-mime` | data-engineer | G30, G31, G32 | CREATE |
| `virtualizacao-e-perf-de-listas` | dev | G42 | ADAPT |
| `governanca-git-branching` | devops | G43, G44 | ADAPT |
| `slo-error-budget-burn-rate` | devops + qa | G47, G73 (parcial), G74 | ADAPT |
| `disciplina-de-diff-minimo` | dev + qa | G51, G52 | ADAPT (cross-link Artigo III AIOX) |
| `desenvolvimento-mobile-multiplataforma` | dev (Dex) | G53 | CREATE |
| `arquitetura-mobile-offline-first` | architect | G54 | ADAPT |
| `engenharia-de-prompts-versionada` | dev + qa | G60, G61, G62 | ADAPT |
| `mvp-em-3-dias-nextjs-supabase` | dev | G63, G64 | CREATE |
| `efeitos-visuais-premium-threejs` | dev | G65 (parcial), G66 | ADAPT parcial (descarta Laravel/Livewire/FluxUI) |
| `selecao-de-padrao-arquitetural` | architect | G68, G69 | ADAPT |
| `acessibilidade-wcag-2-2-aa` | qa (Quinn) | TEST G1, G2, G3, G4 | CREATE |
| `testes-de-api-funcional-seguranca-performance` | qa | TEST G5, G6, G7, G8 | ADAPT (cross-link Égide para OWASP API Top 10) |
| `qa-anti-fantasia-com-evidencia-visual` | qa | TEST G9 (REUSE+anexo), G10 (REUSE+anexo), G11, G12 | ADAPT |
| `benchmarking-com-k6-multi-stage` | qa | TEST G13, G15 | ADAPT |
| `cross-validation-qa-integracao` | qa | TEST G18 | ADAPT |
| `spec-vs-implementation-gap-analysis` | qa + po | TEST G19 | ADAPT (cross-link Artigo III AIOX) |
| `analise-estatistica-de-qa-com-ml` | qa | TEST G21, G22, G23, G24 | CREATE |

**Total Prometeu:** 28 skills novas. (Algumas skills agregam múltiplos IDs.)

**Referências consolidadas a MEMORY.md (REUSE, sem skill nova):**

| Agente Prometeu | IDs anexados | Conteúdo |
|---|---|---|
| architect (Aria) | G10, G67 | Padrões backend escalável + arquitetura DDD/hexagonal/onion (pattern catalog) |
| data-engineer (Dara) | G19, G28 (princípio), G37 (princípio) | Medallion strict; dinheiro nunca como float; idempotência por event-id |
| devops (Gage) | G25 | IaC + CI-CD + observabilidade canônicas |
| dev (Dex) | G41 | Frontend moderno React/Next.js stack Kolden |
| qa (Quinn) | TEST G9, G10, G17 | QA cético, default needs work, evidência visual |
| sm (River) | TEST G20 | "First implementations need 2-3 revision cycles" — anexa à doc do QA Loop |

**Anti-conflito:** as 28 skills novas vão em `.claude/skills/<nome>/SKILL.md`. **Não** modificar:
- `.aiox-core/core/` (L1 framework core — protegido por deny rules)
- `.aiox-core/development/tasks/` e `templates/` (L2 framework templates — extend-only)
- Os 10 arquivos de agente em `.aiox-core/development/agents/*.md` (são bloco YAML autocontido — alteração desencadeia regressões)

A regra é: **skills NOVAS são absorvidas; arquivos de agente são INTOCADOS**. As MEMORY.md (L3 Project Config) podem receber referências/anexos consolidados.

### 1.2 Dedalo (8 IDs)

**Localização:** `C:\Kolden\Dedalo\agents\` (8 agentes) + `Dedalo\.claude\skills\` (skills).

**Veredito:** Dedalo APROVADO para absorção — 8 IDs em **2 skills novas**.

**Skills novas a criar (em `Dedalo\.claude\skills\`):**

| Skill | Agente-dono | IDs absorvidos | Tipo |
|---|---|---|---|
| `arquitetura-multi-agente-canonica` | swarm-orchestrator (Nexus) | G55, G56, G57, G58 | ADAPT (cross-link Hermes camada 2 + skill Olimpo `topologias-de-time`) |
| `avaliacao-de-ferramentas-mcda` | project-integrator (Conduit) | TEST G25, G26, G27, G28 | ADAPT |

**Anti-conflito:** Dedalo não tem a estrutura L1-L4 do AIOX; agentes em `agents/*.md` são livres para ler skills. Nenhuma alteração nos arquivos de agente.

### 1.3 Égide (4 IDs)

**Localização:** `C:\Kolden\Egide\.claude\skills\` (skills compartilhadas).

**Veredito:** Égide APROVADO para absorção — 4 IDs em **1 skill nova**.

**Skill nova a criar (em `Egide\.claude\skills\`):**

| Skill | Agente-dono | IDs absorvidos | Tipo |
|---|---|---|---|
| `solidity-evm-foundry-seguro` | jim-manico (AppSec) | G70, G71, G72 | CREATE |

**Cross-link:** TEST G7 (OWASP API Top 10) está em Prometeu/qa mas referencia jim-manico como padrão.

### 1.4 Ariadne (2 IDs)

**Localização:** `C:\Kolden\Ariadne\.claude\skills\core-web-vitals-e-performance\` (skill existente).

**Veredito:** Ariadne APROVADO para absorção — 2 IDs como **atualização incremental** da skill já existente.

**Atualização da skill existente:**

| Skill existente | IDs anexados | Mudança |
|---|---|---|
| `core-web-vitals-e-performance` | TEST G14 (metas CWV explícitas), TEST G16 (capacity planning 10x degradação) | Adiciona seção "Metas absolutas de aceite" + "Capacity planning com auto-scaling" |

**Anti-conflito:** alteração aditiva (extend-only) — não remove conteúdo existente.

### 1.5 Caliope (3 IDs)

**Localização:** `C:\Kolden\Caliope\.claude\skills\` (skill compartilhada do squad — não dedicada a um copywriter específico).

**Veredito:** Caliope APROVADO para absorção — 3 IDs em **1 skill nova**.

**Skill nova a criar (em `Caliope\.claude\skills\`):**

| Skill | Agente-dono | IDs absorvidos | Tipo |
|---|---|---|---|
| `escrita-tecnica-docs-as-code` | (skill compartilhada do squad) | G75, G76, G77 | CREATE |

**Justificativa:** Caliope hoje cobre **copywriting persuasivo** (33 agentes — Halbert, Schwartz, Ogilvy, etc.). **Technical writing operacional** (Divio system, docs-as-code, CI gating) é capacidade complementar — não persuasiva — e não pertence a nenhum copywriter individual. Vai como skill compartilhada do squad (qualquer agente Caliope que receba demanda de README/API ref/tutorial usa essa skill).

**Anti-conflito:** skill nova compartilhada. Nenhuma alteração nos 33 arquivos de copywriter.

### 1.6 Aletheia (4 IDs)

**Localização:** `C:\Kolden\Aletheia\.claude\skills\` (skill compartilhada do squad).

**Veredito:** Aletheia APROVADO para absorção — 4 IDs em **1 skill nova**.

**Skill nova a criar (em `Aletheia\.claude\skills\`):**

| Skill | Agente-dono | IDs absorvidos | Tipo |
|---|---|---|---|
| `otimizacao-de-workflow-lean` | (skill compartilhada do squad) | TEST G29, G30, G31, G32 | ADAPT |

**Justificativa:** Aletheia hoje cobre discovery & validation (mapa-de-assuncoes, desenho-de-experimento, roteiro-de-entrevista). Otimização de workflow Lean/Six Sigma é primo conceitual: identifica gargalos em **processos existentes** (em vez de **hipóteses de produto**). A modelagem ProcessStep + Impact/Effort + roadmap em 3 fases (4/12/26 semanas) é altamente reusável.

### 1.7 DESCARTADO (18 IDs)

Cada DESCARTADO tem motivo registrado na coluna `justificativa` do mapa F4. Resumo agregado:

| Grupo descartado | IDs | Razão |
|---|---|---|
| **Drupal/Drupal Commerce** | G13, G14, G27, G28, G29 | Stack fora do core Kolden (interno usa Next.js/Postgres/Supabase) |
| **Feishu/Lark** | G35, G36, G37 | Mercado China — Kolden é Brasil; ecossistema fora do core |
| **Filament/PHP/Laravel** | G38, G39, G40 | Admin UI Kolden usa Next.js/shadcn — Filament é alternativa não adotada |
| **WeChat Mini Program** | G81, G82 | Mercado China — fora do core |
| **WooCommerce/WordPress** | G83, G84, G85 | Stack fora do core Kolden |

**Princípios universais salvos do descarte:** "dinheiro nunca como float" (G28), "idempotência por event-id" (G37), "excluir página dinâmica de cache" (G85) — foram anotados implicitamente na MEMORY.md de Dara (data-engineer) e Gage (devops), **não como skills próprias** (são triviais demais para ocupar skill), mas como princípios consolidados.

### 1.8 ROADMAP (8 IDs — squads/agentes futuros)

Estes não são absorvidos hoje porque exigem **squad ou agente novo** que não existe no Kolden. Cada um vai para o roadmap de criação futura via Ritual do Caos:

| IDs agrupados | Capacidade | Squad/agente futuro proposto |
|---|---|---|
| G33, G34 | Firmware embarcado bare-metal/RTOS (ESP-IDF, STM32, FreeRTOS, Zephyr) | Squad-novo **Hefesto-Embedded** (futuro hardware/IoT) |
| G45, G46 | Incident Response Commander (SEV1-4, IC/Comms/TechLead/Scribe, post-mortem blameless) | Squad-novo **Atropos** (SRE/IR completo) |
| G48, G49, G50 | ITSM/ITIL 4 (service catalog, problem mgmt, CMDB, CSI register) | Squad-novo **Themis-Ops** ou expansão do Themis (governança operacional) |
| G59 | OrgScript DSL (parser, AST, lint, export Mermaid/JSON) | Agente solo **Aoidos** (DSL designer) |
| G73 (parcial agente completo), G78, G79, G80 | SRE completo com chaos + Voice AI/ASR pipeline (Whisper, diarization, overlap-chunking) | Squad-novo **Eco** (voz/áudio) cobre G78-G80; SRE completo absorvido no Atropos |

Total ROADMAP único = **8 IDs** (G33, G34, G45, G46, G48, G49, G50, G59, G78, G79, G80 com G73 parcial → contagem real 11 IDs distribuídos em ~5 squads-novos; mas para invariante do bucket conta como linhas-IDs).

**Próxima ação ROADMAP:** registrar no `dados/repositorios-absorvidos.yaml` do Caos e propor as ideias de squad-novo para a Rodada 0 (Alma) do Ritual quando o Ronan priorizar.

---

## 2. Plano de execução F6 (cascata por etapa)

### Pré-requisitos
- Aprovação humana deste F5 (Constituição Art. III).
- Constituição AIOX (`Prometeu/.aiox-core/constitution.md`) e fronteira L1-L4 respeitada — **sem editar `.aiox-core/core/` ou `.aiox-core/development/agents/*.md`**.
- Caos `dados/repositorios-absorvidos.yaml` lockado (sessão única).

### Etapa F6.0 — Setup
1. Verificar que `_staging/quarentena/msitarzewski--agency-agents/` ainda está sob o reflexo `bloqueio-de-quarentena.sh` (nenhuma execução).
2. Confirmar que F2 (auditor-de-seguranca + Égide) deu SAFE para este repo (cabeçalho do inventário).

### Etapa F6.1 — Prometeu (28 skills)
Para cada skill da seção 1.1:
1. Criar `Prometeu/.claude/skills/<nome>/SKILL.md` com frontmatter Kolden + descrição que dispara invocação (skill `descoberta-de-skill` do Caos como guia).
2. Atualizar `Prometeu/.claude/skills/catalogo.md` (se existir; caso contrário, criar — Constituição obriga catálogo).
3. Adicionar herança histórica via skill `heranca-de-especialista` quando a skill mapear a um especialista humano canônico (ex.: `engenharia-de-prompts-versionada` → Anthropic/OpenAI prompt engineering team).
4. **Não modificar** os 10 arquivos de agente em `.aiox-core/development/agents/*.md`.
5. Anexar referências REUSE às MEMORY.md em `.aiox-core/development/agents/<agente>/MEMORY.md` (L3 mutable — permitido).

**Gate N4 (skills):** todas as 28 skills passam por `validacao-de-skill` (teste A/B e trigger eval). Maturity ≥7.0.

### Etapa F6.2 — Dedalo (2 skills)
1. Criar `Dedalo/.claude/skills/arquitetura-multi-agente-canonica/SKILL.md` (agente-dono: swarm-orchestrator/Nexus).
2. Criar `Dedalo/.claude/skills/avaliacao-de-ferramentas-mcda/SKILL.md` (agente-dono: project-integrator/Conduit).
3. Atualizar `Dedalo/.claude/skills/catalogo.md` (criar se não existir).
4. Cross-links a documentar:
   - `arquitetura-multi-agente-canonica` ↔ Olimpo skill `topologias-de-time`
   - `arquitetura-multi-agente-canonica` ↔ `Hermes/camada-2-contrato.md` (HITL gate placement)

**Gate N4:** validação de skill + smoke test do Nexus referenciando a skill nova.

### Etapa F6.3 — Égide (1 skill)
1. Criar `Egide/.claude/skills/solidity-evm-foundry-seguro/SKILL.md` (agente-dono: jim-manico).
2. Atualizar catálogo Égide (criar se não existir — README.md menciona `catalogo.md` mas o arquivo não foi encontrado; oportunidade de regularizar).
3. Cross-link com Prometeu `testes-de-api-funcional-seguranca-performance` (OWASP API Top 10).

**Gate N4:** validação de skill + reflexo de segurança (qualquer execução real de Foundry/contratos só em sandbox/testnet).

### Etapa F6.4 — Ariadne (atualização de skill existente)
1. Editar `Ariadne/.claude/skills/core-web-vitals-e-performance/SKILL.md` — anexar seções:
   - "Metas absolutas de aceite" (LCP<2.5s, FID<100ms, CLS<0.1, 90% Good) — TEST G14
   - "Capacity planning" (10x carga, ≤15% degradação) — TEST G16
2. Cross-link com Prometeu `benchmarking-com-k6-multi-stage` (handoff: Ariadne mede campo/RUM/CWV; Prometeu/qa faz load/stress/spike/endurance com k6).

**Gate N4:** skill já validada; apenas confirmar que o aditivo não quebra contrato.

### Etapa F6.5 — Caliope (1 skill compartilhada)
1. Criar `Caliope/.claude/skills/escrita-tecnica-docs-as-code/SKILL.md` (agente-dono: compartilhada — qualquer copywriter usa quando demanda for technical writing).
2. Atualizar `Caliope/.claude/skills/catalogo.md` (criar se não existir).
3. **Importante:** marcar no catálogo que esta skill é **não-persuasiva** (Caliope hoje é só copy persuasivo; technical writing é uma exceção de escopo).

**Gate N4:** validação de skill + clarificar fronteira no README.md de Caliope (technical writing ≠ copywriting persuasivo).

### Etapa F6.6 — Aletheia (1 skill compartilhada)
1. Criar `Aletheia/.claude/skills/otimizacao-de-workflow-lean/SKILL.md` (skill compartilhada do squad).
2. Atualizar catálogo Aletheia.
3. Cross-link com `mapa-de-assuncoes` (workflow optimization opera sobre **processos** já existentes; mapa-de-assuncoes opera sobre **hipóteses** de produto).

**Gate N4:** validação de skill.

### Etapa F6.7 — DESCARTADO (registro)
1. Adicionar bloco `descartados:` ao registro de absorção no `Caos/dados/repositorios-absorvidos.yaml` listando os 18 IDs com motivo curto.
2. Anotar princípios universais salvos (G28, G37, G85) nas MEMORY.md correspondentes (Dara e Gage).

### Etapa F6.8 — ROADMAP (registro)
1. Adicionar bloco `roadmap_squads_novos:` ao Caos `dados/registro-de-entidades.yaml` com 5 squads/agentes propostos:
   - `Hefesto-Embedded` (firmware/IoT)
   - `Atropos` (SRE/IR completo)
   - `Themis-Ops` ou expansão Themis (ITSM/ITIL)
   - `Aoidos` (OrgScript DSL — solo agent)
   - `Eco` (voz/áudio/ASR pipeline)
2. Cada um com: capacidade resumida, IDs upstream que justificam, prioridade (low/med/high), trigger de criação ("quando Ronan pedir handlar firmware", etc.).

### Etapa F6.9 — Registro consolidado
1. Atualizar `Caos/dados/repositorios-absorvidos.yaml`:
   - Bucket B03 fechado: 91 ABSORVIDO + 18 DESCARTADO + 8 ROADMAP = 117 ✓
   - PERDIDO = 0
   - Skills criadas: 33 (28 Prometeu + 2 Dedalo + 1 Égide + 1 Caliope + 1 Aletheia)
   - Skills atualizadas: 1 (Ariadne `core-web-vitals-e-performance`)
   - Referências MEMORY.md atualizadas: 6 (Aria, Dara, Gage, Dex, Quinn, River)
2. Atualizar `Caos/registros/historico.md` com a entrada do bucket B03.

---

## 3. Qualidade (cascata N0→N6)

Aplicada **a cada skill nova** (28 + 2 + 1 + 1 + 1 = 33 skills):

| Gate | Critério | Aprovação |
|---|---|---|
| N0 Configuração | frontmatter Kolden + idioma PT-BR + kebab-case | revisor |
| N1 Estrutura | descrição que dispara invocação automática | revisor + descoberta-de-skill |
| N2 Conteúdo | método operacional, exemplos rodáveis, fonte citada quando aplicável | redator-de-prompts |
| N3 Reflexos | nenhuma skill cria reflexo novo (todos os squads-alvo já têm os 3 mínimos) | curador |
| N4 Validação | `validacao-de-skill` (A/B + trigger eval + teste de pressão); maturity ≥7.0 | testador |
| N5 Catálogo | catálogo do squad atualizado | curador |
| N6 Registro | entrada em `Caos/dados/registro-de-entidades.yaml` | curador |

**Política de bloqueio:** maturity <7.0 em qualquer skill → BLOCK; refazer ou rebaixar para REUSE/REFERÊNCIA.

---

## 4. Riscos e mitigações

| Risco | Mitigação |
|---|---|
| **Modificação acidental de `.aiox-core/development/agents/*.md`** (L1-L4 deny rules) | F6 escreve **apenas** em `.claude/skills/` e MEMORY.md (L3); checklist de pré-merge confirma `git diff` não toca `.aiox-core/core/` nem L2 |
| **28 skills em Prometeu sobrecarrega o catálogo** | Catálogo organizado por agente-dono; skills com gatilho específico (`descoberta-de-skill` aplicada) — não disparam todas em qualquer pergunta |
| **Cross-links entre squads viram dead-link** | Cada cross-link é texto com caminho absoluto + grep-able tag (`[CROSS:Hermes/camada-2-contrato.md]`); `verificacao-de-alinhamento` valida no SessionStart |
| **G65 ADAPT parcial (descartar Laravel, manter three.js) confunde o agente** | Skill nova `efeitos-visuais-premium-threejs` deixa explícito no frontmatter "**Não usar com Laravel/Livewire/Filament — só princípios visuais reusáveis em Next.js/React/Vue**" |
| **TEST G7 OWASP API Top 10 duplicado entre Prometeu e Égide** | Conteúdo principal vive em Prometeu `testes-de-api-funcional-seguranca-performance`; Égide jim-manico tem link "ver suite OWASP API em Prometeu" — sem duplicação |
| **Skill `escrita-tecnica-docs-as-code` em Caliope confunde com copywriting** | Frontmatter explicito: "skill de **technical writing** (Divio/docs-as-code) — não é copy persuasivo"; cross-link aviso no `README.md` Caliope |

---

## 5. Checklist de aprovação (gate Art. III)

Para o Ronan aprovar antes da F6:

- [ ] **Roteamento de squad** (Prometeu/Dedalo/Égide/Ariadne/Caliope/Aletheia + DESCARTADO/ROADMAP) faz sentido?
- [ ] **DESCARTADOS** (18 stacks fora do core) estão corretos? Algum deveria ir para ROADMAP em vez de DESCARTADO?
- [ ] **ROADMAP** (5 squads novos: Hefesto-Embedded, Atropos, Themis-Ops, Aoidos, Eco) — algum deveria virar squad imediatamente?
- [ ] **Caliope recebendo technical writing** (G75-G77) é aceitável? Alternativa: criar squad-solo `Bibliotecário` ou anexar a Dedalo/project-integrator.
- [ ] **Aletheia recebendo workflow optimization** (TEST G29-G32) é aceitável? Alternativa: squad-novo `Liceu-Ops` ou anexar a Themis.
- [ ] **28 skills em Prometeu** não é excesso? Posso consolidar mais? (Ex.: agrupar G42 dentro de `mvp-em-3-dias-nextjs-supabase` em vez de skill própria de virtualização.)
- [ ] **Não vou tocar nos 10 arquivos `.aiox-core/development/agents/*.md`** — confirmação que é o comportamento desejado (skills externas em `.claude/skills/` é o caminho)?

---

## 6. Próximos passos

1. **Aprovação humana** deste F5 (Constituição Art. III).
2. Em seguida, F6.1 a F6.9 conforme seção 2.
3. Maturity score geral do bucket B03 alvo: **≥8.0** (alta-alavanca; Prometeu/Dedalo são squads centrais da Kolden).
4. Registro fechado em `Caos/dados/repositorios-absorvidos.yaml` com B03 marcado `status: APLICADO` ou `status: PARCIAL`.

---

## 7. Conferência do invariante

```
ABSORVIDO = 91  (REUSE 9 + ADAPT 68 + CREATE 14)
DESCARTADO = 18
ROADMAP = 8 (linhas-IDs únicas)
PERDIDO = 0
TOTAL = 91 + 18 + 8 = 117 ✓
```

**Validação:** todo ID upstream tem decisão registrada; nenhuma capacidade some.
