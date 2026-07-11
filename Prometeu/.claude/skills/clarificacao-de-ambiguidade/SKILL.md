---
name: clarificacao-de-ambiguidade
description: Use quando uma spec/requisitos acabou de ser escrita e ANTES de planejar ou implementar, para varrer ambiguidade e lacunas de decisão de forma estruturada. Indique também quando o pipeline tem `elicit:true` mas você suspeita que perguntas soltas estão deixando passar buracos de escopo, dados, NFR ou edge cases que geram retrabalho a jusante.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
tipo: skill
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
---

# Clarificação de Ambiguidade (varredura por taxonomia)

Técnica de **redução dirigida de ambiguidade** numa especificação: em vez de perguntar
ao acaso, você varre a spec contra uma **taxonomia fixa de categorias**, prioriza as
lacunas de maior impacto e faz **no máximo 5 perguntas-alvo**, gravando cada resposta
de volta na própria spec. É o passo que falta entre escrever a spec e planejar.

Distingue-se do `gather`/elicit do pipeline existente: ali a elicitação é livre; aqui é
uma **cobertura auditável** — toda categoria recebe um status (Clara / Parcial / Ausente)
e o que fica de fora é registrado como diferido, nunca esquecido em silêncio.

## Quando NÃO usar
- Spike exploratório declarado (avise que o risco de retrabalho sobe e siga).
- Spec ainda não existe — escreva a spec primeiro.

## Lei de ferro
**Teto de 5 perguntas por sessão.** Reformulações de uma mesma pergunta não contam como
nova. Uma pergunta por vez. Nunca revele a fila de perguntas futuras.

## Taxonomia de varredura (marque cada categoria: Clara / Parcial / Ausente)

1. **Escopo & comportamento funcional** — objetivos do usuário, critérios de sucesso, fora-de-escopo explícito, papéis/personas.
2. **Domínio & modelo de dados** — entidades, atributos, relações, identidade/unicidade, transições de estado, volume/escala.
3. **Fluxo de interação & UX** — jornadas críticas, estados de erro/vazio/carregando, acessibilidade/localização.
4. **Atributos não-funcionais (NFR)** — performance (latência/throughput), escalabilidade, confiabilidade/disponibilidade, observabilidade, segurança/privacidade, conformidade.
5. **Integração & dependências externas** — serviços/APIs e modos de falha, formatos de import/export, versionamento de protocolo.
6. **Edge cases & tratamento de falha** — cenários negativos, rate limiting, resolução de conflito (ex.: edições concorrentes).
7. **Restrições & trade-offs** — restrições técnicas (linguagem, storage, hosting), trade-offs explícitos, alternativas rejeitadas.
8. **Terminologia & consistência** — glossário canônico, sinônimos a evitar, termos depreciados.
9. **Sinais de conclusão** — testabilidade dos critérios de aceite, Definition of Done mensurável.
10. **Placeholders & adjetivos vagos** — TODOs, decisões em aberto, adjetivos sem quantificação ("robusto", "intuitivo", "rápido").

Para cada categoria **Parcial ou Ausente**, crie uma pergunta candidata — exceto se a
clarificação não mudar a implementação/validação ou se for melhor diferir ao planejamento.

## Fila priorizada (interna, máx. 5)

Seleciona-se pela heurística **Impacto × Incerteza**. Só entram perguntas cuja resposta
muda materialmente arquitetura, modelagem de dados, decomposição de tarefas, design de
teste, comportamento de UX, prontidão operacional ou validação de conformidade. Equilibre
cobertura: não gaste duas perguntas de baixo impacto enquanto uma área crítica (ex.:
postura de segurança) segue em aberto.

## Laço de perguntas (uma por vez)

- **Múltipla escolha**: analise as opções, recomende a melhor com 1-2 linhas de razão
  (`**Recomendado:** Opção X — <razão>`), renderize uma tabela `| Opção | Descrição |`
  (2–5 opções mutuamente exclusivas, mais uma linha "Outra: <=5 palavras" quando couber).
  Aceite "sim"/"recomendado" como adoção da recomendação.
- **Resposta curta**: ofereça uma sugestão (`**Sugerido:** ... — <razão>`) e restrinja
  `Resposta em <=5 palavras`.
- Pare cedo se as ambiguidades críticas se resolverem, se o usuário sinalizar fim
  ("pronto", "chega") ou ao atingir 5 perguntas.

## Integração na spec (após CADA resposta aceita)

1. Garanta uma seção `## Clarificações` (logo após a visão geral) com subtítulo `### Sessão AAAA-MM-DD`.
2. Anexe `- P: <pergunta> → R: <resposta final>`.
3. Aplique a clarificação à seção mais apropriada: ambiguidade funcional → Requisitos Funcionais; ator/papel → User Stories; forma de dados → Modelo de Dados; NFR → Critérios de Sucesso (troque adjetivo vago por métrica); edge case → Edge Cases/Tratamento de Erro; conflito de termo → normalize o termo na spec inteira.
4. Se a clarificação invalida uma frase anterior, **substitua** (não duplique). Salve a spec após cada integração (sobrescrita atômica), preservando a hierarquia de títulos.

## Relatório final
Nº de perguntas respondidas; caminho da spec; seções tocadas; e uma **tabela de cobertura**
por categoria com status Resolvida / Diferida / Clara / Pendente (baixo impacto). Se
sobrarem Pendentes/Diferidas de alto impacto, sinalize explicitamente antes de avançar ao plano.

---
*Fonte: github/spec-kit@b7e67f5 (`templates/commands/clarify.md`) — licença MIT, Copyright GitHub, Inc. Princípio extraído e reescrito em PT-BR; nenhuma cópia literal. Adaptado ao pipeline spec-driven do Prometeu.*
