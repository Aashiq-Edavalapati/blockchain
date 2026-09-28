# Exercise: Ownable Access Control Pattern

**Path**: `chapter-4-applied-solidity/02-inheritance/5_ownable`

---

## Objective
Implement an `Ownable` base contract with `onlyOwner` modifier and `transferOwnership(address)` function.

---

## Files in this Directory
- **Contract(s)**: `Collectible.sol`, `BaseContracts.sol`
- **Foundry Test**: `Collectible.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/5_ownable*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/5_ownable*" -vvvv
```
