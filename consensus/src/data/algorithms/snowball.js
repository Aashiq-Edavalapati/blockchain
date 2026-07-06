export default {
  id: "snowball",
  name: "Snowball Consensus",
  shortName: "Snowball",
  family: "DAG / BFT",
  variantOf: "Avalanche Consensus",
  inventor: "Emin Gün Sirer, Kevin Sekniqi, Maofan Yin (Team Rocket)",
  organization: "Ava Labs",
  introducedYear: 2018,
  description:
    "Snowball is a core protocol in the Avalanche consensus family, building on the Snowflake protocol by introducing a 'confidence counter' that persists across rounds. Each validator tracks how many consecutive times the sampled majority has agreed with its current preference. Snowball is a metastable protocol that converges rapidly on a single value, forming the foundation of the full Avalanche consensus mechanism.",
  overview:
    "Snowball extends the basic Snowflake protocol by remembering the cumulative confidence in a preference across rounds rather than resetting the counter each time a node changes its preference. This accelerates convergence and improves security. Snowball is the 'voting engine' at the heart of Avalanche consensus and its variants (Snowman, etc.).",
  history:
    "Snowball was introduced in the 2018 paper 'Snowflake to Avalanche' by Team Rocket. The Snowball protocol sits between Snowflake (basic sampling) and Avalanche (DAG-based full consensus) in the paper's protocol hierarchy. Snowflake provides the foundation with a simple consecutive-count decision rule; Snowball strengthens it with a persistent confidence counter; and finally Avalanche adapts the mechanism to a DAG-based transaction graph. Together, these protocols form a spectrum of metastable consensus mechanisms.",
  problemSolved:
    "Snowball solves the slowness and rigidity of classical BFT by replacing all-to-all voting with random subsampling. The confidence counter mechanism makes the protocol more robust to adversarial conditions (e.g., oscillating preferences) compared to Snowflake, which resets confidence after every preference change.",
  coreMechanism:
    "Each validator tracks a binary preference (preferring one of two conflicting values). It repeatedly samples k random validators and collects their preferences. If the majority of the sample disagrees with the validator, it flips its preference. Crucially, a persistent counter tracks total confidence in each preference — it only resets when the preference changes, not every round.",
  stepByStepExplanation: [
    "A validator starts with an initial preference (e.g., YES for a proposed transaction). It sets a confidence counter for each possible value (YES, NO) to 0.",
    "The validator randomly selects k validators from the network and queries their current preferences.",
    "The validator compares the sample results. If a majority of the sample prefers a different value than the validator, the validator switches to that majority preference and resets the confidence counter for the new preference.",
    "If the validator does not switch (the majority agrees with its current preference), the validator increments its confidence counter for the current preference.",
    "If the confidence counter reaches a threshold β (e.g., β = 15), the validator decides (finalizes) on the value.",
    "If the validator ever switches preferences again before reaching β, the confidence counter resets to 0 and the process continues with the new preference.",
    "Once the threshold is reached, the decision is broadcast. The value is considered finalized.",
  ],
  advantages: [
    "Fast convergence — typically within a few seconds.",
    "Low message overhead — O(k) per node per round, where k is small (e.g., 20).",
    "Byzantine fault tolerance — safe with <50% malicious validators in practice.",
    "No leader — censorship-resistant.",
    "Graceful degradation — even with significant adversarial presence, converges slowly rather than failing.",
  ],
  disadvantages: [
    "Probabilistic finality — reversal probability is non-zero (though exponentially small).",
    "Parameter sensitivity — k, β, and α must be carefully chosen for the expected validator count and adversarial threshold.",
    "Confidence counter can take longer to converge under adversarial behaviour (oscillating votes).",
    "Requires a Sybil-resistance mechanism (typically PoS) to prevent fake validators.",
  ],
  bestUseCases: [
    "Core voting engine within the Avalanche protocol family.",
    "Networks where fast, probabilistic consensus is acceptable.",
    "Leaderless BFT consensus with low communication overhead.",
  ],
  limitations: [
    "Not a standalone consensus for permissionless blockchains — needs Sybil resistance.",
    "Probabilistic guarantees may not suit systems requiring deterministic finality (e.g., financial settlement).",
    "Convergence time depends on network conditions and parameter tuning.",
  ],
  securityExplanation:
    "Snowball is safe as long as less than a threshold of validators are malicious. The persistent confidence counter provides stronger guarantees than Snowflake: even if an adversary temporarily influences a validator to switch preferences, the validator quickly converges back to the honest preference because the confidence counter accumulates rapidly for the honest value. The probability of deciding on a conflicting value decreases exponentially with the threshold β.",
  scalabilityExplanation:
    "Snowball is highly scalable because each round involves only k messages (independent of total validator count n). This means the network can support thousands of validators with minimal communication overhead. The scalability of Snowball is a key reason the Avalanche family can achieve high throughput even with large validator sets.",
  decentralizationExplanation:
    "Snowball itself is communication-efficient and can support any validator count — it does not inherently limit decentralization. However, in practice, the Sybil-resistance layer (PoS) imposes a financial barrier (e.g., 2,000 AVAX). The actual decentralization depends on stake distribution, not on the Snowball protocol itself.",
  energyConsumption:
    "Very low. Snowball requires only network polling and counter updates — no mining or intensive computation.",
  validatorType: "Network participant (polled by peers)",
  permissionType: "Permissionless (when combined with Sybil resistance like PoS)",
  leaderElection:
    "Leaderless — each validator independently polls and updates its preference.",
  forkBehavior:
    "Snowball resolves binary conflicts (e.g., which of two conflicting blocks to accept). Once a decision is made, the value is finalized, and conflicting alternatives are rejected.",
  finalityType:
    "Probabilistic finality — exponentially decreasing probability of reversal.",
  blockProductionMethod:
    "Not directly applicable — Snowball is a sub-protocol within Avalanche. Block production is handled by higher-level protocols (Avalanche DAG or Snowman chain).",
  commonAttacks: [
    "Sybil attack (if no PoS layer) — creating many fake validators to bias sampling.",
    "Adversarial churn — creating validators that change preferences to reset counters.",
    "Eclipse attack — isolating a node and returning fabricated sample results.",
  ],
  attackResistance:
    "Depends on the presence of a Sybil-resistance mechanism. With PoS, Snowball is resistant to Sybil attacks because creating a validator costs stake. The confidence counter mechanism provides resistance to preference-oscillation attacks. The protocol degrades gracefully, requiring exponentially many rounds to force incorrect decisions.",
  typicalTPS: "Not directly applicable (sub-protocol metric)",
  typicalBlockTime: "Not directly applicable (sub-protocol metric)",
  hardwareRequirements: [
    "Any device capable of network communication (lightweight protocol).",
    "No specialized hardware required.",
  ],
  realWorldExamples: [
    "Avalanche C-Chain (Snowball used in voting engine)",
    "Avalanche X-Chain and P-Chain",
  ],
  compatibleConsensus: [
    "Avalanche Consensus (full DAG-based protocol built on Snowball)",
    "Snowflake (predecessor protocol)",
    "Snowman (linear-chain variant)",
  ],
  references: [
    "Team Rocket (Sirer, E.G., Sekniqi, K., Yin, M.). 'Snowflake to Avalanche: A Novel Metastable Consensus Protocol' (2018)",
    "Ava Labs. 'Snowball Protocol Description' — docs.avax.network",
  ],
  officialDocumentation: "https://docs.avax.network/",
  whitepaper: "https://assets.avax.network/whitepaper.pdf",
  score: {
    security: 60,
    scalability: 90,
    decentralization: 60,
    energyEfficiency: 98,
  },
};
