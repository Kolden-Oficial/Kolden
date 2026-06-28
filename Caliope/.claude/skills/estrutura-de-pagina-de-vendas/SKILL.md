---
name: estrutura-de-pagina-de-vendas
description: |
  Monta a estrutura completa de uma página de vendas / landing page passo a passo —
  a sequência de seções que conta um argumento persuasivo do topo ao CTA final, com a
  copy de cada bloco. Use quando o pedido for "estruturar uma página de vendas", "montar
  uma landing", "que seções essa página precisa", "minha página não converte / é só uma
  lista de features", "escrever a copy da página de vendas" ou "qual a ordem dos blocos".
  Para escrever só a headline, use headline-e-hook-testaveis. Para a copy de anúncio que
  leva à página, use anuncio-por-estagio-de-consciencia. Para a sequência de e-mail, use
  sequencia-de-email-de-lancamento.
license: MIT
allowed-tools:
  - Read
  - Write
  - Edit
  - Grep
  - Glob
  - AskUserQuestion
---

# Estrutura de página de vendas (PT-BR)

Você monta a **arquitetura persuasiva** de uma página de vendas: não uma lista de features,
e sim um argumento que desce a página resolvendo uma objeção por vez até o leitor agir.
Uma página fraca empilha seções ("feature 1, feature 2, feature 3"). Uma página forte
**conta uma história**: reconhece a dor, mostra a virada, prova que funciona, derruba o medo
e pede a ação.

## Antes de escrever — colha o contexto

Pergunte (ou leia de um briefing, se existir) o mínimo para não escrever no escuro:

1. **Objetivo único da página.** Qual é a UMA ação que o visitante deve tomar? (comprar,
   agendar demo, entrar na lista, baixar). Uma página = um objetivo.
2. **Público e dor.** Quem é, qual problema tenta resolver, que objeções tem, e **com que
   palavras** ele descreve a dor (voz do cliente — espelhe, não invente jargão de empresa).
3. **Oferta.** O que se vende, qual a transformação/resultado, o que diferencia das
   alternativas, e quais provas existem (números, depoimentos, casos).
4. **Origem do tráfego.** De onde vem (anúncio, busca, e-mail) e o que o visitante já sabe
   ao chegar. Tráfego de anúncio exige **casamento de mensagem** com o anúncio.

Sem objetivo único e sem voz do cliente, pare e pergunte. O resto você infere.

## A espinha persuasiva (ordem canônica)

Monte a página nesta sequência. Cada bloco avança UM argumento — não dois.

1. **Herói (acima da dobra)** — headline (a mensagem mais importante), sub-headline
   (especifica, 1-2 linhas), CTA primário e um visual de apoio. Em 5 segundos o visitante
   entende o que é e por que importa. Para a headline, gere e pontue candidatas com a
   habilidade `headline-e-hook-testaveis`.
2. **Barra de prova social** — logos reconhecíveis, um número ("+10.000 times"), nota com
   contagem de avaliações ou um depoimento curto. Credibilidade antes de pedir atenção.
3. **Problema / dor** — articule a dor melhor do que o próprio cliente faria. Gere o
   reconhecimento ("é exatamente a minha situação") e insinue o custo de não resolver.
4. **Solução / benefícios** — a ponte da dor para o produto. 3 a 5 benefícios (não 10),
   cada um: título (o resultado) + explicação (1-2 frases) + prova quando houver.
5. **Como funciona** — 3 a 4 passos numerados (verbo simples + resultado). Reduz a
   complexidade percebida.
6. **Tratamento de objeções** — FAQ, comparação (vs. concorrente ou vs. status quo /
   planilha / processo manual), garantia. Derrube o motivo nº 1 de não comprar.
7. **CTA final** — recapitula a proposta de valor, repete o CTA e adiciona reversão de
   risco (garantia, teste grátis, "cancele quando quiser").

Blocos de apoio que se encaixam conforme o caso: depoimentos completos (nome, cargo,
empresa, resultado específico), estudo de caso (problema → solução → resultado com número),
casos de uso / "feito para [papel]", integrações, história do fundador, demo/tour,
prévia de preço, seção de números. O catálogo completo + 5 modelos de página prontos
(compacta, B2B/enterprise, lançamento, completa) está em `references/catalogo-de-secoes.md`.

## Regras de copy de cada bloco

- **Clareza acima de esperteza.** Na escolha entre claro e criativo, escolha claro.
- **Benefício acima de feature.** Feature = o que faz; benefício = o que isso significa
  para o cliente. Sempre faça a ponte "o que significa: ...".
- **Específico acima de vago.** "Economize tempo" → "Corte o relatório semanal de 4 horas
  para 15 minutos". Um número real vence dez adjetivos.
- **Voz do cliente acima de voz da empresa.** Nunca abra com "Nós" ou o nome da empresa;
  reescreva para liderar com o resultado ou a dor do cliente.
- **Uma ideia por seção.** Cada seção empurra um argumento. A página é uma narrativa lógica
  descendo até o CTA.
- **CTA forte** = [verbo de ação] + [o que ele ganha] (+ qualificador). "Começar teste
  grátis" vence "Cadastrar"; "Pegar o checklist completo" vence "Enviar". Evite "Enviar",
  "Saiba mais", "Clique aqui".

## Disparadores proativos (aponte sem ser perguntado)

- Copy abre com "Nós" / nome da empresa → reescreva liderando pelo cliente.
- Proposta de valor vaga ("a melhor plataforma para times") → exija quem, qual resultado,
  em quanto tempo.
- Features listadas sem benefício → adicione a ponte "o que significa" antes de entregar.
- Nenhuma prova social → sinalize como risco de conversão e peça depoimentos/números.
- CTA com verbo fraco → proponha alternativas ação+resultado.

## Formato de saída

Entregue a copy organizada por seção, na ordem da página: para cada bloco, o texto pronto
(título + corpo + CTA quando houver) e uma **anotação curta** dizendo qual princípio ele
aplica. Para headline e CTA, entregue **2-3 alternativas** com a razão de cada uma — nunca
uma só. Marque a confiança de cada peça: forte / testar / precisa de prova para sustentar.

## Loop de revisão antes de devolver

Releia a página inteira: ela conta uma história ou é uma lista? Cada benefício tem a ponte
"o que significa"? Há prova perto de cada afirmação forte e perto do CTA? O objetivo é
único e repetido? Se o texto saiu com cara de IA, passe pela habilidade `de-slop` antes de
entregar.

## Referências

- `references/catalogo-de-secoes.md` — catálogo completo de tipos de seção, dicas de escrita
  por bloco (problema, benefícios, como funciona, depoimentos) e 5 modelos de página.

---

## Atribuição

Habilidade reescrita em PT-BR a partir de fonte MIT (princípios adaptados, sem cópia
literal): **alirezarezvani/claude-skills** (`marketing-skill/skills/copywriting` e
`page-cro`), SHA `4a3c05b69e64f4925f7fc65c88890f614f79caf0`, licença MIT. Absorvida pelo
Caos (Kolden) em 2026-06-27.
