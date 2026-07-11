---
tipo: nota
area: Olimpo
up: "[[Olimpo/_MOC-olimpo]]"
---

# Contrato de Missão — Schema

> O **chassi** por onde toda missão trafega no sistema hierárquico de 5 camadas do KoldenOS.
> Um único artefato YAML que **desce enriquecido** (input → execução) e **sobe verificado**
> (execução → resposta). Cada camada **assina sua seção sem apagar as anteriores**, e a
> intenção original é **lacrada** para permitir reconciliação na subida.

## Princípios invioláveis

1. **Lacre da intenção (TPND=0).** `intencao_original` é escrita uma única vez pela camada 1
   (Humano, via Hermes) e nunca mais é alterada. Seu `hash` sela o conteúdo. Toda verificação
   na subida reconcilia a entrega contra esse lacre — é o que garante *Total Perda Não Detectada = 0*.
2. **Enriquecer, nunca reescrever.** Cada camada **adiciona** sua seção. Nenhuma camada edita a
   seção de outra. A ordem `intencao_original → hermes → zeus → executivos → operacional → dike`
   é um registro append-only do que cada degrau fez.
3. **Assinatura por seção.** Cada seção carrega `assinatura: {por, em}`. É isso que permite à
   **Dike** localizar o **degrau exato** onde a missão se quebrou — sem culpar, só apontando.
4. **Português do Brasil** em todo conteúdo (Constituição do Caos, Art. II).

## Quem preenche o quê

| Seção | Camada | Quem assina | Quando |
|---|---|---|---|
| `intencao_original` | 1 — Humano | `hermes` (em nome do humano) | na entrada; **lacrada** |
| `hermes` | 2 — Hermes | `hermes` | após DoR + matriz de risco |
| `zeus` | 3 — Zeus (Olimpo) | `zeus` | após diagnóstico + decomposição |
| `executivos[]` | 4 — Executivos | cada executivo (`apolo`, `plutos`…) | uma entrada por executivo acionado |
| `operacional[]` | 5 — Operacional | cada squad/agente de execução | na entrega da execução |
| `dike` | subida — Verificador | `dike` | antes de devolver ao humano |
| `orcamento` / `log_de_decisao` | transversal | qualquer camada (append) | ao longo da missão |

## Campos

### `missao.id`
`m-<timestamp>-<slug>`. O timestamp vem do ambiente (não gerado pelo agente). O slug é um
resumo kebab-case de 2-4 palavras da intenção.

### `intencao_original` — camada 1, **lacrada**
- `input_cru` (string): o pedido do Ronan, **verbatim**. Nunca parafraseado aqui.
- `canal` (string): de onde entrou (`whatsapp`, `telegram`, `cli`, `chat`…). O Hermes (runtime)
  é o transporte, então conhece o canal.
- `recebida_em` (ISO-8601).
- `hash` (string): selo do conteúdo de `input_cru`. Imutável. Conferido pela Dike na subida.

### `hermes` — camada 2 (tradução de intenção)
- `dor` — **Definition of Ready**: os campos mínimos que precisam existir antes de descer.
  - `objetivo_real` (string): o que o Ronan *de fato* quer (não a tarefa literal).
  - `criterio_de_sucesso` (string): como se sabe que deu certo.
  - `restricoes` (mapa): `prazo`, `orcamento`, `proibicoes`.
  - `contexto` (string|lista): referências, links, decisões prévias relevantes.
  - `nivel_de_risco` (enum): `verde` | `amarelo` | `vermelho` (espelha `matriz_de_risco.faixa`).
- `dor_completo` (bool): `true` só quando todos os campos do DoR estão preenchidos sem vaguidão.
  Se `false`, a missão **não desce** — Hermes pergunta (ver `perguntas_abertas`).
- `perguntas_abertas` (lista): perguntas que o Hermes devolve ao Ronan para fechar o DoR.
- `matriz_de_risco`:
  - `reversibilidade` (enum): `reversivel` | `irreversivel`.
  - `impacto` (enum): `baixo` | `medio` | `alto`.
  - `faixa` (enum): `verde` | `amarelo` | `vermelho` (derivada — ver tabela abaixo).
  - `autonomia` (enum): `executa-e-avisa` | `mostra-antes` | `trava-e-pergunta`.
- `ordem_de_maquina` (string): a tradução do input cru em instrução clara e acionável.
- `assinatura` (mapa): `{por: hermes, em: <ISO>}`.

#### Tabela da matriz de risco

| Reversibilidade | Impacto | Faixa | Autonomia |
|---|---|---|---|
| reversível | baixo | **verde** | executa-e-avisa |
| reversível | médio | **amarelo** | mostra-antes |
| reversível | alto | **vermelho** | trava-e-pergunta |
| irreversível | qualquer | **vermelho** | trava-e-pergunta |

> **Autonomia progressiva.** No início, *tudo começa vermelho* (o Ronan aprova todo input).
> Conforme um *tipo* de tarefa é executado com acerto repetido, ele "rebaixa de cor" e ganha
> autonomia. O rebaixamento é registrado em `log_de_decisao` e na memória do usuário (dona: Hermes).

### `zeus` — camada 3 (decomposição + roteamento)
- `diagnostico` (string): leitura estratégica da missão.
- `decomposicao` (lista): cada item `{parte, executivo_destino, motivo}`.
- `paralelo` (lista): ids de executivos acionados simultaneamente (lançamento toca vários).
- `consolidacao` (string): preenchida **na subida**, quando Zeus junta os resultados dos executivos.
- `arbitragem` (string|null): se dois executivos divergem, Zeus **escala ao humano** e registra aqui.
- `assinatura` (mapa).

### `executivos[]` — camada 4 (especificação técnica)
Uma entrada por executivo acionado:
- `agente` (id): `poseidon` | `apolo` | `hefesto` | `hades` | `atena` | `plutos` | `afrodite`.
- `especificacao_tecnica` (string): a parte da missão traduzida para a língua técnica da disciplina.
- `handoff_operacional` (mapa): `{squad, artefato}` — para qual squad de execução vai e com qual artefato.
- `devolucao_lateral` (mapa|null): se a tarefa foi mal roteada (`{para, motivo}`); Zeus re-roteia.
- `resultado` (string): preenchido na subida.
- `assinatura` (mapa).

### `operacional[]` — camada 5 (execução + proatividade)
Uma entrada por squad/agente de execução:
- `agente` (id) / `squad` (nome).
- `resultado` (string): a entrega concreta (artefato, link, código…).
- `riscos_levantados` (lista): a ponta enxerga o que as camadas de cima não veem — **cultura de proatividade**.
- `propostas` (lista): melhorias sugeridas de baixo para cima.
- `assinatura` (mapa).

### `dike` — subida (verificação)
- `confere_hash` (bool): a entrega ainda corresponde à `intencao_original` lacrada?
- `reconciliacao` (enum): `bateu` | `nao-bateu`.
- `degrau_da_quebra` (enum|null): `hermes` | `zeus` | `executivos` | `operacional` | `null`.
  Apontado lendo as assinaturas — **localiza, não culpa**.
- `justificativa` (string): por que bateu ou onde quebrou.
- `veredito` (enum): `sobe` | `volta-para-correcao`.
- `assinatura` (mapa).

### `orcamento` — transversal
- `teto_rodadas` (int): default **2** rodadas de questionamento por handoff. Estourou → escala uma
  camada acima (entre Hermes e Zeus, escala ao **humano**).
- `teto_tempo` (string): limite de tempo da missão (token-budget fica para depois, quando houver volume).
- `rodadas_gastas` (int).

### `log_de_decisao` — transversal
Lista append-only de `{em, por, decisao, porque}`. **Persiste o que muda uma decisão futura**
(decisões + os porquês, preferências aprendidas, rebaixamentos de cor). **Descarta** rascunhos
intermediários e andaime — esses não entram aqui.

## Ciclo de vida (resumo)

```
DESCIDA   Humano → [Hermes: DoR+risco] → [Zeus: decompõe+roteia] → [Executivos: especificam] → [Operacional: executa]
SUBIDA    [Operacional: entrega+riscos] → [Executivos: resultado] → [Zeus: consolida] → [DIKE: reconcilia vs lacre] → [Hermes: cru+resumo PT-BR] → Humano
```

- **Portão fechado** (`dor_completo: false` ou `autonomia: trava-e-pergunta`) → não desce; Hermes pergunta.
- **Dike `nao-bateu`** → `volta-para-correcao` para o `degrau_da_quebra`, sem incomodar o humano.
- **Dike `bateu`** → sobe ao Hermes, que devolve o cru técnico + um resumo em linguagem humana.

## Relação com convenções existentes

Este contrato **estende** o que já existe, não substitui:
- `squad.yaml` → `handoffs` (`routes_to`/`escalates_to`) e `external_handoffs` (`to`/`artifact`)
  continuam descrevendo a topologia **estática** de quem fala com quem.
- Workflows `.yaml` com gates **INFO/WARN/BLOCK** continuam orquestrando fases dentro de um squad.
- O Contrato de Missão é a instância **dinâmica e viva** de uma missão concreta atravessando as camadas.
