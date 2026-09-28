# Exercise: Self-Destruct

**Path**: `chapter-2-address-interactions/01-sending-ether/5_self-destruct`

---

## Objective
Implement `donate()` which triggers `selfdestruct(payable(charity))` to destroy the contract and send remaining funds to charity.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/5_self-destruct*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/5_self-destruct*" -vvvv
```
