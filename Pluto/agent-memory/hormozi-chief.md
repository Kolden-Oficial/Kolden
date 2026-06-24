# Memória do Agente hormozi-chief (Pluto)

> Memória persistente deste agente. Atualizada pelo Ritual de Encerramento
> (habilidade `ritual-de-encerramento`) ao final de cada sessão com trabalho.
> Não reescrever do zero — apenas adicionar, refinar e arquivar. Datas absolutas (AAAA-MM-DD).

## Padrões Ativos
<!-- Padrões atuais e verificados usados por este agente -->

### Fundação de negócio antes do método
- A Kolden NÃO tem ICP/oferta/posicionamento/receita definidos — `sobre-a-empresa/mercado-e-posicionamento/*` está tudo `status: rascunho` e vazio; só `marca/identidade-visual.md` e `CLAUDE.md` (infra) estão vigentes. | 2026-06-23
- Memória do workspace proíbe assumir o modelo de negócio. Logo: antes de aplicar qualquer framework Hormozi, TRAVAR com o usuário (produto-foco + ICP + escopo + destino) via AskUserQuestion. Não inferir. | 2026-06-23
- Candidatos a "produto" da Kolden: serviços de IA (squads/agentes B2B), Kolden OS self-hosted, CataLogo/Tracker Flow (SaaS), omiron (app saúde). Nenhum validado como oferta oficial. | 2026-06-23

### Como produzir entregável Hormozi fundamentado
- Quando docs-fonte estão em rascunho, gravar o entregável como `status: rascunho` com bloco de PREMISSAS explícito no topo e números marcados com `≈`/"premissa" — nunca transformar suposição em fato silencioso. | 2026-06-23
- Estrutura que funcionou p/ playbook oferta+leads: espelhar o `wf-offer-creation` em seções (Diagnóstico→Grand Slam Offer→Pricing→Hooks→Core 4→Lançamento→Métricas) e fechar com auto-avaliação contra `HORMOZI-CL-001`. | 2026-06-23
- Gates a cumprir e verificar por grep: Value Equation ≥10:1, ≥20 hooks em ≥4 categorias, Core 4 priorizado por estágio, LTGP>CPA com lead math, projeção de receita, CLOSER referenciado. | 2026-06-23
- Para ICP $0→$1M, priorizar canais warm→cold→content→paid; paid só após ≥5 clientes fechados no grátis (regra Hormozi). | 2026-06-23

### Convenção sobre-a-empresa/
- Docs em `sobre-a-empresa/` exigem frontmatter YAML (id, titulo, resumo, categoria, palavras-chave, status, atualizado-em, relacionados), PT-BR, kebab-case, single-topic. Modelo vigente: `marca/identidade-visual.md`. | 2026-06-23

### Preferências do usuário (Ronan)
- Quer que o agente invocado realmente USE o método do squad citado (ex.: @pluto → frameworks Hormozi reais dos arquivos), não conselho genérico. | 2026-06-23
- Não fazer de carona: não preencher outros docs (ofertas-e-produtos, icp) sem pedido; não commitar sem ordem explícita. | 2026-06-23

## Candidatos a Promoção
<!-- Padrões vistos em 3+ agentes — candidatos para CLAUDE.md ou regras centrais -->
- **Travar premissas de negócio com o usuário antes de aplicar framework quando `sobre-a-empresa/` está rascunho** | Origem: hormozi-chief (Pluto); aplicável a Aletheia, Olimpo, Themis, Pheme | Detectado: 2026-06-23

## Arquivado
<!-- Padrões não mais relevantes — mantidos para histórico -->
