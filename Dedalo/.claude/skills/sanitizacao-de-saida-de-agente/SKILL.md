---
name: sanitizacao-de-saida-de-agente
description: Use antes de qualquer saída de agente sair do perímetro — publicar repo, abrir PR, colar log/relatório, anexar screenshot, mandar mensagem por gateway (WhatsApp/Telegram), ou empacotar projeto para release. Traz a varredura de segredos/PII/referências internas em 6 categorias com 20+ padrões, as regras de redação (truncar segredo, nunca exibir valor cheio), a checagem de arquivos perigosos e a auditoria de histórico git, com veredito PASS/FAIL/PASS-COM-AVISOS. Verificação independente — não confia em quem gerou. NÃO use para buscar segredos para consumo (isso é Infisical).
---

# Sanitização de Saída de Agente

Todo agente é uma **fronteira de vazamento**: o que ele gera (código, log, relatório, screenshot,
mensagem) pode carregar segredo, PII ou referência interna sem querer. Esta habilidade é o último portão
antes do conteúdo cruzar o perímetro (push público, PR, gateway de mensagem, release). Princípio: você é um
**auditor independente** — não confia na limpeza de quem gerou; **verifica tudo de novo**. Falso-positivo é
aceitável; falso-negativo, não. Um único achado CRÍTICO = FAIL global.

> Esta habilidade **detecta e bloqueia** segredo na saída. Ela **não** é a fonte de credenciais — buscar
> segredo para uso é sempre via Infisical (§5 do Kolden), nunca texto puro.

## As 6 categorias de varredura

### 1. Segredos (CRÍTICO — qualquer match = FAIL)
Varra todo arquivo de texto (exclua `node_modules`, `.git`, `__pycache__`, `*.min.js`, binários):

- **Chaves de API** — `(api[_-]?key|apikey|api[_-]?secret)…[=:]…['"]?[A-Za-z0-9+/=_-]{16,}`
- **AWS** — `AKIA[0-9A-Z]{16}` ; `(aws_secret_access_key|aws_secret)…[=:]…{20,}`
- **URL de banco com credencial** — `(postgres|mysql|mongodb|redis)://[^:]+:[^@]+@…`
- **JWT** (3 segmentos) — `eyJ…\.eyJ…\.…`
- **Chave privada** — `-----BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY-----`
- **Tokens GitHub** — `gh[pousr]_[A-Za-z0-9_]{36,}` ; `github_pat_[A-Za-z0-9_]{22,}`
- **OAuth Google** — `GOCSPX-[A-Za-z0-9_-]+`
- **Webhook Slack** — `https://hooks\.slack\.com/services/T…/B…/…`
- **SendGrid/Mailgun** — `SG\.[A-Za-z0-9_-]{22}\.[A-Za-z0-9_-]{43}` ; `key-[A-Za-z0-9]{32}`
- **Heurística (AVISO, revisão manual)** — string de alta entropia em config: `^[A-Z_]+=[A-Za-z0-9+/=_-]{32,}$`

### 2. PII (CRÍTICO)
- E-mail pessoal (não genérico tipo `noreply@`/`info@`) — `…@(gmail|yahoo|hotmail|outlook|protonmail|icloud)\.(com|net|org)`
- IP privado expondo infra interna — `192\.168\.\d+\.\d+` / `10\.\d+\.\d+\.\d+` / `172\.(1[6-9]|2\d|3[01])\.…`
  (CRÍTICO se não for placeholder documentado)
- String de conexão SSH — `ssh\s+[a-z]+@[0-9.]+`

### 3. Referências internas (CRÍTICO)
- Caminho de home específico — `/home/<user>/` (≠ `/home/user/`), `/Users/<Nome>/`, `C:\Users\<Nome>`
- Referência a arquivo de segredo — `\.secrets/`, `source ~/\.secrets/`
- Domínio/host interno hardcoded.

### 4. Arquivos perigosos (CRÍTICO — existir = FAIL)
`.env` (qualquer variante), `*.pem|*.key|*.p12|*.pfx|*.jks`, `credentials.json`, `service-account*.json`,
`.secrets/`, `.claude/settings.json`, `sessions/`, `*.map` (source map expõe estrutura/caminhos),
`node_modules/`, `__pycache__/`, `.venv/`.

### 5. Completude de configuração (AVISO)
`.env.example` existe; toda var de ambiente referenciada no código tem entrada no `.env.example`;
`docker-compose.yml` usa `${VAR}`, não valor hardcoded.

### 6. Auditoria de histórico git (CRÍTICO)
Para release, o histórico deve ser um único commit inicial (`git log --oneline | wc -l` = 1; >1 = histórico
não limpo = FAIL). Busque resíduo: `git log -p | grep -iE '(password|secret|api.?key|token)'`.

## Regras de redação (inegociáveis)

- **Nunca exiba o valor cheio de um segredo** — trunque para os 4 primeiros caracteres + `...` no relatório.
- **Read-only por padrão** — esta varredura **reporta**, não edita arquivos-fonte do alvo.
- Varra **todo** arquivo de texto, não só extensões conhecidas. Cheque o histórico git mesmo em repo "fresco".
- **Seja paranoico** — na dúvida, sinalize. Falso-negativo é o único erro inaceitável.
- Antes de salvar **screenshot/anexo**, redija credencial/token/PII visível.
- Em **mensagem de gateway** (WhatsApp/Telegram/etc.), a mesma varredura roda no corpo antes do envio.

## Formato de saída — relatório com veredito

```
# Relatório de Sanitização: <alvo>
Veredito: PASS | FAIL | PASS COM AVISOS

| Categoria             | Status     | Achados |
|-----------------------|------------|---------|
| Segredos              | PASS/FAIL  | n       |
| PII                   | PASS/FAIL  | n       |
| Referências internas  | PASS/FAIL  | n       |
| Arquivos perigosos    | PASS/FAIL  | n       |
| Completude de config  | PASS/AVISO | n       |
| Histórico git         | PASS/FAIL  | n       |

## Achados críticos (corrigir antes de liberar)
1. [SEGREDOS] src/config.py:42 — senha de banco hardcoded: `DB_P...` (truncado)
2. [INTERNO]  docker-compose.yml:15 — domínio interno

## Recomendação
{FAIL: "Corrija os N críticos e rode de novo." | PASS: "Liberado." | AVISOS: "Passa nos críticos; revise N avisos."}
```

Regra de decisão: **um** CRÍTICO em qualquer categoria → **FAIL**. Só avisos → **PASS COM AVISOS** (o humano
decide). Nada some sem registro — toda categoria aparece no relatório, mesmo com zero achados.

---
*Fonte: affaan-m/everything-claude-code@2bc924f (agente `opensource-sanitizer`, skill `opensource-pipeline`,
hook `governance-capture`; cluster G28/G9; MIT). Princípios extraídos e reescritos em PT-BR; sem cópia
literal. Alinha à regra de segredos do Kolden (§5 / Infisical): esta habilidade **bloqueia** vazamento na
saída; o Infisical **provê** credencial para uso — nunca confundir os dois papéis.*
