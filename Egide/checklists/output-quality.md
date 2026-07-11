---
tipo: checklist
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Checklist de Qualidade de Saída de Segurança

**ID do Checklist:** CYBER-CL-001
**Referenciado por:** tasks/review.md
**Propósito:** Validar entregáveis de cibersegurança quanto à qualidade antes da entrega ao usuário.

[[LLM: INSTRUÇÕES DE INICIALIZAÇÃO

Este checklist valida especificamente saídas de cibersegurança.

ABORDAGEM DE EXECUÇÃO:
1. Para cada categoria, verifique cada item em relação ao entregável
2. Marque os itens como [x] Aprovado, [ ] Reprovado, [N/A] Não Aplicável
3. Itens CRÍTICOS bloqueiam a entrega; itens não críticos são consultivos

Itens CRÍTICOS são marcados com o sufixo (CRITICAL).]]

---

## 1. Autorização e Escopo

- [ ] Limites de autorização são verificados e respeitados (CRITICAL)
- [ ] O escopo da avaliação está explicitamente declarado (CRITICAL)
- [ ] Itens fora de escopo estão documentados e não foram testados
- [ ] Restrições legais e de conformidade reconhecidas
- [ ] Regras de engajamento (RoE) seguidas

## 2. Classificação dos Achados

- [ ] Cada achado tem uma classificação de severidade: Crítico, Alto, Médio, Baixo, Informativo (CRITICAL)
- [ ] As classificações de severidade usam CVSS ou pontuação padronizada equivalente
- [ ] IDs de técnicas MITRE ATT&CK mapeados quando aplicável
- [ ] Referências CWE/CVE incluídas para vulnerabilidades conhecidas
- [ ] Falsos positivos são identificados e filtrados

## 3. Evidência e Reprodutibilidade

- [ ] Cada achado inclui evidência: logs, capturas de tela, passos de PoC (CRITICAL)
- [ ] Os achados são reprodutíveis por terceiros seguindo a documentação
- [ ] Os vetores de ataque estão claramente descritos
- [ ] O impacto é declarado em termos de negócio, não apenas em termos técnicos
- [ ] Os ativos/componentes afetados são especificamente identificados

## 4. Remediação

- [ ] Todo achado tem uma recomendação de remediação acionável (CRITICAL)
- [ ] A remediação é priorizada por severidade e explorabilidade
- [ ] Mitigações de curto prazo são distinguidas de correções de longo prazo
- [ ] Os passos de remediação são específicos, não genéricos ("corrija seus sistemas")
- [ ] Controles compensatórios são sugeridos quando a correção imediata não é possível

## 5. Relatório e Confidencialidade

- [ ] Nenhum dado sensível exposto no relatório (credenciais, PII, IPs internos em texto puro) (CRITICAL)
- [ ] Sumário executivo presente e compreensível por stakeholders não técnicos
- [ ] Detalhe técnico suficiente para o time de engenharia agir
- [ ] O relatório segue a estrutura de um framework reconhecido (OWASP, NIST, PTES)
- [ ] Marcação de classificação/confidencialidade aplicada

## 6. Completude

- [ ] Todos os ativos/superfícies dentro do escopo foram avaliados
- [ ] A metodologia está documentada
- [ ] As ferramentas e versões utilizadas estão listadas
- [ ] Limitações e ressalvas estão divulgadas
- [ ] Recomendações para avaliações futuras incluídas

---

## Critérios de APROVAÇÃO/REPROVAÇÃO

**APROVADO:** Todos os itens CRÍTICOS [x] e menos de 3 reprovações não críticas.
**REVISAR:** Todos os itens CRÍTICOS [x] mas com 3+ reprovações não críticas.
**REPROVADO:** Qualquer item CRÍTICO não marcado.
