# Exercise: Multiple Inheritance

**Path**: `chapter-4-applied-solidity/02-inheritance/6_multiple-inheritance`

---

## Objective
Create a `Collectible` contract inheriting from both `Ownable` and `Transferable`.

---

## Files in this Directory
- **Contract(s)**: `Collectible.sol`, `BaseContracts.sol`
- **Foundry Test**: `Collectible.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/6_multiple-inheritance*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/6_multiple-inheritance*" -vvvv
```
