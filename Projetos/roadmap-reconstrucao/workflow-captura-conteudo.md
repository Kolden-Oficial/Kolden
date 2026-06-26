# Workflow — Captura e Inteligência de Conteúdo Externo
**Versão:** 1.0  
**Data:** 2026-06-25  
**Objetivo:** Transformar qualquer link ou DM de rede social em insumo estruturado para o ecossistema Kolden.  
**Princípio:** Zero perda de referência. Tudo que o Ronan vê e considera relevante entra, é processado e vira ativo.

---

## Visão geral do fluxo

```
Ronan compartilha link/conteúdo
        ↓
[ETAPA 1] Extração & Transcrição
        ↓
[ETAPA 2] Análise & Dossiê
        ↓
[ETAPA 3] Verificação na Kolden
        ↓
[ETAPA 4] Proposta de ação
        ↓
[ETAPA 5] Aprovação do Ronan
        ↓
[ETAPA 6] Execução & Registro
```

---

## ETAPA 1 — Extração & Transcrição

**O quê:** Ronan envia um link (qualquer rede) ou pede extração de DMs.  
**Ferramentas:**

| Fonte | Ferramenta | Observação |
|-------|-----------|------------|
| Instagram (perfil/post/reel) | Apify (Instagram Scraper) | Via API Apify |
| Instagram (DMs) | Meta Graph API | Ronan tem acesso — extrai mensagens do grupo |
| TikTok | Apify (TikTok Scraper) | Perfil, vídeos, comentários |
| YouTube | Apify ou youtube-dl + Deepgram | Transcrição de áudio via Deepgram |
| Twitter/X | Apify (Twitter Scraper) | Posts, threads, perfil |
| LinkedIn | Apify (LinkedIn Scraper) | Perfil, posts |
| Sites/artigos | Firecrawl | Extração de conteúdo web limpo |
| Podcasts/áudios | Deepgram | Transcrição de alta qualidade |

**Output da Etapa 1:**
- Texto bruto transcrito
- Metadados: autor, data, rede, URL, métricas (likes, views, comentários)
- Mídia baixada (se relevante)

---

## ETAPA 2 — Análise & Dossiê

**Quem processa:** Argos (inteligência) + Liceu (dossiê de perfil) + Orfeu (narrativa)  
**O que é gerado:**

### 2a — Dossiê do Perfil/Autor
- Quem é a pessoa (cargo, empresa, área)
- Como pensa e comunica
- Qual é o propósito do canal/perfil
- Público que atrai
- Posicionamento e narrativa central

### 2b — Análise do Conteúdo
- O que é o conteúdo (formato, tema, categoria)
- O que gerou o conteúdo (gatilho, contexto, tendência)
- Qual o propósito (educar, vender, entreter, construir autoridade)
- Métricas de performance (se disponível)
- Frameworks e modelos mentais identificados

### 2c — Extração de Valor para a Kolden
- Insights aplicáveis
- Referências de copy, narrativa, formato
- Oportunidades de mercado identificadas
- Benchmarks de concorrentes (se for concorrente)

---

## ETAPA 3 — Verificação na Kolden

**O quê:** Antes de criar qualquer arquivo novo, verifica se já existe algo no ecossistema.

Checklist automático:
- [ ] Já existe dossiê desse autor em `sobre-a-empresa/` ou em algum squad?
- [ ] Esse conteúdo já foi processado antes? (busca por URL + título)
- [ ] Existe agente no Liceu ou outro squad que cobre essa mente/especialista?
- [ ] Existe skill, workflow ou documento similar que pode ser complementado?
- [ ] O Argos já tem inteligência sobre esse concorrente/mercado?

**Resultado:**
- `NOVO` — não existe nada similar → vai para Etapa 4 com proposta de criação
- `COMPLEMENTA` — existe algo relacionado → proposta de atualização
- `DUPLICADO` — já existe exatamente isso → arquiva referência, não cria

---

## ETAPA 4 — Proposta de Ação

**Hermes apresenta ao Ronan:**

```
📥 CONTEÚDO CAPTURADO
Fonte: [rede] | Autor: [nome] | URL: [link]

📋 DOSSIÊ RÁPIDO
[resumo do autor e conteúdo em 3-5 linhas]

💡 INSIGHTS EXTRAÍDOS
- [insight 1]
- [insight 2]
- [insight 3]

🔍 STATUS NA KOLDEN
[NOVO / COMPLEMENTA / DUPLICADO] — [o que existe ou não]

⚡ PROPOSTA DE AÇÃO
Opção A: Criar dossiê completo em [caminho]
Opção B: Adicionar ao agente [nome] no squad [squad]
Opção C: Acionar Caos para criar agente novo baseado nessa mente
Opção D: Só arquivar como referência em [pasta]

Aguardando aprovação.
```

---

## ETAPA 5 — Aprovação do Ronan

Ronan responde: "A", "B", "C", "D" ou instrução customizada.  
Sem aprovação, nada é criado ou modificado.

---

## ETAPA 6 — Execução & Registro

**Conforme aprovação:**

- `Opção A` → Hermes cria o dossiê em `sobre-a-empresa/` ou squad relevante
- `Opção B` → Hermes atualiza o agente existente com os novos insumos
- `Opção C` → Hermes avisa: "abra o Caos para o ritual de criação" (não é headless)
- `Opção D` → Hermes salva em `sobre-a-empresa/referencias/` com metadados

**Registro obrigatório:**
- Todo conteúdo processado entra no índice `sobre-a-empresa/referencias/indice-capturas.md`
- Data, fonte, autor, URL, status, ação tomada

---

## Caso especial — DMs do Instagram (grupo)

**Fluxo específico:**

1. Ronan autoriza extração do grupo via Meta Graph API
2. Hermes extrai mensagens (com paginação, respeitando rate limits)
3. Filtra por relevância (remove spam, off-topic, duplicatas)
4. Agrupa por tema/tópico
5. Para cada cluster: gera resumo + insights
6. Identifica formações/referências que valem virar ativo na Kolden
7. Apresenta relatório para aprovação antes de criar qualquer documento

**Boa prática:** Extrair em lotes, processar por período (ex: últimos 90 dias primeiro).

---

## Redes suportadas (v1)

| Rede | Perfil | Posts/Vídeos | DMs/Grupos | Stories |
|------|--------|-------------|-----------|---------|
| Instagram | ✅ | ✅ | ✅ (via API) | ⚠️ limitado |
| TikTok | ✅ | ✅ | ❌ | ❌ |
| YouTube | ✅ | ✅ (transcrição) | ❌ | ❌ |
| Twitter/X | ✅ | ✅ | ❌ | ❌ |
| LinkedIn | ✅ | ✅ | ❌ | ❌ |
| Sites/blogs | ✅ | ✅ | ❌ | ❌ |
| Podcasts | ✅ | ✅ (transcrição) | ❌ | ❌ |

---

## Como usar (instrução para o Ronan)

Basta mandar aqui no WhatsApp:

- "Hermes, analisa esse perfil: [link]"
- "Hermes, processa esse vídeo: [link]"
- "Hermes, extrai os DMs do grupo [nome] dos últimos 30 dias"
- "Hermes, o que temos sobre [nome da pessoa]?"

Hermes executa o fluxo completo e volta com a proposta antes de criar qualquer coisa.

---

## Próximos passos para ativar

- [ ] Configurar Apify token no Infisical (já está em `/kolden/dev/APIFY_TOKEN`)
- [ ] Configurar Meta Graph API token para DMs
- [ ] Criar pasta `sobre-a-empresa/referencias/` com `indice-capturas.md`
- [ ] Criar skill `captura-conteudo-externo` no Hermes para padronizar o fluxo

---

*Documento vivo — atualizar conforme novas redes e ferramentas forem adicionadas.*
