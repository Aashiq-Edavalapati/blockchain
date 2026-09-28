# Exercise: Owner Modifier

**Path**: `chapter-2-address-interactions/02-reverting-transactions/3_owner-modifier`

---

## Objective
Create a reusable function modifier `onlyOwner` that enforces owner authorization and apply it across multiple functions (`a()`, `b()`, `c()`).

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/02-reverting-transactions/3_owner-modifier*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/02-reverting-transactions/3_owner-modifier*" -vvvv
```
