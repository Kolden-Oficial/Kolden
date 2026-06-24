# Speechmatics — Referência de Uso

Speechmatics é uma API de transcrição de fala (speech-to-text / STT) de alta qualidade, com destaque para português do Brasil (pt-BR), diarização (identificação de quem fala) e timestamps por palavra. Oferece modos batch (assíncrono) e realtime (tempo real). Categoria: Áudio/Vídeo (transcrição).

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| SPEECHMATICS_API_KEY | `/kolden/dev/SPEECHMATICS_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://docs.speechmatics.com |
| Site oficial | https://www.speechmatics.com |
| Repositório GitHub | https://github.com/speechmatics (SDK Python oficial: `speechmatics-python`) |

---

## MCP (Model Context Protocol)

- **Disponível?** ❌ não — sem servidor MCP oficial nem de terceiros confirmado. Integrar via SDK Python (`speechmatics-python`) ou API REST batch.

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API REST batch (assíncrona): `https://asr.api.speechmatics.com/v2`
  - Criação de job de transcrição: `POST /jobs` enviando o áudio + a config de transcrição (idioma, diarização, etc.)
  - SDK oficial Python: `pip install speechmatics-python`
  - Suporta diarização e o idioma `pt` (português, inclui pt-BR).
- **Autenticação:** header HTTP `Authorization: Bearer <SPEECHMATICS_API_KEY>`.
- **Exemplo mínimo** (chave injetada pelo Infisical, nunca literal — transcrição em pt com diarização):

```bash
# Cria um job batch de transcrição em português (pt) com diarização de falantes.
# A credencial é resolvida pelo Infisical em runtime; nunca escreva o valor literal.
infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- \
  curl -X POST https://asr.api.speechmatics.com/v2/jobs \
    -H "Authorization: Bearer $SPEECHMATICS_API_KEY" \
    -F data_file=@audio.wav \
    -F config='{
      "type": "transcription",
      "transcription_config": {
        "language": "pt",
        "diarization": "speaker"
      }
    }'
```

O `POST /jobs` retorna um `id`; consulte o resultado em `GET /jobs/<id>/transcript` quando o job concluir (modo assíncrono).

---

## Notas Kolden

- Usada no squad **Argos** (camada `transcrever` do `motor/argos-engine.py`) para transcrever vídeos virais e conteúdo de concorrentes — após baixar o áudio/vídeo com `yt-dlp` — e extrair ganchos, estrutura e CTA, com **handoff ao squad Caliope (copy)**.
- Escolhida por ser a melhor em **pt-BR**; a **Deepgram** (já no catálogo) complementa para cenários de **realtime**.
- Sempre resolver `SPEECHMATICS_API_KEY` em runtime via Infisical (`infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=dev -- ...`); nunca commitar a chave nem persisti-la em `.env` versionado.
- Atenção ao ambiente: a credencial vive em **dev** (`--env=dev`), diferente da maioria das ferramentas do catálogo (prod).
