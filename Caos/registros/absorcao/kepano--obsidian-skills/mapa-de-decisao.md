---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/kepano--obsidian-skills/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/kepano--obsidian-skills/seguranca|seguranca]]"
---

# Mapa de decisão — kepano--obsidian-skills

- **slug:** kepano--obsidian-skills | **sha:** a1dc48e68138490d522c04cbf5822214c6eb1202 | **rota:** A
- **Base de comparação:** `dados/registro-de-entidades.yaml` (566 linhas) + roster de squads.
- **Achado central:** nenhum squad/skill da Kolden trata o ecossistema **Obsidian/PKM** (Obsidian
  Flavored Markdown, Bases, JSON Canvas, Obsidian CLG). Não há match item-a-item para G1–G8 →
  REUSE seria perda silenciosa. Viés autônomo aplicado: ADAPT/CREATE sobre REUSE.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|----|---------|------------|-------------------------|
| G1 | CREATE | caos-fabrica (pacote `obsidian`/PKM novo) | Autoria de Obsidian Flavored Markdown não existe em nenhum squad; caliope é copy/persuasão, não sintaxe de vault. |
| G2 | CREATE | caos-fabrica (junto de G1) | Referências (callouts/embeds/properties) são profundidade de G1; viajam com a skill nova. |
| G3 | CREATE | caos-fabrica (pacote `obsidian`/PKM novo) | Bases (`.base`, views/filtros/fórmulas) é formato proprietário Obsidian; sem equivalente (metis é analytics de dados de negócio, não views de vault). |
| G4 | CREATE | caos-fabrica (junto de G3) | Functions reference é profundidade de G3; viaja com a skill nova. |
| G5 | CREATE | caos-fabrica (pacote `obsidian`/PKM novo) | JSON Canvas (`.canvas`) é formato de diagrama Obsidian; harmonia faz UX/UI (Figma/web), não canvas de vault. |
| G6 | CREATE | caos-fabrica (junto de G5) | Exemplos de canvas são profundidade de G5; viajam com a skill nova. |
| G7 | CREATE | caos-fabrica (pacote `obsidian`/PKM novo) | CLI de operação de vault (read/create/search/tasks) é específico de Obsidian; sem equivalente. |
| G8 | CREATE | caos-fabrica (pacote `obsidian`/PKM novo) | Loop de dev de plugin/tema Obsidian; dedalo cobre eng de agentes/Claude Code, não dev de plugin Obsidian — match não-limpo → CREATE. |
| G9 | ADAPT | argos (pesquisa/extração) | Defuddle = extrator readability web→markdown leve; cabe como skill/ferramenta alternativa ao Firecrawl/crawl4ai do motor Argos, economizando tokens. |

**Resumo:** 8× CREATE (pacote de skills Obsidian/PKM coeso, novo) + 1× ADAPT (defuddle → argos).
**Ressalva de governança (para a F5/humano):** todos os CREATEs assumem que a Kolden **quer** adotar
capacidade Obsidian — hoje a stack é LobeHub + markdown em repo, sem Obsidian documentado. A decisão
de criar o pacote é estratégica (humana), não automática. Se a Kolden não adotar Obsidian, as 8 skills
viram `referencias/` (arquivo inerte de alta qualidade) em vez de skill ativa. G9 (defuddle) independe
disso e pode ser absorvido para argos isoladamente.
