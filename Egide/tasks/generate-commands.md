---
task: generateCommands()
responsavel: "@command-generator"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: objective
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: target
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: command_output
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Ferramenta apropriada selecionada com justificativa"
  - "[ ] Comando gerado com documentação inline"
  - "[ ] Avaliação de segurança concluída com avisos"
---

# Tarefa: Geração de Comandos de Ferramentas de Segurança

**ID da Tarefa:** CYBER-005
**Versão:** 1.0.0
**Comando:** `*generate-commands`
**Agente:** Command Generator (command-generator)
**Propósito:** Gerar comandos de ferramentas de segurança precisos, seguros e apropriados ao contexto para operações autorizadas.

---

## Entradas

| Entrada | Origem | Obrigatória |
|-------|--------|----------|
| `objective` | Prompt do usuário | SIM |
| `target` | Especificação do usuário | SIM |
| `tool_preference` | Usuário ou autosseleção | NÃO |
| `authorization_context` | Confirmação do usuário | SIM |
| `constraints` | Limites de taxa, furtividade, tempo | NÃO |
| `os_context` | SO/ambiente do alvo | PREFERENCIAL |

## Pré-condições

1. A operação está autorizada (CTF, engajamento de pentest, educacional, defensiva)
2. O alvo está dentro do escopo autorizado
3. Disponibilidade da ferramenta confirmada ou instalável
4. O objetivo está claramente definido (recon, enum, varredura de vuln, exploit, defesa)

## Fases de Execução

### Fase 1: Identificar Objetivo & Alvo

1. Faça o parsing do objetivo do usuário — o que ele está tentando alcançar?
2. Classifique o tipo de operação: reconhecimento, enumeração, varredura de vulnerabilidades, exploração, defesa
3. Identifique as características do alvo — IP, domínio, aplicação web, faixa de rede, serviço
4. Determine o contexto de SO/ambiente para compatibilidade de comandos
5. Confirme o contexto de autorização — recuse se claramente não autorizado

### Fase 2: Selecionar a Ferramenta Apropriada

1. Combine o objetivo à categoria de ferramenta do security-tools-catalog.yaml
2. Considere a disponibilidade da ferramenta e a preferência do usuário
3. Se múltiplas ferramentas se encaixam, recomende a mais apropriada com justificativa:
   - Trade-off de velocidade vs minuciosidade
   - Trade-off de furtividade vs ruído
   - Requisitos de escopo (alvo único vs faixa)
4. Selecione o template de comando do catálogo

### Fase 3: Gerar o Comando

1. Construa o comando com as flags e opções apropriadas
2. Customize para o alvo e objetivo específicos
3. Adicione flags de formatação de saída (saída parseável é preferível)
4. Inclua flags de timeout e rate-limiting onde aplicável
5. Forneça o comando com comentários inline explicando cada flag
6. Se complexo, divida em uma sequência de comandos com explicações

### Fase 4: Checagem de Segurança

1. **Checagem de escopo** — O comando afeta apenas o alvo autorizado?
2. **Checagem de destrutividade** — Este comando poderia causar interrupção de serviço?
3. **Checagem de ruído** — Quão detectável é este comando? Sinalize se a furtividade for requerida
4. **Tratamento de dados** — O comando armazena/transmite dados sensíveis com segurança?
5. **Checagem legal** — Este comando é apropriado para o contexto de autorização?
6. Adicione avisos para quaisquer flags ou comportamentos arriscados
7. Sugira alternativas mais seguras se a solicitação original for limítrofe

## Formato de Saída

```yaml
command_output:
  objective: "{o que o comando alcança}"
  tool: "{nome da ferramenta}"
  category: "recon | enum | vuln_scan | exploit | defense"
  authorization: "confirmada — {contexto}"
  command: |
    {comando completo com comentários}
  explanation:
    - flag: "{flag}"
      purpose: "{o que faz}"
  safety_assessment:
    scope_safe: true
    destructive: false
    noise_level: "LOW | MEDIUM | HIGH"
    warnings: ["{quaisquer cautelas}"]
  alternatives:
    - tool: "{ferramenta alternativa}"
      command: "{comando alternativo}"
      tradeoff: "{por que você poderia preferir esta}"
```

## Condições de Veto

- **NUNCA** gere comandos para alvos não autorizados
- **NUNCA** gere comandos destrutivos (DoS, wiper, exclusão de dados) sem salvaguardas explícitas
- **NUNCA** gere comandos projetados para evadir as forças da lei
- **NUNCA** omita avisos de segurança para comandos potencialmente perigosos
- **NUNCA** gere comandos de alvejamento em massa sem verificação de escopo

## Critérios de Conclusão

- [ ] Objetivo e alvo claramente identificados
- [ ] Ferramenta apropriada selecionada com justificativa
- [ ] Comando gerado com documentação inline
- [ ] Cada flag explicada
- [ ] Avaliação de segurança concluída
- [ ] Avisos incluídos para operações arriscadas
- [ ] Abordagens alternativas sugeridas onde aplicável
