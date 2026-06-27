---
name: descoberta-de-skill
description: Use ao escrever ou revisar a `description` e o frontmatter de qualquer habilidade do Kolden, ou quando uma habilidade existe mas não está sendo invocada na hora certa (dispara cedo demais, tarde demais ou nunca). Também ao montar o roteamento de uma suíte de habilidades por gatilho.
---

# Descoberta de habilidade (SDO)

Uma habilidade só vale se o agente a **encontra na hora certa**. Esta habilidade trata a
*descoberta* como engenharia: o que entra na `description`, como nomear, como disparar por
frase-gatilho e como carregar contexto em camadas. É o complemento de `criacao-de-skill`
(que cuida do CORPO da habilidade); aqui o foco é a **superfície de invocação**.

## Lei de ferro do SDO: a `description` diz SÓ QUANDO usar — nunca o workflow

A `description` é lida pelo modelo para decidir *se carrega a habilidade agora*. Se ela
**resumir o processo**, o agente segue o resumo e **pula o corpo da habilidade**.

> Caso real (superpowers): uma `description` dizia "code review entre tarefas". O agente fez
> UMA revisão, embora o corpo exigisse DUAS (conformidade de spec, depois qualidade). Trocada
> para apenas "Use ao executar planos de implementação com tarefas independentes" (sem resumir
> o fluxo), o agente leu o fluxograma e cumpriu as duas revisões.

Regras:
- Comece com **"Use ao/quando…"** e descreva **gatilhos, sintomas e situações** — não etapas.
- Descreva o **problema** (condição de corrida, comportamento inconsistente), não o sintoma
  preso a uma tecnologia (`setTimeout`, `sleep`) — salvo se a habilidade for específica daquela
  tecnologia, e então torne isso explícito no gatilho.
- Terceira pessoa (vai injetada no system prompt). 1–1024 chars.
- **NUNCA** resuma o processo/passo-a-passo na `description`.

```yaml
# RUIM — resume o fluxo; o agente segue isto e ignora o corpo
description: Use ao executar planos — despacha um subagente por tarefa com revisão entre tarefas
# RUIM — detalhe de processo demais
description: Use para TDD — escreva o teste antes, veja falhar, código mínimo, refatore
# BOM — só condição de disparo
description: Use ao executar planos de implementação com tarefas independentes na sessão atual
# BOM — específica de tecnologia, com gatilho explícito
description: Use ao lidar com redirecionamentos de autenticação no React Router
```

## Cobertura de palavras-gatilho (keywords)
Inclua as palavras que o agente (ou o usuário) buscaria:
- **Mensagens de erro**: "hook timed out", "ENOTEMPTY", "race condition".
- **Sintomas**: "flaky", "travando", "zumbi", "poluição de contexto".
- **Sinônimos**: timeout/trava/congela; limpeza/teardown/afterEach.
- **Ferramentas**: comandos reais, nomes de lib, tipos de arquivo.

Gatilho "pushy" (harness): o Claude é conservador para invocar habilidades. Se a habilidade é
subutilizada, **endureça** a `description` com frases de follow-up que o usuário diria ("revisa
de novo", "agora valida") — sem cair em resumir o workflow.

## Nomeação descritiva (verbo primeiro)
Voz ativa, verbo na frente: `criando-skills` (não `skill-creation`),
`espera-por-condicao` (não `helpers-de-teste-async`). O `name` deve ser **igual ao diretório**,
1–64 chars, `a-z0-9-`, sem `--` nem hífen na borda.

## Economia de token (crítico)
Habilidades de uso frequente entram em TODA conversa — cada token conta.
- Workflows de "getting-started": < 150 palavras cada.
- Habilidades carregadas com frequência: < 200 palavras no total.
- Demais: < 500 linhas; o que passar disso vai para `references/` (carga sob demanda).
- Mova detalhe de flags para o `--help` da ferramenta, não para o SKILL.md.

## Auto-invocação por gatilho e carga em camadas (preamble-tier)
Padrão herdado do gstack para suítes de habilidades. Detalhes e schema em
**`references/gatilhos-e-camadas.md`**. Em resumo:
- **`triggers:`** no frontmatter — lista de frases que **auto-invocam** a habilidade
  ("brainstorma isso", "vale construir?"). Complementa a `description`.
- **`preamble-tier:`** — em que **camada** o texto da habilidade entra no contexto: um *router*
  raiz carregado sempre (tier baixo) aponta para habilidades pesadas carregadas só quando o
  gatilho casa (tier alto). Evita despejar todas as habilidades no contexto de uma vez.
- **Router de suíte**: uma habilidade-índice (ex.: o `catalogo.md` do agente, ou um SKILL raiz)
  roteia por trigger/tier — é o ponto único de descoberta da suíte.

## Memória de descoberta: context_queries
Também do gstack: uma habilidade pode declarar **`context_queries`** que, no momento da carga,
**injetam contexto de sessões anteriores** (últimos N planos do mesmo repo, perfil do usuário,
histórico de design) por filtro/glob/sort. Assim a habilidade "lembra" sem o agente reconstruir
tudo. Na Kolden, ancore essas consultas no `MEMORY.md` do agente e no "cérebro"
`sobre-a-empresa/` — ver `references/gatilhos-e-camadas.md`. Não duplique o
`ritual-de-encerramento` (que é o canal oficial de aprendizado); `context_queries` é só a
*leitura* desse acervo no load.

## Checklist de descoberta (gate)
- [ ] `description` começa com "Use ao/quando" e **não** resume o workflow.
- [ ] `name` = diretório, kebab-case válido, verbo-primeiro.
- [ ] Keywords de erro/sintoma/sinônimo presentes.
- [ ] Habilidade pesada → corpo < 500 linhas, detalhe em `references/`.
- [ ] Se for suíte: `triggers`/router definidos; nada de carregar tudo no tier base.
- [ ] Valide o disparo com **trigger eval** (ver `validacao-de-skill`).

## Habilidades relacionadas
- Corpo, anatomia e frontmatter base da habilidade: `criacao-de-skill`.
- Medir se a habilidade *muda comportamento* e validar os gatilhos por eval: `validacao-de-skill`.
- Criar o agente/squad dono da habilidade: `criacao-de-subagent`, `criacao-de-squad`.

---
*Fontes absorvidas (princípio extraído e reescrito em PT-BR, sem cópia literal):
`obra--superpowers@896224c4` — SDO em `skills/writing-skills/SKILL.md` (MIT, Jesse Vincent);
`garrytan--gstack@11de390` — `triggers`/`preamble-tier`/`context_queries` e router de suíte
(MIT, © 2026 Garry Tan). Uso interno Kolden.*
