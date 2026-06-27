---
name: brevidade-de-saida
description: Use quando uma sessão de agente de código gastar tokens de saída demais e você quiser cortar ~65-75% do verbo sem perder substância técnica — respostas, commits, comentários de PR e até a compressão de arquivos de memória/CLAUDE.md de entrada. Aciona quando o Ronan pedir "modo enxuto/caveman", quando o contexto estiver pesado, ou ao preparar memória/instruções longas para reinjeção econômica. NÃO comprima avisos de segurança, ações irreversíveis nem passos multi-etapa — isso volta a prosa normal.
---

# Brevidade de Saída (modo "caveman" soberano)

Modo de comunicação ultracomprimido para agentes de engenharia: corta artigos, hedging,
preâmbulo e elogio, mantendo **100% da substância técnica** (fatos, números, caminhos, código,
comandos). Economia típica medida: **~65-75% dos tokens de saída** e **~46% na compressão de
arquivos de memória** de entrada. O ganho real é *seu*, não da telemetria de ninguém.

> **Soberania de dados (ressalva Kolden, inegociável).** A ferramenta de origem comprime
> chamando direto a **API da Anthropic**. Aqui isso é **proibido**: toda compressão que precise
> de um LLM roteia pelo **LLM próprio da Kolden** — OpenRouter (modelo configurável) ou modelo
> local (Ollama). Credenciais SEMPRE via Infisical, nunca em texto puro. O modo de saída em si
> (regras de estilo abaixo) é só prompt — não chama API nenhuma.

## 1. Comprimir a saída (modo de estilo)

Três níveis de intensidade — escolha pelo risco/ambiguidade da tarefa:

| Nível | Quando | Regra |
|---|---|---|
| **lite** | padrão diário | corta preâmbulo/hedging/elogio; frases curtas; mantém conectivos mínimos p/ legibilidade |
| **full** | resposta densa, muito token | telegráfico: sujeito implícito, sem artigos supérfluos, listas > parágrafos |
| **ultra** | dump técnico puro p/ outro agente | máxima densidade; só fatos/símbolos; zero cortesia |

- **Opção avançada `wenyan` (compressão extrema):** registro clássico/telegráfico para o caso em
  que a saída é consumida só por máquina e cada token conta. Use com parcimônia — ilegível para humano.
- Listas e tabelas batem parágrafos. Um fato por linha.

## 2. Guardrail Auto-Clarity (sobrepõe tudo)

A compressão **NUNCA** vale para conteúdo onde ambiguidade causa dano. Caia para **prosa normal e
completa** ao escrever:

- avisos de segurança, dados sensíveis, LGPD;
- ações **irreversíveis** (deleção, `git push --force`, `DROP`, `down -v`, rotação de segredo);
- sequências multi-passo onde a ordem importa e pular um passo quebra;
- explicação de risco/trade-off que o humano vai usar para decidir.

Terminou o trecho sensível, retome o nível de brevidade. Na dúvida entre comprimir e clarear, **clareie**.

## 3. Preservação de idioma (requisito Kolden)

Comprime-se o **estilo**, nunca a **língua**. Saída em **PT-BR**. Termos técnicos, nomes de
símbolo, trechos de código, mensagens de erro e caminhos de arquivo vão **verbatim** — jamais
traduzidos ou abreviados.

## 4. Comprimir a entrada (memória / CLAUDE.md / todos)

Para encolher arquivos longos que entram no contexto todo dia (CLAUDE.md, MEMORY.md, listas de
tarefas), o padrão de orquestração seguro é:

1. **Backup primeiro** — copie o original antes de tocar; restauração automática se a validação falhar.
2. **Denylist + cap de tamanho ANTES de mandar a um LLM** — nunca envie arquivo em path sensível
   (`.env`, `*.key`, `*.pem`, segredos) nem acima do cap. (DLP completo é domínio do **Egide** —
   ver a habilidade `escrita-segura-e-dlp` dele; aqui é o mínimo de segurança que nunca se pula.)
3. **Frontmatter verbatim** — YAML/metadados no topo não se comprimem; só o corpo.
4. **compress → validate → retry (até 2×)** — comprima via **LLM próprio**, valide que nada
   técnico se perdeu; se a validação reprovar, tente de novo; estourou as tentativas, **restaure o backup**.

Formatos terse prontos (commit Conventional, comentário de PR de 1 linha, cartão de referência dos
modos): ver `references/formatos-terse.md`.

## Ativação e persistência

O modo é um **estado de sessão** que se ativa por linguagem natural ("modo enxuto", "caveman full")
ou slash, e se mantém por turno via flag. O padrão de reflexo que persiste o modo (flag-file,
ativação NL/slash, reforço por turno, statusline) está na habilidade `reflexos-resilientes-e-bootstrap`
deste mesmo squad — não reimplemente aqui.

---
*Fonte: JuliusBrussee/caveman@25d22f864ad68cc447a4cb93aefde918aa4aec9f (skills `caveman`, `caveman-compress`, `caveman-commit`, `caveman-review`, `caveman-help`; orquestrador `compress.py`). Licença MIT (Julius Brussee). Princípio extraído e reescrito em PT-BR; sem cópia literal. **Desvio soberano deliberado:** a compressão por LLM foi religada ao LLM próprio da Kolden (OpenRouter/local via Infisical), removida a chamada direta à API Anthropic do original. Telemetria de tokens (caveman-stats) roteada ao Metis; DLP (denylist/symlink-safe) roteado ao Egide; harness de eval honesto roteado ao Prometeu.*
