# Assets do SYNAPSE

Templates para criar domains personalizados e entradas no manifest do SYNAPSE.

## Localização dos Templates

Os templates são mantidos como a fonte única da verdade no diretório de comandos CRUD:

| Template | Localização |
|----------|----------|
| **Template de domain** | `.claude/commands/synapse/templates/domain-template` |
| **Template de entrada no manifest** | `.claude/commands/synapse/templates/manifest-entry-template` |

Esses templates são usados pelo comando `*synapse create` para criar a estrutura de novos domains.

## Uso

Para criar um novo domain usando esses templates, execute:

```
*synapse create
```

Ou referencie os templates diretamente ao criar domains manualmente.

## Formatos de Template

### Template de Domain

```
# ==========================================
# SYNAPSE Domain: {DOMAIN_NAME}
# Created: {CURRENT_DATE}
# Description: {DESCRIPTION}
# ==========================================

# Rules
{DOMAIN_KEY}_RULE_0={FIRST_RULE}
```

### Template de Entrada no Manifest

```
# Layer 6: {domain-name}
{DOMAIN_KEY}_STATE=active
{DOMAIN_KEY}_RECALL={KEYWORDS}
{DOMAIN_KEY}_EXCLUDE=
```

Para a especificação completa do formato KEY=VALUE, veja [../references/manifest.md](../references/manifest.md).
