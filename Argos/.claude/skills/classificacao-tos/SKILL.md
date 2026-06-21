---
name: classificacao-tos
description: Classifica uma operação de coleta como VERDE (legítima) ou CINZA (viola Termos de Serviço / exige login) antes de executá-la. Use sempre que for coletar dados de uma plataforma e houver dúvida sobre o que é permitido — especialmente em redes sociais. A operação CINZA exige autorização humana e é executada apenas pelo compliance-sentinela com conta/proxy descartável.
---

# Habilidade: classificacao-tos (árvore de decisão verde/cinza)

Antes de qualquer coleta, classifique a operação. Esta é a regra de compliance híbrida do Argos:
a base opera em VERDE; o CINZA é isolado, opt-in e sob o portão do `compliance-sentinela`.

## Árvore de decisão

```
1. Existe uma API OFICIAL para este dado?
   → SIM: use a API oficial (chave via Infisical).  ............................ VERDE
2. O dado é PÚBLICO e acessível SEM login?
   (página pública, ad library pública, endpoint JSON público, SERP)
   → SIM: colete respeitando robots/rate-limit.  ............................... VERDE
3. A coleta exige LOGIN, contorna proteção anti-bot com credenciais,
   coleta em massa, ou viola explicitamente os ToS da plataforma?
   → SIM: PARE.  .............................................................. CINZA
```

## VERDE (faça à vontade, com proveniência)
- APIs oficiais: YouTube Data API, Reddit JSON, MCP Apollo (firmográficos), LinkedIn Ad Library.
- Dado público sem login: perfis/posts públicos via `browser_*`/`web_extract`, ad libraries (Meta/
  Google/TikTok Creative Center), `x_search` (xAI), SERP via `web_search`.
- Sempre: registrar fonte + timestamp; respeitar robots.txt e rate-limit; backoff em 403/429.

## CINZA (só via compliance-sentinela, com autorização humana)
- Scraping autenticado de redes sociais (instaloader, TikTokApi, twscrape, Douyin API), coleta em
  massa que viola ToS, contorno de proteção com contas.
- Protocolo obrigatório do sentinela:
  1. Confirmar a NECESSIDADE (não há via verde equivalente?).
  2. Pedir CONFIRMAÇÃO HUMANA explícita na sessão.
  3. Provisionar conta/proxy DESCARTÁVEL via Infisical (`/kolden/argos/cinza/*`) — nunca credencial real.
  4. Criar o marcador de autorização da sessão (`.claude/.estado/cinza-autorizado-<session_id>`).
  5. Executar via `modulo-cinza/` (sessão Browserbase efêmera quando possível).
  6. Registrar a operação em `registros/` (alvo, autorização, timestamp).

## Regra
Na dúvida, é CINZA. Prefira sempre a alternativa VERDE; se não houver, reporte a lacuna honestamente
em vez de coletar sem autorização.
