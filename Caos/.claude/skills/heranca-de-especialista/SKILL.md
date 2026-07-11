---
name: heranca-de-especialista
description: Mapeia os especialistas humanos históricos (e suas metodologias densas — livros, frameworks, planilhas) de um domínio e gera o bloco de herança de inteligência (biography + core_frameworks + signature_vocabulary) para que o agente herde aquela inteligência suprema já consolidada. Use na Fase 5.6 do Ritual, por camada (orquestrador, cada especialista e cada habilidade de domínio), e na conformação de squads antigos. Fonte híbrida: biblioteca local primeiro, web complementa. Nunca cópia literal.
tipo: skill
area: Caos
up: "[[Caos/_MOC-caos]]"
---

# Herança de especialista histórico

## O que esta habilidade entrega
O padrão de "herança de inteligência" — um agente que **pensa como o especialista de referência
da área**, com os frameworks reais dele embutidos. Já existe em produção (ex.:
`Aletheia/agents/eric-ries.md`, `Caliope/agents/david-ogilvy.md`); esta habilidade **gera esse
bloco sistematicamente** seguindo o schema canônico `modelos/especialista-historico.md`.

## Quando rodar (por camada)
A herança é **obrigatória por camada** na Fase 5.6:
- **Orquestrador (tier 0):** herda a escola/figura que define o *julgamento* do domínio (quem
  decide o quê primeiro, como prioriza). Frequentemente uma metodologia, não uma pessoa.
- **Cada especialista (tier 1):** herda 1 figura humana histórica do seu sub-domínio.
- **Cada habilidade de domínio:** herda o método/framework que ela operacionaliza (ex.: a skill
  de entrevista herda *The Mom Test* de Rob Fitzpatrick).

## Passo 1 — Identificar as referências (1–3 por entidade)
A partir do domínio + camada-alvo, liste os 1–3 especialistas/metodologias históricos mais
canônicos. Critérios: autoridade reconhecida, obra publicada/citável, método nomeável. Evite
modismos sem lastro. Se o domínio não tiver figura óbvia → siga para o **fallback** (escola/método).

## Passo 2 — Buscar material denso (fonte híbrida)
Reuse a habilidade `busca-de-referencias` com a fonte híbrida:
1. **Local primeiro:** leia `referencias/biblioteca/<dominio>/` — PDFs de livros, planilhas,
   frameworks, transcrições. É a fonte primária.
2. **Web complementa:** se faltar, busque biografia, obras, frameworks centrais e metodologias na
   web (Exa / Hugging Face / GitHub) com scorecard ≥ 7/10.
Extraia: trajetória, obras seminais, frameworks (com o método interno, não só o nome),
vocabulário-assinatura, princípios operacionais.

## Passo 3 — Gerar o bloco no schema canônico
Preencha `modelos/especialista-historico.md` para a entidade:
- `AVISO-DE-ATIVAÇÃO` em 1ª pessoa (quem é, tese, linhagem, lema).
- `persona_profile` com `real_person: true` + `biography` (education, career, **publications**).
- `core_frameworks` — o coração: cada framework descrito **pelo método** (passos, regras, tipos,
  fórmulas), não por slogan. Mínimo 1 framework real.
- `core_principles` (8–15 máximas acionáveis) + `signature_vocabulary` (termos com tradução).
- `relationships` (reports_to + complementares/contrastes com outros especialistas).
- Seção `## Como <Nome> Opera` (passo a passo) + `## Ritual de Encerramento`.

**Tudo em pt-BR.** Nomes de obras e termos consagrados podem manter o original com tradução ao lado.

## Passo 4 — Registrar no PRD
Anote no PRD §11 a herança de cada entidade:
`Referência histórica herdada: <especialista> — frameworks: <lista>` (e a fonte/score em §4).
Isto é o que o `revisor` (Fase 6) confere no gate N2/N6.

## Fallback — sem figura histórica
Use `real_person: false` e o bloco `lineage` (escola, origem, fontes canônicas) do schema. A
herança passa a vir do **método**, não do indivíduo. Declare explicitamente a escolha.

## Restrições (invioláveis)
- **Nunca** copiar trecho literal de livro/curso proprietário — extraia o método, reescreva em
  pt-BR, cite a fonte.
- Não inventar biografia, obra ou framework. Se a fonte não confirma, não afirme (Constituição Art. IV/V).
- Toda figura/escola precisa de ≥ 1 fonte real (local ou web score ≥ 7) registrada.

## Autoverificação (antes de entregar)
1. Cada camada (orquestrador, especialistas, habilidades de domínio) tem herança mapeada?
2. `core_frameworks` descreve o **método** real, com fonte — sem cópia literal?
3. Tudo em pt-BR e no schema de `modelos/especialista-historico.md`?
4. PRD §11 atualizado com a referência herdada por entidade?
