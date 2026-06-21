# Instalação — Argos

Como colocar o squad de inteligência de mercado & scraping em produção.

> Argos tem cem olhos, mas só conta o que tem **fonte, data e segunda fonte**. A instalação segue a
> mesma disciplina: nada de credencial em texto puro, zona cinza só com aprovação humana.

---

## 1. Pré-requisitos

- **Projeto Claude Code independente.** Abrir `C:\Kolden\Argos\` no Claude Code já ativa a identidade
  (lê `CLAUDE.md` automaticamente). É o modo de uso primário.
- **Git Bash** disponível — os reflexos em `.claude/reflexos/` são scripts `.sh`.
- **Python 3.11+** (com `venv`) — necessário para o **motor de scraping** vendorizado
  (Scrapling / Scrapy / GPT-Researcher) e para o `argos-engine.py`.
- **Node.js 18+** (com `npm`) — necessário para o **Crawlee** (JS pesado / multi-browser) dentro do `motor/`.
- **Acesso ao Infisical** (projeto Kolden) — toda credencial é resolvida em runtime. Sem isto, só rodam
  as ferramentas nativas/MCP que já têm chave configurada no ambiente.
- **(Opcional) Runtime Hermes** (`C:\Kolden\Hermes`) — só se você quiser invocar o Argos via WhatsApp/
  Telegram, cron ou pela ponte `invoca-squad.ps1`. Para uso direto no Claude Code, não é necessário.

---

## 2. Segredos no Infisical (Art. VII — nunca em texto puro)

Todas as chaves vêm do Infisical. Use a habilidade compartilhada `infisical-padrao`. **Nenhuma chave
neste documento** — só os nomes/paths.

### 2.1 Path principal — `/kolden/argos`

Chaves que o squad **pode** precisar (provisione só as que for usar; o squad tenta as tools nativas/MCP
do Hermes antes de cair no motor — Restrição 5):

| Chave (sugerida)        | Usada por                    | Para quê |
|-------------------------|------------------------------|----------|
| `EXA_API_KEY`           | research-synthesizer         | Busca/descoberta web citada |
| `FIRECRAWL_API_KEY`     | web-harvester, serp-seo      | Scrape/crawl/extract gerenciado |
| `TAVILY_API_KEY`        | research-synthesizer         | Busca/extração de pesquisa |
| `APOLLO_API_KEY`        | market-sizer, competitor     | Sizing bottom-up (empresas/contatos) |
| `XAI_API_KEY`           | social-x                     | `x_search` (X/Twitter via xAI, zona verde) |
| `YOUTUBE_DATA_API_KEY`  | social-youtube               | Métricas públicas de canais/vídeos |

> Provisione **apenas o aplicável** ao escopo da pesquisa. Tudo que não for usado fica de fora.

### 2.2 Path da zona cinza — `/kolden/argos/cinza/*` (segregado)

Contas e proxies **descartáveis** para o `modulo-cinza/`, gerenciados **exclusivamente** pelo
`compliance-sentinela`. Path separado para isolar risco de ToS do resto do squad:

| Chave (sugerida)             | Plataforma | Observação |
|------------------------------|------------|------------|
| `cinza/x/SESSION`            | X/Twitter  | conta descartável (twscrape) |
| `cinza/instagram/SESSION`    | Instagram  | conta descartável (instaloader) |
| `cinza/tiktok/SESSION`       | TikTok     | conta descartável |
| `cinza/proxy/URL`            | (geral)    | proxy rotativo descartável |

Regras inegociáveis da zona cinza:
- Contas e proxies aqui são **descartáveis** — nunca uma conta real da Kolden.
- Só o `compliance-sentinela` lê/usa estas chaves, e só após **aprovação humana explícita na sessão**
  (Restrição 2 / veto `zona_cinza_sem_autorizacao`).

---

## 3. Vendorizar o motor (Fase 5e da Construção)

O motor (`motor/`) e o módulo cinza (`modulo-cinza/`) ainda **não estão materializados** — são alvos a
serem criados. A procedência (repos + licenças) está em **`_origem.md`**; o passo detalhado, a tabela de
commits/SHA e o `argos-engine.py` (orquestrador local do motor) **vêm da Fase 5e** do Ritual. Resumo
operacional:

1. **Clonar em `_staging`** (área temporária do workspace) os repos listados em `_origem.md`:
   - Motor: `D4Vinci/Scrapling`, `scrapy/scrapy`, `assafelovic/gpt-researcher`, `apify/crawlee`,
     `Skyvern-AI/skyvern`.
   - Módulo cinza: `vladkens/twscrape`, `instaloader/instaloader`, TikTok (a definir).
2. **Normalizar para `motor/`** (e os de ToS-risco para `modulo-cinza/`): copiar a cópia local
   controlada e **registrar repo + commit SHA + data do clone** em `_origem.md` (preencher as colunas
   pendentes). É vendorização (cópia controlada), não dependência viva.
3. **Instalar deps Python** num venv isolado do motor:
   ```bash
   cd C:/Kolden/Argos/motor
   python -m venv .venv
   source .venv/Scripts/activate        # Git Bash no Windows
   pip install -r requirements.txt      # gerado na Fase 5e a partir dos repos
   ```
4. **Instalar deps Node (Crawlee)**:
   ```bash
   cd C:/Kolden/Argos/motor/crawlee     # subpasta do componente Node
   npm install
   ```
5. **Conferir o `argos-engine.py`** — o entrypoint que o `web-harvester` chama para acionar o motor.
   Detalhes (interface, flags, fallback de fetcher) saem da Fase 5e.

> **AGPL (Skyvern):** uso interno apenas. Revisar implicações antes de qualquer distribuição externa
> (ver `_origem.md`).

---

## 4. Registrar o squad no Hermes

Para o Hermes rotear pedidos ao Argos, adicione a entrada `argos` em
**`C:\Kolden\Hermes\squads-catalog.yaml`**. Argos é `tipo: claude-code` (subagente nativo `@argos-chief`)
e `muda_algo: true` (zona cinza e cron de monitoramento mudam o mundo — exigem aprovação humana).

Bloco a colar no fim de `squads:`:

```yaml
  - squad: argos
    nome: "Argos — Inteligência de Mercado & Scraping (o que tudo vê)"
    dir: C:/Kolden/Argos
    tipo: claude-code
    chief_file: "agents/argos-chief.md"
    keywords:
      - pesquisa de mercado
      - market research
      - inteligência competitiva
      - concorrente
      - concorrência
      - benchmark
      - scraping
      - raspagem
      - crawler
      - extrair links
      - tam
      - sam
      - som
      - tamanho de mercado
      - sizing
      - tendências
      - ad library
      - biblioteca de anúncios
      - anúncios
      - orgânico
      - pago
      - seo
      - serp
      - backlinks
      - instagram
      - tiktok
      - youtube
      - linkedin
      - twitter
      - facebook
      - reddit
      - dossiê
      - osint
    muda_algo: true   # zona cinza, conta/proxy descartável, cron de monitoramento → aprovação
```

> O parser do `invoca-squad.ps1` é mínimo (PS 5.1, sem YAML nativo): mantenha a indentação de 2 espaços
> e `dir:`/`tipo:`/`chief_file:` no nível do item. `dir` com **barras normais** (`C:/Kolden/Argos`).

---

## 5. Ativação

### 5.1 Direto no Claude Code (uso primário)

Abrir `C:\Kolden\Argos\` no Claude Code e falar com o orquestrador:

```
@argos faz uma pesquisa de mercado de cursos de inglês online no Brasil
```

Ou rodar a jornada completa (escopo → sizing → SERP/links → redes → pago → consolidação → síntese):

```
@argos *journey "<mercado ou concorrente a investigar>"
```

Você também pode chamar um especialista direto: `@argos:competitor-mapper`, `@argos:ads-intel`, etc.

### 5.2 Via Hermes (WhatsApp / cron / headless)

Depois de registrado no catálogo (passo 4):

```powershell
powershell -File C:\Kolden\Hermes\scripts\invoca-squad.ps1 -Squad argos -Prompt "Quais anúncios o concorrente X está rodando?"
```

Use `-DryRun` para inspecionar o prompt de ativação resolvido sem executar, e `-Model <provider:model>`
para trocar o LLM (OpenRouter). O script roda `claude -p` no diretório do squad e devolve a resposta no
stdout — o gateway do Hermes entrega no WhatsApp.

---

## 6. Operações que exigem aprovação humana (`muda_algo: true`)

Argos é uma camada de **inteligência** — a maior parte do trabalho é leitura/descoberta. Mas três
classes de operação **mudam o mundo** e **exigem confirmação humana explícita na sessão** antes de
executar:

1. **Zona cinza (`modulo-cinza/`)** — qualquer scraping autenticado de rede social. HALT até o
   `compliance-sentinela` classificar a operação e o humano aprovar (veto `zona_cinza_sem_autorizacao`,
   reflexo `pre-ferramenta.sh`).
2. **Conta/proxy descartável** — criar, usar ou rotacionar credenciais em `/kolden/argos/cinza/*`. Só
   pelo `compliance-sentinela`, só com OK humano.
3. **Cron de monitoramento recorrente** — agendar uma varredura/vigilância contínua no Hermes (Argos é
   "vigilância onipresente", mas agendar consumo recorrente de fontes é uma ação que muda algo).
   Confirmar escopo, frequência e fontes antes de criar o agendamento.

Nenhuma destas roda no automático. O orquestrador para e pergunta.

---

## 7. Verificação pós-instalação (smoke tests)

Rode os smoke tests de **`roteiro-de-teste.md`** (maturity score) para confirmar o go-live. Cobertura
mínima esperada:

1. **Identidade** — abrir o projeto e confirmar que o Argos assume a persona (cem olhos, gate de
   confiabilidade) ao receber `@argos`.
2. **Roteamento** — um pedido por keyword cai no especialista certo (ex.: "extrai os links do site X" →
   `web-harvester`; "tamanho desse mercado" → `market-sizer`).
3. **Gate de proveniência** — pedir um relatório e confirmar que **todo dado-fato sai com fonte +
   timestamp**; dado sem origem é rebaixado a "não confirmado" (veto `nada_sem_proveniencia`,
   checklist ARGOS-CL-001).
4. **Veto da zona cinza** — pedir scraping autenticado e confirmar **HALT** + escalonamento ao
   `compliance-sentinela` (sem aprovação, não prossegue).
5. **Cross-check** — confirmar que número-chave exige ≥2 fontes ou recebe rótulo "fonte única".
6. **Hermes (se registrado)** — `invoca-squad.ps1 -Squad argos -DryRun -Prompt "teste"` resolve o
   chief e monta a ativação sem erro.
7. **Ritual de Encerramento** — ao fechar a sessão, o reflexo `encerramento-aprendizado.sh` dispara e
   grava uma lição no `MEMORY.md`.

Passou em todos? Argos está em produção.

---

## 8. Registro

Após o go-live, registrar o squad em `C:\Kolden\Caos\dados\registro-de-entidades.yaml` e indexar em
`C:\Kolden\AGENTS.md` (REUSE > ADAPT > CREATE). Procedência dos repos vendorizados em `_origem.md`.
