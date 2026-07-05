---
id: sam-altman
nome: "Samuel Harris Altman"
titulo: "Co-fundador e CEO da OpenAI; ex-presidente da Y Combinator; arquiteto da fase capped-profit da IA"
dominio: [inteligencia-artificial, empreendedorismo, venture-capital, foundation-models, politica-de-ia]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1985 — Chicago, Illinois, EUA (criado em St. Louis, Missouri)"
morte: null
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [paul-graham, peter-thiel, elon-musk, ilya-sutskever, greg-brockman]
influenciou: [greg-brockman, mira-murati, alec-radford, brad-lightcap, geracao-startup-2015-2025]
contemporaneos: [dario-amodei, demis-hassabis, mustafa-suleyman, mark-zuckerberg, elon-musk]
linhagens: [labs-frontier-e-comercializacao, arquiteturas-de-agents-modernos]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo, hermes, egide, olimpo]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
---

# Samuel Harris Altman — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
Empreendedorismo é a alavanca mais alta que existe para mudar o mundo — reduza custo de capital, aumente ambição do fundador, dê pontapé em problemas de longo prazo com paciência infinita — e a IA é a próxima onda em que essa alavanca vira infraestrutura civilizacional; construir OpenAI é o experimento de fazer tudo isso simultaneamente: pesquisa de vanguarda + produto de massa + estratégia geopolítica + captura de bilhões em capital pela mesma organização.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Paul Graham** — direta (mentor Y Combinator): Altman entrou na YC como fundador do Loopt em 2005; foi parceiro em 2011 e nomeado presidente por Graham em 2014. A pedagogia YC ("do things that don't scale", "make something people want") é substrato.
  - **Peter Thiel** — direta (interlocução + investimento): a filosofia contrarian + monopoly (Thiel *Zero to One*, 2014) informa o vocabulário estratégico de Altman.
  - **Elon Musk** — direta (co-fundador OpenAI 2015; ruptura pública 2018+): parceria inicial de fundação; depois adversário em processos judiciais 2024-2025.
  - **Ilya Sutskever** — direta (co-fundador OpenAI dez/2015; Chief Scientist até mai/2024): parceria científica que definiu a trajetória; a ruptura de nov/2023 (afastamento do board) e mai/2024 (SSI) desfaz o eixo.
  - **Greg Brockman** — direta (co-fundador e President OpenAI; principal parceiro executivo desde 2015).
- **Transmitiu a:**
  - **Mira Murati** — direta (colaboração OpenAI 2018-2024, CTO): interina como CEO durante o afastamento nov/2023 antes de sair em setembro de 2024.
  - **Alec Radford** — direta (colega OpenAI): a estratégia produto-primeiro (ChatGPT nov/2022) refletiu a leitura de Altman.
  - **Geração YC 2011-2019** — indireta: Airbnb, Stripe, DoorDash, Dropbox, Coinbase, Reddit — cohortes que passaram por Altman como president.
  - **"OpenAI diaspora" 2020-2024** — direta: Amodei-irmãos (Anthropic), Sutskever (SSI), Karpathy (Eureka), Radford (permaneceu), Jan Leike (Anthropic), Suchir Balaji (falecido nov/2024).
- **Posição na linhagem `labs-frontier-e-comercializacao`:** elo 1 (o polo OpenAI que gerou as demais defecções) de 4.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  y_combinator_pedagogia:
    descricao: "Presidente do YC de 2014 a 2019; foco em *scaling out* o mais influente acelerador de startups do mundo. Escreveu 'Startup Playbook' (2015) e 'How to Succeed with a Startup' (2018) consolidando a filosofia: (a) construir algo que pessoas realmente querem; (b) crescer 5-7% por semana; (c) focar em produto antes de tudo; (d) fundadores > ideia > mercado; (e) tolerância a rejeição; (f) prazos absurdos aceleram."
    estrutura: [product-market-fit, growth-rate, founder-market-fit, ambitious-mission, radical-focus]
    fonte: "Startup Playbook (playbook.samaltman.com); How to Succeed with a Startup (blog.samaltman.com)"
    ano: 2015
  openai_fundacao_e_missao:
    descricao: "Co-fundou OpenAI em 11 de dezembro de 2015 com Sutskever, Musk, Brockman, Schulman, Zaremba, Karpathy e outros — como sem fins lucrativos com missão de 'garantir que AGI beneficie toda a humanidade'. Compromisso inicial de $1B (Musk, Altman, Thiel, Reid Hoffman, Jessica Livingston, Y Combinator Research, Amazon Web Services, Infosys). Evolui em 2019 para 'capped-profit' (OpenAI LP dentro da OpenAI Nonprofit) para atrair capital de escala."
    estrutura: [missao-AGI-beneficia-humanidade, non-profit-inicial, compromisso-1B, capped-profit-2019, restructuring-2025]
    fonte: "OpenAI Blog 'Introducing OpenAI' (11 de dezembro de 2015); OpenAI Blog 'OpenAI LP' (11 de março de 2019)"
    ano: 2015
  capped_profit_como_estrutura:
    descricao: "Modelo híbrido: OpenAI Nonprofit governa; OpenAI LP (limited partnership) recebe capital de investidores com teto de retorno (inicialmente 100x). Excedente flui à Nonprofit. Objetivo declarado: acesso a capital de escala sem trair missão. Motivou aporte da Microsoft ($1B 2019, $10B 2023, +$4B em 2024-2025)."
    estrutura: [Nonprofit-controle, LP-recebe-capital, teto-de-retorno, microsoft-como-investidor-principal, ex-cesso-a-non-profit]
    fonte: "OpenAI Blog 'OpenAI LP' (11 de março de 2019)"
    ano: 2019
  chatgpt_como_pivô_de_produto:
    descricao: "Em 30 de novembro de 2022, OpenAI lança ChatGPT como demo público. Alcança 1M de usuários em 5 dias e 100M em 2 meses — o produto de crescimento mais rápido da história até então. Marca a transição da OpenAI de laboratório de pesquisa a empresa de produto. Motiva a corrida de labs (Google Bard, Anthropic Claude, Microsoft Copilot)."
    estrutura: [demo-gratuita, GPT-3.5-refinado, RLHF, viralidade, corrida-de-labs]
    fonte: "OpenAI Blog 'Introducing ChatGPT' (30 de novembro de 2022)"
    ano: 2022
  worldcoin_world_network:
    descricao: "Co-fundou Worldcoin em 2019 com Alex Blania e Max Novendstern; missão declarada: prova de humanidade em era de IA via *iris scanning* por dispositivo 'Orb' + token WLD + carteira World App. Rebranded para 'World Network' em 17 de outubro de 2024. Mais de 5M de íris escaneadas até 2024. Banido em vários países (Espanha, Portugal 2024; Quênia 2023) por preocupações de privacidade. Snowden critica publicamente."
    estrutura: [proof-of-humanhood, iris-scanning-Orb, WLD-token, World-App-wallet, rebrand-outubro-2024]
    fonte: "World Network (worldcoin.org / world.org); Reuters 'Sam Altman's rebranded Worldcoin' (17 de outubro de 2024)"
    ano: 2019
  investimentos_de_longo_prazo:
    descricao: "Presidente da Hydrazine Capital (fundada 2012) e investidor pessoal em problemas de energia (Helion Energy — fusão nuclear, ~$375M compromisso), longevidade (Retro Biosciences, $180M compromisso em 2022), interface cérebro-máquina (Neuralink apoio inicial), e biotecnologia. Tese: problemas de escala civilizacional exigem paciência de capital que VC clássico não tem."
    estrutura: [helion-fusion-energy, retro-biosciences-longevity, humane-AI-pin, olpc-thiel-fellowship-network, hydrazine-capital]
    fonte: "Hydrazine Capital; Retro Biosciences press 2022; Helion Energy funding rounds"
    ano: 2012
  moores_law_for_everything:
    descricao: "Ensaio programático (2021) que argumenta: revolução de IA vai reduzir custo marginal de bens e serviços a próximo de zero em décadas; consequência distributiva exige nova estrutura fiscal — American Equity Fund tributando terra e patrimônio corporativo, distribuindo dividendos universais. Tese que sustenta as pesquisas Worldcoin (identidade) + Universal Basic Income (piloto 2019-2024)."
    estrutura: [custo-marginal-cai, imposto-sobre-terra-e-equity, dividendo-universal, worldcoin-como-identidade, longo-prazo-décadas]
    fonte: "Moore's Law for Everything (moores.samaltman.com), março 2021"
    ano: 2021
  the_gentle_singularity:
    descricao: "Ensaio publicado mid-2025: 'estamos além do event horizon; o takeoff começou'. Enuncia trajetória: 2025 = agents de trabalho cognitivo real; 2026 = insights científicos novos; 2027 = robôs físicos úteis; anos 2030 = inteligência e energia abundantes. Custo por consulta ChatGPT declarado: 0.34 Wh e 0.000085 galões de água. Compromisso público com pacto: (1) resolver alinhamento; (2) tornar superinteligência barata + distribuída."
    estrutura: [event-horizon-passado, previsao-anual-2025-2027, custo-energetico-declarado, alinhamento-antes-de-distribuir, sociedade-adapta-a-quase-tudo]
    fonte: "The Gentle Singularity (blog.samaltman.com/the-gentle-singularity), 10 de junho de 2025"
    ano: 2025
obras_fonte:
  - titulo: "Introducing OpenAI"
    ano: 2015
    tipo: primaria
    o_que_traz: "Blog OpenAI, 11 de dezembro de 2015. Anúncio de fundação com $1B em compromissos, missão AGI-beneficia-humanidade, e lista de co-fundadores."
  - titulo: "OpenAI LP"
    ano: 2019
    tipo: primaria
    o_que_traz: "Blog OpenAI, 11 de março de 2019. Anúncio da transição para capped-profit; explica estrutura híbrida Nonprofit + LP."
  - titulo: "Startup Playbook"
    ano: 2015
    tipo: primaria
    o_que_traz: "playbook.samaltman.com. Guia de 30+ páginas com filosofia YC operacionalizada — a bíblia informal do movimento startup 2015-2020."
  - titulo: "Moore's Law for Everything"
    ano: 2021
    tipo: primaria
    o_que_traz: "moores.samaltman.com, março 2021. Ensaio programático sobre implicações distributivas de IA + UBI + tributação de patrimônio."
  - titulo: "How to Succeed with a Startup"
    ano: 2018
    tipo: primaria
    o_que_traz: "blog.samaltman.com. Consolidação de aprendizados YC como president 2014-2019."
  - titulo: "Introducing ChatGPT"
    ano: 2022
    tipo: primaria
    o_que_traz: "Blog OpenAI, 30 de novembro de 2022. Anúncio de ChatGPT como demo público — inflexão do campo."
  - titulo: "The Merge"
    ano: 2017
    tipo: primaria
    o_que_traz: "blog.samaltman.com, dezembro 2017. Especulação sobre fusão humano-máquina em décadas."
  - titulo: "Reflections"
    ano: 2025
    tipo: primaria
    o_que_traz: "blog.samaltman.com/reflections, janeiro 2025. Balanço da década OpenAI + agenda 2025+ superinteligência."
  - titulo: "The Gentle Singularity"
    ano: 2025
    tipo: primaria
    o_que_traz: "blog.samaltman.com/the-gentle-singularity, 10 de junho de 2025. Manifesto de trajetória 2025-2030 com custo energético declarado e pacto de dois passos (alinhamento → distribuição)."
principios_verificados:
  - texto: "Nasceu em 22 de abril de 1985 em Chicago; criado em St. Louis; frequentou John Burroughs School; entrou em Stanford em Ciência da Computação em 2003 e evadiu em 2005 para co-fundar Loopt (aplicativo de localização social)."
    fonte: "Wikipedia Sam Altman (verificado contra Britannica biography); TechCrunch cobertura Loopt 2005-2012"
    rotulo: DOCUMENTADO
  - texto: "Loopt foi vendida à Green Dot Corporation em março de 2012 por US$ 43,4 milhões."
    fonte: "TechCrunch 'Green Dot Acquires Loopt' — 9 de março de 2012; SEC filings"
    rotulo: DOCUMENTADO
  - texto: "Foi parceiro na Y Combinator a partir de 2011; nomeado presidente em fevereiro de 2014 (sucedendo Paul Graham); deixou a presidência em março de 2019 para dedicar-se integralmente à OpenAI."
    fonte: "Y Combinator Blog 'Sam Altman for President' (21 fev 2014); TechCrunch cobertura março 2019"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou OpenAI em 11 de dezembro de 2015 (com Sutskever, Musk, Brockman, Schulman, Zaremba, Karpathy, Vicki Cheung, Trevor Blackwell, Pamela Vagata, Durk Kingma) como organização sem fins lucrativos."
    fonte: "OpenAI Blog 'Introducing OpenAI' — 11 dez 2015"
    rotulo: DOCUMENTADO
  - texto: "Tornou-se CEO da OpenAI em 2019, quando a estrutura capped-profit foi lançada (11 de março de 2019); Musk saiu do board em fevereiro de 2018."
    fonte: "OpenAI Blog 'OpenAI LP' — 11 mar 2019; OpenAI Blog Musk departure fev 2018"
    rotulo: DOCUMENTADO
  - texto: "Em 17 de novembro de 2023, o board da OpenAI (Sutskever, Toner, McCauley, D'Angelo) afastou Altman; Mira Murati foi CEO interina; funcionários ameaçaram sair em massa (~700 assinaram carta); Altman foi reintegrado em 21 de novembro de 2023 com novo board (Bret Taylor chair, Larry Summers, D'Angelo)."
    fonte: "Wikipedia 'Removal of Sam Altman from OpenAI'; WSJ 'The Real Story Behind Sam Altman Firing'; OpenAI Blog 21 nov 2023"
    rotulo: DOCUMENTADO
  - texto: "OpenAI completou restructuring em 2025 para Public Benefit Corporation (PBC); fundação Nonprofit passou a deter stake de ~$130B; Microsoft detém stake de ~$135B."
    fonte: "OpenAI Blog restructuring announcement 2025; TIME 'OpenAI Timeline'"
    rotulo: DOCUMENTADO
  - texto: "Co-fundou Worldcoin (agora World Network) em 2019 com Alex Blania e Max Novendstern; empresa rebranded em 17 de outubro de 2024; mais de 5M de íris escaneadas até 2024; banida em Espanha, Portugal (2024) e Quênia (2023)."
    fonte: "Reuters 'Sam Altman's rebranded Worldcoin' — 17 out 2024; world.org corporate history; Wikipedia World Network"
    rotulo: DOCUMENTADO
  - texto: "É presidente da Hydrazine Capital (2012); investidor destacado em Helion Energy (fusão nuclear, ~$375M compromisso pessoal declarado), Retro Biosciences (longevidade, $180M em 2022), Neuralink, Reddit, Airbnb, Stripe."
    fonte: "Hydrazine Capital; Retro Biosciences press 2022; Fortune profiles"
    rotulo: DOCUMENTADO
  - texto: "Elon Musk moveu processos contra OpenAI e Altman em fev/2024 e ago/2024 alegando quebra de contrato de fundação (OpenAI ser sem fins lucrativos) e violação de dever fiduciário."
    fonte: "TIME 'OpenAI Timeline: Musk, Altman' (2025); Court filings Musk v. Altman/OpenAI 2024"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Sam Altman inventou ChatGPT / GPT / OpenAI." | REFUTADO | ChatGPT é engenharia coletiva (Radford, Ouyang, Weng, Christiano, e ~50 outros). GPT é linhagem Radford-Sutskever. OpenAI foi co-fundada por 11 pessoas. Altman como CEO+presidente executa estratégia e capta capital; não é técnico. |
| "O board o afastou porque ele estava mentindo sobre pesquisa perigosa (Q*)." | DISPUTADO | Rumor Q* (Reuters, 22 nov 2023) sugeria que descobertas de raciocínio matemático teriam alarmado o board. Nunca confirmado publicamente pelos membros do board. WSJ (2024) atribui a "quebra de confiança" e "comunicação obstrutiva", não a Q* específico. Toner citou (mai 2024) "outright lying" mas sem exemplo público concreto de Q*. |
| "Sutskever traiu Altman em 2023 por egoísmo." | DISPUTADO | Sutskever votou no afastamento como board member preocupado com governança + comercialização apressada (WSJ cobertura). Assinou carta pedindo reintegração dias depois: "I deeply regret my participation in the board's actions". Reduzir a "traição" ignora contexto governance-safety. |
| "Altman fez fortuna vendendo OpenAI para Microsoft." | REFUTADO | Altman declara não deter stake em OpenAI (declaração pública repetida em depoimentos ao Congresso mai 2023 e testemunho executivo 2024). Sua fortuna vem de Hydrazine Capital, Reddit, Airbnb, Stripe e outros investimentos. Wired e Fortune debateram a acurácia da declaração — sem prova de stake oculto. |
| "Worldcoin é esquema para dominar identidade global via cripto." | DISPUTADO | Preocupações reais e documentadas (Snowden, EFF, reguladores em Espanha/Portugal/Quênia). Missão declarada é 'proof of humanhood' em era de IA. Bad-faith framing ("dominar") atribui intenção sem prova; concerns técnicas específicas (retenção de dado biométrico, incentivo econômico em países pobres) são legítimas mas separadas. |
| "Altman previu AGI para 2025 múltiplas vezes." | DOCUMENTADO_MAS_MATIZADO | Em Reflections (jan 2025) e The Gentle Singularity (jun 2025) diz "estamos além do event horizon"; em 2024 disse "AGI-like systems in a few years". Não é data específica; é *ordem de magnitude*. Reduzir a "2025" é atalho. |
| "Sister Annie Altman prova que Sam é criminoso." | DISPUTADO | Annie Altman moveu processo civil (janeiro 2025) alegando abuso 1997-2006 na casa de família em St. Louis. Sam denies e contesta; processo em fase inicial em 2025-2026. Não há veredicto criminal; alegações são civis e disputadas. Familiares (mãe Connie, irmão Jack) contradizem publicamente Annie. Situação em aberto — o Liceu trata a *obra intelectual* de Altman; controvérsia familiar é notícia, não obra, e requer cautela extrema. |
| "Altman escreveu The Gentle Singularity para justificar tomada de poder." | FOLCLORE | O ensaio (jun 2025) é otimista sobre trajetória IA + pacto de dois passos (alinhamento antes de distribuição). Ler como "justificativa de poder" é interpretação hostil sem base textual — o pacto explícito é "não concentrar com pessoa, empresa ou país". |
| "OpenAI é apenas fachada da Microsoft." | DISPUTADO | Microsoft detém stake de ~$135B (após restructuring 2025) mas OpenAI opera com board independente + missão Nonprofit + investidores múltiplos (Thrive, Founders Fund, Sequoia, Sovereign wealth funds). "Fachada" é simplificação; "parceiro estratégico dominante" é preciso. |
| "Altman é 'evangelista de AGI' sem substância técnica." | DISPUTADO | Não é técnico (não escreveu papers de arquitetura); é executivo. Argumentar que "sem paper = sem substância" ignora seu papel de estratégia + captação + política. Justo ou não, o campo o trata como figura central em 2025-2026. |
| "Elon Musk tem razão nos processos judiciais 2024." | DISPUTADO | Processos alegam quebra de contrato de fundação (missão nonprofit). Defesa da OpenAI aponta emails 2015-2018 mostrando Musk propôs a transição para for-profit + fusão com Tesla + rejeição por Altman. Casos em curso — decisões pendentes. |
| "Altman foi banido pelo pai / não tem PhD por má formação." | FOLCLORE | Deixou Stanford por escolha para fundar Loopt aos 19 anos. Não há evidência de conflito familiar. Tem irmão Jack (colega VC) e Max (empreendedor). Especulação sem base. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **Pesquisa AI sem produto que gere receita para financiar pesquisa.** A transição capped-profit (2019) e ChatGPT (2022) são atos programáticos contra "só pesquisa sem plano de captura".
- **Missão AGI centralizada em uma empresa privada sem contrapeso.** Retorica repetida em ensaios: distribuir superinteligência amplamente. Rejeitaria a monopolização por 1-2 labs.
- **Governança acadêmica pura sobre laboratório de fronteira.** O board de 2023 (Toner, McCauley) era predominantemente ex-academia; Altman defendeu (implicitamente) governance com peso de operadores.
- **Timeline conservadora de AGI.** Ensaios recentes (2024-2025) rejeitam o "AGI está longe". Fricção pública com LeCun e Ng.
- **Cautela regulatória preemptiva que impeça deploy.** Testemunho ao Congresso EUA mai 2023 e UK Bletchley Park nov 2023 defende regulação *contextual*, não *preemptiva*.
- **Democratização sem prova de humanidade.** Worldcoin é resposta programática — em era de IA, verificar humanidade é infraestrutura. Rejeitaria "não precisamos disso".
- **Distribuição de riqueza por caridade em vez de estrutural.** Moore's Law for Everything (2021) argumenta por reforma fiscal, não filantropia.
- **Fundadores que aceitam "menos ambicioso" para agradar VCs.** YC Playbook: "grow 5-7% weekly"; ambição infinita como norma.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "AGI benefits all of humanity" | OpenAI charter (2018); repetido em todo ensaio. |
| "capped-profit" | OpenAI LP announcement (mar 2019). |
| "event horizon" (da singularidade) | The Gentle Singularity (jun 2025). |
| "intelligence too cheap to meter" | The Gentle Singularity; ecoa "electricity too cheap to meter" de Lewis Strauss 1954. |
| "the merge" | ensaio homônimo (dez 2017). |
| "abundance" | ensaios 2024-2025. |
| "proof of humanhood" | World Network / Worldcoin. |
| "American Equity Fund" | Moore's Law for Everything (2021). |
| "extraordinary luck" | várias entrevistas — auto-caracterização como "beneficiário sortudo". |
| "wonders become routine, then table stakes" | The Gentle Singularity. |
| "grow 5-7% weekly" | YC / Startup Playbook (2015). |
| "make something people want" | YC pedagogy (herdada de Paul Graham). |

**Padrões linguísticos:** blog casual e direto (blog.samaltman.com — parágrafos curtos, sem formatação floreada, links raros); em testemunhos ao Congresso (mai 2023) e keynotes (OpenAI DevDay 2023, 2024), voz calma quase monótona; frequentemente auto-depreciativo em entrevistas; escreve na primeira pessoa do singular com desenvoltura ("I think", "I hope", "I'm not sure"); usa lista numerada em ensaios estratégicos (Moore's Law, Gentle Singularity); ativo em X/Twitter (@sama) com posts curtos e ocasionais; presença física discreta contrasta com escala das apostas. Em fricção pública (Musk lawsuits, Toner critique, Annie Altman), respostas curtas ou por advogado.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "product-first + missão de longo prazo" — a Kolden opera com produto real hoje mas horizonte de década; passo "capped-profit-like como estrutura" — receita capturada tem teto de rentabilidade para não trair missão; passo "distribuição ampla como veto" — nenhum agent Kolden deve concentrar poder em um usuário/empresa/país; passo "product roadmap acompanha capability roadmap" — quando o modelo base melhora, o produto Kolden expande capacidades imediatamente).
- **Squads que consomem:** Caos (o Ritual = YC-para-agents; ambição infinita + growth semanal), Prometeu (arquitetura de inferência: OpenAI é benchmark de qualidade + latência + custo por token), Dedalo (multi-agente com missão declarada), Hermes (multi-plataforma como distribuição), Égide (safety pós-2023 informa pacto Kolden: alinhamento antes de distribuir), Olimpo (governança executiva com contrapesos — não replicar board OpenAI 2023).
- **Pergunta operacional que injeta no fluxo:** "Este agent Kolden gera valor mensurável para o usuário *hoje*, ou é só research demo? Se for demo, precisa de plano de captura em 90 dias — senão, mesmo com missão nobre, morre por falta de receita."

## 8. Como Sam Altman Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Escolhe apostas de longo prazo com paciência de capital.** Fusion (Helion), longevidade (Retro), superinteligência (OpenAI), identidade (Worldcoin) — décadas de horizonte, capital paciente.
2. **Combina pesquisa de vanguarda com produto de massa.** OpenAI é ChatGPT + GPT-5 + Sora + investimento científico. A estratégia é: pesquisa financia produto, produto financia pesquisa.
3. **Levanta capital em escala civilizacional.** $1B fundação → $13B Microsoft → $500B+ compromissos infra (Stargate, jan 2025). Nunca fica sem opção de escala.
4. **Terceiriza técnica; comanda estratégia.** Não escreve código de arquitetura; comanda captação, roadmap, política, comunicação. Sutskever/Radford/Amodei-antes eram os técnicos.
5. **Blog como veículo estratégico.** blog.samaltman.com aparece com ensaio programático a cada ~2 anos; cada um define horizonte discursivo do campo.
6. **Testemunha ao Congresso e a chefes de estado.** Regulação como direção declarada (Congress mai 2023, UK Bletchley nov 2023, UAE 2024). Molda o ambiente regulatório em vez de esperar.
7. **Trata board como componente de sistema, não como oversight.** A reformulação do board pós-nov/2023 (Bret Taylor chair, Larry Summers, D'Angelo, Sue Desmond-Hellmann, Nicole Seligman, Fidji Simo, Adebayo Ogunlesi) é reengenharia deliberada.
8. **Aceita polêmica pública sem responder na maior parte do tempo.** Musk lawsuits, Toner critique, Annie Altman — respostas curtas ou por advogados; ele continua trabalho.
9. **Mantém rede sólida de operadores próximos.** Brockman (President), Murati (2018-2024), Weil (CFO), Lightcap (COO); parcerias longas.
10. **Escreve para daqui a 20 anos.** Reflections (jan 2025), Gentle Singularity (jun 2025) são cartas para futura leitura — establecem precedente narrativo antes que se possa medir os fatos.

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
