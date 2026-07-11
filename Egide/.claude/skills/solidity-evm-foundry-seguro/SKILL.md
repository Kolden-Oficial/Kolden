---
name: solidity-evm-foundry-seguro
description: >
  Use quando a demanda for escrever, revisar ou auditar smart contract Solidity
  na EVM (Ethereum, Polygon, Base, Arbitrum, Optimism) — com foco em SEGURANÇA e
  teste rigoroso via Foundry. Cobre padrões canônicos: reentrancy guard, integer
  safety (Solidity 0.8+), access control (OpenZeppelin), oracle security
  (Chainlink price feed + guards contra manipulação), CEI pattern (Checks-Effects-
  Interactions), delegatecall traps, uso de proxy upgradeable (UUPS/Transparent),
  e testes com Foundry: unit + fuzz (`forge test --fuzz-runs`) + invariant
  testing (properties que sempre valem). Gatilhos: "smart contract", "Solidity",
  "EVM", "Foundry", "auditoria de contrato", "reentrancy", "integer overflow",
  "oracle manipulation", "flash loan attack", "invariant testing", "proxy
  upgradeable", "OpenZeppelin". Dono: jim-manico (AppSec) — cross-link Trail of
  Bits + OpenZeppelin.
tipo: skill
area: Egide
up: "[[Egide/_MOC-egide]]"
---

# Solidity + EVM + Foundry seguro

Smart contract em produção é **código imutável com dinheiro dentro**. Bug = perda real,
sem rollback. Esta habilidade codifica os padrões de segurança canônicos que separam
"contrato compila" de "contrato aguenta auditoria".

## Regra zero

**Nunca lance contrato sem: (1) audit externa (2) bug bounty ativo (3) plano de resposta
a incidente com pausa/upgrade.**

## Ambiente Kolden

- **Foundry** (forge + cast + anvil) como framework de dev/teste.
- **OpenZeppelin Contracts** como biblioteca de primitivas seguras.
- **Solidity ≥0.8.20** para integer safety nativa.
- **Slither** (Trail of Bits) para análise estática obrigatória em CI.

## Padrões de segurança canônicos

### 1. Reentrancy

Ataque clássico (DAO 2016): contrato externo chama de volta antes de estado interno atualizar.

**Padrão CEI (Checks-Effects-Interactions):**
```solidity
function withdraw() external {
    // 1. Checks
    uint256 amount = balances[msg.sender];
    require(amount > 0, "No balance");

    // 2. Effects (zerar antes)
    balances[msg.sender] = 0;

    // 3. Interactions (chamada externa por último)
    (bool ok, ) = msg.sender.call{value: amount}("");
    require(ok, "Transfer failed");
}
```

**Reforço:** `ReentrancyGuard` da OpenZeppelin em funções que interagem com contratos externos.
```solidity
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

function withdraw() external nonReentrant { ... }
```

**Cross-function reentrancy:** guard não é suficiente se 2 funções mutam mesmo estado. Auditar.

### 2. Integer safety

Solidity 0.8+ tem checked math nativo — overflow reverte. Mas cuidado com:
- `unchecked { ... }` — otimização que **desliga** o check. Use SÓ quando provou não haver overflow.
- Cast (`uint256 → uint128`) sem checagem — trunca silenciosamente.
- Divisão antes de multiplicação — perde precisão. Sempre multiplique primeiro.

```solidity
// Errado (perde precisão)
uint256 result = (a / b) * c;

// Certo
uint256 result = (a * c) / b;
```

### 3. Access control

Nunca `require(msg.sender == owner, ...)` inline. Use OpenZeppelin `Ownable` ou `AccessControl`
(role-based).

```solidity
import "@openzeppelin/contracts/access/AccessControl.sol";

bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

function mint(address to, uint256 amount) external onlyRole(MINTER_ROLE) { ... }
```

**Anti-padrão comum:** `tx.origin` para autenticação. NUNCA. Usar `msg.sender`.

### 4. Oracle security (Chainlink)

Oracle é vetor #1 de exploit em DeFi. Usar Chainlink Price Feed com guards:

```solidity
function getPrice() public view returns (int256) {
    (uint80 roundId, int256 price, , uint256 updatedAt, uint80 answeredInRound) = feed.latestRoundData();

    require(price > 0, "Invalid price");
    require(updatedAt > 0, "Round incomplete");
    require(block.timestamp - updatedAt < HEARTBEAT, "Stale price");
    require(answeredInRound >= roundId, "Stale round");

    return price;
}
```

**Nunca usar preço de DEX (Uniswap spot) sem TWAP** — manipulação por flash loan é trivial.

### 5. Delegatecall e proxy

`delegatecall` executa código do target no CONTEXTO do caller (storage do caller). Erro comum:
storage slot collision entre proxy e implementation.

Use padrões auditados:
- **UUPS** (OpenZeppelin) — upgrade lógica mora na implementation
- **Transparent Proxy** — admin separado (evita seletor collision)

**Nunca escreva proxy do zero.**

### 6. Flash loan awareness

Todo cálculo baseado em balance/liquidity dentro de 1 tx pode ser manipulado. Sinais de perigo:
- `balanceOf(this)` para cálculo de preço/share
- Governance com voting weight baseado em snapshot da mesma tx
- Liquidação usando spot price de DEX

Mitigar: **snapshot em bloco anterior**, **TWAP de N blocos**, **checkpoint pre-tx**.

## Testes com Foundry

### Unit tests
```solidity
// test/Token.t.sol
import "forge-std/Test.sol";

contract TokenTest is Test {
    function testTransferReducesSenderBalance() public { ... }
}
```

### Fuzz testing
`forge test --fuzz-runs 10000` gera inputs aleatórios.

```solidity
function testFuzz_TransferPreservesTotalSupply(uint256 amount) public {
    vm.assume(amount <= token.balanceOf(alice));
    uint256 supplyBefore = token.totalSupply();

    vm.prank(alice);
    token.transfer(bob, amount);

    assertEq(token.totalSupply(), supplyBefore);
}
```

### Invariant testing (o mais poderoso)

Define propriedade que SEMPRE deve valer. Foundry gera sequências de chamadas aleatórias e
tenta violar.

```solidity
contract TokenInvariantTest is Test {
    Token token;

    function setUp() public { token = new Token(); }

    // Invariante: soma de balances == totalSupply
    function invariant_totalSupplyMatchesBalances() public {
        uint256 sum = token.balanceOf(alice) + token.balanceOf(bob);
        assertEq(sum, token.totalSupply());
    }
}
```

Rodar: `forge test --match-test invariant`.

## Análise estática obrigatória

**Slither** em CI:
```yaml
- name: Slither
  uses: crytic/slither-action@v0.3.0
  with:
    fail-on: high
```

Detecta ~90 classes de bug (reentrancy, uninitialized-storage, arbitrary-send, etc.).

**Mythril** para simbolic execution — complementar em contratos críticos.

## Ferramentas de auditoria complementares

- **Halmos** (a16z) — bounded model checking
- **Echidna** — fuzzing property-based
- **Certora** — formal verification (pago)
- **Semgrep-solidity** — regras custom

## Checklist antes do deploy

- [ ] Slither: 0 issues de severidade high
- [ ] Fuzz 10k+ runs sem contra-exemplo
- [ ] Invariantes 100k+ runs sem violação
- [ ] Testes de reentrancy explícitos
- [ ] Oracle com heartbeat + round + stale check
- [ ] Access control por AccessControl role-based
- [ ] Upgrade path documentado (proxy pattern escolhido)
- [ ] Pausable em funções sensíveis (`Pausable` OZ)
- [ ] Emergency withdraw para admin
- [ ] Audit externa concluída (Trail of Bits, OpenZeppelin, Zellic, Spearbit)
- [ ] Bug bounty ativo (Immunefi)
- [ ] Testnet ≥30 dias
- [ ] Verificado no Etherscan (source code público)

## Gotchas específicas por chain

- **Ethereum L1:** gas alto → otimizar storage (packing)
- **Polygon:** finality mais fraca → esperar mais blocos antes de considerar tx confirmada
- **Arbitrum/Optimism:** L1 gas oracle diferente → cuidar de estimativa
- **Base:** infra Coinbase → mesmo modelo Optimism

## Handoffs

- **Aditoria externa** → Trail of Bits, OpenZeppelin, Zellic, Spearbit
- **Frontend interagindo com contrato** → Prometeu (@dev Dex)
- **Ops de node RPC** → @devops Kolden
- **Compliance regulatório (SEC, CVM)** → Themis (Olimpo)

## Regras Kolden

- **Nunca produção sem audit externa.** Interna não conta.
- **Bug bounty MÍNIMO $10k antes de mainnet** (Immunefi).
- **Kill switch (`Pausable`) obrigatório** — dá tempo para responder a incidente.
- **Multisig admin** (Gnosis Safe 3-of-5 mínimo) para funções privilegiadas.
- **Nunca `tx.origin` para auth.**

---
## Atribuição
Herança histórica: **Jim Manico** — OWASP + AppSec canonical trainer (secure coding
patterns); **Trail of Bits team** — Slither, Echidna, Manticore (2018+, ferramentas de
auditoria abertas); **OpenZeppelin team** (Francisco Giordano, Hadrien Croubois) —
Contracts library + upgradeable patterns; **Consensys Diligence** — Mythril + best
practices; **Chainlink Labs** — oracle security patterns; **Nomic Foundation** — Hardhat;
**Paradigm** (Georgios Konstantopoulos) — Foundry (2021+). Adaptado de
`github.com/msitarzewski/agency-agents@a597cb6` (MIT), bucket B03/engineering, IDs G70, G71, G72.
