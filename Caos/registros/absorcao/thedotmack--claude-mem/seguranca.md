# Segurança estática — thedotmack--claude-mem

- **slug:** thedotmack--claude-mem
- **sha:** 3fe0725a97e18b5edf3e61cde60e181ab2b6c997
- **url:** https://github.com/thedotmack/claude-mem
- **rota:** A (skill/agente/plugin)
- **data:** 2026-06-26
- **veredito:** **SAFE** (com ressalvas a tratar na adaptação)

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem `postinstall`/`preinstall` em package.json; há um *guard* que proíbe postinstall (`check-postinstall-allowlist.js`) rodado no `prepublishOnly` | package.json:113,115 | baixa (positivo) | sim (padrão a copiar) |
| Telemetria PostHog embarcada (opt-in, com comando `telemetry`/`uninstall`) — coleta de métricas de uso | src/npx-cli/commands/telemetry.ts; plans/2026-06-09-opt-in-posthog-telemetry.md | média | NÃO absorver a telemetria — viola soberania de dados; arrancar antes de qualquer adaptação |
| Instalador externo `curl -fsSL https://install.cmem.ai/openclaw.sh \| bash` | README.md:167 | média | não-absorvível (fetch+exec remoto); só citado, nunca executado na quarentena |
| `child_process.spawn`/`execSync` difuso (gestão de worker/Bun/SDK) — esperado p/ um process-manager | src/shared/spawn.ts, src/supervisor/*, plugin/scripts/worker-service.cjs | baixa | sim, com revisão (uso legítimo, não é exfil) |
| MCP server distribuído como `node -e "<JS minificado inline>"` que resolve o path do plugin e faz `spawn` do mcp-server.cjs | plugin/.mcp.json:8 | baixa | sim (shim de path; ofuscado por minificação, não malicioso) — reescrever legível se adaptar |
| Worker HTTP local (Express) em porta `37700+(uid%100)` / viewer em :37777, bind localhost | docs/architecture-overview.md:17; README.md:177 | baixa | sim (localhost-only; consistente com §5 do Kolden se mantido local) |
| Hooks de ciclo de vida com `export PATH=$($SHELL -lc 'echo $PATH')` e varredura de cache de plugin | plugin/hooks/hooks.json:17-85 | baixa | sim (resolução de runtime cross-OS; sem exfil) |
| "Secrets" encontrados são fixtures de teste / placeholders de doc (`test-gemini-key-1234`, `sk-or-test-...`, `your-api-key-here`, `cmem_invalid_key_for_e2e`, `sk-ant-oat01-*` em testes) | openclaw/test-install.sh:574,603; docs/public/usage/*.mdx; tests/shared/oauth-token.test.ts | nenhuma | n/a (nenhum segredo real) |
| `<private>` tags para excluir conteúdo sensível da captura de memória | src/cli/handlers/user-message.ts; src/server/generation/providers/shared/prompt-builder.ts | baixa (positivo) | sim (padrão de privacidade a herdar) |

## Conclusão
Código aberto Apache-2.0, maduro (v13.8.1), com disciplina de segurança própria (allowlist de postinstall, isolamento de env do worker, degradação graciosa que nunca bloqueia o host, tags `<private>`). Nenhum segredo real, nenhum download+exec embutido no caminho de absorção, nenhuma exfiltração — apenas `spawn` legítimo de gestão de processos.
A única ressalva real para a Kolden é a **telemetria PostHog opt-in**: deve ser removida na adaptação (soberania de dados). Veredito **SAFE** para leitura/inventário; a absorção do runtime completo (Bun+SQLite+Chroma+worker) é projeto de infra, não de squad — ver mapa de decisão.
