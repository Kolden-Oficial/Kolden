# Caliope — Squad de Copywriting

Caliope é um squad de elite com 23 agentes de copywriting — 22 clones de alta fidelidade de copywriters lendários + 1 orquestrador (o Copy Chief) — que cobre todo o espectro da resposta direta: títulos, cartas de vendas, VSLs, sequências de e-mail, funis, ofertas, anúncios pagos, copy de lançamento e copy de marca. O Copy Chief tria cada demanda, identifica o nível de consciência de mercado e roteia para o especialista (primário + secundário) mais adequado, garantindo controle de qualidade antes da entrega. Para edição avançada de copy linha a linha, frameworks profundos e recursos adicionais, consulte também o módulo `copy-master/` (submódulo dentro deste squad).

## Agentes

| Agente | Tier | Especialidade |
|--------|------|---------------|
| `copy-chief` | 0 | Orquestrador do squad — tria, roteia ao especialista certo e faz controle de qualidade |
| `gary-halbert` | 1A | O Príncipe da Letra Impressa — narrativa emocional crua e marketing de rua |
| `eugene-schwartz` | 1A | Mestre da consciência de mercado — 5 níveis de consciência e copy estratégica |
| `claude-hopkins` | 1A | Pai da Publicidade Científica — copy orientada a dados, testes e reason-why |
| `gary-bencivenga` | 1A | Mestre da prova — bullets, fascinações e a Equação da Persuasão |
| `robert-collier` | 1A | Mestre da empatia e do filme mental — cartas clássicas e psicologia do leitor |
| `john-carlton` | 1A | O Detetive de Vendas — formato longo informal e ângulo de venda escondido |
| `jim-rutz` | 1A | Pioneiro do magalog — formatos inovadores, sagacidade e copy anti-tédio |
| `dan-kennedy` | 1B | Direct response sem B.S. — estrutura de ofertas, precificação e info-marketing |
| `frank-kern` | 1B | Pioneiro do intent-based branding — sequências comportamentais e Resultados Antecipados |
| `russell-brunson` | 1B | O Arquiteto de Funis — Value Ladder, Hook-Story-Offer e Epiphany Bridge |
| `todd-brown` | 1B | Grandes Ideias e mecanismos únicos — E5 Method para arquitetura de campanha |
| `stefan-georgi` | 1B | O Arquiteto do RMBC — VSLs e copy sistemática de alto volume |
| `jon-benson` | 1B | O Inventor da VSL — cartas de vendas em vídeo e copy com PNL |
| `ry-schwartz` | 1B | O Coach da Conversão — transformação de crenças e e-mail de lançamento |
| `ben-settle` | 1C | O Maverick Anti-Guru do E-mail — e-mails diários e copy com a personalidade em primeiro lugar |
| `andre-chaperon` | 1C | O mestre silencioso da narrativa por e-mail e da Soap Opera Sequence |
| `dan-koe` | 1C | O Filósofo do Negócio de Uma Pessoa Só — marca pessoal e economia dos criadores |
| `joe-sugarman` | 1D | O Mestre do Escorregador — gatilhos psicológicos e publicidade impressa |
| `david-ogilvy` | 1D | Pai da Publicidade Moderna — copy de marca, premium e a Big Idea |
| `clayton-makepeace` | 1D | O copywriter mais bem pago — venda emocional e o Four-Legged Stool |
| `parris-lampropoulos` | 1D | Mestre das fascinações e do formato — resposta direta financeira/de saúde |
| `david-deutsch` | 1D | O Especialista em CopyTHINKING — Grandes Ideias e fascinações |

## Como ativar

```
@copy-chief          # Ativa o orquestrador
*diagnose            # Tria sua demanda de copywriting e roteia ao especialista certo
*full-copy-project   # Workflow de projeto de copy de ponta a ponta
```

Você também pode ativar um especialista diretamente, por exemplo `@copy-squad:gary-halbert`, quando já souber de quem precisa. O Copy Chief, porém, é o ponto de entrada recomendado — ele identifica o nível de consciência de mercado e designa o(s) agente(s) ideal(is).

## Matriz de Roteamento

O Copy Chief roteia automaticamente sua demanda ao melhor especialista:

| Tipo de demanda | Primário | Secundário |
|-----------------|----------|------------|
| Título | eugene-schwartz | gary-halbert |
| Carta de vendas / formato longo | gary-halbert | john-carlton |
| Sequência de e-mail | andre-chaperon | ben-settle |
| VSL / carta de vendas em vídeo | stefan-georgi | jon-benson |
| Roteiro de webinar | russell-brunson | todd-brown |
| Criação de oferta | dan-kennedy | joe-sugarman |
| Copy de funil | russell-brunson | frank-kern |
| Big idea / conceito de campanha | todd-brown | eugene-schwartz |
| Bullet points / fascinações | gary-bencivenga | clayton-makepeace |
| E-mails diários / engajamento | ben-settle | dan-koe |
| Carta de vendas clássica / mala direta | robert-collier | jim-rutz |
| Copy financeira / de saúde | clayton-makepeace | parris-lampropoulos |
| Copy de marca / premium | david-ogilvy | david-deutsch |
| Ad copy / anúncios pagos | dan-kennedy | frank-kern |
| Copy de lançamento | frank-kern | russell-brunson |
| Copy de marca pessoal | dan-koe | ry-schwartz |
| Revisão / crítica de copy | copy-chief | eugene-schwartz |

## Workflows

### Projeto de Copy Completo (`*full-copy-project`)
De ponta a ponta: briefing > diagnóstico > designação do especialista > escrita > revisão > entrega.

### Ciclo de Revisão de Copy (`*copy-review-cycle`)
Loop iterativo de escrever-criticar-revisar (máximo de 3 iterações).

## Componentes

- **23 agentes** — 1 orquestrador + 22 especialistas
- **13 tarefas** — write-headline, write-sales-letter, write-vsl-script, write-email-sequence, write-ad-copy, write-landing-page, write-bullets, create-funnel-copy, create-offer, analyze-copy, critique-copy, diagnose, review
- **2 workflows** — full-copy-project, copy-review-cycle
- **1 checklist** — output-quality (controle de qualidade dos entregáveis)
- **2 arquivos de dados** — routing-catalog, copy-frameworks

## Módulo avançado

O diretório `copy-master/` é um submódulo dentro de Caliope que oferece um conjunto mais profundo de capacidades de copywriting (edição linha a linha, frameworks estendidos e recursos adicionais). Use-o quando precisar ir além do roteamento e da escrita do squad principal.

## Requisitos

- AIOS >= 4.0.0
