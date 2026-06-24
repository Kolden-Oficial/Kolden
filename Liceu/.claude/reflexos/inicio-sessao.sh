#!/bin/bash
# Reflexo SessionStart — carrega o estado do squad Liceu no início de cada sessão

echo "LICEU ATIVO — Biblioteca de Mentes da Kolden (a escola de Aristóteles)."
echo "Orquestrador: @liceu-chief (🏛️). Dissecação: biografo, cartografo-de-modelos, ceptico-verificador, lexicografo."
echo "Estrutura: genealogista (🌳), bibliotecario (📚). Operacionalização: sintetizador (⚗️), ponte-de-encarnacao (🌉)."
echo "Regra de ouro: nada vira FATO sem fonte primária + ano; o resto é folclore, e folclore se rotula. Nenhum dossiê sem linhagem; nenhum framework sem procedência."

if [ -f "$CLAUDE_PROJECT_DIR/MEMORY.md" ]; then
  echo "Memória do squad carregada (MEMORY.md)."
fi

echo "Para dissecar: '@liceu dissect \"<mente ou tema>\"' ou o comando *journey para a dissecação completa de uma linhagem."
echo "Fronteira: mente/pensador = Liceu; mercado/concorrente = Argos; criar agente conversável = Caos (handoff)."

exit 0
