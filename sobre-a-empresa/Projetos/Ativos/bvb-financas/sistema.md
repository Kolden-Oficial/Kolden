---
id: projeto-bvb-financas-sistema
titulo: "BVB Finanças — Proposta do Sistema (SaaS de gestão financeira)"
resumo: "PDF de 1.7 MB armazenado localmente. Não legível como texto (imagem/scan) — requer leitura visual antes de qualquer conversa técnica."
categoria: projeto
palavras-chave: [sistema, saas, produto, gestao-financeira]
status: rascunho-parcial
atualizado-em: 2026-07-06
relacionados: [dossie, infoprodutos, status]
tipo: projeto
projeto: bvb-financas
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/bvb-financas/dossie|dossie]]"
---

# Sistema BVB — Proposta

> **Status desta ficha:** parcial. O documento canônico é `assets/pdfs/Proposta_do_Sistema.pdf` (1.7 MB). A tentativa de extração via `pdftotext` retornou 11 bytes — indicando que o PDF é **imagem/scan ou renderizado como bitmap**, não texto pesquisável. Requer leitura visual antes de qualquer conversa técnica com o Bruno sobre desenvolvimento.

## O que sabemos

- **Documento existe** no Drive raiz do cliente (`1SOkuxAFt89V0S_IsvIxAnrXMqNy4o537`), com nome literal **"Proposta do Sistema.pdf"**
- **Tamanho:** 1.701.890 bytes (~1.7 MB) — muito maior que os outros PDFs (fundamentos: 9 KB, manual: 18 KB, briefing: 15 KB), sinal de PDF com muitas imagens/screenshots/mockups
- **Contexto pelo nome:** "Sistema" é uma referência recorrente na plataforma de gestão financeira mencionada indiretamente pelo Manual v1 quando fala em ferramenta (mas não é o produto principal), e pelas mensagens da concorrência que lista **Conta Azul, Cora, Granatum, Neon, BTG** como categoria de "ferramentas". Provável hipótese: o Bruno está desenhando um **SaaS proprietário** de gestão financeira que integra PJ + PF (coerente com a tese v2).

## Hipóteses para verificar quando o PDF for lido

1. **Escopo:** é a proposta do próprio Bruno para o produto (visão + roadmap) ou é uma proposta comercial de um fornecedor de desenvolvimento?
2. **Estágio:** wireframes/mockups ou blueprint técnico?
3. **Público-alvo:** MEI sufocado, empresário em transição, ou os dois?
4. **Diferencial vs Conta Azul / Cora / Granatum:** integração PF+PJ é a hipótese mais provável dado o posicionamento
5. **Modelo comercial:** assinatura mensal? bundle com o Método Raiz da Riqueza?
6. **Custo/prazo se for para desenvolver:** pode ser a maior frente de trabalho da Kolden para este cliente

## Ação recomendada

Antes de qualquer conversa de escopo/orçamento com o Bruno:

1. Abrir o PDF localmente (`assets/pdfs/Proposta_do_Sistema.pdf`) e ler página a página
2. Se as páginas forem mockups renderizados, extrair as telas para `assets/identidade-visual/proposta-do-sistema/` como PNGs para referência
3. Preencher esta ficha com o conteúdo real do documento
4. Cruzar com o resto do plano — o sistema é o item de maior potencial de receita recorrente para a BVB (contra o modelo curso-em-vídeo dos concorrentes)

## Ligação com o Método Raiz da Riqueza

A Planilha do Método (`assets/pdfs/Planilha_Metodo_Raiz_da_Riqueza.xlsx`) tem 18 abas com **frameworks proprietários** (RPN/RPP, PEP níveis 1-3, Fluxo360, Farol Financeiro, Círculo da Prosperidade, Radar da Rentabilidade, Estágios, Tabela dos Sonhos, INSS x Aporte, Comprar ou Alugar).

**Hipótese forte:** o Sistema BVB é a **digitalização em SaaS** desses frameworks. Se confirmada, a proposta técnica se traduz em: "converter o Excel + as fórmulas + as regras de cálculo em um app web multi-usuário, com autenticação e cobrança recorrente." O que já existe no Excel é o backbone da lógica de negócio — não precisa reinventar.

Essa hipótese, se correta, é boa notícia para escopo: **o produto já foi validado no papel** (o Excel é a v0), e o desenvolvimento vira execução de um blueprint pronto — não descoberta.
