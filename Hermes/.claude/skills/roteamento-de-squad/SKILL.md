---
name: roteamento-de-squad
description: "Roteia pedidos do usuário para o squad certo da Kolden (Peitho/tráfego, etc.) e o executa via shell-out ao Claude Code. Use quando o pedido casar com um domínio de squad do catálogo."
version: 1.0.0
platforms: [windows]
metadata:
  hermes:
    tags: [orquestracao, roteamento, squads, kolden, peitho]
    related_skills: []
tipo: skill
area: Hermes
up: "[[Hermes/_MOC-hermes]]"
---

# Roteamento de Squad (Hermes como orquestrador máximo)

## Quando usar

Quando o pedido do usuário pertencer ao domínio de um squad da Kolden (ex.: tráfego pago,
social media, validação de produto). Você não executa o trabalho de domínio — você **roteia**
para o chief do squad e devolve o resultado.

## Passo a passo

1. **Leia o catálogo** `C:\Kolden\Hermes\squads-catalog.yaml` (campo `keywords` de cada squad).
2. **Case a intenção** do usuário com as `keywords`. Se nenhum squad casar, responda você mesmo
   ou diga que não há squad para isso.
3. **Despache** pelo seu terminal, chamando o script de ponte:

   ```
   powershell -File C:\Kolden\Hermes\scripts\invoca-squad.ps1 -Squad <id> -Prompt "<pedido do usuário>"
   ```

   - O script faz o `claude` headless adotar a persona do chief e devolve a resposta no stdout.
   - Squad longo? Rode em **background** e avise o usuário quando terminar.
4. **Sintetize** o retorno do squad numa resposta curta e entregue no canal de origem.

## Portão de aprovação (inegociável) — protocolo de duas etapas

Se o squad tiver `muda_algo: true`:

1. **Diagnóstico-primeiro:** despache **sem** `-Approved`. O script força modo somente-diagnóstico
   (o chief lê/analisa/relata, mas é proibido de agir). Entregue os achados + o que faria.
2. **Aprovação:** só depois de um "ok" explícito do Ronan, redespache **com** `-Approved`:

   ```
   powershell -File C:\Kolden\Hermes\scripts\invoca-squad.ps1 -Squad <id> -Prompt "<ação>" -Approved
   ```

Nunca passe `-Approved` por conta própria. O `-Approved` é a trava no nível do script: sem ele,
ação que muda o mundo (subir/pausar campanha, gastar verba, publicar, alterar dado externo) é
bloqueada mesmo que você esqueça o portão. Diagnóstico/leitura/relatório nunca precisam de aprovação.

## Aprendizado pós-rota (leve)

Depois de uma rota, se algo foi **não-óbvio** — uma keyword não casou e devia, o squad respondeu
fora do esperado, um chief estava com path errado — registre **uma linha** na sua memória
(`C:\Kolden\Hermes\agent-memory\hermes.md`, seção "Ponte Hermes → squads") com data absoluta.
Não registre rotas triviais que correram normais. Qualidade > volume.

## Limites

- Você fala com squads por **shell-out**; não os "vira". Cada squad roda isolado no seu diretório.
- Criar agente/squad novo é trabalho do **Caos** (interativo) — apenas avise, não tente headless.
- Segredos sempre via **Infisical**, nunca em texto puro.
