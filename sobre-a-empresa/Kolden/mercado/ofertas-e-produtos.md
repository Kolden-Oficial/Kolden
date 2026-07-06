---
id: ofertas-e-produtos
titulo: "Ofertas e Produtos"
resumo: "O que a Kolden oferece/vende e como gera receita: linhas de serviço, modelo de proposta comercial e lógica de precificação."
categoria: mercado
palavras-chave: [ofertas, produtos, servicos, receita, precos, proposta, assessoria, performance]
status: rascunho
atualizado-em: 2026-06-25
relacionados: [icp-e-personas, posicionamento, metricas-e-okrs, area-receita, processos]
fontes: drive--02-comercial
---

# Ofertas e Produtos

> Seções abaixo absorvidas da área comercial do Drive ("06 | Templates & Ferramentas", 2026-06-25). Acervo comercial-ouro estava fora da estrutura oficial "02 | Comercial" (que está vazia). Ver mapa de decisão da absorção.

## 1. Linhas de serviço ("Serviços que prestamos")

A Kolden se posiciona como **ecossistema 360º de gestão, marketing e vendas** — não como agência fragmentada. Cinco linhas de serviço documentadas (doc interno "Serviços que prestamos"):

1. **Tráfego Pago** — estruturação estratégica de campanha, otimização, testes de criativos; tráfego para Facebook, Google, YouTube; estratégias de retenção e aumento de LTV; landing pages e sites.
2. **Social Media** — estratégia de conteúdo; nutrição do público atraído; conversão de seguidores; aumento de engajamento/visualização; atração de público orgânico qualificado; crescimento de marca e presença.
3. **Gestão Comercial** — treinamento de vendas; script de vendas; implementação de CRM; aprimoramento da cultura do time; acompanhamento comercial.
4. **Implementação de IA** — automação de atendimento; automação de processos; criação de software e aplicativos.
5. **Gestão de Dados** — dashboard financeiro em tempo real; planilha de dados para previsibilidade de crescimento.

> A oferta é embalada comercialmente como **"Assessoria de Performance"** (nome usado no pipeline e nos scripts de prospecção). Há também ofertas de **Lançamento, Mentoria e Infoproduto** que aparecem como categorias de serviço na Central de Oportunidades.

> Catálogo complementar (visão jurídico/contrato, absorvido em `operacao/processos.md` §2 da área "00 | Gestão Empresarial"): 8 frentes — Consultoria de Marketing & Vendas, Gestão Avançada de CRM, Copywriting, Tráfego Pago (Facebook/Google), Google Meu Negócio, Automação (ManyChat), Inteligência de Dados, Suporte & Auxílio Integrado. As duas listas são complementares: a daqui é a fala comercial; a de processos.md é o escopo contratual.

## 2. Modelo de remuneração / receita (visão interna)

Dados do documento "Proposta de Parceria Kolden: O Squad" e do "Simulador de Ganhos Kolden" (planilha):

- **Ticket médio mensal por cliente:** R$ 3.000,00 (fee).
- **Tempo de contrato mínimo:** 6 meses (LTV-base ≈ R$ 18.000 por cliente).
- **Modelos de cobrança:** **Fee** (mensalidade fixa) ou **Porcentagem** (sobre performance/faturamento do cliente) — escolhido caso a caso na Central de Oportunidades.
- **Comissionamento do squad** (modelo inicial de tração): fixo de R$ 3.000/membro + **Bônus Hunter** de 50% sobre o 1º fee de cliente indicado/fechado + **Bônus Upsell** de 5% ao converter cliente de DPMV para Assessoria completa.

> Esses números refletem o estágio de tração documentado (faturamento então de R$ 14–15k/mês, 8–9 clientes ativos). Tratar como retrato de um momento, não como estado atual confirmado.

## 3. Lógica de precificação

A precificação de serviço é baseada em (doc "Serviços que prestamos"):
- **Faturamento** do cliente;
- **Margem de lucro** do cliente;
- **Poder do negócio** (capacidade de investimento).

Exemplo registrado: pizzaria faturando R$ 20k/mês, margem 10% → pacote (CRM + script de vendas + planilha financeira) com orçamento total de R$ 2.000. A meta era tornar a precificação **automatizável** por perfil de cliente.

## 4. Modelo de Proposta Comercial (processo de criação)

Processo de 6 passos para montar a apresentação comercial de cada cliente (doc "Serviços que prestamos"):
1. Fazer a reunião de sondagem.
2. Extrair o documento transcrito da reunião.
3. Mapear todos os gargalos e oportunidades (via LLM).
4. Revisar o documento.
5. Enviar o mapeamento para ferramenta no-code (Lovable).
6. Gerar a apresentação web com dores/necessidades/soluções do cliente específico.

Existe um **prompt-template versionado** (React + Tailwind + Framer Motion) que gera a apresentação comercial interativa em 10 slides padronizados: Capa → Diagnóstico/Gargalos → "Como vamos resolver?" → Proposta (o que está incluso) → "Investimento" → Valores/Pricing (mão de obra + publicidade + total, com botão de desconto) → 3 slides de Implementação por Fases → Metas e Resultados Esperados. Design system: fundo escuro, glass cards, paleta com tokens HSL, tipografia mono para labels. Regra-mestra do prompt: **"Nunca invente dados; toda informação variável vem de [INPUT]."** O arquivo-fonte do prompt está no doc; o template de slides existe também como Google Slides ("Modelo Proposta Comercial - Kolden").

## Perguntas-guia
- A precificação automatizável por perfil (faturamento × margem × poder) chegou a virar calculadora? (existe "Calculadora de Ganhos - Kolden", mas é simulador de remuneração do squad, não de precificação ao cliente).
- O ticket de R$ 3.000 e contrato de 6 meses ainda valem como padrão?

## Fontes (Drive)
Área comercial ("06 | Templates & Ferramentas"):
- `12IMSyDq6UrccLkMl0beUuEwiUz7pp3JznrFyyGlXooQ` — Serviços que prestamos (Doc).
- `1Z1gAAE6kh40anDoUDROAXxiHCFZv6PNDy9HEGvT-ajE` — Proposta de Parceria Kolden: O Squad (Doc).
- `1c9Baehfc4p__zFVQw_6r-BdkQb1fmxSawxuXNtdeTto` — Calculadora de Ganhos / Simulador (Sheet).
- `1aIejRsZ72bz6EHcP4iLwgEawz0D9Gcn_48FwSxCGVuk` — Modelo Proposta Comercial - Kolden (Slides).
- `1A9ehlUTsQZxtQEMTbkjvs1FgGf4CFsZ7` — Copy Proposta Comercial (.docx, binário; não aberto).
