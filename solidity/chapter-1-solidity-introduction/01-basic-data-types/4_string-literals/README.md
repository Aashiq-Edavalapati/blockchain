# Exercise: String Literals & Bytes

**Path**: `chapter-1-solidity-introduction/01-basic-data-types/4_string-literals`

---

## Objective
Store short static text in `bytes32 public msg1 = "Hello World"` for optimal gas, and store longer dynamic text in `string public msg2`.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-1-solidity-introduction/01-basic-data-types/4_string-literals*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-1-solidity-introduction/01-basic-data-types/4_string-literals*" -vvvv
```
