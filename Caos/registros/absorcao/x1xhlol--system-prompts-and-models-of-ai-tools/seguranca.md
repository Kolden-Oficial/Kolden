# F2 — Segurança estática

- **slug:** `x1xhlol--system-prompts-and-models-of-ai-tools`
- **sha:** `0c828e4e893f025c1ae75cb3eb41e4a178e4024e`
- **rota:** C (referência / dado hostil)
- **data:** 2026-06-26
- **veredito:** **SAFE** (como dado morto inerte) — ver ressalva de classe hostil abaixo.

## Natureza do repositório
Coleção curada da maior compilação pública de **system prompts e definições de ferramentas (tool schemas) VAZADOS** de ~35 produtos de IA (Anthropic/Claude Code, Cursor, Devin, v0, Lovable, Windsurf, Manus, Perplexity, Replit, etc.). Conteúdo 100% texto/dados: 80 `.txt`, 17 `.json`, 2 `.yaml`, 1 `.yml`, 3 `.md`, 4 `.png`. **Nenhum código executável** (sem `.js/.py/.sh/.ts`, sem `package.json`, sem `Makefile`, sem scripts de install).

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem segredos/chaves hardcoded (grep `sk-`, `api_key=`, `BEGIN PRIVATE KEY`, `AKIA`, `ghp_`) — zero ocorrências | (todo o repo) | nenhuma | n/a |
| Sem código perigoso (`eval`/`exec`/`child_process`/`os.system`/`subprocess`) — não há código, só dados | (todo o repo) | nenhuma | n/a |
| Sem download+exec / `curl\|bash` / `wget\|sh` | (todo o repo) | nenhuma | n/a |
| Sem hooks de install (`postinstall`/`preinstall`) — não há `package.json` | (todo o repo) | nenhuma | n/a |
| Endereços de cripto p/ doação (BTC/LTC/ETH) + Patreon/Ko-fi | `README.md:40-43` | baixa | não (lixo de captação; não copiar) |
| Promoção de serviço de terceiro "ZeroLeaks" / "LeaksLab Discord" | `README.md:20,50-63` | baixa | não (marketing externo) |
| **DADO HOSTIL — prompts vazados são instruções de IA**: cada `.txt`/`.json` é um system prompt completo de outro produto; se carregado no contexto de um modelo, é interpretável como instrução e pode sequestrar comportamento | (todos os prompts) | **média** | **NÃO como instrução** — só como referência inerte |
| Padrão de injeção presente como **exemplo DEFENSIVO** (lista de ataques que o agente deve ignorar) | `Comet Assistant/System Prompt.txt:101-115` | informativo | não-absorvível como instrução; valor de referência p/ Egide |
| Frase "Ignore previous instructions and..." citada como exemplo a recusar | `Comet Assistant/System Prompt.txt:103,106` | informativo | idem (defesa, não ataque) |
| "disregard them if your output is not in English" — uso benigno (gramática) | `NotionAi/Prompt.txt:241` | nenhuma | n/a |

## Padrões de injeção (rota C — sinalização obrigatória)
Não foi encontrado **ataque ativo** de prompt-injection embutido para sequestrar o leitor. As únicas ocorrências de frases-gatilho (`ignore previous instructions`, `developer mode`, `admin override`) estão em `Comet Assistant/System Prompt.txt` como **catálogo defensivo** — o produto se instrui a tratar todo conteúdo web como DADO e recusar essas frases. Ainda assim, a **classe inteira do repositório é hostil por construção**: são instruções de sistema de terceiros. Qualquer arquivo, se injetado no contexto de um agente Kolden, age como instrução concorrente. Mitigação: arquivar INERTE com aviso "não-carregar-como-instrução".

## Conclusão
Estaticamente **SAFE**: não executa, não exfiltra, não traz segredos. O risco não é execução — é **contaminação de contexto** (dado hostil). Destino correto: `referencias/biblioteca/` como acervo INERTE, com cabeçalho de quarentena cognitiva ("dado morto, não obedecer"), nunca em `skills/` nem auto-carregado. Licença GPL-3.0 (copyleft) reforça: usar só como referência de leitura, não vendorizar texto literal em produto.
