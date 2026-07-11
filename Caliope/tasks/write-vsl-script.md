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
  - "[ ] Hook convincente nos primeiros 60 segundos"
  - "[ ] Marcações de direção visual e notas de produção incluídas"
  - "[ ] Camada Psicológica aplicada (princípios de Cialdini/Warren marcados)"
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/tasks/_indice|_indice]]"
---

# Task: Escrever Roteiro de VSL

**Task ID:** COPY-M-003
**Version:** 2.0.0
**Command:** `*write-vsl-script`
**Agent:** Stefan Georgi (stefan-georgi)
**Purpose:** Escrever um roteiro de Video Sales Letter usando o método RMBC com psicologia da persuasão em camadas.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|-------------|-----------|
| product | string | Prompt do usuário | Sim | Produto/serviço com a transformação que entrega |
| audience | string | Prompt do usuário | Sim | Audiência-alvo com estado emocional e desejos |
| offer | object | Prompt do usuário | Sim | Preço, garantia, bônus, urgência |
| duration_target | string | Prompt do usuário | Não | curto (10-15min), médio (20-30min), longo (45-60min) — padrão é médio |
| unique_mechanism | string | Prompt do usuário | Não | O que torna esta solução diferente |
| proof_elements | list | Prompt do usuário | Não | Depoimentos, resultados, credenciais |
| platform | string | Prompt do usuário | Não | Onde a VSL vai rodar (landing page, YouTube, webinar) |

---

## Pré-condições

- Transformação do produto claramente definida (estado antes/depois)
- Estrutura da oferta completa com preço e garantia
- Gatilhos emocionais da audiência-alvo identificados

---

## Referência de Campeões

Estude estas VSLs campeãs do mundo real antes de escrever:

1. **"The End of America"** (Stansberry Research, Mike Palmer) — VSL de 60 min movida por medo, carregada de prova, gerou US$ 100M+
2. **"Patriot Health Alliance"** (Stefan Georgi) — Execução de manual do RMBC, VSL de suplemento com forte revelação de mecanismo
3. **"Flat Belly Fix"** (Todd Lamb / Stefan Georgi) — VSL de saúde short-form, RMBC apertado, grande vencedora de tráfego frio
4. **"Video Secrets"** (Jon Benson) — Pioneiro do formato de VSL com texto-na-tela, estilo conversacional de micro-compromisso
5. **"The Oxford Club Pitch"** (Agora Financial) — VSL financeira long-form, empilhamento de autoridade + prova social

---

## Fases de Execução

### Fase 1: Configuração do Framework RMBC
1. **R -- Relate (Identificar):** Defina a história ou cenário de abertura identificável
   - Identifique um momento que o prospecto já viveu
   - Escolha o ângulo narrativo em primeira ou segunda pessoa
   - Mapeie o hook emocional (frustração, vergonha, medo, desespero)
2. **M -- Mechanism (Mecanismo):** Defina o mecanismo único
   - Nomeie o mecanismo (dê a ele um nome proprietário, se possível)
   - Explique por que todo o resto falhou (invalide os concorrentes)
   - Construa credibilidade para o mecanismo com prova ou lógica
3. **B -- Benefits (Benefícios):** Empilhe os benefícios em ordem emocional
   - Lidere com a transformação nº 1
   - Camade benefícios secundários que pintem a "nova vida"
   - Use projeção do futuro (future-pacing) para tornar os benefícios viscerais
4. **C -- Close (Fechamento):** Estruture a sequência de fechamento
   - Estratégia de ancoragem de preço
   - Posicionamento da garantia
   - Empilhamento de bônus com chamadas de valor individuais
   - Elemento de urgência/escassez
   - CTA final com o próximo passo exato

### Fase 2: Camada Psicológica
1. Mapeie os princípios de Cialdini na estrutura da VSL:
   - **Seção Relate:** Afinidade (luta compartilhada), Unidade (identidade compartilhada)
   - **Seção Mechanism:** Autoridade (ciência, credenciais), Compromisso (pequenos acordos)
   - **Seção Benefits:** Prova Social (depoimentos), Reciprocidade (insights gratuitos)
   - **Seção Close:** Escassez (tempo/vagas limitadas), Coerência (eles já concordaram)
2. Aplique as 5 alavancas de Blair Warren:
   - Relate = Justificar fracassos + Acalmar medos
   - Mechanism = Confirmar suspeitas + Jogar pedras nos inimigos
   - Benefits = Encorajar sonhos
3. Garanta que cada seção do RMBC ative ao menos 2 princípios psicológicos
4. Documente a arquitetura de persuasão

### Fase 3: Escrita do Roteiro
1. Escreva o hook (primeiros 60 segundos) — deve parar o scroll e conquistar atenção
2. Escreva a seção "relate" com arco de história (luta -> descoberta -> transformação)
3. Faça a transição para a revelação do mecanismo com quebra de padrão
4. Apresente os benefícios usando linguagem de "imagine..." e "e se...".
5. Insira blocos de prova entre as seções principais (depoimentos, estatísticas, demos)
6. Escreva o fechamento com revelação de preço, empilhamento, garantia e urgência
7. Adicione bumps e copy de formulário de pedido, se aplicável
8. Escreva o fechamento "walk away" — o que acontece se eles não fizerem nada

### Fase 4: Notas de Produção
1. Adicione marcações de direção visual/slide entre colchetes
2. Marque os pontos de ênfase para modulação de voz
3. Identifique onde imagens de B-roll ou filmagens de demonstração devem aparecer
4. Estime o tempo de execução a um ritmo de fala de 150 palavras/minuto
5. Sinalize seções que podem ser cortadas para versões mais curtas

---

## Formato de Saída

```markdown
## Roteiro de VSL: {Nome do Produto}

**Método:** RMBC (Relate-Mechanism-Benefits-Close)
**Duração Alvo:** {X} minutos (~{Y} palavras)
**Audiência:** {audiência}
**Hook Emocional:** {emoção principal}
**Mecanismo Único:** {nome do mecanismo}

### Arquitetura de Persuasão
| Seção RMBC | Princípios de Cialdini | Alavancas de Warren |
|------------|------------------------|---------------------|
| Relate | {princípios} | {alavancas} |
| Mechanism | {princípios} | {alavancas} |
| Benefits | {princípios} | {alavancas} |
| Close | {princípios} | {alavancas} |

---

### HOOK (0:00 - 1:00)
{Roteiro do hook de abertura}
[VISUAL: {direção}]

### RELATE (1:00 - {X}:00)
{Seção de história identificável}
[VISUAL: {direção}]

### MECHANISM ({X}:00 - {Y}:00)
{Revelação e explicação do mecanismo}
[VISUAL: {direção}]

### BENEFITS ({Y}:00 - {Z}:00)
{Empilhamento de benefícios com projeção do futuro}
[VISUAL: {direção}]

### BLOCOS DE PROVA
{Inserções de depoimento/prova com timestamps}

### CLOSE ({Z}:00 - FIM)
{Revelação de preço, empilhamento, garantia, urgência, CTA}
[VISUAL: {direção}]

---

### Notas de Produção
- **Tempo de execução estimado:** {X} minutos
- **Contagem de palavras:** {Y}
- **Principais momentos visuais:** {lista}
- **Testes A/B sugeridos:** {variante de hook, variante de fechamento}
```

---

## Condições de Veto

- NUNCA pule a seção Relate — sem conexão emocional a VSL fracassa
- NUNCA revele o produto antes de estabelecer o mecanismo
- NUNCA apresente o preço sem antes ancorar a um valor mais alto
- NUNCA escreva uma VSL sem marcações de direção visual/slide
- NUNCA exceda a duração alvo em mais de 20%

---

## Critérios de Conclusão

- [ ] Framework RMBC totalmente executado (todas as 4 seções presentes)
- [ ] Hook é convincente nos primeiros 60 segundos
- [ ] Mecanismo único nomeado e explicado
- [ ] Blocos de prova inseridos entre as seções principais
- [ ] Fechamento inclui ancoragem de preço, garantia, empilhamento de bônus, urgência
- [ ] Marcações de direção visual incluídas do início ao fim
- [ ] Estimativa de tempo de execução calculada
- [ ] Notas de produção fornecidas
- [ ] Camada Psicológica aplicada — princípios de Cialdini mapeados por seção RMBC
- [ ] Alavancas de Blair Warren identificadas e ativadas
