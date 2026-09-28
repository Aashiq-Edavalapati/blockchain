# Alchemy University: Learn Solidity — Complete Course & Exercises

This repository contains the complete curriculum, conceptual documentation, code exercises, and Foundry test suites for the **[Alchemy University: Learn Solidity](https://university.alchemy.com/overview/solidity)** course.

## Overview

Solidity is the primary object-oriented, high-level language for implementing smart contracts on the Ethereum Virtual Machine (EVM). This course guides you from foundational data types and storage mechanics up through low-level calldata execution, access control patterns, and real-world decentralized applications (Escrow and Voting/DAO governance).

All coding challenges in this repository are implemented as clean Solidity contracts accompanied by automated **Foundry (Forge)** test suites verifying full correctness.

---

## Course Curriculum & Directory Structure

```
solidity/
├── foundry.toml                                # Foundry configuration
├── lib/forge-std/                              # Forge standard test library
├── chapter-1-solidity-introduction/
│   ├── README.md                               # Chapter 1 Overview
│   ├── 01-basic-data-types/                    # Booleans, Integers, Strings, Enums
│   └── 02-solidity-functions/                   # Arguments, State, View, Pure, Overloading
├── chapter-2-address-interactions/
│   ├── README.md                               # Chapter 2 Overview
│   ├── 01-sending-ether/                       # msg.value, receive, transfer, selfdestruct
│   ├── 02-reverting-transactions/              # require, revert, custom errors, modifiers
│   ├── 03-calldata/                            # ABI encoding, function selectors, low-level call
│   └── 04-escrow/                              # 3-Party Escrow architecture, events & security
├── chapter-3-reference-types/
│   ├── README.md                               # Chapter 3 Overview
│   ├── 01-arrays/                              # Fixed & dynamic arrays, memory vs storage
│   ├── 02-structs/                             # User-defined data types & voting storage
│   └── 03-mappings/                            # EVM hash tables, nested maps, struct mappings
└── chapter-4-applied-solidity/
    ├── README.md                               # Chapter 4 Overview
    ├── 01-voting/                              # DAO Governance project with execute() calls
    └── 02-inheritance/                         # Virtual, override, super, Ownable pattern
```

---

## Detailed Syllabus & Exercise Index

| Chapter | Module | Topic / Exercise | Description | Key Concept |
| :--- | :--- | :--- | :--- | :--- |
| **1. Intro** | `01-basic-data-types` | `1_booleans` | Declare state booleans `a` and `b` | Default values, storage slots |
| | | `2_unsigned-integer` | Declare `uint8`, `uint16`, and sum them into `uint256` | Integer sizes, 0.8+ overflow protection |
| | | `3_signed-integers` | Declare `int8` positive/negative and compute difference | Signed numbers, two's complement |
| | | `4_string-literals` | Work with `bytes32` and dynamic `string` | Fixed bytes vs dynamic strings, gas efficiency |
| | | `5_enums` | Define `Food` enum and state choices | State machines, integer representation |
| | `02-solidity-functions`| `1_arguments` | Set contract state variable `x` via constructor argument | Constructor lifecycle, variable shadowing |
| | | `2_increment` | Implement state mutating `increment()` function | Gas cost of SSTORE, transactions vs calls |
| | | `3_view-addition` | Implement read-only `add(uint)` returning sum with `x` | `view` keyword, zero-gas local execution |
| | | `4_console-log` | Hardhat / Foundry debugging with `console.log` | Event-based off-chain debugging |
| | | `5_pure-double` | Pure computation `double(uint)` without reading state | `pure` keyword, compiler optimizations |
| | | `6_double-overload` | Overloaded `double(uint, uint)` returning two doubled values | Function signature matching, polymorphism |
| **2. Addresses** | `01-sending-ether` | `1_storing-owner` | Store deployer address (`msg.sender`) in constructor | Global context variables, address type |
| | | `2_receive-ether` | Implement `receive()` external payable | Receiving plain ETH transfers |
| | | `3_tip-owner` | Transfer incoming `msg.value` directly to owner | `payable(owner).transfer(msg.value)` |
| | | `4_charity` | Collect donations and split balance between charities | Address balance calculations, integer division |
| | | `5_self-destruct` | Destroy contract and transfer remaining funds to recipient | `selfdestruct` opcode, cleanup semantics |
| | `02-reverting-transactions` | `1_constructor-revert` | Revert deployment if `msg.value < 1 ether` | Transaction atomicity, require condition |
| | | `2_only-owner` | Restrict withdrawal function to deployer | Authorization checks, access control |
| | | `3_owner-modifier` | Reusable function modifier `onlyOwner` | Dry code, modifier `_` execution placeholder |
| | `03-calldata` | `1_call-function` | Low-level address `.call()` execution | Invoking target without contract ABI |
| | | `2_signature` | Function selector computation | First 4 bytes of `keccak256("function(types)")` |
| | | `3_with-signature` | Low-level call with arguments using `abi.encodeWithSignature` | Dynamic calldata payload formatting |
| | | `4_arbitrary-alert` | Forward arbitrary calldata to target hero contract | Relaying calls, proxy foundations |
| | | `5_fallback` | Handling unknown calls with `fallback()` | Handling arbitrary invocations & calldata |
| | `04-escrow` | `1_setup` | State variables for depositor, beneficiary, arbiter | Escrow participant architecture |
| | | `2_constructor` | Initialize arbiter and beneficiary in constructor | Deployment parameters |
| | | `3_funding` | Accept initial contract deposit via payable constructor | Initial escrow balance locking |
| | | `4_approval` | Implement `approve()` to transfer funds to beneficiary | Arbiter release mechanism |
| | | `5_security` | Restrict `approve()` strictly to arbiter | Preventing unauthorized fund drains |
| | | `6_events` | Emit `Approved(uint balance)` upon release | EVM event logs and dApp frontend indexing |
| **3. References** | `01-arrays` | `1_fixed-sum` | Sum 5-element fixed-size memory array | Fixed array memory allocation |
| | | `2_dynamic-sum` | Sum dynamic storage array elements | Dynamic array length and iteration |
| | | `3_filter-to-storage` | Filter even numbers from memory to storage array | Storage `.push()`, state alteration |
| | | `4_filter-to-memory` | Filter even numbers into new dynamically sized memory array | In-memory array sizing constraints |
| | | `5_stack-club-1` | Manage membership array with `addMember(address)` | Array lookup and push operations |
| | | `6_stack-club-2` | Implement `isMember` and `removeLastMember` (`pop`) | Array membership check and stack popping |
| | `02-structs` | `1_vote-storage` | Define `Vote` struct and store in state | Struct memory layout and definition |
| | | `2_vote-memory` | Create votes in memory and determine approval | Memory struct instantiation |
| | | `3_vote-array` | Append `Vote` structs to dynamic array | Struct array manipulation |
| | | `4_choice-lookup` | Find vote choices for an address in array | Struct traversal and member access |
| | | `5_single-vote` | Enforce one vote per voter address | Double-voting prevention in struct arrays |
| | | `6_change-vote` | Allow voters to update their previous choice | Storage pointer mutation (`storage` keyword) |
| | `03-mappings` | `1_add-member` | Mapping `mapping(address => bool) members` | O(1) key-value storage lookup |
| | | `2_is-member` | Read membership status from mapping | Default zero-value semantics |
| | | `3_remove-member` | Revoke membership using `delete` | Resetting storage slots to default values |
| | | `4_map-structs` | Map addresses to `User` structs (`balance`, `isActive`) | Storing rich objects in key-value maps |
| | | `5_map-structs-2` | Transfer balance between users in mapping | Multi-user balance accounting and checks |
| | | `6_nested-maps` | Bidirectional connection mapping `map[addr1][addr2]` | Nested mappings and relational graphs |
| **4. Applied** | `01-voting` | `1_proposal` | Initialize proposal struct array with target and calldata | DAO proposal structuring |
| | | `2_cast-a-vote` | Record voter choices with boolean tracking | Voting mechanics and tracking |
| | | `3_multiple-votes` | Support changing vote decisions | Vote switching and tally adjustments |
| | | `4_voting-events` | Emit `ProposalCreated` and `VoteCast` events | On-chain governance event telemetry |
| | | `5_members` | Whitelist voting eligibility to authorized members | Governance access control |
| | | `6_execute` | Execute target external call when threshold met | Autonomous DAO proposal execution |
| | `02-inheritance` | `1_inherit` | Inherit `Hero` base into `Warrior` and `Mage` | Inheritance syntax (`is` keyword) |
| | | `2_constructor-args` | Pass constructor arguments to base contracts | Base constructor initialization |
| | | `3_virtual-override` | Override base attack method with custom logic | `virtual` and `override` functions |
| | | `4_super` | Call parent method using `super.attack(enemy)` | Method chaining and C3 Linearization |
| | | `5_ownable` | Implement access control contract with owner transfer | Reusable authorization base contract |
| | | `6_multiple-inheritance` | Inherit from both `Ownable` and `Transferable` | Multiple inheritance and linearized resolution |

---

## Getting Started & Running Tests

### Prerequisites
- [Foundry](https://book.getfoundry.sh/) (`forge` CLI) installed.

### 1. Compile All Contracts
```bash
forge build
```

### 2. Run All Tests
```bash
forge test
```

### 3. Run Tests for a Specific Chapter or Exercise
```bash
# Test Chapter 1 basic data types
forge test --match-path "*01-basic-data-types*"

# Test Chapter 2 Escrow project
forge test --match-path "*04-escrow*"

# Test Chapter 4 Voting system
forge test --match-path "*01-voting*"
```

### 4. Run with Verbose Traces
```bash
forge test -vvvv
```

---

## License & Attribution
- Based on the official course content from [Alchemy University: Learn Solidity](https://university.alchemy.com/overview/solidity).
- Licensed under the MIT License for educational and study use.
