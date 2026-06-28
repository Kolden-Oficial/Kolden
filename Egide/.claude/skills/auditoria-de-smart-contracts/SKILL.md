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
