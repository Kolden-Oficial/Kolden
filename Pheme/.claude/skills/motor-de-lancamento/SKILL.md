---
name: motor-de-lancamento
description: >
  Planeja lançamentos de produto, recurso ou campanha como um SISTEMA DE MOMENTUM
  (não um único dia) — usando o modelo de canais ORB (Owned/Rented/Borrowed:
  próprios, alugados, emprestados) e o faseamento (pré-lançamento → dia do
  lançamento → pós-lançamento de 30 dias). Cobre estratégia de canal, lista de
  espera/early access, Product Hunt, e o momentum pós-lançamento que faz a coisa
  compor. Use quando o pedido for "planejar um lançamento", "go-to-market",
  "lançar um recurso", "anúncio", "Product Hunt", "beta/early access",
  "lista de espera", "waitlist", "checklist de lançamento" ou "manter o
  momentum depois do lançamento". Para a sequência de e-mails do anúncio,
  chama `sequencia-de-nutricao`; para indicação como alavanca, `programa-de-indicacao`.
metadata:
  type: reference
tipo: skill
area: Pheme
up: "[[Pheme/_MOC-pheme]]"
---

# Motor de Lançamento — momentum que compõe, não um dia só

As melhores empresas não lançam uma vez: lançam de novo e de novo. Todo recurso,
melhoria e atualização é uma chance de capturar atenção. Um lançamento forte não
é um momento — é colocar o produto cedo na mão de usuários, aprender com feedback
real, fazer barulho em cada estágio e construir momentum que compõe.

## Dois frameworks dirigem tudo

### ORB — mapeie cada ação de lançamento a um tipo de canal
- **Próprios (Owned)** — lista de e-mail, blog, comunidade, in-app. Você controla o alcance; **ative primeiro**. Tudo deve voltar para cá.
- **Alugados (Rented)** — redes sociais, marketplaces, YouTube, Reddit. Alcance algorítmico; jogue pelas regras deles, mas **funile para o próprio**.
- **Emprestados (Borrowed)** — audiências de parceiros, newsletters, podcasts, Product Hunt, influenciadores. Alcance de terceiros; exige relação construída **semanas antes** do dia.

Um plano que cobre só um tipo de canal está incompleto — a régua de qualidade são **os três**.

### Faseamento — sequencie em vez de apostar num dia
1. **Pré-lançamento (2-6 semanas antes):** waitlist/early access, outreach de canal emprestado, produção de assets.
2. **Dia do lançamento:** checklist time-boxed, todos os canais disparando, fundador disponível para engajar.
3. **Pós-lançamento (30 dias):** conteúdo de momentum — páginas de comparação, estudos de caso, e-mail de roundup, retargeting.

O modelo completo de 5 fases (do lançamento interno ao full launch), os exemplos por canal (Superhuman/Notion/TRMNL) e as táticas por plataforma estão em `references/frameworks-de-lancamento.md`.

## Gatilhos proativos (ofereça planejamento sem ser pedido)
- **Data de ship de recurso mencionada** → pergunte já pelo plano de lançamento; embarcar sem plano de marketing é oportunidade perdida.
- **Waitlist / early access mencionado** → ofereça o funil faseado completo (do alfa ao GA), não só a landing.
- **Product Hunt cogitado** → dispare a estratégia PH completa, incluindo a timeline de construção de relação pré-lançamento.
- **Silêncio pós-lançamento** → lançou e não fez follow-up? Sugira o momentum (comparação, roundup, demo interativa).
- **Mudança de preço planejada** → é uma oportunidade de lançamento; trate como atualização de produto com campanha de anúncio.

## Artefatos de saída
| Artefato | Formato | Descrição |
|---|---|---|
| Plano de lançamento | Doc | Fase a fase com donos, datas, canais e métricas de sucesso |
| Mapa de canais ORB | Tabela | Estratégia Próprios/Alugados/Emprestados com táticas por canal |
| Checklist do dia | Checklist | Execução do dia com ações time-boxed |
| Brief de Product Hunt | Doc | Copy da listagem, specs de asset, timeline pré-lançamento, playbook de engajamento |
| Plano de momentum pós-lançamento | Lista | Ações de 30 dias para sustentar e compor o lançamento |

## Régua de qualidade
Planos de lançamento são concretos, datados e específicos por canal — nada de "postar nas redes". Toda saída diz quem faz o quê e quando. Um plano só está completo quando cobre **os três tipos de canal ORB** E inclui ações de dia-do-lançamento **e** de pós-lançamento. Antes de redigir qualquer copy, alinhe a narrativa do lançamento à linguagem do ICP e ao posicionamento (use `fundacao-de-voz`).

## Cruzamentos
- **`sequencia-de-nutricao`** — escreve a sequência de anúncio e o onboarding pós-lançamento (não substitui a estratégia de canal).
- **`programa-de-indicacao`** — indicação/afiliados como alavanca de canal emprestado.
- **`matriz-de-conteudo`** + **`roteiro-de-reels`** — abastecem os canais alugados (social) no runway de pré-lançamento.
- **Pluto** quando o lançamento é de pricing/oferta; publicação social via `publicacao-social`.

---
**Procedência:** método adaptado da skill `launch-strategy` de
`alirezarezvani/claude-skills` (`SKILL.md` + `references/launch-frameworks-and-checklists.md`),
@4a3c05b69e64f4925f7fc65c88890f614f79caf0, licença MIT. Des-personalizado,
traduzido e reescrito em pt-BR; sem cópia literal. Exemplos de marca citados como
referência pública de método, não como endosso.
