# Relatório de Inteligência de Mercado — Agências/empresas de marketing no Brasil

> **Squad:** Argos · **Tipo:** snapshot de pesquisa (teste ponta-a-ponta) · **Coleta:** 2026-06-21 a 2026-06-22
> **Escopo:** macro→micro · segmentos: IA & automação, tráfego/performance, full-service, growth
> **Ângulo:** posicionar a Kolden · **Modo:** zona verde (fontes públicas) + Apollo (firmográficos)
> **Gate ARGOS-CL-001 aplicado:** cada dado com fonte + data + rótulo de confiança
> **Rótulos:** [VERIFICADO ≥2 fontes] · [FONTE ÚNICA] · [AUTO-REPORTADO] · [DIVERGÊNCIA] · [VERIFICADO Apollo]

---

## 1. Sumário executivo

O mercado brasileiro de serviços de marketing é grande, cresce a dois dígitos e está **em transição
para IA** — a janela em que a Kolden se posiciona. Investimento via agências **+10%** e publicidade
digital **+12,7%** em 2025. A concorrência vai de gigantes de performance/franquia (V4, Cadastra) a
uma **safra nova de "agências de IA"** (Koko, NAVE.ai, Trilion, NovoFlow) ainda pequena e fragmentada.
**Achado central:** nenhum player do recorte tem IA proprietária/soberana — os grandes usam IA via
SaaS de terceiros e os "AI-first" pequenos têm narrativa de IA com stack modesto. É a lacuna defensável
da Kolden.

## 2. Mercado / Sizing (TAM/SAM/SOM — método declarado)

| Métrica | Valor | Método / fonte | Confiança |
|---|---|---|---|
| Investimento publicitário **via agências** 2025 | **R$ 28,9 bi** (+10%) | Top-down — Painel CENP-Meios (330 agências) | [VERIFICADO] CENP, Valor, UOL, Mundo do Marketing |
| **Publicidade digital** 2025 | **R$ 42,7 bi** (+12,7%) | Top-down — IAB Brasil / Digital Adspend 2026 + Ibope | [VERIFICADO] IAB, Meio&Mensagem, Exame, SET |
| Retail media 2025 | R$ 4,8 bi (+37%) · DOOH R$ 4,4 bi | IAB Digital Adspend 2026 | [FONTE ÚNICA] IAB |
| Mercado digital (visão internacional) | US$ 17,3 bi (2025) → US$ 19,3 bi (2026) | Research and Markets, Databook Q1 2026 | [DIVERGÊNCIA] ⚠️ |

> ⚠️ **Divergência exposta (não reconciliada):** IAB = R$ 42,7 bi de digital; Research&Markets ≈ US$ 17,3 bi
> (≈ R$ 90 bi+). **Metodologias diferentes** (IAB mede anúncios monitorados pelo Ibope; o report
> internacional usa outra base). Não tratar como o mesmo número.

- **TAM** (serviços de marketing endereçáveis): proxy = investimento intermediado por agências, **~R$ 29 bi/ano** (CENP). [top-down]
- **SAM** (digital/performance/IA): fração digital **~R$ 42,7 bi** de mídia movimenta serviços proporcionais. [top-down]
- **SOM**: **não estimável** sem dados internos da Kolden (capacidade comercial/entrega). [honesto — não inventado]
- **Bottom-up (contagem):** 330 agências estruturadas (CENP) → ~milhares formais (Sebrae: 2.687 abertas só em 2021)
  → **963.069 estabelecimentos** na CNAE "Publicidade e Pesquisa de Mercado" (Sebrae, fev/2026 — **inclui MEIs/autônomos**).
  [FONTE ÚNICA por nível; faixa ampla por definição de CNAE]
  - *Nota:* o bottom-up firmográfico preciso via Apollo (`mixed_companies_search`) **não foi possível** — endpoint
    bloqueado no plano Apollo free (reportado, não mascarado).

## 3. Tendências (datadas)

- **IA como divisor de águas:** Google "AI Assessment 2025" rankeia maturidade de IA das agências (Cadastra entre as 6 mais maduras). Surge a categoria "agência de IA / AI-first".
- **Retail media (+37%)** e **DOOH** em alta (IAB 2026).
- Concentração: 5 setores = 48% da verba digital (Comércio 25%, Eletrônicos 8%, Financeiro 6%, Educação 5%, Mídia 4%).

## 4. Panorama competitivo por segmento

| Segmento | Players de referência | Confiança |
|---|---|---|
| **IA & automação** (mais próximo da Kolden) | Koko (RJ), NAVE.ai (SP), Trilion (SP), Tryvia (DF), Pivot 08 (SP), NovoFlow, Seven7th | sites próprios — capacidades [AUTO-REPORTADO] |
| **Performance / franquia** | **V4 Company**, **Cadastra** | firmográficos [VERIFICADO Apollo]; "R$40 bi em projetos" da V4 = [AUTO-REPORTADO] ⚠️ |
| **Publicidade / full-service** | Africa (líder mídia 2025), AlmapBBDO, Galeria | [VERIFICADO] ranking CENP via Meio&Mensagem |
| **Marketing digital / growth** | GV8, Agência Mestre, Degrau, Colors, Newcore | [FONTE ÚNICA] rankings de blogs (viés promocional) |

## 5. Micro — dossiês firmográficos (Apollo, 2026-06-22) [VERIFICADO Apollo]

| Concorrente | Fundada | Sede | Headcount | Cresc. 12m | Stack de IA |
|---|---|---|---|---|---|
| **V4 Company** | 2012 | Campinas/SP | ~3.500 | +8,6% (24m +24%) | SaaS de terceiros (Claude, ChatGPT, Gemini, Copilot, Midjourney, n8n, Make) |
| **Cadastra** | 2000 | São Paulo/SP | ~900 (8+ escritórios) | +11% | Dados/IA robusto, mas terceiro (Databricks, BigQuery, GCP, SF Marketing Cloud) |
| **Koko** | 2015 | Rio de Janeiro/RJ | ~36 | +8% | Narrativa "inteligente"; stack básico (WordPress, Meta, GA4) |
| **NAVE.ai** | 2022 | São Paulo/SP | ~10 | −14% | "AI-first" no discurso; site em Wix; cases grandes (Ajinomoto/Heineken) |

- **V4 Company:** 4 modelos (Shared Team, V4X enterprise, Project, Partnership); deptos marketing 724 / design 470 / vendas 404; sub-org Staage. Escala por **distribuição (franquia)**, não por tecnologia proprietária.
- **Cadastra:** 25 anos, FT "Americas' Fastest-Growing 2023", M&A em 2022 (UK). A concorrente **enterprise + IA madura** — ainda assim sobre cloud/SaaS de terceiros.
- **Koko / NAVE.ai:** representam a fronteira "IA + criatividade", mas **operação pequena** (10-36 pessoas) e stack observável modesto — narrativa de IA acima da infraestrutura.

## 6. 💡 Posicionamento da Kolden (insight central — VERIFICADO pelos stacks)

> **Ninguém no recorte tem IA proprietária/soberana.** Grandes (V4, Cadastra) rodam IA via SaaS de
> terceiros; "AI-first" pequenos (NAVE, Koko) têm narrativa de IA com stack modesto e times de 10-36.

- **Lacuna defensável da Kolden:** infra self-hosted + vendor-agnóstico + squads/motor proprietários (soberania de dados). Mensagem: **"IA proprietária e soberana, não IA alugada."**
- **Nicho-alvo:** o vão entre boutiques de IA frágeis (10-36 pessoas) e enterprise (Cadastra) — **profundidade técnica com entrega enxuta**.
- **Risco competitivo:** V4 (distribuição/escala) e Cadastra (maturidade/enterprise) dominam mindshare — competir por nicho de profundidade, não por volume.

## 7. Handoffs sugeridos

- **Caliope (copy):** ângulo "IA soberana vs. IA alugada" + prova (stack próprio).
- **Pluto (oferta/preço):** mirar o vão boutique-frágil × enterprise; faixas de fee por porte.
- **Aletheia (validação):** testar a proposta "soberania de IA" com ICPs antes de escalar.
- **Peitho / Pheme:** benchmarks de presença e mídia dos players para a marca Kolden.

## 8. Limitações honestas (gate)

- SOM não estimado (faltam dados internos da Kolden).
- Capacidades dos players de IA são **auto-declaradas** (sites próprios) — não auditadas.
- Contagem de agências tem faixa enorme por definição de CNAE (MEI vs. agência estruturada).
- Divergência IAB × report internacional **não** reconciliada (metodologias).
- Bottom-up firmográfico via Apollo bloqueado (plano free).

## 9. Fontes (citação)

- CENP-Meios 2025 (R$ 28,9 bi) — cenp.com.br · valor.globo.com · economia.uol.com.br · mundodomarketing.com.br
- IAB Brasil / Digital Adspend 2026 (R$ 42,7 bi) — iabbrasil.com.br · meioemensagem.com.br · exame.com · set.org.br
- Research and Markets — Brazil Digital Ad Spend Databook Q1 2026 (researchandmarkets.com)
- eMarketer — Brazil Ad Spending Benchmarks 2025 / Infopack 2026 (emarketer.com)
- Sebrae / Observatório — Publicidade e Pesquisa de Mercado (observatorio.sebrae.com.br)
- CENP / Meio&Mensagem — maiores agências por compra de mídia 2025
- Rankings setoriais (blogs de agências) — usar com ressalva
- Apollo.io — enrichment firmográfico de V4, Cadastra, Koko, NAVE.ai (2026-06-22)
- Sites próprios — Koko, NAVE.ai, Trilion, Tryvia, Pivot 08, NovoFlow, Seven7th, V4, Cadastra

---

## Anexo — Metadados do teste (validação do squad)

- **Ponte Hermes→Argos:** validada (`invoca-squad.ps1` DryRun + execução real headless); fix aplicado no
  `squads-catalog.yaml` (`tipo: claude-code` → `aios`).
- **SMOKE 1 (roteamento):** ✅ argos-chief diagnosticou e roteou.
- **SMOKE 8 (ponta-a-ponta):** ✅ jornada macro→micro com tools reais (firecrawl/exa/tavily/Apollo).
- **Gate de confiabilidade:** ✅ exercitado (cross-check, rótulos, divergência exposta, limitação declarada).
- **Créditos Apollo:** 4 enrichments (1 cada); `mixed_companies_search` falhou sem custo (plano free).
