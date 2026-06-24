# Template de Prompt de Deep Research

**Template ID:** research-prompt-template-v1
**Propósito:** Gerar prompts estruturados de deep research para criação de agentes
**Baseado Em:** Meta-framework para construção de prompts de Deep Research

---

## Variáveis do Template

| Variável                   | Tipo   | Descrição                | Exemplo                              |
| -------------------------- | ------ | ------------------------ | ------------------------------------ |
| `{{specialist_name}}`      | string | Nome do especialista humano | "Gary Halbert"                    |
| `{{specialist_slug}}`      | string | Formato slug             | "gary_halbert"                       |
| `{{activity}}`             | string | Atividade específica     | "sales-page"                         |
| `{{activity_expanded}}`    | string | Descrição expandida      | "Sales Page Creation"                |
| `{{domain}}`               | string | Área de domínio          | "copywriting"                        |
| `{{time_period}}`          | string | Anos relevantes          | "1970-2007"                          |
| `{{agent_purpose}}`        | string | O que o agente faz       | "Create high-converting sales pages" |
| `{{local_knowledge_note}}` | string | O que já está disponível | "Already have 3,520 lines..."        |
| `{{scope_items}}`          | array  | 4-6 ângulos de pesquisa  | [...]                                |
| `{{requirements}}`         | array  | 3-4 parâmetros de pesquisa | [...]                              |
| `{{sources}}`              | array  | 3-4 tipos de fonte       | [...]                                |
| `{{deliverables}}`         | array  | 3-5 saídas esperadas     | [...]                                |

---

## Template de Prompt

```markdown
# Deep Research Prompt: {{specialist_name}} {{activity_expanded}} Methodology

---

## REFINED TOPIC

"The {{activity_expanded}} Engineering of {{specialist_name}}: {{topic_description}} ({{time_period}})"

---

## CONTEXT

{{context_paragraph}}

---

## SCOPE

{{#each scope_items}}

### {{this.number}}. {{this.title}}

{{#each this.sub_points}}

- {{this}}
  {{/each}}

{{/each}}

---

## REQUIREMENTS

{{#each requirements}}
{{this.number}}. {{this.text}}
{{/each}}

---

## RECOMMENDED SOURCES

{{#each sources}}

- {{this}}
  {{/each}}

---

## EXPECTED RESULTS

{{#each deliverables}}
{{this.number}}. "{{this.name}}" - {{this.description}}
{{/each}}

---

## CLARIFYING QUESTIONS (Optional)

{{#each clarifying_questions}}
{{this.number}}. {{this.question}}
{{/each}}

---

## RESEARCH NOTES

{{#if local_knowledge_note}}
**Existing Material:** {{local_knowledge_note}}
**Research Mode:** Complementary (focus on gaps)
{{else}}
**Existing Material:** None found
**Research Mode:** Comprehensive
{{/if}}
```

---

## Templates de Escopo Pré-Construídos por Domínio

### Copywriting (Baseado em Especialista)

```yaml
scope_templates:
  copywriting:
    - title: "{{SPECIALIST_NAME}}'S CORE METHODOLOGY"
      sub_points:
        - 'Fundamental principles and rules (explicit statements)'
        - 'Process/workflow from start to finish'
        - 'Quality criteria they used to evaluate work'
        - 'What they considered mistakes/anti-patterns'

    - title: '{{OUTPUT_TYPE}} ANATOMY/STRUCTURE'
      sub_points:
        - 'Section-by-section breakdown'
        - 'Purpose of each section'
        - 'Transitions between sections'
        - 'Length/proportion guidelines'

    - title: 'REAL EXAMPLES ANALYZED'
      sub_points:
        - "{{Specialist}}'s best known works"
        - 'Line-by-line or section-by-section analysis'
        - 'What made them effective'
        - 'Common patterns across winners'

    - title: 'CREATION PROCESS'
      sub_points:
        - 'Research phase before writing'
        - 'Drafting methodology'
        - 'Revision and editing process'
        - 'Testing and iteration'

    - title: 'MODERN ADAPTATION (2025)'
      sub_points:
        - 'Digital equivalents of original techniques'
        - 'What principles remain timeless'
        - 'What needs adjustment for modern context'
        - 'Platform-specific considerations'

    - title: 'QUALITY CRITERIA & CHECKLISTS'
      sub_points:
        - 'How {{specialist}} evaluated their own work'
        - 'Red flags and warning signs'
        - 'Approval criteria before shipping'
        - 'Comparison: excellent vs weak examples'
```

### Product Management (Genérico)

```yaml
scope_templates:
  product_management:
    - title: 'FRAMEWORK COMPARISON'
      sub_points:
        - 'Major frameworks in this area'
        - 'When to use which approach'
        - 'Pros/cons of each'
        - 'Integration possibilities'

    - title: 'PROCESS & METHODOLOGY'
      sub_points:
        - 'Step-by-step workflow'
        - 'Key decision points'
        - 'Inputs and outputs at each stage'
        - 'Time allocation guidelines'

    - title: 'TECHNIQUES & TOOLS'
      sub_points:
        - 'Specific techniques with how-to'
        - 'Tools that support the process'
        - 'Templates and artifacts'
        - 'Facilitation approaches'

    - title: 'CASE STUDIES'
      sub_points:
        - 'Real-world examples'
        - 'What worked and why'
        - 'What failed and lessons learned'
        - 'Metrics and outcomes'

    - title: 'COMMON MISTAKES'
      sub_points:
        - 'Anti-patterns to avoid'
        - 'Warning signs of problems'
        - 'Recovery strategies'
        - 'Prevention techniques'
```

### Sales (Baseado em Especialista)

```yaml
scope_templates:
  sales:
    - title: "{{SPECIALIST_NAME}}'S SALES PHILOSOPHY"
      sub_points:
        - 'Core beliefs about selling'
        - 'Mindset and approach'
        - 'Relationship to customer'
        - 'Ethics and boundaries'

    - title: '{{OUTPUT_TYPE}} STRUCTURE'
      sub_points:
        - 'Opening/hook methodology'
        - 'Discovery/qualification process'
        - 'Presentation framework'
        - 'Objection handling'
        - 'Closing techniques'

    - title: 'SCRIPTS & LANGUAGE'
      sub_points:
        - 'Exact phrases that work'
        - 'Questions to ask'
        - 'Transitions between phases'
        - 'Language to avoid'

    - title: 'REAL EXAMPLES'
      sub_points:
        - 'Documented sales/deals'
        - 'What made them work'
        - 'Variations for different contexts'

    - title: 'METRICS & OPTIMIZATION'
      sub_points:
        - 'Key performance indicators'
        - 'How to measure effectiveness'
        - 'Iteration methodology'
```

---

## Templates de Requisitos por Modo de Pesquisa

### Comprehensive (Sem Conhecimento Local)

```yaml
requirements_comprehensive:
  - "Prioritize primary sources (expert's own words, original works)"
  - 'Include detailed analysis of at least 3 real examples'
  - 'Extract operational processes, not just theory'
  - 'Document both what TO DO and what NOT to do'
```

### Complementary (Tem Conhecimento Local)

```yaml
requirements_complementary:
  - 'Focus on gaps not covered in existing material: {{gaps_list}}'
  - 'Cross-reference with local sources for consistency'
  - 'Prioritize new examples not already documented'
  - 'Add modern context and digital adaptation'
```

---

## Templates de Fontes por Domínio

### Copywriting

```yaml
sources_copywriting:
  specialist_based:
    - '"{{book_title}}" by {{specialist_name}} (especially {{chapters}})'
    - '{{specialist_name}} newsletter/letter archive'
    - 'Seminars and interviews with {{specialist_name}}'
    - 'Analysis by practitioners who studied {{specialist_name}}'

  generic:
    - 'Classic copywriting books (Ogilvy, Hopkins, Schwartz)'
    - 'AWAI and industry training materials'
    - 'Case studies from successful campaigns'
    - 'Academic research on persuasion'
```

### Product Management

```yaml
sources_product:
  - '"The Mom Test" by Rob Fitzpatrick'
  - '"Continuous Discovery Habits" by Teresa Torres'
  - '"Inspired" by Marty Cagan'
  - "Product management blogs (Lenny's Newsletter, etc.)"
```

### Sales

```yaml
sources_sales:
  specialist_based:
    - 'Books by {{specialist_name}}'
    - 'Training programs and courses'
    - 'Podcast/interview appearances'
    - 'Practitioner testimonials and case studies'

  generic:
    - 'SPIN Selling, Challenger Sale, etc.'
    - 'Sales methodology comparisons'
    - 'CRM and sales enablement research'
```

---

## Templates de Entregáveis

### Conjunto Padrão de Entregáveis

```yaml
deliverables_standard:
  - name: '{{Activity}} Structure Template'
    description: 'Complete anatomy with all sections and their purposes'

  - name: '{{Specialist}} Process Workflow'
    description: 'Step-by-step methodology from research to completion'

  - name: 'Quality Checklist'
    description: 'Validation criteria derived from expert standards'

  - name: 'Examples Database'
    description: '{{N}}+ real examples with structural analysis'

  - name: 'Anti-Patterns Guide'
    description: 'Common mistakes and how to avoid them'
```

### Entregáveis Estendidos (Deep Research)

```yaml
deliverables_extended:
  - name: '{{Activity}} Blueprint'
    description: 'Master template with all sections, purposes, and examples'

  - name: 'Phrase/Language Bank'
    description: '{{N}}+ proven phrases, openings, transitions, closes'

  - name: 'Decision Framework'
    description: 'When to use which approach/variation'

  - name: 'Adaptation Guide'
    description: 'How to modify for different contexts/audiences'

  - name: 'Measurement Framework'
    description: 'How to evaluate effectiveness'
```

---

## Exemplo: Prompt Totalmente Renderizado

### Variáveis de Entrada

```yaml
specialist_name: 'Eugene Schwartz'
specialist_slug: 'eugene_schwartz'
activity: 'headlines'
activity_expanded: 'Headline Creation'
domain: 'copywriting'
time_period: '1950-1995'
agent_purpose: 'Create headlines that capture attention and qualify prospects'
local_knowledge_note: "Have 'Breakthrough Advertising' excerpts (450 lines)"
```

### Saída Renderizada

```markdown
# Deep Research Prompt: Eugene Schwartz Headline Creation Methodology

---

## REFINED TOPIC

"The Headline Engineering of Eugene Schwartz: The 5 Levels of Awareness Applied
to Title Construction that Captures Attention and Qualifies Prospects (1950-1995)"

---

## CONTEXT

Building an AI agent to create headlines that capture attention and qualify
prospects following Eugene Schwartz's REAL methodology. Already have 450 lines
from "Breakthrough Advertising" excerpts. Need to extract operational frameworks
for headline creation across all awareness levels, with real examples and
testing methodology.

---

## SCOPE

### 1. THE 5 AWARENESS LEVELS IN PRACTICE (Not Theory)

- Unaware: headlines that worked, common structure
- Problem Aware: headlines that worked, common structure
- Solution Aware: headlines that worked, common structure
- Product Aware: headlines that worked, common structure
- Most Aware: headlines that worked, common structure
- How to DIAGNOSE which level the market is at

### 2. HEADLINE CREATION MECHANISM

- Schwartz's 33-minute work block process
- How many headlines he created before choosing
- Selection criteria: what made a headline "winner"
- Swipe file usage: how he used references

### 3. RECURRING STRUCTURES

- Identifiable patterns in Schwartz headlines
- "Power words" he used repeatedly
- Mathematical headline formulas (if they existed)
- Ideal length by context

### 4. MARKET SOPHISTICATION (Different from Awareness)

- The 5 levels of sophistication
- How this affected the headline
- When to use "new" vs "improved" vs "different"
- Saturated markets vs virgin markets

### 5. DOCUMENTED CASES

- Headlines from "Breakthrough Advertising"
- Mail order headlines he wrote
- Documented A/B test results
- Headlines rejected vs approved (if documented)

---

## REQUIREMENTS

1. Prioritize "Breakthrough Advertising" as primary source
2. Include REAL headlines with structural analysis
3. Differentiate theory (book) from practice (real campaigns)
4. Extract operational checklists and decision criteria

---

## RECOMMENDED SOURCES

- "Breakthrough Advertising" (complete, focusing on examples)
- Schwartz's mail order ads (Rodale, Boardroom)
- Interviews with Schwartz (rare, but exist)
- Brian Kurtz's analysis of Schwartz
- Boardroom Inc. archives

---

## EXPECTED RESULTS

1. "Awareness Level Diagnostic Tool" - How to identify market level
2. "Headline Templates by Level" - 5-10 structures for each level
3. "Schwartz Headline Creation Process" - Documented workflow
4. "Sophistication Assessment Matrix" - Decision diagram
5. "50 Headlines Analyzed" - Database with structure, level, result

---

## RESEARCH NOTES

**Existing Material:** 450 lines from Breakthrough Advertising excerpts
**Research Mode:** Complementary (focus on real examples and process details)
**Gaps to Fill:** Testing methodology, more real headline examples, sophistication framework
```

---

## Notas de Uso

1. **Substituição de Variáveis:** Substitua todas as `{{variables}}` por valores reais
2. **Seleção de Escopo:** Escolha os 4-6 ângulos mais relevantes dos templates
3. **Adaptação:** Modifique os sub-pontos com base no propósito específico do agente
4. **Conhecimento Local:** Ajuste o modo de pesquisa com base no material existente
5. **Modo YOLO:** Pule as perguntas de esclarecimento na execução autônoma

---

**Versão do Template:** 1.0.0
**Criado:** 2026-01-22
**Parte de:** squads/squad-architect
