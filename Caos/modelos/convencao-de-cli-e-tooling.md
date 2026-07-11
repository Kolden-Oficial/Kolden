---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/modelos/_indice|_indice]]"
---

# Convenção de CLI e tooling da Kolden

> Padrão absorvido de `coreyhaines31/marketingskills@8bfcdff` (G5 — convenção dos 64 CLIs zero-dep),
> reescrito em pt-BR e adaptado à camada Kolden (Infisical, vendor-agnóstico). Referenciado pela
> habilidade `criacao-de-mcp` (Fase 5.4) e por qualquer CLI/ferramenta própria de agente.
> **Não** se absorveu o código literal dos 64 CLIs (G4 — análise estática, Art. VIII); absorveu-se o **contrato**.

> **v2.5 — Art. IV refactored (Constituição):** este documento cobre o **contrato de CLI zero-dep** (padrão herdado de coreyhaines31/marketingskills). A partir de v2.5.0, toda tool consumida por agente Kolden é **MCP-nativa** por padrão; CLIs próprios criados por `criacao-de-mcp` são o **primeiro passo** antes da versão MCP-server, com plano de **dupla-vida de 90 dias** entre CLI e MCP (adapter mantém interface até MCP-nativo estar ligado). Após 90 dias, CLI que não virou MCP-nativo é BLOCK em Fase 6. Fonte: Anthropic 25/nov/2024 MCP spec.
>
> Este contrato de CLI **não é revogado** — permanece como o padrão para qualquer CLI/tool própria dentro da janela de dupla-vida.

## O contrato (toda CLI/ferramenta própria deve cumprir)

1. **Zero-dependência quando possível.** Script Node 18+ usando `fetch` nativo — sem `node_modules`
   para um simples cliente de API. Menos superfície de supply-chain, mais portabilidade.
2. **`--dry-run` obrigatório.** Toda CLI que faz efeito colateral (POST/PUT/DELETE, envio) aceita
   `--dry-run`: monta e mostra a requisição **sem enviar**. É o equivalente de tooling ao gate de
   aprovação humana — previne ação destrutiva acidental.
3. **Sem args = ajuda.** Rodar a CLI sem argumentos imprime o uso (não falha silenciosamente nem age).
4. **Auth por variável de ambiente, resolvida via Infisical.** A chave é lida de `{TOOL}_API_KEY`
   (ex.: `STRIPE_API_KEY`), **nunca hardcoded** — e essa env é injetada pelo Infisical (habilidade
   `infisical-padrao`, Art. VII). Nada de credencial em texto puro no script.
5. **Saída JSON.** A CLI emite JSON estruturado em stdout (não prosa), para ser encadeável por outro
   agente/ferramenta. Erros vão para stderr com código de saída ≠ 0.
6. **Verificação estática mínima:** `node --check <script>.js` (sintaxe) antes de versionar.

## Exemplo de cabeçalho de uso

```
node tools/<nome>.js                      # sem args -> imprime ajuda
node tools/<nome>.js <cmd> --dry-run      # pré-visualiza a requisição, não envia
{TOOL}_API_KEY=<via-infisical> node tools/<nome>.js <cmd>   # executa
```

## Onde aplicar
- CLIs auxiliares de um agente/squad (`<Squad>/tools/`, quando o PRD pedir).
- Wrappers de API próprios criados pela `criacao-de-mcp` antes de virarem MCP.
- Qualquer script de efeito colateral no ecossistema Kolden — o `--dry-run` é inegociável.
