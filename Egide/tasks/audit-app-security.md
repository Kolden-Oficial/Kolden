---
task: auditAppSecurity()
responsavel: "@jim-manico"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: application_url
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: tech_stack
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: app_security_audit
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Modelo de ameaças criado com análise STRIDE"
  - "[ ] Todas as categorias do OWASP Top 10 testadas"
  - "[ ] Plano de remediação com exemplos de correção em nível de código"
tipo: nota
area: Egide
up: "[[Egide/_MOC-egide]]"
relacionado:
  - "[[Egide/tasks/_indice|_indice]]"
---

# Tarefa: Auditoria de Segurança de Aplicação OWASP

**ID da Tarefa:** CYBER-003
**Versão:** 1.0.0
**Comando:** `*audit-app-security`
**Agente:** Jim Manico (jim-manico)
**Propósito:** Conduzir uma revisão abrangente de segurança de aplicação baseada na metodologia OWASP.

---

## Entradas

| Entrada | Origem | Obrigatória |
|-------|--------|----------|
| `application_url` | Prompt do usuário | SIM |
| `source_code_access` | Repositório ou arquivos | PREFERENCIAL |
| `tech_stack` | Usuário ou autodetectado | SIM |
| `authentication_type` | Descrição do usuário | SIM |
| `api_documentation` | OpenAPI/Swagger | NÃO |
| `previous_audit` | Achados anteriores | NÃO |

## Pré-condições

1. A aplicação está acessível para teste (URL ou ambiente local)
2. Autorização para testar a aplicação está confirmada
3. O stack tecnológico está identificado (linguagem, framework, banco de dados, provedor de autenticação)
4. Credenciais de conta de teste fornecidas (se áreas autenticadas estiverem em escopo)

## Fases de Execução

### Fase 1: Modelagem de Ameaças

1. Identifique a arquitetura da aplicação — frontend, backend, banco de dados, serviços de terceiros
2. Mapeie os fluxos de dados — caminhos de entrada do usuário, chamadas de API, armazenamento de dados, integrações externas
3. Identifique os limites de confiança — camadas de autenticação, níveis de privilégio, segmentos de rede
4. Crie o modelo de ameaças usando a metodologia STRIDE:
   - **S**poofing (Falsificação) — fraquezas de autenticação
   - **T**ampering (Adulteração) — riscos de integridade de dados
   - **R**epudiation (Repúdio) — lacunas de logging e auditoria
   - **I**nformation Disclosure (Divulgação de Informação) — riscos de exposição de dados
   - **D**enial of Service (Negação de Serviço) — vetores de exaustão de recursos
   - **E**levation of Privilege (Elevação de Privilégio) — caminhos de bypass de autorização
5. Priorize as ameaças por probabilidade e impacto

### Fase 2: Revisão de Código (se a fonte estiver disponível)

1. Revise a implementação de autenticação — hashing de senha, gerenciamento de sessão, MFA
2. Analise a lógica de autorização — aplicação de RBAC/ABAC, checagens de IDOR
3. Inspecione a validação de entrada — sanitização, consultas parametrizadas, encoding de saída
4. Verifique o uso de criptografia — seleção de algoritmo, gerenciamento de chaves, configuração de TLS
5. Revise o tratamento de erros — vazamento de informação, stack traces, endpoints de debug
6. Avalie a segurança de dependências — bibliotecas vulneráveis conhecidas (npm audit, Snyk)
7. Verifique os cabeçalhos de segurança — CSP, HSTS, X-Frame-Options, política CORS

### Fase 3: Varredura de Vulnerabilidades

1. Execute o scanner automatizado contra as categorias do OWASP Top 10:
   - A01: Quebra de Controle de Acesso
   - A02: Falhas Criptográficas
   - A03: Injeção (SQL, NoSQL, Comando, LDAP)
   - A04: Design Inseguro
   - A05: Configuração Incorreta de Segurança
   - A06: Componentes Vulneráveis
   - A07: Falhas de Autenticação
   - A08: Falhas de Integridade de Dados
   - A09: Falhas de Logging & Monitoramento
   - A10: SSRF
2. Verificação manual dos achados automatizados (elimine falsos positivos)
3. Teste falhas de lógica de negócio não capturadas pelos scanners
4. Teste de segurança de API — quebra de autorização em nível de objeto, mass assignment, rate limiting

### Fase 4: Plano de Remediação

1. Mapeie cada achado para a categoria OWASP e o identificador CWE
2. Forneça recomendações específicas de correção em nível de código
3. Referencie os OWASP Cheat Sheets para cada remediação
4. Priorize as correções: Crítica (corrigir agora) > Alta (esta sprint) > Média (próxima sprint) > Baixa (backlog)
5. Forneça exemplos de código seguro no stack tecnológico da aplicação
6. Recomende bibliotecas e middleware de segurança

## Formato de Saída

```yaml
app_security_audit:
  application: "{nome/url do app}"
  auditor: "jim-manico"
  methodology: "OWASP ASVS + Top 10"
  tech_stack: "{stack detectado}"
  threat_model:
    architecture: "{descrição}"
    trust_boundaries: ["{lista de limites}"]
    stride_findings: ["{lista de ameaças}"]
  findings:
    - id: "APP-001"
      owasp_category: "A01 — Quebra de Controle de Acesso"
      cwe: "CWE-284"
      title: "{achado}"
      severity: "CRITICAL | HIGH | MEDIUM | LOW"
      location: "{arquivo:linha ou endpoint}"
      description: "{descrição detalhada}"
      remediation: "{correção específica com exemplo de código}"
      cheat_sheet: "{URL do OWASP cheat sheet}"
  remediation_plan:
    critical: ["{correções imediatas}"]
    high: ["{esta sprint}"]
    medium: ["{próxima sprint}"]
    low: ["{backlog}"]
```

## Condições de Veto

- **NUNCA** teste áreas autenticadas sem credenciais de teste adequadas
- **NUNCA** tente ataques destrutivos contra sistemas de produção
- **NUNCA** ignore achados só porque são classificados como BAIXOS
- **NUNCA** recomende segurança por obscuridade como remediação
- **NUNCA** pule a verificação manual dos resultados do scanner automatizado

## Critérios de Conclusão

- [ ] Modelo de ameaças criado com análise STRIDE
- [ ] Revisão de código concluída (se a fonte estiver disponível)
- [ ] Todas as categorias do OWASP Top 10 testadas
- [ ] Falsos positivos eliminados por meio de verificação manual
- [ ] Cada achado mapeado para a categoria OWASP e CWE
- [ ] Plano de remediação com exemplos de correção em nível de código
- [ ] Referências de codificação segura fornecidas para cada achado
