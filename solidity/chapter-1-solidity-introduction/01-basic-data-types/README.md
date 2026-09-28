# Module 01: Basic Data Types

In this module, you will learn about Solidity's fundamental value types. Value types are always passed by value (copied when assigned or used as function arguments).

---

## 1. Value Types Overview

| Type | Keyword | Size | Default Value | Notes |
| :--- | :--- | :--- | :--- | :--- |
| **Boolean** | `bool` | 1 byte (8 bits) | `false` | Logical values: `true` or `false` |
| **Unsigned Integer** | `uint8` to `uint256` | 8 to 256 bits | `0` | Non-negative integers (steps of 8 bits) |
| **Signed Integer** | `int8` to `int256` | 8 to 256 bits | `0` | Positive or negative integers (two's complement) |
| **Fixed Bytes** | `bytes1` to `bytes32`| 1 to 32 bytes | `0x00...` | Fixed-size byte sequence; much cheaper than `string` |
| **Dynamic String** | `string` | Dynamic | `""` | UTF-8 encoded text array; dynamic reference type |
| **Enum** | `enum Name { ... }`| 8 bits (uint8) | First member (`0`) | User-defined set of named constants |

---

## 2. In-Depth Concepts

### Booleans (`bool`)
- Supports standard boolean operators:
  - `!` (Logical negation)
  - `&&` (Logical conjunction / AND)
  - `||` (Logical disjunction / OR)
  - `==` (Equality), `!=` (Inequality)
- Default value is `false`.

```solidity
bool public isReady = true;
bool public isPaused = false;
```

### Integers (`uint` and `int`)
- In Solidity, `uint` is an alias for `uint256`, and `int` is an alias for `int256`.
- Sizing options: `uint8`, `uint16`, `uint24`, ..., `uint256` (multiples of 8 bits up to 256).
- **Range Formula**:
  - `uintN`: $0$ to $2^N - 1$. For example, `uint8` goes from 0 to 255.
  - `intN`: $-2^{N-1}$ to $2^{N-1} - 1$. For example, `int8` goes from -128 to 127.
- **Overflow / Underflow Protection**: Since Solidity version `0.8.0`, arithmetic operations automatically revert on overflow or underflow without requiring `SafeMath`. If unchecked behavior is desired to save gas, the `unchecked { ... }` block can be used.

### Strings and Fixed Bytes
- `bytes32` is a value type that occupies exactly one 32-byte EVM storage slot. It is significantly more gas-efficient than `string` for short text (<= 32 ASCII characters).
- `string` is a dynamic data type (an array of UTF-8 bytes). Direct comparison (`str1 == str2`) is not supported natively; to compare strings, hash them:
  ```solidity
  keccak256(abi.encodePacked(str1)) == keccak256(abi.encodePacked(str2));
  ```

### Enums
- Enums restrict a variable to have only one of a predefined set of values.
- Under the hood, enums are represented as unsigned integers (`uint8`), indexed starting at 0.
- Attempting to assign an out-of-range integer will revert at runtime.

```solidity
enum Direction { Up, Down, Left, Right }
Direction public currentDir = Direction.Up; // internally stored as 0
```

---

## 3. Exercises in this Module

1. **[1_booleans](./1_booleans/Contract.sol)**: Declare public boolean state variables `a` (true) and `b` (false).
2. **[2_unsigned-integer](./2_unsigned-integer/Contract.sol)**: Declare `uint8 a = 100`, `uint16 b = 300`, and compute `uint256 sum = a + b`.
3. **[3_signed-integers](./3_signed-integers/Contract.sol)**: Declare `int8 a = 50` and `int8 b = -30`, and store their difference in `int16 difference = a - b`.
4. **[4_string-literals](./4_string-literals/Contract.sol)**: Store `"Hello World"` in a `bytes32 msg1` and a longer message in `string public msg2`.
5. **[5_enums](./5_enums/Contract.sol)**: Create a `Foods` enum with 5 options and store food choices as state variables.

---

## Running Tests

```bash
forge test --match-path "*01-basic-data-types*"
```
