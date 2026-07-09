---
name: remediacao-air-gapped
description: Use quando precisar mover código, dados ou payloads entre um ambiente isolado (air-gapped, quarentena, rede sensível) e o mundo externo com **rastreabilidade forense** — inventário do que entra/sai, chain-of-custody, hash antes/depois, validação em sandbox. Cobre remediação de sistemas air-gapped, transferência via drive removível auditado e conformação com o **invariante Caos de absorção sem perda** (PERDIDO=0). Gatilhos típicos: "sistema air-gapped", "rede isolada", "quarentena", "drive USB auditado", "transferir para o ambiente sensível", "remediar sistema legado offline". NÃO substitui `ingestao-de-repositorio` do Caos (essa é o pipeline canônico de absorção de repo externo); esta habilidade é a **régua operacional** para transferências entre bolhas seguras.
agent-owner: data-engineer (Dara)
maturity: 7.5
origem: msitarzewski/agency-agents@a597cb6 · IDs G1-G4 · bucket B03 engineering
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Remediação de Sistemas Air-Gapped

## Herança Histórica

**Metodologia base:** _NIST SP 800-82 Rev. 3_ (Guide to Operational Technology Security, 2023) — capítulo sobre transferência de dados entre zonas de confiança + _CISA Cross-Domain Solutions_ (2022). Complementado por Rick Kaun (SANS ICS515 — Active Defense and Incident Response) para o pilar de chain-of-custody em sistemas de controle industrial. O invariante `PERDIDO=0` é herança direta do **Caos/protocolo-de-absorcao-sem-perda** — a mesma disciplina aplicada agora à passagem de bolha para bolha.

**Assinatura vocabular:** "chain-of-custody", "bolha", "trusted zone", "transfer manifest", "hash antes/depois", "sandbox de detonação", "SAFE/QUARENTENA/REJEITAR".

## Quando invocar

Dispara quando:
- Precisa mover arquivo/repositório de um sistema sensível (produção regulada, rede OT/ICS, banco de dados de cliente) para um ambiente de desenvolvimento — ou vice-versa.
- Precisa auditar o que já foi transferido no passado (auditoria forense retroativa).
- Precisa desenhar o **transfer manifest** de uma operação recorrente (job de sync entre bolhas).
- Precisa remediar um sistema legado offline que não pode receber patches pela rede (patch via mídia removível).

NÃO dispara quando:
- Transferência entre repositórios GitHub abertos (usar `git clone` direto).
- Absorção de repo externo de terceiro na Kolden (usar `ingestao-de-repositorio` do Caos — pipeline completo com F0-F7).

## O Método (5 estágios com gates)

### Estágio 1 — Inventário de origem

Antes de mover qualquer bit, produza o **inventário de origem** com:

| Campo | Regra |
|---|---|
| `origem_zona` | Nome da bolha de origem (ex.: "prod-financeiro-regulado", "rede-OT-fabrica-3") |
| `destino_zona` | Nome da bolha de destino |
| `motivo` | Por quê (patch de segurança? bug fix? backup?) — 1 frase |
| `arquivos[]` | Lista completa: `{caminho, tamanho, sha256, mtime}` |
| `total_bytes` | Soma de `tamanho` |
| `total_arquivos` | Contagem |
| `operador` | Humano responsável (nome + carteira) |
| `timestamp_utc` | Início da coleta |

**Gate 1:** o inventário deve fechar contra a origem — checagem por `sha256sum` de cada arquivo. Se algum arquivo mudou durante a coleta (mtime avançou), refazer.

### Estágio 2 — Chain-of-custody na mídia

Toda transferência via mídia removível (USB, disco offline, DVD) recebe:

1. **Etiqueta física** com ID único (ex.: `KLD-XFER-2026-07-02-001`).
2. **Sela de segurança** (tamper-evident) quando a mídia sai de posse do operador.
3. **Log de custódia**: cada handoff registra `{de_quem, para_quem, timestamp, local, sela_intacta_sim_nao}`.

O log vive em `.aiox-core/data/chain-of-custody.jsonl` (append-only, um evento por linha) — o formato JSONL segue o mesmo padrão do ledger de achados que a Dike já usa.

**Gate 2:** sela quebrada em qualquer handoff = mídia REJEITADA. Refazer transferência do zero, investigar handoff comprometido.

### Estágio 3 — Detonação em sandbox

Antes de o arquivo tocar a zona de destino, ele passa por **sandbox de detonação** — VM/container isolado, sem rede, sem persistência:

1. Hash na entrada da sandbox = hash do inventário? Sim/Não.
2. Análise estática (não executa): `file`, `strings`, magic bytes, `readelf`/`pefile` para binários.
3. Comparação contra baseline conhecido (quando existe): `sha256` do arquivo bate com o esperado?
4. Para código: rodar `verificacao-de-seguranca-de-repo` (skill Caos) — reusa análise estática, sem execução.
5. Veredito: **SAFE** / **QUARENTENA** (precisa de revisão humana) / **REJEITAR** (assinatura maliciosa clara).

**Gate 3:** sem SAFE, o arquivo não sai da sandbox. QUARENTENA escala ao Égide. REJEITAR encerra a transferência.

### Estágio 4 — Aplicação na zona de destino

Só após SAFE:
1. Copia da sandbox para a zona de destino.
2. Hash pós-copia = hash pré-copia? Se não, aborta e refaz.
3. Registra em `.aiox-core/data/transferencias.jsonl` (append-only):

```jsonl
{"id":"KLD-XFER-2026-07-02-001","origem":"...","destino":"...","operador":"ronan","total_arquivos":42,"total_bytes":1048576,"veredito_sandbox":"SAFE","ts_conclusao":"2026-07-02T15:30:00Z"}
```

### Estágio 5 — Invariante de conservação (PERDIDO=0)

Ao final da transferência:

```
contagem(inventário_origem) == contagem(arquivos_no_destino) + contagem(rejeitados) + contagem(quarentena_pendente)
soma_hashes(inventário) === soma_hashes(destino ∪ rejeitados ∪ quarentena)
```

Se o invariante falha, algo sumiu no meio do caminho — auditar log de custódia, sandbox e destino até localizar o bit perdido. **Não fechar a transferência com perda silenciosa.**

**Gate 5 (cross-link Caos):** este é o mesmo princípio do `protocolo-de-absorcao-sem-perda` — arquivo/bit ou vai para ABSORVIDO, ou para DESCARTADO/QUARENTENA, nunca para o vazio.

## Templates operacionais

**Manifest de transferência** (`.aiox-core/data/xfer-manifest-template.yaml`):

```yaml
id: KLD-XFER-YYYY-MM-DD-NNN
origem_zona:
destino_zona:
motivo:
operador:
timestamp_utc_inicio:
arquivos:
  - caminho:
    tamanho_bytes:
    sha256:
    mtime_utc:
total_bytes:
total_arquivos:
sela_id: (após lacrar mídia)
```

**Log de handoff** (append `.aiox-core/data/chain-of-custody.jsonl`):

```jsonl
{"xfer_id":"...","evento":"handoff","de":"...","para":"...","ts":"...","sela_intacta":true,"local":"..."}
```

## Anti-padrões

- Transferir sem sandbox porque "confio na origem" — a bolha existe justamente para eliminar essa confiança implícita.
- Reusar mídia entre operações sem `dd if=/dev/zero` (ou equivalente) — reciclagem sem wipe = contaminação cruzada.
- Log de custódia em ferramenta editável (planilha Google) em vez de append-only — permite reescrever história.
- Fechar transferência com "1 arquivo suspeito, deixa pra depois" — QUARENTENA pendente é bloqueio, não pendência.

## Cross-links

- Caos → `protocolo-de-absorcao-sem-perda` (mesma disciplina PERDIDO=0, aplicada a repos externos).
- Caos → `verificacao-de-seguranca-de-repo` (motor de análise estática reusado no Estágio 3).
- Égide → `defesa-phishing-e-ransomware` e `caca-a-ameacas-orientada-a-hipotese` (escalação em veredito QUARENTENA).
- Prometeu → `governanca-de-contratos-de-api` (quando a transferência é payload de API cross-zona).

---

Adaptado de github.com/msitarzewski/agency-agents@a597cb6 (MIT), bucket B03/engineering.
