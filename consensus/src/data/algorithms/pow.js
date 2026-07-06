export default {
  id: "pow",
  name: "Proof of Work",
  shortName: "PoW",
  iconName: "Cpu",
  color: "#F7931A",
  tagline: "Trust earned by burning energy.",
  pulseDuration: 4,
  strength: "Battle-tested, extremely costly to attack at scale.",
  tradeoff: "Slow, energy-hungry, and throughput-limited.",
  family: "Proof of X",
  variantOf: null,
  inventor: "Adam Back (Hashcash precursor), Satoshi Nakamoto",
  organization: "Bitcoin Project",
  introducedYear: 2009,
  description:
    "Proof of Work is a consensus mechanism where participants (miners) compete to solve a computationally expensive cryptographic puzzle. The first to find a valid solution proposes the next block and receives a reward. Security derives from the economic cost of attacking the chain — rewriting history requires redoing the work of the entire honest chain.",
  overview:
    "PoW is the original blockchain consensus algorithm, introduced by Bitcoin. Miners race to find a nonce that, when hashed with the block header, produces a hash below a dynamically adjusted target. The network follows the chain with the greatest cumulative work. It is battle-tested, extremely secure, but energy-intensive and low-throughput.",
  history:
    "The concept of proof of work predates Bitcoin. In 1997, Adam Back invented Hashcash, a PoW system designed to combat email spam by requiring senders to compute a partial hash collision. In 2008, Satoshi Nakamoto adapted the idea for Bitcoin's whitepaper, using it as the basis for a decentralized timestamp server. Bitcoin launched in January 2009, and PoW has since been adopted by Litecoin, Dogecoin, Monero, and countless other chains.",
  problemSolved:
    "PoW solves the Byzantine Generals Problem in a permissionless, open-membership network. Without a trusted central party, it provides a Sybil-resistant mechanism for nodes to agree on a single transaction history. The cost of work prevents trivial block production and makes historical revision economically irrational.",
  coreMechanism:
    "Miners collect pending transactions into a candidate block. They repeatedly modify a nonce field in the block header and compute SHA-256 (or another hash function) until the output is less than a network-wide target. The target adjusts periodically so blocks are found at a predictable rate. Peers verify the hash and transactions, then extend their chain. The longest (most work) chain is considered canonical.",
  stepByStepExplanation: [
    "Pending transactions are broadcast over the peer-to-peer network and collected into a mempool by each node.",
    "Miners select transactions from their mempool, assemble them into a candidate block, and construct the block header (previous hash, merkle root, timestamp, nonce, etc.).",
    "Each miner repeatedly increments the nonce and hashes the block header until the hash output is below the current difficulty target.",
    "The first miner to find a valid solution broadcasts the solved block to the entire network.",
    "All receiving nodes verify the hash meets the target and every transaction in the block follows consensus rules (valid signatures, no double-spends, etc.).",
    "Nodes add the validated block to their local copy of the blockchain, extending the previous tip.",
    "The winning miner collects the block subsidy and transaction fees as a reward.",
    "If two valid blocks appear at nearly the same height, nodes tentatively follow both (a fork). The fork is resolved when the next block is found on one branch, making it the longer chain.",
    "The network difficulty adjusts every N blocks (every 2,016 blocks for Bitcoin) so that the average block interval remains near the target (10 minutes for Bitcoin).",
  ],
  advantages: [
    "Battle-tested — secure for over 15 years with trillions of dollars in value.",
    "Permissionless — anyone with hardware and electricity can mine.",
    "Extremely high attack cost — rewriting history requires expending enormous energy.",
    "Simple and transparent — anyone can independently verify chain validity.",
    "Proven Sybil resistance without identity verification.",
  ],
  disadvantages: [
    "Extremely high energy consumption, comparable to small countries.",
    "Low throughput — Bitcoin processes approximately 7 transactions per second.",
    "Long confirmation times — 6 blocks (~1 hour) for reasonable settlement finality.",
    "ASIC mining centralization leads to geographic and hardware concentration.",
    "Block rewards create ongoing inflation; security relies on subsidy continuing.",
    "No instant finality — reorganizations of several blocks can occur.",
  ],
  bestUseCases: [
    "Store of value and settlement layer (Bitcoin).",
    "High-security base layer for mission-critical financial networks.",
    "Chains where permissionless participation is non-negotiable.",
    "Scenarios where immutability outweighs throughput or latency.",
  ],
  limitations: [
    "Throughput is fundamentally bounded by block size and block interval; scaling requires layer-2 solutions.",
    "Energy use invites regulatory and environmental criticism.",
    "ASIC-dominated mining concentrates power in industrial-scale operations.",
    "Weak (non-dominant) PoW chains can be 51% attacked by renting hash power.",
  ],
  securityExplanation:
    "PoW security derives from the economic cost of producing blocks. An attacker wishing to reverse a transaction must outpace the honest network's hash rate, requiring massive capital expenditure in hardware and electricity. For Bitcoin, the cost of a sustained 51% attack is estimated at billions of dollars. Additionally, honest miners are economically incentivized to follow the rules because block rewards are only valuable if the chain maintains user trust. The 'longest chain rule' ensures convergence to a single history even under adversarial conditions.",
  scalabilityExplanation:
    "PoW scales poorly by design. Bitcoin's 1 MB blocks and 10-minute interval limit theoretical throughput to ~7 TPS. Increasing block size or reducing interval would increase orphan rates, centralize mining (due to bandwidth requirements), and raise the cost of running a full node. Scalability is achieved through off-chain solutions like the Lightning Network or sidechains rather than modifying the base layer.",
  decentralizationExplanation:
    "PoW enables anyone with mining hardware to participate, but centralization pressures are significant: ASIC manufacturing is concentrated (Bitmain dominates), mining pools aggregate hash power, and cheap electricity regions attract disproportionate mining share. Running a full node remains relatively accessible, but contributing to block production is increasingly industrial. Bitcoin's node count (~15,000–50,000 reachable nodes) is moderate compared to permissionless ideals.",
  energyConsumption:
    "Very high. Bitcoin consumes an estimated 100–150 TWh per year (comparable to the Netherlands or Argentina). Individual transactions use as much energy as a typical US household does in a month. This energy expenditure is the deliberate cost that secures the network.",
  validatorType: "Miner (hash power provider)",
  permissionType: "Permissionless",
  leaderElection:
    "Competitive — the first miner to find a valid hash below the target wins the right to propose a block.",
  forkBehavior:
    "Forks occur when two valid blocks are mined near-simultaneously. The chain with the most cumulative work (longest chain) is considered canonical; short forks are orphaned. Miners are economically incentivized to build on the chain most likely to be the eventual winner.",
  finalityType:
    "Probabilistic finality — a block deep enough in the chain (typically 6 confirmations for Bitcoin) is considered practically irreversible. There is always a vanishingly small probability of a reorg due to a competing chain with more work.",
  blockProductionMethod:
    "Miners hash the block header with varying nonces until finding an output below the target. Blocks are produced by whichever miner solves the puzzle first.",
  commonAttacks: [
    "51% attack (majority hash power) — rewrite recent history.",
    "Selfish mining — strategically withholding blocks to waste honest miners' work.",
    "Eclipse attack — isolating a node to feed it a false chain.",
    "Timejacking — manipulating timestamps to confuse difficulty adjustment.",
    "Feather forking — colluding miners censor transactions.",
  ],
  attackResistance:
    "Extremely high for dominant chains. A 51% attack on Bitcoin would cost billions in hardware and electricity and would likely crash the price of the coin, making the attack self-defeating. Smaller PoW chains are far more vulnerable to hash-power rental attacks (e.g., Bitcoin Cash, Bitcoin SV historically). Selfish mining and eclipse attacks require specific network conditions and are mitigated by relay networks and diverse peer connections.",
  typicalTPS: "~7 TPS (observed, Bitcoin mainnet)",
  typicalBlockTime: "~10 minutes (observed, Bitcoin mainnet)",
  hardwareRequirements: [
    "ASIC miners (e.g., Antminer S19, Whatsminer M50) for competitive mining.",
    "Consumer CPU/GPU mining is only viable on ASIC-resistant algorithms (e.g., RandomX for Monero).",
    "Full node: ~500 GB+ storage, 8 GB RAM, stable internet connection.",
  ],
  realWorldExamples: ["Bitcoin", "Litecoin", "Dogecoin", "Monero", "Bitcoin Cash"],
  compatibleConsensus: ["Proof of Work (same family)"],
  references: [
    "Nakamoto, S. 'Bitcoin: A Peer-to-Peer Electronic Cash System' (2008)",
    "Back, A. 'Hashcash - A Denial of Service Counter-Measure' (2002)",
    "Bitcoin Developer Documentation — bitcoin.org/en/developer-documentation",
  ],
  officialDocumentation: "https://bitcoin.org/en/bitcoin-paper",
  whitepaper: "https://bitcoin.org/bitcoin.pdf",
  score: {
    security: 96,
    scalability: 22,
    decentralization: 88,
    energyEfficiency: 5,
  },
};
