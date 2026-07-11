---
task: assessSecurity()
responsavel: "@cyber-chief"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: target_description
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: scope_definition
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: security_assessment
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Autorização confirmada e escopo definido"
  - "[ ] Todos os achados classificados com pontuações CVSS"
  - "[ ] Roadmap de remediação gerado com prioridades"
tipo: nota
area: Egide
up: "[[Egide/_MOC-egide]]"
relacionado:
  - "[[Egide/tasks/_indice|_indice]]"
---

# Tarefa: Avaliação de Postura de Segurança

**ID da Tarefa:** CYBER-001
**Versão:** 1.0.0
**Comando:** `*assess-security`
**Agente:** Cyber Chief (cyber-chief) roteia para especialistas
**Propósito:** Realizar uma avaliação abrangente de postura de segurança de um sistema ou organização alvo.

---

## Entradas

| Entrada | Origem | Obrigatória |
|-------|--------|----------|
| `target_description` | Prompt do usuário | SIM |
| `scope_definition` | Usuário ou documentos do engajamento | SIM |
| `authorization_proof` | Confirmação do usuário | SIM |
| `existing_reports` | Avaliações anteriores | NÃO |
| `compliance_requirements` | Contexto regulatório | NÃO |

## Pré-condições

1. Autorização escrita para o escopo da avaliação está confirmada
2. A descrição do alvo inclui faixas de rede, aplicações ou detalhes da organização
3. Framework ético reconhecido — sem operações destrutivas

## Fases de Execução

### Fase 1: Definição de Escopo (cyber-chief)

1. Esclareça os objetivos da avaliação (conformidade, risco, pré-pentest, orientada por incidente)
2. Defina os ativos dentro e fora de escopo
3. Identifique o tipo de avaliação: externa, interna, híbrida
4. Confirme as regras de engajamento (janelas de tempo, hosts restritos, contatos de escalonamento)
5. Roteie as subtarefas para os especialistas apropriados com base no escopo

### Fase 2: Reconhecimento & Coleta de Dados

1. **Reconhecimento passivo** — OSINT, registros DNS, transparência de certificados (cartographer)
2. **Varredura ativa** — Varredura de portas, enumeração de serviços (command-generator para comandos de ferramentas)
3. **Mapeamento de aplicação** — Endpoints de aplicações web, superfícies de API (jim-manico)
4. **Topologia de rede** — Identificar segmentos, limites de confiança, pontos de saída (chris-sanders)
5. Agregue todos os achados em um inventário estruturado

### Fase 3: Análise & Pontuação de Risco

1. Mapeie os ativos descobertos contra bancos de dados de vulnerabilidades conhecidas
2. Classifique os achados usando a pontuação CVSS 3.1
3. Identifique caminhos de ataque e oportunidades de movimento lateral (peter-kim)
4. Avalie os controles defensivos em vigor (chris-sanders)
5. Cruze com os requisitos de conformidade (se aplicável)
6. Priorize os riscos: Crítico > Alto > Médio > Baixo > Informativo

### Fase 4: Geração de Relatório

1. Sumário executivo — risco de negócio em linguagem não técnica
2. Achados técnicos — cada vulnerabilidade com evidência, pontuação CVSS, remediação
3. Mapa de superfície de ataque — representação visual dos ativos expostos
4. Roadmap de remediação — ações priorizadas com estimativas de esforço
5. Ganhos rápidos — itens corrigíveis em 24-48 horas
6. Recomendações estratégicas — melhorias de segurança de longo prazo

## Formato de Saída

```yaml
security_assessment:
  target: "{nome do alvo}"
  scope: "{escopo da avaliação}"
  date: "{data da avaliação}"
  assessor: "cyber-chief + especialistas"
  executive_summary: |
    {Visão geral do risco em nível de negócio}
  findings:
    - id: "FIND-001"
      title: "{título do achado}"
      severity: "CRITICAL | HIGH | MEDIUM | LOW | INFO"
      cvss_score: 0.0
      description: "{descrição detalhada}"
      evidence: "{prova do achado}"
      remediation: "{recomendação de correção}"
      effort: "QUICK_WIN | SHORT_TERM | LONG_TERM"
  attack_surface:
    external_exposure: "{resumo}"
    internal_risks: "{resumo}"
  remediation_roadmap:
    immediate: ["{ganhos rápidos}"]
    short_term: ["{itens de 1-4 semanas}"]
    long_term: ["{melhorias estratégicas}"]
```

## Condições de Veto

- **NUNCA** realize a avaliação sem autorização confirmada
- **NUNCA** faça varredura ou enumeração de alvos fora de escopo
- **NUNCA** tente exploração durante uma avaliação de postura (isso requer um engajamento de pentest separado)
- **NUNCA** compartilhe achados com partes não autorizadas
- **NUNCA** minimize achados críticos por conveniência

## Critérios de Conclusão

- [ ] Autorização confirmada e documentada
- [ ] Escopo claramente definido com limites de dentro/fora
- [ ] Reconhecimento passivo e ativo concluído
- [ ] Todos os achados classificados com pontuações CVSS
- [ ] Roadmap de remediação gerado com prioridades
- [ ] Sumário executivo escrito em linguagem de negócio
- [ ] Relatório entregue em formato estruturado
