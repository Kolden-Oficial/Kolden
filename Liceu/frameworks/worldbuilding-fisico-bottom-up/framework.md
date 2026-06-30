---
slug: worldbuilding-fisico-bottom-up
titulo: "Worldbuilding físico bottom-up"
resumo: "Construir mundo coerente exige seguir a ordem da geografia físico-humana — tectônica → clima → hidrologia → biomas → assentamento humano. Top-down ('quero um deserto') falha em coerência interna."
linhagem: geografia-fisico-humana
mentes_fonte: [vladimir-koppen, alexander-von-humboldt]
disciplina_de_origem: geografia-fisico-humana
squads_consumidores: [orfeu]
status: semente
atualizado-em: 2026-06-29
fonte_upstream: "msitarzewski/agency-agents@a597cb6 — academic/geography (MIT)"
tags: [worldbuilding, geografia, ficcao, jogo]
---

# Worldbuilding físico bottom-up

> **Atribuição MIT:** sintetizado a partir do material `academic/geography` do repositório
> [`msitarzewski/agency-agents`](https://github.com/msitarzewski/agency-agents) (commit `a597cb6`),
> licença MIT. Reescrito em PT-BR, sem cópia literal, adaptado ao chassi do Liceu (Kolden).

## Princípio

Mundo ficcional (jogo, narrativa, cenário de marca) é coerente quando sua geografia foi construída
**de baixo para cima** — primeiro a Terra física, depois a vida, depois o humano. Construir
top-down ("eu quero um deserto onde a heroína cresceu") quase sempre produz mapas em que rios
sobem, desertos beiram a praia tropical e cidades grandes existem sem motivo de existir.

A regra é simples: **a Terra define a vida, a vida define o humano** — nunca o contrário.

## Quando usar

- Worldbuilding de jogo (Orfeu, game design).
- Cenário narrativo que precisa ser crível por mais de uma cena (universo de marca, série de copy).
- Diagnóstico de inconsistência num mundo já desenhado ("por que esse mapa parece errado?").

## Passos operacionais (a sequência é o framework)

1. **Tectônica + topografia.** Onde estão as placas? O que se forma onde elas colidem (cordilheira)?
   Onde se afastam (vale, rifte)? **Decisão dessa camada:** o esqueleto do mundo.
2. **Clima.** Latitude (cinturão climático), correntes oceânicas e o terreno do passo 1 → classifique
   por Köppen (tropical, seco, temperado, frio, polar). **Decisão dessa camada:** onde chove,
   onde gela, onde queima.
3. **Hidrologia.** Rios nascem em terreno alto, seguem o gradiente até o mar/lago, **confluem mas
   nunca se bifurcam**. Chuva do passo 2 define o regime de vazão. **Decisão dessa camada:** a
   rede de vida.
4. **Biomas.** Vegetação = função de **clima (2) + solo (1) + água (3)**. Não decida o bioma; ele
   se decide. **Decisão dessa camada:** o que cresce onde, e portanto o que pode ser caçado, colhido
   ou cultivado.
5. **Assentamento humano.** Cidades nascem em **encruzilhada de recurso**: confluência de rios,
   passo de montanha, porto natural, vale fértil, jazida. Reino segue rede de cidades. **Decisão
   dessa camada:** onde existem pessoas e por quê.

## Anexo — Regras invioláveis de hidrologia e clima

Estas regras parecem detalhes e são, na prática, os maiores delatores de mundo amador:

- **Rios não se bifurcam.** Só confluem. Bifurcação aparece em delta no fim do rio, não no meio do
  curso. Mapa com rio que se divide ao meio = erro.
- **Sombra de chuva existe.** Montanha cria deserto **a sotavento** (lado oposto ao vento úmido).
  Por isso o oeste da Patagônia é floresta e o leste é estepe seca.
- **Latitude governa estação.** Equador não tem inverno climático; polos têm noite de meses. Não dá
  para ter "estação de neve no equador" sem altitude.
- **Escala muda exigências.** Um continente do tamanho de Eurásia tem cinturões climáticos múltiplos
  e cordilheiras separando bacias; uma ilha do tamanho da Islândia, não. Decidir a **área em km²**
  cedo evita inconsistência tardia.

## Exemplo aplicado

Pedido: "deserto onde uma cidade-fortaleza guarda a única passagem para o reino verde do outro lado".

Bottom-up correto: (1) cordilheira norte-sul; (2) ventos úmidos vêm de oeste → leste vira deserto
de sombra de chuva; (3) único rio cruza por um passo escavado; (4) oásis no passo, estepe seca em
volta; (5) cidade-fortaleza nasce **inevitável** no passo, porque rio + única rota = encruzilhada
de recurso. Agora o mundo se sustenta sem precisar de regra autoral.

## Anti-padrões

- "Quero deserto aqui" sem justificar climaticamente — vira mapa de cartilha.
- Rio que se divide em duas no meio do curso (delta interno) — erro físico clássico.
- Cidade no nada — sem rio, sem rota, sem recurso, sem porto natural.
- Bioma decidido por estética ("ia ficar bonito") em vez de função do clima + solo.
- Cinturão climático ignorando latitude — selva no polo, geleira no equador (sem altitude que
  justifique).
- Pular o passo 1 e começar pelos biomas — sempre acaba em incoerência.

## Handoff para execução

| Camada do mundo | Squad que aplica | Artefato |
|---|---|---|
| Cenário de jogo (mundo coerente) | **Orfeu** | mapa + dossiê físico do mundo |
| Universo narrativo de marca/série | **Orfeu** + **Caliope** | bíblia de cenário com lastro físico |
| Diagnóstico de mundo inconsistente | **Orfeu** | laudo das 5 camadas com falhas marcadas |

## Procedência

| # | Passo do framework | Disciplina / Escola | Autores históricos | Rótulo |
|---|---|---|---|---|
| 1-3 | Tectônica → clima → hidrologia (ordem causal Terra-primeiro) | Geografia física | **Alexander von Humboldt**, *Cosmos* (1845-1862) — fundou a leitura integrada dos sistemas físicos da Terra | DOCUMENTADO |
| 2 (Köppen) | Classificação climática como função de latitude + temperatura + chuva | Climatologia | **Wladimir Köppen**, classificação climática (1884; revisada 1918) — sistema base da climatologia moderna | DOCUMENTADO |
| 4 (biomas como função do clima+solo+água) | Biogeografia | Síntese da biogeografia clássica | DOCUMENTADO |
| 5 (cidades em encruzilhada de recurso) | Geografia humana / teoria do lugar central | **Walter Christaller**, *Die zentralen Orte in Süddeutschland* (1933) — teoria do lugar central | DOCUMENTADO |
| Anexo: rios não se bifurcam, sombra de chuva, latitude governa estação | Geografia física (regras gerais) | conhecimento consolidado da disciplina | DOCUMENTADO |
| Aplicação a worldbuilding ficcional | Síntese Kolden | — | INTERPRETAÇÃO (a geografia físico-humana clássica não escreveu sobre worldbuilding de jogo/ficção; a transposição é trabalho aplicado do Liceu) |

**Disciplina-mãe:** geografia físico-humana.
**Fonte upstream:** `msitarzewski/agency-agents@a597cb6 — academic/geography` (MIT).
**Linhagem Kolden:** [`geografia-fisico-humana`](../../linhagens/geografia-fisico-humana.md) *(a criar)*.

---
*Procedência produzida pela habilidade `sintese-de-framework` (Liceu). Status `semente`.*
