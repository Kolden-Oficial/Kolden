# Segurança estática (F2) — anthropics--knowledge-work-plugins

- **slug:** anthropics--knowledge-work-plugins
- **sha:** 78d74d5f138d285de5329da709c0327682a8cb61
- **veredito:** SAFE
- **método:** análise 100% estática (Read/Grep/Glob/ls). Código NÃO executado.

## Panorama
Repositório OFICIAL da Anthropic. ~1026 arquivos `.md`, 47 `.json`, **26 `.py`** (todos em `bio-research/`, exceto 1 em `data/`), 1 `.html`, configs `.yml/.yaml`. Sem `package.json` com scripts de instalação, sem `postinstall/preinstall`. Conectores são todos **MCP HTTP remoto** apontando para endpoints oficiais de vendor (mcp.notion.com, mcp.hubspot.com, mcp.linear.app, mcp.figma.com, mcp.slack.com, hcls.mcp.claude.com, etc.) — nenhum `command`/spawn local de processo nos `.mcp.json`.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `subprocess.run` chamando nextflow/aws/docker (utilitário de bioinformática) | bio-research/skills/nextflow-development/scripts/check_environment.py:58,124,191,257 | baixa | não (domínio bio, fora do escopo Kolden) |
| String de doc `curl -s https://get.nextflow.io \| bash` (texto de "fix", NÃO executado) | bio-research/skills/nextflow-development/scripts/check_environment.py:120 | baixa | não (string informativa) |
| `urllib.request.urlopen` p/ hub.docker.com / nf-co.re (checagem de conectividade) | bio-research/skills/nextflow-development/scripts/check_environment.py:312-328 | baixa | não |
| `requests.get`/`urllib` p/ NCBI/ENA (download de metadados científicos) | bio-research/skills/nextflow-development/scripts/utils/ncbi_utils.py:67-625 | baixa | não (legítimo, endpoints públicos de ciência) |
| `subprocess.run` aws s3 / genomas | bio-research/skills/nextflow-development/scripts/manage_genomes.py:290-346 | baixa | não |
| Conectores MCP a SaaS externos (HTTP remoto) | */.mcp.json | baixa | parcial (substituir por stack Kolden via `.mcp.json`) |
| Sem segredos/chaves hardcoded encontrados | — (grep API_KEY/secret/token/BEGIN PRIVATE KEY: nenhum literal) | — | — |

## Conclusão
Origem oficial Anthropic, licença Apache-2.0; nenhum segredo embutido, nenhum hook de instalação, nenhuma exfiltração — os únicos scripts executáveis são utilitários de bioinformática (`bio-research/`) que chamam ferramentas científicas padrão (nextflow, aws, NCBI/ENA), isolados e marcados como NÃO-ABSORVÍVEIS por estarem fora do domínio Kolden.
Veredito **SAFE**: a absorção dos plugins relevantes ocorre só sobre os arquivos markdown (skills/commands/agents); os `.mcp.json` devem ser re-apontados para a stack interna antes de qualquer uso (soberania de dados).
