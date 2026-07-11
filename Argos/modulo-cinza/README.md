---
tipo: nota
area: Argos
up: "[[Argos/_MOC-argos]]"
---

# Módulo Cinza — Scrapers de Zona ToS-Cinza (ISOLADO)

> ⚠️ **ZONA ToS-CINZA.** Tudo aqui viola Termos de Serviço de plataforma (scraping autenticado /
> coleta em massa). Este módulo é **opt-in** e **isolado** do `motor/` (zona verde). Nenhum
> especialista coleta daqui diretamente — o **único portão é o `compliance-sentinela`**.

## Regra de ouro

Uma operação só roda neste módulo quando TODAS as condições são satisfeitas:

1. **Confirmação humana explícita** do Ronan na sessão (apetite de risco aceito para aquele alvo).
2. **Conta/proxy descartável** provisionado via Infisical em `/kolden/argos/cinza/*` — **nunca**
   credencial corporativa real.
3. **Marcador de autorização** da sessão criado pelo `compliance-sentinela` em
   `.claude/.estado/cinza-autorizado-<session_id>` (o reflexo PreToolUse bloqueia o contrário).
4. **Registro de auditoria** da operação (alvo, autorização, timestamp) em `../registros/`.

Sempre prefira a alternativa **VERDE** (ver `.claude/skills/classificacao-tos`). Se não houver via
verde, reporte a lacuna honestamente em vez de coletar sem autorização.

## Scrapers (a vendorizar SOB autorização nominal)

Estes repositórios **ainda não foram clonados** — o clone automático foi (corretamente) bloqueado
por serem código de ToS-risco. Serão vendorizados em `social-scrapers/<nome>` (depth 1, `.git`
removido, SHA em `../_origem.md`) **somente após o Ronan autorizar nominalmente cada um**:

| Plataforma | Repositório candidato | Licença | Observação |
|---|---|---|---|
| X/Twitter | `vladkens/twscrape` | MIT | Coleta via contas; conta descartável obrigatória |
| Instagram | `instaloader/instaloader` | MIT | Perfis/posts autenticados |
| TikTok | `davidteather/TikTok-Api` **ou** `Evil0ctal/Douyin_TikTok_Download_API` | (a escolher) | Definir qual antes de vendorizar |

## Estrutura

```
modulo-cinza/
├── README.md            ← este arquivo
└── social-scrapers/     ← scrapers vendorizados (vazio até autorização nominal)
```

A invocação de qualquer coisa aqui passa pela fachada do sentinela e por sessões Browserbase
efêmeras quando possível (não contaminam perfil real).
