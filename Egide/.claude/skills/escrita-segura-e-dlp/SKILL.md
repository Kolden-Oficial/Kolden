---
name: escrita-segura-e-dlp
description: >-
  Use sempre que for escrever um arquivo de flag/estado/segredo de forma segura,
  ou antes de mandar o conteúdo de um arquivo para um LLM/serviço externo. Cobre
  dois padrões de hardening reusáveis: (1) escrita symlink-safe (O_NOFOLLOW,
  temp+rename atômico, permissão 0600, whitelist de diretório) e (2) DLP de
  pré-envio (denylist de paths sensíveis + cap de tamanho antes de qualquer
  chamada a LLM). Eixo de hardening/DLP da Égide, reusável por qualquer squad.
domain: ciberseguranca
subdomain: hardening-dlp
tags: [symlink-safe, o-nofollow, escrita-atomica, dlp, denylist, vazamento-de-dados, hardening]
---

# Escrita Segura e DLP

> Defensiva e preventiva. Estes padrões evitam dois bugs de segurança comuns e silenciosos:
> seguir um symlink malicioso ao escrever um arquivo, e vazar um arquivo sensível para um serviço
> externo sem perceber.

## Padrão 1 — Escrita symlink-safe de arquivo sensível

Escrever um arquivo de flag/estado/segredo ingenuamente (`open(path, 'w')`) é vulnerável: se um
atacante planta um symlink em `path`, a escrita segue o link e sobrescreve um alvo arbitrário
(TOCTOU / symlink attack). O padrão seguro:

1. **`O_NOFOLLOW`** — abrir com a flag que recusa seguir symlink no último componente do path.
2. **Temp + rename atômico** — escrever num arquivo temporário no MESMO diretório e renomear por
   cima; o rename é atômico, então nunca há estado parcial visível.
3. **Permissão restritiva** — criar com modo `0600` (só o dono lê/escreve) desde a criação, não
   depois.
4. **Whitelist de diretório** — só permitir escrita dentro de um conjunto conhecido de diretórios
   (ex.: o diretório de estado do agente). Resolver o path real (realpath) e checar que cai dentro
   da whitelist ANTES de abrir.
5. **Tolerância a JSONC** — ao ler config (ex.: `settings.json`), aceitar comentários/trailing
   commas sem quebrar, mas validar os campos esperados antes de confiar.

Aplica-se a: arquivos de flag de modo, sentinelas (ex.: `.docker-aprovado` da quarentena),
qualquer escrita de segredo local. Casa com a regra Kolden de que segredo de verdade vive no
Infisical — isto protege os **artefatos de estado local**.

## Padrão 2 — DLP de pré-envio a LLM/serviço externo

Antes de mandar o conteúdo de um arquivo para um LLM ou serviço externo (resumir, comprimir,
analisar):

1. **Denylist de paths sensíveis** — recusar arquivos cujo path casa com padrões sensíveis:
   `.env`/`*.env`, `*.pem`/`*.key`/`*.cert`/`*.p12`, `.ssh/`, `.aws/credentials`, `*.secret`,
   `id_rsa*`, dumps de banco. Negar por padrão fora da whitelist de tipos esperados.
2. **Cap de tamanho** — rejeitar arquivos acima de um limite (ex.: 500 KB) **antes** de qualquer
   chamada — evita vazamento em massa e custo descontrolado.
3. **Sem `shell=True` / sem interpolação** — se houver subprocesso, lista de argumentos fixa,
   conteúdo via stdin, nunca string montada.
4. **Escopo de filesystem** — ler apenas o path que o usuário apontou; nunca varrer fora dele.

Este é o controle de DLP que faltava como padrão reusável: o `scanner-anti-injecao-resiliente`
herda a **denylist de paths** daqui para sua exclusão de falso-positivo e para não escanear/enviar
o que não deve.

## Critérios de validação
- Escrita de flag/segredo usa O_NOFOLLOW + temp-rename + 0600 + whitelist de diretório.
- Nenhum arquivo da denylist (`.env`, chaves, certs) é enviado a serviço externo.
- Há cap de tamanho aplicado antes da chamada externa.

---
*Fonte: `JuliusBrussee/caveman@25d22f86` (MIT), capacidades G19 (I/O symlink-safe:
`tests/test_symlink_flag.js`, `tests/test_compress_safety.py`) e G8 (denylist de paths sensíveis +
cap de tamanho antes de LLM: `skills/caveman-compress/SECURITY.md`). Padrões extraídos e reescritos
em PT-BR; nenhum código importado.*
