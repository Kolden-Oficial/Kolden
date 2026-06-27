# Segurança estática — czlonkowski--n8n-mcp

- **slug:** czlonkowski--n8n-mcp
- **sha:** f5694cce54c26777e6c16d606eb6b90cd39f5f96
- **url:** https://github.com/czlonkowski/n8n-mcp
- **rota:** D (framework/MCP grande)
- **data:** 2026-06-27
- **veredito:** SAFE

Servidor MCP que dá a assistentes de IA acesso à documentação dos nós do n8n e (opcionalmente, sob
config de API) gerencia workflows numa instância n8n do próprio usuário. Análise 100% estática, sem
execução.

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| `eval(`/`exec(` referenciados como **detecção defensiva** (avisa quando o código n8n do usuário usa eval/exec) | src/services/config-validator.ts:586 | baixa | não (é guardrail, não exploit) |
| Lista `dangerousPatterns` (eval, Function, exec) usada para **avisar** sobre Code node do usuário | src/services/node-specific-validators.ts:1927-1930 | baixa | não (defensivo) |
| Aviso de acesso a `fs`/`path`/`child_process` em Code node do usuário (regex de detecção) | src/services/node-specific-validators.ts:1984 | baixa | não (defensivo) |
| `spawnSync('git', [...])` para `clone`/`pull` da doc do n8n em **build-time**, com array de args (injection-safe, comentado como tal) | src/utils/enhanced-documentation-fetcher.ts:4,146,172 | baixa | n/a (build, não runtime do MCP) |
| `prepare: "husky"` (hook de dev, roda em `npm install` de contribuidor; não há pre/postinstall malicioso) | package.json:108 | baixa | não |
| Acesso à API n8n e ao n8n.io (templates) via env var configurável; **nenhuma credencial hardcoded** — `.env.example` só tem placeholders | .env.example | baixa | n/a |
| Configuração `secretlint` presente (preset recommend) — projeto faz varredura própria de segredos | .secretlintrc.json | — | — (sinal positivo) |

**Conclusão (1):** Licença MIT; sem segredos hardcoded, sem postinstall, sem download+exec; as ocorrências de `eval/exec/child_process` são detecção defensiva ou clone git de docs em build com args em array.
**Conclusão (2):** SAFE para absorver como **vendor/MCP inerte** (não roda código no Kolden por absorção). Operação real exige config de API n8n + chave via Infisical; o MCP pode criar/alterar/excluir workflows na instância n8n do usuário — risco operacional do uso, não do código.
