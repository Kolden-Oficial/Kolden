---
cliente: "EntreSolos"
slug: "entresolos"
squad: "Peitho"
agente: "kasim-aslam"
documento: "Runbook operacional — subir a campanha de Search no painel do Google Ads (passo a passo)"
status: "runbook"
atualizado_em: "2026-06-26"
fonte: "entresolos-google-ads-blueprint.md · entresolos-google-ads-rsas.md · entresolos-google-ads-config.md (IDs verificados ao vivo) + contexto confirmado na sessão 2026-06-26"
---

# Runbook — subir a campanha de Search no Google Ads (EntreSolos)

> Passo a passo **operacional** ("clicar e colar") para o Ronan montar manualmente, no painel
> (`ads.google.com`), a(s) campanha(s) de **Pesquisa** do EntreSolos. Consolida a estratégia do
> blueprint, os RSAs já validados e os IDs verificados ao vivo. **Não inventa dados** — onde algo não
> consta nas fontes, está marcado **(definir — não consta no blueprint)**.
>
> **Escopo deste runbook:** as duas campanhas de **Search** da Onda 1 — `ES · Search · Intenção-Núcleo`
> (motor, 5 grupos) e `ES · Search · Branded` (proteção de marca). As campanhas **Smart (GBP)** e
> **Remarketing (Display)** do blueprint **não** são Search e ficam **fora deste runbook** (fase
> posterior). Nota: o **GA4 já coleta** (consertado 2026-06-26 — pageviews/eventos validados no Realtime),
> então o remarketing fica viável conforme as audiências acumularem; só não está no escopo Search de hoje.
>
> **KPI inviolável do Peitho:** zero publicação sem ordem explícita do Ronan. Este documento é montagem
> pronta; **só ativar** após o checklist final (§7) e o OK do Ronan.

---

## 1. Pré-checagem (antes de abrir "Nova campanha")

Confirmar tudo abaixo **no topo da conta certa** — montar na conta errada é o erro mais caro:

- [ ] **Conta operacional correta:** `507-051-8419` (`5070518419`). É a conta confirmada pelo Ronan
      (2026-06-25) como a do EntreSolos onde a campanha sobe. Conferir o ID no canto superior do painel
      antes de qualquer clique.
- [ ] **Idioma/moeda da conta:** PT-BR, **BRL**. (A conta opera em BRL nativamente — preferível ao
      Synter, que cria orçamento em USD.)
- [ ] **Conversão de lead primária ativa:** `Lead - Formulário` —
      `AW-18253549519`, label `hBrQCOSfjsYcEM-f_P9D`, dispara via **GTM no envio do formulário**.
      Em **Metas → Conversões**, confirmar que está **Primária** ("usada para otimização") e recebendo
      (ou pronta para receber) dados. **Esta é a conversão que a campanha vai otimizar.**
- [ ] **Tag automática (auto-tagging) LIGADA:** Configurações da conta → "Marcação automática" →
      `gclid` habilitado. Sem isso, conversões não casam com cliques.
- [ ] **Faturamento OK:** método de pagamento ativo e sem pendências (Faturamento → Resumo).
- [ ] **Domínio:** todos os Final/Display URLs usam `https://www.entresolo.com.br` (o `www` responde
      200; o apex foi corrigido em 2026-06-26 com 301 apex→www — config §3, já resolvido).
- [ ] **Fundação (atualizado 2026-06-26):** o **GA4 já coleta** (tag publicada + eventos `generate_lead`/
      `contato_whatsapp`/`clique_ligar` validados no Realtime) e a conta operacional está vinculada ao GA4.
      A campanha de Search otimiza pela conversão de Ads `Lead - Formulário` (não depende do GA4) — pode subir.

---

## 2. Configuração da campanha (`ES · Search · Intenção-Núcleo`)

No painel: **+ Nova campanha**.

| Campo | Valor a aplicar | Origem |
|---|---|---|
| **Objetivo** | Leads (Clientes potenciais) | blueprint §4.1 |
| **Tipo de campanha** | **Pesquisa (Search)** | §4.1 |
| **Meta de conversão da campanha** | Usar conversões da conta → **manter só `Lead - Formulário`** como meta de otimização (remover metas de conta que não se apliquem) | contexto sessão + §2.1 |
| **Formas de conversão** | Não marcar "Visitas ao site" como objetivo; o foco é o lead do formulário | §4.1 |
| **Nome da campanha** | `ES · Search · Intenção-Núcleo` | §4 |
| **Redes** | **Só Rede de Pesquisa.** DESmarcar "Incluir parceiros de pesquisa" e **DESmarcar "Incluir Rede de Display"** | §4.1 |
| **Locais** | "Inserir outro local" → raio de **~150 km de Vespasiano/MG**, OU adicionar as cidades: Belo Horizonte, Contagem, Betim, Nova Lima, Vespasiano, Lagoa Santa, Ribeirão das Neves, Sabará, Sete Lagoas, Brumadinho, Igarapé, São José da Lapa, Jaboticatubas | §3 |
| **Opções de local (CRÍTICO)** | Em "Opções de local" escolher **"Presença: pessoas que estão ou frequentam regularmente os locais segmentados"**. **NUNCA** "Presença ou interesse" | §3 |
| **Idioma** | **Português** | §4.1 |
| **Orçamento diário** | **~R$ 20,00/dia** (deriva dos R$ 600/mês = 60% de R$ 1.000) | §4.1 / §5 |
| **Estratégia de lances** | **Início = "Maximizar cliques" com limite de CPC ~R$ 4,00** (princípio Kasim "You vs. Google": não entregar o Smart Bidding ao Google sem dados). **Migrar para "Maximizar conversões" e depois tCPA** ancorado no CPL observado **após acumular ~15–30 conversões** | §4.1 (Fase 1/Fase 2), §6 |
| **Ajuste de lance por cidade** | Opcional: **+0% a +15%** nas praças de maior ticket histórico | §3 |

> **Decisão a confirmar com o Ronan antes de subir:** o blueprint manda começar em *Maximizar cliques*
> (controle manual). Como a conversão `Lead - Formulário` **já existe e está primária**, há a
> alternativa de já iniciar em **Maximizar conversões** (deixando o Google otimizar pelo lead desde o
> dia 1). O blueprint recomenda a via manual primeiro; a escolha final é do Ronan. **Padrão deste
> runbook = seguir o blueprint (Maximizar cliques, teto CPC R$ 4).**

### 2.1 Palavras-chave negativas (lista compartilhada — aplicar à campanha)
Criar em **Ferramentas → Palavras-chave negativas → Lista** (nome sugerido `ES · Negativas Search`) e
associar a esta campanha **e** à Branded. Termos (blueprint §4.1):

```
curso, cursos, como fazer, passo a passo, apostila, pdf, emprego, vaga, vagas, salário,
concurso, grátis, gratis, download, licenciamento ambiental, revista,
aluguel de equipamento, alugar sonda, usado, trabalhe conosco
```
> `revista` e `licenciamento ambiental` bloqueiam a colisão de nome com homônimas editorial/ambiental.

---

## 3. Grupos de anúncios — `ES · Search · Intenção-Núcleo`

Criar **5 grupos**, um por silo. Match types iniciais: **frase + exata** (ampla só depois, sob Smart
Bidding maduro). Cada keyword exata da semente também entra como frase para captar variações.

Convenção abaixo: `[exata]` · `"frase"`.

### Grupo 1 — Sondagem de Solo
- **Landing page (Final URL):** `https://www.entresolo.com.br/mg/sondagem-de-solo/`
- **Keywords:** `[sondagem de solo]` · `"sondagem de solo"` · `"sondagem do solo"` · `"empresa de sondagem de solo"` · `"sondagem de solo spt"`

### Grupo 2 — Sondagem SPT
- **Landing page:** `https://www.entresolo.com.br/mg/sondagem-de-solo/o-que-e`
- **Keywords:** `[sondagem spt]` · `"sondagem spt"` · `"spt sondagem"` · `"sondagem a percussão"` · `[ensaio spt]`

### Grupo 3 — Perfuração de Solo
- **Landing page:** `https://www.entresolo.com.br/mg/perfuracao-de-solo/`
- **Keywords:** `[perfuração de solo]` · `"perfuração de solo"` · `"perfuração de solo spt"` · `"empresa de perfuração de solo"`

### Grupo 4 — Orçamento / Custo (alta intenção)
- **Landing page:** `https://www.entresolo.com.br/mg/sondagem-de-solo/custos`
- **Keywords:** `"sondagem de solo preço"` · `"sondagem spt valor"` · `"orçamento sondagem de solo"` · `"quanto custa sondagem de solo"`

### Grupo 5 — Investigação Geotécnica / Laudo
- **Landing page:** `https://www.entresolo.com.br/mg/sondagem-de-solo/normas-tecnicas`
- **Keywords:** `"investigação geotécnica"` · `"laudo de sondagem"` · `"relatório de sondagem"` · `"laudo spt"`

---

## 4. RSAs para colar (2 por grupo)

> Regras (limites Google): título ≤ 30 caracteres (até 15 por RSA), descrição ≤ 90 (até 4 por RSA),
> caminho de exibição 2 campos ≤ 15. **Fixar (pin) só 1–2 títulos na Posição 1** (a keyword); deixar o
> resto solto. Meta de Força do Anúncio: "Boa"/"Excelente". **Não super-fixar.**
>
> O arquivo de RSAs traz **um conjunto de 15 títulos + 4 descrições por grupo**. Para rodar **2 RSAs
> por grupo** (exigência do blueprint), criar o RSA #1 com os 15 títulos abaixo e o RSA #2 **variando a
> ordem/seleção** dos mesmos títulos (mesmo banco aprovado, sem violar limites). Conteúdo abaixo copiado
> fielmente de `entresolos-google-ads-rsas.md`.

### Grupo 1 — Sondagem de Solo
**Caminho de exibição:** `Sondagem-Solo` · `MG` · **Final URL:** `https://www.entresolo.com.br/mg/sondagem-de-solo/`

Títulos (pinar #1 e #2 na **Posição 1**):
```
1.  Sondagem de Solo em MG        (Pos. 1)
2.  Sondagem de Solo c/ ART       (Pos. 1)
3.  Empresa de Sondagem de Solo
4.  12 Anos de Experiência
5.  +1.000 Furos Executados
6.  Laudo Técnico com ART
7.  Conforme ABNT NBR 6484
8.  Atendemos Toda a RMBH
9.  Orçamento no WhatsApp
10. Aprovação na Prefeitura
11. Segurança na Fundação
12. Economia na Sua Obra
13. Laudo Completo de Solo
14. Sondagem à Percussão SPT
15. Fale com Especialistas
```
Descrições:
```
1. Especialistas em SPT com 12 anos e +1.000 furos. Laudo completo com ART e NBR 6484.
2. Segurança estrutural e economia na obra. Atendimento ágil em toda a RMBH.
3. Receba seu orçamento de sondagem de solo pelo WhatsApp. Relatório para seu calculista.
4. Da casa ao galpão industrial: a investigação geotécnica que sua obra precisa.
```

### Grupo 2 — Sondagem SPT
**Caminho de exibição:** `Sondagem-SPT` · `MG` · **Final URL:** `https://www.entresolo.com.br/mg/sondagem-de-solo/o-que-e`

Títulos (pinar #1 e #2 na **Posição 1**):
```
1.  Sondagem SPT em MG            (Pos. 1)
2.  Ensaio SPT à Percussão        (Pos. 1)
3.  Sondagem SPT com Laudo
4.  Sondagem à Percussão SPT
5.  12 Anos de Experiência
6.  +1.000 Furos Executados
7.  Laudo Técnico com ART
8.  Conforme ABNT NBR 6484
9.  Atendemos Toda a RMBH
10. Orçamento no WhatsApp
11. Perfis de Solo e Gráficos
12. Aprovação na Prefeitura
13. Ensaio SPT com Laudo
14. Relatório para Calculista
15. Fale com Especialistas
```
Descrições:
```
1. Sondagem SPT à percussão com laudo técnico e ART. 12 anos e +1.000 furos em MG.
2. Ensaio SPT conforme ABNT NBR 6484. Perfis de solo e gráficos para seu calculista.
3. Peça seu orçamento de sondagem SPT pelo WhatsApp. Atendimento ágil em toda a RMBH.
4. Segurança estrutural e economia na obra. Da residência ao galpão industrial.
```

### Grupo 3 — Perfuração de Solo
**Caminho de exibição:** `Perfuracao` · `MG` · **Final URL:** `https://www.entresolo.com.br/mg/perfuracao-de-solo/`

Títulos (pinar #1 e #2 na **Posição 1**):
```
1.  Perfuração de Solo em MG      (Pos. 1)
2.  Empresa de Perfuração         (Pos. 1)
3.  Perfuração de Solo c/ ART
4.  Perfuração e Sondagem
5.  12 Anos de Experiência
6.  +1.000 Furos Executados
7.  Laudo Técnico com ART
8.  Conforme ABNT NBR 6484
9.  Atendemos Toda a RMBH
10. Orçamento no WhatsApp
11. Equipe Técnica Própria
12. Aprovação na Prefeitura
13. Segurança na Fundação
14. Economia na Sua Obra
15. Fale com Especialistas
```
Descrições:
```
1. Perfuração de solo com equipe técnica e laudo completo. Atendimento em toda a RMBH.
2. 12 anos de experiência e +1.000 furos. Orçamento rápido pelo WhatsApp.
3. Perfuração e sondagem com ART e conformidade ABNT NBR 6484. Fale com especialistas.
4. Segurança estrutural e economia na obra. Da residência ao galpão industrial.
```

### Grupo 4 — Orçamento / Custo
**Caminho de exibição:** `Orcamento` · `Sondagem` · **Final URL:** `https://www.entresolo.com.br/mg/sondagem-de-solo/custos`

Títulos (pinar #1 e #2 na **Posição 1**):
```
1.  Sondagem de Solo: Preço       (Pos. 1)
2.  Orçamento de Sondagem         (Pos. 1)
3.  Peça Seu Orçamento
4.  Quanto Custa a Sondagem
5.  Orçamento no WhatsApp
6.  Preço Justo por Furo
7.  Sem Surpresas no Custo
8.  12 Anos de Experiência
9.  +1.000 Furos Executados
10. Laudo Técnico com ART
11. Atendemos Toda a RMBH
12. Conforme ABNT NBR 6484
13. Resposta Rápida
14. Orçamento Sem Compromisso
15. Fale com Especialistas
```
Descrições:
```
1. Peça o custo da sua sondagem de solo e receba o orçamento direto no WhatsApp.
2. Preço justo por furo, sem surpresas. 12 anos e +1.000 furos executados em MG.
3. Laudo completo com ART e NBR 6484. Atendimento ágil em toda a RMBH.
4. Saiba quanto custa sua sondagem em minutos. Fale com especialistas agora.
```

### Grupo 5 — Investigação Geotécnica / Laudo
**Caminho de exibição:** `Geotecnica` · `Laudo` · **Final URL:** `https://www.entresolo.com.br/mg/sondagem-de-solo/normas-tecnicas`

Títulos (pinar #1 e #2 na **Posição 1**):
```
1.  Investigação Geotécnica      (Pos. 1)
2.  Laudo de Sondagem c/ ART     (Pos. 1)
3.  Relatório de Sondagem
4.  Laudo SPT Completo
5.  Conforme ABNT NBR 6484
6.  12 Anos de Experiência
7.  +1.000 Furos Executados
8.  Perfis de Solo e Gráficos
9.  Recomendações ao Calculista
10. Atendemos Toda a RMBH
11. Orçamento no WhatsApp
12. Laudo com ART Emitida
13. Aprovação na Prefeitura
14. Segurança na Fundação
15. Fale com Especialistas
```
Descrições:
```
1. Investigação geotécnica com laudo técnico, ART e conformidade ABNT NBR 6484.
2. Perfis de solo, gráficos SPT e recomendações ao calculista. Atende toda a RMBH.
3. Relatório de sondagem completo para aprovação na prefeitura. Peça pelo WhatsApp.
4. 12 anos e +1.000 furos executados em Minas Gerais. Fale com especialistas.
```

---

## 5. Assets / extensões (nível da campanha Intenção-Núcleo)

Em **Recursos (Assets)** da campanha, adicionar (blueprint §4.1):

**Sitelinks (4)** — com descrições (cada linha ≤ 35 caracteres, dentro do limite do Google Ads):

| Texto | Descrição linha 1 | Descrição linha 2 | Final URL |
|---|---|---|---|
| Orçamento | Receba seu orçamento em 5 minutos | Sem compromisso, resposta rápida | `https://www.entresolo.com.br/mg/sondagem-de-solo/orcamento` |
| Custos | Quanto custa a sondagem SPT | Fatores que influenciam o preço | `https://www.entresolo.com.br/mg/sondagem-de-solo/custos` |
| Normas & ART | Laudo conforme ABNT NBR 6484 | Relatório técnico com ART | `https://www.entresolo.com.br/mg/sondagem-de-solo/normas-tecnicas` |
| Estudos de caso | Projetos reais que executamos | Veja resultados de sondagem | `https://www.entresolo.com.br/mg/sondagem-de-solo/estudos-de-caso` |

> Descrições rascunhadas pela Kolden (2026-06-26); ajuste o tom se quiser. As duas linhas são opcionais no painel, mas recomendadas (ocupam mais espaço no anúncio e aumentam o CTR).

**Frases de destaque (callouts):**
```
Laudo com ART · ABNT NBR 6484 · 12 anos de experiência · +1.000 furos · Atende RMBH · Orçamento sem compromisso
```

**Snippets estruturados:** Cabeçalho **"Serviços"** →
`Sondagem SPT, Perfuração, Investigação geotécnica, Laudo técnico`.

**Extensão de chamada (telefone):** `(31) 99223-8963`.

**Extensão de local:** vincular ao **GBP verificado** do cliente (Perfil da Empresa do Google).

**Extensão de formulário de lead:** ativar **se disponível na conta** (opcional).

> O blueprint cita também o WhatsApp `wa.me/5531992238963` como ímã de fundo de funil, porém o
> rastreamento de clique no WhatsApp **ainda não existe no GTM** (config §2.1). Usar o WhatsApp nos
> textos (já está nos RSAs) é ok; **não** depender dele como conversão por enquanto.

---

## 6. Campanha `ES · Search · Branded` (segunda campanha de Search)

Nova campanha de Pesquisa, mesma geo/idioma/redes da §2. Orçamento e lances próprios.

| Campo | Valor |
|---|---|
| **Nome** | `ES · Search · Branded` |
| **Orçamento diário** | **~R$ 2,60/dia** (R$ 80/mês = 8% de R$ 1.000) |
| **Meta de conversão** | mesma `Lead - Formulário` |
| **Estratégia de lance** | CPC baixo (marca custa pouco); pode começar em Maximizar cliques com teto baixo. CPL alvo **< R$ 15** |
| **Negativas** | aplicar a mesma lista `ES · Negativas Search` |

**Grupo único — Branded**
- **Keywords (exata + frase):** `[entresolos]` · `[entresolo]` · `"entre solos sondagem"` · `"entresolos sondagem"` · `"entresolos vespasiano"`
- **Final URL:** `https://www.entresolo.com.br/`
- **Caminho de exibição:** `EntreSolos` · `Oficial`

**RSA Branded — títulos** (pinar #1 e #2 na Posição 1):
```
1.  EntreSolos Oficial            (Pos. 1)
2.  EntreSolos Sondagem           (Pos. 1)
3.  EntreSolos — Sondagem MG
4.  Site Oficial EntreSolos
5.  Sondagem SPT e Perfuração
6.  12 Anos de Experiência
7.  +1.000 Furos Executados
8.  Laudo Técnico com ART
9.  Atendemos Toda a RMBH
10. Orçamento no WhatsApp
11. Conforme ABNT NBR 6484
12. Fale com a EntreSolos
13. Especialistas em SPT
14. Aprovação na Prefeitura
15. Atendimento Ágil
```
**RSA Branded — descrições:**
```
1. Site oficial da EntreSolos. Sondagem SPT e perfuração de solo com 12 anos em MG.
2. Fale direto com a EntreSolos no WhatsApp. Laudo com ART e atendimento em toda a RMBH.
3. Especialistas em SPT: +1.000 furos executados e conformidade ABNT NBR 6484.
4. Segurança estrutural e economia na obra. Peça seu orçamento sem compromisso.
```
Assets: reaproveitar sitelink **Orçamento** + extensão de chamada (§5).

---

## 7. Conversão & tracking (confirmar na campanha)

- [ ] A(s) campanha(s) otimiza(m) pela conversão **`Lead - Formulário`** (`AW-18253549519` /
      `hBrQCOSfjsYcEM-f_P9D`), marcada como **Primária**. É a única meta de otimização desejada.
- [ ] Auto-tagging (`gclid`) ligado (§1) — sem ele a conversão não é atribuída.
- [ ] **Enhanced Conversions for Leads:** o trigger `enhanced_conversion` já existe no GTM e o GA4 já
      coleta (2026-06-26) — ativável na ação de conversão (Ads → Conversões → Lead - Formulário →
      Enhanced Conversions). Recomendado ligar; não bloqueia o Search.
- [ ] **Remarketing/Display:** o GA4 já coleta, então as audiências passam a acumular — o remarketing
      fica para fase posterior (**fora deste runbook**, que é só Search). Blueprint §4.4.
- [ ] **Developer token / MCP oficial:** a validação ao vivo da conta (QS, parcela de impressões) e a
      execução automatizada **virão depois**, quando o token for aprovado (config §5/§8). **Este runbook
      é para execução MANUAL no painel** — não depende do token.

---

## 8. Checklist final antes de ATIVAR

- [ ] Estou na conta **507-051-8419** (confirmado no topo do painel).
- [ ] Tipo = **Pesquisa**; **Display desligado**; parceiros de pesquisa desmarcados.
- [ ] Locais = raio ~150 km de Vespasiano / cidades listadas, opção **"Presença"** (não "interesse").
- [ ] Idioma = Português; orçamentos = ~R$ 20/dia (Núcleo) e ~R$ 2,60/dia (Branded).
- [ ] Estratégia de lance inicial conforme decisão do Ronan (padrão: Maximizar cliques, teto CPC R$ 4).
- [ ] 5 grupos no Núcleo + 1 grupo Branded, cada um com sua **landing page `www`** correta.
- [ ] **2 RSAs por grupo**; Força do Anúncio "Boa"/"Excelente"; só 1–2 títulos pinados na Pos. 1.
- [ ] Nenhum título > 30 / descrição > 90 (banco já validado: 90 títulos máx 27, 26 descr. máx 86).
- [ ] Caminhos de exibição preenchidos em todos os RSAs.
- [ ] Lista de negativas `ES · Negativas Search` criada e associada às 2 campanhas.
- [ ] Assets anexados: sitelinks, callouts, snippets, chamada `(31) 99223-8963`, local (GBP).
- [ ] Conversão `Lead - Formulário` confirmada como meta primária; auto-tagging ligado.
- [ ] **OK explícito do Ronan registrado** (KPI Peitho) → só então **Publicar**.

---

## 9. Metas / expectativas (do blueprint, 90 dias)

| Métrica | Alvo |
|---|---|
| Parcela de impressões (núcleo) | 12,77% → **40%+** |
| Quality Score (núcleo) | 2–3 → **6+** |
| CTR | ≥ 8% (Branded ≥ 15%) |
| CPL (Núcleo) | **R$ 30–60** · Branded CPL < R$ 15 |
| Taxa de conversão da LP | 5–10% |
| Projeção de volume | ~250–330 cliques/mês → ~12–25 leads/mês (CPC R$ 3–4) |

**Pós-ativação (blueprint §6):** deixar aprender **7 dias sem mexer**; depois podar termos de busca
ruins, reforçar RSAs vencedores e melhorar a LP de menor QS **antes** de subir verba. Ao acumular
≥15–30 conversões, migrar a estratégia de lance para Maximizar conversões / tCPA.

> A alavanca nº 1 é **Quality Score**, não verba: cada grupo casado com sua LP de silo é o conserto do
> QS, e é o que baixa o CPC sem gastar mais.
