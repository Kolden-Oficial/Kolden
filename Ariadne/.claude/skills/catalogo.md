# Catálogo de Habilidades — Ariadne

Habilidades disponíveis ao squad Ariadne, seu gatilho de invocação e propósito.

## Habilidades de domínio (embutidas nos especialistas)
O conhecimento operacional de cada frente vive nos `core_frameworks` do agente especialista + nas
`tasks/` + nos arquivos de `data/`. Não há SKILL.md duplicado — a fonte é o agente. Mapa:

| Frente | Onde vive | Agente dono |
|---|---|---|
| Auditoria de SEO técnico | `agents/auditor-tecnico-seo.md` + `tasks/auditar-seo-tecnico.md` | auditor-tecnico-seo |
| Arquitetura de informação | `agents/arquiteto-de-site.md` + `tasks/desenhar-arquitetura.md` | arquiteto-de-site |
| Dados estruturados (schema) | `agents/engenheiro-de-schema.md` + `tasks/implementar-schema.md` | engenheiro-de-schema |
| Conteúdo on-page / programático | `agents/estrategista-de-conteudo-seo.md` + `tasks/seo-programatico.md` | estrategista-de-conteudo-seo |
| AI-SEO (AEO/GEO/LLMO) | `agents/otimizador-ai-seo.md` + `tasks/otimizar-para-ai-search.md` | otimizador-ai-seo |
| CRO de página | `agents/analista-de-cro.md` + `tasks/analise-de-cro.md` + `data/biblioteca-de-experimentos-cro.md` | analista-de-cro |
| CRO de formulário | `agents/otimizador-de-formulario.md` + `tasks/otimizar-formulario.md` | otimizador-de-formulario |

## Habilidades de frentes novas (SKILL.md próprios — absorção claude-seo)
Frentes que a Ariadne não cobria no esqueleto original e ganharam SKILL.md em `.claude/skills/`.
Absorvidas de `AgriciDaniel/claude-seo@d830cdb` (MIT; FLOW = CC BY 4.0). Ainda sem especialista
dedicado: por ora são operadas pelo `ariadne-chief` + especialista adjacente (futuro: materializar
especialistas locais/i18n/e-commerce).

| Habilidade | Gatilho | Propósito | Adjacência |
|---|---|---|---|
| `seo-local-e-mapas` | "SEO local", "GBP", "map pack", "NAP", "geo-grid", "concorrentes por raio" | SEO local no site (NAP/schema/páginas de localização) + inteligência de mapas (geo-grid/SoLV/GBP) | auditor-tecnico-seo + engenheiro-de-schema |
| `seo-internacional-hreflang` | "hreflang", "SEO internacional", "i18n", "multi-idioma/região" | Validar/gerar hreflang + paridade de conteúdo + adaptação cultural | auditor-tecnico-seo |
| `seo-ecommerce` | "SEO de e-commerce", "Google Shopping", "product schema", "marketplace" | Página de produto + schema Product/UCP + inteligência de marketplace | engenheiro-de-schema + estrategista-de-conteudo-seo |
| `monitoramento-de-drift-seo` | "drift de SEO", "baseline", "quebrou algo", "checagem pós-deploy" | Git para SEO: baseline/compare/history de elementos SEO-críticos | auditor-tecnico-seo |
| `sxo-search-experience` | "SXO", "tipo de página errado", "por que não ranqueio", "score por persona" | Ponte SEO↔CRO: SERP de trás pra frente, mismatch de tipo, score por persona | analista-de-cro + arquiteto-de-site |
| `seo-de-imagens` | "SEO de imagem", "alt text", "otimizar imagens", "converter para webp", "image SERP" | Otimização de imagem para ranqueamento + CWV + metadados IPTC (rótulo IA) | auditor-tecnico-seo |
| `framework-flow` | "FLOW", "SEO guiado por evidência", "find leverage optimize win" | Camada de método (Find→Leverage→Optimize→Win) para o chief orquestrar as frentes | ariadne-chief |

## Habilidades compartilhadas (fonte única no workspace)
| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |
