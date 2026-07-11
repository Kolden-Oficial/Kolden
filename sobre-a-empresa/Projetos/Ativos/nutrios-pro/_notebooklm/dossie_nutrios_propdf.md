---
id_fonte: "6dd9baae-d375-4bc1-8c71-70f3a626c0d9"
notebook_id: "d66452a9-53ce-4213-a916-75314c60f002"
notebook_titulo: "NutriOS Pro"
titulo: "dossie_nutrios_pro.pdf"
tipo: "unknown"
url_original: null
keywords: "('Nutritional clinical management', 'Anthropometric assessment protocols', 'AI-integrated dietary planning', 'SaaS architecture security', 'Patient evolution tracking')"
summary: "The NutriOS Pro technical dossier describes a **comprehensive SaaS platform** designed to modernize clinical nutrition management by centralizing patient data, physical assessments, and dietary planning into a single web application. This \"operating system\" for nutritionists utilizes **integrated artificial intelligence** for advanced tasks such as scanning food labels, analyzing lab exams, and estimating body composition from photos. Structurally, the system is built on a **robust technical architecture** involving React, Supabase, and strict security protocols like Role-Based Access Control and Row-Level Security to ensure data privacy. By automating complex caloric calculations and offering professional PDF exports, the software serves the primary purpose of **replacing manual spreadsheets** with a professional, end-to-end digital workflow for individual patient care."
extraido_em: "2026-06-30T16:08:58Z"
extraido_por: "notebooklm-py-0.7.3"
projeto: nutrios-pro
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/nutrios-pro/_notebooklm/_indice|_indice]]"
---

# dossie_nutrios_pro.pdf

DOSSIE

TECNICO-EXECUTIVO

NutriOS Pro

Sistema de Gestao Clinica Nutricional

CLASSIFICACAO

Documentacao interna de referencia

DATA DE EMISSAO

01 de Abril de 2026

VERSAO

Producao (nutriospro.lovable.app)

TIPO

Auditoria hibrida executivo-tecnica

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

ÍNDICE

| 1 | Resumo Executivo |
| --- | --- |
| 2 | Visão Geral do Produto |
| 3 | Inventário Completo de Funcionalidades |
| 4 | Mapeamento de Módulos |
| 5 | Fluxos Principais do Usuário |
| 6 | Perfis de Usuário e Controle de Acesso |
| 7 | Telas, Rotas e Navegação |
| 8 | Entidades Principais |
| 9 10 11 | Banco de Dados e Estrutura Regras de Negócio Identificadas Integrações e Serviços Externos |
|  |  |
| 12 | Arquitetura Técnica |
| 13 | Segurança |
| 14 | Estado Consolidado do Sistema |
| 15 | Inventário Final Executivo |
| 16 | Conclusão do Dossiê |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 2

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

1. RESUMO EXECUTIVO

01/04/2026 | Documentação Interna

| Item | Detalhe |
| --- | --- |
| Nome do sistema | NutriOS (anteriormente NutriCalc Pro) |
| Objetivo principal | Gestão clínica completa para nutricionistas: cadastro de pacientes, avaliações antropométricas, cálculos energéticos, montagem de planos alimentares e acompanhamento de evolução |
| Problema resolvido | Centralizar em um único web app todas as ferramentas que um nutricionista utiliza no atendimento clínico substituindo planilhas e processos manuais |
| Público-alvo | Nutricionistas clínicos que atendem pacientes individualmente |
| Proposta de valor | "Sua prática clínica merece um sistema operacional" - plataforma SaaS multi-tenant com IA integrada e exportação profissional em PDF |
| Estado atual | Produto funcional em produção com todas as funcionalidades core implementadas e operacionais. Inclui módulo administrativo completo com RBAC |

Principais entregas identificadas

1. Autenticação completa (email/senha + Google OAuth + recuperação de senha)
2. Dashboard com visão geral de pacientes, avaliações e dietas
3. Perfil de paciente com 6 abas funcionais (Dados, Avaliações, Metas, Dietas, Evolução, Exames)
4. Avaliações antropométricas com 7 protocolos de composição corporal
5. Cálculos energéticos automatizados (TMB/GET/VET) com distribuição de macronutrientes
6. Montagem de planos alimentares com busca de alimentos e totais automáticos
7. Rastreamento de consumo real (manual + foto com IA)
8. Gráficos de evolução corporal e aderência à dieta
9. Exportação em PDF (dietas, avaliações individuais e relatório completo)
10. Painel administrativo com estatísticas globais, auditoria e gestão de usuários
11. Base de alimentos com escaneamento de rótulos via IA
12. Sistema de templates de dieta (pré-definidos + customizáveis)
13. Tema claro/escuro + design responsivo mobile-first

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 3

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

2. VISÃO GERAL DO PRODUTO

Descrição macro

NutriOS é um Web App SaaS moderno para nutricionistas. Cada profissional cria sua conta, cadastra seus pacientes
e realiza todo o fluxo de acompanhamento clínico: avaliação física → cálculo de necessidades → montagem de dieta
→ monitoramento de evolução → exportação de documentos.

Áreas de negócio cobertas

Gestão de pacientes - cadastro, edição, exclusão, busca, foto de perfil

Avaliação antropométrica - dobras cutâneas, circunferências, bioimpedância, protocolos múltiplos
Planejamento nutricional TMB, GET, VET, macronutrientes, suplementação, hidratação
Dietas montagem por refeições, busca de alimentos, templates, exportação
Monitoramento consumo real vs planejado, rastreamento de água, gráficos de evolução
Exames clínicos - upload e análise IA de checkups laboratoriais

Administração dashboard admin, gestão de roles, auditoria, backups, configurações do sistema

Tipologia e Estrutura

SaaS multi-tenant B2B, com separação de dados por user\_id (nutricionista) e controle de acesso baseado em roles
(RBAC).

| Camada | Tecnologia |
| --- | --- |
| Frontend | React 18 SPA com Vite, Tailwind CSS, shadcn/ui |
| Backend | Lovable Cloud (Supabase) - PostgreSQL, Auth, Storage, Edge Functions |
| IA | Lovable Al (modelos Google/OpenAl) via Edge Functions |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 4

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

3. INVENTÁRIO COMPLETO DE FUNCIONALIDADES

3.1 Módulo: Autenticação e Acesso

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Login email/senha | Autenticação padrão com validação Zod |  |
| Cadastro com verificação | Signup com confirmação por email |  |
| Login Google OAuth | SSO via Lovable Auth |  |
| Recuperação de senha | Email de reset + tela de redefinição |  |
| Indicador força senha | Checklist visual (maiúscula, minúscula, número, 8+ chars) | ☐ |
| Lockout progressivo | Bloqueio temporário após 3/5 tentativas (30s/5min) |  |
| Proteção de rotas | ProtectedRoute + Admin Route |  |
| Anti-enumeração | Erros genéricos para evitar identificação de emails |  |

3.2 Módulo: Dashboard Principal

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Cards de resumo | Total de pacientes, avaliações, dietas ativas |  |
| Lista de pacientes | Com busca por nome, foto, peso/altura, data de atualização |  |
| Criação rápida | Dialog modal com campos obrigatórios e IMC guidance |  |
| Quick Actions | Atalhos para pacientes recentes |  |
| Alertas aniversário | Notificações de aniversários próximos |  |
| Saudação personalizada | "Olá, {nome}!" com primeiro nome do nutricionista |  |

3.3 Módulo: Perfil do Paciente (6 Abas)

Aba Dados

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Edição de dados | Nome, sexo, nascimento, peso, altura, classificação, contato |  |
| Foto de perfil | Upload/câmera com armazenamento no storage |  |
| Tags alimentares | 12 opções (sem lactose, vegano, cetogênica, etc.) |  |
| Sugestão classificação | Auto-sugestão baseada no IMC calculado | ☐ |

Aba Avaliações

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Avaliação tradicional | 10 dobras + 15 circunferências + bioimpedância |  |
| Avaliação por foto | Até 6 fotos + análise IA de evolução corporal |  |
| Avaliação Body 3D | Frontal + lateral + circunferências estimativa IA |  |
| 8 protocolos de cálculo | IMC, Pollock 3/7, Navy, Petroski, Guedes, Durnin, Faulkner, RCQ, CMB |  |
| Gráfico radar | Comparativo visual de composição corporal |  |
| Comparação avaliações | Side-by-side de múltiplas avaliações |  |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 5

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Export PDF individual | PDF com marca NutriOS |  |

01/04/2026 | Documentação Interna

Aba Metas Energéticas

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| TMB auto-fórmula | Harris Benedict / Tinsley / Mifflin por classificação |  |
| Fator atividade | 4 níveis (sedentário 1.2 a atleta 1.9) |  |
| Objetivo calórico | Normocalórica, Superávit ou Déficit |  |
| Macros % → gramas | Proteína, carboidrato, gordura automáticos |  |
| Hidratação | Meta de água (ml) + tracker visual + alertas + lembretes |  |
| Suplementação | Creatina (g) + notas de suplementação |  |
| Guias educativos | Guia calórico + distribuição de macros |  |

Aba Dietas

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Montagem refeições | 6 refeições default + personalização |  |
| Busca de alimentos | Autocomplete com useDeferredValue |  |
| Cálculo automático | Kcal e macros baseados em quantidade e tabela |  |
| Templates | 3 prédefinidos -+ templates customizáveis salvos |  |
| Duplicar plano | Copiar dieta existente |  |
| Export PDF dieta | PDF profissional por refeição |  |
| Porções referência | Tabela de medidas caseiras |  |

Aba Evolução + Aba Exames

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Gráficos peso/composição | Séries temporais de peso, % gordura, massas |  |
| Aderência à dieta | Consumo real vs meta (kcal e macros) |  |
| Gráficos expandidos | Versão detalhada dos gráficos de evolução |  |
| Upload exames | PDF/imagem de resultados laboratoriais |  |
| Análise IA exames | Extração estruturada + resumo clínico |  |
| Consumo por foto IA | Identificação de alimentos e macros por foto |  |

3.4 Módulo: Base de Alimentos

| Funcionalidade | Descrição Status |
| --- | --- |
| Lista com busca/filtro | Tabela com busca e filtro por 8 categorias |
| CRUD de alimentos | Criar, editar, excluir com kcal, macros, medida caseira |
| Escanear rótulo IA | Upload de foto → extração automática |

3.5 Módulo: Administração

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 6

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

| Funcionalidade | Descrição | Status |
| --- | --- | --- |
| Dashboard admin | Stats globais (nutricionistas, pacientes, avaliações, dietas) |  |
| Gráficos crescimento | Novos cadastros por mês (6 meses) |  |
| Gestão de roles | Atribuir/revogar roles (admin, moderador, user) |  |
| Export relatórios | CSV/PDF com dados globais |  |
| Config. sistema | Limites, inatividade, role padrão, manutenção |  |
| Audit logs | Registro de ações administrativas |  |
| Backups config | Salvar/restaurar snapshots |  |

01/04/2026 | Documentação Interna

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 7

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

4. MAPEAMENTO DE MÓDULOS

01/04/2026 | Documentação Interna

| Módulo | Propósito | Funcionalidades-chave | Relevância |
| --- | --- | --- | --- |
| Autenticação | Controle de acesso e identidade | Login, signup, OAuth, reset, lockout, proteção rotas | Crítica |
| Dashboard | Visão geral e navegação rápida | Cards resumo, lista pacientes, busca, criação rápida | Alta |
| Gestão Pacientes | CRUD de pacientes | Cadastro, edição, exclusão, foto, tags alimentares | Crítica |
| Avaliações | Antropometria completa | 3 métodos entrada, 8+ protocolos, comparação, PDF | Alta |
| Metas Energéticas | Planejamento calórico | TMB/GET/VET, macros, hidratação, suplementação | Alta |
| Dietas | Planos alimentares | Refeições, busca, templates, totais, PDF | Alta |
| Evolução | Monitoramento longitudinal | Gráficos peso, composição, aderência dieta | Média-Alta |
| Consumo | Tracking real de ingestão | Manual, foto IA, comparativo com meta | Média-Alta |
| Exames | Resultados laboratoriais | Upload, análise IA, dados estruturados | Média |
| Alimentos | Tabela nutricional | CRUD, categorias, medidas caseiras, rótulo IA | Média |
| Administração | Operação da plataforma | Stats, roles, audit, config, backups | Média |
| Configurações | Personalização por usuário | Perfil, tema, notificações, segurança | Baixa |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 8

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

5. FLUXOS PRINCIPAIS DO USUÁRIO

Fluxo: Primeiro Acesso

Gatilho: Nutricionista acessa o app pela primeira vez

Etapas: Tela auth → "Criar Conta" → nome/email/senha confirmação por email → login → redirect/dashboard
Resultado: Conta criada com perfil via trigger handle\_new\_user

Fluxo: Cadastro de Paciente

Gatilho: Clique em "Novo Paciente" no dashboard

• Etapas: Modal com formulário → nome, sexo, nascimento, peso, altura, classificação, contato → "Criar Paciente"
Resultado: Paciente aparece na lista e pode ser acessado

Fluxo: Avaliação Antropométrica

Gatilho: Perfil do paciente aba "Avaliações" → "Nova Avaliação"

Etapas: Seleciona método (Tradicional/Foto/Body3D) → preenche dados → visualiza resultados → salva
Resultado: Avaliação no histórico, PDF exportável, gráficos atualizados

Fluxo: Definição de Metas

Gatilho: Aba "Metas" → "Nova Meta"

Etapas: TMB auto-fórmula → fator atividade → objetivo → % macros → água/suplementação → salva
Resultado: Meta ativa como referência nas dietas e consumo

Fluxo: Montagem de Dieta

• Gatilho: Aba "Dietas" → "Novo Plano"

Etapas: Nome/data → adiciona alimentos por refeição
Resultado: Plano alimentar completo, exportável em PDF

Fluxo: Registro de Consumo

quantidades → totais vs meta → salva

Gatilho: Painel de consumo → "Registro Manual" ou "Analisar Foto"
Etapas: Macros manual OU upload foto → IA analisa confirma → salva
Resultado: Comparativo consumo vs meta, gráficos aderência

Fluxo: Exportação Relatório

Gatilho: Header do perfil → "Relatório PDF"

Etapas: Clique → PDF gerado client-side com capa, dados, avaliações e metas
Resultado: Download automático do PDF com marca NutriOS

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 9

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

6. PERFIS DE USUÁRIO E CONTROLE DE ACESSO

| Role | Permissões | Evidência |
| --- | --- | --- |
| user (padrão) | CRUD em seus próprios pacientes e dados vinculados | RLS com auth.uid() = user\_id |
| moderator | Mesmo que user (sem diferenciação funcional explícita) | Badge visual no admin apenas |
| admin | Acesso a /admin/\*, gestão de todos usuários, audit logs, configurações | has\_role() $RPC+RLS$ em tabelas admin |

Mecanismo de Controle

Autenticação: Supabase Auth (email/senha + OAuth Google)

• Autorização: RLS em todas as tabelas com policies granulares per-command
Verificação de role: Função SQL has\_role() com SECURITY DEFINER
Proteção frontend: Protected Route (autenticado) e Admin Route (admin)

• Anti-anônimo: Policies restritivas em todas as tabelas sensíveis

Observação: A role moderator existe na enum app\_role mas não há permissões diferenciadas no código ou RLS.
Funciona como badge visual apenas.

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 10

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

7. TELAS, ROTAS E NAVEGAÇÃO

01/04/2026 | Documentação Interna

| Rota | Tela | Função | Proteção | Módulo |
| --- | --- | --- | --- | --- |
| / | Redirect | Redireciona para /dashboard |  |  |
| /auth | Login/Cadastro | Autenticação | Pública | Auth |
| /reset-password | Redefinir senha | Nova senha | Pública | Auth |
| /dashboard | Dashboard | Lista pacientes + stats | Protected | Dashboard |
| /patients/:id | Perfil Paciente | 6 abas funcionais | Protected | Pacientes |
| /settings | Configurações | Perfil, tema, notificações | Protected | Config |
| /admin/foods | Base Alimentos | CRUD alimentos | Protected | Alimentos |
| /admin/dashboard | Painel Admin | Stats globais, roles | AdminRoute | Admin |
| /admin/settings | Config. Sistema | Limites, audit, backups | AdminRoute | Admin |
|  | 404 | Página não encontrada |  |  |

Navegação

Desktop: Header sticky com links: Dashboard, Alimentos, Admin\*, Configurações\*

Mobile: Hamburger menu com os mesmos itens

Breadcrumbs: Implementados em /patients/:id e /settings

User menu: Dropdown com nome, email, configurações e logout

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 11

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

8. ENTIDADES PRINCIPAIS

01/04/2026 | Documentação Interna

| Entidade | Tabela | Papel | Relações |
| --- | --- | --- | --- |
| Profile | profiles | Dados do nutricionista | 1:1 com auth.users |
| Patient | patients | Paciente em acompanhamento | N:1 com profile |
| Assessment | assessments | Avaliação antropométrica (~90 campos) | N:1 com patient |
| Goal | goals | Meta energética (TMB/GET/VET/macros) | N:1 com patient |
| Diet Plan | diet\_plans | Plano alimentar | N:1 com patient, N:1 goal |
| Diet Item | diet\_items | Item de refeição | N:1 diet\_plan, N:1 food |
| Food | foods | Alimento da base | Referenciado por diet\_items |
| Consumption Log | consumption\_logs | Registro consumo real | N:1 com patient |
| Checkup | checkups | Exame laboratorial | N:1 com patient |
| Diet Template | diet\_templates | Template de dieta customizado | N:1 com user |
| User Role | user\_roles | Atribuição de papel | N:1 com auth.users |
| Audit Log | audit\_logs | Registro de auditoria |  |
| System Setting | system\_settings | Configuração global |  |
| Settings Backup | settings\_backups | Snapshot de configurações |  |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 12

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

9. BANCO DE DADOS E ESTRUTURA

Visão conceitual

auth.users (1) (1) profiles

(N) patients (N) assessments

(N) goals

(N) diet\_plans (N) diet\_items (1) foods

■■ (N) consumption\_logs

(N) checkups

(N) diet\_templates

(N) user\_roles

Resumo estrutural

14 tabelas no schema public

6 enums: sex\_type, body\_classification, activity\_factor, goal\_type, food\_category, app\_role
11 funções SQL: has\_role, handle\_new\_user, update\_updated\_at\_column, audit\_sensitive\_changes,
get\_admin\_stats, etc.

RLS: Todas as tabelas com RLS habilitado

Storage: 1 bucket patient-files (privado)

dados filtrados por auth.uid()
fotos perfil, avaliação, exames

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 13

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

10. REGRAS DE NEGÓCIO IDENTIFICADAS

| # | Regra | Contexto | Evidência |
| --- | --- | --- | --- |
| 1 | Fórmula TMB automática pela classificação corporal | Metas | Harris Benedict / Tinsley / Mifflin |
| 2 | IMC classificado em 6 faixas | Avaliações | Baixo peso a Obesidade III |
| 3 | Pollock 3 usa campos diferentes por sexo | Avaliações | M: peitoral+abdominal+coxa; F: tricipital+suprailíaca+coxa |
| 4 | VET = GET ajuste conforme objetivo | Metas | Superávit soma, Déficit subtrai |
| 5 | Macros: proteína/carb 4kcal/g, gordura 9kcal/g | Metas | calculate Macros() |
| 6 | % gordura Navy limitada 0-60% | Avaliações | Validação em calculateNavy() |
| 7 | Nutricionista acessa apenas seus pacientes | Global | RLS: auth.uid() = user\_id |
| 8 | CMB classificada por faixa etária e sexo | Avaliações | Frisancho (1981, 1990) |
| 9 | RCQ em 4 faixas de risco por sexo | Avaliações | calculateRCQ() |
| 10 | Lockout: 30s após 3 tentativas, 5min após 5 | Auth | Client-side Auth.tsx |
| 11 | Rate limit IA: 50 req/hora/usuário | Edge Functions | checkRateLimit() |
| 12 | Senha: ≥8 chars, maiúscula, minúscula, número | Auth | passwordSchema validation.ts |
| 13 | Arquivos limitados 10MB, JPEG/PNGWebP//PDF | Upload | validateFile() |
| 14 | Sanitização texto contra XSS | Input | sanitizeText() validation.ts |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 14

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

11. INTEGRAÇÕES E SERVIÇOS EXTERNOS

| Integração | Finalidade | Impacto |
| --- | --- | --- |
| Lovable Cloud (Supabase) | Backend completo: DB, Auth, Storage, Edge Functions | Crítico |
| Supabase Auth | Autenticação email/senha + sessões | Crítico |
| Lovable Auth (Google OAuth) | Login social com Google | Médio |
| Supabase Storage | Armazenamento de fotos e arquivos | Alto |
| Lovable Al | Análise de fotos, rótulos, exames, evolução, body3D | Alto |
| jsPDF + autotable | Geração de PDFs client-side | Médio |
| Recharts | Gráficos de evolução e crescimento | Médio |
| date-fns | Manipulação de datas com locale pt-BR | Baixo |
| Zod | Validação de schemas | Baixo |
| vite-plugin-pwa | PWA manifest/service worker | Baixo |

Edge Functions (7 + shared)

| Function | Finalidade |
| --- | --- |
| analyze-food-photo | Análise IA de foto de refeição → alimentos e macros |
| analyze-nutrition-label | Escanear rótulo nutricional → extração de dados |
| analyze-checkup | Análise exames laboratoriais → dados estruturados + resumo |
| analyze-evolution-photos analyze-body3d admin-user-management | Análise IA de fotos de evolução corporal Estimativa composição corporal por Operações admin sobre usuários fotos frontal/lateral |
|  |  |
| backup-settings | Gestão de backups de configurações |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 15

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

12. ARQUITETURA TÉCNICA

| Camada | Tecnologia |
| --- | --- |
| Frontend | React 18 + TypeScript 5 + Vite 5 |
| Estilização | Tailwind CSS v3 + shadcn/ui + tailwindcss-animate |
| Estado | React useState/useEffect + TanStack React Query |
| Roteamento | React Router DOM v6 |
| Backend Auth Storage | Lovable Cloud (Supabase PostgreSQL 14.1) Supabase Auth + Lovable Auth (OAuth) Supabase Storage (bucket patient-files) |
|  |  |
| Serverless | Supabase Edge Functions (Deno) |
| IA | Lovable Al (Google/OpenAl via Edge Functions) |
| PDF | jsPDF + jspdf-autotable (client-side) |
| Gráficos | Recharts |
| Testes | Vitest + @testing-library/react + jsdom |

Padrão Arquitetural

SPA com roteamento client-side

Comunicação: Frontend → Supabase SDK (REST/Realtime) → PostgreSQL
Sem BFF: Lógica de negócio distribuída entre frontend (cálculos) e banco (RLS)
Edge Functions: Exclusivamente para operações com IA e admin

01/04/2026 | Documentação Interna

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 16

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

13. SEGURANÇA

01/04/2026 | Documentação Interna

| Aspecto | Implementação | Evidência |
| --- | --- | --- |
| Autenticação | Supabase Auth com email verification obrigatória | signUp sem auto-confirm |
| Autorização (RLS) | 50+ policies cobrindo todas as tabelas | Schema supabase-tables |
| RBAC | user\_roles + has\_role() SECURITY DEFINER | Tabela separada, sem roles em profiles |
| Anti-enumeração | Mensagens genéricas em erros de login | Auth.tsx |
| Lockout | Progressivo client-side (30s/5min) | Auth.tsx |
| Validação input | Zod schemas: password, email, nome, telefone | validation.ts |
| Sanitização XSS | sanitizeText() remove HTML, JS, null bytes | validation.ts |
| Validação URL | Aceita só \*.supabase.co/storage/ | validateStorageUrl() |
| Validação upload | Tipo, tamanho 10MB, extensão | validateFile() |
| Rate limiting IA | 50 req/hora/usuário nas Edge Functions | Edge Functions |
| Rate limiting DB | Tabela rate\_limit\_log | Schema |
| Secrets | API keys em secrets, nunca no código | LOVABLE\_API\_KEY |
| Anti-anônimo | Policies restritivas auth.uid() IS NOT NULL | RLS |
| Audit logging | audit\_logs + trigger audit\_sensitive\_changes | Schema |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 17

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

| Módulo | Completude | Observação |
| --- | --- | --- |
| Autenticação | 100% | Completo com OAuth, recovery, lockout, validações |
| Dashboard | 100% | Funcional com stats, busca, quick actions, aniversários |
| Gestão Pacientes | 100% | CRUD completo com foto, tags, sugestão IMC |
| Avaliações | 100% | 3 métodos, 8 protocolos, bilateral, comparação, PDF |
| Metas Energéticas | 100% | TMB/GET/VET, macros, hidratação, suplementação, guias |
| Dietas | 100% | Refeições, busca, templates, totais, PDF, duplicar |
| Evolução | 95% | Gráficos funcionais; depende de dados de consumo |
| Consumo | 95% | Manual + IA foto funcionais |
| Exames | 90% | Upload + IA funcional; visualização pode ser expandida |
| Alimentos | 100% | CRUD + escanear rótulo IA |
| Administração | 100% | Stats, roles, audit, config, backups |
| Config. Usuário | 90% | Notificações em localStorage (não server-side) |
| Exportação PDF | 100% | Dietas, avaliações individuais, relatório completo |
| Testes | Parcial | ~15 arquivos cobrindo cálculos, componentes, regressões |

14. ESTADO CONSOLIDADO DO SISTEMA

Classificação geral: Produto funcional maduro em produção

01/04/2026 | Documentação Interna

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 18

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

15. INVENTÁRIO FINAL EXECUTIVO

| Área | Funcionalidade | Status | Rota |
| --- | --- | --- | --- |
| Auth | Login email/senha |  | /auth |
| Auth | Login Google |  | /auth |
| Auth | Cadastro + verificação |  | /auth |
| Auth | Reset senha |  | /reset-password |
| Auth | Lockout progressivo |  | /auth |
| Auth | Proteção de rotas |  | Global |
| Dashboard | Cards resumo |  | /dashboard |
| Dashboard | Lista pacientes + busca |  | /dashboard |
| Dashboard | Criação rápida |  | /dashboard |
| Dashboard | Quick Actions |  | /dashboard |
| Dashboard | Alertas aniversário |  | /dashboard |
| Paciente | CRUD dados pessoais |  | /patients/:id |
| Paciente | Foto de perfil |  | /patients/:id |
| Paciente | Tags alimentares |  | /patients/:id |
| Avaliação | Tradicional (dobras + circ.) |  | /patients/:id |
| Avaliação | Por foto + IA |  | /patients/:id |
| Avaliação | Body 3D + IA |  | /patients/:id |
| Avaliação | 8 protocolos cálculo |  | /patients/:id |
| Avaliação | Modo bilateral D/E |  | /patients/:id |
| Avaliação | Comparação + radar |  | /patients/:id |
| Avaliação | Export PDF |  | /patients/:id |
| Metas | TMB/GET/VET auto |  | /patients/:id |
| Metas | Macros % → g |  | /patients/:id |
| Metas | Hidratação + tracker |  | /patients/:id |
| Metas | Suplementação |  | /patients/:id |
| Metas | Guias educativos |  | /patients/:id |
| Dietas | Montagem refeições |  | /patients/:id |
| Dietas | Busca autocomplete |  | /patients/:id |
| Dietas | Templates |  | /patients/:id |
| Dietas | Export PDF |  | /patients/:id |
| Dietas | Duplicar plano |  | /patients/:id |
| Evolução | Gráficos peso/composição |  | /patients/:id |
| Evolução | Aderência dieta |  | /patients/:id |
| Consumo | Registro manual |  | /patients/:id |
| Consumo | Análise IA foto |  | /patients/:id |
| Exames | Upload + análise IA |  | /patients/:id |

NutriOS Pro - Sistema de Gestão Clínica Nutricional

01/04/2026 | Documentação Interna

Página 19

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

| Área | Funcionalidade | Status | Rota |
| --- | --- | --- | --- |
| Alimentos | CRUD + categorias |  | /admin/foods |
| Alimentos | Escanear rótulo IA |  | /admin/foods |
| Admin | Dashboard global |  | /admin/dashboard |
| Admin | Gestão roles |  | /admin/dashboard |
| Admin | Audit logs |  | /admin/settings |
| Admin Config PDF UX UX UX | Config + backups Perfil + tema Relatório completo Tema claro/escuro Responsivo mobile Onboarding tour |  | /admin/ /settings /patients/:id Global Global /patients/:id ויוייו settings |

01/04/2026 | Documentação Interna

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 20

DOSSIÊ TÉCNICO-EXECUTIVO - NutriOS Pro

01/04/2026 | Documentação Interna

16. CONCLUSÃO DO DOSSIÊ

Síntese geral

NutriOS é um produto SaaS maduro e funcional voltado a nutricionistas clínicos. O sistema cobre o ciclo completo do
atendimento nutricional: desde o cadastro do paciente até o monitoramento de evolução, passando por avaliações
antropométricas completas (com 8 protocolos científicos), planejamento calórico automatizado, montagem de planos
alimentares com base de dados nutricional, rastreamento de consumo real com IA, e exportação profissional em PDF.

Principais capacidades

1. Gestão clínica completa - pacientes, avaliações, metas, dietas, exames em uma única plataforma
2. Ciência nutricional aplicada 8 protocolos de composição corporal, 3 fórmulas de TMB, cálculos automáticos
3. IA integrada - 5 casos de uso (foto alimentar, rótulo, exames, evolução corporal, body 3D)
4. Documentação profissional - 3 tipos de export PDF com marca NutriOS
5. Segurança enterprise - RBAC, RLS, rate limiting, validação, sanitização, audit logging
6. Operação admin painel completo com stats, gestão de usuários, configurações e backups
7. UX cuidada

design responsivo, tema claro/escuro, onboarding, guias educativos, alertas inteligentes

O que foi efetivamente entregue

Um produto end-to-end funcional em produção, com ~80+ funcionalidades mapeadas, 14 tabelas de dados, 7 Edge
Functions, 11 funções SQL, 50+ políticas RLS, cobertura parcial de testes automatizados, e publicação em domínio
customizado (nutriospro.lovable.app).

Retrato objetivo

O NutriOS está no estágio de produto completo v1, com todas as áreas de negócio planejadas implementadas e
operacionais. O sistema demonstra maturidade técnica na arquitetura de segurança, modelagem de dados e
experiência do usuário.

Dossiê gerado em 01/04/2026 - Baseado exclusivamente em evidências técnicas do código-fonte, banco de dados,
configurações e estrutura do projeto.

NutriOS Pro - Sistema de Gestão Clínica Nutricional

Página 21
