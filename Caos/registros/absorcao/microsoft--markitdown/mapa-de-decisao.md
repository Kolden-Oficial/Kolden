---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/microsoft--markitdown/inventario-de-capacidades|inventario-de-capacidades]]"
  - "[[Caos/registros/absorcao/microsoft--markitdown/seguranca|seguranca]]"
---

# Mapa de decisão (F4) — microsoft--markitdown

Contexto: ferramenta da Microsoft (vendor), não vira agente. Decisão global = **registrar como
vendor inerte + ledger**. Nenhum match item-a-item no registro de entidades
(`dados/registro-de-entidades.yaml` — único hit em "conversão" é CRO do squad Ariadne, sem relação).
Logo, todas as capacidades roteiam para `vendor`; quem *consome* a ferramenta são squads de
documentação/pesquisa quando precisarem ingerir arquivos para LLM.

| ID | decisao | squad-alvo | justificativa(1 linha) |
|---|---|---|---|
| G1 | CREATE | vendor | Núcleo do conversor arquivo→Markdown; entra como vendor inerte (sem equivalente registrado). |
| G2 | CREATE | vendor | CLI `markitdown`; ferramenta de linha de comando, não há equivalente. |
| G3 | CREATE | vendor | API Python; forma de consumo programático do mesmo vendor. |
| G4 | CREATE | vendor | Servidor MCP `convert_to_markdown(uri)`; candidato a tool MCP local — registrar como vendor/MCP, não absorver código. |
| G5 | CREATE | vendor | Conversores Office (DOCX/PPTX/XLSX); parte do vendor. |
| G6 | CREATE | vendor | Conversor PDF; parte do vendor (ver nota de sobreposição abaixo). |
| G7 | CREATE | vendor | Conversores web/markup (HTML/RSS/Wikipedia/Bing/EPub/IPYNB); parte do vendor. |
| G8 | CREATE | vendor | Conversores texto/dados (CSV/JSON/XML/TXT); parte do vendor. |
| G9 | CREATE | vendor | Imagem (EXIF+OCR/Vision); parte do vendor. |
| G10 | CREATE | vendor | Áudio (EXIF+transcrição); parte do vendor. |
| G11 | CREATE | vendor | YouTube→transcrição; parte do vendor. |
| G12 | CREATE | vendor | Outlook .msg + ZIP; parte do vendor. |
| G13 | CREATE | vendor | Backend Azure Document Intelligence; opcional/cloud do mesmo vendor. |
| G14 | CREATE | vendor | Backend Azure Content Understanding (multimodal); opcional/cloud do mesmo vendor. |
| G15 | CREATE | vendor | Sistema de plugins + plugin OCR; extensibilidade do vendor. |

## Nota — sobreposição com o pipeline de conversão da Kolden
- **Direção oposta, sem conflito.** O pipeline existente da Kolden (`reference_md_para_pdf_windows.md`)
  é **MD → PDF** (Node+marked → HTML → Chrome headless), voltado a *saída* para humano. O markitdown
  é **arquivos (PDF/Office/imagem/áudio/…) → Markdown**, voltado a *entrada* para LLM. São
  complementares: markitdown preenche a lacuna de ingestão que hoje a Kolden não tem.
- O MCP `google-drive` já oferece `convertPdfToGoogleDoc`/`bulkConvertFolderPdfs` (PDF→Google Doc) —
  destino e dependência de nuvem diferentes; markitdown cobre offline e muitos formatos além de PDF.
- **Recomendação:** registrar como vendor inerte no ledger; se for promovido a uso ativo, o caminho
  natural é o **MCP `markitdown-mcp`** (G4) local (STDIO, bind localhost) — alinhado à soberania de dados.
