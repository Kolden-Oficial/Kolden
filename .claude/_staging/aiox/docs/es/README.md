---
tipo: doc
area: staging-aiox
up: "[[.claude/_staging/aiox/_MOC-staging-aiox]]"
relacionado:
  - "[[.claude/_staging/aiox/docs/es/agent-reference-guide|agent-reference-guide]]"
  - "[[.claude/_staging/aiox/docs/es/aiox-nomenclature-specification|aiox-nomenclature-specification]]"
  - "[[.claude/_staging/aiox/docs/es/CHANGELOG|CHANGELOG]]"
  - "[[.claude/_staging/aiox/docs/es/community|community]]"
  - "[[.claude/_staging/aiox/docs/es/core-architecture|core-architecture]]"
  - "[[.claude/_staging/aiox/docs/es/docker-mcp-setup|docker-mcp-setup]]"
  - "[[.claude/_staging/aiox/docs/es/DOCUMENTATION-ROADMAP|DOCUMENTATION-ROADMAP]]"
  - "[[.claude/_staging/aiox/docs/es/ENVIRONMENT|ENVIRONMENT]]"
  - "[[.claude/_staging/aiox/docs/es/FEATURE_PROCESS|FEATURE_PROCESS]]"
  - "[[.claude/_staging/aiox/docs/es/getting-started|getting-started]]"
  - "[[.claude/_staging/aiox/docs/es/git-workflow-guide|git-workflow-guide]]"
  - "[[.claude/_staging/aiox/docs/es/GUIDING-PRINCIPLES|GUIDING-PRINCIPLES]]"
  - "[[.claude/_staging/aiox/docs/es/how-to-contribute-with-pull-requests|how-to-contribute-with-pull-requests]]"
  - "[[.claude/_staging/aiox/docs/es/ide-integration|ide-integration]]"
  - "[[.claude/_staging/aiox/docs/es/meta-agent-commands|meta-agent-commands]]"
  - "[[.claude/_staging/aiox/docs/es/migration-guide|migration-guide]]"
  - "[[.claude/_staging/aiox/docs/es/npx-install|npx-install]]"
  - "[[.claude/_staging/aiox/docs/es/performance-tuning-guide|performance-tuning-guide]]"
  - "[[.claude/_staging/aiox/docs/es/roadmap|roadmap]]"
  - "[[.claude/_staging/aiox/docs/es/security|security]]"
  - "[[.claude/_staging/aiox/docs/es/security-best-practices|security-best-practices]]"
  - "[[.claude/_staging/aiox/docs/es/troubleshooting|troubleshooting]]"
  - "[[.claude/_staging/aiox/docs/es/uninstallation|uninstallation]]"
  - "[[.claude/_staging/aiox/docs/es/versioning-and-releases|versioning-and-releases]]"
---

<!--
  Traducción: ES
  Original: /docs/README.md
  Última sincronización: 2026-02-23
-->

# Documentación de Synkra AIOX

> 🌐 [EN](../README.md) | [PT](../pt/README.md) | **ES** | [ZH](../zh/README.md)

> **Sistema Orquestado por IA para Desarrollo Full Stack**

---

## 🌐 Seleccione el Idioma / Select Language / Selecione o Idioma / 选择语言

| Idioma              | Estado         | Enlace                                                   |
| ------------------- | -------------- | -------------------------------------------------------- |
| **English**         | ✅ Completo    | [📖 English Documentation](../getting-started.md)        |
| **Português**       | ✅ Completo    | [📖 Documentação em Português](../pt/getting-started.md) |
| **Español**         | ✅ Completo    | [📖 Documentación en Español](./getting-started.md)      |
| **中文（简体）**    | 🟡 En progreso | [📖 Documentación en Chino](../zh/getting-started.md)    |

---

## 📚 Estructura de la Documentación

```
docs/
├── getting-started.md         # English (raíz)
├── guides/                    # English
├── installation/              # English
├── architecture/              # English
├── framework/                 # English
├── platforms/                 # English
│
├── pt/                        # Português (traducciones)
│   ├── getting-started.md
│   ├── guides/
│   ├── platforms/
│   └── ...
│
├── es/                        # Español (traducciones)
│   ├── getting-started.md
│   ├── guides/
│   ├── platforms/
│   └── ...
│
└── zh/                        # 中文（简体）(traducciones)
    ├── getting-started.md
    ├── guides/
    └── ...
```

---

## 🚀 Enlaces Rápidos

### English

- [Getting Started](../getting-started.md)
- [Installation Guide](../installation/README.md)
- [Architecture Overview](../core-architecture.md)
- [Meta-Agent Commands](../meta-agent-commands.md)
- [Troubleshooting](../troubleshooting.md)

### Português

- [Começando](../pt/getting-started.md)
- [Guia de Instalação](../pt/installation/README.md)
- [Visão Geral da Arquitetura](../pt/architecture/ARCHITECTURE-INDEX.md)
- [Referência de Agentes](../pt/agent-reference-guide.md)
- [Documentação do Sistema de Agentes](../aiox-agent-flows/README.md)
- [Documentação de Workflows](../aiox-workflows/README.md)
- [Solução de Problemas](../pt/troubleshooting.md)

### Español

- [Comenzando](./getting-started.md)
- [Guía de Instalación](./installation/README.md)
- [Visión General de la Arquitectura](./architecture/ARCHITECTURE-INDEX.md)
- [Referencia de Agentes](./agent-reference-guide.md)
- [Documentación del Sistema de Agentes](./aiox-agent-flows/README.md)
- [Documentación de Workflows](./aiox-workflows/README.md)
- [Solución de Problemas](./troubleshooting.md)

### 中文（简体）

- [快速入门](../zh/getting-started.md)
- [安装指南](../zh/installation/README.md)
- [架构总览](../zh/architecture/ARCHITECTURE-INDEX.md)
- [代理参考](../zh/agent-reference-guide.md)
- [故障排查](../zh/troubleshooting.md)

---

## 🤝 Contribuir a la Documentación

### Para Traductores

Seguimos prácticas estándar de la industria para i18n:

1. El contenido en inglés se encuentra en la raíz (`docs/`)
2. Las traducciones van en carpetas de idioma (`docs/pt/`, `docs/es/`, `docs/zh/`)
3. La estructura de archivos refleja la versión en inglés
4. Agregue el encabezado de traducción a cada archivo:
   ```markdown
   <!--
     Traducción: PT | ES | ZH
     Original: /docs/[nombre-archivo].md
     Última sincronización: AAAA-MM-DD
   -->
   ```

### Estado de las Traducciones

| Sección         | EN  | PT  | ES  | ZH  |
| --------------- | --- | --- | --- | --- |
| Getting Started | ✅  | ✅  | ✅  | 🟡  |
| Guides          | ✅  | ✅  | ✅  | 🟡  |
| Installation    | ✅  | ✅  | ✅  | 🟡  |
| Architecture    | ✅  | ✅  | ✅  | 🟡  |
| Framework       | ✅  | ✅  | ✅  | 🟡  |
| Platforms       | ✅  | ✅  | ✅  | ❌  |

---

## 📄 Licencia

Esta documentación es parte de Synkra AIOX, licenciada bajo [Licencia MIT](../../LICENSE).

---

_Synkra AIOX - Orquestando IA para un Mejor Desarrollo de Software_
