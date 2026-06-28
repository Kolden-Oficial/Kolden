# Ferramentas — Dike

Toda ferramenta usada pela Dike está documentada aqui (Constituição, Art. IV — sem invenção de
capacidade). **Infisical é sempre o primeiro item** (Art. VII — segredos nunca em texto puro),
mesmo quando não há credencial a buscar.

A Dike é deliberadamente **enxuta e sem rede**: ela opera apenas sobre o Contrato de Missão local
e um reflexo determinístico de hash. Não há ferramenta externa, API ou MCP — e não pode haver
(é justamente isso que torna o anti-falha `confere_hash` verificável e o agente fail-closed).

| # | Ferramenta | Função para a Dike | Acesso | Credencial |
|---|---|---|---|---|
| 1 | **Infisical** | Fonte única de segredos/credenciais da Kolden | MCP/CLI | **n/a — a Dike não usa credenciais** (não há rede). Se um dia precisar, é o único caminho: `/kolden/<ambiente>/<CHAVE>` |
| 2 | **Contrato de Missão** (YAML) | Ler o contrato inteiro (todas as seções e assinaturas); **escrever só** dentro da seção `dike` (já pré-semeada pelo template) | arquivo local | n/a |
| 3 | **Reflexo `confere-hash`** (sha256) | Recomputar `sha256(input_cru)` e comparar com `intencao_original.hash` — **determinístico**, é o Ato 1 (integridade) | script local (Bash + Python 3, fallback sem PyYAML) | n/a |

## Notas

- **Por que o reflexo de hash está aqui (e não é "ferramenta externa proibida"):** o `confere-hash`
  é **local e determinístico** — não toca rede. Ele precisa **existir e estar especificado**,
  senão o anti-falha cardinal (TPND=0) fica inverificável: um LLM "achando" que o hash bate é
  exatamente o modo de falha #6 do PRD. A integridade do lacre **nunca** é decidida por juízo do
  modelo.
- **Stub `dike:` pré-semeado:** o Contrato **sempre desce com a seção `dike:` já presente e
  vazia**, semeada pelo template (`Olimpo/contratos/contrato-de-missao.template.yaml`). A Dike
  **edita os campos existentes** dessa seção — não cria um bloco novo nem reescreve o arquivo
  inteiro. É isso que permite preencher o veredito sem violar o reflexo `escrita-restrita`.
- **Escrita restrita:** o reflexo `escrita-restrita` **nega um Write do arquivo inteiro** e
  qualquer escrita fora da seção `dike` — preserva o append-only do chassi (a Dike lê tudo,
  edita só a sua seção, já pré-semeada).
- **Sem rede, por princípio (Art. IV/V e Art. VII):** nenhuma chamada a Firecrawl, Exa, browser,
  banco ou API. A soberania da Dike vem de operar 100% sobre metadados locais de missão.
- **Reflexos de sessão da Dike** (determinismo é o coração da Dike, ver PRD §11.5; rodam em
  Bash + Python 3, fallback sem PyYAML): `confere-hash` (Ato 1 — recomputa o sha256);
  `valida-confere-hash` (PreToolUse — **impõe** ter rodado o `confere-hash` antes de você marcar
  `confere_hash: true`, fechando o modo de falha #6); `escrita-restrita` (append-only); auditoria
  em `registros/`; `marca-trabalho`; e `ritual-de-encerramento` (Stop). São reforço
  **determinístico** de guardrails, não ferramentas de capacidade.
- **`gate-de-subida` é gate do PIPELINE, não reflexo de sessão da Dike.** O CLI determinístico
  `.claude/reflexos/gate-de-subida.sh` (já existe) é invocado **pelo pipeline do Contrato** na
  subida e barra a entrega ao Hermes quando não há seção `dike` assinada (fail-closed). A Dike é
  invocada **pelo** pipeline — ela não dispara esse gate como hook da própria sessão. A fiação no
  runtime vivo entra na **Fatia 3**.
- **Mudou a necessidade?** Nenhuma ferramenta fora desta tabela. Precisou de outra? Atualize o
  **PRD (§5)** primeiro (Art. I — o PRD é a fonte da verdade) e só então este arquivo.
