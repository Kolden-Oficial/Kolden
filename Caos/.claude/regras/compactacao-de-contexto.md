# Compactação de contexto — handoff entre fases

Regra de apoio à operação do Ritual. O Ritual completo pode levar horas; em agentes/squads
complexos, o contexto cresce. Esta regra mantém a sessão enxuta sem perder o que importa.

## Princípio

O estado vive nos **arquivos** (`diagnostico.md`, `prd-de-ia.md`, blueprint, registry),
não na conversa. Ao concluir uma fase e iniciar a próxima, comprima o que aconteceu em um
**artefato de handoff curto** em vez de carregar todo o histórico da fase anterior.

## Artefato de handoff (entre fases)

Ao passar de uma fase para a próxima, gere mentalmente um resumo de no máximo ~400 tokens:

```yaml
handoff:
  de_fase: "<n. nome>"
  para_fase: "<n. nome>"
  agente_em_criacao: "<nome>"
  tipo: "solo | squad"
  arquivos_de_estado:
    - "agentes/<nome>/diagnostico.md"
    - "agentes/<nome>/prd-de-ia.md"
  decisoes_chave:           # máx 5
    - "<decisão de arquitetura ou diagnóstico>"
  pendencias:               # máx 3
    - "<o que a próxima fase precisa resolver>"
  proxima_acao: "<o que a próxima fase deve fazer primeiro>"
```

## O que SEMPRE preservar

- Nome e tipo (solo/squad) do agente em criação.
- Caminhos dos arquivos de estado (diagnóstico, PRD, blueprint).
- Decisões de arquitetura já tomadas (ex.: "vai ser squad com 4 especialistas").
- Veredito da Fase 0 (REUSE/ADAPT/CREATE) e a entidade-base, se ADAPT.
- Pendências abertas que a próxima fase precisa resolver.

## O que DESCARTAR

- A transcrição completa das rodadas de perguntas do diagnóstico (fica em `diagnostico.md`).
- O relatório bruto da pesquisa (a recomendação destilada basta).
- Raciocínios já decididos e alternativas já rejeitadas.

## Sessões muito longas

- Use `/compact` quando o contexto pesar; os arquivos de estado permitem retomar do ponto.
- Em squads com muitos especialistas, construa um tier por vez, registrando o progresso no
  blueprint antes de avançar.
