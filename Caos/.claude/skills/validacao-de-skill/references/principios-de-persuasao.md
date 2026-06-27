# Princípios de persuasão para desenhar habilidades de disciplina

LLMs respondem aos mesmos princípios de persuasão que humanos. Entender essa psicologia ajuda a
desenhar habilidades que são **de fato cumpridas sob pressão** — não para manipular, mas para
garantir que práticas críticas (TDD, verificação antes de concluir, regras de segurança) não
sejam abandonadas na primeira tentação. É o material que o teste de pressão (`validacao-de-skill`)
mede: uma habilidade de disciplina mal redigida desmorona quando o agente racionaliza.

> Base empírica citada na fonte: Meincke et al. (2025) testaram 7 princípios em N≈28.000 conversas
> de IA; técnicas de persuasão mais que dobraram a taxa de conformidade (33% → 72%).

## Os princípios aplicados a habilidades

1. **Autoridade** — linguagem imperativa ("VOCÊ DEVE", "Nunca", "Sempre"), enquadramento
   não-negociável ("sem exceções"). Elimina fadiga de decisão e racionalização. Use em habilidades
   de disciplina e segurança.
   - ✅ "Escreveu código antes do teste? Apague. Comece de novo. Sem exceções."
   - ❌ "Considere escrever testes primeiro quando viável."
2. **Compromisso** — exija anúncio ("Anuncie qual habilidade está usando"), force escolha
   explícita ("escolha A, B ou C"), use todos/checklists rastreáveis. Garante que a habilidade
   seja de fato seguida.
3. **Escassez** — requisitos com prazo ("antes de prosseguir"), dependência sequencial
   ("imediatamente após X"). Mata o "faço depois".
4. **Prova social** — referência ao que é norma/prática estabelecida ("a prática padrão é…").
5. **Reciprocidade**, 6. **Afinidade**, 7. **Unidade** — completam os sete; menos usados em
   habilidades técnicas, úteis em personas de revisão/colaboração.

## Padrão "Red Flags — PARE e recomece"
A forma mais eficaz de combater racionalização é dar ao agente uma lista de auto-checagem das
desculpas que ele mesmo usaria:

```markdown
## Red Flags — PARE e recomece
- Código antes do teste
- "Já testei manualmente"
- "Teste depois cumpre o mesmo papel"
- "É sobre o espírito, não o ritual"
- "Este caso é diferente porque…"

Todos significam: apague o código. Recomece com TDD.
```

Cada racionalização que aparecer no teste de pressão vira uma linha nova aqui. É assim que a
habilidade fica "à prova de bala": não por adicionar mais teoria, mas por nomear e fechar a
desculpa específica.

---
*Fonte: `obra--superpowers@896224c4` — `skills/writing-skills/persuasion-principles.md` (MIT,
Jesse Vincent). Princípio reescrito em PT-BR, sem cópia literal. Uso interno Kolden.*
