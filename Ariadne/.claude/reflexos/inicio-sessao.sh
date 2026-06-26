#!/bin/bash
# Reflexo SessionStart — carrega o estado do squad Ariadne no início de cada sessão

echo "ARIADNE ATIVA — squad de Execução de SEO + CRO de Página (o fio que guia do labirinto à conversão)."
echo "Orquestradora: @ariadne-chief (🧵). SEO: auditor-tecnico-seo, arquiteto-de-site, engenheiro-de-schema, estrategista-de-conteudo-seo, otimizador-ai-seo."
echo "CRO: analista-de-cro, otimizador-de-formulario."
echo "Regra de ouro: recomendação só com DADO/FONTE; CRO só por HIPÓTESE TESTÁVEL; nada de black-hat/cloaking; copy é handoff ao Caliope."
echo "Handoffs: ← Argos (keywords/SERP) · ↔ Caliope (copy) · → Metis (medição) · ↔ Aglaia (marca)."

if [ -f "$CLAUDE_PROJECT_DIR/MEMORY.md" ]; then
  echo "Memória do squad carregada (MEMORY.md)."
fi

echo "Para começar: '@ariadne-chief' e descreva o site/página; o comando *journey conduz a jornada completa (auditar → arquitetar → otimizar → converter)."

exit 0
