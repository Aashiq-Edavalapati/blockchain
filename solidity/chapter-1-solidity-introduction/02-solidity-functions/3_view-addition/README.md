# Exercise: View Addition

**Path**: `chapter-1-solidity-introduction/02-solidity-functions/3_view-addition`

---

## Objective
Implement a read-only `view` function `add(uint y)` that returns the sum of parameter `y` and contract state variable `x` without modifying state.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-1-solidity-introduction/02-solidity-functions/3_view-addition*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-1-solidity-introduction/02-solidity-functions/3_view-addition*" -vvvv
```
