---
name: roteiro-de-reels
description: >
  Transforma um Reel/Short de referência (outlier) em um roteiro novo na voz da
  marca/cliente, reaproveitando conteúdo da newsletter. Analisa o vídeo de referência
  (transcrição + gancho + estrutura + timings) e reescreve aplicando os mesmos padrões ao
  tema da marca, com gate de QA antes de entregar. Use quando o pedido for "roteirizar um
  reels", "transforma esse Reel em roteiro", "engenharia reversa desse vídeo", ou quando
  colarem uma URL de Reel/Short. Lê `voz-newsletter.md`/`voz.md`/`sobre-mim.md` se existirem.
metadata:
  type: reference
---

# Roteiro de Reels — engenharia reversa de outlier → roteiro na voz

Pega um vídeo curto que performou (referência) e produz um roteiro novo na voz da marca,
derivado do conteúdo de newsletter. É a habilidade de produção de vídeo curto do squad
(handoff natural ao `short-video-architect`).

> **MÉTODO, não auto-exec.** A versão original mandava o agente **gerar e RODAR** um script
> Node.js (apify-client + Gemini) que baixava o vídeo para o disco. Aqui absorvemos só o
> **método de análise e roteirização**. A coleta/transcrição do vídeo de referência é
> **delegada ao Argos** (skills `descoberta-de-virais` + `transcricao-de-conteudo`), com
> qualquer token resolvido por **Infisical** — nunca variável de ambiente em texto puro,
> nunca código de terceiro executado por esta habilidade.

## Passo 1 — Referência
Peça a URL do Reel/Short outlier (ou o link da base de referências). Se vier um link
agregador, localize a URL do vídeo. **Nunca invente métricas** — use só o que a coleta retornar.

## Passo 2 — Tema da newsletter
Pergunte qual tema/seção da newsletter reaproveitar. Leia `voz-newsletter.md`, `voz.md` e
`sobre-mim.md` se existirem, para o roteiro casar com a voz.

## Passo 3 — Coletar e analisar a referência (delegado)
Peça ao **Argos** a coleta + transcrição do vídeo de referência. A análise que queremos de
volta (transcrição com timestamps + leitura de padrões):

```
Estou estudando este vídeo para escrever um roteiro próprio em estilo similar, para o público [de sobre-mim.md].
## Transcrição completa — cada palavra, com timestamps
## Gancho — primeiras palavras exatas; contagem de palavras; o que para o scroll
## Padrões de linguagem — tamanho médio de frase; razão você/eu; transições; minimizadores
## Estrutura — duração total; quebra de seções com timings; momento antes/depois; CTA
## Um insight-chave — a técnica mais importante para aprender deste vídeo
```
Se a coleta falhar, reporte e pare. **Não fabrique análise.**

## Passo 4 — Escrever o roteiro novo
Aplicando a análise + o tema + os arquivos de voz:

### Gancho
- Não abra com "Eu". Use "isto", "você", um fato ou um nome.
- Formatos que funcionam: "Isto mudou... para sempre" / flip negativo ("X é inútil, a menos que...") / afirmação de capacidade.
- Cria curiosidade ou quebra de padrão em até 3 segundos.
- Espelhe a contagem de palavras e a estrutura do gancho da referência.

### Corpo
- Frases curtas. Conversacional ("você só precisa...").
- Não empilhe 3+ fragmentos staccato — funda numa frase fluida.
- Não declare a conclusão; deixe os fatos trabalharem.
- Sem "link na bio" — use automação de comentário.

### Gatilho de comentário
- Uma única palavra em CAIXA ALTA (ex.: ROTEIRO, GUIA, PROMPTS, VIDEO).
- Diretamente relacionada ao que foi prometido. Sem aspas, sem pontuação final.

### CTA
- "Comente [PALAVRA] e te mando [coisa específica]." Curto, sem enchimento.

### Duração e estrutura
- Alvo 30 a 45 segundos. Máximo 2 pontos-chave (não 3). A legenda espelha o roteiro.

### Estrutura do arquivo do roteiro
```
# Reel: [título]
## Análise de referência — URL · views · técnica-chave (da análise)
## Duração alvo — 30-45s
## Gancho (0-3s) — [palavras exatas]
## Ponto 1 ([ini]-[fim]s) — [palavras exatas]
## Ponto 2 ([ini]-[fim]s) — [palavras exatas]
## CTA ([ini]-[fim]s) — [inclui "Comente [PALAVRA]"]
---
## Legenda — [espelha o roteiro, formatada para a plataforma]
## Gatilho de comentário — [PALAVRA]
## Entregável — [o que o gatilho desbloqueia]
---
## Notas visuais — [cortes, B-roll, textos em tela]
```

## Passo 5 — Gate de QA
Pontue o roteiro contra as regras do Passo 4. Toda violação é corrigida; re-pontue até
passar no limite alto. Não mostre roteiro abaixo do gate. Violações comuns: abre com "Eu";
3+ fragmentos staccato; declara a conclusão; gatilho multi-palavra/estilizado; passa de 45s
quando lido em voz alta; 3 pontos em vez de 2; legenda não espelha o roteiro.

## Passo 6 — Pipeline (handoff)
Após aprovado, ofereça dois caminhos: (1) gravar manualmente; (2) produção assistida —
**handoff ao Aglaia** para geração de mídia (voz/avatar/motion). A escolha de ferramentas
de geração e os segredos ficam fora desta habilidade.

## Regras
- Sempre leia os arquivos de voz antes de escrever. Aderência de voz é inegociável.
- Nunca invente métricas da referência. Use só o que a coleta retornar.
- Todo entregável inclui o roteiro + a legenda + o gatilho de comentário juntos.

---
**Procedência:** método adaptado de `charlie947/social-media-skills` (skill `reels-scripting`),
@94f72ea2ece388fa30ef49a26fb2e6fd2109e0b1, licença MIT. Absorvido **o método** (engenharia
reversa do outlier + regras de gancho/corpo/CTA + gate de QA); removido o **auto-exec**
(script Node que baixava vídeo, env vars `APIFY_API_TOKEN`/`GOOGLE_AI_API_KEY` em texto puro,
caminhos `~/Desktop/Reels/`, modelo de geração fixo) — coleta delegada ao Argos, segredos via
Infisical, geração de mídia via Aglaia. Reescrito em pt-BR.
