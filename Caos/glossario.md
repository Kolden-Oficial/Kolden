---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/leia-me|leia-me]]"
---

# Glossário do Kolden

Termos e conceitos usados no Caos e em todo agente criado pelo Kolden.
Para contexto operacional completo, consulte `CLAUDE.md` e `constituicao.md`.

---

**Blueprint**
Resultado da Fase 3 (Arquitetura). Documento que define a topologia do agente (solo vs squad),
as 5 camadas de um agente solo (memória, habilidades, reflexos, especialistas, distribuição)
ou os tiers de um squad (tier 0 orquestrador + tier 1 especialistas). Produzido pelo especialista `arquiteto`.

---

**Caos**
O meta-agente do Kolden. Vazio primordial do qual todos os agentes nascem — assim como na
mitologia grega o Caos precedeu todos os deuses. Sua única função é transformar uma ideia
vaga em um agente completo, documentado e pronto para operar, conduzindo o Ritual de Criação.

---

**Constituição**
O documento `constituicao.md`, camada acima do `CLAUDE.md`. Define 7 artigos invioláveis
que todo agente, squad, habilidade, reflexo e especialista do Kolden deve respeitar.
Em conflito com o `CLAUDE.md`, a Constituição vence sempre. Atual: v2.1.0.

---

**Especialistas**
Agentes internos do Caos com contexto isolado e autoridade exclusiva por fase.
Ficam em `.claude/agents/`. Exemplos: `diagnosticador` (Fase 1), `arquiteto` (Fase 3),
`revisor` (Fase 6), `testador` (Fase 7), `curador` (Fases 0 e 8).
Nos agentes criados são chamados de "especialistas internos" do agente.

---

**Estado da arte**
Retrato vivo do ecossistema de IA (modelos, MCPs, ferramentas, comunidade, GitHub),
armazenado em `dados/estado-da-arte.md` e sobrescrito a cada varredura do `vigia`.
É a primeira fonte que o especialista `pesquisador` consulta na Fase 2, antes de qualquer busca ao vivo.

---

**Faculdades do Ser**
As 7 dimensões do diagnóstico de um agente, inspecionadas uma por vez nas 7 rodadas:
1. **Alma** — propósito, problema, público e nome mitológico
2. **Caráter** — tom de voz, princípios, reação a erro e fora-de-escopo
3. **Mente** — hard skills, tarefas executadas, especialistas internos necessários
4. **Memória** — o que persiste entre sessões e onde vive
5. **Corpo** — ferramentas, APIs, MCPs, integrações e guardrails
6. **Consciência** — modos de falha / pré-morte e mitigações
7. **Sociedade** — quem usa, como ativa, como entrega e como evolui

---

**Gate**
Verificação obrigatória que bloqueia (BLOCK), alerta (WARN) ou informa (INFO) antes de
avançar de fase. Definidos na Constituição por artigo. Exemplo: transição Fase 4 → 5
exige PRD aprovado (BLOCK se não estiver).

---

**Habilidades**
Módulos reutilizáveis de conhecimento ou execução, invocados automaticamente pelo
description no frontmatter. Ficam em `.claude/skills/`. O Caos tem 11 habilidades;
cada agente criado recebe as próprias. Disparadas por palavras-chave no contexto — sem
comando explícito do usuário.

---

**KPIs do Caos**
Indicadores que medem se uma criação foi bem-sucedida: maturity score ≥7.0, ritual
completo, PRD com 12 seções + §10 de modos de falha, taxa de reuso ≥1 por criação,
zero invenção de capacidade, zero credencial em texto puro. Consultados pelo curador na Fase 8.

---

**Maturity score**
Nota de 0 a 10 atribuída pelo especialista `testador` na Fase 7, após smoke tests e
testes adversariais derivados dos modos de falha do PRD. Gate obrigatório: ≥7.0 para
avançar para a Fase 8 (Entrega). Score <7.0 exige correção antes de entregar.

---

**Modo de falha / pré-morte**
Cenário de ruptura do agente — o que pode dar errado, o que dispara, quem é afetado,
como se detecta e como se mitiga. Levantados na Rodada 5 (Consciência) do diagnóstico
e rastreados de ponta a ponta: o §10 do PRD documenta, o §11 define a mitigação arquitetural,
o revisor confirma que existe e o testador cria teste adversarial para cada um.

---

**Nome mitológico**
Identificador único do agente, extraído da mitologia grega, escolhido na Rodada 0 (Alma)
do diagnóstico. O Caos propõe exatamente 3 opções com justificativa semântica; o usuário
escolhe. O nome escolhido é usado em todos os documentos, arquivos e diretórios do agente.
Candidatos por domínio em `.claude/skills/diagnostico-de-agente/catalogo-de-mitologia.md`.

---

**Pontas soltas**
Inconsistências entre documentos de um agente — referências quebradas, ferramentas citadas
sem entrada em `ferramentas.md`, habilidades invocadas sem SKILL.md, PRD desatualizado.
Detectadas pela habilidade `verificacao-de-alinhamento`, que roda automaticamente no SessionStart
se passaram >24h desde a última verificação.

---

**PRD de IA**
O documento de requisitos formal de cada agente (`prd-de-ia.md`), gerado na Fase 4 pela
habilidade `geracao-de-prd` a partir do template `modelos/prd-de-ia.md`. Tem 12 seções:
missão, KPIs, persona, hard skills, ferramentas, memória, entradas/saídas, guardrails, jornada,
modos de falha, arquitetura e histórico. É a fonte da verdade do agente — toda mudança
começa aqui (Constituição, Art. I). Só avança para Fase 5 após aprovação explícita do usuário.

---

**Reflexos**
Scripts determinísticos (bash) que executam antes de tool use (PreToolUse), após escrita
(PostToolUse) ou no início de sessão (SessionStart). Ficam em `.claude/reflexos/` e são
configurados em `.claude/settings.json`. São guardrails absolutos: não dependem do julgamento
do modelo — executam sempre. Antipadrão: colocar proibição crítica só no prompt é WARN;
proibição crítica vira reflexo (BLOCK garantido).

---

**Registro de entidades**
Arquivo `dados/registro-de-entidades.yaml`: índice estruturado de tudo criado pelo Caos
(agentes, squads, habilidades, reflexos, especialistas). Consultado na Fase 0 para decidir
REUSE/ADAPT/CREATE; atualizado na Fase 8 pelo especialista `curador`.

---

**REUSE > ADAPT > CREATE**
Princípio de economia (Constituição, Art. VI) aplicado na Fase 0 (Consulta ao Registro):
relevância ≥90% → REUSE (usar entidade existente sem mudança);
60–89% e adaptabilidade ≥0.6 → ADAPT (mudar ≤30%, sem quebrar quem usa);
<60% → CREATE (criar novo, justificativa registrada na Fase 8).

---

**Ritual de Criação**
Fluxo obrigatório de 9 fases para criar qualquer agente ou squad. Nunca pode ser pulado.
Fases: 0 Consulta ao Registro → 1 Diagnóstico → 2 Pesquisa → 3 Arquitetura → 4 PRD de IA
→ 5 Construção → 6 Revisão → 7 Teste de Comportamento → 8 Entrega + Registro.

---

**Score do vigia**
Nota de 0 a 10 de relevância que o especialista `vigia` atribui a cada achado externo
(ferramenta, modelo, repo, artigo). Score ≥7 → vira referência consultável; ≥8 → salvo
automaticamente em `referencias/`. Score <7 → descartado.

---

**Solo vs squad**
Topologia definida pelo arquiteto na Fase 3:
**Solo** — um agente com 5 camadas internas (memória, habilidades, reflexos, especialistas, distribuição).
**Squad** — topologia recomendada quando há 3+ especializações distintas; tier 0 (orquestrador) roteia e sintetiza; tier 1 (especialistas) executa.

---

**Tenant**
Operação ou cliente com configuração própria do agente (idioma, mercado, voz de marca,
compliance, capabilities habilitadas). Conceito relevante para agentes multi-tenant como
o Copy Intelligence Agent — cada tenant usa o mesmo agente com identidade diferente.

---

**Tiers**
Camadas de autoridade em um squad:
**Tier 0** — orquestrador: recebe o pedido, roteia para especialistas tier 1, sintetiza respostas.
**Tier 1** — especialistas: executam tarefas específicas com contexto isolado; não se comunicam entre si diretamente.
