# Exercise: Tipping the Owner

**Path**: `chapter-2-address-interactions/01-sending-ether/3_tip-owner`

---

## Objective
Implement a `tip()` payable function that automatically forwards all incoming `msg.value` directly to the `owner` address.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/3_tip-owner*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/3_tip-owner*" -vvvv
```
