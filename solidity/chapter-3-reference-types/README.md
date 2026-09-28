# Chapter 3: Reference Types & Storage Layout

Welcome to Chapter 3 of the Alchemy University Learn Solidity course. This chapter explores Solidity's reference types: Arrays, Structs, and Mappings, along with EVM memory models and data locations.

## Modules in this Chapter

1. **[01-arrays](./01-arrays/README.md)**
   - Fixed-size vs dynamically-sized arrays
   - Storage arrays vs Memory arrays
   - Array operations: `.length`, `.push()`, `.pop()`
   - Memory array initialization (`new uint[](size)`)
   - Gas implications of looping over arrays

2. **[02-structs](./02-structs/README.md)**
   - Defining custom data structures
   - Storage references (storage pointers) vs Memory copies
   - Storing arrays of structs in state
   - In-place mutation of struct members

3. **[03-mappings](./03-mappings/README.md)**
   - Hash table storage mechanics on Ethereum
   - O(1) key-value lookup without iterations
   - Default zero-values and the `delete` keyword
   - Mapping to complex structs
   - Multi-dimensional & nested mappings (`mapping(address => mapping(address => bool))`)

---

## Data Location Mental Model

Every complex variable (arrays, structs, strings, bytes) must explicitly declare its data location:

| Location | Lifetime | Mutability | Gas Cost | Stored In |
| :--- | :--- | :--- | :--- | :--- |
| **`storage`** | Permanent | Read / Write | Very Expensive (`SSTORE` = 20,000 gas) | Blockchain state tree |
| **`memory`** | Function Call | Read / Write | Cheap (expands quadratically) | RAM during execution |
| **`calldata`** | Function Call | Read-only | Cheapest | Immutable tx payload |

---

## Running Chapter 3 Tests

Run all unit tests in Chapter 3 using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types*"
```
