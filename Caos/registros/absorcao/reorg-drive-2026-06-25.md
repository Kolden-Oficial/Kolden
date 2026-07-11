---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/LEIA-ME-drive|LEIA-ME-drive]]"
---

# Reorganização do Drive Compartilhado da Kolden — Log de Execução

> Data: 2026-06-25 · Operador: agente (MCP Google Drive, OAuth) · Drive: KOLDEN (`0AFk2wbfbKBIMUk9PVA`)
> Escopo aprovado: **Blocos A, C, D** (somente `moveItem`). **PROIBIDO** excluir/renomear (Blocos B e E NÃO aprovados).
> Protocolo: nenhum delete/rename; fileIds resolvidos a partir dos inventários (`drive--02-comercial`, `drive--06-templates-e-ferramentas`, `drive--03-clientes`) e re-confirmados por `listFolder` antes de mover; ambiguidade = PULAR e reportar.

---

## Resumo

| Bloco | Moves OK | Pulados/Reportados |
|---|---|---|
| A | 22 | proposta-comercial cliente-específica deixada no lugar (fora do escopo explícito) |
| C | 3 | C1 (já em Inteligência Interna, no-op); C4 Meet Recordings (não identificáveis, skip) |
| D | 2 | D2 (já correto, no-op); D3 (duplicatas — exige merge/delete não aprovado, skip) |
| **Total** | **27** | — |

---

## BLOCO A — Migrar acervo comercial-ouro: 06 → subpastas oficiais de "02 | Comercial"

Formato: origem (06) → destino | nome | fileId | status

### 01 | Leads (`1H0hIQslb5qwe3zh6axms5HhPCRr11zpq`)
- 06 raiz → 01 Leads | [K] Central de Oportunidades | `1fMdbK-LYy8kmwSQ7eDxDMD1cMUnB0uhAbFqvjBTzLs8` | OK

### 02 | Prospecção & Outreach (`1gk0VcJLBfs-TOV8fYW6KDXypgIRiD9Tg`)
- 06 raiz → 02 Prospecção | PROSPECÇÃO ATIVA (pasta inteira: ICP/Cold Call/Cold Mail/Cadência) | `15o_LGrlauQmkq8LG-FyLszlWyv9ylToR` | OK
- 06/1-Prospecção Fria/2.Script → 02 Prospecção | [KOLDEN] Script de PROSPECÇÃO para Clínicas de Estética (Sheet) | `1lDX3HzirAcLmLpfbmdLBq3LAydvJOCehnM9HsqccjV0` | OK
- 06/1-Prospecção Fria/2.Script → 02 Prospecção | Script de PROSPECÇÃO para Clínicas de Estética (Doc) | `1FbpaNNeRbQ9hNz5IMKDB7E3f2tndoyN4cx--ZrlxVQU` | OK

### 03 | Apresentações & Pitches (`1xdSXsYiZ934AL3MPpgpaK3DVUdGPlIoh`)
- 06 raiz → 03 | Modelo Proposta Comercial - Kolden | `1aIejRsZ72bz6EHcP4iLwgEawz0D9Gcn_48FwSxCGVuk` | OK
- 06 raiz → 03 | Serviços que prestamos | `12IMSyDq6UrccLkMl0beUuEwiUz7pp3JznrFyyGlXooQ` | OK
- 06/Novos Produtos/Negócio Local → 03 | QUESTIONÁRIO DE NEGÓCIO & PERFORMANCE (360°) [QNP 360°] | `1VMTilEhlBZ6nsOgYijSszVcHNFIl2l8Dz3MdFqqBs1k` | OK
- 06 raiz → 03 | Kick-Off - QNP | `1gOgNHbMF0O7dQb989AghqgqJ38NrLSBYPMLCfyCrq5w` | OK
- 06 raiz → 03 | Kick-Off - QNP (Original) | `1yCis9ZnU_2xhdfYiPIwSWrNWKGUDbmAbLS1m45bOd9k` | OK
- 06/1.Consultoria/Sessão Estratégica → 03 | Apresentação Sessão Estratégica.pdf | `1A5Cx10WVNcJeisrCN2yboBqGRuas7y-V` | OK
- 06/1.Consultoria/Sessão Estratégica → 03 | Script Sessão Estratégica.pdf | `1A-jZWjyNa-B5GNbgjuLctT6XjYMHQt37` | OK
- 06/2.Apresentação → 03 | [KOLDEN] Sessão Estratégica.pdf | `12hDgxbSI9HBQOAaeKa0kgxWWbsDilDGc` | OK
- 06/2.Apresentação → 03 | Apresentação Sessão Estratégica.pdf | `19pza1_tLnyXvp2vjIJgvu5f0-JJD698j` | OK

### 04 | Propostas (`1MwcylrVSoKshBbhUegfee92AkmDncmVk`)
- 06/1.Consultoria/Proposta Comercial → 04 | Copy Proposta Comercial.docx | `1A9ehlUTsQZxtQEMTbkjvs1FgGf4CFsZ7` | OK
- 06 raiz → 04 | Cópia de Modelo Proposta Comercial - Victor&Co (modelo) | `1pZiq4j7q8XFgO6ym2k-94SZuerYA8VNua8NHnbSaEKY` | OK

### 05 | Contratos Comerciais (`1fRPAg8ycoYmxxEjQ8FG3KhGo38BBqpAo`)
- 06/Contrato → 05 | Contrato Tristar - Modelo Rev 00.docx | `1kVcFRiK8Ok5iq-PAUMjWXsmgWvdrbrxk` | OK

### 06 | Pós-venda & CS (`1bcnHfiTz8tGMrzS_3xi1RZ3BMXHLu3Bj`)
- 06 raiz → 06 Pós-venda | Debriefing (pasta inteira: 3 templates) | `1-JiEEaKNAlPqOtJ5Qq7iU_PQBfIVzBTs` | OK
- 06 raiz → 06 Pós-venda | Central de Daily - Kolden | `1vQTDbW9Jvf4Wg5CAmLV5MuoBHzQKNQkq-kqfdsi2gys` | OK

### 07 | Métricas & Performance (`1fnIeAq2dbo44UrZcSV792d25TSaT0Kcy`)
- 06/Calculadoras & Planilhas → 07 | Projeção Funil de Vendas_.xlsx | `16hdjSEBgyHBHRcF3uKOELrNZizBjOX7b` | OK
- 06/Calculadoras & Planilhas → 07 | Projeção Funil de Vendas (Sheet) | `1QlVlA0yP_6pwWh5RycsSBys92a1IozhNMircVvglfMA` | OK
- 06 raiz → 07 | Calculadora de Ganhos - Kolden | `1c9Baehfc4p__zFVQw_6r-BdkQb1fmxSawxuXNtdeTto` | OK
- 06 raiz → 07 | [COMPANY] Planilha Suprema | `1V2Bn2XK8gc082l7y1Dum2VVYceDrJobu3sdfCLfMY3M` | OK

**Bloco A: 22 moves OK.**

### Decisão registrada (Bloco A)
- Propostas cliente-específicas que permaneceram na 06 (NÃO movidas — não constam na lista explícita do Bloco A; são deals de cliente, não modelos): Proposta Comercial Flaviana (`1BvobeFPHKYPNeOjfABqw0AJMxLJZHz8Pl_dxw-JnVTM`), Proposta Comercial - Insulation Co. (`1AIZVV3w_UvG1iW0g-DFw1pKav_qCPxvqJ4UtwdfVps4`), Proposta Comercial e Precificação - Insulation (`1qk_GyV0b2R7G1rPLprqwm4ctEFK1Dllrca2hTj2O5s0`), Proposta de Consultoria CRM - Kommo (`1FvxspGLjKYX-IJ1Ihw2fhy8yNIXp8pZVx_te1owqGX8`) + Backup (`1UGrhH-PIcGF0Pvs3XWcsgbdfWfaxSjGF4MVFn9gQNTM`), Plano de Crescimento Kaylon (`1eq4z2sI6M3kWBK7otxMBB3dOiF7gA4sZN0D3u9jliDE`), Proposta de Parceria Kolden: O Squad (`1Z1gAAE6kh40anDoUDROAXxiHCFZv6PNDy9HEGvT-ajE`). Recomenda-se decisão explícita do Ronan se devem ir para 04 | Propostas/Propostas Enviadas|Perdidas.

### Confirmação de re-listagem (Bloco A) — todos os itens chegaram
- 01 Leads: contém [K] Central de Oportunidades ✓
- 02 Prospecção: contém PROSPECÇÃO ATIVA (pasta) + 2 scripts Clínicas ✓
- 03 Apresentações: contém Modelo Proposta, Serviços que prestamos, QNP 360°, Kick-Off QNP x2, 4 Sessão Estratégica ✓
- 04 Propostas: contém Copy Proposta Comercial + Cópia Modelo Victor&Co ✓
- 05 Contratos: contém Contrato Tristar - Modelo ✓
- 06 Pós-venda: contém Debriefing (pasta) + Central de Daily ✓
- 07 Métricas: contém Planilha Suprema, Calculadora de Ganhos, Projeção Funil x2 ✓

---

## BLOCO C — Reclassificar não-comercial

### C1 — BLACK BOOK / OKR / metodologias → 06/Inteligência Interna
**NO-OP (nada a mover).** Verificado: BLACK BOOK Conrado Adolpho, Guia/Resumo OKR, Metodologia para Cursos JÁ residem dentro de `06/Inteligência Interna` (`1H6jTPKsHHtaILyi6uxC_taQqKA91zW1g`). Não estão soltos na raiz da 06. Conforme proposta ("mover p/ lá se estiverem soltos"), nenhuma ação necessária.

### C2 — Recrutamento (templates) → 04 | RH & Cultura/02 | Recrutamento & Seleção (`1aUNP7adJ_3Z2u-hF2XJ19_FcahlwLT-t`)
- 06/01 Recrutamento → RH/02 Recrutamento | (BASE) FICHA DO COLABORADOR.xlsx | `1Oux8NEa9E-TdlEdKznR98ofcuOQolD3T` | OK
- 06/01 Recrutamento → RH/02 Recrutamento | [LinkedIn] Perfil Otimizado Izabelle Ingrid | `1mkv1yUwySD1ipmGwznQjA5VFs6fL8YY4U4Z-78UfeLA` | OK

### C3 — Contrato colaborador PJ → 00 | Gestão Empresarial/01 | Jurídico/02 | Contratos (`15RrEab9LQp8c7pjlYvv27kAKTfFTTv9M`)
- 06/Contrato → Jurídico/02 Contratos | Template \| Contrato de colaborador PJ.docx | `1qGpSOSfSf3wN4-K0qr20AeZKkQPHv06L` | OK

### C4 — Meet Recordings (cliente) → pasta do cliente em 03 Clientes
**PULADO (skip) — reportado.** A pasta `06/Meet Recordings` (`1TeUO8x4Creemnn5FNtFGdqqLkSCIMAI8`) tem ~90 arquivos; a **grande maioria** são gravações com codinome auto-gerado do Google Meet (ex.: `biw-zqod-bjr`, `grg-tsse-txr`, `Reunião iniciada às ...`) — **não identificáveis** a um cliente. Pelo protocolo ("se não identificar o cliente, NÃO mova — reporte"), nenhuma foi movida. Um subconjunto é identificável (Margherita, Kaylon, SuperBenefícios, Vettory, NutriCalc), mas (a) parte desses clientes não tem pasta dedicada em 03 Clientes (Kaylon, Vettory), e (b) o subpasta-destino dentro do cliente é ambíguo. **Recomendação:** tratar Meet Recordings como tarefa dedicada e explicitamente escopada (mapa codinome→cliente fornecido pelo Ronon), fora deste lote.

**Bloco C: 3 moves OK; C1 no-op; C4 skip.**

### Confirmação de re-listagem (Bloco C)
- 04/RH/02 Recrutamento: contém (BASE) FICHA DO COLABORADOR + [LinkedIn] Perfil Izabelle ✓
- Jurídico/02 Contratos: contém Template Contrato colaborador PJ ✓

---

## BLOCO D — Consolidar dispersões em Clientes

### D1 — Consolidar Pizzaria Margherita → pasta Margherita (`1Gz1721bJK34ZWs-PjvgQf4oAHqJLL6k0`, em Inativos/01 Assessoria)
- Inativos raiz → Margherita | Análise Estratégica Pizzaria Margherita | `1pPzxHRMcnhYcA8ngZSTpnoxR36UBzLqSFupkBKigN1g` | OK
- Inativos raiz → Margherita | Contexto Estratégico - Pizzaria Margherita | `1ME0VN_vEZRpuOSaL1zfJfxS0MTi3iPKO6Q1PxfBBzOM` | OK

**Observação:** a proposta citava "pasta aninhada em Marco Daniel" como 3º local de Margherita. Verificado: `Marco Daniel` (`1shiQQT-4XEstZ2VpJEjChbcj5tHW2eBJ`) contém apenas "[MARCO] Plano e Calendário de Conteúdo" — **sem pasta Margherita**. A pasta Margherita-alvo já contém uma subpasta "Margherita" (`1qwTqa9CIa0fNGBr-2UVzl2Az_ADPJp6T`) + um contrato Docusign; deixada como está (sem instrução de achatar essa interna). Os 2 docs soltos foram consolidados com sucesso.

### D2 — Check-ins cruzados (Revolution Pro ↔ Brayan's Finish)
**NO-OP (já correto).** Busca global por "CHECK-IN" no Drive: o "2° CHECK-IN - Revolution PRO.pptx" (`1qiOt2XJapqrILAzIggdnPDn2oK-K1AGf`) **já reside corretamente** em `03 Clientes/01 Ativos/01 Assessoria/03 | Revolution Pro/00 Geral/Check-ins/Apresentações`. Nenhum check-in do Revolution foi encontrado dentro da pasta do Brayan's, nem check-in do Brayan's dentro do Revolution. O cruzamento descrito na proposta **já estava resolvido**. Nada a mover.

### D3 — Achatar pasta aninhada "02 | Inativos" dentro de Inativos
**PULADO (skip) — reportado por ambiguidade/risco.** A pasta aninhada `02 | Inativos` (`14QCk1X9__b5dzWEVT-7YQfgkiBU0wj4h`, dentro do root Inativos `1rT5t9iUILwgbQz0XAbfTtmwr14xhy0-n`) contém 3 pastas:
- Dr. Leandro Rubim — `1D2NbKK01wVDgieMrZccqXSsDPTuuPHc4`
- Elaine Custodio — `1t5YOMkaW9xPKe3b7NuOVpLBuZ_bMdUdx`
- Marco Aurélio Limeres bradileiro — `1sHt5zX1ofgUbvXymi7MhucROiLQRu88p`

**Conflito detectado:** "01 | Assessoria" (`1qEYMd8AutDW0_fh8jcOR94Zxch6cQfVT`) **já possui** pastas homônimas com fileIds DIFERENTES — Dr. Leandro Rubim (`1bY8UVEO77SKG1JEaLWCXZ-7wqEuYLf3d`) e Marco Aurélio (`1kGvuNTg9m9SEek4DKw4GEYF9L_P47iKd`). Ou seja, **duplicatas** de 2 dos 3 clientes. Achatar/subir um nível criaria colisão de pastas homônimas e a resolução exigiria **merge + exclusão** da pasta aninhada — operações dos Blocos B/E, **NÃO aprovadas**. Elaine Custodio não tem duplicata, mas o destino de "subir um nível" (root Inativos vs 01 Assessoria) é ambíguo.

**Recomendação:** decisão humana — para cada um dos 3, definir se a versão correta é a do aninhamento ou a de 01 Assessoria (merge), e então autorizar exclusão do husk vazio (Bloco E). Sem isso, mover às cegas só espalha a duplicação.

**Bloco D: 2 moves OK; D2 no-op; D3 skip.**

### Confirmação de re-listagem (Bloco D)
- Margherita (`1Gz1721bJK34ZWs-PjvgQf4oAHqJLL6k0`): contém Análise Estratégica + Contexto Estratégico + contrato Docusign + subpasta Margherita ✓ (os 2 docs chegaram)

---

## Itens NÃO tocados (conforme escopo)
- **Bloco B** (deduplicar "Estrutura de Pastas" `1vYMT-pkdwLVv2A0SQslGXD5lDZwRcB8Z`) — NÃO aprovado; intocado.
- **Bloco E** (limpeza de pastas vazias na 06: Públicos & Audiências, Scripts & POPs, Templates Make) — NÃO aprovado; intocado.
- Nenhum item foi excluído ou renomeado em nenhum momento.

## Total geral: 27 moves OK · 0 erros · 0 exclusões/renomeações.
