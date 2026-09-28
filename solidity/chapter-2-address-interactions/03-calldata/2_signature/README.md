# Exercise: Function Selector Signature

**Path**: `chapter-2-address-interactions/03-calldata/2_signature`

---

## Objective
Manually compute the 4-byte function selector for `alert()` using `bytes4(keccak256("alert()"))` and execute the call.

---

## Files in this Directory
- **Contract(s)**: `Sidekick.sol`, `Hero.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/2_signature*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/2_signature*" -vvvv
```
