# Mapa de decisão — harry0703--MoneyPrinterTurbo (rota B)

- **slug:** harry0703--MoneyPrinterTurbo · **sha:** ad6aabfeb94f16f35474058d9c3e1f74ce66e9d4
- **Natureza:** app/ferramenta de terceiro (VENDOR), não um agente. Decisão de absorção: **vendor inerte** — catalogar como ferramenta externa consumível, **não** reescrever capacidades como skills/agentes Kolden. Registrar no ledger e sinalizar licença/soberania ao Ronan.
- Viés da missão: como nada aqui tem match item-a-item com entidade existente do registro, NÃO marco REUSE de capacidade; marco **VENDOR** (ferramenta inerte) com squad-consumidor potencial sinalizado para futura fase ADAPT (não nesta sessão).

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | VENDOR | vendor (consumidor: caliope/pheme) | geração de roteiro de vídeo é função do app; Caliope pode invocar como ferramenta, não internalizar |
| G2 | VENDOR | vendor | camada LLM multi-provider própria do app; Kolden já tem OpenRouter/Eden como padrão — não duplicar |
| G3 | VENDOR | vendor (consumidor: pheme) | busca de stock (Pexels/Pixabay/Coverr) é integração do app; ferramenta externa |
| G4 | VENDOR | vendor (consumidor: pheme/caliope) | TTS multi-provider do app; ElevenLabs já está na stack via MCP próprio |
| G5 | VENDOR | vendor | legenda via Edge/whisper local; recurso do app |
| G6 | VENDOR | vendor | trilha/BGM; recurso interno do app |
| G7 | VENDOR | vendor (consumidor: pheme/caliope) | render HD ffmpeg/moviepy é o núcleo do app; valor está em usá-lo, não recriá-lo |
| G8 | VENDOR | vendor (consumidor: pheme) | cross-post social via upload-post.com; Pheme já publica via Postiz/GHL — avaliar sobreposição antes de adotar |
| G9 | VENDOR | vendor | API/WebUI/CLI são superfícies de uso do vendor |
| G10 | VENDOR | vendor | pipeline orquestrado interno do app |

**Decisão dominante: VENDOR (ferramenta inerte).** Nenhuma capacidade vira skill/agente Kolden nesta absorção. Caso de uso real para a Kolden: ferramenta self-hosted de **produção de vídeo curto em escala** para **Pheme** (social) e **Caliope** (produção de conteúdo) — a avaliar em fase posterior como integração consumível, não como código absorvido.

**Sinais para o Ronan (decisão humana, fora desta sessão):**
1. **Soberania de dados** — o app, no caminho "fácil", chama várias APIs SaaS externas (LLM, TTS, stock, upload social). Porém é **configurável para alta soberania**: `llm_provider=ollama` (LLM local), `tts=edge` (grátis, mas é serviço MS) ou Azure self-key, legenda `whisper` (faster-whisper local), material local. Roda 100% self-hosted via Docker (bind 127.0.0.1). Combina com a filosofia Kolden **se** configurado para providers locais.
2. **upload-post.com (G8)** sobrepõe ao stack de publicação já existente (Pheme via Postiz/GHL) — não adotar sem decisão.
3. Manter provider **g4f** (gpt4free) **desligado** (default já é).
