---
titulo: Sumário executivo — Auditoria de marca Kolden 2026
status: rascunho
data: 2026-06-23
squads: [Aglaia, Harmonia]
relacionados: [01-auditoria-integrada.md, 02-roadmap-de-marca.md]
tipo: nota
area: iniciativas
up: "[[sobre-a-empresa/Kolden/iniciativas/_MOC-iniciativas]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/01-auditoria-integrada|01-auditoria-integrada]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/02-roadmap-de-marca|02-roadmap-de-marca]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/_guia-auditoria|_guia-auditoria]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/brandbook-v2|brandbook-v2]]"
---

# Sumário executivo — Auditoria de marca Kolden (2026)

Auditoria conjunta dos squads **Aglaia** (estratégia de marca) e **Harmonia**
(design ops/UX) sobre o material em `sobre-a-empresa\marca\`. Sete frentes cruzadas,
22 squads de pensadores e executores encarnados, evidência sempre rastreada a arquivo.

## Health score geral: **4.5/10**

Não é uma nota ruim — é uma nota **assimétrica**. A média esconde a verdadeira história:

```
Identidade visual / design system   ████████░░  7.8   maduro
Estratégia / verbal / mensagem      ██░░░░░░░░  2.6   ausente
Governança / aplicações / naming    ███▌░░░░░░  3.7   frágil
```

A Kolden construiu uma **carroceria de marca de altíssimo nível sem motor de
significado**. O trabalho visual (cor, tipografia, logo, tokens, acessibilidade)
está entre os melhores que se vê em empresa deste estágio. Mas a marca **não sabe
dizer o que é** — e o pouco que diz se contradiz.

## Os 5 achados que importam

### 1. Conflito de posicionamento triplo (a raiz de tudo)
A Kolden tem três identidades incompatíveis vivas no repositório ao mesmo tempo:
- **"IA soberana, self-hosted, vendor-agnóstica"** — `CLAUDE.md` §1
- **"Impulsionadora de negócios focada no LTV"** — `tom-visual.md` (marcado `vigente`)
- **Vazio** — `posicionamento.md` e `mensagens-chave.md` em rascunho

Pior: a estética **já escolheu** a narrativa LTV, enquanto a infraestrutura afirma
soberania e o documento canônico está em branco. **Nenhuma mensagem, voz ou arquétipo
pode ser finalizado antes de o Ronan decidir o foco.** É a decisão nº 1.

### 2. A camada verbal é rascunho vazio (bloqueador operacional)
`voz-e-tom.md` e `mensagens-chave.md` são templates com `<!-- preencher -->`. Sem
arquétipo, sem 3 adjetivos de voz, sem mensagem central, sem one-liner, sem
BrandScript. Isso já produz inconsistência **hoje**: Hermes (WhatsApp/Telegram) e
Pheme (social, meta +100k) geram conteúdo sem fonte única de voz.

### 3. O visual está mascarando essa ausência (dívida oculta)
O sistema visual é bom o bastante para ninguém sentir a falta da voz no dia a dia.
É exatamente isso que torna a dívida perigosa: invisível até a operação escalar, e
então vira inconsistência pública imediata.

### 4. Ativos distintivos de classe alta — preservar a todo custo
Scarlet `#FF3D22`, o "K partido" ("inédito no mercado digital"), ink `#110E0F`,
tokens DTCG com contraste WCAG **calculado e materializado em token**. Pela lente de
Byron Sharp, a Kolden já tem o que mais importa para crescer: ativos distintivos
únicos, consistentes e governados. Não diluir.

### 5. Governança nominal — o ofício maduro esconde um gargalo de processo
Há dono nomeado (Harmonia) e regra de propagação de tokens, mas nenhum processo de
mudança, nenhum CHANGELOG, nenhum status & roadmap, nenhuma prova de adoção (os
projetos reais `omiron`/`CataLogo` usam shadcn/ui, não os tokens Kolden). Sem
change-request, a "fonte de verdade" vai derivar na primeira pressão de prazo.

## Recomendação

**A marca não precisa de um rebrand. Precisa de uma cabeça.** A fundação visual é um
ativo — preservá-la. O trabalho é construir a camada estratégica que falta e
formalizar a governança, nesta ordem:

1. **Decidir o foco** (Ronan) — recomendação da auditoria: ancorar em **"IA soberana"**
   (o diferencial defensável e o único *Onlyness* genuíno; "impulsionadora de LTV" é
   genérico e qualquer agência diz). A soberania é o **como**; impulsionar negócios é
   o **porquê** — as duas reconciliam numa só frase.
2. **Destravar o verbal** — as propostas de `voz-e-tom`, `mensagens-chave`, arquétipo
   e posicionamento já estão escritas em `artefatos/`, prontas para ratificar e promover.
3. **Formalizar governança** — RACI + change-request + fusão marca↔cultura.
4. **Só então escalar** — aplicações por canal, componentes em código, Figma library.

O roadmap priorizado por impacto × esforço está em `02-roadmap-de-marca.md`. Os
artefatos estratégicos de partida estão em `artefatos/`. **Nenhum arquivo de marca
vigente foi alterado** — tudo nesta auditoria é proposta.
