# Module 02: Inheritance

In this module, you will learn Object-Oriented Programming (OOP) in Solidity: single inheritance, constructor parameter passing, method overriding, `super`, access control patterns (`Ownable`), and multiple inheritance.

---

## 1. Inheritance Syntax (`is`)

Solidity uses the `is` keyword for inheritance:

```solidity
contract Hero {
    uint public health;
    constructor(uint _health) {
        health = _health;
    }
}

contract Warrior is Hero {
    constructor() Hero(200) {} // Passes initial health to Hero constructor
}
```

---

## 2. Virtual and Override

For a derived contract to customize a parent function:
1. The parent function must declare **`virtual`**.
2. The child function must declare **`override`**.

```solidity
contract Hero {
    function attack() public virtual returns (uint) {
        return 10;
    }
}

contract Mage is Hero {
    function attack() public override returns (uint) {
        return 25; // Custom magic attack power
    }
}
```

---

## 3. The `super` Keyword & C3 Linearization

When calling `super.attack()`, Solidity invokes the next contract in the **C3 Linearized inheritance graph** (from most derived to base). This ensures multi-inheritance chains call all ancestor contracts in deterministic order without duplicating executions.

---

## 4. The Canonical `Ownable` Pattern

`Ownable` is one of the most widely used patterns in Ethereum development (standardized by OpenZeppelin):

```solidity
contract Ownable {
    address public owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not owner");
        _;
    }

    function transferOwnership(address newOwner) external onlyOwner {
        require(newOwner != address(0), "Invalid new owner");
        emit OwnershipTransferred(owner, newOwner);
        owner = newOwner;
    }
}
```

---

## 5. Multiple Inheritance

A contract can inherit from multiple parent contracts:

```solidity
contract Collectible is Ownable, Transferable {
    // Collectible inherits methods and storage from both parents
}
```

*Rule*: Base contracts must be listed in order from "most base-like" to "most derived".

---

## 6. Exercises in this Module

1. **[1_inherit](./1_inherit/SuperHeroes.sol)**: Create `Warrior` and `Mage` inheriting base `Hero`.
2. **[2_constructor-args](./2_constructor-args/SuperHeroes.sol)**: Pass initial health arguments to `Hero` base constructor.
3. **[3_virtual-override](./3_virtual-override/SuperHeroes.sol)**: Mark base `attack()` as `virtual` and override in `Warrior` and `Mage`.
4. **[4_super](./4_super/SuperHeroes.sol)**: Use `super.attack(enemy)` to invoke parent attack logic while applying extra hero buffs.
5. **[5_ownable](./5_ownable/Collectible.sol)**: Implement `Ownable` with `onlyOwner` modifier and `transferOwnership()`.
6. **[6_multiple-inheritance](./6_multiple-inheritance/Collectible.sol)**: Inherit from both `Ownable` and `Transferable` into `Collectible`.

---

## Running Tests

```bash
forge test --match-path "*02-inheritance*"
```
