---
tipo: skill
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
---

<!--
Atribuição: derivado de msitarzewski/agency-agents@a597cb6 (G26) — licença MIT.
Esta skill é uma reescritura PT-BR original, sem cópia literal do upstream.
-->
---
name: microcopy-de-interface
description: |
  Use quando precisar criar BIBLIOTECA DE MICROCOPY de interface — erro, loading, sucesso,
  empty state, confirmação. Matriz tom × marca. NÃO substitui Caliope/fundacao-de-voz (essa é
  voice estratégica da marca). Esta skill aplica o tom da marca em mensagens funcionais curtas.
domain: design
subdomain: microcopy
agente_primario: [aglaia-chief]
tags: [microcopy, ui-text, error-message, empty-state, loading-state]
fonte_upstream: msitarzewski--agency-agents@a597cb6 (G26)
---

# Microcopy de interface

## Fronteira

- **Caliope/fundacao-de-voz** define a VOZ estratégica da marca (princípios, do/don't,
  arquétipo de voz).
- Esta skill **APLICA** essa voz em mensagens funcionais curtas da interface — erro,
  loading, sucesso, empty, confirmação destrutiva.

Não escreve voice estratégica. Não escreve copy de campanha. Vive no nível da microcopy
funcional — palavras que aparecem em estados de UI.

## Quando usar

Quando o produto for uma **biblioteca de microcopy de interface** — conjunto de
mensagens curtas que aparecem em estados de UI, alinhadas ao tom da marca, prontas para
Harmonia implementar.

## 1. Biblioteca por contexto

### Mensagem de erro

Quatro requisitos:

- **Específica** — não "algo deu errado". Diga o quê.
- **Friendly** — sem culpar o usuário ("você errou" → "não conseguimos validar").
- **Acionável** — próximo passo claro.
- **Tom da marca** — voz consistente.

Exemplo (lúdico vs sério):

- Lúdico: "Ops! Esse email não parece certo. Confere a digitação?"
- Sério: "Email inválido. Verifique o formato (nome@dominio.com)."

### Loading state

- **Tempo esperado** se sabido: "Carregando 50 itens, ~3 segundos".
- **Personalidade** sem ser irritante se passar de 5s (não repetir "quase lá" 6 vezes).
- **Skeleton loader > spinner** quando possível — sensação de progresso real.

### Empty state

- **Por que está vazio** — explique o estado.
- **O que fazer** — CTA claro para sair do vazio.
- **Personalidade** — não desistir do usuário ("comece sua coleção" > "sem dados").

### Sucesso

- **Confirmação clara** — o que aconteceu.
- **Próximo passo** — opcional, se óbvio omitir.
- **Celebrar moderadamente** — sem fanfare em ação rotineira (salvar formulário ≠ ganhar
  campeonato).

### Confirmação destrutiva (delete, cancelar assinatura)

- **Pergunta clara** — o que está sendo deletado.
- **Consequência destacada** — "Isto não pode ser desfeito".
- **Default = segura** — botão primário cancela, botão destrutivo é secundário. Reduz
  erro por inércia.

## 2. Matriz tom × marca

A mesma situação (erro de email, loading, empty state, sucesso) muda de voz conforme a
marca. Use a matriz como guia de decisão criativa:

| Marca   | Erro                                              | Loading                       | Empty                                          | Sucesso              |
|---------|---------------------------------------------------|-------------------------------|------------------------------------------------|----------------------|
| Lúdica  | "Ops, vamos tentar de novo?"                      | "Quase lá..."                 | "Aqui ainda está vazio. Que tal começar?"      | "Boa!"               |
| Séria   | "Erro X — verifique Y."                           | "Carregando..."               | "Sem registros."                               | "Concluído."         |
| Técnica | "Error 400: invalid input format."                | "Loading 50ms..."             | "No data."                                     | "Done."              |
| Premium | "Pequeno contratempo. Em breve resolvido."        | "Carregando seu acesso..."    | "Sua coleção começará aqui."                   | "Pronto."            |

A escolha de coluna vem da **voz estratégica** (Caliope), não da preferência momentânea.

## 3. Anti-padrões

- **"Algo deu errado" sem especificar** — gera frustração e ticket de suporte.
- **Microcopy gerado em massa por LLM sem revisão** — vira soup, perde voz, gera
  inconsistência entre estados.
- **Inconsistência de tom entre estados** — lúdico em sucesso + sério em erro = duas
  marcas na mesma interface.
- **Microcopy só em inglês quando o produto é BR** — perda de personalidade,
  distanciamento.
- **Ignorar a11y** — screen reader precisa de microcopy descritivo, não decorativo.
  Microcopy invisível ao SR = barreira.

## 4. Output

Biblioteca de microcopy em planilha ou JSON:

- 1 linha por mensagem
- Colunas: contexto (erro/loading/empty/sucesso/destrutiva), trigger, texto, variação
  curta (mobile), variação longa (desktop quando couber), notas de a11y.
- Convenção de naming alinhada com o que Harmonia espera no código.

## 5. Cross-links

- **Caliope/fundacao-de-voz** — voz estratégica que esta skill aplica.
- **Harmonia/implementacao-ui** — onde o texto vive (componente, estado, a11y).
- **Aglaia/micro-interacoes-de-marca** — tom da animação que acompanha cada mensagem.
- **Aglaia/pipeline-de-identidade-de-marca** — identidade que rege a escolha de coluna
  na matriz tom × marca.
