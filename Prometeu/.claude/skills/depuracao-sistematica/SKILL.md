---
name: depuracao-sistematica
description: Use quando um bug/incidente precisar ser depurado com método (não "chuta e roda"), quando o time repete o mesmo bug em variantes, ou quando um teste passa mas o problema volta em producao. Impoe as 4 fases (observar > hipotetizar > isolar > intervir), root-cause tracing por 5-whys sobre stack+git blame+logs, defense-in-depth (fail-fast, invariantes, retry com backoff, circuit-breaker), condition-based-waiting (polling > retry-loop; promessa > polling) e caca a anti-padroes de teste (teste que muda com o codigo, testa o mock, sem assercao). Complementa `qa-e-quality-gates` — aquela desenha a estrategia de teste; esta e o metodo operacional quando o defeito ja esta no chao.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Depuracao Sistematica

Depurar nao e "chutar e rodar ate parar de reclamar". E um metodo — o mesmo ha
mais de 60 anos, refinado por geracoes. Esta habilidade obriga o Prometeu (e os
agentes que o consomem — `@dev`, `@qa`, `@architect`) a seguir o metodo
independentemente da pressa ou da tentacao de "so tentar mais uma coisa".

## Quando disparar

- Bug reproduzivel ou intermitente, ainda sem hipotese de causa raiz confirmada.
- Incidente em producao com stack trace + logs, precisa de postmortem.
- Teste passa localmente mas quebra em CI (ou vice-versa).
- Fix aplicado, mas o mesmo bug volta em variante.
- Sistema flakey (falha 1 vez em N execucoes sem padrao aparente).

**Nao usar quando:** o pedido e escrever teste novo do zero (isso e
`qa-e-quality-gates`) nem quando e revisar codigo ja pronto (isso e
`padroes-de-engenharia-idiomatica`).

## As 4 fases (nesta ordem, sem pular)

### Fase 1 — Observar sintomas (sem interpretar)

Colete **fatos**, nao teorias. Cada fato precisa de fonte verificavel.

- Repro deterministico: passos exatos, dados exatos, ambiente exato.
- Log bruto (nao parafraseado): stack trace, timestamps, request-id.
- Delta: o que mudou entre "funcionava" e "quebrou" (git log, deploy log,
  mudanca de config, mudanca de dado, mudanca de dependencia).
- Escopo: 100% dos usuarios? 1 tenant? 1 regiao? 1 horario?

Anti-padrao: pular direto para "acho que e X". Se voce ja sabe, nao precisa
depurar — so corrigir.

### Fase 2 — Hipoteses (varias, nao uma)

Gere **3-5 hipoteses concorrentes** ranqueadas por probabilidade. Para cada
uma, escreva a **evidencia que a confirma** e a **evidencia que a refuta**.

Formato:
```
H1: race condition entre worker A e worker B na fila X
  Confirma: falha so ocorre com >1 worker; log mostra 2 escritas em <1ms.
  Refuta: se fosse race, veriamos em ambiente stage — nunca vimos.
  Custo p/ testar: rodar com --workers=1 por 1h.
```

**Anti-padrao de ancoragem:** primeira hipotese que parece plausivel vira a
unica hipotese. O metodo exige competicao entre hipoteses.

### Fase 3 — Isolar variavel (uma por vez)

Reduzir o sistema ao minimo que ainda reproduz. Cada mudanca testa
**uma** hipotese. Nunca mude duas coisas ao mesmo tempo — se funcionar, voce
nao sabe qual das duas resolveu.

Ferramentas:
- Bisect: `git bisect` entre "ultimo bom" e "primeiro ruim".
- Feature flag: desligar 1 caminho de codigo por vez.
- Delta debugging: reduzir input ao minimo que ainda quebra.
- Ambiente ouro: reproduzir em ambiente limpo (Docker, container fresh).

### Fase 4 — Intervir minimo + verificar

Aplicar o **menor patch** que corrige a causa raiz (nao o sintoma).

Verificacao obrigatoria antes de dizer "esta resolvido":
1. Repro anterior nao quebra mais (evidencia positiva).
2. Teste de regressao escrito **antes** do fix (falha sem o fix, passa com).
3. Fix nao introduz regressao em N testes adjacentes.
4. Postmortem escrito (o que foi, por que passou, o que muda no processo).

**Gate de evidencia (herdado de `ciclo-de-fase-goal-backward`):** existencia
do fix ≠ confirmacao de que corrigiu. Sem repro confirmado + teste de
regressao, o bug nao esta fechado.

## Root-cause tracing (5-whys aplicado)

O "por que" nao para no primeiro. Cada resposta gera o proximo por que, ate
chegar em **causa que, se removida, elimina a classe inteira** de defeitos.

Fontes de evidencia que cada camada de "por que" precisa apontar:
- **Stack trace** — linha exata, funcao exata, valor exato.
- **Git blame** — quem escreveu, quando, em qual commit, para qual historia.
- **Log estruturado** — request-id, user-id, correlacao temporal.
- **Metricas** — taxa antes/depois, distribuicao, percentis.

Exemplo (5 niveis):
```
Por que a API retornou 500?      > Query lancou timeout.
Por que a query travou?          > Indice nao foi usado no plano.
Por que o indice nao foi usado?  > Migracao de ontem dropou o indice.
Por que a migracao dropou?       > Refactor renomeou coluna e recriou sem indice.
Por que o refactor nao recriou?  > Template de migracao nao tem checklist de indice.
```
Causa raiz: **template de migracao sem checklist de indice**. Corrigir o
template mata a classe inteira, nao so este bug.

## Defense-in-depth (camadas defensivas)

Nenhuma camada so e suficiente. Empilhe:

- **Fail-fast** — validar entrada na fronteira; nunca propagar dado invalido
  silenciosamente por 3 camadas ate estourar longe da origem.
- **Assert invariantes** — o que TEM que ser verdade em cada ponto do fluxo
  (nao-null, range, contagem) vira assercao explicita, nao confianca.
- **Retry com backoff exponencial + jitter** — para falha transiente
  (rede/DB), NUNCA para falha deterministica (bug de codigo). Retry sem
  distinguir os dois vira DDoS ao proprio servico.
- **Circuit-breaker** — quando um dependente falha por N chamadas, abrir o
  circuito e retornar erro rapido em vez de arrastar latencia. Half-open
  probe apos timeout.
- **Timeout em tudo** — HTTP, DB, fila, thread, subprocess. Sem timeout, um
  hang vira cascade que derruba o sistema.

Estas camadas sao **ortogonais** ao fix da causa raiz — servem para o
proximo defeito da mesma classe nao virar incidente.

## Condition-based-waiting

Escala de forca (do pior ao melhor):

1. **`sleep(N)`** — pior. Assume tempo, ignora estado. Flakey por definicao.
2. **Retry-loop com contador** — melhor que sleep, ainda ignora estado.
3. **Polling da condicao** — testa o estado real; para quando `estado ==
   desejado` ou timeout. Ordem de grandeza melhor que sleep.
4. **Promessa/callback do proprio sistema** — o produtor notifica quando
   pronto. Sem polling, sem retry — a melhor opcao quando o sistema oferece.

Regra: **suba um degrau sempre que possivel**. Sleep em teste e red flag.

Aplicacoes:
- Testes de integracao — esperar container subir > polling em endpoint
  `/health`, nao `sleep 10`.
- Fila assincrona — subscribir ao evento de conclusao, nao poll de status.
- UI e2e — esperar seletor aparecer, nao `wait 2s`.

## Anti-padroes de teste (caca obrigatoria)

Bugs se escondem atras de testes ruins. Marque para reescrita quando ver:

- **Teste que muda quando o codigo muda** (nao quando a intencao muda) —
  testa a implementacao, nao o contrato. Baixo valor, alto custo de
  manutencao. Reescrever pela saida observavel.
- **Teste que testa o mock** — `expect(mock).toHaveBeenCalledWith(...)` sem
  verificar que o efeito ocorreu. Confirma o cabo, nao a corrente. Combinar
  com teste de integracao fino.
- **Teste sem assercao** — chama o metodo e nao verifica nada. Cobertura
  mentirosa. Falha muda para pass silenciosamente.
- **Teste com dependencia de ordem** — passa isolado, quebra em suite.
  Denuncia estado global. Isolar setup/teardown.
- **Teste com timeout longo por precaucao** — esconde flakiness real.
  Investigar por que precisou de timeout.
- **Teste que usa dado de producao** — quebra quando o dado muda. Fabricar
  fixture proprio.

Cross-link com `qa-e-quality-gates`: aquela desenha a estrategia global;
esta lista o que denunciar durante a depuracao.

## Handoffs

| Situacao | Habilidade destino |
|---|---|
| Bug em migracao/DDL/query | `engenharia-de-dados` |
| Bug em pipeline CI/deploy | `devops-e-entrega-continua` |
| Fix precisa de teste novo estruturado | `qa-e-quality-gates` |
| Fix expoe defeito de design | `architect-first` |
| Fix vira story (nao hotfix) | `spec-build-review` |
| Postmortem vira licao do squad | `MEMORY.md` do agente + Ritual de Encerramento |

## Checklist antes de fechar o bug

- [ ] Repro deterministico documentado.
- [ ] Causa raiz identificada por 5-whys, com evidencia por camada.
- [ ] Teste de regressao escrito **antes** do fix (RED > GREEN).
- [ ] Fix e o **minimo** necessario (nao gold-plating).
- [ ] Postmortem escrito (o que foi + por que passou + o que muda).
- [ ] Camada defensiva adicionada quando a classe do bug justifica.
- [ ] Anti-padrao de teste correlato marcado para reescrita.

---

## Heranca historica

Esta disciplina nao foi inventada agora — e destilado de decadas de pratica.

- **Brian W. Kernighan & Rob Pike** — *The Practice of Programming*
  (Addison-Wesley, 1999). Capitulo 5 ("Debugging") estabelece o metodo:
  o bug esta onde voce nao olhou; comece pelo que aconteceu, nao pelo que
  voce acha; instrumento antes de intuicao.
- **Andy Hunt & Dave Thomas** — *The Pragmatic Programmer* (Addison-Wesley,
  1999; 20th anniv. ed. 2019). Assertions, tracer bullets, "select isn't
  broken" — suspeite do proprio codigo antes do da lib. Fonte doutrinaria
  do "fail-fast" e das assercoes de invariante.
- **John Allspaw** — *Blameless PostMortems and a Just Culture* (Etsy
  engineering blog, 22-maio-2012). Institucionaliza a cultura de postmortem
  como aprendizado, nao caca a culpado. Base do 5-whys aplicado a
  incidentes de producao.
- **Werner Vogels** — CTO da Amazon; "Everything fails, all the time".
  Justificativa filosofica de defense-in-depth: projetar para a falha
  inevitavel, nao para o caminho feliz.
- **Michael Nygard** — *Release It! Design and Deploy Production-Ready
  Software* (Pragmatic Bookshelf, 2007; 2nd ed. 2018). Formaliza os padroes
  de estabilidade — circuit-breaker, bulkhead, timeout, fail-fast — que
  sustentam esta habilidade.
- **Edsger W. Dijkstra** — "Testing shows the presence, not the absence, of
  bugs" (*Notes on Structured Programming*, 1972). Origem do gate de
  evidencia: teste passar nao equivale a codigo correto.

Nenhum trecho foi copiado; a sintese e do Prometeu para uso interno da
Kolden.

## Procedencia

Skill nova (F6 do lote `_lote-2026-06-26`), fundindo IDs diferidos do
`obra--superpowers` (G9 testing-anti-patterns, G10 systematic-debugging
4 fases, G11 root-cause-tracing, G12 defense-in-depth, G13
condition-based-waiting) documentados em
`Caos/registros/absorcao/_lote-2026-06-26/relatorio-de-perda-prometeu.md`.
Absorcao em PT-BR, sem copia literal. Autoria: Prometeu / Kolden, 2026.
