export default {
  id: "raft",
  name: "Raft Consensus",
  shortName: "Raft",
  family: "CFT (Crash Fault Tolerance)",
  variantOf: null,
  inventor: "Diego Ongaro, John Ousterhout",
  organization: "Stanford University",
  introducedYear: 2013,
  description:
    "Raft is a consensus algorithm for managing a replicated log in a distributed system. It is designed to be understandable and practical, providing crash fault tolerance (CFT) rather than Byzantine fault tolerance. Raft elects a leader who is responsible for log replication. The leader handles all client interactions and replicates log entries to followers using a two-phase process.",
  overview:
    "Raft decomposes consensus into three sub-problems: leader election, log replication, and safety. Servers are in one of three states: leader, candidate, or follower. A leader is elected by majority vote; it then receives client requests, appends entries to its log, and replicates them to followers. As long as a majority of servers remain operational, the system continues to function. Raft is crash fault tolerant, not Byzantine fault tolerant — it assumes honest but potentially unavailable nodes.",
  history:
    "Raft was created by Diego Ongaro and John Ousterhout at Stanford University in 2013. The motivation was to create a consensus algorithm that was easier to understand than Paxos, the long-standing standard for distributed consensus. Ongaro's PhD dissertation 'In Search of an Understandable Consensus Algorithm' presented Raft as a more pedagogical alternative to Paxos. Raft has been widely adopted in industry: etcd (used by Kubernetes), Consul, and HashiCorp products all use Raft-based consensus.",
  problemSolved:
    "Raft solves the problem of maintaining a consistent, replicated state machine across a cluster of servers, tolerating crash (non-Byzantine) failures. It provides a way for multiple servers to agree on a shared log of commands, ensuring that even if some servers fail, the system as a whole continues to operate correctly.",
  coreMechanism:
    "Raft operates through leader election and log replication. A leader is elected by majority vote. The leader accepts client requests, appends them to its log as entries, replicates them to followers, and commits them once a majority have acknowledged. If the leader fails, a new election is triggered. The system uses randomized election timeouts to avoid split votes.",
  stepByStepExplanation: [
    "All servers start as followers. If a follower does not receive communication from the leader within an election timeout (randomized 150–300 ms), it becomes a candidate.",
    "The candidate increments its term number, votes for itself, and sends RequestVote RPCs to other servers.",
    "If a candidate receives votes from a majority of servers, it becomes the leader for the current term.",
    "The leader begins sending AppendEntries RPCs (heartbeats or log entries) to all followers at regular intervals.",
    "When a client sends a command to the leader, the leader appends the command as a new entry in its log.",
    "The leader sends the new entry to all followers via AppendEntries RPCs. Followers append the entry to their logs and acknowledge.",
    "Once the leader receives acknowledgement from a majority of followers, it commits the entry (applies it to the state machine) and notifies followers.",
    "If a follower fails or is slow, the leader retries AppendEntries indefinitely.",
    "If the leader fails, a new election begins. Followers become candidates after their election timeout expires.",
    "Raft ensures that the leader always has the most complete log (the 'leader completeness' property), so log entries from previous terms are never lost once committed.",
  ],
  advantages: [
    "Understandable and simple to implement.",
    "Well-documented with many reference implementations.",
    "Widely adopted in production systems (etcd, Consul).",
    "Efficient — O(n) communication per commit (leader broadcasts to all).",
    "Fast leader election — typically <1 second.",
    "Reasonable performance for moderate cluster sizes (5–9 nodes).",
  ],
  disadvantages: [
    "Crash fault tolerant only — does not handle Byzantine faults (malicious nodes).",
    "All traffic goes through the leader, creating a bottleneck.",
    "Static cluster membership — adding/removing nodes requires explicit configuration changes.",
    "Performance degrades with large clusters (typically max 5–9 nodes).",
    "Leader-centric design means the leader is a single point of failure for liveness (though elections recover quickly).",
  ],
  bestUseCases: [
    "Distributed key-value stores and configuration management (etcd, Consul).",
    "Coordinated state machines in trusted environments.",
    "Systems where all participants are known and trusted (no Byzantine behaviour expected).",
    "Kubernetes control plane (etcd).",
    "Database replication and log shipping.",
  ],
  limitations: [
    "No Byzantine fault tolerance — assumes all nodes follow protocol correctly.",
    "Not designed for wide-area networks (presumes low latency between nodes).",
    "Cluster size limited to ~9 nodes for acceptable performance.",
    "Read-only operations also go through the leader (though some implementations allow cached reads).",
  ],
  securityExplanation:
    "Raft is designed for crash fault tolerance, not Byzantine fault tolerance. It assumes all nodes follow the protocol honestly. If a node is compromised and behaves maliciously (e.g., sending conflicting logs, forging messages), Raft's safety guarantees are broken. Security relies on all participants being trusted entities within a controlled environment. Network-level security (TLS) is typically used for communication privacy and integrity.",
  scalabilityExplanation:
    "Raft does not scale to large cluster sizes. The leader must communicate with every follower for each commit, creating O(n) communication per request. Latency is determined by the slowest follower (the leader must wait for a majority to acknowledge). Practical deployments are limited to 3–9 nodes. For larger clusters, hierarchical Raft or alternative protocols are needed.",
  decentralizationExplanation:
    "Raft is used in permissioned systems where all nodes are operated by known entities (e.g., a single organization or consortium). There is no concept of permissionless participation. Decentralization depends on the operator distribution: if all nodes are run by one organization, the system is centralized; if run by multiple organizations, it can be moderately decentralized within the consortium.",
  energyConsumption:
    "Very low. Raft runs on standard server hardware with no mining or computation. Typical operation uses negligible energy beyond base server operation.",
  validatorType: "Server node (leader, candidate, or follower)",
  permissionType: "Permissioned",
  leaderElection:
    "Randomized election timeouts; the first candidate to gather a majority of votes becomes leader.",
  forkBehavior:
    "Raft enforces a single leader per term. There is no concept of forking in the blockchain sense. Log entries are committed in strict order, and only the leader's log is authoritative.",
  finalityType:
    "Deterministic finality — once a majority of followers have acknowledged a log entry, it is committed and cannot be reverted.",
  blockProductionMethod:
    "Not applicable (Raft is a log replication protocol, not a blockchain block production mechanism). In blockchain contexts, Raft is used for ordering service components.",
  commonAttacks: [
    "Leader DoS — overwhelming the leader to trigger elections.",
    "Partition attack — splitting the network to prevent majority agreement.",
    "Compromised node — a compromised follower returns false acknowledgements (affects correctness, though quorum mitigates).",
  ],
  attackResistance:
    "Low in adversarial environments. Raft is explicitly not designed for environments with Byzantine faults. A single malicious node with a vote can cause an election deadlock or log inconsistency. It should only be used in trusted, permissioned settings.",
  typicalTPS: "~10,000–100,000+ operations/sec (observed, etcd in datacenter setups)",
  typicalBlockTime: "Not applicable (log replication latency: ~1–10ms in datacenter)",
  hardwareRequirements: [
    "Standard server hardware (4+ CPU cores, 16+ GB RAM, SSD).",
    "Low-latency network between cluster nodes.",
    "Odd number of nodes (3, 5, 7, 9) for majority quorum.",
  ],
  realWorldExamples: [
    "etcd (distributed key-value store, used by Kubernetes)",
    "HashiCorp Consul (service discovery and configuration)",
    "MongoDB Replica Set (Raft-based oplog replication)",
    "TiKV (distributed transactional key-value store)",
    "Hyperledger Fabric (ordering service component, Raft-based)",
  ],
  compatibleConsensus: [
    "Paxos (predecessor, same crash-fault-tolerant family)",
    "Multi-Raft (sharded Raft for scaling)",
  ],
  references: [
    "Ongaro, D. & Ousterhout, J. 'In Search of an Understandable Consensus Algorithm' (2014)",
    "Ongaro, D. 'Consensus: Bridging Theory and Practice' — PhD Thesis (2014)",
    "etcd Documentation — etcd.io",
  ],
  officialDocumentation: "https://raft.github.io/",
  whitepaper: "https://raft.github.io/raft.pdf",
  score: {
    security: 25,
    scalability: 35,
    decentralization: 20,
    energyEfficiency: 98,
  },
};
