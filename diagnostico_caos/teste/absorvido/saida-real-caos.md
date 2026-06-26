# Saída REAL do CAOS para coreyhaines31/marketingskills
# (tudo que o pipeline deixou de durável após /absorver, 2026-06-22)

## 1. Entrada no ledger (repositorios-absorvidos.yaml:35-46) — ÚNICO registro durável de capacidades:
  github.com/coreyhaines31/marketingskills:
    url: "https://github.com/coreyhaines31/marketingskills"
    shas:
      - sha: "8bfcdffb655f16e713940cd04fb08891899c47db"
        absorvidoEm: "2026-06-22T00:00:00Z"
        seguranca: QUARENTENA  # conteúdo markdown limpo; ressalva: validate-skills-official.sh faz git clone+pip sem pin (script opt-in, nunca executado/absorvido)
        decisao: PARCIAL
        squadAlvo: "caliope(REUSE), pluto/peitho/metis/pheme/aglaia(ADAPT pendente), seo(CREATE pendente)"
        capacidades: ["45 skills de marketing (copy, ads, cro, analytics, social, offers, pricing, SEO)", "padrão evals/ por skill", "64 CLIs zero-dep"]
        entidades: []  # preenchido conforme as absorções aprovadas forem aplicadas
        notas: "Teste do pipeline /absorver. Copy já coberto pelo Caliope (REUSE). Lacuna real: SEO de execução (CREATE squad). Valor transversal: padrão evals/. Aprovado pelo Ronan: criar squad SEO + absorver evals + clusters."
    licenca: "MIT"

## 2. Artefatos de auditoria que o pipeline MANDA gravar e que NÃO existem:
registros/absorcao/: INEXISTENTE
 - seguranca.md (F2):             ausente
 - inventario-de-capacidades.md (F3): ausente
 - mapa-de-decisao.md (F4):       ausente

## 3. Aplicação (F6/F7):
Squad SEO criado:        NÃO
evals absorvido em squad: 
origem marketingskills no registro-de-entidades.yaml: 0 ocorrências
menção em registros/historico.md: 0 ocorrências

## 4. Procedência ainda diz (contradiz o ledger):
- status: em-quarentena (análise estática pendente — Fase 2)
