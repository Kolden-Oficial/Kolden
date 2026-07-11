---
task: resolveCultureCrisis()
responsavel: "@board-chair"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: crisis_description
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: symptoms
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true

Saida:
  - campo: culture_resolution
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Os três frameworks de diagnóstico aplicados"
  - "[ ] Causa-raiz identificada com a cadeia causal mapeada"
  - "[ ] Plano de implementação com vitórias rápidas e critérios de medição"
tipo: nota
area: Themis
up: "[[Themis/_MOC-themis]]"
relacionado:
  - "[[Themis/tasks/_indice|_indice]]"
---

# Task: Resolução de Crise de Cultura e Disfunção de Equipe

**Task ID:** BOARD-003
**Versão:** 1.0.0
**Comando:** `*resolve-culture-crisis`
**Agente:** O Presidente do Conselho roteia para Simon Sinek + Brené Brown + Patrick Lencioni
**Propósito:** Diagnosticar e resolver disfunção de cultura organizacional ou colapso de equipe.

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `crisis_description` | Prompt do usuário | SIM |
| `team_size` | Número de pessoas afetadas | PREFERÍVEL |
| `symptoms` | Comportamentos e problemas observáveis | SIM |
| `duration` | Há quanto tempo isso vem acontecendo | PREFERÍVEL |
| `previous_interventions` | O que já foi tentado | NÃO |
| `organizational_context` | Estágio da empresa, setor, valores | NÃO |

## Pré-condições

1. A disfunção de cultura ou de equipe é reconhecida
2. Sintomas observáveis são descritos (não apenas uma sensação vaga)
3. Disposição para tratar causas-raiz, não apenas sintomas

## Fases de Execução

### Fase 1: Diagnosticar a Disfunção

**Patrick Lencioni — Avaliação das Five Dysfunctions:**
1. **Ausência de Confiança** — Os membros da equipe escondem fraquezas e erros?
2. **Medo do Conflito** — Eles evitam conversas difíceis?
3. **Falta de Comprometimento** — Eles deixam de aderir às decisões?
4. **Fuga da Responsabilização** — Eles evitam cobrar os colegas?
5. **Desatenção aos Resultados** — Eles priorizam o status individual sobre as metas da equipe?
6. Identifique qual disfunção é a raiz primária (elas se desdobram em cascata a partir da confiança para baixo)
7. Avalie a severidade: alerta precoce, padrão estabelecido ou crise

**Brené Brown — Avaliação de Vulnerabilidade:**
1. Existe segurança psicológica para ser honesto e imperfeito?
2. As pessoas estão se blindando (perfeccionismo, cinismo, anestesia emocional)?
3. Há uma lacuna entre os valores professados e os valores praticados?
4. Que histórias as pessoas estão contando a si mesmas sobre a situação?
5. Há vergonha presente — as pessoas têm medo de serem vistas como inadequadas?

**Simon Sinek — Verificação de Alinhamento de Propósito:**
1. O PORQUÊ está claro e compartilhado por toda a equipe?
2. A organização se afastou de seu propósito fundador?
3. As pessoas estão jogando um jogo finito (vencer) ou um jogo infinito (sustentar)?
4. Existe uma causa justa (just cause) que inspira a equipe?
5. Os líderes estão servindo às pessoas, ou as pessoas estão servindo aos líderes?

### Fase 2: Identificar a Causa-Raiz

1. Cruze a referência dos três frameworks de diagnóstico
2. Identifique a raiz mais profunda — geralmente confiança ou propósito, não o sintoma visível
3. Trace a cadeia causal: causa-raiz → cascata → sintomas visíveis
4. Determine se isto é um problema de pessoas, de processo ou de liderança
5. Avalie se a liderança é parte da causa ou parte da solução
6. Identifique a única intervenção que teria a maior alavancagem

### Fase 3: Desenhar a Intervenção

**Para Déficit de Confiança (Lencioni lidera):**
1. Exercício de histórias pessoais — construir confiança baseada em vulnerabilidade
2. Perfilamento comportamental — entender os estilos de trabalho de cada um
3. Exercício de eficácia de equipe — discussão aberta de forças e fraquezas
4. O líder vai primeiro — a vulnerabilidade precisa vir do topo

**Para Déficit de Coragem (Brown lidera):**
1. Nomeie a armadura — quais comportamentos defensivos estão presentes?
2. Encare a vulnerabilidade (rumble) — conversas facilitadas sobre temas difíceis
3. Clarificação de valores — alinhar valores declarados com o comportamento real
4. Clareza é gentileza (clear is kind) — estabelecer normas para feedback direto e compassivo

**Para Déficit de Propósito (Sinek lidera):**
1. Redescubra o PORQUÊ — o que originalmente inspirou a equipe/empresa?
2. Encontre a Just Cause — qual é a visão de longo prazo pela qual vale a pena lutar?
3. Estabeleça a mentalidade de jogo infinito — mude de "vencer concorrentes" para "avançar a causa"
4. Identifique rivais dignos — aprenda com os outros em vez de tentar destruí-los

### Fase 4: Plano de Implementação

1. Sequencie as intervenções — trate a causa-raiz primeiro, depois os efeitos a jusante
2. Defina vitórias rápidas — o que pode melhorar dentro de 1 semana?
3. Defina mudanças estruturais — o que precisa de 30-90 dias?
4. Atribua responsabilidades de liderança — quem conduz cada intervenção?
5. Defina critérios de medição — como você saberá que está funcionando?
6. Planeje check-ins — semanais no primeiro mês, depois quinzenais
7. Defina gatilhos de escalonamento — o que sinaliza que a intervenção não está funcionando?

## Formato de Saída

```yaml
culture_resolution:
  advisors: [simon-sinek, brene-brown, patrick-lencioni]
  diagnosis:
    lencioni_dysfunction: "{disfunção primária}"
    brown_vulnerability: "{avaliação de coragem}"
    sinek_purpose: "{avaliação de alinhamento}"
    root_cause: "{raiz mais profunda}"
    causal_chain: "{raiz → cascata → sintomas}"
    severity: "early_warning | established | crisis"
  intervention:
    primary: "{intervenção de maior alavancagem}"
    trust_building: ["{exercícios específicos}"]
    courage_building: ["{práticas específicas}"]
    purpose_alignment: ["{ações específicas}"]
  implementation:
    week_1: ["{vitórias rápidas}"]
    month_1: ["{mudanças estruturais}"]
    month_3: ["{práticas sustentadas}"]
    measurement: ["{indicadores de sucesso}"]
    escalation_triggers: ["{sinais de alerta}"]
```

## Condições de Veto

- **NUNCA** culpe indivíduos — foque em sistemas, padrões e liderança
- **NUNCA** pule a avaliação de confiança — confiança é o alicerce de tudo
- **NUNCA** recomende correções superficiais (eventos de team building) sem tratar a causa-raiz
- **NUNCA** ignore o papel da liderança na disfunção
- **NUNCA** apresse o processo — mudança de cultura leva tempo e esforço consistente

## Critérios de Conclusão

- [ ] Os três frameworks de diagnóstico aplicados
- [ ] Causa-raiz identificada com a cadeia causal mapeada
- [ ] Severidade avaliada (alerta precoce / estabelecida / crise)
- [ ] Intervenção desenhada tratando a causa-raiz primeiro
- [ ] Plano de implementação com vitórias rápidas e mudanças estruturais
- [ ] Critérios de medição definidos
- [ ] Gatilhos de escalonamento estabelecidos
