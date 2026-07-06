export default {
  id: "snowman",
  name: "Snowman Consensus",
  shortName: "Snowman",
  family: "DAG / BFT",
  variantOf: "Avalanche Consensus",
  inventor: "Emin Gün Sirer, Kevin Sekniqi, Maofan Yin (Ava Labs)",
  organization: "Ava Labs",
  introducedYear: 2020,
  description:
    "Snowman is a linear-chain variant of the Avalanche consensus protocol, optimized for smart contract execution where blocks must be totally ordered. It adapts the metastable random-sampling mechanism of base Avalanche to produce a linearly ordered blockchain (rather than a DAG). Snowman preserves Avalanche's sub-second finality and high throughput while providing the sequential block structure Ethereum-compatible applications expect.",
  overview:
    "Snowman adapts the Avalanche family's random subsampling mechanism to produce a totally ordered chain of blocks (instead of a DAG of vertices). Validators participate in a series of binary votes on the next block to extend the chain. The protocol converges rapidly on a single canonical tip. Snowman powers the Avalanche C-Chain (Contract Chain), which executes EVM-compatible smart contracts with sub-second finality.",
  history:
    "Snowman was developed by Ava Labs to provide a linearly ordered consensus protocol suitable for EVM-compatible smart contract execution on Avalanche's C-Chain. Launched with the Avalanche mainnet in September 2020, Snowman addressed the need for strict transaction ordering required by smart contract platforms. It builds on the Snowball protocol (the core of the Avalanche family) but imposes linearization over the voting process to generate a sequential block chain.",
  problemSolved:
    "Snowman solves the problem of achieving fast, linearly ordered consensus (required for smart contract execution) using the metastable random-sampling approach. While the core Avalanche protocol uses a DAG that allows parallel acceptance, smart contracts require strict sequential execution (each state depends on the previous). Snowman provides the benefits of Avalanche (sub-second finality, scalability) in a linear blockchain format.",
  coreMechanism:
    "Validators maintain a preference for which block should be the next one appended to the chain. They repeatedly sample a random subset of validators for their current preference. After observing β consecutive rounds with a consistent majority preference, the validator decides (accepts) that block. The protocol ensures that conflicting blocks cannot both be accepted.",
  stepByStepExplanation: [
    "Validators build on the current tip of the chain. Multiple proposers may suggest different next blocks (a 'conflict set').",
    "Each validator has a binary preference among conflicting blocks (which one should be next).",
    "Validators repeatedly poll a random subset of k validators (k ~ 20–30), asking for their current preference.",
    "If the majority of the sampled response disagrees with the validator's own preference, the validator switches to the majority view.",
    "After observing β consecutive rounds (e.g., β = 15) with the same preference, the validator decides (commits) to that block.",
    "The decided block is appended to the chain, becoming the new tip. All conflicting blocks are rejected.",
    "The next consensus round begins with the new tip as the canonical head.",
    "Because Snowman produces a linear chain, transactions within blocks can be executed sequentially by the EVM.",
  ],
  advantages: [
    "Sub-second deterministic-ish finality — ~1–3 seconds.",
    "Linear ordering suitable for EVM and smart contracts.",
    "Low overhead — constant-size sampling per round, not O(n) messages.",
    "Byzantine fault tolerance — safe under <50% malicious validators.",
    "No leader — censorship-resistant by design.",
    "Efficient garbage collection — linear chain simplifies state pruning compared to DAG.",
  ],
  disadvantages: [
    "Slower than base Avalanche DAG for simple transfers (C-Chain slower than X-Chain).",
    "Probabilistic finality (though exponentially decreasing reversal probability).",
    "Requires PoS Sybil resistance layer (inherits Avalanche's stake requirement).",
    "Linearization sacrifices some parallel throughput potential of DAG-based consensus.",
    "Relatively new protocol — less adversarial testing than older consensus mechanisms.",
  ],
  bestUseCases: [
    "Smart contract execution requiring total transaction ordering.",
    "EVM-compatible chains within the Avalanche ecosystem.",
    "DeFi applications requiring fast finality.",
    "Subnets needing EVM compatibility with low latency.",
  ],
  limitations: [
    "Block production contention — unlike a DAG, only one block can be the next canonical block.",
    "Probabilistic finality means theoretically possible (but practically impossible) reorg.",
    "Minimum stake requirement limits permissionless participation.",
    "Throughput is limited by single-chain execution (unlike DAG's parallel throughput).",
  ],
  securityExplanation:
    "Snowman inherits the security properties of the Avalanche family. Safety depends on less than a threshold of validators being malicious (typically <50%). The random sampling ensures that an honest node's decision corresponds to the network's decision with exponentially high probability. Unlike classical BFT, there is no explicit quorum — safety emerges from the metastable dynamics. Parameter choices (k, β, α) determine the security-latency trade-off.",
  scalabilityExplanation:
    "Snowman provides good scalability for a linearly ordered blockchain. The C-Chain handles ~4,500 TPS with sub-second finality. Because communication is O(1) per validator per round (constant-size random sampling), throughput is limited primarily by the execution capacity of validators (EVM execution, state access) rather than consensus overhead. Smart contract complexity, not consensus, is the typical bottleneck.",
  decentralizationExplanation:
    "Snowman runs on the Avalanche primary network, which requires a minimum 2,000 AVAX stake (~$20k–$50k). The primary network has ~1,500–2,000 validators, which is a moderate level of decentralization. The hardware requirements are reasonable (standard server), enabling participation from independent operators who meet the stake threshold.",
  energyConsumption:
    "Very low. Snowman uses no mining or computation beyond standard signature and hash operations. Validators run standard server hardware.",
  validatorType: "Staker (AVAX holders participating in consensus)",
  permissionType: "Permissionless (subject to minimum stake of 2,000 AVAX)",
  leaderElection:
    "Leaderless — validators independently propose blocks and the metastable voting converges on one.",
  forkBehavior:
    "Proposers may suggest conflicting blocks; Snowman's consensus mechanism ensures exactly one block from the conflict set is accepted. The rejected blocks are discarded.",
  finalityType:
    "Probabilistic finality — exponentially decreasing chance of reversal. Practically irreversible after ~3 seconds.",
  blockProductionMethod:
    "Validators propose blocks extending the current tip. The voting process selects one block as the canonical next block.",
  commonAttacks: [
    "Sybil attack (mitigated by PoS minimum stake).",
    "Eclipse attack to feed false sampling information.",
    "Delay attack — slowing down responses to disrupt confidence accumulation.",
    "Preference collision — attempting to create a near-tie to stall consensus.",
  ],
  attackResistance:
    "Good within the Avalanche security model. Parameters can be tuned for stronger safety (higher k, β) at the cost of latency. The leaderless design eliminates the single-point-of-failure risk of leader-based protocols. Sybil attacks require acquiring the minimum stake for each malicious validator, making them expensive.",
  typicalTPS: "~4,500 TPS (observed, Avalanche C-Chain)",
  typicalBlockTime: "~1–3 seconds (observed, Avalanche C-Chain finality)",
  hardwareRequirements: [
    "Standard server (8+ CPU cores, 32+ GB RAM, 500+ GB SSD).",
    "Stable internet connection.",
    "Minimum 2,000 AVAX stake.",
  ],
  realWorldExamples: [
    "Avalanche C-Chain (EVM-compatible smart contracts)",
    "Avalanche Subnets with EVM execution",
  ],
  compatibleConsensus: [
    "Avalanche Consensus (base protocol)",
    "Snowball (predecessor in the Avalanche family)",
    "Proof of Stake (Sybil resistance layer)",
  ],
  references: [
    "Ava Labs. 'Snowman Protocol' — docs.avax.network",
    "Team Rocket. 'Snowflake to Avalanche: A Novel Metastable Consensus Protocol' (2018)",
    "Avalanche Developer Documentation — docs.avax.network",
  ],
  officialDocumentation: "https://docs.avax.network/",
  whitepaper: "https://assets.avax.network/whitepaper.pdf",
  score: {
    security: 65,
    scalability: 80,
    decentralization: 56,
    energyEfficiency: 95,
  },
};
