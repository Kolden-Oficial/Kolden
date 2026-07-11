---
name: geracao-de-prd
description: Transforma um diagnóstico completo (7 faculdades preenchidas) em um PRD de IA formal usando o template modelos/prd-de-ia.md. Use após o diagnóstico de agente estar 100% preenchido e antes de construir qualquer arquivo do agente. O PRD precisa ser aprovado pelo usuário antes da construção.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Geração do PRD de IA

## Pré-requisito
O arquivo `C:\Kolden\<NomeMitológico>\diagnostico.md` deve existir com as 7 faculdades
preenchidas (incluindo a Rodada 5 — Consciência/modos de falha). Se alguma faculdade
estiver vazia ou vaga, volte ao diagnóstico.

## Processo
1. Leia o template `modelos/prd-de-ia.md` — ele define todas as seções.
2. Preencha cada seção com base no diagnóstico. Não invente: se uma
   informação não está no diagnóstico, pergunte.
3. Na seção de ferramentas, a **primeira entrada obrigatória é o Infisical** (ferramenta
   padrão de segredos). Cada ferramenta adicional precisa de: nome, função no agente,
   forma de acesso (API/MCP/CLI) e caminho da credencial no Infisical.
4. Na seção de métricas, defina no mínimo 3 KPIs mensuráveis, sendo ao menos 1 anti-falha.
5. Preencha a seção **Modos de falha / pré-morte** (§10) a partir da Rodada 5 do
   diagnóstico (Consciência): uma linha por modo (gatilho, raio de impacto, detecção, mitigação).
   Cada modo será rastreado até a arquitetura, a revisão e o teste adversarial.
6. Salve como `C:\Kolden\<NomeMitológico>\prd-de-ia.md`.
7. Apresente um resumo executivo de no máximo 10 linhas ao usuário e
   pergunte: **"Aprova este PRD ou quer ajustar algo?"**
8. Só avance para a construção após aprovação explícita ("aprovo",
   "pode seguir", "perfeito" ou equivalente).

## Regra de ouro
O PRD é a fonte da verdade do agente. Qualquer mudança futura no agente
começa por uma atualização no PRD — nunca direto nos arquivos. Incremente a
versão no cabeçalho a cada mudança (1.0 → 1.1).
