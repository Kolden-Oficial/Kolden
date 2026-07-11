---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/JuliusBrussee--caveman/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/JuliusBrussee--caveman/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — JuliusBrussee--caveman

- **slug:** JuliusBrussee--caveman
- **sha:** 25d22f864ad68cc447a4cb93aefde918aa4aec9f
- **rota:** A (skill/agente)
- **veredito:** SAFE
- **data:** 2026-06-26

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Padrão de instalação `curl ... \| bash` / `irm ... \| iex` (one-liner) | README.md:105,108 ; INSTALL.md:12 | média | NÃO (plumbing de install; não é a capacidade) |
| Installer baixa hooks de tag fixa e **verifica contra manifesto SHA-256** antes de gravar | bin/install.js:819,975-991 ; src/hooks/checksums.sha256 | baixa | NÃO (mitigação documentada; supply-chain controlado) |
| `child_process.spawn`/`spawnSync` (detecção de agentes, download via curl, spawn de claude) | bin/install.js:265,402-417,989 | baixa | NÃO (comportamento esperado e transparente) |
| MCP `caveman-shrink` faz `spawn(args[0], ...)` de comando upstream arbitrário (vindo do config do usuário) | src/mcp-servers/caveman-shrink/index.js:45 | baixa | parcial (técnica de proxy MCP; o spawn vem do próprio usuário) |
| `compress.py` envia conteúdo do arquivo à **API da Anthropic** (fronteira de terceiro) | skills/caveman-compress/scripts/compress.py:122-168 | média | parcial (relevante p/ soberania de dados Kolden — ver conclusão) |
| Denylist de paths sensíveis (`.env`, `credentials`, `id_rsa`, `.ssh`/`.aws`...) antes de comprimir | scripts/compress.py:47-103,235-241 | — (mitigação) | SIM (padrão de segurança reusável) |
| Escrita de flag symlink-safe (`O_NOFOLLOW`, temp+rename, 0600, recusa symlink) | src/hooks/caveman-config.js:132-241 | — (mitigação) | SIM (padrão de segurança reusável) |
| `eval`/`exec` em settings.js/openclaw.js/plugin.js | bin/lib/settings.js:197,240 ; bin/lib/openclaw.js:57 ; plugin.js:104,123 | baixa | NÃO (são `RegExp.exec`, não execução de código) |
| Sem segredos/chaves hardcoded; sem `postinstall`/`preinstall` no package.json; sem exfiltração de rede | (varredura global) | — | — |

## Conclusão

Repositório **SAFE**: código transparente, defensivo (symlink-safe, denylist de segredos, fail-silencioso em hooks), MIT, sem segredos hardcoded, sem `eval/exec` de código, sem `postinstall`, sem exfiltração. Os padrões de risco (`curl|bash`, `subprocess`, spawn de MCP upstream) são plumbing de instalação/runtime — isolados como NÃO-ABSORVÍVEIS; absorvemos os prompts/técnicas, não o installer.

Ressalva de **soberania de dados** (não bloqueante): `caveman-compress` e os benchmarks enviam conteúdo de arquivos à API da Anthropic. Se a técnica for adaptada na Kolden, o passo de compressão deve ser religado ao gateway/LLM próprio (OpenRouter/Eden/local), não à API direta da Anthropic — o repo já traz a denylist de paths sensíveis como rede de segurança.
