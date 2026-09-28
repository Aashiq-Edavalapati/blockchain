# Module 04: Escrow Project

In this applied project module, you will build a complete 3-party trustless Escrow smart contract from scratch.

---

## 1. What is an Escrow?

An escrow is a financial arrangement where a third party (the **Arbiter**) holds funds on behalf of two transacting parties (the **Depositor** and the **Beneficiary**). The funds are locked in the smart contract until the agreed conditions are fulfilled.

```
       [ Depositor ] ──( 1. Deploys & funds contract )──> [ Escrow Contract ]
                                                                 │
                                                   ( 2. Arbiter verifies work )
                                                                 │
       [ Arbiter ] ────( 3. Calls approve() )────────────────────┤
                                                                 │
                                                     ( 4. Funds released )
                                                                 ▼
                                                          [ Beneficiary ]
```

---

## 2. State & Roles

| Role | Address Variable | Description |
| :--- | :--- | :--- |
| **Depositor** | `address public depositor;` | Party depositing funds (deployer `msg.sender`) |
| **Beneficiary** | `address public beneficiary;` | Party receiving funds upon successful completion |
| **Arbiter** | `address public arbiter;` | Neutral third party authorized to approve payout |
| **Status** | `bool public isApproved;` | Tracks whether escrow payout has been executed |

---

## 3. Architecture & Lifecycle

### Step 1: Initialization (`constructor`)
The depositor deploys the contract with a `payable` constructor, supplying the arbiter and beneficiary addresses and locking the escrow deposit:
```solidity
constructor(address _arbiter, address _beneficiary) payable {
    arbiter = _arbiter;
    beneficiary = _beneficiary;
    depositor = msg.sender;
}
```

### Step 2: Approval & Payout (`approve`)
Only the arbiter is permitted to release funds. The payout transfers the entire contract balance to the beneficiary and marks `isApproved = true`:
```solidity
function approve() external {
    require(msg.sender == arbiter, "Only arbiter can approve");
    uint balance = address(this).balance;
    (bool sent, ) = payable(beneficiary).call{value: balance}("");
    require(sent, "Payout failed");
    isApproved = true;
    emit Approved(balance);
}
```

### Step 3: Event Logging (`Approved`)
Smart contracts cannot query historical logs, but frontends and off-chain indexing services (like The Graph or Alchemy Webhooks) rely on events to track state transitions in real time.
```solidity
event Approved(uint balance);
```

---

## 4. Exercises in this Module

1. **[1_setup](./1_setup/Escrow.sol)**: Declare addresses for `depositor`, `beneficiary`, `arbiter` and boolean `isApproved`.
2. **[2_constructor](./2_constructor/Escrow.sol)**: Initialize `arbiter` and `beneficiary` from constructor arguments, and set `depositor = msg.sender`.
3. **[3_funding](./3_funding/Escrow.sol)**: Make constructor `payable` to accept and lock initial escrow deposit.
4. **[4_approval](./4_approval/Escrow.sol)**: Implement `approve()` to transfer contract balance to beneficiary and update `isApproved`.
5. **[5_security](./5_security/Escrow.sol)**: Restrict `approve()` so only `arbiter` can authorize payout.
6. **[6_events](./6_events/Escrow.sol)**: Define and emit the `Approved(uint)` event upon successful payout.

---

## Running Tests

```bash
forge test --match-path "*04-escrow*"
```
