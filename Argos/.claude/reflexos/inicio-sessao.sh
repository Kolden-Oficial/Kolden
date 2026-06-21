#!/bin/bash
# Reflexo SessionStart — carrega o estado do squad Argos no início de cada sessão

echo "ARGOS ATIVO — squad de Inteligência de Mercado & Scraping (o deus das pesquisas)."
echo "Orquestrador: @argos-chief (👁️). Funções: web-harvester, serp-seo-cartografo, ads-intel, market-sizer, competitor-mapper, research-synthesizer."
echo "Redes: instagram, tiktok, youtube, linkedin, x, facebook, reddit. Compliance: @compliance-sentinela (🛡️)."
echo "Regra de ouro: nenhum dado no relatório sem FONTE + TIMESTAMP + cross-check. Zona ToS-cinza só via @compliance-sentinela, com autorização humana."

if [ -f "$CLAUDE_PROJECT_DIR/MEMORY.md" ]; then
  echo "Memória do squad carregada (MEMORY.md)."
fi

echo "Para pesquisar um mercado: '@argos research \"<nicho>\"' ou o comando *journey para a jornada completa (macro→micro)."

exit 0
