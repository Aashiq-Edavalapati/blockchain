# Exercise: Autonomous Proposal Execution

**Path**: `chapter-4-applied-solidity/01-voting/6_execute`

---

## Objective
Execute the proposal payload via `proposal.target.call(proposal.data)` when threshold of 10 yes votes is met.

---

## Files in this Directory
- **Contract(s)**: `Voting.sol`
- **Foundry Test**: `Voting.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/01-voting/6_execute*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/01-voting/6_execute*" -vvvv
```
