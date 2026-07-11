---
tipo: projeto
projeto: omiron
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/omiron/docs/proposta-comercial|proposta-comercial]]"
---

# PRD — Omiron App

**Produto:** Omiron — Sistema de Monitoramento Terapêutico
**Versão:** 1.0
**Data:** 2026-05-09
**Autor:** Morgan (@pm) — baseado em análise do @analyst
**Cliente:** Dr. Ariosto Filho — Clínica Omiron
**Status:** Draft

---

## Change Log

| Versão | Data | Autor | Descrição |
|--------|------|-------|-----------|
| 1.0 | 2026-05-09 | Morgan/@pm | PRD inicial — derivado do Plano Técnico, Pitch Deck e PRD v1.0 do @analyst |

---

## Goals & Background Context

### Problema

A principal barreira do tratamento psiquiátrico não é a consulta em si — é o que acontece nos dias entre as consultas. Consultas duram 50 minutos; o tratamento é de 24 horas por dia.

Pacientes perdem adesão à medicação, abandonam hábitos prescritos e chegam à próxima sessão sem dados objetivos sobre sua evolução. O Dr. Ariosto não tem visibilidade do paciente fora do consultório.

**Impacto:** baixa adesão → piora do quadro clínico → menor valor percebido pelo paciente → menor diferenciação da clínica no mercado.

### Solução

Omiron: sistema próprio de monitoramento contínuo da Clínica Omiron, com 7 áreas terapêuticas, lembretes, formulários diários, dashboards, canal direto com o médico e gamificação.

**Fase 1 (meses 1–6):** White-label 100% da Clínica Omiron. Validar adesão e maturar o produto. Dr. Ariosto pode aumentar o valor da consulta.

**Fase 2 (meses 6–12):** SaaS para psiquiatras — R$299–599/clínica/mês via Stripe. Dr. Ariosto: pioneiro e case de sucesso.

### Slogan

"Monitoramento próximo. Tratamento real."

---

## Requisitos Funcionais

| ID | Requisito | Prioridade |
|----|-----------|-----------|
| FR-1 | Autenticação com 3 perfis: paciente, secretária e médico (email/senha + magic link) | Must |
| FR-2 | Ficha completa do paciente: foto, diagnóstico, medicação, metas, observações médicas, arquivos | Must |
| FR-3 | 7 áreas de monitoramento com check-ins diários (formulários, escalas de humor, texto, foto) | Must |
| FR-4 | Escalas diagnósticas: HAM-A, HAM-D, Madres, Cococolos, YMRS — preenchidas 24h antes da consulta | Must |
| FR-5 | Chat em tempo real entre paciente e Dr. Ariosto (Supabase Realtime) | Must |
| FR-6 | Gamificação: planta virtual que cresce com streaks; estágios broto → muda → adulta → árvore | Must |
| FR-7 | Dashboard médico: visão de todos os pacientes, gráficos de evolução, escalas pré-consulta | Must |
| FR-8 | Exportação de relatório por paciente em PDF | Must |
| FR-9 | Player de meditações guiadas em áudio (streaming via Supabase Storage) | Must |
| FR-10 | 31 frases de impacto históricas por transtorno (1 por dia, verificadas — não geradas por IA) | Must |
| FR-11 | Notificações e lembretes configuráveis (Vercel Cron + Resend + push browser) | Must |
| FR-12 | Comunidade interna: feed de conquistas e jardim coletivo (visualização pública das plantas) | Should |
| FR-13 | Onboarding guiado pós-primeiro login (seleção de diagnóstico, configuração inicial) | Must |
| FR-14 | Gestão de usuários pela secretária: cadastro de pacientes, atribuição de login/senha | Must |
| FR-15 | Calendário de eventos, retornos e tarefas por paciente | Should |
| FR-16 | Upload de fotos por área de monitoramento | Should |
| FR-17 | Envio de prescrições e observações médicas pelo Dr. Ariosto | Must |
| FR-18 | Busca e filtros de pacientes no dashboard médico | Should |
| FR-19 | Marcos de celebração automáticos (7, 30, 60, 90 dias de streak) | Should |
| FR-20 | Stripe: assinaturas por clínica (Fase 2 apenas) | Won't (v1) |

---

## Requisitos Não-Funcionais

| ID | Requisito | Categoria |
|----|-----------|-----------|
| NFR-1 | LGPD: Row Level Security no Supabase — isolamento completo de dados por usuário; nenhum dado diagnóstico em rota pública | Segurança |
| NFR-2 | Performance: SSR via Next.js para garantir performance em conexões lentas (público B/C) | Performance |
| NFR-3 | Autenticação obrigatória para toda a API; endpoints públicos limitados a assets estáticos | Segurança |
| NFR-4 | Logs de auditoria para acesso e modificação de dados sensíveis (diagnóstico, medicação, escalas) | Compliance |
| NFR-5 | Exportação e exclusão de dados do paciente a pedido (LGPD Art. 18) | Compliance |
| NFR-6 | Disponibilidade ≥ 99.5% (Vercel Pro SLA) | Disponibilidade |
| NFR-7 | Posicionamento legal: app de engajamento terapêutico — NÃO substitui prontuário eletrônico nem teleconsulta (conformidade CFM) | Legal |
| NFR-8 | Custo de infraestrutura por paciente ativo < R$5/mês | Custo |
| NFR-9 | API type-safe via tRPC para eliminar bugs de integração (crítico em dados clínicos) | Qualidade |
| NFR-10 | Dados de escalas e diagnóstico isolados — nunca expostos a outros pacientes | Privacidade |

---

## Premissas Técnicas

### Stack

| Camada | Tecnologia |
|--------|-----------|
| Frontend | Next.js 14 + React + TypeScript + Tailwind CSS + shadcn/ui |
| API | tRPC + Node.js |
| ORM | Prisma |
| Banco | PostgreSQL via Supabase |
| Auth | Supabase Auth (email/senha + magic link) |
| Storage | Supabase Storage (fotos, PDFs, áudios) |
| Realtime | Supabase Realtime (chat + notificações) |
| Email | Resend (transacional) |
| Cron | Vercel Cron Jobs |
| Pagamentos | Stripe (Fase 2) |
| IA | Claude API (insights e sugestões personalizadas) |
| Deploy | Vercel Pro |

### Decisões Arquiteturais

- **tRPC:** API type-safe elimina classe inteira de bugs em dados clínicos
- **Supabase:** PostgreSQL + auth + storage + realtime em um serviço — reduz complexidade operacional
- **Next.js PWA:** Web app com SSR; migração futura para React Native reaproveitando lógica de negócio
- **Sem app store v1:** Reduz tempo de lançamento; PWA suficiente para piloto clínico
- **RLS first:** Segurança implementada na camada de banco — mais segura que só na API

### Perfis de Usuário

| Perfil | Papel | Acesso |
|--------|-------|--------|
| Paciente | Usuário principal | Sua ficha, check-ins, chat, comunidade, planta |
| Secretária (Helen) | Administradora | Cadastro de pacientes, agenda |
| Dr. Ariosto | Master | Todas as fichas, relatórios, conteúdo, dashboards |

---

## Epic List

| Epic | Nome | Milestone | Período | Stories Estimadas |
|------|------|-----------|---------|------------------|
| E1 | Fundação & Autenticação | M1 | 13/05–27/05/2026 | ~8 |
| E2 | 7 Áreas de Monitoramento | M2 | 27/05–10/06/2026 | ~7 |
| E3 | Comunicação & Relatórios | M3 | 10/06–24/06/2026 | ~6 |
| E4 | Gamificação & Comunidade | M4 | 24/06–08/07/2026 | ~6 |
| E5 | Conteúdo Clínico | M5 | 08/07–22/07/2026 | ~7 |
| E6 | Lançamento Interno | M6 | 22/07–29/07/2026 | ~5 |

**Bloqueador crítico E5:** Conteúdo do Dr. Ariosto (frases, escalas, meditações) deve ser entregue antes de 08/07/2026. M1–M4 são independentes deste conteúdo.

---

## Epic E1 — Fundação & Autenticação

**Objetivo:** Base técnica completa e autenticação funcional para os 3 perfis.

**Cobre FR-1, FR-2, FR-14** e prepara infraestrutura para todos os outros epics.

### E1.1 — Setup do Projeto

Como desenvolvedor, quero ter o monorepo Next.js configurado com TypeScript, Tailwind, shadcn/ui e tRPC, para que todos os epics posteriores possam ser desenvolvidos na stack correta.

**Critérios de Aceitação:**
1. `npm run dev` inicia a aplicação sem erros
2. TypeScript configurado com strict mode
3. Tailwind + shadcn/ui funcionando com tema customizado
4. tRPC router base configurado com um endpoint de health check
5. ESLint + Prettier configurados e passando
6. `npm run build` gera build de produção sem erros

### E1.2 — Configuração Supabase

Como desenvolvedor, quero ter o Supabase configurado com o schema completo do banco, auth e storage, para que todos os dados do app sejam persistidos com segurança e conformidade LGPD.

**Critérios de Aceitação:**
1. Projeto Supabase criado com schema de tabelas: `users`, `patient_profiles`, `monitoring_areas`, `daily_checkins`, `diagnostic_scales`, `messages`, `reports`, `gamification`, `impact_phrases`, `meditations`, `calendar_events`, `notifications`
2. Row Level Security ativado em todas as tabelas com dados sensíveis
3. Políticas RLS impedem acesso cruzado entre pacientes
4. Supabase Storage configurado com buckets: `photos`, `pdfs`, `audio`
5. Variáveis de ambiente documentadas em `.env.example`

### E1.3 — Deploy Vercel

Como desenvolvedor, quero ter o app deployado na Vercel com domínio configurado, para que o ambiente de produção esteja pronto desde o início.

**Critérios de Aceitação:**
1. App deployado em Vercel Pro com deploy automático no push para `main`
2. Domínio configurado e com HTTPS
3. Variáveis de ambiente configuradas na Vercel
4. Preview deployments funcionando para PRs

### E1.4 — Autenticação 3 Perfis

Como usuário, quero fazer login com email/senha ou magic link e ser redirecionado para a área correta do meu perfil (paciente, secretária ou médico), para que eu acesse apenas as funcionalidades do meu papel.

**Critérios de Aceitação:**
1. Login via email/senha e magic link funcionando
2. Após login, usuário é redirecionado: paciente → `/dashboard`, secretária → `/admin`, médico → `/medico`
3. Tentativa de acesso a rota de outro perfil retorna 403
4. Sessão persiste no browser (refresh não desloga)
5. Logout funciona e limpa sessão

### E1.5 — Ficha do Paciente (CRUD)

Como Dr. Ariosto, quero criar e editar a ficha completa de um paciente (foto, diagnóstico, medicação, metas, observações), para que eu tenha todas as informações clínicas centralizadas.

**Critérios de Aceitação:**
1. CRUD completo de ficha do paciente
2. Upload de foto do paciente (armazenada no Supabase Storage)
3. Campos: nome, foto, diagnóstico(s), medicação prescrita, metas terapêuticas, observações
4. Paciente vê sua ficha em modo leitura (não pode editar diagnóstico ou medicação)
5. Secretária vê apenas dados básicos (nome, foto, contato)
6. Validação de campos obrigatórios com mensagens de erro claras

### E1.6 — Gestão de Usuários pela Secretária

Como secretária (Helen), quero cadastrar novos pacientes e gerar login/senha para eles, para que eles possam acessar o app desde a primeira consulta.

**Critérios de Aceitação:**
1. Helen consegue criar novo paciente (nome, email, telefone)
2. Sistema gera senha temporária e envia via Resend ao email do paciente
3. Paciente é obrigado a trocar a senha no primeiro login
4. Helen vê lista de todos os pacientes cadastrados
5. Helen consegue desativar (não deletar) um paciente

### E1.7 — Design System Base

Como designer/desenvolvedor, quero ter o design system Omiron configurado no Tailwind com a paleta e tipografia corretas, para que todas as telas tenham identidade visual consistente.

**Critérios de Aceitação:**
1. Paleta configurada: navy/vinho escuro (`#1a1040`), dourado âmbar (`#c9922a`), branco marfim (`#f5f0e8`)
2. Tipografia definida no Tailwind
3. Componentes shadcn/ui reestilizados com a paleta Omiron
4. Storybook ou página de componentes mostrando os elementos base

### E1.8 — Onboarding Inicial

Como novo paciente, quero completar um onboarding guiado após meu primeiro login, para que o app seja configurado para meu diagnóstico antes de eu começar a usá-lo.

**Critérios de Aceitação:**
1. Onboarding ativado automaticamente no primeiro login
2. Paciente seleciona seu(s) diagnóstico(s) principal(is)
3. Sistema configura as 7 áreas com base no diagnóstico
4. Paciente define horário preferido para lembretes diários
5. Tela de conclusão com "planta recém-plantada" (estágio inicial)

---

## Epic E2 — 7 Áreas de Monitoramento

**Objetivo:** Interface completa das 7 áreas terapêuticas com check-ins diários, lembretes e calendário.

**Cobre FR-3, FR-11, FR-15, FR-16** e dashboard do paciente.

### E2.1 — Interface das 7 Áreas

Como paciente, quero ver as 7 áreas de monitoramento em uma interface visual clara, para que eu saiba o que devo acompanhar no meu tratamento.

**Critérios de Aceitação:**
1. 7 áreas exibidas com ícone, nome e descrição: Medicação, Alimentação, Movimento, Conexões Sociais, Gestão de Estresse, Produtividade, Tóxicos
2. Cada área tem UI individualizada (cor de destaque diferente)
3. Indicador visual de check-in completo/pendente do dia
4. Navegação fluida entre áreas

### E2.2 — Check-ins Diários

Como paciente, quero registrar meu check-in diário em cada área com texto, escala de humor e foto opcional, para que meu médico tenha dados objetivos da minha evolução.

**Critérios de Aceitação:**
1. Check-in por área com: campo de texto, escala visual (1–10), foto opcional
2. Área de Tóxicos exibe contador de dias de abstinência
3. Um check-in por área por dia (não duplica)
4. Check-in salvo offline e sincronizado quando houver internet
5. Histórico de check-ins visível por área (últimos 30 dias)

### E2.3 — Lembretes Configuráveis

Como paciente, quero receber lembretes no horário que eu configurei, para que eu não esqueça de fazer meus check-ins diários.

**Critérios de Aceitação:**
1. Paciente configura horário de lembrete diário no onboarding e em configurações
2. Vercel Cron dispara job nos horários configurados
3. Resend envia email de lembrete com link direto para o check-in
4. Notificação push browser aparece no horário configurado
5. Lembrete especial 24h antes da consulta para preencher escala diagnóstica

### E2.4 — Calendário de Eventos

Como paciente, quero ver meus retornos e tarefas prescritas em um calendário, para que eu me organize em torno do meu tratamento.

**Critérios de Aceitação:**
1. Calendário mensal com eventos: retornos, tarefas, marcos de streak
2. Dr. Ariosto consegue adicionar eventos ao calendário do paciente
3. Paciente recebe notificação 24h antes de retornos
4. Visualização de evento com detalhes ao clicar

### E2.5 — Dashboard do Paciente

Como paciente, quero ver um dashboard com meu progresso nas 7 áreas, para que eu entenda minha evolução no tratamento.

**Critérios de Aceitação:**
1. Dashboard exibe: streak atual, progresso por área (última semana), planta no estágio atual
2. Gráfico de evolução de humor (últimos 30 dias)
3. Taxa de check-in da semana (percentual de áreas completadas)
4. Próximo retorno em destaque
5. Frase do dia no topo

### E2.6 — Upload de Fotos por Área

Como paciente, quero anexar fotos aos meus check-ins em áreas como Movimento e Alimentação, para que eu compartilhe evidências visuais do meu progresso com o médico.

**Critérios de Aceitação:**
1. Upload de até 3 fotos por check-in
2. Compressão automática antes do upload (máximo 2MB por foto)
3. Fotos armazenadas no Supabase Storage com acesso restrito ao paciente e ao médico
4. Médico vê fotos no dashboard do paciente

### E2.7 — Notificações Push Browser

Como paciente, quero receber notificações push no browser para lembretes e mensagens do médico, para que eu não precise verificar o app ativamente.

**Critérios de Aceitação:**
1. Solicitação de permissão de push no onboarding
2. Notificações push para: lembrete de check-in, nova mensagem do médico, novo relatório disponível
3. Clique na notificação abre o app na seção correta
4. Configuração de notificações nas preferências do usuário

---

## Epic E3 — Comunicação & Relatórios

**Objetivo:** Canal de comunicação em tempo real e sistema de relatórios para o médico.

**Cobre FR-5, FR-7, FR-8, FR-17.**

### E3.1 — Chat em Tempo Real

Como paciente ou médico, quero trocar mensagens em tempo real pelo app, para que a comunicação entre consultas seja direta e registrada.

**Critérios de Aceitação:**
1. Chat com Supabase Realtime — mensagens aparecem instantaneamente
2. Histórico completo de mensagens persistido
3. Indicador de mensagem lida/não lida
4. Suporte a texto e anexo de arquivo (PDF, imagem)
5. Médico vê chats de todos os pacientes em lista unificada

### E3.2 — Envio de Relatório pelo Paciente

Como paciente, quero enviar um relatório ao meu médico com texto e arquivos anexados, para que ele receba informações estruturadas entre as consultas.

**Critérios de Aceitação:**
1. Aba "Relatório" no app do paciente com editor de texto e upload de arquivos
2. Relatório enviado gera notificação ao médico
3. Médico vê todos os relatórios de um paciente ordenados por data
4. PDF gerado a partir do relatório enviado

### E3.3 — Dashboard Médico

Como Dr. Ariosto, quero ver um dashboard com todos os meus pacientes e suas métricas de engajamento, para que eu identifique rapidamente quem precisa de atenção.

**Critérios de Aceitação:**
1. Lista de todos os pacientes com: foto, nome, último check-in, streak atual, pendências
2. Filtro por: status de check-in (ativo/inativo), próxima consulta, nível de engajamento
3. Clique no paciente abre ficha completa com histórico
4. Destaque para pacientes com streak zerado há mais de 3 dias

### E3.4 — Gráficos de Evolução

Como Dr. Ariosto, quero ver gráficos de evolução de humor, adesão e progresso de cada paciente, para que eu tome decisões clínicas baseadas em dados objetivos.

**Critérios de Aceitação:**
1. Gráfico de humor dos últimos 30/60/90 dias (selecionável)
2. Gráfico de taxa de adesão à medicação
3. Gráfico de streak por área
4. Comparativo antes/depois de mudança de medicação (marcador manual)

### E3.5 — Exportação de Relatório PDF

Como Dr. Ariosto, quero exportar o relatório completo de um paciente em PDF, para que eu leve dados objetivos para a consulta ou compartilhe com outros profissionais.

**Critérios de Aceitação:**
1. Botão "Exportar PDF" na ficha do paciente
2. PDF inclui: ficha, histórico de check-ins, gráficos, escalas, relatórios enviados
3. PDF gerado em menos de 10 segundos
4. Arquivo nomeado automaticamente: `omiron-{paciente}-{data}.pdf`

### E3.6 — Notificações ao Médico

Como Dr. Ariosto, quero receber notificações quando um paciente enviar mensagem ou relatório, para que eu responda em tempo hábil.

**Critérios de Aceitação:**
1. Notificação push browser para: nova mensagem, novo relatório, escala pré-consulta preenchida
2. Email via Resend para cada notificação (configurável)
3. Badge de contagem no ícone de mensagens
4. Painel de notificações com histórico dos últimos 30 dias

---

## Epic E4 — Gamificação & Comunidade

**Objetivo:** Sistema de engajamento gamificado com planta virtual e comunidade interna.

**Cobre FR-6, FR-12, FR-13, FR-19.**

### E4.1 — Sistema de Planta Virtual

Como paciente, quero ter uma planta virtual que cresce a cada dia de atividade consecutiva, para que o progresso no tratamento seja visualmente motivador.

**Critérios de Aceitação:**
1. 4 estágios visuais: Broto (7 dias), Muda (30 dias), Planta Adulta (60 dias), Árvore (90 dias)
2. Planta cresce quando paciente completa check-ins do dia
3. Período sem check-ins vira "inverno" — planta não regride, mas não cresce
4. Animação de crescimento ao subir de estágio
5. Histórico de streak preservado mesmo em períodos de inverno

### E4.2 — Tela Inicial com Planta + Frase do Dia

Como paciente, quero ver minha planta e uma frase histórica inspiradora ao abrir o app todo dia, para que minha jornada comece com propósito.

**Critérios de Aceitação:**
1. Tela home exibe: planta no estágio atual, frase do dia (baseada no diagnóstico e no dia do mês), streak atual, próxima ação sugerida
2. Frase do dia muda automaticamente à meia-noite
3. Frase exibe autor e fonte
4. Botão direto para "Fazer check-in de hoje"

### E4.3 — Marcos de Celebração

Como paciente, quero receber uma celebração especial ao atingir marcos de streak (7, 30, 60, 90 dias), para que cada conquista seja reconhecida.

**Critérios de Aceitação:**
1. Animação de celebração ao atingir 7, 30, 60, 90 dias
2. Notificação push e email de parabéns com o marco atingido
3. Médico vê os marcos do paciente no dashboard
4. Badge permanente na ficha do paciente para cada marco atingido

### E4.4 — Feed de Conquistas (Comunidade Interna)

Como paciente, quero ver as conquistas anônimas de outros pacientes da clínica, para que eu me sinta parte de uma comunidade em tratamento.

**Critérios de Aceitação:**
1. Feed exibe conquistas dos últimos 7 dias de todos os pacientes (anonimizados: "Paciente atingiu 30 dias!")
2. Nenhum dado identificável de outros pacientes é exposto
3. Paciente pode curtir uma conquista (coração) — anônimo
4. Feed não aparece até que haja pelo menos 3 pacientes ativos

### E4.5 — Jardim Coletivo

Como paciente, quero ver um jardim com as plantas de todos os pacientes ativos, para que eu visualize a comunidade de forma simbólica.

**Critérios de Aceitação:**
1. Grid visual com as plantas de todos os pacientes (anônimas)
2. Cada planta exibe seu estágio de crescimento
3. Planta do usuário logado destacada
4. Atualizado em tempo real (Supabase Realtime)

### E4.6 — Onboarding Guiado Pós-Login

Como novo paciente, quero um tutorial interativo ao usar o app pela primeira vez, para que eu entenda como funciona sem precisar de ajuda externa.

**Critérios de Aceitação:**
1. Tour guiado com tooltips nas telas principais após o onboarding inicial
2. Tour pode ser pulado e reiniciado em configurações
3. Cobertura: tela home, 7 áreas, chat, calendário
4. Duração estimada do tour: < 3 minutos

---

## Epic E5 — Conteúdo Clínico

**Objetivo:** Escalas diagnósticas, frases de impacto e meditações guiadas.

**Cobre FR-4, FR-9, FR-10, FR-18.**

**Dependência crítica:** Este epic só inicia após entrega do conteúdo pelo Dr. Ariosto (frases, escalas em PDF, gravações de meditação).

### E5.1 — Escalas Diagnósticas

Como paciente, quero preencher escalas diagnósticas 24h antes da minha consulta, para que meu médico chegue à sessão com dados objetivos do meu estado.

**Critérios de Aceitação:**
1. Implementação das escalas: HAM-A (Ansiedade de Hamilton), HAM-D (Depressão de Hamilton), Madres, Cococolos, YMRS
2. Interface amigável com uma pergunta por tela
3. Cálculo automático do score final
4. Escala bloqueada após envio (não editável)
5. Envio automático 24h antes da consulta (Vercel Cron)

### E5.2 — Resultados das Escalas no Dashboard Médico

Como Dr. Ariosto, quero ver os resultados das escalas de cada paciente no meu dashboard, para que eu compare a evolução clínica ao longo do tempo.

**Critérios de Aceitação:**
1. Painel de escalas na ficha do paciente com histórico de resultados
2. Gráfico de evolução do score por escala (últimas 6 consultas)
3. Alerta visual quando score indica piora significativa (>20% de aumento)
4. Exportação dos resultados no PDF do relatório

### E5.3 — 31 Frases de Impacto por Transtorno

Como paciente, quero receber uma frase histórica inspiradora todo dia calibrada para o meu diagnóstico, para que minha jornada diária tenha propósito e motivação.

**Critérios de Aceitação:**
1. Banco de 31 frases por transtorno (carregadas pelo Dr. Ariosto via painel admin)
2. Frases verificadas — atribuídas a autores reais com fonte
3. Rotação por dia do mês (dia 1 = frase 1, dia 15 = frase 15, etc.)
4. Paciente com múltiplos diagnósticos recebe frases do diagnóstico primário
5. CRUD de frases acessível apenas ao Dr. Ariosto

### E5.4 — Player de Meditações Guiadas

Como paciente, quero ouvir meditações guiadas gravadas pelo Dr. Ariosto diretamente no app, para que eu pratique técnicas de gestão de estresse prescritas pelo meu médico.

**Critérios de Aceitação:**
1. Player de áudio com: play/pause, barra de progresso, controle de volume
2. Streaming de áudio via Supabase Storage (não download)
3. Meditações categorizadas: respiração, mindfulness, relaxamento, sono
4. Filtragem por duração (< 5min, 5–15min, > 15min)
5. CRUD de meditações acessível apenas ao Dr. Ariosto

### E5.5 — Conteúdo Personalizado por Diagnóstico

Como paciente, quero ver conteúdo (frases, meditações sugeridas) adaptado ao meu diagnóstico principal, para que o app seja relevante para minha condição específica.

**Critérios de Aceitação:**
1. Meditações marcadas por diagnóstico aplicável
2. Sugestões de meditação na área "Gestão de Estresse" são filtradas pelo diagnóstico do paciente
3. Frases do dia já são específicas por diagnóstico (FR-10)
4. Seção "Para o seu diagnóstico" na área de Gestão de Estresse

### E5.6 — Envio Automático de Escala Pré-Consulta

Como sistema, quero enviar automaticamente a escala diagnóstica relevante ao paciente 24h antes da consulta, para que o Dr. Ariosto sempre tenha dados atualizados na sessão.

**Critérios de Aceitação:**
1. Vercel Cron verifica consultas nas próximas 24h a cada hora
2. Notificação push + email (Resend) para o paciente com link para a escala
3. Escala correta selecionada com base no diagnóstico do paciente
4. Se paciente já preencheu a escala nas últimas 48h, não envia novamente
5. Dr. Ariosto recebe notificação quando escala é preenchida

### E5.7 — Busca e Filtros de Pacientes

Como Dr. Ariosto, quero buscar pacientes por nome e filtrar por diagnóstico, status de engajamento ou próxima consulta, para que eu encontre rapidamente quem preciso.

**Critérios de Aceitação:**
1. Campo de busca por nome em tempo real (debounce 300ms)
2. Filtros: diagnóstico principal, streak (ativo/inativo), data de próxima consulta
3. Resultado exibe foto, nome, diagnóstico, último check-in, streak
4. Filtros combinados funcionam corretamente

---

## Epic E6 — Lançamento Interno

**Objetivo:** Testes com pacientes reais, correções, documentação e monitoramento.

### E6.1 — Testes com Pacientes Piloto

Como equipe do produto, quero conduzir testes com 5–10 pacientes reais do Dr. Ariosto, para que validemos o app em condições reais antes do lançamento amplo.

**Critérios de Aceitação:**
1. Onboarding de 5–10 pacientes piloto com acompanhamento direto
2. Sessão de feedback estruturado após 1 semana de uso
3. Relatório de bugs e issues coletado
4. NPS inicial coletado

### E6.2 — Correção de Bugs e Ajustes de UX

Como desenvolvedor, quero corrigir todos os bugs críticos e ajustar os fluxos de UX identificados nos testes, para que o app ofereça uma experiência fluida no lançamento.

**Critérios de Aceitação:**
1. Zero bugs críticos (crash, perda de dados, falha de autenticação) em produção
2. Issues de UX priorizados e corrigidos com base no feedback dos pacientes piloto
3. Todos os fluxos principais testados em dispositivos reais (Android Chrome, iOS Safari)

### E6.3 — Documentação para 3 Perfis

Como usuário, quero ter acesso a um guia simples de uso do app, para que eu possa usá-lo de forma autônoma sem precisar de suporte.

**Critérios de Aceitação:**
1. Guia do paciente: como fazer check-in, usar o chat, ver a planta, preencher escala
2. Guia da secretária (Helen): como cadastrar paciente, gerenciar acessos
3. Guia do médico: como usar o dashboard, exportar relatórios, publicar conteúdo
4. Guias em formato PDF e acessíveis dentro do app

### E6.4 — Monitoramento de Infraestrutura

Como DevOps/desenvolvedor, quero ter monitoramento configurado na Vercel com alertas de erros e performance, para que eu identifique problemas em produção antes dos usuários.

**Critérios de Aceitação:**
1. Vercel Analytics configurado com métricas de performance (LCP, FID, CLS)
2. Alertas de erro configurados (Vercel Log Drains ou Sentry)
3. Dashboard de métricas de infraestrutura acessível
4. Runbook básico de resposta a incidentes documentado

### E6.5 — Dashboard de Métricas Iniciais

Como Dr. Ariosto e Ronan, quero ver métricas de engajamento do piloto, para que avaliemos se o produto está atingindo seus objetivos antes do lançamento amplo.

**Critérios de Aceitação:**
1. Dashboard com métricas: DAU, taxa de check-in diário, streak médio, escalas preenchidas (%)
2. Comparativo semana a semana
3. NPS coletado via Resend na semana 2 e semana 4
4. Relatório de métricas exportável em PDF para apresentação ao Dr. Ariosto

---

## Métricas de Sucesso

| Métrica | Categoria | Meta v1 |
|---------|-----------|---------|
| DAU (usuários ativos diários) | Engajamento | ≥ 60% dos pacientes cadastrados |
| Taxa de check-in | Engajamento | ≥ 40% das áreas preenchidas por dia |
| Escalas pré-consulta | Clínico | ≥ 80% preenchidas antes das consultas |
| NPS | Produto | ≥ 8/10 |
| Streak médio | Retenção | ≥ 14 dias após 1 mês |

---

## Pendências do Dr. Ariosto (Bloqueantes para E5)

| Item | Necessário para | Status |
|------|----------------|--------|
| 31 frases históricas por transtorno (verificadas) | E5.3 | Pendente |
| Identidade visual (logo, cores, Pinterest) | E1.7 | Pendente |
| Escalas diagnósticas em PDF | E5.1 | Pendente |
| Gravações de meditação guiada (estúdio) | E5.4 | Pendente |
| Mensagens motivacionais semanais (tom/voz) | E5.5 | Pendente |
| Confirmação de transtornos v1 | E5.1 | Pendente |
| Aprovação do fluxo de onboarding | E1.8 | Pendente |

---

## Checklist Results

> A preencher pelo @po durante validação com `*validate-story-draft`

| # | Critério | Status |
|---|---------|--------|
| 1 | Título claro e objetivo | [ ] |
| 2 | Descrição completa (problema/necessidade explicados) | [ ] |
| 3 | Critérios de aceitação testáveis | [ ] |
| 4 | Escopo bem definido (IN e OUT) | [ ] |
| 5 | Dependências mapeadas | [ ] |
| 6 | Estimativa de complexidade | [ ] |
| 7 | Valor de negócio claro | [ ] |
| 8 | Riscos documentados | [ ] |
| 9 | Critério de Done definido | [ ] |
| 10 | Alinhamento com PRD/Epic | [ ] |

---

## Riscos e Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|--------------|---------|-----------|
| Conteúdo do Dr. Ariosto com atraso | Alta | E5 inteiro bloqueado | M1–M4 independem; E5 só inicia após entrega |
| Baixa adesão dos pacientes | Média | KPIs não atingidos | Gamificação + frases diárias + lembretes configuráveis |
| Design não aprovado | Média | Retrabalho em E1.7 | Wireframes baixa fidelidade em 13/05 antes do design final |
| Compliance CFM | Baixa | App suspenso | Posicionado como engajamento — não substitui prontuário nem teleconsulta |
| Complexidade de dados clínicos | Média | Bugs em produção | tRPC type-safe + RLS rigoroso + testes E2E em E6 |

---

## Next Steps

```
@po    — Validar este PRD (10-point checklist)
@sm    — Criar stories do Epic E1 após aprovação do @po
@architect — Revisar decisões técnicas e validar stack (tRPC, Supabase, PWA)
```

**Próxima reunião:** 13/05/2026 às 15h — ariostopsiquiatra@gmail.com

---

*— Morgan, planejando o futuro 📊*
*Synkra AIOX | Omiron App PRD v1.0 | 2026-05-09*
