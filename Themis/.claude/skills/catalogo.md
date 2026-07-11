---
tipo: nota
area: Themis
up: "[[Themis/_MOC-themis]]"
---

# Catálogo de Habilidades — Themis (Advisory Board)

> Índice das habilidades registradas no squad Themis. Fonte única de verdade para roteamento por gatilho.

## Filosofia

Themis é um board de mental-models estratégicos (Dalio, Munger, Naval, Thiel, Hoffman, Sinek, Brown, Lencioni, Sivers, Chouinard). As habilidades listadas aqui **NÃO** são mais conselheiros nem invadem o board — são **operacionais transversais SOB a chancela do board consultivo**, executadas pelo `analista-de-compliance-regulatorio` (tier 1).

Distinção essencial:
- **Conselheiros (Dalio, Munger, etc.)** = perspectivas estratégicas, mental-models, sabedoria mundana. Não têm habilidade proprietária no diretório `.claude/skills/` — operam via CLAUDE.md próprio.
- **Habilidades do squad** = execução operacional concreta em domínios específicos que o board mandata ao operacional. Vivem em `.claude/skills/`.

## Habilidades registradas

| Habilidade | Dono operacional | Gatilho | Propósito |
|---|---|---|---|
| **framework-gdpr-lgpd** | `analista-de-compliance-regulatorio` | "LGPD", "GDPR", "base legal", "direito do titular", "vazamento de dado", "notificar ANPD", "DPO", "transferência internacional" | Framework fundido GDPR (UE 2016/679) + LGPD (lei 13.709/2018) — decisão de base legal, categoria de dado, direitos do titular, resposta a incidente com prazos (72h GDPR / prazo razoável LGPD Art. 48), DPO, transferência internacional. |
| **gerador-de-politica-de-privacidade** | `analista-de-compliance-regulatorio` | "política de privacidade", "privacy policy", "termos de uso", "cookie policy", "revisar política", "CCPA", "matriz de jurisdições" | Gerador de política multi-jurisdicional (GDPR/LGPD/CCPA-CPRA) com 9 blocos obrigatórios: controlador, finalidades, matriz base legal, compartilhamento, retenção, direitos do titular, DPO, transferência internacional, histórico de mudanças. Sub-bloco matriz de jurisdições. |
| **revisao-de-contratos-com-risco** | `analista-de-compliance-regulatorio` | "revisar contrato", "risk analysis", "contract review", "SLA", "MSA", "NDA", "DPA", "limitação de responsabilidade", "cláusula abusiva", "comparar versões" | Triagem de contrato em 10 cláusulas-alvo (liability cap, indenização, foro, força maior, DPA, PI, rescisão, NDA, não-concorrência, pagamento) com risk-keyword-scoring, approval routing por gatilho R$ e sub-bloco comparação versão a versão com risk-flag. |

## Rota de escalação padrão (herdada pelo dono das 3 skills)

Toda saída operacional das 3 habilidades acima é analista sênior — não parecer vinculante. Rotas:

1. **Advogado habilitado (OAB):** parecer vinculante, litígio, contrato acima de R$50k/ano, cláusula CRÍTICA.
2. **DPO:** decisão de política interna, mudança material de finalidade/base legal.
3. **`board-chair` (Themis):** dilema estratégico multi-domínio; contrato R$10k-R$50k/ano.
4. **Ronan:** decisão de negócio; contrato > R$50k/ano OU cláusula CRÍTICA.
5. **ANPD/DPA:** incidente com risco de dano relevante (LGPD Art. 48 §1º; GDPR Art. 33).

## Handoff com Égide (cyber)

**Fronteira:** cyber trata detecção/contenção técnica; Themis trata resposta regulatória.

Em incidente de privacidade / PII vazado, o `cyber-chief` (Égide) escala imediatamente para `analista-de-compliance-regulatorio` (Themis). Codificação dessa rota no CLAUDE.md do `cyber-chief` está **pendente para O5** (Égide-C) — não é escrita neste momento.

## Referências gerais

- Lei nº 13.709/2018 (LGPD) — planalto.gov.br
- Regulamento UE 2016/679 (GDPR) — eur-lex.europa.eu
- CCPA 2018 + CPRA 2020 — oag.ca.gov/privacy/ccpa
- Resoluções CD/ANPD — gov.br/anpd
- EDPB Guidelines — edpb.europa.eu
- Doneda, D. *Da Privacidade à Proteção de Dados Pessoais* (2ª ed., 2019)
- Cavoukian, A. *Privacy by Design: The 7 Foundational Principles* (IPC-Ontario, 2011)
- Bioni, B.R. *Proteção de Dados Pessoais* (Forense, 2019)

---

*Squad Themis · advisory-board · versão do catálogo: 1.0.0 · última atualização: 2026-07-01*
*Origem F6 bucket B10 (msitarzewski/agency-agents · support/) — 4 IDs absorvidos (G16 agente + G17-G19 skills).*
