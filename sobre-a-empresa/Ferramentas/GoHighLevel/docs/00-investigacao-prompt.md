# Investigação Técnica: GoHighLevel via API REST + MCP

## 🎯 Contexto e Objetivo

Sou dono de uma agência de marketing com conta no GoHighLevel (GHL).
Já configurei custom objects (Projects e Jobs) com campos personalizados via
interface, mas quero automatizar a criação massiva e manutenção desses
registros via Claude Code no terminal.

**Objetivo final:** ter scripts em TypeScript/Node.js que me permitam executar
operações em lote no GHL, com segurança e idempotência.

## 📋 Pré-requisitos já configurados
- Node.js v18+ instalado
- Projeto TypeScript inicializado
- Dependências: axios, dotenv, tsx
- API Key do GHL armazenada em .env (variável GHL_API_KEY)
- Location ID em .env (variável GHL_LOCATION_ID)

## 🔍 Operações que preciso validar (em ordem de prioridade)

### Schema (estrutura do CRM)
1. Criar **campos personalizados** novos em custom objects (Projects, Jobs)
2. Editar/atualizar campos personalizados existentes
3. Criar **pastas (folders)** dentro de objetos para organizar campos
4. Adicionar/remover opções em campos do tipo lista suspensa
5. Listar todos os campos personalizados de um objeto
6. Criar **custom objects** novos

### Dados (registros)
7. Criar registros de **Projects** com todos os campos preenchidos
8. Criar registros de **Jobs** com todos os campos preenchidos
9. Criar **subtasks/tarefas** dentro de um Job (a aba "Tarefas" do GHL)
10. Vincular Jobs a **Contacts, Companies e Projects** (objetos relacionados)
11. Listar registros de Projects/Jobs com filtros
12. Atualizar registros em massa

### Operações de apoio
13. Criar **Contacts** com tags
14. Criar **Companies** (objeto Business)
15. Listar pipelines e estágios
16. Criar registros no **Mídia Drive** (pastas, upload)

## 📝 O que você deve fazer (passo a passo)

### Etapa 1: Investigação
Pesquise a documentação oficial atualizada do GHL:
- **API REST v2:** https://highlevel.stoplight.io/docs/integrations/
- **Marketplace:** https://marketplace.gohighlevel.com/
- **MCP oficial:** investigar se existe documentação sobre o servidor em
  `https://services.leadconnectorhq.com/mcp`

Para cada uma das 16 operações acima, descubra:
- Se é possível via API REST (e qual endpoint)
- Se é possível via MCP oficial (se conhecido)
- Quais scopes/permissões são necessários
- Rate limits e quotas
- Limitações conhecidas (campos read-only, restrições por plano)

### Etapa 2: Documentação no projeto
Crie os seguintes arquivos no projeto:

**`docs/01-relatorio-investigacao.md`** — relatório completo contendo:
- Veredito executivo (3 parágrafos)
- Tabela das 16 operações com status
- Recomendação de estratégia (API REST, MCP ou híbrida)
- Lista de bloqueadores
- Próximos passos sugeridos

**`docs/02-endpoints-mapeados.md`** — referência técnica contendo:
- Cada endpoint relevante
- Método HTTP, parâmetros, exemplo de body
- Resposta esperada
- Códigos de erro comuns

**`docs/03-rate-limits-e-limitacoes.md`** — restrições conhecidas

### Etapa 3: Código mínimo viável
Crie em `src/`:

**`src/ghl-client.ts`** — cliente HTTP base reutilizável com:
- Configuração de headers (Authorization Bearer, Version: 2021-07-28)
- Retry automático com backoff exponencial
- Tratamento de erros (401, 403, 429, 500)
- Logging básico

**`src/scripts/list-custom-fields.ts`** — lista campos personalizados de
Projects e Jobs (operação de leitura, mais segura para testar)

**`src/scripts/create-custom-field.ts`** — exemplo funcional de criar um
campo personalizado (com flag --dry-run por padrão)

**`src/scripts/create-project-with-jobs.ts`** — exemplo de criar 1 Project
+ 4 Jobs vinculados, com subtasks (toda a estrutura do Setup Comercial)

### Etapa 4: Validação segura
- Adicione flag `--dry-run` em **todos** os scripts que criam dados
- Por padrão, dry-run deve estar **LIGADO**
- Só executa criação real se rodar com `--execute` explícito
- Faça primeiro teste com `list-custom-fields.ts` (apenas leitura)

## 🚨 Regras importantes

1. **Nunca exponha a API key**: sempre via .env, nunca hardcoded
2. **Nunca commitar .env**: já está no .gitignore, mas valide
3. **Idempotência**: scripts de criação devem checar se item já existe antes
   (não duplicar)
4. **Logging**: cada operação deve logar entrada, saída e tempo de execução
5. **Não invente endpoints**: se não encontrar na doc oficial, sinalize
   explicitamente "não documentado / não encontrado"
6. **Cite as fontes**: cada afirmação técnica deve citar a URL da doc oficial
7. **Verifique a versão da API**: GHL tem v1 (legacy) e v2 (atual) — use v2

## 📊 Critérios de sucesso

Ao final, eu devo conseguir:
- [ ] Entender exatamente o que dá pra fazer programaticamente
- [ ] Saber se vou usar API REST, MCP ou ambos
- [ ] Ter um script funcional que LÊ campos personalizados
- [ ] Ter um script funcional que CRIA 1 Project com Jobs e subtasks
- [ ] Ter documentação clara dos limites e cuidados
- [ ] Saber o próximo passo para escalar pra criação em massa