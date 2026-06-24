# Exportar Design Tokens para W3C DTCG

> Task ID: brad-export-design-tokens-dtcg  
> Agente: Brad (Arquiteto de Design System)  
> VersÃ£o: 1.0.0

## Modos de ExecuÃ§Ã£o

**Escolha seu modo de execuÃ§Ã£o:**

### 1. Modo YOLO - RÃ¡pido, AutÃ´nomo (0-1 prompts)
- Tomada de decisÃ£o autÃ´noma com registro em log
- InteraÃ§Ã£o mÃ­nima com o usuÃ¡rio
- **Melhor para:** Tarefas simples e determinÃ­sticas

### 2. Modo Interativo - Equilibrado, Educativo (5-10 prompts) **[PADRÃƒO]**
- Checkpoints de decisÃ£o explÃ­citos
- ExplicaÃ§Ãµes educativas
- **Melhor para:** Aprendizado, decisÃµes complexas

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de anÃ¡lise da task (identificar todas as ambiguidades)
- ExecuÃ§Ã£o sem ambiguidade
- **Melhor para:** Requisitos ambÃ­guos, trabalho crÃ­tico

**ParÃ¢metro:** `mode` (opcional, padrÃ£o: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: exportDesignTokensDtcg()
responsÃ¡vel: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

**Entrada:**
- campo: task
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: true
  validaÃ§Ã£o: Deve ser uma task registrada

- campo: parameters
  tipo: object
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: ParÃ¢metros de task vÃ¡lidos

- campo: mode
  tipo: string
  origem: Entrada do UsuÃ¡rio
  obrigatÃ³rio: false
  validaÃ§Ã£o: yolo|interactive|pre-flight

**SaÃ­da:**
- campo: execution_result
  tipo: object
  destino: MemÃ³ria
  persistido: false

- campo: logs
  tipo: array
  destino: Arquivo (.ai/logs/*)
  persistido: true

- campo: state
  tipo: object
  destino: GestÃ£o de estado
  persistido: true
```

---

## PrÃ©-CondiÃ§Ãµes

**PropÃ³sito:** Validar os prÃ©-requisitos ANTES da execuÃ§Ã£o da task (bloqueante)

**Checklist:**

```yaml
pre-conditions:
  - [ ] Task estÃ¡ registrada; parÃ¢metros obrigatÃ³rios fornecidos; dependÃªncias atendidas
    tipo: pre-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar se a task estÃ¡ registrada; parÃ¢metros obrigatÃ³rios fornecidos; dependÃªncias atendidas
    error_message: "PrÃ©-condiÃ§Ã£o falhou: Task estÃ¡ registrada; parÃ¢metros obrigatÃ³rios fornecidos; dependÃªncias atendidas"
```

---

## PÃ³s-CondiÃ§Ãµes

**PropÃ³sito:** Validar o sucesso da execuÃ§Ã£o DEPOIS que a task Ã© concluÃ­da

**Checklist:**

```yaml
post-conditions:
  - [ ] Task concluÃ­da; exit code 0; saÃ­das esperadas criadas
    tipo: post-condition
    blocker: true
    validaÃ§Ã£o: |
      Verificar se a task foi concluÃ­da; exit code 0; saÃ­das esperadas criadas
    error_message: "PÃ³s-condiÃ§Ã£o falhou: Task concluÃ­da; exit code 0; saÃ­das esperadas criadas"
```

---

## CritÃ©rios de Aceite

**PropÃ³sito:** CritÃ©rios definitivos de pass/fail para a conclusÃ£o da task

**Checklist:**

```yaml
acceptance-criteria:
  - [ ] Task concluÃ­da conforme o esperado; efeitos colaterais documentados
    tipo: acceptance-criterion
    blocker: true
    validaÃ§Ã£o: |
      Afirmar que a task foi concluÃ­da conforme o esperado; efeitos colaterais documentados
    error_message: "CritÃ©rio de aceite nÃ£o atendido: Task concluÃ­da conforme o esperado; efeitos colaterais documentados"
```

---

## Ferramentas

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** task-runner
  - **PropÃ³sito:** ExecuÃ§Ã£o e orquestraÃ§Ã£o de tasks
  - **Origem:** .aiox-core/core/task-runner.js

- **Ferramenta:** logger
  - **PropÃ³sito:** Registro de execuÃ§Ã£o e rastreamento de erros
  - **Origem:** .aiox-core/utils/logger.js

---

## Scripts

**CÃ³digo especÃ­fico do agente para esta task:**

- **Script:** execute-task.js
  - **PropÃ³sito:** Wrapper genÃ©rico de execuÃ§Ã£o de task
  - **Linguagem:** JavaScript
  - **LocalizaÃ§Ã£o:** .aiox-core/scripts/execute-task.js

---

## Tratamento de Erros

**EstratÃ©gia:** retry

**Erros Comuns:**

1. **Erro:** Task NÃ£o Encontrada
   - **Causa:** Task especificada nÃ£o estÃ¡ registrada no sistema
   - **ResoluÃ§Ã£o:** Verificar o nome e o registro da task
   - **RecuperaÃ§Ã£o:** Listar tasks disponÃ­veis, sugerir similares

2. **Erro:** ParÃ¢metros InvÃ¡lidos
   - **Causa:** Os parÃ¢metros da task nÃ£o correspondem ao schema esperado
   - **ResoluÃ§Ã£o:** Validar os parÃ¢metros contra a definiÃ§Ã£o da task
   - **RecuperaÃ§Ã£o:** Fornecer template de parÃ¢metros, rejeitar a execuÃ§Ã£o

3. **Erro:** Timeout de ExecuÃ§Ã£o
   - **Causa:** A task excede o tempo mÃ¡ximo de execuÃ§Ã£o
   - **ResoluÃ§Ã£o:** Otimizar a task ou aumentar o timeout
   - **RecuperaÃ§Ã£o:** Encerrar a task, limpar recursos, registrar o estado

---

## Performance

**MÃ©tricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de OtimizaÃ§Ã£o:**
- Paralelizar operaÃ§Ãµes independentes; reutilizar resultados de Ã¡tomos; implementar saÃ­das antecipadas

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


## DescriÃ§Ã£o

Produzir exportaÃ§Ãµes de Design Tokens W3C (DTCG v2025.10) a partir do arquivo canÃ´nico de tokens em YAML. Valida a conformidade com o schema, o uso de cores OKLCH e publica os artefatos para as plataformas downstream (web, iOS, Android, Flutter).

## PrÃ©-requisitos

- tokens.yaml gerado via *tokenize (camadas core/semantic/component presentes)
- Node.js â‰¥ 18 / Python â‰¥ 3.10 (para as ferramentas de validaÃ§Ã£o)
- DTCG CLI ou validador de schema instalado (`npm install -g @designtokens/cli` recomendado)

## Workflow

1. **Carregar os Tokens de Origem**
   - Ler `tokens.yaml` e confirmar os metadados (dtcg_spec, color_space)
   - Garantir que as camadas existam: `core`, `semantic`, `component`
   - Verificar cobertura >95% armazenada em `.state.yaml`

2. **Gerar o JSON DTCG**
   - Transformar o YAML na estrutura JSON DTCG
   - Garantir que cada token inclua `$type`, `$value`, e opcionalmente `$description`
   - Mapear as referÃªncias usando o estilo `{layers.semantic.color.primary}`
   - Salvar como `tokens.dtcg.json`

3. **Produzir Bundles por Plataforma (Opcional)**
   - Rodar o Style Dictionary / scripts customizados para saÃ­das especÃ­ficas de plataforma
   - Alvos: web (CSS), Android (XML), iOS (Swift), Flutter (Dart)
   - Armazenar em `tokens/exports/{platform}/`

4. **Validar**
   - `dtcg validate tokens.dtcg.json`
   - Fazer lint dos valores OKLCH (garantir o formato `oklch()`, sinalizar fallback para hex)
   - Confirmar que as referÃªncias resolvem (sem caminhos ausentes)

5. **Documentar e Publicar**
   - Atualizar `docs/tokens/README.md` com detalhes da exportaÃ§Ã£o, versÃ£o, changelog
   - Anexar a saÃ­da do validador e as mÃ©tricas de cobertura
   - Atualizar `.state.yaml` (caminho de tokens.dtcg, status do validador, timestamp)

## SaÃ­da

- `tokens.dtcg.json` (compatÃ­vel com W3C)
- Bundles de plataforma opcionais (CSS, Android XML, Swift, Flutter)
- RelatÃ³rio de validaÃ§Ã£o (`tokens/validation/dtcg-report.json`)
- SeÃ§Ã£o de tokens atualizada em `.state.yaml`

## CritÃ©rios de Sucesso

- [ ] tokens.dtcg.json passa no validador W3C com zero erros
- [ ] EspaÃ§o de cor OKLCH utilizado; fallbacks documentados
- [ ] ReferÃªncias (`$value`) resolvem entre as camadas
- [ ] ExportaÃ§Ãµes de plataforma atualizadas (se habilitadas) e testadas com smoke test
- [ ] DocumentaÃ§Ã£o + changelog atualizados com versÃ£o/data
- [ ] `.state.yaml` reflete o caminho e o status da exportaÃ§Ã£o dtcg

## Tratamento de Erros

- **Schema invÃ¡lido**: Capturar a saÃ­da do validador, corrigir os tokens problemÃ¡ticos, reexecutar a exportaÃ§Ã£o
- **ReferÃªncia ausente**: Rastrear a origem no YAML, garantir que o token existe ou ajustar o alias
- **Formato de cor nÃ£o suportado**: Converter para OKLCH ou usar fallback com explicaÃ§Ã£o
- **Falha na exportaÃ§Ã£o de plataforma**: Reverter a etapa especÃ­fica da plataforma, sinalizar aÃ§Ã£o de follow-up

## Notas

- Manter as versÃµes dos tokens com versionamento semÃ¢ntico (ex.: 1.1.0 para novos tokens)
- Coordenar com as equipes de plataforma antes de breaking changes (ex.: renomear tokens)
- Armazenar os relatÃ³rios de validaÃ§Ã£o junto aos artefatos para auditoria/conformidade
