export default {
  id: "proofOfCapacity",
  name: "Proof of Capacity",
  shortName: "PoC",
  family: "Proof of X",
  variantOf: null,
  inventor: "Burstcoin developers (based on prior academic HDD-based PoW concepts)",
  organization: "Burstcoin Community / Signum",
  introducedYear: 2014,
  description:
    "Proof of Capacity is a consensus mechanism where miners allocate a large amount of hard drive space to store pre-computed plot files (solutions to cryptographic puzzles). Instead of computing hashes on the fly (PoW), miners read from their stored plots to find the fastest solution for a given challenge. The more disk space a miner has, the higher their probability of winning the block reward.",
  overview:
    "PoC replaces the computational work of PoW with storage capacity. Miners pre-generate and store plot files containing millions of hash values (nonces). When a new block challenge is announced, miners scan their plots for the best (lowest deadline) solution. The miner with the lowest deadline wins the right to forge the next block. This makes PoC more energy-efficient than PoW while maintaining Sybil resistance.",
  history:
    "Proof of Capacity was first implemented in 2014 by the Burstcoin project, which launched as a fork of Nxt. The algorithm was inspired by academic proposals for 'hard drive mining' that aimed to address the energy consumption of traditional PoW mining. Burstcoin (later migrated to Signum in 2021) demonstrated the viability of storage-based mining. Chia later popularized a similar concept with Proof of Space and Time (PoST), which combines storage allocation with a verifiable delay function.",
  problemSolved:
    "PoC reduces the energy consumption of consensus by replacing CPU/GPU/ASIC computation with storage read operations. It also reduces the centralization pressure of ASIC-dominated PoW mining because storage hardware is mass-produced and not ASIC-optimized.",
  coreMechanism:
    "Miners pre-generate plot files that contain hashes organized into 'scoops'. A scoop is a specific data segment indexed by the block height. When a new block arrives, miners identify the correct scoop index, read all hashes in that scoop, find the one that produces the lowest deadline (a time value derived by hashing a combination), and submit it. The miner with the lowest deadline wins and forges the block.",
  stepByStepExplanation: [
    "Miners generate plot files by pre-computing billions of hash values and storing them on hard drives. Each plot is divided into buckets (scoops) indexed by block height.",
    "A new block arrives with a challenge (based on the previous block's signature). Miners calculate the scoop index from the block height.",
    "Miners read all the nonces in the specified scoop from their stored plots. Each nonce produces a deadline — a time value indicating how long the miner must wait before forging.",
    "The miner with the lowest deadline (best match) wins the right to forge the next block.",
    "The winning miner broadcasts the block with the proof (the nonce and the deadline). Other miners verify the proof against the plot data.",
    "If verified, the block is added to the chain. The winning miner's deadline becomes the minimum time before the next block can be forged.",
    "Multiple winners can exist if deadlines are equal; tie-breaking rules (e.g., lowest hash) apply.",
  ],
  advantages: [
    "Energy efficient — storage reads consume far less power than hash computations.",
    "ASIC resistant — storage hardware is general-purpose and mass-produced.",
    "Reusable — hard drives allocated for mining can be repurposed.",
    "Lower barrier to entry — storage hardware is widely available.",
    "More decentralized mining — no advantage from chip fabrication processes.",
  ],
  disadvantages: [
    "Plotting is time-consuming and requires initial computation.",
    "Hard drives have limited read/write speeds, creating a bottleneck.",
    "Less proven security model than PoW for high-value chains.",
    "Market potential — declining storage costs may reduce mining difficulty.",
    "Limited community and developer ecosystem compared to PoS/PoW.",
  ],
  bestUseCases: [
    "Energy-efficient cryptocurrency mining.",
    "Chains seeking ASIC-resistant consensus.",
    "Networks wanting to utilize existing storage infrastructure.",
    "Smaller communities exploring alternative consensus mechanisms.",
  ],
  limitations: [
    "Plotting requires significant one-time computation (though far less than PoW).",
    "Storage wear — HDDs degrade with continuous read operations.",
    "Less battle-tested than PoW or PoS.",
    "Disk space costs decrease over time, potentially affecting security budget.",
  ],
  securityExplanation:
    "PoC security derives from the physical cost of storage. An attacker wishing to 51% attack the network must acquire a majority of total network storage capacity. This is similar in spirit to PoW (majority of hash rate) but with a different physical resource. Storage-based security is less studied than hash-based security. The 'plotting' process ensures that storage cannot be dynamically reallocated (unlike hash power, which can be redirected instantly).",
  scalabilityExplanation:
    "PoC chains typically have lower throughput than PoS or BFT systems. Block times on Burstcoin/Signum are ~4 minutes, comparable to Bitcoin in terms of rate. The consensus itself does not directly limit execution throughput; that depends on the blockchain platform implementation. The main scalability consideration is the proof propagation: proofs (deadlines) must be shared and verified, but this is lightweight.",
  decentralizationExplanation:
    "PoC is relatively decentralized because storage hardware is ubiquitous and not dominated by specialized manufacturers. Anyone with spare hard drive space can participate, including using consumer-grade external drives. However, as with PoW, those with more resources (more storage) have proportionally more influence. Mining pools can also form in PoC systems.",
  energyConsumption:
    "Moderate to low. Pre-plotting requires significant energy, but ongoing mining (reading plots) consumes far less than PoW. Burstcoin was estimated to use ~0.002% of Bitcoin's energy per transaction during its peak usage.",
  validatorType: "Miner (plot file storage provider)",
  permissionType: "Permissionless",
  leaderElection:
    "Competitive — the miner with the lowest deadline (best plot match for the current challenge) wins.",
  forkBehavior:
    "Probabilistic chain convergence, similar to PoW. Forks can occur if multiple miners find equally good deadlines. The network follows the chain with the most cumulative capacity (weighted by storage commitment).",
  finalityType:
    "Probabilistic finality — transactions are confirmed with increasing difficulty of reversal as more blocks are built on top.",
  blockProductionMethod:
    "Miners read pre-computed plot files to find the best deadline for each block challenge. The lowest-deadline miner wins.",
  commonAttacks: [
    "51% attack via majority of network storage.",
    "Plot grinding — manipulating the plot generation process for advantage.",
    "Time warp attack — manipulating timestamps to affect deadline calculations.",
  ],
  attackResistance:
    "Moderate. A majority-storage attack requires acquiring >50% of total network storage, which is expensive but not as well-understood as hash-based attacks. The pre-plotted nature of storage means attackers cannot quickly redirect resources (plots take time to generate), providing some protection against rental attacks.",
  typicalTPS: "~1–10 TPS (observed, Signum/Burstcoin)",
  typicalBlockTime: "~4 minutes (observed, Burstcoin/Signum)",
  hardwareRequirements: [
    "Hard drives (HDD or SSD) with sufficient free space (hundreds of GB to TB).",
    "Plotting requires a moderate CPU for initial computation.",
  ],
  realWorldExamples: [
    "Signum (formerly Burstcoin, first PoC cryptocurrency)",
    "Chia (Proof of Space and Time, a related variant)",
  ],
  compatibleConsensus: [
    "Proof of Space (closely related concept)",
    "Proof of Work (similar competitive mining model)",
  ],
  references: [
    "Burstcoin Whitepaper — burstcoin.org (2014)",
    "Chia Network. 'Proof of Space and Time' — chia.net",
    "Signum Documentation — signum.network",
  ],
  officialDocumentation: "https://signum.network/",
  whitepaper: "https://burstcoin.org/whitepaper.pdf",
  score: {
    security: 48,
    scalability: 40,
    decentralization: 72,
    energyEfficiency: 78,
  },
};
