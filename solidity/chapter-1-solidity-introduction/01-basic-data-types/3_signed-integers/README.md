# Exercise: Signed Integers

**Path**: `chapter-1-solidity-introduction/01-basic-data-types/3_signed-integers`

---

## Objective
Declare public signed integers `int8 a = 50` and `int8 b = -30`. Calculate the difference and store in `int16 public difference = a - b`. Also compute `int8 public absoluteDifference = a > b ? a - b : b - a`.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-1-solidity-introduction/01-basic-data-types/3_signed-integers*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-1-solidity-introduction/01-basic-data-types/3_signed-integers*" -vvvv
```
