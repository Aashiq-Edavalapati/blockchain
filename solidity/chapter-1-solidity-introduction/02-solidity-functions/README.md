# Module 02: Solidity Functions

This module covers functions in Solidity: syntax, constructor lifecycle, state visibility, mutability specifiers, function overloading, and console debugging.

---

## 1. Anatomy of a Solidity Function

```solidity
function functionName(uint parameter1) public view returns (uint) {
    return parameter1 + 10;
}
```

A function declaration specifies:
1. **Name and Parameters**: typed input values.
2. **Visibility**: who can invoke this function (`public`, `external`, `internal`, `private`).
3. **State Mutability**: how this function interacts with state (`pure`, `view`, non-payable, `payable`).
4. **Return Types**: typed return values.

---

## 2. Key Concepts

### Visibility Specifiers
- **`public`**: Accessible internally from within the contract, as well as externally via transactions or calls. Automatic getter functions are created for public state variables.
- **`external`**: Accessible ONLY externally. Cannot be called internally without `this.func()`. Calldata arguments are read directly from transaction payload without copying to memory, saving gas.
- **`internal`**: Accessible only inside the current contract and derived contracts (inheritance). Not callable externally.
- **`private`**: Accessible only within the specific contract where defined. Not accessible to derived contracts or external callers.

### State Mutability Specifiers
- **`pure`**: Does NOT read and does NOT modify state. Only computes using provided arguments and local variables.
- **`view`**: Reads contract state (or calls other view/pure functions), but does NOT modify state.
- **Default (non-payable)**: Can read and modify state, but rejects incoming ETH.
- **`payable`**: Can accept ETH along with the function call (`msg.value > 0`).

```
                +---------------------------------------+
                |           State Mutability            |
+---------------+---------------------+-----------------+
| Pure          | View                | Non-payable     | Payable
| (No Read,     | (Read state,        | (Read/write,    | (Read/write,
|  No Write)    |  No Write)          |  No ETH)        |  Accepts ETH)
+---------------+---------------------+-----------------+
```

### The Constructor
The `constructor` runs exactly once when the contract is deployed.
```solidity
contract Vault {
    address public owner;
    uint public capacity;

    constructor(uint _capacity) {
        owner = msg.sender;
        capacity = _capacity;
    }
}
```
*Note*: Parameter names often prefix an underscore (e.g., `_capacity`) to prevent variable shadowing with storage variables of the same name.

### Function Overloading
Solidity supports declaring multiple functions with the exact same name, provided their parameter types differ. The compiler creates different 4-byte function selectors for each variation.

```solidity
function double(uint x) external pure returns (uint) {
    return x * 2;
}

function double(uint x, uint y) external pure returns (uint, uint) {
    return (x * 2, y * 2);
}
```

### Debugging with `console.log`
Import `hardhat/console.sol` or `forge-std/console.sol` to output debug logs in test traces:
```solidity
import "forge-std/console.sol";

function increment() external {
    x += 1;
    console.log("x is now:", x);
}
```

---

## 3. Exercises in this Module

1. **[1_arguments](./1_arguments/Contract.sol)**: Initialize state variable `x` via constructor parameter.
2. **[2_increment](./2_increment/Contract.sol)**: Implement `increment()` function that increments `x` by 1.
3. **[3_view-addition](./3_view-addition/Contract.sol)**: Implement a `view` function `add(uint y)` returning `x + y`.
4. **[4_console-log](./4_console-log/Contract.sol)**: Use console logging to debug integer addition.
5. **[5_pure-double](./5_pure-double/Contract.sol)**: Implement a `pure` function `double(uint x)` returning `x * 2`.
6. **[6_double-overload](./6_double-overload/Contract.sol)**: Overload `double` to handle both single and double input arguments.

---

## Running Tests

```bash
forge test --match-path "*02-solidity-functions*"
```
