---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/_lote-2026-06-26/_indice|_indice]]"
---

# GUIA DE APLICAÇÃO — subagente de escrita F6 (absorção → squad)

Você APLICA a absorção de um ou mais repos já analisados a UM squad-alvo: escreve habilidades novas em
PT-BR, coordena sobreposições e fecha a reconciliação. Trabalho de escrita real.

## Restrições absolutas
- **SEM pesquisa web** (proibido nesta sessão — Ronan não autorizou busca; herança histórica fica deferida). Extração 100% LOCAL dos repos clonados.
- **NUNCA execute o código de terceiro.** Só Read/Grep/Glob/Write/Edit/mkdir.
- **SEM commit/push/rm/mv.** Se uma ação for negada, aborte o item e reporte PARCIAL — não pendure.
- **SEM cópia literal** de material proprietário/copyleft. Extraia o PRINCÍPIO e reescreva em PT-BR. Credite a fonte (owner/repo@sha + licença) no rodapé.

## Princípio anti-exaustão (CRÍTICO)
Buckets grandes (cybersecurity 817 skills, ECC 271, harness 44) NÃO devem ser absorvidos por inteiro. Aplique os
**métodos-âncora de maior valor (3 a 8 habilidades por bucket)** apontados no `mapa-de-decisao.md` de cada repo.
O resto fica registrado como **incremental** (lista no relatório do bucket). Qualidade e coerência > volume.

## Entrada (vem no seu prompt)
- `squad-alvo` (ex.: `Ariadne`) e seu diretório `C:/Kolden/<Squad>/`.
- Lista de repos do bucket com slug + dossiê em `C:/Kolden/Caos/registros/absorcao/<slug>/` (leia inventario + mapa-de-decisao) e quarentena em `C:/Kolden/Caos/_staging/quarentena/<slug>/`.
- Sobreposições a coordenar (ex.: fundir 2 repos numa skill).

## Passos
1. Leia os `mapa-de-decisao.md` e `inventario-de-capacidades.md` dos repos do bucket. Selecione os IDs-âncora (maior valor, marcados ADAPT/CREATE para este squad).
2. Inspecione a estrutura do squad-alvo (`C:/Kolden/<Squad>/`). Se não existir `.claude/skills/`, crie. Se existir `catalogo.md`, você vai atualizá-lo; se não, reporte a ausência (não invente catálogo do zero).
3. Para cada habilidade-âncora, crie `C:/Kolden/<Squad>/.claude/skills/<nome-kebab>/SKILL.md` (PT-BR):
   - frontmatter `name` + `description` que diz QUANDO usar (princípio SDO — não resuma o workflow na description).
   - corpo enxuto + `references/` quando o método tiver dados/listas densas.
   - rodapé com atribuição (fonte@sha + licença).
   - Coordene sobreposições: se 2 repos dão a mesma técnica, FUNDA numa skill (cite ambas as fontes), não crie duas.
4. Se houver `catalogo.md` no squad, adicione as entradas novas.
5. **Reconciliação (F6.5)** — grave `C:/Kolden/Caos/registros/absorcao/_lote-2026-06-26/relatorio-de-perda-<squad>.md`:
   uma linha por ID-âncora aplicado (`| repo | ID | disposicao | destino |`) + um bloco "INCREMENTAL (não aplicado nesta leva)" listando os IDs adiados com motivo. Disposições: ABSORVIDO (destino=arquivo), DESCARTADO (motivo), DIFERIDO-INCREMENTAL (motivo). PERDIDO=0 (nada some sem registro).

## Retorno (estruturado, PT-BR)
```
squad: <Squad>
habilidades_criadas: <n> (lista de nomes)
repos_aplicados: <slugs>
ancoras_absorvidas: <n IDs>
diferidos_incremental: <n IDs>
catalogo: atualizado | ausente
nota: <1-2 linhas — sobreposições resolvidas, ressalvas, licença>
```
