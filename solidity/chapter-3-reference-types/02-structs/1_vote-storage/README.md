# Exercise: Vote Struct Definition

**Path**: `chapter-3-reference-types/02-structs/1_vote-storage`

---

## Objective
Define a `Vote` struct with `choice` (bool) and `voter` (address), declaring a public state variable `vote`.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/1_vote-storage*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/02-structs/1_vote-storage*" -vvvv
```
