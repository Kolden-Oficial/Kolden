---
name: inteligencia-de-email-mime
description: Use quando precisar EXTRAIR informação estruturada de emails brutos (arquivos .eml, MIME multipart) — parse de headers (From/To/Subject/Date/Message-ID/References — reconstrução de thread), body (text/plain vs text/html — quando cada um), anexos (Content-Disposition, filename, MIME type validation, sanitização), inline images (Content-ID), e verificação DKIM/DMARC/SPF. Cobre também casos-limite (encoding quoted-printable/base64, charset misdeclared, headers RFC 2047 encoded-words, HTML "sujo" gerado por Outlook/Gmail). Dono&#58; @data-engineer (Dara). NÃO cria pipeline de ingestão de milhões de emails — isso é `invariantes-de-pipeline-de-dados` + Airflow/Prefect. NÃO envia email — isso é integração SMTP/SendGrid.
---

# Inteligência de Email (MIME)

## Quando invocar

- Ingestão de caixa postal em CRM (parse `.eml` de export IMAP)
- Ticket-system que recebe emails e vira issue estruturada
- Análise forense/compliance (thread reconstruction para descoberta legal)
- Extração de anexos de fatura/nota fiscal para OCR downstream
- Deduplicação por Message-ID em pipeline de warehouse
- Detecção de phishing (SPF/DKIM/DMARC + heurísticas de conteúdo)

## Anatomia de um email MIME

```
┌─ Envelope (SMTP, não persistido em .eml) ─┐
│  MAIL FROM: return-path                    │
│  RCPT TO: destinatário real                │
└────────────────────────────────────────────┘
┌─ Headers (RFC 5322) ──────────────────────┐
│  From: "Nome" <email@dominio>              │
│  To, Cc, Bcc                               │
│  Subject: (pode ser RFC 2047 encoded)      │
│  Date: RFC 5322 date                        │
│  Message-ID: <unico@dominio>               │
│  In-Reply-To: <msg-id-pai>                 │
│  References: <msg1> <msg2> ...             │
│  Content-Type: multipart/mixed; boundary=..│
└────────────────────────────────────────────┘
┌─ Body (multipart tree) ───────────────────┐
│  multipart/mixed                           │
│  ├─ multipart/alternative                  │
│  │  ├─ text/plain                          │
│  │  └─ text/html                           │
│  ├─ image/png (inline, Content-ID)         │
│  └─ application/pdf (attachment)           │
└────────────────────────────────────────────┘
```

## Parse: headers essenciais

### From, To, Cc — RFC 5322 address parsing

Não faça split por vírgula. Use lib madura:
- Python: `email.utils.getaddresses`
- Node: `mailparser` (Andris Reinman) ou `letter-parser`
- Go: `net/mail`

**Casos que quebram parser ingênuo:**
- `"Silva, Ronan" <ronan@kolden.com.br>` — vírgula dentro de aspas
- `ronan@kolden.com.br (Comment)` — comentário RFC 822
- `=?UTF-8?B?Um9uYW4gU2lsdmE=?= <ronan@kolden.com.br>` — RFC 2047 encoded name

### Subject — RFC 2047 encoded-words

Assunto pode vir codificado:
```
Subject: =?UTF-8?B?SW52b2ljZSAj?= =?UTF-8?B?MTIzNA==?=
```
Sempre decodifique antes de indexar/mostrar. Libs canônicas fazem isso; **não** implemente do zero (charset detection é armadilha).

### Message-ID / In-Reply-To / References — thread reconstruction

**A thread não vem pronta.** Você constrói:

1. Para cada email, extraia `Message-ID`.
2. Extraia `In-Reply-To` (parent direto) e `References` (cadeia completa, ordem cronológica).
3. Construa DAG:
   - nó = Message-ID
   - aresta = In-Reply-To (child → parent)
4. Raiz da thread = nó sem `In-Reply-To` (ou cujo parent está fora do dataset).

**Algoritmo Jamie Zawinski** (usenet 1997) é a referência canônica para thread reconstruction — funciona com `References` mal-formadas, Subject "Re: Re: Fwd: Re:" e loops. Implementações: `jwz-threading` (Python), `algorithm-jwz` (JS).

**Anti-padrão:** thread por Subject. Falha em: 2 threads paralelas com mesmo assunto, "Re:" perdido em cliente estranho, subject alterado no meio da thread.

### Date

`Date: Wed, 02 Jul 2026 14:30:00 -0300`

Parse RFC 5322 (não ISO 8601). Bibliotecas: `email.utils.parsedate_to_datetime` (Python), `date-fns/parseRFC822` (JS).

**Fuso:** sempre normalize para UTC no storage. Perder o offset original **é** perda de informação (para forense, importa).

## Parse: body

### text/plain vs text/html — quando usar qual

Multipart/alternative geralmente contém **ambas**. Regra de escolha:

| Uso | Preferência | Motivo |
|---|---|---|
| Indexação/busca | `text/plain` | Menos ruído; sem tags |
| Exibição UI | `text/html` (sanitizado) | Formatação original |
| Análise NLP | `text/plain` | Já limpa |
| Extração de link/entidade | HTML → `text/plain` via html-to-text | HTML tem estrutura útil (href, alt) |
| Archival | AMBAS | Preservação forense |

**Se só existe `text/html`:** converta para `text/plain` via lib madura (`html2text` Python, `html-to-text` JS). Não use regex.

### Encoding do body

| Content-Transfer-Encoding | Como decodificar |
|---|---|
| `7bit` | direto |
| `8bit` | direto |
| `quoted-printable` | `quopri.decodestring` / `libqp` |
| `base64` | `base64.b64decode` |
| `binary` | raro; direto |

**Charset:** lido de `Content-Type: text/plain; charset=UTF-8`. Se ausente ou "unknown-8bit", use `chardet` (Python) ou `chardet` (Node) com threshold ≥ 0.8; abaixo disso, tag `charset_uncertain` e mantenha bytes crus.

### HTML "sujo" (Outlook/Gmail)

- CSS inline massivo (Outlook injeta `<o:p>`, `mso-*`)
- Encoding duplicado (`&amp;amp;`)
- Espaços não-quebráveis `\xa0` misturados
- `<div>` aninhado sem sentido

**Higienização mínima para texto:**
```
html → strip <script>/<style> → decode entities → 
collapse whitespace → strip Outlook namespace tags
```

**Para exibição:** sanitize com DOMPurify (JS) ou bleach (Python) com allowlist RESTRITA (`p`, `a href`, `img src`, `br`, `strong`, `em`, `ul`, `li`). Sem `<script>`, `<iframe>`, `<object>`.

## Parse: anexos

### Identificação

`Content-Disposition: attachment; filename="fatura.pdf"` ou `inline; filename=...`.

Filename pode ser RFC 2231 encoded (multi-parte, UTF-8):
```
Content-Disposition: attachment;
  filename*0*=UTF-8''fatura%20;
  filename*1=marco.pdf
```

Use lib (`email.message.Message.get_filename` em Python decodifica isso).

### Validação de MIME type

`Content-Type` do anexo é **declarado** pelo remetente — não confie. Sempre valide com **magic bytes** (`libmagic`, `python-magic`, `file-type` JS).

| Content-Type declarado | Magic bytes | Ação |
|---|---|---|
| `application/pdf` | `%PDF-` | ✅ aceitar |
| `application/pdf` | `PK\x03\x04` (zip) | 🚨 mismatch — quarentena |
| `image/jpeg` | `\xff\xd8\xff` | ✅ aceitar |
| `application/octet-stream` | qualquer | ⚠️ ambíguo — determine via magic |

### Sanitização de nome de arquivo

Antes de salvar em disco/S3:
- Strip path separators (`../`, `\\`)
- Rejeitar caracteres de controle
- Normalizar Unicode (NFC)
- Limitar tamanho (255 chars max)
- Preservar extensão real, não a declarada

**Nunca** execute anexo. Nunca abra automaticamente. Se pipeline downstream precisa "abrir" (OCR, parser de fatura), rodar em sandbox (container efêmero, sem rede, filesystem read-only exceto tmpdir).

### Inline images (Content-ID)

HTML body faz `<img src="cid:image001">`; parte MIME correspondente tem `Content-ID: <image001>`. Ao exibir, resolva cid: para data URI ou URL temporária.

## Verificação DKIM/DMARC/SPF

Três camadas de autenticidade — cada uma responde pergunta diferente:

| Sinal | Pergunta | Método |
|---|---|---|
| **SPF** | O IP que enviou está autorizado pelo domínio do envelope? | DNS TXT record `v=spf1 ...` |
| **DKIM** | A mensagem foi assinada criptograficamente pelo domínio? | Header `DKIM-Signature`, chave pública em DNS |
| **DMARC** | O domínio do `From:` alinha com SPF ou DKIM válido? | DNS TXT `_dmarc.dominio` |

**Bibliotecas:**
- Python: `dkimpy`, `authres`, `dmarc`
- Node: `mailauth` (Andris Reinman)
- Referência: pacote `opendkim` no Postfix serve de base

**Regra Kolden para pipeline de ingestão:**
- SPF `pass` + DKIM `pass` + DMARC `pass` → aceitar
- DMARC `fail` com política `reject` → descartar (não persistir)
- DMARC `fail` com política `quarantine` → tag `suspect` e não indexar em resposta ao usuário
- SPF `softfail` + DKIM `pass` → aceitar (DKIM sobrepõe)

**Nunca** exiba "verificado" ao usuário sem checar alinhamento DMARC — DKIM válido de outro domínio (`gmail.com` assinando spoof de `kolden.com.br`) não prova nada.

## Deduplicação

**Chave primária lógica:** `Message-ID`. Se conflito (dois emails com mesmo Message-ID mas conteúdo distinto), reter o mais antigo por `Date` e logar warning — geralmente é mail loop ou cliente bugado.

**Se Message-ID ausente** (mail cliente antigo, rara mas acontece): hash SHA-256 de `(From, Date, Subject, primeiro-KB-do-body)`.

## Cross-links

- `invariantes-de-pipeline-de-dados` — pipeline de ingestão de emails deve declarar invariantes (null rate de Message-ID = 0, dedup rate baseline)
- `remediacao-air-gapped` — anexo de origem duvidosa → sandbox antes de OCR
- `seguranca-de-aplicacoes-web-owasp` (Égide) — para heurísticas de phishing além de DMARC

## Herança histórica

**RFC 5322** (Resnick, 2008; sucessor de RFC 2822/822) — o formato canônico. Ler seções 2.2 (headers) e 3.6.4 (Message-ID) antes de escrever parser.

**RFC 2045-2049** (Freed & Borenstein, 1996) — MIME. Multipart, content-transfer-encoding, RFC 2047 encoded-words.

**Jamie Zawinski** (Netscape, 1997) — thread reconstruction algorithm. Base de toda inbox moderna (Gmail, Outlook usam variantes). Especificação em https://www.jwz.org/doc/threading.html.

**Andris Reinman** (Nodemailer, mailparser) — implementação de referência JS para MIME. Ler tests do `mailparser` é o melhor tutorial.

**James Gosling** (protocolos de rede, "Postscript, Java") — princípio "be liberal in what you accept, conservative in what you send" (Postel). Email é o caso extremo — 40 anos de clientes buggy no mundo. Parser DEVE ser tolerante; produtor NÃO deve gerar lixo.

**John Levine** ("The Internet for Dummies", "Internet Email"): DKIM/DMARC operacional — como implantar sem quebrar mailing lists.

## Anti-padrões

- ❌ Parse de From/To por regex — quebra em 5min de produção real
- ❌ Thread por Subject — falha determinística
- ❌ Confiar em Content-Type do anexo — spoof trivial
- ❌ Executar anexo automaticamente para "analisar" — vetor de RCE
- ❌ Charset detection por chute (sem chardet) — mojibake permanente
- ❌ Ignorar DKIM/DMARC porque "SPF passa" — spoof cross-domain
- ❌ Reescrever parser MIME em vez de usar lib madura — reinventar 30 anos de bugs

---
*Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.*
