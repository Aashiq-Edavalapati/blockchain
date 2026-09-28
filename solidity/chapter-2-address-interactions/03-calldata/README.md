# Module 03: Calldata & Low-Level Calls

This module dives into EVM calldata mechanics, ABI encoding, function selectors, low-level `.call()`, and building dynamic message forwarders.

---

## 1. What is Calldata?

Calldata is the raw byte payload sent with an Ethereum transaction. It tells the target contract which function to call and what arguments to pass.

### Structure of Calldata:
```
+-----------------------------------+------------------------------------------+
| Function Selector (First 4 Bytes) | Encoded Arguments (32-byte padded chunks) |
+-----------------------------------+------------------------------------------+
| 0xa9059cbb                        | 000000000000000000000000[address]        |
|                                   | 000000000000000000000000[uint256 value]  |
+-----------------------------------+------------------------------------------+
```

### Computing Function Selectors
The selector is the first 4 bytes of the Keccak-256 hash of the canonical function signature (no spaces in parameter types):

$$	ext{Selector} = 	ext{bytes4}(	ext{keccak256}("transfer(address,uint256)"))$$

---

## 2. Low-Level `.call()`

Solidity allows invoking functions on external contracts without requiring their Solidity interface by using low-level `.call()`:

```solidity
(bool success, bytes memory returnData) = targetAddress.call(calldataBytes);
require(success, "Low-level call failed");
```

### Using `abi.encodeWithSignature`
```solidity
bytes memory payload = abi.encodeWithSignature("alert()");
(bool success, ) = heroContract.call(payload);
```

### Passing Arguments
```solidity
bytes memory payload = abi.encodeWithSignature(
    "ambush(address,uint256)",
    enemyAddress,
    ambushCount
);
(bool success, ) = heroContract.call(payload);
```

---

## 3. Fallback Functions
When calldata does not match any function selector in the target contract, the EVM falls back to the contract's `fallback()` function. This is foundational for building upgradeable proxy contracts (EIP-1967).

```solidity
fallback() external {
    // handles any unknown selector or arbitrary calldata
}
```

---

## 4. Exercises in this Module

1. **[1_call-function](./1_call-function/Sidekick.sol)**: Call the `alert()` function on `Hero` using low-level `address.call()`.
2. **[2_signature](./2_signature/Sidekick.sol)**: Manually compute the 4-byte function selector for `alert()` using `bytes4(keccak256(...))`.
3. **[3_with-signature](./3_with-signature/Sidekick.sol)**: Pass arguments dynamically using `abi.encodeWithSignature("ambush(address,uint256)", enemy, count)`.
4. **[4_arbitrary-alert](./4_arbitrary-alert/Sidekick.sol)**: Forward arbitrary calldata payloads directly to the target contract.
5. **[5_fallback](./5_fallback/Sidekick.sol)**: Implement `fallback()` on `Hero` to accept arbitrary calls and set an `alert` boolean state.

---

## Running Tests

```bash
forge test --match-path "*03-calldata*"
```
