# Exercise: Receiving Ether

**Path**: `chapter-2-address-interactions/01-sending-ether/2_receive-ether`

---

## Objective
Add a `receive() external payable` function to allow the contract to receive plain ETH transfers.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/2_receive-ether*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/2_receive-ether*" -vvvv
```
