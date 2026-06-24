# ElevenLabs — Referência de Uso

ElevenLabs é uma plataforma de IA de áudio (Áudio/Vídeo) com infraestrutura de voz para Text-to-Speech, Speech-to-Text, clonagem de voz, agentes conversacionais e geração de efeitos sonoros, tudo acessível via REST API com SDKs oficiais em Python e Node.js.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| ELEVENLABS_API_KEY | `/kolden/prod/ELEVENLABS_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://elevenlabs.io/docs/overview/intro |
| Referência da API | https://elevenlabs.io/docs/api-reference/introduction |
| Repositório GitHub | https://github.com/elevenlabs/elevenlabs-python |
| Fórum / Comunidade | https://discord.com/invite/elevenlabs |
| Changelog / Status | https://elevenlabs.io/docs/changelog · https://status.elevenlabs.io/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — oficial (ElevenLabs MCP Server, suporta Claude Desktop, Cursor, Windsurf, OpenAI Agents)
- **Repositório:** https://github.com/elevenlabs/elevenlabs-mcp
- **Instalação:** `claude mcp add elevenlabs -e ELEVENLABS_API_KEY=$ELEVENLABS_API_KEY -- uvx elevenlabs-mcp`
  - Alternativa (pip): `pip install elevenlabs-mcp` e executar `python -m elevenlabs_mcp --api-key=$ELEVENLABS_API_KEY`
  - Requer `uv` (gerenciador de pacotes Python) para o método `uvx`. No Windows, habilitar "Developer Mode" no cliente MCP.

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API: `https://api.elevenlabs.io` (endpoints versionados em `/v1/...`)
  - SDK Python (oficial): `pip install elevenlabs` (repo: github.com/elevenlabs/elevenlabs-python)
  - SDK Node.js (oficial): `npm install @elevenlabs/elevenlabs-js`
- **Autenticação:** Toda requisição deve incluir a chave no header HTTP `xi-api-key: <API_KEY>`. Nos SDKs, passa-se via parâmetro `api_key` / `apiKey` ao instanciar o cliente.
- **Exemplo mínimo (Text-to-Speech via curl, chave injetada pelo Infisical):**

```bash
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
  curl -X POST "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM" \
    -H "xi-api-key: $ELEVENLABS_API_KEY" \
    -H "Content-Type: application/json" \
    -d '{
      "text": "Ola, isto e um teste do Kolden.",
      "model_id": "eleven_multilingual_v2"
    }' \
    --output saida.mp3
```

Exemplo com SDK Python (a chave vem do ambiente injetado pelo Infisical, nunca literal):

```python
import os
from elevenlabs.client import ElevenLabs

client = ElevenLabs(api_key=os.environ["ELEVENLABS_API_KEY"])
audio = client.text_to_speech.convert(
    voice_id="21m00Tcm4TlvDq8ikWAM",
    model_id="eleven_multilingual_v2",
    text="Ola, isto e um teste do Kolden.",
)
```

Rodar com: `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- python script.py`

> Modelos disponíveis controlam qualidade, latência e cobertura de idiomas. `eleven_v3` é o mais expressivo (70+ idiomas). Atenção: `eleven_monolingual_v1` e `eleven_multilingual_v1` serão removidos em 09/07/2026 (ver changelog).

---

## Notas Kolden

- Categoria Áudio/Vídeo: usar para geração de narração/voz (TTS), transcrição (STT), dublagem e efeitos sonoros em pipelines de conteúdo.
- Casos prováveis no Kolden: geração de áudio para criativos/anúncios e VSLs da operação de afiliados (Telegram + Shopee), e narração de conteúdo de copy do squad.
- Sempre resolver a chave em runtime via Infisical (`infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...`); nunca colar `ELEVENLABS_API_KEY` literal em código, config de MCP ou logs.
- Para uso via agente Claude Code, preferir o MCP oficial (`uvx elevenlabs-mcp`) com a env var injetada pelo Infisical.
