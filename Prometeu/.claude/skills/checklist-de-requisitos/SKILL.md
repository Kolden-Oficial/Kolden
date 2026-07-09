---
name: checklist-de-requisitos
description: Use para gerar um checklist que valida a QUALIDADE dos requisitos (completude, clareza, consistência, mensurabilidade, cobertura) — "testes unitários para o inglês/português" da spec, não testes do código. Acione quando a spec parece pronta mas você quer um gate de qualidade dos requisitos antes de planejar/implementar. Complementa o `checklist-runner` (que EXECUTA checklists): aqui é o GERADOR.
grounding_required: false
categoria_art_iv: MCP-nativo
squads_consumidores: [Prometeu-interno]
---

# Checklist de Requisitos ("testes unitários para o português")

**Conceito central:** um checklist de requisitos é um conjunto de **testes unitários para
a escrita da spec**. Ele valida se os requisitos estão bem escritos — completos, claros,
não-ambíguos, prontos para implementar — **não** se o código funciona.

Esta habilidade **gera** o checklist; a habilidade `checklist-runner` o **executa**. Juntas
formam o par gerador→executor que o Prometeu não tinha (só tinha o executor).

## A distinção que define tudo

❌ **ERRADO (testa implementação):**
- "Verificar que a landing exibe 3 cards de episódio"
- "Testar que os estados de hover funcionam no desktop"
- "Confirmar que o clique no logo navega para home"

✅ **CERTO (testa qualidade do requisito):**
- "O número e o layout dos episódios em destaque estão explicitamente especificados? [Completude]"
- "'Exibição proeminente' está quantificada com tamanho/posição específicos? [Clareza]"
- "Os requisitos de estado de hover são consistentes entre todos os elementos interativos? [Consistência]"
- "Há requisito de fallback definido para quando a imagem do logo falha ao carregar? [Edge Case]"

Metáfora: se a spec é código escrito em português, o checklist é sua suíte de testes
unitários. Você testa se os **requisitos** estão bem escritos — não se a implementação roda.

## Dimensões de qualidade (categorias do checklist)
- **Completude de requisitos** — todos os requisitos necessários estão documentados?
- **Clareza de requisitos** — são específicos e não-ambíguos?
- **Consistência de requisitos** — alinham sem conflito?
- **Qualidade dos critérios de aceite** — os critérios de sucesso são mensuráveis?
- **Cobertura de cenários** — todos os fluxos/casos endereçados?
- **Cobertura de edge cases** — condições de fronteira definidas?
- **Requisitos não-funcionais** — performance, segurança, acessibilidade especificados?
- **Dependências & premissas** — documentadas e validadas?
- **Ambiguidades & conflitos** — o que precisa de clarificação?

## Como escrever cada item

Formato-pergunta sobre a **qualidade do que está escrito** (ou ausente) na spec, com a
dimensão entre colchetes e referência de rastreabilidade:

```
- [ ] CHK001 - O número e o layout dos episódios em destaque estão especificados? [Completude, Spec §FR-001]
- [ ] CHK002 - "Carregamento rápido" está quantificado com limites de tempo? [Clareza, Spec §NFR-2]
- [ ] CHK003 - Há requisito definido para cenários de zero-estado (sem episódios)? [Cobertura, Edge Case]
```

- **Rastreabilidade**: ≥80% dos itens citam `[Spec §X.Y]` ou um marcador `[Gap]`, `[Ambiguidade]`, `[Conflito]`, `[Premissa]`, `[Dependência]`.
- **IDs** `CHK###` globais incrementais a partir de CHK001. Se o arquivo já existe, **anexe** continuando do último ID — nunca apague conteúdo.
- **Consolidação**: teto suave de ~40 itens candidatos; funda quase-duplicatas; se houver >5 edge cases de baixo impacto, vire um item agregador.

### Padrões obrigatórios vs. proibidos
✅ "Estão definidos/especificados os requisitos de X para o cenário Y?" · "O termo vago Z está quantificado?" · "Os requisitos entre §A e §B são consistentes?" · "O requisito W pode ser medido objetivamente?"

🚫 Qualquer item que comece com "Verificar/Testar/Confirmar" + comportamento · referências a execução de código, ação de usuário ou comportamento do sistema · "exibe corretamente", "funciona como esperado" · "clicar", "navegar", "renderizar", "carregar".

## Clarificação de intenção (antes de gerar)
Derive até **3** perguntas contextuais (não um catálogo pré-fabricado) só sobre o que muda
o conteúdo do checklist: tema/domínio (ux, api, segurança, performance), profundidade
(sanidade pré-commit vs. gate formal de release), audiência (autor vs. revisor de PR).
Se ≥2 classes de cenário (alternativo/exceção/recuperação/NFR) seguirem incertas, até 2
follow-ups (máx. 5 perguntas no total).

## Saída
Crie `checklists/<dominio>.md` (ex.: `ux.md`, `api.md`, `security.md`) — nome curto e
descritivo permite múltiplos checklists por feature. Reporte caminho completo, contagem de
itens e se criou novo arquivo ou anexou. O checklist gerado pode então ser rodado pela
habilidade `checklist-runner`.

---
*Fontes: github/spec-kit@b7e67f5 (`templates/commands/checklist.md`, `templates/checklist-template.md`) — licença MIT, Copyright GitHub, Inc. Princípio "unit tests for English" extraído e reescrito em PT-BR; sem cópia literal. Par gerador da habilidade `checklist-runner` (executor) já existente no Prometeu.*
