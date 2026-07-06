---
id: projeto-nutrios-pro-status
titulo: "NutriOS Pro — Status"
resumo: "v1 em produção (Sprints 1–4 concluídos); identidade visual v2 oficial (2026-07-03); pendências de testes, billing, dívida técnica e Fase 4 do redesign."
categoria: projeto
palavras-chave: [status, progresso, roadmap]
status: em-producao
atualizado-em: 2026-07-03
relacionados: [leia-me]
---

# Status — NutriOS Pro

- **Fase atual:** Produto completo **v1**, funcional e em produção em `nutriospro.lovable.app` (dossiê técnico de 01/04/2026). Sprints 1, 2, 3 e 4 concluídos. Infra de marketing (Business Manager, domínio, cartões, Instagram/Facebook) ativada.
  - **Sprint 1:** correção de URL assinada de fotos, PDF de dieta reestruturado, acentos de alimentos, overflow e falhas numéricas.
  - **Sprint 2:** bancos e constraints comportamentais, checks de metas, policies RLS ativadas, categorias de templates.
  - **Sprint 3:** filtros históricos de UI, leitor de PDF em modal (`<iframe>`), gráficos Recharts consolidados, importação massiva liberada.
  - **Sprint 4:** módulo comportamental (sono, estresse, técnicas editáveis por IA), novos gráficos, templates de marketing ("Desafio 30 dias de Hipertrofia", "Dieta Cariani" etc.).

- **Próximos passos:**
  - Testes End-to-End maciços do sistema pronto (hoje só mocks superficiais de Vitest).
  - Ideação e desenvolvimento do **Sprint 5**: portal web mobile-first para o paciente (push notifications) + sync Bluetooth com wearables.
  - Implementar e aprovar pagamentos (Stripe/gateway próprio).
  - **Fase 3 v2 — CONCLUÍDA e oficial (2026-07-03):** identidade visual **v2** promovida a `status: oficial` (brandbook + design-system + apresentação reescritos in-place). Deltas materiais: paleta expandida para **8 cores** com estratégia dual-mode (verde-frio + linho-quente); wordmark refeito para **`NUTRIOS PRO` caixa-alta bold** em fonte **Quip Regular** (Ahmad Suhadi, 2025); "O" do símbolo derivado de **Geometr415 Blk BT** (ativo gráfico, não webfont); Forest Green removido; preto/branco puros deprecados em favor de Espresso/Linen Cream. Voz, arquétipo e posicionamento preservados. Contrato de Missão: `Olimpo/contratos/missoes/m-20260703-nutrios-pro-rebrand-v2.yaml`. Assets finais em `assets/2026-06-30-final/` com dossiê `_notas-tipografia.md`. Nada tocou o código de produção.
  - **Fase 4 — aplicação do redesign v2 no código `app/` (não iniciada):** sondagem confirmou que o `app/` segue 100% na identidade antiga (`#0D8070`/`#00FF94`, light-first), com scaffold Vite residual, monólitos intactos e o gradiente cyan/blue do WaterTracker. Roteiro **atualizado para v2** em `design-system/02-tokens/leia-me.md §4`: colar `tokens.css` (dual-mode), importar o preset Tailwind v2, **copiar `quip.otf` para `app/public/fonts/quip.otf` e servir via `@font-face` local** (não Google Fonts) — assumindo licença webfont confirmada, senão renderizar wordmark como SVG/PNG estático em produção; default dark-first canônico; limpar scaffold, corrigir `WaterTracker` (novo `--gradient-water`) e `theme-color`, consolidar toast; depois refator dos monólitos e re-skin componente a componente.

- **Bloqueios:**
  - Google Ads com "compra negada" ao adicionar cartão — reavaliar.
  - **Dívida técnica:**
    - RLS inconsistente: `behavioral_logs`, `diet_templates`, `meal_checks` usam policy `PERMISSIVE` em vez de `RESTRICTIVE`.
    - Componentes oversized: `PatientAssessmentsTab.tsx` (2.000+ linhas), `PatientDietsTab.tsx` (1.300+ linhas).
    - Performance: `fetchStats()` do dashboard em requisições sequenciais; React Query subutilizado (sem cache/refetch/dedupe).
    - Fotos sem compressão client-side (até 10 MB drenam o Storage); sem thumbnails.
    - Gerador de PDF com limite rígido no eixo Y (`yPos > 250` quebra página); falha com nomes/anotações longos e fontes especiais.
    - `backup-settings` faz hard reset destrutivo das 13 tabelas sem rollback — falha intermediária corrompe o banco.
    - Ausência de testes E2E.

- **Pendências de assets / validação (Fase 3 v2 → Fase 4):**
  - **Licença webfont Quip** — confirmar com Ahmad Suhadi (`suhadidesign`, autor). O `quip.otf` tem metadata "All Rights Reserved" (proprietária). Uso interno em `@font-face` local do repositório privado Kolden é OK; produção pública em `nutriospro.lovable.app` exige licença webfont explícita OU wordmark servido como SVG/PNG estático. **Bloqueia** o embed em produção da Fase 4.
  - Arquivos **vetoriais SVG/AI** oficiais do logo/mascote/lockups — hoje só existem PDFs em `assets/` (v1) e PDF+PNG em `assets/2026-06-30-final/` (v2). Inclui favicon e ícones PWA (16/32/180/512). Pendência continua da v1.
  - **Auditoria de contraste in-vivo** das telas reais contra a tabela WCAG v2 recalculada em `design-system/02-tokens/leia-me.md §5` — depende da aplicação no código (Fase 4). Novo par âncora de CTA v2: Espresso/Neon Mint (10.30:1 AAA).
  - Validação ampliada **opcional** de voz e arquétipo (Cuidador + Mago) com Vinicius e o designer (Guilherme/Asla) — direção já adotada por Ronan; revisão é refinamento, não bloqueio.

- **Última atualização:** 2026-07-03
