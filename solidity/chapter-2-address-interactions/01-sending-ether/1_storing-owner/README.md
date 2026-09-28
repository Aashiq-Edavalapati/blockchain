# Exercise: Storing Owner

**Path**: `chapter-2-address-interactions/01-sending-ether/1_storing-owner`

---

## Objective
Capture the deployer address by assigning `msg.sender` to a state variable `owner` inside the constructor.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/1_storing-owner*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/01-sending-ether/1_storing-owner*" -vvvv
```
