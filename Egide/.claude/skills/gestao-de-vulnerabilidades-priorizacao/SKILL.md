---
name: gestao-de-vulnerabilidades-priorizacao
description: >-
  Use quando precisar transformar um monte de achados/CVEs num plano de
  remediação ordenado — priorizar vulnerabilidades por risco real (não só por
  CVSS), combinar CVSS + EPSS + KEV + exposição/contexto, definir SLA de
  correção, e medir o fluxo de gestão de vulnerabilidade. É o eixo de
  vuln-management da Égide. Metodológico: ensina a DECIDIR o que corrigir
  primeiro, não a explorar a falha.
domain: ciberseguranca
subdomain: gestao-de-vulnerabilidades
tags: [vuln-management, cvss, epss, kev, priorizacao, sla, remediacao, risco]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Gestão de Vulnerabilidades (Priorização)

> O scanner sempre devolve mais achados do que se consegue corrigir. O valor
> desta habilidade é **ordenar por risco real** para não gastar o time corrigindo
> CVSS 9.8 que ninguém explora enquanto um CVSS 6 sob exploração ativa fica
> aberto. Foco em decisão, não em ataque.

## Os três sinais e o que cada um diz

Priorizar só por CVSS é o erro clássico — CVSS mede **severidade técnica
teórica**, não probabilidade de ataque. Combine três sinais ortogonais:

- **CVSS (severidade)** — o quão grave SE for explorada (Base + Temporal +
  Environmental). Use o **Environmental** para reponderar pela sua realidade
  (um RCE numa caixa isolada sem dado pesa menos). É o teto de dano, não a chance.
- **EPSS (probabilidade)** — score 0–1 da probabilidade de exploração nos
  próximos 30 dias, baseado em evidência real. Separa "grave em teoria" de
  "provavelmente atacada". Atualiza diariamente; reordene periodicamente.
- **KEV / exploração conhecida (fato)** — se está no catálogo de
  *Known Exploited Vulnerabilities* (CISA) ou há exploit público/atividade
  observada, sobe ao topo independente do resto: é exploração confirmada no mundo.

## Modelo de decisão (ordem de remediação)

Combine os sinais com o **contexto de exposição** do ativo:

1. **Exposição** — o ativo é exposto à internet? Tem dado sensível? É crítico ao
   negócio? Há mitigação compensatória (WAF, segmentação, sem alcance)? Isso
   modula tudo.
2. **Regra de topo** — KEV ou exploração ativa **e** ativo exposto = corrige já,
   fora da fila normal.
3. **Faixa alta** — EPSS alto **e** CVSS alto **e** exposto = próximo.
4. **Faixa média** — CVSS alto mas EPSS baixo e sem exposição = janela normal de
   patch; não vira emergência só pelo número.
5. **Faixa baixa** — baixo em tudo = lote de manutenção / aceitar com registro.

Use uma matriz (probabilidade × impacto-contextual) para classificar em faixas em
vez de ordenar 5000 itens individualmente — agrupar por faixa é o que torna o
fluxo operável.

## SLA e ciclo de vida

- **SLA por faixa** — defina prazo de correção por classe de risco (ex.: crítica
  exposta = horas/dias; média = semanas; baixa = ciclo de manutenção) e meça
  aderência.
- **Ciclo**: descobrir → enriquecer (CVSS/EPSS/KEV/exposição) → priorizar →
  atribuir dono → remediar/mitigar/aceitar → verificar a correção → registrar.
- **Decisão de tratamento**: corrigir, mitigar (controle compensatório), ou
  **aceitar formalmente** o risco com dono e prazo. Aceitação sem registro é
  dívida invisível.
- **Métricas de fluxo**: tempo médio de remediação (MTTR) por faixa, idade dos
  achados abertos, % de KEV abertos, cobertura de scanning, taxa de reabertura.

## Critérios de validação
- A priorização combina CVSS **e** EPSS **e** KEV **e** exposição — nunca CVSS
  sozinho.
- Há SLA por faixa de risco e ele é medido.
- Todo achado tem destino: corrigido, mitigado ou aceito-com-registro.
- O EPSS é reavaliado periodicamente (a fila reordena com a evidência nova).

## Sobreposição resolvida
A descoberta automatizada (rodar scanner em CI) fica em
`devsecops-sast-dast-em-ci`; aqui está a **triagem e decisão** sobre o que o
scanner achou. A análise técnica de uma classe específica fica nas habilidades de
domínio (web, API, cripto).

## Herança histórica

**FIRST.org (Forum of Incident Response and Security Teams)** — mantém o padrão **CVSS** (Common Vulnerability Scoring System) desde 2005 (v2.0 2007, v3.0 2015, v3.1 2019, **v4.0 novembro 2023**); Peter Mell (NIST) e Karen Scarfone foram autores fundamentais das primeiras versões.

**Jay Jacobs e Sasha Romanosky** — cocriadores do **EPSS (Exploit Prediction Scoring System, 2019)** no FIRST.org SIG; publicaram em 2020-2021 os papers que consolidaram EPSS como o sinal probabilístico da priorização — a base da seção "Os três sinais".

**CISA — Known Exploited Vulnerabilities (KEV) Catalog team** — publicou em novembro de 2021 (Binding Operational Directive 22-01) o **KEV Catalog**, listando CVEs com exploração confirmada; virou terceira perna canônica (CVSS + EPSS + KEV) da priorização moderna.

**Kenna Security (agora Cisco Vulnerability Management)** — pioneiros na abordagem *risk-based vulnerability management* desde ~2014; o RSAC 2018 report *Prioritization to Prediction* (com Cyentia Institute) provou empiricamente que CVSS sozinho é ruim classificador de "o que vai ser explorado" — origem doutrinal desta skill.

**Frameworks canônicos herdados**:
- **CVSS v3.1 e v4.0** (FIRST.org) — severidade técnica (Base + Threat + Environmental + Supplemental na v4).
- **EPSS** (FIRST.org SIG) — probabilidade 0-1 de exploração em 30 dias, atualizado diariamente.
- **CISA KEV Catalog** — lista canônica de exploração ativa.
- **SSVC (Stakeholder-Specific Vulnerability Categorization, CERT/CC, 2019)** — árvore de decisão alternativa ao score composto, adotada pela CISA.
- **Prioritization to Prediction** (Kenna+Cyentia, 2018-2023) — corpo empírico que fundamenta a matriz probabilidade × impacto-contextual.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster
G15 (vulnerability management — scanning, triagem, priorização CVSS/EPSS,
remediação, ~25 skills). Método extraído e reescrito em PT-BR; nenhuma cópia
literal.*
