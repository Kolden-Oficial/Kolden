---
name: redacao-de-proposta-comercial
description: >
  Use para redigir PROPOSTA COMERCIAL, orçamento ou resposta a RFP/licitação para um deal qualificado.
  Cobre a estrutura da proposta (contexto/dor → solução → escopo → preço dentro da política → prova/ROI →
  próximos passos), composição de orçamento, matriz de aderência para RFP e anexos exigidos. Preço sempre
  dentro da política do Afrodite (CRO); fora dela é exceção a escalar, não decisão local. Não emite parecer
  jurídico. Gatilhos: "proposta", "orçamento", "RFP", "responder licitação", "contrato comercial",
  "termos", "fechar com proposta". Dono: redator-de-propostas. GHL via Infisical.
---

# Redação de Proposta Comercial

Transforma um deal qualificado em peça comercial que vende valor — ancorada na dor real do cliente e na
oferta vigente. Preço/prazo/escopo vivem dentro da política do Afrodite; fora dela, é escalonamento.

## 1. Estrutura da proposta
1. **Contexto/dor** — espelha a dor qualificada na linguagem do cliente (mostra que entendemos).
2. **Solução** — a oferta como resposta à dor; valor antes de feature.
3. **Escopo** — o que está incluído e o que **não** está (evita disputa depois).
4. **Preço** — dentro da tabela/política; pacotes/opções quando previstos. Fora da faixa = EXCEÇÃO a escalar.
5. **Prova/ROI** — evidência real (caso, métrica, garantia). Sem número inventado; estimativa é rotulada.
6. **Próximos passos** — caminho claro até a assinatura, com data e responsável.

## 2. Orçamento
Composição transparente dentro da política do Afrodite: itens, quantidades, valor unitário, total,
condições. Opções/tiers só se a política previr. Desconto fora da faixa → escalonamento.

## 3. Resposta a RFP/licitação
- **Ler os requisitos** e montar **matriz de aderência**: cada exigência → Atende / Parcial / Não atende
  + evidência.
- Responder **ponto a ponto** na ordem do edital; nunca deixar requisito sem resposta.
- Listar **anexos exigidos** (certidões, portfólio, planilhas) e o responsável por cada.

## 4. Fronteira jurídica
A peça é **comercial**, não jurídica. Cláusula, risco legal ou termo contratual que exija parecer escala
a quem de direito — o redator não emite opinião legal.

## Saída
Use o formato do agente `redator-de-propostas` (DEAL / TIPO / RESUMO DA OFERTA / ESCOPO / PREÇO [dentro
da política?] / PROVA-ROI / NEGOCIAÇÃO / PRÓXIMO PASSO + DONO + DATA). Proposta anexada à oportunidade no
GHL; credenciais via Infisical.

---
*Princípios reescritos (sem cópia literal) a partir de: alirezarezvani/claude-skills@4a3c05b (MIT) —
cluster comercial G19 (contract-and-proposal-writer, rfp-responder, deal-desk, commercial-policy);
anthropics/knowledge-work-plugins@78d74d5 (Apache-2.0) — plugin `sales` (create-an-asset).*
