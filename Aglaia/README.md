---
tipo: nota
area: Aglaia
up: "[[Aglaia/_MOC-aglaia]]"
relacionado:
  - "[[Aglaia/_origem|_origem]]"
---

# Aglaia — Squad de Branding (Brandbook)

Aglaia é o squad definitivo de estratégia de marca: 10 pensadores lendários de branding clonados como agentes de IA (de Aaker a Sharp, de Kapferer a Miller), mais 4 especialistas funcionais e 1 orquestrador. Cobre todas as dimensões da construção de marca — brand equity, posicionamento, identidade, arquitetura, naming, arquétipos e crescimento — entregando desde diagnósticos de marca até pacotes completos de identidade e brandbooks.

## Agentes

| Agente | O que faz |
|--------|-----------|
| brand-chief | Orquestrador (Tier 0): diagnostica o desafio de marca e roteia para o especialista certo, sintetizando frameworks. |
| david-aaker | Brand equity, identidade/visão de marca, arquitetura de marca e estratégia de portfólio. |
| kevin-keller | Pirâmide CBBE, ressonância de marca, posicionamento (POPs/PODs/mantras) e medição de brand equity. |
| jean-noel-kapferer | Brand Identity Prism, DNA da marca, estratégia de luxo e as 24 anti-leis do luxo. |
| al-ries | Teoria do positioning, 22 Leis, criação de categorias e estratégia de foco. |
| byron-sharp | Crescimento baseado em evidências, disponibilidade mental/física e ativos distintivos (How Brands Grow). |
| marty-neumeier | Brand Gap, Zag (diferenciação radical), Onlyness Statement e design thinking. |
| donald-miller | Framework StoryBrand SB7, BrandScript, one-liner e funis de mensagem clara. |
| denise-yohn | Fusão marca-cultura, operacionalização da marca e branding interno/empregador. |
| emily-heyward | Branding de startup e DTC, marca desde o Dia Um, Teste do Porquê e construção de comunidade. |
| alina-wheeler | Sistemas de identidade visual, processo de cinco fases, pontos de contato e brand guidelines. |
| archetype-consultant | 12 arquétipos junguianos, personalidade de marca, tom de voz e briefings criativos. |
| naming-strategist | Geração e avaliação de nomes, análise linguística, triagem de trademark e estratégia de domínio. |
| domain-scout | Disponibilidade de domínio, estratégia de TLD, consistência de handles sociais e viabilidade digital. |
| miller-sticky-brand | Implementação prática de StoryBrand: do BrandScript ao site em wireframe e à execução do funil. |

## Como ativar

```
@brand-chief        # Ativa o orquestrador
*diagnose            # Faz a triagem do seu desafio de marca
*brand-creation      # Workflow de criação de marca ponta a ponta
*rebrand             # Reposiciona uma marca existente
```

Também é possível ativar um especialista diretamente, por exemplo `@brand-squad:david-aaker`.

## Workflows

### Criação de Marca (`*brand-creation`)
Ponta a ponta: arquétipo > posicionamento > naming > identidade > história > pacote de lançamento.

### Rebrand (`*rebrand`)
Auditoria > revisão de posicionamento > atualização de identidade > renovação de mensagem.

## Componentes

- **15 agentes** — 1 orquestrador + 10 pensadores + 4 especialistas
- **9 tasks** — audit-brand, diagnose, review, create-positioning, generate-names, build-identity, create-brand-story, design-architecture, map-archetype
- **2 workflows** — brand-creation (completo), rebrand (marcas existentes)
- **1 checklist** — output-quality
- **2 arquivos de dados** — brand-frameworks, routing-catalog

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
