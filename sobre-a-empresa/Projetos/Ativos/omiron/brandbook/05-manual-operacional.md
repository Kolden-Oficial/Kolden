---
id: projeto-omiron-brandbook-manual-operacional
titulo: "Omiron — Manual Operacional"
resumo: "Governança viva do brandbook Omiron: quem edita o quê (Aglaia = brandbook, Harmonia = tokens/design system, Orfeu = narrativa, Caliope = copy em produção, Nomos = compliance clínico), checklist pré-publicação (10 itens), fluxo de solicitação de mudança (matriz reversibilidade × impacto — herdada Camada-2 Kolden), regras de acessibilidade (dislexia como veto, alt-text obrigatório, foco visível em dourado antigo), e — sobretudo — a nomeação viva das 6 tensões abertas (Marco Aurélio, maximalismo × UX simples, textura papiro binária, ícones dos 4 pilares, ritual do Quíron no Caos, NDA formal com Ariosto). Nada escondido."
categoria: projeto
status: oficial
atualizado-em: 2026-07-06
autor: Aglaia (brand-chief) — Kolden
missao: m-20260706-193013-omiron-brandbook-completo
relacionados: [00-indice, 01-posicionamento, 02-voz-da-marca, 03-identidade-visual, 04-aplicacoes, narrativa/manifesto, narrativa/mentor-quiron, narrativa/alternativa-marco-aurelio, ../design-system/01-fundamentos/cores]
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/brandbook/00-indice|00-indice]]"
---

# Manual Operacional

> Pilar 5 de 5. O brandbook não é um museu — é uma máquina viva. Este capítulo define **como a máquina roda**: quem opera cada peça, como uma mudança nova entra no sistema, o que precisa passar por revisão antes de sair para o mundo, e — o mais importante — quais tensões ainda estão abertas em 06/07/2026, na véspera da reunião com o Dr. Ariosto.

## 1. Governança — quem edita o quê

O Omiron não tem "um dono da marca". Tem cinco autores especializados, cada um responsável por uma camada — e uma regra de handoff que impede que um pise no outro.

| Autor | Camada de responsabilidade | Fonte de verdade |
|---|---|---|
| **Aglaia** (brand-chief — Kolden) | Brandbook estratégico: posicionamento, voz, identidade visual, aplicações, manual operacional. É a autoria destes 5 capítulos MD. | `brandbook/*.md` |
| **Harmonia** (design-chief — Kolden) | Design system técnico: tokens DTCG, cores calibradas por pipeta, escala tipográfica, componentes, matriz WCAG. É a fonte técnica primária. | `design-system/**/*` — cores, tipografia, tom-visual, tokens.json, tokens.css |
| **Orfeu** (narrativa — Kolden) | Narrativa da marca: manifesto, cosmologia dos 4 pilares, persona e copy do mentor Quíron, copy de onboarding, alternativa iconográfica de Marco Aurélio. | `brandbook/narrativa/*.md` |
| **Caliope** (copy-master — Kolden) | Copy em produção contínua: landing pages, e-mails de campanha, posts de Instagram, notificações da Fase 2, respostas de suporte. Consome as fontes acima como âncora — não redefine voz. | Materiais de campanha (fora do brandbook) |
| **Nomos** (compliance — Kolden) | Gate de compliance clínico: CFM Res 2.314/2022 (telemedicina), CFM Res 2.336/2023 (publicidade médica), LGPD Art. 11 (dado sensível saúde), ANVISA (registro *software as medical device* — se aplicável), CFP (não aplicável, é psiquiatria). Aprova ou veta qualquer copy/decisão com claim clínico. | Checklist de compliance `brandbook/compliance-checklist.md` (Onda 3 desta missão — pendente) |

**Regra de handoff (evita conflito):**

- **Aglaia → Caliope** (voz em produção): Aglaia trava a voz estratégica; Caliope replica em campanha. Formalizado em `02-voz-da-marca.md §6 Handoff`.
- **Aglaia → Harmonia** (fronteira visual → tokens): Aglaia decide o que a marca significa em cor, forma e tipografia; Harmonia traduz para token técnico calibrado. Este brandbook nunca escreve HEX cru — sempre referencia token.
- **Aglaia → Orfeu** (narrativa dentro do brandbook): Aglaia estrutura os capítulos; Orfeu redige a narrativa (manifesto, pilares, mentor). Aglaia pode citar Orfeu (apontar para os arquivos) — não pode reescrevê-lo sem passagem por Orfeu.
- **Qualquer autor → Nomos** (gate clínico): qualquer copy ou decisão que toca claim médico, promessa de resultado, mensagem em contexto sensível (piora, ideação, medicação, dose), termo de consentimento, política de privacidade — passa por Nomos antes de sair.
- **Qualquer conflito não resolvido:** escala para o Ronan (Camada 1 — decisor final da marca em Fase 1).

## 2. Checklist pré-publicação

Antes de qualquer artefato Omiron sair para o mundo (in-app, e-mail, push, post, deck comercial, receita física, landing page), passar pelos 10 itens abaixo. Falha em qualquer item = refazer, não publicar.

1. **Consistência de tom** — as 4 dimensões (reflexivo↔direto 70/30 · erudito↔acessível 60/40 · íntimo↔respeitoso 50/50 · calmo↔firme 75/25) são respeitadas nesta superfície? Regra viva em `02-voz-da-marca.md §2`.
2. **Tokens semânticos usados** — nenhum HEX cru neste artefato? Toda cor é referenciada por `--omiron-*` ou aponta para `design-system/01-fundamentos/cores.md`? Auditoria em `cores.md §8`.
3. **WCAG conferido** — todos os pares de texto sobre fundo passam AA no mínimo? Corpo em `--omiron-marfim` sobre `--omiron-fundo-profundo` (15.02:1)? CTA respeita a regra de tamanho mínimo (`03-identidade-visual.md §5`)?
4. **Claim médico validado por Nomos** — o artefato promete cura, diagnóstico, prescrição, alteração de dose, eficácia clínica sem lastro? Se sim, veto — refazer. Se contém referência clínica sensível, passou pela revisão de Nomos (`compliance-checklist.md`)?
5. **Papiro no canal certo** — se é receita física, é papiro integral? Se é Instagram do médico, tem fundo papiro? Se é card de recompensa in-product, tem moldura papiro? A regra "se não tem papiro em algum lugar, não é Omiron" (`03-identidade-visual.md §4.1`) foi honrada?
6. **Sem paternalismo** — o artefato usa "nós estamos torcendo por você", "vamos juntos", "força", "conta com você"? Se sim, refazer. Regra em `02-voz-da-marca.md §2.3` e §3.2.
7. **Sem jargão da moda** — o artefato usa *biohacking, unlock, guru, mindset, transformação, melhor versão, sua melhor versão*? Se sim, refazer. Regra viva em `02-voz-da-marca.md §3.2` — grep automatizado no CI.
8. **Sem infantilização** — o artefato usa emoji em UI, "carinha sorridente", "bolinha colorida", exclamação performática? Se sim, refazer.
9. **Nomeação correta** — o Dr. Ariosto é referido como *o Dr. Ariosto* (não "seu médico", "seu psiquiatra")? O Quíron é sinalizado como *inteligência artificial* na primeira ocorrência da sessão?
10. **Encaminhamento humano** — se o contexto é sensível (piora, ideação, sofrimento agudo), o artefato encaminha para humano (Dr. Ariosto, rede de urgência, CVV 188)?

**Sugestão operacional:** materializar o checklist como GitHub Action ou pre-commit hook para as regras que suportam grep automatizado (itens 2, 6, 7, 8 principalmente). Itens 1, 3, 4, 5, 9, 10 exigem revisão humana. Automatizar o que suporta automação, deixar o humano no que exige julgamento — é regra Kolden Camada-2.

## 3. Fluxo de solicitação de mudança

Toda proposta de mudança na marca Omiron (novo canal, nova cor, nova tipografia, novo padrão de layout, ajuste em copy travado, decisão sobre tensão aberta) passa pela **matriz de risco reversibilidade × impacto** — padrão Camada-2 herdado da constituição Kolden.

### 3.1 Matriz de risco

| Reversibilidade | Impacto baixo | Impacto médio | Impacto alto |
|---|---|---|---|
| **Reversível** (fácil desfazer) | **Verde** — decide o autor da camada, informa o time depois. | **Verde-amarelo** — decide o autor, comunica o Ronan por mensagem. | **Amarelo** — decide o autor + Ronan em conversa curta antes de aplicar. |
| **Semi-reversível** (custa desfazer) | **Amarelo** — decide o autor + Ronan em conversa curta. | **Amarelo-vermelho** — decide Ronan + autor + Nomos se toca compliance. | **Vermelho** — mesa cheia: Ronan + Aglaia + Harmonia + Nomos + (se aplicável) Ariosto. |
| **Irreversível** (custa muito desfazer ou não dá) | **Amarelo-vermelho** — mesa cheia sempre. | **Vermelho** — mesa cheia + registro em Contrato de Missão. | **Vermelho + gate** — mesa cheia + registro em Contrato + veto do Ronan explícito. |

**Exemplos operacionais:**

- **Verde:** ajuste de line-height em body-lg em 2px. → Harmonia decide.
- **Verde-amarelo:** trocar a frase do CTA da tela de check-in ("Registrar" para "Guardar"). → Aglaia + Caliope decidem, informam o Ronan.
- **Amarelo:** decidir a Alternativa entre Sêneca (A), Biblioteca (B) e Livro sobre pergaminho (C) para o pilar Pensamento. → Ronan + Aglaia + Orfeu + Ariosto (a decisão é do cliente). Está em 08/07/2026.
- **Amarelo-vermelho:** mudar o token `--omiron-dourado-antigo` para outro HEX (calibração fina). → Harmonia + Ronan + Aglaia.
- **Vermelho:** trocar o arquétipo Sábio por outro. → Mesa cheia com Ariosto. Improvável — mas registrado.
- **Vermelho + gate:** publicar o app na App Store / Play Store com decisão de nomear "cura" em copy de marketing. → Veto absoluto do Nomos. Não vai.

### 3.2 Fluxo operacional

1. **Solicitante** abre issue/registro descrevendo (a) o que muda, (b) por que muda, (c) reversibilidade estimada, (d) impacto estimado.
2. **Autor da camada afetada** classifica na matriz.
3. **Se Verde:** aplica, informa.
4. **Se Amarelo ou pior:** convoca a mesa, discute, decide, registra a decisão como bloco em `sobre-a-empresa/Projetos/Ativos/omiron/docs/log-de-decisoes-de-marca.md` (arquivo a criar na primeira mudança pós-fase-1).
5. **Se toca claim clínico:** Nomos gate obrigatório antes da aplicação.

## 4. Acessibilidade

Regras de acessibilidade que sobrepõem qualquer outra decisão de marca. Se conflito entre marca e acessibilidade, acessibilidade ganha.

### 4.1 Dislexia — veto ativo

O Dr. Ariosto vetou Alex Brush na reunião 01/07 por preocupação com pacientes com dislexia. A regra ficou como **veto de arquitetura** — vive em `design-system/01-fundamentos/tipografia.md §4`:

- Corpo mínimo 16px. Nunca abaixo. Regra dura.
- Line-height mínimo 1.6 em corpo (Garamond usa 1.65).
- Sem justificação (`text-align: justify`) — o espaço variável entre palavras confunde leitor disléxico. Sempre `text-align: left`.
- Sem uppercase-tudo em bloco — quebra reconhecimento de forma de palavra.
- Sem italic em corpo longo — só citação histórica curta.
- Contraste AAA no corpo — `--omiron-marfim` sobre `--omiron-fundo-profundo` = 15.02:1. Passa com folga.

**Teste de aceite:** paciente-piloto disléxico consegue ler 3 parágrafos de onboarding em <90 segundos sem re-leitura. Se falhar, corpo ganha `1.125rem` (18px) — nunca menos.

### 4.2 Alt-text obrigatório

**Toda imagem em superfície Omiron precisa ter alt-text descritivo em Português:**

- **Fotografia clássica de fundo** (escadaria, biblioteca, colunata, abóbada): descrever o cenário e o mood ("escadaria monumental ascendente com estátuas em nichos e abóbada de céu ao fundo, iluminada em chiaroscuro dourado").
- **Ícones dos 4 pilares** (Sansão, Marco Aurélio *provisório*, Psiquê, Hécate): descrever o pilar + a figura ("símbolo do pilar Sentimento — a Grande Onda de Kanagawa em traço dourado").
- **Sprite da planta virtual**: descrever o estágio ("planta virtual no estágio 'muda' — 30 dias de check-in acumulado").
- **Símbolo Omiron**: "símbolo Omiron em dourado antigo sobre fundo escuro".

**Regra dura:** imagem sem alt-text é bug de acessibilidade. Bloquear merge no CI se HTML/JSX renderizar `<img>` sem `alt` (fora de imagens decorativas puras, que devem usar `alt=""` explicitamente).

### 4.3 Foco visível — `--omiron-dourado-antigo`

Foco de teclado (tab, shift+tab, setas em componentes navegáveis) usa **outline 2px sólido em `--omiron-dourado-antigo`** com offset 2px. Nunca `outline: none` sem substituto visível.

Contraste do foco sobre `--omiron-fundo-profundo` = 4.68:1 (AA, borderline AAA para elementos ≥ 15.75px). Adequado.

### 4.4 Foco/erro nunca só cor

WCAG 1.4.1: alerta e foco nunca podem ser sinalizados **só por mudança de cor**. Sempre acompanhar de:
- Ícone (SVG autoral no estilo Omiron — stroke 1.5, humanista).
- Texto (Garamond regular ou medium, `--omiron-marfim` sobre `--omiron-fundo-profundo` ou `--omiron-marfim` sobre `--omiron-ambar-terra`).

Regra viva em `cores.md §5.3`.

### 4.5 Interação por teclado completa

Todo componente interativo (botão, link, input, tab, accordion, modal) precisa ser operável por teclado (tab / shift+tab / enter / esc / setas conforme padrão ARIA). Nenhum fluxo essencial exige mouse.

## 5. Tensões abertas — nomeadas, não escondidas

Este brandbook fecha na **véspera da reunião de 08/07/2026**. Existem seis tensões vivas que a Aglaia deliberadamente **não fechou nesta rodada** — porque a decisão certa é do Dr. Ariosto (cliente), do Ronan (Camada 1) ou de rodada Kolden posterior (Caos, Harmonia, Hefesto). Nenhuma foi escondida. Todas estão aqui.

### 5.1 Marco Aurélio — 3 alternativas para Ariosto escolher em 08/07

**Estado:** a metodologia clínica do pilar Pensamento (Estoicismo + TCC) está travada. A **figura-âncora visual e narrativa** desse pilar está aberta porque o board Pinterest do Dr. Ariosto tem **zero pins** de Marco Aurélio — a figura vive na cabeça dele como referência intelectual, não como imagem que ele já validou visualmente.

**Alternativas** (dossiê completo em `narrativa/alternativa-marco-aurelio.md`):

- **A — Sêneca como voz principal.** Sêneca é mais conversável, encaixa melhor no tom Sábio com humor. Símbolo: papiro escrito à mão com pluma. Também precisa de produção autoral.
- **B — Biblioteca de Alexandria como âncora, sem figura humana isolada.** *Recomendada por Orfeu.* Encaixe perfeito com o Pinterest (34 tags "library", cena já verbalizada como favorita pelo Ariosto). Marco Aurélio vira citação dentro da biblioteca.
- **C — Livro aberto sobre pergaminho como símbolo abstrato.** Máxima coerência com o papiro cross-canal — o pilar Pensamento vira o próprio papiro. Perde a figura humana.

**Decisão pendente:** reunião 08/07/2026 com Ariosto. Este brandbook será atualizado depois — Aglaia + Orfeu + Ronan.

**Não bloqueia esta entrega.** A entrega desta rodada é *o brandbook estruturado* — a decisão iconográfica final vem depois.

### 5.2 Maximalismo × UX simples

**Estado:** Ariosto verbalizou desejo por maximalismo clássico erudito na reunião ("*maximalismo, majestoso, glorioso, antiguidade, gótica, prosperidade*"), aceitou o custo técnico ("*pode dar um pouco de bug*") — e ao mesmo tempo verbalizou preocupação com fluidez de UX ("*tem que ser algo fácil; se ele ficar tendo muitas funções juntas, ele pode acabar desanimando do app*"). É tensão viva, não paradoxo — a solução técnica está em aberto.

**Proposta Harmonia (em `design-system/01-fundamentos/tom-visual.md §3 Foco`):** *"cada elemento é maximalista, o layout é minimalista"*. O card tem borda dourada rica e textura sutil — MAS só há 3 cards na tela. O botão tem tipografia serifa clássica em cor de crepúsculo — MAS a tela tem UM botão principal. A epígrafe é de Marco Aurélio — MAS aparece uma vez por tela.

**Decisão pendente:** validação final com o Dr. Ariosto em 08/07/2026. Se ele aprovar a proposta Harmonia, ela vira lei do produto. Se ele quiser puxar mais para um lado ou outro, a decisão dele fecha a tensão.

**Não bloqueia esta entrega.** A proposta Harmonia está registrada como diretriz operacional; se Ariosto rejeitar, retrabalho fica claro em rodada subsequente.

### 5.3 Textura papiro binária pendente

**Estado:** o papiro é a assinatura cross-canal (§4.1 do capítulo `03-identidade-visual.md`), mas os arquivos binários finais (WebP/PNG em 3 densidades — 1x, 2x, 3x) ainda não foram gerados. Fallback ativo em `design-system/02-tokens/tokens.css` usa `linear-gradient` enquanto os arquivos oficiais não existem.

**Responsável pela produção:** Harmonia + direção de arte (Kolden), próxima rodada. Precisa de referência real (papiro fotografado com iluminação controlada + tratamento em Photoshop para preservar fibras + exportação em 3 densidades).

**Prazo:** não bloqueia reunião 08/07/2026 (o fallback linear-gradient é apresentável no brandbook). Vira tarefa da rodada Fase 1 do produto — quando o app começar a ter usuários piloto, os arquivos precisam estar em produção.

### 5.4 Ícones dos 4 pilares (SVGs autorais)

**Estado:** cada um dos 4 pilares tem cosmologia narrativa completa em `narrativa/pilares.md`, mas **os ícones SVG autorais ainda não foram desenhados**:

- **Corpo (Sansão):** símbolo = chama olímpica + figura humana em ação. Estilo: stroke 1.5, humanista, `--omiron-dourado-antigo` ou `--omiron-marrom-couro` conforme contexto.
- **Pensamento (Marco Aurélio *provisório* — ou Biblioteca / Livro após 08/07):** símbolo pendente da decisão da §5.1 acima.
- **Sentimento (Psiquê):** símbolo = Grande Onda de Kanagawa + relógio de bolso.
- **Espírito (Hécate):** símbolo = Oráculo de Delfos (portal com colunas) + tochas + chaves.

**Responsável pela produção:** Harmonia + direção de arte (Kolden), próxima rodada. Precisam nascer respeitando: estilo humanista imperfeito (regra `tom-visual.md §4 Elegância imperfeita`), stroke 1.5, cor em token semântico, tamanho canônico 24×24px (com escalabilidade até 64×64px preservando ornamento).

**Prazo:** não bloqueia reunião 08/07/2026 (podem ser apresentados como *concept sketches* em papel). Vira tarefa da rodada de produção do app.

### 5.5 Ritual do Quíron no Caos — mentor de IA desenhado, agente não encarnado

**Estado:** a persona completa do mentor Quíron está travada em `narrativa/mentor-quiron.md` — quem ele é, o que ele faz, como ele fala, os 10 exemplos canônicos, o vocabulário permitido/proibido. Isto é o **cérebro conceitual** do Quíron: um documento de marca, não um agente executável.

O **agente Kolden que encarna esse cérebro** (o LLM prompt + a arquitetura de contexto + a integração com o app Omiron) ainda não foi criado no ecossistema Caos. Existe **Contrato de Missão lavrado em 01/07/2026** (registrado em `~/.claude/plans/caos-caos-qu-ron-proud-hedgehog.md`) — mas o Ritual do Caos que produz o agente ainda **não foi executado**.

**Responsável pela produção:** Caos (fábrica de agentes da Kolden), rodada dedicada em `C:\Kolden\Caos\` — precisa da entrega de âncoras (a persona do `mentor-quiron.md`), do escopo funcional (o que ele responde in-app, o que ele nega, os padrões que ele observa) e da definição de handoff para o app Omiron (via API, via prompt engineering embutido no Next.js, ou via camada intermediária Hermes — decisão de arquitetura pendente).

**Prazo:** o brandbook desta reunião apresenta o Quíron como **desenhado**. O agente executável entra no produto quando o piloto Fase 1 estiver funcionando (jul/2026 em diante). Precisa estar antes do primeiro paciente-piloto usar o chat com Quíron in-product.

**Regra dura Nomos (emenda Onda 3, 06/07/2026):** o agente Quíron nasce com o **protocolo de risco suicida** (`compliance-checklist.md §6`) integrado no prompt de sistema. Nenhuma versão do agente pode ir a produção sem esse protocolo testado com casos-piloto (3 categorias: ideação passiva/ativa/plano concreto). Nomos é gate obrigatório antes do primeiro paciente-piloto usar o chat.

### 5.6 NDA formal com Dr. Ariosto pendente

**Estado:** na reunião 01/07/2026, o Ronan compartilhou tela com a estrutura de agentes/squads da Kolden (Zeus, Poseidon, Apolo, Hefesto, Hades, Atena, Afrodite, Plutos, e a fábrica Caos). Ariosto reagiu com deslumbre ("*então eu não vou ter o Ronan comigo, eu vou ter uma equipe de deuses trabalhando no meu app*") e sondou acesso próprio à infra ("*Você divide esses agentes? Quer que eu tenha um papo com eles também?*"). É oportunidade de produto (assinatura Kolden-para-cliente com acesso curado a agentes) **e risco de IP exposto**.

**O que precisa acontecer:** NDA formal assinado entre Kolden e Dr. Ariosto (ou entidade jurídica da Clínica Omiron) protegendo (a) a arquitetura da Kolden mostrada em tela, (b) o brandbook completo do Omiron (este documento), (c) a persona do Quíron e o design system inteiro, (d) decisões estratégicas de posicionamento e diferenciação, (e) a metodologia de trabalho da Kolden.

**Responsável:** Ronan (Camada 1) + Nomos + advogado externo se necessário. Prazo mencionado na reunião 01/07 foi "assinar até sábado 04/07" — verificar se aconteceu e, se não, priorizar antes da reunião 08/07/2026 (que vai expor ainda mais material da Kolden).

**Prazo crítico:** antes de 08/07/2026. Este brandbook, por regra da missão original, **não deve ser publicado externamente sem NDA formal** — a reunião de 08/07 é o momento correto de nomear a pendência ao Ariosto, se ela ainda estiver aberta.

---

## Ganchos de rastreabilidade

- **Governança (§1):** herança direta da constituição Kolden Camada-2 (matriz de risco, handoffs por autor).
- **Checklist pré-publicação (§2):** operacionalizável em GitHub Action / pre-commit hook. Regras 2, 6, 7, 8 = grep automatizado. Regras 1, 3, 4, 5, 9, 10 = revisão humana.
- **Fluxo de mudança (§3):** matriz reversibilidade × impacto padrão Kolden.
- **Acessibilidade (§4):** consolidação de `tipografia.md §4`, `cores.md §5.3`, e WCAG 2.1 nível AA/AAA nos pares críticos.
- **Marco Aurélio (§5.1):** `narrativa/alternativa-marco-aurelio.md` — decisão do Ariosto em 08/07/2026.
- **Maximalismo × UX (§5.2):** proposta Harmonia em `design-system/01-fundamentos/tom-visual.md §3 Foco` — validação do Ariosto em 08/07/2026.
- **Textura papiro binária (§5.3):** próxima rodada Harmonia.
- **Ícones dos 4 pilares (§5.4):** próxima rodada Harmonia + direção de arte.
- **Ritual Quíron no Caos (§5.5):** Contrato de Missão lavrado em `~/.claude/plans/caos-caos-qu-ron-proud-hedgehog.md` (01/07/2026) — execução pendente em sessão dedicada `C:\Kolden\Caos\`.
- **NDA formal (§5.6):** Ronan + Nomos + Ariosto — prazo crítico antes de 08/07/2026.
