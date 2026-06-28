# Tabela de preços + leitura de log + harness de eval

Dados densos da habilidade `telemetria-de-tokens-e-custo`. Tudo aqui é insumo de cálculo — nada
substitui a fonte primária (log/API). Verifique preços contra a página oficial do provedor quando
houver dúvida; não trate esta tabela como verdade eterna.

## 1. Preço de saída por modelo (USD por 1 milhão de tokens de saída)

Correspondência **por prefixo de id de modelo**, do mais específico para o mais geral — retorne o
primeiro prefixo que casar. Isso sobrevive a point-releases (ex.: `claude-sonnet-4-5-20990101`
ainda casa `claude-sonnet-4`). Modelo sem prefixo conhecido → **não calcule dólar**, reporte só
tokens.

| Prefixo do id | USD / 1M tokens de saída | Observação |
|---|---|---|
| `claude-opus-4-0` | 75,00 | Opus 4.0 legado (tier antigo) |
| `claude-opus-4-1` | 75,00 | Opus 4.1 legado |
| `claude-opus-4-2025` | 75,00 | ids datados pré-4.5 |
| `claude-opus-4` | 25,00 | Opus 4.5–4.8 (rate card desde 4.5) |
| `claude-sonnet-4` | 15,00 | Sonnet 4.x |
| `claude-haiku-4` | 5,00 | Haiku 4.5 |
| `claude-3-5-sonnet` | 15,00 | |
| `claude-3-5-haiku` | 4,00 | |
| `claude-3-opus` | 75,00 | |

Notas:
- Token de **entrada** e **cache-read** têm preços próprios (cache-read costuma ser uma fração do
  input). Esta tabela é só de **saída** — para custo de entrada/contexto, busque a tabela de input
  do provedor. Não reuse o preço de saída para input.
- Outros provedores (OpenRouter, DeepSeek, Eden AI): puxe o preço da própria resposta/painel do
  provedor; não assuma paridade com a tabela acima.
- Formatação sugerida: `>= 1 → 2 casas`, `>= 0,01 → 3 casas`, senão 4 casas. Marque sempre com `~`
  quando a economia for estimada a partir de benchmark (não medida na própria sessão).

## 2. Leitura do log de sessão do Claude Code (fonte real)

1. Diretório base: `CLAUDE_CONFIG_DIR` (env) ou `~/.claude`. Logs em `<base>/projects/.../<id>.jsonl`.
2. Para a sessão ativa, prefira o caminho explícito do transcript; só caia no "jsonl mais recente"
   como último recurso (o mais recente pode ser de outro projeto).
3. Cada linha é um JSON. Para cada entrada com `type == "assistant"` e `message.usage`:
   - somar `usage.output_tokens` → **tokens de saída** da sessão;
   - somar `usage.cache_read_input_tokens` → **cache-read**;
   - contar +1 turno;
   - capturar `message.model` (primeira ocorrência) → id do modelo para o preço.
4. Linha vazia ou JSON inválido: ignore (não aborte a varredura).
5. **Agregação vitalícia / multi-sessão:** grave um snapshot por execução com `session_id` e `ts`;
   ao somar, mantenha **apenas o último snapshot por `session_id`** (várias medições da mesma sessão
   não devem ser contadas em dobro).

Privacidade: você só precisa dos campos `usage`/`model`/`type`. **Não** extraia nem reproduza o
conteúdo das mensagens. Nada de PII no relatório.

## 3. Harness de eval de 3 braços (economia honesta)

Para medir o ganho real de uma técnica de compressão/concisão de saída, rode o MESMO conjunto de
prompts em três braços e compare:

| Braço | System prompt | Para que serve |
|---|---|---|
| `cru` | (nenhum) | Piso absoluto. **Não é** a baseline de julgamento — infla o ganho. |
| `conciso` | "Responda de forma concisa." | **A baseline honesta.** Concisão genérica que qualquer um consegue. |
| `tecnica` | "Responda de forma concisa.\n\n{corpo da técnica}" | O que você está avaliando. |

- **Delta honesto = `conciso − tecnica`** (em tokens de saída), não `cru − tecnica`. Reporte os dois
  e nomeie a baseline no texto.
- Contagem de tokens do eval: ideal é a contagem real da API. Aproximação offline com um tokenizer
  BPE serve para **razões/percentuais** (o número absoluto fica aproximado — rotule como tal).
- Versione os snapshots de resultado em JSON; só regenere quando o prompt ou a técnica mudarem.
- Reprodutibilidade: registre modelo, data e conjunto de prompts junto do resultado.

## 4. Esquema sugerido do snapshot (JSON)

```json
{
  "ts": 0,
  "session_id": "<id>",
  "unidade": "sessao|tarefa|agente|modo",
  "modelo": "claude-sonnet-4-...",
  "tokens_saida": 0,
  "cache_read": 0,
  "turnos": 0,
  "baseline": "conciso",
  "tokens_economizados_est": 0,
  "usd_economizado_est": 0.0,
  "medido": true
}
```

`medido: false` sinaliza estimativa por extrapolação — sempre explicitar no relatório.

---
Fonte: princípios de `JuliusBrussee/caveman` (`src/hooks/caveman-stats.js`, `benchmarks/`,
`evals/`) @ `25d22f864ad68cc447a4cb93aefde918aa4aec9f`, MIT. Tabela e receita reescritas em PT-BR;
valores de preço a confirmar na fonte oficial do provedor.
