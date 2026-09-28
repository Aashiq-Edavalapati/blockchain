# Exercise: Forwarding Arbitrary Calldata

**Path**: `chapter-2-address-interactions/03-calldata/4_arbitrary-alert`

---

## Objective
Implement a generic relay function that forwards arbitrary incoming `bytes calldata` directly to the hero contract.

---

## Files in this Directory
- **Contract(s)**: `Sidekick.sol`, `Hero.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/4_arbitrary-alert*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/4_arbitrary-alert*" -vvvv
```
