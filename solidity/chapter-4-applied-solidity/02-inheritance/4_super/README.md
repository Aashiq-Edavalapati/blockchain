# Exercise: Chaining Calls with Super

**Path**: `chapter-4-applied-solidity/02-inheritance/4_super`

---

## Objective
Use `super.attack(enemy)` to execute base damage logic while applying specialization bonus damage in derived contracts.

---

## Files in this Directory
- **Contract(s)**: `SuperHeroes.sol`, `Enemy.sol`, `Hero.sol`
- **Foundry Test**: `SuperHeroes.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/4_super*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/4_super*" -vvvv
```
