export default {
  id: "ibft",
  name: "Istanbul BFT",
  shortName: "IBFT",
  iconName: "Users",
  color: "#9370DB",
  tagline: "PBFT with round-robin leadership.",
  pulseDuration: 1.8,
  strength: "Instant deterministic finality — no forks, no reorgs.",
  tradeoff: "O(n²) message complexity — every validator communicates with every other.",
  family: "BFT",
  variantOf: "Practical Byzantine Fault Tolerance",
  inventor: "ETC Dev Team (Istanbul BFT specification); AMIS / ETC Cooperative",
  organization: "Ethereum Classic / Hyperledger Besu / GoQuorum",
  introducedYear: 2017,
  description:
    "Istanbul BFT (IBFT) is a Byzantine Fault Tolerance consensus protocol adapted from PBFT for use in Ethereum-based permissioned and consortium networks. It uses a three-phase commit process (pre-prepare, prepare, commit) with a leader rotation mechanism. IBFT provides instant finality and is widely used in permissioned Ethereum deployments via Hyperledger Besu and GoQuorum.",
  overview:
    "IBFT is a PBFT variant optimized for blockchain applications using a round-robin leader selection. A leader proposes a block; validators exchange pre-prepare, prepare, and commit messages. Once >2/3 of validators commit, the block is finalized. IBFT provides immediate finality — no forks, no reorganizations. It is suitable for consortium networks requiring high throughput and deterministic finality.",
  history:
    "IBFT was developed for the Ethereum ecosystem to provide a BFT consensus alternative to PoW and PoA. The protocol was formalized as part of the Ethereum Improvement Proposal process, building on the original PBFT work by Castro and Liskov. It was adopted by Hyperledger Besu (originally Pantheon, developed by ConsenSys/PegaSys) and GoQuorum (consensus layer for enterprise Ethereum). The name 'Istanbul' refers to the Istanbul BFT specification used in these platforms.",
  problemSolved:
    "IBFT solves the need for a Byzantine fault-tolerant consensus protocol that integrates with Ethereum's block structure and execution model. It provides instant finality, making it suitable for financial and enterprise applications where transaction reversibility is unacceptable. It also addresses the communication overhead of PBFT by targeting smaller validator sets typical of consortium networks.",
  coreMechanism:
    "A round-based BFT protocol with leader election. The leader (proposer) sends a pre-prepare message proposing a block. Validators respond with prepare messages. After collecting 2f+1 prepares, validators send commit messages. After 2f+1 commits, the block is committed. If the leader fails, a round-change protocol elects a new leader.",
  stepByStepExplanation: [
    "A round begins with the selection of a proposer (leader) from the validator set, typically via round-robin.",
    "The proposer creates a block (including transactions) and broadcasts a 'pre-prepare' message containing the block and the round number.",
    "Each validator receives the pre-prepare, validates the block, and broadcasts a 'prepare' message to all validators.",
    "A validator collects prepare messages from other validators. Once it has 2f+1 (where f is the max faulty nodes) prepare messages matching the block, it transitions to the prepared state.",
    "The validator then broadcasts a 'commit' message to all validators.",
    "A validator collects commit messages. Once it has 2f+1 commit messages, it commits the block to its local state.",
    "The committed block is added to the chain with immediate finality. No subsequent block can revert it.",
    "If the proposer fails to propose a valid block within a timeout, validators initiate a 'round-change' by broadcasting round-change messages. A new proposer is selected for the next round.",
  ],
  advantages: [
    "Instant deterministic finality — no forks, no reorgs.",
    "Byzantine fault tolerance — tolerates up to f faulty validators with 3f+1 nodes.",
    "Ethereum compatible — works with the EVM and Ethereum transaction model.",
    "Low latency — finality in seconds.",
    "No energy waste — no mining or computation required.",
    "Well-documented and production-tested in Hyperledger Besu and GoQuorum.",
  ],
  disadvantages: [
    "O(n²) message complexity — every validator communicates with every other.",
    "Limited validator set size — typically 4–20 validators.",
    "Leader-based — potential for leader-targeted DoS attacks.",
    "Round-change protocol adds latency during leader failure.",
    "Not suitable for permissionless networks — requires known validator set.",
  ],
  bestUseCases: [
    "Consortium and enterprise Ethereum networks.",
    "Private blockchain deployments requiring instant finality.",
    "Financial settlement and supply chain tracking with known participants.",
    "Hyperledger Besu and GoQuorum deployments.",
  ],
  limitations: [
    "Not permissionless — validator set is fixed and known.",
    "Scalability limited in validator count (typically <50 nodes).",
    "Liveness requires >2/3 validators to be online.",
    "Higher latency than simpler crash-fault-tolerant protocols in well-connected environments.",
  ],
  securityExplanation:
    "IBFT inherits PBFT's safety guarantees: as long as at most f out of 3f+1 validators are Byzantine, safety (no conflicting blocks) is guaranteed. Liveness requires >2/3 of validators to be online and non-faulty. The round-change mechanism ensures liveness even if the leader is faulty. IBFT assumes a partially synchronous network model: safety holds in asynchrony, liveness requires eventual synchrony. Like PBFT, if >f validators are malicious, safety can be violated.",
  scalabilityExplanation:
    "IBFT does not scale to large validator sets. The O(n²) message complexity means that doubling the validator count quadruples the message volume. Practical deployments typically have 4–20 validators. Within this range, IBFT can process hundreds of transactions per second, depending on hardware and network conditions. The throughput is competitive with other permissioned BFT systems.",
  decentralizationExplanation:
    "IBFT is designed for permissioned networks, so decentralization is intentionally limited. Validators are typically operated by known consortium members. The degree of decentralization depends on how many distinct organizations run validators and how fairly the validator slots are distributed. IBFT does not include any Sybil resistance mechanism — membership is managed off-chain.",
  energyConsumption:
    "Very low. IBFT uses no mining or computation beyond standard cryptographic operations. Validators run standard server hardware.",
  validatorType: "Pre-approved validator node (known identity)",
  permissionType: "Permissioned",
  leaderElection:
    "Round-robin among the known validator set.",
  forkBehavior:
    "No forks — IBFT provides deterministic finality. Only one block is committed per round. If a malicious leader proposes a conflicting block, validators reject it and initiate a round-change.",
  finalityType:
    "Instant / deterministic finality — block is irreversible once committed.",
  blockProductionMethod:
    "Round-robin leader proposes a block; validators go through pre-prepare, prepare, and commit phases.",
  commonAttacks: [
    "Leader DoS — targeting the current leader to trigger round-changes.",
    "Collusion — f+1 validators collude to violate safety.",
    "Key compromise — a validator's private key is stolen.",
    "Replay attack — replaying old messages in a new round (mitigated by sequence numbers and signatures).",
  ],
  attackResistance:
    "Good within its threat model (up to f Byzantine nodes out of 3f+1). The protocol is proven safe under partial synchrony. The primary attack surface is validator key management: if keys are compromised, the attacker can participate as a Byzantine validator. Collusion requires f+1 validators, which is expensive in a well-governed consortium.",
  typicalTPS:
    "~100–1,000 TPS (observed, Hyperledger Besu IBFT 2.0); higher with optimized hardware",
  typicalBlockTime: "~1–10 seconds (observed, configurable)",
  hardwareRequirements: [
    "Standard server (8+ CPU cores, 32+ GB RAM, SSD).",
    "Low-latency network connections between validators.",
  ],
  realWorldExamples: [
    "Hyperledger Besu (IBFT 2.0)",
    "GoQuorum (consensus layer for enterprise Ethereum)",
    "Numerous enterprise and consortium Ethereum networks",
  ],
  compatibleConsensus: [
    "PBFT (parent protocol)",
    "Clique (PoA alternative in Hyperledger Besu)",
    "QBFT (next-generation IBFT variant in Besu)",
  ],
  references: [
    "Hyperledger Besu. 'IBFT 2.0 Specification' — besu.hyperledger.org",
    "Istanbul BFT EIP — Ethereum Improvement Proposal",
    "GoQuorum Documentation — docs.goquorum.consensys.net",
  ],
  officialDocumentation: "https://besu.hyperledger.org/",
  whitepaper: "https://besu.hyperledger.org/private-networks/concepts/consensus/ibft",
  score: {
    security: 72,
    scalability: 70,
    decentralization: 25,
    energyEfficiency: 97,
  },
};
