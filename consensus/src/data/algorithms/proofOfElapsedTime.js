export default {
  id: "proofOfElapsedTime",
  name: "Proof of Elapsed Time",
  shortName: "PoET",
  family: "Proof of X",
  variantOf: null,
  inventor: "Intel Corporation",
  organization: "Intel Corporation (Hyperledger Sawtooth)",
  introducedYear: 2016,
  description:
    "Proof of Elapsed Time is a consensus mechanism that uses a trusted execution environment (Intel SGX) to randomly assign wait times to validators. Each validator requests a random wait time from a secure enclave; the validator whose timer expires first wins the right to propose the next block. PoET mimics the probabilistic lottery of PoW but replaces energy expenditure with hardware-level trusted computing.",
  overview:
    "PoET is designed for permissioned blockchain networks where participants know each other but want fair leader election without energy waste. Each node uses Intel SGX to generate a random wait timer. The node whose timer expires first broadcasts its block. Other nodes verify the timer's legitimacy through a signed attestation from the SGX enclave. It is primarily implemented in Hyperledger Sawtooth.",
  history:
    "PoET was developed by Intel and introduced with the Hyperledger Sawtooth framework in 2016. Sawtooth was contributed by Intel to the Hyperledger consortium (under the Linux Foundation) as an enterprise-grade blockchain platform. PoET was designed to address the energy consumption of PoW while providing a fair lottery mechanism for validator selection. It requires Intel SGX (Software Guard Extensions) hardware, which has been available in select Intel CPUs since the Skylake generation (2015).",
  problemSolved:
    "PoET solves the energy waste problem of PoW lottery-based consensus. It provides a fair, verifiable random leader election mechanism that does not require computation-intensive puzzles or token staking. It is suitable for permissioned networks where hardware trust can be assumed.",
  coreMechanism:
    "Each validator requests a random wait time from its SGX enclave. The enclave generates a truly random number (using hardware randomness) as the wait time and signs an attestation. The validator waits for its timer to expire, then broadcasts a block with the attestation proof. Other validators verify the enclave signature to confirm the timer was legitimately generated.",
  stepByStepExplanation: [
    "A validator node requests a new wait timer from its Intel SGX trusted execution environment (enclave).",
    "The SGX enclave generates a random wait time (e.g., using hardware random number generator) and returns it along with a signed attestation proving the timer was generated inside the enclave.",
    "The validator waits for its timer to expire. Additional validators simultaneously do the same with different random wait times.",
    "The validator whose timer expires first broadcasts a block proposal along with the SGX-signed timer attestation proof.",
    "Other validators verify the SGX attestation, confirm the timer was valid and expired, and validate the block contents.",
    "Once verified, the block is added to the chain and a new round begins with fresh timers.",
    "If a validator's timer expires but another validator already committed a block, the slow validator acts as a verifier for the new round.",
  ],
  advantages: [
    "Very low energy consumption compared to PoW.",
    "Fair leader election — random and verifiable via SGX.",
    "No token staking — suitable for permissioned networks without native cryptocurrency.",
    "Predictable operating cost — standard server hardware (with SGX support).",
    "Scalable to large networks — no O(n²) communication.",
  ],
  disadvantages: [
    "Hardware dependency — requires Intel SGX-enabled CPUs (limited to specific Intel processors).",
    "Trusted execution environment vulnerabilities — SGX has been susceptible to side-channel attacks (Spectre, Foreshadow, SGAxe).",
    "Centralized hardware supply — all validators must use Intel CPUs.",
    "Not permissionless — requires trusted hardware onboarding.",
    "Single point of failure — if SGX is broken, the consensus security collapses.",
    "Limited adoption — primarily used in Hyperledger Sawtooth experiments.",
  ],
  bestUseCases: [
    "Enterprise permissioned blockchain networks.",
    "Supply chain and consortium scenarios where participants are known.",
    "Hyperledger Sawtooth deployments.",
    "Environments where energy efficiency is prioritized but token staking is undesirable.",
  ],
  limitations: [
    "Requires proprietary Intel hardware — vendor lock-in.",
    "SGX security has been repeatedly compromised in academic and real-world attacks.",
    "Not suitable for public, permissionless blockchains.",
    "Limited community and ecosystem compared to PoS/PoW.",
  ],
  securityExplanation:
    "PoET security relies entirely on the integrity of Intel SGX. The trusted execution environment must protect the random timer generation from interference. If an attacker can compromise SGX (via hardware or software side channels), they can forge timer attestations and unfairly win block proposals. A series of academic attacks on SGX (including Foreshadow, Plundervolt, and others) have demonstrated that SGX's security guarantees are not absolute. In a permissioned setting with known participants, this risk may be acceptable; for public chains, it is generally considered insufficient.",
  scalabilityExplanation:
    "PoET is highly scalable because there is no inter-validator communication during leader election. Each validator independently generates its timer and competes. The network handles many validators with no communication overhead increase. Hyperledger Sawtooth has demonstrated throughput in the thousands of TPS in enterprise configurations.",
  decentralizationExplanation:
    "PoET is designed for permissioned networks, so decentralization is limited by design. All participants must be known and authorized. The hardware requirement (Intel SGX) further centralizes control around a single chip vendor. Within a permissioned consortium, the degree of decentralization depends on how many organizations run validators.",
  energyConsumption:
    "Very low. Validators run standard server hardware with no mining or computation-intensive work. The energy consumption is comparable to idle server operation.",
  validatorType: "SGX-enabled node operator (trusted execution environment)",
  permissionType: "Permissioned",
  leaderElection:
    "Random timer — each validator gets a random wait time from SGX; the first to expire wins.",
  forkBehavior:
    "Forks are unlikely due to the trusted timer mechanism. If timers expire at nearly the same time, the protocol may have a tie-breaking mechanism or accept the first received block.",
  finalityType:
    "Probabilistic finality (or deterministic in Sawtooth with additional voting).",
  blockProductionMethod:
    "The validator whose SGX-generated timer expires first broadcasts a block.",
  commonAttacks: [
    "SGX compromise — forging timer attestations by exploiting SGX vulnerabilities.",
    "Timer manipulation — interfering with the SGX random number generation.",
    "Eclipse attack — isolating the winning validator to prevent block propagation.",
    "Denial of service — preventing validators from obtaining timers from SGX.",
  ],
  attackResistance:
    "Low to moderate. The fundamental security dependency on SGX is the main vulnerability. Repeated security disclosures about SGX weaken the confidence in PoET's security. Within a trusted permissioned setting with limited adversarial risk, the attack resistance may be acceptable. In any adversarial environment, it is generally not recommended.",
  typicalTPS:
    "~1,000–10,000 TPS (observed, Hyperledger Sawtooth benchmarks)",
  typicalBlockTime: "~1–30 seconds (configurable, Hyperledger Sawtooth)",
  hardwareRequirements: [
    "Intel CPU with SGX support (6th gen Core or later, select Xeon processors).",
    "SGX enabled and configured in BIOS.",
    "Standard server configuration (8+ GB RAM, SSD).",
  ],
  realWorldExamples: [
    "Hyperledger Sawtooth (PoET consensus engine)",
    "Intel PoET Demonstration Network",
  ],
  compatibleConsensus: [
    "Hyperledger Sawtooth supports PoET as an alternative to PBFT and Raft-based consensus.",
  ],
  references: [
    "Hyperledger Sawtooth Documentation. 'Proof of Elapsed Time (PoET)' — hyperledger.org",
    "Intel Corporation. 'PoET: Proof of Elapsed Time Consensus Algorithm' — Intel Developer Zone (2016)",
  ],
  officialDocumentation: "https://hyperledger.github.io/sawtooth/",
  whitepaper: "https://hyperledger.github.io/sawtooth/",
  score: {
    security: 30,
    scalability: 82,
    decentralization: 20,
    energyEfficiency: 94,
  },
};
