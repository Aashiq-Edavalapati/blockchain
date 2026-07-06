export default {
  id: "proofOfImportance",
  name: "Proof of Importance",
  shortName: "PoI",
  iconName: "Coins",
  color: "#DAA520",
  tagline: "Consensus weighted by economic activity.",
  pulseDuration: 3.5,
  strength: "Rewards network participation, not just token holding.",
  tradeoff: "Complex scoring algorithm that is less transparent than simple PoS balance.",
  family: "Proof of X",
  variantOf: "Proof of Stake",
  inventor: "NEM Foundation (Jaguar512, gimre, BloodyRookie)",
  organization: "NEM Foundation",
  introducedYear: 2015,
  description:
    "Proof of Importance is a consensus mechanism that selects validators (harvesters) based on their 'importance score', which is calculated from their vested token balance, transaction activity (number and volume of outgoing transactions), and the number of transactions they receive. It was developed by NEM to address the rich-get-richer problem of pure Proof of Stake by rewarding active network participants.",
  overview:
    "PoI evaluates how economically active a user is, not just how many tokens they hold. A user's importance score factors in: (1) their vested balance, (2) their outgoing transaction volume to unique partners, and (3) the network's clustering and activity metrics. Higher-scoring users are more likely to be chosen to harvest (forge) the next block. PoI rewards contribution to the network economy rather than passive wealth.",
  history:
    "PoI was developed for NEM (New Economy Movement) by the NEM Foundation, launched in 2015. NEM was originally a fork of Nxt but was completely rewritten in Java with the new PoI consensus. PoI was introduced as a response to the perceived unfairness of pure PoS, where the richest participants earn the most rewards. The concept of 'importance' was inspired by the idea of measuring economic activity rather than simple wealth. NEM went through a rebranding to Symbol in 2021, which uses a similar mechanism.",
  problemSolved:
    "PoI solves the wealth concentration problem of pure PoS. In PoS, the richest holders dominate block production and earn the most rewards, reinforcing their dominance. PoI adds activity metrics, so a user who actively transacts and contributes to the network economy can have a higher importance score than a larger holder who is inactive.",
  coreMechanism:
    "Each account's importance score is computed daily from three components: (1) the account's vested balance (tokens that have been held for a minimum period, currently 0–10% of the raw balance), (2) the account's net outgoing transaction activity (outgoing transfers to unique partners), and (3) a clustering factor that accounts for the mutual trust relationships between accounts. Validators with higher importance have a proportionally higher chance of being selected to harvest the next block.",
  stepByStepExplanation: [
    "Users must hold at least 10,000 vested XEM (now XYM) to be eligible for harvesting (described as a minimum importance threshold).",
    "An account's importance score is calculated once per day (every 'importance recalc' block). It factors three metrics: (a) vested balance, (b) transaction partner diversity (outgoing transfers to distinct addresses), and (c) cluster activity (how many nodes trust this account via transfers).",
    "The importance score is normalized across all eligible accounts so that the sum is 1.0.",
    "For each block, the protocol uses a deterministic algorithm seeded by the block's previous hash to select a harvester from the eligible set, weighted by importance.",
    "The selected harvester builds the block from pending transactions and broadcasts it.",
    "Other nodes validate the harvester's eligibility and the block's contents.",
    "The harvester receives the block harvesting fee (transaction fees collected from the block's transactions).",
    "The importance score decays over time if the account stops being active; it is recalculated daily based on recent behaviour.",
  ],
  advantages: [
    "Rewards network participation, not just token holding.",
    "Reduces the 'rich get richer' effect compared to pure PoS.",
    "Incentivizes meaningful economic activity.",
    "Lower barrier to earning rewards — active small accounts can have higher importance than inactive large accounts.",
    "Energy efficient — no mining required.",
    "Vesting requirement discourages short-term speculation.",
  ],
  disadvantages: [
    "Complex scoring algorithm that is less transparent than simple PoS balance.",
    "Privacy implications — importance calculation requires analyzing transaction graph.",
    "Gaming possible — users may create artificial transaction volume to increase scores.",
    "Minimum importance threshold excludes small holders from harvesting.",
    "Less battle-tested than PoS.",
    "Daily recalculation introduces latency in score updates.",
  ],
  bestUseCases: [
    "Public blockchain networks emphasizing economic participation.",
    "Networks where community activity is valued over passive holding.",
    "Payment-focused chains where transaction frequency is a meaningful metric.",
    "NEM/Symbol ecosystem applications.",
  ],
  limitations: [
    "Gaming risk — users may create fake transaction volume to inflate importance.",
    "Privacy exposure — transaction graph analysis is needed for scoring.",
    "Minimum threshold excludes small participants.",
    "Complex parameter tuning needed to balance the three scoring factors.",
  ],
  securityExplanation:
    "PoI security is similar to PoS in that it relies on economic alignment. However, importance weight is not directly proportional to wealth, which can reduce the cost of an attack. An attacker with moderate importance but high activity (many outgoing transactions) could potentially influence consensus without holding proportionate wealth. The vesting mechanism provides some protection by requiring tokens to be held for a period before being counted. Overall, the security model is less studied than pure PoS.",
  scalabilityExplanation:
    "PoI does not directly impact blockchain scalability. NEM's blockchain handles ~1,000–4,000 TPS in practice. The importance recalculation is offloaded to periodic compute cycles and does not affect per-block performance. As with most consensus mechanisms, the main scalability constraint is state execution, not consensus.",
  decentralizationExplanation:
    "PoI is more decentralized than pure PoS because activity can increase importance. A user with 100,000 tokens who does nothing has lower importance than a user with 50,000 tokens who actively transacts. This encourages wider participation. However, the minimum eligibility threshold (10,000 vested tokens) still creates an economic barrier. The overall decentralization depends on the distribution of both wealth and activity.",
  energyConsumption:
    "Very low. PoI harvesting requires no mining or computation beyond standard block validation. Validators run standard server hardware.",
  validatorType: "Harvester (importance-weighted block producer)",
  permissionType: "Permissionless (subject to minimum importance threshold)",
  leaderElection:
    "Deterministic selection seeded by previous block hash, weighted by importance scores.",
  forkBehavior:
    "PoI produces a single chain with no forks under normal operation. The deterministic selection ensures a clear block proposer for each height. If a harvester fails to produce, the protocol proceeds to the next eligible harvester.",
  finalityType:
    "Probabilistic finality — blocks are confirmed as their depth increases.",
  blockProductionMethod:
    "The importance-weighted deterministic algorithm picks a harvester for each block. The harvester builds and broadcasts the block.",
  commonAttacks: [
    "Sybil farming — creating many accounts with fake transactions to boost importance.",
    "Transaction spamming — generating many small transactions to inflate outgoing activity.",
    "Wealth concentration — despite improvements, wealth still contributes significantly.",
    "Harvester DoS — targeting the selected harvester to disrupt block production.",
  ],
  attackResistance:
    "Moderate. Gaming the importance score via fake transactions is the primary attack vector. The network mitigates this by factoring transaction partner diversity (sending to many distinct addresses is better than many transfers to one address) and the vesting period. However, a determined attacker can still inflate their score through economic activity that mimics legitimate usage.",
  typicalTPS: "~1,000–4,000 TPS (observed, NEM/Symbol mainnet)",
  typicalBlockTime: "~60 seconds (observed, NEM); ~30 seconds (Symbol)",
  hardwareRequirements: [
    "Standard server (4+ CPU cores, 16+ GB RAM, SSD).",
    "Minimum 10,000 vested XEM/XYM for harvesting eligibility.",
  ],
  realWorldExamples: [
    "NEM (NIS1, launched 2015)",
    "Symbol (launched 2021, successor to NEM with PoI+ variant)",
  ],
  compatibleConsensus: [
    "Proof of Stake (parent concept)",
    "Delegated Proof of Stake (similar elected/weighted model)",
  ],
  references: [
    "NEM Foundation. 'Proof of Importance (PoI) — NEM Technical Reference' (2015)",
    "NEM Whitepaper — nem.io",
    "Symbol Blockchain Documentation — symbol.dev",
  ],
  officialDocumentation: "https://docs.symbol.dev/",
  whitepaper: "https://nem.io/whitepaper.pdf",
  score: {
    security: 48,
    scalability: 55,
    decentralization: 60,
    energyEfficiency: 94,
  },
};
