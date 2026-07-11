---
description: Absorve um repositório do GitHub para dentro do Kolden — quarentena segura, verificação de segurança (prioridade #1), compreensão 100%, e aprimoramento de um squad existente (ou aviso + criação). Passe a URL do repo. Nunca executa o código; para para aprovação antes de aplicar.
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/.claude/commands/caos|caos]]"
  - "[[Caos/.claude/commands/squad|squad]]"
  - "[[Caos/.claude/commands/vigia|vigia]]"
---

Caos, inicie o **Pipeline de Absorção de Repositório** para o repo abaixo.

Repositório: $ARGUMENTS

Use a habilidade `ingestao-de-repositorio` (8 fases com gates). Conduza assim:

- **F0 — Histórico:** normalize a URL e consulte `dados/repositorios-absorvidos.yaml`. Se já foi
  absorvido no mesmo SHA, **avise na hora e pare**; se em SHA mais antigo, modo incremental.
- **F1 — Quarentena:** `git clone --depth 1` em `_staging/quarentena/<owner>--<repo>@<sha>/`,
  capture o SHA, **remova `.git`**, grave `_procedencia.md`. Não execute nada.
- **F2 — Segurança (prioridade #1, BLOCK):** delegue ao subagente `auditor-de-seguranca` (análise
  estática + Egide). Sem veredito **SAFE**, não avance. REJEITAR aborta; QUARENTENA para (opt-in Docker).
- **F3 — Compreensão 100%:** inventário de capacidades do repo.
- **F4 — Mapeamento:** `consulta-ao-registro` por capacidade → REUSE/ADAPT/CREATE. "Já temos squad/
  skill/agente equivalente?"
- **F5 — Plano (BLOCK):** se TEMOS, rode `auditoria-de-squad` (benchmark = o repo) e gere o plano de
  aprimoramento arquivo-por-arquivo; se NÃO TEMOS, **avise** e proponha criar. **Pare para minha
  aprovação** antes de escrever qualquer coisa (Art. III).
- **F6 — Aplicação + qualidade:** só após aprovação; gates N0→N6 (`revisor`) + maturity ≥7.0 (`testador`).
- **F7 — Registro:** grave no ledger, no registro de entidades (`origem: repo@SHA`), no `_origem.md`
  do squad-alvo e na memória.

Trabalhe só com o repo informado. Nunca rode o código de terceiro. Ao final, me apresente o que foi
absorvido/aprimorado, em qual squad, e a entrada gravada no histórico.
