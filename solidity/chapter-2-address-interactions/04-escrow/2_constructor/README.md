# Exercise: Escrow Constructor

**Path**: `chapter-2-address-interactions/04-escrow/2_constructor`

---

## Objective
Set `depositor = msg.sender` and initialize `arbiter` and `beneficiary` from constructor parameters.

---

## Files in this Directory
- **Contract(s)**: `Escrow.sol`
- **Foundry Test**: `Escrow.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/04-escrow/2_constructor*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/04-escrow/2_constructor*" -vvvv
```
