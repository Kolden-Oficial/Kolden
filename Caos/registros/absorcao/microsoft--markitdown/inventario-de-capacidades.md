---
tipo: registro
area: Caos
up: "[[Caos/_MOC-caos]]"
relacionado:
  - "[[Caos/registros/absorcao/microsoft--markitdown/mapa-de-decisao|mapa-de-decisao]]"
  - "[[Caos/registros/absorcao/microsoft--markitdown/seguranca|seguranca]]"
---

# Inventário de capacidades (F3) — microsoft--markitdown

Rota B (vendor). Inventário enxuto: a capacidade-núcleo é converter arquivos diversos
para Markdown legível por LLM. Granularidade = superfície de uso (CLI/API/MCP) + famílias de formato.

| ID | capacidade | tipo | keywords | dominio | fonte(arquivo:linha) |
|---|---|---|---|---|---|
| G1 | Núcleo `MarkItDown` — converte arquivo/stream/URI para Markdown estruturado (headings, listas, tabelas, links) | ferramenta | markdown, conversão, llm, extração-texto | conversão-documentos | packages/markitdown/src/markitdown/_markitdown.py |
| G2 | CLI `markitdown` (stdin/arquivo → stdout/`-o`; flags `-x/-m/-c`, plugins, docintel, content-understanding) | ferramenta | cli, terminal, pipe, conversão | conversão-documentos | packages/markitdown/src/markitdown/__main__.py:14-142 |
| G3 | API Python (`md.convert(...)`, `convert_local/_stream/_response`; opções `llm_client`/`llm_model` p/ descrição de imagem) | ferramenta | python, api, sdk, integração | conversão-documentos | README.md:249-281 |
| G4 | Servidor MCP `markitdown-mcp` — 1 tool `convert_to_markdown(uri)` p/ `http/https/file/data`; STDIO + HTTP/SSE (bind localhost) | codigo-mcp | mcp, tool, uri, localhost | infra-agentes | packages/markitdown-mcp/src/markitdown_mcp/__main__.py:17-111 |
| G5 | Conversores de documentos Office: DOCX (com OMML→LaTeX p/ fórmulas), PPTX, XLSX/XLS | ferramenta | docx, pptx, xlsx, office | conversão-documentos | converters/_docx_converter.py, _pptx_converter.py, _xlsx_converter.py |
| G6 | Conversor PDF (texto offline) | ferramenta | pdf, texto | conversão-documentos | converters/_pdf_converter.py |
| G7 | Conversores web/markup: HTML, RSS/Atom, Wikipedia, Bing SERP, EPub, IPYNB (notebook) | ferramenta | html, rss, epub, notebook, scraping | conversão-documentos | converters/_html_converter.py, _rss_converter.py, _wikipedia_converter.py, _bing_serp_converter.py, _epub_converter.py, _ipynb_converter.py |
| G8 | Conversores de texto/dados: TXT, CSV, JSON, XML (plain text) | ferramenta | csv, json, xml, txt | conversão-documentos | converters/_csv_converter.py, _plain_text_converter.py |
| G9 | Conversor de imagem (metadados EXIF + OCR/descrição via LLM Vision) | ferramenta | imagem, ocr, exif, vision | conversão-documentos | converters/_image_converter.py, _exiftool.py, _llm_caption.py |
| G10 | Conversor de áudio (metadados EXIF + transcrição de fala) | ferramenta | áudio, transcrição, wav, mp3 | conversão-documentos | converters/_audio_converter.py, _transcribe_audio.py |
| G11 | Conversor YouTube (URL → transcrição/metadados) | ferramenta | youtube, transcrição, vídeo | conversão-documentos | converters/_youtube_converter.py |
| G12 | Conversor Outlook `.msg` e iteração sobre ZIP (entra no arquivo e converte conteúdos) | ferramenta | outlook, msg, zip, email | conversão-documentos | converters/_outlook_msg_converter.py, _zip_converter.py |
| G13 | Backend Azure Document Intelligence (layout cloud p/ PDFs escaneados) | ferramenta | azure, document-intelligence, ocr-cloud | conversão-documentos | converters/_doc_intel_converter.py |
| G14 | Backend Azure Content Understanding (multimodal: doc/imagem/áudio/vídeo; campos estruturados em YAML front matter) | ferramenta | azure, content-understanding, multimodal, campos | conversão-documentos | converters/_cu_converter.py; README.md:162-237 |
| G15 | Sistema de plugins de 3º (entry-point `markitdown.plugin`, off por padrão) + plugin `markitdown-ocr` (OCR via LLM Vision em PDF/DOCX/PPTX/XLSX) | ferramenta | plugin, extensão, ocr | conversão-documentos | _markitdown.py:66-76; packages/markitdown-ocr/, packages/markitdown-sample-plugin/ |
