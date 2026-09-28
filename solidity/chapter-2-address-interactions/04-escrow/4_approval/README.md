# Exercise: Escrow Approval Payout

**Path**: `chapter-2-address-interactions/04-escrow/4_approval`

---

## Objective
Implement `approve()` to transfer contract balance to `beneficiary` and update `isApproved = true`.

---

## Files in this Directory
- **Contract(s)**: `Escrow.sol`
- **Foundry Test**: `Escrow.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-2-address-interactions/04-escrow/4_approval*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-2-address-interactions/04-escrow/4_approval*" -vvvv
```
