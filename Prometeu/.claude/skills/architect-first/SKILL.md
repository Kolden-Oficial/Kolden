---
name: architect-first
description: Guia para implementar a filosofia de desenvolvimento Architect-First - arquitetura perfeita, execução pragmática, qualidade garantida por testes. Use esta skill ao iniciar novas funcionalidades, refatorar sistemas ou quando decisões arquiteturais forem necessárias. Impõe pontos inegociáveis como design/documentação completos antes do código, acoplamento zero e validação por múltiplas perspectivas antes de decisões estruturais.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Architect First

## Visão Geral

Esta skill incorpora a filosofia de desenvolvimento "Architect-First": **Arquitetura perfeita, execução pragmática, qualidade garantida por testes**. Aplique esta skill ao tomar decisões arquiteturais, iniciar novas funcionalidades, refatorar sistemas existentes ou quando portões de qualidade precisarem ser impostos.

O princípio central: **Arquitetura e documentação são inegociáveis e devem preceder a implementação. A qualidade do código é negociável SE respaldada por testes como rede de segurança (escape hatch).**

## Filosofia Central

### Mantra
"Arquitetura perfeita, execução pragmática, qualidade garantida por testes"

### Portões de Qualidade

**Inegociável (PARE se violado):**
- **Arquitetura**: Design e documentação completos ANTES de qualquer código
- **Documentação**: Deve preceder e acompanhar a implementação
- **Preservação de Capacidade**: Nunca perca capacidade/granularidade em relação a versões anteriores
- **Acoplamento Zero**: Os expansion packs devem ser independentes
- **Validação Multiagente**: Decisões estruturais validadas por PO/Arquiteto/Usuário

**Negociável (com escape hatch):**
- **Estilo de Código**: Aceitável se respaldado por testes como rede de segurança
- **Completude de Funcionalidade**: 80% aceitável SE o caso de uso central funcionar
- **Código Rápido & Sujo**: Permitido SOMENTE com plano de testes e logging mínimo

### Modos de Decisão

**Modo Architect-First (padrão):**
- Projete e documente completamente antes de codar
- Mapeie a estrutura e os ponteiros antes de propor a implementação
- Valide a arquitetura com múltiplos agentes/perspectivas
- Externalize todas as configurações mutáveis para YAML

**Modo Rápido (somente pós-validação):**
- Decisões binárias e delegação rápida
- Ativado SOMENTE após a validação arquitetural estar completa
- Velocidade por automação, não por atalhos

## Árvore de Decisão do Workflow

```
Nova Tarefa/Solicitação de Funcionalidade
    ↓
┌──────────────────────────────────────┐
│ Esta é uma decisão                   │
│ estrutural/arquitetural?             │
└──────────────────────────────────────┘
    ↓ SIM                    ↓ NÃO
    ↓                        ↓
[Fluxo de Arquitetura]  [Fluxo de Execução]
```

### Fluxo de Arquitetura (Decisões Estruturais)

**PARE e siga esta sequência:**

1. **Mapeie Antes de Modificar**
   - Documente completamente o estado atual
   - Identifique todas as dependências e pontos de contato
   - Crie diagramas/fluxos arquiteturais
   - Carregue `references/architecture-checklist.md` para validação

2. **Validação Multiagente**
   - Apresente opções A/B/C com trade-offs explícitos
   - Obtenha validação de:
     - Product Owner (alinhamento de negócio)
     - Arquiteto (solidez técnica)
     - Usuário (decisão final)
   - Documente a justificativa da decisão

3. **Documentação de Design**
   - Documento de design completo ANTES do código
   - Inclua:
     - Diagramas de arquitetura do sistema
     - Interações entre componentes
     - Fluxos de dados
     - Schema de configuração (YAML)
     - Pontos de integração
   - Use os templates de `assets/architecture-template.md`

4. **Baseline Gold Standard**
   - Garanta que o novo design atinge/excede o baseline de capacidade
   - Valide: Isto mantém TODAS as capacidades anteriores?
   - PARE se perda de capacidade for detectada → restaure ou reprojete

5. **Validação de Acoplamento Zero**
   - Rode o script de validação: `scripts/check_coupling.py`
   - Garanta a independência dos expansion packs
   - Sem dependências cruzadas entre módulos hardcoded

6. **Prossiga para a Implementação**
   - Agora e somente agora: escreva código
   - Siga o fluxo de execução para a implementação

### Fluxo de Execução (Implementação)

1. **Checklist de Pré-Implementação**
   - [ ] Arquitetura documentada e validada?
   - [ ] Caso de uso central claramente definido?
   - [ ] Configuração externalizada para YAML?
   - [ ] Estratégia de testes definida?
   - Use `references/pre-implementation-checklist.md`

2. **Rede de Segurança Orientada a Testes**
   - Defina o plano de testes PRIMEIRO
   - Identifique os pontos de logging/observação
   - Os testes permitem imperfeição temporária (escape hatch)
   - Validação de qualidade via: testes + logs + inspeção manual

3. **Estilo de Implementação**
   ```
   ACEITÁVEL:
   ✓ Código "feio" COM testes abrangentes
   ✓ 80% de completude de funcionalidade SE o caso central funcionar
   ✓ Implementação rápida COM plano de testes + logging

   REJEITADO:
   ✗ Código "feio" SEM testes
   ✗ Perda de capacidade sem justificativa explícita
   ✗ Valores mutáveis hardcoded (devem ser YAML)
   ✗ Deploy sem o caso central funcionando
   ```

4. **Filosofia de Debugging**
   - Observacional via logs (console/logging) > análise estática
   - Adicione pontos de log estratégicos antes de debugar
   - Inspecione o comportamento real em runtime
   - Valide através da execução, não apenas lendo o código

5. **Documentação**
   - Atualize a documentação conforme o código evolui
   - Mantenha curta e acionável: "Como customizar"
   - Inclua exemplos de código
   - Documente as opções de configuração

## Heurísticas (Regras de Decisão)

Aplique estas heurísticas ao tomar decisões:

1. **Baseline Gold Standard**: 22 artefatos no mínimo (ajuste ao seu contexto)
2. **Nunca Perca Capacidade**: Acumule, nunca reduza
3. **Arquitete Antes de Construir**: Design/documentação antes do código, sempre
4. **Acoplamento Zero, Modularidade Máxima**: Expansion packs independentes
5. **Config > Hardcoding**: Externalize para YAML todos os valores mutáveis
6. **Mapeie Antes de Modificar**: Documente a estrutura antes de alterá-la
7. **Decisão Binária Pós-Validação**: Execução rápida após validação arquitetural
8. **Velocidade via Automação**: Não via atalhos ou cortes de canto
9. **Escape Hatch de Qualidade**: Os testes permitem imperfeição temporária

## Stop Rules (Limites Rígidos)

**PARE imediatamente se detectar:**

- ⛔ **Perda de capacidade** em relação ao baseline
- ⛔ **Decisão estrutural** sem validação multiagente
- ⛔ **Acoplamento** entre módulos
- ⛔ **Documentação arquitetural ausente**
- ⛔ **Código rápido & sujo** SEM plano de testes e logs
- ⛔ **Valores de configuração** mutáveis hardcoded

Ao parar, consulte `references/stop-rules-guide.md` para remediação.

## Mitigação de Riscos

Riscos comuns e suas mitigações:

| Risco | Estratégia de Mitigação |
|------|-------------------|
| Planejamento excessivo | Time-box + POC obrigatório antes da formalização completa |
| Cascata de perfeccionismo | Regra de 3: piloto simples → 2 iterações → formalizar |
| Configuração prematura | Generalize somente após ≥2 cenários reais |
| Troca de contexto | Checklist de itens pendentes a cada pivô |

Use `scripts/validate_risk_mitigation.py` para verificar a cobertura da mitigação de riscos.

## Contrato de Colaboração

Ao trabalhar com esta skill, siga estes padrões de colaboração:

✓ **Faça:**
- Apresente opções A/B/C com trade-offs explícitos
- Mapeie a estrutura e os ponteiros antes de propor código
- Externalize as configs em YAML; nada mutável hardcoded
- Entregue documentação curta e acionável ("como customizar")
- Para código rápido: inclua plano de testes e pontos de log
- Documente os itens pendentes ao pivotar

✗ **Não faça:**
- Propor código sem contexto arquitetural
- Hardcodar valores que possam mudar
- Pular a validação multiagente em mudanças estruturais
- Escrever código "rápido & sujo" sem testes
- Tomar decisões arquiteturais unilateralmente

## Critérios de Aceitação

### Será Aceito
- ✓ Código "feio" COM testes abrangentes
- ✓ 80% das funcionalidades SE o caso central estiver coberto
- ✓ Grandes refatorações que aumentem a flexibilidade
- ✓ Documentação extensa se ela ensinar a customização

### Será Rejeitado
- ✗ Código "feio" SEM testes
- ✗ Perda de capacidade sem justificativa explícita
- ✗ Valores mutáveis hardcoded
- ✗ Deploy sem o caso central funcionando

## Áreas Desconhecidas (Para Refinamento Futuro)

Áreas ainda não totalmente definidas na filosofia:

- Filosofia de hotfix (emergências de produção)
- Limiares de performance (mínimos de latência/throughput)
- Tolerância à duplicação de código (quando refatorar)
- Metas de observabilidade (níveis de log, correlação, tracing)

Ao encontrar essas áreas, aplique as heurísticas centrais e documente as decisões para refinamento futuro.

## Recursos

### scripts/
Scripts de validação e automação:
- `check_coupling.py` - Valida o princípio de acoplamento zero
- `validate_risk_mitigation.py` - Verifica a cobertura de riscos
- `architecture_validator.py` - Valida a completude arquitetural

### references/
Checklists e guias detalhados:
- `architecture-checklist.md` - Checklist completo de validação de arquitetura
- `pre-implementation-checklist.md` - Validação pré-código
- `stop-rules-guide.md` - Guia de remediação quando as stop rules disparam
- `testing-strategy-guide.md` - Padrões de desenvolvimento orientado a testes

### assets/
Templates para saídas consistentes:
- `architecture-template.md` - Template padrão de documento de arquitetura
- `config-template.yaml` - Template de externalização de configuração
- `adr-template.md` - Template de Architecture Decision Record

## Referência Rápida

**Iniciando uma nova funcionalidade:**
1. Mapeie a arquitetura atual (`references/architecture-checklist.md`)
2. Projete com opções A/B/C
3. Validação multiagente
4. Documente a arquitetura (`assets/architecture-template.md`)
5. Defina os testes
6. Implemente com logging
7. Valide e itere

**Fazendo mudanças arquiteturais:**
1. PARE - Não code ainda
2. Documente completamente o estado atual
3. Apresente opções com trade-offs
4. Obtenha validação de PO/Arquiteto/Usuário
5. Verifique o acoplamento (`scripts/check_coupling.py`)
6. Documente a decisão (`assets/adr-template.md`)
7. Agora implemente

**Implementação rápida (com rede de segurança):**
1. Checklist de pré-implementação
2. Defina o plano de testes
3. Adicione pontos de log
4. Implemente (pode ser "feio")
5. Verifique se os testes passam
6. Inspecione os logs
7. Refatore se necessário
