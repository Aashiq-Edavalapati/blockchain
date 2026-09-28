# Exercise: Vote Instantiation in Memory

**Path**: `chapter-3-reference-types/02-structs/2_vote-memory`

---

## Objective
Create a `createVote(bool choice)` function that instantiates `Vote` in memory and sets the state variable.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/2_vote-memory*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/2_vote-memory*" -vvvv
```
