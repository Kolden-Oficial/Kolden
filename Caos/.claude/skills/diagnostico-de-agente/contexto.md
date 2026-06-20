# Trilhas de diagnóstico por domínio

Perguntas extras e pontos de atenção por categoria de agente. Carregadas no Passo 0 da
skill `diagnostico-de-agente` depois que o domínio é detectado em
`dados/catalogo-de-roteamento.yaml`.

**Como usar:** cada seção de domínio está organizada pelas 7 faculdades. Na rodada
correspondente do diagnóstico, injete as perguntas da faculdade do domínio detectado
**após** as perguntas centrais da SKILL.md. Não use perguntas de um domínio diferente
do detectado. Se não houver perguntas para uma faculdade em um domínio, pule — as
centrais bastam.

---

## Conversacional (suporte, atendimento, vendas em chat)
*Foco: comportamento em diálogo e critério de escalação para humano.*

### Alma
- Este agente representa uma marca específica? Qual é a identidade da marca que ele deve encarnar?
- Qual métrica define sucesso para cada conversa? (resolução no primeiro contato, CSAT, tempo médio...)

### Caráter
- Tom de voz da marca: existe guia de estilo ou vocabulário proibido para seguir?
- Como o agente lida com cliente furioso ou que insulta? (mantém tom, escala, encerra?)
- Pode fazer promessas (desconto, prazo, solução)? Quais afirmações são proibidas por compliance?

### Mente
- Consulta base de conhecimento própria para responder? (se sim, padrão RAG — ver domínio RAG)
- Precisa conhecer o histórico de atendimentos anteriores do cliente?
- Domina scripts de vendas, objeções comuns, ou segue fluxo livre?

### Memória
- Lembra do cliente entre conversas? (nome, histórico de pedidos, reclamações anteriores)
- Onde fica essa memória? (CRM integrado, Supabase, só no contexto da sessão)

### Corpo
- Canal: WhatsApp, Telegram, chat do site, e-mail, outro?
- Limite de tamanho de resposta no canal? (WhatsApp tem restrições; Telegram também)
- Gatilho de escalação para humano: palavra-chave, sentimento negativo, tipo de pedido, tempo sem resolução?

### Consciência
- Afirmações proibidas por compliance: preço, diagnóstico médico/jurídico, promessa de resultado?
- **Modos de falha típicos do domínio (pré-preencher na pré-morte):**
  - Alucinar política / preço inexistente
  - Não escalar um caso grave a tempo (cliente em crise, ameaça, emergência)
  - Responder fora de tom ou de forma rude
  - Vazar dado de outro cliente (LGPD)
  - Loop sem resolução — cliente preso sem saída

### Sociedade
- Existe equipe humana de suporte para quem escalar? Com qual SLA?
- O agente é o primeiro ponto de contato ou há triagem humana antes dele?

---

## Dados (análise, ETL, BI, relatórios)
*Foco: fontes, permissões e formato de saída.*

### Alma
- O agente serve para decisão humana (relatório) ou executa automaticamente com base nos dados?
- Qual decisão de negócio este agente habilita? Quem a toma?

### Caráter
- Quando encontra dado suspeito ou inconsistente: aponta o problema e para, ou entrega com alerta, ou ignora?
- Nível de detalhe das explicações: só o número / número + contexto / análise completa?

### Mente
- Fontes de dados: banco relacional, data warehouse, planilha, API, arquivos?
- O agente lê apenas ou também escreve / transforma dados?
- Precisa de SQL analítico, Python, ou apenas lógica de negócio?
- Qual o domínio de negócio dos dados? (financeiro, marketing, operações, RH...)

### Memória
- Precisa lembrar de análises anteriores para comparar tendências?
- O estado de uma análise em andamento precisa sobreviver a uma interrupção?

### Corpo
- Periodicidade: sob demanda / agendado (diário, semanal) / em tempo real a eventos?
- Formato de saída: relatório em prosa / tabela / gráfico descrito / alerta / JSON para outro sistema?
- Validação obrigatória da saída antes de entregar? (ex.: checagem de totais, intervalo esperado)

### Consciência
- Pastas / tabelas / campos proibidos (dados sensíveis, LGPD, dados de outros clientes)?
- Limite de volume de dados por execução (custo, tempo, memória)?
- **Modos de falha típicos:**
  - Número errado entregue como certo (sem validação)
  - Ler ou expor dado sensível sem autorização
  - Query pesada derrubar ou lentificar a fonte de dados
  - Relatório silenciosamente vazio (sem alertar que não havia dados)
  - Quebra no meio do lote sem rollback

### Sociedade
- Quem consome o relatório? (executivo, analista, sistema automatizado)
- Existe outro agente ou sistema que consome a saída deste?

---

## Tráfego (mídia paga, campanhas)
*Foco: dinheiro. Guardrail de orçamento é o item mais crítico.*

### Alma
- Qual o objetivo central das campanhas? (lead, venda direta, tráfego qualificado, branding)
- Qual o volume de verba sob gestão? (referência para calibrar o risco dos guardrails)

### Caráter
- O agente recomenda e aguarda aprovação, ou executa diretamente nas plataformas?
- Como reporta: resumo executivo / dados brutos / análise + recomendação + ação?

### Mente
- Plataformas: Meta Ads, Google Ads, TikTok Ads, LinkedIn Ads, outro?
- Métricas-alvo: ROAS, CPA, CPL, CTR, impressões? Qual é o norte principal?
- Frameworks de otimização que o agente deve aplicar? (regras de escala, lances, segmentação)

### Memória
- Lembra do histórico de campanhas anteriores para embasar recomendações?
- Precisa manter estado entre ciclos de otimização (o que foi testado, o que pausou)?

### Corpo
- Cadência de análise e otimização: diária / semanal / em tempo real / sob demanda?
- Tem acesso direto à API da plataforma (executa) ou só lê relatórios exportados?
- Formato do report: dashboard descritivo / e-mail / mensagem no Slack / registro no CRM?

### Consciência
- Teto de orçamento por execução (gasto máximo sem aprovação humana): define o valor exato.
- Quem aprova mudança de verba acima do teto? Qual o canal de aprovação?
- Limites de alerta: ROAS abaixo de X, CPA acima de Y, campanha com 0 resultados em Z horas.
- **Modos de falha típicos:**
  - Estourar orçamento por erro de interpretação de métrica
  - Pausar campanha rentável / escalar campanha ruim
  - Agir sobre métrica de janela curta (ruído de 1h como se fosse tendência)
  - Mudar verba sem aprovação humana
  - Não detectar conta pausada ou bloqueada pela plataforma

### Sociedade
- Existe gestor de tráfego humano que supervisiona? Com qual frequência revisa?
- O agente alimenta outro agente de copy ou criativo com insights de performance?

---

## Copy (textos persuasivos)
*Foco: formato, público e compliance de claims.*

### Alma
- Objetivo do copy: gerar lead / fechar venda / nutrir / reativar / engajar?
- Canal de publicação: e-mail / anúncio / página de venda / VSL / post / WhatsApp?

### Caráter
- Tom da marca: autoridade técnica / empático e humano / urgente e direto / aspiracional?
- Existe guia de voz da marca? O agente o segue ou tem liberdade criativa?
- Como reage quando o briefing está incompleto: pede mais informação ou entrega com suposições sinalizadas?

### Mente
- Nível de consciência do público (Schwartz): unaware / problem-aware / solution-aware / product-aware / most-aware?
- Framework de persuasão preferido: AIDA, PAS, HSO, Story-Brand, outro?
- O agente cria do zero ou adapta variações de uma peça-mãe?
- Precisa conhecer o produto/serviço em profundidade? (onde busca esse conhecimento?)

### Memória
- Guarda o que foi aprovado vs. reprovado pelo cliente para aprender o estilo?
- Lembra de peças anteriores para evitar repetição de ângulos?

### Corpo
- Formato de entrega: documento / variações numeradas / direto no canal / JSON para automação?
- Extensão máxima por peça? (anúncio tem limite de caracteres; e-mail tem limite de atenção)
- Quantas variações por entrega?

### Consciência
- Claims proibidos: saúde ("cura", "emagrece X kg"), renda ("ganhe R$X"), garantias não autorizadas?
- Marcas, nomes ou comparações com concorrentes proibidos?
- **Modos de falha típicos:**
  - Claim ilegal ou abusivo que gera processo / ban na plataforma
  - Promessa que o produto não cumpre (devolução, processo)
  - Plágio acidental de copy de concorrente
  - Tom fora da marca (informal demais, formal demais, agressivo)
  - CTA ambíguo que mata a conversão

### Sociedade
- Quem revisa e aprova antes de publicar? (cliente, gestor de tráfego, jurídico)
- O agente trabalha com o gestor de tráfego para alinhar copy com performance?

---

## Automação (integrações, orquestração de fluxos)
*Foco: ações irreversíveis e tratamento de falha entre sistemas.*

### Alma
- Qual processo manual este agente substitui ou apoia?
- Qual o ganho esperado? (horas economizadas, erros eliminados, velocidade)

### Caráter
- O agente executa silenciosamente ou notifica a cada passo?
- Diante de ambiguidade no dado de entrada: para e pede confirmação, ou aplica regra de default?

### Mente
- Sistemas conectados: CRM, e-mail, planilhas, APIs REST, webhooks, banco de dados?
- Para cada sistema: lê, escreve, executa ação, ou os três?
- Precisa de lógica condicional complexa ou é fluxo linear?

### Memória
- Precisa rastrear estado do fluxo entre execuções? (ex.: "já enviei o e-mail X para o lead Y?")
- O que acontece se o agente for reiniciado no meio de um fluxo? (idempotência)

### Corpo
- Disparo: evento externo (webhook) / agendamento (cron) / manual / gatilho de outro agente?
- Existe callback ou confirmação de que a ação foi concluída nos sistemas externos?

### Consciência
- Ações irreversíveis que exigem confirmação humana antes de executar: (cada uma vira hook)
  Exemplos: enviar e-mail em massa, deletar registro, cobrar cartão, criar contato em CRM.
- Credenciais: onde ficam no Infisical? (listar caminhos)
- Retry policy: quantas tentativas antes de escalar? Intervalo entre tentativas?
- **Modos de falha típicos:**
  - Ação duplicada (evento processado 2x por retry sem idempotência)
  - Estado inconsistente entre sistemas após falha parcial (gravou em A mas não em B)
  - Credencial expirada silenciosa (fluxo falha sem alertar)
  - Webhook perdido ou processado fora de ordem
  - Loop infinito de gatilho (ação dispara evento que dispara a ação de novo)

### Sociedade
- Quem monitora se o fluxo está rodando corretamente? Com qual cadência?
- Existe agente downstream que consome a saída deste fluxo?

---

## RAG (respostas sobre base de conhecimento própria)
*Foco: fonte da verdade, comportamento sem resposta e atualização da base.*

### Alma
- Para quem é a base de conhecimento? (time interno, cliente final, parceiros)
- Qual é o escopo da base? (FAQs, documentação técnica, políticas, catálogo de produtos)

### Caráter
- Quando não há resposta na base: admite "não sei" e encaminha, ou tenta responder com conhecimento geral?
- Nível de certeza que precisa declarar: sempre cita a fonte / só cita se solicitado / nunca cita?

### Mente
- Fonte da base: documentos (PDF, Word), site, banco de dados, planilhas, tickets de suporte?
- O agente só consulta a base ou também pode responder com conhecimento geral como fallback?
- Precisa de busca semântica (vetorial) ou keyword search basta?

### Memória
- A base muda com frequência? Quem é o responsável por atualizar?
- O agente precisa lembrar de perguntas anteriores para melhorar a recuperação?

### Corpo
- Store vetorial: Supabase (pgvector) / Neon / outro?
- Estratégia de recuperação: top-k chunks / busca híbrida / reranking?
- Quantos documentos / chunks na base hoje? Previsão de crescimento?

### Consciência
- Pode o agente responder algo que não está na base? (risco de alucinação fora do domínio)
- Base desatualizada: o agente sabe a data da última atualização e alerta quando relevante?
- **Modos de falha típicos:**
  - Responder com confiança sem fonte (alucinação dentro da base)
  - Citar fonte errada ou trecho fora de contexto
  - Base desatualizada dando resposta obsoleta sem alertar
  - Não admitir "não sei" quando a informação realmente não está lá
  - Recuperar chunk irrelevante e construir resposta incoerente

### Sociedade
- Quem mantém a base atualizada? Existe processo de revisão periódica?
- O agente alimenta outro sistema com as perguntas mais frequentes para melhoria contínua?
