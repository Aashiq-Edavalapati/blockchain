# Exercise: Escrow Security Gate

**Path**: `chapter-2-address-interactions/04-escrow/5_security`

---

## Objective
Restrict `approve()` strictly to `arbiter`, reverting if any other address attempts payout.

---

## Files in this Directory
- **Contract(s)**: `Escrow.sol`
- **Foundry Test**: `Escrow.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/04-escrow/5_security*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/04-escrow/5_security*" -vvvv
```
