---
tipo: nota
area: Nomos
up: "[[Nomos/_MOC-nomos]]"
---

# Catálogo de Habilidades — Nomos

> **status: semente-do-lote-2026-06-26 (refino pelo Ritual do Caos pendente)**

Habilidades-âncora do squad Nomos (Compliance & Jurídico/Regulatório), seu gatilho de invocação,
propósito e agente dono. Toda saída de efeito legal é **informativa** e exige revisão humana/advogado.

## Habilidades de domínio (âncoras desta semente)

| Habilidade | Gatilho | Propósito | Dono |
|---|---|---|---|
| `avaliacao-lgpd-gdpr` | "LGPD", "GDPR", "dado pessoal", "DPIA/RIPD", "RoPA", "base legal", "direitos do titular", "transferência internacional", "incidente de dados" | Avalia conformidade de um tratamento de dados pessoais: base legal → DPIA → RoPA → direitos → incidente | `privacidade-de-dados` |
| `auditoria-iso-soc2` | "ISO 27001", "ISMS/SGSI", "SOC 2", "ISO 42001/AIMS", "readiness", "controle", "evidência", "gap analysis", "SoA" | Prepara readiness e evidência para normas certificáveis: matriz de controles + score + plano | `auditor-de-conformidade` |
| `revisao-de-contratos` | "contrato", "NDA", "cláusula", "MSA/DPA/SLA", "fornecedor", "due diligence", "assinatura" | Revisa contrato e triaga NDA: resumo executivo + tabela de risco por cláusula + itens para advogado | `gestor-de-contratos` |
| `conformidade-eu-ai-act` | "EU AI Act", "classificação de risco de IA", "sistema de alto risco", "governança de IA", "marco legal da IA" | Classifica sistema de IA sob o EU AI Act e mapeia obrigações por categoria de risco + prazos | `analista-regulatorio` |
| `avaliacao-de-risco-de-conformidade` | "risco de conformidade", "matriz de risco", "exposição", "política interna", "código de conduta", "risco regulatório" | Mapa de exposição (prob × severidade) por obrigação + plano de mitigação + estrutura de política interna | `analista-regulatorio` + `auditor-de-conformidade` |

## Habilidades compartilhadas (fonte única no workspace)

| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |

## Pendências do refino (Ritual do Caos)
- Expandir o cluster G17 (27 skills) em habilidades individuais por norma (FDA/MDR, CAPA, ISO 13485 se o
  produto exigir).
- Materializar `tasks/`, `workflows/`, `checklists/`, `data/routing-catalog.yaml` e os reflexos (vetos →
  PreToolUse mecânico).
- Herança histórica por camada (`heranca-de-especialista`) e PRD formal.

---
*Atribuição das fontes: alirezarezvani/claude-skills@4a3c05b (cluster G17, MIT) ·
anthropics/knowledge-work-plugins@78d74d5 (plugin legal G7, Apache-2.0). Sem cópia literal.*
</content>
