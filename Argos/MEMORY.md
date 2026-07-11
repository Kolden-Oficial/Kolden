---
tipo: memoria
squad: Argos
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Argos/agents/argos-chief|argos-chief]]"
---

# Memória do Squad Argos

> Auto-aprendizado do squad de Inteligência de Mercado & Scraping. Atualizado pelo
> `ritual-de-encerramento` ao fim de cada sessão com trabalho. Esquema fixo: Padrões Ativos /
> Candidatos a Promoção / Arquivado. Append e merge — nunca reescrever do zero.

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este squad -->

### Fontes confiáveis por domínio
<!-- Ex.: "TAM de SaaS BR → relatórios ABES + bottom-up via Apollo | AAAA-MM-DD" -->

### Gotchas de coleta
<!-- Ex.: "Ad library da Meta exige scroll dinâmico (browser_*), firecrawl sozinho não pega | AAAA-MM-DD" -->

- **DIFF de planilha vs planilha: sempre normalizar tipo antes de reportar mudança.** Uma célula "8%" (string) e outra `8` (number) representam o mesmo valor semântico quando `unit=Percent` — se comparar `===` direto, gera 6 falsos positivos por serviço em `%`. Aplicar `numify` que strip `$`, `%`, `,` antes do compare. | 2026-07-09 (missão Vilela rodada 2)
- **XLSX de precificação: contar Total Line Items declarado vs contado.** O Dashboard da nova planilha declara "Total Line Items: 112" e o Price Book entrega 112 — quando bate cravado (junto com Average Standard Price = $2.347,14 conferido no parse), é sinal de que o autor **editou com cuidado** e as observações podem confiar no conteúdo em vez de duvidar da estrutura. | 2026-07-09

### Padrões de concorrente / mercado
<!-- Ex.: "Players de infoproduto BR concentram pago em Reels + YouTube ads | AAAA-MM-DD" -->

- **Contratante residencial nos EUA usa Excel como CRM/PoS.** Vilela Construction (MA) tem Price Book com 3 tiers (Economy/Standard/Premium) + Estimate Builder com 50 slots + Small Job Minimum ($350). Sinal de maturidade **operacional** (processo definido) + imaturidade **digital** (nada disso conversa com o site do prospect). Oportunidade Kolden: quote-builder web usa o JSON como seed. | 2026-07-09
- **Poda de catálogo = mudança de escopo real do negócio.** Cliente passou de 130 para 112 serviços em 6 dias, **zero adições**. As 3 categorias abandonadas (Additions, Multifamily Conversion, New Construction) são justamente as de maior complexidade permit/engenharia. Ler poda como declaração estratégica de foco, não como bug — mas confirmar com o cliente se é "não faço" ou "não vendo assim". | 2026-07-09
- **Média de preço em Price Book multi-unit é enganosa.** Vilela tem preços por SF ($2) e por Job ($65k) na mesma coluna Standard — a média geral ($2.347,14) só serve como sanity check, não como âncora de posicionamento. Recorte por `unit` é obrigatório antes de comparar categorias. | 2026-07-09

## Candidatos a Promoção
<!-- Padrões vistos em 3+ contextos — candidatos para CLAUDE.md ou regras -->
<!-- Formato: - **{padrão}** | Origem: {casos} | Detectado: {AAAA-MM-DD} -->

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {AAAA-MM-DD} | Motivo: {motivo} -->
