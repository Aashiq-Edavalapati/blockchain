# Module 01: Voting (DAO Governance System)

In this applied capstone module, you will design and implement a complete Decentralized Autonomous Organization (DAO) voting contract capable of creating proposals, recording member votes, and autonomously executing approved actions on other contracts.

---

## 1. DAO Governance Lifecycle

```
[ Member ] ──( 1. newProposal(target, data) )──> [ Voting Contract ]
                                                        │
[ Voters ] ──( 2. castVote(proposalId, bool) )─────────┤ (Records yes/no)
                                                        │
                                            ( 3. 10 yes votes reached? )
                                                        │
[ Anyone ] ──( 4. executeProposal(proposalId) )─────────┤
                                                        │
                                                        ▼ (Low-level call)
                                                [ Target Contract ]
```

---

## 2. Key Data Structures

### Proposal Struct
```solidity
struct Proposal {
    address target;     // Contract to invoke upon passing
    bytes data;         // Calldata to send to the target
    uint yesCount;      // Tally of affirmative votes
    uint noCount;       // Tally of negative votes
    bool executed;      // Guard to prevent replay execution
}
```

### Vote Tracking
To prevent double voting and allow voters to change their minds:
```solidity
// proposalId => (voterAddress => hasVoted)
mapping(uint => mapping(address => bool)) public hasVoted;

// proposalId => (voterAddress => choice)
mapping(uint => mapping(address => bool)) public voteChoice;
```

---

## 3. Proposal Execution

When a proposal receives at least 10 `yes` votes (the quorum threshold), `executeProposal(proposalId)` can be called:

```solidity
function executeProposal(uint _proposalId) external {
    Proposal storage proposal = proposals[_proposalId];
    require(proposal.yesCount >= 10, "Quorum not reached");
    require(!proposal.executed, "Already executed");

    proposal.executed = true;

    // Autonomous execution of proposal's payload
    (bool success, ) = proposal.target.call(proposal.data);
    require(success, "Execution failed");
}
```

---

## 4. Exercises in this Module

1. **[1_proposal](./1_proposal/Voting.sol)**: Create `Proposal` struct and implement `newProposal(target, data)`.
2. **[2_cast-a-vote](./2_cast-a-vote/Voting.sol)**: Implement `castVote(proposalId, supportsProposal)` to track votes.
3. **[3_multiple-votes](./3_multiple-votes/Voting.sol)**: Support vote switching: decrement old choice and increment new choice.
4. **[4_voting-events](./4_voting-events/Voting.sol)**: Emit `ProposalCreated(proposalId)` and `VoteCast(proposalId, voter)`.
5. **[5_members](./5_members/Voting.sol)**: Whitelist voting rights to designated addresses initialized in constructor.
6. **[6_execute](./6_execute/Voting.sol)**: Execute target payload when proposal reaches 10 yes votes.

---

## Running Tests

```bash
forge test --match-path "*01-voting*"
```
