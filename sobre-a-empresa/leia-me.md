---
id: sobre-a-empresa-leia-me
titulo: "Sobre a Empresa — índice"
resumo: "Mapa do cérebro da Kolden: por onde a IA navega para saber tudo sobre a empresa."
categoria: identidade
palavras-chave: [indice, navegacao, empresa, kolden]
status: vigente
atualizado-em: 2026-06-18
relacionados: [visao-geral, indice]
---

# Sobre a Empresa — cérebro da Kolden

Esta pasta concentra **tudo sobre a Kolden** para consumo de IAs e pessoas. Cada documento é **single-topic**, tem frontmatter YAML (machine-readable) e é lido **sob demanda** (progressive disclosure). O registro completo está em `indice.yaml`.

## Como navegar
- Pergunta sobre **o que é / como funciona** a empresa → `identidade/`
- Pergunta sobre **clientes, ofertas, posição no mercado** → `mercado-e-posicionamento/`
- Pergunta sobre **como falamos / comunicação** → `marca/`
- Pergunta sobre **como rodamos a operação** → `operacao/`
- Termo desconhecido → `glossario.md` · Dúvida comum → `faq.md`

## Mapa
| Pasta | Conteúdo |
|---|---|
| `identidade/` | visao-geral · missao-visao-valores · historia · organograma |
| `areas/` | organização por departamento (visão lógica) + elenco de agentes/pessoas por área |
| `mercado-e-posicionamento/` | icp-e-personas · ofertas-e-produtos · posicionamento · concorrencia |
| `marca/` | voz-e-tom · mensagens-chave · identidade-visual |
| `operacao/` | processos · metricas-e-okrs |
| (raiz) | glossario.md · faq.md · indice.yaml |

> **Áreas:** a Kolden se organiza por departamentos. Cada área (`areas/<area>.md`) tem carta, funções, **elenco** (agentes-funcionários) e KPIs. Os agentes não são movidos — a área só os lista. Detalhe em `areas/leia-me.md`.

## Convenções
- **PT-BR, kebab-case**, frontmatter YAML em todo `.md`.
- `status`: `rascunho` (em construção) · `vigente` (oficial) · `arquivado`.
- Fonte única da verdade: um fato mora em um lugar; outros documentos referenciam.
- Segredos: **nunca** aqui — só no Infisical.
