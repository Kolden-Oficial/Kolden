# Deepgram — Referência de Uso

Deepgram é uma plataforma de Voice AI (Áudio/Vídeo) que oferece APIs de Speech-to-Text (transcrição de áudio pré-gravado e em tempo real), Text-to-Speech, Voice Agent e inteligência de texto/áudio, com suporte a 50+ idiomas.

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| DEEPGRAM_API_KEY | `/kolden/prod/DEEPGRAM_API_KEY` |

> Art. VII (Constituição Kolden): nunca o valor — só o caminho. Resolver em runtime via `infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- <comando>`.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Documentação oficial | https://developers.deepgram.com/home |
| Referência da API | https://developers.deepgram.com/reference/deepgram-api-overview |
| Repositório GitHub | https://github.com/deepgram/deepgram-python-sdk (SDK Python oficial); org: https://github.com/deepgram |
| Fórum / Comunidade | https://community.deepgram.com/ (Discourse) + Discord via https://developers.deepgram.com/support |
| Changelog / Status | Changelog: https://developers.deepgram.com/changelog — Status: https://status.deepgram.com/ |

---

## MCP (Model Context Protocol)

- **Disponível?** sim — **oficial** (Deepgram). Dá a editores de IA (Claude Code, Cursor, Windsurf) acesso direto às ferramentas de transcrição, síntese de voz e inteligência de áudio. Busca a lista de tools da API em runtime, então novas tools aparecem sem upgrade de pacote.
- **Repositório:** https://github.com/deepgram/mcp
- **Instalação:** via CLI `dg` (recomendado pela doc oficial):
  ```shell
  claude mcp add deepgram --scope user --command dg --args mcp
  ```
  Documentação MCP: https://developers.deepgram.com/developer-tools/cli/mcp-server

---

## Uso básico

- **Base URL / SDK:**
  - Base URL da API REST (STT): `https://api.deepgram.com/v1/listen`
  - SDKs oficiais: Python (`pip install deepgram-sdk`) — https://github.com/deepgram/deepgram-python-sdk; JavaScript/Node (`npm install @deepgram/sdk`)
- **Autenticação:** header HTTP `Authorization: Token <DEEPGRAM_API_KEY>` (prefixo `Token`, **não** `Bearer`). Todas as chamadas devem ser via HTTPS.
- **Exemplo mínimo** (chave injetada pelo Infisical, nunca literal):
  ```bash
  infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- \
    curl --request POST \
      --header "Authorization: Token $DEEPGRAM_API_KEY" \
      --header 'Content-Type: application/json' \
      --data '{"url":"https://dpgr.am/spacewalk.wav"}' \
      --url 'https://api.deepgram.com/v1/listen?model=nova-3&smart_format=true'
  ```
  Para arquivo local: use `--header 'Content-Type: audio/wav'` e `--data-binary @audio.wav`.

---

## Notas Kolden

- Categoria Áudio/Vídeo: usar Deepgram para transcrição (STT) de áudios/vídeos e síntese de voz (TTS) em pipelines de conteúdo e automações.
- Sempre resolver `DEEPGRAM_API_KEY` em runtime via Infisical (`infisical run --projectId=43d90b85-ca09-437c-b8f2-364b5cbe6093 --env=prod -- ...`); nunca commitar a chave.
- Para agentes/editores de IA do Kolden, preferir o MCP oficial (`dg mcp`) para acesso direto às tools de transcrição e inteligência de áudio.
