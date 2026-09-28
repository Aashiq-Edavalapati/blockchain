# Exercise: Nested Relationship Mapping

**Path**: `chapter-3-reference-types/03-mappings/6_nested-maps`

---

## Objective
Implement `mapping(address => mapping(address => ConnectionTypes)) public connections` to track relationship graph between accounts.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/03-mappings/6_nested-maps*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/03-mappings/6_nested-maps*" -vvvv
```
