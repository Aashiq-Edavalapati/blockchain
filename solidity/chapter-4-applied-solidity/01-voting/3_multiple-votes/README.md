# Exercise: Vote Switching

**Path**: `chapter-4-applied-solidity/01-voting/3_multiple-votes`

---

## Objective
Allow voters to change their vote, decrementing the previous tally and incrementing the new tally.

---

## Files in this Directory
- **Contract(s)**: `Voting.sol`
- **Foundry Test**: `Voting.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/01-voting/3_multiple-votes*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/01-voting/3_multiple-votes*" -vvvv
```
