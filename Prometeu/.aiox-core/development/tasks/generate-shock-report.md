---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Gerar Relatório de Choque Visual

> Task ID: brad-generate-shock-report
> Agent: Brad (Design System Architect)
> Version: 1.0.0

## Modos de Execução

**Escolha seu modo de execução:**

### 1. Modo YOLO - Rápido, Autônomo (0-1 prompts)
- Tomada de decisão autônoma com registro em log
- Interação mínima com o usuário
- **Melhor para:** Tarefas simples e determinísticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃO]**
- Checkpoints de decisão explícitos
- Explicações educativas
- **Melhor para:** Aprendizado, decisões complexas

### 3. Planejamento Pré-Voo - Planejamento Abrangente Antecipado
- Fase de análise da tarefa (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: generateShockReport()
responsável: Atlas (Decoder)
responsavel_type: Agente
atomic_layer: Template

**Entrada:**
- campo: name
  tipo: string
  origem: User Input
  obrigatório: true
  validação: Must be non-empty, lowercase, kebab-case

- campo: options
  tipo: object
  origem: User Input
  obrigatório: false
  validação: Valid JSON object with allowed keys

- campo: force
  tipo: boolean
  origem: User Input
  obrigatório: false
  validação: Default: false

**Saída:**
- campo: created_file
  tipo: string
  destino: File system
  persistido: true

- campo: validation_report
  tipo: object
  destino: Memory
  persistido: false

- campo: success
  tipo: boolean
  destino: Return value
  persistido: false
```

---

## Pré-Condições

**Propósito:** Validar pré-requisitos ANTES da execução da tarefa (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Target does not already exist; required inputs provided; permissions granted
    tipo: pre-condition
    blocker: true
    validação: |
      Check target does not already exist; required inputs provided; permissions granted
    error_message: "Pre-condition failed: Target does not already exist; required inputs provided; permissions granted"
```

---

## Pós-Condições

**Propósito:** Validar o sucesso da execução APÓS a conclusão da tarefa

**Checklist:**

```yaml
post-conditions:
  - [ ] Resource created successfully; validation passed; no errors logged
    tipo: post-condition
    blocker: true
    validação: |
      Verify resource created successfully; validation passed; no errors logged
    error_message: "Post-condition failed: Resource created successfully; validation passed; no errors logged"
```

---

## Critérios de Aceite

**Propósito:** Critérios definitivos de aprovação/reprovação para conclusão da tarefa

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Resource exists and is valid; no duplicate resources created
    tipo: acceptance-criterion
    blocker: true
    validação: |
      Assert resource exists and is valid; no duplicate resources created
    error_message: "Acceptance criterion not met: Resource exists and is valid; no duplicate resources created"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta tarefa:**

- **Tool:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Tool:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Módulo fs do Node.js

---

## Scripts

**Código específico do agente para esta tarefa:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componentes
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso de destino já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicite ao usuário um nome alternativo ou force a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Valide a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitize a entrada ou rejeite com uma mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verifique as permissões do sistema de arquivos, execute com privilégios elevados se necessário
   - **Recuperação:** Registre o erro, notifique o usuário, sugira a correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 3-8 min (estimated)
cost_estimated: $0.002-0.005
token_usage: ~1,500-5,000 tokens
```

**Notas de Otimização:**
- Cache da compilação de templates; minimize transformações de dados; carregue recursos sob demanda

---

## Metadata

```yaml
story: N/A
version: 1.0.0
dependencies:
  - N/A
tags:
  - automation
  - workflow
updated_at: 2025-11-17
```

---


## Descrição

Gera um relatório HTML autocontido que mostra evidências visuais do caos de UI com comparações lado a lado, análise de custos e apresentação de "show de horrores" projetada para impulsionar a ação dos stakeholders.

## Pré-requisitos

- Auditoria concluída (comando *audit executado com sucesso)
- Dados de consolidação disponíveis (opcional, mas recomendado)
- ROI calculado (opcional, mas recomendado para impacto total)

## Workflow

### Elicitação Interativa

Esta tarefa usa elicitação interativa para customizar o relatório de choque.

1. **Selecionar o Escopo do Relatório**
   - Relatório completo (todos os padrões) ou focado (apenas os piores ofensores)
   - Incluir seção de ROI (requer *calculate-roi)
   - Incluir pré-visualização antes/depois
   - Público-alvo (engenheiros vs executivos)

2. **Revisar os Dados de Padrões**
   - Mostrar quais padrões serão visualizados
   - Confirmar que os exemplos mais chocantes foram selecionados
   - Perguntar por quaisquer padrões a destacar

3. **Configurar a Saída**
   - Apenas HTML ou HTML + exportação em PDF
   - Design responsivo (visualizável em mobile)
   - Esquema de cores (modo light/dark)

### Passos

1. **Carregar Dados de Auditoria e Consolidação**
   - Ler o .state.yaml em busca de todas as métricas de padrões
   - Carregar os dados de inventário, consolidação e ROI, se disponíveis
   - Validar a completude dos dados
   - Validação: Dados suficientes para a geração do relatório

2. **Extrair Exemplos Visuais**
   - Escanear a base de código em busca de implementações reais de botões
   - Extrair o CSS de exemplos representativos
   - Encontrar as duplicatas mais flagrantes
   - Capturar os 10 piores ofensores
   - Validação: Exemplos visuais extraídos

3. **Gerar a Estrutura HTML**
   - Criar HTML autocontido (sem dependências externas)
   - Embutir o CSS e o JavaScript mínimo
   - Design responsivo (de mobile a desktop)
   - Validação: Estrutura HTML5 válida

4. **Criar a Seção "Show de Horrores"**
   - Exibir todas as variações de botões lado a lado
   - Mostrar a explosão da paleta de cores (89 cores em grade)
   - Visualizar as inconsistências de espaçamento
   - Torná-lo visualmente avassalador (intencional)
   - Validação: Impacto visual maximizado

5. **Adicionar o Dashboard de Métricas**
   - Cards de contagem de padrões (antes/depois)
   - Percentuais de redução com barras de progresso
   - Fatores de redundância destacados
   - Validação: Métricas claramente apresentadas

6. **Gerar a Seção de Análise de Custos**
   - Se o ROI foi calculado, embutir o detalhamento de custos
   - Mostrar o desperdício mensal/anual
   - Exibir as métricas de ROI com destaque
   - Incluir um widget de calculadora de economia
   - Validação: Impacto financeiro claro

7. **Criar a Pré-visualização Antes/Depois**
   - Mostrar o estado futuro consolidado
   - Comparação lado a lado (47 botões → 3)
   - Destacar a simplicidade e a consistência
   - Validação: O estado futuro parece limpo

8. **Adicionar o Resumo Executivo**
   - Principais descobertas no topo da página
   - Declaração do problema em uma frase
   - Solução em três bullet points
   - Chamada para ação clara
   - Validação: Introdução amigável a executivos

9. **Embutir Elementos Interativos**
   - Calculadora de economia (informe o tamanho da equipe, veja o ROI)
   - Filtro de padrões (mostrar/ocultar categorias)
   - Botão de exportar para PDF
   - Validação: Elementos interativos funcionais

10. **Gerar o Arquivo do Relatório**
    - Salvar como shock-report.html
    - Autocontido (funciona offline)
    - Tamanho de arquivo otimizado (<1MB)
    - Validação: O arquivo abre em todos os navegadores

11. **Opcional: Exportar para PDF**
    - Se solicitado, gerar a versão em PDF
    - Preservar o layout visual
    - Validação: PDF legível e imprimível

12. **Atualizar o Arquivo de Estado**
    - Adicionar a seção shock_report ao .state.yaml
    - Registrar a localização do relatório e o horário de geração
    - Validação: Estado atualizado

## Saída

- **shock-report.html**: Relatório visual autocontido
- **shock-report.pdf**: Versão em PDF (opcional)
- **.state.yaml**: Atualizado com a localização do relatório

### Formato de Saída

```html
<!DOCTYPE html>
<html>
<head>
  <title>UI Pattern Chaos Report</title>
  <style>
    /* Embedded CSS for self-contained report */
    body { font-family: system-ui; max-width: 1200px; margin: 0 auto; }
    .horror-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(150px, 1fr)); gap: 10px; }
    .metric-card { background: #f0f0f0; padding: 20px; border-radius: 8px; }
    .metric-value { font-size: 3rem; font-weight: bold; color: #dc2626; }
  </style>
</head>
<body>
  <header>
    <h1>🚨 UI Pattern Chaos Report</h1>
    <p class="subtitle">Generated by Brad | 2025-10-27</p>
  </header>

  <section class="executive-summary">
    <h2>Executive Summary</h2>
    <p><strong>Problem:</strong> 176 redundant UI patterns cost $457,200/year in maintenance.</p>
    <ul>
      <li>81.8% pattern reduction possible (176 → 32)</li>
      <li>$374,400/year savings potential</li>
      <li>ROI breakeven in 10 days</li>
    </ul>
    <p><strong>Action:</strong> Approve design system implementation immediately.</p>
  </section>

  <section class="metrics">
    <h2>The Damage</h2>
    <div class="metric-cards">
      <div class="metric-card">
        <div class="metric-value">47</div>
        <div class="metric-label">Button Variations</div>
        <div class="metric-target">Target: 3</div>
      </div>
      <!-- More metric cards -->
    </div>
  </section>

  <section class="horror-show">
    <h2>The Horror Show</h2>
    <h3>All 47 Button Variations</h3>
    <div class="horror-grid">
      <!-- Actual button examples rendered -->
      <button class="btn-primary">Primary</button>
      <button class="button-primary">Primary Alt</button>
      <button class="btn-main">Main</button>
      <!-- ...44 more variations... -->
    </div>
    <p class="caption">This is madness. It should be 3 variants, not 47.</p>
  </section>

  <section class="cost-analysis">
    <h2>The Cost</h2>
    <table>
      <tr>
        <th>Before</th>
        <td>$457,200/year</td>
      </tr>
      <tr>
        <th>After</th>
        <td>$82,800/year</td>
      </tr>
      <tr>
        <th>Savings</th>
        <td class="highlight">$374,400/year</td>
      </tr>
    </table>
  </section>

  <section class="future-state">
    <h2>The Solution</h2>
    <h3>Consolidated: 3 Button Variants</h3>
    <div class="clean-grid">
      <button class="btn-primary-new">Primary</button>
      <button class="btn-secondary-new">Secondary</button>
      <button class="btn-destructive-new">Destructive</button>
    </div>
    <p class="caption">Clean. Consistent. Maintainable.</p>
  </section>

  <footer>
    <p>Generated by Brad (Design System Architect)</p>
    <p>Powered by SuperAgentes</p>
  </footer>
</body>
</html>
```

## Critérios de Sucesso

- [ ] HTML autocontido (sem dependências externas)
- [ ] A seção visual de "show de horrores" maximiza o impacto
- [ ] Todos os tipos de padrão visualizados (botões, cores, espaçamento)
- [ ] Análise de custos incluída (se o ROI foi calculado)
- [ ] A comparação antes/depois mostra o benefício da consolidação
- [ ] O resumo executivo está pronto para stakeholders
- [ ] O relatório abre em todos os principais navegadores
- [ ] Tamanho de arquivo <1MB para fácil compartilhamento

## Tratamento de Erros

- **Sem dados de auditoria**: Sair com mensagem para rodar *audit primeiro
- **Exemplos visuais ausentes**: Usar descrições em texto em vez disso
- **Problemas de compatibilidade de navegador**: Fazer fallback para um HTML mais simples
- **Tamanho de arquivo grande**: Reduzir exemplos, comprimir imagens

## Considerações de Segurança

- Nenhum recurso externo carregado (autocontido)
- Sanitizar qualquer texto fornecido pelo usuário
- Nenhuma execução de código no relatório
- Seguro para compartilhar via e-mail ou intranet

## Exemplos

### Exemplo 1: Gerar Relatório de Choque

```bash
*shock-report
```

Saída:
```
🔍 Brad: Gerando relatório de choque visual...

📸 Extraindo exemplos de padrões...
  - 47 variações de botões capturadas
  - 89 amostras de cor capturadas
  - Inconsistências de espaçamento capturadas

📊 Construindo o dashboard de métricas...
  - Contagens de padrões: ✓
  - Percentuais de redução: ✓
  - Análise de ROI: ✓ ($374,400/ano de economia)

🎨 Criando a visualização do show de horrores...
  - Grade de botões: 47 variações exibidas
  - Explosão de cores: 89 cores em grade
  - Caos de espaçamento: Visualizado

✅ Relatório de choque gerado: outputs/design-system/my-app/audit/shock-report.html

👀 Abra no navegador para ver o show de horrores.
📧 Compartilhe com os stakeholders para impulsionar a ação.

Brad diz: "Mostre-lhes os números. Eles não podem discutir com isto."
```

### Exemplo 2: Abrindo o Relatório

```bash
open outputs/design-system/my-app/audit/shock-report.html
```

O navegador exibe:
- Resumo executivo no topo
- Cards de métricas mostrando 47, 89, 176 (em vermelho)
- Grade de 47 variações reais de botões (avassaladora)
- Tabela de custos: $457k → $83k = $374k de economia
- Estado futuro limpo: 3 botões

## Notas

- O impacto visual é o objetivo - torne-o chocante
- HTML autocontido para fácil compartilhamento (e-mail, Slack, etc)
- Funciona offline (sem dependências de CDN)
- Otimizado para revisão executiva (leitura de 5 minutos)
- Incluir exemplos de código reais sempre que possível
- A grade de explosão de cores é particularmente eficaz
- A seção de ROI é o fechamento para a adesão dos stakeholders
- Brad recomenda: Envie aos tomadores de decisão antes das reuniões
- Atualize o relatório após a consolidação para mostrar o progresso
- Use isto para justificar o investimento no design system
