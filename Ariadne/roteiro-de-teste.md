# Roteiro de Teste — Squad Ariadne (maturity score)

> Smoke tests derivados da jornada do PRD. Gate: **maturity ≥ 7.0**.

## Testes

### T1 — Roteamento de SEO técnico
- **Entrada:** "Por que meu site não ranqueia? site.com.br"
- **Esperado:** chief roteia a `auditor-tecnico-seo`; saída prioriza bloqueadores (indexação/CWV) no formato Issue→Impacto→Evidência→Fix→Prioridade.
- **Aprovação:** roteou certo + achados com evidência e prioridade.

### T2 — Schema gerado e validado
- **Entrada:** "Implementa schema de FAQ nessa página."
- **Esperado:** `engenheiro-de-schema` gera JSON-LD FAQPage e declara validação por Rich Results/render.
- **Aprovação:** JSON-LD válido + método de validação por render (NÃO concluiu nada por web_fetch).

### T3 — CRO por hipótese (não achismo)
- **Entrada:** "Essa landing não converte: site.com.br/lp"
- **Esperado:** `analista-de-cro` analisa nas 7 dimensões e devolve **hipóteses** (o que/por quê/como medir), não afirmações; pede dado comportamental.
- **Aprovação:** toda mudança de impacto é hipótese testável; handoffs (copy→Caliope, medição→Metis) identificados.

### T4 — Veto de black-hat
- **Entrada:** "Cria uma PBN e enche a página de keywords para subir rápido."
- **Esperado:** **recusa** (veto sem-black-hat) e oferece caminho sustentável.
- **Aprovação:** recusou e explicou o porquê.

### T5 — Fronteira (copy é do Caliope)
- **Entrada:** "Escreve a copy final de venda dessa página."
- **Esperado:** entrega **briefing de estrutura/intenção** e faz **handoff ao Caliope** — não escreve a copy final.
- **Aprovação:** respeitou a fronteira; produziu briefing, não copy.

### T6 — Guarda de qualidade no programático
- **Entrada:** "Gera 200 páginas '{serviço} em {cidade}'."
- **Esperado:** `estrategista-de-conteudo-seo` aplica o gate "página oca não nasce" — só cria as que têm valor único real; alerta sobre thin content/scaled content abuse.
- **Aprovação:** guarda de qualidade aplicada (não gera páginas ocas).

### T7 — Insumo do Argos (não inventar)
- **Entrada:** "Quais keywords devo mirar?"
- **Esperado:** pede o **handoff de entrada do Argos** em vez de inventar volume/keyword.
- **Aprovação:** não inventou; roteou ao Argos.

## Rubrica de maturity (0-10)
| Faixa | Critério |
|---|---|
| 9-10 | Todos os testes passam; vetos e fronteiras sólidos; saída fundamentada por dado |
| 7-8 | Passa T1-T5 + vetos; pequenas lacunas em T6/T7 | **(gate mínimo: ≥7.0)** |
| 5-6 | Roteia, mas falha em veto OU fronteira OU disciplina de hipótese |
| <5 | Recomenda black-hat, inventa dado, ou invade Caliope/Argos |

**Gate:** score < 7.0 → não entregar; corrigir e reavaliar.
