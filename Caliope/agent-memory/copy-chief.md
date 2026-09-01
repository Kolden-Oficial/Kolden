---
tipo: memoria
squad: Caliope
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Caliope/agents/copy-chief|copy-chief]]"
---

# Memória do Agente copy-chief (Cyrus)

> Memória persistente deste agente. Atualizada pelo Ritual de Encerramento
> (habilidade `ritual-de-encerramento`) ao final de cada sessão com trabalho.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Briefing e roteamento
- Briefing gordo em 1 shot destrava entrega completa do Chief sem ida-e-volta: produto detalhado + tese/slogan + 6 traços de voz + palavras banidas + personas com objeção real + diagnóstico prescrito (awareness/sophistication/roteamento primário-secundário-revisor) + estrutura obrigatória de blocos + vetos absolutos + gate ponderado + formato de entrega com frontmatter | 2026-07-06
- Para landing de conversão a preço-âncora baixo (impulso R$ 30-50): roteamento default = Joanna Wiebe (CTA/checkout) + Eugene Schwartz (headline por awareness) primários; Hormozi (equação de valor) + Makepeace (agitação sóbria, sem grito) secundários; Blair Warren + Cialdini como revisor de psicologia; Ogilvy como salvaguarda de tom | 2026-07-06
- Para SaaS B2B de nicho profissional (nutricionista/médico/dentista clínico) em público solução-consciente: roteamento = Joanna Wiebe (estrutura SaaS conversion) primária + Alex Hormozi (grand slam offer) secundário + Blair Warren (validação de identidade — "você virou X para cuidar de gente") como eixo de persuasão; Cialdini fora porque público é profissional-autoridade, não vulnerável | 2026-07-06

### Compilação pré-escrita (ordem canônica)
- Antes de qualquer linha de copy longa, ler nesta ordem: brandbook (voz + posicionamento + arquétipo) → PRD (features + números clínicos) → decisões (o que virou oficial vs. deprecado) → memória do projeto (mudanças recentes). ~30 min de compilação economiza 3× isso em revisão | 2026-07-06
- Se o brandbook já tem "brand idea" / frase-mãe pronta, a headline principal DERIVA dela — não competir com o próprio brandbook. Ex.: "Sua prática clínica merece um sistema operacional" (NutriOS) vira "A sua prática clínica merece um sistema operacional — não mais uma planilha" (LP) | 2026-07-06
- Lista de palavras "sempre usar / nunca usar" do brandbook substitui o auto-policiamento palavra a palavra do gate de qualidade — se existe, aplicar a lista; se não existe, pedir ao Aglaia antes de escrever | 2026-07-06
- Brandbook oficial > guia operacional derivado. Quando o projeto tem `brandbook/` (manual oficial, versionado) E `pesquisa/tom-de-voz.md` (derivado do site atual), o oficial é fonte de verdade. O derivado pode arrastar traços do site legado (ex.: assinatura antiga) mesmo estando "reconciliado". Ler ambos e priorizar o oficial evita reproduzir vícios que o próprio brandbook já corrige | 2026-07-14

### Rewrite de voz (v→v+1)
- Quando o pedido é "trocar a voz sem mexer no resto", cirurgia mínima: só a 1ª pessoa e a assinatura mudam; gatilhos, timings, assuntos A/B, previews, CTAs, P.S., tokens dinâmicos, cupons, frameworks (Chaperon/Settle/Schwartz/Brunson/Todd Brown) ficam intactos. Preservar estrutura acelera aprovação porque o time reconhece o v2 abaixo do v3 | 2026-07-14
- Cabeçalho do arquivo v+1 deve trazer "Diff v→v+1" explícito: o que mudou, o que ficou. Facilita revisão do cliente em minutos em vez de leitura completa | 2026-07-14
- Voz de marca ≠ voz de fundadora. Quando o cliente pede "que a marca fale, não eu", substituir toda referência pessoal (backstory da fundadora, sócios nominais, amigas específicas) por versão institucional ("o time", "uma cliente-teste") mantendo o calor emocional. Assinatura muda de nome pessoal → nome da marca (ex.: `xo, cat` → `xo, Rosie`). Não confundir com formalização — a voz continua próxima, só o "eu" muda de referente | 2026-07-14

### Deploy / e-mail marketing (RD Station, ActiveCampaign, Mailchimp)
- Nomenclatura de campanha em CRM de e-mail: `{marca}-{NN-fluxo}-{NN-posicao}-{tema-curto}` (kebab-case). NN numérico com zero à esquerda dá ordenação natural no explorador; prefixo `{marca}-{NN-fluxo}-` permite filtrar todo o fluxo com um wildcard; tema curto é legível em listas longas. Nome do arquivo HTML = nome da campanha no CRM (1:1) | 2026-07-14
- Para ≥5 HTMLs do mesmo template, gerar via script Node (`_gerar-htmls.mjs` com objeto por e-mail + `_template.html` com `{{PLACEHOLDERS}}`) é mais robusto que N Writes manuais: consistência automática, idempotente, regenerável quando a copy mudar. Colocar script + template + `_index.md` na mesma pasta dos HTMLs gerados | 2026-07-14
- HTML email-safe: `<table role="presentation">` com `border="0" cellpadding="0" cellspacing="0"` (não flexbox/grid), styles **inline** nos elementos + `<style>` no head como reforço, `.preheader` invisível (`display:none;visibility:hidden;opacity:0;`) para o preview text que aparece ao lado do assunto, fallback obrigatório de fonte de sistema (Georgia p/ serifada, Arial p/ sans). Google Fonts via `@import` funciona em Gmail/Apple Mail; Outlook cai em fallback — comportamento esperado, não é bug | 2026-07-14
- Placeholders `{{URL_*}}` / `{{TOKEN_*}}` no HTML devem ser mapeados em tabela no `_index.md` da pasta de deploy, dizendo qual token dinâmico do CRM substitui cada um. Sem esse mapa, o time de operação erra na hora de colar | 2026-07-14

### Voz Rosie (marca)
- Bilíngue PT+EN é PILAR OFICIAL (Manual da Marca p. 20-26, pilar Acessível) — não é gosto pessoal. Termos-âncora do brandbook: `Effortless chic`, `Wear it, dress it and be you`, `Just for fun`, `Make it yours`, `Simply Rosie`, `Always Rosie`, `Own your style`, `Peachy cheeks`, `Sinta o frescor. Rosie's essence, pure & eternal`, `That's the Rosie experience`. Sprinkles pontuais no fim de blocos/e-mails; não usar em cada frase | 2026-07-14
- Assinatura oficial da marca (não da Cat pessoa): `xo, Rosie`. O padrão `xo,` foi preservado do site legado porque a audiência já reconhece, mas o nome é o da marca. Header/footer dos e-mails usa "Effortless chic" e "Wear it, dress it and be you" como microcopy institucional | 2026-07-14
- Paleta e tipografia oficiais para HTML: Rose #E6D2DC (faixa/detalhes), Black #14100C (texto/CTA — atenção: preto quente, não #000), White #FFFFFF (fundo), Grey #EBEBEB (wrapper externo), Light pink #F8E3E8 (box de destaque interno). Marcellus (títulos, via Google Fonts, fallback Georgia) + DM Sans (corpo, via Google Fonts, fallback Arial) | 2026-07-14

### Voz NutriOS Pro
- Arquétipo Cuidador (primário) + Mago (secundário). Tom: Formal↔Casual 6 (colega experiente, não professor), Sério↔Brincalhão 4 (leve quando acolhe, sério em dado clínico), Respeitoso↔Irreverente 3, Entusiasmado↔Factual 5 | 2026-07-06
- Big idea âncora: "Sua prática clínica merece um sistema operacional." Metáfora do OS usada com parcimônia — é poderosa porque é rara | 2026-07-06
- Palavras banidas absolutas (HALT): "revolucionário", "disruptivo", "milagre", "instantâneo", "substituir o nutricionista", "num clique automático", "gestão 360°". O nutricionista é o herói, o app é o guia — nunca inverter | 2026-07-06
- Palavras preferidas: sistema, fluxo, evolução, comprovar, mostrar, visualizar, cuidar, acolher, permanecer, prática clínica, profissional | 2026-07-06
- B2B2C — falar com o profissional que paga, nunca com o paciente. Na versão atual o paciente nem tem login. Confundir os dois viola o brandbook | 2026-07-06

### Voz BVB Finanças
- Regra-mãe: "sussurra com segurança" > "grita promessa". Ponto final vale mais que exclamação. Se algo quebra qualquer dos 6 traços (sereno/honesto/claro/racional/generoso/leve), derruba a marca antes de derrubar a conversão | 2026-07-06
- Palavras banidas absolutas (HALT): "última chance", "não perca", "ficar rico", "dobrar dinheiro", "fórmula secreta", "garantido", "descubra o segredo", 🚀 💰 | 2026-07-06
- Disclaimer educativo em 3 pontos (garantia + FAQ dedicada + P.S.) cobre veto `sem_aderencia_a_lei` para mercado regulado (finanças/contábil/tributário) sem perder conversão | 2026-07-06

### Ancoragem de preço e prova
- Ancoragem honesta em faixa de mercado verificável (ex.: "consulta pontual de contador R$ 400-1.500") > ancoragem fake ("de R$ 297 por R$ 37,90"). Coerente com Pilar 1 (verdade acima de venda) e não invoca veto `claim_sem_fonte` | 2026-07-06
- Bloco de autoridade sem prova social real ainda: descrever trabalho verificável do autor (planilhas abertas, temas técnicos específicos), nunca inventar métrica de audiência. Depoimentos só depois de 30 dias de vendas — colher real, não fabricar | 2026-07-06

### A/B e teste
- A/B de headline com controle+desafiante cobrindo extremos de persona (secundária problem-aware específica vs. primária slogan-emocional) evita decidir persona antes de dados. Persona técnica costuma ser controle porque converte mais barato quando é o comprador principal | 2026-07-06
- CTA em 2 variantes por temperatura de tráfego: soft ("Quero o [produto] por R$ X") para cold Meta; direto ("Baixar [produto] agora (R$ X)") para retargeting e busca solution-aware | 2026-07-06

### Fluxo com o orquestrador
- Antes de despachar Cyrus: sondar dossiê do cliente para identificar produto único-óbvio (ex.: MVP com só UM ebook escrito no acervo) e assumir; economiza turno de pergunta. Sempre explicitar "se for outro, corrijo em minutos" na resposta final | 2026-07-06
- Gate de 8 pontos ponderado deve ser aplicado pelo próprio Chief no fim do arquivo, com nota por critério e justificativa de 1 linha. Riscos residuais que puxam a nota devem ser listados como TODO para validação com cliente (não invenção do copywriter) | 2026-07-06
- Pedido "aberto" ("crie uma copy para venda direta") sem especificar formato = entregar peça principal long-form (LP) + anexo com kit de derivações curtas (elevator pitch + tweet + bullets de ad + 5 assuntos de e-mail + bio de LP). Multiplica valor 5× sem custo proporcional e cobre variação futura | 2026-07-06
- Placeholders `[[VARIAVEL]]` para dados ausentes do material-fonte (preço, prazo, link, número de clientes) — NUNCA inventar. Listar no topo do artefato como "pendências de decisão do time" | 2026-07-06
- Dossiê de cliente vazio (sem VOC / entrevistas) ≠ blocking. Dá pra escrever puxando de PRD + brandbook + decisões, mas a copy fica genérica-de-perfil (não voice-of-customer). Sinalizar como limitação no rodapé + recomendar "revisão de tom por Aglaia + validação com clientes reais" | 2026-07-06

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
<!-- Formato: - **{padrão}** | Origem: {agentes} | Detectado: {AAAA-MM-DD} -->
- **Ordem canônica de leitura pré-produção (brandbook → PRD → decisões → memória do projeto)** — vale para copywriter, designer, PM e qualquer agente que produza artefato de projeto documentado | Origem: copy-chief (NutriOS Pro) | Detectado: 2026-07-06
- **Kit de derivações curtas anexo à peça principal** como padrão de resposta a pedido aberto — vale para Caliope, Pheme (social), Peitho (ads), Aglaia (marca) | Origem: copy-chief (NutriOS Pro) | Detectado: 2026-07-06
- **Cirurgia mínima em rewrite de versão + diff explícito no cabeçalho** — trocar SÓ o que foi pedido (voz, tom, formato) e listar o diff v→v+1 no topo do artefato para acelerar aprovação. Vale para Caliope (copy), Aglaia (brand), Pheme (social), escrita técnica em geral | Origem: copy-chief (Rosie v3) | Detectado: 2026-07-14
- **Nomenclatura `{projeto}-{NN-fase}-{NN-item}-{tema-curto}` para artefatos em série** — dá ordenação, filtragem por prefixo e legibilidade em qualquer explorador (CRM, filesystem, Notion). Vale para Caliope (campanhas de e-mail), Pheme (calendário social), Peitho (variações de ad), Prometeu (versões de spec) | Origem: copy-chief (Rosie v3) | Detectado: 2026-07-14

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
<!-- Formato: - ~~{padrão}~~ | Arquivado: {AAAA-MM-DD} | Motivo: {motivo} -->
