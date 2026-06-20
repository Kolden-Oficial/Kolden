# Egide — Squad de Cybersecurity (Segurança)

Egide é um squad de 15 agentes para operações de segurança ofensivas e defensivas, orquestrado pelo Cyber Chief sob um framework ético rígido (autorização sempre primeiro). Reúne especialistas baseados em pessoas reais (Chris Sanders, Marcus Carey, Omar Santos, Jim Manico, Georgia Weidman, Peter Kim) e ferramentas operacionais (reconhecimento, enumeração, fuzzing, quebra de credenciais, exploração, OSINT e geração de comandos), cobrindo pentest, red team, blue team, AppSec, gestão de vulnerabilidades e resposta a incidentes.

## Agentes (15)

| Agente | Tier | Papel |
|--------|------|-------|
| **cyber-chief** | 0 | Orquestrador — avalia ameaças, roteia operações, mantém os portões éticos |
| **peter-kim** | 1 | Teste de penetração / Red Team — metodologia de engajamento (PTES/OWASP) |
| **georgia-weidman** | 1 | Segurança mobile / Desenvolvimento de exploits — pentest de dispositivos e apps |
| **jim-manico** | 1 | Segurança de aplicações / Codificação segura — OWASP, ASVS, modelagem STRIDE |
| **chris-sanders** | 1 | Monitoramento de segurança de redes / Blue Team — análise de pacotes, teoria da investigação, honeypots |
| **omar-santos** | 1 | Gestão de vulnerabilidades / Resposta a incidentes — CVE, CSAF, VEX, SBOM, segurança de IA |
| **marcus-carey** | 1 | Liderança de segurança / Inteligência de ameaças — construção de equipes, BAS, carreira |
| **command-generator** | 2 | Geração de comandos — sintaxe precisa para ferramentas ofensivas e defensivas |
| **cartographer** | 2 | Reconhecimento — mapeamento de superfície de ataque e topologia de rede |
| **busterer** | 2 | Enumeração — descoberta de conteúdo web e endpoints |
| **dirber** | 2 | Enumeração de serviços — SMB, LDAP, SNMP, RPC, NFS, Active Directory |
| **fuzzer** | 2 | Fuzzing — teste de entradas, injeção, manipulação de parâmetros |
| **ripper** | 2 | Ataques a credenciais — quebra de hashes e avaliação de políticas de senha |
| **rogue** | 2 | Exploração — pós-exploração, escalada de privilégios, movimento lateral |
| **shannon-runner** | 2 | OSINT — coleta e análise de inteligência de fontes abertas |

## Como Ativar

```
@cyber-chief          # Ativa o orquestrador
*diagnose             # Triagem do seu desafio de segurança
*assess-security      # Avaliação de postura de segurança
*run-pentest          # Executa um teste de penetração
*respond-incident     # Lida com um incidente de segurança
```

Você também pode invocar um especialista diretamente (ex.: `@chris-sanders`, `@omar-santos`) e usar os comandos `*` específicos de cada agente.

## Workflows

- **wf-pentest-engagement** — Engajamento completo de pentest: verificar autorização → cartographer (recon) → dirber/busterer (enumeração) → fuzzer (teste de entradas) → rogue (exploração) → peter-kim (metodologia) → relatório.
- **wf-incident-response** — Resposta a incidentes: omar-santos (metodologia de RI) → chris-sanders (análise de pacotes) → marcus-carey (inteligência de ameaças) → relatório.

## Componentes

- **15 agentes**, **9 tasks**, **2 workflows**, **1 checklist**

## Requisitos

- AIOS >= 4.0.0

<!-- ritual-de-encerramento-central -->
## Ritual de Encerramento (auto-aprendizado obrigatório)
Todo agente deste squad, sempre que for acionado, ao final da sessão deve aprender algo. Antes de
encerrar uma sessão com trabalho, acione a habilidade `ritual-de-encerramento` — reflita, extraia
lições verificadas e grave-as na memória própria do agente (`<projeto>/agent-memory/<agent-id>.md`).
Fonte única: `C:\Kolden\.claude\skills\ritual-de-encerramento\SKILL.md`. O reflexo `Stop` dispara
isso automaticamente quando a sessão roda a partir da raiz do workspace.
