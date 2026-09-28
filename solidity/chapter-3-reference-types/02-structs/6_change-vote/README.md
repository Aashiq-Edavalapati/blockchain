# Exercise: In-Place Vote Mutation

**Path**: `chapter-3-reference-types/02-structs/6_change-vote`

---

## Objective
Allow voters to update their previous choice by acquiring a `Vote storage` pointer to the existing struct.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/6_change-vote*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/6_change-vote*" -vvvv
```
