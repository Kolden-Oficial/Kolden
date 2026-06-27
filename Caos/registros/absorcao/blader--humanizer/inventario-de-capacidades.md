# Inventário de capacidades — blader--humanizer

- **slug:** blader--humanizer · **sha:** 9600f2b7241cb4eed6ad803abee5ea01d67fe8e4 · **rota:** A
- Fonte única do produto: `SKILL.md` (frontmatter YAML + prompt do editor). `README.md`/`AGENTS.md` são documentação humana.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Skill "humanizer": editor que detecta e remove sinais de escrita gerada por IA, reescrevendo para soar humano (frontmatter `name/version/description/allowed-tools`) | skill | humanizar, de-slop, anti-ia, escrita, reescrita, editor | copy | SKILL.md:1-36 |
| G2 | Taxonomia canônica de 33 padrões de "AI writing" agrupados em 6 categorias (conteúdo, linguagem, estilo, comunicação, filler/hedging), cada um com Problema + Before/After | referencia | padroes-ia, taxonomia, before-after, tells, wikipedia | copy | SKILL.md:88-521; README.md:91-149 |
| G3 | Loop draft → audit ("o que torna isto obviamente de IA?") → final rewrite, com segunda passada para limpar tells residuais | metodo-prompt | draft, audit, segunda-passada, autocritica, loop | copy | SKILL.md:560-567; README.md:84-85 |
| G4 | Calibração de voz: analisa amostra do autor (ritmo de frase, léxico, pontuação, tiques) e replica o estilo na reescrita em vez de gerar "limpo" genérico | metodo-prompt | voz, voice-matching, calibracao, estilo-pessoal, tom | copy | SKILL.md:38-56; README.md:65-79 |
| G5 | "Personality and Soul": injeta voz/opinião/ritmo/imperfeição quando o gênero pede (ensaio, blog, opinião); desliga em texto técnico/enciclopédico | metodo-prompt | voz, alma, opiniao, ritmo, personalidade, registro | copy | SKILL.md:59-86 |
| G6 | Guia anti-falso-positivo ("What NOT to flag"): 11 sinais que parecem IA mas não são; exige clusters de tells, não tells isolados | metodo-prompt | falso-positivo, precisao, cluster, anti-overfit, deteccao | copy | SKILL.md:525-542 |
| G7 | Lista "Signs of human writing (preserve these)": detalhes específicos, tensão não-resolvida, asides, variação de frase, datas pré-2022-11-30 | referencia | sinais-humanos, preservar, deteccao, autenticidade | copy | SKILL.md:545-555 |
| G8 | Restrição dura anti-em-dash: corte total de travessões (— e –), espaçados ou `--`, com varredura obrigatória do rascunho antes de devolver | metodo-prompt | em-dash, travessao, constraint, hard-cut, varredura-final | copy | SKILL.md:259-275; README.md:120 |
| G9 | Heurística de detecção por "cluster de tells" (1 sinal isolado não conta; acúmulo = confissão) como critério de decisão de reescrita | metodo-prompt | cluster, heuristica, deteccao, limiar, confianca | copy | SKILL.md:523-524, 542 |

Notas:
- O produto inteiro cabe em um arquivo declarativo; não há especialistas, reflexos, MCPs nem código. Em rota A, G1 é o invólucro (skill) e G2-G9 são as técnicas/ativos internos reaproveitáveis dele.
- Base intelectual declarada: Wikipedia "Signs of AI writing" / WikiProject AI Cleanup (domínio público, citado como fonte).
