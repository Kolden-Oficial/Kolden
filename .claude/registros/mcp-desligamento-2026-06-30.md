---
data: 2026-06-30
tipo: relatorio-de-desligamento-de-mcp
autor: hermes-chief + 3 Explores + 1 Plan agent
status: aprovado-pelo-Ronan-aguardando-execucao-no-painel
area: kolden-os
up: "[[.claude/_MOC-kolden-os]]"
relacionado:
  - "[[.claude/registros/briefing-retomada-2026-06-26|briefing-retomada-2026-06-26]]"
---

# Desligamento de MCPs zero-uso — 2026-06-30

## Contexto

Diagnóstico de carga por turno apontou **16 MCPs ativos** no painel claude.ai (web).
Cross-reference com MEMORY.md global, planos abertos e busca por uso operacional
(grep por `mcp__<nome>__` e endpoints) em `C:\Kolden\` mostrou **4 MCPs sem rastro
de uso operacional**.

Cada MCP ativo paga ~15-20 tokens/turno em descrição/manifest, mesmo quando deferido.
Desabilitar os 4 zero-uso libera ~60-80 tokens/turno e diminui ruído na lista de
ferramentas (que hoje passa de 500 tools deferidas).

## Os 4 alvos

| MCP | Justificativa de desligamento |
|---|---|
| **Replicate** | Sem rastro de uso operacional. Aparece só em docs de catálogo (`sobre-a-empresa/Ferramentas/Replicate/`) e materiais de knowledge base. Nenhum agente/skill/projeto invoca `mcp__replicate__*`. Geração de imagem hoje passa por outras rotas (fal/Canva quando necessário). |
| **FAL** | Mesmo padrão: documentado em `sobre-a-empresa/Ferramentas/Fal/`, citado em material de pesquisa, **sem invocação real**. Geração de mídia em projetos ativos (omiron, CataLogo, Pheme) não depende dele. |
| **Upstash** | Catalogado em `sobre-a-empresa/Ferramentas/Upstash/`. Hoje a Kolden não tem Redis remoto em uso — fila/cache de produção rodam local (LobeHub Redis no WSL). Nenhum projeto está consumindo Upstash. |
| **Apollo.io** | B2B prospecting não está em squad ativo. Êmporos (vendas) é semente e ainda não usa. Sem rastro em planos abertos. |

## Evidência de zero-uso (grep operacional)

Comando rodado: `grep -ri "mcp__replicate\|mcp__fal\|mcp__upstash\|mcp__apollo\|api.replicate\|fal\.ai\|upstash\.\|apollo\.io" C:\Kolden\`

Resultado: 30 matches em **apenas 3 categorias**, nenhuma de uso operacional:

1. **Catálogo de ferramentas** (`sobre-a-empresa/Ferramentas/<MCP>/`) — documentação, não uso
2. **Knowledge base histórico** (`sobre-a-empresa/_conhecimento-institucional/`) — material de pesquisa salvo, não execução
3. **Hermes vendorizado** (`Hermes/website/docs/...zh-Hans/...`) — docs i18n do projeto Nous Research, não código Kolden

**Nenhum agente, skill ou projeto invoca esses 4 MCPs.**

## Passos para desabilitar (Ronan executa)

1. Abrir painel de conectores em **claude.ai → Settings → Connectors** (ou equivalente do hub Claude.ai onde os MCPs estão habilitados).
2. Localizar **Replicate**, **FAL**, **Upstash**, **Apollo.io** na lista de conectores ativos.
3. Em cada um: **desabilitar** (não deletar — mantém config caso queira reativar).
4. Confirmar que a contagem cai de 16 → 12 ativos.

## Janela de reativação

Se nos próximos **7 dias** (até 2026-07-07) algum squad/skill/projeto reclamar de
funcionalidade ausente que dependia desses MCPs, reativar imediatamente e registrar
o caso ao final deste arquivo (seção "Reversões").

Após 7 dias sem reclamação, considerar desligamento permanente.

## Reversões

(Vazio. Adicionar entrada aqui se algum dos 4 precisar voltar.)

## MCPs deixados para revisão posterior (não fazem parte desta rodada)

Lista identificada como "uso raro" pelo diagnóstico — **decisão caso-a-caso com Ronan**:

- **Tavily, Exa, BrowserBase** — redundância com Firecrawl (que é a ferramenta padrão por política de soberania)
- **Synter** — Marketing/ads, baixo uso documentado
- **V0** — geração UI, sem uso recente em omiron/CataLogo
- **Canva** — design, papel parcial em Pheme/Aglaia

Esses ficam para uma próxima rodada de revisão.
