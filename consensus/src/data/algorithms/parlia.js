export default {
  id: "parlia",
  name: "Parlia (Proof of Staked Authority)",
  shortName: "Parlia",
  family: "Proof of X",
  variantOf: "Proof of Authority / Delegated Proof of Stake hybrid",
  inventor: "BNB Smart Chain team (Binance)",
  organization: "Binance (BNB Smart Chain)",
  introducedYear: 2019,
  description:
    "Parlia is a hybrid consensus mechanism combining Proof of Authority (PoA) with Delegated Proof of Stake (DPoS), used by BNB Smart Chain (BSC). It maintains a set of validators who are elected through a staking-based governance process. Validators take turns producing blocks in a round-robin schedule, earning rewards for honest behaviour. Parlia provides fast block times (~3 seconds) with moderate decentralization.",
  overview:
    "Parlia (often called PoSA — Proof of Staked Authority) merges PoA's efficiency with PoS's economic alignment. A fixed number of validators (21 on BSC mainnet) are elected by BNB holders through a staking and delegation process. Validators rotate in a deterministic schedule to produce blocks. Invalid behaviour can result in slashing or ejection. Parlia produces blocks every ~3 seconds with immediate finality.",
  history:
    "Parlia was developed by the Binance team for BNB Smart Chain (BSC), launched in September 2019. BSC was designed to run alongside Binance Chain, providing smart contract capabilities (EVM-compatible) while maintaining fast, low-cost transactions. The name 'Parlia' derives from 'Parliament' — reflecting the elected validator structure. BSC has become one of the most prominent EVM-compatible chains, with billions of dollars in DeFi value locked.",
  problemSolved:
    "Parlia solves the trade-off between efficiency/throughput and Sybil resistance/economic security. Pure PoA provides speed but no economic alignment. Pure DPoS provides economic alignment but can be slower with large validator sets. Parlia combines a small (21) validator set for speed with staking-based election for economic incentives and Sybil resistance.",
  coreMechanism:
    "BNB holders stake and delegate tokens to candidates. The top 21 candidates by total stake (self-stake + delegations) become active validators. Validators take turns producing blocks in a round-robin schedule. A validator can produce a maximum of 1 block out of every 21 (to prevent dominance). Validators earn rewards; delegators earn a portion of those rewards. Misbehaving validators are slashed.",
  stepByStepExplanation: [
    "BNB holders stake their tokens and delegate them to validator candidates. Each candidate accumulates stake from multiple delegators.",
    "At the start of each epoch (typically every 24 hours), the top 21 validator candidates by total stake are elected as the active validator set.",
    "Validators are scheduled in a round-robin order: validator index = (block_number % 21).",
    "When it is a validator's turn, it assembles pending transactions into a block, signs it with its consensus key, and broadcasts it.",
    "A validator can produce at most 1 block out of every consecutive 21 blocks (enforced by the protocol).",
    "Receiving validators verify the block signature against the current validator set and validate all transactions.",
    "Blocks are immediately finalized — no fork choice rule is needed due to the deterministic schedule.",
    "The validator who produced the block collects fees and a block reward (distributed to their delegators).",
    "If a validator double-signs (produces blocks for two slots they do not own) or goes offline for too long, they may be slashed or removed from the validator set.",
    "At the end of each epoch, staking rewards are distributed, and the validator set is recalculated based on latest delegation amounts.",
  ],
  advantages: [
    "Fast block times — ~3 seconds.",
    "Immediate finality — no forks, no probabilistic confirmation.",
    "Economic alignment — validators have staked capital at risk.",
    "Simple validator election — transparent and on-chain.",
    "EVM compatible — supports all Ethereum tooling and smart contracts.",
    "High throughput — handles high transaction volume with low fees.",
  ],
  disadvantages: [
    "Small validator set (21) is centralized compared to PoS networks with thousands of validators.",
    "Token-weighted voting concentrates power with large BNB holders.",
    "Validator set is dominated by exchanges and large institutional stakers.",
    "No permissionless validator entry — only the top 21 by stake qualify.",
    "Centralization concerns — Binance itself controls significant voting influence.",
  ],
  bestUseCases: [
    "High-throughput EVM-compatible smart contract platform.",
    "DeFi applications needing low fees and fast transactions.",
    "Consumer dApps where ease of use is prioritized over maximal decentralization.",
    "Binance ecosystem projects.",
  ],
  limitations: [
    "21 validators is a small set — collusion is a realistic risk.",
    "Validator selection is plutocratic — those with more BNB have more power.",
    "Historical outages (e.g., BSC pauses) demonstrate liveness concerns with small validator sets.",
    "Limited censorship resistance compared to larger validator networks.",
  ],
  securityExplanation:
    "Parlia security combines PoA identity with PoS economic commitment. Validators must stake BNB, which can be slashed for misbehaviour (double-signing, etc.). The 21 validators have delegated stake, creating a financial incentive to behave honestly. However, with only 21 validators, collusion by 11 validators (a majority) would compromise the chain. The small set makes targeted DoS attacks easier. BSC has experienced block production pauses due to validator issues, indicating liveness fragility.",
  scalabilityExplanation:
    "Parlia is designed for high throughput. With 3-second blocks and the ability to handle complex smart contracts, BSC processes ~100–200 TPS on average, with peaks much higher. The 21-validator set minimizes consensus overhead. The main scalability limitation is the single-chain execution model: all validators process the same transactions. BSC has implemented parallel EVM (Ethereum-compatible parallel execution) to improve throughput.",
  decentralizationExplanation:
    "Parlia's decentralization is limited by the 21-validator cap. In practice, the BSC validator set includes major exchanges (Binance, Kraken, Huobi), staking providers, and a few ecosystem funds. This concentration creates governance risks. The minimum stake to enter the top 21 is very high (millions of dollars in BNB), making it inaccessible to independent operators. Only about 30–40 candidates typically compete for the 21 slots.",
  energyConsumption:
    "Very low. Parlia validators run standard server hardware with no mining or intensive computation.",
  validatorType: "Elected staker (staked BNB validator with delegations)",
  permissionType: "Permissioned (election-based — top 21 by stake)",
  leaderElection:
    "Deterministic round-robin among the 21 active validators.",
  forkBehavior:
    "No forks under normal operation. The deterministic schedule ensures one block producer per slot. Accidental forks are resolved by the chain's fork choice.",
  finalityType:
    "Immediate / deterministic finality (with BFT-style slashing for misbehaviour).",
  blockProductionMethod:
    "Round-robin: the validator selected by block_number % 21 produces a signed block.",
  commonAttacks: [
    "Validator collusion — 11 of 21 validators collude to censor or reorganize.",
    "Key compromise — a validator's consensus key is stolen.",
    "Delegation manipulation — large holders manipulate validator elections.",
    "DoS on validators — targeting the 21 known validator IPs.",
    "Slashing evasion — equivocation without detection.",
  ],
  attackResistance:
    "Moderate. The small validator set is a known weakness. Economic security from staking (slashing) provides some deterrence against equivocation. However, the 21-validator limit means that a coordinated attack requires compromising only 11 nodes. BSC has not suffered major consensus attacks, but the centralization is a legitimate security concern.",
  typicalTPS:
    "~100–200 TPS (observed average, BSC mainnet); theoretical peak higher with optimized execution",
  typicalBlockTime: "~3 seconds (observed, BSC mainnet)",
  hardwareRequirements: [
    "High-performance server (16+ CPU cores, 64+ GB RAM, 1+ TB NVMe SSD).",
    "High-bandwidth, low-latency internet connection.",
    "BNB stake (self-stake and delegations).",
  ],
  realWorldExamples: [
    "BNB Smart Chain (BSC mainnet, 21 validators)",
    "BSC TestNet (also Parlia-based)",
  ],
  compatibleConsensus: [
    "Clique (similar round-robin PoA — Parlia is Clique's successor with staking)",
    "Aura (similar slot-based PoA in Substrate)",
    "Delegated Proof of Stake (conceptual parent)",
  ],
  references: [
    "Binance. 'BNB Smart Chain — Parlia Consensus' — docs.bnbchain.org",
    "BSC Whitepaper — binance.org",
    "BNB Smart Chain Technical Documentation",
  ],
  officialDocumentation: "https://docs.bnbchain.org/",
  whitepaper: "https://github.com/bnb-chain/whitepaper",
  score: {
    security: 50,
    scalability: 86,
    decentralization: 22,
    energyEfficiency: 96,
  },
};
