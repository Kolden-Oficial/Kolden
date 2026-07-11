---
titulo: Guia compartilhado de auditoria de marca
status: vigente
data: 2026-06-23
squads: [Aglaia, Harmonia]
uso: rubrica e formato de saída para o fan-out da Fase 1 (auditoria conjunta integrada)
tipo: nota
area: iniciativas
up: "[[sobre-a-empresa/Kolden/iniciativas/_MOC-iniciativas]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/00-sumario-executivo|00-sumario-executivo]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/01-auditoria-integrada|01-auditoria-integrada]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/02-roadmap-de-marca|02-roadmap-de-marca]]"
  - "[[sobre-a-empresa/Kolden/iniciativas/auditoria-marca-2026/brandbook-v2|brandbook-v2]]"
---

# Guia compartilhado — Auditoria de Marca Kolden (2026)

> Documento de método. Todo subagente das duas lentes (Aglaia = estratégia de marca,
> Harmonia = design ops/UX) usa **a mesma rubrica e o mesmo template de achado** para
> que as saídas sejam comparáveis e agregáveis. Leia antes de auditar.

## 1. Objeto da auditoria

Material de marca em `C:\Kolden\sobre-a-empresa\marca\`:
- Estratégia/verbal: `voz-e-tom.md`, `mensagens-chave.md`, `identidade-visual.md`
- Design system: `design-system/01-fundamentos/*`, `02-tokens/*`, `03-componentes/*`,
  `04-aplicacoes/*`, `assets/*`, `leia-me.md`, `brandbook.html`

**Princípio fundador do diagnóstico**: a identidade **visual** está madura (~95%);
a camada **estratégica e verbal** está vazia (`voz-e-tom.md` e `mensagens-chave.md`
em `status: rascunho` sem conteúdo). Toda frente deve testar essa hipótese contra a
evidência real do arquivo — não assumir.

## 2. Rubrica de nota (0–10) por dimensão

| Faixa | Significado |
|-------|-------------|
| **9–10** | Exemplar. Documentado, fundamentado, tokenizado/operacionalizável, sem lacuna material. |
| **7–8** | Sólido. Pequenos ajustes ou exemplos faltando, mas utilizável hoje. |
| **5–6** | Parcial. Base existe mas com lacunas que geram inconsistência na execução. |
| **3–4** | Frágil. Mais ausência do que presença; bloqueia trabalho dependente. |
| **0–2** | Ausente/rascunho vazio. Bloqueador. |

Cada nota **exige evidência com caminho de arquivo**. Sem evidência → não pontua.

## 3. Classificação de ação (modelo rebrand do Aglaia)

Para cada achado, classificar o estado atual em:
- **preservar** — é um ativo distintivo/forte; manter e proteger.
- **corrigir** — existe mas precisa de ajuste, complemento ou exemplo.
- **reconstruir** — ausente ou inadequado; criar do zero.

## 4. Template de achado (copiar para cada item)

```
### [ID] Título curto do achado
- **Dimensão**: <frente / sub-tema>
- **Lente**: Aglaia | Harmonia | Aglaia×Harmonia (quando os dois concordam/divergem)
- **Evidência**: `caminho\do\arquivo.md` — citação curta ou estado observado
- **Diagnóstico**: o que está certo/errado e por quê (1–3 frases, sem rodeio)
- **Nota**: X/10
- **Classificação**: preservar | corrigir | reconstruir
- **Recomendação**: ação concreta
- **Esforço**: S (≤meio dia) | M (1–3 dias) | L (semana+)
- **Impacto**: alto | médio | baixo (no negócio / na consistência da marca)
```

**IDs**: prefixo por frente — F1-01, F2-01, … (a frente numera seus próprios achados).

## 5. Convenção de escrita

- PT-BR em tudo. Tom de arquiteto sênior: direto, sem otimismo performático, sem hedging.
- Quando uma lente discordar da outra, **nomear a tensão** em vez de mediar prematuramente
  (a síntese da Fase 3 resolve).
- Citar sempre o arquivo-fonte. Achado sem rastro de evidência é descartado na verificação.

## 6. Frentes (Fase 1)

| # | Frente | Lente Aglaia | Lente Harmonia |
|---|--------|--------------|----------------|
| F1 | Posicionamento & diferenciação | al-ries, marty-neumeier, byron-sharp | design-chief |
| F2 | Brand equity & identidade (Prism) | david-aaker, kevin-keller, kapferer | dan-mall |
| F3 | Arquétipo, personalidade & voz | archetype-consultant, donald-miller | visual-generator |
| F4 | Identidade visual (cor/tipo/logo) | alina-wheeler | brad-frost, design-system-architect, visual-generator |
| F5 | Design system (tokens/componentes/a11y) | alina-wheeler | design-system-architect, ui-engineer, ux-designer |
| F6 | Aplicações, pontos de contato & naming | alina-wheeler, naming-strategist, domain-scout | visual-generator, ui-engineer |
| F7 | Governança, maturidade & cultura | denise-yohn | dave-malouf, dan-mall |

## 7. Saída esperada de cada subagente de frente

Um bloco markdown com:
1. **Resumo da frente** (3–5 linhas, nota média e veredito).
2. **Achados** no template da §4 (mínimo 3, máximo ~8 por frente).
3. **Tensões entre lentes** explícitas, se houver.

A agregação vira `01-auditoria-integrada.md`. Os checklists `output-quality.md` de
Aglaia e Harmonia são o teto de qualidade — críticos não marcados reprovam.
