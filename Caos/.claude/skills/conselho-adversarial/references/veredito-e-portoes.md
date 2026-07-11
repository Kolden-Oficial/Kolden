---
tipo: nota
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Veredito tipado e rubrica compartilhada — referência do conselho adversarial

## Arquitetura da dupla revisão cega (santa-method)

```
        GERADOR (Agente A) — produz o entregável (geração normal, sem mudança)
                 │ output
                 ▼
   REVISÃO DUPLA INDEPENDENTE — Revisor B e Revisor C, em paralelo
     · mesma rubrica · mesmas entradas (spec + output) · contexto isolado
                 │                 │
                 ▼                 ▼
        PORTÃO DE VEREDITO:  B passa E C passa → APROVADO ; senão → REPROVADO
                 │                                   │
              APROVADO                            REPROVADO
                 │                                   │
              [ ENVIAR ]                    CICLO DE CORREÇÃO
                                            · junta todas as marcações
                                            · conserta tudo
                                            · iteração++; se > MAX → escala a humano
                                            · senão → volta à revisão dupla
```

Invariantes da revisão (quebram o auto-review enviesado):
1. **Isolamento de contexto** — nenhum revisor vê o veredito do outro.
2. **Rubrica idêntica** — ambos recebem os mesmos critérios.
3. **Mesmas entradas** — ambos recebem a spec original **e** o output gerado.
4. **Veredito tipado** — saída estruturada, não prosa.

## Esquema do veredito tipado

```yaml
revisor: B            # ou C
veredito: passa | reprova
violacoes:
  - criterio: "<id do critério da rubrica>"
    severidade: bloqueia | aviso
    evidencia: "<trecho/linha que prova a violação>"
    correcao_sugerida: "<o conserto mínimo>"
resumo: "<1 linha>"
```

Portão: aprovado **somente** se `B.veredito == passa AND C.veredito == passa`. Qualquer
`reprova` (ou divergência) → reprovado → ciclo de correção. Sem exceção, sem "aprovar para sair
do loop". Atingiu `MAX` iterações sem convergir → **escala a humano** com o histórico das marcações.

## Rubrica compartilhada (modelo)

A rubrica é a mesma para B e C. Critérios verdadeiro/falso, ligados ao núcleo do entregável —
nada de "ficou bom". Exemplo para um output de cliente:

```yaml
rubrica:
  - id: claims-verificaveis
    pergunta: "Toda afirmação factual/estatística tem fonte ou é verificável?"
  - id: sem-alucinacao-de-api
    pergunta: "Nomes de API/função citados existem e estão corretos?"
  - id: restricao-de-marca
    pergunta: "Respeita a voz e as restrições de marca declaradas na spec?"
  - id: completude
    pergunta: "Cobre todos os itens pedidos na spec, sem subtarefa pulada?"
```

## Quando NÃO convocar vozes

| Em vez de conselho/revisão dupla | Use |
|---|---|
| Verificar se o output está correto e o critério é objetivo | loop de verificação determinístico (build/test/lint) |
| Quebrar uma feature em passos de implementação | `planner` / arquiteto |
| Desenhar arquitetura de sistema | arquiteto |
| Pergunta factual direta | responda direto |
| Tarefa de execução óbvia | apenas faça |

---
*Fonte: `affaan-m/everything-claude-code@2bc924f` (`santa-method` — origem Ronald Skelton;
`council`; `verification-loop`) — MIT. Reescrito em PT-BR, sem cópia literal.*
