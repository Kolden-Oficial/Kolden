---
tipo: doc
area: staging-aiox
up: "[[.claude/_staging/aiox/_MOC-staging-aiox]]"
relacionado:
  - "[[.claude/_staging/aiox/docs/00-shared-activation-pipeline|00-shared-activation-pipeline]]"
  - "[[.claude/_staging/aiox/docs/CHANGELOG|CHANGELOG]]"
  - "[[.claude/_staging/aiox/docs/codex-integration-process|codex-integration-process]]"
  - "[[.claude/_staging/aiox/docs/community|community]]"
  - "[[.claude/_staging/aiox/docs/core-architecture|core-architecture]]"
  - "[[.claude/_staging/aiox/docs/docker-mcp-setup|docker-mcp-setup]]"
  - "[[.claude/_staging/aiox/docs/FEATURE_PROCESS|FEATURE_PROCESS]]"
  - "[[.claude/_staging/aiox/docs/getting-started|getting-started]]"
  - "[[.claude/_staging/aiox/docs/git-workflow-guide|git-workflow-guide]]"
  - "[[.claude/_staging/aiox/docs/glossary|glossary]]"
  - "[[.claude/_staging/aiox/docs/GUIDING-PRINCIPLES|GUIDING-PRINCIPLES]]"
  - "[[.claude/_staging/aiox/docs/how-to-contribute-with-pull-requests|how-to-contribute-with-pull-requests]]"
  - "[[.claude/_staging/aiox/docs/ide-integration|ide-integration]]"
  - "[[.claude/_staging/aiox/docs/meta-agent-commands|meta-agent-commands]]"
  - "[[.claude/_staging/aiox/docs/npx-install|npx-install]]"
  - "[[.claude/_staging/aiox/docs/prd-cli-graph-dashboard|prd-cli-graph-dashboard]]"
  - "[[.claude/_staging/aiox/docs/PUBLISHING|PUBLISHING]]"
  - "[[.claude/_staging/aiox/docs/roadmap|roadmap]]"
  - "[[.claude/_staging/aiox/docs/security|security]]"
  - "[[.claude/_staging/aiox/docs/security-best-practices|security-best-practices]]"
  - "[[.claude/_staging/aiox/docs/troubleshooting|troubleshooting]]"
  - "[[.claude/_staging/aiox/docs/uninstallation|uninstallation]]"
  - "[[.claude/_staging/aiox/docs/versioning-and-releases|versioning-and-releases]]"
---

# Synkra AIOX Documentation

> 🌐 **EN** | [PT](./pt/README.md) | [ES](./es/README.md) | [ZH](./zh/README.md)

> **AI-Orchestrated System for Full-Stack Development**

---

## 🌐 Select Language / Selecione o Idioma / Seleccione el Idioma / 选择语言

| Language       | Status          | Link                                                    |
| -------------- | --------------- | ------------------------------------------------------- |
| **English**    | ✅ Complete     | [📖 English Documentation](./getting-started.md)        |
| **Português**  | ✅ Complete     | [📖 Documentação em Português](./pt/getting-started.md) |
| **Español**    | ✅ Complete     | [📖 Documentación en Español](./es/getting-started.md)  |
| **中文（简体）** | 🟡 In Progress | [📖 中文文档](./zh/getting-started.md)                  |

---

## 📚 Documentation Structure

```text
docs/
├── getting-started.md         # English (root)
├── guides/                    # English
├── installation/              # English
├── architecture/              # English
├── framework/                 # English
├── platforms/                 # English
├── aiox-agent-flows/          # Detailed agent documentation (PT) — legacy root location
├── aiox-workflows/            # Detailed workflow documentation (PT) — legacy root location
│
├── pt/                        # Português (translations)
│   ├── getting-started.md
│   ├── guides/
│   └── ...
│
├── es/                        # Español (translations)
│   ├── getting-started.md
│   ├── guides/
│   └── ...
│
└── zh/                        # 中文（简体）(translations)
    ├── getting-started.md
    ├── guides/
    └── ...
```

---

## 🚀 Quick Links

### English

- [Getting Started](./getting-started.md)
- [Installation Guide](./installation/README.md)
- [Architecture Overview](./core-architecture.md)
- [Meta-Agent Commands](./meta-agent-commands.md)
- [Agent System Documentation](./en/aiox-agent-flows/README.md)
- [Workflow Documentation](./en/aiox-workflows/README.md)
- [Troubleshooting](./troubleshooting.md)

### Português

- [Começando](./pt/getting-started.md)
- [Guia de Instalação](./pt/installation/README.md)
- [Visão Geral da Arquitetura](./pt/architecture/ARCHITECTURE-INDEX.md)
- [Referência de Agentes](./pt/agent-reference-guide.md)
- [Documentação do Sistema de Agentes](./aiox-agent-flows/README.md)
- [Documentação de Workflows](./aiox-workflows/README.md)
- [Solução de Problemas](./pt/troubleshooting.md)

### Español

- [Comenzando](./es/getting-started.md)
- [Guía de Instalación](./es/installation/README.md)
- [Visión General de la Arquitectura](./es/architecture/ARCHITECTURE-INDEX.md)
- [Referencia de Agentes](./es/agent-reference-guide.md)
- [Documentación del Sistema de Agentes](./es/aiox-agent-flows/README.md)
- [Documentación de Workflows](./es/aiox-workflows/README.md)
- [Solución de Problemas](./es/troubleshooting.md)

### 中文（简体）

- [快速入门](./zh/getting-started.md)
- [安装指南](./zh/installation/README.md)
- [架构总览](./zh/architecture/ARCHITECTURE-INDEX.md)
- [代理参考](./zh/agent-reference-guide.md)
- [代理系统文档](./zh/aiox-agent-flows/README.md)
- [工作流文档](./zh/aiox-workflows/README.md)
- [故障排查](./zh/troubleshooting.md)

---

## 🤝 Contributing to Documentation

### For Translators

We follow industry-standard i18n practices:

1. English content lives in the root (`docs/`)
2. Translations go in language folders (`docs/pt/`, `docs/es/`, `docs/zh/`)
3. File structure mirrors the English version
4. Add translation header to each file:
   ```markdown
   <!--
     Translation: PT | ES | ZH
     Original: /docs/[filename].md
     Last sync: YYYY-MM-DD
   -->
   ```

### Translation Status

| Section         | EN  | PT  | ES  | ZH  |
| --------------- | --- | --- | --- | --- |
| Getting Started | ✅  | ✅  | ✅  | 🟡  |
| Guides          | ✅  | ✅  | ✅  | 🟡  |
| Installation    | ✅  | ✅  | ✅  | 🟡  |
| Architecture    | ✅  | ✅  | ✅  | 🟡  |
| Framework       | ✅  | ✅  | ✅  | 🟡  |
| Platforms       | ✅  | ✅  | ✅  | ❌  |

---

## 📄 License

This documentation is part of Synkra AIOX, licensed under [MIT License](../LICENSE).

---

_Synkra AIOX - Orchestrating AI for Better Software Development_
