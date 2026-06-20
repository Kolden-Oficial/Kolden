# Constituição do Kolden

> **Versão:** 2.1.0 | **Ratificada:** 2026-06-11 | **Última emenda:** 2026-06-12

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

### IV. Sem invenção de capacidade (DEVE)

Um agente só "sabe fazer" o que está documentado e acessível.

**Regras:**
- DEVE: Toda ferramenta, API ou MCP citada no agente existe em `ferramentas.md` com
  função, forma de acesso e credencial (via Infisical).
- NÃO DEVE: O CLAUDE.md do agente prometer integração que não está documentada.
- NÃO DEVE: Assumir comportamento de ferramenta não verificado na pesquisa.

**Gate:** Fase 6 (Revisão) — BLOCK se alguma ferramenta citada não tiver entrada em `ferramentas.md`.

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
- **Transição Fase 4 → 5:** Artigo III (BLOCK).
- **Fase 6 (Revisão — especialista `revisor`):** Artigos I, II, IV, V, VII.
- **Fase 7 (Teste de Comportamento — especialista `testador`):** valida que os guardrails
  derivados destes artigos realmente bloqueiam em execução.
- **Reflexos (`.claude/hooks/`):** reforço determinístico do Artigo VII.

---

## Referências

- **Princípios derivados de:** `CLAUDE.md` (as antigas "Regras invioláveis").
- **Regras detalhadas:** `.claude/regras/autoridade-de-especialistas.md`, `.claude/regras/compactacao-de-contexto.md`.
- **Inspirada em:** padrão de constituição com gates do projeto aiox-core.

### Histórico de versões

| Versão | Data | Mudança |
|--------|------|---------|
| 2.1.0 | 2026-06-12 | Terminologia PT (habilidades, especialistas, reflexos); Artigo VII expandido com Infisical como obrigatório + exceção INFISICAL_TOKEN; referências atualizadas para autoridade-de-especialistas.md; paths atualizados para C:\Kolden\<NomeMitológico>. |
| 2.0.0 | 2026-06-11 | Constituição criada a partir das "Regras invioláveis" do CLAUDE.md; adicionado Artigo VI (REUSE>ADAPT>CREATE) e gates por fase. |

---

*Constituição do Kolden v2.1.0 — No princípio era o Caos.*
