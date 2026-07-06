export default {
  id: "dpos",
  name: "Delegated Proof of Stake",
  shortName: "DPoS",
  family: "Proof of X",
  variantOf: "Proof of Stake",
  inventor: "Daniel Larimer",
  organization: "Bitshares / Steemit / EOS",
  introducedYear: 2014,
  description:
    "Delegated Proof of Stake is a variant of PoS where token holders vote to elect a fixed number of delegates (block producers) who are responsible for validating transactions and producing blocks. Voters retain the power to remove underperforming delegates. The system trades some decentralization for significantly higher throughput and lower latency.",
  overview:
    "DPoS operates like a representative democracy. Token holders stake-weighted vote for a small committee of delegates (typically 19–21). These delegates take turns producing blocks in a round-robin schedule. Because the validator set is small and known, DPoS achieves very high transaction throughput and fast block times at the cost of increased centralization.",
  history:
    "DPoS was invented by Daniel Larimer in 2014 for Bitshares, a decentralized exchange. Larimer subsequently implemented DPoS in Steemit (a blockchain-based social media platform) and later in EOS, one of the highest-capitalization DPoS chains. EOS launched in 2018 with 21 elected block producers. Tron and other chains adopted DPoS variants. The design has been influential in demonstrating that delegated models can achieve thousands of transactions per second.",
  problemSolved:
    "DPoS solves the scalability/throughput problem of traditional PoS by dramatically reducing the validator set to a small, predictable number. It also addresses voter apathy by allowing token holders to delegate their voting power, creating a more engaged governance system.",
  coreMechanism:
    "Token holders cast stake-weighted votes to elect a fixed set of delegates (block producers). The elected delegates are arranged into a round-robin schedule. Each delegate produces blocks in its assigned time slot. Voters can continuously vote to replace delegates. Block rewards are typically shared between delegates and their voters.",
  stepByStepExplanation: [
    "Token holders stake their tokens and vote for their preferred delegates (block producers). Voting weight is proportional to the number of tokens staked.",
    "The top N candidates (e.g., top 21 for EOS) by vote count are elected as active block producers.",
    "Elected producers are arranged into a round-robin schedule for block production.",
    "When it is a producer's turn, it collects pending transactions, assembles a block, and broadcasts it.",
    "Other producers verify the block and sign it. Once a supermajority of producers have signed, the block is confirmed.",
    "Voters can change their votes at any time. Underperforming or malicious producers can be voted out in subsequent rounds.",
    "Block rewards are distributed to producers, who typically share a portion with their voters (as a reward for delegation).",
  ],
  advantages: [
    "Very high throughput — thousands of transactions per second.",
    "Low latency — sub-second to 3-second block times.",
    "Predictable block production schedule — no probabilistic finality.",
    "Democratic governance — token holders can vote out bad delegates.",
    "Low energy consumption — no mining, small validator set.",
    "Scalable communication — validator set is small enough for efficient BFT-style finality.",
  ],
  disadvantages: [
    "Centralized — power concentrates with a small number of elected delegates.",
    "Voter apathy — many token holders do not vote, allowing whale-controlled outcomes.",
    "Vote buying — delegates can incentivize votes through bribes or fee sharing.",
    "Collusion risk — small delegate sets can collude to censor transactions or rewrite history.",
    "Free-rider problem — most voters do not actively research delegate candidates.",
  ],
  bestUseCases: [
    "High-throughput decentralized applications (gaming, social media, exchanges).",
    "Networks requiring fast, cheap transactions with predictable performance.",
    "Consortium chains where some degree of centralization is acceptable.",
    "Content platforms (Steemit/Hive) where speed enables real-time interaction.",
  ],
  limitations: [
    "Small delegate sets are inherently less decentralized; 21 producers can collude.",
    "Token-weighted voting concentrates power with large holders.",
    "Vote buying through proxy fee sharing is difficult to prevent.",
    "Less censorship-resistant than permissionless PoW or larger PoS sets.",
  ],
  securityExplanation:
    "DPoS security relies on the economic alignment of elected delegates. Delegates are publicly known (or pseudonymous with reputational stake) and financially motivated to act honestly to retain their position and rewards. A dishonest delegate can be voted out. However, with only ~21 producers, collusion among a majority of delegates is a realistic threat. Some DPoS chains implement 'finality rounds' where producers must sign checkpoints, and non-signing producers face penalties. Overall security is lower than large-validator-set PoS or PoW due to the small active set.",
  scalabilityExplanation:
    "DPoS achieves high throughput because the small validator set minimizes inter-validator communication overhead. With 21 producers, block propagation and verification happen quickly. EOS claims a theoretical maximum of over 10,000 TPS; in practice, it handles ~1,000–4,000 TPS. Blocks are produced every 0.5–3 seconds. The trade-off is that scaling the validator set directly impacts throughput — adding more delegates slows consensus.",
  decentralizationExplanation:
    "DPoS scores low on decentralization. The number of active block producers is typically 19–31, a fraction of the validator counts in PoS chains like Ethereum (~1 million). Token-weighted voting creates plutocratic tendencies: large holders have outsized influence. In EOS, the top 21 producers are often controlled by a handful of entities (exchanges, mining pools). Voter turnout is typically low (<10%), meaning actual control is even more concentrated.",
  energyConsumption:
    "Low. DPoS does not require mining or intensive computation. With 21 producers running consumer-grade or mid-range servers, total network energy consumption is comparable to a small office building.",
  validatorType: "Delegated block producer (elected by token holders)",
  permissionType: "Permissionless (to vote); permissioned (to become a producer, subject to election)",
  leaderElection:
    "Stake-weighted popular vote; the top N candidates by vote count become active producers.",
  forkBehavior:
    "Forks are rare because block production follows a deterministic round-robin schedule. The protocol follows the longest chain, but with synchronized producers, accidental forks are uncommon. Some DPoS implementations include finality rounds to prevent reorganizations.",
  finalityType:
    "Probabilistic finality (some variants add BFT finality rounds for irreversibility).",
  blockProductionMethod:
    "Deterministic round-robin — each of the N elected producers takes a turn producing a block during its assigned time slot.",
  commonAttacks: [
    "Collusion among delegates to censor or reorder transactions.",
    "Vote buying — delegates pay voters (directly or via fee sharing) for support.",
    "Cartel formation — a few entities control multiple producer slots.",
    "Sybil attack on elections — creating many fake identities to gain votes.",
    "Long-range attack after a cartel controls history.",
  ],
  attackResistance:
    "Moderate. The small delegate set makes collusion a genuine concern. If >50% of delegates collude, they could censor transactions or reverse recent history. Vote buying is a persistent issue. The primary defence is transparency and the ability to rapidly vote out misbehaving delegates. Social coordination outside of the protocol is often required to handle cartel behaviour.",
  typicalTPS:
    "~1,000–4,000 TPS (observed, EOS mainnet); theoretical peaks higher with parallel execution",
  typicalBlockTime: "~0.5–3 seconds (observed, varies by implementation)",
  hardwareRequirements: [
    "Mid-range server (8+ CPU cores, 32+ GB RAM, SSD storage).",
    "Stable low-latency internet connection.",
    "No specialized hardware required.",
  ],
  realWorldExamples: [
    "EOS (21 block producers)",
    "Tron (27 Super Representatives)",
    "Bitshares (19 trusted nodes)",
    "Steem / Hive (21 witnesses)",
  ],
  compatibleConsensus: [
    "Proof of Stake (parent variant)",
    "BFT (some implementations add BFT finality)",
  ],
  references: [
    "Larimer, D. 'Delegated Proof-of-Stake (DPoS)' — Bitshares Whitepaper (2014)",
    "EOSIO Technical Whitepaper — eos.io",
    "Tron Delegated Proof of Stake Documentation — tron.network",
  ],
  officialDocumentation: "https://eos.io/",
  whitepaper: "https://eos.io/whitepaper.pdf",
  score: {
    security: 60,
    scalability: 90,
    decentralization: 32,
    energyEfficiency: 92,
  },
};
