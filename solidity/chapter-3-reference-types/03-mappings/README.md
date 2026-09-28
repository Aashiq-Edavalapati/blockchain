# Module 03: Mappings

In this module, you will learn how Solidity implements hash tables (mappings), how EVM storage slots are calculated, and how to model complex relationships.

---

## 1. How Mappings Work in EVM

Mappings act as virtually initialized hash tables:
```solidity
mapping(address => uint256) public balances;
```

### Storage Slot Calculation
Unlike arrays, mappings have no concept of length or keys list. Every conceivable key is mapped to a storage slot calculated by:

$$	ext{Slot} = 	ext{keccak256}(	ext{key} \cdot 	ext{mapping\_slot})$$

Because hash collisions are statistically impossible across $2^{256}$ keys, every value exists in its own deterministic slot.

---

## 2. Key Properties of Mappings

- **No Iteration**: You cannot iterate over mappings or obtain their length. If iteration is required, keep an auxiliary array of keys.
- **Default Zero-Values**: Any unassigned key returns the type's default value (`0`, `false`, `address(0)`).
- **Deletion with `delete`**: The `delete mapping[key]` keyword resets the value at that storage slot back to zero (and refunds gas).
- **Nested Mappings**: Mappings can be nested to model matrices or relational tables:
  ```solidity
  // mapping(from => mapping(to => bool))
  mapping(address => mapping(address => bool)) public isFriend;
  ```

---

## 3. Exercises in this Module

1. **[1_add-member](./1_add-member/Contract.sol)**: Store membership in `mapping(address => bool) public members` with `addMember`.
2. **[2_is-member](./2_is-member/Contract.sol)**: Implement `isMember(address)` reading from the mapping.
3. **[3_remove-member](./3_remove-member/Contract.sol)**: Implement `removeMember(address)` using `delete members[addr]`.
4. **[4_map-structs](./4_map-structs/Contract.sol)**: Map addresses to a `User` struct containing `balance` and `isActive`.
5. **[5_map-structs-2](./5_map-structs-2/Contract.sol)**: Implement `transfer(recipient, amount)` between active users with sufficient balance.
6. **[6_nested-maps](./6_nested-maps/Contract.sol)**: Implement a nested connection map `mapping(address => mapping(address => ConnectionTypes))`.

---

## Running Tests

```bash
forge test --match-path "*03-mappings*"
```
