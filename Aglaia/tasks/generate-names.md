---
task: generateNames()
responsavel: "@naming-strategist"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: what
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: positioning
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: Estratégia de Naming com Finalistas
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] 30-50 candidatos brutos gerados em 4+ categorias"
  - "[ ] Todos os candidatos pontuados em 7 critérios"
  - "[ ] 3-5 finais apresentados com perfis completos"
---

# Tarefa: Gerar Nomes

**Task ID:** BRAND-006
**Version:** 1.0.0
**Comando:** `*generate-names`
**Agente:** Naming Strategist (naming-strategist)
**Propósito:** Desenvolver candidatos a nome por meio de metodologia criativa estruturada e avaliação estratégica.

---

## Entradas

| Campo | Tipo | Origem | Obrigatório | Validação |
|-------|------|--------|----------|------------|
| what | string | Prompt do usuário | Sim | O que está sendo nomeado (empresa, produto, funcionalidade, serviço) |
| positioning | string | Prompt do usuário | Sim | Posicionamento ou proposta de valor |
| audience | string | Prompt do usuário | Sim | Público-alvo |
| tone | string | Prompt do usuário | Não | Tom desejado (moderno, clássico, lúdico, sério, técnico) |
| constraints | list | Prompt do usuário | Não | Limites de comprimento, requisitos de idioma, sons a evitar |
| domain_needed | boolean | Prompt do usuário | Não | Se a disponibilidade de domínio .com importa |
| category_names | list | Prompt do usuário | Não | Nomes de concorrentes para evitar similaridade |

---

## Pré-condições

- O que está sendo nomeado está claramente definido
- O posicionamento fornece contexto suficiente para gerar nomes relevantes

---

## Fases de Execução

### Fase 1: Estratégia de Naming
1. Definir os objetivos de naming:
   - Deve transmitir: {o que o nome deve comunicar}
   - Deve transmitir a sensação: {a qualidade emocional/tonal}
   - Deve evitar: {associações, sons ou sobreposição com concorrentes}
2. Selecionar as categorias de naming a explorar:
   - **Descritivo:** Diz o que faz (PayPal, YouTube)
   - **Sugestivo:** Implica uma qualidade ou benefício (Slack, Sprint)
   - **Abstrato:** Cunhado ou inventado (Kodak, Xerox)
   - **Metafórico:** Significado emprestado (Amazon, Apple)
   - **Sigla:** Iniciais ou abreviação (IBM, BMW)
   - **Fundador/Pessoal:** Nomeado em homenagem a uma pessoa (Tesla, Disney)
   - **Composto:** Duas palavras combinadas (Facebook, Snapchat)
3. Alocar a exploração em pelo menos 4 categorias
4. Definir os critérios de avaliação antes de gerar nomes

### Fase 2: Geração de Nomes
1. Gerar de 30-50 candidatos brutos de nome nas categorias selecionadas
2. Para cada categoria, usar técnicas específicas:
   - Descritivo: Combinar palavras de função com modificadores
   - Sugestivo: Usar etimologia, raízes de palavras e simbolismo sonoro
   - Abstrato: Criar novas palavras usando fonéticas agradáveis
   - Metafórico: Garimpar mitologia, natureza, ciência e cultura
   - Composto: Emparelhar combinações inesperadas de palavras
3. Aplicar princípios fonéticos:
   - Nomes fortes frequentemente começam com consoantes duras (K, T, P, B)
   - Nomes curtos (1-3 sílabas) são mais memoráveis
   - Terminações em vogal soam amigáveis e acessíveis
   - Terminações em consoante soam fortes e decididas
4. Verificar cada nome quanto a significados não intencionais nos principais idiomas

### Fase 3: Avaliação e Seleção
1. Pontuar cada nome em 7 critérios (1-5 cada):
   - **Memorabilidade:** Fácil de lembrar após ouvir uma vez
   - **Pronunciabilidade:** Fácil de dizer sem explicação
   - **Grafabilidade:** Fácil de escrever após ouvir
   - **Distintividade:** Diferente dos concorrentes
   - **Relevância:** Conecta-se ao posicionamento ou valor
   - **Escalabilidade:** Funciona à medida que a marca cresce para novas áreas
   - **Ressonância Emocional:** Evoca o sentimento certo
2. Classificar pela pontuação total e selecionar os 10 melhores
3. Dos 10 melhores, recomendar os 3-5 finais com justificativa completa
4. Anotar a potencial disponibilidade de domínio para os finalistas (se o domínio importar)

### Fase 4: Apresentação dos Nomes
1. Para cada finalista, fornecer:
   - Nome e guia de pronúncia
   - Categoria e etimologia
   - O que comunica
   - Como pontua em todos os critérios
   - Possível combinação com slogan
   - Possibilidades visuais (como poderia parecer como wordmark)
2. Fornecer o "azarão" (dark horse) — um nome inesperado que poderia funcionar
3. Sugerir os próximos passos: busca de marca registrada, aquisição de domínio, teste com grupo focal

---

## Formato de Saída

```markdown
## Estratégia de Naming: {O Que Está Sendo Nomeado}

**Posicionamento:** {declaração}
**Tom:** {tom desejado}
**Público:** {público}

---

### 5 Finalistas Principais

#### 1. {Nome}
**Categoria:** {tipo}
**Etimologia:** {origem e significado}
**Comunica:** {o que diz sobre a marca}
**Pronúncia:** {guia fonético}
**Combinação com Slogan:** {slogan sugerido}
**Pontuações:** Mem {X} / Pro {X} / Gra {X} / Dis {X} / Rel {X} / Esc {X} / Emo {X} = **{Total}/35**

#### 2-5: ...

### Azarão (Dark Horse)
{Opção inesperada com justificativa}

### Lista Completa de Candidatos

| # | Nome | Categoria | Pontuação Total | Notas |
|---|------|----------|-------------|-------|

### Rejeitados com Justificativa
| Nome | Por Que Foi Rejeitado |
|------|-------------|

### Próximos Passos
1. Busca de marca registrada para os 3 melhores
2. Verificação de disponibilidade de domínio
3. Teste de reação do público
```

---

## Condições de Veto

- NUNCA submeter menos de 30 candidatos brutos — a quantidade viabiliza a qualidade
- NUNCA recomendar nomes sem verificar significados negativos em outros idiomas
- NUNCA recomendar nomes que sejam impronunciáveis sem um guia
- NUNCA gerar nomes de apenas uma categoria — a diversidade revela as melhores opções
- NUNCA pular os critérios de avaliação — intuição não é estratégia de naming

---

## Critérios de Conclusão

- [ ] Estratégia de naming definida com objetivos e restrições
- [ ] 30-50 candidatos brutos gerados em 4+ categorias
- [ ] Todos os candidatos pontuados em 7 critérios
- [ ] 10 melhores identificados e classificados
- [ ] 3-5 finais apresentados com perfis completos
- [ ] Opção azarão (dark horse) incluída
- [ ] Nomes rejeitados documentados com justificativa
- [ ] Próximos passos definidos (marca registrada, domínio, teste)
