---
id: projeto-nutrios-pro-memoria
titulo: "NutriOS Pro — Memória do Agente"
resumo: "Memória persistente do agente que opera o projeto NutriOS Pro: estado, decisões e lições verificadas. Atualizada pelo Ritual de Encerramento."
categoria: projeto
status: oficial
atualizado-em: 2026-06-24
relacionados: [leia-me, status, decisoes]
---

# Memória do Agente — NutriOS Pro

> Memória persistente deste projeto, dentro da Kolden (soberania de dados; versionável).
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos

### Estado do projeto
- v1 completo em produção (`nutriospro.lovable.app`); Sprints 1–4 entregues. Docs em `Projetos/NutriOS Pro/` (`leia-me/prd/arquitetura/decisoes/status.md`). | 2026-06-24
- Código clonado em `app/` = **repo próprio** `Koldenoficial/nutriospro`, ignorado pelo monorepo (mantém `.git` + deploy Lovable). Ainda na identidade ANTIGA no código: `#0D8070`/`#00FF94`, light-first. | 2026-06-24
- **Fase 3 (fundação visual) documentada e oficial** (7 docs `status: oficial`): brandbook + design system + pacote de tokens + specs de re-skin. | 2026-06-24
- **Fase 4 = aplicar o redesign no código `app/` — NÃO iniciada.** Roteiro linha-a-linha pronto em `design-system/02-tokens/leia-me.md §4`. | 2026-06-24
- **Apresentação institucional criada:** `apresentacao/index.html` — deck single-page dark-first (15 seções: hero→problema→solução→posicionamento→diferenciação→produto→IA→adesão→marca→paleta→tipografia→voz→negócio→roadmap→fechamento), identidade OFICIAL (Baloo 2 + Inter, Deep Forest + Neon Mint), conteúdo extraído de prd/posicionamento/voz/identidade/status. Autossuficiente (CSS inline + Google Fonts CDN). NÃO commitado. | 2026-06-24

### Identidade visual (oficial)
- Dark-first: **Deep Forest `#0D2320`** (fundo) + **Neon Mint `#00E87A`** (CTA/destaque, texto PRETO sobre mint = 12.82:1). NÃO é a marca-mãe Kolden (scarlet/ink). | 2026-06-24
- Tipografia: **Baloo 2** (display) + **Inter** (UI/dados, `tabular-nums`) — validada por Ronan 2026-06-24; substitui Poppins. | 2026-06-24
- Marca: símbolo "nö" (traço único onda/infinito), wordmark `nutriOS pro` (OS bold caixa-alta), mascote (Cuidador). Tagline: "Sua prática clínica merece um sistema operacional." | 2026-06-24
- Assets em `apresentacao/img/`: `simbolo-no.png`, `wordmark.png` (= lockup COMPLETO símbolo+wordmark, não só texto), `mascote.png`, `selo.png` são Neon Mint com fundo TRANSPARENTE → funcionam direto sobre fundo dark. | 2026-06-24
- **GOTCHA:** `apresentacao/img/paletas-p2.png` NÃO é paleta de cores — é um slide "Logo Icon" (símbolo sobre preto/branco, muita área branca, 4320×2430). Não embutir em deck dark-first; construir paleta com swatches CSS. | 2026-06-24

### Lições de processo
- Ao Ronan dizer "continue", **confirmar o escopo antes de tocar `app/`** (código de produção). Nesta sessão ele preferiu fechar a documentação a implementar — consistente com plan-mode + commit policy estrita. | 2026-06-24
- Sondar o estado REAL (Explore no `app/`) antes de assumir "onde paramos"; o `status.md` subdimensionava o avanço da Fase 3. | 2026-06-24
- "Onde paramos referente a X?" exige sondar o disco, não a memória: a "apresentação HTML" não existia — só os PNGs em `apresentacao/img/`. Reforça [[feedback_verificar_estado_ao_vivo]]. | 2026-06-24
- **Screenshot de página inteira (Chrome headless, Windows):** `--headless --screenshot` captura só o viewport (= `--window-size`), e hero com `min-height:100vh` infla a captura; âncoras `#id` NÃO rolam no headless. Solução: cópia temporária do HTML na MESMA pasta (p/ `img/` resolver) com override `.hero{min-height:auto}` + `--window-size=1320,N` alto; apagar a cópia depois. | 2026-06-24
- **GOTCHA Windows:** hook de proteção barra `Remove-Item` quando o MESMO comando PowerShell também invoca um path tipo `C:\Program Files\...` via call operator (`& $chrome`). Separar a remoção do temp em comando próprio. | 2026-06-24
- Verificar render por anomalia: o `full.png` "quase vazio" era artefato do `100vh`×janela-alta, não bug — investigado e confirmado, consistente com [[feedback_verificacao_visual_anomalias]]. | 2026-06-24

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras -->
- **Screenshot de página HTML inteira via Chrome headless no Windows (cópia temp + override de `100vh` + window alto; remoção em comando separado por causa do hook)** | Origem: agente-NutriOS-Pro | Detectado: 2026-06-24

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
