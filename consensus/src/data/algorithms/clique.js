export default {
  id: "clique",
  name: "Clique (Proof of Authority)",
  shortName: "Clique",
  iconName: "Users",
  color: "#DB7093",
  tagline: "Lightweight PoA for Ethereum testnets.",
  pulseDuration: 1.5,
  strength: "Very fast block times — ~5 seconds (configurable).",
  tradeoff: "Centralized — small signer set with known identities.",
  family: "Proof of X",
  variantOf: "Proof of Authority",
  inventor: "Péter Szilágyi (Ethereum Foundation)",
  organization: "Ethereum Foundation",
  introducedYear: 2017,
  description:
    "Clique is a Proof of Authority consensus engine for Ethereum, specified in EIP-225. It maintains a whitelist of authorized signers who produce blocks in a round-robin schedule. Clique is designed for testnets and private Ethereum networks where fast block times and low overhead are more important than decentralization.",
  overview:
    "Clique is a simple, lightweight PoA consensus implementation for Ethereum. A pre-configured set of signers (validators) take turns producing blocks at a configurable interval. Each block is signed by its producer, and the signature is verified against the signer list. Clique provides fast block times (~5 seconds) and immediate finality for testnets, developer chains, and private networks.",
  history:
    "Clique was introduced by Péter Szilágyi (Lead Ethereum Developer at the Ethereum Foundation) through EIP-225 in 2017. It was designed as a replacement for the older ethash PoW for testnets and private chains. Clique was first used in the Rinkeby testnet (which has since been deprecated) and became the consensus engine for the Goerli testnet (2019–2023). Clique is implemented in all major Ethereum clients (Geth, Nethermind, Besu) and is widely used for local development chains.",
  problemSolved:
    "Clique solves the need for a fast, low-overhead consensus mechanism for Ethereum testnets and private networks. It eliminates the need for mining hardware and energy consumption while providing predictable block production with known, trusted validators.",
  coreMechanism:
    "A fixed set of authorized signers produce blocks in round-robin order. Each signer signs blocks with their Ethereum account key. The protocol enforces that each signer can produce at most one block out of every N (typically N=2) blocks to prevent a single signer from dominating the chain. Blocks are validated by checking the recovered signer address against the authorized set.",
  stepByStepExplanation: [
    "A genesis file or governance mechanism defines an initial set of authorized signers (Ethereum accounts).",
    "Signers are arranged in a round-robin schedule. Each block has a 'step' (seconds since a reference time) that determines which signer should produce the block.",
    "When it is a signer's turn (their 'in-turn' period), they assemble a block from pending transactions, sign it with their private key, and broadcast it.",
    "If a signer misses their turn (no block appears within the step duration), the next signer in the rotation ('out-of-turn') can produce the block after a delay.",
    "Each signer can produce at most floor(len(signers)/2)+1 consecutive blocks to prevent dominance.",
    "Receiving nodes verify the block's signature by recovering the signer address from the block header's 'extraData' field. The recovered address must be in the authorized signer set.",
    "If a signer produces a block out of turn or too many consecutive blocks, the block is rejected.",
    "The authorized signer set can be changed via a voting mechanism: signers cast votes in block headers, and once a majority is reached, a new signer is added or removed.",
  ],
  advantages: [
    "Very fast block times — ~5 seconds (configurable).",
    "Instant finality — no forks, no reorgs.",
    "Simple to configure and deploy.",
    "Low resource requirements — runs on inexpensive hardware.",
    "No energy consumption for consensus.",
    "Built-in governance — signer voting mechanism for set changes.",
  ],
  disadvantages: [
    "Centralized — small signer set with known identities.",
    "Not suitable for public mainnets requiring censorship resistance.",
    "Small signer sets are vulnerable to collusion.",
    "Out-of-turn blocks add latency variability.",
    "Voting-based governance is slow for signer changes (requires majority vote).",
    "Testnet-focused — not intended for production high-value chains.",
  ],
  bestUseCases: [
    "Ethereum testnets (Goerli, Rinkeby, Sepolia).",
    "Local development and CI/CD chains.",
    "Private consortium Ethereum networks.",
    "Educational and prototyping blockchain environments.",
  ],
  limitations: [
    "Not designed for public, permissionless networks.",
    "Security relies on signer honesty and identity verification.",
    "Signer key compromise is a critical risk.",
    "No slashing mechanism for misbehaviour.",
    "Limited to Ethereum-compatible chains.",
  ],
  securityExplanation:
    "Clique security relies on the trustworthiness of the authorized signers. There is no on-chain slashing for misbehaviour; a malicious signer can reorg the chain by refusing to include certain transactions. Signer key management is the primary security concern — if a signer's key is stolen, the attacker can produce malicious blocks until the signer set votes them out. The 'wiggle room' (limited out-of-turn block production) reduces the power of any single signer. For testnets and private chains, this level of security is typically acceptable.",
  scalabilityExplanation:
    "Clique is limited by the execution capacity of the Ethereum node (EVM), not by consensus overhead. Block times of ~5 seconds with the gas limit of 30M provide a throughput of approximately 100–300 TPS depending on transaction complexity. Consensus itself adds negligible overhead.",
  decentralizationExplanation:
    "Clique is explicitly centralized. The signer set is small and manually configured. For testnets like Goerli, signers are run by a handful of organizations. There is no mechanism for permissionless entry. Decentralization is a non-goal — the protocol is designed for utility and speed in trusted environments.",
  energyConsumption:
    "Negligible. Clique signers run standard Ethereum nodes with no mining or computation. Energy consumption is comparable to running a desktop computer.",
  validatorType: "Authorized signer (pre-approved Ethereum account)",
  permissionType: "Permissioned",
  leaderElection:
    "Round-robin based on step (UNIX timestamp). In-turn signer is determined by (step % len(signers)).",
  forkBehavior:
    "Forks are extremely rare due to synchronized round-robin production. If a fork occurs (two signers produce blocks for the same step), the chain follows the first received valid block.",
  finalityType:
    "Instant finality — once a block is added to the chain, it is immediately considered final (no reorganization under honest signers).",
  blockProductionMethod:
    "In-turn signer assembles and signs a block. Out-of-turn signers can produce after a delay if the in-turn signer misses their slot.",
  commonAttacks: [
    "Signer key compromise — attacker steals a signer's key and produces malicious blocks.",
    "Censorship — signers collude to exclude certain transactions.",
    "Collusion among signers to reorganize the chain.",
    "Spam — producing many out-of-turn blocks to disrupt the schedule.",
  ],
  attackResistance:
    "Low. Clique is designed for trusted environments and provides minimal resistance against malicious signers who control their keys. Key compromise is the primary risk. The protocol does not include slashing, so there is no direct economic penalty for misbehaviour. Governance (voting out signers) is the only recourse.",
  typicalTPS: "~100–300 TPS (observed, depends on gas limit and transaction complexity)",
  typicalBlockTime: "~5 seconds (observed, configurable per network)",
  hardwareRequirements: [
    "Standard Ethereum node requirements (4+ CPU cores, 16+ GB RAM, 200+ GB SSD).",
    "No specialized hardware required.",
  ],
  realWorldExamples: [
    "Goerli Testnet (Deprecated) (GETH)",
    "Rinkeby Testnet (Clique PoA, deprecated)",
    "Sepolia Testnet (transitioned from Clique to PoS)",
    "Countless local development chains and CI pipelines",
  ],
  compatibleConsensus: [
    "Aura (Substrate/Polkadot PoA variant, similar round-robin model)",
    "Parlia (BNB Smart Chain hybrid PoSA)",
    "Proof of Authority (parent concept)",
  ],
  references: [
    "Szilágyi, P. 'Clique: A Proof-of-Authority Consensus Engine' — EIP-225 (2017)",
    "Ethereum Go (Geth) Documentation on Clique",
    "Goerli Testnet Configuration — github.com/goerli",
  ],
  officialDocumentation: "https://geth.ethereum.org/docs/faq/clique",
  whitepaper: "https://eips.ethereum.org/EIPS/eip-225",
  score: {
    security: 40,
    scalability: 85,
    decentralization: 10,
    energyEfficiency: 99,
  },
};
