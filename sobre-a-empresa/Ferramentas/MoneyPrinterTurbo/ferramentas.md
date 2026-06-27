# MoneyPrinterTurbo — Referência de Uso (vendor inerte, self-host)

**MoneyPrinterTurbo** é um app Python (MVC) que, a partir de um **tópico/keyword**, gera
automaticamente um **vídeo curto em HD** (9:16 ou 16:9): roteiro por IA → termos de busca → material de
stock royalty-free → narração TTS → legendas → trilha → render via ffmpeg/moviepy. Três superfícies:
WebUI (Streamlit), API REST (FastAPI) e CLI. Camada LLM multi-provider (~20 provedores, chave trocável)
e TTS multi-provider (Edge TTS grátis por padrão, Azure, ElevenLabs, etc.). Roda 100% self-hosted via
Docker (bind `127.0.0.1`). Categoria: Produção de vídeo curto por IA.

> **Status:** `vendor-registrado (não instalado)`. Caso de uso real: produção de vídeo curto **em escala**
> para **Pheme** (social) e **Caliope** (conteúdo) — a avaliar em fase posterior como integração
> consumível, **não** como código absorvido. **Nada instalado, código não copiado.** Quarentena
> gitignored: `Caos/_staging/quarentena/harry0703--MoneyPrinterTurbo/`.

---

## Como consumir (NÃO copiar o código — self-host do upstream)

A ferramenta **não** é npx/MCP: é uma aplicação self-hosted. Consumir clonando o **upstream oficial** e
subindo via Docker (quando/se o Ronan aprovar o uso), não a partir da quarentena:

```bash
# Subir self-hosted a partir do repositório oficial (fora da quarentena)
git clone https://github.com/harry0703/MoneyPrinterTurbo
cd MoneyPrinterTurbo
cp config.example.toml config.toml   # editar providers/chaves (ver Ressalvas)
docker compose up                     # WebUI em 127.0.0.1:8501 / API em 127.0.0.1:8080
```

- **WebUI:** `http://127.0.0.1:8501` · **API REST (docs):** `http://127.0.0.1:8080/docs`
- **CLI:** `python cli.py --video-subject "<tópico>"`
- Pipeline com `--stop-at` por estágio (roteiro→termos→material→voz→legenda→trilha→render→[upload]).

---

## Licença + procedência

| Campo | Valor |
|-------|-------|
| Licença (código) | **MIT** (Copyright (c) 2024 Harry) |
| ⚠️ Mídia embutida | **NÃO-MIT** — fontes (`resource/fonts/`) e músicas (`resource/songs/`) têm licenças próprias; **não redistribuir** como se fossem MIT. Verificar a licença de cada asset antes de uso comercial. |
| Repositório | https://github.com/harry0703/MoneyPrinterTurbo |
| SHA analisado | `ad6aabfeb94f16f35474058d9c3e1f74ce66e9d4` |
| Veredito de segurança (F2) | **SAFE** — sem `eval`/`exec`/`os.system`, sem `shell=True`, sem segredos hardcoded (credenciais no `config.toml` do operador), sem `postinstall`; `subprocess` restrito a ffmpeg; Docker bind em `127.0.0.1` |

---

## Ressalvas (soberania / gates / Infisical)

- **Soberania de dados (decisão do Ronan, não bloqueio):** no caminho "fácil" o app chama várias APIs
  SaaS externas (LLM, TTS, stock, upload social). É **configurável para alta soberania**:
  `llm_provider=ollama` (LLM local), legenda via `faster-whisper` (local), material local. Só adotar com
  os providers locais se a soberania for requisito.
- **Manter `g4f` (gpt4free) DESLIGADO** — provider não-oficial, default já desligado; só liga com
  `uv sync --extra g4f`. Não ligar.
- **Cross-post social (`upload_post.py` via upload-post.com)** **sobrepõe** ao stack de publicação já
  existente da Kolden (**Pheme** via Postiz/GHL). **Não adotar** o cross-post embutido sem decisão.
- **Credenciais:** todas via `config.toml` do operador; ao integrar, resolver chaves via **Infisical**
  (`infisical run --projectId=... --env=... -- ...`), nunca em texto puro versionado.
- **Mídia (fontes/músicas):** licenças próprias — ver linha NÃO-MIT acima.

---

## Notas Kolden

- Vendor inerte: nenhuma capacidade virou skill/agente (decisão F4 = VENDOR; consumidores potenciais
  sinalizados: Pheme, Caliope — fase ADAPT futura, fora desta sessão).
- A camada LLM multi-provider do app **duplica** o que a Kolden já tem (OpenRouter/Eden AI padrão) — usar
  a stack interna, não a do app, se integrar.

---

> Atribuição: descrição e superfície de uso derivadas de `harry0703/MoneyPrinterTurbo`@`ad6aabf`
> (código MIT; mídia embutida sob licenças próprias NÃO-MIT). Sem cópia de código.
