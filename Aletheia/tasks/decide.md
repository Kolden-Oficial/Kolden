---
task: decide()
responsavel: "@aletheia-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: false

Entrada:
  - campo: validation_evidence
    tipo: object
    origem: Workflow / Sessão
    obrigatorio: true

Saida:
  - campo: decision
    tipo: object
    destino: Console / Handoff
    persistido: true
tipo: nota
area: Aletheia
up: "[[Aletheia/_MOC-aletheia]]"
relacionado:
  - "[[Aletheia/tasks/_indice|_indice]]"
---

# Tarefa: Gate de Evidência + Decisão — Aletheia

## Metadados

| Campo        | Valor                                                       |
|--------------|-------------------------------------------------------------|
| Task ID      | `aletheia:decide`                                           |
| Comando      | `@aletheia gate` / `@aletheia journey` (fase final)        |
| Orquestrador | `aletheia-chief`                                            |
| Propósito    | Rodar o gate de evidência sobre toda a validação e emitir um veredito: perseverar, pivotar ou parar. Se perseverar para build, preparar o handoff. |

## Pré-condições

- Evidência das fases anteriores disponível (descoberta, assunções, experimento, demanda)
- Checklist `checklists/output-quality.md` carregado

## Fases

### Fase 1: Rodar o Gate de Evidência (8 critérios)

Verifique cada critério do `quality_review_criteria` do aletheia-chief:

1. A dor é real e validada (fatos do passado, não opinião)?
2. Resolve um job/outcome subatendido?
3. A hipótese principal é explícita e falsificável?
4. O MVP/experimento é o menor que testa a assunção mais arriscada?
5. Existe métrica de validação com critério de sucesso?
6. Existe critério de kill declarado?
7. A demanda foi provada com skin-in-the-game data (não opinião)?
8. Um leigo entenderia a recomendação?

### Fase 2: Aplicar o VETO INVIOLÁVEL

> Se a saída recomenda **construir/escalar/lançar** e falta QUALQUER um de:
> (a) dor validada, (b) hipótese falsificável, (c) métrica de validação com critério de sucesso,
> (d) critério de kill → **HALT**. Não emita "perseverar para build". Em vez disso, devolva
> exatamente o que falta testar e o experimento para testá-lo.

### Fase 3: Emitir a Decisão

Escolha um dos três:

- **PERSEVERAR** — a evidência sustenta a hipótese. Se for para build, gate 100% aprovado →
  preparar handoff.
- **PIVOTAR** — parte da evidência é forte, mas a hipótese central falhou. Nomear o tipo de
  pivô (segmento, problema, solução, etc., conforme Ries) e o próximo experimento.
- **PARAR** — a evidência refuta a dor/demanda. Documentar o aprendizado e liberar o fundador
  para a próxima ideia (isso é sucesso: economizou runway).

### Fase 4: Preparar o Handoff (apenas se PERSEVERAR para build)

Monte o pacote para o squad de execução certo (ver `squad.yaml > external_handoffs`):

| Destino    | Quando                                   | Artefato entregue |
|------------|------------------------------------------|-------------------|
| Aglaia     | Dor/ICP validados                        | Síntese + ICP/persona; preenche sobre-a-empresa/mercado-e-posicionamento/ |
| Pluto      | UVP validada                             | Proposta de valor → oferta + preço |
| Harmonia   | Tipo de MVP definido (interface)         | Requisitos de UX/UI |
| Caliope    | Precisa de landing/copy de validação     | Brief de copy |
| Prometeu   | MVP funcional (software)                 | Critérios de validação + escopo mínimo via geracao-de-prd |
| Metis      | Precisa instrumentar métricas            | North Star + métrica de validação |

## Formato de Saída

```yaml
decision:
  verdict: "{PERSEVERAR|PIVOTAR|PARAR}"
  gate_passed: {true|false}
  evidence_summary: "{o que foi validado e como}"
  failing_criteria: ["{critérios não atendidos, se houver}"]
  rationale: "{por que esta decisão, ancorada na evidência}"
  next_step: "{próximo experimento OU handoff}"
  handoff:
    to: "{squad ou null}"
    artifact: "{o que é entregue}"
  kill_criteria: "{sob que evidência futura a gente para}"
```

## Critérios de Conclusão

- [ ] Os 8 critérios do gate foram verificados
- [ ] O veto inviolável foi aplicado (HALT se build sem os 4 requisitos)
- [ ] Veredito explícito emitido (perseverar/pivotar/parar)
- [ ] Próximo passo definido (experimento ou handoff)
- [ ] Se build: pacote de handoff montado e squad de destino nomeado
