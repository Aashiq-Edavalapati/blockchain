export default {
  id: "dbft",
  name: "Delegated Byzantine Fault Tolerance",
  shortName: "dBFT",
  iconName: "Vote",
  color: "#4169E1",
  tagline: "Delegated BFT with optimized agreement.",
  pulseDuration: 2.5,
  strength: "Instant deterministic finality — no forks, no reorgs.",
  tradeoff: "Limited decentralization — consensus set is very small (typically 7 nodes).",
  family: "BFT",
  variantOf: "Practical Byzantine Fault Tolerance",
  inventor: "Erik Zhang",
  organization: "NEO Foundation",
  introducedYear: 2014,
  description:
    "Delegated Byzantine Fault Tolerance is a consensus mechanism used by NEO that combines delegated voting with PBFT-style agreement. Token holders vote for a set of professional nodes (consensus nodes) who then run a modified PBFT protocol to produce blocks. It provides instant finality and high throughput while maintaining accountability through delegation.",
  overview:
    "dBFT operates in two layers. Token holders delegate their voting power to elect a committee of consensus nodes. These nodes then execute an optimized BFT agreement protocol (inspired by PBFT) to propose, validate, and finalize blocks. The elected set is small enough for efficient BFT communication, and the delegation layer provides economic alignment.",
  history:
    "dBFT was introduced by Erik Zhang (co-founder of NEO) in 2014 as the consensus mechanism for Antshares (renamed NEO in 2017). NEO launched with dBFT 1.0, which achieved single-block finality but had some liveness and governance limitations. dBFT 2.0 (also called NEO3) introduced recovery mechanisms, improved view-change, and better Byzantine fault tolerance. NEO has since evolved into a platform focusing on compliance and digitized assets.",
  problemSolved:
    "dBFT solves the tension between decentralization (token holder participation) and BFT efficiency (small validator set). By separating consensus participation from token holding, it allows broad economic participation through voting while maintaining the performance characteristics of a small BFT committee.",
  coreMechanism:
    "Token holders vote with their NEO tokens to elect a set of consensus nodes (typically 7 in NEO). The elected nodes run a PBFT-derived consensus protocol. A speaker (leader) proposes a block; other delegates verify and sign. Once 2/3+1 of delegates have signed, the block is finalized. Delegates are rewarded with NEO gas (GAS).",
  stepByStepExplanation: [
    "NEO token holders cast votes to elect a fixed number of consensus nodes (e.g., the top 7 by vote count).",
    "The elected consensus nodes establish a BFT committee. One node is designated as the speaker (leader) for the current round.",
    "The speaker collects pending transactions, assembles a block, and broadcasts it to all other consensus nodes.",
    "Each consensus node validates the block and broadcasts a signed response indicating approval or rejection.",
    "Once 2/3+1 of consensus nodes (e.g., 5 out of 7) have approved, the block is considered finalized.",
    "The speaker broadcasts the finalization message with all collected signatures, and all nodes commit the block.",
    "The speaker role rotates to the next consensus node in the following round.",
    "If the speaker fails to produce a block in time, a view-change selects a new speaker and the round restarts.",
    "Consensus nodes earn GAS rewards proportional to their service. Token holders who voted for them also receive a share.",
  ],
  advantages: [
    "Instant deterministic finality — no forks, no reorgs.",
    "High throughput — suitable for high-volume applications.",
    "Accountable delegation — token holders can vote out underperforming nodes.",
    "Recovery mechanism — dBFT 2.0 handles leader failure efficiently.",
    "Low energy consumption — no mining or computation required.",
    "Block subsidy rewards are distributed to all token holders via GAS.",
  ],
  disadvantages: [
    "Limited decentralization — consensus set is very small (typically 7 nodes).",
    "Token-weighted voting concentrates power with large holders.",
    "Voter apathy — most token holders do not vote, leaving control to a minority.",
    "Small committee is vulnerable to collusion (4 out of 7 could censor).",
    "Less battle-tested than older mechanisms like PoW or PBFT.",
  ],
  bestUseCases: [
    "High-performance smart contract platforms needing instant finality.",
    "Digitized asset and compliance-focused blockchains.",
    "Networks where token-holder democracy is desired but performance matters.",
  ],
  limitations: [
    "A 7-node consensus set is highly centralized compared to PoS with thousands of validators.",
    "Voter turnout is often very low, meaning effective control is highly concentrated.",
    "No permissionless validator entry; election is the only path to becoming a consensus node.",
    "Small set means each node is a critical availability point.",
  ],
  securityExplanation:
    "dBFT inherits the safety guarantees of PBFT: it tolerates up to f faulty nodes out of 3f+1 (for NEO's 7 nodes, f=2, tolerating 2 Byzantine failures). Safety is guaranteed under partial synchrony. The delegation layer adds economic alignment: consensus nodes are elected and can be unelected if misbehaving. However, the very small committee (7 nodes) means collusion requires only 4 nodes. Real-world identities of NEO consensus nodes are generally known, adding reputational deterrence.",
  scalabilityExplanation:
    "dBFT scales well for execution (high TPS) but not for committee size. With 7 nodes, the O(n²) communication overhead of PBFT is negligible (49 messages per round). Throughput is primarily limited by transaction execution, not consensus. NEO's dBFT achieves thousands of TPS in practice. Adding more consensus nodes would degrade performance proportionally.",
  decentralizationExplanation:
    "dBFT scores very low on decentralization. The active consensus set is small (7 nodes), and token-weighted voting means large holders effectively control who gets elected. NEO's voting participation is typically very low. The system is designed for a 'digital identity' ecosystem where finality and accountability take priority over permissionless decentralization.",
  energyConsumption:
    "Very low. Consensus nodes run standard servers with no mining or intensive computation. The energy footprint is comparable to a small office network.",
  validatorType: "Elected consensus node (delegate)",
  permissionType: "Permissioned (election-based entry; token holders vote)",
  leaderElection:
    "Round-robin among the elected consensus nodes; speaker rotates each round.",
  forkBehavior:
    "No forks — dBFT provides deterministic single-chain finality. Conflicting blocks cannot be committed.",
  finalityType:
    "Instant / deterministic finality — block is finalized once 2/3+1 of consensus nodes sign it.",
  blockProductionMethod:
    "Speaker proposes a block; consensus nodes validate and sign; 2/3+1 signatures finalize.",
  commonAttacks: [
    "Collusion — 4 of 7 nodes collude to censor or finalize malicious blocks.",
    "Vote manipulation — large holders buy or coerce votes to control consensus set.",
    "DoS on consensus nodes — targeting known IP addresses.",
    "Sybil attack on voting — creating fake token accounts (mitigated by token cost).",
  ],
  attackResistance:
    "Moderate. The small committee makes collusion a tangible risk. Within its fault tolerance threshold (f=2 nodes), dBFT is provably safe. Beyond that threshold, the system is vulnerable. The delegation layer's economic alignment and identity transparency provide some deterrence, but there is no slashing mechanism (unlike modern PoS/BFT hybrids).",
  typicalTPS: "~1,000–10,000 TPS (observed, NEO mainnet)",
  typicalBlockTime: "~15–25 seconds (observed, NEO mainnet); 1–5 seconds in optimized configurations",
  hardwareRequirements: [
    "Standard server (8+ CPU cores, 32+ GB RAM, SSD).",
    "Stable, low-latency internet connection.",
    "No specialized hardware required.",
  ],
  realWorldExamples: [
    "NEO (7 consensus nodes, dBFT 2.0)",
    "NEO TestNet",
  ],
  compatibleConsensus: [
    "PBFT (parent variant)",
    "IBFT (similar delegated BFT for Ethereum)",
  ],
  references: [
    "Zhang, E. 'dBFT: Delegated Byzantine Fault Tolerance' — NEO Whitepaper (2014)",
    "NEO Technology Documentation — docs.neo.org",
    "NEO Consensus Mechanism — NEO Documentation",
  ],
  officialDocumentation: "https://docs.neo.org/",
  whitepaper: "https://neo.org/whitepaper",
  score: {
    security: 62,
    scalability: 84,
    decentralization: 28,
    energyEfficiency: 97,
  },
};
