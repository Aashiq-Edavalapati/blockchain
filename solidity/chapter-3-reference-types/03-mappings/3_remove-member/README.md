# Exercise: Remove Member with Delete

**Path**: `chapter-3-reference-types/03-mappings/3_remove-member`

---

## Objective
Implement `removeMember(address)` using `delete members[addr]` to reset the mapping slot to false.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/03-mappings/3_remove-member*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/03-mappings/3_remove-member*" -vvvv
```
