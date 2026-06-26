---
id: projeto-nutrios-pro-status
titulo: "NutriOS Pro — Status"
resumo: "v1 em produção (Sprints 1–4 concluídos); pendências de testes, billing e dívida técnica."
categoria: projeto
palavras-chave: [status, progresso, roadmap]
status: em-producao
atualizado-em: 2026-06-24
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
  - **Fase 3 deste workspace — CONCLUÍDA e oficial:** fundação visual própria documentada e fechada (brandbook completo, auditoria de UI, pacote de tokens `tokens.css`/`tokens.json`/`tailwind.tokens.js` e specs de re-skin de componentes — os 7 docs em `status: oficial`). Tipografia oficializada: **Baloo 2 (display) + Inter (UI/dados)**. Nada disso tocou o código de produção.
  - **Fase 4 — aplicação do redesign no código `app/` (não iniciada):** sondagem confirmou que o `app/` segue 100% na identidade antiga (`#0D8070`/`#00FF94`, light-first), com scaffold Vite residual, monólitos intactos e o gradiente cyan/blue do WaterTracker. Roteiro pronto em `design-system/02-tokens/leia-me.md §4`: colar `tokens.css`, importar o preset Tailwind, trocar a webfont (Poppins → Baloo 2), default dark-first, limpar scaffold (`App.css`/`Index.tsx`), corrigir `WaterTracker` e `theme-color`, consolidar toast; depois refator dos monólitos e re-skin componente a componente.

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

- **Pendências de assets / validação (Fase 3 → Fase 4):**
  - Arquivos **vetoriais SVG/AI** oficiais do logo/mascote/lockups para a biblioteca de marca — hoje só existem PDFs em `assets/`. Inclui favicon e ícones PWA (16/32/180/512).
  - **Auditoria de contraste in-vivo** das telas reais contra a tabela WCAG já calculada em `design-system/02-tokens/leia-me.md §5` — depende da aplicação no código (Fase 4).
  - Validação ampliada **opcional** de voz e arquétipo (Cuidador + Mago) com Vinicius e o designer (Guilherme/Asla) — direção já adotada por Ronan; revisão é refinamento, não bloqueio.

- **Última atualização:** 2026-06-24
