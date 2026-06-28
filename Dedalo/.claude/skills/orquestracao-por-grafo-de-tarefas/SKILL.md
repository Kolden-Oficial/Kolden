---
name: orquestracao-por-grafo-de-tarefas
description: Use quando vários agentes/worktrees/branches trabalham como um TIME e o problema deixou de ser "rodar em paralelo" e virou "integrar isso num produto mergeável" — fan-out já produz output mas não vira entrega. Traz o modelo de work item (dono/escopo/estado/evidência/portão de merge), o Kanban de agentes com critério de saída por coluna, a matriz de faixas (write surface que não pode colidir), o papel do integrador único e o painel de controle. NÃO use para um fan-out simples de leituras independentes (use orquestracao-de-subagentes-paralelos) nem para uma tarefa sequencial única.
---

# Orquestração por Grafo de Tarefas

Quando agentes são geridos como **time**, não como um assistente. A `orquestracao-de-subagentes-paralelos`
resolve *despachar* trabalho independente; esta resolve o degrau seguinte: **trabalho que precisa convergir
em produto integrado e mergeável**, com estado compartilhado entre sessões e pessoas, fronteiras de escrita
que não podem colidir, e um portão explícito que autoriza a integração. Sintoma de que você precisa dela:
*o fan-out está produzindo output, mas não produto que dá pra mergear.*

## Modelo de work item (cada agente é um colega com contrato estreito)

- **Dono** — a pessoa/agente responsável pelo item (um só).
- **Escopo** — arquivos, branch/worktree, superfície de ferramentas e **áreas proibidas**.
- **Estado** — backlog, pronto, rodando, revisão, bloqueado, mergeado, arquivado.
- **Evidência** — testes, screenshots, logs, notas de revisão, relatório de avaliação.
- **Portão de merge** — a condição **exata** que libera a integração (ex.: "lint + testes focados + check de catálogo passam").

Cada card cabe num schema estável (id, título, dono, estado, branch, worktree, critérios de aceite, portão
de merge, caminho do handoff). O card é o contrato — sem dono e sem portão, não é card, é desejo.

## Kanban de agentes (estado visível entre sessões)

| Coluna | Significado | Critério de saída |
|---|---|---|
| Backlog | candidato, ainda não modelado | critério de aceite escrito |
| Pronto | modelado e atribuível | dono + branch/worktree atribuídos |
| Rodando | agente trabalhando agora | artefato de handoff + arquivos alterados existem |
| Revisão | completo, ainda não mergeado | testes + revisão de diff + check de risco passam |
| Bloqueado | precisa de input externo ou falhou um portão | bloqueador tem dono + próxima ação |
| Mergeado | integrado na mainline | PR mergeado ou main local atualizada |
| Arquivado | não é mais relevante | motivo registrado |

Nenhum card avança sem cumprir o critério de saída da coluna — o quadro é o que impede "quase pronto" de se
acumular como dívida invisível.

## Fluxo de orquestração de time

1. **Modele o quadro** — converta ambição difusa em work items com dono e portão de merge.
2. **Escolha o modo de execução** — agente único, modo dinâmico, dmux/tmux, fan-out de worktree, ou
   orquestrador externo. Modo é decisão por item, não dogma do projeto.
3. **Atribua fronteiras** — um dono por card, escopo de arquivo claro, **sem escritas sobrepostas** sem
   um integrador no meio.
4. **Rode os agentes** — cada um produz **evidência e nota de handoff**, não só código.
5. **Revise em sequência** — testes primeiro, depois revisão de diff, depois risco/segurança, por fim
   polimento de produto. Ordem importa: não polir o que ainda pode falhar no teste.
6. **Mergeie deliberadamente** — **um integrador** resolve conflitos e atualiza o painel/artefato de status.
7. **Extraia habilidade reutilizável** — se o padrão do card se repete, promova-o a uma skill.

## Matriz de faixas (impede colisão de escrita)

Antes de um push grande, escreva a matriz compacta — só paralelize faixas cujas **superfícies de escrita
não colidem**:

```
Faixa            | Paralela? | Superfície de escrita | Risco | Verificação
Varredura repo   | sim       | nenhuma               | baixo | saída rg/git status
Patch backend    | talvez    | src/api               | médio | testes de unidade
Patch frontend   | talvez    | app/components        | médio | screenshot navegador
Readback deploy  | após build| serviço remoto        | alto  | URL viva + logs
```

Regras de execução: agrupe leituras/checagens independentes; isole escrita por arquivo/worktree/branch/
serviço; **nunca** paralelize comando destrutivo, migração, escrita na mesma tabela ou deploy que afeta
cliente sem portão explícito. Se uma faixa descobre um bloqueador que muda o plano, **pause as dependentes**
e atualize a matriz — não toque as outras no escuro.

## Painel de controle (visibilidade do time)

Um painel útil mostra, por card: dono, estado, branch/worktree, último artefato de evidência, portão de
merge pendente e bloqueador (com próxima ação). O estado do trabalho vive **em disco/quadro**, não no
contexto do orquestrador — a cascata é retomável e auditável, não some se a sessão cair. Casa com o
file-handoff da `orquestracao-de-subagentes-paralelos`: o orquestrador lê o card e o report curto, nunca a
transcrição inteira.

## Modos de falha

- Concorrência que gera edição conflitante (faixas com superfície de escrita sobreposta).
- Card sem portão de merge → "pronto" que ninguém sabe integrar.
- Fan-out sem integrador → N branches que nunca convergem.
- Esconder check pulado atrás de um resumo de sucesso.
- Processo de fundo que sobrevive ao turno sem o usuário ter pedido um serviço contínuo.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (skills `team-agent-orchestration`, `plan-orchestrate`,
`parallel-execution-optimizer`, `dmux-workflows`; cluster G4; MIT). Princípios extraídos e reescritos em
PT-BR; sem cópia literal. Complementa — não duplica — a `orquestracao-de-subagentes-paralelos` (despacho)
elevando para integração de time; o painel/ledger reusa o padrão file-handoff daquela habilidade.*
