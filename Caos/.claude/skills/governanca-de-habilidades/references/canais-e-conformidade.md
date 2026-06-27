# Canais de GC e níveis de conformidade — referência da governança de habilidades

## Canais do config GC (faxina com humano no loop)

Cada tipo de acúmulo tem sinais próprios de obsolescência — não aplique uma regra só a todos.

| # | Canal | Onde | Sinais de obsolescência/redundância |
|---|---|---|---|
| 1 | Habilidades | `.claude/skills/*/` | nomes muito sobrepostos; nunca disparada em transcrições recentes; domínio fora do trabalho real; `SKILL.md` quebrado/vazio |
| 2 | Memória | `**/memory/*.md` + índice | várias entradas para um tópico; conteúdo que contradiz entrada mais nova; datas vencidas; órfão fora do índice; fragmento <100 palavras que devia fundir |
| 3 | Reflexos | `.claude/reflexos/` + settings | script no disco que nenhum hook referencia; versão velha superada por reescrita |
| 4 | Permissões | `permissions.allow` no settings | duplicata; entrada específica já coberta por wildcard; concessão pontual de experimento passado |
| 5 | Servidores MCP | `.mcp.json` / config | servidor que não conecta; duplicata funcional; sem uso há muito tempo |
| 6 | Jobs agendados | onde o agente guarda | one-shot disparado há >30 dias; job cujo script-alvo sumiu |
| 7 | Histórico de projeto | `projects/*/` | snapshot de handoff velho; sessão superada por estado mais novo |
| 8 | Caches de runtime | `cache/`, `logs/`, `file-history/` | ordenar por tamanho e mtime; propor itens >30 dias e grandes |

### Disciplina de GC (inegociável)
1. **Append-only vaza** — sem revisão, tudo só cresce e apodrece em silêncio.
2. **Auditoria regular > expurgo único** — varra a cada ~30 dias, ~20 candidatos por vez.
3. **Soft-delete primeiro** — `.disabled` → lixeira datada (`_gc_trash/<data>/`) → deleção real só
   sob pedido explícito. Sempre haja caminho de desfazer.
4. **Humano no loop forçado** — cada candidato tem seu `[s/n/pular]`. Sem "sim para todos".
5. **Log de tudo** — timestamp, itens tocados, porquê e como desfazer. Permissão em JSON (sem
   comentário): faça backup do settings, registre a entrada removida verbatim no log, só então tire do array.

## Os 3 níveis de rigor da medição de conformidade (comply)

Mede **independência de prompt**: a regra pega mesmo sem o prompt apoiar?

| Nível | O prompt... | O que revela |
|---|---|---|
| Apoiador | pede explicitamente o comportamento da regra | piso — se falha aqui, a regra está quebrada |
| Neutro | descreve a tarefa sem mencionar a regra | a regra dispara sozinha pela `description`? |
| Competidor | empurra contra a regra (atalho, pressa, "só faz") | teto de disciplina — só reflexo/persuasão forte segura aqui |

Fluxo: gerar a spec de sequência esperada a partir do `.md` da regra → gerar cenários nos 3 níveis
→ rodar o agente e capturar o trace de tool calls → classificar cada call contra os passos da spec
(por LLM, não regex) → checar ordenação temporal de forma determinística → reportar taxa por nível.

**Leitura do resultado:** regra seguida só no nível apoiador = sugestão disfarçada de regra →
candidata a virar **reflexo** (hookify). Regra seguida até no competidor = disciplina sólida.

---
*Fonte: `affaan-m/everything-claude-code@2bc924f` (`config-gc`, `skill-comply`, `skill-stocktake`,
`rules-distill`, `hookify-rules`) — MIT. Reescrito em PT-BR, sem cópia literal.*
