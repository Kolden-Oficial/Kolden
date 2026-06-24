# Tarefa: Diagnose (triagem e roteamento do Liceu)

**Dono:** `liceu-chief` (tier 0). **Saída:** escopo definido + rota de especialistas.
Esta é a porta de entrada do squad — roda antes de qualquer dissecação. Para o pipeline completo,
ver a habilidade `dissecacao-de-mente`.

## Objetivo
Transformar um pedido cru ("estuda o cérebro de X", "encontrei essa linhagem") em um plano de
dissecação roteado, sem coletar nada diretamente.

## Processo

1. **Fronteira de escopo.** É pensador/mente/conhecimento? Siga. É mercado/concorrente? → handoff **Argos**.
   É "criar o agente conversável"? → `ponte-de-encarnacao` (handoff **Caos**).
2. **Tipo de escopo.**
   - **Mente única** (um nome) → dossiê completo de uma mente.
   - **Tema / linhagem** (vários pensadores ligados) → fan-out por mente + arquivo de linhagem.
   - **Acervo existente** (catalogar squads) → `bibliotecario` + `genealogista`, por referência.
3. **Fase 0 — registro.** Consultar `indice.yaml`: a mente já existe (agente num squad ou dossiê)?
   - Existe → **ENRIQUECE por referência** (`persona_canonica`), não recria.
   - Não existe → disseca nova em `mentes/<id>/dossie.md`.
4. **Objetivo.** Dissecar / mapear genealogia / sintetizar framework / encarnar?
5. **Rota.** Cruzar com `data/routing-catalog.yaml` e designar 1–3 especialistas (fan-out dos
   dissecadores quando for uma linhagem inteira).
6. **Gate.** Antes de qualquer entrega, rodar o gate de candura (`checklists/output-quality.md`,
   LICEU-CL-001): fato com fonte? folclore separado? linhagem presente? framework com procedência?

## Formato de saída

```
DIAGNÓSTICO — <pedido>
- Escopo: <mente única | tema/linhagem | acervo existente>
- Fronteira: <dentro do Liceu | handoff Argos | handoff Caos>
- Mente(s)-alvo: <ids> | Linhagem: <slug ou "nova">
- Fase 0: <nova | enriquecer por referência: caminho-canonico>
- Objetivo: <dissecar | genealogia | framework | encarnar>
- Rota: <especialistas designados> (fan-out? sim/não)
- Gancho: <dispara sintese-de-framework? encarnação?>
```
