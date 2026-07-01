# 05 — Red Team (ataque às próprias conclusões)

## Caso mais forte de que o CAOS é SEGURO

1. **O desenho é genuinamente bom nos Pilares 1-3.** A quarentena read-only com `.git` removido + reflexo `bloqueio-de-quarentena.sh` BLOCK (`bloqueio-de-quarentena.sh:45-50`) é preservação **determinística** — não depende do modelo. A F3 manda inventário **estruturado** (não prosa) com schema explícito (`ingestao/SKILL.md:45-49`). A `auditoria-de-squad` é uma máquina de diff por capacidade real (`auditoria-de-squad/SKILL.md:30-40`). Se executado à risca, esse pipeline captura muito.
2. **A absorção pára para aprovação humana (F5, Art. III).** Há um humano (Ronan) no laço antes de qualquer escrita — um detector de perda *humano* que o meu diagnóstico não credita como "mecanismo do CAOS", mas que na prática existe.
3. **A corrida real não "perdeu" nada ainda** — ela está *suspensa* num plano aprovado, com a quarentena intacta. Nada foi destruído; o original está a um `ls` de distância.

## Caso mais forte de que o CAOS NÃO é seguro

1. **O Pilar 5 (Verificar contra inventário) simplesmente não existe.** `revisor` e `testador` conferem contra **PRD + checklist**, nunca contra o inventário da absorção (`revisor.md:13-31`, `testador.md:12-42`). Sem reconciliação, nenhuma perda de F5/F6 é detectável **por construção** → TPND = 1.0 estrutural.
2. **As salvaguardas de capacidade são todas `[IMPLÍCITO]`** (`02_workflow.md`): F3/F4/F5-descarte/F6/F7 dependem do modelo. Só Preservar tem trava. 1/5 pilares aplicado à força.
3. **A evidência de campo confirma o pior caso:** a única corrida real **não produziu o inventário estruturado** (`registros/absorcao/` inexistente) e degradou o registro a **3 bullets de prosa** — exatamente o que o Pilar 2 proíbe. O desenho diz "estruturado"; a execução entregou prosa. **O `[IMPLÍCITO]` falhou na primeira tentativa.**

## Qual evidência vence

**A do "não-seguro"** — mas com escopo preciso. A defesa #1 (bom desenho) é real, porém **"salvaguarda opcional = salvaguarda que falha"**, e a corrida real prova que o opcional foi pulado. A defesa #2 (humano no laço) é o achado mais incômodo para mim: **hoje quem evita a perda silenciosa é o Ronan lendo o plano, não o CAOS.** Isso não escala para "100 repositórios" e não é um mecanismo do sistema — é trabalho manual. A defesa #3 (nada destruído ainda) **confunde "suspenso" com "seguro"**: a perda se materializa no instante em que a quarentena `limpável` (`ingestao/SKILL.md:84`) for limpa com o inventário ainda em prosa.

## Onde meu diagnóstico pode estar ERRADO

1. **Amostra n=1.** `[INCONCLUSIVO]` quanto à *taxa média* de perda. Provei **existência** num caso real, não distribuição. Um repo trivial (só um README) teria TPND≈0 e inflaria a média de aprovação.
2. **Não rodei F6/F7.** A perda da *etapa de integração* é **inferida** da ausência do Pilar 5, não medida. `[INFERIDO]` — a evidência é a ausência da etapa de reconciliação nos arquivos, não um output corrompido observado.
3. **Não li os 382 arquivos.** O gabarito (22 itens) é amostra de alto sinal; subestima o total de técnicas (a favor do CAOS, na verdade — a perda real é maior).
4. **Granularidade da TPND é uma escolha minha.** Em granularidade de domínio (copy/seo/ads…), o CAOS "registrou" a maioria; em granularidade de técnica, perdeu quase tudo. Declarei a escolha (técnica) abertamente porque é a que importa para "absorver sem perder capacidades".
5. **Possível artefato de versão:** o pipeline de absorção é v3.3.0 (`CLAUDE.md` changelog, 2026-06-22) e a corrida real é do **mesmo dia** — pode ter sido um *smoke test* da v1 do pipeline, não o comportamento maduro. `[INFERIDO]` das `notas: "Teste do pipeline /absorver"`.

## O que tornaria o veredito mais confiável

1. **n≥3 repositórios** de dificuldades variadas, rodando o pipeline **completo F0-F7** (não suspenso na F5).
2. **Acesso a uma execução real de F6/F7** para medir perda de integração diretamente (hoje 0 execuções).
3. **Operar o CAOS como agente** num repo controlado e comparar o `inventario-de-capacidades.md` que ele *deveria* gerar contra o gabarito — separando "falha de desenho" de "falha de execução". (Não fiz para não cruzar a linha de simular o teste.)
4. **Confirmar a política de limpeza da quarentena**: se nunca é limpa na prática, o original sobrevive e a "perda" é recuperável (rebaixaria silenciosa→latente). Hoje a doc diz "limpável" — `[INCONCLUSIVO]` se há rotina que limpa.
