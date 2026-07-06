export default {
  id: "aura",
  name: "Aura (Authority Round)",
  shortName: "Aura",
  iconName: "ShieldCheck",
  color: "#98FB98",
  tagline: "Slot-based authority consensus.",
  pulseDuration: 1.2,
  strength: "Deterministic — no forks, no probabilistic finality.",
  tradeoff: "Centralized — relies on a small, fixed authority set.",
  family: "Proof of X",
  variantOf: "Proof of Authority",
  inventor: "Parity Technologies (now part of the Substrate framework)",
  organization: "Parity Technologies / Web3 Foundation",
  introducedYear: 2017,
  description:
    "Aura (Authority Round) is a Proof of Authority consensus engine designed for the Substrate framework. It provides a simple round-robin block production mechanism where a fixed set of authorities take turns producing blocks. Aura is deterministic (no forks) and provides fast block production with minimal overhead, making it a popular choice for Substrate-based networks.",
  overview:
    "Aura is a slot-based PoA consensus algorithm used in Substrate-based blockchains. Pre-defined authorities are assigned slots in a round-robin schedule. Each authority can produce exactly one block per round in its designated slot. Aura ensures exactly one slot leader per slot, preventing forks. It is widely used in the Polkadot ecosystem for parachains that configure PoA governance.",
  history:
    "Aura was developed by Parity Technologies as part of the Substrate framework (2017–2018). It was inspired by earlier PoA implementations like Clique (Ethereum) but designed to be more generic and framework-agnostic. Aura is one of the default consensus engines in Substrate, alongside BABE (for block production) and GRANDPA (for finality). Many Polkadot parachains and Substrate-based networks use Aura for their consensus.",
  problemSolved:
    "Aura provides a deterministic, fork-free block production mechanism for permissioned blockchain networks. It ensures exactly one block producer per time slot, eliminating the need for fork-choice rules and allowing instant block acceptance. This is ideal for chains where validators are known and trusted.",
  coreMechanism:
    "A set of authorities (validators) is defined at genesis or via on-chain governance. Time is divided into fixed-duration slots. Each slot has exactly one assigned authority (via round-robin). Only the assigned authority may produce a block in that slot. If the authority fails to produce, the slot is skipped. Because only one block can be valid per slot, forks do not occur.",
  stepByStepExplanation: [
    "The network configures a set of authorities (validators) and a slot duration (e.g., 1–6 seconds).",
    "Time is divided into sequential slots. The slot index increments with each slot.",
    "Each authority is assigned a slot in round-robin order: authority index = slot_index % num_authorities.",
    "When an authority's slot arrives, it collects pending transactions, creates a block, signs it, and broadcasts it.",
    "Receiving nodes check that the block was produced by the authority assigned to that slot (by recovering the signature).",
    "If the block is valid and from the correct authority, it is immediately appended to the chain. No fork occurs.",
    "If the authority misses its slot (no block within the slot duration), the slot is skipped and the next authority begins the next slot.",
    "Authority set changes can be made via on-chain governance (retroactively applied).",
  ],
  advantages: [
    "Deterministic — no forks, no probabilistic finality.",
    "Simple implementation — easy to understand and debug.",
    "Fast block times — configurable down to 1 second.",
    "Low computational overhead — no mining or intensive verification.",
    "Built-in to Substrate — available out of the box for parachains.",
    "Predictable block production schedule.",
  ],
  disadvantages: [
    "Centralized — relies on a small, fixed authority set.",
    "No inherent Sybil resistance — requires permissioned onboarding.",
    "No BUILT-IN finality gadget — blocks can be reorganized if the authority set changes (often paired with GRANDPA for finality).",
    "Authority key compromise is a critical risk.",
    "Skipped slots reduce throughput and increase latency.",
    "Not suitable for permissionless public chains.",
  ],
  bestUseCases: [
    "Substrate-based parachains and solo chains.",
    "Development and test networks.",
    "Consortium chains where authorities are known.",
    "Networks where deterministic block times are critical.",
  ],
  limitations: [
    "Not permissionless — authority set is fixed and governed.",
    "No on-chain punishment for skipped slots (though governance can remove inactive authorities).",
    "Requires external finality mechanism (e.g., GRANDPA) for irreversible finality.",
    "Authority rotation requires governance or trusted offline coordination.",
  ],
  securityExplanation:
    "Aura provides security based on the trustworthiness of the authority set. There is no cryptographic or economic penalty for misbehaviour; an authority can produce blocks containing any transactions they choose. The protocol does not provide finality on its own — it only provides block production. For finality, it is typically paired with GRANDPA (in Substrate), which runs a separate BFT-style finality protocol on top of the Aura-produced blocks. Aura's security matches the trust assumptions of the authority set.",
  scalabilityExplanation:
    "Aura scales well for execution but not for authority set size. The round-robin schedule means block production rate is independent of the authority set size (each slot has one producer regardless of total authorities). However, the time for a full round (all authorities to produce one block) increases with the number of authorities. Throughput depends on block size and slot time, not on consensus overhead.",
  decentralizationExplanation:
    "Aura is explicitly a centralized consensus mechanism. Authority sets are small and permissioned. In the Polkadot ecosystem, parachains using Aura typically have 3–10 authorities, often representing a single organization or small consortium. Decentralization is not a design goal.",
  energyConsumption:
    "Negligible. Aura authorities run standard Substrate nodes with no mining or intensive computation.",
  validatorType: "Pre-approved authority node",
  permissionType: "Permissioned",
  leaderElection:
    "Deterministic round-robin: slot_index % total_authorities determines the producer for each slot.",
  forkBehavior:
    "No forks. Only the assigned authority can produce a block in each slot. If two authorities produce blocks for the same slot (a malicious act), validators can distinguish based on signature.",
  finalityType:
    "Probabilistic finality (without GRANDPA); deterministic finality (with GRANDPA overlay).",
  blockProductionMethod:
    "Slot-based: the authority assigned to the current slot builds and signs a block.",
  commonAttacks: [
    "Authority key compromise — attacker produces malicious blocks as an authority.",
    "Collusion — majority of authorities collude to reorganize the chain.",
    "Slot spamming — creating blocks for slots that belong to other authorities (detectable via signature verification).",
    "Denial of service — targeting an authority to cause missed slots.",
  ],
  attackResistance:
    "Low. Aura's security is entirely dependent on the honesty and availability of the authority set. A single compromised authority can introduce invalid transactions during its slots. A majority of colluding authorities can reorganize the chain. For production use, Aura should be paired with a finality gadget (GRANDPA) to provide stronger guarantees.",
  typicalTPS: "~100–1,000+ TPS (observed, Substrate-based chains, varies with block size and complexity)",
  typicalBlockTime: "~1–6 seconds (configurable, commonly 3 seconds in Substrate)",
  hardwareRequirements: [
    "Standard server (4+ CPU cores, 16+ GB RAM, SSD).",
    "Stable internet connection.",
  ],
  realWorldExamples: [
    "Many Substrate-based parachains (e.g., Acala, Moonbeam early configurations, Kusama parachains with custom setups)",
    "Custom Substrate solo chains (devnet, testnet, consortium)",
  ],
  compatibleConsensus: [
    "GRANDPA (finality gadget paired with Aura in Substrate)",
    "BABE (Substrate's own slot-based block production, similar to Aura but with VRF-based leader election)",
    "Clique (Ethereum PoA, similar round-robin concept)",
  ],
  references: [
    "Parity Technologies. 'Substrate Consensus — Aura' — substrate.io",
    "Polkadot Wiki. 'Consensus — Aura' — wiki.polkadot.network",
    "Substrate Developer Hub. 'Aura Consensus'",
  ],
  officialDocumentation: "https://docs.substrate.io/fundamentals/consensus/",
  whitepaper: "https://polkadot.network/polkadot-whitepaper.pdf",
  score: {
    security: 35,
    scalability: 82,
    decentralization: 8,
    energyEfficiency: 99,
  },
};
