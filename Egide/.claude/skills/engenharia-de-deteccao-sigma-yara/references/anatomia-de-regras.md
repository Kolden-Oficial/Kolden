---
tipo: nota
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Anatomia de regras + checklist de fidelidade

Esqueletos didáticos (defensivos) para autoria. Conteúdo de detecção, não de ataque.

## Sigma — esqueleto comentado
```yaml
title: <Técnica observável e específica>          # o QUE detecta, não a ferramenta
id: <uuid estável>                                # nunca muda; rastreia a regra
status: experimental                              # experimental -> test -> stable
description: <comportamento + por que é suspeito>
references:
  - <relatório/ATT&CK>
author: egide
date: 2026/06/27
tags:
  - attack.<tatica>                               # ex.: attack.credential_access
  - attack.t1003.001                              # técnica mapeada
logsource:
  category: process_creation                      # casar com a telemetria REAL
  product: windows
detection:
  selection:                                      # o que CASA (âncora específica)
    <Campo>: <valor raro/comportamental>
  filter:                                         # o que EXCLUI legítimo conhecido
    <Campo>: <processo/assinatura confiável>
  condition: selection and not filter
falsepositives:                                   # honesto e explícito
  - <software legítimo que pode disparar>
level: high                                       # honesto: ruidoso? rebaixe + filtro
```

Regras de ouro Sigma:
- `condition` sempre nomeia o que exclui; nunca só `selection` solta em técnica comum.
- Detectar a técnica (acesso a memória de LSASS) > detectar o binário do dia (mimikatz.exe).
- Sem `logsource` que exista no seu SIEM, a regra é decorativa.

## YARA — esqueleto comentado
```
rule Familia_Capability_Especifica
{
    meta:
        author = "egide"
        description = "Classifica <família/capability> por <âncora>"
        reference = "<sha amostra / relatório>"
        attack = "T1027"
    strings:
        $a = "string_rara_da_familia" ascii wide
        $b = { 6A 40 68 00 30 00 00 }          // sequência de bytes característica
        $c = /regex_de_baixa_frequencia/
    condition:
        uint16(0) == 0x5A4D                     // contexto: é PE
        and filesize < 2MB
        and 2 of ($a, $b, $c)                   // exige N de M -> reduz FP
}
```

Regras de ouro YARA:
- Strings raras + condição estrutural (`uint16`, `filesize`) cortam falso positivo.
- `N of M` em vez de `any of` evita casar goodware por uma string genérica.
- Âncore em bytes/strings que o autor do malware não troca trivialmente.

## Checklist de fidelidade (gate antes do deploy)
- [ ] Mapeada a ≥1 técnica ATT&CK.
- [ ] Fonte de log / alvo declarado e existente no ambiente.
- [ ] Testada contra a amostra/evento de origem (verdadeiro positivo).
- [ ] Testada contra **corpus legítimo** (goodware / baseline) — zero FP, ou filtro documentado.
- [ ] Testada contra ≥1 variante (não casa só o hash do dia).
- [ ] `level`/severidade honesto frente ao custo de triagem.
- [ ] Metadados completos (id estável, autor, data, status, referências).
- [ ] Versionada + revisada por par + cobertura mapeada no Navigator.

---
*Adaptado de `mukul975/Anthropic-Cybersecurity-Skills@673da1f` (Apache-2.0).*
