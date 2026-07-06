---
id: projeto-nutrios-pro-memoria
titulo: "NutriOS Pro — Memória do Agente"
resumo: "Memória persistente do agente que opera o projeto NutriOS Pro: estado, decisões e lições verificadas. Atualizada pelo Ritual de Encerramento."
categoria: projeto
status: oficial
atualizado-em: 2026-07-03
relacionados: [leia-me, status, decisoes]
---

# Memória do Agente — NutriOS Pro

> Memória persistente deste projeto, dentro da Kolden (soberania de dados; versionável).
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Estado do projeto
- v1 completo em produção (`nutriospro.lovable.app`); Sprints 1–4 entregues. Docs em `Projetos/NutriOS Pro/` (`leia-me/prd/arquitetura/decisoes/status.md`). | 2026-06-24
- Código clonado em `app/` = **repo próprio** `Koldenoficial/nutriospro`, ignorado pelo monorepo (mantém `.git` + deploy Lovable). Ainda na identidade ANTIGA no código: `#0D8070`/`#00FF94`, light-first. | 2026-06-24
- **Fase 3 v1 (2026-06-24)** oficializou brandbook v1 com Baloo 2 + paleta 7. **REVOGADA em 2026-07-03** pela Fase 3 v2 (ver bloco 2026-07-03 abaixo).
- **Fase 4 = aplicar o redesign no código `app/` — NÃO iniciada.** Roteiro atualizado para v2 em `design-system/02-tokens/leia-me.md §4` (webfont local Quip, dual-mode). | 2026-07-03
- **Apresentação institucional (v2 em 2026-07-03):** `apresentacao/index.html` — deck single-page dark-first (15 seções: hero→problema→solução→posicionamento→diferenciação→produto→IA→adesão→marca→paleta→tipografia→voz→negócio→roadmap→fechamento), identidade OFICIAL v2 (Quip + Inter, paleta 8 cores dual-mode, wordmark NUTRIOS PRO caixa-alta), conteúdo extraído de prd/posicionamento/voz/identidade/status. `@font-face` local para Quip apontando para `../assets/2026-06-30-final/quip.otf`. Wordmark renderizado como texto (não imagem). NÃO commitado. | 2026-07-03

### Identidade visual v2 (oficial, 2026-07-03)
- **Paleta dual-mode (8 cores)**:
  - Verde-frio (dark canônico): **Deep Forest `#0D2320`**, Dark Teal `#0F3D35`, Aqua Green `#2BBFA0`, **Neon Mint `#00E87A`**.
  - Linho-quente (light canônico): **Linen Cream `#F5F0E8`**, Warm Linen `#E8DDD0`, Terracotta `#C4976A`, **Espresso `#2C2416`**.
  - Par de CTA v2: **Espresso `#2C2416` sobre Neon Mint** (10.30:1 AAA). Substitui o par v1 preto puro/mint.
  - **Removidos da v1**: Forest Green `#0A5C52`, preto puro `#000000`, branco puro `#FFFFFF`. | 2026-07-03
- **Tipografia oficial v2**:
  - Display / wordmark: **Quip Regular** de Ahmad Suhadi (`suhadidesign`), 2025. `@font-face` local em `assets/2026-06-30-final/quip.otf`. Único weight (400). Fallbacks: `"Quip", "Nunito", "Fredoka", system-ui, sans-serif`.
  - UI / dados: **Inter** (inalterada — mantém `tabular-nums` para dados clínicos).
  - Ativo gráfico proprietário: **Geometr415 Blk BT** (Bitstream) — glyph do "O" do símbolo "nö"; NUNCA como webfont. | 2026-07-03
- **Wordmark v2**: **`NUTRIOS PRO`** caixa-alta bold, peso uniforme (revoga o `nutriOS pro` lowercase da v1). Grafias:
  - Logotipo (peça): `NUTRIOS PRO` — caixa-alta em Quip. Inegociável.
  - Corpo institucional: `NutriOS Pro` — CamelCase (também no selo).
  - Domínio: `nutriospro` — lowercase. | 2026-07-03
- **Símbolo "nö"**: mesmo significado (N = início de NUTRI, O = "OS" de NUTRIOS via glyph Geometr415, dot verde = pingo do "i" final). Traço redesenhado bold. | 2026-07-03
- **Assets v2** em `assets/2026-06-30-final/`: PDF `definicoes-finais-logo-cores.pdf` (3 pgs — pg1 lockups, pg2 significado, pg3 paleta oficial), PNG `logo-30-06-2026.png` (287KB, 6 lockups), `quip.otf` (86KB, 343 glyphs, license All Rights Reserved), dossiê `_notas-tipografia.md`. | 2026-07-03
- **Assets v1** preservados como referência histórica em `assets/`: `logo-e-paletas-de-cores.pdf`, `projeto-logo-nutrios-pro.pdf`, `projeto-logo-nutrios-pro-com-cores.pdf`, `relatorio-original.md`. `apresentacao/img/*.png` (v1) continuam sendo servidos pelo deck v2 para símbolo/mascote/selo (o wordmark v2 é renderizado via CSS+Quip, não mais como PNG). | 2026-07-03
- **GOTCHA v1**: `apresentacao/img/paletas-p2.png` NÃO é paleta — é slide "Logo Icon" 4320×2430; construir paleta com swatches CSS. | 2026-06-24

### Lições de processo
- Ao Ronan dizer "continue", **confirmar o escopo antes de tocar `app/`** (código de produção). Nesta sessão ele preferiu fechar a documentação a implementar — consistente com plan-mode + commit policy estrita. | 2026-06-24
- Sondar o estado REAL (Explore no `app/`) antes de assumir "onde paramos"; o `status.md` subdimensionava o avanço da Fase 3. | 2026-06-24
- "Onde paramos referente a X?" exige sondar o disco, não a memória: a "apresentação HTML" não existia — só os PNGs em `apresentacao/img/`. Reforça [[feedback_verificar_estado_ao_vivo]]. | 2026-06-24
- **Screenshot de página inteira (Chrome headless, Windows):** `--headless --screenshot` captura só o viewport (= `--window-size`), e hero com `min-height:100vh` infla a captura; âncoras `#id` NÃO rolam no headless. Solução: cópia temporária do HTML na MESMA pasta (p/ `img/` resolver) com override `.hero{min-height:auto}` + `--window-size=1320,N` alto; apagar a cópia depois. | 2026-06-24
- **GOTCHA Windows:** hook de proteção barra `Remove-Item` quando o MESMO comando PowerShell também invoca um path tipo `C:\Program Files\...` via call operator (`& $chrome`). Separar a remoção do temp em comando próprio. | 2026-06-24
- Verificar render por anomalia: o `full.png` "quase vazio" era artefato do `100vh`×janela-alta, não bug — investigado e confirmado, consistente com [[feedback_verificacao_visual_anomalias]]. | 2026-06-24
- **Rebrand via 5-camadas Kolden (Hermes→Zeus→Apolo+Hefesto→Aglaia+Harmonia→Dike) funciona bem para escopo delimitado.** 2 subagentes paralelos com arquivos-alvo disjuntos (Aglaia em `brandbook/`, Harmonia em `design-system/02-tokens/`) sem colisão; Contrato de Missão lavrado com SHA-256 do input verbatim; ~1h de briefing→consolidação. Reforça [[feedback_orquestracao_multi_squad_validada]]. | 2026-07-03
- **PDF do Drive pode ter escopo muito maior que a nota curta**: a nota Google Doc dizia só "O DO OS PRO é o Geometr415 Blk BT" (37 chars). Interpretação inicial: fonte separada do wordmark. Realidade após ler o PDF: era o "O" do SÍMBOLO "nö" (glyph gráfica), e a mudança real da tipografia veio de `quip.otf`. Lição: em rebrand, o PDF de definições é fonte-âncora — nunca planejar sem ler. | 2026-07-03
- **Metadata OTF via fontTools do Python revela nome real da fonte + licença + cobertura de glyphs**. `pip install fonttools` + `TTFont(path).name.names` (nameID 1=family, 4=full, 6=postscript, 0=copyright) — expõe se fonte é open (SIL OFL) ou proprietária (All Rights Reserved). Base para decidir `@font-face` embed. | 2026-07-03
- **Wordmark renderizado via CSS+Quip é superior a wordmark em PNG** quando o repositório tem a fonte real (`@font-face` local). Vantagens: escala perfeita, cor variável via CSS, sem armazenar imagens extras. Restrição: só em documentos internos do repositório privado enquanto a licença webfont não estiver confirmada para produção pública. | 2026-07-03
- **Ondas de 2 subagentes paralelos com Contrato como âncora**: cada briefing aponta para o mesmo Contrato + dossiê de descoberta. Subagente lê o contrato → sabe o que preservar (proibições) → executa escopo próprio → salva Ritual em `<Squad>/agent-memory/`. Não precisa de handshake entre subagentes se os alvos são disjuntos por subpasta. | 2026-07-03

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->
- **Screenshot de página HTML inteira via Chrome headless no Windows (cópia temp + override de `100vh` + window alto; remoção em comando separado por causa do hook)** | Origem: agente-NutriOS-Pro | Detectado: 2026-06-24
- **Rebrand como missão 5-camadas Kolden com fan-out disjunto por subpasta (brandbook vs tokens)** — Contrato de Missão + 2 subagentes paralelos + Dike; se aplicar em 2+ projetos vira padrão | Origem: agente-NutriOS-Pro | Detectado: 2026-07-03
- **Extração de metadata OTF via `fontTools` como parte da Fase 0 de descoberta** para revelar family name real + licença + cobertura de glyphs — deveria ser padrão em qualquer rebrand que envolva fonte proprietária | Origem: agente-NutriOS-Pro | Detectado: 2026-07-03

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
