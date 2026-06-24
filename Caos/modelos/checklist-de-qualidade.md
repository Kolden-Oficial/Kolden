# Checklist de qualidade do Kolden — cascata macro → micro

Todo agente precisa passar em 100% dos itens bloqueantes (B) antes da entrega. Itens recomendados
(R) geram observação, não reprovação. Itens **B equivalem a CRITICAL**: um único B não atendido
reprova a entrega.

**Organização em cascata (do macro ao micro)** — espelha a ordem de construção da Fase 5:

| Nível | Foco | Quando |
|---|---|---|
| **N0** Ecossistema | escopo, constituição, reuso, anti-falha | macro |
| **N1** Orquestrador | roteia (não executa), roster, síntese, veto | |
| **N2** Especialistas | tools restritas, retorno, herança histórica | |
| **N3** Habilidades | frontmatter, gatilho, sem duplicar CLAUDE.md | |
| **N4** MCPs/APIs | tools de fluxo, erros acionáveis, eval, Infisical | |
| **N5** Memória | ritual-de-encerramento, MEMORY.md, persistência | |
| **N6** Referências | herança histórica por camada, score ≥7, sem cópia | micro |

> **Motor:** o `revisor` (Fase 6) roda esta cascata via a skill `checklist-runner` do Prometeu
> (`Prometeu/.claude/skills/checklist-runner`), modo YOLO ou interativo, veredito pass/fail/partial.
> BLOCK em qualquer item B. Os itens transversais ao final aplicam-se a todos os níveis.

---

## N0 — Ecossistema (macro)

### Escopo (interno vs cliente)
- [ ] B — escopo definido no PRD (interno / cliente)
- [ ] B — **se cliente:** LGPD/PII mapeada, base de consentimento, retenção e expurgo definidos
- [ ] B — **se cliente:** dados isolados de outros clientes e do interno; segredos em `/kolden/cliente-<x>/`
- [ ] B — **se cliente:** handoff com responsável humano + SLA; recusa não expõe interno da Kolden
- [ ] B — **se cliente:** aprovação de produção pelo dono da conta (além do Ronan)

### Constituição e governança
- [ ] B — compliance com os 7 artigos da Constituição (`constituicao.md`)
- [ ] B — PRD foi aprovado pelo usuário antes da construção (Art. III)
- [ ] B — nenhuma credencial em texto puro em nenhum arquivo (Art. VII)
- [ ] B — Fase 0 registrada: decisão REUSE/ADAPT/CREATE consta
- [ ] B — entidade registrada em `dados/registro-de-entidades.yaml` (na Fase 8)

### Modos de falha / pré-morte (eixo anti-falha)
- [ ] B — seção 10 (Modos de falha) do PRD preenchida, vinda do Bloco 9 do diagnóstico
- [ ] B — cada modo de falha tem uma mitigação real na arquitetura/hooks
- [ ] B — cada modo de falha tem um teste adversarial na Fase 7
- [ ] B — ao menos 1 KPI anti-falha em "Resultados de sucesso"

## N1 — Orquestrador (só em squad)
- [ ] B — o orquestrador roteia e sintetiza; **não executa** o trabalho especializado
- [ ] B — `roster:` declarado e apontando para especialistas que existem (sem roster vazio)
- [ ] B — workflows com checkpoint `veto` que interrompe (HALT) em falha de gate
- [ ] R — roteamento para 1-3 especialistas por vez (custo)

## N2 — Especialistas (subagents)
- [ ] B — campo tools restrito ao necessário (nunca omitido)
- [ ] B — formato de retorno ao agente principal definido
- [ ] B — cada especialista de domínio com herança histórica mapeada (ver N6)
- [ ] R — máximo 3 especialistas sem justificativa no blueprint

## N3 — Habilidades
- [ ] B — toda habilidade tem frontmatter com name e description
- [ ] B — descrições específicas com gatilhos de invocação
- [ ] B — nenhuma habilidade duplica conteúdo do CLAUDE.md
- [ ] B — cada habilidade liga ao especialista/dono (sem habilidades órfãs)
- [ ] B — catálogo de habilidades (`.claude/skills/catalogo.md`) atualizado com a nova habilidade
- [ ] R — habilidades com menos de 150 linhas

## N4 — MCPs / APIs próprios (só se o PRD §5 pedir construir)
- [ ] B — REUSE checado antes de construir (equivalente no registro/catálogo?)
- [ ] B — tools modelam fluxos de trabalho, não endpoints 1:1
- [ ] B — mensagens de erro acionáveis, em pt-BR
- [ ] B — `annotations` de segurança por tool (readOnly / destructive / idempotent)
- [ ] B — credenciais 100% via Infisical; zero segredo no código/arquivo versionado
- [ ] B — eval com ~10 perguntas/tarefas reais passando (harness do mcp-builder)
- [ ] B — registrado como entidade `tipo: mcp` com `dependencias: [mcp-builder]`

## N5 — Memória
- [ ] B — `MEMORY.md` do agente presente (esquema Padrões Ativos / Candidatos / Arquivado)
- [ ] B — reflexo `Stop` `encerramento-aprendizado.sh` + bloco "Ritual de Encerramento" no CLAUDE.md
- [ ] B — o que persiste e quem lê/escreve definido (PRD §6); comportamento em memória vazia/corrompida
- [ ] R — memória persistente em banco (Supabase/Neon) quando o volume justificar

## N6 — Referências e herança histórica (micro)
- [ ] B — referência por camada (orquestrador, cada especialista, cada habilidade de domínio) com score ≥ 7 registrada no PRD §11
- [ ] B — cada especialista de domínio tem herança histórica mapeada (biography + core_frameworks) no schema `modelos/especialista-historico.md`
- [ ] B — nenhum trecho literal de obra/material proprietário copiado (só padrão extraído, reescrito em pt-BR com fonte)
- [ ] R — material-fonte local depositado em `referencias/biblioteca/<dominio>/` quando disponível

---

## Transversais (aplicam-se a todos os níveis)

### System prompt
- [ ] B — os 5 blocos presentes: persona, objetivo, restrições, formato, exemplos
- [ ] B — mínimo 3 exemplos (caso feliz + recusa/escalação + caso de borda/falha)
- [ ] B — soft skills descritas como comportamento ("quando X, faça Y"), não adjetivos
- [ ] B — agnóstico de modelo (sem recurso exclusivo de um LLM)
- [ ] B — toda restrição rastreia para um guardrail ou modo de falha do PRD
- [ ] B — o prompt define o comportamento do agente em cada modo de falha do PRD
- [ ] R — entre 80 e 200 linhas

### Ferramentas
- [ ] B — toda ferramenta citada no prompt existe em ferramentas.md
- [ ] B — cada ferramenta tem: função, forma de acesso e credencial (Infisical)
- [ ] B — nenhuma credencial em texto puro em nenhum arquivo
- [ ] R — comportamento de falha definido para cada ferramenta

### Reflexos
- [ ] B — toda proibição absoluta do PRD virou reflexo PreToolUse
- [ ] B — reflexo de auditoria PostToolUse presente
- [ ] B — scripts com permissão de execução (chmod +x)
- [ ] B — caminhos usam $CLAUDE_PROJECT_DIR
- [ ] B — reflexo verificacao-diaria.sh presente e configurado no settings.json (SessionStart)

### Documentação
- [ ] B — prd-de-ia.md existe, completo, com status "aprovado"
- [ ] B — diagnostico.md existe com os blocos preenchidos
- [ ] B — instalacao.md explica como ativar o agente do zero
- [ ] B — perfil.md presente (persona + soft/hard skills)
- [ ] R — historico de versões iniciado no PRD

### Teste de comportamento (Fase 7)
- [ ] B — roteiro de teste executado pelo `testador`
- [ ] B — maturity score ≥ 7.0 E todo modo de falha protegido
- [ ] B — cobertura por nível N0→N6 verificada (nenhum nível em branco quando aplicável)
- [ ] B — testes de abuso (injeção/coerção/extração de segredo) resistidos
- [ ] B — todo guardrail NÃO-NEGOCIÁVEL segurou em execução (não só no texto)
- [ ] B — toda ferramenta crítica verificada como alcançável

### Consistência
- [ ] B — tudo em português do Brasil
- [ ] B — nomes em kebab-case, minúsculas
- [ ] B — toda referência cruzada aponta para arquivo que existe
- [ ] B — agente registrado em registros/historico.md
