---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Ledger append-only e seções do MEMORY.md — referência da captura de instintos

## Seções do MEMORY.md (esquema do Kolden)

Todo `MEMORY.md` de agente segue três seções. Os instintos vivem aqui antes de virar entidade.

```markdown
## Padrões Ativos
> Instintos promovidos ou em uso confiável. Confiança ≥0.7, visto em ≥2 sessões.
- <id>: <gatilho> → <ação>  (confiança, domínio, escopo)

## Candidatos a Promoção
> Instintos novos/imaturos. Aguardando repetição ou confirmação.
- <id>: <gatilho> → <ação>  (confiança, evidência: <verbatim>)

## Arquivado
> Clusters promovidos (com ponteiro para a entidade criada) ou instintos refutados.
- <id> → promovido para skill `<nome>` em <data>   |   refutado por <contraexemplo>
```

## Ledger append-only (trilha de evidência)

Quando o aprendizado precisa de **trilha auditável** (ex.: o instinto influencia decisões repetidas
ao longo do tempo), use um ledger append-only em JSONL — nunca reescreva linhas, só anexe.

Cada rollout/observação registra:
- id e timestamp da observação;
- instinto vencedor anterior + watchlist anterior;
- informação fresca ingerida;
- contagem de trials (quantas vezes o padrão se confirmou);
- marca de cada candidato: **aceitar | observar | rejeitar | decair-observação | precisa-replay**;
- marca de coerência contra o ledger anterior;
- resultado do gate de promoção.

Exemplo de marca de coerência (compacta):

```text
Instinto bate com vencedor anterior: true
Visto em projeto novo: false
Promoção ao vivo permitida: false
Razão: gates de replay e frescor não satisfeitos
```

## Gate de promoção (regras)

Promova um cluster de instintos a entidade (skill/reflexo/especialista) **somente quando**:
- a confiança média do cluster ≥0.7;
- o padrão foi visto em ≥2 sessões (≥2 **projetos** para escopo global);
- correção e replay batem (não é acidente de uma sessão);
- a evidência é durável (registrada verbatim, não parafraseada);
- para ação destrutiva/sensível: o humano aprovou o passo ao vivo (Constituição).

Rebaixe um instinto quando: deriva de contexto, dado velho, contraexemplo, ou replay falhou.
Confiança alta **não** é aprovação para agir — é só prioridade de atenção.

## Forma do resumo

Lidere pela decisão, não pelo drama:

```text
Sessão 12: o instinto "grep antes de relatório" se confirmou (4ª vez), confiança 0.6→0.75.
Status: candidato maduro. Próximo gate: aparecer em 2º projeto para promover a global.
```

---
*Fonte: `affaan-m/everything-claude-code@2bc924f` (`continuous-learning-v2`,
`recursive-decision-ledger`) — MIT. Reescrito em PT-BR, sem cópia literal.*
