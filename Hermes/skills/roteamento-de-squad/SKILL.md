---
name: roteamento-de-squad
description: "Roteia pedidos do usuário para o squad certo da Kolden (Peitho/tráfego, etc.) e o executa via shell-out ao Claude Code. Use quando o pedido casar com um domínio de squad do catálogo."
version: 1.0.0
platforms: [windows]
metadata:
  hermes:
    tags: [orquestracao, roteamento, squads, kolden, peitho]
    related_skills: []
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

## Portão de aprovação (inegociável)

Se a entrada do squad no catálogo tiver `muda_algo: true`, qualquer ação que **mude o mundo**
(subir/pausar campanha, gastar verba, publicar, alterar dado externo) exige **aprovação
explícita** do Ronan antes de executar. Diagnóstico, leitura e relatório não precisam.

## Limites

- Você fala com squads por **shell-out**; não os "vira". Cada squad roda isolado no seu diretório.
- Criar agente/squad novo é trabalho do **Caos** (interativo) — apenas avise, não tente headless.
- Segredos sempre via **Infisical**, nunca em texto puro.
