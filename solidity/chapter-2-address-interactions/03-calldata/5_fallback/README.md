# Exercise: Fallback Handler

**Path**: `chapter-2-address-interactions/03-calldata/5_fallback`

---

## Objective
Implement `fallback()` in `Hero.sol` to catch unrecognized calls and record contact.

---

## Files in this Directory
- **Contract(s)**: `Sidekick.sol`, `Hero.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/5_fallback*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/5_fallback*" -vvvv
```
