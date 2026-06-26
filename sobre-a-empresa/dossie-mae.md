---
id: dossie-mae
titulo: "Dossiê-Mãe — Cérebro da Kolden"
resumo: "Índice mestre do conhecimento da empresa, espelhando os 7 domínios do Drive compartilhado, com status de completude por domínio e ponteiro para o ledger de absorção."
categoria: indice
status: vigente
atualizado-em: 2026-06-25
relacionados: [leia-me, clientes/README, operacao/processos, areas/receita]
fonte: "Drive compartilhado Kolden (0AFk2wbfbKBIMUk9PVA) — absorção sem perda 2026-06-25"
---

# Dossiê-Mãe — Cérebro da Kolden

> Índice mestre do conhecimento da empresa. Cada domínio espelha uma área do **Drive compartilhado**
> e foi absorvido **arquivo por arquivo** pelo protocolo de absorção sem perda. O rastreador
> completo (disposição de cada arquivo) é o ledger `Caos/dados/drive-absorvido.yaml`; os registros
> por área vivem em `Caos/registros/absorcao/drive--<area>/`.
>
> **Regra de ouro:** nada aqui é inventado. Campo sem fonte = "sem registro no Drive". Segredos
> nunca entram no cérebro (vão para o Infisical).

## Pente-fino de completude (2026-06-25)

Varredura completa do Drive: **427 itens inventariados**, todos com disposição explícita.

| | Qtd |
|---|--:|
| Inventário total | **427** |
| ABSORVIDO (virou conhecimento no cérebro) | 118 |
| DESCARTADO (vazio/duplicado/mídia/cliente/segredo) | 294 |
| DEFER (esqueleto a recriar com os squads) | 15 arquivos + 52 pastas |
| PENDENTE | 0 |
| PERDIDO | **0** |

**Invariante fechada:** `118 + 294 + 15 == 427`. Nenhum arquivo do Drive ficou sem destino. ✅

## Os 7 domínios

| # | Domínio (Drive) | Densidade | Estado no cérebro | Docs |
|---|---|---|---|---|
| 00 | Gestão Empresarial | rica | ✅ absorvido | [jurídico-e-compliance](operacao/juridico-e-compliance.md) · [finanças](areas/financas.md) · [governança](areas/governanca.md) · [planejamento](operacao/planejamento-estrategico.md) · [processos](operacao/processos.md) |
| 01 | Produtos | esqueleto | ⤳ defer (recriar) | — (KoldenOS/NutriOS/BrazHub vazios no Drive) |
| 02 | Comercial | rica (vive no 06) | ✅ absorvido | [ofertas-e-produtos](mercado-e-posicionamento/ofertas-e-produtos.md) · [ICP & personas](mercado-e-posicionamento/icp-e-personas.md) · [receita](areas/receita.md) · [processos §4](operacao/processos.md) |
| 03 | Clientes | ativo/inativo | ✅ compilado | [Índice de clientes](clientes/README.md) — 29 dossiês |
| 04 | RH & Cultura | esqueleto | ✅ parcial / ⤳ defer | [pessoas-rh §5](areas/pessoas-rh.md) (Kolden ainda sem RH estruturado) |
| 05 | Fundação (Identidade Visual) | 61 assets | ✅ absorvido | [marca/design-system](marca/design-system/assets/indice-assets.md) — assets espelhados |
| 06 | Templates & Ferramentas | rica | ✅ absorvido | [inteligência & referências](operacao/inteligencia-e-referencias.md) · [Ferramentas](Ferramentas/) |

## O que a Kolden É (síntese verificada do Drive)

> Apenas o que está documentado no Drive. Itens não fundamentados ficam de fora.

- **Identidade jurídica:** CNPJ 44.106.838/0001-30, regime MEI/SIMEI, sede em Vespasiano/MG.
  ⚠️ inconsistência: contrato-modelo grafa "S.A." vs registro MEI — revisar. Detalhe em [jurídico-e-compliance](operacao/juridico-e-compliance.md).
- **Modelo de negócio:** "Assessoria de Performance 360º" — 5 linhas (tráfego, social, gestão comercial, IA, dados); também lançamento, mentoria e infoproduto. Receita: fee ~R$3k + contrato 6 meses + % sobre performance. Ver [ofertas-e-produtos](mercado-e-posicionamento/ofertas-e-produtos.md) e [receita](areas/receita.md).
- **Processo comercial:** prospecção (cold call/mail) → kick-off/QNP 360° → proposta em 6 passos gerada por IA (Lovable) → debriefing → daily/sprint. Ver [processos §4](operacao/processos.md).
- **Produto interno:** app **Performance Brain** (dashboard que consome APIs Meta) — base da camada de compliance/LGPD.
- **Inteligência de referência:** mapeamento do ecossistema de APIs Meta, BLACK BOOK (Conrado Adolpho, 8 vols.), guias de OKR, metodologias. Ver [inteligência & referências](operacao/inteligencia-e-referencias.md).
- **Clientes:** 15 ativos + 14 inativos dossiados. Ver [Índice de clientes](clientes/README.md).
- **Marca:** identidade visual completa (brand book + logos + mockups) espelhada em [marca/design-system](marca/design-system/).
- **Cultura/RH:** ainda **não estruturado** — só intenção (rituais, valores desejados, lacuna declarada "não temos metas"). Ver [pessoas-rh](areas/pessoas-rh.md).

## Lacunas e pendências (DEFER — recriar com os squads)
- **Produtos (01):** roadmaps/docs técnicos de KoldenOS, NutriOS, BrazHub — esqueleto vazio.
- **RH & Cultura (04):** Código de Conduta, Manifesto, Missão/Visão/Valores, Recrutamento, Onboarding, Performance, Offboarding — pastas vazias.
- **Reuniões & Decisões (00):** sem atas/decisões centralizadas → criar `operacao/reunioes-e-decisoes.md`.
- **Clientes-esqueleto (03):** Instituto Saulo Mendes, Clínica Omiron, Vibrações Celestiais, Freitas Serviços, CataLogo, NutriOS Pro — dossiês vazios, repreencher com os squads.

## Pendências de segurança (Infisical)
Planilhas com credenciais em texto plano foram **descartadas** (nunca absorvidas): "[K] Central de Ferramentas e Acessos", "Perfil Kolden - 9 Anos", "Senha dos Cartões", "[Cliente] Central de Acessos". **Migrar para o Infisical** e remover do Drive.

## Próximos passos
1. **Reorganizar o Drive** conforme [proposta-reorganizacao-drive](operacao/proposta-reorganizacao-drive.md) — aguarda aprovação do Ronan.
2. **Recriar os DEFER** com os squads (produtos, RH/cultura, clientes-esqueleto).
3. **Distribuir aprendizados** para a memória dos squads (comercial→Pluto/Themis, finanças→Pluto, marca→Aglaia, RH→futuro squad de gente).
4. Habilitar a **Docs API** (libera métodos nativos do MCP).
