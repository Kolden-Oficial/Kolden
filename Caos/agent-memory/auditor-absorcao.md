---
tipo: memoria
squad: Caos
up: "[[_MOC-memorias]]"
relacionado:
  - "[[Caos/agent-memory/caos|caos]]"
---

# Memória do Agente auditor-absorcao

> Memória de um auditor adversarial EXTERNO (não-Caos) que diagnostica o pipeline de absorção.
> Mantida separada de `caos.md` para não confundir achados de auditoria com a memória operacional do Caos.

## Padrões Ativos

### Pipeline de absorção do Caos (estado verificado 2026-06-24)
- O pipeline `/absorver` (`ingestao-de-repositorio`, v3.3.0) tem **Pilar 5 (Verificar/reconciliar saída × inventário F3) AUSENTE**: `revisor` e `testador` conferem só contra PRD+checklist, nunca contra o inventário de capacidades. É a causa-raiz de perda silenciosa (TPND=1.0 estrutural). | 2026-06-24
- **Só Preservar (F1) é aplicado à força** (reflexo `bloqueio-de-quarentena.sh` BLOCK). Inventariar/Integrar/Verificar são `[IMPLÍCITO]` — dependem do modelo seguir o prompt. | 2026-06-24
- A F3 (inventário) é gate **WARN, não BLOCK** — inventário incompleto/ausente não trava o pipeline. | 2026-06-24
- **Hermes NÃO participa da absorção** (`grep` 0 ocorrências em Hermes/AGENTS.md e CLAUDE.md). É camada de runtime/REUSE (checar tools nativas antes de vendorizar), não transformador de capacidade. | 2026-06-24

### Evidência de campo (única absorção real)
- `coreyhaines31/marketingskills@8bfcdff` foi absorvido como smoke-test em 2026-06-22 e **parou na F5** (`decisao: PARCIAL`, `entidades: []`, `status: parcial`). F6/F7 = 0 execuções. | 2026-06-24
- `Caos/registros/absorcao/` **nunca foi criado** — os artefatos F2/F3/F4 (seguranca.md, inventario-de-capacidades.md, mapa-de-decisao.md) não foram persistidos. O único registro durável é o campo `capacidades` do ledger: **3 bullets de prosa** (viola o Pilar 2 que exige inventário estruturado, não prosa). | 2026-06-24
- Gotcha: `_staging/quarentena/` é gitignored e "limpável após a absorção" → a fonte-da-verdade imutável é **descartável**; quando limpa com o inventário ainda em prosa, a perda vira permanente. | 2026-06-24

### Método de auditoria (o que funcionou)
- **Reusar o artefato real da quarentena como caso de teste é mais honesto que re-clonar ou simular** o processo — evita "teste fingido" e usa a saída durável genuína do sistema. Gabarito manual (capacidade→arquivo:linha) + diff contra a saída real. | 2026-06-24
- Medir perda em **granularidade de técnica**, não de domínio: "copy = REUSE (Caliope)" esconde dezenas de técnicas não-verificadas. Carimbo "já temos" no nível de domínio é o vetor clássico de perda silenciosa. | 2026-06-24
- Condição de parada respeitada: n=1 prova **existência** de perda silenciosa, não **taxa média** (deixar como INCONCLUSIVO em vez de inflar). | 2026-06-24

## Candidatos a Promoção
- **Toda absorção/transformação generativa precisa de uma etapa de reconciliação que confronte a saída contra o inventário de entrada e emita relatório de perda (sem ela, perda silenciosa por construção)** | Origem: auditor-absorcao, Caos (pipeline /absorver) | Detectado: 2026-06-24
- **"Salvaguarda opcional = salvaguarda que falha": gate por prompt sem reforço determinístico (reflexo/aritmética) é pulado na primeira corrida real** | Origem: auditor-absorcao, Caos | Detectado: 2026-06-24

## Arquivado
<!-- vazio -->
