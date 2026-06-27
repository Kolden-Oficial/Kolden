# MarkItDown — Referência de Uso (vendor inerte)

**MarkItDown** (Microsoft) é um utilitário Python que converte arquivos diversos para **Markdown
estruturado e legível por LLM** (headings, listas, tabelas, links). Cobre Office (DOCX com OMML→LaTeX,
PPTX, XLSX/XLS), PDF, HTML/RSS/Wikipedia/Bing SERP/EPub/notebook IPYNB, CSV/JSON/XML/TXT, imagem
(EXIF + OCR/descrição via LLM Vision), áudio (EXIF + transcrição), YouTube (URL → transcrição), Outlook
`.msg` e ZIP. Três superfícies: API Python, CLI `markitdown` e o servidor **`markitdown-mcp`** (1 tool
`convert_to_markdown(uri)`). Categoria: Conversão de documentos (ingestão para LLM).

> **Status:** `vendor-registrado (não instalado)`. Preenche a lacuna de **ingestão** (arquivo → Markdown)
> que a Kolden hoje não tem — direção oposta e complementar ao pipeline existente **MD → PDF**
> (`reference_md_para_pdf_windows.md`). **Nada instalado, código não copiado.** Quarentena gitignored:
> `Caos/_staging/quarentena/microsoft--markitdown/`.

---

## Como consumir (NÃO copiar o código)

### CLI (via uvx/pipx, sem instalação permanente)
```bash
# Converter um arquivo para Markdown (stdout)
uvx markitdown caminho/arquivo.pdf

# Salvar em arquivo
uvx markitdown apresentacao.pptx -o apresentacao.md

# Via pipe
cat documento.docx | uvx markitdown
```

### Servidor MCP local (caminho recomendado se promovido a uso ativo)
O `markitdown-mcp` expõe `convert_to_markdown(uri)` para `http/https/file/data`, transporte STDIO
(default) ou HTTP/SSE com bind em localhost — alinhado à soberania de dados:

```bash
claude mcp add --scope user markitdown -- uvx markitdown-mcp
```

### Backends opcionais (cloud, só se configurados)
- **Azure Document Intelligence** (PDFs escaneados) e **Azure Content Understanding** (multimodal):
  exigem chave Azure própria — ativar via Infisical, **nunca** chave em texto puro.
- **OCR/descrição de imagem por LLM Vision:** passa `llm_client`/`llm_model` (custo + dado sai para o LLM).

---

## Licença + procedência

| Campo | Valor |
|-------|-------|
| Licença | **MIT** (Copyright Microsoft Corporation) |
| Repositório | https://github.com/microsoft/markitdown |
| SHA analisado | `e144e0a2be95b34df17433bac904e635f2c5e551` |
| Veredito de segurança (F2) | **SAFE** — sem segredos, sem `eval`/`os.system`, sem `postinstall`; `subprocess` restrito ao binário `exiftool`; plugins de 3º **desligados por padrão** (só com `--use-plugins`); Docker roda como `nobody:nogroup` |

---

## Ressalvas (soberania / gates / Infisical)

- **Soberania:** o núcleo (Office/PDF/HTML/CSV/EPub) roda **offline**. Cuidado com os conversores que
  fazem rede (YouTube/Wikipedia/Bing SERP/RSS) e com os backends Azure / LLM Vision — esses **enviam
  dado para fora**; usar só sob decisão consciente.
- **Gate de input não confiável:** o README alerta que `convert()` faz I/O com os privilégios do processo
  (risco de SSRF/leitura local se receber URI/arquivo não confiável). Como vendor inerte o risco é nulo;
  ao ativar, tratar input externo com cuidado.
- **Plugins de terceiros desligados por padrão** — não ligar `--use-plugins` sem auditar o plugin.
- **Credenciais (Azure/LLM):** sempre via Infisical (`infisical run --projectId=... --env=... -- ...`),
  nunca chave literal.

---

## Notas Kolden

- Consumidores naturais: squads de **documentação/pesquisa** (ingerir PDFs/Office/áudio para o LLM).
- Sobreposição checada: o MCP `google-drive` já tem `convertPdfToGoogleDoc`/`bulkConvertFolderPdfs`
  (PDF→Google Doc, cloud); o MarkItDown cobre **offline + muitos formatos além de PDF** — complementar,
  sem conflito.
- Vendor inerte: nenhuma capacidade virou skill/agente (decisão F4 = registrar como vendor; ativação
  futura preferencial = `markitdown-mcp` local).

---

> Atribuição: descrição e superfície de uso derivadas de `microsoft/markitdown`@`e144e0a` (MIT).
> Sem cópia de código — apenas o consumo (CLI/MCP/API) está documentado para uso externo.
