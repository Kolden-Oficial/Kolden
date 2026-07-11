---
tipo: memoria
squad: Aletheia
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Aletheia/agents/aletheia-chief|aletheia-chief]]"
---

# Memória do Squad — Aletheia

Memória de longo prazo do squad, alimentada pelo **Ritual de Encerramento** ao fim de cada
sessão com trabalho. Esquema em três blocos. Só registre lições **verificadas** sobre validação.

## Padrões Ativos
Lições já confirmadas, em uso. (Vazio na fundação — preenchido pelo uso real.)

- _(nenhum ainda — o squad nasceu em 2026-06-20)_

## Candidatos a Promoção
Hipóteses de padrão observadas 1x, aguardando confirmação antes de virar Padrão Ativo.

- **NPS / CSAT / Churn prediction → Metis (não Aletheia)** | Origem: F5/B04 decisão Ronan 2026-06-29 | Detectado: 2026-06-29
  - G7 do upstream `msitarzewski/agency-agents@a597cb6` (NPS modeling + churn prediction + satisfaction correlation) foi **DESCARTADO** desta absorção por escopo errado: Aletheia para no PMF; NPS/churn é pós-PMF.
  - Quando Metis evoluir para instrumentação de North Star (squad de métricas/retenção), absorver a capacidade ali — não invadir o domínio antes.
  - Trigger de promoção: Metis ganhar ≥3 skills de instrumentação contínua.

- **Cliente já operante ≠ ideia crua — Aletheia entra pela caixa-preta operacional, não pelo greenfield** | Origem: BRW Movelaria dossiê Fase B | Detectado: 2026-07-06
  - Quando o "cliente Kolden" é um negócio já operante (CNPJ, receita, canais), a assunção mais arriscada raramente é "há dor de mercado?" — geralmente é "qual segmento paga de fato?" e "onde vaza o funil já existente?"
  - Discovery então prioriza: (a) auditar canais de conversão vivos (WhatsApp, CRM, telefone) como fonte primária de voz-do-cliente antes de entrevistar terceiros; (b) tratar URLs mortas / vazamentos operacionais como pré-requisito de qualquer teste de mercado (sem métrica, sem hipótese falsificável); (c) rodar 1 hipótese-tesoura de modelo (é X ou Y?) via entrevista com fundador ANTES do gate — evita testar em posicionamento que não corresponde à operação real.
  - Trigger de promoção: aplicar padrão em ≥2 clientes operantes e ver se a sequência (H5-onboarding factual → H2-vazamento → H3-WhatsApp → H1-nicho → H4-canal) se repete.

- **VETO parcial em cliente com posicionamento verbal em conflito com registro público** | Origem: BRW Movelaria dossiê Fase B | Detectado: 2026-07-06
  - Quando 4+ fontes próprias do cliente se contradizem sobre um claim central ("30 anos" vs. FB "10 anos" vs. legenda "Desde 1998" vs. CNPJ 3 meses), a Aletheia deve emitir HALT para qualquer investimento em marca/mídia antes de resolver a incongruência com o fundador (entrevista de 90min tipo Mom Test estruturado).
  - Regra derivada: nenhuma campanha, brandbook ou lançamento pode usar um claim que o cliente não consegue defender com documento verificável em 5 minutos — porque a concorrência desmonta em 5.
  - Trigger de promoção: aplicar em ≥1 outro cliente com claim contestável e validar que o HALT preservou reputação.

## Arquivado
Padrões que se mostraram errados ou superados — mantidos para não repetir o erro.

- _(nenhum ainda)_

---

### Sementes de princípio (herdadas do PRD, não são "aprendizado de sessão")
- A dor precede a solução; a solução precede a escala. Nunca pular estágio.
- O que as pessoas FAZEM > o que DIZEM. Skin-in-the-game data vence opinião.
- A assunção mais arriscada (leap of faith) é a que se testa primeiro, não a mais confortável.
- Recomendação de build exige dor validada + hipótese falsificável + métrica + critério de kill.
