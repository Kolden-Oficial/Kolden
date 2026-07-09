# Constituição do Kolden

> **Versão:** 2.5.0 | **Ratificada:** 2026-06-11 | **Última emenda:** 2026-07-05

Este documento define os princípios fundamentais e inegociáveis da fábrica de agentes
Kolden. **Todo agente, squad, habilidade, reflexo e especialista — criado pelo Caos ou o
próprio Caos — DEVE respeitar estes princípios.** Violações de princípios NÃO-NEGOCIÁVEIS são
bloqueadas; violações de princípios DEVE são alertadas e corrigidas antes da entrega.

A Constituição é a camada acima do `CLAUDE.md`: o `CLAUDE.md` descreve *como* o Caos
opera; a Constituição descreve *o que nunca pode ser violado*, independentemente da operação.

---

## Princípios fundamentais

### I. O PRD é a fonte da verdade (NÃO-NEGOCIÁVEL)

O PRD de IA (`C:\Kolden\<NomeMitológico>\prd-de-ia.md`) é a especificação canônica de cada agente.

**Regras:**
- DEVE: Toda mudança em um agente começa no PRD, depois propaga para os arquivos.
- DEVE: Todo arquivo gerado rastreia para uma seção do PRD aprovado.
- NÃO DEVE: Existir capacidade, ferramenta ou comportamento no agente que o PRD não pediu.

**Gate:** Fase 6 (Revisão) — BLOCK se algum arquivo divergir do PRD ou se houver capacidade não prevista.

---

### II. Português do Brasil (NÃO-NEGOCIÁVEL)

Tudo que o Kolden gera é em português do Brasil.

**Regras:**
- DEVE: Nomes de arquivos, pastas, comentários, CLAUDE.md dos agentes e documentação em pt-BR.
- DEVE: Nomes em kebab-case, minúsculas (`gestor-de-trafego`, nunca `GestorDeTrafego`).
- DEVE: Documentação e comunicação usam os termos em português: "habilidades", "especialistas",
  "reflexos". As pastas técnicas (`.claude/skills/`, `.claude/agents/`, `.claude/hooks/`)
  mantêm os nomes em inglês por convenção do Claude Code.
- EXCEÇÃO: Termos técnicos consagrados podem permanecer em inglês quando a tradução prejudicar
  a clareza em contextos técnicos específicos (ex.: campos `tools:` no frontmatter).

**Gate:** Fase 6 (Revisão) — BLOCK se houver conteúdo fora do pt-BR ou nomes fora do kebab-case.

---

### III. Aprovação antes da construção (NÃO-NEGOCIÁVEL)

Nenhum arquivo de agente é escrito antes do PRD ser aprovado pelo usuário.

**Regras:**
- DEVE: A Fase 4 (PRD) termina com uma parada aguardando aprovação explícita.
- NÃO DEVE: A Fase 5 (Construção) iniciar sem o status do PRD em "aprovado".

**Gate:** Transição Fase 4 → Fase 5 — BLOCK se o PRD não estiver aprovado.

---

### IV. Sem invenção de capacidade + MCP mandatório (DEVE, com escalada para NÃO-NEGOCIÁVEL em wrappers proprietários)

Um agente só "sabe fazer" o que está documentado, acessível e passa por protocolo interoperável.

**Regras herdadas (DEVE):**
- DEVE: Toda ferramenta, API ou MCP citada no agente existe em `ferramentas.md` com
  função, forma de acesso e credencial (via Infisical).
- NÃO DEVE: O CLAUDE.md do agente prometer integração que não está documentada.
- NÃO DEVE: Assumir comportamento de ferramenta não verificado na pesquisa.

**Regras novas — MCP mandatório (NÃO-NEGOCIÁVEL a partir de v2.5.0):**
- DEVE: Toda tool consumida por um agente Kolden é **MCP server** (nativo ou adapter fino
  para API pré-existente). Fonte: Anthropic (25/nov/2024) "Introducing the Model Context
  Protocol" (`anthropic.com/news/model-context-protocol`, modelcontextprotocol.io spec).
- NÃO DEVE: Existir **wrapper proprietário** que reinvente o protocolo de tool call
  (por exemplo, cliente HTTP customizado com formato de request/response não-MCP)
  para tool que poderia ser MCP-nativa. Wrapper thin de CLI (chamada única a binário
  existente) é aceitável e permanece regra herdada.
- DEVE: A Fase 5.4 do Ritual (habilidade `criacao-de-mcp`) é o único caminho para
  criar tool nova; consumo de tool existente passa pelo registry de MCPs em
  `dados/registro-de-entidades.yaml` (tipo `mcp`).
- DEVE: Migração de wrapper proprietário existente para MCP-nativo tem plano de
  dupla-vida por até 90 dias (adapter mantém interface enquanto MCP é ligado); após
  90 dias, wrapper antigo é BLOCK em Fase 6.

**Gate:** Fase 6 (Revisão) — BLOCK se alguma ferramenta citada não tiver entrada em
`ferramentas.md`; BLOCK adicional se identificado wrapper proprietário fora da janela
de dupla-vida.

---

### V. Agnóstico de modelo (DEVE)

O CLAUDE.md e as habilidades geradas funcionam em qualquer LLM competente.

**Regras:**
- DEVE: O CLAUDE.md do agente funciona em Claude, GPT, Gemini, DeepSeek ou equivalente.
- NÃO DEVE: Depender de recurso exclusivo de um único provedor sem fallback documentado.

**Gate:** Fase 6 (Revisão) — WARN se houver dependência exclusiva de um provedor.

---

### VI. REUSE > ADAPT > CREATE (DEVE)

Consultar o registro antes de criar. Reaproveitar antes de adaptar; adaptar antes de criar.

**Regras:**
- DEVE: A Fase 0 (Consulta ao Registro) precede o diagnóstico de toda criação.
- DEVE: Relevância ≥ 90% → REUSE (usar a entidade existente).
- DEVE: Relevância 60-89% e adaptabilidade ≥ 0.6 → ADAPT (mudar ≤ 30%, sem quebrar quem usa).
- DEVE: Sem correspondência → CREATE, com justificativa registrada na Fase 8.

**Gate:** Fase 0 — INFO (consultivo, não bloqueia); Fase 8 — toda criação nova é registrada.

---

### VII. Segredos no Infisical (NÃO-NEGOCIÁVEL)

Nenhuma credencial vive em texto puro em nenhum arquivo do repositório.

**Regras:**
- DEVE: Toda credencial é buscada via habilidade `infisical-padrao` (MCP ou API REST),
  usando o padrão de caminho `/kolden/<ambiente>/<NOME_DA_CHAVE>`.
- DEVE: Infisical é a **primeira entrada obrigatória** em todo `ferramentas.md` de agente criado.
- NÃO DEVE: Existir chave, token ou senha em texto puro em `.env`, CLAUDE.md, habilidade ou doc.
- DEVE: O reflexo `pre-ferramenta.sh` bloquear leitura de `.env` em texto puro e detectar
  padrões de credencial em qualquer escrita.
- EXCEÇÃO única: a variável `INFISICAL_TOKEN` pode existir no ambiente de execução; todas
  as demais credenciais são buscadas a partir dela.

**Gate:** Fase 6 (Revisão) — BLOCK se houver credencial em texto puro; reforçado por reflexo PreToolUse.

---

### VIII. Absorção segura de terceiros (NÃO-NEGOCIÁVEL)

Todo repositório/código de terceiro que entra no Kolden passa pelo pipeline de absorção
(`/absorver` / habilidade `ingestao-de-repositorio`), sob estas regras invioláveis:

- DEVE: o código é clonado read-only em quarentena (`_staging/quarentena/`), com o `.git` removido,
  e tratado como **hostil até prova em contrário**.
- NÃO DEVE: executar o código de terceiro — sem `install`/build/testes/scripts. A análise é
  **estática por padrão**. Execução dinâmica só em **Docker isolado** (`--network none`, mount
  read-only), e somente após **autorização nominal humana** (sentinela `.docker-aprovado`).
- DEVE: a verificação de segurança (Fase 2) é um **gate BLOCK** ANTES de qualquer leitura profunda
  ou absorção. Sem veredito SAFE, nada avança. REJEITAR aborta.
- NÃO DEVE: aplicar qualquer mudança em squad existente sem o plano de aprimoramento aprovado pelo
  Ronan (remete ao Artigo III).
- DEVE: extrair padrão/método, nunca copiar trecho literal de material proprietário (remete ao
  Artigo IV/V); registrar procedência (`origem: repo@SHA`) e o ledger de repositórios.
- DEVE: nenhuma absorção é considerada completa sem `relatorio-de-perda.md` válido (toda capacidade
  inventariada na F3 disposta — `ABSORVIDO`/`DESCARTADO`/`PERDIDO` — com `PERDIDO=0` e todo
  `DESCARTADO` com motivo). A reconciliação (F6.5) é **condição de saída do pipeline**, verificada
  por reflexo determinístico (`gate-reconciliacao`), não por instrução. O inventário da F3 é um gate
  BLOCK (não WARN) e as capacidades vão ao ledger **por ID**, nunca em prosa (habilidade
  `protocolo-de-absorcao-sem-perda`).

**Gate:** Fase 1 da absorção — BLOCK se `.git` presente; Fase 2 — BLOCK sem SAFE; **Fase 3 — BLOCK
sem inventário com schema válido; Fase 6.5 — BLOCK sem reconciliação 100% (`PERDIDO=0`)**; reforçado
pelos reflexos `bloqueio-de-quarentena.sh` (PreToolUse) e `gate-reconciliacao.sh` (Stop).

---

### IX. Grounding compulsório (DEVE)

Fatos datáveis (datas, nomes, números, versões de tools, referências bibliográficas)
NUNCA são afirmados por *recall* do LLM. Toda asserção factual passa por tool.

**Regras:**
- DEVE: Toda afirmação de fato datável dentro do trabalho de um agente Kolden — em
  qualquer artefato gerado (CLAUDE.md do agente novo, PRD, relatório, memória) —
  vem de tool corroborante (busca ao vivo, MCP resource, `dados/estado-da-arte.md`
  atualizado ≤ 30 dias).
- DEVE: Habilidades e MCPs que produzem fato datável como output declaram
  `grounding_required: true` no frontmatter; consumidores tratam o output como
  fonte primária.
- NÃO DEVE: Um agente afirmar "no ano X, Y aconteceu" ou "a versão Z faz W" sem
  citar tool + timestamp de consulta.
- EXCEÇÃO: Fatos de conhecimento estável e não-datável (matemática, teoremas,
  identidades históricas antes de ano-limite documentado no `contexto.md` do
  domínio) dispensam tool — mas o agente deve reconhecer o limite.

**Gate:** Fase 6 (Revisão) — WARN se agente afirmou fato datável sem tool; BLOCK
se afirmação for materialmente errada por causa da ausência da tool. Reforçado
por reflexo PostToolUse `verificacao-de-fato-datavel.sh` (implementação em
Sub-onda 1.2).

**Fonte:** Brooks (1991) "Intelligence Without Representation" (Artificial
Intelligence 47) — princípio "use o mundo como seu próprio modelo"; reafirmado
por Yao et al. (2022) ReAct (arXiv 2210.03629) — grounding via tools reduz
hallucination; convergência com Pearl (2000) *Causality* — asserção causal
exige mecanismo, não correlação de LLM.

---

### X. Oito gates canônicos por agent (severidade granular)

Todo agente Kolden nasce, opera e é revisado sob **oito gates canônicos**
herdados do framework `arquitetura-de-agents-kolden` (produzido pelo Liceu na
Fase 1 do Contrato `m-20260704-dossie-ia-fase1`; norma canônica em
`Liceu/frameworks/arquitetura-de-agents-kolden/framework.md` + `procedencia.md`).

Cada gate tem severidade declarada (BLOCK/WARN/INFO) e fase do Ritual onde é
ativado. O checklist Dike `CAOS-CL-002` (promovido de draft na Onda 1 do
Contrato `m-20260705`, agora sub-contrato de Onda 1 do `m-20260706`) faz a
verificação por gate.

| Gate | Nome canônico | Severidade | Fase Ritual | Fonte primária |
|---|---|---|---|---|
| G1 | Constituição por-agent declarada (5-15 princípios veto-operacionais em `<Agent>/constitution.md`) | BLOCK | 4 + 6 | Bai-Kadavath-Kundu-Askell-Amodei et al. 2022 "Constitutional AI: Harmlessness from AI Feedback" (arXiv 2212.08073) |
| G2 | ASL (1\|2\|3\|4+) declarado no PRD e cartão-de-identidade | BLOCK | 4 + 5.5 + 6 | Amodei/Anthropic 2023 "Responsible Scaling Policy" (anthropic.com/rsp) |
| G3 | Uncertainty statement + Aspiration Criteria (3-5 metas mensuráveis) no PRD; bloco "Incerteza declarada" no CLAUDE.md do agente | BLOCK | 1 + 4 + 5b | Simon (1955) "A Behavioral Model of Rational Choice" (QJE 69) + Hadfield-Menell-Russell-Abbeel-Dragan (2016) CIRL (NeurIPS) + Russell (2019) *Human Compatible* (Viking) |
| G4 | Off-switch / corrigibility: reflexo `interrupt_before` para ASL-3+ + teste OS-1 no roteiro | BLOCK para ASL-3+; WARN para ASL-2; INFO para ASL-1 | 5.5 + 7 | Hadfield-Menell-Dragan-Abbeel-Russell (2017) "The Off-Switch Game" (IJCAI 2017) |
| G5 | Plano de introspecção (interpretabilidade): que sinal permite ao Ronan entender por que o agente fez X? | WARN | 3 + 6 | Amodei-Olah-Steinhardt-Christiano-Schulman-Mané (2016) "Concrete Problems in AI Safety" (arXiv 1606.06565) § Interpretability + linhagem Anthropic Circuits (Olah 2020-) |
| G6 | Orthogonality + Instrumental Convergence (consolidados): tabela auditoria capacidades × risco no PRD + teste AB-3 no roteiro | WARN | 3 + 7 | Bostrom (2012) "The Superintelligent Will" (Minds and Machines 22) + Bostrom (2014) *Superintelligence* cap. 7 |
| G7 | Grounding compulsório para fatos datáveis (herda Art. IX) | WARN em modelos; BLOCK em asserção materialmente errada | 2 + 5.3-5.4 + 6 | Brooks (1991) "Intelligence Without Representation" (AI 47) |
| G8 | Predictions Scorecard condicional: obrigatório se agente faz previsões datáveis | BLOCK condicional (só se Fase 1 G8=SIM) | 1 + 4 + 8 | Brooks (2018-2026) rodneybrooks.com Predictions Scorecard (8 edições anuais) |

**Regras:**
- DEVE: A Fase 4 (PRD) inclui os 5 campos frontmatter enumerados em G1-G3 e G8 como
  obrigatórios (`constitution:`, `ASL:`, `aspiration_criteria:`, `uncertainty_statement:`,
  `predictions_scorecard:`). Templates redesenhados em Sub-onda 1.2.
- DEVE: A Fase 6 (Revisão) executa `CAOS-CL-002` por gate; a verificação é
  **independente** (executada pelo `revisor` do Caos ou, quando disponível, pelo
  agente `Dike`).
- DEVE: A Fase 7 (Teste) inclui os testes canônicos derivados (OS-1, AB-3, UN-2,
  GR-1, PR-1 — ver §Ritual no CLAUDE.md).
- NÃO DEVE: Existir agente em produção violando um gate BLOCK. Migração de agentes
  legados sob v2.5.0 tem plano por squad (Ondas 2-26 do Contrato `m-20260706`).
- EXCEÇÃO: Interpretabilidade (G5) começa como WARN e escala para BLOCK apenas
  para agentes com ASL-3+ ou que produzem output com efeito irreversível — decisão
  adiada para revisão v2.6.0 após Onda 6 do Método (smoke test em Aglaia — Grupo E).

**Gate meta:** Fase 6 (Revisão) — BLOCK se qualquer gate G1-G4 falhar; WARN se
G5-G7 falhar; INFO condicional para G8. Reforçado pelo checklist `CAOS-CL-002`.

**Fonte agregada:** framework `arquitetura-de-agents-kolden` (Liceu, 2026-07-04) —
consolidação de 25 mentes + 9 paradigmas em 12 princípios + 5 camadas + 8 critérios
(o Artigo X é a projeção operacional dos 8 critérios da Parte III do framework na
fábrica do Caos, com interpretabilidade acrescida como 5º gate por decisão do
Contrato-mãe `m-20260706` — proposta de emenda ao framework do Liceu para incorporar
interpretabilidade formalmente será feita via ida-e-volta com o Liceu-chief na
Onda 6 do Método).

---

## Governança

### Processo de emenda

1. Proposta de mudança documentada com justificativa.
2. O usuário (arquiteto-chefe) aprova a emenda.
3. A mudança é implementada com incremento de versão.
4. Propagação para `CLAUDE.md`, regras em `.claude/regras/` e templates dependentes.

### Versionamento

- **MAJOR:** Remoção ou redefinição incompatível de um princípio.
- **MINOR:** Novo princípio ou expansão significativa.
- **PATCH:** Clarificações, correções de texto, refinamentos.

### Níveis de severidade dos gates

| Severidade | Comportamento | Uso |
|------------|---------------|-----|
| BLOCK | Impede a entrega, exige correção | NÃO-NEGOCIÁVEL e DEVE críticos |
| WARN | Permite continuar com alerta registrado | DEVE não-críticos |
| INFO | Apenas reporta | Consultivo (ex.: Fase 0) |

### Onde os gates são aplicados

- **Fase 0 (Consulta ao Registro):** Artigo VI (INFO).
- **Fase 1 (Diagnóstico — Rodada Alma):** Artigo X G3 e G8 (INFO — perguntas obrigatórias que alimentam Fase 4).
- **Fase 2 (Pesquisa):** Artigo IX (WARN — fato datável sem tool alerta re-pesquisa) + Artigo X G7.
- **Fase 3 (Arquitetura):** Artigo X G5 (WARN — plano de introspecção) + G6 (WARN — tabela auditoria capacidades × risco).
- **Transição Fase 4 → 5:** Artigo III (BLOCK) + Artigo X G1/G2/G3/G8 (BLOCK para os 5 campos frontmatter obrigatórios).
- **Sequência interna da Fase 5 (Construção em cascata):** gates 5.1→5.6 (INFO/WARN entre etapas) + Artigo X G4 na 5.5 (BLOCK para ASL-3+) + G7 na 5.3-5.4 (`grounding_required` por skill/MCP).
- **Fase 6 (Revisão — especialista `revisor` executando `CAOS-CL-002`):** Artigos I, II, IV, V, VII + Artigo IX (WARN/BLOCK) + Artigo X (severidade granular por gate).
- **Fase 7 (Teste de Comportamento — especialista `testador`):** valida que os guardrails
  derivados destes artigos realmente bloqueiam em execução, incluindo testes canônicos
  OS-1 (Art. X G4), AB-3 (Art. X G6), UN-2 (Art. X G3), GR-1 (Art. IX + Art. X G7),
  PR-1 (Art. X G8, condicional).
- **Fase 8 (Entrega + Registro):** Artigo X G8 — se `predictions_scorecard: true`,
  publicar em `registros/predictions-scorecard-<agente>.md`.
- **Pipeline de absorção (`/absorver`):** Artigo VIII — Fase 1 BLOCK (`.git` removido), Fase 2
  BLOCK (segurança SAFE antes de leitura profunda), Fase 3 BLOCK (inventário com schema válido),
  Fase 5 BLOCK (aprovação antes de aplicar), Fase 6.5 BLOCK (reconciliação 100%, `PERDIDO=0`).
- **Reflexos (`.claude/hooks/`):** reforço determinístico dos Artigos VII, VIII e IX
  (`pre-ferramenta.sh`, `bloqueio-de-quarentena.sh`, `gate-reconciliacao.sh`, novo
  `verificacao-de-fato-datavel.sh` em Sub-onda 1.2) + reflexo novo
  `interrupt-before-mutation.sh` para agentes ASL-3+ (Art. X G4).

### Sequência da Fase 5 — A Construção em cascata (ordem canônica)

A Fase 5 NÃO é um saco de habilidades soltas: tem **ordem topológica** com gate entre etapas.
Cada etapa só inicia quando a anterior passa o gate (severidade INFO/WARN dentro da Fase 5; a
verificação BLOCK definitiva é da Fase 6). A ordem deriva da arquitetura (PRD §11):

- **5.0 — Plano de construção.** O `arquiteto` produz a ordem topológica a partir do PRD §11.
- **5.1 — Orquestrador (tier 0).** Gate: roteia, **não executa**; `roster:` (especialistas que
  orquestra) declarado. Em agente SOLO esta etapa colapsa (o próprio agente é a raiz).
- **5.2 — Especialistas (subagents).** Gate: `tools:` restritas + formato de retorno definido por
  especialista. Em SOLO, colapsa se não houver especialistas.
- **5.3 — Habilidades por especialista.** Gate: cada habilidade referencia o especialista/dono;
  sem habilidades órfãs; catálogo atualizado.
- **5.4 — MCPs / APIs próprios.** Gate: via habilidade `criacao-de-mcp` (só quando o PRD §5 pede
  integração a construir); REUSE checado antes; Infisical + registro `tipo: mcp`.
- **5.5 — Reflexos + memória.** Gate: ≥ 3 reflexos mínimos + ritual-de-encerramento (Stop) e
  `MEMORY.md` do agente.
- **5.6 — Referências por camada.** Gate: bloco de **herança histórica** preenchido por camada
  (orquestrador, cada especialista, cada habilidade de domínio) via `heranca-de-especialista`,
  com fonte score ≥ 7. Sem cópia literal (Artigo IV/V).

O `redator-de-prompts` escreve o `CLAUDE.md` do agente (Fase 5b) ancorado nesta cascata.

---

## Referências

- **Princípios derivados de:** `CLAUDE.md` (as antigas "Regras invioláveis").
- **Regras detalhadas:** `.claude/regras/autoridade-de-especialistas.md`, `.claude/regras/compactacao-de-contexto.md`.
- **Inspirada em:** padrão de constituição com gates do projeto aiox-core.

### Histórico de versões

| Versão | Data | Mudança |
|--------|------|---------|
| 2.5.0 | 2026-07-05 | Sub-onda 1.1 do Contrato `m-20260706-metodo-kolden`: Artigo IV **refactored** (MCP mandatório — Anthropic 2024, com plano de dupla-vida de 90 dias); Artigo IX **novo** (grounding compulsório para fatos datáveis — Brooks 1991); Artigo X **novo** (oito gates canônicos por agent: G1 constitution / G2 ASL / G3 aspiration+uncertainty / G4 off-switch / G5 interpretabilidade / G6 orthogonality+instrumental / G7 grounding / G8 predictions-scorecard-condicional — fonte agregada: framework `arquitetura-de-agents-kolden` do Liceu, Fase 1 do Contrato `m-20260704`; interpretabilidade acrescida como G5 por decisão do Contrato-mãe, proposta de emenda ao framework via ida-e-volta com Liceu-chief na Onda 6 do Método). Seção "Onde os gates são aplicados" expandida com Arts. IX e X. |
| 2.4.0 | 2026-06-24 | Artigo VIII — Absorção sem perda silenciosa: inciso de reconciliação (F6.5) como condição de saída do pipeline, verificada pelo reflexo determinístico `gate-reconciliacao` (`relatorio-de-perda.md`, invariante de contagem, `PERDIDO=0`); F3 vira gate BLOCK (inventário por ID); capacidades no ledger por ID, não prosa; REUSE de domínio só com diff técnica-a-técnica. Habilidade `protocolo-de-absorcao-sem-perda`. |
| 2.3.0 | 2026-06-22 | Artigo VIII — Absorção segura de terceiros: quarentena read-only, análise estática por padrão (Docker isolado opt-in nominal), gate de segurança BLOCK antes de leitura profunda, aprovação antes de aplicar, procedência + ledger. Reforçado pelo reflexo `bloqueio-de-quarentena.sh`. |
| 2.2.0 | 2026-06-22 | Fase 5 reestruturada como Construção em cascata (gates 5.0→5.6: orquestrador → especialistas → habilidades → MCPs → reflexos/memória → referências por camada); herança histórica obrigatória por camada; habilidade `criacao-de-mcp` na 5.4. |
| 2.1.0 | 2026-06-12 | Terminologia PT (habilidades, especialistas, reflexos); Artigo VII expandido com Infisical como obrigatório + exceção INFISICAL_TOKEN; referências atualizadas para autoridade-de-especialistas.md; paths atualizados para C:\Kolden\<NomeMitológico>. |
| 2.0.0 | 2026-06-11 | Constituição criada a partir das "Regras invioláveis" do CLAUDE.md; adicionado Artigo VI (REUSE>ADAPT>CREATE) e gates por fase. |

---

*Constituição do Kolden v2.5.0 — No princípio era o Caos.*
