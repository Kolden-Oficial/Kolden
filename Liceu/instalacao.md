---
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
relacionado:
  - "[[Liceu/README|README]]"
---

# Instalação — Liceu

Como colocar o squad de Biblioteca de Mentes em produção.

> O Liceu disseca a fundo, mas só registra como **fato** o que tem fonte primária + ano; o resto é
> folclore, e folclore se rotula. A instalação segue a mesma disciplina: nada de credencial em texto
> puro, nenhuma mente movida/duplicada, encarnação só via Caos.

---

## 1. Pré-requisitos

- **Projeto Claude Code independente.** Abrir `C:\Kolden\Liceu\` no Claude Code já ativa a identidade
  (lê `CLAUDE.md` automaticamente). É o modo de uso primário.
- **Git Bash** disponível — os reflexos em `.claude/reflexos/` são scripts `.sh`.
- **Acesso ao Infisical** (projeto Kolden) — toda credencial de pesquisa é resolvida em runtime
  (`/kolden/liceu`). Sem isto, só rodam as tools nativas/MCP que já têm chave no ambiente.
- **(Sem motor próprio.)** O Liceu **não vendoriza motor de scraping** — não há venv/Node a montar aqui.
  Para fontes hostis/profundas, faz **handoff ao motor do Argos** (`C:\Kolden\Argos`), que tem o seu
  próprio ambiente. Garanta que o Argos esteja instalado se você espera escalar coletas difíceis.
- **(Opcional) Runtime Hermes** (`C:\Kolden\Hermes`) — só se quiser invocar o Liceu via WhatsApp/
  Telegram, cron ou pela ponte `invoca-squad.ps1`. Para uso direto no Claude Code, não é necessário.

---

## 2. Segredos no Infisical (Art. VII — nunca em texto puro)

Todas as chaves vêm do Infisical. Use a habilidade compartilhada `infisical-padrao`. **Nenhuma chave
neste documento** — só os nomes/paths. Path principal — `/kolden/liceu`:

| Chave (sugerida)        | Usada por                          | Para quê |
|-------------------------|------------------------------------|----------|
| `EXA_API_KEY`           | biografo, ceptico, genealogista    | Busca/fetch semântico de fontes primárias |
| `TAVILY_API_KEY`        | biografo, ceptico, cartografo      | Busca/crawl/extract de fontes citáveis |
| `FIRECRAWL_API_KEY`     | cartografo, lexicografo            | Scrape/crawl de obras e acervos |
| `OPENROUTER_API_KEY`    | `deep-research` / `tech-search`    | LLM das habilidades de pesquisa |

> Provisione **apenas o aplicável** ao escopo. O Liceu tenta as tools nativas do Hermes antes de cair
> nos MCPs (Restrição 6). O path `/kolden/argos` **não é do Liceu** — é resolvido pelo Argos quando uma
> coleta hostil é escalada por handoff; o Liceu nunca lê esse path.

---

## 3. (Sem vendorização de motor)

Diferente do Argos, o Liceu **não tem `motor/` nem `modulo-cinza/`** — não há repos a clonar, venv a
criar ou deps a instalar. A camada de coleta difícil é **REUSE do motor do Argos** por handoff. Isto é
deliberado (PRD §5, Restrição 6 do `CLAUDE.md`): o Liceu sistematiza conhecimento; não constrói
infraestrutura de scraping.

---

## 4. Registrar o squad no Hermes

Para o Hermes rotear pedidos ao Liceu, adicione a entrada `liceu` em
**`C:\Kolden\Hermes\squads-catalog.yaml`**. Liceu é `tipo: claude-code` (subagente nativo `@liceu-chief`)
e **`muda_algo: false`** — o squad só **lê e estrutura conhecimento** (dossiês, linhagens, frameworks,
índices). Não sobe nada, não publica, não cria agente sozinho: a única ação que muda o mundo
(encarnação) é **handoff ao Caos** com aprovação humana, que já tem seu próprio gate.

Bloco a colar no fim de `squads:`:

```yaml
  - squad: liceu
    nome: "Liceu — Biblioteca de Mentes (a escola de Aristóteles)"
    dir: C:/Kolden/Liceu
    tipo: claude-code
    chief_file: "agents/liceu-chief.md"
    keywords:
      - mente
      - dissecar
      - dissecação
      - especialista
      - pensador
      - gênio
      - linhagem
      - genealogia
      - framework
      - mental model
      - modelo mental
      - biblioteca de mentes
      - conhecimento
      - fato vs folclore
      - quem influenciou
      - herdou de
      - sistematizar
      - dossiê
      - encarnar
    muda_algo: false   # só lê e estrutura conhecimento; encarnação é handoff ao Caos (gate próprio)
```

> O parser do `invoca-squad.ps1` é mínimo (PS 5.1, sem YAML nativo): mantenha a indentação de 2 espaços
> e `dir:`/`tipo:`/`chief_file:` no nível do item. `dir` com **barras normais** (`C:/Kolden/Liceu`).

---

## 5. Ativação

### 5.1 Direto no Claude Code (uso primário)

Abrir `C:\Kolden\Liceu\` no Claude Code e falar com o orquestrador:

```
@liceu dissect "Ernest Dichter"
```

Ou rodar o pipeline completo de dissecação (registro → escopo → pesquisa citada → fato×folclore →
extração → linhagem → redação → indexação → gancho):

```
@liceu *journey "psicanálise aplicada ao consumo: Bernays, Dichter, Lacan, Jung, Gruen, Barthes"
```

Você também pode chamar um especialista direto: `@liceu:ceptico-verificador`, `@liceu:genealogista`, etc.

### 5.2 Via Hermes (WhatsApp / cron / headless)

Depois de registrado no catálogo (passo 4):

```powershell
powershell -File C:\Kolden\Hermes\scripts\invoca-squad.ps1 -Squad liceu -Prompt "Disseca a mente do Eugene Schwartz"
```

Use `-DryRun` para inspecionar o prompt de ativação resolvido sem executar, e `-Model <provider:model>`
para trocar o LLM (OpenRouter). O script roda `claude -p` no diretório do squad e devolve a resposta no
stdout — o gateway do Hermes entrega no WhatsApp.

---

## 6. Conferir reflexos e settings

Antes do go-live, conferir `.claude/settings.json` e os scripts em `.claude/reflexos/`:

1. **PreToolUse** — segurança + guardrail "fato sem fonte" (bloqueia afirmação factual gravada sem
   fonte primária na seção "Engenharia documentada").
2. **PostToolUse** — auditoria (grep de segredo) + marca-trabalho.
3. **SessionStart** — verificação diária de alinhamento.
4. **Stop** — `encerramento-aprendizado.sh` dispara o `ritual-de-encerramento` uma vez por sessão.

Garanta que os `.sh` têm permissão de execução e que os caminhos no `settings.json` apontam para a
fonte única dos reflexos compartilhados quando for o caso.

---

## 7. Verificação pós-instalação (smoke tests)

Rode os smoke tests de **`roteiro-de-teste.md`** (maturity score) para confirmar o go-live. Cobertura
mínima esperada:

1. **Índice federado** — toda mente indexada aponta para um arquivo que existe (dossiê ou persona de squad).
2. **Gate de candura** — dissecar uma mente e confirmar que fato sem fonte é rebaixado a folclore
   (ex.: "bolo + 1 ovo" NÃO entra como fato).
3. **Linhagem obrigatória** — nenhum dossiê sai sem `herdou_de`/`influenciou` ou "isolado" justificado.
4. **Procedência de framework** — todo framework sintetizado tem `procedencia.md`.
5. **Não-duplicação** — mente que já é agente num squad é enriquecida por referência, nunca recriada.
6. **Infisical** — `grep` retorna zero credencial literal; tudo aponta para `/kolden/liceu`.
7. **Ritual de Encerramento** — ao fechar a sessão, o reflexo `encerramento-aprendizado.sh` grava uma
   lição no `MEMORY.md`.

Passou em todos? Liceu está em produção.

---

## 8. Registro

Após o go-live, registrar o squad em `C:\Kolden\Caos\dados\registro-de-entidades.yaml` e indexar em
`C:\Kolden\AGENTS.md` (REUSE > ADAPT > CREATE).
