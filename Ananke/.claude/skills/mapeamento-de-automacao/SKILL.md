---
name: mapeamento-de-automacao
description: >
  Use para avaliar se uma tarefa repetitiva VALE automatizar e DESENHAR o fluxo mapeado para o n8n-MCP
  (gatilho → nós → integrações → dado → tratamento de erro), entregando um pacote de handoff para o
  Dédalo construir. Cobre a triagem por retorno (frequência × tempo × risco × estabilidade), o blueprint
  n8n, o human-in-the-loop e os critérios de aceite. Habilidade-âncora do squad Ananke, dona:
  analista-de-automacao. Gatilhos: "automatizar", "isso é repetitivo", "dá pra automatizar X?", "fluxo
  automático", "n8n", "integrar A com B", "tirar o trabalho manual". REGRA DURA: a Ananke DESENHA e
  MAPEIA; a CONSTRUÇÃO técnica é handoff ao Dédalo — nunca "já automatizei". Processo instável volta para
  padronização (arquiteto-de-processos) antes de automatizar.
---

# Mapeamento de Automação (desenho de fluxo → handoff Dédalo)

A Ananke é dona do **desenho** da automação; o **build** é do Dédalo. Esta habilidade decide o que vale
automatizar e produz o **blueprint** que o Dédalo constrói no n8n. A regra-mãe: **automatizar o caos só
acelera o caos** — só se automatiza o que é estável e de volume.

## 1. Triagem — vale automatizar?

Pontue o candidato:

- **Frequência:** quantas execuções por mês? (volume justifica o esforço)
- **Tempo por execução:** quanto custa cada repetição manual?
- **Risco de erro humano:** erro caro/frequente? (automação reduz variabilidade)
- **Estabilidade:** o processo está padronizado (tem SOP)? Se **instável → devolver ao `arquiteto-de-processos`** primeiro.
- **Nº de sistemas:** multi-sistema com copia-e-cola é forte candidato.

**Retorno estimado** = frequência × tempo poupado por execução (horas/mês). Veredito: *automatizar / padronizar
antes / não vale*.

## 2. Blueprint n8n (o desenho que o Dédalo constrói)

Especifique o fluxo no formato que o **n8n-MCP** (vendor catalogado) entende e o Dédalo implementa:

```
GATILHO: webhook | agendamento (cron) | evento de app | manual.
NÓ 1: <ação> [app/integração] — entrada: <dado> → saída: <dado>.
NÓ 2: ...
RAMIFICAÇÃO: se <condição> → caminho A, senão → caminho B.
TRANSFORMAÇÃO: <mapeamento/formatação de dado entre nós>.
HUMAN-IN-THE-LOOP: <onde uma decisão exige humano> (não automatizar julgamento crítico cego).
TRATAMENTO DE ERRO: se <nó> falhar → <ação> + fallback humano (notificar <quem>).
```

- **Integrações:** liste cada app/API e a credencial necessária como **referência Infisical**
  (`/kolden/ananke/...`), **nunca o valor**.
- **Tratamento de erro é obrigatório:** automação sem plano de falha quebra silenciosa e ninguém percebe.
- **Validar disponibilidade dos nós:** se houver dúvida se o n8n suporta uma integração/nó, marque
  "VALIDAR com Dédalo" em vez de inventar um nó inexistente.

## 3. Human-in-the-loop

Nem tudo deve ser automático. Marque os pontos onde uma decisão precisa de aprovação humana (valor alto,
exceção, risco). O fluxo pausa, notifica e espera — não decide sozinho o que é crítico.

## 4. Pacote de handoff ao Dédalo

O que o Dédalo recebe para construir sem perda:

- **Blueprint n8n** (gatilho → nós → integrações → erro).
- **Integrações e credenciais** (referências Infisical, sem valores).
- **Critérios de aceite:** o que o fluxo deve fazer e **como validar** (cenário de sucesso + cenário de falha).
- **Modos de falha esperados** e o fallback de cada um.

O Dédalo constrói, testa e devolve. A medição do ganho pós-automação é handoff ao `analista-de-eficiencia`.

## Limites e handoffs

- **Não constrói** o workflow n8n (código/config) → **Dédalo** (engenharia).
- **Não padroniza** o processo instável → `arquiteto-de-processos` (faz primeiro).
- **Não mede** o ganho pós-automação → `analista-de-eficiencia`.
- **Custo** da ferramenta/execução → Pluto. **Segurança** das integrações → Egide.

---
*Procedência (squad-semente, lote 2026-06-26): princípio adaptado de `anthropics/knowledge-work-plugins@78d74d5`
(Apache-2.0 — operations: process-optimization) e `alirezarezvani/claude-skills@4a3c05b` (MIT — cluster G20).
n8n-MCP é vendor catalogado da Kolden (mapeamento aqui; construção pelo Dédalo). Sem cópia literal — reescrito
para o padrão Kolden.*
