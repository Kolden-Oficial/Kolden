---
id: spec-deck-rosie-bruno-2026-07-01
titulo: "Spec — Deck Rosie 360 para Bruno"
agente_responsavel: pm
agente_revisor: qa
status: aprovado
versao: 1.0.0
atualizado_em: 2026-06-30
relacionados: [story, qa-gate, research]
---

# Especificação — Deck Rosie 360 (Bruno · 2026-07-01)

> Construído sob a Constitution AIOX. **Artigo IV — No Invention** é o gate central: toda
> afirmação no deck deve rastrear a um FR, NFR, CON ou achado de pesquisa documentado em
> `research.json`. Sem rastro = remove ou marca como `[A VALIDAR]`.

## 1. Contexto

| Campo | Valor |
|---|---|
| Cliente | Rosie · ROSIE CONFECÇÃO E COMÉRCIO DE ROUPAS LTDA · CNPJ 57.414.364/0001-35 |
| Destinatário | Bruno (sócio operacional) |
| Data de apresentação | 2026-07-01 |
| Produtor | Kolden — sob contrato vigente desde 18/05/2026 |
| Objetivo | Apresentar estratégia 360° para os próximos 90 dias e obter aprovação para iniciar F1 |
| Constraints superiores | Manual de Marca Rosie v.01.04.2024 (canônico) · contrato Kolden×Rosie (R$ 4k fixo + 3% sobre CRM/Tráfego) |

## 2. Functional Requirements (FR)

### Estrutura do deck

| ID | Descrição | Fonte |
|---|---|---|
| FR-1 | O deck deve abrir como apresentação HTML executável em Chrome/Edge (last 2 versões) | NFR-4 |
| FR-2 | O deck deve ter ≥35 slides core + ≥7 slides apêndice, distribuídos em 6 capítulos lógicos | Brief Ronan |
| FR-3 | A capa deve identificar título do deck, destinatário (Bruno), data (2026-07-01) e produtor (Kolden) | Convenção institucional |
| FR-4 | Deve ter chapter divider visualmente distinto entre os 6 capítulos (CHROME Kolden) | Brief Ronan ("paleta híbrida") |

### Brandbook (Capítulo I)

| ID | Descrição | Fonte |
|---|---|---|
| FR-5 | Apresentar Brand Idea oficial "O descomplicado como a forma mais alta de sofisticação" | Manual p.5 |
| FR-6 | Apresentar 4 territórios de personalidade (Feminina/Sensorial/90s/Clube) | Manual p.14-18 |
| FR-7 | Apresentar Persona Rosie Girl 16-30 anos + range de preço R$39-R$579 | Manual p.8-10 + scrape site 2026-06-30 |
| FR-8 | Apresentar Propósito + 4 Valores (Versatilidade/Descomplicado/Estilo para todos/Autenticidade) | Manual p.11-13 |
| FR-9 | Apresentar 3 pilares de voz (Descomplicada/Sensorial/Acessível) com exemplos transcritos | Manual p.22-24 |
| FR-10 | Apresentar diretriz "como falamos / como não falamos" | Manual p.25-26 |
| FR-11 | Apresentar paleta oficial (Rose `#E6D2DC`, Black `#14100C`, Grey, Light pink) com Pantone | Manual p.33-36 |
| FR-12 | Apresentar tipografia oficial Marcellus + DM Sans | Manual p.37-40 |
| FR-13 | Apresentar estilo fotográfico Feminine & 90s aesthetic | Manual p.44-46 |

### Mercado (Capítulo II)

| ID | Descrição | Fonte |
|---|---|---|
| FR-14 | Apresentar TAM e-com moda Brasil 2025: R$ 2,9 bi (+35% a/a), 66% lojas Nuvemshop lideradas por mulheres | NuvemCommerce 2025 |
| FR-15 | Apresentar concorrentes diretos (Básico.com, W-Shirt, Up Básico, NANI/Adamo) com critério de classificação | Pesquisa 01 + scrape Firecrawl 2026-06-30 |
| FR-16 | Apresentar Insider Store como benchmark de modelo DTC (R$400mi 2024, R$600mi 2025, 1.1-1.5mi seg) | InfoMoney, Bloomberg Línea, Exame 2025-2026 |
| FR-17 | Apresentar Catarina Tourinho como alavanca creator-led não convertida | Steal The Look, Capricho, pesquisa 03 |

### Estratégia (Capítulo III)

| ID | Descrição | Fonte |
|---|---|---|
| FR-18 | Apresentar tese central "Rosie Girl: o descomplicado como a forma mais alta de sofisticação" ancorada na Brand Idea | FR-5 |
| FR-19 | Apresentar mapa omnichannel com 4 etapas (Atrai/Converte/Retém/Refere) e ≥20 nodes de canal | Brief Ronan ("Funnelytics-style") |
| FR-20 | KPIs de transição entre etapas devem aparecer visualmente (CTR, CVR, CAC, AOV, Recompra, LTV, NPS) | NFR-9 |

### Detalhamento por canal (Capítulo IV)

| ID | Descrição | Fonte |
|---|---|---|
| FR-21 | Meta Ads — apresentar ≥12 campanhas em matriz densa (campanha × objetivo × público × criativo × verba × KPI) | Brief Ronan ("máximo: 12 Meta + 10 Google") |
| FR-22 | Google Ads — apresentar ≥10 campanhas em matriz densa (campanha × tipo × keywords × verba × KPI) | Brief Ronan |
| FR-23 | Email RD Station — apresentar 7 cadências (trigger, público, subject hook no tom Rosie, CTA, KPI) | FR-9, KLD-109 |
| FR-24 | Comercial Kommo — apresentar pipeline 6 estágios + scripts no tom Rosie + automações | Pesquisa interna Kolden |
| FR-25 | Social orgânico — apresentar calendário editorial mensal por plataforma (IG/TikTok/FB/YouTube) | Squad Pheme |
| FR-26 | Catarina — apresentar modelo de parceria recomendado (Modelo 2 Embaixadora) + 6 entregáveis mensais | FR-17 |

### Fases (Capítulo V)

| ID | Descrição | Fonte |
|---|---|---|
| FR-27 | Cada uma das 3 fases (Descoberta/Ativação/Otimização) deve ter 3 slides: Deep Dive (5 blocos), Gantt 8 semanas, Gates de decisão | Brief Ronan ("tudo: deep dive + Gantt + gates") |
| FR-28 | Deep Dive deve conter: objetivo, ≥5 hipóteses testadas, KPIs de entrada/saída, decisão de transição, riscos+mitigação | Convenção AIOX |
| FR-29 | Gantt deve mapear ≥7 frentes × 8 semanas com intensidade colorida | Boas práticas de planejamento |
| FR-30 | Gates devem mostrar condição de avanço (e.g. "ROAS ≥ 2,5× → ativa F2") e ramo de pivôt | Gestão por sinal |

### Fechamento (Capítulo VI)

| ID | Descrição | Fonte |
|---|---|---|
| FR-31 | Investimento por fase em valores absolutos (R$/mês) + métricas alvo (CAC, ROAS, AOV, GMV 6m) | FR-23 (disclaimer obrigatório) |
| FR-32 | Governança — apresentar ritmo de check-ins (semanal, mensal, trimestral) + dashboard ao vivo | Convenção Kolden |
| FR-33 | Próximos 7 dias — separar responsabilidades Kolden vs Bruno | Brief Ronan |
| FR-34 | Encerramento com manifesto Rosie Girl + assinatura Kolden | FR-3 |

### Apêndice

| ID | Descrição | Fonte |
|---|---|---|
| FR-35 | Apêndice deve conter pelo menos: pesquisa de mercado, ICP, stack tecnológico, tracking técnico, riscos, glossário | Convenção institucional |
| FR-36 | Toggle Live (oculta apêndice) deve estar disponível via tecla L | Brief Ronan ("modo apresentação selecionável") |

### Rastreabilidade (gate AIOX Art. IV)

| ID | Descrição | Fonte |
|---|---|---|
| FR-37 | **Cada slide deve declarar visivelmente seu rastro** (FR-X ou pesquisa-Y) em footnote pequena | Constitution Art. IV — No Invention |
| FR-38 | Números financeiros devem carregar disclaimer "hipótese a validar com 30 dias de dados ao vivo" | CON-3 |

## 3. Non-Functional Requirements (NFR)

| ID | Descrição | Aceite |
|---|---|---|
| NFR-1 | Performance — First Contentful Paint &lt; 2s em conexão padrão | Verificado em DevTools |
| NFR-2 | Tipografia respirada — line-height ≥ 1.4 (corpo) e ≥ 1.2 (títulos) | Inspeção CSS |
| NFR-3 | Cores oficiais — Rose `#E6D2DC` + Black `#14100C` + Marcellus + DM Sans (corpo) + Lato (chrome Kolden) | Conformidade FR-11/12 |
| NFR-4 | Compatibilidade — funcionar em Chrome, Edge, Firefox (last 2 versões) | Smoke-test |
| NFR-5 | PDF backup &lt; 10 MB via Chrome headless | Verificado por `du -h` |
| NFR-6 | Mobile fallback — layout responsivo em viewport ≤ 768px | DevTools mobile preview |
| NFR-7 | Offline depois do primeiro load (cache navegador + fonts service-worker-friendly) | Smoke-test offline |
| NFR-8 | Dependências externas somente CDN jsdelivr (reveal.js) + Google Fonts | Audit links |
| NFR-9 | HTML semântico — `<section>` por slide, `<h1>..<h4>` em hierarquia, `<table>` para matrizes | Validador W3C |
| NFR-10 | Pasta auto-contida — sem links externos quebrados internos (imagens, CSS, JS) | grep + smoke-test |

## 4. Constraints (CON)

| ID | Descrição | Severidade |
|---|---|---|
| CON-1 | Manual de Marca Rosie v.01.04.2024 é fonte canônica de identidade — nunca inventar ou substituir | NON-NEGOTIABLE |
| CON-2 | Toda pesquisa de mercado deve citar fonte datada (NuvemCommerce, ABComm, Bloomberg, Exame, InfoMoney) | NON-NEGOTIABLE |
| CON-3 | Números financeiros são hipótese, não promessa — disclaimer obrigatório por slide | NON-NEGOTIABLE |
| CON-4 | Deck construído em HTML/CSS/JS (não Canva/PowerPoint) — paleta híbrida Kolden+Rosie | MUST |
| CON-5 | Sem referências a IDs internos de tarefas (KLD-XXX) no deck — só relatórios internos | MUST |
| CON-6 | Idioma PT-BR estrito — termos técnicos em inglês mantidos quando ecossistema impõe (CAC, ROAS, TOFU/MOFU/BOFU) | MUST |

## 5. Avaliação de Complexidade (5 dimensões AIOX, 1-5)

| Dimensão | Pontuação | Justificativa |
|---|---|---|
| Escopo | 4 | 42+ slides distribuídos em 6 capítulos com componentes específicos (Gantt, Funnelytics, matriz densa) |
| Integração | 2 | Dependências externas mínimas (CDN reveal.js + Google Fonts) |
| Infraestrutura | 1 | Sem infra além do navegador |
| Conhecimento | 4 | Exige domínio simultâneo de tráfego pago, email, comercial, design, branding |
| Risco | 3 | Apresentação para sócio operacional — pode aprovar ou rejeitar contrato |
| **Pontuação total** | **14** | Classe **STANDARD** — Spec Pipeline completo (6 fases) |

## 6. Veredito da Crítica (@qa Fase 5)

| Métrica | Pontuação |
|---|---|
| Cobertura de requirements vs brief | 4.5 / 5 |
| Rastreabilidade (Art. IV) | 4.5 / 5 |
| Clareza de aceite | 4.0 / 5 |
| Realismo de prazo | 4.0 / 5 |
| Risco mitigado | 4.5 / 5 |
| **Média** | **4.3** |

**Veredito**: APPROVED (≥ 4.0) → Passa para Fase 6 (Plan).

## 7. Plan de implementação (@architect Fase 6)

Ver `implementation.yaml` (não criado nesta sessão — rota direta para `story.md` e implementação porque o deck é entrega única, não codebase iterativo).

## 8. Próximos passos formais

1. **@sm** cria `story.md` com 10 acceptance criteria baseados em FR-1..FR-38
2. **@po** valida story (≥7 de 10 → GO)
3. **@dev** implementa `index.html` respeitando AC
4. **@qa** executa `qa-gate.md` (7 verificações)
5. **@devops** publica (push monorepo Kolden) — sob ordem explícita do Ronan
