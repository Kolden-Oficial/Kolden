---
name: framework-gdpr-lgpd
description: Use quando o pedido envolver conformidade regulatória com GDPR (regulamento UE 2016/679) ou LGPD brasileira (lei 13.709/2018) — decisão de base legal, categoria de dado, direitos do titular, resposta a incidente de segurança, papel do DPO, contratos entre controlador e operador, ou transferência internacional de dados. Framework fundido que trata as duas leis lado a lado e sinaliza onde divergem. Gatilhos "LGPD", "GDPR", "proteção de dados", "base legal", "direito do titular", "vazamento de dado", "notificar ANPD", "DPO", "transferência internacional", "adequacy decision". NÃO substitui parecer de advogado — é ferramenta operacional. Dono operacional exclusivo desta habilidade — `analista-de-compliance-regulatorio` (Themis).
---

# Framework GDPR + LGPD

> **Nota de sintonia com Themis:** esta habilidade é operacional transversal SOB a chancela do board consultivo — não cria persona conselheira nova. O board (Dalio, Munger, etc.) trata de mental-models estratégicos; esta skill traduz decisão em conformidade concreta.

## Escopo e não-escopo

**Faz:**
- Diagnóstica se um tratamento de dado pessoal cai no escopo da LGPD, GDPR, ou ambas.
- Escolhe a base legal apropriada (das 10 do Art. 7 LGPD ou 6 do Art. 6 GDPR).
- Sinaliza categorias sensíveis (Art. 5 II LGPD, Art. 9 GDPR) que exigem base legal específica.
- Enumera os direitos do titular aplicáveis (Art. 18 LGPD, Cap. III GDPR).
- Ativa protocolo de resposta a incidente com prazos precisos (72h GDPR Art. 33, "prazo razoável" LGPD Art. 48).
- Avalia se o caso exige DPO (Art. 41 LGPD, Art. 37 GDPR).
- Avalia se transferência internacional é permitida (Art. 33-36 LGPD, Cap. V GDPR).

**Não faz:**
- Não dá parecer vinculante (advogado habilitado).
- Não faz negociação com autoridade (ANPD/DPA).
- Não trata detecção/contenção técnica de vazamento (Égide `cyber-chief` faz — ver handoff abaixo).
- Não gera política de privacidade (use `gerador-de-politica-de-privacidade` daqui).
- Não revisa contrato específico (use `revisao-de-contratos-com-risco` daqui).

## Protocolo de análise (4 passos)

### Passo 1 — Determinar jurisdição aplicável

| Sinal | LGPD (Brasil) | GDPR (UE) | Ambas |
|---|---|---|---|
| Controlador em território BR | ✅ | ❌ | — |
| Controlador em território UE | ❌ | ✅ | — |
| Titular BR + finalidade BR | ✅ | ❌ | — |
| Titular UE + oferta de bens/serviços UE ou monitoramento comportamento UE | ❌ | ✅ (Art. 3 GDPR — territorial + material) | — |
| Kolden brasileira que atende cliente UE | ✅ | ✅ | ✅ |

**Ponto de atenção:** LGPD aplica-se ao tratamento realizado no território nacional OU quando o tratamento tem por objetivo ofertar bens/serviços a indivíduos localizados no BR (LGPD Art. 3 II). Extraterritorialidade análoga ao GDPR.

### Passo 2 — Classificar o dado

- **Dado pessoal comum** (LGPD Art. 5 I / GDPR Art. 4(1)): nome, email, IP, identificador.
- **Dado pessoal sensível** (LGPD Art. 5 II / GDPR Art. 9): origem racial, convicção religiosa, opinião política, saúde, vida sexual, biométrico, genético. **Base legal específica obrigatória** (LGPD Art. 11 / GDPR Art. 9(2)).
- **Dado de criança/adolescente** (LGPD Art. 14 / GDPR Art. 8): consentimento específico e destacado dos pais.

### Passo 3 — Escolher base legal

**10 bases legais LGPD (Art. 7):**
| Inciso | Base | Quando usar |
|---|---|---|
| I | Consentimento | Só quando não cabe outra e o titular tem liberdade real de escolha. |
| II | Cumprimento de obrigação legal | Emissão de nota fiscal, folha de pagamento. |
| III | Execução de política pública | Setor público. |
| IV | Pesquisa (órgão de pesquisa) | Pesquisa científica, anonimização preferencial. |
| V | Execução de contrato | O dado é indispensável para executar o contrato com o titular. |
| VI | Exercício regular de direitos em processo | Litígio. |
| VII | Proteção da vida | Emergência médica. |
| VIII | Tutela da saúde | Profissional de saúde. |
| IX | Legítimo interesse | Requer teste de balanceamento documentado (LIA — Legitimate Interest Assessment). |
| X | Proteção do crédito | Cadastros de proteção ao crédito. |

**6 bases legais GDPR (Art. 6):**
consentimento, contrato, obrigação legal, interesses vitais, tarefa de interesse público, legítimo interesse.

**Regra Bruno Bioni** (Data Privacy Brasil): consentimento é o último recurso, não o primeiro. Marketing direto e legítimo interesse podem sustentar tratamento se o teste de balanceamento passa. Documentar sempre.

### Passo 4 — Enumerar direitos do titular

**Art. 18 LGPD (9 direitos) / Cap. III GDPR (Arts. 15-22):**

| Direito | LGPD | GDPR | Prazo |
|---|---|---|---|
| Confirmação de tratamento | Art. 18 I | Art. 15 | LGPD: 15 dias (Art. 19). GDPR: 1 mês (Art. 12(3)). |
| Acesso ao dado | Art. 18 II | Art. 15 | idem |
| Correção | Art. 18 III | Art. 16 | idem |
| Anonimização / eliminação | Art. 18 IV, VI | Art. 17 (esquecimento) | idem |
| Portabilidade | Art. 18 V | Art. 20 | idem |
| Informação sobre compartilhamento | Art. 18 VII | Art. 13-14 | idem |
| Revogação de consentimento | Art. 18 IX | Art. 7(3) | Imediato |
| Oposição ao tratamento | — | Art. 21 | 1 mês |
| Não sujeição a decisão automatizada | Art. 20 | Art. 22 | — |

## Protocolo de resposta a incidente

**Divergência crítica GDPR × LGPD:**

- **GDPR Art. 33:** notificação à autoridade supervisora em **72 horas** após conhecimento, salvo se não representar risco para os direitos e liberdades das pessoas. Comunicação ao titular (Art. 34) se risco alto.
- **LGPD Art. 48:** notificação à ANPD e ao titular em **prazo razoável** após conhecimento, quando puder acarretar risco ou dano relevante. A ANPD, por Resolução CD/ANPD nº 15/2024, orienta **até 3 dias úteis** como prazo razoável de referência.

**Racional de decisão (LGPD):** Art. 48 §1º define fatores para avaliação de risco/dano relevante: natureza dos dados afetados, titulares envolvidos, medidas técnicas antes/depois, extensão do incidente, riscos concretos. **Em dúvida → notificar** (accountability, Art. 6 X).

**Fluxo Kolden:**
```
Detecção (Égide cyber-chief) 
  → Contenção técnica (Égide)
  → Handoff regulatório (Themis analista-de-compliance-regulatorio)
  → Avaliação Art. 48 §1º (dano relevante?)
    → SIM: notificar ANPD + titular
    → NÃO: documentar racional + arquivar
  → RIPD/DPIA pós-incidente (Art. 38 LGPD / Art. 35 GDPR)
  → Escalação ao board-chair Themis se impacto estratégico
```

## DPO — quando é obrigatório

- **GDPR Art. 37:** obrigatório se (a) autoridade pública, (b) monitoramento sistemático de titulares em larga escala, (c) tratamento em larga escala de categorias sensíveis.
- **LGPD Art. 41:** todo controlador deve indicar encarregado (DPO) — a ANPD pode dispensar micro/pequenas empresas (Resolução CD/ANPD nº 2/2022).

**Regra prática:** se a Kolden trata dado de cliente externo em qualquer volume não-trivial, tem DPO. Se ainda não tem, é gap de compliance.

## Transferência internacional

**LGPD Art. 33 - 36:** permitida quando (a) país com nível de proteção adequado reconhecido pela ANPD, (b) cláusulas-padrão contratuais aprovadas ANPD, (c) normas corporativas globais, (d) consentimento específico do titular, (e) outras hipóteses do Art. 33.

**GDPR Cap. V (Arts. 44-50):** análogo — adequacy decisions (ex-EUA sob DPF), SCCs (Standard Contractual Clauses versão 2021), BCRs (Binding Corporate Rules), consentimento explícito.

**Ponto atenção 2026:** Data Privacy Framework EUA-UE em vigor desde julho/2023, mas em revisão pela EDPB. Verificar status atualizado antes de citar como base para transferência UE→EUA.

## Handoff obrigatório com Égide

**Em incidente de privacidade / PII vazado:** o `cyber-chief` (Égide) escala imediatamente para `analista-de-compliance-regulatorio` (Themis). Cyber trata detecção/contenção; Themis trata resposta regulatória. **Nota pendente para O5:** codificar bloco no CLAUDE.md do `cyber-chief` (Égide) com essa rota — feito no relatório final F6-B10, não neste momento.

## Referências

- Lei nº 13.709/2018 (LGPD) — planalto.gov.br
- Regulamento UE 2016/679 (GDPR) — eur-lex.europa.eu
- Resoluções CD/ANPD nº 2/2022 (encarregado) e nº 15/2024 (comunicação de incidente) — gov.br/anpd
- EDPB Guidelines 09/2022 on personal data breach notification — edpb.europa.eu
- Doneda, D. *Da Privacidade à Proteção de Dados Pessoais* (2ª ed., 2019)
- Bioni, B.R. *Proteção de Dados Pessoais: A função e os limites do consentimento* (Forense, 2019)
- Cavoukian, A. *Privacy by Design: The 7 Foundational Principles* (IPC-Ontario, 2011)

---

*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B10/support — capacidade G17.*
