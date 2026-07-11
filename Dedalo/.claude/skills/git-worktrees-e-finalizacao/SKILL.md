---
name: git-worktrees-e-finalizacao
description: Use ao isolar trabalho em uma worktree/branch separada e ao FECHAR essa branch no fim — quando rodar agentes paralelos sem que pisem no mesmo working tree, criar um sandbox git para uma feature/experimento, ou decidir o destino de uma branch pronta (merge/PR/manter/descartar) com limpeza correta. Aciona em "isola num worktree", "sandbox dessa branch", "finaliza a branch", "o que faço com essa branch agora". NÃO use para commits triviais na branch atual.
tipo: skill
area: Dedalo
up: "[[Dedalo/_MOC-dedalo]]"
---

# Git Worktrees e Finalização de Branch

Isolamento por **git worktree** para trabalho concorrente (vários agentes ou experimentos sem
colisão) e o ritual de **fechar a branch** com o destino e a limpeza certos. Domínio git do Claude
Code — onde a engenharia de agentes encosta no controle de versão.

## Garantir workspace isolado (na entrada)

Ordem de preferência ao precisar de um ambiente isolado:

1. **Detectar isolamento já existente** — já estou numa worktree/branch dedicada? Então não crie outra.
2. **Ferramenta nativa de isolamento** do harness, se houver.
3. **Fallback `git worktree add`** — cria a worktree em diretório irmão, branch própria.

Guardas obrigatórios:
- **Submódulos:** detectar e tratar antes — worktree com submódulo exige cuidado (init/update no
  novo tree), senão quebra silenciosamente.
- **`.gitignore`:** verificar que artefatos de runtime (logs, `.aiox/`, `node_modules`, flags de
  sessão) estão ignorados antes de gerar trabalho na worktree.
- Um agente por worktree quando paralelizando (ver `orquestracao-de-subagentes-paralelos`).

## Finalizar a branch (na saída)

Sequência ao terminar o trabalho de uma branch:

1. **Verificar testes primeiro** — não se finaliza branch com suíte vermelha. Sem evidência fresca
   de verde, a branch não está pronta (Lei de evidência — ver Prometeu).
2. **Detectar o ambiente** — repo normal vs worktree vs `detached HEAD`. O destino muda conforme.
3. **Apresentar as 4 opções** (não decidir sozinho):
   - **merge** — integra na branch base local;
   - **PR** — abre pull request (revisão remota);
   - **keep** — mantém a branch viva (trabalho continua depois);
   - **discard** — descarta (experimento que não vingou).
4. **Executar** a escolhida.
5. **Limpar a worktree por procedência** — só remova a worktree que **este fluxo criou**; nunca
   apague uma worktree de origem desconhecida. Cleanup errado destrói trabalho alheio.

> **Gate Kolden:** `discard`, `git push --force` e remoção de worktree são **operações
> destrutivas** — exigem confirmação humana explícita (regra de segurança §5/§6 do Kolden OS).
> O fluxo apresenta a opção; quem aperta o gatilho é o Ronan.

## Reconciliar múltiplas worktrees

Quando vários agentes trabalharam em worktrees paralelas e é hora de consolidar, trate a
reconciliação como uma **conversa entre os resultados**: compare os diffs, resolva sobreposições
explicitamente (qual worktree ganha em cada arquivo), e só então faça o merge — não empilhe merges
cegos. Preserve o ledger de qual worktree entregou o quê.

---
*Fontes: obra/superpowers@896224c4 (`using-git-worktrees`, `finishing-a-development-branch`; MIT, Jesse Vincent) + thedotmack/claude-mem@3fe0725a (reconciliação multi-worktree como chat de agentes — só o padrão; MIT/Apache). Princípios extraídos e reescritos em PT-BR; sem cópia literal. Gate destrutivo alinhado às regras de segurança do Kolden OS.*
