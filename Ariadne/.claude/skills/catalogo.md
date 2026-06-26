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

## Habilidades compartilhadas (fonte única no workspace)
| Habilidade | Gatilho | Propósito |
|---|---|---|
| `ritual-de-encerramento` | Fim de toda sessão com trabalho (reflexo `Stop`) | Reflete e grava lições no `MEMORY.md` do squad. Fonte: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md` |
| `infisical-padrao` | Sempre que precisar de credencial/segredo | Buscar segredos via Infisical (nunca texto puro). Fonte: `Caos/.claude/skills/infisical-padrao/` |
| `verificacao-de-alinhamento` | SessionStart >24h (reflexo `verificacao-diaria`) | Checa pontas soltas nos documentos do squad |
