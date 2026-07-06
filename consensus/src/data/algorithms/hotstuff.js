export default {
  id: "hotstuff",
  name: "HotStuff BFT",
  shortName: "HotStuff",
  family: "BFT",
  variantOf: "Practical Byzantine Fault Tolerance",
  inventor: "Maofan Yin, Dahlia Malkhi, Michael K. Reiter, Guy Golan-Gueta, Ittai Abraham",
  organization: "VMware Research / Novi (Meta)",
  introducedYear: 2018,
  description:
    "HotStuff is a Byzantine Fault Tolerance consensus protocol that improves on PBFT by achieving linear communication complexity (O(n)) through signature aggregation and a pipelined three-phase commit approach. It provides a simple, practical BFT solution that scales to hundreds of validators, making it the foundation of the Diem (Libra) blockchain and several other modern BFT systems.",
  overview:
    "HotStuff introduces a BFT protocol where the leader commits to a proposal and validators respond with aggregated signatures. The protocol has three phases (prepare, pre-commit, commit) but these are pipelined across successive views (rounds). The key innovation is that validators only send one message per phase to the leader (who aggregates), reducing communication from O(n²) to O(n). HotStuff is the basis for the DiemBFT protocol used by the Diem (formerly Libra) blockchain.",
  history:
    "HotStuff was introduced in 2018 by a team of researchers from VMware Research (Maofan Yin, Dahlia Malkhi, Michael K. Reiter) and others. The protocol was published in the paper 'HotStuff: BFT Consensus in the Lens of Blockchain'. It was quickly adopted by the Diem (Libra) project at Facebook (now Meta) as the basis for DiemBFT v1 and v2. HotStuff's O(n) communication and simplicity compared to PBFT made it attractive for production BFT systems. It has since been implemented in several blockchain frameworks including Diem, Aptos (AptosBFT), and Sui (Narwhal + Bullshark).",
  problemSolved:
    "HotStuff solves the O(n²) communication bottleneck of traditional PBFT protocols. By using threshold signatures and a leader-centric approach where all messages go through the leader, validators only send O(n) total messages per view (round). The chained (pipelined) design further reduces latency by overlapping phases across views.",
  coreMechanism:
    "HotStuff uses a repeated three-phase protocol (prepare, pre-commit, commit) across successive leaders (views). In each phase, the leader collects signed votes from validators, aggregates the signatures into a compact QC (Quorum Certificate), and includes the QC in the next message. The chain of QCs across views provides a complete history of decisions, enabling linear communication and efficient view-changes.",
  stepByStepExplanation: [
    "The network operates in views (rounds). Each view has a designated leader (selected by round-robin or via VRF).",
    "The leader proposes a new block referencing the previous block and sets the desired chain branch via a 'prepare' message.",
    "Validators receive the proposal, verify it, and send a signed vote (prepare vote) back to the leader.",
    "The leader collects prepare votes from validators. Once it has 2f+1 votes, it forms a Quorum Certificate (QC) — typically a single aggregated BLS signature — and includes it in a 'pre-commit' message.",
    "Validators receive the pre-commit with the QC, verify it, and respond with pre-commit votes.",
    "The leader collects 2f+1 pre-commit votes, forms a second QC, and sends a 'commit' message.",
    "Validators receive the commit with the second QC, respond with commit votes. The leader forms a third QC and broadcasts it.",
    "Once validators see the third QC, the block is considered committed and executed.",
    "The protocol transitions to the next view with a new leader, who starts the next proposal using the latest QC as the starting point.",
    "If the leader fails (no proposal, invalid proposal, or insufficient votes), a view-change protocol elects a new leader and the round restarts.",
  ],
  advantages: [
    "Linear communication complexity — O(n) messages per view, compared to O(n²) for PBFT.",
    "Pipelined phases — multiple blocks can be in different stages of consensus simultaneously.",
    "Simple view-change — the view-change protocol reuses the same message structure as normal operation.",
    "Signature aggregation — BLS signatures enable a single QC to represent 2f+1 validators.",
    "Scalable to hundreds of validators — practical for larger BFT networks.",
    "Tolerates up to f faulty nodes with 3f+1 validators.",
  ],
  disadvantages: [
    "Leader-centric — all communication goes through the leader, creating a bottleneck.",
    "Requires BLS signature aggregation — added cryptographic complexity.",
    "View-change latency — if the leader is slow or fails, progress pauses.",
    "More complex than simpler BFT protocols for small validator sets.",
    "Primarily suited for permissioned or semi-permissioned settings (though later variants add support for dynamic sets).",
  ],
  bestUseCases: [
    "Permissioned BFT networks with 50–200 validators.",
    "High-performance Layer 1 blockchains (Diem, Aptos, Sui).",
    "Payment and settlement networks requiring high throughput and deterministic finality.",
    "Environments where linear message complexity is critical for scaling.",
  ],
  limitations: [
    "Leader is a performance bottleneck and DoS target.",
    "Requires BLS signatures, which add computational overhead.",
    "Best suited for small-to-medium validator sets; very large sets (>500) may still face limitations.",
    "Less tested in highly adversarial, permissionless settings.",
    "View-change can be exploited by an adversary controlling a fast network link.",
  ],
  securityExplanation:
    "HotStuff provides safety (no conflicting blocks) under partial synchrony with up to f faulty validators out of 3f+1. Liveness requires eventual synchrony and at most f faulty validators. The protocol is proven safe and live under standard BFT assumptions. The use of BLS aggregate signatures means that a single QC compactly represents a quorum's agreement, reducing the attack surface for equivocation. The chained QC structure ensures that once a block is committed, it cannot be reverted without a controlling a quorum of validators.",
  scalabilityExplanation:
    "HotStuff's O(n) communication complexity makes it significantly more scalable than PBFT. In practice, HotStuff-based systems (e.g., Diem, Aptos) support 100–200 validators with high throughput. The pipelined design allows multiple blocks to be in flight simultaneously, improving throughput. The leader bottleneck can be mitigated by parallelizing proposal processing. Latency is typically 2–4 network round trips for finality.",
  decentralizationExplanation:
    "HotStuff is primarily designed for permissioned or semi-permissioned networks. Diem's validator set was planned to be ~100 nodes run by member organizations. Aptos (AptosBFT) uses a PoS-based validator set with dynamic participation. The protocol's linear communication makes it practical for larger validator sets than PBFT, enabling more decentralized participation while maintaining performance.",
  energyConsumption:
    "Very low. HotStuff validators run standard server hardware with no mining or computation beyond cryptographic operations.",
  validatorType: "Validator node (typically permissioned or stake-weighted)",
  permissionType: "Permissioned (or semi-permissioned with PoS overlay)",
  leaderElection:
    "Round-robin (basic) or VRF-based (cryptographically random) leader selection per view.",
  forkBehavior:
    "No forks — HotStuff provides deterministic finality. The chain of QCs guarantees consensus on a single history.",
  finalityType:
    "Instant / deterministic finality — committed blocks are irreversible.",
  blockProductionMethod:
    "Leader proposes a block, validators vote through three phases (prepare, pre-commit, commit) producing QCs.",
  commonAttacks: [
    "Leader-targeted DoS — overwhelming the leader to trigger view-changes.",
    "Equivocation — a malicious leader sends conflicting proposals to different validators (detectable via the QC mechanism).",
    "View-change stalling — an adversary with network control delays messages to prevent quorum formation.",
  ],
  attackResistance:
    "Strong within standard BFT assumptions. The QC mechanism ensures that a leader cannot equivocate without detection. The view-change protocol is efficient and resistant to manipulation. The primary risk is a DoS attack on the leader, which degrades performance but does not violate safety. The use of BLS aggregation makes it resilient to a range of message-level attacks.",
  typicalTPS:
    "~1,000–10,000+ TPS (observed, Diem/Libra testnet benchmarks); thousands to tens of thousands in subsequent systems",
  typicalBlockTime:
    "~1–5 seconds (observed, view-dependent); sub-second in optimized configurations",
  hardwareRequirements: [
    "Standard server (8+ CPU cores, 32+ GB RAM, SSD).",
    "Low-latency network between validators.",
    "BLS signature library support.",
  ],
  realWorldExamples: [
    "Diem / Libra (Facebook/Meta, 2019–2022, DiemBFT based on HotStuff)",
    "Aptos (AptosBFT, derived from DiemBFT v2)",
    "Sui (Narwhal + Bullshark, inspired by HotStuff's BFT lineage)",
    "Flow (HotStuff-like consensus for high-throughput dApps)",
  ],
  compatibleConsensus: [
    "DiemBFT (direct variant)",
    "AptosBFT (successor variant)",
    "PBFT (parent protocol)",
    "Streamlet (simplified BFT variant)",
  ],
  references: [
    "Yin, M. et al. 'HotStuff: BFT Consensus with Linearity and Responsiveness' (2018)",
    "Diem Association. 'DiemBFT v2: A State-of-the-Art BFT Consensus Protocol' (2021)",
    "Aptos Labs. 'AptosBFT' — aptos.dev",
  ],
  officialDocumentation: "https://developers.diem.com/",
  whitepaper: "https://arxiv.org/abs/1803.05069",
  score: {
    security: 78,
    scalability: 82,
    decentralization: 35,
    energyEfficiency: 97,
  },
};
