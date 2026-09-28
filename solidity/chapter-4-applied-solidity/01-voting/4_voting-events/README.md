# Exercise: Voting Governance Events

**Path**: `chapter-4-applied-solidity/01-voting/4_voting-events`

---

## Objective
Define and emit `ProposalCreated(uint proposalId)` and `VoteCast(uint proposalId, address voter)`.

---

## Files in this Directory
- **Contract(s)**: `Voting.sol`
- **Foundry Test**: `Voting.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity/01-voting/4_voting-events*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-4-applied-solidity/01-voting/4_voting-events*" -vvvv
```
