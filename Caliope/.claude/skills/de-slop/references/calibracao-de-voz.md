---
tipo: nota
area: Caliope
up: "[[Caliope/_MOC-caliope]]"
relacionado:
  - "[[Caliope/.claude/skills/de-slop/references/checklist-e-scorecard|checklist-e-scorecard]]"
  - "[[Caliope/.claude/skills/de-slop/references/guia-falso-positivo|guia-falso-positivo]]"
  - "[[Caliope/.claude/skills/de-slop/references/padroes-anti-ia|padroes-anti-ia]]"
---

# Calibração de voz

Tirar os padrões de IA é metade do trabalho. Texto estéril, sem voz, denuncia tanto quanto
o slop. Bom texto tem gente por trás. Esta referência cobre duas coisas: **espelhar a voz
do autor** (quando há amostra) e **injetar alma** (quando o gênero pede).

---

## 1. Espelhar a voz do autor (quando há amostra)

Se o usuário fornecer uma amostra da própria escrita, analise-a **antes** de reescrever.

**Leia a amostra e anote:**
- **Tamanho de frase** — curtas e secas? longas e fluidas? misturadas?
- **Nível de léxico** — coloquial? acadêmico? meio-termo?
- **Como abre os parágrafos** — vai direto ao ponto? contextualiza antes?
- **Pontuação habitual** — usa muito parêntese? ponto e vírgula? reticências?
- **Tiques e bordões** — alguma expressão que se repete?
- **Transições** — usa conectivo explícito ("portanto", "além disso") ou já emenda o
  próximo ponto?
- **Regionalismos e registro** — gírias, "a gente" vs "nós", "você" vs "tu".

**Espelhe na reescrita.** Não basta remover o padrão de IA: troque-o por um padrão da
amostra. Se o autor escreve frases curtas, não devolva frases longas. Se ele usa "coisa" e
"trem", não promova para "elemento" e "componente". A meta não é "limpo e genérico" — é
*esta pessoa* escrevendo.

**Como o usuário fornece a amostra:**
- Inline: "Humanize este texto. Aqui vai um exemplo da minha escrita para calibrar: [...]"
- Arquivo: "Humanize este texto usando meu estilo em [caminho do arquivo]."

**Sem amostra:** caia no comportamento padrão da seção 2 (voz natural, variada, com opinião
quando o gênero permitir).

---

## 2. Alma — injetar voz, opinião e ritmo

**Aplique esta seção só quando o conteúdo e a voz do autor pedirem** — post, ensaio,
opinião, texto pessoal, copy de marca com personalidade. Em texto técnico, jurídico,
enciclopédico ou de referência, **neutro e direto É a voz humana correta**; não injete
opinião nem primeira pessoa ali.

### Sinais de texto sem alma (mesmo "limpo")
- Toda frase com o mesmo tamanho e a mesma estrutura.
- Só relato neutro, nenhuma opinião.
- Nenhum reconhecimento de incerteza ou sentimento ambíguo.
- Nenhuma primeira pessoa onde caberia.
- Sem humor, sem aresta, sem personalidade.
- Lê como verbete de enciclopédia ou release de imprensa.

### Como dar voz

**Tenha opinião.** Não só relate o fato, reaja a ele. "Confesso que não sei bem o que achar
disso" é mais humano do que listar prós e contras com neutralidade.

**Varie o ritmo.** Frase curta e seca. Depois uma mais longa, que respira e leva o leitor
com calma até onde quer chegar. Misture.

**Deixe entrar alguma imperfeição.** Estrutura perfeita demais soa de máquina. Digressões,
apartes e pensamentos pela metade são humanos.

### Antes (limpo, mas sem pulso)
> O experimento gerou resultados interessantes. Os agentes produziram 3 milhões de linhas de
> código. Alguns desenvolvedores ficaram impressionados, outros céticos. As implicações ainda
> não estão claras.

### Depois (com pulso)
> Confesso que não sei o que sentir sobre essa. Três milhões de linhas de código, geradas
> enquanto, presume-se, os humanos dormiam. Metade da comunidade dev está surtando, a outra
> metade explica por que não vale. A verdade deve estar em algum ponto chato no meio. Mas
> eu fico pensando naqueles agentes virando a noite.

---

## Regra de ouro da calibração

Voz correta é a do **gênero + autor**, não "personalidade" jogada por cima. Antes de
injetar alma, pergunte: este texto é opinativo ou de referência? Há amostra do autor? O
default de um manual de API não é "ter pulso" — é ser claro. O default de um ensaio
pessoal não é neutro — é ter ponto de vista.
