---
task: runRecon()
responsavel: "@cartographer"
responsavel_type: Agent
atomic_layer: Task
elicit: true

Entrada:
  - campo: target
    tipo: string
    origem: User Input
    obrigatorio: true
  - campo: target_type
    tipo: string
    origem: User Input
    obrigatorio: true

Saida:
  - campo: recon_report
    tipo: string
    destino: Console
    persistido: false

Checklist:
  - "[ ] Reconhecimento passivo e ativo concluído"
  - "[ ] Enumeração de diretórios e serviços concluída"
  - "[ ] Superfície de ataque mapeada com alvos de alto valor identificados"
tipo: nota
area: Egide
up: "[[Egide/_MOC-egide]]"
relacionado:
  - "[[Egide/tasks/_indice|_indice]]"
---

# Tarefa: Reconhecimento & Enumeração

**ID da Tarefa:** CYBER-006
**Versão:** 1.0.0
**Comando:** `*run-recon`
**Agente:** Cartographer (cartographer) + Dirber (dirber)
**Propósito:** Conduzir reconhecimento e enumeração sistemáticos de alvos autorizados.

---

## Entradas

| Entrada | Origem | Obrigatória |
|-------|--------|----------|
| `target` | Especificação do usuário | SIM |
| `target_type` | Domínio, IP, faixa, webapp | SIM |
| `authorization` | Confirmação do usuário | SIM |
| `depth` | shallow, standard, deep | NÃO (padrão: standard) |
| `stealth_required` | Booleano | NÃO (padrão: false) |
| `known_information` | Inteligência prévia | NÃO |

## Pré-condições

1. O alvo está dentro do escopo autorizado
2. Autorização confirmada para varredura ativa
3. Tipo de alvo identificado (domínio, faixa de IP, aplicação web)
4. Conectividade de rede com o alvo verificada

## Fases de Execução

### Fase 1: Reconhecimento Passivo (cartographer)

1. **Inteligência de DNS** — Registros DNS (A, AAAA, MX, NS, TXT, CNAME, SOA), transferências de zona
2. **WHOIS & Registro** — Registro de domínio, registrar, nameservers, criação/expiração
3. **Transparência de Certificados** — Certificados SSL, subdomínios via logs de CT (crt.sh)
4. **Coleta de OSINT** — Google dorking, consultas Shodan, Censys, bancos de dados públicos de vazamentos
5. **Coleta de E-mails** — Coletar padrões de e-mail, validar endereços (se em escopo)
6. **Fingerprinting de Tecnologia** — Detecção estilo Wappalyzer, cabeçalhos HTTP, meta tags
7. **Recon de Redes Sociais** — Enumeração de funcionários no LinkedIn, repositórios do GitHub (se em escopo)
8. Compile os achados passivos em um inventário estruturado

### Fase 2: Reconhecimento Ativo (cartographer)

1. **Descoberta de Hosts** — Ping sweep, ARP scan (redes locais), descoberta via TCP SYN
2. **Varredura de Portas** — Varredura completa de TCP, principais portas UDP, detecção de versão de serviço
3. **Fingerprinting de Serviços** — Banner grabbing, identificação de protocolo
4. **Detecção de SO** — Fingerprinting da pilha TCP/IP, análise de TTL
5. **Análise de SSL/TLS** — Detalhes de certificado, cipher suites, versões de protocolo, vulnerabilidades
6. **Topologia de Rede** — Traceroute, análise de saltos, detecção de firewall/WAF
7. Se a furtividade for requerida: reduza a taxa de varredura, use SYN scans, randomize a ordem das portas

### Fase 3: Enumeração (dirber)

1. **Enumeração de Diretórios Web** — Caminhos comuns, arquivos de backup, painéis de administração
2. **Descoberta de Virtual Hosts** — Brute-force de subdomínios, enumeração de vhosts
3. **Descoberta de Endpoints de API** — Caminhos comuns de API, endpoints de versão, URLs de documentação
4. **Enumeração de Usuários** — Formulários de login, registro, redefinição de senha (diferenças de tempo/resposta)
5. **Varredura de Extensões de Arquivo** — Tipos de arquivo sensíveis (.bak, .sql, .env, .git, .DS_Store)
6. **Detecção de CMS** — Enumeração de plugins/temas do WordPress, Drupal, Joomla
7. **Descoberta de Parâmetros** — Parâmetros GET/POST ocultos, parâmetros de debug

### Fase 4: Correlação & Relatório

1. Cruze os achados passivos e ativos — valide o OSINT com os resultados da varredura
2. Identifique a superfície de ataque — serviços expostos, endpoints interessantes, potenciais pontos de entrada
3. Mapeie as relações — subdomínio para IP, serviço para tecnologia, usuário para papel
4. Destaque os alvos de alto valor — painéis de administração, gateways de API, sistemas legados, dev/staging
5. Gere o documento de perfil do alvo com vetores de ataque priorizados
6. Recomende os próximos passos — varredura de vulnerabilidades, áreas de foco específicas do pentest

## Formato de Saída

```yaml
recon_report:
  target: "{alvo}"
  recon_agent: "cartographer + dirber"
  depth: "shallow | standard | deep"
  stealth_mode: false
  passive_findings:
    dns_records: ["{registros}"]
    subdomains: ["{lista de subdomínios}"]
    technologies: ["{stack tecnológico}"]
    emails: ["{e-mails coletados}"]
  active_findings:
    hosts: ["{hosts ativos}"]
    open_ports: ["{mapeamentos porta:serviço}"]
    os_detection: ["{fingerprints de SO}"]
    ssl_issues: ["{achados de TLS}"]
  enumeration:
    directories: ["{caminhos descobertos}"]
    api_endpoints: ["{caminhos de API}"]
    interesting_files: ["{arquivos sensíveis}"]
  attack_surface:
    high_value_targets: ["{alvos priorizados}"]
    potential_vectors: ["{caminhos de ataque}"]
    recommended_next_steps: ["{ações}"]
```

## Condições de Veto

- **NUNCA** faça varredura de alvos sem autorização
- **NUNCA** realize varreduras ativas quando apenas o recon passivo foi autorizado
- **NUNCA** tente explorar vulnerabilidades descobertas durante o recon
- **NUNCA** enumere usuários para fins de credential stuffing
- **NUNCA** ignore os requisitos de furtividade quando especificados

## Critérios de Conclusão

- [ ] Reconhecimento passivo concluído com achados estruturados
- [ ] Varredura ativa executada dentro do escopo autorizado
- [ ] Enumeração de diretórios e serviços concluída
- [ ] Achados correlacionados e cruzados
- [ ] Superfície de ataque mapeada com alvos de alto valor identificados
- [ ] Próximos passos recomendados para avaliação adicional
