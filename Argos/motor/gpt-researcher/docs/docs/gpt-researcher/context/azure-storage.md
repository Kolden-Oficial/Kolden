---
tipo: doc
area: Argos
up: "[[Argos/_MOC-argos]]"
relacionado:
  - "[[Argos/motor/gpt-researcher/docs/docs/gpt-researcher/context/data-ingestion|data-ingestion]]"
  - "[[Argos/motor/gpt-researcher/docs/docs/gpt-researcher/context/filtering-by-domain|filtering-by-domain]]"
  - "[[Argos/motor/gpt-researcher/docs/docs/gpt-researcher/context/local-docs|local-docs]]"
  - "[[Argos/motor/gpt-researcher/docs/docs/gpt-researcher/context/tailored-research|tailored-research]]"
  - "[[Argos/motor/gpt-researcher/docs/docs/gpt-researcher/context/vector-stores|vector-stores]]"
---

# Azure Storage

If you want to use Azure Blob Storage as the source for your GPT Researcher report context, follow these steps:

> **Step 1** - Set these environment variables with a .env file in the root folder

```bash
AZURE_CONNECTION_STRING=
AZURE_CONTAINER_NAME=
```

> **Step 2** - Add the `azure-storage-blob` dependency to your requirements.txt file

```bash
azure-storage-blob
```

> **Step 3** - When running the GPTResearcher class, pass the `report_source` as `azure`

```python
report = GPTResearcher(
    query="What happened in the latest burning man floods?",
    report_type="research_report",
    report_source="azure",
)
```