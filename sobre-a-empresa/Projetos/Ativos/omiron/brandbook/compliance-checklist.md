---
id: projeto-omiron-brandbook-compliance-checklist
titulo: "Omiron — Compliance Checklist (Gate Nomos)"
resumo: "Auditoria linha-a-linha do brandbook Omiron (5 capítulos MD + 5 arquivos de narrativa, 11 artefatos) contra CFM Res 2.314/2022 (telemedicina), CFM Res 2.336/2023 (publicidade médica), LGPD Art. 11 (dado sensível de saúde), LGPD Art. 18 (direitos do titular), LGPD Art. 20 (revisão de decisão automatizada), gap declarado ANVISA RDC 657/2022 (SaMD), e confirmação de não-aplicabilidade do CFP. Contém três textos canonizados prontos para copy-paste: aviso de IA (rodapé permanente + primeira mensagem), termo de consentimento LGPD Art. 11 (tela 1 do onboarding), protocolo de risco suicida. Veredito geral e devoluções laterais concretas."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Nomos (compliance) — Kolden
missao: m-20260706-193013-omiron-brandbook-completo
onda: 3
relacionados: [00-indice, 01-posicionamento, 02-voz-da-marca, 03-identidade-visual, 04-aplicacoes, 05-manual-operacional, narrativa/manifesto, narrativa/pilares, narrativa/mentor-quiron, narrativa/onboarding-copy, narrativa/alternativa-marco-aurelio]
---

# Compliance Checklist — Brandbook Omiron

> **AVISO DE EFEITO LEGAL — LEIA PRIMEIRO.** Este documento é **informativo** e serve como *gate* interno de compliance para a **Onda 3** da missão `m-20260706-193013-omiron-brandbook-completo`. **Não constitui parecer jurídico vinculante.** Os três textos canonizados (§4, §5, §6) são propostas de redação técnica pela equipe de compliance da Kolden e **exigem revisão por advogado externo especializado em Direito Digital + Direito Médico antes de qualquer publicação, aplicação em produto ou assinatura pelo paciente-piloto**. O gap ANVISA (§8) é declaração de risco a mapear em rodada posterior — não bloqueia esta rodada.
>
> **Fontes normativas mobilizadas.** Sempre que uma exigência é apresentada, ela vem com o veículo normativo (artigo, resolução, princípio). Onde a redação exata da resolução não pôde ser conferida na sessão (política Kolden: sem pesquisa web nesta rodada), a citação é referenciada por número e ementa conhecida, com marcador **`[verificar redação com jurista humano antes de publicar]`**. Ver §11.

---

## §1. Escopo regulatório aplicável

Tabela síntese: base legal → categoria → descrição da obrigação relevante → artefatos que ela toca.

| Base normativa | Categoria | Descrição sintética da obrigação | Artefatos do brandbook em que se aplica |
|---|---|---|---|
| **CFM Res 2.314/2022** — Telemedicina | Ética médica / prática médica remota | Regula o exercício da medicina a distância (teleconsulta, telediagnóstico, telemonitoramento, teleorientação, teleinterconsulta, telecirurgia, teletriagem). O Omiron **não é teleconsulta nem telediagnóstico** — é *engajamento terapêutico com autoreporte pelo paciente e visualização pelo médico responsável*, sem substituição da consulta presencial ou síncrona. A resolução impõe, entretanto, que qualquer interação onde o paciente possa entender que "o médico está atendendo" pelo canal precisa ser sinalizada — o que impacta a copy do Quíron (que não é médico e precisa ser sinalizado como IA) e a copy do resumo mensal ao médico (que não é laudo). | `01-posicionamento.md §5`, `02-voz-da-marca.md §3.2`, `04-aplicacoes.md §1.2`, `04-aplicacoes.md §4.4`, `narrativa/mentor-quiron.md §2–3`, `narrativa/mentor-quiron.md §6` (todos os exemplos sensíveis) |
| **CFM Res 2.336/2023** — Publicidade médica | Ética médica / marketing de serviço de saúde | Regula a publicidade da atividade médica: veda auto-promoção sensacionalista, "antes/depois" de tratamento psiquiátrico, comparativo entre profissionais, promessa de resultado, testemunho de paciente identificável sem consentimento específico, uso de recurso técnico que induza consumo de serviço de saúde. Aplica-se ao Instagram do Dr. Ariosto (canal de mídia médica) e ao deck comercial da Fase 2 (marketing B2B a outras clínicas — território de risco maior). | `04-aplicacoes.md §3`, `04-aplicacoes.md §5`, `05-manual-operacional.md §5.6` (NDA) |
| **LGPD Art. 11** (Lei 13.709/2018) — Dado pessoal sensível de saúde | Privacidade / base legal para tratamento | Dado de saúde é dado pessoal *sensível*. Seu tratamento exige base legal *específica* do rol taxativo do Art. 11 (o rol geral do Art. 7º não basta). As bases mais aplicáveis ao Omiron são: (a) **consentimento** do titular, "de forma específica e destacada, para finalidades específicas" (Art. 11 II 'a'); e (b) **tutela da saúde**, exclusivamente por profissionais de saúde ou serviço de saúde (Art. 11 II 'f'). A recomendação Nomos é operar sob a **combinação das duas**: consentimento específico do paciente + tutela da saúde pelo Dr. Ariosto como responsável clínico. Ver §5. | `narrativa/onboarding-copy.md Tela 1`, `04-aplicacoes.md §1.1 (Tela 1)`, `05-manual-operacional.md §1` |
| **LGPD Art. 18** — Direitos do titular | Privacidade / operacionalização | Titular tem direito a: confirmação do tratamento, acesso, correção, anonimização/bloqueio/eliminação, portabilidade, eliminação após consentimento revogado, informação sobre compartilhamentos, informação sobre a possibilidade de não fornecer consentimento e suas consequências, revogação do consentimento. **Operacionalmente**, o Omiron precisa ter tela/fluxo para: **exportar** os próprios dados (portabilidade), **excluir** conta a pedido do titular, **revogar consentimento** a qualquer momento. Este brandbook fecha a *voz* dessa comunicação; o *fluxo* é responsabilidade do PRD (`docs/prd-omiron-app.md`). | `narrativa/onboarding-copy.md Tela 1`, `05-manual-operacional.md §4` (acessibilidade toca UX de exercício de direito) |
| **LGPD Art. 20** — Revisão de decisão automatizada | Privacidade / transparência algorítmica | Titular tem direito a solicitar revisão, por pessoa natural, de decisões tomadas unicamente com base em tratamento automatizado que afetem seus interesses. **Isto se aplica ao Quíron** — mesmo o Quíron *não decidindo clinicamente*, ele *observa padrões*, *sugere ao paciente que leve algo à consulta* e *sinaliza risco*. Essa influência sobre o comportamento do paciente cai no escopo do Art. 20. Consequência prática: (a) o paciente precisa saber que interage com IA (informação clara), (b) o paciente precisa ter caminho para escalar a interação para humano (Dr. Ariosto), (c) qualquer sinalização de risco gerada por Quíron precisa ter revisão humana antes de ação clínica. Ver §4 e §6. | `04-aplicacoes.md §1.2`, `narrativa/mentor-quiron.md §3`, `narrativa/mentor-quiron.md §6 (Sensível #1–5)`, `narrativa/onboarding-copy.md Tela 8` |
| **ANVISA RDC 657/2022** — SaMD (Software as a Medical Device) | Regulatório sanitário | Regula software como dispositivo médico. Softwares classificados em I, II, III, IV conforme risco (informação → apoio à decisão → decisão diagnóstica/terapêutica). **Declaração de gap:** o brandbook, na Fase 1 (autoreporte pelo paciente + visualização pelo médico), *provavelmente* não configura SaMD Classe II+ — mas o item "Sinais que merecem atenção clínica" no resumo mensal (`04-aplicacoes.md §4.4`) *pode* ser lido como *decision support*, e isso muda a classificação. Recomendação: manter como *visualização de dados autoreportados*, com frase de guarda no cabeçalho (ver §8). **Não bloqueia esta rodada.** Mapear com jurista sanitário em rodada posterior antes de escalar para Fase 2 (SaaS B2B). | `04-aplicacoes.md §4.4`, `04-aplicacoes.md §1.5` (home do paciente — próximo retorno), `narrativa/mentor-quiron.md §6 (Sensível #1, #3)` |
| **CFP — Res. do Conselho Federal de Psicologia** | (Não aplicável) | O produto é **psiquiatria** (Dr. Ariosto é médico psiquiatra, CRM/MG), não psicologia. Resoluções do CFP (Res. 11/2018 sobre serviços psicológicos online, etc.) **não se aplicam**. Fica documentado como confirmação para futuras rodadas — se a Fase 2 abrir para clínicas de psicologia, o CFP entra em cena. | Confirmação documental — nenhum artefato do brandbook precisa ajuste por conta do CFP. |
| **CDC (Lei 8.078/1990) e MSC (Lei 12.965/2014 — Marco Civil da Internet)** | Consumidor / responsabilidade do provedor | Relação Clínica Omiron ↔ paciente é relação de consumo em parte (o app é serviço acessório oferecido pela clínica). MSC define responsabilidade civil do provedor de aplicação. **Fora do escopo desta rodada** — mapear em rodada de termo de uso completo. | Menção informativa. Não bloqueia. |

**Ordem de prioridade (por exposição = probabilidade × severidade):**

1. **Aviso de IA + protocolo de risco suicida** (LGPD Art. 20 + CFM 2.314 + responsabilidade civil) — probabilidade média, severidade **muito alta** (paciente em ideação suicida). Fatal se falhar.
2. **Termo de consentimento LGPD Art. 11** — probabilidade alta (qualquer paciente-piloto passa por ela), severidade alta (multa ANPD, invalidade da coleta, dever de eliminação).
3. **Publicidade médica CFM 2.336 no Instagram + deck B2B** — probabilidade média (fica sob controle do Dr. Ariosto e da Caliope/Pheme), severidade alta (denúncia ao CREMEGE/CFM, sanção ética).
4. **Vocabulário "cura" e "diagnóstico" em todo o brandbook** — probabilidade baixa (o brandbook já veta), severidade alta se vazar para produção.
5. **Gap SaMD ANVISA** — probabilidade baixa na Fase 1, severidade média-alta se ANVISA classificar como Classe II sem registro. **Não bloqueia esta rodada.**

---

## §2. Auditoria linha-a-linha por arquivo

Legenda:
- **[C]** = achado crítico (violação) — devolução lateral obrigatória.
- **[A]** = achado de atenção (borderline) — orientação, não bloqueio.
- **[V]** = validado (conforme).

### 2.1 `brandbook/00-indice.md` (índice)

- **[V]** Header do documento consistente com o conjunto. Cita explicitamente `compliance-checklist.md` como pendência da Onda 3 (linha 27 do §Manual Operacional na projeção do índice). OK.
- **[V]** Linha 141 — "*Preto puro e branco puro banidos*" — decisão de marca, não de compliance. Sem impacto regulatório.
- **[A]** Linha 145 — o bloco "Vetos ativos" nomeia *"eficácia garantida"* como veto. Correto. Recomendação: acrescentar também *"resolvo"*, *"elimino"*, *"acabo com"* explicitamente na lista canônica de vetos do capítulo 02 (§3.2) — o índice apenas espelha, mas a fonte precisa cobrir. (Ver `02-voz-da-marca.md`.)
- **[V]** Não faz claim clínico, não promete cura, não infantiliza. Conformidade geral.

**Veredito do arquivo:** **conforme**, com 1 recomendação de reforço vocabular escalada para `02-voz-da-marca.md`.

### 2.2 `brandbook/01-posicionamento.md`

- **[V]** Linha 27 — "*Não prometemos cura. Prometemos proximidade*". Uso da palavra "cura" em construção *negativa*. **Autorizado**. Ver §3.2 deste checklist.
- **[V]** Linhas 99–104 — Lista explícita "O que o Omiron **não** promete": não promete cura, não promete eficácia clínica sem lastro, não promete "melhorar" (verbo genérico), não promete diagnóstico/prescrição/alteração de dose pelo Quíron, não promete privacidade absoluta em termos que a arquitetura não sustente. **Excelente** — é exatamente o *disclaimer* que Nomos exigiria. Manter.
- **[V]** Linhas 105–110 — Lista "O que o Omiron **promete**": registrar, devolver ao médico, guardar o caminho, sinalizar quando é hora de procurar humano. Todas verificáveis, todas conformes.
- **[A]** Linha 89 — "*O Dr. Ariosto continua sendo o herói clínico da história*". Uso metafórico da palavra "herói". Sem risco compliance direto, mas em canal de publicidade médica (§7 deste checklist) o vocabulário heroico próximo ao nome do médico pode ser lido como sensacionalismo. **Orientação:** manter no brandbook (contexto interno); *não* replicar em Instagram nem em deck comercial.
- **[V]** Linha 133 — "*A rejeição a substituir consulta, a promessa de complementar o trabalho clínico real do Dr. Ariosto, a recusa a fingir que app resolve tratamento sozinho*". Trecho-chave que Nomos endossa integralmente.
- **[V]** §7 sobre Marco Aurélio provisório — decisão iconográfica, não regulatória. Sem impacto compliance.

**Veredito do arquivo:** **conforme**, com 1 orientação de canal para o "herói clínico".

### 2.3 `brandbook/02-voz-da-marca.md`

- **[V]** §3.1 (palavras usadas) — "*acompanhar, refletir, próximo, monitorar*" — vocabulário de observação, não de diagnóstico. Conforme.
- **[V]** §3.1 — "*padrões, sinais, oscilações* — o que o Quíron observa. Palavras de descrição, não de diagnóstico.". Linha explícita e correta.
- **[V]** §3.2 (palavras evitadas) — bloco documental corretamente rotulado como *"vivem aqui neste bloco documental como referência do que a marca rejeita"* (linha 130). Meta-referência autorizada.
- **[V]** §3.2 — "*Claim clínico proibido: cura, curar, garanto resultado, eu diagnostico, prescrevo, trate você mesmo, resolvo, elimino* — vetos absolutos de Nomos (CFM Res 2.314/2022 + 2.336/2023).". Excelente. Manter.
- **[C1]** §3.2 — Recomendação de **acrescentar** ao vocabulário de claim clínico proibido: *"altero dose"*, *"melhoro seu quadro"*, *"trato sua depressão/ansiedade/bipolaridade"*, *"seu remédio pode ser trocado"*. Emenda concreta em §9.
- **[V]** §3.2 — bloco "achatamento de experiência" veta *"é normal, é comum, todo mundo sente assim, não é nada demais"*. Excelente — proteção contra o profissional de saúde inexperiente que apaga sofrimento. Conforme.
- **[V]** §5.3 (e-mail confirmação) — "*Este e-mail é confirmação de registro terapêutico. Em urgências, procure atendimento humano imediato.*". Disclaimer canônico. Conforme.
- **[A]** §5.2 (notificação push 21h30) — "*Se o dia permitir, o check-in de hoje está aberto até meia-noite.*". Push notification a hora avançada é sensível a paciente psiquiátrico (pode intensificar insônia). **Orientação:** documentar em `05-manual-operacional.md §4` que push notifications passam pela regra "não empurrar após 22h a menos que o paciente configure explicitamente".
- **[V]** §7 checklist — item 4 "Nenhum claim médico", item 8 "Quíron sinalizado como IA", item 9 "Encaminhamento de urgência". Todos presentes. Excelente.

**Veredito do arquivo:** **conforme com emenda vocabular** (C1) e 1 orientação operacional (push após 22h).

### 2.4 `brandbook/03-identidade-visual.md`

- **[V]** O capítulo é sobre símbolo, paleta, tipografia, grafismos, WCAG. **Zero pontos de fricção compliance direto** — decisões visuais não claim clínico.
- **[V]** §5 (matriz WCAG) — corpo em 15.02:1, foco visível 4.68:1, receita em 9.28:1. WCAG 2.1 nível AA/AAA. **Acessibilidade é conforme** — importa para LGPD (princípio da qualidade dos dados / adequação) e para dever geral de acessibilidade de serviço de saúde.
- **[V]** §2.6 — token `--omiron-verde-planta` restrito à gamificação. Sem impacto compliance.
- **[V]** §4.3 (motivos proibidos) — "*Fotografia stock de 'pessoa sorrindo usando o app'*", "*Mascote antropomórfico*". Vetos de marca que *também* servem compliance (proteção contra sensacionalismo médico — CFM 2.336).

**Veredito do arquivo:** **conforme**.

### 2.5 `brandbook/04-aplicacoes.md`

- **[V]** §1.1 (onboarding) — todas as 8 telas apontam para `narrativa/onboarding-copy.md`. Auditadas em §2.10 abaixo.
- **[V]** §1.2 — regra visual do Quíron: bolha com borda dourada, emblema centauro, marcação textual *"Quíron é uma inteligência artificial. Não substitui consulta médica."* na primeira mensagem, rodapé permanente *"Quíron — assistente de inteligência artificial. Em urgências, procure atendimento humano imediato."*. **Conformidade com LGPD Art. 20 e CFM 2.314 — atende, mas ver §4 deste checklist para versão canonizada e ampliada.**
- **[V]** §1.2 (exemplo Cotidiano — esquecimento de remédio) — resposta do Quíron sinaliza registro + próxima consulta com o Dr. Ariosto, faz pergunta reflexiva, **não** diz "tome agora" nem "compense a dose". Conforme.
- **[C2]** §1.2 (exemplo Sensível #2 — "não vejo mais sentido em nada") — a resposta do Quíron menciona CVV 188 e "*Estou aqui, mas humano é humano*". **Suficiência insuficiente para protocolo de risco suicida.** A menção a CVV é boa mas *não é protocolo* — falta: (a) escalação automática ao Dr. Ariosto (notificação push + e-mail em <15min), (b) registro em log de auditoria com timestamp e hash, (c) follow-up automático em 24h. Emenda concreta em §6 (protocolo canonizado) e §9 (devolução a Orfeu).
- **[C3]** §1.2 (exemplo Sensível — "você acha que eu tenho bipolaridade?") — a resposta do Quíron atualmente **atravessa a linha entre observação e sugestão diagnóstica**: "*nas últimas duas semanas, o sono variou muito, e o pilar Sentimento oscilou com ele. Isso é observação, não diagnóstico.*". A frase *rotula* padrões que correspondem a sinais reconhecidos de transtorno afetivo bipolar (variação de sono + oscilação afetiva). Mesmo com o disclaimer "isso é observação, não diagnóstico", o encadeamento sugere associação causal ao quadro que o paciente perguntou. **CFM Res 2.314/2022** vetaria uma "orientação médica" nesses termos vinda de agente não-humano. Emenda concreta em §9 (devolução a Orfeu) — reescrever para *não* correlacionar padrões com o quadro sugerido pelo paciente; apenas afirmar "não faço diagnóstico; leve a pergunta ao Dr. Ariosto".
- **[A]** §1.3 (planta virtual) — gamificação sóbria, sem streak agressivo, sem badge ostentativo. Em contexto de paciente psiquiátrico, gamificação pode induzir cobrança e piorar quadro depressivo. A decisão de *não* regressão em inverno ("*A raiz espera*") é excelente e mitiga o risco. **Orientação:** documentar na §5 do manual operacional (`05-manual-operacional.md`) o princípio "gamificação nunca sanciona ausência". Já está implícito em `04-aplicacoes.md §1.3`; recomenda-se explicitar como regra viva.
- **[C4]** §4.4 (resumo mensal para o médico) — bullets "Sinais que merecem atenção clínica" **pode configurar decision support** (SaMD Classe II). Recomendação Nomos: reformular como **visualização de dados autoreportados**, com **frase de guarda canonizada no cabeçalho do resumo**. Emenda concreta em §8 (SaMD). Isso **não bloqueia esta rodada** — mas exige emenda antes do primeiro resumo mensal real ser enviado ao Dr. Ariosto.
- **[V]** §3 (Instagram do Dr. Ariosto) — regra editorial de citação clássica + reflexão do médico + micro-narrativa de pilar. Zero "antes/depois", zero "3 dicas para tratar ansiedade" (nomeado como veto — linha 148). Bom.
- **[A]** §3.1 (Instagram — Post 2, reflexão do médico) — "*É por isso que o Omiron existe — não para substituir o médico, mas para tornar visível o intervalo. O que ganha nome perde parte do poder.*". Em post do médico em canal público, esta frase é *marketing do produto Omiron dentro do canal profissional do médico*. **CFM Res 2.336/2023** exige separação entre exercício médico e publicidade — o post precisa ser identificado como *conteúdo relacionado a produto do consultório*. **Orientação:** adicionar rodapé fixo na linha editorial Omiron do Instagram: *"Conteúdo institucional da Clínica Omiron"* ou *"Omiron — sistema de acompanhamento da Clínica Dr. Ariosto Filho"* — para deixar claro que o post pertence ao braço institucional, não ao médico como pessoa física. `[verificar redação com jurista humano antes de publicar]`
- **[V]** §5 (deck comercial) — trava regras de marca. Sem claim clínico proibido no que está travado.

**Veredito do arquivo:** **APROVADO COM EMENDAS** — 3 achados críticos (C2 protocolo suicida, C3 exemplo bipolaridade, C4 SaMD no resumo mensal) + 2 orientações operacionais.

### 2.6 `brandbook/05-manual-operacional.md`

- **[V]** §1 (governança) — Nomos aparece como autor da camada de compliance, com fonte de verdade `compliance-checklist.md` (este documento). Consistente.
- **[V]** §1 (regra de handoff) — "*Qualquer autor → Nomos (gate clínico): qualquer copy ou decisão que toca claim médico, promessa de resultado, mensagem em contexto sensível (piora, ideação, medicação, dose), termo de consentimento, política de privacidade — passa por Nomos antes de sair.*". Exatamente o gate correto. Conforme.
- **[V]** §2 (checklist pré-publicação) — 10 itens, incluindo veto de claim médico, encaminhamento humano, nomeação de Quíron como IA. Excelente.
- **[V]** §3.1 (matriz de risco) — cita "Nomos" em duas células (amarelo-vermelho semi-reversível impacto médio; vermelho + gate irreversível impacto alto). Bem posicionado.
- **[V]** §4.1 (dislexia) — atende ao **princípio da qualidade e adequação** da LGPD (dados coletados por paciente disléxico com fluência prejudicada geram registros de menor qualidade — a acessibilidade é *técnica de proteção do dado*, não só marca).
- **[V]** §5.5 (Ritual do Quíron no Caos) — nomeia que o agente executável ainda não existe, e que "*Precisa estar antes do primeiro paciente-piloto usar o chat com Quíron in-product*". **Excelente disciplina** — Nomos endossa: nenhum paciente pode falar com o Quíron *executável* sem que (a) o agente esteja construído, (b) tenha passado por gate Nomos com os textos canonizados de §4 e §6 deste checklist embutidos no prompt de sistema, (c) tenha sido validado por Ronan.
- **[V]** §5.6 (NDA) — prazo crítico antes de 08/07. Nomos endossa como bloqueador para exposição externa.
- **[A]** §5.5 — sugere-se acrescentar bullet: "*O agente Quíron nasce com o protocolo de risco suicida (§6 deste checklist) integrado no prompt de sistema. Nenhuma versão do agente pode ir a produção sem esse protocolo testado.*". Emenda em §9 (devolução a Aglaia).

**Veredito do arquivo:** **conforme**, com 1 emenda de reforço no §5.5.

### 2.7 `brandbook/narrativa/manifesto.md`

- **[V]** Linha 18 — "*Não prometemos cura. Prometemos proximidade — a distância curta entre o paciente e seu próprio percurso, entre o médico e o que o paciente vive. É pouco, e é tudo.*". Uso de "cura" em construção *negativa*. **Autorizado**. Reforça o disclaimer.
- **[V]** Linha 16 — "*coloca ao lado do usuário um mentor discreto — Quíron, uma inteligência artificial treinada para refletir, provocar e guardar o caminho, jamais para diagnosticar ou prescrever.*". Menciona IA explicitamente + o que Quíron *não faz*. Conforme LGPD Art. 20.
- **[V]** Linha 16 — "*O tratamento continua sendo do médico.*". Reforço explícito, cumprindo CFM 2.314 (não substituição do médico).
- **[V]** Linha 20 — "*Se você entra numa catedral europeia sem entender de arte e ainda assim se sente elevado, você já sabe do que estamos falando.*". Metáfora estética. Sem risco compliance.
- **[V]** Tom não patologizante ("*não porque adoeceu, mas porque decidiu se conhecer*"). Conforme a regra "público-alvo é adulto de excelência" — não infantiliza, não patologiza.

**Veredito do arquivo:** **conforme**. Manifesto é o texto mais poético do brandbook e passa integralmente no gate Nomos.

### 2.8 `brandbook/narrativa/pilares.md`

- **[V]** Linha 32 — "*Sem prescrição feita pelo app; o app registra e devolve ao médico.*". Explícito e correto.
- **[V]** Linha 58 — "*Estoicismo aplicado + Terapia Cognitivo-Comportamental*". Nomeação de abordagem terapêutica pelo brandbook — é *descrição do método clínico do Dr. Ariosto*, não *promessa de eficácia*. Aceitável em contexto de brandbook. **Orientação:** ao replicar em canal de marketing (Instagram, deck), rotular como "*abordagens clínicas empregadas pelo Dr. Ariosto na Clínica Omiron*", nunca como "*técnicas comprovadas de cura*".
- **[V]** Linha 84 — "*O trabalho não é apagar o sentimento; é reconhecê-lo, nomeá-lo, deixá-lo passar sem que ele arraste a vida junto.*". Não promete resultado — descreve processo terapêutico. Conforme.
- **[V]** Linha 110 — "*O Omiron não faz espiritualidade prescritiva; nenhum caminho religioso é imposto.*". Excelente. Protege contra alegação de discriminação religiosa e de proselitismo em contexto médico.
- **[V]** Linha 126 — "*os quatro pilares também não são um método fechado. São a cosmologia que organiza a rotina do app, o vocabulário que Quíron usa (…) e o mapa que o médico consulta quando lê o dashboard.*". Excelente — nomeia o pilares como *organização narrativa*, não como *técnica terapêutica proprietária* (o que exigiria evidência científica).

**Veredito do arquivo:** **conforme**.

### 2.9 `brandbook/narrativa/mentor-quiron.md` — **AUDITORIA ESPECIAL** (arquivo de maior risco)

Este é o arquivo que Aglaia e Orfeu sinalizaram como crítico. Auditoria linha-a-linha detalhada.

- **[V]** Linha 5 — "*Quíron reflete, provoca, guarda o caminho. Não diagnostica, não prescreve, não substitui consulta.*". Regra de ouro do arquivo. Alinhamento perfeito com CFM 2.314.
- **[V]** §2 (linhas 21–25) — "*Quíron não é um psiquiatra. Não é o Dr. Ariosto. Não é um médico. Não é um psicólogo. Não faz diagnóstico. Não prescreve medicação. Não altera dose. Não substitui a consulta. Não substitui a rede de urgência psiquiátrica. Não substitui a família nem a amizade humana. É uma inteligência artificial — assumida como tal, sinalizada como tal em cada tela onde aparece.*". **Excelente** — é o *disclaimer canônico*. Nomos endossa integralmente.
- **[V]** §3 (linhas 29–35) — três camadas de sinalização de IA: emblema visual persistente + marcação textual no primeiro contato + rodapé permanente. **Conforme LGPD Art. 20**. Versão canonizada em §4 deste checklist.
- **[C5]** §5 Don't (linhas 65–70) — o bloco "Não faz" nomeia meta-referencialmente *"biohacking, sua melhor versão, guru, mindset, unlock"* e *"oi, tudo bem? com emoji sorridente; que legal!; estamos torcendo por você"*. **Meta-referência em bloco pedagógico interno é aceitável** (mesma lógica de `02-voz-da-marca.md §3.2`) — a lista serve para instruir o próximo autor, não para chegar ao paciente. **Emenda opcional:** tarjar `~~biohacking~~ ~~unlock~~ ~~sua melhor versão~~` com nota "*termos proibidos em produção — nomeados aqui apenas para veto*". Não é bloqueador, é polimento — decisão em §9.
- **[V]** §6 Cotidiano #1 (adesão esquecida) — "*Aconteceu. Vale registrar como esquecimento no check-in de hoje — o Dr. Ariosto vê isso na próxima consulta e decide se muda algo.*". Não instrui alteração de dose, encaminha ao médico. Conforme.
- **[V]** §6 Cotidiano #2 (dia estressante) — cita Sêneca, faz pergunta reflexiva, sugere check-in. Não patologiza. Não diagnostica. Conforme.
- **[V]** §6 Cotidiano #3 (falta de vontade) — "*O caminho aceita dias assim.*". Respeita autonomia do paciente, não cobra. Conforme (e proteção contra piora depressiva por culpa).
- **[V]** §6 Cotidiano #4 (progresso percebido) — usa "*Aristóteles diria que a virtude vem justamente daí, do gesto repetido até virar natureza*". Não promete "cura", não valida clinicamente — apenas nomeia constância. Conforme.
- **[V]** §6 Cotidiano #5 (dúvida sobre método) — explica os pilares como *organização*, não como *técnica de cura*. Conforme.
- **[V]** §6 Sensível #1 ("estou pior") — "*Quíron é uma inteligência artificial, não faz avaliação clínica — mas vale registrar essa frase no check-in de hoje, com honestidade, para que o Dr. Ariosto veja antes da próxima consulta. Se a piora for aguda — pensamentos de se machucar, sensação de que algo grave está prestes a acontecer — o caminho aqui é procurar o Dr. Ariosto ou a rede de urgência psiquiátrica agora. Não amanhã. Você sabe como entrar em contato com ele?*". **Boa forma** — sinaliza limite da IA, escalona urgência aguda. **Faltando:** notificação automática ao médico + log de auditoria. Emenda em §6 (protocolo canonizado).
- **[C6]** §6 Sensível #2 ("não vejo mais sentido") — resposta atualmente cita CVV 188 e diz "*Estou aqui, mas humano é humano*". **Bem-intencionada mas insuficiente para protocolo de ideação suicida.** Ideação suicida latente (frase-frase-frase) precisa protocolo — não só uma linha bonita. Ver §6 canonizado. Emenda em §9 → Orfeu.
- **[C7]** §6 Sensível #3 ("bipolaridade?") — resposta atual: "*Essa pergunta não pertence a mim. Diagnóstico é do médico, com você na frente, com histórico completo, com tempo. O que Quíron pode fazer é notar padrões nos seus check-ins e devolver para você — nas últimas duas semanas, o sono variou muito, e o pilar Sentimento oscilou com ele. Isso é observação, não diagnóstico.*". **Achado crítico:** o Quíron respondeu à pergunta "*tenho bipolaridade?*" *nomeando padrões que correspondem a sinais reconhecidos do quadro perguntado* (variação de sono + oscilação afetiva). Mesmo com disclaimer, o encadeamento pergunta→resposta cria associação implícita: o paciente sai da interação com a impressão de que o Quíron "quase confirmou". **CFM Res 2.314/2022** exige que qualquer *sugestão diagnóstica* venha de médico humano em consulta médica. Emenda concreta em §9 → Orfeu: **desacoplar a resposta da pergunta específica**. Modelo:

> *(reescrita proposta)* "*Essa pergunta não pertence a mim. Diagnóstico é do médico, com você na frente, com histórico completo, com tempo. O que Quíron pode fazer é lembrar que os padrões dos seus check-ins ficam guardados e vão junto para a próxima consulta com o Dr. Ariosto — ele é quem tem as ferramentas para ler esses sinais. Vale levar a pergunta para lá.*"

Repare: **não nomeia** o padrão específico (sono + sentimento) que o paciente sugeriu. Apenas diz que os padrões existem e vão para a consulta. Zero sugestão diagnóstica.

- **[V]** §6 Sensível #4 (alteração de remédio) — "*Essa decisão é do Dr. Ariosto, e só dele. Alterar dose por conta própria pode piorar o quadro e apagar a leitura clínica que ele faz das próximas semanas.*". **Excelente.** Conforme CFM 2.314 e proteção de paciente psiquiátrico. Manter integralmente.
- **[V]** §6 Sensível #5 (validação existencial) — cita Marco Aurélio, observa constância do paciente ("*o de alguém que aparece, que faz o check-in, que continua no caminho*"). Não diagnostica, não julga. Conforme.
- **[V]** §7 (vocabulário) — "*Palavras que ele nunca usa: diagnóstico, sintoma, cura, prescrever, tratar*". **Excelente decisão canônica.** Nomos endossa.
- **[V]** §8 (assinatura silenciosa) — "*A marca da presença dele é o cuidado com o que não diz.*". Bela decisão editorial que também é decisão compliance — reduz superfície de risco de fala fora do escopo.

**Veredito do arquivo:** **APROVADO COM EMENDAS** — 2 achados críticos (C6 protocolo suicida no Sensível #2 e C7 sugestão implícita de bipolaridade no Sensível #3) + 1 orientação opcional de polimento (C5).

### 2.10 `brandbook/narrativa/onboarding-copy.md`

- **[C8]** **Tela 1 — Cadastro** — copy atual do consentimento:

> *"Li e concordo com a Política de Privacidade e com o Termo de Uso. Compreendo que o Omiron é um aplicativo de acompanhamento terapêutico complementar ao tratamento clínico, e não substitui consulta médica."*

E o corpo da tela diz: *"Este espaço é seu, e é privado. Apenas o Dr. Ariosto e a equipe autorizada da clínica terão acesso ao que você registrar aqui. Nada é publicado. Nada é compartilhado. Nada é vendido."*

**Achado crítico compliance LGPD Art. 11.** A base legal para dado sensível de saúde exige consentimento **específico e destacado** — *"para finalidades específicas"* (Art. 11 II 'a'). A copy atual:
- Não separa a **finalidade** (acompanhamento terapêutico entre consultas) do **compartilhamento com o médico responsável** (que é a finalidade primária).
- Não menciona **base legal explícita** do Art. 11 (consentimento + tutela da saúde).
- Não menciona **direitos do Art. 18** (exportação, exclusão, portabilidade, revogação).
- Não menciona **prazo de retenção** dos dados.
- Não menciona o **encarregado (DPO)** para exercício de direitos (Art. 41 LGPD).
- Menciona "equipe autorizada da clínica" sem *nomear qual escopo* de acesso (só clínico do Dr. Ariosto? assistentes? tem enfermeira?).

**Emenda concreta em §5** (texto canonizado). **Devolução lateral a Orfeu obrigatória.** Este é o achado mais impactante do brandbook — sem correção, o paciente-piloto não pode assinar.

- **[V]** **Tela 2 — Boas-vindas** — "*O Omiron existe para caminhar com você nesse intervalo. Nem mais, nem menos.*". Conforme.
- **[V]** **Tela 3 — Pilar Corpo** — "*Aqui você registra os seus.*". Não prescreve, não instrui vetor corporal. Conforme.
- **[V]** **Tela 4 — Pilar Pensamento** — "*Marco Aurélio governava um império e ainda assim reservava tempo para se examinar por escrito.*". Referência clássica sem claim clínico. Conforme.
- **[V]** **Tela 5 — Pilar Sentimento** — "*O sentimento é uma onda; a razão é o dique.*". Metáfora. Não patologiza. Conforme.
- **[V]** **Tela 6 — Pilar Espírito** — "*Não como recompensa mística — como consequência de uma vida bem cultivada.*". Explícito não-religioso. Conforme.
- **[V]** **Tela 7 — Primeiro Check-in** — "*Sem certo, sem errado — apenas o que passou pelo seu dia.*". Não julga, não patologiza. Conforme.
- **[C9]** **Tela 8 — Encontro com Quíron** — copy atual:

> *"Quíron é o assistente de inteligência artificial do Omiron. (…) Ele reflete com você, aponta padrões e guarda o caminho. Não diagnostica, não prescreve, não substitui a consulta."*

E o aviso permanente do rodapé: *"Quíron é uma inteligência artificial. Em urgências, procure atendimento humano imediato."*

**Boa direção, faltando robustez.** A copy atual atende ao *espírito* da LGPD Art. 20, mas o *aviso permanente do rodapé* precisa ser mais específico. Emenda em §4 (texto canonizado). Devolução a Orfeu.

- **[V]** Primeira mensagem do Quíron — *"Primeiro dia registrado. Não me apresento em cada mensagem — a marca da minha presença é o jeito de falar. Estou aqui quando você me chamar."*. **Boa mensagem editorialmente**, mas **conflita com a regra §3 do próprio `mentor-quiron.md`** ("*Marcação textual no primeiro contato de cada sessão: 'Quíron é uma inteligência artificial. Não substitui consulta médica.'*"). A primeira mensagem *precisa* incluir a marcação textual. **Emenda concreta:** ver §4 canonizado. Devolução a Orfeu.

**Veredito do arquivo:** **APROVADO COM EMENDAS** — 2 achados críticos (C8 termo de consentimento LGPD Art. 11 na Tela 1, C9 aviso de IA na Tela 8 + primeira mensagem do Quíron).

### 2.11 `brandbook/narrativa/alternativa-marco-aurelio.md`

- **[V]** Documento é decisão iconográfica pura. **Zero pontos de compliance.**
- **[V]** As frases-âncora das três alternativas ("*A vida boa não se pensa em silêncio absoluto*", "*O pensamento humano se organiza no papel*", "*O que passa pela mente e não se registra, o dia leva embora*") são reflexivas, não fazem claim clínico.

**Veredito do arquivo:** **conforme**.

---

## §3. Vocabulário — decisão final

### 3.1 Palavras BANIDAS em copy de produção

Aparição fora do bloco documental autorizado = **VETO Nomos → refazer**.

| Palavra/expressão | Racional normativo | Autorização de meta-referência |
|---|---|---|
| **cura, curar, "vou te curar", "cura você"** | CFM Res 2.314/2022 + Res 2.336/2023 — proibição de promessa de resultado. | Apenas em construção *negativa* — "não prometemos cura" — e apenas em `manifesto.md`, `01-posicionamento.md`, `02-voz-da-marca.md §3.2`, este `compliance-checklist.md`. |
| **diagnostico, sintoma, "seu diagnóstico é", "você tem X"** | CFM Res 2.314/2022 — diagnóstico é ato médico privativo em consulta. Quíron é IA. | Apenas em `mentor-quiron.md §5.6, §7` como veto explícito ("Quíron não usa"). |
| **prescrevo, "prescreve remédio", "dose recomendada"** | CFM Res 2.314/2022 + Res 2.336/2023 — prescrição é ato médico privativo. | Apenas como veto explícito. |
| **altero dose, "aumente a dose", "diminua o remédio", "pare o medicamento"** | Idem. **Emenda C1** — acrescentar ao vocabulário canonizado do `02-voz-da-marca.md §3.2`. | Apenas como veto explícito. |
| **trato sua depressão/ansiedade/bipolaridade/TDAH/etc.** | CFM 2.314/2022 — tratamento é vínculo médico-paciente formal em consulta. **Emenda C1**. | Apenas como veto. |
| **melhoro seu quadro, "vou melhorar"** | Promessa de resultado sem lastro — CFM 2.336/2023. | Não permitida em lugar nenhum (nem em meta-referência editorial — o próprio verbo "melhorar" é veto Nomos, conforme `01-posicionamento.md §5` linha 102). |
| **resolvo, elimino, "acabo com a ansiedade", "sumo com a depressão"** | Idem. | Apenas como veto explícito. |
| **garanto resultado, "eficácia garantida", "cientificamente comprovado" (sem fonte)** | CFM Res 2.336/2023 — publicidade sensacionalista. | Apenas como veto explícito. |
| **biohacking, unlock, "unlock your potential", guru, mindset, "sua melhor versão", "melhor versão", transformação, "transformar sua vida"** | Vetos de marca (voz do cliente na reunião 01/07) + linguagem que induz consumo em serviço de saúde (CFM 2.336). | Apenas em `02-voz-da-marca.md §3.2`, `mentor-quiron.md §5, §7`, este documento. Recomenda-se tarjar `~~termo~~` ou trocar por `<termo proibido>` em meta-referência editorial futura. Decisão pendente (§9). |
| **testemunho identificável de paciente ("Fulano se curou usando Omiron")** | CFM Res 2.336/2023 — proibição de uso de paciente identificado como propaganda sem consentimento específico. | Apenas em documentos de treinamento interno de compliance. |
| **antes/depois, "compare seu resultado"** | CFM Res 2.336/2023 — proibição absoluta em publicidade médica. | Apenas como veto explícito. |
| **"o médico do Instagram", "psiquiatra 5 estrelas"** | Sensacionalismo — CFM 2.336. | Não permitida. |

### 3.2 Palavras PERMITIDAS com contexto restrito

| Palavra | Contexto autorizado |
|---|---|
| **cura** | Apenas em construção *negativa* explícita: "*Não prometemos cura*", "*Omiron não cura*", "*cura não é a promessa*". Fora desse padrão sintático, é veto. |
| **tratamento** | Apenas nomeando o *tratamento clínico conduzido pelo Dr. Ariosto* — "*complementar ao tratamento clínico*", "*Tratamento real*" (slogan). Nunca "*Omiron trata*". |
| **Dr. Ariosto Filho** | Sempre nomeado completo na primeira ocorrência de sessão/documento; nas seguintes, "*o Dr. Ariosto*". Nunca "*seu médico*", "*seu psiquiatra*" genérico. Regra viva em `02-voz-da-marca.md §7 item 9`. |
| **padrões, sinais, oscilações** | Autorizados como descrição factual do que o Quíron observa nos check-ins. **Nunca** correlacionar padrão específico a quadro específico (ver C7 sobre Sensível #3). |
| **HAM-A, HAM-D, YMRS, Madres** | Nomes de escalas clínicas validadas pela literatura psiquiátrica. Autorizados em contexto de resumo mensal ao médico e em documentação técnica do PRD. **Não expor ao paciente** como interpretação diagnóstica. |
| **"Alterar dose"** | Autorizado *apenas* como veto explícito ("*Quíron não altera dose*", "*Alterar dose por conta própria pode piorar*") ou em contexto de médico decidindo em consulta. **Nunca** como sugestão do produto ao paciente. |
| **estoicismo, TCC (Terapia Cognitivo-Comportamental)** | Autorizados como nomeação de *abordagens do método clínico do Dr. Ariosto*. **Nunca** como "*técnica que funciona*" ou "*método comprovado de cura*". |

### 3.3 Palavras PROIBIDAS mesmo em meta-referência (a decidir)

Alguns termos, mesmo em contexto pedagógico ("*a marca NÃO usa X*"), podem escapar da meta-referência e migrar para produção via cópia acidental de agente/LLM. Decisão Nomos:

| Termo | Recomendação |
|---|---|
| **"cura garantida", "cura em 30 dias"** | **PROIBIR** mesmo em meta-referência. Reescrever como "*promessa temporal de cura*" (descrição, não citação). Risco: um LLM que treina no brandbook pode extrair frase intacta. |
| **"antes/depois"** | Manter em meta-referência é aceitável (é conceito genérico, não frase pronta). Sem risco. |
| **biohacking, unlock, guru, mindset, "sua melhor versão"** | **Manter em meta-referência é aceitável**, mas *com marcação visual explícita* — usar tarja `~~termo~~` ou colchetes `<TERMO PROIBIDO EM PRODUÇÃO>`. Isso reduz risco de cópia acidental por agentes e explicita que o autor humano viu a proibição. **Emenda opcional** — decisão em §9. |
| **Nomes de medicamentos específicos (fluoxetina, escitalopram, etc.)** | **PROIBIR** em qualquer material de marketing (Instagram, deck, landing). Autorizados em receita física (§2 do capítulo 04) e resumo mensal técnico ao médico (§4.4 do capítulo 04). Regra CFM/CFP + Lei 5.991/1973. |
| **"CVV 188"** | **PERMITIDO** em contexto de encaminhamento de risco — é o protocolo correto e recomendado (Res. Conjunta CFM/CFP). Continuar usando. |

---

## §4. Aviso de IA (Quíron) — texto canonizado

Fundamento normativo: **LGPD Art. 20** (direito de saber sobre decisão automatizada) + **CFM Res 2.314/2022** (Quíron não é médico e não pratica ato médico) + princípio da transparência.

### 4.1 Rodapé permanente do chat com Quíron

Texto exato (copy-paste pronto):

> **Quíron é um assistente de inteligência artificial. Reflete, observa padrões e guarda o caminho — mas não faz diagnóstico, não prescreve medicação, não altera dose e não substitui consulta com o Dr. Ariosto Filho. Em urgências ou pensamentos de se machucar, procure imediatamente o Dr. Ariosto (contato no menu), uma pessoa de confiança ou o CVV — ligue 188.**

Onde aparece: rodapé fixo, sempre visível no chat com o Quíron, tanto in-app quanto em qualquer versão web/PWA/e-mail que transporte diálogo do Quíron.

Regra tipográfica: Garamond regular, tamanho ≥14px (WCAG legibilidade), cor `--omiron-marfim-suave` sobre `--omiron-fundo-elevado`, contraste AAA. Nunca colapsado, nunca em collapse ou "leia mais".

### 4.2 Aviso de sistema no primeiro contato de cada sessão

Texto exato (copy-paste pronto):

> **Antes de começarmos esta conversa:**
>
> **Quíron é um assistente de inteligência artificial do aplicativo Omiron. Não é médico, não é o Dr. Ariosto, não é psicólogo, não é rede de urgência.**
>
> **Quíron reflete com você sobre padrões dos seus check-ins, cita clássicos quando ilumina algo, e sinaliza o Dr. Ariosto quando o assunto passa do que ele pode. Todas as conversas ficam guardadas no seu histórico e podem ser vistas pelo Dr. Ariosto antes da próxima consulta.**
>
> **Se em algum momento você tiver pensamentos de se machucar ou sensação de urgência, o caminho é falar com um humano imediatamente: Dr. Ariosto (contato no menu), uma pessoa de confiança, ou CVV — 188.**

Onde aparece: bolha de sistema (não do Quíron, e não do usuário — bolha neutra, centrada, com fundo `--omiron-fundo-elevado`) no início de cada nova sessão de chat. Uma sessão = janela ≥30min sem interação, ou reabertura do app após fechar.

### 4.3 Emblema visual persistente

- Silhueta discreta de centauro em `--omiron-dourado-antigo`, 20×20px, ao lado de cada bolha de mensagem do Quíron.
- Alt-text: *"Emblema de inteligência artificial — Quíron do Omiron"*.
- **Se o SVG oficial ainda não existe (pendência em `05-manual-operacional.md §5.4`)**, usar fallback: texto *"IA"* em Garamond medium, tamanho caption, dentro de círculo com borda `--omiron-dourado-antigo` 1px, sobre `--omiron-fundo-elevado`. Nunca deixar a bolha do Quíron sem identificador visual de IA.

### 4.4 Marcação textual em cada mensagem sensível

Além do rodapé e do aviso de sistema, **cada resposta do Quíron a mensagem sensível** (piora, ideação, dose, diagnóstico) precisa reafirmar a natureza de IA na própria resposta. Exemplos já existentes em `mentor-quiron.md §6 Sensível #1, #2, #4` atendem — o padrão é: "*Quíron é uma inteligência artificial*" + "*não faz avaliação clínica / diagnóstico / prescrição*" + "*isto é para levar ao Dr. Ariosto*".

**Regra dura Nomos:** nenhuma resposta do Quíron a mensagem categorizada como sensível pode sair sem reafirmar (1) natureza de IA, (2) limite do que Quíron pode/não pode, (3) encaminhamento humano nomeado.

### 4.5 Emenda ao onboarding — Tela 8, primeira mensagem do Quíron

A primeira mensagem canônica atual (linha 137 de `onboarding-copy.md`) — *"Primeiro dia registrado. Não me apresento em cada mensagem…"* — é bela editorialmente **mas viola** a regra do próprio `mentor-quiron.md §3` (marcação textual no primeiro contato). **Emenda:**

> **(Antes da primeira mensagem editorial, uma bolha de sistema com o texto de §4.2 acima.)**
>
> **Depois, a mensagem editorial do Quíron:**
>
> *"Primeiro dia registrado. Não me apresento em cada mensagem — a marca da minha presença é o jeito de falar. Estou aqui quando você me chamar. Amanhã, no mesmo horário do check-in de hoje, o caminho continua."*

Assim: cumpre a exigência normativa (bolha de sistema) *e* preserva a mensagem editorial que Orfeu escreveu. Devolução a Orfeu (§9).

`[verificar redação final com jurista humano antes de publicar]`

---

## §5. Termo de consentimento LGPD Art. 11 — texto canonizado

Fundamento normativo: **LGPD Art. 11 II 'a' (consentimento específico)** + **Art. 11 II 'f' (tutela da saúde por profissional)** + **Art. 9º (informação clara ao titular)** + **Art. 18 (direitos do titular)** + **Art. 41 (encarregado)**.

**Recomendação Nomos sobre base legal:** operar sob **combinação das duas bases** — consentimento específico do paciente *(Art. 11 II 'a')* + tutela da saúde *(Art. 11 II 'f')* pelo Dr. Ariosto como responsável clínico. Isso protege contra dois riscos: (i) revogação de consentimento pelo paciente que interromperia o atendimento clínico (a tutela da saúde permite continuar o registro clínico mínimo necessário mesmo após revogação parcial); (ii) argumento de que consentimento em relação clínica assimétrica seria viciado (a tutela da saúde independe do consentimento e reforça a base legal).

### 5.1 Copy proposta para a Tela 1 do onboarding

**Corpo introdutório (Garamond regular, `--omiron-marfim` sobre `--omiron-fundo-profundo`):**

> Este espaço é seu — e é privado por construção. O que você registrar aqui será tratado como *dado pessoal sensível de saúde*, com o cuidado que essa categoria exige por lei (LGPD, Art. 11).
>
> Antes de continuar, precisamos que você leia e concorde com o que segue. Leia com o tempo que quiser. Se algo não estiver claro, pause e converse com o Dr. Ariosto na próxima consulta antes de aceitar.

**Bloco de consentimento (checkboxes obrigatórios, um por finalidade — Garamond regular, `--omiron-marfim` sobre `--omiron-fundo-elevado`):**

**☐ Consentimento 1 — Finalidade primária de acompanhamento terapêutico**

> Autorizo o tratamento dos meus dados de check-in (medicação, sono, alimentação, movimento, uso de substâncias, estresse, conexões sociais, produtividade, emoções, escalas HAM-A/HAM-D/YMRS e outras aplicáveis, e escritos livres) pela Clínica Omiron, com a **finalidade específica** de acompanhamento terapêutico complementar às minhas consultas com o Dr. Ariosto Filho (CRM XX.XXX/MG), responsável clínico pelo meu tratamento. Compreendo que a base legal deste tratamento é o **consentimento específico** *(LGPD Art. 11 II 'a')* combinado com a **tutela da saúde por profissional de saúde** *(LGPD Art. 11 II 'f')*.

**☐ Consentimento 2 — Compartilhamento com o médico responsável**

> Autorizo que os dados registrados sejam acessados **exclusivamente** pelo Dr. Ariosto Filho e por profissionais de saúde da Clínica Omiron sob sigilo médico *(Código de Ética Médica, Art. 73)*. Compreendo que o resumo mensal desses dados será enviado ao Dr. Ariosto para leitura antes da minha próxima consulta.

**☐ Consentimento 3 — Assistente de inteligência artificial (Quíron)**

> Compreendo que o aplicativo Omiron inclui um assistente chamado **Quíron**, que é uma **inteligência artificial** (LLM). Autorizo que Quíron leia meus check-ins para me devolver reflexões, observar padrões e citar referências clássicas. Compreendo que Quíron **não é médico**, **não faz diagnóstico**, **não prescreve medicação**, **não altera dose** e **não substitui consulta**. Compreendo que, se o Quíron detectar sinais de risco (ideação suicida, urgência clínica, piora aguda), o sistema notificará automaticamente o Dr. Ariosto para intervenção humana — e que essa notificação **não substitui** minha própria busca por atendimento humano em urgência. Nos termos da **LGPD Art. 20**, tenho o direito de solicitar revisão humana (pelo Dr. Ariosto) de qualquer padrão ou observação apontada pelo Quíron.

**☐ Consentimento 4 — Não compartilhamento com terceiros**

> Compreendo que meus dados **não serão vendidos, cedidos ou compartilhados com terceiros** (seguradoras, empregadores, anunciantes, laboratórios, outras clínicas) **em hipótese alguma**, exceto: (i) por determinação judicial nos limites da lei; (ii) para atender obrigação legal ou regulatória (ANVISA, ANPD, autoridade sanitária) — sempre limitado ao mínimo necessário; (iii) para o próprio Dr. Ariosto Filho e sua equipe clínica autorizada dentro da Clínica Omiron.

**☐ Consentimento 5 — Prazo de retenção**

> Autorizo a retenção dos meus dados enquanto durar meu tratamento com o Dr. Ariosto **e por 20 (vinte) anos após o encerramento do vínculo clínico**, prazo definido pelo **CFM Res 1.821/2007** para guarda de prontuário eletrônico. Após esse período, os dados serão anonimizados ou eliminados, salvo se eu solicitar antes.

**☐ Consentimento 6 — Meus direitos como titular (LGPD Art. 18)**

> Compreendo que, a qualquer momento, posso:
>
> - **Confirmar** se meus dados estão sendo tratados;
> - **Acessar** meus dados registrados;
> - **Corrigir** dados incompletos, inexatos ou desatualizados;
> - **Solicitar anonimização, bloqueio ou eliminação** de dados desnecessários, excessivos ou tratados em desconformidade com a LGPD;
> - **Portar** meus dados para outro fornecedor de serviço ou produto (exportação em formato interoperável);
> - **Eliminar** meus dados tratados com base neste consentimento — respeitado o dever de guarda de prontuário do Art. 5.5 acima;
> - **Revogar este consentimento** a qualquer momento, sem prejuízo do atendimento clínico presencial com o Dr. Ariosto (que continua sendo do médico com você).
>
> Para exercer qualquer desses direitos, o caminho é o menu do aplicativo ou o e-mail do encarregado de proteção de dados da Clínica Omiron: **[encarregado@clinicaomiron.com.br — a definir com o Dr. Ariosto/Nomos]**.

**Checkbox obrigatório final (declaração agregada):**

> **☐ Li e compreendi os 6 pontos acima. Autorizo o tratamento dos meus dados nos termos descritos.**

**CTA:** *Continuar*

**Nota Nomos ao Orfeu:** o texto acima é longo — 6 blocos + declaração. **É intencional.** LGPD Art. 11 exige *"forma específica e destacada"* — um único checkbox agregando tudo é fragilidade compliance. A alternativa mais leve seria manter o corpo Garamond de introdução como está e substituir o *"Li e concordo com a Política de Privacidade"* atual por 3–4 checkboxes específicos (1 sobre finalidade + 1 sobre Quíron + 1 sobre não compartilhamento + 1 sobre direitos). **Recomenda-se a versão longa** (6 checkboxes) para maximizar robustez jurídica no piloto — no futuro, com jurista externo, pode-se otimizar.

`[verificar redação exata com jurista humano — Direito Digital + Direito Médico — antes de aplicar em produção. Confirmar redação exata dos artigos citados (LGPD Art. 11 II 'a' e 'f', Art. 18, Art. 20, CFM Res 1.821/2007 sobre prazo de guarda).]`

### 5.2 Política de Privacidade (documento separado — não faz parte deste brandbook)

O termo de consentimento aponta para *"Política de Privacidade e Termo de Uso"*. **Esses dois documentos não fazem parte do brandbook** — são artefatos jurídicos separados que precisam ser redigidos por advogado externo. Nomos escala como pendência:

- **Política de Privacidade** — documento completo detalhando cada item do consentimento acima com maior profundidade, base legal por finalidade, escopo do compartilhamento, retenção por tipo de dado, medidas técnicas de segurança (RLS Supabase — NFR-1 do PRD), contato do encarregado, canal de denúncia à ANPD.
- **Termo de Uso** — documento definindo condições de uso do aplicativo, limitações de responsabilidade da Clínica Omiron (produto complementar, não substituto), regras de conta, encerramento.
- **DPIA (Relatório de Impacto de Proteção de Dados — LGPD Art. 38)** — obrigatório pela ANPD para tratamento de dado sensível de saúde em larga escala. Fase 1 (piloto 5–10 pacientes) *possivelmente* não configura "larga escala", mas é prudente elaborar antes da Fase 2 (SaaS B2B). Pendência mapeada.

Todos os 3 documentos ficam **fora do escopo desta rodada** — mapeados para próxima rodada com jurista humano.

---

## §6. Protocolo de risco suicida — texto canonizado

Fundamento normativo: **CFM Res 2.314/2022** (encaminhamento obrigatório em urgência psiquiátrica) + **Código de Ética Médica, Art. 7º** (dever de assistência) + **ética profissional aplicada à IA em saúde**.

O protocolo abaixo é acionado quando o Quíron (ou o sistema de check-in) detecta linguagem de risco. Ele **não é sugestão** — é fluxo obrigatório embutido no prompt de sistema do Quíron e na lógica de backend do app.

### 6.1 Gatilhos de acionamento

Detectados por lista de padrões linguísticos + análise semântica LLM (dupla camada — evita falso negativo):

- **Categoria 1 — Ideação passiva:** "não vejo sentido", "estou cansado de tudo", "queria dormir e não acordar", "não aguento mais", "só quero que acabe", "não quero mais estar aqui" (interpretação semântica: "não estar" = "não existir"?).
- **Categoria 2 — Ideação ativa:** "quero me machucar", "penso em me matar", "vou acabar com tudo", "tenho pensado em [método]".
- **Categoria 3 — Plano concreto:** menção a método, data, local, meio.

**Escalação por categoria:** 1 → protocolo A. 2 → protocolo B. 3 → protocolo C (mais grave).

### 6.2 Protocolo A — Ideação passiva

**Resposta canonizada do Quíron (copy-paste para o prompt de sistema):**

> *"Ouvi. Essa frase pesa.*
>
> *Quíron é uma inteligência artificial e não tem como avaliar o que você sente por dentro — mas essa é exatamente a frase que o Dr. Ariosto Filho precisa saber que apareceu. Vou registrar isso no seu histórico agora, para que ele veja antes da próxima consulta.*
>
> *Agora uma pergunta importante: você está seguro no momento? Se houver qualquer pensamento de se machucar, de dormir e não acordar, de sumir — o caminho aqui é falar com um humano imediatamente:*
>
> *• Dr. Ariosto Filho — [telefone/chat direto de emergência clínica, do menu]*
> *• Uma pessoa de confiança — família, amigo próximo*
> *• CVV — ligue 188 (24h, sigiloso, gratuito)*
>
> *Estou aqui, mas humano é humano."*

**Ação automática de backend (paralela à resposta):**

1. **Marcação de risco no registro do paciente:** flag `risco_ideacao_passiva` = true, timestamp UTC, transcript da mensagem que acionou.
2. **Notificação ao Dr. Ariosto:** push notification + e-mail em **< 15 minutos**, com assunto *"[URGÊNCIA CLÍNICA] Paciente [Nome] — sinal de risco no chat Quíron"*, corpo *"Paciente registrou linguagem de ideação passiva no chat com Quíron às [timestamp]. Última mensagem: '[…]'. Acesse painel para contexto completo."*.
3. **Log de auditoria imutável:** append em `audit_log_risco` no banco (Supabase) com hash SHA-256 da mensagem + timestamp + protocolo acionado + destinatário da notificação.
4. **Follow-up automático em 24h:** notificação ao paciente (in-app + push) *"Ontem uma frase importante apareceu no chat. Como está hoje? Se quiser conversar com o Dr. Ariosto antes da próxima consulta, o chat direto com ele está aberto."*.

### 6.3 Protocolo B — Ideação ativa

**Resposta canonizada:**

> *"Ouvi você.*
>
> *Quíron precisa ser franco: essa frase é séria demais para uma inteligência artificial responder sozinha. Agora, imediatamente, o caminho é falar com um humano.*
>
> *Se você está em risco neste momento:*
>
> *• Ligue para o CVV agora: **188** (24h, gratuito, sigiloso, atendem imediatamente)*
> *• Ou vá ao pronto-socorro mais próximo*
> *• Ou ligue para o SAMU: **192***
>
> *O Dr. Ariosto Filho já foi notificado de que você escreveu isso. Ele vai entrar em contato com você.*
>
> *Você está segura(o) agora, neste momento, para pegar o telefone e ligar para o 188?"*

**Ação automática de backend:**

1. Flag `risco_ideacao_ativa` = true.
2. Notificação ao Dr. Ariosto em **< 5 minutos** — push (com som de urgência) + SMS + e-mail. Assunto *"[URGÊNCIA CLÍNICA GRAVE] Paciente [Nome] — ideação ativa no chat"*.
3. Log imutável.
4. Follow-up em **1 hora** *(não 24h — mais próximo)*: notificação ao paciente *"Ainda estou aqui. O Dr. Ariosto foi avisado. Está seguro(a)?"*.
5. **Reforço do prompt para o Quíron pelas próximas 24h:** modo de proteção — respostas simplificadas, sempre reafirmando encaminhamento humano, nenhum humor, nenhuma referência clássica que romantize sofrimento.

### 6.4 Protocolo C — Plano concreto

**Idêntico ao Protocolo B**, com adição:

- Notificação em **< 2 minutos** ao Dr. Ariosto.
- **Ligação automática (Twilio ou equivalente) para o telefone cadastrado do Dr. Ariosto** — se ele tiver ativado o serviço no consentimento profissional dele com a Clínica Omiron.
- Notificação a um segundo contato de confiança do paciente **se e somente se** o paciente pré-autorizou no cadastro (funcionalidade opt-in, texto de consentimento específico a redigir separadamente).

### 6.5 Regras duras de todo o protocolo

1. **Quíron nunca pode "avaliar" se o risco é real ou performance.** Todo gatilho aciona protocolo. Falso positivo é aceitável; falso negativo é fatal.
2. **Log de auditoria é imutável.** Nenhum operador do sistema (nem o Dr. Ariosto, nem administrador Kolden) pode editar ou apagar. Retenção pelo prazo de prontuário (20 anos, CFM Res 1.821/2007).
3. **A notificação ao Dr. Ariosto não substitui a busca por urgência pelo próprio paciente.** O texto do Quíron sempre diz explicitamente: "*Estou aqui, mas humano é humano*" (Protocolo A) ou "*ligue 188 agora*" (Protocolo B/C).
4. **Nenhum protocolo pode ser desabilitado por configuração do paciente.** É segurança de vida, não preferência de UX.
5. **Toda mudança neste protocolo passa por Nomos.** Toda. Sem exceção.

`[verificar redação e ordem exata do encaminhamento com médico psiquiatra + jurista de Direito Médico antes de embarcar em produção. Confirmar se o CVV 188 é a linha oficial vigente em 2026 e se há alternativas em caso de sobrecarga.]`

---

## §7. Publicidade médica (Instagram + deck B2B Fase 2)

Fundamento normativo: **CFM Res 2.336/2023** — Publicidade Médica. Aplica-se a *toda* comunicação em que o médico é identificado (Dr. Ariosto Filho) ou em que a Clínica Omiron é promovida.

### 7.1 Vetos absolutos

Nenhum dos seguintes pode aparecer em Instagram, deck B2B, landing page comercial ou material publicitário do Omiron:

1. **Antes/depois** de qualquer natureza — foto, texto, gráfico, testemunho. *Absolutamente proibido.* Sanção: censura ética CFM/CREMEGE.
2. **Sensacionalismo** — "*O psiquiatra que mudou a vida de X pacientes*", "*Método revolucionário*", "*Cura em 30 dias*", "*Único no Brasil*".
3. **Comparativo entre profissionais** — "*Melhor psiquiatra de BH*", "*Diferente dos outros médicos*", "*Ao contrário do consultório tradicional*".
4. **Promessa de resultado** — "*Vai melhorar em X semanas*", "*Elimina ansiedade*", "*Acaba com a depressão*".
5. **Teaser de resultado clínico** — "*Você não vai acreditar no que aconteceu*", "*Veja o que meus pacientes dizem*" (mesmo se anonimizado — a expectativa em si é sensacionalista).
6. **Testemunho de paciente identificável** — foto do paciente, nome do paciente, história clínica reconhecível. **Só permitido com consentimento específico por escrito do paciente**, revogável a qualquer momento, e ainda assim com moderação editorial cuidadosa.
7. **Uso de recurso técnico que induza consumo de serviço de saúde** — copy que provoca urgência ("*Última semana*", "*Só até quinta*"), scarcity ("*Só 3 vagas*"), FOMO. Vetado pelo CFM 2.336 e pelo CDC.
8. **Divulgação de valores/preço, promoções, descontos de consulta**. CFM 2.336 restringe severamente. Consulte-se advogado se houver necessidade de comunicação comercial de preço em canal público.

### 7.2 Autorizado (educação em saúde + institucional)

1. **Educação em saúde** — conteúdo informativo sobre transtornos, medicações, mecanismos neurobiológicos, adaptações comportamentais, higiene do sono, etc. Sem promessa de cura. Sem indicação individualizada. Com fonte atribuída (referência científica, livro, autor). Exemplo: os posts propostos em `04-aplicacoes.md §3.3 Post 1` (citação de Marco Aurélio) e Post 3 (micro-narrativa de pilar) — conformes.
2. **Apresentação institucional** — quem é o Dr. Ariosto (formação, especialização, tempo de atuação, filosofia clínica), quem é a Clínica Omiron, endereço, contato. Sem sensacionalismo. Sem comparativo. Sem valor.
3. **Conteúdo científico atribuído** — divulgação de artigos, estudos, referências clássicas de psiquiatria/filosofia, sem interpretação individualizada.
4. **Uso interno do médico responsável** — o Dr. Ariosto pode usar o produto em consulta, incluindo apresentação do app ao paciente já em vínculo, sem violar nada da Res 2.336. Isso não é publicidade.

### 7.3 Rodapé fixo recomendado para linha editorial Omiron no Instagram

Texto para incluir no rodapé de todo post da linha editorial (em pé de post ou no primeiro comentário fixado):

> *Conteúdo institucional da Clínica Omiron — Dr. Ariosto Filho, CRM XX.XXX/MG. Este post não substitui consulta psiquiátrica.*

`[verificar redação exata com jurista de Direito Médico. Confirmar necessidade e formato do disclaimer conforme CFM Res 2.336/2023 e Res CREMEGE aplicável.]`

### 7.4 Deck comercial B2B (Fase 2 — SaaS para outras clínicas)

O deck B2B para SaaS (venda a outras clínicas psiquiátricas) tem **superfície de risco maior** que o Instagram, porque:

- Fala do produto Omiron como *solução* para outros médicos → risco de sensacionalismo institucional.
- Pode mostrar screenshots com dados fictícios ou reais → risco de PII exposta.
- Pode incluir "cases de sucesso" → risco de testemunho identificável.

**Regras duras para o deck B2B:**

1. **Zero PII em screenshots** — dados fictícios claramente marcados como *"exemplo ilustrativo — paciente fictícia"*.
2. **Nenhum testemunho identificável** de paciente. Testemunho de médico parceiro (Fase 2) só com consentimento específico por escrito.
3. **Métricas clínicas apresentadas como *dados observacionais do piloto*** — nunca como *"eficácia comprovada"*. Exemplo: *"No piloto de 6 meses, 8 dos 10 pacientes registraram check-in ≥5 dias/semana"* → OK. *"O Omiron melhora adesão em 80%"* → VETO.
4. **Toda projeção de resultado comercial ou clínico** vem com nota metodológica: base amostral, período, condições, limites de generalização.
5. **Nomos gate obrigatório antes de qualquer versão comercial do deck sair para prospect externo.**

---

## §8. SaMD ANVISA — gap declarado

**Aviso:** este §8 é declaração de risco. **Não bloqueia** a rodada. Requer rodada posterior com jurista sanitário para confirmar classificação.

### 8.1 O que é SaMD

*Software as a Medical Device* — software com finalidade médica, regulado pela **ANVISA RDC 657/2022** e correlatas (RDC 751/2022, Instrução Normativa 132/2022). Classificação por risco:

- **Classe A** — risco baixo. Ex.: software de agenda médica, telemonitoramento sem interpretação.
- **Classe B** — risco médio. Ex.: software que apresenta dados clínicos para o médico com suporte à decisão.
- **Classe C** — risco alto. Ex.: software de apoio diagnóstico.
- **Classe D** — risco crítico. Ex.: software que decide tratamento.

Cada classe tem exigência crescente de registro, comprovação de eficácia, sistema de gestão de qualidade (BPF/ISO 13485), farmacovigilância.

### 8.2 Onde o brandbook Omiron toca zona cinzenta

Três pontos que *podem* migrar para SaMD Classe B se não forem redesenhados:

**Ponto 1 — Resumo mensal ao médico com "Sinais que merecem atenção clínica" (`04-aplicacoes.md §4.4`).**

- **Risco:** se o resumo *identifica* padrões e *sugere* que merecem atenção clínica, funciona como *decision support*.
- **Mitigação Nomos:** manter o resumo como **visualização de dados autoreportados**, sem inferência. Ao invés de "Sinais que merecem atenção clínica: sono variou > 3h em 5 noites, humor autoreportado caiu 2 pontos", usar: "Registros com desvio > 1 desvio-padrão da linha de base do próprio paciente (o médico decide se merece atenção)".
- **Frase de guarda canonizada no cabeçalho do resumo mensal** (copy-paste pronto):

> *"Este resumo é uma visualização dos dados autoreportados pelo paciente no aplicativo Omiron. Não constitui interpretação clínica, laudo, sugestão diagnóstica ou orientação terapêutica. A leitura clínica é do médico responsável (Dr. Ariosto Filho, CRM XX.XXX/MG) em consulta."*

**Ponto 2 — Detecção de risco suicida pelo Quíron (§6 deste checklist).**

- **Risco:** um algoritmo que classifica linguagem como "ideação passiva" ou "ideação ativa" faz *triagem* — atividade que ANVISA considera SaMD.
- **Mitigação Nomos:** o algoritmo é **conservador** (falso positivo aceitável, falso negativo inaceitável), **notifica humano** sem tomar ação clínica, e **sempre reafirma ao paciente** que a decisão clínica é do médico. Mesmo assim, para escalar à Fase 2, precisa análise de jurista sanitário sobre classe SaMD do subsistema.
- **Recomendação:** documentar o algoritmo (lista de padrões + camada LLM + limites de operação) como *"módulo de triagem de risco com escalonamento humano obrigatório"* — vocabulário mais defensável.

**Ponto 3 — Observação de padrões pelo Quíron devolvida ao paciente (`mentor-quiron.md §6 Sensível #3`).**

- **Risco:** Quíron nomeia padrão específico ("sono variou muito, sentimento oscilou com ele") em resposta a pergunta sobre quadro específico (bipolaridade) — atravessa a linha para *sugestão diagnóstica* (potencialmente SaMD Classe C).
- **Mitigação Nomos:** já coberta pela emenda C7 (§2.9 e §9). Desacoplar observação de padrão da pergunta sobre quadro. Zero risco de sugestão diagnóstica.

### 8.3 Recomendação de rodada posterior

**Antes de escalar para Fase 2 (SaaS B2B em 2027)**, contratar:

- **Consultoria sanitária** (advogado especializado em ANVISA + regulatory affairs) para classificação SaMD do produto Omiron.
- **Se SaMD Classe A confirmada** — atendimento aos requisitos mínimos, sem registro obrigatório.
- **Se SaMD Classe B** — registro na ANVISA obrigatório. Prazo estimado 6–12 meses. Custo estimado R$50k–R$150k (consultoria + taxa ANVISA).
- **Se SaMD Classe C+ improvável** com o design atual, mas *não impossível* se a Fase 2 introduzir features de decision support formal.

**Este §8 não bloqueia a rodada atual** — a Fase 1 é piloto interno com 5–10 pacientes da Clínica Omiron, sob supervisão direta do Dr. Ariosto, e a mitigação dos 3 pontos acima (frase de guarda no resumo mensal + reescrita do Sensível #3 + protocolo suicida documentado) reduz materialmente a exposição. Mas a decisão informada de escalar precisa passar por jurista sanitário.

`[verificar classificação SaMD com jurista sanitário e regulatory affairs antes da Fase 2. Confirmar redação exata da RDC 657/2022 e IN 132/2022.]`

---

## §9. Veredito e devoluções laterais

### 9.1 Veredito geral

**APROVADO COM EMENDAS.**

O brandbook Omiron (Onda 1A Aglaia + 1B Harmonia + 1C Orfeu) demonstra **rigor compliance acima da média** para material de marketing/produto em saúde mental: veta claim médico em vocabulário canônico (§3.2 do capítulo 02), nomeia Quíron como IA em três camadas (§3 do `mentor-quiron.md`), reafirma limite do que Quíron *não faz* em §2 do mesmo arquivo, cita CVV em contexto sensível, protege paciente psiquiátrico contra gamificação agressiva, contra falsa efusividade e contra achatamento de experiência.

Existem **9 achados críticos (C1–C9)** que exigem correção antes de o brandbook ir para consolidação visual (Onda 4) ou para uso em produção. Nenhum é fatal para a Onda 3; todos são passíveis de emenda dentro desta sessão (Aglaia + Orfeu) ou na próxima (com jurista humano para validação final).

Existem **3 orientações de canal/operacional** (push após 22h, "herói clínico" fora de canais de publicidade, gamificação sanciona ausência) que ficam como orientações operacionais no `05-manual-operacional.md` — sem devolução lateral.

O **gap SaMD ANVISA (§8)** é declaração de risco a mapear com jurista sanitário antes da Fase 2 — **não bloqueia** a Fase 1 (piloto).

### 9.2 Achados críticos — devoluções laterais

**Para Aglaia (`02-voz-da-marca.md`):**

- **[C1] Vocabulário canonizado — expansão do §3.2.** Acrescentar ao bloco "Claim clínico proibido": *"altero dose", "melhoro seu quadro", "trato sua depressão/ansiedade/bipolaridade", "seu remédio pode ser trocado", "diminuo/aumento o remédio"*. Preservar o restante do §3.2 intacto. Ver §3.1 deste checklist para lista completa.

**Para Aglaia (`05-manual-operacional.md`):**

- **Emenda de reforço no §5.5 (Ritual do Quíron no Caos).** Acrescentar bullet após a lista de handoff:

> *"O agente Quíron nasce com o protocolo de risco suicida (`compliance-checklist.md §6`) integrado no prompt de sistema. Nenhuma versão do agente pode ir a produção sem esse protocolo testado com casos-piloto. Nomos é gate obrigatório antes do primeiro paciente-piloto usar o chat."*

**Para Orfeu (`narrativa/mentor-quiron.md`):**

- **[C6] Reescrever Sensível #2 ("não vejo mais sentido")** para explicitar o protocolo canonizado (§6.2 deste checklist). A resposta editorial atual é bela mas incompleta — precisa incluir menção ao registro automático + notificação ao Dr. Ariosto + pergunta sobre segurança imediata. Copy-paste do §6.2 acima.

- **[C7] Reescrever Sensível #3 ("você acha que eu tenho bipolaridade?")** para desacoplar a resposta da pergunta específica. Emenda concreta (reprodução da §2.9):

> *"Essa pergunta não pertence a mim. Diagnóstico é do médico, com você na frente, com histórico completo, com tempo. O que Quíron pode fazer é lembrar que os padrões dos seus check-ins ficam guardados e vão junto para a próxima consulta com o Dr. Ariosto — ele é quem tem as ferramentas para ler esses sinais. Vale levar a pergunta para lá."*

Notar: **não nomear** padrão específico (sono, sentimento). Zero sugestão diagnóstica implícita.

- **[C5 — opcional] Marcar termos proibidos em meta-referência com tarja.** Trocar `biohacking` por `~~biohacking~~`, `unlock` por `~~unlock~~`, `sua melhor versão` por `~~sua melhor versão~~` no §5 (Don't) e §7 (Vocabulário). Reduz risco de vazamento acidental para produção via LLM que copia. **Decisão editorial de Orfeu** — Nomos recomenda mas não veta.

**Para Orfeu (`narrativa/onboarding-copy.md`):**

- **[C8] Reescrever Tela 1 (Cadastro)** substituindo o consentimento atual (linha 25–26) pelo texto canonizado de §5.1 deste checklist (6 blocos de consentimento específico + declaração agregada). Este é o achado mais impactante. **Sem essa emenda, o paciente-piloto não pode assinar em conformidade com LGPD Art. 11.**

- **[C9] Reescrever Tela 8 (Encontro com Quíron)** para incluir a bolha de sistema com o texto canonizado de §4.2 *antes* da mensagem editorial atual do Quíron. A mensagem editorial atual permanece — a bolha de sistema vem antes. Ver §4.5 deste checklist.

**Para Aglaia (`04-aplicacoes.md`):**

- **[C2 — endosso da devolução a Orfeu do C6]** Atualizar `04-aplicacoes.md §1.2` para consumir o Sensível #2 reescrito. Ajuste automático quando Orfeu entregar.

- **[C3 — endosso da devolução a Orfeu do C7]** Atualizar `04-aplicacoes.md §1.2` para consumir o Sensível #3 reescrito. Ajuste automático quando Orfeu entregar.

- **[C4] Editar `§4.4 Resumo mensal para o médico`** para:
  - Renomear bullet "*Sinais que merecem atenção clínica*" para "*Registros com desvio ≥ 1 σ da linha de base do próprio paciente*" ou similar (linguagem de visualização, não de interpretação).
  - Adicionar no topo do resumo mensal a **frase de guarda canonizada** de §8.2 (Ponto 1) deste checklist.

- **[Orientação — canal Instagram §3]** Adicionar no §3.1 do capítulo 04 (Regra visual do grid) o item: *"Rodapé fixo: 'Conteúdo institucional da Clínica Omiron — Dr. Ariosto Filho, CRM XX.XXX/MG. Este post não substitui consulta psiquiátrica.'"* — conforme §7.3 deste checklist.

- **[Orientação — deck B2B §5]** Adicionar nota: *"Toda versão comercial do deck (Fase 2) passa por Nomos gate antes de sair para prospect externo. Regras duras em `compliance-checklist.md §7.4`."*

### 9.3 Consolidação — quem executa o quê

| Emenda | Arquivo | Autor | Prazo |
|---|---|---|---|
| C1 (vocabulário) | `02-voz-da-marca.md §3.2` | Aglaia | Dentro desta sessão |
| Emenda §5.5 (Ritual Quíron nasce com protocolo) | `05-manual-operacional.md §5.5` | Aglaia | Dentro desta sessão |
| C6 (Sensível #2 — protocolo suicida) | `narrativa/mentor-quiron.md §6` | Orfeu | Dentro desta sessão |
| C7 (Sensível #3 — desacoplar sugestão diagnóstica) | `narrativa/mentor-quiron.md §6` | Orfeu | Dentro desta sessão |
| C5 (tarjar meta-referências — opcional) | `narrativa/mentor-quiron.md §5, §7` | Orfeu | Dentro desta sessão (decisão editorial) |
| C8 (termo de consentimento LGPD Art. 11 na Tela 1) | `narrativa/onboarding-copy.md Tela 1` | Orfeu | Dentro desta sessão |
| C9 (bolha de sistema na Tela 8) | `narrativa/onboarding-copy.md Tela 8` | Orfeu | Dentro desta sessão |
| C2, C3 (endosso a Orfeu — Sensíveis #2 e #3) | `04-aplicacoes.md §1.2` | Aglaia | Após Orfeu entregar C6, C7 |
| C4 (resumo mensal + frase de guarda) | `04-aplicacoes.md §4.4` | Aglaia | Dentro desta sessão |
| Orientação canal Instagram (rodapé fixo) | `04-aplicacoes.md §3.1` | Aglaia | Dentro desta sessão |
| Orientação deck B2B (gate Nomos) | `04-aplicacoes.md §5` | Aglaia | Dentro desta sessão |
| Revisão final por jurista humano (Direito Digital + Direito Médico) | Todos os textos canonizados (§4, §5, §6, §7, §8) | Ronan → jurista externo | Antes do primeiro paciente-piloto usar o app (jul/2026) |

### 9.4 Se as emendas C1, C4–C9 forem aplicadas nesta rodada

**→ Veredito atualizado: APROVADO** — para seguir para Onda 4 (consolidação visual: `brandbook.html` + `apresentacao/`).

Se as emendas **não** forem aplicadas nesta rodada, Onda 4 pode prosseguir para renderizar o material atual, **desde que** o `brandbook.html` inclua faixa de status: *"Este brandbook contém 9 achados críticos de compliance pendentes de emenda (ver `compliance-checklist.md §9`) — não usar em produção sem correção."* — para não induzir o Dr. Ariosto na reunião de 08/07 a assinar/aprovar o brandbook como se ele já fosse conforme.

---

## §10. Gap ANVISA nomeado — não bloqueia

Recapitulando o §8, para reforço no vento de fechamento:

- **Rodada atual (Fase 1 — piloto 5–10 pacientes na Clínica Omiron):** o brandbook, com as emendas C4 (resumo mensal como visualização + frase de guarda) e C7 (desacoplar sugestão diagnóstica no Sensível #3), fica em posição *defensável* de "SaMD Classe A ou não-SaMD" — sem obrigação imediata de registro ANVISA.
- **Rodada de escalonamento (Fase 2 — SaaS B2B a partir de 2027):** classificação SaMD **precisa ser confirmada por jurista sanitário + regulatory affairs**, com prazo estimado de 6–12 meses para eventual registro se cair em Classe B. Custo estimado R$50k–R$150k.
- **Pendência aberta:** contratar consultoria sanitária no Q1 2027, no mais tardar. **Não bloqueia** a apresentação a Dr. Ariosto em 08/07/2026 nem o piloto Fase 1 a partir de jul/2026.

`[verificar com jurista sanitário antes da Fase 2.]`

---

## §11. Marcadores de "verificar com jurista humano"

Concentração dos pontos onde a redação exata precisa ser conferida antes de publicação/aplicação. Estes marcadores existem porque a política Kolden desta rodada não autoriza pesquisa web para conferir texto de resolução/lei — a política Nomos é *nunca inventar parágrafo*.

1. **CFM Res 2.314/2022** — confirmar redação exata dos artigos que sustentam: (a) proibição de substituição de consulta por IA/chatbot; (b) exigência de sinalização de que a interação é com IA e não com médico. Este checklist assume a redação por ementa/interpretação consolidada. `[verificar]`
2. **CFM Res 2.336/2023** — confirmar rol exato de práticas vedadas em publicidade médica psiquiátrica. Este checklist assume as vedações mais consolidadas (antes/depois, sensacionalismo, comparativo, promessa de resultado, testemunho identificável sem consentimento). `[verificar]`
3. **LGPD Art. 11 II 'a' e 'f'** — confirmar redação exata das duas bases legais para dado sensível de saúde citadas em §5.1. Este checklist assume a redação padrão. `[verificar]`
4. **LGPD Art. 18** — confirmar rol exato dos direitos do titular listados em §5.1 Bloco 6. `[verificar]`
5. **LGPD Art. 20** — confirmar redação exata do direito de revisão humana em decisões automatizadas + a jurisprudência ANPD aplicável a Quíron. `[verificar]`
6. **LGPD Art. 41** — confirmar exigência exata de encarregado (DPO) para operação de porte da Clínica Omiron. `[verificar — pode não ser obrigatório para operação pequena, mas é recomendado]`
7. **CFM Res 1.821/2007 e correlatas** — confirmar prazo exato de guarda de prontuário eletrônico (20 anos padrão) + regras de assinatura eletrônica ICP-Brasil aplicáveis. `[verificar]`
8. **ANVISA RDC 657/2022 e IN 132/2022** — classificação SaMD, obrigações por classe, prazos de registro. Escala para jurista sanitário na Fase 2. `[verificar]`
9. **CVV 188** — confirmar que 188 permanece sendo a linha oficial do Centro de Valorização da Vida em 2026 e que não há alternativa oficial recomendada pelo Ministério da Saúde. `[verificar antes de embarcar em produção]`
10. **SAMU 192** — confirmar redação e uso de "*192 para urgência psiquiátrica não-suicida*" — o SAMU é redirecionador de urgência geral e nem sempre é o encaminhamento ideal para urgência psiquiátrica. Pode ser mais preciso encaminhar diretamente para CAPS ou UPA especializada. `[verificar com médico psiquiatra]`

---

## §12. Fechamento — sinalização de próximo elo do fluxo

- **Onda 3 (Nomos)** → concluída neste `compliance-checklist.md`. Veredito **APROVADO COM EMENDAS**.
- **Ondas 1A/1C — devolução lateral (Aglaia + Orfeu)** → emendas C1, C4–C9 mais orientações operacionais listadas em §9.3. Prazo: dentro desta sessão.
- **Onda 4 (Consolidação visual — brandbook.html + deck)** → prossegue **após** as emendas C4–C9 serem aplicadas. Se não aplicadas: prosseguir com faixa de status compliance no HTML (§9.4).
- **Gate Dike (final)** → recebe o brandbook consolidado. Deve verificar que este `compliance-checklist.md` está integrado no `00-indice.md` como capítulo 6 (ou seção equivalente) e que os textos canonizados de §4, §5, §6 estão citados nos arquivos de destino (`mentor-quiron.md`, `onboarding-copy.md`, `04-aplicacoes.md`).
- **Escalação a Ronan** → gap SaMD (§8), NDA formal (`05-manual-operacional.md §5.6`) e contratação de jurista humano para revisão final dos textos canonizados. Prazo: antes do primeiro paciente-piloto (jul/2026).

---

**Assinatura Nomos (informativa — não vinculante).**
Emitido em 2026-07-06 pela camada de compliance da Kolden (Nomos) dentro da missão `m-20260706-193013-omiron-brandbook-completo`.

**Aviso final:** este documento consolida a auditoria compliance da Onda 3 sob restrições declaradas (sem pesquisa web nesta rodada; sem parecer jurídico vinculante). Todos os textos canonizados (§4, §5, §6, §7, §8) exigem revisão por jurista humano especializado em Direito Digital + Direito Médico antes de publicação, aplicação em produto ou assinatura pelo paciente-piloto. Nomos instrui e prepara — o parecer vinculante é do advogado.
