# Task de Diagnóstico do SYNAPSE

Execute um diagnóstico abrangente da engine de contexto do SYNAPSE, comparando o estado esperado do pipeline com o estado real, incluindo **análise de desempenho da sessão** com dados de tempo exatos.

## Instruções

Execute os seguintes passos em ordem:

### Passo 1: Executar o Script de Diagnóstico

```bash
node -e "const {runDiagnostics}=require('./.aiox-core/core/synapse/diagnostics/synapse-diagnostics');console.log(runDiagnostics(process.cwd()))"
```

### Passo 2: Exibir o Relatório

Mostre ao usuário a saída completa do relatório em markdown.

### Passo 3: Analisar as Lacunas

Se o relatório contiver quaisquer itens FAIL ou WARN:
1. Liste cada lacuna com sua severidade
2. Forneça a correção recomendada do relatório
3. Pergunte ao usuário se ele deseja aplicar quaisquer correções

### Passo 4: Análise de Desempenho da Sessão

Execute o analisador de tempo para obter **dados de execução exatos** desta sessão:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const os = require('os');

const LOG_DIR = path.join(os.homedir(), '.claude', 'logs');
const today = new Date().toISOString().slice(0, 10);
const logFile = path.join(LOG_DIR, 'timing-' + today + '.jsonl');

if (!fs.existsSync(logFile)) {
  console.log('NO_TIMING_DATA');
  process.exit(0);
}

const lines = fs.readFileSync(logFile, 'utf8').trim().split('\n');
const entries = lines.map(l => { try { return JSON.parse(l); } catch { return null; } }).filter(Boolean);

// Group by session
const sessions = {};
entries.forEach(e => {
  if (!sessions[e.session]) sessions[e.session] = [];
  sessions[e.session].push(e);
});

// Find the latest session (most likely current)
const sessionIds = Object.keys(sessions);
const latestSessionId = sessionIds[sessionIds.length - 1];
const currentEvents = sessions[latestSessionId] || [];

// Build JSON output for analysis
const result = {
  date: today,
  logFile,
  totalSessions: sessionIds.length,
  currentSession: {
    id: latestSessionId ? latestSessionId.slice(0, 12) : null,
    totalEntries: currentEvents.length,
    firstEvent: currentEvents[0] ? currentEvents[0].timestamp : null,
    lastEvent: currentEvents.length ? currentEvents[currentEvents.length - 1].timestamp : null,
    wallClockMs: currentEvents.length >= 2
      ? currentEvents[currentEvents.length - 1].epochMs - currentEvents[0].epochMs
      : 0,
    timeline: [],
    toolSummary: {},
    gaps: [],
    totalToolTimeMs: 0,
    totalThinkingTimeMs: 0,
  },
};

// Build timeline
let prevEpoch = null;
currentEvents.forEach(e => {
  const gap = prevEpoch ? e.epochMs - prevEpoch : 0;
  const item = {
    time: e.timestamp ? e.timestamp.slice(11, 23) : '',
    event: e.event === 'PreToolUse' ? 'START' : 'END',
    tool: e.tool,
    durationMs: e.durationMs || null,
    gapMs: gap,
    input: e.input || null,
  };
  result.currentSession.timeline.push(item);
  prevEpoch = e.epochMs;
});

// Tool duration summary
currentEvents.filter(e => e.durationMs).forEach(e => {
  if (!result.currentSession.toolSummary[e.tool]) {
    result.currentSession.toolSummary[e.tool] = { calls: 0, totalMs: 0, maxMs: 0, durations: [] };
  }
  const ts = result.currentSession.toolSummary[e.tool];
  ts.calls++;
  ts.totalMs += e.durationMs;
  ts.maxMs = Math.max(ts.maxMs, e.durationMs);
  ts.durations.push(e.durationMs);
  result.currentSession.totalToolTimeMs += e.durationMs;
});

// Gap analysis (thinking time between PostToolUse → PreToolUse)
for (let i = 1; i < currentEvents.length; i++) {
  if (currentEvents[i].event === 'PreToolUse' && currentEvents[i - 1].event === 'PostToolUse') {
    const gapMs = currentEvents[i].epochMs - currentEvents[i - 1].epochMs;
    result.currentSession.gaps.push({
      from: currentEvents[i - 1].tool,
      to: currentEvents[i].tool,
      gapMs,
    });
    result.currentSession.totalThinkingTimeMs += gapMs;
  }
}

// Sort gaps descending
result.currentSession.gaps.sort((a, b) => b.gapMs - a.gapMs);

console.log(JSON.stringify(result, null, 2));
"
```

### Passo 5: Renderizar o Relatório de Desempenho

Usando a saída JSON do Passo 4, apresente um **Relatório de Desempenho da Sessão** com estas seções:

#### 5a. Visão Geral da Sessão

| Métrica | Valor |
|--------|-------|
| Total de Tempo de Relógio (Wall Clock) | (firstEvent → lastEvent) |
| Tempo de Execução de Ferramentas | soma de todos os durationMs |
| Tempo de Pensamento/Processamento | total dos gaps entre PostToolUse → PreToolUse |
| Razão de Sobrecarga | thinkingTime / wallClock em % |

#### 5b. Linha do Tempo de Execução

Mostre cada chamada de ferramenta em ordem cronológica:
```
HH:MM:SS.mmm  START  ToolName  — resumo da entrada
HH:MM:SS.mmm  END    ToolName  [Xms]  (+Yms gap)
```

Destaque quaisquer gaps > 5 segundos com um marcador de aviso.

#### 5c. Ranking de Duração de Ferramentas

Tabela ordenada por tempo total decrescente:

| Ferramenta | Chamadas | Total | Média | Máx |
|------|-------|-------|-----|-----|
| ... | | | | |

#### 5d. Maiores Gaps de Pensamento

Mostre os 10 maiores gaps (PostToolUse → PreToolUse), ordenados de forma decrescente:

| Gap | De → Para | Análise |
|-----|-----------|----------|
| Xs | Ferramenta A → Ferramenta B | (explique a causa provável) |

Para a coluna Análise, infira as causas:
- **gap > 15s**: Provavelmente o LLM processando um contexto grande ou gerando uma resposta longa
- **gap 5-15s**: Pensamento normal para decisões complexas, lendo a saída de ferramentas
- **gap 2-5s**: Processamento padrão entre ferramentas
- **gap < 2s**: Rápido, saudável

#### 5e. Diagnóstico de Gargalos

Com base nos dados, forneça um diagnóstico concreto:
1. Qual % do tempo total foi gasto em execução de ferramentas vs. pensamento?
2. Qual chamada de ferramenta específica ou gap foi o maior consumidor de tempo individual?
3. Recomendações acionáveis para reduzir o tempo total

### Passo 6: Tratar Dados de Tempo Ausentes

Se o Passo 4 produzir `NO_TIMING_DATA`:
1. Informe ao usuário que os hooks de tempo ainda não estão capturando dados
2. Explique que os dados de tempo exigem os hooks `PreToolUse`/`PostToolUse` em `~/.claude/settings.json`
3. Verifique se os hooks estão registrados:
   ```bash
   node -e "const s=require(require('os').homedir()+'/.claude/settings.json');console.log(JSON.stringify({pre:!!s.hooks?.PreToolUse,post:!!s.hooks?.PostToolUse}))"
   ```
4. Se os hooks estiverem ausentes, ofereça-se para instalá-los
5. Observação: os dados de tempo existem apenas para a **sessão atual em diante** — sessões anteriores não têm dados retroativos

### Passo 7: Resumo Rápido de Saúde

Combine a saúde do SYNAPSE + Desempenho em uma única linha de status:

- **Saudável + Rápido**: "SYNAPSE 100% | Sessão: Xs de wall, Y% de pensamento"
- **Saudável + Lento**: "SYNAPSE 100% | Sessão: Xs de wall, Y% de pensamento — gargalo: [detalhe]"
- **Degradado**: "SYNAPSE N avisos | Sessão: Xs de wall — [problema principal]"
- **Quebrado**: "SYNAPSE N problemas críticos — corrija antes da análise de desempenho"
- **Sem dados de tempo**: "SYNAPSE [status] | Hooks de tempo não ativos — execute na próxima sessão para obter dados"

## Contexto

Este diagnóstico verifica:
1. **Status do Hook** - O hook synapse-engine está registrado e funcional?
2. **Status da Sessão** - A sessão tem active_agent, prompt_count, bracket?
3. **Integridade do Manifest** - Todos os domains do manifest têm arquivos correspondentes?
4. **Simulação do Pipeline** - Para o bracket atual, quais camadas devem estar ativas?
5. **Ponte UAP** - A UAP escreveu _active-agent.json na ativação?
6. **Ponte de Memória** - O Pro está disponível? O bracket requer dicas de memória?
7. **Lacunas e Recomendações** - Lista priorizada de problemas com correções
8. **Desempenho da Sessão** - Tempo exato de cada chamada de ferramenta, gaps de pensamento, diagnóstico de gargalos

## Quando Usar

- Após ativar um agente, para verificar se o SYNAPSE está injetando o contexto correto
- Quando rules específicas de agente parecem estar ausentes das respostas
- Ao depurar problemas de injeção de contexto
- **Quando a ativação ou as respostas parecem lentas** — os dados de tempo apontam exatamente onde o tempo é gasto
- Como parte do desenvolvimento de story para mudanças relacionadas ao SYNAPSE
- Periodicamente, para verificar a saúde do sistema

## Dependências

- **Hooks de tempo**: `~/.claude/hooks/timing-logger.js` (PreToolUse/PostToolUse)
- **Analisador de tempo**: `~/.claude/hooks/analyze-timing.js` (relatório CLI)
- **Diagnóstico do SYNAPSE**: `.aiox-core/core/synapse/diagnostics/synapse-diagnostics.js`

## Comandos Rápidos

```bash
# Diagnóstico completo (esta skill)
/synapse:tasks:diagnose-synapse

# Apenas relatório de tempo (CLI)
node ~/.claude/hooks/analyze-timing.js

# Tempo para uma data específica
node ~/.claude/hooks/analyze-timing.js 2026-02-17

# Últimas N entradas
node ~/.claude/hooks/analyze-timing.js --last 50
```
