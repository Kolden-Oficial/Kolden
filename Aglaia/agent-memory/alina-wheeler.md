---
tipo: memoria
squad: Aglaia
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Aglaia/agent-memory/brand-chief|brand-chief]]"
---

# Memória do Agente alina-wheeler (Aglaia)

> Memória persistente deste agente. Atualizada pelo Ritual de Encerramento
> (habilidade `ritual-de-encerramento`) ao final de cada sessão com trabalho.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Missão NutriOS Pro Rebrand v2 — brandbook reescrito (2026-07-03)
- Contrato `m-20260703-nutrios-pro-rebrand-v2` executado como subagente Aglaia paralelo a Harmonia (tokens). Escopo: 3 arquivos do brandbook (03-identidade-visual.md reescrita completa, 00-indice.md resumo atualizado, brandbook.html regerado com paleta 8 cores + Quip via @font-face local + wordmark NUTRIOS PRO caixa-alta). Restrições respeitadas: não tocou 01-posicionamento.md nem 02-voz-da-marca.md (voz e arquétipo Cuidador+Mago inalterados) | 2026-07-03
- Deltas v1→v2 aplicados: (1) paleta expandiu 7→8 cores com sistema warm (Linen Cream/Warm Linen/Terracotta/Espresso) adicionado ao verde/frio; (2) Forest Green removida, preto puro e branco puro deprecados; (3) wordmark redesenhado NUTRIOS PRO caixa-alta bold peso uniforme (v1 nutriOS pro lowercase com "OS" destacado morreu); (4) Baloo 2 substituída por Quip Regular (Ahmad Suhadi, 2025); (5) Geometr415 Blk BT documentada como ativo gráfico do "O" do símbolo — nunca webfont | 2026-07-03
- Dossiê-âncora `_notas-tipografia.md` (assets/2026-06-30-final/) foi insumo primário — extração fontTools do quip.otf + análise PDF pg 3 (paleta) + PNG (4 lockups) já tinham feito trabalho pesado. Lição: quando existe dossiê de leitura de assets prévio, o subagente escritor NÃO precisa re-analisar arquivos-fonte — âncora ao dossiê + verificação pontual do PDF/PNG basta | 2026-07-03

### Método de reescrita in-place de brandbook com histórico via git
- Reescrita "no lugar" (não arquivar v1 em subpasta `v1/`) escolhida pelo Ronan via AskUserQuestion no plan-mode do Hermes: histórico versionado só via git (rastreabilidade sem poluição de árvore) | 2026-07-03
- 3 arquivos-alvo têm caráter distinto: (a) 03-identidade-visual.md é reescrita COMPLETA §1+§2+§3+§4 preservando estrutura Wheeler; (b) 00-indice.md é UPDATE cirúrgico do resumo (não toca §1 nem §2 do índice — voz/arquétipo intactos); (c) brandbook.html regenera arquitetura visual mas mantém seções (nav+hero+manifesto+cores+tipografia+voz+personas+tokens+footer) — não é v1 markdown, é um HTML legado de março/2026 que precedia o brandbook markdown | 2026-07-03
- brandbook.html de 889 linhas: Read por chunks de 300 (não passou de 600 nesse — HTML denso de comps costuma quebrar a partir de ~600). Write completo (não Edit) é mais seguro quando >70% do conteúdo muda (paleta+fontes+wordmark+data+manifesto assinatura) | 2026-07-03

### Verificação anti-deriva via Grep antes de encerrar
- 4 buscas obrigatórias antes de encerrar: (a) `Baloo 2` — só pode aparecer em contexto histórico/deprecação (v1 substituída, alternativa registrada, uso incorreto), NUNCA como texto ativo prescritivo; (b) `Quip` e `Geometr415` presentes; (c) 8 hexes v2 presentes (Neon Mint/Aqua Green/Dark Teal/Deep Forest/Linen Cream/Warm Linen/Terracotta/Espresso); (d) `atualizado-em: 2026-07-03` no frontmatter dos MDs; (e) `#0A5C52` / `#000000` / `#FFFFFF` só em contexto de deprecação explícita | 2026-07-03
- No caso NutriOS Pro v2: 34 ocorrências de "Baloo 2" (todas em contexto histórico), 16 de "Quip", 17 de "NUTRIOS PRO" wordmark, 72 total dos 8 hexes v2 — passa | 2026-07-03

### Contrastes WCAG 2.1 recalculados na doutrina dual-mode
- Par de CTA mudou: v1 era `#000000` sobre `#00E87A` (12.6:1); v2 é `Espresso #2C2416` sobre `Neon Mint #00E87A` (10.8:1). Ambos AAA — mas o v2 alinha o CTA ao sistema warm quente (preto puro morre) | 2026-07-03
- Par padrão de leitura muda POR MODO: modo dark canônico = Linen Cream `#F5F0E8` sobre Deep Forest `#0D2320` (15.9:1 AAA); modo light warm = Espresso `#2C2416` sobre Linen Cream `#F5F0E8` (14.6:1 AAA). Doutrina "dados clínicos exigem o maior contraste" preservada, mas agora tem DOIS pares canônicos, não um só | 2026-07-03
- Terracotta sobre Linen Cream (2.9:1) FALHA para texto pequeno — documentado explicitamente como "só fill de ícone/ilustração/tag decorativa" na §3.3 e no HTML. Anti-padrão nomeado antes de virar bug de acessibilidade em Fase 4 | 2026-07-03

### Licença de webfont é decisão de brandbook, não de designer
- Quip "All Rights Reserved" (Ahmad Suhadi/suhadidesign 2025) tem licença DESKTOP OK, mas WEBFONT em produção pública (`nutriospro.lovable.app`) precisa confirmação com o autor. Regra de segurança registrada no brandbook (§4.1 + banner na seção Tipografia do HTML): wordmark em produção = SVG/PNG estático até licença webfont confirmada. Brandbook interno pode usar `@font-face` local porque é repositório privado da Kolden | 2026-07-03
- Geometr415 Blk BT (Bitstream, comercial) tem restrição ainda mais forte: nunca webfont, nunca embed em documento distribuído. Uso ÚNICO permitido: base vetorial do desenho do "O" no símbolo "nö" (uma única vez, resultado circula como SVG/PNG). Regra classificada como "ativo gráfico proprietário" | 2026-07-03

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
- **Dossiê de leitura de assets prévio como insumo primário** (Aglaia lê `_notas-tipografia.md`, não re-analisa PDF/PNG/OTF) — economiza rodadas quando fase anterior já produziu o dossiê. Padrão aplicável a qualquer subagente de execução que herde de uma fase de descoberta. Origem: alina-wheeler (nutrios-pro-v2), possível cross com brand-chief (Kolden marca audit — que também usou brand book Guilherme Asla como dossiê-âncora) | Detectado: 2026-07-03
- **Grep-check anti-deriva antes de encerrar (padrão dos 4 termos-chave)** — cada reescrita de brandbook/documento oficial verifica: (a) termo deprecado só em contexto histórico; (b) termo novo presente; (c) tokens/hexes/valores novos com contagem esperada; (d) frontmatter com data atualizada. Origem: alina-wheeler (nutrios-pro-v2). Aparece com estrutura semelhante em `feedback_traducao_em_lote.md` (verificar por GREP sobre o resultado, não por relatório) | Detectado: 2026-07-03

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
