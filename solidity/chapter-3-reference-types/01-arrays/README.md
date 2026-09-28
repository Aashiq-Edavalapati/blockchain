# Module 01: Arrays

In this module, you will learn how arrays work in Solidity, including sizing, storage layout, memory allocation, and array operations.

---

## 1. Array Categories

### Fixed-Size Arrays
Declared with a fixed compile-time size:
```solidity
uint[5] public fixedArray; // Always contains exactly 5 elements
```

### Dynamically-Sized Arrays
Can grow or shrink at runtime in `storage`:
```solidity
uint[] public dynamicArray; // Initial length is 0
```

---

## 2. Storage Arrays vs Memory Arrays

| Feature | Storage Arrays (`uint[] storage`) | Memory Arrays (`uint[] memory`) |
| :--- | :--- | :--- |
| **Resizing** | Can grow using `.push()` and shrink using `.pop()` | Fixed size at allocation time; cannot push or pop |
| **Allocation** | Declared as state variable | Initialized with `new uint[](length)` |
| **Persistence** | Persists permanently on blockchain | Cleared when function execution completes |
| **Gas Cost** | High (`SSTORE` per item) | Low |

```solidity
// In Storage:
uint[] public storageNumbers;
function add(uint n) external {
    storageNumbers.push(n); // Expands array length
}

// In Memory:
function getEvens(uint[] calldata numbers) external pure returns (uint[] memory) {
    // Memory arrays MUST specify size upfront
    uint[] memory temp = new uint[](numbers.length);
    // temp.push() is NOT ALLOWED in memory!
    return temp;
}
```

---

## 3. Exercises in this Module

1. **[1_fixed-sum](./1_fixed-sum/Contract.sol)**: Take a fixed `uint[5]` memory array and return the sum of all elements.
2. **[2_dynamic-sum](./2_dynamic-sum/Contract.sol)**: Sum all elements in a dynamic `uint[]` storage array.
3. **[3_filter-to-storage](./3_filter-to-storage/Contract.sol)**: Filter even numbers from a memory array and append them into a storage array using `.push()`.
4. **[4_filter-to-memory](./4_filter-to-memory/Contract.sol)**: Filter even numbers entirely in memory (count even items first to allocate exact memory array length).
5. **[5_stack-club-1](./5_stack-club-1/StackClub.sol)**: Maintain an array of member addresses, adding deployer in constructor and supporting `addMember(address)`.
6. **[6_stack-club-2](./6_stack-club-2/StackClub.sol)**: Implement `isMember(address)` and `removeLastMember()` using `members.pop()`.

---

## Running Tests

```bash
forge test --match-path "*01-arrays*"
```
