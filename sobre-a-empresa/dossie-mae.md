---
id: dossie-mae
titulo: "Dossiê-Mãe — Cérebro da Kolden"
resumo: "Índice mestre do conhecimento da empresa, com síntese verificada do que a Kolden é e ponteiros para as áreas do cérebro."
categoria: indice
status: vigente
atualizado-em: 2026-07-06
relacionados: [sobre-a-empresa-leia-me, kolden-leia-me, indice]
fonte: "Drive compartilhado Kolden (0AFk2wbfbKBIMUk9PVA) — absorção sem perda 2026-06-25; reorganização estrutural 2026-07-06"
tipo: nota
area: sobre-a-empresa
up: "[[sobre-a-empresa/_MOC-sobre-a-empresa]]"
relacionado:
  - "[[sobre-a-empresa/leia-me|leia-me]]"
---

# Dossiê-Mãe — Cérebro da Kolden

> Índice mestre do conhecimento da empresa. Cada domínio espelha uma área do **Drive compartilhado**
> e foi absorvido **arquivo por arquivo** pelo protocolo de absorção sem perda.
>
> **Regra de ouro:** nada aqui é inventado. Campo sem fonte = "sem registro no Drive".
> Segredos nunca entram no cérebro (vão para o Infisical).

## Onde as coisas moram

A partir de 2026-07-06, `sobre-a-empresa/` tem 4 áreas de topo:

- [`Kolden/`](Kolden/) — a empresa (identidade, marca, mercado, áreas, operação, iniciativas, histórico).
- [`Projetos/`](Projetos/) — 35 projetos (clientes ativos, arquivados, iniciativas — bússola em [`Projetos/_index.md`](Projetos/_index.md)).
- [`Socios/`](Socios/) — perfis pessoais dos sócios.
- [`Ferramentas/`](Ferramentas/) — catálogo de ferramentas (Meta, GHL, NotebookLM, etc.) usadas em Kolden e clientes.

## Pente-fino de completude (2026-06-25, atualizado 2026-07-06)

Varredura completa do Drive: **427 itens inventariados**, todos com disposição explícita.

| | Qtd |
|---|--:|
| Inventário total | **427** |
| ABSORVIDO (virou conhecimento no cérebro) | 118 |
| DESCARTADO (vazio/duplicado/mídia/cliente/segredo) | 294 |
| DEFER (esqueleto a recriar com os squads) | 15 arquivos + 52 pastas |
| PENDENTE | 0 |
| PERDIDO | **0** |

**Invariante fechada:** `118 + 294 + 15 == 427`. ✅

## Os 7 domínios do Drive (mapa atualizado)

| # | Domínio (Drive) | Densidade | Estado no cérebro | Ponteiros |
|---|---|---|---|---|
| 00 | Gestão Empresarial | rica | ✅ absorvido | [jurídico-e-compliance](Kolden/operacao/juridico-e-compliance.md) · [finanças](Kolden/areas/financas.md) · [governança](Kolden/areas/governanca.md) · [planejamento](Kolden/operacao/planejamento-estrategico.md) · [processos](Kolden/operacao/processos.md) |
| 01 | Produtos | esqueleto | ⤳ defer (recriar) | — (KoldenOS/NutriOS/BrazHub vazios no Drive) |
| 02 | Comercial | rica (vive no 06) | ✅ absorvido | [ofertas-e-produtos](Kolden/mercado/ofertas-e-produtos.md) · [ICP & personas](Kolden/mercado/icp-e-personas.md) · [receita](Kolden/areas/receita.md) · [processos §4](Kolden/operacao/processos.md) |
| 03 | Clientes | ativo/arquivado | ✅ compilado | [Índice de projetos](Projetos/_index.md) — 32 clientes + 3 iniciativas Kolden |
| 04 | RH & Cultura | esqueleto | ✅ parcial / ⤳ defer | [pessoas-rh §5](Kolden/areas/pessoas-rh.md) (Kolden ainda sem RH estruturado) |
| 05 | Fundação (Identidade Visual) | 61 assets | ✅ absorvido | [marca/design-system](Kolden/marca/design-system/) — assets espelhados |
| 06 | Templates & Ferramentas | rica | ✅ absorvido | [inteligência & referências](Kolden/operacao/inteligencia-e-referencias.md) · [Ferramentas](Ferramentas/) |

## O que a Kolden É (síntese verificada do Drive)

> Apenas o que está documentado. Itens não fundamentados ficam de fora.

- **Identidade jurídica:** CNPJ 44.106.838/0001-30, regime MEI/SIMEI, sede em Vespasiano/MG.
  ⚠️ inconsistência: contrato-modelo grafa "S.A." vs registro MEI — revisar. Documentos oficiais em [`Kolden/operacao/juridico-e-compliance/documentos-oficiais/`](Kolden/operacao/juridico-e-compliance/documentos-oficiais/).
- **Modelo de negócio:** "Assessoria de Performance 360º" — 5 linhas (tráfego, social, gestão comercial, IA, dados); também lançamento, mentoria e infoproduto. Receita: fee ~R$3k + contrato 6 meses + % sobre performance. Ver [ofertas-e-produtos](Kolden/mercado/ofertas-e-produtos.md) e [receita](Kolden/areas/receita.md).
- **Processo comercial:** prospecção (cold call/mail) → kick-off/QNP 360° → proposta em 6 passos gerada por IA (Lovable) → debriefing → daily/sprint. Ver [processos §4](Kolden/operacao/processos.md).
- **Produto interno:** app **Performance Brain** (dashboard que consome APIs Meta) — base da camada de compliance/LGPD.
- **Inteligência de referência:** mapeamento do ecossistema de APIs Meta, **BLACK BOOK** (Conrado Adolpho, 8 vols. em [`Kolden/mercado/referencias/black-book/`](Kolden/mercado/referencias/black-book/)), guias de OKR, metodologias, best-practices DAM/Google Drive em [`Kolden/mercado/referencias/`](Kolden/mercado/referencias/). Ver também [inteligência & referências](Kolden/operacao/inteligencia-e-referencias.md).
- **Clientes:** 18 ativos + 14 arquivados dossiados. Ver [Índice de projetos](Projetos/_index.md).
- **Marca:** identidade visual completa (brand book + logos + mockups) espelhada em [marca/design-system](Kolden/marca/design-system/); auditoria integrada + brandbook v2 em [`Kolden/iniciativas/auditoria-marca-2026/`](Kolden/iniciativas/auditoria-marca-2026/).
- **Cultura/RH:** ainda **não estruturado** — só intenção (rituais, valores desejados, lacuna declarada "não temos metas"). Ver [pessoas-rh](Kolden/areas/pessoas-rh.md).

## Lacunas e pendências (DEFER — recriar com os squads)

- **Produtos (01):** roadmaps/docs técnicos de KoldenOS, NutriOS, BrazHub — esqueleto vazio.
- **RH & Cultura (04):** Código de Conduta, Manifesto, Missão/Visão/Valores, Recrutamento, Onboarding, Performance, Offboarding — pastas vazias.
- **Reuniões & Decisões (00):** sem atas/decisões centralizadas → criar `Kolden/operacao/reunioes-e-decisoes.md`.
- **Legado bruto em `Kolden/_historico/notas/kolden/`** (33 arquivos institucionais brutos: kick-off-qnp, calculadora-de-ganhos, k-central-de-oportunidades, sofisticação-persona-posicionamento, etc.) — pendente passe fino para promover ao domínio certo (marca, mercado, operação).

## Pendências de segurança (Infisical)

Planilhas com credenciais em texto plano foram **descartadas** (nunca absorvidas): "[K] Central de Ferramentas e Acessos", "Perfil Kolden - 9 Anos", "Senha dos Cartões", "[Cliente] Central de Acessos". **Migrar para o Infisical** e remover do Drive. Arquivo `senha-dos-cartões-cartões.md` re-detectado no legado bruto e removido em 2026-07-06.

## Próximos passos

1. **Reorganizar o Drive** conforme [proposta-reorganizacao-drive](Kolden/operacao/proposta-reorganizacao-drive.md) — aguarda aprovação do Ronan.
2. **Recriar os DEFER** com os squads (produtos, RH/cultura, projetos-esqueleto).
3. **Passe fino no legado bruto** em `Kolden/_historico/notas/kolden/` — promover cada arquivo ao domínio certo.
4. **Distribuir aprendizados** para a memória dos squads (comercial→Pluto/Themis, finanças→Pluto, marca→Aglaia, RH→futuro squad de gente).
5. Habilitar a **Docs API** (libera métodos nativos do MCP).
