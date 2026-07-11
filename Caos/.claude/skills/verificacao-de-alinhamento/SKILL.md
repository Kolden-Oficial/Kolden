---
name: verificacao-de-alinhamento
description: Verifica se todos os documentos do agente atual estão alinhados e sem pontas soltas — referências cruzadas, ferramentas documentadas, habilidades registradas, PRD atualizado. Use no hook SessionStart (quando passaram >24h desde a última verificação) ou manualmente via /verificar. Funciona tanto no Caos quanto em qualquer agente criado.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Verificação de Alinhamento

## Objetivo
Detectar inconsistências nos documentos do agente antes que causem problema.
A verificação é proativa — roda automaticamente no início da sessão se >24h se passaram.

## Passo 1 — Verificar cadência
Leia `registros/ultima-verificacao.md`. Se a data ali for de hoje ou ontem (< 24h), encerre
silenciosamente sem rodar a verificação. Se for mais antiga ou o arquivo não existir, prossiga.

## Passo 2 — Varredura por categoria

### 2a. Referências cruzadas
Para cada arquivo .md no diretório raiz do agente e em `.claude/`:
- Busca por padrões `ver <arquivo>`, `leia <arquivo>`, `em <arquivo>`, links markdown `[texto](caminho)`
- Verifica se o arquivo referenciado existe
- Resultado: lista de referências quebradas (arquivo → referência faltando)

### 2b. Ferramentas vs. CLAUDE.md
- Lê `ferramentas.md`: extrai nomes das ferramentas na tabela
- Verifica se cada ferramenta tem pelo menos uma menção no CLAUDE.md (ou system prompt)
- Verifica se toda ferramenta tem path do Infisical documentado (Constituição, Art. VII)
- Resultado: ferramentas não mencionadas no prompt / credenciais sem path no Infisical

### 2c. Habilidades e especialistas
- Lista todos os arquivos em `.claude/skills/` (ou `.claude/habilidades/`)
- Lista todos os arquivos em `.claude/agents/` (ou `.claude/especialistas/`)
- Verifica se o catálogo de habilidades (`.claude/skills/catalogo.md`) existe e está atualizado
- Resultado: habilidades/especialistas sem entrada no catálogo

### 2d. PRD e versão
- Lê `prd-de-ia.md` (se existir): verifica o campo `Data` no cabeçalho
- Se a data for > 30 dias atrás sem nenhuma atualização de versão: avisa que o PRD pode estar desatualizado
- Resultado: PRD com data antiga sem revisão registrada

### 2e. Consistência do registry (só no Caos)
- Lê `dados/registro-de-entidades.yaml`
- Verifica se o campo `path` de cada entidade registrada aponta para um diretório que existe
- Resultado: entidades com path inválido (agente movido ou deletado)

## Passo 3 — Exibir resultado

```
🔍 VERIFICAÇÃO DE ALINHAMENTO — <nome do agente> — <data>

✅ Referências cruzadas: <n> verificadas, <n> OK / <n> quebradas
✅ Ferramentas documentadas: <n> OK / <n> sem menção no prompt
✅ Credenciais no Infisical: <n> OK / <n> sem path
✅ Catálogo de habilidades: <n> entradas / <n> faltando
✅ PRD: versão <x.x>, <data> — OK | ATENÇÃO: >30 dias sem revisão

[Se houver problemas]
⚠️  PONTAS SOLTAS ENCONTRADAS:
- [REFERÊNCIA QUEBRADA] ferramentas.md linha 12 → "ver instalacao-avancada.md" (não existe)
- [FERRAMENTA SEM PROMPT] Supabase em ferramentas.md não mencionada no CLAUDE.md
- [CREDENCIAL] /kolden/prod/NOVA_KEY não tem path documentado
- [CATÁLOGO] habilidade "analise-roas" não está no catalogo.md

Quer corrigir agora? (sim/não)
```

Se não houver problemas:
```
✅ Tudo alinhado. Próxima verificação em 24h.
```

## Passo 4 — Atualizar tracker
Independente do resultado, escreva em `registros/ultima-verificacao.md`:
```
Última verificação: AAAA-MM-DD HH:MM
Resultado: OK | <n> pontas soltas encontradas
```

## Restrições
- A verificação NUNCA corrige automaticamente — apenas reporta e pergunta.
- Se o usuário confirmar "sim", liste as correções sugeridas uma a uma e aguarde aprovação individual.
- Não executar verificação se o diretório não tiver CLAUDE.md (não é um agente/Caos válido).
