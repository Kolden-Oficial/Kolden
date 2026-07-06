---
id: projeto-nutrios-pro-leia-me
titulo: "NutriOS Pro — visão geral"
resumo: "SaaS web para nutricionistas clínicos: avaliação, cálculos energéticos, dietas e monitoramento. Em produção; identidade visual v2 (2026-06-30) oficial."
categoria: projeto
palavras-chave: [projeto, nutricao, saas, supabase]
status: em-producao
atualizado-em: 2026-07-03
relacionados: [prd, arquitetura, decisoes, status]
dossie_cliente: "sobre-a-empresa/clientes/ativos/nutrios-pro.md"
---

# NutriOS Pro

> "Sua prática clínica merece um sistema operacional."

## Cliente

Dossiê (negócio, contrato, ICP, metas): [`clientes/ativos/nutrios-pro.md`](../../sobre-a-empresa/clientes/ativos/nutrios-pro.md). Este projeto é a **execução**; o dossiê é a **inteligência de negócio**.

## O que é
O **NutriOS Pro** (ex-NutriCalc Pro) é um SaaS web que centraliza o fluxo clínico do nutricionista num único Web App: cadastro de pacientes, avaliação antropométrica, cálculos energéticos automatizados, montagem de planos alimentares e monitoramento visual da evolução. Nasceu da evolução de duas planilhas de Excel avançadas (cálculo de dieta + medição corporal) vendidas na Hotmart. O público principal são **nutricionistas clínicos** que atendem individualmente, além de estudantes recém-formados e do "público metódico" (entusiastas de esporte/estética que controlam a própria nutrição com rigor). O diferencial frente a calorias-apenas é o módulo de saúde integral e mudança comportamental, mirando adesão e fidelização do paciente.

## Documentos
- `prd.md` — problema, escopo, requisitos, métricas, riscos
- `arquitetura.md` — stack, componentes, fluxos, dados
- `decisoes.md` — log de decisões (ADRs)
- `status.md` — situação atual e próximos passos
- `assets/` — identidade visual original (logo + paletas em PDF) e o relatório técnico-fonte
- `brandbook/` e `design-system/` — fundação visual própria (Fase 3 documental concluída e oficial; aplicação no código é a Fase 4)

## Links
- **Código:** https://github.com/Koldenoficial/nutriospro (clone local em `app/`)
- **Deploy (produção):** https://nutriospro.lovable.app
- **Domínio:** nutriospro.com.br (Registro.br) — DNS/proxy via Cloudflare
