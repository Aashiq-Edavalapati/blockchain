export default {
  id: "ouroboros",
  name: "Ouroboros (Proof of Stake)",
  shortName: "Ouroboros",
  family: "Proof of X",
  variantOf: "Proof of Stake",
  inventor: "Aggelos Kiayias, Alexander Russell, Bernardo David, Roman Oliynykov (IOHK)",
  organization: "IOHK (Input Output Hong Kong) / Cardano Foundation",
  introducedYear: 2017,
  description:
    "Ouroboros is the first provably secure proof of stake protocol based on rigorous academic research, serving as the consensus mechanism for Cardano. It divides time into epochs and slots, with slot leaders randomly selected via a verifiable random function (VRF) weighted by stake. Ouroboros is the foundation of several protocol generations, each improving on the previous: Ouroboros Classic, Ouroboros BFT, Ouroboros Praos, and Ouroboros Genesis.",
  overview:
    "Ouroboros is a family of PoS consensus protocols that provide mathematically proven security guarantees. Time is divided into epochs, each subdivided into slots. Slot leaders are elected through a secure, stake-weighted multi-party computation that produces a shared random seed. Leaders produce blocks and are rewarded. The protocol provides probabilistic finality while maintaining rigorous security proofs under various network assumptions.",
  history:
    "Ouroboros was introduced in 2017 by IOHK (Input Output Hong Kong) researchers in the paper 'Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol'. It was developed as the consensus mechanism for Cardano, which launched in September 2017. Subsequent papers introduced Ouroboros BFT (for sidechains), Ouroboros Praos (adding adaptive adversaries with dynamic stake), and Ouroboros Genesis (enabling bootstrapping from genesis without trusted checkpoints). Each version strengthened the security model while maintaining the core epoch-and-slot structure.",
  problemSolved:
    "Ouroboros solves the proof of stake consensus problem with rigorous, peer-reviewed mathematical proofs. It addresses the 'nothing-at-stake' problem, long-range attacks, and adaptive adversarial threats. It was the first PoS protocol to provide formal security proofs comparable to Bitcoin's PoW security analysis.",
  coreMechanism:
    "Time is divided into epochs (e.g., 5 days in Cardano) and slots (e.g., 1 second each). Before each epoch, a secure coin-tossing protocol (multi-party computation) generates a shared random seed. Slot leaders for the epoch are determined by a verifiable random function (VRF) weighted by stake. A selected slot leader produces a block. Between slot leader transitions, block propagation uses a PBFT-like fast path (Ouroboros BFT) to maintain chain growth.",
  stepByStepExplanation: [
    "Cardano operates in epochs (each epoch = 432,000 slots = 5 days; each slot = 1 second).",
    "At the start of each epoch, a secure multi-party computation (the 'follow-the-satoshi' algorithm) generates a shared random seed using a distributed coin-flipping protocol.",
    "Using the random seed, the VRF determines which stake pool (delegation group) is elected as the slot leader for each individual slot in the epoch. Election probability is proportional to the pool's total delegated stake.",
    "When a slot arrives, the elected slot leader assembles transactions into a block, signs it with the VRF secret key, and broadcasts it. The VRF proof is included in the block header.",
    "Other nodes verify the VRF proof against the public random seed and the pool's stake weight.",
    "During the inter-slot period (between slot leaders), a PBFT-style overlay (Ouroboros BFT) allows the previous leader's block to be quickly propagated and confirmed.",
    "If a slot leader misses its slot, the slot passes without a block. The chain may occasionally have empty slots.",
    "Stake pool operators earn rewards for producing blocks, which they share with delegators who delegated ADA to the pool.",
    "At the end of the epoch, a new random seed is generated via MPC, and the new epoch begins with fresh slot leader assignments.",
  ],
  advantages: [
    "Provably secure — mathematically rigorous proofs of safety and liveness.",
    "Energy efficient — no mining, negligible energy consumption.",
    "Formal verification — the protocol is specified in formal methods (Agda).",
    "Peer-reviewed — published in top academic conferences (CRYPTO 2017).",
    "Evolved design — multiple generations addressing different attack models.",
    "Sidechain support — Ouroboros BFT enables seamless sidechain integration.",
  ],
  disadvantages: [
    "Complex protocol — understanding and implementing correctly is challenging.",
    "Epoch-based randomness — random seed generation requires complex MPC.",
    "Slot leader schedule is fixed per epoch — cannot quickly react to stake changes.",
    "Empty slots reduce throughput.",
    "Lower throughput than BFT-based systems (Cardano ~250 TPS).",
    "Vesting of scientific research — some improvements (e.g., Genesis) took years to deploy.",
  ],
  bestUseCases: [
    "Peer-reviewed, academically rigorous blockchain networks.",
    "Smart contract platforms emphasizing formal verification and security.",
    "Chains requiring energy efficiency with provable guarantees.",
    "Multi-currency and sidechain ecosystems.",
  ],
  limitations: [
    "Throughput limited by single-chain model (~250 TPS on Cardano).",
    "Stake pool centralization — a few large pools dominate due to delegation dynamics.",
    'Complexity of the protocol limits the number of independent implementations.',
    'Epoch-based slot leader schedule is less responsive than continuous leader election.',
  ],
  securityExplanation:
    'Ouroboros provides rigorous security proofs under the semi-synchronous network model. It is secure against adaptive adversaries (those who can corrupt participants based on their current knowledge) in the Praos version. Long-range attacks are mitigated by requiring nodes to discard old keys after they are no longer needed. The Genesis variant eliminates the need for trusted checkpoints (weak subjectivity). The protocol\'s security model assumes honest majority of stake (>50%).',
  scalabilityExplanation:
    'Cardano\'s throughput is limited by its single-chain architecture: ~250 TPS observed with 1-second slots. The protocol is working toward scalability through Hydra (layer-2 state channels), sidechains, and the Leios (input endorsers) mechanism. The consensus itself is not the bottleneck — the execution environment and block size determine throughput. Ouroboros can support larger blocks but must balance decentralization vs. throughput.',
  decentralizationExplanation:
    'Cardano uses a stake pool system where ADA holders delegate to pool operators. While there are ~3,000+ pools, the top 10 control ~30% of delegated stake. This concentration is driven by pool saturation incentives and minimum pool fixed costs. Ouroboros itself supports any number of participants, but economic incentives create practical centralization. The protocol requires minimum ADA for direct participation (not a pool), which is high.',
  energyConsumption:
    'Very low. Ouroboros consensus uses negligible energy — slot leaders run standard server hardware. Cardano\'s total network energy consumption is estimated at ~0.01% of Bitcoin\'s.',
  validatorType: 'Stake pool operator (delegate running a pool node)',
  permissionType: 'Permissionless (anyone can delegate or run a pool with sufficient ADA)',
  leaderElection:
    'VRF-based random selection weighted by stake delegation, determined before each epoch.',
  forkBehavior:
    'Ouroboros has probabilistic finality. Forks can occur if two slot leaders produce blocks at nearly the same time (rare in 1-second slots). The longest chain rule resolves forks. Ouroboros BFT overlay reduces fork probability.',
  finalityType:
    'Probabilistic finality (deepening confirmations). Ouroboros BFT adds near-instant finality for the inter-slot period.',
  blockProductionMethod:
    'Electing a slot leader per slot using VRF with the epoch\'s shared random seed.',
  commonAttacks: [
    'Long-range attack — adversary creates an alternative chain from an old state (mitigated by key evolution).',
    'Nothing-at-stake — validators can vote on multiple forks (mitigated by slot leader schedule and rewards).',
    'Stake bleeding — slowly accumulating stake via reward compounding (normal behaviour).',
    'Grinding attack — manipulating the random seed generation (mitigated by secure MPC).',
    'Selfish-stake — adversary withholds blocks to waste honest leaders\' work.',
  ],
  attackResistance:
    'Strong — the protocol has the most rigorous formal security analysis of any PoS protocol. The multi-generation evolution (Classic → BFT → Praos → Genesis) continuously strengthened security. Long-range attacks are handled by key evolution; adaptive attacks are handled by Praos. The primary residual risk is a >50% stake takeover, which is common to all PoS systems.',
  typicalTPS: '~250 TPS (observed, Cardano mainnet)',
  typicalBlockTime: '~1 slot = 1 second (observed, Cardano); block time is effectively the slot time',
  hardwareRequirements: [
    'Standard server (8+ CPU cores, 32+ GB RAM, 500+ GB SSD).',
    'Stable internet connection.',
    'Minimum ADA stake for pool registration + delegation (currently ~500 ADA + pool pledge).',
  ],
  realWorldExamples: [
    'Cardano (mainnet, Ouroboros Praos)',
    'Cardano TestNet',
  ],
  compatibleConsensus: [
    'Ouroboros Classic (genesis, original version)',
    'Ouroboros Praos (current, adaptive adversary)',
    'Ouroboros Genesis (latest, bootstrap from genesis)',
    'Ouroboros BFT (fast path for sidechains)',
  ],
  references: [
    'Kiayias, A. et al. \'Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol\' (2017)',
    'David, B. et al. \'Ouroboros Praos: An Adaptively-Secure, Semi-Synchronous Proof-of-Stake Blockchain\' (2018)',
    'Badertscher, C. et al. \'Ouroboros Genesis: Composable Proof-of-Stake Blockchains with Dynamic Availability\' (2018)',
    'Cardano Documentation — docs.cardano.org',
  ],
  officialDocumentation: 'https://docs.cardano.org/',
  whitepaper: 'https://iohk.io/en/research/library/papers/ouroboros-a-provably-secure-proof-of-stake-blockchain-protocol/',
  score: {
    security: 82,
    scalability: 38,
    decentralization: 60,
    energyEfficiency: 96,
  },
};
