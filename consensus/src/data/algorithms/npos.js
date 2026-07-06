export default {
  id: "npos",
  name: "Nominated Proof of Stake",
  shortName: "NPoS",
  iconName: "Vote",
  color: "#BA55D3",
  tagline: "Optimized stake-weighted validator election.",
  pulseDuration: 2.2,
  strength: "Maximizes security — Phragmén election distributes stake optimally across validators.",
  tradeoff: "Complex election algorithm — Phragmén computation is heavy (requires off-chain execution for large sets).",
  family: "Proof of X",
  variantOf: "Proof of Stake",
  inventor: "Polkadot research team (Web3 Foundation / Parity Technologies)",
  organization: "Web3 Foundation / Parity Technologies",
  introducedYear: 2017,
  description:
    "Nominated Proof of Stake is a variant of Proof of Stake used by the Polkadot network. Token holders (nominators) back validators by staking their tokens, and the protocol selects a fixed set of validators from the pool of candidates using a Phragmén election algorithm that optimizes for security and decentralization. NPoS separates the roles of capital provision (nominators) and node operation (validators), enabling broad participation.",
  overview:
    "NPoS is designed to maximize security through a carefully optimized validator election process. Nominators (token holders) stake DOT tokens to back validator candidates they trust. The Phragmén sequential election algorithm is run each era to select the optimal validator set among all candidates, balancing stake weight and preventing excessive concentration. Validators produce blocks via the BABE slot-based protocol and finalize via GRANDPA.",
  history:
    "NPoS was developed by the Web3 Foundation and Parity Technologies as the consensus mechanism for Polkadot, first described in the Polkadot whitepaper (2016). The protocol was refined through the Polkadot research papers and implemented in the Polkadot runtime using Substrate. Polkadot launched its mainnet in May 2020 (first as a PoA, transitioning to NPoS with validator elections). Kusama, Polkadot's 'canary network', launched earlier as a pre-production environment. The Phragmén election algorithm was adapted from the mathematical theory of proportional representation.",
  problemSolved:
    "NPoS solves the problem of selecting a secured validator set in a large, stake-weighted ecosystem. It prevents the 'rich get richer' problem of simple PoS by using a proportional representation algorithm: the Phragmén method ensures that nominators' stakes are assigned to validators in a way that maximizes the security of the network by distributing stake efficiently across the selected validator set.",
  coreMechanism:
    "Nominators (token holders) nominate up to 16 validator candidates. The Phragmén sequential election algorithm selects a fixed set of active validators from all candidates, optimizing for equal representation of nominators' votes. Each era (~24 hours on Polkadot), the algorithm re-evaluates the set. Validators produce blocks via BABE (slot-based VRF) and finalize via GRANDPA (BFT finality).",
  stepByStepExplanation: [
    "DOT holders (nominators) choose validator candidates they trust and nominate them by bonding (staking) their tokens to their chosen candidates (up to 16 per nominator).",
    "Validator candidates signal their intention to validate and set a commission rate (the percentage of rewards they keep before distributing to nominators).",
    "At the start of each era (~24 hours), the Phragmén election algorithm selects the active validator set from all candidates. The algorithm optimizes for proportional representation: it ensures the total stake backing each elected validator is as balanced as possible, given the nominators' preferences.",
    "Each nominator's stake is distributed among the validators they nominated who were elected into the active set. The distribution maximizes the nominator's impact while maintaining optimal validator stake balance.",
    "The elected validators participate in block production using BABE (Blind Assignment for Blockchain Extension): validators are selected via VRF as slot leaders to produce blocks in 6-second slots.",
    "Produced blocks are finalized by GRANDPA (GHOST-based Recursive Ancestor Deriving Prefix Agreement), a BFT finality gadget that attests to the canonical chain with >2/3 validator signatures.",
    "Validators who behave honestly (produce blocks, participate in finality) earn rewards, which are split between the validator and their nominators according to the commission rate.",
    "Validators who misbehave (double-sign, go offline, etc.) are slashed — a portion of their staked (and their nominators' staked) DOT is destroyed.",
    "At the end of the era, a new election is run, and the process repeats.",
  ],
  advantages: [
    "Maximizes security — Phragmén election distributes stake optimally across validators.",
    "Broad participation — nominators do not need to run nodes to earn staking rewards.",
    "Flexible delegation — nominators can back up to 16 validators simultaneously.",
    "Economic incentives — slashing holds both validators and nominators accountable.",
    "Proportional representation — prevents a few large stakers from dominating the set.",
    "Formally analyzed — the election algorithm has rigorous mathematical foundation.",
  ],
  disadvantages: [
    "Complex election algorithm — Phragmén computation is heavy (requires off-chain execution for large sets).",
    "Era-based rotation — validator set changes occur only once per era, not continuously.",
    "High minimum stake for validators — being an elected validator requires significant self-stake or nominations.",
    "Small active set — Polkadot limits active validators to ~297 (could change via governance).",
    "Nominator decision fatigue — choosing up to 16 validators requires research.",
  ],
  bestUseCases: [
    "Multi-chain networks with shared security (Polkadot relay chain).",
    "Ecosystems needing optimal stake distribution for security.",
    "Platforms where token holders want to participate in security without running infrastructure.",
    "Networks requiring both block production and finality separation (BABE + GRANDPA).",
  ],
  limitations: [
    "Validator set is capped (~297 active validators on Polkadot).",
    "Phragmén algorithm complexity grows with the number of candidates and nominators.",
    "Nominators must choose validators carefully to avoid being slashed for a validator's misbehaviour.",
    "Era-based elections mean rapid stake changes cannot be reflected immediately.",
    "Shared security model forces all parachains to rely on the relay chain's validator set.",
  ],
  securityExplanation:
    'NPoS provides economic security through staked capital. The Phragmén election ensures that the active validator set is as diverse and distributed as possible given the nominator preferences. Validators with more stake have more security at stake but are not advantaged in block production — each elected validator has approximately equal voting power in BABE and GRANDPA. The >2/3 honest stake assumption is required for finality. Slashing conditions punish equivocation and unavailability, with penalties proportional to the total stake (validator + nominator).',
  scalabilityExplanation:
    'NPoS itself does not limit throughput — block production and finality are handled by BABE and GRANDPA. Polkadot\'s relay chain processes ~1,000 TPS. The main scalability feature of NPoS is shared security: parachains can scale execution horizontally while relying on the relay chain validator set for security. The Phragmén election can theoretically support thousands of validators, though Polkadot currently caps the set at ~297.',
  decentralizationExplanation:
    'NPoS encourages broad participation through the nominator role. DOT holders can nominate without running infrastructure, enabling anyone with DOT to participate in security. The Phragmén algorithm favors distributed stake: it prefers a validator set where total backing stake is evenly distributed, preventing super-validators from dominating. However, the active validator set is capped at ~297, and the validator election process is competitive. Smaller validators struggle to attract nominations compared to large, well-known validators.',
  energyConsumption:
    'Very low. NPoS validators run standard server hardware with no mining or intensive computation. The election algorithm runs off-chain.',
  validatorType: 'Validator (elected by Phragmén algorithm) + Nominator (stake delegator)',
  permissionType: 'Permissionless (anyone can nominate; validators subject to election)',
  leaderElection:
    'BABE: VRF-based slot leader selection within each 6-second slot.',
  forkBehavior:
    'BABE produces blocks in slots, occasionally producing competing blocks for the same slot (fork). GRANDPA finality resolves forks by agreeing on the canonical chain.',
  finalityType:
    'Probabilistic (BABE chain) + Deterministic (GRANDPA finality gadget). GRANDPA provides absolute finality once a supermajority of validators attests.',
  blockProductionMethod:
    'BABE: VRF-based slot leader selection, producing blocks every 6 seconds.',
  commonAttacks: [
    'Validator equivocation — double-signing in BABE or GRANDPA (punished by slashing).',
    'Stake concentration — large nominators dominating validator elections.',
    'Phragmén manipulation — candidates collude to game the election algorithm (mitigated by the proportional nature).',
    'Long-range attack — creating an alternative chain from past state (mitigated by GRANDPA finality).',
  ],
  attackResistance:
    'Strong. The combination of BABE (random slot leader) and GRANDPA (BFT finality) provides robustness against equivocation and reorg attacks. The Phragmén election ensures that no single validator has disproportionate influence. Slashing provides strong economic disincentives for misbehaviour.',
  typicalTPS:
    '~1,000 TPS (observed, Polkadot relay chain); parachains add significantly more capacity',
  typicalBlockTime: '~6 seconds (observed, Polkadot BABE slots)',
  hardwareRequirements: [
    'Standard server (8+ CPU cores, 32+ GB RAM, 500+ GB SSD).',
    'Stable, low-latency internet connection.',
    'Minimum DOT stake for validation (self-stake); no minimum for nomination.',
  ],
  realWorldExamples: [
    'Polkadot (relay chain, 297 validators)',
    'Kusama (canary network, 1,000 validators)',
  ],
  compatibleConsensus: [
    'BABE (block production mechanism)',
    'GRANDPA (finality gadget)',
    'Proof of Stake (parent concept)',
  ],
  references: [
    'Wood, G. \'Polkadot: Vision for a Heterogeneous Multi-Chain Framework\' (2016)',
    'Web3 Foundation. \'Polkadot Consensus\' — wiki.polkadot.network',
    'Phragmén, E. \'An Extension of the Method of Voting\' (1894) — electoral algorithm underlying NPoS',
  ],
  officialDocumentation: 'https://wiki.polkadot.network/',
  whitepaper: 'https://polkadot.network/polkadot-whitepaper.pdf',
  score: {
    security: 74,
    scalability: 52,
    decentralization: 55,
    energyEfficiency: 96,
  },
};
