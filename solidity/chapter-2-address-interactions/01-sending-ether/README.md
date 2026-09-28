# Module 01: Sending Ether

In this module, you will learn how Solidity contracts interact with Ether (ETH), manage balances, handle payments, and transfer native currency.

---

## 1. Global Transaction Context

Every message call or transaction in Ethereum carries contextual metadata accessible anywhere in the contract execution:

| Global Variable | Type | Description |
| :--- | :--- | :--- |
| `msg.sender` | `address` | Immediate caller (EOA or another smart contract) |
| `msg.value` | `uint256` | Amount of Wei sent along with the current call |
| `msg.data` | `bytes` | Complete transaction payload / calldata |
| `msg.sig` | `bytes4` | First 4 bytes of calldata (function selector) |
| `address(this).balance`| `uint256` | Current Ether balance of this contract in Wei |

---

## 2. Receiving Ether

A smart contract can receive plain ETH transfers through two special functions:

```solidity
// Called when ETH is sent with empty calldata (e.g., standard transfers)
receive() external payable {
    // custom logic on receive
}

// Called when calldata does NOT match any function signature, or receive() does not exist
fallback() external payable {
    // fallback logic
}
```

```
                 Incoming Transaction
                         │
                 Does msg.data exist?
                     ├─── Yes ───> Does msg.sig match any function?
                     │                 ├─── Yes ───> Execute matching function
                     │                 └─── No  ───> Execute fallback()
                     └─── No  ───> Does receive() exist?
                                       ├─── Yes ───> Execute receive()
                                       └─── No  ───> Execute fallback()
```

---

## 3. Transferring Ether Out

There are three ways to transfer ETH from a contract to an address:

1. **`payable(recipient).transfer(amount)`**
   - Forwards only 2,300 gas stipend (prevents reentrancy).
   - Automatically reverts on failure.
   - *Limitation*: Can fail if recipient is a contract requiring more than 2,300 gas to execute its `receive()` handler.

2. **`payable(recipient).send(amount)`**
   - Forwards 2,300 gas.
   - Returns a `bool success` without reverting automatically.
   - Developer must manually check: `require(success, "Send failed")`.

3. **`recipient.call{value: amount}("")` (Recommended Pattern)**
   - Forwards all remaining gas (or a specified amount).
   - Returns `(bool success, bytes memory data)`.
   - Protects against future gas schedule changes.
   - Must be combined with the **Checks-Effects-Interactions** pattern or a reentrancy guard.

```solidity
(bool sent, ) = payable(recipient).call{value: amount}("");
require(sent, "Failed to send Ether");
```

---

## 4. Self-Destruct (`selfdestruct`)

The `selfdestruct(payable(recipient))` opcode removes the contract bytecode from state storage and forcefully transfers all remaining Ether balance to the recipient address, regardless of whether the recipient defines a `receive()` function.
*(Note: In Ethereum Cancun/EIP-6780, selfdestruct only destroys the contract if invoked in the same transaction as deployment).*

---

## 5. Exercises in this Module

1. **[1_storing-owner](./1_storing-owner/Contract.sol)**: Save `msg.sender` as an immutable owner variable in constructor.
2. **[2_receive-ether](./2_receive-ether/Contract.sol)**: Implement `receive() external payable` to accept incoming ETH.
3. **[3_tip-owner](./3_tip-owner/Contract.sol)**: Implement `tip()` to forward received `msg.value` directly to the owner.
4. **[4_charity](./4_charity/Contract.sol)**: Collect donations, store charity addresses, and split total balance equally between recipients via `tip()`.
5. **[5_self-destruct](./5_self-destruct/Contract.sol)**: Allow the owner to call `donate()` to destroy the contract and transfer balance to charity.

---

## Running Tests

```bash
forge test --match-path "*01-sending-ether*"
```
