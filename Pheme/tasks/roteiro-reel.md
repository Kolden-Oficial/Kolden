---
task: roteiroReel()
responsavel: "@short-video-architect"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: tema
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: rede
    tipo: enum
    origem: User Input
    obrigatorio: true

Saida:
  - campo: roteiro_video_curto
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 3 opções de gancho de 3s"
  - "[ ] Roteiro cena a cena sem tempo morto"
  - "[ ] Texto na tela e CTA definidos"
---

# Tarefa: Roteiro de Vídeo Curto (Reel / TikTok / Short)

**ID da Tarefa:** PHEME-002
**Versão:** 1.0.0
**Comando:** `*roteiro`
**Agente:** Arquiteto de Vídeo Curto (short-video-architect)
**Objetivo:** Produzir um roteiro vertical pronto para gravar, otimizado para retenção.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| tema | string | Prompt do usuário | Sim | Assunto/pilar da peça |
| rede | enum | Prompt do usuário | Sim | reel, tiktok, short |
| pilar | string | Prompt do usuário | Não | Pilar de conteúdo |
| cta | enum | Prompt do usuário | Não | seguir, salvar, comentar, link |
| duracao | string | Prompt do usuário | Não | 15-60s |

## Fases de Execução

### Fase 1: Ganchos
1. Gerar 3 opções de gancho de 3 segundos (visual + fala + texto na tela).
2. Recomendar o gancho primário e por quê.

### Fase 2: Estrutura de Retenção
1. Montar roteiro: Gancho (0-3s) → Promessa (3-7s) → Entrega em passos → Payoff → CTA/loop.
2. Abrir um loop no gancho a fechar no final.
3. Eliminar qualquer tempo morto; cortar a cada 1-3s.

### Fase 3: Produção
1. Indicar fala + texto na tela + visual/b-roll por bloco de tempo.
2. Sugerir áudio/trend quando relevante (adaptado ao pilar).
3. Definir o CTA final (seguir/salvar/etc.) e/ou loop.

## Formato de Saída

```markdown
## Roteiro {rede}: {tema}

**Ganchos (escolha 1):**
1. ... 2. ... 3. ...  → Recomendado: #

**Roteiro:**
| Tempo | Fala | Texto na tela | Visual / B-roll |
|-------|------|---------------|-----------------|
| 0-3s  | ...  | ...           | ...             |
...

**Áudio/Trend sugerido:** ...
**CTA / Loop final:** ...
```

## Condições de Veto
- NUNCA comece com "oi pessoal"/intro — comece pelo gancho
- NUNCA deixe tempo morto
- NUNCA esqueça o texto na tela

## Critérios de Conclusão
- [ ] 3 ganchos de 3s + recomendação
- [ ] Roteiro cena a cena com retenção
- [ ] Texto na tela em cada bloco
- [ ] CTA/loop final definido
