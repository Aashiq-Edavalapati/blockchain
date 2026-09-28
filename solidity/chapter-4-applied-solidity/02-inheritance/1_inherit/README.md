# Exercise: Basic Inheritance

**Path**: `chapter-4-applied-solidity/02-inheritance/1_inherit`

---

## Objective
Create base contract `Hero` with `health = 100`, and inherit into `Warrior` and `Mage` using the `is` keyword.

---

## Files in this Directory
- **Contract(s)**: `SuperHeroes.sol`, `Hero.sol`
- **Foundry Test**: `SuperHeroes.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/1_inherit*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/02-inheritance/1_inherit*" -vvvv
```
