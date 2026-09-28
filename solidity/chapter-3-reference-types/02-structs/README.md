# Module 02: Structs

In this module, you will learn how to create user-defined composite data types with structs, manage struct storage, and prevent double-voting.

---

## 1. What is a Struct?

A `struct` allows you to group related variables into a single custom type:

```solidity
struct Vote {
    address voter;
    bool choice;
}
```

---

## 2. Storage Pointers vs Memory Copies

Understanding the difference between `storage` and `memory` assignment is critical to avoid silent state bugs in Solidity:

### Memory Copy:
```solidity
Vote memory v = votes[0];
v.choice = true; // Modifies ONLY local memory copy; blockchain state UNCHANGED!
```

### Storage Reference (Pointer):
```solidity
Vote storage v = votes[0];
v.choice = true; // Modifies the actual struct on blockchain storage!
```

```
[ Blockchain Storage: votes[0] ]
          ▲                ▲
          │ (storage ref)  │ (reads & copies)
     v (storage)      v (memory) [ isolated copy in RAM ]
```

---

## 3. Exercises in this Module

1. **[1_vote-storage](./1_vote-storage/Contract.sol)**: Define a `Vote` struct and create a state variable `vote` of type `Vote`.
2. **[2_vote-memory](./2_vote-memory/Contract.sol)**: Implement `createVote(choice)` creating a Vote struct in memory and saving to state.
3. **[3_vote-array](./3_vote-array/Contract.sol)**: Maintain an array of `Vote[] public votes` and push new votes.
4. **[4_choice-lookup](./4_choice-lookup/Contract.sol)**: Implement `findChoice(address)` searching the array for a voter's choice.
5. **[5_single-vote](./5_single-vote/Contract.sol)**: Prevent users from voting more than once by checking `hasVoted(address)`.
6. **[6_change-vote](./6_change-vote/Contract.sol)**: Allow voters to change their vote in-place using a `Vote storage` reference.

---

## Running Tests

```bash
forge test --match-path "*02-structs*"
```
