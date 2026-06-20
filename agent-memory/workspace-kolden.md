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

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
- **Verificar UTF-8 com Read, não com saída de console PowerShell** | Origem: workspace-kolden | Detectado: 2026-06-20

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
