#!/usr/bin/env bash
# Converte todos os MDs de entrega + decks HTML da BRW em PDF (+ HTML intermediário).
# Saída: _publish/output/<slug>.pdf e .html
set -euo pipefail

BASE="C:/Kolden/sobre-a-empresa/Projetos/Ativos/brw-movelaria"
PUB="$BASE/_publish"
OUT="$PUB/output"
CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
mkdir -p "$OUT"

# Formato: "input.md|slug|Título"
# Path absoluto Windows para o Chrome
convert_md() {
  local input_rel="$1"; local slug="$2"; local title="$3"
  local input="$BASE/$input_rel"
  local html_out="$OUT/$slug.html"
  local gdoc_html_out="$OUT/$slug.gdoc.html"
  local pdf_out="$OUT/$slug.pdf"
  local pdf_win; pdf_win="C:\\Kolden\\sobre-a-empresa\\Projetos\\Ativos\\brw-movelaria\\_publish\\output\\$slug.pdf"
  local html_win; html_win="file:///C:/Kolden/sobre-a-empresa/Projetos/Ativos/brw-movelaria/_publish/output/$slug.html"

  echo ">> $slug"
  node "$PUB/md-to-html.js" "$input" "$html_out" "$title" >/dev/null
  node "$PUB/md-to-html-gdoc.js" "$input" > "$gdoc_html_out"
  node "$PUB/html-to-docx.js" "$gdoc_html_out" "$OUT/$slug.docx" >/dev/null
  "$CHROME" --headless=new --disable-gpu --print-to-pdf="$pdf_win" --print-to-pdf-no-header "$html_win" 2>&1 | grep -E "bytes written|ERROR" | head -1
}

convert_html_deck() {
  local input_rel="$1"; local slug="$2"
  local input_win="file:///C:/Kolden/sobre-a-empresa/Projetos/Ativos/brw-movelaria/$input_rel"
  local pdf_win; pdf_win="C:\\Kolden\\sobre-a-empresa\\Projetos\\Ativos\\brw-movelaria\\_publish\\output\\$slug.pdf"
  echo ">> deck: $slug"
  "$CHROME" --headless=new --disable-gpu --virtual-time-budget=15000 --print-to-pdf="$pdf_win" --print-to-pdf-no-header --no-pdf-header-footer "$input_win" 2>&1 | grep -E "bytes written|ERROR" | head -1
}

echo "=== MARCA ==="
convert_md "marca/brandbook.md"          "brandbook"              "Brandbook BRW"
convert_md "marca/posicionamento.md"     "posicionamento"         "Posicionamento"
convert_md "marca/narrativa.md"          "narrativa"              "Narrativa"
convert_md "marca/voz-e-tom.md"          "voz-e-tom"              "Voz e Tom"
convert_md "marca/mensagens-chave.md"    "mensagens-chave"        "Mensagens-Chave"
convert_md "marca/premissas-e-premorte.md" "premissas-e-premorte" "Premissas e Premorte"

echo "=== ESTRATÉGIA ==="
convert_md "_publish/dossie-cliente.md"                        "dossie-brw"             "Dossiê BRW Movelaria"
convert_md "roteiro-reuniao-socios-2026-07-XX.md"              "roteiro-reuniao-socios" "Roteiro Reunião Sócios"

echo "=== PESQUISA ==="
convert_md "pesquisa/dossie-concorrentes.md"       "dossie-concorrentes"        "Dossiê Concorrentes"
convert_md "pesquisa/prospeccao-bahia.md"          "prospeccao-bahia"           "Prospecção Bahia"
convert_md "pesquisa/prospeccao-hotelaria-bahia.md" "prospeccao-hotelaria-bahia" "Prospecção Hotelaria Bahia"
convert_md "pesquisa/prospeccao-studios-bahia.md"  "prospeccao-studios-bahia"   "Prospecção Studios Bahia"

echo "=== SOCIAL ==="
convert_md "social/linha-editorial-agosto-2026.md"            "linha-editorial-agosto-2026"       "Linha Editorial - Agosto 2026"
convert_md "social/matriz-de-conteudo-2026-07-15.md"          "matriz-de-conteudo"                "Matriz de Conteúdo"
convert_md "social/plano-teste-e-metricas-agosto-2026.md"     "plano-teste-metricas"              "Plano de Teste e Métricas - Agosto 2026"
convert_md "social/briefings-ancora-carrossel-agosto-2026.md" "briefings-ancora-carrossel"        "Briefings Âncora - Carrossel - Agosto 2026"
convert_md "social/briefings-ancora-reels-agosto-2026.md"     "briefings-ancora-reels"            "Briefings Âncora - Reels - Agosto 2026"

echo "=== DECKS HTML ==="
convert_html_deck "apresentacao/deck-socios.html"              "apresentacao-socios"
convert_html_deck "apresentacao-linha-editorial/index.html"    "apresentacao-linha-editorial"
convert_html_deck "marca/brandbook.html"                       "brandbook-visual"

echo ""
echo "=== FIM ==="
ls -la "$OUT"/*.pdf | awk '{print $5, $NF}'
