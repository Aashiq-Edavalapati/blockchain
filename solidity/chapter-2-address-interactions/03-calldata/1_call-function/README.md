# Exercise: Low-Level Call

**Path**: `chapter-2-address-interactions/03-calldata/1_call-function`

---

## Objective
In `Sidekick.sol`, invoke the `alert()` function on an external `Hero` contract using low-level `address.call()`.

---

## Files in this Directory
- **Contract(s)**: `Sidekick.sol`, `Hero.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/1_call-function*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/1_call-function*" -vvvv
```
