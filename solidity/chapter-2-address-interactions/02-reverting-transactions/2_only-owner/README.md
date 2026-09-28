# Exercise: Only Owner Access Control

**Path**: `chapter-2-address-interactions/02-reverting-transactions/2_only-owner`

---

## Objective
Implement a `withdraw()` function that requires `msg.sender == owner`, preventing non-owners from draining contract funds.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/02-reverting-transactions/2_only-owner*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/02-reverting-transactions/2_only-owner*" -vvvv
```
