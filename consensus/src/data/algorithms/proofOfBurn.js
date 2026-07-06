export default {
  id: "proofOfBurn",
  name: "Proof of Burn",
  shortName: "PoB",
  family: "Proof of X",
  variantOf: null,
  inventor: "Iain Stewart (concept); Slimcoin developers (implementation)",
  organization: "Slimcoin Community",
  introducedYear: 2014,
  description:
    "Proof of Burn is a consensus mechanism where miners demonstrate commitment by sending (burning) coins to an unspendable address. The act of destroying coins proves the miner has made a financial sacrifice, similar to PoW's energy expenditure. Miners who burn more coins are more likely to be selected to mine the next block. The burned coins are gone forever, aligning long-term incentives with network health.",
  overview:
    "PoB replaces energy expenditure with token destruction. A miner burns a certain amount of native tokens by sending them to a verifiably unspendable address (a 'burn address'). This burn proof is included in the blockchain. The protocol uses the burn amount to weight the miner's chance of being selected to produce the next block. The economic sacrifice ensures that attacking the chain costs real value.",
  history:
    "The concept of Proof of Burn was first described in 2012 on the BitcoinTalk forum by user 'knightmb'. Iain Stewart formalized the idea in a 2012 essay. The first practical implementation was Slimcoin, launched in 2014, which combined PoB with PoW and PoS in a hybrid system. Counterparty also used a PoB mechanism to mint tokens by burning Bitcoin. The concept has influenced other mechanisms like 'burn and mint' and token-burning models in various ecosystems.",
  problemSolved:
    "PoB provides Sybil resistance and consensus security without the energy consumption of PoW or the stake-liquidity trade-off of PoS. Burning represents a sunk cost that cannot be recovered, making it a strong commitment. It also provides a mechanism for distributing tokens fairly (via burn-based minting).",
  coreMechanism:
    "Miners send native tokens to a publicly known, unspendable address (burn address). The transaction is included in the blockchain and proves the burn. For each new block, the protocol selects a miner with probability proportional to the total amount of coins they have burned (possibly weighted by recency). The miner produces the block and collects transaction fees.",
  stepByStepExplanation: [
    "A miner acquires native tokens (either purchased or earned) and sends them to a verifiably unspendable burn address (e.g., an address with no known private key).",
    "The burn transaction is included in a block, permanently removing the tokens from circulation forever.",
    "When a new mining round begins, the protocol selects a block proposer with probability proportional to the amount each miner has burned (often with a decay factor over time to encourage ongoing commitment).",
    "The selected miner assembles a block from pending transactions and broadcasts it.",
    "Other nodes verify the block and check the proposer's burn proofs.",
    "The winning miner receives the block reward (typically transaction fees, since new token minting may conflict with the burn mechanism).",
    "Over time, the accumulated burn amount decays or is re-weighted, incentivizing miners to continue burning to maintain their mining power.",
  ],
  advantages: [
    "Energy efficient — no mining hardware, no electricity-intensive computation.",
    "Permanent commitment — burned coins cannot be recouped, aligning long-term incentives.",
    "Deflationary — coin supply decreases, potentially increasing purchasing power.",
    "Fair token distribution — early participants burn less to receive coins (in minting models).",
    "No environmental criticism — does not consume significant energy.",
  ],
  disadvantages: [
    "Permanent destruction of capital — burned coins are lost forever.",
    "Psychological barrier — participants may dislike destroying value.",
    "Wealth advantage — richer participants can burn more, gaining disproportionate influence.",
    "Less proven — no major blockchain uses pure PoB as its sole consensus mechanism.",
    "Burn decay is complex to tune — if decay is too fast, security drops; if too slow, early movers dominate.",
  ],
  bestUseCases: [
    "Token distribution mechanism (burn-to-mint).",
    "Hybrid consensus systems combining PoB with other mechanisms.",
    "Networks emphasizing deflationary monetary policy.",
    "Chains where energy consumption is a primary concern.",
  ],
  limitations: [
    "No large-scale adoption — PoB remains experimental.",
    "Security guarantees are not as well-studied as PoW or PoS.",
    "Wealth concentration problem — those with more capital burn more and earn more rewards.",
    "Token price volatility affects the cost of security: if price rises, burning becomes more expensive.",
  ],
  securityExplanation:
    "PoB security relies on the economic cost of burning tokens. An attacker wanting to 51% attack the network would need to burn a majority of all burned tokens, which requires destroying a significant amount of capital. However, unlike PoW (where energy is spent continuously), PoB's cost is front-loaded and permanent. After burning, the miner has no ongoing operational cost, which creates a potential security gap: an attacker could accumulate burn weight over a long period and then attack without further cost. Decay mechanisms attempt to address this by reducing the weight of old burns.",
  scalabilityExplanation:
    "PoB does not inherently limit scalability. Block production can be fast if the protocol supports it, and the burn mechanism itself has minimal overhead. However, like PoW and PoS, the consensus method does not directly determine execution throughput, which depends on the blockchain implementation. Most PoB-based chains have modest throughput.",
  decentralizationExplanation:
    "PoB tends toward oligarchy because those with more capital can burn more and thereby control more mining power. There is no way for participants with less capital to pool their burns efficiently (though burn pools could theoretically exist). The permanent nature of burns makes it difficult for new participants to catch up, as early adopters have accumulated burn weight that cannot be matched without spending significant capital.",
  energyConsumption:
    "Very low. PoB consumes negligible energy — only standard transaction validation and block production overhead.",
  validatorType: "Burner (token holder who destroys tokens to gain mining weight)",
  permissionType: "Permissionless",
  leaderElection:
    "Weighted random — probability proportional to total burn amount (with optional decay).",
  forkBehavior:
    "Probabilistic finality, similar to PoW. The chain with the most cumulative burn weight is considered canonical.",
  finalityType:
    "Probabilistic finality — deeper blocks are increasingly harder to revert.",
  blockProductionMethod:
    "Selected miner (weighted by burn amount) proposes a block and collects transaction fees.",
  commonAttacks: [
    "Wealth accumulation — an attacker builds up massive burn weight slowly, then attacks.",
    "Nothing-at-stake after burn — once coins are burned, no ongoing cost discourages misbehaviour.",
    "Sybil attack — mitigated by the cost of burning per identity.",
  ],
  attackResistance:
    "Limited compared to PoW or PoS. The permanent nature of the burn means that after the initial sacrifice, the attacker has no ongoing cost to maintain their mining power. Decay mechanisms help but add complexity. No major chain has relied on pure PoB for high-value security.",
  typicalTPS: "~10–100 TPS (observed, depends on chain implementation)",
  typicalBlockTime: "~1–10 minutes (observed, varies by implementation)",
  hardwareRequirements: [
    "Standard consumer hardware or server.",
    "No specialized mining equipment required.",
  ],
  realWorldExamples: [
    "Slimcoin (hybrid PoB/PoW/PoS)",
    "Counterparty (burn-to-mint XCP by burning BTC)",
    "Burst (early PoC with burn element, later evolved)",
  ],
  compatibleConsensus: [
    "Proof of Work (hybrid models)",
    "Proof of Stake (hybrid models)",
    "Proof of Capacity (related alternative)",
  ],
  references: [
    "Stewart, I. 'Proof of Burn' — bitcointalk.org (2012)",
    "Slimcoin Whitepaper — slimcoin.org (2014)",
    "Counterparty Protocol Documentation — counterparty.io",
  ],
  officialDocumentation: "https://slimcoin.org/",
  whitepaper: "https://slimcoin.org/slimcoin-whitepaper.pdf",
  score: {
    security: 35,
    scalability: 45,
    decentralization: 30,
    energyEfficiency: 95,
  },
};
