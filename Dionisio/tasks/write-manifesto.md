---
task: writeManifesto()
responsavel: "@manifestador"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: identity_architecture
    tipo: string
    origem: Phase 2 Output
    obrigatorio: true
  - campo: cause
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: manifesto
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Manifesto inclui todos os 7 componentes"
  - "[ ] Inimigo nomeado como força sistêmica, não pessoa"
  - "[ ] Chamado à ação inclui primeiro passo concreto"
tipo: nota
area: Dionisio
up: "[[Dionisio/_MOC-dionisio]]"
relacionado:
  - "[[Dionisio/tasks/_indice|_indice]]"
---

# Tarefa: Escrever Manifesto

**ID da Tarefa:** MOVEMENT-004
**Versão:** 1.0.0
**Comando:** `*write-manifesto`
**Agente:** Manifestador (manifestador)
**Propósito:** Criar um manifesto de movimento poderoso que declara crenças, nomeia o inimigo e chama as pessoas à ação

---

## Entradas

| Entrada | Origem | Obrigatório | Descrição |
|---------|--------|-------------|-----------|
| `identity_architecture` | Saída da Fase 2 | Sim | Framework de identidade completo do identitario |
| `spark_analysis` | Saída da Fase 1 | Sim | Análise fenomenológica com núcleo narrativo |
| `cause` | Prompt do usuário | Sim | A causa do movimento |
| `tone` | Usuário | Não | Tom desejado: revolucionário, inspirador, urgente, poético |
| `length` | Usuário | Não | Comprimento-alvo: curto (500 palavras), padrão (1000 palavras), épico (2000 palavras) |

## Pré-condições

- Arquitetura de identidade concluída (MOVEMENT-003)
- Análise da faísca disponível com núcleo narrativo
- Sistema de crenças definido com convicção central
- Frameworks de movimento carregados (`data/movement-frameworks.yaml`)

## Fases de Execução

### Fase 1: Declarar a Realidade

1. Abra com a **verdade inegável** -- uma afirmação sobre o mundo que o público reconhece imediatamente
2. Descreva o **estado atual** em termos vívidos e emocionais
3. Nomeie a **dor** que as pessoas sentem mas raramente articulam
4. Use o núcleo narrativo da análise da faísca como fundação
5. Escreva 2-3 parágrafos que façam o leitor pensar "finalmente alguém disse isso"

### Fase 2: Declarar as Crenças

1. Declare afirmações "Nós acreditamos..." extraídas da arquitetura de identidade
2. Comece com a **convicção central** -- a crença mais forte
3. Construa um **crescendo** de crenças -- cada uma mais ambiciosa que a anterior
4. Inclua a **crença contrária** -- aquilo em que acreditamos e os outros não
5. Encerre a seção de crenças com a **crença aspiracional** -- o sonho
6. Escreva 3-7 declarações de crença, cada uma em seu próprio parágrafo

### Fase 3: Nomear o Inimigo

1. Identifique o **inimigo sistêmico** -- uma força, sistema ou mentalidade (nunca uma pessoa)
2. Articule **por que esse inimigo persiste** -- o que o mantém no poder
3. Descreva o **custo da inação** -- o que acontece se nada mudar
4. Enquadre o inimigo como **derrotável** -- poderoso mas não invencível
5. Use uma linguagem que una contra o inimigo sem promover o ódio

### Fase 4: Vislumbrar o Futuro

1. Pinte a **terra prometida** -- como o mundo se parece quando o movimento triunfa
2. Torne-a **específica e sensorial** -- o leitor deve vê-la, senti-la e ouvi-la
3. Conecte o futuro à **transformação individual** -- como a vida de cada pessoa muda
4. Conecte ao **impacto coletivo** -- como a comunidade/o mundo muda
5. Faça a ponte do sonho à possibilidade -- "Isto não é apenas um sonho, está ao alcance"

### Fase 5: Chamado à Ação

1. Passe da visão para o **convite** -- "Junte-se a nós"
2. Defina o **primeiro passo** -- uma ação concreta que qualquer um pode tomar hoje
3. Estabeleça o **compromisso** -- o que significa fazer parte disso
4. Encerre com o **grito de guerra** -- uma frase que captura tudo
5. Termine com uma linha que ecoa na mente do leitor

## Formato de Saída

```yaml
manifesto:
  title: "{título do manifesto}"
  movement: "{nome do movimento}"
  word_count: {número}
  tone: "{revolutionary|inspirational|urgent|poetic}"
  components:
    reality_declaration: "{verdade de abertura}"
    belief_count: {número}
    central_belief: "{crença central}"
    named_enemy: "{inimigo sistêmico}"
    promised_land: "{resumo da visão do futuro}"
    battle_cry: "{uma frase}"
    call_to_action: "{primeiro passo}"
  full_text: |
    {texto completo do manifesto}
  usage_guidelines:
    - "{onde e como usar este manifesto}"
    - "{diretrizes de adaptação para diferentes formatos}"
```

## Condições de Veto

1. **NUNCA nomeie uma pessoa ou grupo específico como inimigo** -- inimigos precisam ser forças sistêmicas ou mentalidades
2. **NUNCA escreva crenças que contradigam a arquitetura de identidade** -- o manifesto expressa a identidade, não a inventa
3. **NUNCA use linguagem odiosa, discriminatória ou desumanizante** -- movimentos inspiram, eles não destroem
4. **NUNCA pule o chamado à ação** -- um manifesto sem ação é um ensaio
5. **NUNCA produza texto genérico, repleto de chavões** -- cada frase precisa carregar peso e especificidade

## Critérios de Conclusão

- [ ] Declaração da realidade abre com verdade inegável
- [ ] Pelo menos 3 declarações de crença enraizadas na arquitetura de identidade
- [ ] Inimigo nomeado como força sistêmica (não pessoa ou grupo)
- [ ] Visão do futuro é específica e sensorial
- [ ] Chamado à ação inclui um primeiro passo concreto
- [ ] Grito de guerra é uma frase memorável
- [ ] Manifesto se lê como um documento coeso e emocionalmente convincente
- [ ] Contagem de palavras dentro da faixa-alvo
- [ ] Saída corresponde ao esquema acima
