---
name: conformidade-eu-ai-act
description: >-
  Classifica um sistema de IA sob o EU AI Act e mapeia as obrigações por categoria de risco. Use quando o
  pedido envolver "EU AI Act", "AI Act", "classificação de risco de IA", "sistema de alto risco", "marco
  legal da IA", "governança de IA" ou perguntar se um produto de IA está em conformidade na UE. Conduz
  classificação (risco inaceitável/alto/limitado/mínimo) → obrigações → prazos, com fonte normativa e
  rótulo informativo (requer revisão humana/advogado).
tipo: skill
area: Nomos
up: "[[Nomos/_MOC-nomos]]"
---

# Conformidade EU AI Act

Dona: `analista-regulatorio` (squad Nomos). Saída **informativa** — não é parecer vinculante.

## Quando usar
Determinar em que categoria de risco um sistema de IA se enquadra no EU AI Act e o que isso exige.

## Sequência
1. **Caracterizar o sistema.** O que faz, onde atua (papel: fornecedor/implantador), domínio de aplicação.
2. **Classificar o risco.**
   - **Inaceitável** (proibido): práticas vedadas (manipulação, social scoring, etc.).
   - **Alto risco:** obrigações fortes — gestão de risco, governança de dados, documentação técnica,
     transparência, supervisão humana, robustez/segurança, registro.
   - **Risco limitado:** deveres de transparência (informar que é IA / conteúdo sintético).
   - **Risco mínimo:** sem obrigações específicas.
3. **Mapear obrigações** aplicáveis à categoria, com o artigo/considerando que as fundamenta.
4. **Prazos.** Quando cada obrigação passa a valer.
5. **Cruzar** com privacidade (`avaliacao-lgpd-gdpr`) e governança de IA (`auditoria-iso-soc2` → ISO 42001).

## Saída
- Classificação: sistema → categoria (com fundamento) → obrigações → prazo.
- Mapa de gap por obrigação (exposição = prob × severidade) priorizado.
- Selo obrigatório: `⚠️ Orientação informativa — requer revisão humana/advogado`.

## Vetos
- Nunca cite obrigação/prazo sem a fonte normativa. Nunca afirme "aplica-se / não se aplica" como certeza —
  rotule a interpretação e mande revisar. Sem fonte, é hipótese a verificar.

## Fronteiras
- Pesquisa regulatória ao vivo segue a política de busca da Kolden (confirmar ferramenta + nível antes).
- Risco estratégico → **Themis**; custo de conformidade → **Pactolo**.

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (cluster
G17 — eu-ai-act, iso42001/AIMS, ai-act-readiness, MIT).*
</content>
