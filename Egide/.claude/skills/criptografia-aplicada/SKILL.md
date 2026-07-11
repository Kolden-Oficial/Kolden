---
name: criptografia-aplicada
description: >-
  Use quando for auditar ou desenhar o uso de criptografia num sistema — escolher
  algoritmo e modo, validar armazenamento de senha, revisar uso de TLS/PKI,
  gestão e rotação de chaves, ou caçar os antipadrões cripto clássicos (ECB,
  IV/nonce reusado, hash de senha sem custo, segredo hardcoded). É o eixo de
  criptografia aplicada da Égide. Defensivo: avalia e corrige implementação, não
  quebra cifra.
domain: ciberseguranca
subdomain: criptografia
tags: [cripto, tls, pki, hashing, chaves, kms, aead, antipadroes]
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Criptografia Aplicada

> Regra zero: **não invente cripto e não role a sua própria primitiva.** Use
> bibliotecas reconhecidas e de alto nível; o trabalho de segurança aqui é
> **usar corretamente** o que já é forte e **achar o mau uso** — quase toda falha
> real é de implementação/configuração, não de matemática quebrada.

## Os usos e como auditar cada um

### 1. Cifragem de dados (em repouso e em trânsito)
- **Em repouso**: cifragem autenticada (**AEAD**, ex. AES-GCM ou
  ChaCha20-Poly1305). Antipadrões a caçar: **modo ECB** (vaza padrão do
  plaintext), **IV/nonce fixo ou reutilizado**, cifra sem autenticação (permite
  adulteração), chave embutida no código.
- **Em trânsito**: TLS atual (1.2+ / preferir 1.3), suites fortes, sem protocolo
  obsoleto (SSLv3/TLS 1.0/1.1), validação de certificado **ligada** (não
  desabilitar verificação "pra funcionar"), HSTS no web.

### 2. Hashing e senhas (não confundir com cifragem)
- **Senha**: função de derivação **com custo** e salt por usuário — Argon2id
  (preferível), scrypt ou bcrypt. Antipadrão grave: MD5/SHA-1/SHA-256 "cru" para
  senha (rápido demais, quebrável por força bruta), salt global ou ausente.
- **Integridade**: SHA-256+/SHA-3 para hash de conteúdo; **HMAC** para
  autenticação de mensagem com chave.
- Comparação de segredos em **tempo constante** (evita timing attack).

### 3. Chaves e segredos (o elo mais fraco)
- **Geração**: somente CSPRNG (gerador criptograficamente seguro), nunca
  `rand()`/seed previsível.
- **Armazenamento**: chave/segredo **nunca** no código, repo ou imagem — em cofre
  (KMS/HSM). Na Kolden, **sempre Infisical** (ver `infisical-padrao`).
- **Ciclo de vida**: rotação periódica, escopo/menor-privilégio por chave,
  revogação, separação entre ambientes. Hierarquia de chaves (chave de dados
  envelopada por chave-mestra).

### 4. PKI e certificados
- Cadeia de confiança válida, expiração monitorada, sem certificado
  auto-assinado em produção, chave privada protegida, transparência de
  certificado para detectar emissão indevida (cruza defesa anti-phishing).

### 5. Assinatura e verificação
- Assinatura para integridade/autenticidade de artefato/atualização (cruza OWASP
  A08); **verificar** a assinatura é tão importante quanto assinar.

## Checklist de antipadrões (o que procurar numa auditoria)
- Algoritmo obsoleto/proibido (DES, RC4, MD5/SHA-1 para segurança, ECB).
- IV/nonce reutilizado ou previsível; cifra sem autenticação (sem AEAD/MAC).
- Senha sem KDF de custo; salt ausente ou global.
- Segredo/chave hardcoded em código, config versionada ou imagem de container.
- Validação de certificado TLS desligada; protocolo TLS obsoleto.
- Aleatoriedade fraca (PRNG não-cripto) para chave/token/IV.
- Comparação de segredo não-tempo-constante.
- "Cripto caseira" / primitiva implementada à mão.

## Critérios de validação
- Toda cifragem de dado usa AEAD com nonce único; nenhum ECB.
- Senha usa Argon2id/scrypt/bcrypt com salt por usuário; nada de hash cru.
- Nenhuma chave/segredo no código — tudo em cofre (Infisical/KMS) com rotação.
- TLS atual com validação de certificado ligada; sem protocolo obsoleto.
- Aleatoriedade de segredos vem de CSPRNG.

## Sobreposição resolvida
A classe **A02 Cryptographic Failures** do OWASP aponta para cá a partir de
`seguranca-de-aplicacoes-web-owasp`; a validação de **JWT/token** referida em
`seguranca-de-api` aprofunda no item de assinatura/HMAC aqui. A gestão de segredos
no pipeline (secret-scan) é de `devsecops-sast-dast-em-ci`.

## Herança histórica

**Bruce Schneier** — criptógrafo e escritor de segurança desde os anos 1990; sua obra reformulou o campo ao mostrar que segurança é sistema, não fórmula, e que quase toda falha real é de implementação, não de matemática. Referências primárias: *Applied Cryptography* (2ª ed., 1996, Wiley) e *Secrets and Lies: Digital Security in a Networked World* (2000, Wiley); ensaios em `schneier.com/blog`.

**Colin Percival** — autor do KDF **scrypt** (2009), padrão de derivação de chave resistente a hardware específico. **Daniel J. Bernstein (djb)** — desenhista de Curve25519 (2005), ChaCha20 (2008) e Poly1305 (2005), a família de primitivas modernas usada em TLS 1.3 e em quase todo AEAD sério.

**Frameworks canônicos herdados**:
- Regra "não role sua própria cripto" (Schneier) — use primitivas revisadas por pares; o trabalho é usá-las certo.
- AEAD como padrão de cifragem (ChaCha20-Poly1305/AES-GCM) — cifra + autentica de uma vez, sem MAC-then-encrypt caseiro.
- Argon2id / scrypt / bcrypt para senha — KDF com custo memória/CPU, nunca hash cru.
- Hierarquia de chaves envelopadas (data key ⊂ master key ⊂ HSM) — origem dos padrões KMS modernos.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster
G20 (cryptography — análise criptográfica, gestão de chaves, auditoria de
implementação cripto/PKI, ~16 skills). Método extraído e reescrito em PT-BR;
nenhuma cópia literal.*
