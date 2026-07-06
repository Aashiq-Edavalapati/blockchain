export default {
  id: "tendermint",
  name: "Tendermint BFT",
  shortName: "Tendermint",
  family: "BFT",
  variantOf: "Practical Byzantine Fault Tolerance",
  inventor: "Ethan Buchman, Jae Kwon",
  organization: "All in Bits (Tendermint Inc.) / Interchain Foundation",
  introducedYear: 2014,
  description:
    "Tendermint BFT is a consensus protocol for a replicated state machine in a partially synchronous network that can tolerate up to one-third of validators being Byzantine faulty. It bundles a PBFT-style consensus engine with a generic blockchain interface, enabling developers to build blockchains in any language via the ABCI (Application Blockchain Interface).",
  overview:
    "Tendermint is a Byzantine Fault Tolerant (BFT) consensus engine that provides deterministic finality, high performance, and a modular application interface. Validators propose blocks and vote through two rounds (pre-vote, pre-commit). Once >2/3 of stake votes in each round, the block is committed. Tendermint is the core consensus of the Cosmos ecosystem, powering the Cosmos Hub and dozens of other chains.",
  history:
    "Tendermint was first conceptualized in 2014 by Jae Kwon as a solution to the scalability and finality problems of blockchain consensus. Ethan Buchman joined the project and co-authored the foundational paper 'Tendermint: Byzantine Fault Tolerance in the Age of Blockchains'. The project launched the Cosmos Network in 2019, with Tendermint serving as the consensus engine for the Cosmos Hub and the Cosmos Software Development Kit (Cosmos SDK). Tendermint Core was one of the first BFT protocols designed specifically for blockchain applications.",
  problemSolved:
    "Tendermint solves the blockchain finality problem: unlike PoW, which provides probabilistic finality, Tendermint provides deterministic immediate finality — once a block is committed, it is irreversible. It also solves the blockchain development complexity problem through the ABCI interface, which separates consensus from application logic, enabling developers to write chain logic in any programming language.",
  coreMechanism:
    "A leader (proposer) selected by a round-robin schedule proposes a block. Validators broadcast pre-vote and pre-commit messages in two rounds. >2/3 of stake (voting power) must agree in both rounds. If the leader fails, a round-change protocol selects a new one. The protocol guarantees safety as long as <1/3 of voting power is Byzantine.",
  stepByStepExplanation: [
    "A proposer (leader) is selected deterministically in round-robin order based on the validators' voting power.",
    "The proposer creates a block of pending transactions and broadcasts a 'proposal' message to all validators.",
    "Each validator validates the proposal, broadcasts a 'pre-vote' for the block if valid, or 'nil' if invalid.",
    "A validator waits for >2/3 of pre-votes (by voting power). If the pre-votes are for the same block, it broadcasts a 'pre-commit'.",
    "If a validator does not receive >2/3 pre-votes within a timeout, it broadcasts a 'nil' pre-commit.",
    "A validator waits for >2/3 of pre-commits. If the pre-commits are for the same block, the block is committed and executed.",
    "If the proposer fails (no block proposed or invalid block), validators increase the round number and a new proposer is selected.",
    "Committed blocks are final and irreversible. The next proposer then begins the next consensus round.",
  ],
  advantages: [
    "Instant deterministic finality — no forks, no reorgs.",
    "High performance — thousands of TPS with 1–7 second block times.",
    "Developer-friendly — ABCI allows application logic in any language.",
    "Low energy consumption — no mining required.",
    "Interoperability — IBC (Inter-Blockchain Communication) enables cross-chain transactions.",
    "Accountable — slashing penalizes misbehaving validators.",
  ],
  disadvantages: [
    "Validator set is fixed and known — cannot support permissionless entry without governance.",
    "Communication overhead grows with validator count (O(n²) in worst case).",
    "Stuck if >1/3 of validators go offline — liveness requires >2/3 participation.",
    "Round-change mechanism adds latency when the proposer is slow.",
    "Small validator sets in practice (Cosmos Hub has ~175 validators).",
  ],
  bestUseCases: [
    "Interoperability hubs (Cosmos Hub using IBC).",
    "Application-specific blockchains (via Cosmos SDK).",
    "Zones in the Cosmos ecosystem.",
    "Enterprise and consortium blockchains needing instant finality.",
  ],
  limitations: [
    "Permissioned-like validator set — new validators must be approved by existing ones.",
    "Liveness failure with >1/3 validators offline — a concern for open, permissioned sets.",
    "Not suitable for high-latency, wide-area networks without tuning.",
    "Communication overhead limits validator set size to ~100–300 in practice.",
  ],
  securityExplanation:
    "Tendermint provides safety (no conflicting blocks at the same height) as long as less than 1/3 of voting power is Byzantine. This is proven under the partially synchronous network model. If >1/3 of validators are Byzantine, safety can be violated. Liveness (block production continues) requires >2/3 of voting power to be online and honest. Validators who equivocate (sign two different pre-votes for the same round) are punished by slashing (in Cosmos SDK implementations). The validators' identities and voting power are known and stored on-chain, enabling accountability.",
  scalabilityExplanation:
    "Tendermint's scalability is limited by its communication model. Each validator exchanges messages with every other validator, leading to O(n²) message complexity per round. In practice, this limits the validator set to ~100–300 nodes. However, within that set, Tendermint achieves high throughput (thousands of TPS). The Cosmos Hub handles ~1,000 TPS with ~175 validators and ~7-second block times. Interchain accounts and IBC routing provide horizontal scaling across multiple zones.",
  decentralizationExplanation:
    "Tendermint supports a moderately sized validator set (Cosmos Hub has 175 active validators, with ~200 on the candidate list). Entry requires obtaining sufficient ATOM delegations to reach the top N. This is more decentralized than DPoS (21 producers) but less than Ethereum (~1 million validators). The minimum ATOM requirement and competition for a limited number of slots create centralization pressure. Delegation allows token holders to participate indirectly.",
  energyConsumption:
    "Very low. Tendermint validators run standard server hardware with no mining or intensive computation. The energy footprint is proportional to the number of validators and their hardware configuration.",
  validatorType: "Staker (validator with delegations from token holders)",
  permissionType: "Permissioned (stake-weighted voting; new validators must be approved by the set)",
  leaderElection:
    "Deterministic round-robin — weighted by voting power; proposer selection algorithm ensures predictable leadership rotation.",
  forkBehavior:
    "No forks — Tendermint provides deterministic finality. At most one block is committed per height. If there is a dispute, the evidence (double-signing) is submitted on-chain and the offending validator is slashed.",
  finalityType:
    "Instant / deterministic finality — once a block is committed, it is irreversible.",
  blockProductionMethod:
    "Round-robin proposer creates a block and puts it through two rounds of voting (pre-vote, pre-commit).",
  commonAttacks: [
    "Double-signing — validator signs conflicting blocks (detectable, punishable by slashing).",
    "Liveness attack — >1/3 of validators go offline to halt the chain.",
    "Censorship — proposer refuses to include certain transactions.",
    "Nothing-at-stake attack — mitigated by slashing for equivocation.",
    "Long-range attack — mitigated by a 'trusted checkpoint' for new nodes.",
  ],
  attackResistance:
    "Strong within the fault tolerance threshold. Double-signing is immediately detectable and punishable. The >2/3 honesty assumption for liveness is a limitation — if many validators go offline simultaneously (e.g., coordinated DoS), the chain can halt. However, this is a safety-liveness trade-off: the chain prioritizes safety (no conflicting blocks) over liveness.",
  typicalTPS:
    "~1,000–10,000 TPS (observed, Cosmos SDK chains); theoretical limits depend on application execution",
  typicalBlockTime: "~1–7 seconds (observed, Cosmos Hub and other Tendermint chains)",
  hardwareRequirements: [
    "Standard server (8+ CPU cores, 32+ GB RAM, 500+ GB SSD).",
    "Stable internet connection with low latency between validators.",
  ],
  realWorldExamples: [
    "Cosmos Hub (ATOM)",
    "Binance Chain (BEP2, BFT-based, migrated to BSC)",
    "Crypto.com Chain (CRO, Cronos)",
    "Osmosis (DEX zone)",
    "Kava, Terra (Classic), and many other Cosmos SDK chains",
  ],
  compatibleConsensus: [
    "PBFT (parent protocol)",
    "Cosmos SDK modules extend consensus with governance and slashing",
  ],
  references: [
    "Kwon, J. & Buchman, E. 'Tendermint: Byzantine Fault Tolerance in the Age of Blockchains' (2016)",
    "Buchman, E. 'Tendermint: Byzantine Fault Tolerance in the Age of Blockchains' — Master's Thesis (2016)",
    "Tendermint Core Documentation — docs.tendermint.com",
  ],
  officialDocumentation: "https://docs.tendermint.com/",
  whitepaper: "https://arxiv.org/abs/1807.04938",
  score: {
    security: 78,
    scalability: 72,
    decentralization: 40,
    energyEfficiency: 96,
  },
};
