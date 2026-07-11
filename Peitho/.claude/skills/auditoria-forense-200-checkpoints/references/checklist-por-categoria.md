---
tipo: nota
area: Peitho
up: "[[Peitho/_MOC-peitho]]"
---

# Checklist forense — 200+ pontos por categoria

Cada linha é um checkpoint. Marcar `PASS / FAIL / N/A` + severidade + impacto $/mês.

## 1. Estrutura da conta

- [ ] Convenção de nomes de campanha consistente
- [ ] Convenção de nomes de ad group / asset group
- [ ] Convenção de nomes de anúncio individual (versão + variante)
- [ ] Match type NÃO misturado no mesmo ad group
- [ ] CBO adequado para maturidade (>10 conv/dia)
- [ ] ABO onde ainda em fase exploratória
- [ ] Nº total de campanhas ativas <= 20 (fragmentação)
- [ ] Ratio ad groups por campanha razoável (2-8)
- [ ] Nenhuma campanha duplicada (mesmo público + mesmo objetivo)
- [ ] Objetivo de campanha bate com KPI de negócio
- [ ] Shared budgets com governança clara
- [ ] Structure permite reporting por mercado
- [ ] Structure permite reporting por linha de produto
- [ ] Sandbox campaigns arquivadas
- [ ] Naming permite scale de novo produto
- [ ] Nenhum "test-final-v2" abandonado
- [ ] Labels aplicadas para rastreio de experimento
- [ ] Convenção documentada em README interno
- [ ] Manager account (MCC) hierarchy limpa
- [ ] Campanhas herdadas com dono definido

## 2. Saúde de público

- [ ] Overlap tool executado nos últimos 30 dias
- [ ] Overlap >30% entre ad sets ativos tratado
- [ ] Audiência size × budget = 1000+ conv possíveis
- [ ] Lookalikes atualizados nos últimos 90 dias
- [ ] Seed source dos LAL declarado
- [ ] Custom audiences não expiradas (retention window)
- [ ] Clientes existentes excluídos em prospecting
- [ ] Purchasers excluídos em retargeting
- [ ] Segmentação demo redundante removida
- [ ] Interest targeting priorizado (não pilha de 20)
- [ ] Placeholder audiences arquivadas
- [ ] Sequencing (TOFU → MOFU → BOFU) declarado
- [ ] CAPI enviando 15+ audience signals
- [ ] Advantage+ Audience testado
- [ ] Broad targeting com signal forte
- [ ] Audience network exclusion configurado
- [ ] Detailed targeting expansion ativada consciente
- [ ] Value-based lookalike se dados de compra
- [ ] Similar audiences (Google) revisto
- [ ] Customer Match ativo (Google)

## 3. Criativo

- [ ] 3-5 criativos ativos por ad set no mínimo
- [ ] Idade média criativo <45 dias em top spenders
- [ ] Formato variado: imagem / vídeo / carrossel
- [ ] Aspect ratios 1:1 / 9:16 / 4:5 conforme placement
- [ ] Ângulos variados (>= 3 níveis de awareness)
- [ ] Histórico de teste documentado
- [ ] Refresh mensal >20% da biblioteca
- [ ] Hooks (primeiros 3s) testados em vídeo
- [ ] CTA button aligned com landing CTA
- [ ] Compliance: sem before/after de saúde
- [ ] Sem claim absoluto sem disclaimer
- [ ] UGC (user-generated content) na mistura
- [ ] Native format prevalece sobre banner-like
- [ ] Copy de anúncio em PT-BR nativo (se BR)
- [ ] Legenda com contraste (vídeo com mute)
- [ ] Thumbnails testados
- [ ] Frequência do criativo <3.5 (Meta)
- [ ] Winner identificado por statistical confidence
- [ ] Killed criatives arquivados, não excluídos
- [ ] Nenhum criativo com política pendente

## 4. Eficiência de orçamento

- [ ] Regra 80/20: 20% dos ad sets >= 60% resultado
- [ ] Nenhum zombie (0 conv em 7+ dias) rodando
- [ ] Budget mínimo para exit learning phase (Meta: 50 conv/semana)
- [ ] Dia da semana × hora × conv mapeados
- [ ] Dayparting configurado onde faz diferença
- [ ] Placement report revisto
- [ ] Audience Network / apps ruins excluídos
- [ ] Bid strategy correta para maturidade
- [ ] tCPA calibrado (não muito abaixo do CPA real)
- [ ] tROAS calibrado (não travando entrega)
- [ ] Portfolio bidding usado onde faz sentido
- [ ] Reserva de teste (5-15%) apartada
- [ ] Nenhum "paused → resumed → paused" loop
- [ ] Budget pacing revisto semanal
- [ ] Overspend / underspend alertado
- [ ] Custo por lead qualified (não só CPL bruto)
- [ ] Downstream ROAS (não só first-touch)
- [ ] Budget realocado para vencedores mensal
- [ ] Perdedores mortos em 21 dias no máximo
- [ ] Sazonalidade planejada (Q4, Black Friday)

## 5. Rastreio

- [ ] Pixel base instalado em todas as páginas
- [ ] CAPI (Meta) ativo e reconciliando
- [ ] EMQ (Event Match Quality) > 6
- [ ] Enhanced Conversions (Google) ativo
- [ ] Server-side (Google) via GTM Server ou similar
- [ ] Aggregated Event Measurement configurado
- [ ] Prioridade de eventos declarada (max 8 por domínio Meta)
- [ ] Attribution window definido com racional
- [ ] Discrepância plataforma vs GA4 < 15%
- [ ] Consent Mode v2 implementado (se BR/EU)
- [ ] UTM parameters consistentes no funil
- [ ] Deduplicação browser × server ativa
- [ ] Purchase value com currency correta
- [ ] Content_ids passando no evento
- [ ] Thank-you page dispara evento 1× (sem duplicar)
- [ ] Alerta de falha de tracking configurado
- [ ] Domain verification ativa
- [ ] Business Manager admin controlado
- [ ] Data source (Meta) associado corretamente
- [ ] Offline conversion upload se aplicável

## 6. Funil

- [ ] LP bate com hook do criativo
- [ ] LCP < 2.5s
- [ ] INP < 200ms
- [ ] CLS < 0.1
- [ ] Formulário <= 5 campos em BOFU
- [ ] Taxa de conversão por estágio mapeada
- [ ] Nurture para não-convertidos ativa
- [ ] CRM handoff auditado (lead entra?)
- [ ] Copy da LP alinhada com anúncio
- [ ] Trust signals visíveis (prova, garantia)
- [ ] Mobile UX ≥ desktop
- [ ] Video load não bloqueia LCP
- [ ] Thank-you dispara evento correto
- [ ] Confirmação de email não some lead
- [ ] LP passa em test de heurística (walkthrough-de-persona)
- [ ] Speed insights integrado
- [ ] A/B da LP rodando (não fixa)
- [ ] Checkout flow < 3 telas em e-com
- [ ] Cupom / promo visível antes do checkout
- [ ] Retargeting de LP-view configurado

## 7. Change history

- [ ] Access review (quem tem acesso) mensal
- [ ] MFA obrigatório para todos os users
- [ ] Change history nos últimos 90 dias revista
- [ ] Mudança que coincide com quebra identificada
- [ ] Automated rules documentadas
- [ ] Scripts (Google Ads) com dono declarado
- [ ] Terceiros ex-agência removidos
- [ ] Log de acesso auditado trimestral
- [ ] Bulk actions com justificativa
- [ ] Nenhum "edit → revert" recente
- [ ] Backup de estrutura mensal
- [ ] Convenção de comentário em Notes
- [ ] Delivery insights checados
- [ ] Auction insights por competitor
- [ ] Recommendations do Google Ads triadas (não auto-apply)
- [ ] Advantage+ recommendations triadas
- [ ] User role separation (admin vs. edit vs. view)
- [ ] Nenhuma senha compartilhada
- [ ] SSO integrado se enterprise
- [ ] Session token rotation

## 8. Compliance & risco

- [ ] Nenhuma política violada em revisão manual
- [ ] Special Ad Category se health/finance/politics
- [ ] LP em conformidade LGPD (BR)
- [ ] Consent cookie ativo antes do pixel
- [ ] Claim de resultado com disclaimer
- [ ] Nenhum dado sensível em custom audience
- [ ] Certificação de agência ativa
- [ ] 2FA em todos os users
- [ ] Backup de estrutura recente
- [ ] Documento de handoff pronto
- [ ] Contratos com plataformas assinados
- [ ] Termos de uso da plataforma revistos
- [ ] Copyright / trademark limpo
- [ ] Retargeting sem violar política de sensitive data
- [ ] Landing sem categorias proibidas
- [ ] Business Manager owner clarificado
- [ ] Plataforma-específica compliance (TikTok China vs. US)
- [ ] Kids-directed content flag (COPPA)
- [ ] Alcohol / gambling restrictions se aplicável
- [ ] Third-party pixel policy respeitada
