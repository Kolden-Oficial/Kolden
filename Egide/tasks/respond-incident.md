---
task: respondIncident()
responsavel: "@omar-santos"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: incident_description
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: affected_systems
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: incident_report
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Incidente classificado com severidade e linha do tempo estabelecida"
  - "[ ] Ações de contenção executadas e verificadas"
  - "[ ] Lições aprendidas documentadas com melhorias acionáveis"
---

# Tarefa: Playbook de Resposta a Incidentes

**ID da Tarefa:** CYBER-004
**Versão:** 1.0.0
**Comando:** `*respond-incident`
**Agente:** Omar Santos (omar-santos)
**Propósito:** Executar uma resposta a incidentes estruturada seguindo o framework NIST 800-61.

---

## Entradas

| Entrada | Origem | Obrigatória |
|-------|--------|----------|
| `incident_description` | Usuário/sistema de alerta | SIM |
| `affected_systems` | Usuário ou monitoramento | SIM |
| `incident_severity` | Triagem inicial | SIM |
| `timeline_so_far` | Descrição do usuário | PREFERENCIAL |
| `available_logs` | Logs de sistema | PREFERENCIAL |
| `contacts_list` | Contatos de escalonamento | NÃO |

## Pré-condições

1. O incidente foi reportado ou detectado
2. Existe uma classificação inicial de severidade (P1-P4)
3. Os sistemas afetados ou o escopo estão pelo menos parcialmente identificados
4. O respondente tem acesso aos sistemas e logs relevantes

## Fases de Execução

### Fase 1: Preparação

1. Confirme os papéis da equipe de resposta a incidentes e os canais de comunicação
2. Verifique o acesso às ferramentas necessárias — SIEM, agregadores de log, ferramentas forenses
3. Estabeleça um canal de comunicação seguro (fora de banda se houver suspeita de comprometimento)
4. Revise os playbooks de RI existentes para tipos de incidente similares
5. Prepare os procedimentos de coleta de evidências — cadeia de custódia, ferramentas de imaging
6. Confirme os requisitos legais e de notificação de conformidade

### Fase 2: Identificação & Triagem

1. Colete os indicadores de comprometimento (IOCs) iniciais — IPs, hashes, domínios, contas de usuário
2. Determine o tipo de incidente — malware, phishing, acesso não autorizado, violação de dados, ameaça interna
3. Estabeleça a linha do tempo — quando começou, quando foi detectado, o que aconteceu no intervalo
4. Avalie o raio de explosão — quais sistemas, dados e usuários são afetados
5. Classifique a severidade com base no impacto:
   - **P1 Crítico** — Exfiltração de dados ativa, ransomware se espalhando, sistema crítico fora do ar
   - **P2 Alto** — Comprometimento confirmado, movimento lateral detectado, dados sensíveis em risco
   - **P3 Médio** — Atividade suspeita confirmada, escopo limitado, sem perda de dados ainda
   - **P4 Baixo** — Violação de política, ataque falho, alerta informativo
6. Ative o nível de resposta apropriado com base na severidade

### Fase 3: Contenção

1. **Contenção de curto prazo** — Isolar sistemas afetados, bloquear IPs/domínios maliciosos, desabilitar contas comprometidas
2. **Preservação de evidências** — Capturar dumps de memória, imagens de disco, snapshots de log ANTES das mudanças
3. **Contenção de rede** — Segmentar redes afetadas, atualizar regras de firewall, habilitar monitoramento intensificado
4. **Contenção de credenciais** — Resetar credenciais comprometidas, revogar tokens, forçar reautenticação
5. **Comunicação** — Notificar as partes interessadas conforme a severidade (P1/P2: notificação executiva imediata)
6. Verifique a eficácia da contenção — confirme que o acesso do atacante foi cortado

### Fase 4: Erradicação

1. Identifique a causa raiz — vulnerabilidade explorada, vetor de phishing, configuração incorreta
2. Remova malware, backdoors e mecanismos de acesso não autorizado
3. Corrija as vulnerabilidades exploradas
4. Reconstrua os sistemas comprometidos a partir de baselines conhecidas como boas
5. Faça varredura em busca de indicadores de comprometimento residuais
6. Verifique a erradicação — confirme que não há presença remanescente do atacante

### Fase 5: Recuperação

1. Restaure os sistemas afetados a partir de backups limpos
2. Reintroduza gradualmente os sistemas em produção com monitoramento intensificado
3. Valide a integridade dos sistemas — checksums, comparações com baseline
4. Monitore em busca de indicadores de recomprometimento (mínimo de 72 horas de monitoramento intensificado)
5. Confirme que todos os serviços foram restaurados e funcionam normalmente
6. Atualize as regras de detecção com base nos IOCs descobertos

### Fase 6: Lições Aprendidas

1. Conduza a revisão pós-incidente em até 5 dias úteis
2. Documente a linha do tempo completa do incidente com decisões e resultados
3. Identifique o que funcionou bem e o que precisa de melhoria
4. Atualize os playbooks de RI com base nas lições aprendidas
5. Recomende melhorias de segurança para prevenir a recorrência
6. Crie pacotes de IOC para compartilhamento de inteligência de ameaças (se apropriado)

## Formato de Saída

```yaml
incident_report:
  incident_id: "IR-{YYYY}-{NNN}"
  responder: "omar-santos"
  severity: "P1 | P2 | P3 | P4"
  type: "{tipo de incidente}"
  status: "ACTIVE | CONTAINED | ERADICATED | RECOVERED | CLOSED"
  timeline:
    detected: "{timestamp}"
    contained: "{timestamp}"
    eradicated: "{timestamp}"
    recovered: "{timestamp}"
  affected_systems: ["{lista de sistemas}"]
  iocs:
    - type: "IP | HASH | DOMAIN | EMAIL | USER"
      value: "{indicador}"
      context: "{onde observado}"
  root_cause: |
    {Análise de causa raiz}
  remediation_actions: ["{ações tomadas}"]
  lessons_learned:
    what_worked: ["{pontos positivos}"]
    improvements: ["{áreas a melhorar}"]
    recommendations: ["{prevenir recorrência}"]
```

## Condições de Veto

- **NUNCA** pule a preservação de evidências antes das ações de contenção
- **NUNCA** restaure sistemas sem verificar a integridade do backup
- **NUNCA** declare o incidente encerrado sem o período de monitoramento intensificado
- **NUNCA** compartilhe IOCs ou detalhes do incidente sem autorização
- **NUNCA** culpe indivíduos — foque em melhorias de processo e sistema

## Critérios de Conclusão

- [ ] Incidente classificado com severidade e tipo
- [ ] Linha do tempo estabelecida da detecção ao estado atual
- [ ] Ações de contenção executadas e verificadas
- [ ] Causa raiz identificada
- [ ] Erradicação confirmada sem comprometimento residual
- [ ] Sistemas restaurados com monitoramento intensificado ativo
- [ ] Lições aprendidas documentadas com melhorias acionáveis
