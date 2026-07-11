---
task: writeManifesto()
responsavel: "@marshall-ganz"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: movement_or_brand
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true
  - campo: core_values
    tipo: string
    origem: Entrada do Usuário
    obrigatorio: true

Saida:
  - campo: manifesto
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Story of Self elaborada com origem pessoal autêntica"
  - "[ ] Story of Us constrói identidade compartilhada e pertencimento"
  - "[ ] Texto do manifesto tecido com grito de guerra"
tipo: nota
area: Orfeu
up: "[[Orfeu/_MOC-orfeu]]"
relacionado:
  - "[[Orfeu/tasks/_indice|_indice]]"
---

# Tarefa: Manifesto de Movimento/Marca

**ID da Tarefa:** STORY-003
**Versão:** 1.0.0
**Comando:** `*write-manifesto`
**Agente:** Marshall Ganz (marshall-ganz)
**Propósito:** Criar um manifesto poderoso usando o framework Public Narrative (Story of Self, Us, Now).

---

## Entradas

| Entrada | Origem | Obrigatório |
|-------|--------|----------|
| `movement_or_brand` | Descrição do usuário | SIM |
| `core_values` | Especificação do usuário | SIM |
| `target_community` | Para quem isso se destina | SIM |
| `urgency_trigger` | Por que agora? | PREFERENCIAL |
| `founder_story` | Narrativa de origem pessoal | PREFERENCIAL |
| `enemy_or_obstacle` | A que o movimento se opõe | NÃO |

## Pré-condições

1. Noção clara do que o movimento ou marca defende
2. Valores centrais articulados (mesmo que de forma aproximada)
3. Comunidade-alvo identificada

## Fases de Execução

### Fase 1: Story of Self

1. Identificar a origem pessoal — que experiência criou o compromisso?
2. Encontrar o ponto de escolha — o momento que mudou tudo
3. Definir os valores expressos — o que a escolha revelou sobre quem você é?
4. Elaborar a narrativa — torná-la específica, vívida e emocionalmente honesta
5. Conectar a história pessoal à experiência humana universal
6. Teste: Esta história responde a "Por que eu me importo?" de forma autêntica?

### Fase 2: Story of Us

1. Identificar experiências compartilhadas — o que esta comunidade tem em comum?
2. Definir valores compartilhados — no que este grupo acredita em conjunto?
3. Encontrar o desafio coletivo — que obstáculo nos une?
4. Elaborar momentos de "nós" — transformar histórias individuais em identidade comunitária
5. Construir pertencimento — fazer o leitor sentir que faz parte de algo maior
6. Teste: Esta história responde a "Por que NÓS deveríamos nos importar?" de forma convincente?

### Fase 3: Story of Now

1. Definir o desafio urgente — o que exige ação agora mesmo?
2. Articular a escolha — o que devemos decidir e quais são os riscos?
3. Criar tensão entre esperança e medo — o que acontece se agirmos versus se não agirmos?
4. Emitir o chamado à ação — específico, alcançável, imediato
5. Pintar o futuro — como o mundo se parece quando obtivermos sucesso?
6. Teste: Esta história responde a "O que devemos fazer AGORA?" com urgência?

### Fase 4: Rascunho do Manifesto

1. Tecer as três histórias em um documento de manifesto coeso
2. Abrir com uma declaração ousada — a crença central afirmada sem pedir desculpas
3. Construir do pessoal ao coletivo ao urgente
4. Usar frases curtas e enérgicas — manifestos são feitos para serem ditos em voz alta
5. Incluir o inimigo ou obstáculo — aquilo contra o qual nos posicionamos
6. Encerrar com um grito de guerra — a frase que as pessoas vão repetir e compartilhar
7. Revisar quanto à força emocional — cada parágrafo deve mover o leitor
8. Testar a legibilidade — ler em voz alta, verificar ritmo e cadência

## Formato de Saída

```yaml
manifesto:
  title: "{título do manifesto}"
  author_agent: "marshall-ganz"
  movement_or_brand: "{nome}"
  core_values: ["{valores}"]
  target_community: "{público}"
  story_of_self:
    origin: "{história pessoal}"
    choice_point: "{o momento}"
    values_expressed: ["{valores revelados}"]
  story_of_us:
    shared_experience: "{o que nos une}"
    shared_values: ["{crenças coletivas}"]
    collective_challenge: "{nosso obstáculo}"
  story_of_now:
    urgent_challenge: "{por que agora}"
    the_choice: "{o que devemos decidir}"
    call_to_action: "{ação específica}"
    future_vision: "{o mundo que criamos}"
  manifesto_text: |
    {O texto completo do manifesto}
  rallying_cry: "{a única frase que as pessoas vão repetir}"
```

## Condições de Veto

- **NUNCA** escrever um manifesto sem verdade emocional genuína
- **NUNCA** pular a Story of Self — a autenticidade pessoal é o alicerce
- **NUNCA** emitir um chamado à ação sem definir como é o sucesso
- **NUNCA** criar divisão por meio do ódio — oponha-se a ideias, não a pessoas
- **NUNCA** escrever um manifesto que não pudesse ser lido em voz alta com convicção

## Critérios de Conclusão

- [ ] Story of Self elaborada com origem pessoal autêntica
- [ ] Story of Us constrói identidade compartilhada e pertencimento
- [ ] Story of Now cria urgência e define a escolha
- [ ] As três histórias tecidas em um manifesto coeso
- [ ] Declaração de abertura ousada estabelecida
- [ ] Chamado à ação claro com próximos passos específicos
- [ ] Grito de guerra elaborado para ser memorável
- [ ] O manifesto soa poderoso quando dito em voz alta
