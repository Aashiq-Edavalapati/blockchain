export default {
  id: "poh",
  name: "Proof of History",
  shortName: "PoH",
  iconName: "Timer",
  color: "#14F195",
  tagline: "Trust earned by a verifiable cryptographic clock.",
  pulseDuration: 0.6,
  strength: "Extreme throughput and sub-second block times.",
  tradeoff: "High hardware requirements shrink the validator set.",
  family: "Proof of X",
  variantOf: null,
  inventor: "Anatoly Yakovenko",
  organization: "Solana Labs",
  introducedYear: 2017,
  description:
    "Proof of History is not a consensus mechanism itself but a verifiable delay function that creates a historical record of events proving that a sequence of events occurred in a specific order. It serves as a cryptographic clock for Solana, enabling high throughput by reducing validator communication overhead. Solana combines PoH with Tower BFT (a PoS-based BFT consensus) for full agreement.",
  overview:
    "PoH generates a continuous sequence of hashes where each output is the hash of the previous output plus some optional data. This creates an ordered, verifiable timeline. Validators can independently verify the sequence without communicating with each other. Combined with a PoS BFT consensus (Tower BFT), PoH enables Solana to achieve extremely high throughput and sub-second block times.",
  history:
    "Proof of History was developed by Anatoly Yakovenko, who published the initial whitepaper in 2017. Yakovenko, a former Qualcomm and Dropbox engineer, wanted to build a blockchain that could achieve the throughput of a centralized system without sacrificing decentralization. The PoH concept was inspired by Verifiable Delay Functions (VDFs) and the need for a global clock in distributed systems. Solana mainnet launched in March 2020. PoH has since been studied and referenced extensively as a novel approach to blockchain ordering.",
  problemSolved:
    "PoH solves the blockchain clock problem. In traditional BFT and PoS systems, validators spend significant communication overhead agreeing on timestamps and event ordering. PoH provides a trustless, pre-ordered timeline that drastically reduces the consensus communication burden. Validators do not need to agree on the order of events — they just verify the order encoded in the PoH sequence.",
  coreMechanism:
    "A leader continuously hashes a counter, appending optional data (transactions) into the hash stream. Each hash output is a checkpoint that proves data existed at a certain point in the sequence. This creates a verifiable chronological chain. Validators replay the sequence to verify order and timeliness. Tower BFT, a stake-weighted BFT overlay, then confirms the blocks produced by the leader.",
  stepByStepExplanation: [
    "A designated leader node begins a sequential SHA-256 computation: hash_0 = H(seed), hash_1 = H(hash_0 || data_1), hash_2 = H(hash_1 || data_2), etc.",
    "The leader embeds transactions and any arbitrary data between hashes, producing a verifiable stream of events with cryptographic proofs of order.",
    "Incoming transactions are periodically hashed into the sequence, establishing their order relative to every other entry.",
    "The leader, selected via a stake-weighted schedule, broadcasts the PoH sequence (with embedded transactions) to validator nodes.",
    "Validators independently replay the hash sequence, verifying that each hash correctly follows from the previous one and the embedded data.",
    "After verifying the PoH sequence, validators participate in Tower BFT — a stake-weighted vote on the validity of the proposed block.",
    "Once a supermajority of stake has voted to confirm, the block is finalized on the canonical chain.",
    "The leader role rotates on a fixed schedule (every 4 slots, each slot ~400ms) to the next stake-weighted validator.",
  ],
  advantages: [
    "Extremely high throughput — theoretical peak of 65,000+ TPS.",
    "Sub-second block times — ~400ms slots enable near-instant user experiences.",
    "Reduced validator communication — order is pre-established in the PoH sequence.",
    "Deterministic ordering — transaction order is provable and auditable.",
    "Parallel transaction execution — Solana can process non-overlapping transactions in parallel.",
    "Global state moniker — all validators share the same state view, simplifying application development.",
  ],
  disadvantages: [
    "High hardware and bandwidth requirements limit the validator set.",
    "Leader-based — the current leader controls which transactions are included.",
    "PoH generation requires high-performance computing resources.",
    "Relatively new and less battle-tested than PoW or traditional PoS.",
    "Sequential hash generation is compute-intensive, favoring hardware with high single-threaded performance.",
    "Network congestion issues (e.g., history of outages during high-demand periods).",
  ],
  bestUseCases: [
    "High-frequency decentralized applications (DEXs, trading platforms).",
    "Gaming and real-time interactive applications.",
    "Networks requiring high throughput with a single global state.",
    "Decentralized exchanges needing fast order-book updates.",
  ],
  limitations: [
    "Validator set is hardware-constrained — GPUs or high-end CPUs required for competitive validation.",
    "Leader rotation and PoH generation create a window of centralization risk.",
    "Bandwidth requirements increase linearly with throughput, making low-resource participation difficult.",
    "PoH is not a standalone consensus mechanism; it requires an accompanying consensus (Tower BFT).",
  ],
  securityExplanation:
    "PoH itself provides ordering proofs, not consensus security. The security of Solana's combined system relies on Tower BFT — a PoS-based BFT protocol that provides safety and liveness under the assumption of >2/3 honest stake. PoH prevents validators from equivocating about the order of events. However, the leader has significant power during its slot; validators can vote to reject a leader's proposed chain. The high hardware barrier reduces the validator set, which may impact security against coalition attacks.",
  scalabilityExplanation:
    "PoH + Solana's architecture achieves extremely high scalability for a monolithic (single-shard) blockchain. The global state is maximized: one state, many transactions in parallel. Theoretical throughput exceeds 65,000 TPS (Solana's whitepaper claim), with observed throughput around 2,000–4,000 TPS on mainnet under normal conditions. The bottleneck is typically validator hardware (CPU, GPU, bandwidth). Unlike sharded designs, Solana does not partition state, so scaling requires all validators to keep up with the full transaction load.",
  decentralizationExplanation:
    "Solana's decentralization is limited by its high hardware requirements. Running a validator requires significant computational resources (high-end CPU, GPU, fast SSD, high-bandwidth connection). This excludes residential-grade participants and concentrates validation among well-funded operators. As of 2024, Solana has ~1,900–2,500 validators, which is moderate but lower than Ethereum's ~1 million validators. The hardware cost creates a centralization pressure that is a known trade-off for Solana's performance model.",
  energyConsumption:
    "Moderate. PoH generation uses significant CPU/GPU resources, but far less than PoW mining. Total network energy consumption is higher than simple BFT/PoS systems but orders of magnitude lower than PoW networks per transaction.",
  validatorType: "Staker (validator running high-performance hardware)",
  permissionType: "Permissionless (subject to minimum stake and hardware requirements)",
  leaderElection:
    "Stake-weighted leader schedule — precomputed for each epoch using a verifiable random function.",
  forkBehavior:
    "Forks are extremely rare due to Tower BFT finality. If a leader produces a conflicting PoH sequence, validators vote on the correct chain, and Tower BFT ensures convergence.",
  finalityType:
    "Probabilistic finality (via PoS Tower BFT); blocks reach increasing confirmation levels (optimistic, confirmed, finalized).",
  blockProductionMethod:
    "Leader generates a continuous PoH hash sequence with embedded transactions and produces blocks at fixed intervals (slots of ~400ms).",
  commonAttacks: [
    "Leader exploitation — a malicious leader embeds invalid transactions or censor transactions.",
    "Long-range attack — rewriting the PoH sequence from a past point (mitigated by Tower BFT).",
    "DoS attack on the current leader — disrupting block production for a slot.",
    "Time-based manipulation — exploiting timing assumptions in the PoH sequence verification.",
  ],
  attackResistance:
    "Moderate. The leader-based design is an inherent risk — a malicious leader can influence transaction ordering (MEV) and censor transactions. Validator votes provide oversight, but the speed of the protocol limits time for verification. The high hardware barrier reduces the number of potential attackers but also reduces the number of honest validators. Historical Solana outages have typically been due to validator software bugs rather than security attacks.",
  typicalTPS:
    "~2,000–4,000 TPS (observed, Solana mainnet); ~65,000 TPS (theoretical, whitepaper claim)",
  typicalBlockTime: "~400ms per slot (observed, Solana mainnet); finality in ~12–20 seconds",
  hardwareRequirements: [
    "High-end CPU (12+ cores, 2.8+ GHz).",
    "GPU (NVIDIA GTX 1080 or better, for PoH verification).",
    "128+ GB RAM, 1+ TB high-speed NVMe SSD.",
    "High-bandwidth internet connection (300+ Mbps recommended).",
  ],
  realWorldExamples: [
    "Solana (PoH + Tower BFT)",
  ],
  compatibleConsensus: [
    "Tower BFT (PoS overlay used with PoH on Solana)",
    "Proof of Stake (Tower BFT is a PoS variant)",
  ],
  references: [
    "Yakovenko, A. 'Solana: A New Architecture for a High Performance Blockchain' (2017)",
    "Solana Labs. 'Proof of History: A Clock for Blockchain' — solana.com",
    "Solana Documentation — docs.solana.com",
  ],
  officialDocumentation: "https://docs.solana.com/",
  whitepaper: "https://solana.com/solana-whitepaper.pdf",
  score: {
    security: 62,
    scalability: 98,
    decentralization: 24,
    energyEfficiency: 58,
  },
};
