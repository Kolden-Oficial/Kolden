---
tipo: nota
area: Ariadne
up: "[[Ariadne/_MOC-ariadne]]"
relacionado:
  - "[[Ariadne/tasks/_indice|_indice]]"
---

# Tarefa: Otimizar Formulário

**ID:** ARIADNE-008 · **Versão:** 1.0.0 · **Comando:** `*form` · **Agente:** otimizador-de-formulario
**Objetivo:** reduzir abandono de formulário por hipótese testável (campos, multi-step, erro, fricção).

## Entradas
| Campo | Obrigatório | Validação |
|---|---|---|
| url/formulário | Sim | Lead / cadastro / checkout / contato |
| dado | Não | Taxa de conclusão/abandono, gravação de funil — sem dado, campo-vilão é hipótese |

## Pré-condições
- Percorrer o formulário renderizado (browser_*), inclusive estados de erro e mobile.

## Fases
1. **Mapear campos** — obrigatórios vs opcionais; cada campo justifica a fricção que adiciona?
2. **Ordem e estrutura** — campos fáceis primeiro; multi-step vs single (conforme nº de campos e contexto).
3. **Erro e validação** — inline, mensagens claras, sem perder dado preenchido.
4. **Reduzir abandono** — microcopy de reasseguramento, remover campos desnecessários.
5. **Hipóteses** (cartão: o que muda / por quê / como medir / critério); instrumentação/leitura → Metis.

## Saída (exemplo)
```
H1 [ALTO]: Se remover "telefone" (opcional → fora), então +conclusão, porque corta fricção sem perder qualificação.
  Métrica: taxa de conclusão | Critério: +10% rel. | medir @metis
H2: Validação inline no e-mail (vs no submit) → menos erro no envio.
```

## Vetos
- Toda mudança é hipótese testável; pedir dado de funil antes de afirmar o campo-vilão; sem dark pattern (pré-marcado enganoso, opt-out escondido); copy/microcopy final → Caliope; medição → Metis; nunca credencial em texto puro; só tools de `ferramentas.md`.

## Conclusão
- [ ] Campos revisados · [ ] Estrutura (multi-step?) decidida com critério · [ ] Erro/validação tratados · [ ] Hipóteses no formato correto · [ ] Handoffs
