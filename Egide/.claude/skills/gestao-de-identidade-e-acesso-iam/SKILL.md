---
name: gestao-de-identidade-e-acesso-iam
description: >-
  Use quando precisar endurecer ou auditar identidade e acesso: IAM de nuvem (menor
  privilégio, permission boundaries, Access Analyzer), Active Directory (modelo em camadas
  Tier 0/1/2, PAW, hardening de ACL/Kerberos), federação e SSO (SAML/OIDC/SCIM com Okta/Entra),
  governança de identidade (lifecycle joiner/mover/leaver, role mining), e acesso privilegiado
  (PAM/cofre, zero standing privilege, rotação e monitoração de sessão). Também detecção de
  abuso de identidade: golden ticket, DCSync, escalonamento de privilégio em IAM, consentimento
  OAuth suspeito. Eixo de IAM da Égide — endurecer e detectar, nunca explorar diretório alheio.
domain: ciberseguranca
subdomain: identity-access-management
tags: [iam, identidade, active-directory, kerberos, rbac, pam, sso, saml, oauth, scim, least-privilege, governanca]
---

# Gestão de Identidade e Acesso (IAM)

> Escopo defensivo. Audite/endureça apenas diretórios e contas que você administra ou foi
> autorizado a avaliar. As técnicas ofensivas correlatas (Kerberoast, AD CS ESC1-8, BloodHound em
> modo ataque, golden ticket forjado) NÃO fazem parte desta habilidade — aqui está o lado de
> hardening + detecção. Mudança de IAM/AD pode trancar administradores: teste e tenha rollback.

## O que é

Identidade é o novo perímetro. A Égide tocava IAM só pelo viés ofensivo (peter-kim). Esta
habilidade consolida o **lado defensivo de toda a cadeia de identidade**: provisionar e escopar
acesso com menor privilégio, blindar o diretório, federar com segurança, governar o ciclo de vida
e cofrar o acesso privilegiado — e detectar quando alguém abusa de uma identidade.

## Método

### 1. Menor privilégio em IAM de nuvem
- Escope policies ao mínimo necessário; aplique **permission boundaries** para teto de blast radius;
  remova permissões não usadas que o **Access Analyzer** reporta.
- Elimine chaves de acesso de root, force MFA, migre de access keys de longa vida para **roles de
  curta duração** assumidas sob demanda.
- (No nível de nuvem isto se cruza com `seguranca-de-cloud-multi-provider`; aqui o foco é a
  modelagem de identidade, lá é a postura geral da conta.)

### 2. Hardening de Active Directory
- **Modelo em camadas (ESAE / Tier 0/1/2)**: separe contas administrativas por nível de ativo
  (Tier 0 = controladores de domínio e identidade; nunca faça logon de credencial Tier 0 em host de
  tier inferior). Use **PAW** (Privileged Access Workstation) e **authentication policy silos**.
- Audite **abuso de ACL** no AD (delegações perigosas, GenericAll/WriteDACL), endureça **Kerberos**
  (delegação irrestrita, contas com SPN e senha fraca), e hardening de **LDAP** (signing/channel binding).
- Mitigue roubo de credencial: Protected Users, LAPS, restrição de logon, e desativação de protocolos
  legados.

### 3. Federação, SSO e provisionamento
- Configure **SAML/OIDC SSO** (Okta/Entra) com MFA forte e **conditional access**; aplique
  **minimização de escopo OAuth2** e revise consentimentos de aplicação.
- Automatize provisionamento com **SCIM** para que joiner/mover/leaver reflitam no IdP sem contas órfãs.

### 4. Governança de identidade (IGA)
- Implemente o **lifecycle joiner/mover/leaver** com governança (SailPoint e equivalentes): toda
  identidade tem dono, prazo e revisão de acesso (**access certification**).
- Faça **role mining** para otimizar RBAC — derive papéis dos padrões reais de acesso em vez de
  conceder ad hoc.

### 5. Acesso privilegiado (PAM)
- **Cofre** credenciais privilegiadas (CyberArk e equivalentes): descobrir → vault → rotacionar →
  monitorar. Isole sessão (a senha nunca chega ao operador), grave a sessão privilegiada e busque
  **zero standing privilege** (privilégio concedido just-in-time, expira sozinho).
- Mantenha **PAW** e descoberta contínua de contas privilegiadas órfãs/novas.

### 6. Detecção de abuso de identidade
- **AD/Kerberos**: golden ticket (anomalia de TGT/lifetime), **DCSync** (replicação fora de DC),
  abuso de AD CS, criação suspeita de conta admin.
- **Nuvem**: escalonamento de privilégio em IAM (anexar policy a si mesmo), **abuso de service
  principal** (Azure), roubo/uso de token OAuth, consentimento de app malicioso, device-code phishing.
- Pontue confiança e correlacione no SIEM; handoff de IOC → `inteligencia-de-ameacas-cti`.

### Detecção de ataques em Active Directory (defensivo)

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G24, MIT) — DEFENSIVA APENAS, veto ofensivo da Égide preservado._

> **DEFENSIVA APENAS.** O veto ofensivo da Égide se aplica integralmente. Esta seção descreve **como detectar** e **como prevenir** ataques contra AD; nunca **como executar**.

**Por que importa:** AD é alvo recorrente em ransomware — comprometer Domain Controller = comprometer toda a empresa. Detecção precoce em horas vs. dias muda o desfecho de um incidente.

#### Kerberoasting (T1558.003)

**O que é (descrição mínima do IoC):** atacante autenticado solicita TGS para Service Principal Name (SPN) de service account, recebe ticket criptografado com a senha hash do SA, e quebra offline.

**Sinais de detecção:**
- Event ID 4769 (TGS request) com `Ticket Encryption Type = 0x17` (RC4-HMAC) — RC4 é fraco e é o que o atacante força para acelerar quebra offline. Em ambientes modernos, AES (0x12) deve ser default.
- Alto volume de 4769 de um único principal em curto intervalo (atacante quer enumerar)
- 4769 para contas com `ServicePrincipalName` setado em contas privilegiadas (Domain Admin com SPN = alarme vermelho)

**Sigma rule esqueleto:**
```yaml
detection:
  selection:
    EventID: 4769
    TicketEncryptionType: '0x17'
  condition: selection
```

**Mitigação:**
- Service accounts → **gMSA (Group Managed Service Accounts)** — senha gerenciada pelo AD, rotação automática, 128 chars
- Deny RC4 em política de domínio (force AES)
- Auditar SPNs em contas privilegiadas (`Get-ADUser -Filter {ServicePrincipalName -ne $null}` defensivo)
- Senhas de service account ≥ 25 chars (resistente a brute force offline)

#### AS-REP Roasting (T1558.004)

**O que é:** contas com `DONT_REQ_PREAUTH` flag (pre-autenticação Kerberos desabilitada) emitem ticket inicial sem proof-of-possession — atacante recebe ciphertext crackable.

**Sinais de detecção:**
- Event ID 4768 (TGT request) com `Pre-Authentication Type = 0` para contas que não deveriam ter
- Account com `DONT_REQ_PREAUTH` em LDAP (auditoria preventiva)

**Mitigação:**
- Auditoria periódica: nenhuma conta deveria ter `DONT_REQ_PREAUTH` exceto casos legacy explicitamente justificados
- Remover flag onde possível (script de remediação)

#### DCSync (T1003.006)

**O que é:** atacante com privilégio `Replicating Directory Changes` simula um Domain Controller e solicita replicação de senhas (`GetNCChanges` RPC) — recebe NTDS.dit hashes.

**Sinais de detecção:**
- Event ID 4662 com `Properties` contendo `1131f6aa-9c07-11d1-f79f-00c04fc2dcd2` (Replicating Directory Changes GUID)
- Origem de IP que NÃO é um Domain Controller — alarme vermelho
- Conta executando que NÃO está na lista esperada (apenas DC computer accounts + replicação accounts conhecidas)

**Sigma rule esqueleto:**
```yaml
detection:
  selection:
    EventID: 4662
    Properties|contains: '1131f6aa-9c07-11d1-f79f-00c04fc2dcd2'
  filter_known_dc:
    SubjectUserName|endswith: '$'  # DC computer accounts terminam em $
  condition: selection and not filter_known_dc
```

**Mitigação:**
- Princípio de menor privilégio: ninguém além de DCs deveria ter `Replicating Directory Changes`
- Auditar mensalmente quem tem o privilégio
- Tier model (Microsoft Enhanced Security Admin Environment, ESAE) — separar admin de domínio em forest dedicada

#### Golden Ticket / Silver Ticket (T1558.001, T1558.002)

**O que é:** atacante com hash do KRBTGT account forja TGT com privilégios arbitrários (Golden) ou TGS para serviço específico (Silver).

**Sinais de detecção:**
- TGT com `Lifetime` anormalmente longo (>10h padrão)
- TGT request (4768) seguido por TGS request (4769) com Encryption mismatch
- Activity logs em DC sem 4768 correspondente para usuário ativo (TGT "do nada")
- Anomalia comportamental: usuário acessando recursos fora de padrão

**Mitigação:**
- Rotação periódica de KRBTGT password (2x consecutivas para invalidar tickets existentes)
- Reduzir Maximum Kerberos Token Lifetime (default 10h → 4-8h)
- Monitorar uso de KRBTGT account (deveria ser zero)
- Honey tokens (contas isca com SPN — qualquer 4769 para essas = atacante)

#### Pass-the-Hash / Over-Pass-the-Hash (T1550.002)

**O que é:** atacante reusa hash NTLM ou usa hash para forjar TGT.

**Sinais de detecção:**
- Logon Type 9 (NewCredentials) — NTLM em ambiente que deveria ser Kerberos-only
- Event ID 4624 com NTLM Authentication Package em DC ou server crítico
- Comportamento anômalo: usuário logando de host que normalmente não acessa

**Mitigação:**
- Desativar NTLM onde possível (gradual: audit → restrict → deny)
- Protected Users group + Authentication Policy Silos
- Credential Guard (Windows 10/11) — isolamento de LSASS

#### Ferramentas defensivas (foco em detecção, não em ataque)

- **Microsoft Defender for Identity** (antigo Azure ATP) — detecção comportamental cross-AD
- **Splunk Enterprise Security / Microsoft Sentinel** — Sigma + KQL rules
- **BloodHound — modo defensivo** (auditoria de attack paths, não execução) — apenas para mapeamento defensivo de tier model
- **PingCastle** — gratuita, gera relatório de maturidade AD com Score
- **Purple Knight** (Semperis) — health check AD

#### Hardening preventivo

- **Tier model** (Microsoft ESAE):
  - Tier 0 (DCs, ADFS, PKI) — máxima proteção
  - Tier 1 (Servers business)
  - Tier 2 (Workstations user)
  - Sem credencial Tier 0 jamais usada em Tier 1/2
- **Privileged Access Workstation (PAW)** — admin só de máquina dedicada limpa
- **Just-In-Time / Just-Enough-Admin** (JIT/JEA)
- **MFA em DC RDP** (Smart Card ou FIDO2)
- **Backup offline de NTDS.dit** + DRP testado

#### Anti-padrões defensivos

- Acreditar que "MFA no usuário" basta (atacante após Kerberoast já tem hash, não precisa MFA)
- Detecção por nome de ferramenta (assinatura) — atacante muda nome rápido; foco em comportamento/IoCs
- Tier model "no papel" mas admin de domínio loga em qualquer máquina (anula)
- KRBTGT nunca rotacionado (senha eterna)
- Honeytoken sem alerta atado a SIEM

## Entrega
Plano de identidade: matriz de menor privilégio (achados + remediação), desenho Tier 0/1/2 do AD,
configuração de SSO/SCIM, processo de governança de lifecycle, política de PAM/cofre, e regras de
detecção de abuso de identidade para o SIEM.

## Ferramentas de referência (defensivas)
AWS IAM Access Analyzer / permission boundaries, Okta/Entra (SSO, SCIM, conditional access),
SailPoint (IGA), CyberArk (PAM), BloodHound CE (em modo **defensivo**: mapear e podar caminhos de
ataque que você possui), audit logs de DC/Kerberos para detecção.

## Incremental (não nesta leva)
PIM do Entra detalhado, identity federation com SAML+Azure AD passo a passo, privileged session
monitoring avançado e honeytokens de AD ficam adiados — ver relatório de perda. Toda a vertente
ofensiva de AD (BloodHound-ataque, ESC1-8, Kerberoast, simulação de ataque ao diretório) é
**barrada** (dual-use).

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f` (Apache-2.0), cluster G8 — identity & access
management (~43 skills; representativas: `securing-aws-iam-permissions`,
`configuring-active-directory-tiered-model`, `implementing-privileged-access-management-with-cyberark`,
`building-identity-governance-lifecycle-process`, `implementing-saml-sso-with-okta`,
`detecting-golden-ticket-attacks-in-kerberos-logs`). Método extraído e reescrito em PT-BR; só a
camada defensiva; sem cópia literal; scripts ofensivos excluídos.*
