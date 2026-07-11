---
id_fonte: "97acbca1-58bf-41bf-895d-09d76423fe53"
notebook_id: "d66452a9-53ce-4213-a916-75314c60f002"
notebook_titulo: "NutriOS Pro"
titulo: "NutriOS_Pro_Dossie_Tecnico.md"
tipo: "unknown"
url_original: null
keywords: "('Database Schema Design', 'Security and Permissions', 'AI Edge Functions', 'Technical Debt Issues', 'Frontend System Architecture')"
summary: "The provided technical dossier outlines the **architectural framework and current state of NutriOS Pro**, a sophisticated digital platform designed for comprehensive nutritional management. The document details an intricate **relational database schema** consisting of sixteen tables that track everything from patient biometrics and clinical assessments to complex dietary plans and behavioral logs. A central pillar of the system is its **integration of artificial intelligence**, utilizing specialized Edge Functions to automate the analysis of food photography, lab results, and three-dimensional body proportions. While the project features **robust security protocols** such as Row Level Security and role-based access control, the dossier also identifies **technical debt and optimization opportunities**, specifically regarding component modularity and consistent database policies. Ultimately, this report serves as an exhaustive **technical blueprint** intended to synchronize advanced AI models with the project’s full developmental status."
extraido_em: "2026-06-30T16:08:53Z"
extraido_por: "notebooklm-py-0.7.3"
projeto: nutrios-pro
up: "[[sobre-a-empresa/Projetos/_MOC-projetos]]"
relacionado:
  - "[[sobre-a-empresa/Projetos/Ativos/nutrios-pro/_notebooklm/_indice|_indice]]"
---

# NutriOS_Pro_Dossie_Tecnico.md

### NutriOS Pro — Dossiê Técnico e Arquitetural Completo

**Gerado em:** 2026-04-14
**Versão:** Pós-Sprint 4
**Objetivo:** Documento exaustivo para alimentar IA avançada com 100% do estado do projeto.

---

#### 1. ARQUITETURA DE BANCO DE DADOS (Schema Completo)

##### 1.1 Tabelas Existentes (16 tabelas)

```
profiles              — Perfis de nutricionistas (user_id → auth.users)
patients              — Pacientes vinculados ao nutricionista (user_id)
assessments           — Avaliações antropométricas (patient_id → patients)
goals                 — Metas nutricionais (patient_id → patients)
diet_plans            — Planos alimentares (patient_id → patients, goal_id → goals)
diet_items            — Itens do plano (diet_plan_id → diet_plans, food_id → foods)
foods                 — Banco de alimentos (admin-only write)
consumption_logs      — Logs de consumo diário (patient_id → patients)
checkups              — Exames laboratoriais (patient_id → patients)
diet_templates        — Templates de dieta (user_id → auth.users)
behavioral_logs       — Logs comportamentais/sono (patient_id → patients)
meal_checks           — Checklist de refeições (diet_plan_id → diet_plans)
user_roles            — Roles RBAC (user_id → auth.users)
audit_logs            — Logs de auditoria admin (append-only)
system_settings       — Configurações globais (admin-only)
settings_backups      — Backups do sistema (admin-only)
rate_limit_log        — Log de rate-limiting (system-only, RLS blocks all)
```

##### 1.2 Schema Detalhado por Tabela

###### profiles

| Coluna | Tipo | Nullable | Default |
| --- | --- | --- | --- |
| id | uuid PK | No | gen\_random\_uuid() |
| user\_id | uuid | No | — |
| full\_name | text | Yes | — |
| created\_at | timestamptz | No | now() |
| updated\_at | timestamptz | No | now() |

###### patients

| Coluna | Tipo | Nullable | Default |
| --- | --- | --- | --- |
| id | uuid PK | No | gen\_random\_uuid() |
| user\_id | uuid | No | — |
| name | text | No | — |
| sex | enum (M, F) | No | — |
| birth\_date | date | No | — |
| weight\_kg | numeric | No | — |
| height\_cm | numeric | No | — |
| body\_classification | enum | No | 'eutrofico' |
| phone | text | Yes | — |
| email | text | Yes | — |
| dietary\_tags | text[] | Yes | '{}' |
| photo\_url | text | Yes | — |
| created\_at | timestamptz | No | now() |
| updated\_at | timestamptz | No | now() |

**Enums:** body\_classification = eutrofico, atleta, musculoso, sobrepeso, obeso
**Enums:** sex = M, F

###### assessments (80+ colunas)

Campos principais:

* **Identificação:** id, patient\_id, assessment\_date, assessment\_method (traditional/photo/body3d), assessment\_notes
* **Medidas básicas:** weight\_kg, height\_cm, imc, imc\_classification
* **Dobras cutâneas (7):** tricipital\_mm, peitoral\_mm, subescapular\_mm, axilar\_medio\_mm, suprailiaca\_mm, abdominal\_mm, coxa\_mm, bicipital\_mm, supraespinhal\_mm, panturrilha\_mm
* **Circunferências (15+):** cintura\_cm, quadril\_cm, pescoco\_cm, abdomen\_cm, braco\_cm, antebraco\_cm, coxa\_cm, panturrilha\_cm, ombro\_cm, torax\_cm + versões bilaterais (\_d\_cm, \_e\_cm) para braço, antebraço, coxa (proximal/medial/distal), panturrilha, braço relaxado, braço contraído
* **Pollock 3:** pollock3\_density, pollock3\_fat\_percent, pollock3\_fat\_mass, pollock3\_lean\_mass
* **Pollock 7:** pollock7\_density, pollock7\_fat\_percent, pollock7\_fat\_mass, pollock7\_lean\_mass
* **Navy:** navy\_fat\_percent, navy\_fat\_mass, navy\_lean\_mass
* **Petroski:** petroski\_density, petroski\_fat\_percent, petroski\_fat\_mass, petroski\_lean\_mass
* **Guedes:** guedes\_density, guedes\_fat\_percent, guedes\_fat\_mass, guedes\_lean\_mass
* **Durnin:** durnin\_density, durnin\_fat\_percent, durnin\_fat\_mass, durnin\_lean\_mass
* **Faulkner:** faulkner\_fat\_percent, faulkner\_fat\_mass, faulkner\_lean\_mass
* **Bioimpedância (8):** bio\_fat\_percent, bio\_metabolic\_age (int), bio\_visceral\_fat, bio\_body\_water\_percent, bio\_muscle\_mass, bio\_bone\_mass, bio\_lean\_mass, bio\_fat\_mass, bio\_muscle\_percent
* **Índices:** rcq, cmb
* **Modo bilateral:** bilateral\_mode (boolean)
* **Fotos:** photo\_urls (text[])

###### goals

| Coluna | Tipo | Nullable | Default |
| --- | --- | --- | --- |
| id | uuid PK | No | gen\_random\_uuid() |
| patient\_id | uuid | No | — |
| goal\_date | date | No | CURRENT\_DATE |
| tmb | numeric | No | — |
| tmb\_formula | text | No | — |
| activity\_factor | enum | No | 'sedentario' |
| activity\_multiplier | numeric | No | 1.2 |
| get | numeric | No | — |
| goal\_type | enum | No | 'normocalorica' |
| adjustment\_kcal | integer | No | 0 |
| vet | numeric | No | — |
| protein\_percent | numeric | No | 25 |
| carb\_percent | numeric | No | 50 |
| fat\_percent | numeric | No | 25 |
| protein\_grams | numeric | No | — |
| carb\_grams | numeric | No | — |
| fat\_grams | numeric | No | — |
| water\_intake\_ml | integer | Yes | — |
| creatine\_g | numeric | Yes | — |
| supplementation\_notes | text | Yes | — |
| created\_at | timestamptz | No | now() |

**Enums:** activity\_factor = sedentario, pouco\_ativo, ativo, atleta
**Enums:** goal\_type = normocalorica, superavit, deficit

###### diet\_plans

| Coluna | Tipo | Default |
| --- | --- | --- |
| id | uuid PK | gen\_random\_uuid() |
| patient\_id | uuid FK | — |
| goal\_id | uuid FK nullable | — |
| plan\_name | text | 'Plano Alimentar' |
| plan\_date | date | CURRENT\_DATE |
| created\_at / updated\_at | timestamptz | now() |

###### diet\_items

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| diet\_plan\_id | uuid FK → diet\_plans |
| food\_id | uuid FK → foods |
| meal\_name | text |
| quantity | numeric |
| kcal\_calculated | numeric |
| protein\_calculated | numeric |
| carbs\_calculated | numeric |
| fat\_calculated | numeric |

###### foods

| Coluna | Tipo | Default |
| --- | --- | --- |
| id | uuid PK | gen\_random\_uuid() |
| name | text | — |
| category | enum food\_category | 'outros' |
| reference\_qty | numeric | 100 |
| reference\_unit | text | 'g' |
| kcal | numeric | — |
| protein | numeric | 0 |
| carbs | numeric | 0 |
| fat | numeric | 0 |
| household\_qty | numeric nullable | — |
| household\_unit | text nullable | — |

**Enum:** food\_category = frutas, proteinas, carboidratos, laticinios, vegetais, gorduras, bebidas, outros

###### consumption\_logs

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| patient\_id | uuid FK |
| logged\_by | uuid FK (user) |
| log\_date | date |
| log\_time | time |
| source | text ('manual'/'photo') |
| kcal/protein/carbs/fat\_consumed | numeric |
| photo\_url | text nullable |
| ai\_analysis | jsonb nullable |
| ai\_confidence | text nullable |
| notes | text nullable |

**JSONB** **ai\_analysis** **:**

```
{
  "foods_identified": ["arroz branco", "frango grelhado"],
  "portions_estimated": ["100g de arroz", "150g de frango"],
  "confidence_details": "..."
}
```

###### checkups

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| patient\_id | uuid FK |
| checkup\_date | date |
| title | text (default 'Exame') |
| file\_url | text nullable |
| file\_type | text nullable |
| extracted\_text | text nullable |
| structured\_data | jsonb nullable |
| clinical\_summary | text nullable |
| notes | text nullable |

**JSONB** **structured\_data** **:**

```
{
  "vitamina_d": { "valor": 28, "unidade": "ng/mL", "status": "baixo" },
  "vitamina_b12": { "valor": 410, "unidade": "pg/mL", "status": "normal" },
  "glicose": { "valor": 95, "unidade": "mg/dL", "status": "normal" }
}
```

Status possíveis: "baixo", "normal", "alto"

###### behavioral\_logs

| Coluna | Tipo | Default |
| --- | --- | --- |
| id | uuid PK | gen\_random\_uuid() |
| patient\_id | uuid FK | — |
| log\_date | date | CURRENT\_DATE |
| sleep\_quality | integer (1-10) | — |
| sleep\_hours | numeric | — |
| bedtime | time | — |
| wake\_time | time | — |
| stress\_level | integer (1-10) | — |
| mood | text | — |
| techniques\_applied | jsonb | '[]' |
| circadian\_notes | text | — |
| notes | text | — |

**JSONB** **techniques\_applied** **:** Array de strings, ex: ["sol\_matinal","meditacao","respiracao\_consciente"]
Validação via trigger trg\_validate\_behavioral\_log → function validate\_behavioral\_log():

* sleep\_quality must be 1-10
* stress\_level must be 1-10

###### meal\_checks

| Coluna | Tipo | Default |
| --- | --- | --- |
| id | uuid PK | gen\_random\_uuid() |
| diet\_plan\_id | uuid FK → diet\_plans | — |
| meal\_name | text | — |
| check\_date | date | CURRENT\_DATE |
| checked | boolean | false |
| checked\_at | timestamptz | — |

**Constraint:** UNIQUE(diet\_plan\_id, meal\_name, check\_date)

###### diet\_templates

| Coluna | Tipo | Default |
| --- | --- | --- |
| id | uuid PK | gen\_random\_uuid() |
| user\_id | uuid | — |
| name | text | — |
| description | text nullable | — |
| tag | text nullable | — |
| meals | jsonb | '[]' |
| template\_category | text | 'custom' |
| created\_at / updated\_at | timestamptz | now() |

###### user\_roles

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| user\_id | uuid FK → auth.users (CASCADE) |
| role | enum app\_role |
| created\_at | timestamptz |

**Enum:** app\_role = admin, moderator, user
**Constraint:** UNIQUE(user\_id, role)

###### audit\_logs (append-only)

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| admin\_user\_id | uuid |
| action\_type | text |
| target\_user\_id | uuid nullable |
| details | jsonb nullable |
| ip\_address | text nullable |
| created\_at | timestamptz |

###### system\_settings

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| setting\_key | text |
| setting\_value | jsonb |
| description | text nullable |
| updated\_by | uuid nullable |
| updated\_at | timestamptz |

###### settings\_backups

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| settings | jsonb |
| notes | text nullable |
| created\_by | uuid nullable |
| backup\_date | timestamptz |

###### rate\_limit\_log

| Coluna | Tipo |
| --- | --- |
| id | uuid PK |
| user\_id | uuid |
| action\_type | text |
| created\_at | timestamptz |

##### 1.3 Foreign Keys e Relacionamentos

```
patients.user_id           → (logical) auth.users.id
profiles.user_id           → (logical) auth.users.id
user_roles.user_id         → auth.users.id ON DELETE CASCADE

assessments.patient_id     → patients.id
goals.patient_id           → patients.id
diet_plans.patient_id      → patients.id
diet_plans.goal_id         → goals.id (nullable)
diet_items.diet_plan_id    → diet_plans.id
diet_items.food_id         → foods.id
consumption_logs.patient_id → patients.id
checkups.patient_id        → patients.id
behavioral_logs.patient_id → patients.id ON DELETE CASCADE
meal_checks.diet_plan_id   → diet_plans.id ON DELETE CASCADE
diet_templates.user_id     → (logical) auth.users.id
```

**Nota:** Profiles e patients referenciam auth.users logicamente via user\_id, mas não têm FK declarada para evitar conflitos com o schema auth gerenciado pelo Supabase.

##### 1.4 Funções SQL (Database Functions)

| Função | Tipo | Descrição |
| --- | --- | --- |
| has\_role(\_user\_id uuid, \_role app\_role) | SECURITY DEFINER | Verifica se user tem role. Usada em RLS policies. |
| handle\_new\_user() | TRIGGER (auth.users AFTER INSERT) | Auto-cria profile ao signup |
| update\_updated\_at\_column() | TRIGGER | Auto-atualiza updated\_at |
| validate\_behavioral\_log() | TRIGGER | Valida sleep\_quality e stress\_level (1-10) |
| audit\_sensitive\_changes() | TRIGGER | Registra DELETEs em audit\_logs |
| get\_admin\_stats() | SECURITY DEFINER | Retorna totais globais (admin-only) |
| get\_growth\_stats(months\_back) | SECURITY DEFINER | Métricas de crescimento por mês (admin-only) |
| get\_nutritionist\_stats() | SECURITY DEFINER | Stats por nutricionista (admin-only) |
| get\_all\_patients\_admin() | SECURITY DEFINER | Lista todos pacientes com nutricionista (admin-only) |
| get\_all\_profiles() | SECURITY DEFINER | Lista profiles com email (admin-only) |
| get\_audit\_logs(limit\_count) | SECURITY DEFINER | Lista audit logs com joins (admin-only) |
| is\_valid\_storage\_url(url) | SECURITY DEFINER | Valida URL do storage Supabase |
| get\_signed\_url\_placeholder(bucket, path) | SECURITY DEFINER | Retorna path para uso com signedUrl |

##### 1.5 Triggers

| Trigger | Tabela | Evento | Função |
| --- | --- | --- | --- |
| on\_auth\_user\_created | auth.users | AFTER INSERT | handle\_new\_user() |
| trg\_validate\_behavioral\_log | behavioral\_logs | BEFORE INSERT/UPDATE | validate\_behavioral\_log() |
| update\_\*\_updated\_at | patients, profiles, diet\_plans, checkups | BEFORE UPDATE | update\_updated\_at\_column() |

---

#### 2. AUDITORIA DE SEGURANÇA E PERMISSÕES

##### 2.1 Autenticação

* **Métodos:** Email/senha + Google OAuth
* **Reset password:** Via /reset-password com supabase.auth.updateUser
* **Validação de senha (frontend):** Zod schema — min 8 chars, maiúscula, minúscula, número (OWASP)
* **Session:** localStorage com persistSession: true e autoRefreshToken: true
* **Email confirmation:** Habilitada (sem auto-confirm)

##### 2.2 RBAC (Role-Based Access Control)

```
Enum app_role: admin | moderator | user

Tabela: user_roles (user_id + role, UNIQUE constraint)

Função: has_role(_user_id, _role) → boolean
  - SECURITY DEFINER
  - Usada em RLS policies e verificações de rota
```

**Fluxo de verificação:**

1. AdminRoute.tsx chama supabase.rpc('has\_role', { \_user\_id: user.id, \_role: 'admin' })
2. Se false → redireciona para /dashboard
3. AppLayout.tsx também verifica admin para mostrar links do painel admin

##### 2.3 Políticas RLS (Row Level Security)

**Padrão para tabelas de paciente** (patients, assessments, goals, diet\_plans, consumption\_logs, checkups, behavioral\_logs):

```
-- RESTRICTIVE: Bloqueia acesso anônimo
CREATE POLICY "Block anonymous access" ON <table>
  AS RESTRICTIVE FOR ALL TO public
  USING (auth.uid() IS NOT NULL)
  WITH CHECK (auth.uid() IS NOT NULL);

-- PERMISSIVE: Nutricionista acessa apenas seus pacientes
CREATE POLICY "Users can view <table>" ON <table>
  FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM patients
    WHERE patients.id = <table>.patient_id
    AND patients.user_id = auth.uid()
  ));

-- INSERT/UPDATE/DELETE seguem o mesmo padrão
```

**Tabelas com cadeia de joins** (diet\_items, meal\_checks):

```
-- Acesso via diet_plans → patients → user_id
USING (EXISTS (
  SELECT 1 FROM diet_plans
  JOIN patients ON patients.id = diet_plans.patient_id
  WHERE diet_plans.id = <table>.diet_plan_id
  AND patients.user_id = auth.uid()
));
```

**Tabela** **foods** **:**

```
-- Leitura pública para todos os autenticados
SELECT: USING (true)
-- Escrita apenas admin
INSERT/UPDATE/DELETE: has_role(auth.uid(), 'admin')
```

**Tabela** **audit\_logs** **(append-only):**

```
INSERT: has_role(auth.uid(), 'admin')
SELECT: has_role(auth.uid(), 'admin')
UPDATE: USING (false)  -- Imutável
DELETE: USING (false)  -- Imutável
```

**Tabela** **rate\_limit\_log** **:**

```
ALL: USING (false) -- Completamente bloqueada no nível RLS
```

**⚠️ PROBLEMA IDENTIFICADO em** **behavioral\_logs** **:** A policy "Block anonymous access" está como **PERMISSIVE** (deveria ser **RESTRICTIVE** como nas demais tabelas). Isso não causa brecha real porque as demais policies exigem patients.user\_id = auth.uid(), mas é inconsistente.
**⚠️ PROBLEMA IDENTIFICADO em** **diet\_templates** **:** A policy "Block anonymous access" está como **PERMISSIVE** (deveria ser **RESTRICTIVE** ). Mesmo padrão inconsistente.
**⚠️ PROBLEMA IDENTIFICADO em** **meal\_checks** **:** A policy "Block anonymous access" está como **PERMISSIVE** (deveria ser **RESTRICTIVE** ).

##### 2.4 Proteção de Rotas (Frontend)

```
// src/components/ProtectedRoute.tsx
// Verifica: useAuth().user → se null, redireciona para /auth

// src/components/AdminRoute.tsx
// Verifica: useAuth().user + supabase.rpc('has_role', 'admin')
// Se não admin → redireciona para /dashboard
```

**Rotas:**

```
/auth                  → Auth (público)
/reset-password        → ResetPassword (público)
/dashboard             → ProtectedRoute → Dashboard
/patients/:id          → ProtectedRoute → PatientProfile
/settings              → ProtectedRoute → UserSettings
/admin/foods           → ProtectedRoute → AdminFoods
/admin/dashboard       → AdminRoute → AdminDashboard
/admin/settings        → AdminRoute → AdminSettings
```

**Nota:** /admin/foods usa ProtectedRoute em vez de AdminRoute. Isso significa que qualquer usuário autenticado pode acessar a página, mas o RLS impede escrita (apenas admin pode INSERT/UPDATE/DELETE em foods). A leitura é permitida para todos.

##### 2.5 Segurança de Arquivos (Storage)

* **Bucket:** patient-files (PRIVADO)
* **Acesso:** Signed URLs via supabase.storage.from('patient-files').createSignedUrl(path, 3600)
* **Upload:** Path pattern: {patient\_id}/{assessment\_id}/{uuid}.{ext}
* **Validação frontend:** validateFile() → max 10MB, tipos: jpeg/png/webp/pdf
* **Filename sanitization:** generateSafeFilename() → UUID + extensão limpa
* **URL validation:** validateStorageUrl() → só aceita \*.supabase.co/storage/v1/object/

##### 2.6 CORS (Edge Functions)

```
// supabase/functions/_shared/cors.ts
const ALLOWED_ORIGINS = [
  'https://calorie-coach-sys.lovable.app',
  'https://id-preview--ef60e0f3-512d-4b30-9f45-fab573ada470.lovable.app',
  'https://cdqjnfbtxspyxdcyeadj.supabase.co',
  'http://localhost:5173', 'http://localhost:8080',
  'http://127.0.0.1:5173', 'http://127.0.0.1:8080',
];
// Também aceita qualquer *.lovable.app via wildcard
```

---

#### 3. BACKEND E EDGE FUNCTIONS

##### 3.1 Edge Functions Existentes (7 funções)

Todas com verify\_jwt = false no config.toml (autenticação manual via header).
| Função | API Externa | Rate Limit | Modelo IA |
| ------ | ------ | ------ | ------ |
| analyze-food-photo | Lovable AI Gateway | 50/h/user | gemini-3-flash-preview |
| analyze-checkup | Lovable AI Gateway | 20/h/user | gemini-3-flash-preview |
| analyze-nutrition-label | Lovable AI Gateway | 30/h/user | gemini-3-flash-preview |
| analyze-body3d | Lovable AI Gateway | 30/h/user | gemini-2.5-flash |
| analyze-evolution-photos | Lovable AI Gateway | 20/h/user | gemini-2.5-flash |
| admin-user-management | Supabase Admin API | — | — |
| backup-settings | Supabase Admin API | — | — |

##### 3.2 Padrão de Segurança das Edge Functions

Todas as funções IA seguem o mesmo padrão:

```
1. CORS validation (origin whitelist)
2. Auth header check → supabase.auth.getUser()
3. Rate limiting (in-memory Map por userId)
4. Input validation (imageType whitelist, base64 size < 14MB)
5. IDOR check: patient ownership via patients.user_id = auth.uid()
6. Chamada ao Lovable AI Gateway (https://ai.gateway.lovable.dev/v1/chat/completions)
7. JSON extraction via regex /\{[\s\S]*\}/
8. Error handling: 429 (rate limit), 402 (credits), 500 (generic)
```

##### 3.3 Detalhes por Função

**analyze-food-photo**

* Input: imageBase64, imageType, patientId (opcional)
* Output: { foods\_identified, portions\_estimated, kcal, protein, carbs, fat, confidence }
* Usado em: ConsumptionPanel.tsx para log via foto
  **analyze-checkup**
* Input: imageBase64 + imageType OU extractedText, patientId (opcional)
* Output: { extracted\_text, structured\_data: { marker: { valor, unidade, status } }, clinical\_summary }
* Usado em: PatientCheckupsTab.tsx
  **analyze-nutrition-label**
* Input: imageBase64, imageType
* Output: { name, reference\_qty, reference\_unit, kcal, protein, carbs, fat, confidence }
* Usado em: ScanNutritionLabelDialog.tsx (AdminFoods)
  **analyze-body3d**
* Input: frontalImageBase64, lateralImageBase64, imageType, height\_cm, weight\_kg, sex, patientId, cintura\_cm, quadril\_cm
* Output: { body3d\_fat\_percent, body3d\_classification, estimated\_circumferences, body\_proportions, visual\_observations, confidence }
* Usado em: PatientAssessmentsTab.tsx (modo body3d)
  **analyze-evolution-photos**
* Input: photoUrls (array), patientData, assessmentData
* Gera signed URLs internamente para fotos do bucket privado
* Output: { visual\_analysis, evolution\_notes, recommendations, training\_focus, nutrition\_notes, confidence, summary }
* Usado em: PatientAssessmentsTab.tsx
  **admin-user-management**
* Input: { action: 'ban' | 'unban' | 'change\_role', user\_id, new\_role? }
* Usa SUPABASE\_SERVICE\_ROLE\_KEY para operações admin
* Verifica admin role via has\_role RPC antes de executar
* Registra ações em audit\_logs
  **backup-settings**
* Input: { action: 'create' | 'restore' | 'list', backup\_id? }
* Create: Exporta 13 tabelas (paginação de 1000) para JSONB em settings\_backups
* Restore: Deleta e re-insere com order de FK (delete reverso, insert na ordem)
* Mantém últimos 10 backups (auto-cleanup)
* Registra em audit\_logs

##### 3.4 Secrets Configurados

```
SUPABASE_DB_URL
SUPABASE_PUBLISHABLE_KEY
LOVABLE_API_KEY          ← Usado para Lovable AI Gateway
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
```

---

#### 4. FRONTEND E ÁRVORE DE COMPONENTES

##### 4.1 Stack Tecnológica

```
React 18 + TypeScript 5
Vite 5 (bundler)
Tailwind CSS v3
React Router DOM 6 (SPA routing)
@tanstack/react-query (QueryClient — criado mas pouco usado, queries são manuais)
Recharts (gráficos)
jsPDF + jspdf-autotable (exportação PDF)
date-fns (formatação de datas)
Zod (validação)
lucide-react (ícones)
papaparse (CSV parsing)
shadcn/ui (component library base)
```

##### 4.2 Gerenciamento de Estado

```
AuthContext (Context API)     → user, session, loading, signUp, signIn, signOut
ThemeContext (Context API)    → theme (light/dark/system), setTheme, resolvedTheme
React Query (QueryClient)    → Instanciado mas queries são feitas via useState + useEffect
Componentes locais           → useState para formulários e dados temporários
```

**Nota:** O projeto NÃO usa Zustand nem Redux. Dados são buscados diretamente do Supabase em useEffect e armazenados em useState local.

##### 4.3 Rotas e Componentes

```
/auth                        → Auth.tsx
/reset-password              → ResetPassword.tsx
/dashboard                   → Dashboard.tsx
  ├── QuickActions.tsx        (ações rápidas, últimos pacientes)
  └── BirthdayAlerts.tsx      (alertas de aniversário 7 dias)
/patients/:id                → PatientProfile.tsx
  ├── PatientStatusSummary.tsx (cards resumo)
  ├── OnboardingTour.tsx      (tour guiado)
  ├── Tab "Dados"             → PatientDataTab.tsx
  ├── Tab "Aval."             → PatientAssessmentsTab.tsx
  │   ├── AssessmentMethodsInfo.tsx
  │   ├── BodyCompositionRadar.tsx
  │   ├── AssessmentComparison.tsx
  │   └── LastAssessmentReference.tsx
  ├── Tab "Metas"             → PatientGoalsTab.tsx
  │   ├── CaloricGuide.tsx
  │   ├── MacroDistributionGuide.tsx
  │   ├── HydrationAlert.tsx
  │   ├── HydrationReminderSettings.tsx
  │   ├── WaterTracker.tsx
  │   └── GoalsEvolutionChart.tsx
  ├── Tab "Dietas"            → PatientDietsTab.tsx
  │   ├── MealChecklist.tsx
  │   ├── ConsumptionPanel.tsx
  │   └── PortionReferenceTables.tsx
  ├── Tab "Comport."          → PatientBehavioralTab.tsx
  ├── Tab "Evol."             → PatientEvolutionTab.tsx
  │   ├── EvolutionCharts.tsx
  │   └── EvolutionChartsExpanded.tsx
  └── Tab "Exames"            → PatientCheckupsTab.tsx
      └── CheckupEvolutionChart.tsx
/settings                    → UserSettings.tsx
/admin/foods                 → AdminFoods.tsx
  ├── ScanNutritionLabelDialog.tsx
  ├── BulkFoodImport.tsx
  └── AdminFiltersPanel.tsx
/admin/dashboard             → AdminDashboard.tsx
  ├── AdminStatsCards.tsx
  ├── AdminGrowthCharts.tsx
  ├── AdminAuditLogs.tsx
  ├── AdminExportReports.tsx
  └── UserManagementDialog.tsx
/admin/settings              → AdminSettings.tsx
  └── AdminBackupSettings.tsx
```

##### 4.4 Layout e Navegação

```
// src/components/layout/AppLayout.tsx
// Header sticky com glass effect
// Nav desktop: Dashboard, Alimentos + Admin (se admin), Configurações
// Nav mobile: hamburger menu
// User dropdown: nome, email, configurações, sair
// Theme toggle: light/dark/system
// Footer: disclaimer obrigatório
```

##### 4.5 Componentes Críticos (Complexidade)

**PatientAssessmentsTab.tsx** **(~2008 linhas)**

* Maior componente do projeto
* 3 modos de avaliação: traditional, photo, body3d
* 7 protocolos de cálculo (Pollock3, Pollock7, Navy, Petroski, Guedes, Durnin, Faulkner)
* Modo bilateral com campos duplicados (esquerdo/direito)
* Upload de fotos para bucket privado
* Integração com Edge Functions (body3d, evolution-photos)
* Exportação PDF individual
* safeNum() para clamping de valores numéricos (-999999 a 999999)
  **PatientDietsTab.tsx** **(~1301 linhas)**
* CRUD completo de planos alimentares
* 10+ templates de dieta (Low Carb, Detox, Hipertrofia, Plant-Based, etc.)
* Busca de alimentos com normalização de acentos
* Cálculo proporcional de macros via calculateFoodNutrition()
* Duplicação de planos
* Exportação PDF com paginação
* useDeferredValue para otimização de busca
* shouldFilter={false} no Command para evitar overhead
  **PatientCheckupsTab.tsx**
* Upload de exames (imagem/PDF)
* Integração com analyze-checkup Edge Function
* Filtros por data, título e status
* Preview PDF via
