export default {
  id: "poa",
  name: "Proof of Authority",
  shortName: "PoA",
  family: "Proof of X",
  variantOf: null,
  inventor: "Gavin Wood (proposed for Ethereum testnets)",
  organization: "Ethereum Foundation / Parity Technologies",
  introducedYear: 2015,
  description:
    "Proof of Authority is a consensus mechanism where a small set of pre-approved, identity-verified validators are authorized to produce blocks. Trust is placed in the known identity and reputation of the validators rather than in stake or computational power. It provides fast block times and high throughput at the cost of strong centralization.",
  overview:
    "PoA relies on a whitelist of validators whose real-world identities are publicly known or verified. These validators take turns proposing and signing blocks. Because the set is small and trust is explicit, PoA achieves fast finality with minimal overhead. It is widely used in private and test networks, as well as some public sidechains.",
  history:
    "Proof of Authority was first discussed in 2015 by Gavin Wood, co-founder of Ethereum and founder of Parity Technologies. It was implemented as a consensus engine for Ethereum testnets (Kovan) and private chains. The concept gained traction as a lightweight alternative to PoW for development and testing. In 2017, the Ethereum community adopted PoA-based consensus for several proof-of-concept networks. Today, PoA variants like Clique (Ethereum), Aura (Parity/Substrate), and Parlia (BNB Smart Chain) are widely deployed.",
  problemSolved:
    "PoA solves the need for a fast, low-cost consensus in environments where validators are known and trusted. It eliminates energy waste (PoW) and token-staking requirements (PoS), making it ideal for testnets, consortium chains, and sidechains where security derives from legal agreements and reputational bonds.",
  coreMechanism:
    "A governance body or smart contract maintains a whitelist of authorized validators, each with a verified identity. Validators take turns (round-robin or randomized from the set) proposing blocks. Each proposed block is signed by its producer; peers verify the signature against the whitelist. Misbehaviour leads to removal from the whitelist.",
  stepByStepExplanation: [
    "A governance body establishes a whitelist of authorized validators with verified real-world identities.",
    "Validators are added or removed from the whitelist via a governance vote or administrative process.",
    "A deterministic schedule (e.g., round-robin) assigns block production slots to validators in turn.",
    "When it is a validator's turn, it collects transactions, builds a block, signs it with its private key, and broadcasts it.",
    "Other validators and full nodes verify the signature against the whitelist and validate all transactions.",
    "The block is appended to the chain. If a validator misses its slot or proposes an invalid block, it may be penalized or removed.",
    "Because the validator set is small and known, blocks propagate quickly and finality is near-instant.",
  ],
  advantages: [
    "Extremely fast — block times of 1–5 seconds.",
    "High throughput — capable of hundreds to thousands of TPS.",
    "Low resource requirements — no mining, minimal computational overhead.",
    "Accountable — validators have real-world identities and legal liability.",
    "Energy efficient — negligible energy consumption.",
    "Deterministic block production — predictable schedule.",
  ],
  disadvantages: [
    "Strongly centralized — security relies on a small, trusted set of validators.",
    "Censorship risk — validators can collude to block transactions.",
    "Sybil resistance depends on identity verification, which is subjective and labor-intensive.",
    "Governance challenges — adding/removing validators requires a centralized process or complex governance.",
    "Lower liveness guarantees if validators go offline (small set means each member matters).",
    "Real-world identity exposure may deter some participants.",
  ],
  bestUseCases: [
    "Testnets (e.g., Ethereum Kovan, Rinkeby).",
    "Private or consortium blockchain networks.",
    "Sidechains that checkpoint to a more decentralized main chain.",
    "Enterprise blockchain deployments where participants are legally identified.",
    "Local development and CI/CD pipelines.",
  ],
  limitations: [
    "Not suitable for permissionless, censorship-resistant blockchains.",
    "Validator set is typically small (<25), making it fragile and collusion-prone.",
    "Trust model is explicit rather than cryptoeconomic.",
    "Requires robust identity verification processes beyond the protocol itself.",
  ],
  securityExplanation:
    "PoA security relies entirely on the reputational and legal accountability of validators. Unlike PoW (hash power) or PoS (stake), there is no on-chain economic penalty for misbehaviour beyond removal from the set. The threat of legal recourse, identity exposure, and reputational damage serves as the deterrent. An attacker who compromises a validator's key can sign malicious blocks, but this is mitigated by the governance system that can rapidly remove compromised validators. Security is adequate for testnets and consortium chains but insufficient for high-value, permissionless networks.",
  scalabilityExplanation:
    "PoA is highly scalable within the constraints of its validator set. Because communication scales linearly with the number of validators, a small set (e.g., 5–25) enables very fast block production and propagation. Throughput is primarily limited by the execution capacity of individual validators, not by consensus overhead. BNB Smart Chain (Parlia) achieves ~3-second blocks and supports hundreds of TPS.",
  decentralizationExplanation:
    "PoA is inherently centralized. Authority is concentrated in hands of a small whitelisted set. There is no mechanism for permissionless entry; participants must be vetted and approved. In the context of a decentralized blockchain trilemma, PoA sacrifices decentralization almost entirely in exchange for scalability and usability in trust-constrained environments.",
  energyConsumption:
    "Negligible. PoA validators run standard server hardware with no mining or intensive computation. The energy footprint of an entire PoA network is comparable to a handful of desktop computers.",
  validatorType: "Pre-approved, identity-verified authority node",
  permissionType: "Permissioned",
  leaderElection:
    "Deterministic scheduling — typically round-robin among the whitelisted set.",
  forkBehavior:
    "Forks are rare due to synchronized round-robin scheduling. If a validator misses its slot, the next validator builds on the previous block. Accidental forks can occur with network latency but are resolved by the longest chain rule.",
  finalityType:
    "Instant or near-instant finality — blocks are irreversible once the next validator builds on them (practically deterministic).",
  blockProductionMethod:
    "Round-robin: each whitelisted validator takes a turn producing a signed block during its assigned time slot.",
  commonAttacks: [
    "Key compromise — an attacker steals a validator's private key.",
    "Collusion among validators to censor transactions.",
    "Denial of service — taking validators offline via network attacks.",
    "Governance attack — manipulating the validator whitelist process.",
  ],
  attackResistance:
    "Low-to-moderate. The primary vulnerability is validator key compromise, which can be mitigated by hardware security modules (HSMs) and multi-sig. Collusion resistance depends entirely on off-chain governance and legal agreements. DoS attacks are easier because the validator set is small and publicly known. The protocol itself has no slashing or automatic penalty mechanism (though implementations like Clique allow temporary bans).",
  typicalTPS: "~100–1,000+ TPS (observed, varies by implementation and block gas limits)",
  typicalBlockTime: "~1–5 seconds (observed, varies by implementation)",
  hardwareRequirements: [
    "Standard server (4+ CPU cores, 16+ GB RAM, 200+ GB SSD).",
    "Stable internet connection.",
    "Optional: HSM for key protection.",
  ],
  realWorldExamples: [
    "BNB Smart Chain (Parlia — hybrid PoSA with staking)",
    "VeChain (PoA with Authority Masternodes)",
    "Ethereum Kovan Testnet (Clique PoA)",
    "POA Network (Gnosis Chain predecessor)",
    "Azure Blockchain Service (consortium PoA)",
  ],
  compatibleConsensus: [
    "Clique (Ethereum PoA engine)",
    "Aura (Substrate/Polkadot PoA engine)",
    "Parlia (BNB Smart Chain hybrid)",
  ],
  references: [
    "Wood, G. 'Proof of Authority' — Parity Tech Blog (2015)",
    "Ethereum Clique Consensus Specification — EIP-225",
    "POA Network Whitepaper — poa.network",
  ],
  officialDocumentation: "https://openethereum.github.io/Proof-of-Authority-Chains",
  whitepaper: "https://github.com/ethereum/EIPs/blob/master/EIPS/eip-225.md",
  score: {
    security: 55,
    scalability: 93,
    decentralization: 15,
    energyEfficiency: 98,
  },
};
