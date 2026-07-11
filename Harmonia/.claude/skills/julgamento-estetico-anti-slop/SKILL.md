---
name: julgamento-estetico-anti-slop
description: >-
  Julgamento estético e anti-slop da Harmonia — impede que a interface pareça
  "template gerado por IA". Use ANTES e DEPOIS de produzir UI: para ler o briefing
  e declarar a direção (Design Read), calibrar a ousadia em 3 dials, fugir dos
  defaults de IA, escolher um preset de direção de arte (minimalista, soft/premium,
  brutalista, editorial, Awwwards), e rodar o pré-flight visual com o banco de
  AI-tells antes de entregar. É a postura de "design lead de estúdio" que o
  design-chief e o visual-generator aplicam. Tells de CONTEÚDO/copy (em-dash,
  nomes fake, verbos clichê) NÃO são tratados aqui — vão para o squad Caliope.
tipo: skill
area: Harmonia
up: "[[Harmonia/_MOC-harmonia]]"
---

# Julgamento estético — anti-slop

A maioria da UI gerada por IA é ruim porque o modelo pula para uma estética
default em vez de **ler a sala**. Esta habilidade dá à Harmonia a postura de um
**design lead de um estúdio pequeno** conhecido por dar a cada cliente uma
identidade que não se confunde com a de ninguém: escolhas deliberadas e
opinativas de paleta, tipografia e layout, com **um risco estético real e
justificável** por projeto.

## Quando aplicar

Sempre que houver **decisão de direção visual** ou **entrega de UI** — landing,
portfólio, redesign, hero, seção de marketing. Entra duas vezes: na **entrada**
(Design Read + dials + calibração anti-default) e na **saída** (pré-flight visual).
Não é para dashboards/tabelas de dados puros nem para fluxos multi-etapa de
produto (use `sistema-de-design`).

## 1. Design Read (leia antes de produzir)

Antes de qualquer pixel, infira e **declare em uma linha**:

> "Lendo isto como: \<tipo de página> para \<público>, com linguagem \<vibe>,
> tendendo a \<design-system ou família estética>."

Sinais a ler: tipo de página (landing SaaS/consumer/agência, portfólio, redesign,
editorial); vibe-words usadas; referências (URLs/prints/marcas); **público** (o
público escolhe a estética, não o seu gosto); ativos de marca existentes;
restrições silenciosas (acessibilidade-first, setor público, regulado, infantil —
estas **vencem** a preferência estética).

Se o briefing for genuinamente ambíguo, faça **exatamente uma** pergunta. Se dá
para inferir com confiança, **não pergunte** — declare o Design Read e prossiga.

## 2. Os 3 dials (calibração)

Depois do Design Read, fixe três dials que governam layout, motion e densidade:

- **VARIÂNCIA_DE_DESIGN** (1 = simetria perfeita … 10 = caos artístico)
- **INTENSIDADE_DE_MOTION** (1 = estático … 10 = cinematográfico)
- **DENSIDADE_VISUAL** (1 = galeria/arejado … 10 = cockpit/dados)

Baseline `8 / 6 / 4`, salvo override do Design Read. Inferência por sinal e
presets de uso em `references/presets-de-direcao.md`.

## 3. Disciplina anti-default

A UI de IA hoje se agrupa em poucos looks "default" — escolha-os só se o briefing
pedir, nunca por reflexo:

- Fundo creme quente (~#F4F1EA) + display serifado de alto contraste + acento terracota.
- Fundo quase-preto + um único acento verde-ácido ou vermelhão.
- Layout broadsheet com fios capilares, raio zero e colunas de jornal.
- Gradiente roxo-de-IA, hero centralizado sobre mesh escuro, **três cards iguais**,
  glassmorphism em tudo, Inter + slate-900 como par default.

Onde o briefing fixa a direção, siga à risca (as palavras do briefing sempre
vencem). Onde ele deixa um eixo livre, **não gaste essa liberdade num default**.

## 4. Processo em 2 passes (planejar → criticar → construir → criticar)

1. **Brainstorm** um plano de design compacto a partir do briefing: token system
   enxuto — cor (paleta de 4–6 hex nomeados), tipo (display característico usado
   com restrição + corpo + utilitário), layout (frase + wireframe ASCII) e
   **elemento-assinatura** (a única coisa pela qual a página será lembrada).
2. **Critique o plano contra o briefing** antes de codar: se alguma parte é o
   default genérico que você produziria para qualquer página similar, **revise** e
   diga o que mudou e por quê. Só então escreva o código, derivando cada cor/tipo
   do plano revisado.
3. **Construa** e **critique de novo** enquanto constrói (screenshot ajuda — "uma
   imagem vale 1000 tokens").

Faça o grosso do planejamento no pensamento; só mostre ao usuário com alta
confiança de que vai encantar.

## 5. Restrição e autocrítica

Gaste a ousadia **em um lugar só**: deixe o elemento-assinatura ser a coisa
memorável e mantenha o resto quieto e disciplinado. Corte qualquer decoração que
não sirva ao briefing. Conselho de Chanel: antes de sair, olhe no espelho e
**tire um acessório**. Case a complexidade com a visão (maximalismo exige execução
elaborada; minimalismo exige precisão em espaço/tipo/detalhe). Não correr risco
também é um risco.

## 6. Pré-flight visual (gate de saída, obrigatório)

Antes de entregar, rode a matriz mecânica de `references/pre-flight-visual.md` —
contagens verificáveis (eyebrows, marquees), travas de consistência (tema, cor,
forma), checagens de hero, e o banco de AI-tells. **Se um único box não pode ser
honestamente marcado, a tela não está pronta.**

## Banco de AI-tells (visual)

O catálogo de assinaturas-de-IA a banir por default está em
`references/banco-de-ai-tells.md` (eyebrows numeradas, fake screenshots de div,
dots decorativos, strips de locale/versão, 3 cards iguais, etc.).

## Fronteiras (handoff)

- **Tells de CONTEÚDO/copy** (banimento de em-dash, nomes "Jane Doe", números
  fake-precisos, verbos "Elevate/Seamless", marcas "Acme/Nexus") → squad
  **Caliope**. Aqui tratamos só os tells **visuais/estruturais**.
- **Base de estilos/paletas/regras de UX** → `sistema-de-design`.
- **Tokens** → `tokens-de-design`. **Implementação shadcn/motion** → `implementacao-ui`.
- **Geração de imagem de referência/logo/mockup** → squad **Aglaia**.

## Referências

- `references/banco-de-ai-tells.md` — catálogo de padrões proibidos (visual).
- `references/presets-de-direcao.md` — dials por sinal + presets (soft, minimalista,
  brutalista, editorial, Awwwards) + protocolo de redesign.
- `references/pre-flight-visual.md` — checklist mecânico de saída.

---

**Procedência (absorção F6, lote 2026-06-26).** Fusão de duas fontes, reescrita em
PT-BR: `Leonxlnx/taste-skill@06d6028b` (MIT — IDs G1, G2, G3, G5, G6, G7, G8, G10,
G14 [metade visual], G16, G17, G18) e da skill `frontend-design` de
`anthropics/claude-code` (**proprietário Anthropic** — IDs G1, G2, G4, G6;
princípio extraído e reescrito, **sem cópia literal**, uso interno Kolden, não
redistribuir). G5 (UX writing) da frontend-design e a metade de conteúdo do banco
de AI-tells (G14) foram encaminhados ao squad Caliope, não absorvidos aqui.
