# Chapter 2: Address Interactions & Value

Welcome to Chapter 2 of the Alchemy University Learn Solidity course. This chapter covers how smart contracts interact with addresses, hold balances, receive and transfer Ether, handle reverts and exceptions, craft low-level calldata, and build a complete real-world Escrow contract.

## Modules in this Chapter

1. **[01-sending-ether](./01-sending-ether/README.md)**
   - The Ethereum account model (EOAs vs Smart Contract accounts)
   - Global execution variables: `msg.sender`, `msg.value`
   - Receiving Ether via `receive()` and `fallback()`
   - Transferring Ether: `transfer()`, `send()`, and low-level `.call{value: ...}("")`
   - Contract self-destruction with `selfdestruct`

2. **[02-reverting-transactions](./02-reverting-transactions/README.md)**
   - Atomic transactions and state rollback
   - `require()`, `revert()`, and custom errors (`error Unauthorized()`)
   - Reusable function modifiers (`modifier onlyOwner`)
   - Assertions and invariants with `assert()`

3. **[03-calldata](./03-calldata/README.md)**
   - Application Binary Interface (ABI) specification
   - 4-byte function selectors (`bytes4(keccak256("func(type)"))`)
   - Encoding arguments: `abi.encodeWithSignature` and `abi.encodeWithSelector`
   - Low-level address `.call()` execution
   - Dynamic fallback handlers for arbitrary messages

4. **[04-escrow](./04-escrow/README.md)**
   - Architecture of a 3-party trustless escrow (Depositor, Beneficiary, Arbiter)
   - Payable constructors and balance locking
   - Authorization gates and security enforcement
   - Event emission (`Approved`) and frontend log indexing

---

## Running Chapter 2 Tests

Run all unit tests in Chapter 2 using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions*"
```
