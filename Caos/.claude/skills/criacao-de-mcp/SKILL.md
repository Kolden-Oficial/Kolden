---
name: criacao-de-mcp
description: Cria servidores MCP / APIs PRÓPRIOS para os agentes do Kolden — quando o PRD pede uma integração que ainda não existe e precisa ser construída (não apenas consumir um MCP existente). Use na Fase 5.4 do Ritual, após orquestrador, especialistas e habilidades já criados. Delega a construção técnica à skill mcp-builder do Prometeu e aplica a camada Kolden obrigatória (Infisical, registro, pt-BR, checklist N4).
---

# Criação de MCP / API próprio

## Quando usar
Use **somente** quando a Seção 5 do PRD lista um MCP/API **a construir** — uma integração
própria do Kolden que ainda não existe. Se o agente apenas **consome** um MCP que já está no
catálogo (`sobre-a-empresa/Ferramentas/`), isto NÃO se aplica: documente em `ferramentas.md` e siga.

Posição no Ritual: **Fase 5.4**, depois do orquestrador (5.1), dos especialistas (5.2) e das
habilidades por especialista (5.3). Um MCP serve o agente inteiro — nasce depois das peças que o usam.

## Passo 1 — Consulta ao registro (Constituição, Art. VI)
Antes de construir, aplique **REUSE > ADAPT > CREATE**:
- Acione a habilidade `consulta-ao-registro` filtrando `tipo: mcp` e por keywords da integração.
- Existe MCP equivalente (`relevancia ≥ 0.90`)? **REUSE** — só documente o consumo.
- Existe parecido e adaptável (`0.60–0.89`, `adaptabilidade.score ≥ 0.6`)? **ADAPT**.
- Sem correspondência? **CREATE** — siga para o Passo 2 e registre na Fase 8 com justificativa.

Cheque também o catálogo `sobre-a-empresa/Ferramentas/mcp-status.md`: a integração já pode ter um MCP de terceiro
pronto para conectar — conectar é sempre mais barato que construir.

## Passo 2 — Construção técnica (delegar ao mcp-builder)
A construção técnica do servidor é responsabilidade da skill **`mcp-builder`** do Prometeu —
madura, com FastMCP (Python) / MCP SDK (Node/TS), harness de avaliação e material de referência.
**Não duplicar a lógica dela.** Referencie por caminho e siga as 4 fases dela:

```
Prometeu/.claude/skills/mcp-builder/SKILL.md
```

Decisão de stack (herdada do mcp-builder): Python (FastMCP) como padrão; Node/TS quando o
ecossistema da API exigir. Princípios obrigatórios do mcp-builder a respeitar:
- **Tools de fluxo, não 1:1 de endpoint** — consolide operações relacionadas numa única tool.
- **Otimize para contexto** — respostas `concise` vs `detailed`; identificadores legíveis.
- **Erros acionáveis** — a mensagem diz ao agente o que fazer a seguir.

## Passo 3 — Camada Kolden (obrigatória — não vem do mcp-builder)
O mcp-builder não conhece a Constituição do Kolden. Aplique por cima:

1. **Infisical (Art. VII).** Toda credencial do MCP vem do Infisical via habilidade
   `infisical-padrao`, no caminho `/kolden/<ambiente>/<NOME_DA_CHAVE>`. **Nunca** em texto puro,
   nem em `.env` versionado, nem hardcoded no servidor. A primeira entrada do `ferramentas.md` do
   agente continua sendo o Infisical; o MCP novo entra logo abaixo.
2. **Registro (Art. VI).** Registre o MCP como entidade `tipo: mcp` em
   `dados/registro-de-entidades.yaml` na Fase 8 (via `registro-de-entidade`), com `dependencias`
   incluindo `mcp-builder` e keywords ricas da integração.
3. **pt-BR (Art. II).** Descrições das tools, parâmetros e mensagens de erro em português do
   Brasil. Nomes técnicos do protocolo (campos do schema MCP) permanecem como a convenção exige.
4. **Catálogo de ferramentas.** Adicione o MCP ao `sobre-a-empresa/Ferramentas/<Nome>/ferramentas.md` e à linha
   correspondente de `sobre-a-empresa/Ferramentas/ferramentas.md` + `sobre-a-empresa/Ferramentas/mcp-status.md` (padrão da casa).

## Passo 4 — Checklist de qualidade do MCP (cascata N4)
Antes de declarar pronto, valide (estes itens são B no nível N4 do `checklist-de-qualidade.md`):
- [ ] Tools modelam **fluxos de trabalho**, não endpoints crus (1:1 é antipadrão).
- [ ] Cada tool tem resposta `concise` e `detailed` quando o volume justifica.
- [ ] Mensagens de erro são **acionáveis** (dizem o próximo passo), em pt-BR.
- [ ] `annotations` corretas: `readOnlyHint` / `destructiveHint` / `idempotentHint` por tool.
- [ ] Respostas respeitam orçamento de contexto (sem despejo exaustivo de dados).
- [ ] Credenciais 100% via Infisical; zero segredo no código ou em arquivo versionado.
- [ ] **Eval com ~10 perguntas/tarefas reais** (harness do mcp-builder) passando.
- [ ] Entidade registrada `tipo: mcp` com `dependencias: [mcp-builder]`.

## Erros que invalidam um MCP
- Empacotar a API endpoint-a-endpoint sem pensar no fluxo do agente.
- Qualquer credencial fora do Infisical.
- Tool sem `annotations` de segurança (o agente não sabe o que é destrutivo).
- Construir do zero algo que já existia no catálogo (violou REUSE).
- Não rodar o eval — MCP sem avaliação não tem prova de que funciona para o agente.

## Após criar
1. Atualize o `catalogo.md` deste diretório de habilidades (se for habilidade do agente) e
   garanta que a Fase 8 registre a entidade `tipo: mcp`.
2. Aponte o `ferramentas.md` do agente para o MCP recém-criado, na seção "MCPs próprios".
