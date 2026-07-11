---
name: registro-de-entidade
description: Registra uma entidade recém-criada (agente, squad, skill, hook, subagent) no registro de entidades e captura os padrões aprendidos. Use na Fase 8 do Ritual, na entrega, após o agente passar na revisão e no teste de comportamento.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Registro de Entidade (Fase 8)

Fecha o loop de aprendizado. Delegue ao especialista `curador`. Só roda após o agente ser
**aprovado** (Fase 6) e passar no **teste de comportamento** (Fase 7).

## Processo

1. Abra `dados/registro-de-entidades.yaml` e adicione a entidade criada sob `entidades:`,
   preenchendo todo o esquema (`path`, `tipo`, `dominio`, `proposito`, `keywords`,
   `usadoPor`, `dependencias`, `adaptabilidade`, `versao`, `criadoEm`).
   - As `keywords` devem ser as mesmas que fariam a Fase 0 encontrar esta entidade no futuro.
   - O `adaptabilidade.score` reflete quão fácil é reaproveitar (alto = genérico/parametrizável).
2. Se a criação foi **ADAPT**, registre a entidade-base em `dependencias` e atualize o
   `usadoPor` da entidade-base.
3. Se a criação foi **CREATE**, inclua a justificativa (por que nada existente serviu) no
   campo `proposito` ou em comentário.
4. Capture aprendizados em `dados/padroes-aprendidos.yaml`: o que acelerou o diagnóstico,
   decisões de arquitetura que se repetiram, antipadrões evitados.
5. Atualize `registros/historico.md` com a nova linha (data, agente, versão, domínio,
   tempo por fase, status, lições, resumo).
6. Atualize `versao_do_registro` e `atualizado_em` no topo do registry.

## Saída

```
REGISTRADO
Entidade: <id> (<tipo>, domínio <dominio>)
Decisão de origem: REUSE | ADAPT | CREATE
Padrões capturados: <n> em padroes-aprendidos.yaml
Histórico atualizado: registros/historico.md
```

## Regras

- Só o `curador` escreve no registry e nos padrões (Constituição + autoridade-de-especialistas).
- Nunca registre uma entidade que não passou na Fase 7 (maturity ≥ 7.0).
- Keywords pobres quebram o loop de aprendizado: capriche para a Fase 0 futura encontrar.
