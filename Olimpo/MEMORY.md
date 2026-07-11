# Memória do Squad Olimpo (C-Level / Executivos)

> Memória persistente do squad. Atualizada pelo Ritual de Encerramento. Não reescrever do zero —
> apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este squad -->

### Identidade e modelo de negócio (absorção do Drive 2026-06-25)
- Identidade jurídica: CNPJ 44.106.838/0001-30, regime MEI/SIMEI, sede Vespasiano/MG, foro de eleição comarca de Vespasiano. Fonte: `sobre-a-empresa/operacao/juridico-e-compliance.md`. | 2026-06-25
- ⚠️ INCONSISTÊNCIA a resolver: o contrato-modelo grafa "Kolden S.A." enquanto o registro fiscal é MEI. Revisar tipo societário antes de usar contrato com cliente. | 2026-06-25
- Modelo de negócio documentado: "Assessoria de Performance 360º" (5 linhas: tráfego/social/gestão comercial/IA/dados) + lançamento/mentoria/infoproduto; board de 5 sócios. Detalhe em `areas/receita.md` e `mercado-e-posicionamento/ofertas-e-produtos.md`. | 2026-06-25
- Lacuna estratégica: Kolden ainda SEM RH estruturado, SEM metas formais, SEM atas de decisão centralizadas (áreas 01 Produtos / 04 RH / Reuniões do Drive quase vazias). | 2026-06-25

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->

### Capacidades ROADMAP (B08 finance / msitarzewski-agency-agents@a597cb6)

- **M&A operacional para Plutos (CFO)** — Modelagem de aquisição (accretion/dilution, sinergia, pro forma), screening de targets, modelos de earn-out, integração financeira pós-aquisição. | Origem: G11 do upstream agency-agents | Detectado: 2026-06-29
  - **Gatilho de promoção:** primeira aquisição/parceria real (canal, criador, operação adjacente) — quando Kolden olhar para inorgânico, criar skill `m-e-a-operacional` no Plutos.
  - **Estado atual:** sem demanda imediata. Não criar skill agora.

- **Due Diligence financeira para Plutos (CFO)** — Checklist de DD financeira (qualidade de earnings, working capital normalization, EBITDA ajustado, contingências, cap table), com handoffs Egide (DD legal/security) e Argos (DD de mercado/concorrência). | Origem: G21 do upstream agency-agents | Detectado: 2026-06-29
  - **Gatilho de promoção:** mesma janela de M&A (G11). DD distribuída cross-squad: financeira = Plutos; legal/security = Egide; mercado = Argos.
  - **Estado atual:** sem demanda imediata. Não criar skill agora.

**Por que ROADMAP e não DESCARTADO:** M&A e DD são capacidades plausíveis para Kolden em horizonte 12-24M. Marcá-las como esquecidas é arriscado; marcá-las como candidatas com gatilho explícito preserva o aprendizado sem inflar o squad agora.

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->

### Padrões Onda 4 do METODO Kolden (2026-07-09)

- **Regra distinção 3-way MEMORY canonizada (E4 do METODO v1.1, 2ª confirmação empírica):**
  - `Olimpo/MEMORY.md` (este arquivo) — squad-level (padrões estruturais do squad; identidade jurídica Kolden + Candidatos a Promoção M&A + Onda 4)
  - `Olimpo/agent-memory/olimpo.md` — agent-chief-level (padrões técnicos de execução do Zeus como orquestrador — decompor + rotear + arbitrar + consolidar)
  - `Olimpo/agent-memory/{afrodite,plutos,+6 outros}.md` — agent-especialista-level por-executivo (afrodite + plutos já existem; padrão dos 6 outros deuses estabelecido)
  - **Precedente:** Prometeu Sub-onda 3.2 canonizou o pattern 3-way. Olimpo é 2ª confirmação → canoniza em v1.2 §5 se Ronan aprovar Q5 do gate humano. | 2026-07-09

- **INVÓLUCRO sobre MUTAÇÃO — 5ª aplicação empírica (regra E1 canonizada METODO v1.1):**
  - Vendor xquads-squads preservado 1:1: 8 agents + 7 tasks + 2 workflows + 2 dados + 1 checklist + 1 config + 2 PRDs por-agent + `_origem.md`.
  - Camada Kolden envelopa via 9 CREATE + 4 UPDATE (CLAUDE.md + prd-de-ia.md + constitution.md + ferramentas.md + roteiro-de-teste.md + .claude/agents/olimpo-chief.md + .claude/reflexos/interrupt-before-mutation.sh + .claude/settings.json + agent-memory/olimpo.md; UPDATEs em squad.yaml + MEMORY.md + README.md + catalogo.md).
  - Fronteira declarada em ≥5 pontos: CLAUDE.md §Fronteira + squad.yaml.fronteira_vendor_xquads + ferramentas.md §3 + roteiro-de-teste §Fronteira + settings.json permissions.deny. | 2026-07-09

- **Camada 3-4 combinada como caso NOVO canônico (candidato emenda METODO §3 v1.2):**
  - Olimpo é o primeiro squad Kolden com Camada 3 (Zeus decompõe) + Camada 4 (7 executivos traduzem) dentro do mesmo squad. Hermes é Camada 2 pura; Prometeu é Camada 5; Grupo C (Aletheia/Argos/Liceu) é Camada 5. Nenhum outro caso multi-camada até aqui.
  - Q5 opcional do gate humano decide se emenda METODO §3 v1.2 canoniza a categoria OU se registra apenas em §11 como caso especial documentado. | 2026-07-09

- **Regra E6 co-existência de vetos (canonizada METODO v1.1):**
  - Constituição do squad (15 princípios veto-operacionais Kolden agent-safety em `constitution.md`) co-existe com os 6 vetos operacionais em `squad.yaml` L46-53 (`decisao_sem_premissa`, `arbitragem_sem_escalada`, `framework_apresentado_como_lei`, `promessa_de_resultado`, `bypass_de_contrato_de_missao`, `credencial_texto_puro`).
  - Em conflito, **Kolden Art. X prevalece** (constitution.md é norma canônica externa; os 6 vetos ficam como camada operacional de execução do vendor). Mesmo padrão de Prometeu 3.1 (AIOX Constitution × Kolden Art. X). | 2026-07-09

- **Papel Dike temporário pelo executor da Onda — 10ª ocorrência consecutiva:**
  - Baseline Dike executada pelo olimpo-chief sob 3 salvaguardas (ordem serial + evidência textual verbatim + divergências declaradas). Dike delta INDEPENDENTE via subagente Explore isolado com `git log --oneline -5` no prompt (aprendizado Sub-onda 3.3).
  - Padrão transitório aceitável até Onda 5 (Grupo B) quando Dike nasce como agent-funcional via Contrato próprio (`m-2026MMDD-nascimento-dike`). | 2026-07-09
