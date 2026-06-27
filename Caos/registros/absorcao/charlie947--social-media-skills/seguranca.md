# Segurança estática (F2) — charlie947--social-media-skills

- **slug:** charlie947--social-media-skills
- **sha:** 94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1
- **rota:** A (coleção de skills do Claude Code)
- **veredito:** **SAFE**
- **método:** análise 100% estática (Read/Grep/ls). Nenhum código executado.

## Achados

| achado | arquivo:linha | severidade | absorvível? |
|---|---|---|---|
| Sem segredos/chaves hardcoded em todo o repo (só placeholders `your_token`/`your_key`) | repo inteiro | nenhuma | n/a |
| Referência a env vars `APIFY_API_TOKEN` / `GOOGLE_AI_API_KEY` via `export` (texto puro) | README.md:171-178; reels-scripting/SKILL.md:17-25 | baixa | NÃO como está — viola política Infisical da Kolden (§5); reescrever para Infisical na absorção |
| `validate-skills.sh`: script bash de validação de frontmatter (só `head`/`awk`/`wc`/`printf`, leitura local, sem rede) | validate-skills.sh | baixa | SIM — utilitário inerte e útil |
| reels-scripting instrui o agente a **gerar e rodar** um script Node.js (`apify-client`, `@google/generative-ai`) e baixar vídeo p/ `~/Desktop/Reels/` | reels-scripting/SKILL.md:50-95 | média | parcial — capacidade de runtime que chama APIs externas (Apify/Gemini); absorver como método, NÃO o auto-exec |
| post-scorer chama actor Apify `apimaestro/linkedin-profile-posts` (scrape pago, ~US$0,50) | post-scorer/SKILL.md:50-58 | baixa | SIM como método; gating de custo já embutido |
| niche-research dirige navegador (Claude for Chrome / Playwright) para raspar Reddit/X/Google | niche-research/SKILL.md:14-95 | baixa | SIM como método; capacidade de browser ao vivo |
| `.gitignore` cobre `.env`, `.env.local`, `node_modules`, `*.skill` | .gitignore | nenhuma | n/a |
| Sem `eval`/`exec`/`child_process`/`os.system`/`subprocess`/`curl\|bash`/`postinstall`/exfiltração | grep global | nenhuma | n/a |
| Persona "Charlie Hills" hardcoded (nomes de equipe, benchmarks de engajamento, links substack) | pinned-comment, post-scorer, README, sample-content.md | baixa | conteúdo, não risco — de-personalizar na reescrita pt-BR |

## Conclusão
Repo limpo: licença MIT, sem segredos reais, sem código malicioso ou auto-executável hostil — só Markdown de skills + um validador bash benigno.
Únicas ressalvas são de **conformidade Kolden** (env var em texto puro → migrar p/ Infisical) e de **runtime** (3 skills dependem de Apify/Gemini/browser ao vivo e geram código a rodar — absorver o método, nunca o auto-exec literal).
