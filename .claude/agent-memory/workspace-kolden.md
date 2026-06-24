# Memória do Agente workspace-kolden (operador-base da raiz C:\Kolden)

> Memória persistente do operador do workspace raiz. Atualizada pelo Ritual de Encerramento.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Ambiente Windows / shells
- O console do PowerShell desta máquina renderiza UTF-8 como cp1252 (mojibake visual, ex.: "Ã‰"=É); os arquivos estão íntegros — confira integridade de UTF-8 com a ferramenta Read, não com a saída de `Get-Content`. | 2026-06-20
- `node` invocado dentro do git-bash NÃO entende paths de mount `/c/...` (vira `C:\c\...` e dá ENOENT); use paths Windows (`C:\...`) para node, ou valide JSON via PowerShell `ConvertFrom-Json`. | 2026-06-20
- O `node` já está disponível na máquina (v24+); scripts mecânicos em lote são confiáveis com `.cjs` + `fs`. | 2026-06-20

### Estrutura dos agentes da Kolden
- Arquivos de agente vivem em pastas cujo basename é `agents/` (e especialistas em `especialistas/`); frontmatter usa YAML aninhado `agent: { id: ... }`. Total ~560 personas. | 2026-06-20
- Dois modelos: clássico (frontmatter YAML, sem MEMORY.md) e AIOX/Prometeu (MEMORY.md canônico em `.aiox-core/development/agents/<id>/MEMORY.md` + reflexos). | 2026-06-20
- Convenções PT-BR do Caos: "habilidades"=skills, "especialistas"=subagents, "reflexos"=hooks (pastas técnicas mantêm nome em inglês). | 2026-06-20

### Reflexos (hooks) do Claude Code
- Padrão anti-loop de Stop hook: guarda `stop_hook_active=true` + marcador por sessão (`.claude/.estado/reflexao-<sessionId>`) garante disparo único sem loop. Verificado nos 4 cenários. | 2026-06-20
- Um Stop hook recém-criado na raiz PODE disparar já na mesma sessão (aconteceu nesta) — em geral, porém, hooks só valem a partir da próxima sessão. | 2026-06-20
- Para edições em massa idempotentes, usar marcador-comentário (`<!-- ritual-de-encerramento -->`) e modo dry-run antes de `--apply`. | 2026-06-20

### Índice AGENTS.md e inventário de agentes
- Contagem OPERACIONAL para o índice = 183 agentes: 161 nos 15 squads (`<Squad>/agents/*.md`) + 12 Prometeu + 10 Caos. Distinto das "~560 personas" do repo inteiro (que incluem arsenais crus em `.claude/_staging/`, xquads, espelhos). Não confundir os dois números. | 2026-06-20
- GOTCHA Prometeu: os 12 agentes do framework AIOX vivem em `Prometeu/.aiox-core/development/agents/` (nomes funcionais: analyst/architect/dev/devops/pm/po/qa/sm/ux-design-expert/data-engineer/aiox-master/squad-creator), NÃO em `Prometeu/agents/`. O índice antigo listava nomes inventados (Orion/Atlas/Aria/Dex...) que não existem — sempre conferir no disco. | 2026-06-20
- Caos tem 10 especialistas internos em `Caos/.claude/agents/` (não 12). Hermes (Nous Research) e Prometeu (`@aiox-squads/core`) são vendorizados — não são squads nativos. `Bloco` na raiz é arquivo órfão vazio (0 bytes). | 2026-06-20

### Verificação de alinhamento doc↔disco ("sem falha de vírgula")
- Método que funcionou: para cada `agents/*.md` real, `grep -qE "^- \`<nome>\` —"` no índice (cobertura 0-faltando); depois contar bullets, achar duplicatas (`sort|uniq -d`) e órfãos (bullet sem arquivo). | 2026-06-20
- GOTCHA do regex de contagem: bullets de NÃO-agentes (ex.: a menção `- \`Bloco\` — ...`) também casam `^- \`nome\` —`. Logo total bruto de bullets (184) ≠ nº de agentes (183). Investigar o "extra" antes de declarar erro — pode ser legítimo. | 2026-06-20
- Não "corrigir" classificação interna defensável quando o total bate (ex.: Aglaia "10 pensadores+4" vs "9+5" — ambos = 15, alinhado ao índice). Mexer seria refatorar de carona. | 2026-06-20

### Preferências do usuário (Ronan)
- Em tarefas de documentação/índice, prefere exaustividade máxima ("1 linha por agente") e alinhamento cruzado entre os 3 níveis: AGENTS.md (índice) ↔ READMEs de squad ↔ CLAUDE.md (memória institucional). | 2026-06-20
- Ao editar CLAUDE.md, preservar §5 (segurança) e §6 (commit policy) intactas; só adicionar/cruzar. Não commitar sem ordem explícita. | 2026-06-20

### Projetos de cliente / Brandbook (ex.: Rosie em Projetos/)
- O **manual de marca oficial é fonte de verdade** e pode CONTRADIZER o que está no ar no site. Caso Rosie: site usa preto #000/Zen Kaku, mas o manual oficial manda Rose #E6D2DC + DM Sans. Se montar brandbook do site antes do manual, marcar como v1 provisório e refazer quando o PDF chegar. Documentar o gap site×manual como achado (a loja pode não seguir a própria marca). | 2026-06-23
- Estrutura que funcionou para projeto de cliente: `Projetos/<Cliente>/` com `brandbook/` (subpasta por pilar do manual, à risca), `assets/` (páginas renderizadas + curados por tipo), `pesquisa/` (dossiês multi-squad). Frontmatter Kolden + PT-BR em tudo. | 2026-06-23
- Ao receber fonte oficial DEPOIS de inferências: não apagar o raciocínio — anotar bloco "🔄 Reconciliação" no topo com ✔ confirmado / ✗ ajustado: manual diz X; e corrigir links `relacionados` quebrados quando arquivos do brandbook são movidos/renomeados. | 2026-06-23

### Extração/leitura de PDF no Windows (Kolden)
- Read/`pdftoppm` NÃO funcionam aqui ("unsafe location"). Funcionam: `pdftotext -layout` (texto/estrutura) e **PyMuPDF/`fitz`** (`pip` já instalado). Receita: `fitz.open()` → `page.get_pixmap(Matrix(zoom))` salva PNG por página; `doc.extract_image(xref)` extrai imagens embutidas; depois **Read nos PNGs** renderizados para ver páginas só-imagem (logo, mockups). Complementa [[reference_md_para_pdf_windows]]. | 2026-06-23

### Reorganização de pastas e auditoria de caminhos (workspace)
- Movimentações aplicadas 2026-06-23: `Ferramentas/` → `sobre-a-empresa/Ferramentas/`; `agent-memory/`+`registros/`+`_staging/` (da RAIZ) → dentro de `.claude/`; `Projetos/Catalogoos` → `Projetos/CataLogo`. | 2026-06-23
- REGRA DE OURO ao corrigir paths após mover pastas: distinguir **nível-workspace** de **nível-squad**. Cada squad tem seu PRÓPRIO `agent-memory/`, `registros/` e (Caos) `_staging/` na raiz dele → `<projeto>/agent-memory/<id>.md` e `$CLAUDE_PROJECT_DIR/registros` são CORRETOS; só os da raiz do workspace migraram para `.claude/`. Nunca fazer find-replace cego. | 2026-06-23
- Só o hook da RAIZ (`.claude/reflexos/marca-trabalho.sh`) passou a gravar em `$CLAUDE_PROJECT_DIR/.claude/registros`; os `pos-escrita.sh`/`verificacao-diaria.sh` dos squads ficam com `$CLAUDE_PROJECT_DIR/registros` (resolvem para `<squad>/registros/`). | 2026-06-23
- GOTCHA: relatório de Explore agent SUPERDIMENSIONA severidade — classificou ~10 scripts de squad e 16 READMEs como "quebrados" sendo que eram corretos (relativos ao squad). Confirmar por leitura+disco (`find`/`ls`) antes de agir sobre achado de subagente. | 2026-06-23
- Verificar o DESTINO real no disco antes de corrigir um caminho: `C:\Kolden\Backup` não existia e o `.env`/projeto do GHL está DIRETO em `sobre-a-empresa/Ferramentas/GoHighLevel/` (não em subpasta "GHL Automação"). Corrigir para a realidade do disco, não para o que a doc afirmava. | 2026-06-23
- "Exaustivo" ≠ cego: preservar referências HISTÓRICAS (nome de backup "Catalogoos" do sub-repo achatado, clones em `_staging`) que descrevem eventos passados; corrigir só ponteiros ATIVOS. | 2026-06-23
- Testar reflexo isoladamente: rodar o `.sh` com `CLAUDE_PROJECT_DIR` apontando para um dir temp + input JSON simulado por stdin confirma o destino de gravação sem sujar o repo. | 2026-06-23

### Delegação a subagentes (Agent/Workflow)
- GOTCHA: subagente em background pode "travar" achando que está em plan mode e NÃO gravar o arquivo pedido (coletou os dados mas não escreveu). Sempre VERIFICAR com Glob se o arquivo saiu; se faltou, retomar via SendMessage para o `agentId` dizendo "não estamos mais em plan mode, grave agora". | 2026-06-23
- Padrão "usar todos os agents possíveis" = spawnar subagentes em paralelo, cada um incorporando a persona do squad (lendo o `.md`) + ferramentas web reais (firecrawl/exa). Squads de marca: Argos (mercado), Aglaia (posicionamento), Aletheia (persona), Caliope (tom de voz). | 2026-06-23

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
- **Verificar UTF-8 com Read, não com saída de console PowerShell** | Origem: workspace-kolden | Detectado: 2026-06-20
- **Verificação cruzada doc↔disco por grep (cobertura + duplicatas + órfãos) antes de declarar um índice alinhado** | Origem: workspace-kolden | Detectado: 2026-06-20
- **Ao corrigir paths após mover pastas, distinguir nível-workspace de nível-squad — não corrigir o que é relativo ao projeto ativo** | Origem: workspace-kolden | Detectado: 2026-06-23
- **Confirmar achado de subagente por leitura+disco antes de agir (relatórios superdimensionam severidade)** | Origem: workspace-kolden | Detectado: 2026-06-23

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
