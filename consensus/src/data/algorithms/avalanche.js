export default {
  id: "avalanche",
  name: "Avalanche Consensus",
  shortName: "Avalanche",
  iconName: "Network",
  color: "#E84142",
  tagline: "Random sampling for rapid consensus.",
  pulseDuration: 0.8,
  strength: "Sub-second finality — typically 1–3 seconds.",
  tradeoff: "Probabilistic (not deterministic) finality — though probability of reversal drops exponentially.",
  family: "DAG / BFT",
  variantOf: null,
  inventor: "Emin Gün Sirer, Kevin Sekniqi, Maofan Yin (Team Rocket)",
  organization: "Ava Labs",
  introducedYear: 2018,
  description:
    "Avalanche is a family of consensus protocols that uses repeated random subsampling (subsampled voting) to achieve agreement. Nodes poll a small random subset of validators and update their preferences based on responses. After enough rounds, the network converges on a single value with high probability. Avalanche provides low latency, high throughput, and energy efficiency while tolerating Byzantine faults.",
  overview:
    "Avalanche consensus is a novel metastable mechanism based on repeated random sampling. Unlike classical BFT (all-to-all voting) or Nakamoto consensus (proof of work), Avalanche nodes repeatedly poll a small random set of validators and switch their preference if the sampled set disagrees. The protocol converges rapidly — it is both probabilistic and Byzantine fault tolerant. This enables high throughput and sub-second finality.",
  history:
    "Avalanche was introduced in 2018 by a pseudonymous researcher 'Team Rocket' (later revealed as Emin Gün Sirer, Kevin Sekniqi, and Maofan Yin) in the paper 'Snowflake to Avalanche: A Novel Metastable Consensus Protocol for the Cryptocurrency and Blockchain Space'. Ava Labs was founded in 2018, and the Avalanche mainnet launched in September 2020. The protocol is the foundation of the Avalanche C-Chain (EVM-compatible), P-Chain (platform), and X-Chain (assets) subnet architecture.",
  problemSolved:
    "Avalanche solves the classic blockchain trilemma dilemma by providing a protocol that scales to thousands of validators with sub-second finality and high throughput. It solves the latency and communication complexity problems of classical BFT (which is O(n²)) by using constant-size random sampling instead of all-to-all voting. It also avoids the energy waste of PoW.",
  coreMechanism:
    "Each validator maintains a binary preference (YES/NO) about a proposed value (e.g., a transaction or block). In each round, the validator randomly selects k validators (e.g., k=20) and polls their preference. If the majority of the sample disagrees with the validator, it switches to the majority. After β consecutive rounds of the same preference, the validator decides (finalizes) on that value.",
  stepByStepExplanation: [
    "A client submits a new value (e.g., a transaction or block) to a validator node in the network.",
    "The validator checks for conflicts with previously accepted values. If no conflict exists, it starts the consensus process.",
    "The validator initializes its preference to YES for the new value and sets a 'confidence' counter to 0.",
    "The validator randomly selects k validators (e.g., k=20) from the network and queries their current preferences about the value.",
    "If the majority of the sampled validators prefer the same value, the validator updates its preference to that value. If the preference differs from the previous round, confidence resets.",
    "If the preference stays consistent for β consecutive rounds (the 'quorum' parameter), the validator decides (commits) to that value.",
    "Once a validator decides, it notifies the network. As more validators decide, the value is considered finalized.",
    "The conflict detection (vertex DAG or block-based) ensures double-spends are identified along conflict edges, and the protocol only finalizes one side of any conflict.",
  ],
  advantages: [
    "Sub-second finality — typically 1–3 seconds.",
    "High throughput — thousands of TPS, scales linearly with bandwidth.",
    "Energy efficient — no mining, no computation-intensive work.",
    "Scalable to thousands of validators — O(1) per-node communication per round.",
    "Byzantine fault tolerance — tolerates up to 60% malicious nodes under certain conditions.",
    "Flexible deployment — supports both permissioned and permissioned settings via subnet architecture.",
  ],
  disadvantages: [
    "Probabilistic (not deterministic) finality — though probability of reversal drops exponentially.",
    "DAG-based (or block-based) conflict model adds complexity to application development.",
    "Relatively newer protocol, less time under adversarial conditions than PoW or PBFT.",
    "Random sampling introduces latency variance.",
    "Sybil resistance requires an existing stake or identity mechanism (uses PoS overlay).",
  ],
  bestUseCases: [
    "High-performance smart contract platforms (Ethereum-compatible via C-Chain).",
    "Multi-chain ecosystems using subnets for customizability.",
    "DeFi and trading applications needing fast finality.",
    "Asset issuance and tokenization (X-Chain).",
  ],
  limitations: [
    "Avalanche alone is not Sybil-resistant — it must be combined with PoS (or another identity mechanism) for permissionless operation.",
    "The protocol's mathematical analysis is complex and still evolving.",
    "Large validator sets increase the number of rounds needed for the same confidence level.",
    "Subnet model creates dependency on the validator set's quality on the primary network.",
  ],
  securityExplanation:
    "Avalanche provides safety and liveness under the assumption that less than a threshold of validators are malicious (typically 33–50% depending on parameters). The random sampling makes it exponentially unlikely for an honest node to decide on a value that the network has not also decided on. Unlike classical BFT, the safety threshold depends on the sampling parameters (k and β). The protocol is parametrically tunable: higher k and β increase safety at the cost of latency.",
  scalabilityExplanation:
    "Avalanche scales exceptionally well because each validator only communicates with a constant-size random subset per round (O(1) messages), not with all validators (O(n)). This means throughput is not fundamentally limited by the validator count. The Avalanche C-Chain handles ~4,500 TPS in practice, and the protocol can scale linearly with available bandwidth. The DAG-based X-Chain allows for even higher parallel throughput.",
  decentralizationExplanation:
    "Avalanche supports thousands of validators with low hardware requirements, enabling broad participation. The primary network has ~1,500–2,000 validators. However, the minimum stake requirement (2,000 AVAX ~ $20k–$50k) is a barrier. The subnet architecture allows different decentralization trade-offs for different chains, but the primary network's validator set is the security bottleneck for all subnets.",
  energyConsumption:
    "Very low. Avalanche uses no mining or intensive computation. Validators run standard server hardware. The energy consumption is comparable to running a web server farm.",
  validatorType: "Staker (AVAX holders who run validator nodes)",
  permissionType: "Permissionless (minimum stake of 2,000 AVAX)",
  leaderElection:
    "No leader — each validator independently polls random subsets and updates preferences.",
  forkBehavior:
    "Avalanche uses a DAG-based conflict model (vertices with edges). Conflicting transactions form a 'conflict set', and the protocol ensures only one transaction from each conflict set is accepted. The consensus converges on a single, consistent DAG.",
  finalityType:
    "Probabilistic finality — exponentially decreasing probability of reversal. Practically irreversible after ~3 seconds.",
  blockProductionMethod:
    "Vertices are proposed by validators and connected via parent edges. The DAG structure allows parallel block production. On the C-Chain (EVM), blocks are linearized from the DAG.",
  commonAttacks: [
    "Sybil attack — creating many fake validator identities (mitigated by PoS stake).",
    "Eclipse attack — isolating a node to feed it false poll responses.",
    "Bribe attack — paying validators to vote for conflicting values.",
    "Liveness attack — pausing the network by preventing poll responses.",
    "Stale validation — delayed API responses affect confidence accumulation.",
  ],
  attackResistance:
    "High for a probabilistic protocol. The random sampling makes targeted attacks expensive — an attacker would need to control a large fraction of the validator set and maintain that control over many rounds. The PoS overlay provides Sybil resistance. Eclipse attacks are mitigated by diverse peer connections and randomized sampling from the full validator set.",
  typicalTPS:
    "~4,500 TPS (observed, Avalanche C-Chain); higher on X-Chain (theoretical: thousands more)",
  typicalBlockTime:
    "~1–3 seconds (observed, Avalanche C-Chain); sub-second on X-Chain",
  hardwareRequirements: [
    "Standard server (8+ CPU cores, 32+ GB RAM, 500+ GB SSD).",
    "Stable internet connection.",
    "Minimum 2,000 AVAX stake.",
  ],
  realWorldExamples: [
    "Avalanche C-Chain (EVM-compatible smart contracts)",
    "Avalanche X-Chain (decentralized asset issuance)",
    "Avalanche P-Chain (platform / subnet management)",
    "Various Avalanche subnets (e.g., DFK Chain, Dexalot)",
  ],
  compatibleConsensus: [
    "Snowman consensus (Avalanche's linear-chain variant for smart contracts)",
    "Snowball (predecessor protocol in the Avalanche family)",
    "Proof of Stake (on which Avalanche builds for Sybil resistance)",
  ],
  references: [
    "Team Rocket (Sirer, E.G., Sekniqi, K., Yin, M.). 'Snowflake to Avalanche: A Novel Metastable Consensus Protocol' (2018)",
    "Ava Labs. 'Avalanche White Paper' — avax.network",
    "Avalanche Developer Documentation — docs.avax.network",
  ],
  officialDocumentation: "https://docs.avax.network/",
  whitepaper: "https://assets.avax.network/whitepaper.pdf",
  score: {
    security: 70,
    scalability: 88,
    decentralization: 58,
    energyEfficiency: 95,
  },
};
