# Exercise: Prevent Double Voting

**Path**: `chapter-3-reference-types/02-structs/5_single-vote`

---

## Objective
Implement `hasVoted(address)` and enforce that addresses can only cast a single vote in the array.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/5_single-vote*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/5_single-vote*" -vvvv
```
