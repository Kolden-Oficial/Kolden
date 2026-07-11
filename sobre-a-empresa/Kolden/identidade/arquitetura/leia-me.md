---
id: arquitetura-visual
titulo: "Arquitetura visual da Kolden"
resumo: "Conjunto modular de 5 diagramas que respondem as perguntas-mãe sobre infra, agentes e fluxo de missão."
categoria: identidade
palavras-chave: [arquitetura, organograma, diagrama, drawio, excalidraw, infra, agentes]
status: vigente
atualizado-em: 2026-06-30
relacionados: [organograma, visao-geral, ds-cores, ds-tipografia]
tipo: nota
area: identidade
up: "[[sobre-a-empresa/Kolden/identidade/_MOC-identidade]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/areas/tecnologia|tecnologia]]"
  - "[[sobre-a-empresa/Kolden/identidade/organograma|organograma]]"
---

# Arquitetura visual da Kolden

Cinco diagramas, cada um respondendo uma pergunta-mãe. Editáveis nas extensões já instaladas — abra o `.excalidraw` no [Excalidraw Editor](https://marketplace.visualstudio.com/items?itemName=pomdtr.excalidraw-editor) e o `.drawio` no [Draw.io Integration](https://marketplace.visualstudio.com/items?itemName=hediet.vscode-drawio).

## Os 5 diagramas

| # | Pergunta | Arquivo | Ferramenta |
|---|---|---|---|
| 01 | Como um input do Ronan vira entrega? | [`01-visao-macro.excalidraw`](./01-visao-macro.excalidraw) · [SVG](./01-visao-macro.excalidraw.svg) | Excalidraw |
| 02 | Que squads existem e o que cada um faz? | [`02-mapa-de-squads.excalidraw`](./02-mapa-de-squads.excalidraw) · [SVG](./02-mapa-de-squads.excalidraw.svg) | Excalidraw |
| 03 | Que serviços rodam no WSL2 (Kolden OS)? | [`03-infra-kolden-os.drawio`](./03-infra-kolden-os.drawio) · [SVG](./03-infra-kolden-os.drawio.svg) | Draw.io |
| 04 | Como os agentes chegam ao Ronan/clientes? | [`04-runtime-hermes.drawio`](./04-runtime-hermes.drawio) · [SVG](./04-runtime-hermes.drawio.svg) | Draw.io |
| 05 | Como o Contrato de Missão flui? | [`05-fluxo-contrato-missao.drawio`](./05-fluxo-contrato-missao.drawio) · [SVG](./05-fluxo-contrato-missao.drawio.svg) | Draw.io |

## Convenções visuais

### Paleta (de `marca/design-system/02-tokens/tokens.json`)

| Token | HEX | Onde usar nos diagramas |
|---|---|---|
| `scarlet` | `#FF3D22` | Setas críticas (descida da intent), portões de aprovação, cor-sinal |
| `ink-950` | `#110E0F` | Fundo (`viewBackgroundColor` no Excalidraw) |
| `ink-900` | `#1A1617` | Cartões / containers |
| `ink-800` | `#241F20` | Superfície de input/destaque secundário |
| `ink-700` | `#332D2E` | Bordas sobre escuro |
| `ink-500` | `#6E6668` | Texto auxiliar / labels de apoio |
| `off-white` | `#E8E6F1` | Texto principal sobre ink |
| `white` | `#FFFFFF` | Títulos de impacto sobre ink/scarlet |

**Regra-âncora**: texto sobre scarlet usa **ink** (5.43:1, AA), nunca branco (3.53:1 só passa em texto large). Texto de leitura é off-white sobre ink (AAA).

### Tipografia

- **Lato** — texto, títulos, corpo. Stack: `"Lato", system-ui, sans-serif`.
- **Eurostile** — só etiquetas curtas (camadas, nomes de squad, contagens). Fallback web: `"Saira Semi Condensed", "Rajdhani", sans-serif`.
- O Excalidraw não embute fontes custom — usa o fallback do sistema. Os SVG exportados usam `font-family` declarada (renderiza Lato/Eurostile se a máquina tiver, fallback automático).

### Convenções de forma

| Sinal | Significado |
|---|---|
| Borda contínua | Squad maduro (`importado-cru`, `nascido-no-caos`) ou serviço em produção |
| Borda tracejada | Status `semente` (Nomos, Pactolo, Emporos, Hestia, Ananke, Cairos) ou item pendente (Postiz) |
| Seta scarlet (ponta fechada) | Descida — intent original do Ronan |
| Seta off-white (ponta aberta) | Subida — entrega verificada pela Dike |
| Losango | Gateway de decisão (BPMN) |
| Cilindro / hexágono | Storage (Postgres, Redis, RustFS, Infisical) |
| Caixa pontilhada externa | Boundary (WSL2, lobe-network, host process) |

## Como editar

1. Abra o `.excalidraw` ou `.drawio` no VS Code — a extensão renderiza embarcado.
2. Edite normalmente.
3. **Sempre re-exportar SVG ao salvar**:
   - Draw.io: `File → Export As → SVG`, marque **"Include a copy of my diagram"** (embarca XML, mantém editável).
   - Excalidraw: `Export → SVG`, marque **"Embed scene"** (preserva os elementos no SVG).
4. Faça commit dos dois arquivos juntos (fonte + SVG). O SVG dá preview no GitHub e abre em qualquer browser.

## Dados-fonte (não invente — consulte)

- **5 camadas + DoR + matriz de risco + Dike**: `Hermes/camada-2-contrato.md`
- **23 squads + 6 sementes + Caos + Prometeu**: `AGENTS.md`
- **Stack LobeHub (WSL)**: `CLAUDE.md` §3 (a stack não está versionada no checkout Windows — vive em `/home/kolden/kolden/lobehub/`)
- **Hermes runtime (gateways, dashboard)**: `Hermes/docker-compose.yml`
- **Postiz (pendente deploy)**: `Pheme/deploy/postiz/docker-compose.yaml`

## Achado em aberto (delta de contagem)

`AGENTS.md` declara **256 agentes** (235 + 12 + 9). A auditoria arquivo-a-arquivo de 2026-06-30 (no momento desta arquitetura) contou **261 agentes em 26 entidades** (183 negócio + 57 exec/semente + 21 infra). Divergência de **+5 agentes**. Provável causa: ajuste após consolidação Caliope×copy-master ou contagem de Egide (15 vs ~10 previstos). Não é crítico — usei a contagem real nos diagramas. Reconciliação é trabalho do Caos/curador.
