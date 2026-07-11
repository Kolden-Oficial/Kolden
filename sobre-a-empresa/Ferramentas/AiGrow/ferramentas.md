---
tipo: ferramenta
area: ferramentas
up: "[[sobre-a-empresa/Ferramentas/_MOC-ferramentas]]"
---

# AiGrow — Referência de Uso

AiGrow (aigrow.me) é um serviço de **gestão e crescimento de Instagram** que combina software + serviço gerenciado: ganho de seguidores, engajamento, agendamento de posts, gerenciador de DMs, link na bio e um gestor humano dedicado por conta. Categoria: Growth/Gestão de redes sociais (Instagram, orgânico).

---

## Credenciais (Infisical)

| Credencial | Caminho Infisical |
|------------|-------------------|
| — | **Não há credencial de API pública** |

> O AiGrow é um serviço operado via dashboard/login web — **não há API REST pública com chave confirmada**. Não há, portanto, credencial cadastrada no Infisical no momento.
>
> Se uma integração programática for confirmada no futuro, cadastrar sob `/kolden/dev/AIGROW_*` (e promover a `prod` só após validação). Art. VII (Constituição Kolden): nunca o valor — só o caminho. Não inventar endpoints nem assumir formato de chave.

---

## Fontes confiáveis

| Tipo | Link |
|------|------|
| Site oficial | https://aigrow.me |
| Reviews (Trustpilot) | https://www.trustpilot.com/review/aigrow.me |

---

## MCP (Model Context Protocol)

- **Disponível?** ❌ não.

---

## Uso básico

- **Modelo de uso:** serviço gerenciado + dashboard web. **Não há API pública confirmada**, portanto o uso é feito pelo painel após login em https://aigrow.me — não há exemplos de `curl`/SDK porque não há endpoint público a documentar.
- **Fluxo típico (via painel):**
  - Criar conta / login no dashboard e conectar a conta do Instagram a ser gerida.
  - Configurar metas de crescimento (público-alvo, hashtags, perfis de referência) com apoio do gestor humano dedicado.
  - Usar os módulos do painel: agendamento de posts, gerenciador de DMs, link na bio, acompanhamento de engajamento e seguidores.
- **Autenticação:** login no dashboard (credenciais de conta do serviço). Não confundir com chave de API — esta não existe de forma pública confirmada.

---

## Notas Kolden

- **AiGrow NÃO faz transcrição de conteúdo.** A ferramenta foi inicialmente cogitada para transcrição, mas essa **não** é função dela — AiGrow é growth de Instagram. Para transcrição, a Kolden usa **Speechmatics + Deepgram + yt-dlp** (ver os manuais dessas ferramentas).
- Escopo: growth de Instagram **orgânico** (software + serviço gerenciado com gestor humano).
- **Não integrada ao squad Argos** — está fora do escopo de inteligência de mercado.
- Registrada neste catálogo a pedido do Ronan.
- Sem API pública confirmada e sem MCP: qualquer automação hoje é manual via dashboard. Não inventar endpoints, credenciais ou exemplos de chamada.
