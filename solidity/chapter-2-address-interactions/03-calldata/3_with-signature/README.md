# Exercise: Call with Signature & Arguments

**Path**: `chapter-2-address-interactions/03-calldata/3_with-signature`

---

## Objective
Use `abi.encodeWithSignature("ambush(address,uint256)", enemy, count)` to pass arguments dynamically through low-level call.

---

## Files in this Directory
- **Contract(s)**: `Sidekick.sol`, `Hero.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/3_with-signature*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/03-calldata/3_with-signature*" -vvvv
```
