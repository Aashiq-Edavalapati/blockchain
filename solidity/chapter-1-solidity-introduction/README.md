# Chapter 1: Solidity Introduction

Welcome to Chapter 1 of the Alchemy University Learn Solidity course. This chapter covers the fundamental building blocks of smart contract programming on the Ethereum Virtual Machine (EVM).

## Modules in this Chapter

1. **[01-basic-data-types](./01-basic-data-types/README.md)**
   - Statically typed languages and compile-time type checking
   - Booleans (`bool`)
   - Unsigned Integers (`uint8` through `uint256`)
   - Signed Integers (`int8` through `int256`)
   - Strings and Fixed Byte Arrays (`string` vs `bytes32`)
   - Enums (`enum`)

2. **[02-solidity-functions](./02-solidity-functions/README.md)**
   - Smart contract deployment & constructors
   - Function arguments and parameter passing
   - State mutations (modifying blockchain storage)
   - Read-only functions (`view` vs `pure`)
   - Function overloading
   - Debugging using `console.log`

---

## Core Mental Models

### 1. Smart Contracts are Persistent State Machines
A smart contract is a collection of code (its functions) and state (its variables) that resides at a specific address on the Ethereum blockchain.
- Code cannot be altered once deployed (immutability).
- State variables are stored permanently on-chain (Storage).
- Every state modification costs gas and requires consensus across validator nodes.

### 2. Static Typing & Storage Slots
Solidity is statically typed. The compiler needs to know exact types to allocate 32-byte (256-bit) EVM storage slots efficiently.

```solidity
contract Example {
    // Stored in slot 0 (packed: 1 byte + 1 byte + 2 bytes = 4 bytes)
    bool public isActive;      // 1 byte
    uint8 public smallNumber;  // 1 byte
    uint16 public mediumNumber;// 2 bytes

    // Stored in slot 1 (32 bytes)
    uint256 public bigNumber;  // 32 bytes
}
```

---

## Running Chapter 1 Tests

Run all unit tests in Chapter 1 using Foundry:
```bash
forge test --match-path "*chapter-1-solidity-introduction*"
```
