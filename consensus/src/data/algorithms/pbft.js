export default {
  id: "pbft",
  name: "Practical Byzantine Fault Tolerance",
  shortName: "PBFT",
  iconName: "Users",
  color: "#7B68EE",
  tagline: "Three-phase BFT with instant finality.",
  pulseDuration: 1.9,
  strength: "Instant finality — once committed, blocks are irreversible.",
  tradeoff: "O(n²) communication limits scalability to ~100–200 nodes.",
  family: "BFT",
  variantOf: null,
  inventor: "Miguel Castro, Barbara Liskov",
  organization: "Massachusetts Institute of Technology (MIT)",
  introducedYear: 1999,
  description:
    "Practical Byzantine Fault Tolerance is a replicated state machine consensus protocol designed to work in asynchronous networks where nodes may fail arbitrarily (Byzantine faults). It provides safety (consistency) and liveness (progress) as long as at most one-third of validators are faulty. PBFT was the first practical solution to the Byzantine Generals Problem for distributed systems.",
  overview:
    "PBFT achieves consensus through a three-phase message exchange: pre-prepare, prepare, and commit. A leader proposes a block or request; validators exchange signed messages to agree. With 3f+1 nodes, it tolerates up to f faulty nodes. PBFT provides instantaneous finality — once committed, a block is irreversible. Communication complexity is O(n²), limiting the number of participants.",
  history:
    "PBFT was introduced by Miguel Castro and Barbara Liskov in their 1999 paper 'Practical Byzantine Fault Tolerance'. It was the first Byzantine fault-tolerant protocol practical enough for real-world use (sub-millisecond overhead in their benchmarks). The protocol influenced many later blockchain consensus mechanisms, including Tendermint, Istanbul BFT (IBFT), and HotStuff. It has been implemented in systems including the Zyzzyva protocol, Hyperledger Fabric (early versions), and various enterprise blockchain platforms.",
  problemSolved:
    "PBFT solves the Byzantine Generals Problem in a distributed computing context with a known, fixed set of participants. Unlike PoW, it does not require computational puzzles or economic incentives. It provides both safety (all honest nodes agree on the same value) and liveness (the system eventually produces a result) in an asynchronous network prone to arbitrary node failures.",
  coreMechanism:
    "PBFT uses a leader-based three-phase protocol. The leader (primary) proposes a request. Validators exchange pre-prepare, prepare, and commit messages. A quorum of 2f+1 matching prepare messages ensures agreement on the request order; 2f+1 commit messages ensure finalization. If the leader is faulty, a view-change protocol elects a new leader.",
  stepByStepExplanation: [
    "A client sends a transaction or request to the network. The current leader (primary) is responsible for ordering it.",
    "The leader assigns a sequence number to the request and broadcasts a 'pre-prepare' message to all backup validators (replicas).",
    "Each backup validator receives the pre-prepare, verifies the request signature and sequence number, then broadcasts a 'prepare' message to all other validators.",
    "A validator collects prepare messages. Once it has 2f+1 matching prepare messages (including its own), it considers the request 'prepared' and broadcasts a 'commit' message.",
    "A validator collects commit messages. Once it has 2f+1 matching commit messages, it executes the request and commits the result to its state.",
    "The client waits for f+1 matching replies for confirmation (tolerance of faulty validators).",
    "If the leader fails to make progress (no pre-prepare, or invalid proposals), backup validators initiate a 'view-change' to elect a new leader and continue from the last checkpoint.",
    "A checkpointing protocol periodically trims the log — validators exchange proof of the latest stable state to discard old messages.",
  ],
  advantages: [
    "Instant finality — once committed, blocks are irreversible.",
    "Low latency — finality in seconds (sub-second in optimized networks).",
    "No forks — all honest validators agree on the exact same chain history.",
    "No energy waste — no mining or computation required.",
    "State machine replication correctness — proven safety under partial synchrony.",
    "Tolerates arbitrary (Byzantine) faults, not just crashes.",
  ],
  disadvantages: [
    "Communication complexity is O(n²) — each validator exchanges messages with every other validator, limiting scalability to ~100–200 nodes.",
    "Requires a known, static validator set — not suitable for permissionless networks.",
    "Leader-based — the leader can be a bottleneck and target for DoS attacks.",
    "View-change protocol is complex and adds overhead during leader failure.",
    "Synchronous assumptions for liveness (needs bounded network delay for progress).",
  ],
  bestUseCases: [
    "Enterprise and consortium blockchain networks.",
    "Permissioned distributed systems with a moderate number of known participants.",
    "Financial settlement and trading platforms requiring instant finality.",
    "Hyperledger Fabric and similar enterprise frameworks.",
  ],
  limitations: [
    "Does not scale to hundreds of validators due to O(n²) message complexity.",
    "Cannot support permissionless participation — identity and membership must be known.",
    "Theoretical maximum fault tolerance is 33% (f out of 3f+1 nodes).",
    "Liveness depends on bounded network delay; in asynchronous networks, the FLP impossibility theorem implies eventual guarantees only.",
  ],
  securityExplanation:
    "PBFT provides safety under any network condition (even asynchrony) as long as at most f nodes out of 3f+1 are faulty. It guarantees that all honest nodes commit the same sequence of requests. If an adversary controls more than f nodes, they can violate safety. Security assumes cryptographic signatures cannot be forged and that the network eventually delivers messages. The leader can be malicious, but the view-change protocol mitigates this by replacing faulty leaders.",
  scalabilityExplanation:
    "PBFT does not scale well to large validator sets. Each consensus round requires O(n²) messages — every validator sends prepare and commit messages to every other validator. For n=100, this is 10,000 messages per round; for n=1,000, it is 1,000,000. Practical deployments are typically limited to ~20–200 validators. Some variants (e.g., HotStuff, Streamlet) reduce communication to O(n) by using signature aggregation.",
  decentralizationExplanation:
    "PBFT is typically deployed in permissioned environments with a fixed, known validator set (e.g., 4–100 nodes). It is not designed for permissionless networks where anyone can join. The degree of decentralization depends entirely on how the validator set is selected and governed. In an enterprise consortium, decentralization is minimal (participants are known corporations).",
  energyConsumption:
    "Very low. PBFT does not require mining or computation beyond standard cryptographic operations (signing, verification). The energy footprint of a PBFT network scales linearly with the number of validators and is comparable to running a small cluster of servers.",
  validatorType: "Pre-defined replica node (validator)",
  permissionType: "Permissioned (membership is fixed and known)",
  leaderElection:
    "Round-robin or rotation by view number among the known validator set.",
  forkBehavior:
    "No forks — PBFT is a single-chain consensus that guarantees all honest nodes agree on exactly the same sequence of blocks. If a leader proposes a conflicting block, it is detected and the view-change protocol replaces the leader.",
  finalityType:
    "Instant / deterministic finality — once the commit phase completes, the block is irreversible.",
  blockProductionMethod:
    "Leader proposes a block; validators go through pre-prepare, prepare, and commit phases to agree.",
  commonAttacks: [
    "Leader-based DoS — target the current leader to trigger frequent view-changes.",
    "Sybil attack — not possible in permissioned settings but relevant if membership is weak.",
    "Man-in-the-middle — intercept and modify messages (mitigated by signatures).",
    "Replay attack — re-broadcast old messages (mitigated by sequence numbers).",
    "Faulty leader — malicious proposals or refusal to propose (handled by view-change).",
  ],
  attackResistance:
    "High within its threat model. PBFT tolerates up to f Byzantine faults. Message integrity is protected by signatures. The view-change protocol ensures liveness even if a leader is faulty. However, if an adversary controls >f nodes, safety is irreparably violated. DoS attacks on the leader are partially mitigated by view-change but still cause performance degradation.",
  typicalTPS:
    "~1,000–10,000 TPS (observed, varies by implementation and hardware); 20,000+ TPS in optimized deployments",
  typicalBlockTime:
    "~1–6 seconds (observed, network-latency dependent); slower in wide-area networks",
  hardwareRequirements: [
    "Standard server hardware (8+ CPU cores, 32+ GB RAM, SSD).",
    "Low-latency network connections between validators.",
    "No specialized cryptographic hardware required.",
  ],
  realWorldExamples: [
    "Hyperledger Fabric (endorsement and ordering, early versions used PBFT variants)",
    "Zilliqa (PBFT-driven consensus for shards)",
    "NEO dBFT (delegated PBFT variant)",
    "Various enterprise blockchain platforms",
  ],
  compatibleConsensus: [
    "Tendermint (derived from PBFT concepts)",
    "IBFT (Istanbul BFT, adapted for Ethereum)",
    "HotStuff (linear PBFT variant)",
    "Streamlet (simplified PBFT)",
  ],
  references: [
    "Castro, M. & Liskov, B. 'Practical Byzantine Fault Tolerance' (1999)",
    "Castro, M. & Liskov, B. 'Practical Byzantine Fault Tolerance and Proactive Recovery' (2002)",
    "Liskov, B. 'From Viewstamped Replication to Byzantine Fault Tolerance' (2023)",
  ],
  officialDocumentation: "http://pmg.csail.mit.edu/papers/osdi99.pdf",
  whitepaper: "http://pmg.csail.mit.edu/papers/osdi99.pdf",
  score: {
    security: 76,
    scalability: 78,
    decentralization: 30,
    energyEfficiency: 97,
  },
};
