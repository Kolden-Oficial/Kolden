---
name: conselho-adversarial
description: Use quando uma decisão ambígua precisa de discordância estruturada antes de escolher (monorepo vs polirepo, lançar agora vs segurar, escopo enxuto vs amplo), OU quando um output vai para produção/cliente e precisa passar por verificação adversarial que quebre o viés do autor. Convoca vozes independentes (conselho de 4 para decisão; dupla revisão cega com loop de convergência para correção). Reforça a Dike e os especialistas revisor/testador. NÃO use para tarefa óbvia, pergunta factual direta, ou quebra de feature em passos (use `planner`).
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Conselho adversarial e verificação por convergência

Um único agente revisando o próprio trabalho carrega **os mesmos vieses, lacunas e erros
sistemáticos** que produziram o trabalho. A cura é independência: vozes frescas que não
compartilham o contexto da geração. Esta habilidade dá dois mecanismos — um para **decidir** sob
ambiguidade, outro para **verificar** se um output está correto — e é o braço de método da Dike
(verificadora) e dos especialistas revisor/testador.

Escolha pela pergunta:

| Pergunta | Mecanismo | Seção |
|---|---|---|
| "Qual caminho seguir? há trade-off e nenhum vencedor óbvio" | Conselho de 4 vozes | A |
| "Esse output está correto o bastante para ir ao cliente/produção?" | Dupla revisão cega + convergência | B |
| "As portas de qualidade passam?" | Loop de verificação determinístico | C |

## A. Conselho de 4 vozes (decisão sob ambiguidade)
Para decisões com múltiplos caminhos válidos e nenhum vencedor claro. **Não** é revisão de código
nem planejamento. Quatro lentes:

| Voz | Lente |
|---|---|
| Arquiteto | correção, manutenibilidade, implicações de longo prazo |
| Cético | desafia a premissa, simplifica, quebra suposições |
| Pragmático | velocidade de entrega, impacto no usuário, realidade operacional |
| Crítico | edge cases, risco de downside, modos de falha |

Fluxo:
1. **Extraia a pergunta real** — reduza a decisão a um prompt explícito: o que decidimos? quais
   restrições importam? o que conta como sucesso? Se vaga, faça **uma** pergunta de clareza antes.
2. **Junte só o contexto necessário** — compacto; se a decisão é estratégica, pule trechos de repo.
3. **Forme a posição do Arquiteto primeiro** — escreva sua posição inicial, as 3 razões mais fortes
   e o principal risco **antes** de ler as outras vozes (assim a síntese não vira eco delas).
4. **Lance as 3 vozes externas em paralelo, como subagentes frescos** — cada um recebe **só a
   pergunta + contexto relevante**, nunca a conversa inteira. **Esse isolamento é o mecanismo
   anti-ancoragem** — é o que impede o conselho de só concordar com o que já estava na mesa.
5. **Sintetize** — onde concordam, onde divergem, e a decisão com o trade-off **nomeado**.

## B. Dupla revisão cega + loop de convergência (correção de output)
Para output que será publicado/deployado/consumido por usuário, onde acurácia importa (claims,
estatística, referência de API, linguagem jurídica, copy de cliente) ou onde geração em lote
esconde padrão sistêmico. **Não** use para rascunho interno ou tarefa com verificação determinística
(aí use build/test/lint — seção C).

Quatro fases:
1. **Gerar** — produza o entregável normalmente (camada de verificação é **pós**-geração).
2. **Revisar duas vezes** — dois revisores independentes em paralelo, com **invariantes**: (a)
   **isolamento de contexto** — nenhum vê a avaliação do outro; (b) **rubrica idêntica** — mesmos
   critérios; (c) **mesmas entradas** — spec original + output gerado; (d) **veredito tipado** —
   estruturado, não prosa.
3. **Portão de veredito** — **A passa E B passa → aprovado**. Qualquer outra combinação → reprovado.
   Sem exceção. Dois revisores com contexto zero compartilhado quebram o modo de falha do auto-review.
4. **Corrigir até convergir** — colete todas as marcações, conserte tudo, **re-rode os dois
   revisores**. Repita até ambos aprovarem ou até `MAX` iterações — então **escale a humano**
   (não force um "aprovado" para sair do loop).

Esquema do veredito tipado e da rubrica compartilhada em `references/veredito-e-portoes.md`.

## C. Loop de verificação (portas determinísticas)
Quando o certo/errado é **objetivo**, não convoque vozes — rode as portas, em ordem, parando na
primeira que falha:
1. **Build** — compila? Falhou, PARE e conserte antes de seguir.
2. **Type check** — erros de tipo (reporta todos, conserta os críticos).
3. **Lint** — estilo/qualidade estática.
4. **Testes** — suíte + cobertura (reporta total/passou/falhou/cobertura; alvo configurado).
5. **Scan de segurança** — segredos vazados, `console.log` esquecido, padrões proibidos.
6. **Revisão de diff** — `git diff --stat`; cada arquivo mudado por mudança não-intencional.

Regra de ouro: **verificação determinística vence opinião**. Se um script decide, não gaste vozes
de LLM nisso — reserve A/B para o que é genuinamente ambíguo ou subjetivo.

## Como casa com o Kapital Kolden (Dike / revisor / testador)
- **Dike** (verificadora na subida) usa B/C para reconciliar a entrega contra o lacre do Contrato
  de Missão — dupla revisão cega quando o output é subjetivo, portas determinísticas quando não é.
- **revisor** (Fase 6) usa A quando uma decisão de arquitetura tem trade-off sem vencedor óbvio.
- **testador** (Fase 7) usa C como pré-gate antes do maturity score (`avaliacao-de-agente`).

## Habilidades relacionadas
- Avaliar o agente inteiro (maturity, pass@k, 12 camadas): `avaliacao-de-agente`.
- Junção entre componentes de um squad (boundary mismatch): `qa-de-integracao-de-time`.
- Validar uma habilidade isolada (A/B com/sem skill): `validacao-de-skill`.

---
*Fonte absorvida (princípio extraído, reescrito em PT-BR, sem cópia literal):
`affaan-m/everything-claude-code@2bc924f` — `skills/council/` (4 vozes, anti-ancoragem),
`skills/santa-method/` (dupla revisão cega + convergência; origem Ronald Skelton),
`skills/verification-loop/` (portas determinísticas) (MIT). Uso interno Kolden.*
