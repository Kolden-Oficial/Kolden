# Omiron — Onboarding Estendido (Pacote de prompts complementar)

> **Contexto:** este pacote **substitui** o Prompt 2 (Onboarding) do pacote-base `lovable-prompts.md`. É um questionário aprofundado de ~25-30 minutos que gera baseline clínica robusta e relatório personalizado para o paciente e para o Dr. Ariosto.
>
> **Pré-requisitos:** Prompts 0 e 1 do pacote-base devem estar aplicados (bootstrap + schema). Este pacote cria tabelas ADICIONAIS sem tocar nas existentes.
>
> **Estrutura:** 10 seções + tela LGPD + cadastro básico + tela de conclusão + relatório PDF. Cada seção agrupa perguntas relacionadas em uma tela (não uma pergunta por tela — questionários longos exigem densidade calibrada).
>
> **Escalas validadas embutidas (scoring automático):**
> - Florescimento Harvard (6 domínios) — Global Flourishing Study
> - Flexibilidade psicológica — inspirado no CompACT
> - STOP-BANG parcial — triagem de apneia do sono
> - UCLA-8 Loneliness — escala reduzida de solidão
> - PSS-14 (Perceived Stress Scale de Cohen) — estresse percebido
> - Assertividade social — inventário de habilidades sociais
> - Coping — inspirado no Brief COPE
>
> **Todas as regras duras Omiron do pacote-base valem aqui.** Cada prompt reforça as regras críticas.

---

## PROMPT E0 — Extended onboarding: setup, LGPD, cadastro, router

```
Replace the existing patient onboarding (from base pack Prompt 2) with an in-depth clinical baseline questionnaire. Language: pt-BR for all user copy. Route: /paciente/onboarding.

═══════════════════════════════════════════════════════════════
BRAND RULES — REINFORCE (do not violate)
═══════════════════════════════════════════════════════════════

- Dark-mode canonical, backgrounds via bg-omiron-profundo / bg-omiron-elevado
- NEVER #000000 or #FFFFFF pure — use #141010 / #EDE2CE
- NEVER emoji as UI — inline SVG only, thin stroke classical style
- NEVER --omiron-verde-planta outside plant gamification
- Body ≥ 16px, line-height 1.65, no justify, no uppercase in body
- Great Vibes ONLY in hero titles and milestones — never in question labels, options, or CTAs
- Papyrus surface on at least ONE component per screen (usually the informational card or intro)
- CTA canonical: amber-crepusculo bg + marfim text, ≥ 18px
- Focus outlines visible (2px dourado outline-offset 3px)

═══════════════════════════════════════════════════════════════
DATA MODEL — ADD THESE TABLES (Supabase migration)
═══════════════════════════════════════════════════════════════

CREATE TYPE assessment_status AS ENUM ('em_andamento','concluida');
CREATE TYPE sex_option AS ENUM ('feminino','masculino','nao_binario','prefere_nao_informar');

CREATE TABLE patient_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  version TEXT NOT NULL DEFAULT 'v1',
  status assessment_status NOT NULL DEFAULT 'em_andamento',

  -- Consentimento LGPD
  lgpd_consented_at TIMESTAMPTZ,
  terms_version TEXT,

  -- Cadastro básico
  full_name TEXT,
  date_of_birth DATE,
  sex sex_option,

  -- 1. Mudança desejada
  desired_change TEXT,

  -- 2. Histórico de saúde
  weight_kg NUMERIC(5,2),
  height_m NUMERIC(3,2),
  bmi NUMERIC(4,2), -- gerado
  health_conditions JSONB DEFAULT '[]',
  medications TEXT,

  -- 3. Florescimento (Harvard) — 6 domínios, cada 1-10
  flourishing JSONB, -- {satisfacao, financeira, saude_fisico_mental, proposito, relacionamentos, integridade}
  flourishing_score NUMERIC(4,2), -- média dos 6

  -- 4. Flexibilidade psicológica (CompACT-inspired) — 6 itens
  psychological_flexibility JSONB, -- {p1..p6: 'poucas'|'as_vezes'|'muitas'}
  psychological_flexibility_score NUMERIC(4,2), -- convertido para 0-12

  -- 5. Movimento
  movement JSONB,
  movement_capacity_score NUMERIC(4,2),

  -- 6. Sono
  sleep JSONB,
  stop_bang_partial_score INT, -- 0-4 baseado nas 4 perguntas Sim/Não

  -- 7. Alimentação
  nutrition JSONB,
  nutrition_ultraprocessed_score NUMERIC(4,2),
  nutrition_skills_score NUMERIC(4,2),

  -- 8. Conexões sociais
  social JSONB,
  loneliness_score NUMERIC(4,2), -- UCLA-8: soma 8 itens (itens 7 e 8 revertidos)
  social_skills_score NUMERIC(4,2),

  -- 9. Tóxicos
  substance_use JSONB, -- {alcohol, tobacco}

  -- 10. Estresse
  stress JSONB,
  pss_score INT, -- 0-56 (PSS-14: itens 4,5,6,7,9,10,13 revertidos)
  stressful_events JSONB DEFAULT '[]',
  coping_profile JSONB,
  leisure_score NUMERIC(4,2),

  -- Progresso
  current_section INT DEFAULT 0, -- 0=intro, 1-10=seções, 11=conclusão
  started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  completed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_assessments_patient ON patient_assessments(patient_id);
CREATE UNIQUE INDEX idx_assessments_active ON patient_assessments(patient_id)
  WHERE status = 'em_andamento';

-- Trigger: calcular BMI automaticamente
CREATE OR REPLACE FUNCTION calc_bmi() RETURNS TRIGGER AS $$
BEGIN
  IF NEW.weight_kg IS NOT NULL AND NEW.height_m IS NOT NULL AND NEW.height_m > 0 THEN
    NEW.bmi := ROUND(NEW.weight_kg / (NEW.height_m * NEW.height_m), 2);
  END IF;
  RETURN NEW;
END $$ LANGUAGE plpgsql;

CREATE TRIGGER trg_calc_bmi BEFORE INSERT OR UPDATE ON patient_assessments
  FOR EACH ROW EXECUTE FUNCTION calc_bmi();

-- Trigger: updated_at
CREATE TRIGGER trg_assessments_updated_at BEFORE UPDATE ON patient_assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE patient_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "patient_read_own_assessment" ON patient_assessments
  FOR SELECT USING (patient_id = auth.uid());

CREATE POLICY "patient_write_own_assessment" ON patient_assessments
  FOR ALL USING (patient_id = auth.uid());

CREATE POLICY "doctor_read_patient_assessment" ON patient_assessments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM patient_profiles pp
      WHERE pp.user_id = patient_assessments.patient_id
        AND pp.doctor_id = auth.uid()
    )
  );

═══════════════════════════════════════════════════════════════
ONBOARDING FLOW ARCHITECTURE
═══════════════════════════════════════════════════════════════

Route guard: after login, if role='patient' AND no completed patient_assessment exists, redirect to /paciente/onboarding.

Router structure:
  /paciente/onboarding                    -> intro screen
  /paciente/onboarding/lgpd               -> consent + terms
  /paciente/onboarding/cadastro           -> full_name, date_of_birth, sex
  /paciente/onboarding/secao/:n           -> section 1..10
  /paciente/onboarding/conclusao          -> completion + report link

State management: create one patient_assessments row on first visit (status='em_andamento'). AUTOSAVE every field change (debounced 800ms) — never require pressing "Salvar" to persist. Patient may close and resume any time.

Progress persistence: `current_section` tracks last completed step. On resume, land on next unfinished section. Show a top progress bar (dourado gradient) with "{completedSections} de 10" tabular text.

Layout template (used by ALL screens except intro/conclusion):
  Header slim: back arrow + section label ("2 de 10 · Histórico de saúde") + save indicator (dot pulsing dourado when saving, static when saved)
  Body: max-width 720px centered, generous padding
  Sticky bottom footer: "Voltar" (ghost) left + "Continuar" (primary amber-crepusculo) right
  Bottom safe-area padding for mobile

═══════════════════════════════════════════════════════════════
SCREEN — INTRO (/paciente/onboarding)
═══════════════════════════════════════════════════════════════

Full-screen dark background with subtle staircase or Rückenfigur silhouette overlay at 6% opacity.

Center card (max-w-lg):
  Great Vibes 56px dourado-alto: "Bem-vinda ao Omiron"
  Body-lg marfim: "Antes de começarmos, precisamos entender quem você é e como você chega aqui. Isso é uma conversa entre você e o Dr. Ariosto — o Omiron só guarda para que a memória não se perca."
  Body-sm marfim-suave with icon (clock SVG): "Leva cerca de 25 a 30 minutos. Você pode pausar e voltar depois — a gente guarda tudo automaticamente."

  Small list of the 10 sections (numbered, marfim-suave, EB Garamond, tight leading), so patient sees the whole journey ahead:
    01 · Mudança desejada
    02 · Histórico de saúde
    03 · Florescimento
    04 · Flexibilidade psicológica
    05 · Movimento
    06 · Sono
    07 · Alimentação
    08 · Conexões sociais
    09 · Tóxicos
    10 · Estresse

  Primary CTA: "Vamos começar" -> /paciente/onboarding/lgpd

═══════════════════════════════════════════════════════════════
SCREEN — LGPD + TERMOS (/paciente/onboarding/lgpd)
═══════════════════════════════════════════════════════════════

Papyrus card centered (papiro class), padding 32px.

Small badge top: "Importante" in dourado-antigo caps caption (this is the one place caps is allowed — labels ≤12chars, per accessibility rule; but PT-BR label is "Importante" — mixed case, no caps).

Title (EB Garamond h4 marrom-couro): "Sobre o uso das suas informações"

Body (marrom-couro):
"Os dados que você compartilhar neste questionário são usados EXCLUSIVAMENTE para compor seu perfil clínico com o Dr. Ariosto. Nada é vendido, cedido ou compartilhado com terceiros — em conformidade com a Lei Geral de Proteção de Dados (LGPD, Lei nº 13.709/2018)."

"Você pode, a qualquer momento:
  · pedir para ver todos os dados que temos sobre você;
  · pedir para corrigir alguma informação;
  · pedir para excluir seus dados (o que encerra seu acesso ao Omiron);
  · retirar seu consentimento — bastando enviar mensagem no chat."

Two accordions (collapsed by default, chevron SVG dourado):
  · "Termos de uso" — expand shows full text (create src/data/termos-uso.md and render via react-markdown). Placeholder text: "Estes termos regem o uso do aplicativo Omiron pela paciência da Clínica Dr. Ariosto Filho..." Add TODO comment for legal review.
  · "Política de privacidade" — same pattern. Placeholder complete-enough draft mentioning: dados coletados, finalidade, base legal (consentimento + execução de contrato médico), retenção (enquanto durar o tratamento + 20 anos por CFM), transferência (não há), direitos do titular, contato do DPO (adm@clinicaomiron.com.br — placeholder).

At bottom, TWO checkboxes (shadcn/ui Checkbox, styled dourado when checked):
  □ "Li e concordo com os Termos de uso"
  □ "Li e concordo com a Política de privacidade"

Primary CTA "Continuar" disabled until BOTH are checked. On click: save lgpd_consented_at = now(), terms_version = 'v1-2026-08-11' to patient_assessments row -> /paciente/onboarding/cadastro.

Ghost link below: "Prefiro não continuar" — opens modal warning "Sem o consentimento, o Omiron não pode operar. Você pode falar com o Dr. Ariosto se tiver dúvidas." with buttons "Falar com o médico" (opens WhatsApp) and "Continuar mais tarde" (logs out).

═══════════════════════════════════════════════════════════════
SCREEN — CADASTRO BÁSICO (/paciente/onboarding/cadastro)
═══════════════════════════════════════════════════════════════

Header: "Vamos começar"
Sub: "Precisamos de alguns dados para completar seu cadastro."

Form (stacked, generous spacing):
  1. Nome completo — text input, autofocus, required. Placeholder "Como está no seu documento".
     Below: caption "Você pode editar depois nas configurações."
  2. Data de nascimento — date input with pt-BR mask DD/MM/AAAA. Required. Age must be ≥ 16 (client-side validation).
  3. Sexo — segmented control (4 pill buttons in a row on desktop, stack 2x2 on mobile):
       [Feminino] [Masculino] [Não binário] [Prefiro não informar]
     Only one selectable. Selected pill: bg dourado-antigo, text marfim.
     Below in caption marfim-suave: "Usado apenas para triagem clínica. Você pode alterar depois."

Autosave each field on blur/change (debounced 800ms).

Primary CTA "Continuar" -> /paciente/onboarding/secao/1. Disabled until all 3 fields valid.

═══════════════════════════════════════════════════════════════
DELIVERABLES OF THIS PROMPT
═══════════════════════════════════════════════════════════════

- Migration applied with patient_assessments table + triggers + RLS
- Guard routing correctly (any patient without completed assessment lands here)
- Intro, LGPD, cadastro screens fully functional
- Autosave working (open DevTools network — every 800ms after typing a network call to Supabase)
- Progress bar component reusable across all upcoming section screens
- Section router shell (/paciente/onboarding/secao/:n) exists but sections 1-10 are stubs saying "Em construção" — will be built in next prompts

Do NOT build the 10 sections yet. Stop here and wait for next prompt.
```

---

## PROMPT E1 — Sections 1 to 3 (Mudança desejada, Histórico de saúde, Florescimento)

```
Build sections 1, 2, 3 of the extended onboarding at /paciente/onboarding/secao/:n. Each section is one screen using the layout template established in Prompt E0 (slim header, max-w-720 body, sticky footer).

═══════════════════════════════════════════════════════════════
COMMON PATTERNS FOR ALL SECTIONS
═══════════════════════════════════════════════════════════════

Header of each section:
  "N de 10 · {Título da seção}" in body-sm marfim-suave
  Great Vibes 40px dourado-alto: {título carinhoso da seção}
  EB Garamond body marfim-suave: {contexto/subtítulo}

Autosave: every input change debounced 800ms → PATCH patient_assessments row.
Validation: sections have "Continuar" disabled until required fields filled (marked with * asterisk in dourado).

═══════════════════════════════════════════════════════════════
SECTION 1 — MUDANÇA DESEJADA
═══════════════════════════════════════════════════════════════

Section badge: "01 de 10"
Great Vibes: "Mudança desejada"
Subtitle: "A primeira etapa é entender qual mudança você deseja."

Papyrus card (papiro class) with intro text in marrom-couro italic:
"Compartilhe qual é a sua expectativa com esta mudança. Não há resposta certa nem tamanho ideal — só a sua verdade neste momento."

Below: Textarea (auto-grow, min-height 200px, max 800 chars, bg elevado, border dourado @ 30%, focus ring dourado, font EB Garamond 18px).
Placeholder: "Escreva com suas palavras... por exemplo: 'Quero conseguir dormir melhor', 'Quero voltar a ter energia', 'Preciso lidar com a ansiedade que apareceu depois da separação'..."

Character counter bottom-right (marfim-suave caption): "{used}/800"

Required. "Continuar" disabled until ≥ 30 characters.

Save to: patient_assessments.desired_change (TEXT). Then current_section = 1. Navigate to /paciente/onboarding/secao/2.

═══════════════════════════════════════════════════════════════
SECTION 2 — HISTÓRICO DE SAÚDE
═══════════════════════════════════════════════════════════════

Section badge: "02 de 10"
Great Vibes: "Seu histórico de saúde"
Subtitle: "Algumas informações objetivas — a base do seu perfil clínico."

Form blocks (stack with 24px gap):

BLOCK A — Medidas corporais
  Two side-by-side inputs (stack on mobile):
    · "Peso atual (kg) *" — number input, decimal, placeholder "Ex: 65.00"
      Hint below (marfim-suave caption): "Use ponto ou vírgula para decimal. Ex.: 65,3 kg"
    · "Altura (m) *" — number input, decimal, placeholder "Ex: 1.60"
      Hint: "Use metros com decimais. Ex.: 1,60 m"
  Both validate: peso 30-300, altura 1.20-2.30.
  Below the two inputs, when both are filled, render a discreet informational chip: "Seu IMC: {calculated} · {classification}"
  Classification: <18.5 "abaixo do peso", 18.5-24.9 "saudável", 25-29.9 "sobrepeso", 30-34.9 "obesidade grau I", 35-39.9 "obesidade grau II", 40+ "obesidade grau III". Chip in bg elevado, dourado-antigo text, radius full.

BLOCK B — Condições de saúde
  Label: "Marque as condições que se aplicam a você OU a familiares próximos (pais, irmãos, filhos):"
  Sub: "Pode marcar mais de uma. Se nenhuma se aplica, siga em frente."
  
  Multi-select chip grid (3 cols desktop, 2 cols mobile, all pills):
    Obesidade · Diabetes · Hipertensão · Câncer · Doença pulmonar crônica · Doenças cardíacas · Doença renal · Doenças hepáticas · AVC · Transtorno mental
  
  Selected: bg dourado-antigo, text marfim, ring dourado-alto 1px.
  Unselected: bg elevado, text marfim, border dourado @ 30%.
  Each has a small SVG icon left of label (inline stroke, thin).
  
  Save to health_conditions JSONB array of strings.

BLOCK C — Medicações
  Label: "Você faz uso atualmente de alguma medicação, fitoterápico ou suplemento? Se sim, qual e em que dose?"
  Sub: "Escreva no formato: nome, dose, quando toma. Ex.: 'Escitalopram 10mg pela manhã; Vitamina D 2000UI aos domingos.' Se não usa nada, escreva 'Não uso.'"
  
  Textarea auto-grow, max 800 chars, bg elevado.
  
  Required (min 3 chars — even "Não" counts).
  
  Save to medications TEXT.

Save all, current_section = 2, → /paciente/onboarding/secao/3.

═══════════════════════════════════════════════════════════════
SECTION 3 — FLORESCIMENTO (Harvard Flourishing Index, 6 domínios)
═══════════════════════════════════════════════════════════════

Section badge: "03 de 10"
Great Vibes: "Como você está florescendo"
Subtitle: "Agora, um panorama do seu momento de vida. Responda com o que sente hoje — não como gostaria de sentir."

Papyrus card intro:
"Para cada afirmação, marque um número entre 1 e 10 que melhor descreve como você geralmente se sente. Não pense demais — a primeira resposta costuma ser a mais honesta."

Then 6 question blocks, each with:
  · Question text in body-lg marfim
  · Below: horizontal slider or button row of 10 pill numbers [1][2][3][4][5][6][7][8][9][10]
    Selected number: bg dourado-antigo, text marfim, scale 1.05
    Unselected: bg elevado, marfim-suave, border dourado @ 30%
  · Anchor labels below buttons at positions 1 and 10:
    "Nada" (left) — "Muito" (right)
  · 32px vertical spacing between blocks

Questions (mapping to patient_assessments.flourishing JSONB keys):

1. satisfacao — "O quanto você se sente SATISFEITO(A) com a sua vida e com as coisas que acontecem com você?"
2. financeira — "O quanto você sente que seus RECURSOS FINANCEIROS te permitem viver com segurança e tranquilidade?"
3. saude — "O quanto você geralmente tem se sentido bem, FÍSICA E MENTALMENTE, com energia e disposição?"
4. proposito — "O quanto as coisas que você faz na vida trazem PROPÓSITO E SIGNIFICADO, te fazendo sentir ÚTIL e REALIZADO(A)?"
5. relacionamentos — "O quanto seus RELACIONAMENTOS com amigos, família e comunidade trazem alegria e apoio, fazendo você SE SENTIR PARTE de algo maior?"
6. integridade — "O quanto você se esforça para AGIR COM INTEGRIDADE, COMPAIXÃO E HONESTIDADE, buscando fazer o bem mesmo em situações desafiadoras?"

Note: All 6 keywords in caps are stylistic emphasis from the original questionnaire. Render them in dourado-alto weight 600 within the running text (not full uppercase — just color+weight to preserve accessibility).

All 6 required.

Save flourishing = {satisfacao, financeira, saude, proposito, relacionamentos, integridade}
Compute flourishing_score = (sum of 6) / 6, rounded to 2 decimals.
current_section = 3, → /paciente/onboarding/secao/4.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- Sections 1, 2, 3 fully functional at /paciente/onboarding/secao/1..3
- Reusable components: <ChipMultiSelect>, <ScalePillRow value min=1 max=10 anchors={left,right}>, <FormBlock title sub>
- BMI computation on the fly (client-side visual chip) — Postgres trigger already stores it
- Autosave working on every field
- Back button doesn't clear filled fields
- Validation errors show inline in ambar-terra + icon + text (never color alone)

Next prompt: sections 4, 5, 6.
```

---

## PROMPT E2 — Sections 4 to 6 (Flexibilidade psicológica, Movimento, Sono)

```
Build sections 4, 5, 6 following the same layout patterns from Prompts E0/E1. Reuse <ChipMultiSelect>, <ScalePillRow>, <FormBlock>.

Introduce a new reusable component: <LikertGroup items={[{id,label}]} scale={['Left','Middle','Right']} value={{itemId:choice}} onChange>. Renders a stacked list where each row has the item label on the left and 3 (or N) pill options on the right (or below on mobile). Selected pill: bg dourado-antigo, marfim text.

═══════════════════════════════════════════════════════════════
SECTION 4 — FLEXIBILIDADE PSICOLÓGICA (CompACT-inspired, 6 items)
═══════════════════════════════════════════════════════════════

Section badge: "04 de 10"
Great Vibes: "Sua flexibilidade psicológica"
Subtitle: "Como você lida com pensamentos e experiências difíceis."

Papyrus intro: "Para cada afirmação, escolha com que frequência ela descreve você."

<LikertGroup> with scale ['Poucas vezes', 'Às vezes', 'Muitas vezes']:

- pf1: "Mesmo que meus pensamentos estejam em outro lugar, em momentos importantes consigo me concentrar no que está acontecendo."
- pf2: "Se necessário, posso deixar que pensamentos e experiências desagradáveis aconteçam sem precisar me livrar deles imediatamente."
- pf3: "Consigo olhar para pensamentos difíceis à distância, sem que eles me controlem."
- pf4: "Mesmo quando os pensamentos e as experiências me perturbam, consigo perceber uma sensação de estabilidade e calma dentro de mim."
- pf5: "Eu determino o que é importante para mim e decido como quero investir minha energia."
- pf6: "Eu me envolvo completamente em coisas que são importantes, úteis ou significativas para mim."

All 6 required.

Save psychological_flexibility = {pf1..pf6: 'poucas'|'as_vezes'|'muitas'}
Score: poucas=0, as_vezes=1, muitas=2. Sum of 6 = 0-12.
Compute psychological_flexibility_score.
current_section = 4, → /paciente/onboarding/secao/5.

═══════════════════════════════════════════════════════════════
SECTION 5 — MOVIMENTO
═══════════════════════════════════════════════════════════════

Section badge: "05 de 10"
Great Vibes: "Como você se move"
Subtitle: "Seu corpo em ação — no cotidiano e nos exercícios."

Blocks:

BLOCK A — Frequência semanal
  3 questions, each with <ScalePillRow min=0 max=7 anchors={'Nenhum dia', 'Todo dia'}>:
    · aerobic_days — "Em média, quantos DIAS POR SEMANA você se envolve em atividade AERÓBICA moderada a vigorosa (correr, caminhar rápido, nadar, pedalar)?"
    · strength_days — "No último mês, quantos dias por semana você fez exercícios de FORTALECIMENTO MUSCULAR (peso corporal, resistência)?"
    · stretch_days — "No último mês, quantos dias por semana você fez ALONGAMENTO?"

BLOCK B — Sedentarismo
  Question: "Quanto tempo você permanece SENTADO(A) durante o dia?"
  Single-select radio cards (stacked or 2x2):
    · Menos de 4h por dia
    · Entre 4 e 6h por dia
    · Entre 6 e 8h por dia
    · Mais de 8h por dia
  Save as sitting_hours: 'lt_4' | '4_6' | '6_8' | 'gt_8'

BLOCK C — Capacidade funcional (10 itens)
  Label: "Sobre a sua CAPACIDADE de realizar atividades físicas e tarefas diárias, marque o quanto concorda com cada afirmação:"
  <LikertGroup> with scale ['Discordo totalmente', 'Discordo', 'Neutro', 'Concordo', 'Concordo totalmente'] (5-point Likert):

  - c1: "Sou capaz de levantar objetos pesados no dia a dia."
  - c2: "Consigo empurrar e puxar objetos sem dificuldade."
  - c3: "Consigo manter o equilíbrio em diferentes posições."
  - c4: "Sinto confiança ao caminhar por terrenos irregulares."
  - c5: "Consigo tocar as pontas dos dedos do pé sem dobrar o joelho."
  - c6: "Consigo me movimentar e alongar sem sentir desconforto."
  - c7: "Consigo realizar atividades físicas, subir escadas e caminhar sem me sentir cansado(a) demais."
  - c8: "Tenho resistência suficiente para as tarefas do dia sem ficar exausto(a)."
  - c9: "Realizo tarefas que exigem coordenação sem cometer erros frequentes."
  - c10: "Tenho agilidade para atividades manuais e tarefas como costurar ou digitar."

  Scoring: 1-5 per item. capacity_score = média das 10.

BLOCK D — Motivação principal
  "Hoje, o que MAIS te motiva a fazer atividade física?"
  Single-select chip row (wrap on mobile):
    · Aliviar o estresse  · Cuidar da saúde  · Conviver com amigos
    · Cuidar da aparência  · Prazer/Diversão  · Competição

BLOCK E — Principal dificuldade
  "Qual é, no momento, sua principal DIFICULDADE para se exercitar?"
  Single-select:
    · Não tenho dificuldade  · Falta de tempo  · Cansaço  · Vergonha
    · Custo  · Falta de apoio  · Falta de local  · Dor/Desconforto
    · Estresse  · Desânimo/Tristeza

Save movement = {
  aerobic_days, strength_days, stretch_days, sitting_hours,
  capacity: {c1..c10}, motivation, main_barrier
}
Compute movement_capacity_score.
current_section = 5, → /paciente/onboarding/secao/6.

═══════════════════════════════════════════════════════════════
SECTION 6 — SONO
═══════════════════════════════════════════════════════════════

Section badge: "06 de 10"
Great Vibes: "Como está seu sono"
Subtitle: "O sono conta mais do que a gente imagina."

Blocks:

BLOCK A — Frequência (5 itens)
  Label: "Nos últimos 30 dias, com que frequência..."
  <LikertGroup> with scale ['Raramente', 'Às vezes', 'Frequentemente']:
  
  - sat: "Você se sentiu SATISFEITO(A) com a qualidade do seu sono?"
  - drowsy_day: "Sentiu SONOLÊNCIA e dificuldade de ficar acordado(a) durante o dia?"
  - awake_late: "Você ainda estava acordado(a) entre 2h e 4h da madrugada?"
  - wake_30min: "Acordou à noite e demorou mais de 30 minutos para voltar a dormir?"
  - sleep_6_8h: "Dormiu entre 6 e 8 horas por noite?"

BLOCK B — Triagem de apneia (STOP-BANG parcial)
  Label: "Marque Sim ou Não para as próximas 4 perguntas."
  4 yes/no toggles (segmented control [Sim][Não]):
  - drowsy_day_hard: "Você se sente cansado(a), fatigado(a) ou SONOLENTO(A) durante o dia?"
  - stop_breathing: "Alguém já observou que você PARA DE RESPIRAR durante o sono?"
  - loud_snore: "Você RONCA ALTO (mais alto que falar, audível através de portas fechadas)? Alguém já comentou?"
  - hypertension: "Você trata ou já tratou HIPERTENSÃO ARTERIAL (pressão alta)?"

  Compute stop_bang_partial_score = count of 'Sim'. If ≥ 2, discreet alert card below the block (bg elevado, border ambar-terra, ícone de alerta SVG + text): "Suas respostas sugerem que vale conversar com o Dr. Ariosto sobre uma avaliação do sono. Registrado no seu perfil."

BLOCK C — Hábitos do sono (16 itens)
  Label: "Marque se você acredita que cada hábito ajuda, atrapalha ou é neutro para o seu sono:"
  <LikertGroup> with scale ['Atrapalha', 'Neutro', 'Ajuda']:
  
  - h1: "Tirar uma soneca longa durante o dia"
  - h2: "Beber álcool à noite"
  - h3: "Fumar antes de dormir"
  - h4: "Tomar café ou bebidas com cafeína à noite"
  - h5: "Fazer exercícios físicos durante o dia"
  - h6: "Fazer exercícios vigorosos pouco antes de dormir"
  - h7: "Ter horário fixo para dormir e acordar"
  - h8: "Tomar remédio para dormir regularmente"
  - h9: "Ir para a cama com fome"
  - h10: "Usar a cama para comer, estudar ou assistir TV"
  - h11: "Ficar na cama quando não consegue dormir"
  - h12: "Dormir em quarto silencioso e escuro"
  - h13: "Ficar tentando forçar o sono"
  - h14: "Pensar nos compromissos do dia seguinte antes de dormir"
  - h15: "Estudar ou trabalhar até tarde da noite"
  - h16: "Usar celular ou computador antes de dormir"

Save sleep = { frequency: {sat, drowsy_day, awake_late, wake_30min, sleep_6_8h}, apnea_screen: {drowsy_day_hard, stop_breathing, loud_snore, hypertension}, habits: {h1..h16} }
Compute stop_bang_partial_score.
current_section = 6, → /paciente/onboarding/secao/7.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- Sections 4, 5, 6 fully functional
- <LikertGroup> reusable component with 3-point and 5-point variants
- STOP-BANG partial score computed and, if ≥ 2, soft alert visible (never blocking)
- All scoring saved to Supabase automatically
- Autosave and back-nav preserve state

Next: sections 7 and 8.
```

---

## PROMPT E3 — Sections 7 and 8 (Alimentação, Conexões sociais)

```
Build sections 7 and 8. Continue reusing components. Sections are long — visual density matters. Group repetitive Likert questions tightly with 12-16px vertical gap between rows.

═══════════════════════════════════════════════════════════════
SECTION 7 — ALIMENTAÇÃO
═══════════════════════════════════════════════════════════════

Section badge: "07 de 10"
Great Vibes: "Sua relação com a comida"
Subtitle: "O que você come, com que frequência, como cozinha."

Blocks:

BLOCK A — Frequência semanal de consumo (13 alimentos)
  Label: "Em uma semana comum, em quantos dias você consome:"
  Sub: "0 = nunca; 7 = todo dia."
  
  Render each food row as: label left (max 60% width), <ScalePillRow min=0 max=7 compact> right (compact = smaller pills, no anchor labels).
  
  Foods (all optional — start at 0):
  - f_beans: "Feijão, lentilha ou grão-de-bico"
  - f_fish: "Peixe ou frutos do mar"
  - f_red_meat: "Carne vermelha (boi, porco, carneiro)"
  - f_processed_meat: "Salsicha, presunto, mortadela, bacon, linguiça"
  - f_eggs: "Ovos"
  - f_soda_juice: "Refrigerante, suco de caixinha ou em pó"
  - f_dairy: "Leite e derivados"
  - f_whole_grains: "Grãos integrais (trigo, aveia, milho)"
  - f_industrial_dessert: "Sobremesas industrializadas e sorvete"
  - f_instant_noodle: "Macarrão instantâneo"
  - f_frozen_meals: "Refeições industrializadas congeladas"
  - f_packaged_snacks: "Salgadinhos ou biscoitos recheados"
  - f_industrial_bread: "Pão ou bolo industrializados"

  Compute nutrition_ultraprocessed_score = average of {f_processed_meat, f_soda_juice, f_industrial_dessert, f_instant_noodle, f_frozen_meals, f_packaged_snacks, f_industrial_bread} — higher = more ultraprocessed intake.

BLOCK B — Habilidades culinárias (10 itens)
  Label: "Qual seu grau de confiança para:"
  <LikertGroup> with scale ['Baixa', 'Média', 'Alta']:
  
  - s1: "Planejar e preparar refeições com antecedência"
  - s2: "Seguir receitas"
  - s3: "Comprar alimentos da estação"
  - s4: "Ajustar receitas para mais ou menos ingredientes"
  - s5: "Compreender as informações dos rótulos"
  - s6: "Equilibrar refeições para serem saudáveis"
  - s7: "Preparar refeições saudáveis com poucos ingredientes disponíveis"
  - s8: "Preparar refeições saudáveis com tempo limitado"
  - s9: "Usar sobras para preparar novas refeições"
  - s10: "Usar técnicas básicas de cozinha (cortar, descascar, assar, grelhar)"

  Scoring: 1=Baixa, 2=Média, 3=Alta. nutrition_skills_score = média das 10.

BLOCK C — Principal dificuldade
  "Qual sua maior dificuldade para manter uma alimentação saudável?"
  Single-select chips:
    · Não tenho dificuldade  · Falta de tempo  · Falta de motivação
    · Falta de conhecimento  · Custo  · Falta de disponibilidade/opções
    · Não gosto do sabor  · Falta de apoio  · Dificuldade de resistir

BLOCK D — Motivador principal
  "O que MAIS influencia suas escolhas alimentares?"
  Single-select chips:
    · Saúde  · Humor  · Conveniência  · Prazer
    · Preço  · Calorias/Controle de peso  · Costume/Familiaridade  · Ingredientes naturais

Save nutrition = { frequency: {f_*}, skills: {s1..s10}, main_barrier, main_driver }
Compute nutrition_ultraprocessed_score, nutrition_skills_score.
current_section = 7, → /paciente/onboarding/secao/8.

═══════════════════════════════════════════════════════════════
SECTION 8 — CONEXÕES SOCIAIS
═══════════════════════════════════════════════════════════════

Section badge: "08 de 10"
Great Vibes: "Suas conexões"
Subtitle: "Relações e como você se sente em sociedade."

Blocks:

BLOCK A — Solidão (UCLA-8 loneliness scale)
  Label: "Marque com que frequência você se sente como descrito em cada afirmação:"
  <LikertGroup> with scale ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente'] (4-point):
  
  - l1: "Sinto que não tenho companhia."
  - l2: "Sinto que não tenho ninguém a quem recorrer."
  - l3: "Sinto-me excluído(a)."
  - l4: "Sinto que as pessoas estão ao meu redor, mas não estão comigo."
  - l5: "Sinto-me isolado(a) das outras pessoas."
  - l6: "Sinto-me infeliz por fazer tantas coisas sozinho(a)."
  - l7: "Consigo encontrar companhia quando quero." [REVERSE-SCORED]
  - l8: "Sou uma pessoa extrovertida." [REVERSE-SCORED]

  Scoring: Nunca=1, Raramente=2, Às vezes=3, Frequentemente=4 for l1-l6; INVERTED for l7,l8 (Nunca=4, Freq=1).
  loneliness_score = sum of 8 items (range 8-32). Higher = more loneliness.

BLOCK B — Habilidades sociais (assertividade, 8 itens)
  Label: "Sobre como você COMPORTA-SE em situações sociais:"
  <LikertGroup> with scale ['Discordo totalmente', 'Discordo', 'Neutro', 'Concordo', 'Concordo totalmente']:
  
  - ss1: "Sinto-me confortável ao participar de conversas com estranhos."
  - ss2: "Consigo iniciar e encerrar conversas de forma adequada."
  - ss3: "Posso expressar desacordo de maneira eficaz."
  - ss4: "Sou capaz de pedir ajuda e de recusar pedidos abusivos."
  - ss5: "Consigo expressar sentimentos positivos e elogiar outros."
  - ss6: "Respondo a elogios de forma adequada e expresso descontentamento a amigos."
  - ss7: "Sinto-me capaz de falar diante de um público e defender outros."
  - ss8: "Sei lidar com críticas construtivamente."

  Scoring 1-5. social_skills_score = média das 8.

Save social = { loneliness: {l1..l8}, skills: {ss1..ss8} }
Compute loneliness_score, social_skills_score.
current_section = 8, → /paciente/onboarding/secao/9.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- Sections 7 and 8 fully functional
- New compact <ScalePillRow> variant for dense food-frequency layout
- UCLA-8 scoring with proper reverse-scoring on items 7 and 8
- All Likert scales visually consistent

Next: sections 9 (Tóxicos) and 10 (Estresse — largest section).
```

---

## PROMPT E4 — Sections 9 and 10 (Tóxicos, Estresse) + tela de conclusão

```
Build final sections 9 and 10 plus the completion screen. Section 10 is the largest of the questionnaire — split its visual density carefully.

═══════════════════════════════════════════════════════════════
SECTION 9 — TÓXICOS
═══════════════════════════════════════════════════════════════

Section badge: "09 de 10"
Great Vibes: "Uso de substâncias"
Subtitle: "Duas perguntas rápidas, sem julgamento."

Papyrus intro:
"O Omiron não julga — mapeia. Suas respostas ajudam o Dr. Ariosto a entender como te apoiar. Fique à vontade para ser honesto(a)."

BLOCK A — Álcool
  Label: "Sobre o USO DE BEBIDA ALCOÓLICA, marque o que melhor reflete a sua situação atual:"
  Single-select radio cards (stacked, generous vertical padding):
    · alcohol_never: "Nunca fiz uso de bebida alcoólica."
    · alcohol_past: "Já fiz uso, mas atualmente não faço mais."
    · alcohol_current: "Faço uso atualmente."

  IF alcohol_current selected, reveal follow-up (smooth expand):
    "Em uma semana comum, quantas doses você consome?" (number input 0-100, hint "1 dose = 1 lata de cerveja OU 1 taça de vinho OU 1 dose de destilado")
    Save as alcohol_weekly_doses.

BLOCK B — Tabaco
  Label: "Sobre o USO DE CIGARROS, cigarro eletrônico, charutos ou cachimbo:"
  Single-select radio cards:
    · tobacco_never: "Nunca fiz uso."
    · tobacco_past: "Fiz uso, mas atualmente não faço mais."
    · tobacco_current: "Faço uso atualmente."

  IF tobacco_past selected, reveal follow-up:
    "Há quantos anos você parou?" (number input 0-80)
    Save as tobacco_years_since_quit.
  
  IF tobacco_current selected, reveal follow-up:
    "Em média, quantos cigarros/dispositivos por dia?" (number input 0-100)
    Save as tobacco_daily_units.

Save substance_use = { alcohol: {status, weekly_doses?}, tobacco: {status, years_since_quit?, daily_units?} }
current_section = 9, → /paciente/onboarding/secao/10.

═══════════════════════════════════════════════════════════════
SECTION 10 — ESTRESSE (PSS-14 + eventos + coping + lazer)
═══════════════════════════════════════════════════════════════

Section badge: "10 de 10"
Great Vibes: "Como você lida com o estresse"
Subtitle: "A seção final. Depois disso, você recebe um retrato de tudo."

Because this section is dense, add a mini progress showing the 4 blocks: "Bloco 1 de 4 · Percepção" ... update as user scrolls or fills each block.

BLOCK A — Percepção do estresse (PSS-14 de Cohen)
  Label: "No ÚLTIMO MÊS, com que frequência você:"
  <LikertGroup> with scale ['Nunca', 'Quase nunca', 'Às vezes', 'Frequentemente', 'Muito frequentemente'] (5-point):

  - pss1: "Ficou triste por causa de algo que aconteceu inesperadamente?"
  - pss2: "Sentiu-se incapaz de controlar as coisas importantes na sua vida?"
  - pss3: "Sentiu-se nervoso(a) e estressado(a)?"
  - pss4: "Tratou com sucesso dos problemas difíceis da vida?" [REVERSE]
  - pss5: "Sentiu que estava lidando bem com as mudanças importantes que aconteciam?" [REVERSE]
  - pss6: "Sentiu-se confiante na sua habilidade de resolver problemas pessoais?" [REVERSE]
  - pss7: "Sentiu que as coisas estavam acontecendo de acordo com sua vontade?" [REVERSE]
  - pss8: "Achou que não conseguiria dar conta de tudo o que tinha para fazer?"
  - pss9: "Conseguiu controlar as irritações na sua vida?" [REVERSE]
  - pss10: "Sentiu que as coisas estavam sob seu controle?" [REVERSE]
  - pss11: "Ficou irritado(a) porque as coisas que aconteciam estavam fora do seu controle?"
  - pss12: "Encontrou-se pensando sobre as coisas que precisava fazer?"
  - pss13: "Conseguiu controlar como gastava seu tempo?" [REVERSE]
  - pss14: "Sentiu que as dificuldades se acumulavam a ponto de você acreditar que não conseguiria superá-las?"

  Scoring: 0=Nunca, 1=Quase nunca, 2=Às vezes, 3=Frequentemente, 4=Muito frequentemente. REVERSE items subtract from 4.
  pss_score = sum of 14 (range 0-56).
  Ranges: 0-18 baixo, 19-27 moderado, 28+ alto estresse percebido.

BLOCK B — Eventos de vida estressantes (últimos 12 meses)
  Label: "Marque os eventos ESTRESSANTES que aconteceram nos ÚLTIMOS 12 MESES:"
  Multi-select cards (stacked, with description below label in marfim-suave):
  
  - family: "Problemas familiares" / "Mudanças importantes na família (ex.: morte, separação, nascimento)"
  - work: "Problemas no trabalho" / "Mudanças no emprego, perda do trabalho, condições alteradas"
  - health: "Problemas de saúde pessoal" / "Adoecimento, acidentes, necessidade de tratamento ou cirurgia"
  - financial: "Problemas financeiros" / "Dívidas, perda de renda, instabilidade financeira"
  - legal: "Problemas legais" / "Processos, investigações, questões judiciais"

  Save stressful_events = array of selected keys.

BLOCK C — Estratégias de enfrentamento (Coping — Brief COPE-inspired, 16 itens)
  Label: "Quando você passa por um problema sério, com que frequência você:"
  <LikertGroup> with scale ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'] (5-point):

  - cp1: "Faz um plano de ação e o segue em frente" [ativo]
  - cp2: "Procura o lado positivo das coisas" [reframing]
  - cp3: "Tenta passar tempo sozinho(a)" [retraimento]
  - cp4: "Espera que o problema se resolva sozinho" [passivo]
  - cp5: "Tenta expressar suas emoções" [expressivo]
  - cp6: "Conversa sobre isso com um amigo ou familiar" [suporte social]
  - cp7: "Tenta tirar o problema da cabeça" [evitativo]
  - cp8: "Enfrenta o problema de frente" [ativo]
  - cp9: "Dá um passo para trás e coloca as coisas em perspectiva" [reframing]
  - cp10: "Tende a se culpar" [autopunitivo]
  - cp11: "Deixa os sentimentos aflorarem para reduzir o estresse" [expressivo]
  - cp12: "Espera por um milagre" [passivo]
  - cp13: "Pede ajuda ou conselho a alguém que respeita" [suporte social]
  - cp14: "Tenta não pensar no problema" [evitativo]
  - cp15: "Tende a se criticar" [autopunitivo]
  - cp16: "Guarda pensamentos e sentimentos para si" [retraimento]

  Scoring 1-5 per item. Compute coping_profile = averages by dimension:
    { ativo: avg(cp1,cp8), reframing: avg(cp2,cp9), suporte_social: avg(cp6,cp13),
      expressivo: avg(cp5,cp11), retraimento: avg(cp3,cp16), passivo: avg(cp4,cp12),
      evitativo: avg(cp7,cp14), autopunitivo: avg(cp10,cp15) }

BLOCK D — Lazer (7 categorias)
  Label: "Quando tem TEMPO LIVRE, com que frequência você:"
  <LikertGroup> with scale ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre']:

  - le1: "Pratica esportes, exercícios, caminha para lazer, yoga, dança"
  - le2: "Assiste a filmes, visita museus, vai a teatros, lê, participa de workshops culturais"
  - le3: "Encontra amigos, vai a festas, participa de clubes ou grupos sociais, faz voluntariado"
  - le4: "Pratica meditação, ouve música, banhos de imersão, jardinagem"
  - le5: "Aprende novas habilidades ou hobbies, faz cursos ou workshops"
  - le6: "Acampa, faz trilhas, pesca, veleja, observa a natureza"
  - le7: "Joga videogames, navega em redes sociais, assiste séries ou vídeos online"

  Scoring 1-5. leisure_score = média das 7. (Alto = mais engajamento em atividades restauradoras.)

Save stress = { pss: {pss1..pss14}, coping: {cp1..cp16}, leisure: {le1..le7} }
Compute pss_score, coping_profile, leisure_score.
Save stressful_events.
current_section = 10.

Final "Continuar" navigates to /paciente/onboarding/conclusao.

═══════════════════════════════════════════════════════════════
SCREEN — CONCLUSÃO (/paciente/onboarding/conclusao)
═══════════════════════════════════════════════════════════════

On mount:
  1. Mark patient_assessments.status = 'concluida', completed_at = now()
  2. Also set patient_profiles.onboarding_completed_at = now() (existing table from base pack)
  3. Create gamification row (existing table): plant_stage='seed', streak_days=0

Full-screen dark. Center content:

Great Vibes 72px dourado-alto: "Está feito"
Papyrus card (papiro class, radius 16, padding 32):
  Body 20px marrom-couro:
  "Você acabou de dar ao Dr. Ariosto o retrato mais completo que ele pode ter sobre você hoje — antes mesmo da primeira consulta. Isso significa que a nossa conversa começa cinco passos à frente."
  "Preparamos um relatório com o que você contou. Ele fica no seu perfil e você pode revisitar sempre que quiser."

Two CTAs side by side (stack mobile):
  Primary: "Ver meu relatório" (amber-crepusculo, 18px) → /paciente/relatorio-inicial
  Ghost: "Ir para o dashboard" → /paciente

Below in caption marfim-suave: "Este relatório foi construído a partir de escalas clínicas validadas: Florescimento (Harvard), PSS-14 (Cohen), UCLA-8 (solidão) e STOP-BANG (triagem de sono)."

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- Sections 9 and 10 fully functional including PSS-14 reverse scoring
- Coping profile calculated by 8 dimensions
- Conclusion screen creating downstream records correctly
- All progress correctly stored (patient can close browser at any point during section 10 and resume)

Next: build the initial baseline report screen + PDF export.
```

---

## PROMPT E5 — Baseline report (screen + PDF) with interpretation

```
Build the initial baseline report — the primary deliverable that comes out of the extended onboarding. Two surfaces:

  1. Web view at /paciente/relatorio-inicial (read-only, beautiful, scrollable)
  2. Downloadable PDF via @react-pdf/renderer, saved to Supabase Storage bucket 'pdfs'

Doctor can also view/download from /medico/paciente/:patientId → tab "Relatórios" → "Relatório inicial de baseline".

═══════════════════════════════════════════════════════════════
INTERPRETATION LAYER — scoring rules (put in src/lib/reportInterpreter.ts)
═══════════════════════════════════════════════════════════════

Given a patient_assessments row, compute derived interpretations:

BMI (already stored):
  <18.5 "abaixo do peso saudável"
  18.5-24.9 "peso saudável"
  25-29.9 "sobrepeso"
  30-34.9 "obesidade grau I"
  35-39.9 "obesidade grau II"
  40+ "obesidade grau III"

Florescimento (0-10 score per domínio, average as global):
  ≥ 8 "florescimento elevado"
  6-7.99 "florescimento moderado"
  4-5.99 "florescimento em construção"
  < 4 "sinal para cuidado próximo"

Flexibilidade psicológica (0-12):
  ≥ 9 "alta flexibilidade"
  6-8 "flexibilidade em desenvolvimento"
  < 6 "flexibilidade a fortalecer"

STOP-BANG parcial (0-4 Sim):
  0-1 "baixo risco de apneia — sem sinal"
  2 "risco moderado — vale conversar com o médico"
  3-4 "risco elevado — orientamos avaliação com especialista do sono"

UCLA-8 solidão (8-32):
  8-14 "baixa solidão"
  15-22 "solidão moderada"
  23+ "solidão elevada"

Assertividade social (1-5 média):
  ≥ 4 "assertividade sólida"
  3-3.99 "assertividade em construção"
  < 3 "assertividade a fortalecer"

PSS-14 estresse (0-56):
  0-18 "estresse baixo"
  19-27 "estresse moderado"
  28-40 "estresse alto"
  41+ "estresse muito alto — sinal para cuidado imediato"

Capacidade funcional (1-5 média):
  ≥ 4 "capacidade preservada"
  3-3.99 "capacidade parcial"
  < 3 "capacidade a recuperar"

Alimentação ultraprocessados (0-7 média):
  ≤ 1 "consumo baixo"
  1.01-3 "consumo moderado"
  > 3 "consumo elevado"

Habilidades culinárias (1-3 média):
  ≥ 2.5 "autonomia sólida"
  1.5-2.49 "autonomia em construção"
  < 1.5 "autonomia a desenvolver"

Coping profile: identify DOMINANT dimension (highest average) and LEAST-USED dimension. Also flag if 'autopunitivo' ≥ 4 as risk signal.

Lazer (1-5): ≥ 4 "engajamento restaurador alto", 3-3.99 "moderado", < 3 "baixo — sinal para expandir repertório".

═══════════════════════════════════════════════════════════════
PRIORITY ALGORITHM — focos sugeridos
═══════════════════════════════════════════════════════════════

Compute a priority list of 3 focus areas for the coming weeks. Score each of the 8 lifestyle pillars (Movement, Sleep, Nutrition, Social, Substance, Stress, Flourishing, Psych.Flex) on a 0-100 scale where 100 = maximum need. Formulas:

  movement_need     = 100 - (movement_capacity_score * 20)  // 5 = 0 need, 1 = 80 need
  sleep_need        = (5 - sleep.frequency.sat_numeric) * 10 + stop_bang_partial_score * 10
  nutrition_need    = (nutrition_ultraprocessed_score / 7) * 60 + (3 - nutrition_skills_score) * 15
  social_need       = ((loneliness_score - 8) / 24) * 70 + (5 - social_skills_score) * 6
  substance_need    = (alcohol_current ? 40 : 0) + (tobacco_current ? 40 : 0) + (alcohol_weekly_doses > 14 ? 20 : 0)
  stress_need       = (pss_score / 56) * 100
  flourishing_need  = ((10 - flourishing_score) / 10) * 80
  psych_flex_need   = ((12 - psychological_flexibility_score) / 12) * 80

Top 3 = focos sugeridos, in priority order.

═══════════════════════════════════════════════════════════════
WEB REPORT VIEW — /paciente/relatorio-inicial
═══════════════════════════════════════════════════════════════

Layout: single-column scrollable, max-width 860px, generous whitespace.

Sticky header at top: back arrow + "Meu relatório inicial" + button "Baixar PDF" (ghost, dourado border, download SVG icon).

SECTION HERO
  Papyrus card (large, radius 20, padding 48):
    Great Vibes 64px: "Olá, {primeiroNome}"
    Sub body-lg marrom-couro: "Este é o retrato do seu ponto de partida. Ele nasceu das suas próprias respostas — e vai crescer junto com você."
    Meta: "Concluído em {completed_at formatted} · Relatório baseline v1"

SECTION 1 — 3 PRIORIDADES DESTACADAS
  Title h4: "Focos sugeridos para as próximas semanas"
  Sub: "Não são regras — são sinais. O Dr. Ariosto trabalha isso com você na consulta."
  3 large cards side-by-side (stack mobile):
    Card N: rank badge (1/2/3) in dourado circle + icon of the pillar (32px) + pillar name in EB Garamond h5 + one-sentence interpretation + inline metric ("Seu score: X · faixa Y")
  Cards ordered by priority score. Each card has subtle amber-crepusculo left border 3px.

SECTION 2 — RETRATO OBJETIVO (Corpo)
  Title h4: "Seu corpo"
  Grid 2 cols (stack mobile):
    · Card IMC: big number tabular ({bmi}) + classification + hint if elevated
    · Card Capacidade funcional: score /5 + interpretação
  Below: chip row of health conditions marked (dourado @ 30% pills), or "Sem condições marcadas" caption if empty.
  Small block: "Medicações em uso: {medications}" (if not "Não uso") in papyrus mini-card.

SECTION 3 — RADAR DE FLORESCIMENTO
  Title h4: "Como você está florescendo"
  Radar chart SVG (recharts or custom): 6 axes (Satisfação, Financeiro, Saúde, Propósito, Relacionamentos, Integridade), each 0-10. Filled area in dourado @ 25%, stroke dourado-alto 1.5px, axis lines marfim-suave dashed.
  Global score below chart: "Score global: {flourishing_score}/10 · {interpretation}"
  Two-column breakdown below chart: each domain with its number and micro-interpretation.

SECTION 4 — FLEXIBILIDADE PSICOLÓGICA
  Score progress bar horizontal (0-12), filled to psychological_flexibility_score.
  Interpretation text.
  Micro-cards for the 6 statements with the answer chosen.

SECTION 5 — MOVIMENTO
  Kpi row: aeróbico Xd/sem · força Xd/sem · alongamento Xd/sem · sentado Xh/dia
  Then capacidade funcional (score /5 + interpretação + shortest 3 items highlighted as "áreas com maior gap").
  Motivação e barreira principais em duas linhas.

SECTION 6 — SONO
  Alert card at top if stop_bang_partial_score ≥ 2: bg elevado + border ambar-terra + icon alerta SVG + text "Suas respostas sugerem que vale conversar com o Dr. Ariosto sobre uma avaliação do sono."
  Freq responses in list format.
  Hábitos: mostrar as 3 respostas que MAIS ATRAPALHAM (marked "Atrapalha") como "Hábitos a rever" e as 3 QUE MAIS AJUDAM como "Hábitos a manter".

SECTION 7 — ALIMENTAÇÃO
  Two-column stat: "Consumo ultraprocessados: {label}" e "Habilidades culinárias: {label}"
  Small bar chart: top 5 alimentos mais consumidos vs top 5 menos consumidos.
  Dificuldade e motivador principais em uma linha.

SECTION 8 — CONEXÕES SOCIAIS
  Score UCLA-8 solidão: {score}/32 · {interpretation}
  Score assertividade: {score}/5 · {interpretation}
  If solidão ≥ 23: sinaliza "Sinal para cuidado com rede de apoio" em card destacado.

SECTION 9 — SUBSTÂNCIAS
  Álcool: {status} + follow-ups.
  Tabaco: {status} + follow-ups.
  Neutro no tom — sem julgamento.

SECTION 10 — ESTRESSE
  PSS score em anel grande (mesmo componente do dashboard): X/56 + interpretação em body-lg.
  Eventos: chips das categorias marcadas.
  Coping profile: barra horizontal por dimensão (8 barras). Destaque em dourado-alto na dominante. Se autopunitivo ≥ 4, alert card discreto "Padrão auto-crítico observado — vale conversar com o Dr. Ariosto."
  Lazer: score + top 3 atividades preferidas + bottom 2 (com sugestão sutil "expandir aqui").

SECTION 11 — COMPROMISSO
  Papyrus card final:
    Great Vibes 40px: "O que vem a seguir"
    Body marrom-couro: "Este é o seu baseline. Daqui pra frente, cada check-in diário, cada escala pré-consulta e cada relatório novo comparam com este ponto de partida. Sua evolução ganha um espelho."
    "Se algo neste relatório não corresponde ao que você sente hoje, fale com o Dr. Ariosto — o Omiron aprende com você."
  CTA "Ir para o dashboard" primary.

═══════════════════════════════════════════════════════════════
PDF EXPORT — @react-pdf/renderer
═══════════════════════════════════════════════════════════════

Register EB Garamond and Great Vibes fonts (Font.register from Google Fonts CDN with WOFF fallback).

Same 11 sections as web view, adapted to A4 pages:
  - Page 1: Hero (papyrus background as PDF image) + 3 focos sugeridos
  - Page 2: Corpo + Florescimento (radar chart rendered as SVG in PDF via react-pdf's SVG primitives OR pre-render to PNG dataURL)
  - Page 3: Flexibilidade + Movimento
  - Page 4: Sono + Alimentação
  - Page 5: Conexões + Substâncias
  - Page 6: Estresse (full page — largest section)
  - Page 7: Compromisso + rodapé

Footer on every page:
  Left: "Omiron · Clínica Dr. Ariosto Filho"
  Center: "Relatório baseline · {yyyy-mm-dd}"
  Right: "Página {N} de {total}"

Colors: use hex values directly in styles (react-pdf doesn't consume CSS vars) — omironProfundo = '#141010', etc.

On download: also upload to Supabase Storage 'pdfs' bucket at `{patient_id}/relatorios/baseline-{yyyy-mm-dd}.pdf`, insert row into reports table with title "Relatório baseline inicial".

═══════════════════════════════════════════════════════════════
DOCTOR ACCESS
═══════════════════════════════════════════════════════════════

At /medico/paciente/:patientId, add a card at the top of the "Ficha" tab: "Relatório baseline · concluído em {date}" with buttons "Ver relatório" (opens web view of patient in read-only mode) and "Baixar PDF" (fetches the stored PDF from Storage).

If assessment is not yet completed, show placeholder: "Baseline em andamento · {current_section}/10 seções" com barra de progresso. Doctor não pode preencher — só o paciente.

═══════════════════════════════════════════════════════════════
DELIVERABLES
═══════════════════════════════════════════════════════════════

- /paciente/relatorio-inicial rendering full baseline report with all 11 sections and interpretations
- PDF download working with same content, 7 pages A4, correct fonts, saved to Supabase Storage
- Doctor view of patient's baseline report at /medico/paciente/:patientId
- Radar chart for florescimento
- Bar chart for alimentação
- Ring for PSS
- All interpretations from src/lib/reportInterpreter.ts unit-testable

═══════════════════════════════════════════════════════════════
FINAL POLISH — MANDATORY
═══════════════════════════════════════════════════════════════

- Verify no #000000 / #FFFFFF in report web view or PDF
- Verify no emoji anywhere (all icons SVG)
- Verify verde-planta only appears in plant SVG (does NOT appear in this report — the baseline doesn't touch gamification visuals)
- Verify body font is EB Garamond throughout, Great Vibes only in hero and section titles
- Verify PDF is legible at 100% zoom, comfortable line-height, no orphan lines
- Verify report loads with correct data for a manually completed test assessment
- Verify RLS: patient can only see their own report; doctor can only see reports of their patients
```

---

## Anexo A — Ordem de execução

| # | Prompt | O que entrega | Duração média |
|---|--------|---------------|---------------|
| E0 | Setup + LGPD + cadastro + router | Migration + 3 primeiras telas | 15 min |
| E1 | Seções 1-3 | Mudança, Histórico, Florescimento | 25 min |
| E2 | Seções 4-6 | Flexibilidade, Movimento, Sono | 30 min |
| E3 | Seções 7-8 | Alimentação, Conexões | 20 min |
| E4 | Seções 9-10 + conclusão | Tóxicos, Estresse, tela final | 30 min |
| E5 | Relatório baseline | Interpretação + web view + PDF | 40 min |

Tempo total estimado de execução Lovable: ~2h30 de builds + iterações + correções.

## Anexo B — Escalas clínicas embutidas (referência para o Dr. Ariosto)

| Escala | Domínio | Score | Interpretação |
|--------|---------|-------|---------------|
| Harvard Flourishing Index | Bem-estar global | 0-10 (média de 6) | ≥8 alto · 6-8 moderado · <6 baixo |
| CompACT-inspired | Flexibilidade psicológica | 0-12 (soma de 6 itens 0-2) | ≥9 alta · 6-8 média · <6 baixa |
| STOP-BANG parcial | Apneia do sono | 0-4 (sim/não) | 0-1 baixo · 2 moderado · 3+ alto risco |
| UCLA-8 Loneliness | Solidão | 8-32 (2 itens revertidos) | 8-14 baixa · 15-22 moderada · 23+ alta |
| Assertividade social | Habilidades sociais | 1-5 (média de 8) | ≥4 sólida · 3-4 construção · <3 fortalecer |
| PSS-14 Cohen | Estresse percebido | 0-56 (7 itens revertidos) | 0-18 baixo · 19-27 moderado · 28-40 alto · 41+ muito alto |
| Brief COPE-inspired | Coping | 1-5 por dimensão (8 dims) | Dimensão dominante = perfil |

## Anexo C — Gotchas específicos deste onboarding

1. **PSS-14 reverse scoring**: itens 4, 5, 6, 7, 9, 10, 13 são revertidos. Se a fórmula estiver errada, o score fica invertido e a interpretação vira o oposto. **Testar com respostas conhecidas** (tudo "Muito frequentemente" nas 7 não-revertidas + tudo "Nunca" nas 7 revertidas = score MÁXIMO 56).

2. **UCLA-8 reverse scoring**: itens 7 (encontrar companhia) e 8 (extroversão) são invertidos. Sem isso, extrovertido aparece como solitário.

3. **Autosave debounce**: 800ms é o sweet spot. Menor gera thrashing na rede; maior perde respostas se o paciente fechar rápido. NÃO desabilitar autosave nem exigir clique em "Salvar".

4. **PDF fonts no @react-pdf/renderer**: Great Vibes e EB Garamond precisam ser registradas via `Font.register({family, src})` apontando para uma URL WOFF/TTF pública. Google Fonts CDN às vezes bloqueia CORS — se acontecer, hospedar os TTFs em Supabase Storage e apontar para lá.

5. **Radar chart em PDF**: recharts é bom no web mas não roda em @react-pdf. Duas opções: (a) pré-renderizar o radar para dataURL PNG e embutir como <Image> no PDF; (b) desenhar o radar direto com primitivas SVG do @react-pdf (Line, Polygon). Opção (a) é mais simples.

6. **LGPD versioning**: `terms_version = 'v1-2026-08-11'` deve mudar toda vez que o texto legal for atualizado. Antes de uma atualização, forçar reconsentimento (query: quem tem terms_version antigo → mostra modal de reconsentimento na próxima entrada).

7. **Uma avaliação ativa por paciente**: o índice `UNIQUE idx_assessments_active WHERE status='em_andamento'` impede dois questionários abertos ao mesmo tempo. Se o paciente quiser reaplicar (ex.: 6 meses depois), criar nova row com version='v2'.

8. **Tempo de conclusão**: 25-30 min é o ideal. Se builds do Lovable pularem alguma pergunta ou adicionarem etapas extras, o cansaço do paciente aumenta muito. **Nunca aceitar prompts corretivos que aumentam número de telas** — se ao revisar você achar que está longo, condensar (mais blocos por tela) em vez de dividir (menos por tela, mais telas).

9. **Emoji creep no relatório**: Lovable tende a colocar 📊 ✅ 💪 nos cards de score. **Não aceitar** — SVG stroke sempre.

10. **Verde no relatório**: mesma armadilha do pacote-base. Se algum score "bom" aparecer verde, corrigir imediatamente para dourado-alto.
