---
tipo: nota
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/.aiox-core/development/tasks/_indice|_indice]]"
---

# Compor Molécula a partir de Átomos

> Task ID: atlas-compose-molecule
> Agente: Atlas (Design System Builder)
> Versão: 1.0.0

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

### 3. Planejamento Pre-Flight - Planejamento Abrangente Antecipado
- Fase de análise da task (identificar todas as ambiguidades)
- Execução sem ambiguidade
- **Melhor para:** Requisitos ambíguos, trabalho crítico

**Parâmetro:** `mode` (opcional, padrão: `interactive`)

---

## Definição da Task (AIOX Task Format V1.0)

```yaml
task: composeMolecule()
responsável: Uma (Empathizer)
responsavel_type: Agente
atomic_layer: Molecule

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

**Propósito:** Validar pré-requisitos ANTES da execução da task (bloqueante)

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

**Propósito:** Validar o sucesso da execução DEPOIS que a task é concluída

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

**Propósito:** Critérios definitivos de aprovação/reprovação para a conclusão da task

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

**Recursos externos/compartilhados usados por esta task:**

- **Ferramenta:** component-generator
  - **Propósito:** Gerar novos componentes a partir de templates
  - **Origem:** .aiox-core/scripts/component-generator.js

- **Ferramenta:** file-system
  - **Propósito:** Criação e validação de arquivos
  - **Origem:** Node.js fs module

---

## Scripts

**Código específico do agente para esta task:**

- **Script:** create-component.js
  - **Propósito:** Workflow de criação de componente
  - **Linguagem:** JavaScript
  - **Localização:** .aiox-core/scripts/create-component.js

---

## Tratamento de Erros

**Estratégia:** retry

**Erros Comuns:**

1. **Erro:** Recurso Já Existe
   - **Causa:** O arquivo/recurso de destino já existe no sistema
   - **Resolução:** Use a flag force ou escolha um nome diferente
   - **Recuperação:** Solicitar ao usuário um nome alternativo ou forçar a sobrescrita

2. **Erro:** Entrada Inválida
   - **Causa:** O nome de entrada contém caracteres ou formato inválidos
   - **Resolução:** Validar a entrada contra as regras de nomenclatura (kebab-case, minúsculas, sem caracteres especiais)
   - **Recuperação:** Sanitizar a entrada ou rejeitar com uma mensagem de erro clara

3. **Erro:** Permissão Negada
   - **Causa:** Permissões insuficientes para criar o recurso
   - **Resolução:** Verificar as permissões do sistema de arquivos, executar com privilégios elevados se necessário
   - **Recuperação:** Registrar o erro em log, notificar o usuário, sugerir a correção de permissão

---

## Performance

**Métricas Esperadas:**

```yaml
duration_expected: 2-5 min (estimated)
cost_estimated: $0.001-0.003
token_usage: ~1,000-3,000 tokens
```

**Notas de Otimização:**
- Paralelizar operações independentes; reutilizar resultados de átomos; implementar saídas antecipadas

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

Constrói um componente molécula compondo átomos existentes seguindo a metodologia de Atomic Design. Exemplos: FormField (Label + Input), Card (Heading + Text + Button), SearchBar (Input + Button).

## Pré-requisitos

- Setup concluído
- Componentes átomos existem (dependências)
- Tokens carregados

## Workflow

### Passos

1. **Validar as Dependências de Átomos** - Verificar se os átomos necessários existem
2. **Gerar o Componente Molécula** - Compor os átomos com a lógica da molécula
3. **Gerar os Estilos da Molécula** - Layout e espaçamento específicos da molécula
4. **Gerar os Testes** - Testar a composição e as interações da molécula
5. **Gerar as Stories** - Mostrar a molécula com diferentes combinações de átomos
6. **Gerar a Documentação** - Documentar a estrutura composta
7. **Atualizar o Índice** - Exportar a molécula
8. **Atualizar o Estado** - Rastrear a molécula construída

## Saída

- Componente molécula (TypeScript)
- Estilos da molécula (CSS Modules)
- Testes (>80% de cobertura)
- Stories (opcional)
- Documentação

## Critérios de Sucesso

- [ ] Todas as dependências de átomos importadas corretamente
- [ ] A molécula compõe os átomos (não os reimplementa)
- [ ] Lógica específica da molécula isolada
- [ ] Os testes cobrem as interações entre átomos
- [ ] Acessível (WCAG AA)

## Exemplo

```typescript
// FormField.tsx (molecule)
import { Label } from '../atoms/Label';
import { Input, InputProps } from '../atoms/Input';
import { HelperText } from '../atoms/HelperText';

export interface FormFieldProps extends InputProps {
  label: string;
  helperText?: string;
  error?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  helperText,
  error,
  ...inputProps
}) => {
  return (
    <div className={styles.formField}>
      <Label htmlFor={inputProps.id}>{label}</Label>
      <Input {...inputProps} error={!!error} />
      {error && <HelperText variant="error">{error}</HelperText>}
      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
};
```

## Notas

- Moléculas compõem átomos, não os reimplementam
- A molécula adiciona apenas lógica de composição
- Os átomos permanecem independentes e reutilizáveis
- Teste as interações entre átomos no contexto da molécula
