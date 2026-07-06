export default {
  id: "bpos",
  name: "Bonded Proof of Stake",
  shortName: "BPoS",
  family: "Proof of X",
  variantOf: "Proof of Stake",
  inventor: "Various (concept emerged from early PoS implementations; formalized in Cosmos SDK)",
  organization: "Cosmos / Tendermint ecosystem",
  introducedYear: 2017,
  description:
    "Bonded Proof of Stake is a variant of Proof of Stake where validators and delegators must 'bond' (lock up) their tokens for a specific period to participate in consensus. Bonded tokens are at risk of slashing if the validator misbehaves, and there is typically an unbonding period (e.g., 21 days) during which bonded tokens cannot be withdrawn. Unbonding serves as a disincentive against long-range attacks.",
  overview:
    "BPoS requires participants to lock up tokens for a fixed period. Bonded tokens actively participate in consensus; those who bond more tokens (or have more bonded to them) have correspondingly more influence. Unbonding is a delayed process, creating a 'cool-down' period during which the tokens cannot be moved. This prevents rapid exit after misbehaviour and mitigates long-range attacks. BPoS is the core staking model of the Cosmos ecosystem (via Cosmos SDK) and is used in many Tendermint-based chains.",
  history:
    "BPoS emerged from the evolution of PoS systems in the 2014–2017 period. The concept of bonding was formalized in the Tendermint/Cosmos ecosystem as a solution to the 'long-range attack' problem in PoS. The Cosmos SDK (launched 2019) implemented BPoS as its default staking module, where ATOM holders can delegate to validators with a 21-day unbonding period. Other implementations include Peercoin's later PoS variants and various Tendermint-based chains.",
  problemSolved:
    "BPoS solves the 'long-range attack' problem in PoS where an adversary could create an alternative chain from a past state using old private keys. The bonding and unbonding period ensures that tokens that were used in consensus at any point remain locked for a period, giving honest validators time to detect and respond to reorganization attacks.",
  coreMechanism:
    'Token holders bond (lock) their tokens by delegating them to a validator or by self-bonding as a validator. Bonded tokens are considered active stake. A validator\'s voting power is proportional to its total bonded tokens. Unbonding takes a fixed period (e.g., 21 days), during which tokens cannot be used or transferred. Validators who misbehave have their bonded tokens (and their delegators\' tokens) slashed.',
  stepByStepExplanation: [
    'A token holder bonds tokens by sending them to a staking contract/module, specifying a validator to delegate to (or self-bonding as a validator).',
    'The bonded tokens are locked and cannot be transferred or used in other DeFi applications during the bonding period.',
    'The validator\'s total voting power is calculated as the sum of their self-bonded tokens and incoming delegations.',
    'The validator participates in consensus (proposing and voting on blocks) with voting power proportional to total bonded stake.',
    'If the validator behaves honestly, they earn block rewards and transaction fees, which are shared with their delegators (minus commission).',
    'If the validator misbehaves (double-signs, downtime, etc.), a portion of the bonded stake (validator + delegators) is slashed (destroyed).',
    'When a token holder wants to unbond, they initiate an unbonding transaction. The tokens are locked for an unbonding period (e.g., 21 days).',
    'After the unbonding period expires, the tokens are released to the holder\'s wallet and can be freely transferred.',
    'The unbonding period ensures that if a validator attacks, their stake cannot be immediately withdrawn, allowing for retroactive punishment.',
  ],
  advantages: [
    'Mitigates long-range attacks — unbonding period prevents rapid stake withdrawal.',
    'Economic security — slashing penalizes misbehaviour by destroying bonded tokens.',
    'Delegation — token holders can participate without running infrastructure.',
    'Accountability — validators and delegators share risk proportionally.',
    'Simple to understand and implement.',
    'Compatible with various finality mechanisms (Tendermint, etc.).',
  ],
  disadvantages: [
    'Liquidity trade-off — bonded tokens cannot be used during bonding/unbonding.',
    'Unbonding period creates user experience friction (21+ day waits).',
    'Slashing risk for delegators — delegators can be punished for a validator\'s misbehaviour.',
    'Validator commission structure can be complex for delegators to navigate.',
    'Stake concentration — delegation tends to flow to a few large validators.',
  ],
  bestUseCases: [
    'Proof of stake blockchains requiring strong economic security.',
    'Cosmos SDK-based chains (Cosmos Hub, Osmosis, etc.).',
    'Networks where long-range attack resistance is a priority.',
    'Platforms with delegation-oriented validator selection.',
  ],
  limitations: [
    'Bonding period reduces capital efficiency and composability.',
    'Slashing risk for uninformed delegators.',
    'Unbonding period can be an obstacle during market volatility.',
    'Validator centralization pressure from delegation economies of scale.',
  ],
  securityExplanation:
    'BPoS security relies on the economic stake at risk. Validators and delegators have aligned incentives: both lose staked tokens if the validator misbehaves. The unbonding period is critical — it ensures that an attacker cannot quickly withdraw their stake after attempting a long-range attack, giving the community time to detect and respond. The security threshold is the same as PoS: the system is safe as long as >2/3 of bonded stake is honest (with Tendermint-type finality). The unbonding duration is a key parameter: longer periods provide stronger security but worse user experience.',
  scalabilityExplanation:
    'BPoS does not directly impact blockchain throughput. The scalability characteristics depend on the underlying consensus implementation (e.g., Tendermint, BABE). BPoS primarily concerns itself with the staking and economic security model. The unbonding period and bonding mechanics add complexity to the tokenomics but do not affect how fast blocks can be produced.',
  decentralizationExplanation:
    'BPoS encourages decentralization through delegation: anyone with tokens can participate in consensus by delegating, even if they cannot run a validator. However, delegation tends to concentrate on well-known validators (exchanges, large staking providers). The Cosmos Hub has ~175 active validators, with the top 10 controlling a significant portion of delegated stake. Slashing risk also encourages delegators to diversify across multiple validators, which can improve distribution.',
  energyConsumption:
    'Very low. BPoS validators run standard server hardware with no mining or intensive computation.',
  validatorType: 'Bonded validator (self-bonded + delegations)',
  permissionType: 'Permissionless (anyone can delegate; validators compete for delegation)',
  leaderElection:
    'Depends on underlying consensus (e.g., round-robin in Tendermint).',
  forkBehavior:
    'Depends on underlying consensus. In Tendermint-based BPoS, there are no forks (deterministic finality).',
  finalityType:
    'Depends on underlying consensus; typically deterministic finality in Tendermint-based implementations.',
  blockProductionMethod:
    'Depends on underlying consensus (e.g., proposer selection in Tendermint).',
  commonAttacks: [
    'Long-range attack — mitigated by unbonding period.',
    'Validator compromise — attacker takes over a validator node and exploits slashing.',
    'Delegation centralization — whale delegators concentrating power.',
    'Governance attack — controlling >1/3 of bonded stake to halt finality.',
  ],
  attackResistance:
    'Good. The unbonding period is the key defence against long-range attacks. Slashing provides economic deterrence. The >2/3 honest stake assumption for finality is standard for BFT-based PoS systems. However, a persistent attacker with >1/3 of bonded stake can halt finality (liveness attack), and >2/3 can violate safety.',
  typicalTPS:
    'Depends on underlying consensus; Cosmos Hub (BPoS + Tendermint) ~1,000 TPS observed',
  typicalBlockTime:
    'Depends on underlying consensus; Cosmos Hub ~6–7 seconds observed',
  hardwareRequirements: [
    'Standard server (8+ CPU cores, 32+ GB RAM, SSD).',
    'Stable internet connection.',
    'Minimum bonded stake for validator (self-bond requirement varies by chain).',
  ],
  realWorldExamples: [
    'Cosmos Hub (ATOM, BPoS via Cosmos SDK)',
    'Osmosis (OSMO, BPoS via Cosmos SDK)',
    'Many Cosmos SDK-based chains',
    'IRISnet, Juno, and other IBC-enabled chains',
  ],
  compatibleConsensus: [
    'Tendermint BFT (most common pairing)',
    'CometBFT (Tendermint successor)',
    'Proof of Stake (parent concept)',
  ],
  references: [
    'Cosmos SDK Documentation. \'Staking Module\' — docs.cosmos.network',
    'Kwon, J. & Buchman, E. \'Cosmos Whitepaper\' (2016)',
    'Cosmos Hub Staking Documentation',
  ],
  officialDocumentation: 'https://docs.cosmos.network/',
  whitepaper: 'https://v1.cosmos.network/resources/whitepaper',
  score: {
    security: 72,
    scalability: 45,
    decentralization: 45,
    energyEfficiency: 96,
  },
};
