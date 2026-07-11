---
tipo: doc
area: Prometeu
up: "[[Prometeu/_MOC-prometeu]]"
relacionado:
  - "[[Prometeu/docs/pt/agent-reference-guide|agent-reference-guide]]"
  - "[[Prometeu/docs/pt/aiox-nomenclature-specification|aiox-nomenclature-specification]]"
  - "[[Prometeu/docs/pt/CHANGELOG|CHANGELOG]]"
  - "[[Prometeu/docs/pt/code-of-conduct|code-of-conduct]]"
  - "[[Prometeu/docs/pt/community|community]]"
  - "[[Prometeu/docs/pt/contributing|contributing]]"
  - "[[Prometeu/docs/pt/core-architecture|core-architecture]]"
  - "[[Prometeu/docs/pt/docker-mcp-setup|docker-mcp-setup]]"
  - "[[Prometeu/docs/pt/DOCUMENTATION-ROADMAP|DOCUMENTATION-ROADMAP]]"
  - "[[Prometeu/docs/pt/ENVIRONMENT|ENVIRONMENT]]"
  - "[[Prometeu/docs/pt/FEATURE_PROCESS|FEATURE_PROCESS]]"
  - "[[Prometeu/docs/pt/getting-started|getting-started]]"
  - "[[Prometeu/docs/pt/git-workflow-guide|git-workflow-guide]]"
  - "[[Prometeu/docs/pt/GUIDING-PRINCIPLES|GUIDING-PRINCIPLES]]"
  - "[[Prometeu/docs/pt/how-to-contribute-with-pull-requests|how-to-contribute-with-pull-requests]]"
  - "[[Prometeu/docs/pt/ide-integration|ide-integration]]"
  - "[[Prometeu/docs/pt/meta-agent-commands|meta-agent-commands]]"
  - "[[Prometeu/docs/pt/migration-guide|migration-guide]]"
  - "[[Prometeu/docs/pt/npx-install|npx-install]]"
  - "[[Prometeu/docs/pt/performance-tuning-guide|performance-tuning-guide]]"
  - "[[Prometeu/docs/pt/roadmap|roadmap]]"
  - "[[Prometeu/docs/pt/security|security]]"
  - "[[Prometeu/docs/pt/security-best-practices|security-best-practices]]"
  - "[[Prometeu/docs/pt/troubleshooting|troubleshooting]]"
  - "[[Prometeu/docs/pt/uninstallation|uninstallation]]"
  - "[[Prometeu/docs/pt/versioning-and-releases|versioning-and-releases]]"
---

<!--
  Tradução: PT-BR
  Original: /docs/README.md
  Última sincronização: 2026-02-23
-->

# Documentação Synkra AIOX

> 🌐 [EN](../README.md) | **PT** | [ES](../es/README.md) | [ZH](../zh/README.md)

> **Sistema Orquestrado por IA para Desenvolvimento Full Stack**

---

## 🌐 Selecione o Idioma / Select Language / Seleccione el Idioma / 选择语言

| Idioma             | Status         | Link                                                    |
| ------------------ | -------------- | ------------------------------------------------------- |
| **English**        | ✅ Completo    | [📖 English Documentation](../getting-started.md)       |
| **Português**      | ✅ Completo    | [📖 Documentação em Português](./getting-started.md)    |
| **Español**        | ✅ Completo    | [📖 Documentación en Español](../es/getting-started.md) |
| **中文（简体）**   | 🟡 Em progresso | [📖 Documentação em Chinês](../zh/getting-started.md)   |

---

## 📚 Estrutura da Documentação

```
docs/
├── getting-started.md         # English (raiz)
├── guides/                    # English
├── installation/              # English
├── architecture/              # English
├── framework/                 # English
├── platforms/                 # English
│
├── pt/                        # Português (traduções)
│   ├── getting-started.md
│   ├── guides/
│   ├── platforms/
│   └── ...
│
├── es/                        # Español (traduções)
│   ├── getting-started.md
│   ├── guides/
│   ├── platforms/
│   └── ...
│
└── zh/                        # 中文（简体）(traduções)
    ├── getting-started.md
    ├── guides/
    └── ...
```

---

## 🚀 Links Rápidos

### English

- [Getting Started](../getting-started.md)
- [Installation Guide](../installation/README.md)
- [Architecture Overview](../core-architecture.md)
- [Meta-Agent Commands](../meta-agent-commands.md)
- [Troubleshooting](../troubleshooting.md)

### Português

- [Começando](./getting-started.md)
- [Guia de Instalação](./installation/README.md)
- [Visão Geral da Arquitetura](./architecture/ARCHITECTURE-INDEX.md)
- [Referência de Agentes](./agent-reference-guide.md)
- [Documentação do Sistema de Agentes](../aiox-agent-flows/README.md)
- [Documentação de Workflows](../aiox-workflows/README.md)
- [Solução de Problemas](./troubleshooting.md)

### Español

- [Comenzando](../es/getting-started.md)
- [Guía de Instalación](../es/installation/README.md)
- [Visión General de la Arquitectura](../es/architecture/ARCHITECTURE-INDEX.md)
- [Referencia de Agentes](../es/agent-reference-guide.md)
- [Documentación del Sistema de Agentes](../es/aiox-agent-flows/README.md)
- [Documentación de Workflows](../es/aiox-workflows/README.md)
- [Solución de Problemas](../es/troubleshooting.md)

### 中文（简体）

- [快速入门](../zh/getting-started.md)
- [安装指南](../zh/installation/README.md)
- [架构总览](../zh/architecture/ARCHITECTURE-INDEX.md)
- [代理参考](../zh/agent-reference-guide.md)
- [故障排查](../zh/troubleshooting.md)

---

## 🤝 Contribuindo para a Documentação

### Para Tradutores

Seguimos práticas i18n padrão da indústria:

1. Conteúdo em inglês fica na raiz (`docs/`)
2. Traduções vão nas pastas de idioma (`docs/pt/`, `docs/es/`, `docs/zh/`)
3. Estrutura de arquivos espelha a versão em inglês
4. Adicione cabeçalho de tradução em cada arquivo:
   ```markdown
   <!--
     Translation: PT | ES | ZH
     Original: /docs/[filename].md
     Last sync: YYYY-MM-DD
   -->
   ```

### Status das Traduções

| Seção           | EN  | PT  | ES  | ZH  |
| --------------- | --- | --- | --- | --- |
| Getting Started | ✅  | ✅  | ✅  | 🟡  |
| Guides          | ✅  | ✅  | ✅  | 🟡  |
| Installation    | ✅  | ✅  | ✅  | 🟡  |
| Architecture    | ✅  | ✅  | ✅  | 🟡  |
| Framework       | ✅  | ✅  | ✅  | 🟡  |
| Platforms       | ✅  | ✅  | ✅  | ❌  |

---

## 📄 Licença

Esta documentação faz parte do Synkra AIOX, licenciado sob [Licença MIT](../../LICENSE).

---

_Synkra AIOX - Orquestrando IA para Melhor Desenvolvimento de Software_
