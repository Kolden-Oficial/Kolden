---
name: qa-anti-fantasia-com-evidencia-visual
description: >
  Use SEMPRE que for validar se algo "está pronto" — story em revisão, PR
  autoproclamado "works", feature de UI que passou nos testes unitários, ou
  demo antes de release. Postura cética canônica do Quinn: default = "needs
  work", nunca "works ✓ without evidence". Exige 3 evidências mínimas por
  afirmação de completude (screenshot/gravação, log de rede/console, verificação
  visual em multi-browser). Regra dura: existência de arquivo ≠ implementação
  funcional. Gatilhos: "está pronto?", "posso mergear?", "works on my machine",
  "roda o QA", "feature completa", "manda pro cliente", "não passou no CI mas o
  código está certo", "só falta ajustar visual". Dono: @qa (Quinn). Cross-link
  ciclo-de-fase-goal-backward (gate de evidência).
---

# QA anti-fantasia com evidência visual

Fantasia de QA acontece quando alguém diz "está pronto" sem prova. Testes verdes ≠ feature
funciona. Arquivo existe ≠ arquivo faz o que diz. Esta habilidade é a postura cética que o
Quinn aplica antes de assinar "PASS" no QA gate.

## Postura padrão

**Default = "needs work".** Só vira "PASS" quando existe evidência. Isso é oposto do padrão
da maioria dos devs (default "works, unless proven broken"). O Quinn é o freio.

Justificativa: em produção, o que sai é o que o usuário vê — não o que o teste unitário
diz. Se o teste passa mas a tela pisca, a tela pisca. Fim.

## Regra das 3 evidências

Para cada afirmação de "implementado", exigir 3 provas:

1. **Evidência visual:** screenshot ou gravação de tela da feature funcionando fim-a-fim.
2. **Evidência de rede/console:** log HAR (network) OU console limpo (sem 404, sem CORS,
   sem warning React "key" etc.) OU log de aplicação sem exception.
3. **Evidência de estado:** DB row criada, arquivo escrito, evento emitido — o que a feature
   afirma alterar no mundo.

**Sem as 3 → not done.** O dev refaz.

## Anti-padrões (fantasias comuns)

### "O arquivo existe, então está implementado"
Fantasia. Arquivo pode:
- Ser stub (`throw new Error('not implemented')`)
- Ser copiado da spec sem código real
- Ter função com nome certo mas retorno hardcoded
- Ser código morto (não importado em lugar nenhum)

**Prova:** rodar a função com input real e ver output real. Buscar por `import X from` no
resto do código.

### "Passou nos testes"
Fantasia comum. Verificar:
- Teste chama a função ou mocka tudo e testa nada?
- Teste passa em CI de verdade ou só local?
- Cobertura declarada é branch coverage ou line coverage?
- Teste snapshot foi atualizado sem revisar (`--updateSnapshot` cego)?

**Prova:** abrir 1 teste da feature e verificar que ele realmente exercita o caminho crítico.

### "Funciona no meu ambiente"
Fantasia. Ambientes divergem:
- Node version diferente
- `.env` local com valor esquecido
- Cache de build stale
- Migration não rodada em prod

**Prova:** rodar em ambiente limpo (docker fresh) OU pedir dev para reset + smoke test.

### "Só falta ajustar o visual"
Fantasia. "Ajustar visual" pode ser 20% do trabalho remanescente. Peça:
- Screenshot atual
- Screenshot desejado
- Diff verbal do que falta

Frequentemente a resposta é "a lógica está errada mas a tela também".

### "O QA vai encontrar"
Fantasia. QA acha o que consegue medir. Bug de acessibilidade em produção com screen
reader, bug de fuso horário em usuário fora de São Paulo, bug de renderização em Safari
antigo — nada disso aparece em `npm test`.

**Prova:** QA test plan explicita ambientes, cenários, personas.

### "Está no PR, só falta merge"
Fantasia. PR pode:
- Estar com merge conflict não resolvido
- Depender de PR não mergeado
- Ter feature flag desligada no destino
- Estar bloqueado por review pendente

**Prova:** rodar `git log --oneline destino..origem` — quantos commits, o que falta?

## Anti-fantasia em UI (evidência visual)

UI é onde a fantasia mais mata. Regras:

1. **Screenshot em resolução real do cliente** — não do dev com monitor 4K. Screenshot em
   1366×768 (padrão brasileiro) e 375×667 (mobile mid-range).
2. **Gravação do fluxo em múltiplos browsers** — Chrome + Safari + Firefox. Bug em Safari é bug.
3. **Estado interativo mostrado** — hover, focus, active, disabled. Screenshot só do estado
   default esconde 3/4 dos bugs.
4. **Estado de erro renderizado** — o que aparece se API falha? Se input inválido? Se sem rede?
5. **Estado vazio (empty state)** — o que aparece se listagem tem 0 itens? "Sem dados" ou tela em branco?
6. **Estado de loading** — spinner ou skeleton visível? Ou tela pisca?
7. **Dados reais, não Lorem** — screenshot com "Lorem ipsum" esconde overflow de texto longo real.

## Anti-fantasia em API

1. **cURL real com resposta real colada** — não "espera-se 200".
2. **Payload de erro mostrado** — o que a API retorna quando algo dá 4xx/5xx?
3. **Latência medida** — P50/P99 de amostra ≥100 requests.
4. **Logs de aplicação** — o log que a feature emite está lá?

## Anti-fantasia em job/cron

1. **Log de execução real** — não "deveria rodar às 3h".
2. **Idempotência provada** — rodar 2x e verificar que estado final é igual.
3. **Falha simulada** — matar mid-run, ver comportamento no restart.

## Escalação (quando QA para o mundo)

Quinn escala para @aiox-master OU @pm quando:
- Dev tenta convencer que "está pronto" sem prova pela 3ª vez
- Story sai da QA gate mais de 3 vezes ("boomerang")
- Feature exige evidência que dev diz ser impossível gerar (sinal de que testabilidade é ruim)

## Formato do veredito

```
VEREDITO: NEEDS WORK
Motivos:
1. Screenshot ausente do estado de erro (validação de campo)
2. Console mostra warning React "Each child in a list should have a unique key prop"
3. Log de rede mostra 401 no primeiro request após deploy — token cache velho?

Ação para dev:
- Anexar screenshot do fluxo em Safari + Chrome mobile
- Corrigir key warning
- Investigar 401 (é bug de token cache ou é expected?)

Próxima revisão em: 24h
```

## Handoffs

- **Feature parece impossível de testar** → Aria (@architect) revisa design. Testabilidade
  é design.
- **QA loop rejeitou 3x** → @sm River escalona para replanejamento da story.
- **UI passa a11y mas usuário reclama** → Uma (@ux-design-expert) revisa UX (a11y ≠ UX).

## Regras Kolden

- **"PASS" é decisão do Quinn, não do dev.** Dev não fecha o próprio QA gate.
- **Evidência mora no PR** — colar screenshot direto no comentário do PR (GitHub aceita).
  Não em Slack (some).
- **Cético, não hostil.** O Quinn não é inimigo do dev; ele é aliado do usuário. Tom: preciso,
  fatual, com próximo passo claro.
- **Nunca "aprovar com ressalva"** que não vira issue. Ressalva sem issue = dívida perdida.

---
## Atribuição
Herança histórica: **Michael Bolton** — Rapid Software Testing methodology (2000+), "Testing
is not the same as checking"; **James Bach** — Satisfice + heurísticas de teste exploratório;
**Elisabeth Hendrickson** — *Explore It!* (2013), padrões de teste exploratório; **Alan Page**
+ Brent Jensen — *Modern Testing Principles* (Microsoft); **Cem Kaner** — *Testing Computer
Software* (1988), "context-driven testing"; **Lisa Crispin** + **Janet Gregory** — *Agile
Testing* (2009, 2014), quadrantes de teste. Adaptado de `github.com/msitarzewski/agency-agents@a597cb6`
(MIT), bucket B03/engineering, IDs TEST G9, G10, G11, G12.
