# Exercise: Function Overloading

**Path**: `chapter-1-solidity-introduction/02-solidity-functions/6_double-overload`

---

## Objective
Provide two functions named `double`: one accepting `uint x` returning `x * 2`, and another accepting `(uint x, uint y)` returning `(x * 2, y * 2)`.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-1-solidity-introduction/02-solidity-functions/6_double-overload*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-1-solidity-introduction/02-solidity-functions/6_double-overload*" -vvvv
```
