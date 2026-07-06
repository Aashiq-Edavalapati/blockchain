export default {
  id: "proofOfActivity",
  name: "Proof of Activity",
  shortName: "PoA (conflict with Proof of Authority)",
  family: "Proof of X",
  variantOf: "Proof of Work / Proof of Stake hybrid",
  inventor: "Iddo Bentov, Charles Lee, Ariel Gabizon, Alex Mizrahi, etc. (Decred)",
  organization: "Decred Project",
  introducedYear: 2016,
  description:
    "Proof of Activity is a hybrid consensus mechanism that combines Proof of Work (mining) with Proof of Stake (voting). Miners compete to solve PoW puzzles to create a template block (without transactions). Stakeholders vote on whether to finalize the block, and a random selection of stakeholders signs it. Only with sufficient stakeholder signatures does the block become valid. Decred is the most prominent implementation.",
  overview:
    "PoA merges the security of PoW with the economic alignment of PoS. Miners expend energy to find blocks, but the blocks are only valid if a quorum of randomly selected stakeholders signs them. Stakeholders are rewarded for participating, providing checks and balances between miners and holders. This prevents a scenario where miners alone control the chain direction.",
  history:
    "Proof of Activity was first described in a 2014 paper by Iddo Bentov and colleagues titled 'Proof of Activity: Extending Bitcoin's Proof of Work via Proof of Stake'. The concept was implemented in Decred, which launched in February 2016. Decred was created by the original developers of btcsuite (which later became btcd) and raised initial funding through a crowdsourced airdrop. The hybrid approach addressed concerns about miner dominance and governance in Bitcoin. Other PoA experiments include experimental implementations on Bitcoin and Litecoin testnets.",
  problemSolved:
    "PoA solves the problem of miner dominance in pure PoW chains. In PoW, miners have full control over which transactions are included and which chain fork to follow. By requiring stakeholder approval, PoA gives token holders a direct voice in governance and chain validation, creating a two-tier power structure with checks and balances.",
  coreMechanism:
    "Miners solve a PoW puzzle to create a block template (which includes a list of selected stakeholders). A deterministic algorithm selects a subset of stakeholders from those who hold locked tickets. The selected stakeholders must sign the block within a time window. If enough signatures are collected, the block is confirmed. Miners and signing stakeholders split the block reward.",
  stepByStepExplanation: [
    "Users purchase 'tickets' by locking a certain amount of DCR (Decred) for a period. Each ticket enters a lottery pool.",
    "Miners construct a block template (initially without transactions) and work on a PoW puzzle.",
    "When a miner finds a valid PoW solution, the block template becomes a candidate block. The block includes a deterministic list of ticket-holders selected by the ticket lottery.",
    "The candidate block is broadcast. The selected ticket-holders must independently verify and sign the block with their private keys.",
    "If a quorum (typically 5 of the selected ticket-holders) signs the block within a time limit, the block is considered valid and is finalized.",
    "If insufficient signatures are received, the block is abandoned, and miners begin work on a new template.",
    "The block reward is split between the PoW miner and the ticket-holders who signed the block.",
    "Tickets expire after a set number of blocks (or votes), and holders can redeem their locked DCR.",
  ],
  advantages: [
    "Checks and balances — miners cannot unilaterally control the chain.",
    "Stakeholder governance — ticket-holders vote on consensus rules and proposals.",
    "Energy-efficient voting — stakeholder signatures require minimal computation.",
    "Security — inherits PoW's proven security model for block production.",
    "Decentralized decision-making — two groups (miners and holders) must cooperate.",
    "Ticket system enables community-driven project funding (Decred's treasury).",
  ],
  disadvantages: [
    "Complexity — hybrid consensus increases implementation complexity.",
    "Higher latency — waiting for stakeholder signatures can delay block finality.",
    "Ticket system requires locking funds, reducing liquidity.",
    "PoW energy consumption is not eliminated (though reduced compared to pure PoW if blocks are sometimes abandoned).",
    "Relatively small ecosystem compared to pure PoW or PoS chains.",
  ],
  bestUseCases: [
    "Chains emphasizing community governance and decentralized decision-making.",
    "Networks wanting PoW security with stakeholder oversight.",
    "Cryptocurrency projects focused on treasury and funding models.",
    "Systems where miners and token holders are distinct groups needing balanced influence.",
  ],
  limitations: [
    "Hybrid complexity — more moving parts than single-mechanism consensus.",
    "Ticket price volatility affects participation — if ticket prices are too high, fewer stakeholders participate.",
    "PoW component still requires significant energy.",
    "Limited scaling performance compared to pure PoS or BFT systems.",
  ],
  securityExplanation:
    "PoA provides defence-in-depth: an attacker must control both the majority of hash power (to produce blocks) and a majority of tickets (to sign blocks). The cost of simultaneously attacking both dimensions is higher than attacking either PoW or PoS alone. Additionally, ticket holders have a financial incentive to vote honestly because their tickets are locked at stake. However, the total security expenditure is split between PoW and PoS, so the net security per block may be less than a pure PoW chain with the same total reward.",
  scalabilityExplanation:
    "PoA inherits the throughput limitations of PoW for block production. The stakeholder signing process adds latency (waiting for signatures). Decred achieves ~10–30 TPS with 5-minute blocks, similar to Bitcoin's throughput. The scalability is comparable to PoW chains, not competitive with PoS or BFT systems.",
  decentralizationExplanation:
    "PoA offers a unique form of decentralization by distributing power between two groups (miners and stakeholders). Miners compete for hash power (ASICs), while stakeholders participate via ticket purchases. This dual structure can be more inclusive than pure PoW (where only miners influence consensus) but the PoW component still faces ASIC centralization. The ticket model allows smaller token holders to participate by pooling tickets via staking pools.",
  energyConsumption:
    "High (PoW component). The PoW puzzle is still energy-intensive, though the energy cost is shared with the PoS component. Decred's PoW uses the Blake-256 algorithm, which is ASIC-mined. Energy consumption is higher than pure PoS but could be lower than Bitcoin if the PoW difficulty is adjusted for the lower block reward.",
  validatorType: "Hybrid — PoW miner + PoS ticket signer (stakeholder)",
  permissionType: "Permissionless",
  leaderElection:
    "PoW competitive mining; stakeholders are selected by ticket lottery.",
  forkBehavior:
    "Similar to PoW — probabilistic finality. Forks can occur if two miners find blocks near-simultaneously. Stakeholder signatures incentivize building on the canonical chain.",
  finalityType:
    "Probabilistic finality (PoW-style). Stakeholder signatures add additional confirmation, but forks are still theoretically possible.",
  blockProductionMethod:
    "PoW miner creates a template block; PoS ticket-holders sign it to finalize.",
  commonAttacks: [
    "Hash majority + ticket majority attack (controlling >50% of both).",
    "Ticket grinding — manipulating the ticket selection process.",
    "Stakeholder coercion — attacking ticket-holders to prevent signing.",
    "Long-range attack after ticket expiry.",
  ],
  attackResistance:
    "Good against single-dimension attacks. A hash majority alone is insufficient to finalize malicious blocks (stakeholders would not sign). A ticket majority alone is insufficient to produce blocks (miners must find the PoW solution). The combined requirement provides stronger security than either PoW or PoS alone, though the total reward distribution reduces the incentive for each group individually.",
  typicalTPS: "~10–30 TPS (observed, Decred mainnet)",
  typicalBlockTime: "~5 minutes (observed, Decred mainnet)",
  hardwareRequirements: [
    "PoW mining: ASIC miners for Blake-256 (Decred).",
    "PoS staking: any device that can hold DCR and run a voting wallet.",
    "Ticket purchase requires DCR (cost fluctuates based on ticket price auction).",
  ],
  realWorldExamples: [
    "Decred (DCR) — the primary PoA implementation",
    "Espers (ESPR) — experimental hybrid PoW/PoS",
  ],
  compatibleConsensus: [
    "Proof of Work (component)",
    "Proof of Stake (component)",
  ],
  references: [
    "Bentov, I. et al. 'Proof of Activity: Extending Bitcoin's Proof of Work via Proof of Stake' (2014)",
    "Decred Documentation. 'Proof of Stake Overview' — docs.decred.org",
    "Decred Whitepaper — decred.org",
  ],
  officialDocumentation: "https://docs.decred.org/",
  whitepaper: "https://decred.org/research/bentov2014.pdf",
  score: {
    security: 78,
    scalability: 18,
    decentralization: 65,
    energyEfficiency: 25,
  },
};
