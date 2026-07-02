# Memória do Agente traffic-chief

> Memória persistente deste agente. Atualizada pelo Ritual de Encerramento
> (habilidade `ritual-de-encerramento`) ao final de cada sessão com trabalho.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Método de diagnóstico (quando o Ronan pede laudo, não execução)
- Explores paralelos ANTES do Plan agent: 3 perguntas independentes (pasta X, squad Y, contexto Z) convergem rápido — descobri gap GHL×Ads, roles Peitho/Emporos/Ariadne e cliente-alvo (Vilela) em 3 chamadas | 2026-07-01
- AskUserQuestion sobre "qual cliente" ANTES do laudo: se tivesse assumido EntreSolos (candidato óbvio no repo), teria escrito laudo pro cliente errado — sempre confirmar cliente antes de laudo dedicado | 2026-07-01
- Detectar discrepância usuário × evidência do repo, não engolir: Ronan disse "GHL nativo", repo dizia "LP externa + Sheets + CRM rejeitado no contrato". Levantar como hipótese aberta (CP1) em vez de assumir uma leitura | 2026-07-01
- Laudo direto em `clientes/ativos/<slug>-diagnostico-<frente>-<data>.md`: dossiê + laudo perto, versionados juntos, resgatáveis por Glob | 2026-07-01

### Regras de delegação (rastreamento × formulário × CRM)
- Peitho puro cobre tag/pixel/gclid/GTM/OCI/Enhanced Conversions — pixel-specialist + kasim-aslam bastam; não precisa Caos pra agente novo | 2026-07-01
- Emporos/gestor-de-crm só entra se CRM está no contrato do cliente. Contrato Vilela §3 rejeitou CRM → CRM=fora, mesmo que a solução técnica pareça pedir | 2026-07-01
- Ariadne/otimizador-de-formulario é opcional — cuida de CRO, não de tag. Separar bem: tag = Peitho; UX/CRO = Ariadne | 2026-07-01

### Veto sem_pixel_e_rastreio precisa de detector contínuo
- Peitho tem o veto no `squad.yaml` mas nenhum agente cruza atas de check-in × status de rastreamento pra disparar HALT retroativo — Bernardo otimizou keywords Vilela por 1 semana sem tag instrumentada e o squad não se auto-cobrou | 2026-07-01
- Regra a incorporar: quando entrar diagnóstico numa conta ativa, primeira pergunta é "tem tag instrumentada?" — se não, HALT retroativo antes de análise de estratégia | 2026-07-01

### Rastreamento Google Ads em CRM alheio (as 3 camadas)
- Enhanced Conversions for Leads NÃO precisa GA4 ativo — roda direto na tag do Ads via user-provided data hasheado. Não confundir com Enhanced Conversions do GA4→Ads (import de eventos GA4) | 2026-07-01
- 3 camadas (client-side gtag + OCI via gclid + Enhanced Conversions) são redundantes por design: iOS, cookies e adblock atacam em ângulos distintos; escolher só uma deixa gap | 2026-07-01
- Ordem obrigatória: 1→2→3. Sem Camada 1 (tag base) rodando, Camadas 2 (OCI) e 3 (Enhanced) não têm chão | 2026-07-01
- OCI via Google Sheets é MVP válido enquanto Ads API OCI está bloqueada por developer token pendente — upload semanal manual, janela 90d dá folga confortável | 2026-07-01

### Contrato do cliente como fronteira dura
- Ler §3 (Contrato) do dossiê ANTES de propor qualquer coisa que envolva CRM/automação/desenvolvimento — evita propor arquitetura fora de escopo contratual | 2026-07-01
- Se cliente rejeitou CRM na negociação, "usar GHL" só faz sentido como (a) sombra Kolden, (b) preparação pro aditivo do mês N, (c) reabertura formal com o cliente — nunca assumir | 2026-07-01

### Preferências do Ronan observadas
- "Diagnóstico agora, escalar depois" = respeitar o recorte, entregar laudo e parar — não empurrar execução por conta própria | 2026-07-01
- "Esquema completo (3 camadas)" quando há opção redundante — Ronan prefere resiliência a minimalismo, mesmo com custo de tempo | 2026-07-01
- "Manual agora + preparar scripts pro futuro" = pragmatismo com preparação — documentar spec sem escrever código antes do bloqueio real sair (ex.: developer token) | 2026-07-01

### Gaps que Dike pegou no rascunho v1 (aprender pra não repetir)
- **Valor de conversão ≠ ticket bruto do serviço.** Para Smart Bidding: `valor_esperado_por_lead = ticket_médio × margem_bruta × taxa_fechamento`. Colocar USD 55k (ticket) em vez de USD 4.8k (lead) inflaria CAC e destruiria otimização | 2026-07-01
- **Quantificar o custo do gap.** "Está errado" é vago; "USD 250/semana queimados × N semanas = USD X perdidos" é acionável. Sempre traduzir gap em número de mídia | 2026-07-01
- **Cada opção proposta deve ter risco jurídico auditado.** GHL sombra Kolden = TOS multi-tenancy + ambiguidade de propriedade + LGPD/CCPA. Sem cláusula escrita em check-in, opção sai do menu | 2026-07-01
- **Uma frente de mídia rodando sem tag = auditoria só de uma plataforma é meia auditoria.** Se Google está sem tag, Meta provavelmente também está — abrir frente 2 (Pixel/CAPI) no mesmo laudo | 2026-07-01
- **Upload manual recorrente é dívida silenciosa por design.** Toda vez que propor processo periódico manual (ex.: OCI semanal), incluir automação/reminder (Hermes cron, Google Calendar, hook shell) — senão vira débito | 2026-07-01
- **Perguntas em aberto: consolidar para caber em AskUserQuestion (máx 4 blocos).** 6 perguntas isoladas viram atrito; 4 blocos multi-opção são absorvíveis num único ciclo de resposta | 2026-07-01

### Ajustes técnicos Google Ads (calibragem por vertical)
- **Janela de conversão pós-click:** default 30d serve para B2C compra rápida. Para reforma/basement/imobiliário (high-consideration, ciclo longo), usar **90 dias post-click** — 30d corta atribuição no meio do funil | 2026-07-01
- **Match rate Enhanced Conversions < 40% em D+14 = red flag operacional.** Causa provável: seletores de campo errados ou hash com whitespace/uppercase. Auditoria via *Enhanced conversions diagnostics → Sample events* | 2026-07-01

### Regra de delegação atualizada (Ariadne condicional, não opcional)
- Ariadne/otimizador-de-formulario tem **gatilho D+15 pós-Camada 1**: se taxa de submit < 15% → Ariadne entra ANTES das Camadas 2 e 3 (não faz sentido otimizar OCI/Enhanced se ninguém completa o form). Se ≥ 15%, fica na fila pós-Camada 3 | 2026-07-01

### Meta-aprendizado (processo de entrega Peitho)
- **Rascunho de laudo Peitho passa por Dike (análise adversarial) antes de virar entrega final.** Dike encontrou 6 gaps em laudo que eu considerava "pronto" — nunca tratar rascunho como pronto sem revisão adversarial explícita | 2026-07-01

## Candidatos a Promoção
- **Detectar discrepância usuário × evidência do repo, levantar como hipótese aberta em vez de engolir uma leitura** | Origem: traffic-chief (Peitho) — potencial para Aletheia, Liceu, qualquer agente de diagnóstico | Detectado: 2026-07-01
- **Ler §3 (Contrato) do dossiê ANTES de propor arquitetura que envolva CRM/automação/dev** | Origem: traffic-chief (Peitho) — potencial para Emporos, Aletheia, Dedalo | Detectado: 2026-07-01
- **Quantificar o custo do gap em número de mídia/receita, não em prosa** | Origem: traffic-chief (Peitho) — potencial para Aletheia, Metis, Plutos, qualquer agente que produza laudo | Detectado: 2026-07-01
- **Cada opção proposta em decisão de arquitetura deve ter risco jurídico auditado antes de ir pro menu** | Origem: traffic-chief (Peitho) — potencial para Emporos, Themis, Dedalo, qualquer agente que sugira arquitetura envolvendo dados de cliente | Detectado: 2026-07-01
- **Rascunho passa por revisão adversarial (Dike) antes de virar entrega final** | Origem: traffic-chief (Peitho) — potencial para todos os squads que produzem laudo/proposta/plano | Detectado: 2026-07-01

## Arquivado
