# Harmonia — Squad de UX/UI e Web

Harmonia é o squad de Design Operations do Kolden: 3 referências de design systems (Brad Frost, Dan Mall, Dave Malouf) + 4 especialistas + 1 orquestrador. Cobre criação e governança de design systems, metodologia atomic design, pesquisa e design de UX, design tokens, geração de assets visuais e implementação de UI em código de produção — tudo coordenado pelo Chefe de Design, que faz triagem, roteia para o especialista certo e garante a qualidade das entregas (acessibilidade WCAG 2.1 AA, consistência de sistema e responsividade).

## Agentes

| Agente | O que faz |
|--------|-----------|
| **design-chief** (Chefe de Design) | Orquestrador tier 0: triagem do desafio, roteamento para o especialista certo e controle de qualidade das entregas. |
| **brad-frost** (Brad Frost) | Atomic design e metodologia de design systems — constrói sistemas (não páginas), bibliotecas de padrões e governança. |
| **dan-mall** (Dan Mall) | Design systems em escala e direção de criação — adoção organizacional, governança e colaboração designer-desenvolvedor. |
| **dave-malouf** (Dave Malouf) | DesignOps e liderança de design — processos, ferramentas, maturidade, métricas e cultura de design. |
| **ux-designer** (UX Designer) | Pesquisa de usuário, arquitetura da informação, wireframes, fluxos, testes de usabilidade e acessibilidade. |
| **design-system-architect** (Arquiteto de Design System) | Bibliotecas de componentes e implementação de design tokens — APIs de componentes e documentação prontas para produção. |
| **visual-generator** (Gerador Visual) | Criação de assets visuais — prompts de imagem por IA, ícones, ilustrações e identidade visual alinhada à marca. |
| **ui-engineer** (Engenheiro de UI) | Implementação de frontend — código de UI responsivo, acessível e pixel-perfect (React, CSS, Tailwind). |

## Como ativar

```
@design-chief            # Ativa o orquestrador (entrada do squad)
@design-squad:brad-frost  # Aciona um especialista diretamente
*diagnose                # Faz a triagem do seu desafio de design
*review                  # Revisa uma entrega contra o checklist de qualidade
```

Prefixo de ativação: `design-squad` (ex.: `@design-squad:brad-frost`).

## Workflows

| Workflow | Comando | O que faz |
|----------|---------|-----------|
| Criação de Design System | `*design-system-creation` | Cria um design system do zero: metodologia atomic (brad-frost) → estratégia organizacional (dan-mall) → tokens/componentes (design-system-architect) → código (ui-engineer). |
| Design de Funcionalidade | `*feature-design` | Design de funcionalidade de ponta a ponta: pesquisa de usuário → wireframing → design visual → spec de implementação → integração com design system. |

## Componentes

- **8 agentes**, **8 tasks**, **2 workflows**, **1 checklist de qualidade**
- Catálogos de apoio em `data/` (padrões de design e roteamento)

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
