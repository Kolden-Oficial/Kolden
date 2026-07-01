---
id: projeto-nutrios-pro-prd
titulo: "NutriOS Pro — PRD"
resumo: "Requisitos do SaaS de nutrição clínica: escopo dos sprints, regras de negócio e métricas."
categoria: projeto
palavras-chave: [prd, requisitos, nutricao, saas]
status: em-producao
atualizado-em: 2026-06-24
relacionados: [leia-me, arquitetura]
---

# PRD — NutriOS Pro

## Problema
Nutricionistas clínicos dependem de cálculos manuais e múltiplas planilhas de Excel — complexas, sobretudo para recém-formados — para avaliação antropométrica, cálculo energético e montagem de dietas. Além da fricção operacional, o maior gap do mercado é o foco exclusivo em calorias: o paciente "aprende e não volta", abandona a dieta e o profissional não consegue comprovar evolução. Falta um sistema que una cálculo, visualização de resultados e mudança comportamental num só lugar.

## Objetivo / resultado esperado
- Centralizar todo o fluxo clínico do nutricionista num único Web App.
- Aumentar o faturamento e o ticket médio do profissional, oferecendo um serviço mais completo e visual (gráficos que comprovam evolução).
- Construir um SaaS rentável e recorrente (assinatura mensal), com LTV crescente, capaz de atrair sócios-investidores e sustentar dedicação integral dos fundadores.

## Escopo (e fora de escopo)

### Dentro do escopo (Sprints 1–4, entregues)
- **Autenticação** — login e controle de acesso.
- **Dashboard** — resumo gerencial e administrativo.
- **Gestão de pacientes** — CRUD completo.
- **Avaliações** — antropometria tradicional, por fotos e Body 3D (com protocolos de dobras cutâneas e bioimpedância).
- **Metas energéticas** — TMB, GET, VET, hidratação e suplementação.
- **Dietas** — refeições, macros, templates.
- **Evolução** — monitoramento em gráficos temporais (Recharts).
- **Consumo** — registro manual ou por análise de foto (IA).
- **Exames** — análise de laboratoriais por IA.
- **Alimentos** — base TACO/IBGE + customizados; importação massiva via CSV.
- **Módulo comportamental** — sono, cortisol, stress, técnicas (respiração, ciclo circadiano).
- **Administração** — audit logs, roles, backups; configurações de sistema/usuário.
- **Exportação** — relatórios em PDF (entrega ao paciente).

### Fora de escopo (versão atual)
- O paciente **não** tem login direto na plataforma — recebe os planos via PDF.
- **Sprint 5 (futuro):** portal web mobile-first dedicado ao paciente (registro via push notifications) e integração com wearables/smartwatches via Bluetooth.

## Requisitos

### Segurança e autenticação
- Senha validada por Zod (padrão OWASP): mínimo 8 caracteres, ao menos uma maiúscula, uma minúscula e um número.
- Lockout progressivo anti-brute-force (`Auth.tsx`): 30s após 3 falhas; 5 min após 5 tentativas.
- Anti-enumeração: mensagens de falha genéricas para não revelar e-mails cadastrados.
- Sessão em `localStorage` com `persistSession: true` e `autoRefreshToken: true`.

### Mídia e IA
- Rate limiting por usuário/hora (`rate_limit_log`): 50 em `analyze-food-photo`; 30 em Body 3D e rótulos; 20 em fotos e checkups.
- Uploads (`validateFile()`): somente `.jpeg`, `.png`, `.webp`, `.pdf`; máximo 10 MB. Paths validados por `validateStorageUrl()`; nomes higienizados com UUID via `generateSafeFilename()`.

### Regras clínico-nutricionais
- TMB escolhida pela classificação corporal: Harris-Benedict (eutrófico), Mifflin (sobrepeso) ou Tinsley.
- VET = GET + ajuste do objetivo (superávit/déficit).
- Macros (`calculateMacros()`): proteína e carboidrato 4 kcal/g; gordura 9 kcal/g.
- `calculateNavy()` limita % de gordura entre 0 e 60%.
- Creatina: recomendação 3–5 g/dia, limite absoluto 6 g.
- `behavioral_logs` (`trg_validate_behavioral_log`): `sleep_quality` e `stress_level` aceitam apenas inteiros de 1 a 10.

## Métricas de sucesso
- Recorrência de assinantes (MRR/LTV) como base de valuation.
- Ticket médio do nutricionista assinante (serviço mais completo e visual).
- Adesão e retenção do paciente final (efeito do módulo comportamental).

## Riscos / modos de falha
- **Mercado:** receio de que a automação "dispense" o nutricionista (automedicação alimentar se o app chegar ao consumidor final isolado).
- **Concorrência:** WebDiet e Dietbox, consolidados e com alta adesão.
- **Dívida técnica** (detalhada em `status.md` e `arquitetura.md`): RLS inconsistente, componentes oversized, performance de API, fotos sem compressão, gerador de PDF rígido, backup destrutivo sem rollback, ausência de testes E2E.

## Histórico de versões
- **2026-06-24** — Refração do dossiê técnico-fonte (emitido em 01/04/2026) no padrão de PRD Kolden. Conteúdo fiel ao documento original `assets/relatorio-original.md`.
