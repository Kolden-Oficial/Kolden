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
