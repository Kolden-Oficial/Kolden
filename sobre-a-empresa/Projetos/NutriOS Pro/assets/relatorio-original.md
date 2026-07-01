Aqui está o relatório técnico e arquitetural exaustivo extraído das fontes fornecidas, de acordo com as seções e diretrizes estabelecidas.

### VISÃO GERAL
*   **O que é o projeto:** O NutriOS Pro (anteriormente chamado de NutriCalc Pro) é um *Software as a Service* (SaaS) web moderno voltado para o setor de nutrição. O projeto evoluiu a partir de duas planilhas de Excel avançadas (uma de cálculo de dieta e outra de medição corporal) comercializadas inicialmente na Hotmart.
*   **Propósito:** "Sua prática clínica merece um sistema operacional". O projeto visa centralizar, em um único Web App, todas as informações e ferramentas que um nutricionista utiliza em seu fluxo clínico: cadastro de pacientes, avaliação antropométrica, cálculos energéticos automatizados, montagem de planos alimentares e monitoramento visual da evolução do paciente.
*   **Problema que resolve:** Elimina o uso de cálculos manuais e múltiplas planilhas de Excel, que são muitas vezes complexas para estudantes de nutrição recém-formados. Adicionalmente, ataca o maior "gap" da nutrição atual: o foco apenas em calorias, introduzindo ferramentas de saúde integral e mudanças comportamentais para que o paciente não desista ou "aprenda e não volte mais", garantindo adesão à dieta e fidelização do paciente.
*   **Público:** Nutricionistas clínicos que atendem pacientes individualmente (público principal), além de estudantes recém-formados e também um "público metódico" (pessoas apaixonadas por esportes/estética interessadas em controlar a própria nutrição e progresso com rigor).

### ESCOPO E OBJETIVOS
*   **Metas declaradas:** Aumentar o faturamento e o *ticket médio* cobrado pelos profissionais nutricionistas ao permitir que ofereçam um serviço mais completo e visual (trazendo gráficos de resultados que comprovam evolução). Tornar o produto em uma empresa altamente rentável, atraindo sócios-investidores e eventualmente construindo *equity* (valuation) baseado em recorrência de assinantes, a ponto de permitir dedicação em tempo integral dos fundadores. 
*   **Entregáveis:** Plataforma com módulos completos entregues nos Sprints 1 a 4: Autenticação, Dashboard administrativo e gerencial, Base de alimentos (+500 cadastros e leitura via IA), Criação de Dietas Dinâmica, Exames, Módulo de Avaliação Antropométrica (com avaliação via foto/Body 3D), Exportação de Relatórios PDF, e um Módulo Comportamental (controle de sono, cortisol, stress, e técnicas como respiração e ciclo circadiano).
*   **Fora-de-escopo (para a versão atual):** Neste primeiro momento (versão atual), o paciente não terá um login de acesso direto à plataforma, recebendo seus planos apenas via exportação em PDF. A criação de um portal mobile-first dedicado apenas ao paciente e integrações com *wearables* estão declarados como escopo futuro no "Sprint 5".

### ARQUITETURA E COMPONENTES
*   **Módulos:** Autenticação (Login e controle de acesso); Dashboard (Resumo gerencial); Gestão de Pacientes (CRUD); Avaliações (Antropometria tradicional, por fotos e Body 3D com protocolos); Metas Energéticas (TMB, GET, VET, Hidratação, Suplementação); Dietas (Refeições e macros); Evolução (Monitoramento em gráficos temporais); Consumo (Registro manual ou por análise de foto); Exames (Análise IA de laboratoriais); Alimentos (Base de dados Tabela TACO/IBGE e customizados); Administração (Audit logs, roles, backups) e Configurações de sistema/usuário.
*   **Integrações e Serviços:**
    *   **Lovable Cloud / Supabase:** Banco de dados (PostgreSQL 14.1), Supabase Auth (SSO, email), Supabase Storage (bucket `patient-files` para armazenar PDFs e imagens).
    *   **Edge Functions (Deno via Supabase):** Camada serverless utilizada exclusivamente para lidar com IA e administração do sistema. São 7 funções ativas (`analyze-food-photo`, `analyze-checkup`, `analyze-nutrition-label`, `analyze-body3d`, `analyze-evolution-photos`, `admin-user-management`, `backup-settings`).
    *   **Lovable AI / Modelos AI:** Utilização dos modelos *gemini-3-flash-preview* e *gemini-2.5-flash* para avaliação de rótulos, pratos de comida, exames de sangue e fotos do corpo.
    *   **Segurança e Domínios:** Cloudflare (gerenciamento DNS e proxy reverso para proteção DDos). Registro.br (registro do domínio "Nutrios Pro").
    *   **Ecossistema Meta/Google:** Configuração de contas Business Manager (BM), Meta Ads, Instagram da marca e Google Analytics/Google Tag Manager/Search Console para marketing.
*   **Fluxo de Dados:** O sistema segue a arquitetura de SPA (*Single Page Application*) com roteamento *client-side*. O Frontend envia requisições diretamente ao Supabase SDK (via REST ou WebSocket/Realtime) para atingir o banco PostgreSQL. Não há um *Backend-for-Frontend* (BFF), de modo que a lógica de acesso está diluída no frontend (cálculos) e no RLS do PostgreSQL (segurança). 

### STACK E DEPENDÊNCIAS
*   **Frontend:** React 18, TypeScript 5, Vite 5.
*   **Estilização:** Tailwind CSS v3, biblioteca de componentes `shadcn/ui`, `tailwindcss-animate`.
*   **Roteamento:** React Router DOM v6.
*   **Gerenciamento de Estado:** Misto de `useState`/`useEffect` (estado local do React) com a biblioteca `TanStack React Query`.
*   **Backend e Database:** Lovable Cloud usando PostgreSQL 14.1 (Supabase).
*   **Serverless Environment:** Deno (utilizado pelas Supabase Edge Functions).
*   **Biblioteca Gráfica e Interface:** `Recharts` (para traçar evolução e crescimento).
*   **Exportador PDF:** Bibliotecas client-side `jsPDF` e `jspdf-autotable`.
*   **Ferramentas utilitárias:** `date-fns` (manipulação de datas em pt-BR), `Zod` (validação de schemas e payloads de inputs), `vite-plugin-pwa` (service worker), e `Papa Parse` (para a conversão e o *import* massivo de planilhas CSV de alimentos).
*   **Testes:** `Vitest`, `@testing-library/react`, `jsdom`.
*   **Design/Branding (Ferramentas):** Canva, Predis.Ai, Coolors, Genially.

### CONFIGURAÇÃO E EXECUÇÃO
*   **Passos de Setup / Variáveis Ambientais:**
    *   Configuração do projeto na `Lovable Cloud`.
    *   Edge Functions requerem a variável de configuração `verify_jwt = false` no arquivo `config.toml` (pois a autenticação é tratada manualmente via cabeçalho).
    *   Variáveis secretas de ambiente obrigatoriamente configuradas no Supabase e omitidas de repositório: `LOVABLE_API_KEY` e `SUPABASE_SERVICE_ROLE_KEY`.
*   **Autenticação Setup:** Sessão utiliza `localStorage` configurado com `persistSession: true` e `autoRefreshToken: true`.
*   **Comandos e portas:** [NÃO CONSTA NAS FONTES]. (Não há indicação dos scripts no `package.json` para rodar ou buildar localmente).

### REGRAS DE NEGÓCIO E DECISÕES
*   **Restrições Sistêmicas de Proteção (Limites e Auth):**
    *   Validação de senha no frontend exigida via *Zod schema*: Mínimo 8 caracteres, pelo menos uma letra maiúscula, uma minúscula e um número, padrão OWASP.
    *   Lockout progressivo anti-brute-force implementado no `Auth.tsx`: bloqueio de 30 segundos após 3 falhas de login; e 5 minutos de bloqueio após 5 tentativas.
    *   Tratamento de anti-enumeração de dados (mensagens genéricas de falha) para proteger quais e-mails estão cadastrados.
*   **Restrições para Operações de Mídia e IA:**
    *   Rate limiting para a IA fixado em `rate_limit_log`: 50 requisições por hora/usuário em `analyze-food-photo`; 30 requisições por hora na avaliação Body 3D e rótulos; 20 por hora para fotos e checkups.
    *   Uploads de arquivos estão restringidos pela função client-side `validateFile()` a aceitar somente extensões `.jpeg`, `.png`, `.webp` e `.pdf` e tamanho máximo restrito a 10MB por arquivo. Paths devem respeitar o formato `*.supabase.co/storage/v1/object/` validado por `validateStorageUrl()`.
    *   Na IA, o arquivo é higienizado com UUID gerado pela função `generateSafeFilename()`.
*   **Restrições Clínico-Nutricionais:**
    *   A equação preditiva para calcular a Taxa Metabólica Basal (TMB) é auto-determinada pela *classificação corporal* (Harris Benedict para "eutrófico", Mifflin para "sobrepeso", ou Tinsley).
    *   O cálculo VET (Valor Energético Total) deriva do GET mais o ajuste definido no objetivo (adicionando para superávit ou tirando para déficit).
    *   Cálculo de macros (`calculateMacros()`): Fixado que Proteína e Carboidratos conferem 4 kcal por grama e Lipídios/Gorduras dão 9 kcal por grama.
    *   Validação rigorosa (`calculateNavy()`) limita o percentual de gordura do cálculo Navy entre as faixas 0 a 60%.
    *   Creatina fixada no escopo padrão de recomendação geral de 3 a 5 gramas/dia e limite absoluto de 6g.
    *   Dados de *behavioral logs* validados no banco (`trg_validate_behavioral_log`): os logs de qualidade de sono (`sleep_quality`) e estresse (`stress_level`) aceitam unicamente inputs inteiros em escala de 1 a 10.
*   **Decisões e Convenções Adotadas (Trade-offs e Porquês):**
    *   Decidiu-se que a plataforma cobraria na modalidade de recorrência mensal (SaaS multi-tenant com assinatura) invés do pagamento *one-off* adotado nas planilhas, em virtude da busca por longevidade, LTV (*Lifetime Value*) e suporte contínuo da infra.
    *   O nome original do projeto (NutriCalc / Nutrios) foi ajustado para **"Nutrios Pro"**, sendo o domínio `nutrios` orçado em R$ 30.000,00 e inacessível, levando à compra de `nutriospro.com.br` por R$ 40,00 reais.
    *   Não há um servidor backend isolado entre a interface gráfica e o banco; escolheu-se RLS (Row Level Security) nativo do Supabase direto na UI pois essa arquitetura serverless traz baixo custo, velocidade inicial de desenvolvimento e escalabilidade transparente para o app recém-criado.

### DADOS
*   **Entidades, Esquemas e Formatos:** Todo o esquema de banco foi consolidado em PostgreSQL na arquitetura multi-tenant, gerando 16 tabelas e 6 ENUMS.
    *   **Enums Globais (6):** `sex` ('M', 'F'); `body_classification` ('eutrofico', 'atleta', 'musculoso', 'sobrepeso', 'obeso'); `activity_factor` ('sedentario', 'pouco_ativo', 'ativo', 'atleta'); `goal_type` ('normocalorica', 'superavit', 'deficit'); `food_category` ('frutas', 'proteinas', 'carboidratos', 'laticinios', 'vegetais', 'gorduras', 'bebidas', 'outros'); e `app_role` ('admin', 'moderador', 'user').
    *   **Tabelas e Estrutura Lógica:** 
        *   `profiles` e `patients`: A relação entre o logista Auth e o paciente baseia-se num pseudo `user_id` sem chave estrangeira ativada forçosamente para mitigar conflito do esquema *auth* gerido internamente pelo Supabase. 
        *   `assessments`: A tabela mais massiva. Mais de 80 colunas lidando com identificações, dados visuais, métricas puras, 7 dobras cutâneas (tricipital, peitoral, subescapular, axilar media, etc), 15 tipos de circunferências unificadas e bilaterais (_d_cm, _e_cm), campos booleanos (`bilateral_mode`) além de blocos de dados exclusivos de balança de bioimpedância (idade metabólica, água, massa óssea) e 7 métodos pollock/navy.
        *   `goals`: Dados alvo. Grava metas como creatina, gramas de macros, percentuais macros e hidratação (TMB, GET, VET calculados).
        *   `diet_plans` & `diet_items` & `diet_templates`: Lidam com relação FK entre o paciente, os planos em texto, os objetivos (goal_id nullable) e a base de foods. A tabela de templates armazena a formatação JSONB customizável (em `meals`) sem esquemas rígidos garantidos por validação backend.
        *   `foods`: Entidade universal referenciada base. Mede nome, macros, calorias e categoria de dados preenchidos de base como Taco (100g padronizados) e caseiras.
        *   `consumption_logs` & `behavioral_logs` & `meal_checks` & `checkups`: Gerenciam auditoria do cliente, extraem exames com jsonb para os dados (`structured_data`), avaliam marcadores biológicos e aplicam o tracking visual AI via `ai_analysis` (campo jsonb). `meal_checks` possui constraint `UNIQUE(diet_plan_id, meal_name, check_date)`.
        *   `user_roles` & `audit_logs` & `rate_limit_log`: Camadas puras de backend restritivas para monitoria da equipe. Ações admin injetáveis (via Supabase Admin API em triggers como `handle_new_user` e `audit_sensitive_changes`).
        *   `system_settings` e `settings_backups`: Permite snapshot com inserção por `jsonb` de tabelas em cascata ordenadas por deleção/inserção.
*   **Fontes dos Dados:** Há 312 alimentos pré-cadastrados internamente com planos para subir uma base de Excel limpa com mais 597 alimentos usando `BulkFoodImport.tsx` (via biblioteca Papa Parse) referenciados pelas bases oficiais USP/TACO. Dados do próprio app coletados e importados manualmente ou através do envio de fotos para Inteligência Artificial processar via LOVABLE AI GATEWAY.
*   **Persistência:** PostreSQL para dados textuais estruturados e relacionamentos e Bucket privado Supabase Storage `patient-files` com URLs expiratórias assinadas (`createSignedUrl(path, 3600)`) limitadas a 1 hora de expiração de acesso para mídia, PDF, imagens e exames. 

### PESSOAS E PAPÉIS
*   **Ronan Sersil:** Co-fundador, programador e responsável técnico pelo desenvolvimento do aplicativo no Lovable/Supabase (Frontend, Integrações, Configurações de DNS e Ads). Empreendedor com foco em performance e agências de tráfego, atua como "Admin" testando os *Sprints* e gerando marketing. 
*   **Vinicius Abdon (Dr. Vinicius Abdon):** Co-fundador e idealizador originário. Detentor do investimento inicial das plataformas de anúncio. Elaborou as planilhas nutricionais do Excel avançadas que originaram o projeto. Atua no desenvolvimento de rede de relacionamentos (B2B academias Gearup/BlueFit) e definição de nomenclaturas. Acordo de divisão de lucros: 60% para Vinicius e 40% para Ronan.
*   **Mayan Leão:** Nutricionista mentora e tester. Traz à equipe a visão profunda da Nutrição Integral/Comportamental baseada em Ensaios Clínicos Randomizados (ECR), ciclo circadiano, dopamina, e técnicas de presença (uso do yoga para combater obesidade). Mentora direta do projeto na implementação do "PatientBehavioralTab".
*   **Susan Carolina:** Nutricionista especializada, tester de usabilidade primária do MVP da versão "NutriOS". Forneceu orientações cruciais sobre integração de dados da Biopedância, medidas de circunferência bilaterais faltantes (coxa, antebraço, pescoço), e solicitou modelos de dietas específicas como vegetarianas, além de ferramentas de relacionamento e alertas de aniversário.
*   **Guilherme Santos (Asla):** Amigo profissional de Ronan Sersil em UX/UI encarregado da elaboração do Logotipo e Paleta de Cores de marca em um estágio futuro da interface.
*   **Camila:** Paciente que foi o elo/indicação entre Ronan Sersil e a nutricionista Susan Carolina.
*   **Nicolas Ferreira:** Usuário-exemplo contido nos wireframes (mockups) do sistema em fase de desenvolvimento na plataforma.

### CRONOGRAMA E STATUS
*   **Status do Sistema e Marcos:** De acordo com o Dossiê Técnico emitido em 01 de Abril de 2026, o NutriOS encontra-se em estágio de "produto completo v1", funcional maduro e lançado no ambiente de produção `nutriospro.lovable.app`. Foram concluídos com êxito os Sprints 1, 2, 3 e 4.
    *   **Sprint 1 concluído:** Bug de fotos URL assinado corrigido, PDF de dieta reestruturado, acentos nos alimentos corrigidos, falha de overflow e falhas numéricas resolvidas.
    *   **Sprint 2 concluído:** Criação dos bancos e constraints para tabelas comportamentais, checks de metas, policies RLS ativadas e categorias de templates registradas.
    *   **Sprint 3 concluído:** Filtros históricos de UI implantados, leitor de PDF inserido em modal (`<iframe>`), gráficos Recharts consolidados, importação massiva liberada.
    *   **Sprint 4 concluído:** Integração do Módulo Comportamental (Sono, Estresse e Técnicas editáveis de IA de acordo com os ensinamentos da Mayan), Gráficos novos ativados, e inclusão de templates baseados no Marketing ("Desafio 30 dias de Hipertrofia", "Dieta Cariani", etc). 
    *   **Comunicação e Setup:** As plataformas Business Manager, o domínio, os cartões virtuais de Vinicius (Nutest/Nutos Pro), e as contas do Instagram/Facebook foram todos ativados e configurados com sucesso.
*   **Pendentes / O que Falta:** 
    *   Realização de testes *End-to-End* maciços e profundos do sistema pronto.
    *   Início da ideação e desenvolvimento do Sprint 5 (criação oficial de um Portal Web Mobile-First 100% focado no Paciente para registro via Push Notifications e sincronização direta por Bluetooth com *smartwatches/wearables*).
    *   Implementação e aprovação de pagamentos Stripe/Gateways próprios. A conta de anúncios do Google Ads sofreu "compra negada" na adição do cartão, devendo ser reavaliada posteriormente.

### RISCOS, PROBLEMAS E LIMITAÇÕES
*   **Problemas Sistêmicos (Dívida Técnica):**
    *   **Inconsistência de Políticas de RLS:** As tabelas `behavioral_logs`, `diet_templates` e `meal_checks` apresentam brecha por usarem *Policy* do tipo `PERMISSIVE` ao invés do correto modelo `RESTRICTIVE`. Apesar de o UUID via usuário estarem trancados diminuindo o risco, a base apresenta uma falha arquitetônica de padrão de consistência de código.
    *   **Componentes de Interface Oversized:** O código dos painéis `PatientAssessmentsTab.tsx` e `PatientDietsTab.tsx` possuem, respectivamente, mais de 2.000 e 1.300 linhas, causando lentidão no render da DOM, ausência de manutenibilidade fácil e risco por falta de modularização dos formulários.
    *   **Performance Ineficiente de API:** A busca da Dashboard pelo `fetchStats()` opera requisições encadeadas (uma atrás da outra em sequência) prejudicando latência. O recurso client *TanStack React Query* foi subutilizado pela equipe, resultando na ausência de otimizações vitais em *cache caching*, *background refetch* e deduplicação automática de solicitações de API.
    *   **Vulnerabilidades em Arquivos:** As fotos carregadas pelos usuários não perpassam tratamento compressivo pré-upload (*client-side*). Mídias em PDF, PNGs chegam com 10MB absolutos que podem drenar o custo da *Lovable Cloud Storage*. Inexistem gatilhos de backend para criar *thumbnails*.
    *   **Exportador PDF Obsoleto:** A geração técnica de PDF usa limitador rígido no eixo Y (se `yPos > 250` = quebra página). Essa implementação pode quebrar violentamente quando submetida a renderização dinâmica longa (nomes e anotações grandes inseridas). Também não aceita caracteres de fontes especiais.
    *   **Backups Perigosos:** A Edge function `backup-settings` opera através de varredura destrutiva sem salvamento limpo. Deleta em *hard reset* os registros antigos das 13 tabelas para depois re-escrever o arquivo. Se a função falhar na inserção intermediária o banco é corrompido globalmente (sem *rollback*).
*   **Ausência de Testes:** Não foram criados rotinas de automação E2E (End-to-End). Testes limitam-se a *mocks* falsos superficiais de ambiente *Vitest*.
*   **Riscos de Negócio:**
    *   Temor de adesão e de mercado. Há um receio de que a automação e entrega inteligente da plataforma elimine a necessidade do profissional nutricionista, servindo para o paciente realizar "automedicação alimentar" se o aplicativo chegar às mãos do consumidor final isoladamente. 
    *   Forte presença mercadológica das opções consagradas "WebDiet" e "Dietbox", as quais possuem alta adesão e estabilidade já comprovada por milhares de profissionais. 

### GLOSSÁRIO
*   **TMB (Taxa Metabólica Basal):** Quantidade mínima de energia (calorias) que o indivíduo gasta apenas para existir no estado de repouso respiratório do corpo.
*   **GET (Gasto Energético Total):** Multiplicação da TMB baseada no fator de atividade rotineiro/físico do paciente em sua carga horária diária.
*   **VET (Valor Energético Total):** A caloria exata consumida que define se a dieta gera um déficit emagrecedor, normocalórica mantenedora ou superávit construtor, operado como limite prescritivo em macros.
*   **ECR (Ensaios Clínicos Randomizados):** Pesquisas médicas isoladas onde amostras são aleatoriamente divididas e geridas pelo método científico de causa-e-efeito, diferente de "Estudos Observacionais". Ferramenta referenciada pela plataforma para educação antifraude da mídia.
*   **Body 3D / IA de Avaliação Corporal:** Um modelo e *API Endpoint* fotogramétrico capaz de isolar fotos visuais do tronco e gerar mapeamentos circulares digitais e medidas de percentual de pregas cutâneas sem necessidade de medição de compasso (*Adipômetro*) ou toque humano.
*   **Bioimpedância:** Balança digital sensível que calcula idade metabólica, percentual de gordura, gordura visceral, água corporal total (hidratação limpa) e ossos por correntes elétricas no corpo.
*   **Dobras Cutâneas (Fórmulas):** Técnicas validadas baseadas na pinçada adipométrica da pele do paciente (*Pollock de 3 e 7*, *Marinha dos EUA / Navy*, *Guedes*, *Petroski*, *Durnin*, *Faulkner*) aplicadas pelas fórmulas contidas no app para verificar massa magra.
*   **RLS (Row Level Security):** Segurança a nível de linha intrínseca ao Banco de Dados PostgreSQL onde é verificado o escopo via *Token* (auth.uid) do usuário que impede invasões cruzadas nas requisições client-side.
*   **Edge Functions:** Código Serverless da nuvem implementado via infra Deno no projeto NutriOS Pro; serve como retaguarda invisível focada na Inteligência Artificial sem sobrecarga em máquinas locais.
*   **SaaS (Software as a Service):** Hospedagem baseada em assinaturas online baseada em WebApps, substituindo a prática do "vender planilhas via link único para a pessoa baixar". 
*   **BM (Business Manager / Portfólio Empresarial):** Gerenciador robusto e estruturado do Facebook (Meta Ads) que lida com Contas de Anúncio e pagamentos focados no direcionamento geográfico e marketing online do ecossistema de vendas da marca NutriOS Pro.

### LACUNAS
*   [NÃO CONSTA NAS FONTES] Os comandos técnicos pontuais utilizados via *CLI* de bash (script de build/terminal/deployment node.js, tais como `npm run dev`, `supabase start`, `npm run build`, `vercel deploy`).
*   [NÃO CONSTA NAS FONTES] Nomes locais exatos das portas de processamento do projeto utilizadas em localhost e debug pelo desenvolvedor Ronan Sersil no servidor (e.g., `localhost:3000` / `:54321`).
*   [NÃO CONSTA NAS FONTES] Detalhamento técnico estrutural exato sobre o Hardware e as métricas físicas da futura Servidão de Nuvem e Hospedagem Dedicada Independente abordada superficialmente pela equipe ("Host Próprio" com "geradores de energia próprios") ao migrarem da dependência estrutural do ecossistema Lovable Cloud.