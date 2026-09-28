# Exercise: Map Address to Struct

**Path**: `chapter-3-reference-types/03-mappings/4_map-structs`

---

## Objective
Create a `User` struct (`balance`, `isActive`) and store in `mapping(address => User) public users`.

---

## Files in this Directory
- **Contract(s)**: `Contract.sol`
- **Foundry Test**: `Contract.t.sol`

---

## How to Test

Run the test suite for this specific exercise using Foundry:
```bash
forge test --match-path "*chapter-3-reference-types/03-mappings/4_map-structs*"
```

To see detailed execution traces:
```bash
forge test --match-path "*chapter-3-reference-types/03-mappings/4_map-structs*" -vvvv
```
