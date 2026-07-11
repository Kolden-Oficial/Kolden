---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/garrytan--gstack/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/garrytan--gstack/mapa-de-decisao|mapa-de-decisao]]"
---

# Segurança estática — garrytan--gstack

- **slug:** garrytan--gstack
- **sha:** 11de390be1be6849eb9a15f91ff4922dd16c589a
- **url:** https://github.com/garrytan/gstack
- **licença:** MIT (Copyright (c) 2026 Garry Tan)
- **rota:** A (skills/personas como slash commands)
- **data:** 2026-06-26
- **veredito:** **SAFE**

## Escopo da análise
Repositório grande e legítimo (gstack do Garry Tan): 59 `SKILL.md` (mark­down de prompt),
74 CLIs em `bin/` (bash + bun/TS), 63 fontes TS em `browse/src/` (daemon de navegador headless),
infra de memória `gbrain` (Supabase/PGLite) e telemetria. O **alvo de absorção (rota A)** são as
~23 personas/papéis e suas técnicas — esses arquivos são markdown puro, sem código executável.
A camada de tooling (browse/bin/gbrain) foi varrida para o veredito, mas é vendor inerte, não alvo.

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem `postinstall`/`preinstall` em `package.json` (scripts são build/test/dev manuais) | package.json:11-40 | info | n/a |
| Único segredo referenciado é placeholder de doc | .env.example:5 (`ANTHROPIC_API_KEY=sk-ant-your-key-here`) | info | não (placeholder) |
| Nenhum segredo hardcoded real; matches de `AKIA…` são exemplos de doc (`AKIAIOSFODNN7EXAMPLE`) | document-generate/SKILL.md:1177 | info | não |
| Matches `eval/exec/system()` aparecem só como *padrões a detectar* no auditor de segurança | cso/sections/audit-phases.md:121,176-177 | info | sim (é conhecimento defensivo) |
| Matches `curl\|bash` aparecem só como *exemplos a bloquear* no classificador de segurança | browse/src/security-classifier.ts:494; test/audit-compliance.test.ts:65 | baixa | não (é código do daemon, não persona) |
| Daemon `browse` executa Chromium/CDP e tem sidecar de segurança próprio (rede real, cookies, stealth) | browse/src/*.ts (63 arquivos) | média | não (vendor; fora do alvo rota A) |
| `gbrain` sincroniza sessões para Supabase/PGLite e há `gstack-telemetry-sync` (telemetria opt-in) | bin/gstack-telemetry-sync, bin/gstack-gbrain-sync.ts | média | não (vendor; phone-home — descartar na absorção) |
| Reflexos `freeze`/`careful` *restringem* edição e *avisam* sobre comandos destrutivos (guardrails, não risco) | freeze/SKILL.md, careful/SKILL.md | info | sim (são proteções) |

## Conclusão
Repo MIT, sem hooks de install, sem segredos reais, sem exfiltração no alvo de absorção (as personas
são markdown de prompt 100% inerte). Os pontos de média severidade — daemon de navegador, sync de
memória para Supabase e telemetria — vivem na camada de tooling, **não são alvo** desta rota A e ficam
isolados como NÃO-ABSORVÍVEIS (vendor/phone-home). Nada precisa de revisão humana de segurança para
absorver as técnicas das personas. Veredito **SAFE**.
