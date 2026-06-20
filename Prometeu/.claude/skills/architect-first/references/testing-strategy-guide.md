# Guia de Estratégia de Testes

Guia para implementar a filosofia do "Escape Hatch de Qualidade": testes como rede de segurança para imperfeição temporária.

## Filosofia Central

**Os testes permitem imperfeição temporária**

- A qualidade do código é negociável SE respaldada por testes abrangentes
- Código "feio" COM testes é aceitável
- Código "feio" SEM testes é rejeitado
- Os testes são a rede de segurança que habilita a execução pragmática

## Hierarquia de Testes

### 1. Testes Unitários

**Propósito**: Validar componentes individuais isoladamente

**Quando escrever**:
- Antes ou imediatamente após escrever o componente
- Para toda a lógica de negócio
- Para todas as transformações de dados
- Para todas as funções utilitárias

**Metas de cobertura**:
- Mínimo de 80% de cobertura para código novo
- 100% de cobertura para caminhos críticos
- Todos os casos extremos testados

**Estrutura de exemplo**:
```python
def test_component_happy_path():
    """Testa o caso de uso principal"""
    # Arrange
    input_data = create_test_data()

    # Act
    result = my_component(input_data)

    # Assert
    assert result.is_valid()
    assert result.output == expected_output

def test_component_edge_case_empty_input():
    """Testa caso extremo: entrada vazia"""
    result = my_component([])
    assert result.is_empty()

def test_component_error_invalid_input():
    """Testa tratamento de erro: entrada inválida"""
    with pytest.raises(ValidationError):
        my_component(invalid_data)
```

### 2. Testes de Integração

**Propósito**: Validar interações entre componentes e workflows

**Quando escrever**:
- Após múltiplos componentes serem implementados
- Para interações cruzadas entre módulos
- Para validações de fluxo de dados
- Para carregamento de configuração

**Metas de cobertura**:
- Todos os workflows principais testados end-to-end
- Todos os pontos de integração validados
- Variações de configuração testadas

**Estrutura de exemplo**:
```python
def test_workflow_user_registration():
    """Testa o workflow completo de registro de usuário"""
    # Setup
    config = load_test_config()
    system = SystemUnderTest(config)

    # Execute workflow
    user_data = create_test_user()
    result = system.register_user(user_data)

    # Validate workflow steps
    assert result.validation_passed
    assert result.user_created
    assert result.notification_sent

    # Validate integration
    assert database.user_exists(user_data.email)
    assert email_service.sent_welcome_email(user_data.email)
```

### 3. Testes End-to-End

**Propósito**: Validar o comportamento completo do sistema da perspectiva do usuário

**Quando escrever**:
- Após o caso de uso central ser implementado
- Para validação dos critérios de aceitação
- Para validação de user story

**Metas de cobertura**:
- Todas as user stories têm teste E2E
- Todos os critérios de aceitação validados
- Caso de uso central testado a fundo

**Estrutura de exemplo**:
```python
def test_e2e_complete_user_journey():
    """Testa a jornada completa do usuário, do registro ao uso"""
    # User registers
    user = register_new_user()

    # User logs in
    session = login_user(user.credentials)

    # User performs core action
    result = perform_core_action(session)

    # Validate complete journey
    assert result.success
    assert user_activity_logged()
    assert metrics_updated()
```

## Padrão Test-Driven Development (TDD)

### Ciclo TDD Padrão

1. **Red**: Escreva primeiro um teste que falha
2. **Green**: Escreva o código mínimo para o teste passar
3. **Refactor**: Melhore o código mantendo os testes verdes

### Adaptação TDD Architect-First

1. **Architect**: Projete e documente primeiro
2. **Red**: Escreva os testes com base na arquitetura
3. **Green**: Implemente para passar nos testes (o código pode ser "feio")
4. **Refactor**: Melhore a qualidade do código (opcional, os testes habilitam isso)

**Diferença-chave**: Arquitetura e documentação precedem a escrita dos testes.

## Escape Hatch de Qualidade: Quando Código "Feio" é Aceitável

### Condições para Aceitação

Código "feio" é aceitável quando TODAS estas forem verdadeiras:

1. ✅ **Existem testes abrangentes**
   - Testes unitários cobrem todos os caminhos de lógica
   - Testes de integração validam os workflows
   - Os testes realmente rodam e passam

2. ✅ **Pontos de logging/observação adicionados**
   - Pontos-chave de decisão logados
   - Contexto de erro capturado
   - Hooks de debugging disponíveis

3. ✅ **O caso de uso central funciona**
   - Workflow principal funcional
   - Critérios de aceitação atendidos
   - Valor entregue ao usuário

4. ✅ **Dívida técnica documentada**
   - Comentários TODO com contexto
   - Plano de refatoração esboçado
   - Limitações conhecidas documentadas

### Exemplos de Código "Feio" Aceitável

```python
# ACEITÁVEL: ifs aninhados, mas totalmente testado
def process_data(data):
    """Process data through validation pipeline.

    TODO: Refactor nested ifs to strategy pattern
    See: docs/refactoring/data-processing.md
    """
    if data.type == "A":
        if data.valid:
            if data.priority == "high":
                return fast_process_a(data)
            else:
                return slow_process_a(data)
        else:
            raise ValidationError("Invalid A")
    elif data.type == "B":
        # Similar nesting...
        pass
    # ... comprehensive tests exist for all paths
```

```python
# ACEITÁVEL: implementação rápida, mas testada
def calculate_metrics(records):
    """Calculate metrics from records.

    TODO: Optimize query - currently loads all to memory
    Performance: ~500ms for 10k records (acceptable for MVP)
    """
    # Load everything (inefficient but works)
    all_data = list(records)

    # Calculate (could be vectorized)
    result = sum(r.value for r in all_data) / len(all_data)

    logging.info(f"Calculated metric: {result} from {len(all_data)} records")
    return result
    # Unit tests verify correctness
    # Integration tests verify performance acceptable
```

### Exemplos de Código INACEITÁVEL

```python
# REJEITADO: sem testes, sem logging
def process_important_data(data):
    # Complex logic with no tests
    result = data.field1 + data.field2 * 3.14
    if result > threshold:  # hardcoded threshold
        return do_something(result)
    return None
```

```python
# REJEITADO: testes existem mas não validam de fato o comportamento
def calculate_revenue(orders):
    # Complex calculation
    total = sum(o.amount for o in orders)
    return total * 1.1  # Why 1.1? No comment, no doc

def test_calculate_revenue():
    # Useless test - doesn't validate logic
    result = calculate_revenue([])
    assert result >= 0  # Always passes, validates nothing
```

## Estratégia de Logging para Suporte a Testes

### Pontos Estratégicos de Logging

1. **Entrada/Saída de funções importantes**
   ```python
   logging.info(f"Starting process_workflow with {len(items)} items")
   result = process_workflow(items)
   logging.info(f"Completed process_workflow: {result.summary()}")
   ```

2. **Pontos de decisão**
   ```python
   if should_use_fast_path(data):
       logging.debug("Using fast path: criteria met")
       return fast_path(data)
   else:
       logging.debug(f"Using slow path: {data.reason}")
       return slow_path(data)
   ```

3. **Condições de erro**
   ```python
   try:
       result = risky_operation()
   except ValidationError as e:
       logging.error(f"Validation failed: {e}", extra={
           "input": data,
           "context": current_context
       })
       raise
   ```

4. **Monitoramento de performance**
   ```python
   import time
   start = time.time()
   result = expensive_operation()
   duration = time.time() - start
   logging.info(f"Operation completed in {duration:.2f}s")
   if duration > THRESHOLD:
       logging.warning(f"Operation slow: {duration:.2f}s > {THRESHOLD}s")
   ```

## Organização de Testes

### Estrutura de Diretórios

```
project/
├── src/
│   └── module/
│       ├── __init__.py
│       └── component.py
├── tests/
│   ├── unit/
│   │   └── test_component.py
│   ├── integration/
│   │   └── test_module_integration.py
│   └── e2e/
│       └── test_user_workflows.py
└── conftest.py  # Fixtures compartilhadas
```

### Convenções de Nomenclatura

- Arquivos de teste: `test_*.py`
- Funções de teste: `test_[component]_[scenario]`
- Classes de teste: `Test[Component]`

**Exemplos**:
- `test_parser_valid_input()`
- `test_parser_empty_input()`
- `test_parser_invalid_format_raises_error()`

## Fixtures e Helpers de Teste

### Configuração para Testes

```python
# conftest.py
import pytest

@pytest.fixture
def test_config():
    """Load test configuration"""
    return {
        "database": "sqlite:///:memory:",
        "log_level": "DEBUG",
        "timeout": 1.0
    }

@pytest.fixture
def sample_data():
    """Create sample test data"""
    return [
        {"id": 1, "value": 100},
        {"id": 2, "value": 200},
    ]
```

### Mockar Dependências Externas

```python
from unittest.mock import Mock, patch

def test_with_external_api():
    """Test component that calls external API"""
    with patch('module.external_api') as mock_api:
        mock_api.fetch_data.return_value = {"status": "ok"}

        result = my_component.process()

        assert result.success
        mock_api.fetch_data.assert_called_once()
```

## Rodando os Testes

### Desenvolvimento Local

```bash
# Rodar todos os testes
pytest

# Rodar com cobertura
pytest --cov=src --cov-report=html

# Rodar arquivo de teste específico
pytest tests/unit/test_component.py

# Rodar teste específico
pytest tests/unit/test_component.py::test_parser_valid_input

# Rodar com saída verbosa
pytest -v

# Rodar com saída de logging
pytest -s --log-cli-level=DEBUG
```

### Integração CI/CD

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Set up Python
        uses: actions/setup-python@v2
        with:
          python-version: 3.9
      - name: Install dependencies
        run: pip install -r requirements-test.txt
      - name: Run tests
        run: pytest --cov=src --cov-fail-under=80
```

## Metas de Cobertura

### Requisitos Mínimos de Cobertura

- **Código novo**: 80% no mínimo
- **Caminhos críticos**: 100% obrigatório
- **Código existente**: Nenhuma diminuição permitida

### Medindo a Cobertura

```bash
# Gerar relatório de cobertura
pytest --cov=src --cov-report=html

# Visualizar no navegador
open htmlcov/index.html

# Verificar módulo específico
pytest --cov=src.module --cov-report=term-missing
```

### Exceções à Cobertura

Aceitável excluir da cobertura:
- Declarações de logging
- Código de debug
- Código de checagem de tipos (`if TYPE_CHECKING:`)
- Definições de classe base abstrata
- `# pragma: no cover` explícito com justificativa

## Checklist de Qualidade de Testes

- [ ] Os testes são independentes (podem rodar em qualquer ordem)
- [ ] Os testes são repetíveis (mesmo resultado toda vez)
- [ ] Os testes são rápidos (< 1s para testes unitários)
- [ ] Os testes têm nomes claros descrevendo o que testam
- [ ] Os testes seguem o padrão Arrange-Act-Assert
- [ ] Casos extremos são testados
- [ ] Condições de erro são testadas
- [ ] Os testes não dependem de estado externo
- [ ] Mocks são usados para dependências externas
- [ ] Os dados de teste são claramente definidos

## Refatoração com Rede de Segurança de Testes

**Processo**:

1. Garanta que existem testes abrangentes
2. Rode os testes → todos verdes
3. Refatore o código incrementalmente
4. Rode os testes após cada mudança
5. Se os testes falharem → corrija ou reverta
6. Continue refatorando
7. Rodada final de testes → todos verdes
8. Commit

**Regras**:
- NUNCA refatore sem testes
- NUNCA altere testes e código simultaneamente
- SEMPRE mantenha os testes passando
- COMMITE frequentemente com os testes passando

---

## Resumo

**Escape Hatch de Qualidade na Prática**:

1. **Antes de codar**: Defina o plano de testes
2. **Enquanto coda**: Escreva os testes (pode ser concorrente ou depois)
3. **Qualidade do código**: Pode ser "feio" SE os testes forem abrangentes
4. **Validação**: Testes + logs + inspeção manual
5. **Refatoração**: Opcional, habilitada pelos testes
6. **Deploy**: Caso central funcionando + testes passando

**Lembre-se**: Os testes são sua licença para escrever código imperfeito. Sem testes, a perfeição é exigida.
