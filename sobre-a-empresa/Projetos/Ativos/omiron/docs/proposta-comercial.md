---
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/docs/prd-omiron-app|prd-omiron-app]]"
---

# Proposta de Parceria Estratégica — Omiron
**Kolden × Clínica Dr. Ariosto Filho**
Data: 03/06/2026

---

## 1. O que está sendo desenvolvido

**Omiron** é um sistema exclusivo de monitoramento terapêutico contínuo para a Clínica Dr. Ariosto Filho. Não é um app genérico — é desenvolvido 100% para a clínica, com a identidade visual e os protocolos clínicos do Dr. Ariosto.

**O sistema inclui:**
- 7 áreas de monitoramento terapêutico (Medicação, Alimentação, Movimento, Conexões Sociais, Gestão de Estresse, Produtividade, Tóxicos)
- 3 perfis de usuário: Paciente, Secretária (Helen) e Dr. Ariosto
- Check-ins diários com escala de humor, texto e foto
- Dashboard médico com gráficos de evolução (30/60/90 dias)
- Escalas diagnósticas automáticas (HAM-A, HAM-D, YMRS, Madres) 24h antes das consultas
- Chat em tempo real médico-paciente
- Gamificação: planta virtual que cresce com adesão
- Frases históricas diárias por diagnóstico
- Relatório PDF por paciente com um clique
- Comunidade anônima interna (jardim coletivo)
- Notificações e lembretes configuráveis

**Stack técnico:**
Next.js 14 + tRPC + Prisma + PostgreSQL (Supabase) + Vercel + Resend + Claude API

**Timeline:** Junho–Julho 2026 | Lançamento piloto: 31/07/2026

---

## 2. Escopo Incluso

| Item | Incluso |
|------|---------|
| App completo (6 epics / ~39 stories) | ✅ |
| Hospedagem e infraestrutura (6 meses pós-lançamento) | ✅ |
| Domínio personalizado | ✅ |
| Banco de dados e storage (fotos, PDFs, áudios) | ✅ |
| Onboarding dos primeiros 10 pacientes | ✅ |
| Treinamento para secretária Helen e Dr. Ariosto | ✅ |
| 3 meses de suporte técnico pós-lançamento | ✅ |
| Código-fonte (propriedade do Dr. Ariosto após quitação) | ✅ |

---

## 3. Escopo NÃO Incluso (responsabilidade Dr. Ariosto)

| Item | Responsável |
|------|-------------|
| 31 frases históricas por transtorno (verificadas) | Dr. Ariosto |
| Escalas diagnósticas em PDF (HAM-A, HAM-D, YMRS, Madres, Cococolos) | Dr. Ariosto |
| Gravações de meditação guiada (estúdio) | Dr. Ariosto |
| Aprovação do fluxo de onboarding | Dr. Ariosto |
| Conteúdo das mensagens motivacionais semanais | Dr. Ariosto |
| Integrações com prontuário eletrônico externo | Fora do escopo |
| Teleconsulta ou prescrição digital | Fora do escopo (CFM) |

---

## 4. Investimento

### Opção A — Founding Partner (Recomendada)

| Componente | Valor | Condição |
|------------|-------|----------|
| Implementação | R$10.000 | 10x R$1.000 (vinculadas às entregas) |
| Plataforma mensal | R$350/mês | A partir do lançamento (ago/2026) |

**O que justifica R$350/mês:**
- Cobre custos de infraestrutura (~R$486/mês)
- Inclui: suporte técnico, updates de segurança, backups, monitoramento
- Prepara a relação de cobrança para a Fase 2 SaaS

**O que a Kolden oferece em troca do preço de parceria:**
- Preço 80% abaixo do valor de mercado (R$45k–R$150k)
- Cláusula de case study (ver seção 7)
- Dr. Ariosto como co-criador da plataforma B2B (Fase 2)

### Opção B — Simplificada

| Componente | Valor | Condição |
|------------|-------|----------|
| Implementação | R$10.000 | 10x R$1.000 |
| Infra inclusa | Gratuito | Por 6 meses após lançamento |
| A partir de fev/2027 | R$350/mês | Renovação anual |

---

## 5. Cronograma de Entregas × Pagamentos

| Data | Entrega | Pagamento |
|------|---------|-----------|
| Aprovação | Briefing de conteúdo + início do projeto | R$1.000 (1ª parcela) |
| 20/06/2026 | Autenticação 3 perfis + Ficha completa do paciente | R$1.000 (2ª parcela) |
| 30/06/2026 | Dashboard médico + Chat + Relatórios PDF | R$1.000 (3ª parcela) |
| 20/07/2026 | Gamificação + Escalas diagnósticas + Conteúdo clínico | R$1.000 (4ª parcela) |
| 31/07/2026 | Piloto com 5 pacientes reais + Onboarding | R$1.000 (5ª parcela) |
| Ago–Dez/2026 | Suporte + melhorias + 5 parcelas restantes | R$1.000/mês |

**Bloqueador crítico:** Conteúdo do Dr. Ariosto (frases, escalas, meditações) deve ser entregue até 08/07/2026 para não atrasar o E5.

---

## 6. Custos de Infraestrutura (para transparência)

| Ferramenta | Função | Custo mensal |
|------------|--------|-------------|
| Vercel Pro | Hospedagem do app + deploy automático | ~R$120 |
| Supabase Pro | Banco de dados + auth + storage + realtime | ~R$150 |
| Resend Starter | Emails transacionais + lembretes | ~R$120 |
| Domínio | omiron.com.br ou similar | ~R$6 |
| Claude API | Insights clínicos personalizados | ~R$90 |
| **Total** | | **~R$486/mês** |

*Custo durante o piloto (5–10 pacientes): ~R$0–30/mês usando free tiers.*
*Migração para planos pagos no lançamento oficial.*

---

## 7. Cláusula de Case Study

Ao assinar esta proposta, Dr. Ariosto Filho autoriza a Kolden a:
1. Usar métricas de engajamento anônimas do Omiron como prova de conceito
2. Mencionar a Clínica Dr. Ariosto Filho como **founding client** do Omiron
3. Incluir a clínica como referência em apresentações para outras clínicas psiquiátricas (Fase 2 SaaS)
4. Exibir screenshots do app (sem dados de pacientes) em materiais de marketing da Kolden

**Em contrapartida, a Kolden se compromete a:**
- Nunca revelar dados clínicos, nome de pacientes ou informações sensíveis
- Não exibir dados identificáveis da clínica sem aprovação prévia
- Manter a exclusividade regional (nenhuma clínica concorrente no mesmo município enquanto o contrato estiver ativo)

---

## 8. Fase 2 — SaaS para Psiquiatras (2027)

Após a validação com a Clínica Dr. Ariosto, o Omiron será expandido para outras clínicas psiquiátricas como SaaS B2B a R$299–599/clínica/mês.

**O Dr. Ariosto, como founding client, terá:**
- Desconto permanente na mensalidade da plataforma
- Créditos no material de lançamento como pioneiro
- Opção de participação (a definir) nos resultados da Fase 2

---

## 9. Próximos Passos

Para dar início ao projeto:

1. **Aprovação desta proposta** — assinatura ou confirmação por escrito (email)
2. **Briefing de conteúdo** — reunião de 1h com Dr. Ariosto esta semana para mapear frases, escalas e protocolo de onboarding
3. **1ª parcela** — R$1.000 até [data a confirmar]
4. **Kick-off técnico** — 03/06/2026 ou conforme disponibilidade

---

## Validade da Proposta

Esta proposta é válida por **15 dias** a partir da data de emissão (03/06/2026).
Após 18/06/2026, os valores e condições podem ser revisados.

---

*Kolden — Ecossistema de Alta Performance*
*Ronan Sérgio | adm@kolden.com.br | kolden.com.br*
*Emitida em 03/06/2026*
