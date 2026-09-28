# Exercise: Constructor Revert

**Path**: `chapter-2-address-interactions/02-reverting-transactions/1_constructor-revert`

---

## Objective
Require that callers send at least 1 Ether (`msg.value >= 1 ether`) when deploying the contract, reverting execution otherwise.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/02-reverting-transactions/1_constructor-revert*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/02-reverting-transactions/1_constructor-revert*" -vvvv
```
