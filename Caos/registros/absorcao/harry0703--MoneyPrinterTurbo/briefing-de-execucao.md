---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/harry0703--MoneyPrinterTurbo/seguranca|seguranca]]"
---

# Briefing de execução — MoneyPrinterTurbo como ferramenta interna (Pheme/Caliope)

- **Slug:** harry0703--MoneyPrinterTurbo · **SHA:** ad6aabfeb94f16f35474058d9c3e1f74ce66e9d4
- **Decisão:** VENDOR-INTERNO (self-hosted)
- **Decidido em:** 2026-06-28 pelo Ronan (item 4 do diagnóstico do Hermes-Chief)
- **Esta NÃO é tarefa do Caos** — é deploy de ferramenta + integração com squad existente (Pheme). O Caos só entra se decidirmos criar um especialista "operador de vídeo curto" dentro do Pheme (faixa opcional 3 abaixo).
- **Plan-mode obrigatório** antes de qualquer escrita em `kolden/moneyprinter/` (CLAUDE.md §6).

## Casamento com metas registradas

- **Pheme — marca Kolden +100k seguidores** ([[project_pheme_social_squad]]): vídeo curto é o formato dominante (Reels/Shorts/TikTok). Hoje a produção é manual; MPT vira máquina.
- **Funil Telegram → Shopee (Classes B/C)** ([[project_telegram_shopee_affiliate]]): tráfego frio precisa de criativos em volume. Conversão Classes B/C responde a vídeo curto.
- **Postiz pendente** ([[project_pheme_social_squad]]): MPT gera o ativo; Postiz publica. Cadeia limpa.

## Frente 1 — Stack INFRA `kolden/moneyprinter/` (WSL)

**Local:** ambiente WSL2 (`/home/kolden/kolden/moneyprinter/`).
**Reuso:** o upstream já vem com `docker-compose.yml` (`webui:8501` e `api:8080`, bind `127.0.0.1` por default — bom).

**Adaptação Kolden:**

| Container          | Imagem (fork Kolden)                  | Portas (host)    | Persistência                | Função                                       |
|--------------------|---------------------------------------|------------------|-----------------------------|-----------------------------------------------|
| mpt-api            | (build local, base do upstream)       | `8080`           | bind `./moneyprinter/data`  | API REST de geração de vídeo                  |
| mpt-webui          | (build local)                         | `8501`           | —                           | UI Streamlit para teste manual                |
| mpt-ollama         | `ollama/ollama:latest`                | `11434` interno  | volume `ollama_models`      | LLM local (qwen2.5/llama3 etc.) — soberania   |
| mpt-whisper        | (build local com faster-whisper)      | rede interna     | volume `whisper_cache`      | STT local — soberania                         |

**Naming:** prefixo `mpt-` (padrão `<stack>-<serviço>` da CLAUDE.md §4).
**Bind:** todas as portas em `127.0.0.1`.
**Network:** bridge própria `mpt-network`; sem cruzar com `lobe-network` ou `cmem-network`.

## Sanitização obrigatória do fork

Antes do build da imagem:

1. **Sanitizar mídia embutida** — `resource/songs/` e `resource/fonts/` do upstream têm licença NÃO-MIT (achado registrado no ledger). **Remover toda mídia embutida do fork** e substituir por: (a) fontes Kolden do design system ([[project_kolden_design_system]] — Lato + Eurostile), (b) trilhas próprias ou royalty-free explícito (Pixabay Music/Mixkit), (c) banco vazio com README explicando onde colocar mídia local.
2. **`llm_provider=ollama`** no `config.toml` padrão — soberania (mapa-de-decisao G2).
3. **`tts=edge`** (Microsoft Edge TTS, free) como padrão e **provider `azure` com chave própria** como upgrade — soberania (G4). Não usar ElevenLabs aqui (custo desnecessário pra escala).
4. **`subtitle_provider=whisper`** (faster-whisper local) — soberania (G5).
5. **g4f desligado** (mantém o default) — provider não-oficial (`requirements.txt:21-22`), só com `uv sync --extra g4f` (registrado em `seguranca.md` linha 17). Não habilitar.
6. **upload-post.com desabilitado** (G8 do mapa) — publicação social é do **Postiz/GHL** via Pheme, não do MPT. MPT gera; Pheme publica.
7. **Stock providers** (Pexels/Pixabay/Coverr) — chaves vão para Infisical (`/kolden/dev/PEXELS_API_KEY` etc.). Nada de chave em `config.toml` versionado.

## Frente 2 — Integração com Pheme

O Pheme já existe ([[project_pheme_social_squad]] — orquestrador + 8 especialistas, publica via Postiz/GHL). MPT vira ferramenta consumível.

**Mudanças no Pheme:**

1. **`Pheme/ferramentas.md`** — adicionar entrada MPT com endpoint local `http://localhost:8080`, exemplos de payload, contrato de retorno.
2. **`sobre-a-empresa/Ferramentas/MoneyPrinterTurbo/ferramentas.md`** — manual completo (padrão Kolden de catálogo, conforme [[project_ferramentas_catalogo]]).
3. **Atualizar `sobre-a-empresa/Ferramentas/ferramentas.md`** e `mcp-status.md` — registrar MPT como vendor self-hosted.
4. **Skill no Pheme** — `.claude/skills/geracao-de-video-curto/SKILL.md`: gatilho ("preciso de reel/short/tiktok"), recebe pauta + duração-alvo, invoca MPT API, retorna path do MP4 + thumbnail + legenda.
5. **Pipeline `pauta → MPT → revisão Pheme → Postiz`** — workflow em `Pheme/workflows/vídeo-curto-em-escala.yaml`.

## Frente 3 (opcional) — Especialista novo no Pheme via Caos

Se o volume justificar (>50 vídeos/semana), criar especialista dedicado dentro do Pheme:

- **Nome candidato** (mitologia grega): **Calíope** já está; **Tália** (musa da comédia/produção leve) ou **Mnemósine** (memória, arquivo de criativos). Decisão do Caos na Rodada 0.
- **Faculdades:** Mente (operar a API do MPT, escolher trilha/cor/tipografia conforme brief), Memória (banco de criativos performantes, A/B histórico), Sociedade (handoff Caliope→este→Pheme-publicação).
- **Caos rota:** ritual interativo padrão (9 fases). Briefing de entrada já está parcialmente coberto por este documento + [[project_pheme_social_squad]].

**Não criar agora** — só se a frente 1+2 destravar volume e ficar claro que precisa de especialista.

## Ordem proposta de execução

1. **Plan-mode** sobre `kolden/moneyprinter/docker-compose.yml` (com Ronan).
2. **Fork sanitizado** em `Kolden-Oficial/moneyprinter` — mídia embutida removida, config soberano, Infisical em vez de `config.toml` versionado.
3. **Build local** + smoke test (gerar 1 vídeo de 15s pela UI).
4. **Manual da ferramenta** em `sobre-a-empresa/Ferramentas/MoneyPrinterTurbo/`.
5. **Skill no Pheme** + workflow `pauta → MPT → revisão → Postiz` (depende do Postiz subir; ver [[project_pheme_social_squad]]).
6. **Validação de produto:** 10 vídeos da marca Kolden + 10 do funil Shopee, publicados, métrica em D+7.
7. **Decisão sobre frente 3** (especialista novo via Caos) com base no volume.

## Sinais de pronto

- `docker compose ps` mostra `mpt-{api,webui,ollama,whisper}` healthy
- `curl localhost:8080/api/v1/health` retorna ok
- Pheme consegue gerar Reel a partir de pauta via skill, sem operador manual no MPT-UI
- Postiz publica o output do MPT sem retrabalho
- Mídia embutida do upstream foi **toda** removida (verificável por `find resource/ -size +100k` vazio)

## Não-objetivos

- **Não** habilitar `g4f` (gpt4free) — fora da política de provider.
- **Não** usar `upload-post.com` — sobreposição com Postiz/GHL.
- **Não** vender como SaaS agora — decisão registrada (opção B, não A); produto seria frente separada com billing/suporte.
- **Não** versionar `config.toml` com chaves — Infisical é único caminho.
- **Não** expor portas fora de localhost.
