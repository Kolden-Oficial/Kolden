---
name: debugging-por-council-e-verification-loop
description: Use quando uma decisão técnica dentro de uma fase (spec, plan ou implement) exige discordância estruturada ANTES do commit — quando um único revisor está viciado no próprio código, quando o custo de errar é alto (migração, refactor de fronteira, patch em código legado), ou quando o time detectou "aprovação por cansaço". Convoca um council de 3 subagentes (revisor, verificador, executor) que discordam em rodadas com Santa Method (crítica só vale se traz sugestão) e verification loop (hipótese > escrita > revisão adversarial > reescrita > aprovação). NÃO substitui `spec-build-review` — é tática INTERNA dentro de cada fase daquela orquestração.
---

# Debugging por Council e Verification Loop

Um so par de olhos ferra a decisao. Um so revisor bajula ou reprova por
teimosia. O council resolve isso com **discordancia estruturada**: tres
vozes com papeis nao intercambiaveis, uma rodada de critica que carrega
sugestao, uma rodada de reescrita, e um veredito que exige convergencia
real — nao apaziguamento.

## Quando disparar

- Decisao de fronteira: mudanca de contrato publico, esquema de dado,
  invariante de negocio, patch em codigo que outros dependem.
- Fase interna de `spec-build-review` que precisa de rigor extra:
  revisao de plano/tarefas antes de `/implement`, revisao de patch antes
  de `git commit`.
- Voce ja tem um output tecnicamente correto, mas suspeita que esta
  cego para uma dimensao (seguranca, performance, ergonomia da API).
- Um QA gate passou "no papel" e voce quer verificar adversarialmente.

**Nao use quando:**
- E depuracao operacional de bug (use `depuracao-sistematica`).
- E revisao de spec para ambiguidade (use `clarificacao-de-ambiguidade`).
- E revisao cross-artefato completa (use `analise-cross-artefato`).
- E uma escolha de gosto (paleta, nome, wording) — council e overkill.

## Fronteira com `spec-build-review`

`spec-build-review` orquestra a **jornada** ideia > spec > build >
review, com dois gates humanos globais. Esta habilidade orquestra a
**tatica** dentro de qualquer uma dessas fases quando o risco justifica.

Regra: sempre invoque esta habilidade **de dentro** de uma fase da
jornada raiz. Nunca invoque como substituta.

## O Council (3 subagentes, papeis fixos)

### Papel 1 — Revisor adversarial

Missao: encontrar defeito. Nao propor solucao no primeiro turno.
Contrato de saida: lista de N criticas, cada uma marcada por severidade
(bloqueadora / relevante / marginal) e categoria (seguranca / correcao
/ performance / manutenibilidade / clareza).

**Antipadrao:** revisor que aprova. Se nao encontra defeito, escreve
"nenhum defeito encontrado" — nao aprova o artefato (essa e funcao do
verificador).

### Papel 2 — Verificador

Missao: verificar cada critica do revisor **contra evidencia**. E o
revisor tem razao? A critica se sustenta em invariante escrita, em
teste, em uso real?

Contrato de saida: para cada critica do revisor, um veredito
`sustentada / infundada / precisa-mais-evidencia`. Verificador
INDEPENDENTE — nao le o mesmo material que o revisor viu; le a
evidencia (spec, teste, log, dado).

### Papel 3 — Executor

Missao: incorporar as criticas sustentadas na reescrita. Se rejeita uma
critica sustentada, escreve razao explicita — nao ignora silenciosamente.

Contrato de saida: nova versao do artefato + registro por critica de
`aplicada / rejeitada com razao / adiada como debito`.

**Nenhum papel pode ser cumulado.** O mesmo agente nao pode ser revisor
e executor — quebra a discordancia.

## Santa Method — critica com sugestao

Regra dura: **cada "naughty" so vale se carrega "nice"**. Ou seja, uma
critica so entra no ledger se acompanha uma **sugestao concreta** —
mesmo que a sugestao seja rejeitada depois.

Forma:
```
CRITICA-3 (bloqueadora / seguranca):
  Naughty: query recebe parametro do request sem validacao de tipo.
  Nice: interpor `parseInt` + range check antes; se falhar, retornar 400.
```

- Critica sem "nice" > o revisor precisa reformular ou retirar.
- "Nice" pode ser rejeitada pelo executor — mas obriga o executor a
  articular por que a solucao NAO se aplica (nao apenas dizer "nao").
- Isto mata a bajulacao (nao ha "aprovado" possivel sem critica) e mata
  a ranca (nao ha critica destrutiva sem via de saida).

## O Verification Loop (5 passos)

O ciclo interno que cada rodada do council roda:

```
1. Hipotese     > o executor formula "acho que X resolve".
2. Escrita      > o executor produz o artefato ancorado em X.
3. Revisao      > revisor + verificador rodam Santa Method.
4. Reescrita    > executor incorpora criticas sustentadas.
5. Aprovacao    > revisor declara "sem defeito novo"; verificador
                  confirma evidencia; sai da rodada.
```

Limites:
- **Max 3 rodadas.** Se na 4a rodada nao converge, escala para humano
  (gate global). Convergencia forcada mascara desalinhamento de
  fundamentos.
- **Sem convergencia > escalar, nao apaziguar.** Convergir por
  cansaco e o pior anti-padrao — produz falso consenso.
- **Cada rodada deixa artefato** — hipotese, escrita, criticas, reescrita
  ficam salvos como log da decisao. Reusavel em postmortem.

## Antipadroes do council

- **Revisor unico** — mata a discordancia. Voz unica bajula ou reprova
  por gosto.
- **Executor que le a critica antes de escrever** — enviesa a hipotese.
  O executor propoe primeiro, sofre depois.
- **Verificador que assume a mesma fonte do revisor** — dobra o vies.
  Verificador precisa de fonte independente (dado real, teste, spec
  original — nao a opiniao do revisor).
- **Rodada aberta sem prazo** — vira debate perpetuo. Max 3 rodadas.
- **"Aprovar com ressalva"** — nao existe. Ou aprova, ou pede outra
  rodada, ou escala.

## Contratos de saida (por rodada)

Cada rodada produz um artefato em `.claude/registros/council/`:

```
YYYY-MM-DD-{fase}-{artefato}-r{N}.md
  hipotese_do_executor:
  escrita_v{N}: (link para o artefato)
  criticas_do_revisor:
    - id: CRIT-1
      severidade: bloqueadora | relevante | marginal
      categoria: seguranca | correcao | perf | manutenibilidade | clareza
      naughty: ...
      nice: ...
  verificacao_do_verificador:
    - id: CRIT-1
      veredito: sustentada | infundada | precisa-mais-evidencia
      evidencia: <arquivo/linha/teste>
  reescrita_do_executor:
    - id: CRIT-1
      acao: aplicada | rejeitada | adiada
      razao_se_rejeitada: ...
  veredito_da_rodada: aprovado | outra-rodada | escalar
```

Este ledger fecha o loop com auditabilidade. Sem ledger, nao houve
council — houve reuniao.

## Handoffs

| Situacao | Habilidade destino |
|---|---|
| Council achou defeito de causa raiz | `depuracao-sistematica` |
| Council achou ambiguidade na spec | `clarificacao-de-ambiguidade` |
| Council achou inconsistencia cross-artefato | `analise-cross-artefato` |
| Rodada 4 sem convergencia | Gate humano de `spec-build-review` |
| Council valida antes de git commit | Fluxo padrao do `@dev` |
| Council valida antes de git push | Autoridade `@devops` (nao dispensa) |

## Checklist antes de fechar o council

- [ ] 3 papeis atribuidos a 3 subagentes diferentes.
- [ ] Cada rodada tem ledger em `.claude/registros/council/`.
- [ ] Cada critica carrega naughty + nice (Santa Method).
- [ ] Verificador ancorou cada veredito em evidencia independente.
- [ ] Executor registrou acao (aplicada/rejeitada/adiada) por critica.
- [ ] Convergencia real (max 3 rodadas) ou escalacao explicita.
- [ ] Ledger anexado a story/plan para rastreabilidade.

---

## Heranca historica

- **Doug Engelbart** — *Augmenting Human Intellect* (SRI, 1962; demo
  "Mother of All Demos", 09-dez-1968). Bootstrapping cognitivo: o time
  produz melhor quando as ferramentas amplificam a critica mutua, nao a
  concordancia. O council e uma releitura dessa ideia para agentes.
- **Alistair Cockburn** — *Crystal Clear: A Human-Powered Methodology
  for Small Teams* (Addison-Wesley, 2004). Metodologias Crystal
  formalizam "pair-programming disciplined": dois atores com papeis
  distintos, revisao continua com contratos de saida. O council estende
  para tres papeis nao intercambiaveis.
- **Kent Beck** — *Test-Driven Development: By Example* (Addison-Wesley,
  2002); *Extreme Programming Explained* (2ª ed., Addison-Wesley, 2004).
  TDD carrega o council implicito: RED (revisor: falta funcao) > GREEN
  (executor: minimo para passar) > REFACTOR (verificador: e realmente
  bom?). Cada rodada e ele mesmo, contra si mesmo, ao longo do tempo.
- **John Ousterhout** — *A Philosophy of Software Design* (Yaknyam
  Press, 2018; 2ª ed. 2021). Revisao com foco em complexidade
  incidental; o revisor tecnico separa "necessary" de "accidental" — a
  base pratica do Santa Method aqui.
- **Christopher Alexander** — *A Pattern Language* (Oxford, 1977).
  Padroes de decisao com forcas em tensao; cada padrao carrega o
  problema, as forcas, a solucao. O council reencena isso a cada
  artefato: qual e a forca, qual e a solucao, qual e o custo de nao
  aplicar.

Nenhum trecho copiado; sintese propria do Prometeu.

## Procedencia

Skill nova (F6 do lote `_lote-2026-06-26`), fundindo a tecnica G6 do
`affaan-m/everything-claude-code` (council / santa-method /
verification-loop) documentada em
`Caos/registros/absorcao/_lote-2026-06-26/relatorio-de-perda-prometeu.md`
(anexo ECC). Ancoragem historica adicional a partir da tradicao XP/TDD/
Crystal. Absorcao em PT-BR, sem copia literal. Autoria: Prometeu /
Kolden, 2026.
