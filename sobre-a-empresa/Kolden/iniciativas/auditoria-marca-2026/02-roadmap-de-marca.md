---
titulo: Roadmap de marca Kolden — priorizado por impacto × esforço
status: rascunho
data: 2026-06-23
squads: [Aglaia, Harmonia]
relacionados: [00-sumario-executivo.md, 01-auditoria-integrada.md]
---

# Roadmap de marca Kolden (2026)

Cada item rastreia ≥1 achado da auditoria (`01-auditoria-integrada.md`), com
responsável, esforço (S ≤meio dia · M 1–3 dias · L semana+), impacto e dependências.
As fases são sequenciais por **dependência**, não por calendário — a Fase 0 destrava
todo o resto.

## Matriz impacto × esforço (visão rápida)

```
        │ Esforço S          │ Esforço M               │ Esforço L
────────┼────────────────────┼─────────────────────────┼──────────────────────
Impacto │ Voz (F3-02)        │ DECIDIR FOCO (F1) ★      │ Componentes React
 alto   │ One-liner (F3-05)  │ Mensagens/SB7 (F3-04)    │  + Figma (F5-07)
        │ Fusão marca-cult.  │ Arquétipo (F3-01)        │ Templates por
        │  (F7-04)           │ Governança/RACI (F7-01)  │  canal (F6-02)
        │ Licença Eurostile  │ Change-request (F7-02)   │
        │  (F4-04)           │ Naming doc (F6-05)       │
────────┼────────────────────┼─────────────────────────┼──────────────────────
Impacto │ Favicon (F4-06)    │ Símbolo SVG (F4-07)      │
 médio  │ Checklist peça     │ Pontos de contato        │
        │  (F6-04)           │  (F6-03) · Movimento     │
        │ Status&roadmap     │  (F4-05) · Tema claro    │
        │  (F7-03)           │  (F5-06) · Piloto (F7-06)│
```

★ = decisão do Ronan, pré-requisito de quase tudo.

---

## Fase 0 — Desbloqueio crítico (decisões fundadoras)

> Sem isto, todo trabalho verbal downstream é especulação. Maior parte do material
> de partida já está escrito em `artefatos/` — falta decidir e ratificar.

| # | Ação | Achados | Responsável | Esforço | Impacto | Dependências |
|---|------|---------|-------------|:-------:|:-------:|--------------|
| 0.1 | **Decidir o foco de posicionamento** (IA soberana vs. impulsionadora-LTV vs. híbrido). Recomendação: IA soberana. | F1-01, F1-02, F1-06 | **Ronan** (decisão) + Aglaia/`brand-chief` | M | alto | — |
| 0.2 | Ratificar e promover `posicionamento.md`: declaração canônica + Onlyness + categoria + inimigo | F1-01, F1-03 | Aglaia/`al-ries` | S* | alto | 0.1 |
| 0.3 | Ratificar arquétipo **Mago × Fora-da-lei** (ou ajustar) | F3-01 | Aglaia/`archetype-consultant` | S* | alto | 0.1 |
| 0.4 | Promover proposta para `marca\voz-e-tom.md` (3 adjetivos, tom por contexto, do/don't) | F3-02, F3-03 | Aglaia/`archetype-consultant` | S* | alto | 0.3 |
| 0.5 | Promover proposta para `marca\mensagens-chave.md` (BrandScript SB7, mensagem central, one-liner) | F3-04, F3-05 | Aglaia/`donald-miller` | S* | alto | 0.1, 0.3 |

\* Esforço S porque o rascunho de partida já existe em `artefatos/`; resta revisar,
ajustar à decisão 0.1 e mover para a pasta vigente. **Critério de pronto da Fase 0**:
`voz-e-tom.md` e `mensagens-chave.md` saem de `status: rascunho` para `vigente`, e
existe uma declaração de posicionamento canônica única no repositório.

---

## Fase 1 — Consistência & governança (fechar a marca)

> Quick wins de alto valor + a governança que protege o que já existe.

| # | Ação | Achados | Responsável | Esforço | Impacto | Dependências |
|---|------|---------|-------------|:-------:|:-------:|--------------|
| 1.1 | Articular a **fusão marca↔cultura** numa página (valores de marca = comportamentos internos; eleger kernel sagrado) | F7-04, F2-03, F7-05 | Aglaia/`denise-yohn` | S | alto | 0.1 |
| 1.2 | Adicionar link explícito **arquétipo→estética** em `tom-visual.md` (resolve o visual-generator sem guia) | F3-06 | Aglaia + Harmonia/`visual-generator` | S | médio | 0.3 |
| 1.3 | Escrever `governanca.md` com **RACI** (dono Harmonia, aprovador Aglaia, gatilhos) | F7-01, F2-05 | Harmonia/`dave-malouf` | S | alto | — |
| 1.4 | Definir **processo de change-request** + CHANGELOG + refresh trimestral | F7-02 | Harmonia/`dave-malouf`, `dan-mall` | M | alto | 1.3 |
| 1.5 | Criar `marca\status-e-roadmap.md` (matriz de maturidade viva) usando esta auditoria | F7-03 | Harmonia/`design-chief` | S | médio | — |
| 1.6 | **Decidir licença Eurostile**: comprar web-license OU eleger substituto livre canônico (ex.: Saira Semi Condensed) | F4-04 | Harmonia/`design-system-architect` | S–M | alto | — |
| 1.7 | Documentar `marca\naming.md` (panteão grego como sistema; fronteira Kolden-mãe vs. submarcas; arquitetura de marca) | F6-05 | Aglaia/`naming-strategist` | M | alto | 0.1 |
| 1.8 | Preencher facetas do receptor do Identity Prism (Relação agora; Reflexo/Autoimagem após ICP) | F2-02 | Aglaia/`kapferer` | M | médio | 0.1 |
| 1.9 | Gerar conjunto **favicon** (16/32/48/180) e validar o K em 16px | F4-06 | Harmonia/`visual-generator` | S | médio | — |
| 1.10 | Extrair **símbolo K isolado** como SVG limpo (3 cores) + 2–3 grafismos prontos | F4-07 | Harmonia/`visual-generator` | M | médio | — |
| 1.11 | Extrair `checklist-auditoria-de-peca.md` (10–12 itens binários) e anexar ao fluxo do Pheme | F6-04 | Aglaia + Harmonia | S | médio | 0.4 |

**Critério de pronto da Fase 1**: marca tem voz, posicionamento, governança com dono
e processo, naming formalizado, e os assets-base (favicon, símbolo SVG) prontos.

---

## Fase 2 — Aplicações & escala (operacionalizar)

> Levar a marca consistente para os pontos de contato reais e robustecer o sistema.

| # | Ação | Achados | Responsável | Esforço | Impacto | Dependências |
|---|------|---------|-------------|:-------:|:-------:|--------------|
| 2.1 | **Viabilidade digital** (online): relatório `kolden.com/.com.br/.io/.ai` + @kolden nas 6 redes; decidir handle canônico (resolver o "oficial") | F6-06 | Aglaia/`domain-scout` | S–M | alto | 0.1 |
| 2.2 | `04-aplicacoes\por-canal.md`: 1 spread por canal (IG feed/story, LinkedIn, e-mail, slide) com specs + exemplo renderizado | F6-01 | Harmonia/`visual-generator`, `ui-engineer` | M | alto | 0.4, 1.11 |
| 2.3 | Produzir **templates reaproveitáveis** (post social + assinatura e-mail em HTML/SVG tokenizado) | F6-02 | Harmonia/`ui-engineer` | L | alto | 2.2 |
| 2.4 | `04-aplicacoes\pontos-de-contato.md`: inventário touchpoint × asset × spec × status | F6-03 | Aglaia/`alina-wheeler` | M | médio | 1.9 |
| 2.5 | Criar `01-fundamentos\movimento.md` (duração/easing como tokens, K em transições, do/don't) | F4-05 | Harmonia/`ui-engineer` | M | médio | — |
| 2.6 | Adicionar **lockup vertical** do logo + regra de troca logotipo↔símbolo | F4-02 | Harmonia/`visual-generator` | M | médio | 1.10 |
| 2.7 | Tokens: camada `component.*` + tokenizar line-height/letter-spacing + **CI Style Dictionary** | F5-01, F5-02, F5-05 | Harmonia/`design-system-architect` | M | alto | 1.4 |
| 2.8 | Adicionar estado **loading** (spinner/`aria-busy`) + skeleton aos componentes | F5-04 | Harmonia/`ui-engineer` | S | médio | — |
| 2.9 | Definir **tema claro** como remapeamento de alias sob seletor de tema | F5-06 | Harmonia/`design-system-architect` | M | médio | 2.7 |
| 2.10 | **Piloto de adoção**: portar 1 componente de `omiron`/`CataLogo` para tokens Kolden + 1–2 métricas | F7-06 | Harmonia/`dan-mall`, `ui-engineer` | M | alto | 1.4 |

**Critério de pronto da Fase 2**: existe peça-fonte reaproveitável por canal, o sistema
de tokens tem CI e não deriva, e há prova de adoção real em produto.

---

## Fase 3 — Produto de design system (maturidade Gerenciado→Otimizado)

> Só depois de governança e adoção provadas. Investir aqui antes é anti-padrão
> (reforça a lente já madura — Ofício — ignorando o gargalo de Processo/Pessoas).

| # | Ação | Achados | Responsável | Esforço | Impacto | Dependências |
|---|------|---------|-------------|:-------:|:-------:|--------------|
| 3.1 | Portar starter para **pacote de componentes React** + preset Tailwind + Storybook + addon a11y | F5-07 | Harmonia/`ui-engineer`, `design-system-architect` | L | alto | 2.7, 2.10 |
| 3.2 | Criar **Figma library** com Variables espelhando tokens (Tokens Studio) | F5-07 | Harmonia/`design-system-architect` | L | médio | 2.7 |
| 3.3 | Métricas de adoção contínuas + evangelismo recorrente (Dan Mall: "o evangelismo nunca para") | F7-06 | Harmonia/`dan-mall` | M | médio | 2.10 |

---

## Sequência recomendada (caminho crítico)

```
0.1 (Ronan decide) → 0.2/0.3 → 0.4/0.5 (verbal vigente)
                                      │
        ┌─────────────────────────────┼──────────────────────────┐
        ▼                             ▼                          ▼
   1.1 fusão                   1.3→1.4 governança          1.7 naming
   1.2 arquétipo→estética      1.5 status                  2.1 viabilidade digital
                                                                  │
                              Fase 2 (aplicações + tokens CI + piloto)
                                                                  │
                              Fase 3 (React + Figma) — só com adoção provada
```

**Regra de ouro do roadmap** (de F7-07): não pular para a Fase 3 cedo. O gargalo da
marca é Processo/Pessoas, não Ofício. Mais componentes antes de governança e voz é
investir na força e ignorar a fraqueza.
