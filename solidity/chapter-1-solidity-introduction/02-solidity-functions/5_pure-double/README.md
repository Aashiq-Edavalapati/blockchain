# Exercise: Pure Double

**Path**: `chapter-1-solidity-introduction/02-solidity-functions/5_pure-double`

---

## Objective
Implement a `pure` computation `double(uint x)` that returns `x * 2` without reading or writing contract storage.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-1-solidity-introduction/02-solidity-functions/5_pure-double*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-1-solidity-introduction/02-solidity-functions/5_pure-double*" -vvvv
```
