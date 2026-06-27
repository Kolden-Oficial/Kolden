# Mapa de decisão — gsd-build--get-shit-done (F4)

Comparação de cada capacidade contra o registro de entidades e os squads existentes. Viés da missão autônoma: na ausência de match limpo item-a-item, preferir **ADAPT/CREATE** a REUSE. Squads de engenharia/spec já existentes: **prometeu** (eng/spec-driven, depende de dedalo), **dedalo** (claude code/eng de agentes), **egide** (segurança), **argos** (pesquisa), **harmonia** (ux/ui), **metis** (analytics), **aletheia** (discovery), **liceu** (mentes). Atenção: **Dike** (verificador solo) e o Olimpo/Hermes já cobrem parte da camada de verificação/contrato.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | ADAPT | prometeu | planner goal-backward (plans-as-prompts, ondas) refina o pipeline spec-driven do Prometeu; sem agente planner equivalente nomeado no registro |
| G2 | ADAPT | prometeu | executor com commit atômico por tarefa + checkpoints + SUMMARY/STATE é a etapa de execução que o Prometeu não detalha nesse rigor |
| G3 | ADAPT | prometeu | verificação adversarial goal-backward complementa a Dike (que reconcilia contra contrato); aqui é verificação técnica de fase — Prometeu/Dike absorvem a postura FORCE |
| G4 | ADAPT | prometeu | gate de convergência de plano (plan-checker) entra como skill de revisão pré-execução |
| G5 | ADAPT | dedalo | depuração por thinking-models + gestor de sessão de debug vira skill do squad de engenharia de agentes/código |
| G6 | ADAPT | dedalo | revisor/corretor de código complementa o ciclo de code-review (já há /code-review nativo; aqui é o agente dedicado) |
| G7 | ADAPT | egide | auditor de segurança de fase (secure-phase) reforça o SAST do Egide |
| G8 | ADAPT | argos | cluster de pesquisa (domínio/projeto/síntese) entra como técnicas no motor de pesquisa do Argos |
| G9 | ADAPT | dedalo | mapeamento de codebase/padrões (scout) é capacidade de engenharia de código |
| G10 | ADAPT | harmonia | auditoria/pesquisa de UI + sketch/brand alimentam o squad de UX/UI |
| G11 | CREATE | prometeu (skill nova) ou metis | avaliação de IA (eval planner/auditor) não tem equivalente nomeado; vira skill de ai-evals (ancorar em prometeu; medições → metis) |
| G12 | ADAPT | prometeu | auditor de cobertura/amostragem (Nyquist) entra como checklist de qualidade de verificação |
| G13 | ADAPT | aletheia | análise de premissas é discovery/validação — encaixa no funil do Aletheia |
| G14 | ADAPT | aletheia | perfilamento de usuário/persona por questionário pertence ao discovery |
| G15 | ADAPT | dedalo | pipeline de docs (classifier/synthesizer/verifier/writer + motor de conflito) p/ docs técnicas; (escrita editorial geral → caliope se necessário) |
| G16 | ADAPT | prometeu | roadmapper + seletor de framework + verificador de integração reforçam o planejamento de produto/arquitetura |
| G17 | ADAPT | prometeu | o ciclo de vida de fase com gates é o coração spec-driven — fundir com o pipeline existente do Prometeu |
| G18 | ADAPT | prometeu | modos spec/ultraplan/mvp dão profundidade variável ao planejamento do Prometeu |
| G19 | ADAPT | prometeu | discuss-phase + questioning + thinking-partner = descoberta colaborativa antes do plano |
| G20 | ADAPT | prometeu | estrutura projeto/milestone/roadmap/workspaces organiza entregas multi-fase |
| G21 | ADAPT | prometeu | graphify (grafo de dependências de fases) é ferramenta de planejamento; vendorizar a lib + auto-update |
| G22 | ADAPT | prometeu | modos de autonomia (autonomous/fast/quick) calibram supervisão — alinha com gates humanos do Caos |
| G23 | ADAPT | dedalo | captura de backlog (inbox/thread/note) é gestão de trabalho de engenharia |
| G24 | ADAPT | dedalo | loops de aprendizado (forensics/extract-learnings/retrospective) convergem com o ritual-de-encerramento da Kolden |
| G25 | ADAPT | harmonia | sketch/spike (prototipagem com tema/variantes) p/ UX; spike técnico → dedalo |
| G26 | ADAPT | prometeu | metodologia goal-backward (padrões/overrides/human-verify) é o framework de verificação a absorver |
| G27 | CREATE | dedalo (referência) | suíte thinking-models por fase é meta-prompting reutilizável — vira biblioteca de referência (candidata ao Liceu indexar) |
| G28 | ADAPT | prometeu | SPIDR splitting + user-story-template + mvp-concepts = fatiamento de escopo no spec |
| G29 | ADAPT | prometeu | TDD orientado integra ao ciclo de execução/qualidade |
| G30 | ADAPT | dedalo | bancos de antipadrões/bugs comuns viram referência de qualidade de engenharia |
| G31 | CREATE | dedalo (skill nova) | context engineering (orçamento + truncação/compactação) é capacidade ausente e valiosa; vira skill própria de gestão de contexto |
| G32 | ADAPT | prometeu | protocolo de gates/checkpoints reforça os gates por fase da Constituição do Caos |
| G33 | ADAPT | dedalo | roteamento multi-runtime/modelo (Claude/Gemini/Codex/OpenCode) alinha com a stack vendor-agnóstica da Kolden |
| G34 | ADAPT | egide | reflexo anti-injeção em escrita complementa os reflexos de segurança |
| G35 | ADAPT | egide | scanner de injeção na leitura que sobrevive à compactação é técnica NOVEL — alto valor p/ Egide (e relevante à própria absorção de dado hostil) |
| G36 | ADAPT | dedalo | guarda suave de workflow é reflexo de disciplina de processo |
| G37 | ADAPT | dedalo | monitor de utilização de contexto + statusline é observabilidade de sessão (par do G31) |
| G38 | ADAPT | dedalo | reflexos de estado (validate-commit/phase-boundary/session-state) reforçam disciplina de commit/fase |
| G39 | ADAPT | prometeu | motor CLI de estado (gsd-tools/SDK) é a infra que sustenta o pipeline; vendorizar como ferramenta de apoio (não reescrever inteiro) |
| G40 | ADAPT | egide | engine de scan estático (segredos/base64/injeção) reforça o SAST do Egide e a própria pipeline de absorção do Caos |

## Síntese

- **Decisão dominante: ADAPT** (34 de 40), com **CREATE** em 3 (G11 ai-evals, G27 thinking-models como referência, G31 context engineering como skill nova) e **0 REUSE** — nenhum match item-a-item limpo justificou REUSE; "já temos o domínio" (eng/spec) não basta.
- **Concentração de alvos:** **prometeu** (núcleo spec-driven: ciclo de fase, planner/executor/verifier, splitting, gates) e **dedalo** (engenharia de agentes Claude Code: debug, docs, context-eng, reflexos, multi-runtime). Secundários: **egide** (4 capacidades de segurança/injeção), **argos** (pesquisa), **harmonia** (UI), **aletheia** (discovery), **metis** (evals/medição).
- **Ressalvas de absorção:** (1) repo MIT **arquivado** — preferir checar o sucessor open-gsd/gsd-core antes de vendorizar o SDK; (2) absorver **prompts/agentes/métodos reescritos em PT-BR**, NÃO o código compilado nem `node_modules`; (3) cuidado com sobreposição direta com **Dike/Olimpo/Hermes** na camada de verificação/contrato — a verificação técnica de fase (GSD) é complementar, não substituta, do verificador de contrato (Dike).
