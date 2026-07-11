---
id: playbook-prospeccao-grupo-facebook-publico
nome: prospeccao-grupo-facebook-publico
titulo: "Prospecção em grupo Facebook (apenas conteúdo público)"
resumo: "Identificar leads aderentes ao ICP da Kolden dentro de grupos Facebook de afinidade (ex: brasileiros nos EUA), lendo SOMENTE conteúdo público do grupo. Sem login, sem DM, sem scraping de membros."
categoria: playbook
palavras-chave: [prospeccao, facebook, grupos, leads, prospeccao-na-gringa, brasileiros-nos-eua]
status: oficial
versao: "0.1.0"
atualizado-em: 2026-06-30
ocorrencias: 1   # 1ª instância: brasileirosemwoburnma
tipo: nota
area: operacao
up: "[[sobre-a-empresa/Kolden/operacao/_MOC-operacao]]"
relacionado:
  - "[[sobre-a-empresa/Kolden/operacao/tarefas/playbooks/cerebro-notebooklm|cerebro-notebooklm]]"
  - "[[sobre-a-empresa/Kolden/operacao/tarefas/playbooks/checklist-de-contrato|checklist-de-contrato]]"
---

# Playbook — Prospecção em grupo Facebook (público)

> Origem: pedido do Ronan em 2026-06-30 (sessão `effervescent-eagle`) — grupo
> `brasileirosemwoburnma`. Inserido como playbook reutilizável para outros grupos similares
> (brasileiros em Lowell, Framingham, Marlborough, NJ etc).

## Quando usar

- Tese **"Prospecção na Gringa"** (Kolden — assessoria de marketing para negócios brasileiros nos EUA) precisa de pipeline novo.
- Grupos Facebook de afinidade cultural (brasileiros, latinos, comunidades regionais) **abertos** ou com conteúdo visualmente público.
- Antes de qualquer cadência fria (email, DM), valida que o grupo TEM o ICP que você procura.

## Pré-requisitos

- Grupo é **público** ou tem conteúdo **visualmente acessível sem login** (verificar antes de chamar Argos).
- **ICP definido**: para qual oferta da Kolden esses leads servem (assessoria? produto específico? parceria?).
- Política de busca confirmada (este playbook usa Argos para leitura web; declarar ferramenta+nível antes — padrão da Kolden).

## ICP padrão — "Empreendedor brasileiro nos EUA" (Kolden direto)

| Critério | Sinal positivo | Sinal negativo |
|---|---|---|
| Tem negócio próprio? | Posts oferecendo serviço/produto, "minha empresa", reviews | Só pede dica, só consome |
| Setor | Reforma/construção, food service, beleza, transporte, serviços B2C | Empregado CLT, professor, médico |
| Tempo de mercado | "Atendendo desde X", reviews positivos, autoridade no grupo | Sem rastro, post único |
| Idioma/voz | PT-BR + termos US ("financiamento", "insurance", "license") | 100% PT-BR ou 100% EN |
| Sinaliza dor de marketing? | "Procuro mais clientes", "Como anunciar?", "Meu Instagram não cresce" | Não cita marketing |

## Limites de compliance (NÃO negociáveis)

1. **Apenas conteúdo público.** Sem login Facebook, sem cookies, sem rookiepy. Argos lê o que é visualmente acessível sem autenticação.
2. **Sem scraping de membros.** Lista de membros do grupo NÃO é alvo. Só posts/comentários públicos.
3. **Sem DM em massa.** Lead identificado vira **registro de contato** no radar/CRM. Abordagem subsequente é 1-a-1, manual, opt-in.
4. **Sem coleta de PII além do necessário.** Nome público + link do perfil + post de evidência. Nada de telefone/email a menos que o lead mesmo tenha postado.
5. **`muda_algo: false`** — só leitura/análise. Cadência efetiva é tarefa separada com `muda_algo: true`.

## Passos

### Fase 1 — Validação do grupo (Argos)
1. Argos lê 30-60 posts mais recentes do grupo (cabeçalho + autor + reactions count).
2. Classifica posts por categoria: oferta de serviço / pedido / dica / off-topic.
3. Retorna síntese: tamanho do grupo, frequência de posts, % do ICP visível.
4. **Gate**: se < 10% dos posts têm sinal do ICP, ABORTAR e logar "grupo não-alvo".

### Fase 2 — Mapeamento de leads (Argos)
1. Para cada post com sinal de ICP, extrair: nome público do autor, link do perfil (URL pública), texto do post, data.
2. Marcar duplicados (mesmo autor postando múltiplas vezes = lead quente).
3. Saída: CSV em `_conhecimento-institucional/prospeccao-na-gringa/leads/<grupo-slug>-<data>.csv`.

### Fase 3 — Qualificação (Aletheia + Êmporos)
1. Aletheia avalia cada lead contra ICP: alta/média/baixa aderência.
2. Êmporos sugere offer-fit: assessoria full, projeto único, lead magnet (mini-curso, ebook).
3. Saída: planilha enriquecida com classificação + offer sugerida.

### Fase 4 — Copy de abordagem (Caliope)
1. Caliope escreve 3 versões de mensagem inicial em PT-BR "US-vibe" (mistura PT + EN natural).
2. **Não envia** — só prepara. Envio = decisão humana, lead-a-lead, opt-in.
3. Saída: pacote `mensagens-iniciais.md` por lead alto.

### Fase 5 — Decisão humana (Ronan)
1. Ronan revisa a lista qualificada.
2. Decide quais leads abordar primeiro (sweet-spot: alta aderência + dor explicitada).
3. Faz a abordagem **1-a-1, manualmente** (FB DM, LinkedIn, ou cold email se o lead expôs o contato).

## Capacidade Kolden

`agente-faz-com-input` — Argos+Aletheia+Caliope fazem 80% do trabalho. Input necessário do Ronan: ICP (esta instância: empreendedor brasileiro nos EUA, oferta Kolden direto) e decisão final de quem abordar.

## Critério de feito (por instância)

- [ ] Grupo validado (Fase 1) ou abortado com justificativa.
- [ ] CSV de leads brutos extraído (Fase 2).
- [ ] CSV qualificado por aderência ICP + offer-fit (Fase 3).
- [ ] Pacote de copy de abordagem pronto (Fase 4).
- [ ] Decisão humana documentada: quais leads abordar (Fase 5).

## Histórico de instâncias

| Grupo | Tarefa ID | URL | Status |
|---|---|---|---|
| brasileirosemwoburnma | KLD-2026-136 | https://www.facebook.com/groups/brasileirosemwoburnma/ | backlog |

## Evolução pendente

- Skill `/prospectar-grupo <url>` no Caos (sessão dedicada) — engenharia completa que automatiza F1→F4.
- Integração com **Êmporos pipeline GHL**: leads qualificados sobem como contato no CRM.
- Refinar lista de grupos-alvo: pesquisa Argos por "brasileiros em <cidade-EUA>" → mapa de grupos similares.
- Variantes para outros nichos (latinos em Boston, italianos em NJ, comunidades regionais brasileiras nos EUA).
