# Chapter 4: Applied Solidity & Architecture

Welcome to Chapter 4 of the Alchemy University Learn Solidity course. This chapter brings together all the foundational concepts (data types, storage, mappings, calldata, error handling) to build advanced on-chain architectures: a complete DAO Voting Governance system and Object-Oriented Smart Contract Inheritance.

## Modules in this Chapter

1. **[01-voting](./01-voting/README.md)**
   - Decentralized Autonomous Organization (DAO) architecture
   - Proposal creation with arbitrary targets and calldata
   - Vote casting and tracking with double-voting prevention
   - Dynamic vote tallying and vote switching
   - Governance event telemetry (`ProposalCreated`, `VoteCast`)
   - Member whitelisting and access gates
   - Autonomous proposal execution via low-level `.call()`

2. **[02-inheritance](./02-inheritance/README.md)**
   - Object-Oriented Solidity (`is` keyword)
   - Passing arguments to parent constructors
   - Polymorphism with `virtual` and `override`
   - Method chaining with `super` and C3 Linearization
   - Access control with the canonical `Ownable` pattern
   - Multiple inheritance and Diamond Problem resolution

---

## Running Chapter 4 Tests

Run all unit tests in Chapter 4 using Foundry:
```bash
forge test --match-path "*chapter-4-applied-solidity*"
```
