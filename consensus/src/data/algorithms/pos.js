export default {
  id: "pos",
  name: "Proof of Stake",
  shortName: "PoS",
  iconName: "Coins",
  color: "#8B93FF",
  tagline: "Trust earned by putting capital at risk.",
  pulseDuration: 2.2,
  strength: "Energy-efficient, large validator sets, scales via L2s.",
  tradeoff: "Wealth can concentrate influence among large stakers.",
  family: "Proof of X",
  variantOf: null,
  inventor: "Sunny King, Scott Nadal (Peercoin); later formalized by Ethereum researchers",
  organization: "Peercoin Project / Ethereum Foundation",
  introducedYear: 2012,
  description:
    "Proof of Stake selects block validators based on the quantity of native tokens they lock up as collateral (stake). Validators are pseudo-randomly chosen to propose blocks, and other validators attest to the proposal's correctness. Misbehaviour is punished by slashing (destroying) a portion of the stake, aligning economic incentives with honest participation.",
  overview:
    "PoS replaces energy-intensive mining with financial collateral. Participants deposit tokens to become validators; the protocol selects a weighted-random proposer each slot. Blocks are finalized after attestations from a supermajority of stake. PoS dramatically reduces energy consumption compared to PoW and opens the door to stronger finality guarantees.",
  history:
    "Proof of Stake was first proposed in 2011 on the BitcoinTalk forum and implemented in 2012 by Sunny King and Scott Nadal for Peercoin, which hybridized PoW and PoS. In 2014, Vitalik Buterin and the Ethereum Foundation began researching PoS for Ethereum's planned transition from PoW. The Casper FFG (Friendly Finality Gadget) paper was published in 2015. Ethereum's Beacon Chain launched in December 2020, and 'The Merge' in September 2022 completed the transition. Other early PoS chains include Nxt (2013) and Blackcoin (2014).",
  problemSolved:
    "PoS eliminates the massive energy expenditure of PoW while maintaining Sybil resistance and Byzantine fault tolerance. It solves the 'nothing at stake' problem (where validators can freely vote on all forks without cost) through slashing conditions that punish equivocation and other misbehaviour.",
  coreMechanism:
    "Validators deposit a minimum amount of native tokens into a staking contract or system. The protocol runs a pseudo-random selection algorithm (e.g., RANDAO + VDF in Ethereum) weighted by stake to choose a block proposer for each slot. The proposer builds a block, and a committee of validators attests. Once attestations representing a supermajority of stake (>2/3) are collected, the block is finalized. Validators who equivocate or break protocol rules are slashed.",
  stepByStepExplanation: [
    "Users deposit a minimum stake (e.g., 32 ETH for Ethereum) into the staking deposit contract to become validators.",
    "The protocol uses a randomness beacon to pseudo-randomly select a validator (weighted by stake) as the block proposer for the current slot.",
    "The chosen proposer collects pending transactions, builds a block, and broadcasts it to the network.",
    "A committee of validators receives the block and independently verifies it, then broadcasts attestation votes.",
    "Attestations are aggregated; once the accumulated weight exceeds 2/3 of total stake, the block is justified.",
    "A justified block is finalized after another epoch if the checkpoint chain continues without conflicting checkpoints.",
    "Validators who fail to attest, equivocate (vote on conflicting blocks), or commit other slashable offences lose a portion of their stake.",
    "Validators earn rewards for honest participation (proposals, attestations) — typically a combination of issuance and transaction fees.",
  ],
  advantages: [
    "Energy efficient — consumes ~99.9% less energy than equivalent PoW chains.",
    "Lower barrier to validator participation — no specialized hardware needed.",
    "Stronger finality guarantees — economic finality after two epochs (Ethereum).",
    "Reduced centralization pressure — no ASIC advantage.",
    "Richer incentive design — penalties can be calibrated for desired validator behaviour.",
    "Better foundation for sharding and L2 scaling.",
  ],
  disadvantages: [
    "Wealth concentration — larger stakers earn proportionally more rewards, potentially increasing inequality.",
    "Weak subjectivity — long-distance attacks may be hard to detect for newly joining nodes.",
    "Nothing-at-stake problem requires complex slashing conditions.",
    "Staking liquidity trade-off — locked tokens cannot be freely used in DeFi (though liquid staking mitigates this).",
    "Validator set size vs communication overhead trade-off.",
    "Long-term security guarantees less proven than PoW.",
  ],
  bestUseCases: [
    "General-purpose smart contract platforms (Ethereum).",
    "Networks prioritizing energy efficiency and environmental sustainability.",
    "Scenarios needing faster finality and lower latency than PoW.",
    "Multi-chain ecosystems (Polkadot, Cosmos) where shared security is valuable.",
  ],
  limitations: [
    "Weak subjectivity means bootstrapping trust requires a trusted checkpoint or a recent state reference.",
    "Liquid staking derivatives (Lido, Rocket Pool) can concentrate validation power.",
    "Governance attacks via stake accumulation are a long-term risk.",
    "Finality can be delayed or disrupted if a large portion of validators go offline simultaneously.",
  ],
  securityExplanation:
    "PoS security relies on economic punishments rather than physical costs. An attacker controlling 34%+ of total stake can prevent finality; controlling 66%+ can finalize malicious blocks — but both actions would trigger slashing, destroying a significant portion of their capital. Unlike PoW, a 51% attack is immediately economically costly (loss of slashed stake) rather than just expensive in operational costs. The 'weak subjectivity' concept acknowledges that bootstrapping from genesis is not fully objective; nodes must trust a recent finalized checkpoint to avoid long-range attacks.",
  scalabilityExplanation:
    "PoS scales better than PoW because the cost of participation does not increase linearly with the number of validators. Ethereum's PoS supports hundreds of thousands of validators. However, communication overhead (attestations, aggregation) grows with validator count, requiring committee-based sampling. Sharding, enabled by PoS, further scales execution by partitioning state. Layer-2 rollups provide the primary execution scaling layer, with PoS providing a secure data availability and settlement layer.",
  decentralizationExplanation:
    "PoS lowers the hardware barrier — a consumer-grade computer with an internet connection can validate (unlike PoW which requires ASICs). However, token cost creates a financial barrier: validators must acquire enough native tokens, which can be substantial (e.g., 32 ETH ~ $100k+). Liquid staking pools (Lido, Rocket Pool, Coinbase Cloud) concentrate power, with a few entities controlling significant portions of stake. Active validator count on Ethereum is ~1 million, but the effective power distribution is more concentrated through staking pools.",
  energyConsumption:
    "Very low compared to PoW. Ethereum's PoS consumes approximately 0.0026 TWh per year, a 99.99% reduction from its PoW era. A single validator node consumes roughly the electricity of a mid-range home computer.",
  validatorType: "Staker (token holder locking collateral)",
  permissionType: "Permissionless (subject to minimum stake)",
  leaderElection:
    "Pseudo-random selection weighted by stake amount, using verifiable randomness (e.g., RANDAO).",
  forkBehavior:
    "Forks are resolved by the fork-choice rule (e.g., LMD-GHOST for Ethereum), which follows the chain with the greatest accumulated weight of attestations. Blocks are justified and finalized via the Casper FFG mechanism; once finalized, forks cannot revert that block.",
  finalityType:
    "Economic finality (Casper-style) — blocks are justified after one epoch and finalized after two epochs (~12.8 minutes for Ethereum). Reverting a finalized block requires burning at least 1/3 of total staked value.",
  blockProductionMethod:
    "A stake-weighted pseudo-randomly chosen proposer builds a block each slot from the mempool transactions.",
  commonAttacks: [
    "Long-range attack — an old private key signs a competing history from genesis.",
    "Bribe attack — an adversary bribes validators to equivocate.",
    "Nothing-at-stake (pre-slasher era) — validators vote on all forks without cost.",
    "Grinding attack — manipulating randomness to influence proposer selection.",
    "Eclipse attack — isolating a validator to feed it false information.",
    "Liveness attack — a 34%+ adversary prevents finality by not attesting.",
  ],
  attackResistance:
    "High. Economic security model means attacks are costly in slashed stake. Long-range attacks are mitigated by weak subjectivity checkpoints. Bribe attacks require massive capital to out-incentivize honest staking rewards. The main practical risk is liveness attacks (preventing finality), which are expensive and detectable. Slashing conditions make equivocation (voting on conflicting blocks) immediately costly.",
  typicalTPS: "~15–30 TPS (observed, Ethereum L1); ~1,000–4,000 TPS with L2 rollups",
  typicalBlockTime: "~12 seconds (observed, Ethereum Beacon Chain slots)",
  hardwareRequirements: [
    "Consumer-grade computer (4+ CPU cores, 16+ GB RAM, 500+ GB SSD).",
    "Stable internet connection with moderate bandwidth.",
    "Minimum stake required (e.g., 32 ETH for Ethereum solo staking, or any amount via pools).",
  ],
  realWorldExamples: [
    "Ethereum (Beacon Chain)",
    "Cardano (Ouroboros)",
    "Polkadot (NPoS)",
    "Avalanche (PoS-based Snowman)",
    "Cosmos (Tendermint BFT with staking)",
  ],
  compatibleConsensus: ["Proof of Work", "Delegated Proof of Stake", "BFT variants"],
  references: [
    "Ethereum Foundation. 'Proof-of-Stake FAQ' — ethereum.org",
    "Buterin, V. & Griffith, V. 'Casper the Friendly Finality Gadget' (2017)",
    "Sunny King & Scott Nadal. 'PPCoin: Peer-to-Peer Crypto-Currency with Proof-of-Stake' (2012)",
  ],
  officialDocumentation: "https://ethereum.org/en/developers/docs/consensus-mechanisms/pos/",
  whitepaper: "https://ethereum.org/en/whitepaper/",
  score: {
    security: 80,
    scalability: 55,
    decentralization: 68,
    energyEfficiency: 95,
  },
};
