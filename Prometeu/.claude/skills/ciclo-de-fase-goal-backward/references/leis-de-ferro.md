---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.claude/skills/ciclo-de-fase-goal-backward/references/padroes-de-verificacao|padroes-de-verificacao]]"
---

# Leis de Ferro — racionalizações a derrubar

Material de apoio da etapa EXECUTE (TDD) e VERIFY (evidência). Estas tabelas existem porque
as duas leis são violadas sempre pelo mesmo conjunto de desculpas. Reconheça a desculpa e
volte à disciplina.

## TDD — "violar a letra é violar o espírito"

Lei: **NENHUM código de produção sem um teste que falhou antes.** Escreveu código antes do
teste? Delete (delete = delete; não guarde como referência, não "adapte"). Implemente fresco
a partir dos testes.

| Desculpa | Realidade |
|---|---|
| "Simples demais para testar" | Código simples quebra. O teste leva 30 segundos. |
| "Testo depois" | Teste que passa de imediato não prova nada. |
| "Testes-depois alcançam o mesmo" | Depois = "o que isto faz?". Antes = "o que isto **deveria** fazer?". |
| "Já testei manualmente" | Ad-hoc ≠ sistemático. Sem registro, não re-executável. |
| "Apagar X horas é desperdício" | Falácia do custo afundado. Código não-confiável é dívida técnica. |
| "Guardo como referência e escrevo o teste antes" | Você vai adaptá-lo — isso é testar depois. Delete. |
| "Preciso explorar antes" | Ok. Jogue fora a exploração e comece com TDD. |
| "Difícil de testar" | Ouça o teste: difícil de testar = difícil de usar. Simplifique a interface. |
| "TDD é dogmático, sou pragmático" | TDD **é** pragmático: acha bug antes do commit, previne regressão, documenta, habilita refactor. |

**Red flags = pare e recomece:** código antes do teste; teste depois da implementação;
teste passa de imediato; não sabe explicar por que o teste falhou; "só desta vez".

### Quando travar
| Problema | Saída |
|---|---|
| Não sei como testar | Escreva a API desejada; escreva a asserção primeiro; pergunte ao parceiro humano. |
| Teste complicado demais | Design complicado demais. Simplifique a interface. |
| Tenho que mockar tudo | Código acoplado demais. Use injeção de dependência. |
| Setup de teste enorme | Extraia helpers. Ainda complexo? Simplifique o design. |

## Verificação antes de concluir — a função de portão

Lei: **NENHUMA alegação de conclusão sem evidência fresca.** Não rodou o comando **nesta**
mensagem? Não pode alegar que passa.

```
ANTES de alegar qualquer status ou expressar satisfação:
1. IDENTIFIQUE: qual comando prova esta alegação?
2. RODE: o comando completo, fresco.
3. LEIA: a saída inteira, o exit code, conte as falhas.
4. CONFIRME: a saída confirma a alegação?
   - Não → declare o status real com evidência.
   - Sim → declare a alegação JUNTO da evidência.
5. SÓ ENTÃO: faça a alegação.
Pular qualquer passo = mentir, não verificar.
```

| Alegação | Exige | Não basta |
|---|---|---|
| "Testes passam" | saída do teste: 0 falhas | execução anterior, "deveria passar" |
| "Linter limpo" | saída do linter: 0 erros | check parcial, extrapolação |
| "Build ok" | comando de build: exit 0 | linter passou, logs "parecem bons" |
| "Bug corrigido" | testar o sintoma original: passa | código mudou, "presumo corrigido" |
| "Teste de regressão funciona" | ciclo red-green verificado | passou uma vez |
| "Agente concluiu" | diff do VCS mostra as mudanças | agente reportou "sucesso" |
| "Requisitos atendidos" | checklist linha a linha | "os testes passam" |

**Red flags:** "deveria", "provavelmente", "parece que"; expressar satisfação antes de
verificar ("Pronto!", "Perfeito!"); commit/push/PR sem verificação; confiar no relatório
de sucesso de um agente; "só desta vez"; cansaço querendo terminar.

Por que importa: alegação falsa quebra a confiança do parceiro humano, embarca função
indefinida que quebra em produção, gera retrabalho. Honestidade é valor central.

---
*Fonte: obra/superpowers@896224c4 (`test-driven-development/SKILL.md`, `verification-before-completion/SKILL.md`) — MIT, Jesse Vincent. Reescrito em PT-BR; sem cópia literal.*
