# Manifesto de Importação — xquads-squads + aiox-core

Rastreia o progresso da importação/tradução. Sobrevive entre sessões.

## Procedência
- **xquads-squads** — `ohmyjahh/xquads-squads` @ `dcb32f35bfeab23913233c8aafe5ee5e7fd2f149`
- **aiox-core** — `SynkraAI/aiox-core` @ `77265d53966193958c0d370475bc2df041760d99`
- Clonados em `C:\Kolden\.claude\_staging\` em 2026-06-18.

## Mapa squad → pasta grega
| Origem | Pasta Kolden | md/yaml | Status clone | Status tradução |
|---|---|---|---|---|
| traffic-masters | **Peitho** (merge) | 35 | ✅ | ✅ traduzido |
| copy-squad + copy-master | **Caliope** | 105 | ✅ | ✅ traduzido |
| brand-squad | **Aglaia** | 32 | ✅ | ✅ traduzido |
| design-squad | **Harmonia** | 24 | ✅ | ✅ traduzido |
| storytelling | **Orfeu** | 28 | ✅ | ✅ traduzido |
| c-level-squad | **Olimpo** | 21 | ✅ | ✅ traduzido |
| advisory-board | **Themis** | 26 | ✅ | ✅ traduzido |
| data-squad | **Metis** | 22 | ✅ | ✅ traduzido |
| hormozi-squad | **Pluto** | 34 | ✅ | ✅ traduzido |
| movement | **Dionisio** | 21 | ✅ | ✅ traduzido |
| cybersecurity | **Egide** | 32 | ✅ | ✅ traduzido |
| claude-code-mastery (dedup) | **Dedalo** | 59 | ✅ | ✅ traduzido (dedup aiox feito) |
| aiox-core (framework) | **Prometeu** | 1374 | ✅ | ✅ traduzido (2026-06-20): agentes+skills+commands+rules+tasks(~218)+templates+data+checklists+workflows(yaml)+docs/en; removidos docs/es+zh e espelhos IDE |

### Estado consolidado (2026-06-20)
- **12 squads de marketing/estratégia: 100% traduzidos e normalizados** (rótulos PT-BR padronizados, acentuação verificada).
- **Prometeu (engenharia): tradução profunda CONCLUÍDA (2026-06-20).** ~218 tasks, templates, data,
  checklists, workflows(yaml) e docs/en traduzidos via fan-out de tradutores + verificação por grep.
  Removidos `docs/es` (135) + `docs/zh` (124) e os espelhos de IDE (`.codex/.gemini/.kimi/.antigravity`).
  Fora de escopo (baixa prioridade): docs raiz em inglês e scripts JS.
- Normalização global de rótulos estruturais (AVISO-DE-ATIVAÇÃO / DEFINIÇÃO COMPLETA DO AGENTE / Como X Pensa) aplicada a todos os squads xquads.
- **`_staging/` pode ser limpo** assim que a dívida de Ritual/PRD por squad for endereçada (clones originais já não são necessários para a tradução).

## Regras de tradução
- Traduzir prosa/instruções/descrições/comentários/frontmatter de função para PT-BR.
- Preservar: nomes próprios dos especialistas, frameworks, IDs técnicos, chaves YAML estruturais, comandos slash.
- Frases-assinatura icônicas → PT-BR com original entre parênteses.
- Tradução fiel 1:1, sem resumir/cortar.
- Cada squad recebe README.md (PT-BR claro) + _origem.md (procedência).

## Próximas fases (pós-tradução)
- Fase 3: índice mestre em `C:\Kolden\AGENTS.md` (seção Squads).
- Fase 4: Ferramentas & MCPs (extrair, cross-check, adicionar faltantes).
- Fase 5: Integração Hermes (guia + Peitho cron/WhatsApp).
- Fase 6: Registro em `Caos\dados\registro-de-entidades.yaml` (status `importado-cru`).
- Limpar `C:\Kolden\.claude\_staging\`.
