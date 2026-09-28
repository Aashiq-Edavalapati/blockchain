# Module 02: Reverting Transactions

In this module, you will learn how transactions fail in the EVM, how state changes roll back atomically, and how to implement clean access control using modifiers and custom errors.

---

## 1. Transaction Atomicity & Reverts

Ethereum transactions are **atomic**: either every state change in the transaction succeeds, or the transaction reverts. When a transaction reverts:
- All storage modifications are wiped clean (as if the transaction never executed).
- Unused gas is refunded to the sender.
- A revert reason / error code can be returned to the caller.

---

## 2. Revert Mechanisms in Solidity

### `require(condition, "Error message")`
- Evaluates a boolean condition. If false, reverts execution and returns the error string.
- Common for parameter validation and authorization.

```solidity
require(msg.value >= 1 ether, "Must send at least 1 ether");
```

### `revert()` & Custom Errors (Solidity >= 0.8.4)
- Custom errors are defined with `error ErrorName(types)` and invoked via `revert ErrorName()`.
- **Gas Advantage**: Custom errors do not store dynamic strings, saving significant deployment and execution gas.

```solidity
error Unauthorized();
error InsufficientBalance(uint available, uint required);

if (msg.sender != owner) {
    revert Unauthorized();
}
```

### `assert(condition)`
- Used to test internal invariants that should NEVER be false in bug-free code.
- In earlier versions, burned all remaining gas (`0xfe` INVALID opcode); in modern EVM, emits `Panic(uint256)`.

---

## 3. Function Modifiers

Modifiers allow reusable precondition checks before or after executing a function body. The `_` symbol represents the point where the modified function's body is inserted.

```solidity
contract Guarded {
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _; // modified function executes here
    }

    function withdraw() external onlyOwner {
        payable(owner).transfer(address(this).balance);
    }
}
```

---

## 4. Exercises in this Module

1. **[1_constructor-revert](./1_constructor-revert/Contract.sol)**: In the constructor, require `msg.value >= 1 ether`, reverting otherwise.
2. **[2_only-owner](./2_only-owner/Contract.sol)**: Restrict the `withdraw()` function so that only the deployer can withdraw contract funds.
3. **[3_owner-modifier](./3_owner-modifier/Contract.sol)**: Create an `onlyOwner` modifier and apply it across multiple functions (`a`, `b`, `c`).

---

## Running Tests

```bash
forge test --match-path "*02-reverting-transactions*"
```
