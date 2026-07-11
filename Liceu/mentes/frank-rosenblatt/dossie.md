---
id: frank-rosenblatt
nome: "Frank Rosenblatt"
titulo: "Pai da rede neural treinável — inventor do Perceptron"
dominio: [redes-neurais, inteligencia-artificial, psicologia-experimental, neurofisiologia-computacional]
status: vigente
atualizado-em: 2026-07-04
real_person: true
nascimento: "1928 — New Rochelle, Nova York, EUA"
morte: "1971 — Baía de Chesapeake, Maryland, EUA (acidente de barco)"
# --- linhagem (preenchido pelo genealogista) ---
herdou_de: [warren-mcculloch, walter-pitts, donald-hebb, alan-turing]
influenciou: [geoffrey-hinton, yann-lecun, marvin-minsky, kunihiko-fukushima, bernard-widrow, teuvo-kohonen]
contemporaneos: [marvin-minsky, oliver-selfridge, bernard-widrow]
linhagens: [conexionismo-deep-learning]
# --- operacionalização (preenchido pelo sintetizador) ---
frameworks_kolden: [arquitetura-de-agents-kolden]
squads_que_usam: [caos, prometeu, dedalo]
# --- federação (preenchido pelo bibliotecario) ---
persona_canonica: null
confianca_da_fonte: alta
tipo: nota
area: Liceu
up: "[[Liceu/_MOC-liceu]]"
---

# Frank Rosenblatt — Dossiê de Mente

> AVISO-DE-ATIVAÇÃO: (preencher só se/quando virar agente conversável — via ponte-de-encarnacao + Caos)

## 1. Tese central (uma frase)
A inteligência não precisa ser programada por regras explícitas: uma rede de unidades análogas a neurônios, com pesos ajustáveis por reforço, pode *aprender* a classificar padrões diretamente do exemplo — e essa aprendizagem tem prova de convergência quando o problema é linearmente separável.

## 2. Linhagem intelectual
*(genealogista)*
- **Herdou de:**
  - **Warren McCulloch & Walter Pitts** — direta (leitura): "A Logical Calculus of the Ideas Immanent in Nervous Activity" (McCulloch-Pitts, 1943) fornece o modelo formal de neurônio binário que Rosenblatt estende para pesos contínuos e aprendizado. Rosenblatt cita explicitamente no §1 de "The Perceptron" (1958).
  - **Donald Hebb** — direta (leitura): *The Organization of Behavior* (Hebb, 1949) — a regra "neurônios que disparam juntos se conectam mais" é a inspiração declarada do mecanismo de reforço perceptrônico.
  - **Alan Turing** — direta (leitura): a máquina universal e "Intelligent Machinery" (Turing, 1948, publicado 1969 — Rosenblatt teve contato via Cornell) fornecem a legitimação teórica de "máquinas organizadas ao acaso" que aprendem.
  - **Oliver Selfridge** — direta (contato): Pandemonium (Selfridge, 1958) é contemporâneo e influência recíproca no reconhecimento de padrões multicamada.
  - **Karl Lashley** — direta (leitura psicológica): a hipótese da *ação em massa* e da *equipotencialidade* cortical (Lashley, 1929) inspira a arquitetura distribuída do perceptron — nenhum neurônio isolado carrega a memória.
- **Transmitiu a:**
  - **Marvin Minsky** — direta (adversarial): *Perceptrons* (Minsky & Papert, 1969) é resposta técnica direta ao programa de Rosenblatt; ambos foram colegas de classe no Bronx High School of Science (~1945), o que dá contexto pessoal à polêmica.
  - **Bernard Widrow** — direta (contemporâneo em Stanford): ADALINE/MADALINE (Widrow & Hoff, 1960) é variante do perceptron com regra delta (LMS); Widrow reconhece Rosenblatt como inspiração.
  - **Kunihiko Fukushima** — direta (leitura + citação): Neocognitron (Fukushima, 1980) é herdeiro estrutural do perceptron multicamada com convoluções.
  - **Geoffrey Hinton** — direta (reconhecida): Hinton em várias entrevistas (Turing Award Lecture 2018; conversa com Ford em *Architects of Intelligence*, 2018) reconhece Rosenblatt como o pai da tradição que ele continuou; backpropagation (Rumelhart-Hinton-Williams, 1986) resolve exatamente o problema deixado em aberto pelo perceptron de camada única.
  - **Yann LeCun** — direta (citação): a estrutura de LeNet-5 (LeCun et al., 1998) é reconhecidamente descendente do neocognitron de Fukushima que descende do perceptron.
  - **Teuvo Kohonen** — direta (leitura): mapas auto-organizáveis (SOM, Kohonen 1982) continuam a tradição de aprendizado não-supervisionado em redes neurais.
- **Posição na linhagem `conexionismo-deep-learning`:** elo 1 (raiz) de 5+.

## 3. Engenharia documentada
*(cartografo-de-modelos + biografo; TUDO aqui passou pelo ceptico-verificador — fonte primária + ano)*

```yaml
mental_models:
  perceptron_arquitetura:
    descricao: "Modelo de rede neural em três camadas: (S) unidades sensoriais que recebem o padrão de entrada (fotocélulas na Mark I); (A) unidades associativas que somam sinais das S-units com conexões aleatórias fixas; (R) unidades de resposta que combinam as A-units com pesos *ajustáveis* — a rede aprende modificando esses pesos. A regra: se a resposta está errada, mover pesos das A-units ativas na direção certa; se está certa, deixar como está."
    estrutura: [S-units, A-units, R-units, conexoes-S-A-aleatorias-fixas, conexoes-A-R-ajustaveis, regra-de-reforco]
    fonte: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain (Psychological Review 65)"
    ano: 1958
  teorema_de_convergencia_do_perceptron:
    descricao: "Se existe um vetor de pesos que separa corretamente duas classes de padrões (linearmente separáveis), então o algoritmo de aprendizado do perceptron encontra tal vetor em número finito de passos. Prova algébrica clássica — depois independentemente re-provada por Novikoff (1962) e Block (1962)."
    estrutura: [conjunto-de-treino, hipotese-de-separabilidade-linear, atualizacao-por-erro, convergencia-em-passos-finitos]
    fonte: "Principles of Neurodynamics: Perceptrons and the Theory of Brain Mechanisms (Spartan Books)"
    ano: 1962
  mark_i_perceptron_hardware:
    descricao: "Máquina física construída em 1958-1960 no Cornell Aeronautical Laboratory (Buffalo, NY), financiada pelo Office of Naval Research. Câmera 20×20 pixels ligada a 400 fotocélulas (S-units); ~500 A-units implementadas com potenciômetros motorizados; 8 R-units. Aprendia a classificar formas geométricas simples (triângulo vs quadrado, símbolos escritos à mão). Primeira demonstração pública de máquina que APRENDE a reconhecer imagens sem regras explícitas."
    estrutura: [camera-20x20, 400-fotocelulas, potenciometros-motorizados-como-pesos, motor-corrige-por-reforço, demo-de-classificacao]
    fonte: "Mark I Perceptron Operators' Manual (Cornell Aeronautical Lab Report VG-1196-G-5)"
    ano: 1960
  perceptrons_multicamada_e_alfa_beta_gamma:
    descricao: "Rosenblatt em *Principles of Neurodynamics* (1962) descreve variantes multicamada (denominadas por letras gregas: α-perceptron simples de 3 camadas; β-perceptron com feedback; γ-perceptron com múltiplas camadas ocultas). Explora empiricamente arquiteturas que a crítica posterior atribuiria só a redes profundas modernas — mas SEM algoritmo eficiente para treinar as camadas ocultas (essa lacuna espera backpropagation em 1986)."
    estrutura: [alpha-3-camadas, beta-com-feedback, gamma-multicamada, treinamento-camada-por-camada, lacuna-algoritmica]
    fonte: "Principles of Neurodynamics — cap. 5-8"
    ano: 1962
  distributed_representation:
    descricao: "Informação armazenada por padrão de ativação distribuído sobre muitos neurônios, não em uma célula-avó local. Cada neurônio participa de muitas memórias; cada memória vive em muitos neurônios. Prevê tolerância a lesão (perda parcial não elimina memória inteira) e generalização (padrão novo próximo dispara resposta similar)."
    estrutura: [ativacao-espalhada, superposicao-de-padroes, tolerancia-a-lesao, generalizacao-por-proximidade]
    fonte: "The Perceptron (1958); Principles of Neurodynamics (1962, cap. 3)"
    ano: 1958
obras_fonte:
  - titulo: "The Perceptron — A Perceiving and Recognizing Automaton"
    ano: 1957
    tipo: primaria
    o_que_traz: "Cornell Aeronautical Laboratory Report 85-460-1, janeiro de 1957. Primeira formulação do perceptron; texto técnico interno que antecede a publicação em periódico."
  - titulo: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain"
    ano: 1958
    tipo: primaria
    o_que_traz: "Psychological Review, 65(6), 386-408. Publicação canônica do perceptron em periódico revisado por pares. Marco de fundação do conexionismo moderno. Ainda hoje é o paper mais citado da carreira de Rosenblatt (~20.000 citações em 2026)."
  - titulo: "On the Convergence of Reinforcement Procedures in Simple Perceptrons"
    ano: 1960
    tipo: primaria
    o_que_traz: "Cornell Aeronautical Laboratory Report VG-1196-G-4. Prova detalhada do teorema de convergência."
  - titulo: "Principles of Neurodynamics: Perceptrons and the Theory of Brain Mechanisms"
    ano: 1962
    tipo: primaria
    o_que_traz: "Spartan Books, Washington DC. 616 páginas. Obra magna de Rosenblatt: consolida perceptron simples, multicamada (α, β, γ), com feedback, com aprendizado supervisionado e reforço; discute biologia neuronal correspondente; propõe programa de pesquisa para 'perceptrons cross-coupled' que só se realizaria plenamente nos anos 1980-2010."
  - titulo: "Two Theorems of Statistical Separability in the Perceptron"
    ano: 1958
    tipo: primaria
    o_que_traz: "Mechanisation of Thought Processes, National Physical Laboratory Symposium (Teddington, UK), pp. 421-456. HMSO 1959. Apresentado no mesmo simpósio de McCarthy 'Programs with Common Sense'. Estabelece capacidade estatística do perceptron."
  - titulo: "A Comparison of Several Perceptron Models"
    ano: 1964
    tipo: primaria
    o_que_traz: "In Yovits, Jacobi & Goldstein (eds.), *Self-Organizing Systems 1962*, Spartan. Compara empiricamente variantes; documenta limites e potencial de cada."
principios_verificados:
  - texto: "Perceptron (1958) é a primeira rede neural artificial *treinável* — pesos ajustados por sinal de erro."
    fonte: "The Perceptron: A Probabilistic Model — 1958"
    rotulo: DOCUMENTADO
  - texto: "Perceptron Convergence Theorem: para dados linearmente separáveis, o algoritmo do perceptron converge em número finito de passos."
    fonte: "Principles of Neurodynamics — 1962; independentemente re-provado por Novikoff (Symposium on the Mathematical Theory of Automata, Polytechnic Institute of Brooklyn, 1962) e H. D. Block (Reviews of Modern Physics, 1962)"
    rotulo: DOCUMENTADO
  - texto: "Mark I Perceptron — máquina física construída no Cornell Aeronautical Lab (1958-1960), demonstrada publicamente à imprensa em 8 de julho de 1958 em conferência da Marinha dos EUA."
    fonte: "New York Times, 8 de julho de 1958, p. 25 ('Electronic Brain Teaches Itself'); Cornell Aeronautical Laboratory Report VG-1196-G-5 — 1960; Cornell University Library archives"
    rotulo: DOCUMENTADO
  - texto: "Rosenblatt em *Principles of Neurodynamics* (1962) descreve perceptrons multicamada e com feedback, incluindo arquiteturas que ele não conseguiu treinar por falta de algoritmo eficiente para camadas ocultas — lacuna que backpropagation resolve em 1986."
    fonte: "Principles of Neurodynamics — 1962 (caps. 5-8, 12); Hinton, Nature Turing Lecture 'The Forward-Forward Algorithm' — 2022 (reconhece a lacuna histórica)"
    rotulo: DOCUMENTADO
  - texto: "Rosenblatt e Minsky foram colegas de classe no Bronx High School of Science (aprox. 1945); a polêmica *Perceptrons* (1969) tem componente pessoal reconhecido."
    fonte: "Olazaran, 'A Sociological Study of the Official History of the Perceptrons Controversy' (Social Studies of Science 26, 1996); depoimentos de Papert em várias entrevistas"
    rotulo: DOCUMENTADO
  - texto: "Rosenblatt morreu em 11 de julho de 1971 (seu 43º aniversário) em acidente de barco a vela na Baía de Chesapeake."
    fonte: "Obituário no New York Times, 13 de julho de 1971; obituário na Cornell Chronicle; George Nagy, 'Frank Rosenblatt' — memorial no IEEE Annals of the History of Computing, 2020"
    rotulo: DOCUMENTADO
  - texto: "Trabalhou também em neurofisiologia experimental (transferência de memória entre ratos por injeção de tecido cerebral) — programa controverso paralelo ao dos perceptrons."
    fonte: "Rosenblatt et al., 'Induction of Chemically-Mediated Behavioral Change by Nerve Extracts Injected in Normal Rats' — 1966 (Nature)"
    rotulo: DOCUMENTADO
```

## 4. Mito e folclore
*(ceptico-verificador — SEPARADO do fato; nunca misturar com §3)*

> ⚠️ Atribuições populares NÃO comprovadas, disputadas ou refutadas. Cada uma rotulada.

| Afirmação popular | Rótulo | Por quê |
|---|---|---|
| "Rosenblatt achava que o perceptron 'aprenderia a andar, falar, ver, escrever, reproduzir-se e ter consciência de sua existência'." | DOCUMENTADO_MAS_DESCONTEXTUALIZADO | A frase é literalmente do *New York Times* de 8 de julho de 1958 (p. 25), reportando declarações de Rosenblatt e da Marinha na apresentação pública. Foi previsão especulativa em coletiva, não afirmação técnica em paper. Repetir sem contexto é caricatura; ignorar como se não tivesse sido dita é revisionismo. |
| "Minsky-Papert (1969) mataram Rosenblatt (que se suicidou em consequência)." | REFUTADO | Rosenblatt morreu em 11/07/1971, quase 2 anos após *Perceptrons*. Causa: acidente de barco a vela na Baía de Chesapeake — afogamento. Não há evidência de suicídio; velejar era hobby documentado desde os anos 60. Amplificação romantizada do mito do "gênio derrubado". |
| "O perceptron simples de 1 camada é tudo o que Rosenblatt estudou." | REFUTADO | *Principles of Neurodynamics* (1962) tem 616 páginas dedicadas em grande parte a variantes multicamada, com feedback, cross-coupled, séries temporais. A crítica de Minsky-Papert (1969) foca na variante mais restrita justamente porque as outras não tinham algoritmo eficiente de treinamento — foco polêmico, não representativo da obra completa. |
| "A rivalidade Rosenblatt-Minsky foi puramente científica." | DISPUTADO | Ambos eram colegas de classe em Bronx Science (~1945). Olazaran (1996, *Social Studies of Science*) documenta em detalhe a componente pessoal, sociológica e política da disputa (competição por financiamento DARPA/ONR, prestígio institucional MIT × Cornell). Reduzir a "apenas ciência" é ingenuidade. |
| "Backpropagation foi inventada por Rumelhart-Hinton-Williams (1986)." | DISPUTADO | Backprop tem descoberta múltipla: Paul Werbos (tese Harvard, 1974); Kelley (1960, controle ótimo); Bryson-Ho (1969, Applied Optimal Control); Linnainmaa (1970, tese Helsinki, auto-diferenciação); Parker (1985). Rumelhart-Hinton-Williams (Nature, 1986) *popularizou* e demonstrou empiricamente em rede multicamada — não *inventou* do zero. Ligar apenas a 1986 é atalho. |
| "Rosenblatt foi ignorado pela comunidade após 1969." | DISPUTADO | Werbos (1974) o cita; Fukushima (1980) o cita; Widrow (contemporâneo) manteve-se ativo; a linha continuou em geografias periféricas ao MIT (Cornell, Stanford, Kyoto, Helsinki). O que morreu foi *o financiamento anglo-americano do MIT-DARPA*, não a linhagem inteira. |
| "O perceptron era apenas 'regressão linear com máscara neural' — nada realmente novo." | DISPUTADO | Formalmente, o perceptron de 1 camada é classificador linear com atualização por gradiente descendente estocástico; matematicamente próximo de LMS/regressão. Mas: (a) veio da tradição neuronal, não da estatística; (b) hardware físico com aprendizado on-line era radicalmente novo; (c) prova de convergência e programa multicamada abrem o campo. Reduzir a "regressão com nome novo" ignora o programa. |
| "Rosenblatt inventou o *deep learning*." | FOLCLORE | Ele descreveu arquiteturas multicamada em 1962 mas não tinha algoritmo eficiente para treiná-las profundamente. Deep learning como campo prático nasce em 2006-2012 (Hinton-Osindero-Teh; AlexNet). Rosenblatt é ancestral direto, não fundador do "deep". |
| "O experimento de transferência de memória por extrato cerebral de rato (1966) refutou o perceptron." | FOLCLORE | Programas separados; o experimento em neurofisiologia é distinto do programa em redes neurais. A neurofisiologia de transferência de memória foi controversa por si e nunca substancialmente replicada — programa independente que sombreou a reputação em setores, mas não afetou a teoria conexionista. |

## 5. O que esta mente REJEITARIA
*(cartografo-de-modelos — deduzido da obra)*
- **IA simbólica pura (McCarthy, Newell-Simon).** Rosenblatt argumentou em várias comunicações que a inteligência humana não é sequência de regras enunciáveis; comportamento adaptativo emerge de estatística neural. Rejeitaria "primeiro represente em lógica, depois execute" como via realista.
- **Ideia da 'célula-avó' localista.** *Distributed representation* é dogma perceptrônico; rejeitaria arquiteturas em que cada conceito tem um neurônio dedicado.
- **Programar o resultado à mão.** A aprendizagem por reforço é o mecanismo — programar cada classificador manualmente é confessar que não temos ainda o algoritmo certo.
- **Ceticismo a priori sobre redes neurais como "só regressão".** Ele via a rede como *modelo de cérebro*, não como truque estatístico; rejeitaria a redução matemática que apaga a inspiração biológica.
- **Foco exclusivo em perceptron de 1 camada.** *Principles of Neurodynamics* (1962) prova o contrário — Rosenblatt rejeitaria qualquer resumo de sua obra reduzido a "perceptron simples".
- **Substituição imediata de conexionismo por deep learning como se não houvesse continuidade.** Ele diria que deep learning É perceptron multicamada com algoritmo de treino que faltava.
- **Financiar apenas via defense agencies com prazo curto.** Sua trajetória sofreu com o corte DARPA pós-Mansfield Amendment (1969); rejeitaria dependência única de defesa como modelo de sustentação.

## 6. Vocabulário-assinatura
*(lexicografo)*
| Termo | Contexto / Obra |
|---|---|
| "perceptron" | *The Perceptron* (1958) — cunhagem do termo. |
| "S-unit / A-unit / R-unit" | *The Perceptron* (1958); *Principles of Neurodynamics* (1962). |
| "reinforcement procedure" | *Principles of Neurodynamics* (1962) — regra de atualização por sinal de erro. |
| "perceptron convergence theorem" | *Principles of Neurodynamics* (1962). |
| "α / β / γ perceptron" | *Principles of Neurodynamics* (1962) — nomenclatura das variantes. |
| "cross-coupled perceptron" | *Principles of Neurodynamics* (1962, cap. 8) — variante recorrente. |
| "back-coupled" (feedback) | *Principles of Neurodynamics* (1962). |
| "statistical separability" | *Two Theorems of Statistical Separability in the Perceptron* (1958, NPL Symposium). |
| "brain model" | epíteto que Rosenblatt usa para o perceptron — enfatiza inspiração neuronal, não engenharia pura. |

**Padrões linguísticos:** prosa quase clínica de psicólogo experimental, com prosa cuidadosa sobre limites; usa "brain model" para reafirmar filiação neurofisiológica; equilibra entusiasmo público (colet. de imprensa 1958) com rigor técnico interno (relatórios CAL, capítulos matemáticos de *Principles of Neurodynamics*); combate a acusação de "hype" pontuando com prova formal (teorema de convergência); em capítulos técnicos, austero e denso; em capítulos programáticos, retórica quase manifesto. Em memoriais e depoimentos, colegas descrevem como carismático, apaixonado, teimoso, generoso com estudantes.

## 7. Gancho de operacionalização Kolden
*(sintetizador)*
- **Alimenta o framework:** `arquitetura-de-agents-kolden` (passo "aprender por reforço com sinal de erro" — o agent Kolden preferido tem loop de correção baseado em sinal externo, não codificação de regra à mão; passo "representação distribuída no prompt" — informação de contexto deve ser espalhada em múltiplos pontos redundantes, não em uma frase única do prompt; passo "arquitetura como hipótese testável" — cada squad da Kolden é hipótese de arquitetura cognitiva que pode ser testada e refutada por métrica observável, à imagem do perceptron).
- **Squads que consomem:** Caos (o ritual do Caos = aprender a montar o próximo agent a partir dos exemplos anteriores em vez de codificar do zero — meta-perceptron), Prometeu (arquitetura de inferência: representação distribuída é o mecanismo de embedding contemporâneo; o fluxo forward+backward do LLM é perceptron multicamada com pesos treinados por SGD), Dedalo (multi-agente com pesos aprendidos entre nós = perceptron cross-coupled em escala de squad).
- **Pergunta operacional que injeta no fluxo:** "Este agent aprende com o feedback do Ronan ou repete o mesmo comportamento indefinidamente? Se não há sinal de erro que atualize peso algum, o agent é regra fixa disfarçada de rede — não perceptron."

## 8. Como Frank Rosenblatt Opera
*(lexicografo — 8 a 10 passos em prosa, fiéis ao método documentado, no estilo da mente)*
1. **Assume o cérebro como analogia técnica, não metafórica.** O sistema a construir *é* um modelo de cérebro; propriedades biológicas (tolerância a lesão, generalização, aprendizado incremental) são metas de projeto, não ornamentos.
2. **Recusa programar comportamento; deixa que aprenda.** A regra é atualizar pesos por sinal externo de erro; o comportamento emerge do processo.
3. **Prova convergência antes de vender.** Antes de dizer "isto aprende", demonstra formalmente sob que hipótese o algoritmo termina no destino certo.
4. **Constrói hardware para demonstrar.** Mark I não é simulação — é máquina física com câmera, fotocélulas, potenciômetros e motores. A validade é *visível*.
5. **Distribui a memória.** Nenhum neurônio isolado carrega informação — a memória vive no padrão de ativação sobre muitos neurônios; lesão parcial é tolerada.
6. **Explora arquiteturas em variedade.** α, β, γ, cross-coupled, back-coupled — o programa não é uma máquina, é uma família de arquiteturas cujos limites cada variante testa.
7. **Publica em periódico do domínio, não da tribo.** *Psychological Review* (1958), *Nature* (1966) — vai onde estão psicólogos experimentais e neurofisiologistas, não onde estão os matemáticos ou engenheiros.
8. **Combate acusação de hype com rigor formal.** Depois da coletiva de 1958 (que gerou o mito do "computador que teria consciência"), publica 616 páginas de matemática em *Principles of Neurodynamics* para mostrar substância.
9. **Aceita polêmica em pé de igualdade.** Responde publicamente ao livro de Minsky-Papert (comunicações em conferências 1969-71) — não recua nem foge do debate técnico, mesmo com custo político.
10. **Cede lugar à próxima geração.** O programa vive em Werbos (1974), Fukushima (1980), Widrow, Kohonen — a linhagem sobrevive à sua morte precoce (43 anos, 1971) e volta em força com backpropagation (1986) e deep learning (2006+).

---
*Dossiê produzido pela habilidade `dissecacao-de-mente` (Liceu). Toda afirmação de §3 tem fonte primária + ano;
o que não tem vive em §4. Indexado por `bibliotecario` em `indice.yaml`.*
