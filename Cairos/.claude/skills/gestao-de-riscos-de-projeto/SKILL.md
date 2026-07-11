---
name: gestao-de-riscos-de-projeto
description: >
  Use para construir e manter o REGISTRO DE RISCOS de um projeto: identificar riscos, pontuar
  por probabilidade × impacto, escolher a resposta (mitigar/transferir/aceitar/evitar) e atribuir
  dono, gatilho e plano de contingência. Gatilhos: "quais os riscos", "o que pode dar errado",
  "plano B", "contingência", "matriz de risco", "registro de riscos", "risk register". Dono:
  gestor-de-riscos. Veto: risco sem dono + gatilho + resposta não entra no registro.
tipo: skill
area: Cairos
up: "[[Cairos/_MOC-cairos]]"
---

# Gestão de Riscos de Projeto

Risco é incerteza que pode afetar o objetivo do projeto. Gerir risco é **antecipar antes de prometer a
data** — não é fazer uma lista de medos, é atribuir dono, gatilho e resposta a cada um.

## 1. Identificação (por categoria)
Varra por categoria para não ter ponto cego:
- **Cronograma:** dependência externa, estimativa otimista, recurso compartilhado.
- **Recurso:** pessoa-chave indisponível, capacidade abaixo da demanda.
- **Técnico/operacional:** integração nova, fornecedor, ambiente.
- **Externo:** regulação, mercado, sazonalidade.
- **Stakeholder:** patrocinador ausente, expectativa desalinhada, mudança de prioridade.

## 2. Avaliação — probabilidade × impacto
- Pontue **probabilidade** (ex.: baixa/média/alta ou 1-5) e **impacto** (em prazo/custo/qualidade/escopo).
- **Exposição = probabilidade × impacto** → ordena o registro. Priorize a cauda de alta exposição; não
  trate todos os riscos como iguais.
- Use heatmap (verde/amarelo/vermelho) para comunicar ao stakeholder rapidamente.

## 3. Resposta — as 4 estratégias
Para cada risco priorizado, escolha **uma** estratégia e uma ação concreta:
- **Mitigar:** reduzir probabilidade ou impacto (ação preventiva).
- **Transferir:** passar a outra parte (contrato, seguro, fornecedor).
- **Aceitar:** conviver com o risco — mas com contingência pronta (aceitação ativa) ou consciente (passiva).
- **Evitar:** mudar o plano para eliminar o risco (remover a tarefa/abordagem que o gera).

## 4. Governança do risco (o veto)
Todo risco no registro precisa de:
- **Dono** — quem monitora e dispara a resposta.
- **Gatilho** — o sinal observável que indica que o risco está se materializando.
- **Contingência** — o que fazer **se** materializar (o plano B já escrito, não improvisado).

Sem os três, o item é devolvido para completar. Risco sem dono/gatilho/resposta é só ansiedade documentada.

## 5. Acompanhamento
- Revise o registro em cadência (junto do status report).
- Risco que se materializou vira **problema (issue)** e sai do registro de riscos para o de issues.
- Capture riscos novos a cada marco; arquive os que perderam relevância.

## Saída
Registro de riscos (tabela): id · descrição · categoria · probabilidade · impacto · exposição · resposta ·
dono · gatilho · contingência · status. + Top 3-5 riscos com ação imediata.

## Fronteira
- O cronograma sobre o qual o risco incide vem da skill `gestao-de-cronograma-e-escopo`.
- Decisão de go/no-go por causa de risco crítico → escalona ao **Olimpo**.

---
*Procedência (semente 2026-06-26): adaptado de `alirezarezvani/claude-skills@4a3c05b` (MIT, cluster PMO —
senior-pm) e `anthropics/knowledge-work-plugins@78d74d5` (Apache-2.0, operations: risk-assessment).
Princípios reescritos, sem cópia literal. Refino pelo Ritual do Caos pendente.*
