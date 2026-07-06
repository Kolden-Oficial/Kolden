---
tipo: pasta-mestre
atualizado: 2026-07-06
---

# Projetos/

Consolidação de **dossiês de cliente + entregas vivas** em uma pasta única — antes distribuída entre `clientes/{ativos,inativos}/` e `Projetos/` (formato pré-2026-07-06).

## Como se organiza

- **`Ativos/<slug>/`** — projetos com relação viva (16).
- **`Inativos/<slug>/`** — projetos arquivados/pausados (15).
- **`_modelo/`** — template unificado (arquitetura, decisões, dossiê, leia-me, prd, status).
- **`_index.md`** — bússola com todos os projetos por bloco.
- **`_indice-antigo-clientes.md`** — README anterior de `clientes/` (referência histórica com Drive links + riqueza).

## Convenções por projeto

Dentro de cada `Ativos|Inativos/<slug>/`:
- `leia-me.md` — o que é, escopo, referências. Frontmatter com `status`, `tipo`, `desde`, `equipe`.
- `dossie.md` — inteligência de negócio do cliente (o antigo dossiê comercial).
- `_notebooklm/` — bruto absorvido do Google Drive via NotebookLM.
- Demais arquivos: `prd.md`, `status.md`, `decisoes.md`, `brandbook/`, `apresentacao/`, código, etc.

## O que NÃO mora aqui

- **Empresa Kolden** (identidade, marca, mercado, áreas, operação, iniciativas internas): `../Kolden/`.
- **Perfis pessoais dos sócios**: `../Socios/`.
- **Catálogo de ferramentas**: `../Ferramentas/`.
- **Squads/agentes** (Caos, Hermes, Pheme…): raiz de `C:\Kolden\`.
