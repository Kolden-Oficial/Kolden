---
name: auditoria-de-smart-contracts
description: >-
  Use quando precisar auditar a segurança de um smart contract (Solidity/EVM) antes
  de deploy em testnet/mainnet, ao revisar um projeto Foundry, ou ao triar um relatório
  de Slither/Aderyn/Mythril. Cobre análise estática, execução simbólica, testes de
  propriedade (fuzz + invariantes), revisão manual contra checklist e higiene de chaves
  no deploy. Eixo blockchain da Égide — auditoria defensiva de contrato que move valor.
domain: ciberseguranca
subdomain: blockchain-security
tags: [blockchain, smart-contract, solidity, evm, foundry, slither, mythril, fuzzing, defi]
---

# Auditoria de Smart Contracts

> Contrato que move valor (tokens, vault, staking, AMM, bridge, governança) é alvo de altíssimo
> retorno para o atacante e **imutável** após deploy: o bug vai para produção para sempre. Static
> analyzer gera muito falso-positivo — separar bug real de ruído é parte do trabalho, não atalho.
> Auditoria não garante ausência de bug; reduz risco.

## O que é

Smart contracts EVM executam com dinheiro real e código público. Esta habilidade dá o método em
camadas para auditar um projeto Foundry/Solidity: do rápido-automatizado ao caro-manual, fechando
com higiene de deploy.

## Método

### 1. Build e sanidade
- Compile o projeto (`foundry.toml`, `src/`, `test/`, `script/`); confirme que builda limpo e que
  há testes. Cobertura desconhecida das funções que movem valor é red flag.

### 2. Análise estática (rápida, sempre)
- Rode **Slither/Aderyn**. Catálogo de classes a procurar: reentrância, controle de acesso
  ausente/incorreto, overflow/underflow (pré-0.8 ou unchecked), `delegatecall` perigoso,
  `tx.origin` para auth, randomness fraca, oracle manipulável, padrão checks-effects-interactions
  violado.

### 3. Execução simbólica (opcional, lento)
- Em contratos críticos, rode **Mythril** ou equivalente para explorar caminhos que o teste manual
  não cobre. Custoso — reserve para o núcleo que move valor.

### 4. Testes de propriedade (fuzz + invariantes)
- Escreva **invariantes** (ex.: soma de saldos == totalSupply; vault nunca paga mais do que tem) e
  deixe o fuzzer do Foundry buscar contraexemplo. Mais valioso que teste de caso isolado.

### 5. Revisão manual contra checklist
- Olho humano nas funções que movem valor: ordem de efeitos, reentrância, arredondamento,
  upgradeabilidade (proxy/`delegatecall`), integração de oracle, chamadas externas, pausabilidade,
  controle de acesso por papel.

### Auditoria de controle de acesso e escalação de privilégio

> _Seção absorvida de github.com/msitarzewski/agency-agents@a597cb6 (G11, MIT)._

Cobre os padrões mais explorados em contratos Solidity, foco em RBAC, ownership e upgrade. O checklist
de §5 marca "controle de acesso ok/não ok"; esta seção dá o método para chegar nesse veredito.

**1. Padrões de ownership**
- `Ownable` (OpenZeppelin) — modifier `onlyOwner`, `transferOwnership` em 1 ou 2 etapas. `Ownable2Step`
  é o padrão moderno: transferência em 2 etapas (proposta + aceitação) previne envio para endereço
  errado/inexistente.
- Auditar: quem pode chamar `transferOwnership`? `renounceOwnership` está protegido contra chamada
  acidental (ou removido, se o contrato não pode ficar sem dono)?
- Risco: owner com poderes ilimitados sobre o contrato (mint, pause, upgrade, withdraw) é
  single-point-of-failure — se a chave do owner vaza, o contrato cai. Mitigar com multisig + timelock.

**2. RBAC (`AccessControl` da OpenZeppelin)**
- Define papéis como `bytes32` — `DEFAULT_ADMIN_ROLE` controla a concessão/revogação de todos os
  outros papéis.
- Auditar:
  - Quem tem `DEFAULT_ADMIN_ROLE`? Em produção, deve ser timelock + multisig — nunca EOA quente.
  - `grantRole` / `revokeRole` — quem pode chamar? Há trilha de auditoria (evento) em cada mudança?
  - Hierarquia de papéis — algum papel não-admin pode escalar para outro mais poderoso?
  - `_setupRole` em `initialize` sem guard de inicialização = risco de bootstrap (qualquer um chama
    primeiro e fica com o papel).

**3. Padrões de `initialize` (UUPS / Transparent Proxy)**
- Proxy upgradeable exige separação clara: a implementação tem `initialize()` no lugar do constructor
  (constructor não roda no contexto do proxy).
- **CRÍTICO:** `initialize` SEM o modifier `initializer` (ou `reinitializer(versao)`) = qualquer um
  re-inicializa e toma o controle. Bug recorrente em deploys novos.
- `_disableInitializers()` no constructor da implementação previne ataque direto contra a
  implementação (o atacante chamaria `initialize` direto na implementação, fora do proxy, e tomaria o
  owner-slot dela — pré-requisito para alguns vetores de upgrade).
- Auditar: `initialize` está protegido por `initializer`? `_disableInitializers()` foi chamado no
  constructor da implementação? Storage gaps (`uint256[N] __gap`) reservados para upgrades futuros sem
  colisão de slot?

**4. Autorização de upgrade (UUPS)**
- `_authorizeUpgrade(address newImplementation)` precisa ter modifier de controle de acesso
  (`onlyOwner`, `onlyRole(UPGRADER_ROLE)`). Sem modifier = qualquer um faz upgrade para um contrato
  malicioso e drena o vault.
- Auditar: a autoridade de upgrade é multisig + timelock? O timelock cria janela de aviso obrigatória
  (24-72h típicas) — usuário vê a chamada agendada e pode sair antes do upgrade malicioso ser
  efetivado. Sem timelock, rug-pull é instantâneo.

**5. Rotação e revogação de papel**
- Em emergência (chave comprometida, insider rogue), o time precisa revogar papel em segundos.
- Auditar: existe `emergencyRevoke` ou caminho equivalente fora do timelock para
  `DEFAULT_ADMIN_ROLE`? A função `pause` é independente do owner (controlada por papel separado), para
  o caso de o owner estar comprometido?
- Multisig + threshold dinâmico para rotação (ex.: 3-de-5 para operação normal, 4-de-5 para rotação
  de papel crítico).

**6. Padrões de escalação a procurar na leitura**
- `tx.origin` em modifier de controle de acesso = vulnerável a phishing (contrato intermediário
  malicioso faz a vítima assinar e chama o alvo; `tx.origin` ainda é a vítima).
- Função `public` que deveria ser `internal` (esquecimento de visibilidade — qualquer um chama).
- `payable` em função admin que não deveria receber valor (vetor de drenagem de gas via fallback).
- Modifier ausente em função sensível — falha clássica de revisão; o checklist precisa exigir
  marcação explícita de "esta função é admin?".
- Reentrância em função admin é rara, mas `delegatecall` para contrato externo controlado por
  parâmetro muda as regras e pode reescrever storage.

**7. Ferramentas defensivas**
- **Slither**: detectores `unprotected-upgrade`, `arbitrary-send`, `delegatecall-loop`,
  `incorrect-modifier`.
- **Mythril**: análise simbólica de paths de escalação — encontra sequência de chamadas que leva a
  estado privilegiado.
- **OpenZeppelin Contracts**: use versão auditada, nunca reimplemente `Ownable`/`AccessControl` à
  mão. Pin a versão no `foundry.toml`.
- **Forge `vm.startPrank(address)`**: invariante de controle de acesso testável — "endereço não-admin
  X nunca consegue chamar função Y" como propriedade fuzzada.

**Anti-padrões**
- Ownership transferido para EOA (proteja com multisig + timelock).
- `initialize` sem modifier `initializer`.
- Autoridade de upgrade = mesmo endereço que paga gas do dia-a-dia (chave quente exposta).
- Hierarquia de papéis circular (papel A concede B, B concede A).
- `grantRole` para papel crítico sem passar por timelock.
- `_disableInitializers()` esquecido no constructor da implementação.

### 6. Higiene de chave e deploy seguro
- Chave de deploy em **keystore criptografado**, nunca em `.env` em texto puro. Verifique o script de
  deploy. (Coerente com a regra de segredos da Kolden — Infisical.)

### 7. Triagem e laudo
- Consolide achados de todas as camadas, **deduplique e separe falso-positivo**, classifique por
  severidade/exploitabilidade e entregue com recomendação de correção.

## Entrega
Laudo de auditoria: achados por severidade (estático + simbólico + invariante quebrada + revisão
manual) com PoC conceitual e correção sugerida, mais veredito de higiene de chave. Para projetos de
valor alto, recomende auditoria externa adicional.

## Incremental (não nesta leva)
Resposta a incidente on-chain (rastreio de wallet, análise de exploit pós-fato) e cadeias não-EVM
ficam adiados — ver relatório de perda.

---
*Fonte: `mukul975/Anthropic-Cybersecurity-Skills@673da1f3` (Apache-2.0), cluster G32 — blockchain-security
(`auditing-foundry-smart-contract-security`, `analyzing-ethereum-smart-contract-vulnerabilities`).
Método reescrito em PT-BR; defensivo/auditoria; sem cópia literal.*
