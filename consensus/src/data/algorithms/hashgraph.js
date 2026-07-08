export default {
  id: "hashgraph",
  name: "Hashgraph",
  shortName: "Hashgraph",
  iconName: "Network",
  color: "#000000",
  tagline: "Consensus through gossip-about-gossip and virtual voting.",
  pulseDuration: 1.5,
  strength: "Asynchronous Byzantine Fault Tolerant (aBFT) — mathematically proven highest security.",
  tradeoff: "Enterprise-oriented, historically patented, and limited public validator set.",
  family: "DAG",
  variantOf: null,
  inventor: "Leemon Baird",
  organization: "Swirlds / Hedera Hashgraph",
  introducedYear: 2016,
  description:
    "Hashgraph is a patented, high-performance consensus algorithm that uses a Directed Acyclic Graph (DAG) structure to record the history of how nodes communicate. Instead of packing transactions into linear blocks, nodes spread transactions via 'gossip-about-gossip'. Consensus is then achieved using 'virtual voting', where each node calculates what votes other nodes would cast based on its local copy of the hashgraph, eliminating the need for voting messages over the network.",
  overview:
    "Hashgraph provides Asynchronous Byzantine Fault Tolerance (aBFT), which means it achieves consensus without making assumptions about network delivery speeds. It uses a DAG of 'events' representing transaction batches. By exchanging small metadata about who gossiped to whom (gossip-about-gossip), all nodes construct the same hashgraph. Nodes then run a virtual voting algorithm to determine the consensus order of events, providing sub-second finality and high throughput.",
  history:
    "Hashgraph was invented by Dr. Leemon Baird in 2016, who co-founded Swirlds to license the technology. In 2018, Swirlds partnered with Hedera Hashgraph to build a public network using the algorithm. Hedera launched its mainnet in September 2019. The algorithm was initially proprietary, but in 2022, Hedera announced that the code would be open-sourced under the Apache 2.0 license, and Swirlds transitioned its patents to the public domain to encourage wider adoption.",
  problemSolved:
    "Hashgraph solves the trade-off between speed, safety, and message complexity in BFT consensus. Traditional BFT protocols (like PBFT) require O(n²) or O(n³) message communication to agree on transaction ordering, limiting validator counts. Hashgraph achieves BFT consensus with zero voting messages over the network, as the voting is calculated locally ('virtually') by each node based on the gossip history. It also achieves the strongest safety guarantee: asynchronous Byzantine fault tolerance.",
  coreMechanism:
    "Nodes create 'events' containing transactions and two parent hashes (self-parent and other-parent, representing the last event created by this node and the last received in a gossip sync). Nodes gossip these events. Because the graph of events (the hashgraph) contains the complete history of communication, any node can calculate the consensus order of events by running the virtual voting algorithm locally. This includes determining 'famous witnesses' to establish rounds and consensus timestamps.",
  stepByStepExplanation: [
    "A node receives transactions and packages them into an 'event' (which contains a timestamp, transactions, its self-parent hash, and the hash of the last event received from another node).",
    "Nodes select other nodes at random and sync their event histories via gossip (gossip-about-gossip).",
    "Through gossip, all nodes receive new events and construct an identical Directed Acyclic Graph (the hashgraph).",
    "Each node runs the virtual voting algorithm locally. The algorithm divides the hashgraph into 'rounds'.",
    "In each round, nodes identify 'witnesses' (the first event created by a node in a round).",
    "Nodes calculate whether each witness is 'famous' based on how many other witnesses in the next round can 'see' it.",
    "Once famous witnesses are determined, the consensus order of all events in the round is established.",
    "A consensus timestamp is assigned to each transaction, calculated as the median of the timestamps when active validators first received it.",
    "Transactions are executed, and state is updated. The consensus is mathematically final and irreversible.",
  ],
  advantages: [
    "Asynchronous Byzantine Fault Tolerant (aBFT) — mathematically proven highest security.",
    "High throughput — handles over 10,000 TPS natively.",
    "Sub-second finality — transactions are finalized in under 3–5 seconds.",
    "Fair ordering — consensus timestamps prevent front-running and ordering manipulation.",
    "No voting message overhead — virtual voting uses zero network bandwidth.",
    "Low transaction fees — typically fractions of a cent.",
  ],
  disadvantages: [
    "Permissioned validator set — Hedera is governed by a Governing Council, with public validation not yet fully permissionless.",
    "Patented origin — historically faced criticism due to proprietary licensing (now open-source).",
    "No fork tolerance — if a partition lasts too long, liveness depends on the governing council resolving state.",
    "Complex state synchronization — keeping nodes in sync with high TPS requires significant storage and bandwidth.",
  ],
  bestUseCases: [
    "High-frequency microtransactions and enterprise payments.",
    "Supply chain tracing and verifiable logging (Hedera Consensus Service).",
    "DeFi applications requiring prevention of front-running (Fair Ordering).",
    "Consortium and private ledger deployments.",
  ],
  limitations: [
    "Validator set is small and centralized (under 30 nodes on Hedera mainnet).",
    "Highly dependent on Hedera's specific governance and corporate council.",
    "Public nodes cannot yet write state without permission.",
  ],
  securityExplanation:
    "Hashgraph achieves asynchronous Byzantine Fault Tolerance (aBFT), the gold standard of consensus security. It guarantees safety and liveness under any network conditions (including malicious firewalls or message delays) as long as less than 1/3 of the voting power is Byzantine. Unlike partially synchronous BFT, it makes no assumptions about network latency. It also provides fair ordering, making it impossible for a single node to manipulate transaction order because ordering is based on median timestamps across all validators.",
  scalabilityExplanation:
    "Hashgraph is extremely scalable. The gossip protocol is highly efficient, requiring minimal bandwidth. Virtual voting eliminates consensus message overhead entirely. Hedera routinely processes over 1,000 TPS on its mainnet, with benchmarks demonstrating over 10,000 TPS for simple transactions. Block times are non-existent; transactions are finalized individually in ~3–5 seconds.",
  decentralizationExplanation:
    "While the algorithm itself supports permissionless scaling, Hedera Hashgraph's implementation is highly permissioned. It is governed by a council of up to 39 global enterprises (including Google, IBM, Boeing, and Ubisoft) who run the validator nodes. This provides high corporate trust but limits decentralization compared to networks like Bitcoin or Ethereum. Hedera has announced plans to transition to permissionless community nodes and public validators in the future.",
  energyConsumption:
    "Negligible. Hashgraph uses standard server hardware without mining or intensive staking computations. Hedera's energy consumption is estimated at 0.000003 kWh per transaction, making it one of the greenest networks in existence.",
  validatorType: "Governing Council member (enterprise node operator) / Staker (HBAR)",
  permissionType: "Permissioned (validators managed by Hedera Governing Council)",
  leaderElection:
    "Leaderless — all nodes participate in gossip, and consensus is computed locally via virtual voting.",
  forkBehavior:
    "No forks. The mathematical proofs of aBFT ensure that nodes cannot commit conflicting transactions. The network maintains a single canonical state.",
  finalityType:
    "Immediate deterministic finality (sub-second consensus finality once virtual voting resolves).",
  blockProductionMethod:
    "Leaderless event propagation. Transactions are grouped into events, gossiped, and ordered locally via virtual voting.",
  commonAttacks: [
    "DDoS on council nodes — targeting the small number of validator IPs.",
    "1/3 collusion — if >1/3 of the stake is compromised, the network halts or safety is lost.",
    "State synchronization exploits — feeding desynchronized nodes false state history.",
  ],
  attackResistance:
    "Exceptional against network attacks. Being aBFT, it is immune to DDoS-induced safety violations and network partition attacks. The fair ordering mechanism prevents front-running and transaction ordering manipulation. The primary vulnerability is the small validator set, which makes physical or legal pressure on validators a concern.",
  typicalTPS: "~1,000–10,000+ TPS (observed, Hedera mainnet)",
  typicalBlockTime: "Immediate (leaderless, consensus finality in ~3–5 seconds)",
  hardwareRequirements: [
    "Enterprise-grade server (minimum 16 CPU cores, 64 GB RAM, 2 TB SSD).",
    "High-speed, stable internet connection (1 Gbps+ symmetric bandwidth recommended).",
  ],
  realWorldExamples: ["Hedera Hashgraph (HBAR)", "Swirlds Private Ledger"],
  compatibleConsensus: ["DAG (Directed Acyclic Graph) family", "aBFT protocols"],
  references: [
    "Baird, L. 'The Swirlds Consensus Algorithm: Consensus on a Distributed Database' (2016)",
    "Hedera Developer Documentation — docs.hedera.com",
  ],
  officialDocumentation: "https://docs.hedera.com/",
  whitepaper: "https://www.swirlds.com/downloads/SWIRLDS-TR-2016-01.pdf",
  score: {
    security: 95,
    scalability: 90,
    decentralization: 25,
    energyEfficiency: 99,
  },
};
