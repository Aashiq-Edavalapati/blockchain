# Exercise: Virtual and Override

**Path**: `chapter-4-applied-solidity/02-inheritance/3_virtual-override`

---

## Objective
Mark base `attack()` as `virtual` and override in `Warrior` and `Mage` with custom attack damage.

---

## Files in this Directory
- **Contract(s)**: `SuperHeroes.sol`, `Enemy.sol`, `Hero.sol`
- **Foundry Test**: `SuperHeroes.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/3_virtual-override*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/3_virtual-override*" -vvvv
```
