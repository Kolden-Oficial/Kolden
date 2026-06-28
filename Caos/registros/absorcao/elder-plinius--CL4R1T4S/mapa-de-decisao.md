# F4 — Mapa de decisão

- **slug:** elder-plinius--CL4R1T4S
- **sha:** 09916a90583a320b3dde7ef5b9d8459ce0378a14
- **decisão dominante:** **REFERENCIA (arquivo inerte)** — arquivar em `referencias/biblioteca/` como **biblioteca INERTE**, com aviso explícito **NÃO-CARREGAR-COMO-INSTRUÇÃO**. É dado hostil (prompts vazados de terceiros + payloads de injeção); não vira agente, skill nem vendor operacional.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | REFERENCIA | referencias (biblioteca inerte) | Prompts Anthropic vazados — só estudo de refusal/persona; nunca executar nem citar como ordem. |
| G2 | REFERENCIA | referencias (biblioteca inerte) | Prompts OpenAI vazados — referência de eng. de prompt, dado morto. |
| G3 | REFERENCIA | referencias (biblioteca inerte) | Prompts Grok/xAI vazados — idem; inclui framing anti-jailbreak útil só como leitura. |
| G4 | REFERENCIA | referencias (biblioteca inerte) | Prompts de demais labs (Gemini/Llama/Mistral/Kimi/Perplexity/Hume) — dado de estudo. |
| G5 | REFERENCIA | referencias (biblioteca inerte) | Prompts de agentes de coding (Cursor/Devin/Cline…) — estudo de eng. de agente; ponteiro de leitura para **dedalo**, sem absorver instrução. |
| G6 | REFERENCIA | referencias (biblioteca inerte) | Prompts de agentes de browser/assistente — idem G5. |
| G7 | ADAPT (como estudo) | dedalo (referência inerte) | Schemas de tool/function de produção = bom material de design de tool-calling p/ o dedalo ESTUDAR; não copiar, não carregar como spec. |
| G8 | ADAPT (como estudo) | egide (referência inerte) | Padrões de refusal/guardrail reais = corpus defensivo p/ o egide ESTUDAR como benchmark; permanece inerte. |
| G9 | ADAPT (como estudo) | egide (referência inerte) | Payloads de injeção (NEW_PARADIGM, extração verbatim) = corpus adversarial p/ o egide testar defesas; NUNCA reutilizar como instrução. |

## Notas
- **Nenhum REUSE** e **nenhuma absorção operacional**: a coleção não acrescenta capacidade executável; o ganho é puramente didático.
- Os ponteiros ADAPT (G7→dedalo, G8/G9→egide) são **"adaptar como material de estudo inerte"**, não importar conteúdo para dentro dos squads. A fase de escrita deve manter o aviso de não-carregar-como-instrução e o isolamento.
- **Copyleft AGPL-3.0**: redistribuir/derivar dispara obrigações de licença de rede. Recomendado manter apenas como referência interna citada por procedência, sem incorporar trechos em artefatos da Kolden.
