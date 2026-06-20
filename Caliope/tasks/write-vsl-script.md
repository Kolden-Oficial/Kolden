---
task: writeVslScript()
responsavel: "@stefan-georgi"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: product
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: offer
    tipo: object
    origem: User Input
    obrigatorio: true

Saida:
  - campo: vsl_script
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Framework RMBC totalmente executado (todas as 4 seções)"
  - "[ ] Gancho convincente nos primeiros 60 segundos"
  - "[ ] Sinais de direção visual e notas de produção incluídos"
---

# Tarefa: Escrever Roteiro de VSL

**ID da Tarefa:** COPY-003
**Versão:** 1.0.0
**Comando:** `*write-vsl-script`
**Agente:** Stefan Georgi (stefan-georgi)
**Objetivo:** Escrever um roteiro de Video Sales Letter (VSL — Carta de Vendas em Vídeo) usando o método RMBC.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| product | string | Prompt do usuário | Sim | Produto/serviço com a transformação que entrega |
| audience | string | Prompt do usuário | Sim | Público-alvo com estado emocional e desejos |
| offer | object | Prompt do usuário | Sim | Preço, garantia, bônus, urgência |
| duration_target | string | Prompt do usuário | Não | curta (10-15min), média (20-30min), longa (45-60min) — padrão: média |
| unique_mechanism | string | Prompt do usuário | Não | O que torna esta solução diferente |
| proof_elements | list | Prompt do usuário | Não | Depoimentos, resultados, credenciais |
| platform | string | Prompt do usuário | Não | Onde a VSL vai rodar (landing page, YouTube, webinar) |

---

## Pré-condições

- Transformação do produto claramente definida (estado antes/depois)
- Estrutura da oferta completa com preço e garantia
- Gatilhos emocionais do público-alvo identificados

---

## Fases de Execução

### Fase 1: Configuração do Framework RMBC
1. **R — Relate (Relacionar):** Defina a história ou cenário de abertura identificável
   - Identifique um momento que o prospecto já viveu
   - Escolha o ângulo narrativo em primeira ou segunda pessoa
   - Mapeie o gancho emocional (frustração, vergonha, medo, desespero)
2. **M — Mechanism (Mecanismo):** Defina o mecanismo único
   - Nomeie o mecanismo (dê a ele um nome proprietário, se possível)
   - Explique por que todo o resto falhou (invalide os concorrentes)
   - Construa credibilidade para o mecanismo com prova ou lógica
3. **B — Benefits (Benefícios):** Empilhe os benefícios em ordem emocional
   - Comece com a transformação nº 1
   - Adicione em camadas benefícios secundários que pintam a "nova vida"
   - Use a projeção do futuro (future-pacing) para tornar os benefícios viscerais
4. **C — Close (Fechamento):** Estruture a sequência de fechamento
   - Estratégia de ancoragem de preço
   - Posicionamento da garantia
   - Empilhamento de bônus com chamadas de valor individuais
   - Elemento de urgência/escassez
   - CTA final com o próximo passo exato

### Fase 2: Escrita do Roteiro
1. Escreva o gancho (primeiros 60 segundos) — deve parar a rolagem da tela e conquistar a atenção
2. Escreva a seção "relate" com arco de história (luta → descoberta → transformação)
3. Faça a transição para a revelação do mecanismo com uma interrupção de padrão (pattern interrupt)
4. Apresente os benefícios usando a linguagem do "imagine..." e do "e se...".
5. Insira blocos de prova entre as seções principais (depoimentos, estatísticas, demonstrações)
6. Escreva o fechamento com revelação do preço, empilhamento, garantia e urgência
7. Adicione bumps e copy de formulário de pedido (order form), se aplicável
8. Escreva o fechamento "walk away" (ir embora) — o que acontece se eles não fizerem nada

### Fase 3: Notas de Produção
1. Adicione sinais de direção visual/de slides entre colchetes
2. Marque pontos de ênfase para modulação de voz
3. Identifique onde devem aparecer cenas de B-roll ou filmagem de demonstração
4. Estime a duração com base no ritmo de fala de 150 palavras/minuto
5. Sinalize as seções que podem ser cortadas para versões mais curtas

---

## Formato de Saída

```markdown
## Roteiro de VSL: {Nome do Produto}

**Método:** RMBC (Relate-Mechanism-Benefits-Close)
**Duração-Alvo:** {X} minutos (~{Y} palavras)
**Audiência:** {audiência}
**Gancho Emocional:** {emoção primária}
**Mecanismo Único:** {nome do mecanismo}

---

### GANCHO (0:00 - 1:00)
{Roteiro do gancho de abertura}
[VISUAL: {direção}]

### RELATE ({Relacionar}) (1:00 - {X}:00)
{Seção de história identificável}
[VISUAL: {direção}]

### MECHANISM ({Mecanismo}) ({X}:00 - {Y}:00)
{Revelação e explicação do mecanismo}
[VISUAL: {direção}]

### BENEFITS ({Benefícios}) ({Y}:00 - {Z}:00)
{Empilhamento de benefícios com projeção do futuro}
[VISUAL: {direção}]

### BLOCOS DE PROVA
{Inserções de depoimento/prova com marcações de tempo}

### CLOSE ({Fechamento}) ({Z}:00 - FIM)
{Revelação de preço, empilhamento, garantia, urgência, CTA}
[VISUAL: {direção}]

---

### Notas de Produção
- **Duração estimada:** {X} minutos
- **Contagem de palavras:** {Y}
- **Principais momentos visuais:** {lista}
- **Testes A/B sugeridos:** {variante de gancho, variante de fechamento}
```

---

## Condições de Veto

- NUNCA pule a seção Relate — sem conexão emocional a VSL fracassa
- NUNCA revele o produto antes de estabelecer o mecanismo
- NUNCA apresente o preço sem antes ancorar a um valor mais alto
- NUNCA escreva uma VSL sem sinais de direção visual/de slides
- NUNCA exceda a duração-alvo em mais de 20%

---

## Critérios de Conclusão

- [ ] Framework RMBC totalmente executado (todas as 4 seções presentes)
- [ ] Gancho é convincente nos primeiros 60 segundos
- [ ] Mecanismo único nomeado e explicado
- [ ] Blocos de prova inseridos entre as seções principais
- [ ] Fechamento inclui ancoragem de preço, garantia, empilhamento de bônus, urgência
- [ ] Sinais de direção visual incluídos do início ao fim
- [ ] Estimativa de duração calculada
- [ ] Notas de produção fornecidas
