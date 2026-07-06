export default {
  id: "fba",
  name: "Federated Byzantine Agreement",
  shortName: "FBA",
  family: "BFT",
  variantOf: "Practical Byzantine Fault Tolerance",
  inventor: "David Mazières",
  organization: "Stellar Development Foundation",
  introducedYear: 2015,
  description:
    "Federated Byzantine Agreement is a consensus protocol based on quorum slices, introduced by the Stellar network. Instead of a global fixed validator set, each participant chooses a set of nodes it trusts (its quorum slice). Agreement emerges from overlapping slices without requiring a global membership list. This allows open participation while maintaining BFT-grade safety.",
  overview:
    "FBA generalizes PBFT by letting each node define its own quorum slice — the set of nodes whose agreement it considers sufficient. The protocol uses a federated voting process where nodes nominate and vote on candidate values. If quorum slices intersect sufficiently, the network converges on a single value. FBA provides decentralized control over trust while retaining Byzantine fault tolerance guarantees.",
  history:
    "FBA was published by David Mazières in 2015 in the Stellar Consensus Protocol (SCP) whitepaper. Stellar, a payments-focused blockchain founded by Jed McCaleb (also co-founder of Ripple), implemented SCP as its consensus mechanism. The protocol was a groundbreaking generalization of PBFT that solved the problem of open membership in BFT systems. SCP underwent extensive academic peer review and formal verification. Stellar has been operational since 2015.",
  problemSolved:
    "FBA solves the problem of achieving Byzantine consensus in a federated, open-membership network. Unlike PBFT (which requires a fixed global validator list) and PoW/PoS (which require economic games), FBA allows each participant to independently choose whom to trust. Overlapping trust relationships enable global agreement without centralized membership control.",
  coreMechanism:
    "Each node defines a quorum slice — a set of nodes whose agreement implies the node accepts a value. Slices must intersect across the network (quorum intersection). The protocol uses a two-phase voting process: nomination (proposing candidate values) and ballot (confirming agreement). Externalizing validators can observe confirmed values.",
  stepByStepExplanation: [
    "Each node configures its quorum slice — a set of trusted nodes (e.g., Node A trusts {B, C, D}; Node B trusts {A, C, D}).",
    "Nodes broadcast 'nominate' messages proposing candidate values (transactions/blocks) to their slice.",
    "When a node receives confirmations from all nodes in its slice for a candidate, it considers the candidate 'confirmed' and votes to accept it.",
    "Votes propagate through overlapping slices. If quorum slices intersect sufficiently, a candidate reaches consensus across the network.",
    "Once a value is accepted by enough overlapping quorums, it is externalized (committed) and irrevocable.",
    "If the network cannot reach consensus on a candidate (e.g., conflicting transactions), nodes may need to adjust their slices or the protocol retries with different candidates.",
  ],
  advantages: [
    "Open membership — anyone can join without global permission.",
    "Decentralized trust — each node chooses its own trusted peers.",
    "Byzantine fault tolerance — proven safety with up to f faulty nodes per quorum.",
    "No energy waste — no mining or computation required.",
    "Low latency — transactions typically finalize in 3–5 seconds.",
    "Configurable control — organizations can determine their own trust relationships.",
  ],
  disadvantages: [
    "Complex quorum slice configuration — requires understanding of the trust graph.",
    "Slices are difficult to change once configured.",
    "No incentive layer — no native mechanism to reward node operators.",
    "Quorum intersection failure can cause liveness problems (network splits).",
    "Limited tooling and documentation compared to PoS/PoW systems.",
    "Less suited for general-purpose smart contracts (Stellar focuses on payments and assets).",
  ],
  bestUseCases: [
    "Cross-border payment and settlement networks.",
    "Asset tokenization and issuance platforms.",
    "Financial inclusion applications where open membership matters.",
    "Enterprise consortiums where different organizations have different trust preferences.",
    "Banking and fintech interoperability layers.",
  ],
  limitations: [
    "Quorum slice discovery and configuration is a usability challenge.",
    "No formal staking or slashing mechanism — security relies entirely on quorum integrity.",
    "Smart contract expressiveness is limited compared to Ethereum-style platforms.",
    "Topology analysis is required to ensure quorum intersection and avoid fragmentation.",
  ],
  securityExplanation:
    "FBA safety relies on quorum intersection: any two quorums must share at least one honest node. If quorums intersect correctly, the protocol guarantees that no two nodes externalize conflicting values. The threshold for Byzantine fault tolerance depends on individual quorum configuration; each node tolerates up to f faulty nodes within its chosen slice. Unlike PoW/PoS, there is no economic security — trust flows from node-selected membership relationships.",
  scalabilityExplanation:
    "FBA scales well for its intended use case. Because nodes only communicate within their quorum slices (not globally), the message complexity is proportional to slice size rather than total network size. Stellar's public network handles thousands of transactions per second. However, FBA does not provide the global execution scalability needed for high-throughput general-purpose smart contract platforms.",
  decentralizationExplanation:
    "FBA offers a unique form of decentralization. There is no single validator set — each node defines its own trust boundaries. However, in practice, the Stellar network's trust graph has tended toward centralization around well-known anchor organizations. The concept of quorum slices adds architectural decentralization but creates usability complexity for individual users.",
  energyConsumption:
    "Very low. FBA runs on standard server hardware with no mining or intensive computation. Energy consumption is comparable to running a small cluster of database servers.",
  validatorType: "Node operator with configured quorum slice",
  permissionType: "Permissionless (anyone can run a node and define slices)",
  leaderElection:
    "No fixed leader. Nodes nominate candidate values; consensus emerges from the federated voting process.",
  forkBehavior:
    "No forks under normal conditions due to BFT safety guarantees. If quorum intersection is maintained, conflicting values cannot both externalize.",
  finalityType:
    "Deterministic finality — once a value is externalized, it is irreversible.",
  blockProductionMethod:
    "Nodes nominate transaction sets; the protocol converges on a single set that passes all relevant quorums.",
  commonAttacks: [
    "Quorum intersection attack — an attacker manipulates trust relationships to partition the network.",
    "Sybil attack on quorum discovery — creating many nodes to influence trust graphs.",
    "Split-brain attack — convincing disjoint sets of nodes to externalize conflicting values.",
    "Eclipse attack — isolating a node to prevent it from participating in consensus.",
  ],
  attackResistance:
    "Good against traditional BFT attacks but vulnerable to trust-graph manipulation. If an adversary controls key nodes in many quorum slices (e.g., by becoming a widely trusted anchor), they can cause safety failures. The protocol requires careful topology planning. Sybil resistance depends on nodes not including untrusted entities in their slices rather than on economic barriers.",
  typicalTPS: "~1,000–4,000 TPS (observed, Stellar mainnet)",
  typicalBlockTime: "~3–5 seconds (observed, Stellar mainnet)",
  hardwareRequirements: [
    "Standard server (4+ CPU cores, 16+ GB RAM, SSD).",
    "Stable internet connection.",
    "No specialized hardware required.",
  ],
  realWorldExamples: [
    "Stellar (SCP — Stellar Consensus Protocol)",
    "Interstellar network (enterprise Stellar)",
  ],
  compatibleConsensus: [
    "PBFT (parent academic tradition)",
    "Ripple Consensus (similar federated model but not BFT)",
  ],
  references: [
    "Mazières, D. 'The Stellar Consensus Protocol: A Federated Model for Internet-Level Consensus' (2015)",
    "Stellar Development Foundation. 'Stellar Consensus Protocol' — stellar.org",
    "Losa, G. & Mazières, D. 'Safety and Liveness of the Stellar Consensus Protocol' (2018)",
  ],
  officialDocumentation: "https://developers.stellar.org/docs/fundamentals-and-concepts/stellar-consensus-protocol",
  whitepaper: "https://stellar.org/papers/stellar-consensus-protocol.pdf",
  score: {
    security: 72,
    scalability: 68,
    decentralization: 55,
    energyEfficiency: 97,
  },
};
