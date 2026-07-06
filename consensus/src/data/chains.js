const chains = [
  { id: "btc", name: "Bitcoin", symbol: "BTC", algo: "pow", layer: "L1", lang: "Bitcoin Script", why: "Prioritises maximal security and immutability for a 'digital gold' store of value — speed is a deliberate non-goal." },
  { id: "ltc", name: "Litecoin", symbol: "LTC", algo: "pow", layer: "L1", lang: "Bitcoin Script", why: "A lighter, faster PoW fork of Bitcoin (Scrypt hashing, 2.5-min blocks) aimed at everyday payments." },
  { id: "doge", name: "Dogecoin", symbol: "DOGE", algo: "pow", layer: "L1", lang: "Bitcoin Script", why: "Merge-mined with Litecoin; inherited PoW gives it security almost for free while it focuses on tipping and payments." },
  { id: "xmr", name: "Monero", symbol: "XMR", algo: "pow", layer: "L1", lang: "No general smart contracts (privacy scripting only)", why: "A CPU-friendly, ASIC-resistant PoW variant (RandomX) keeps mining decentralized to protect its privacy mission." },
  { id: "ln", name: "Lightning Network", symbol: "LN", algo: "pow", layer: "L2", lang: "No independent consensus — payment channels over Bitcoin", why: "Moves everyday transfers off-chain into payment channels, settling back to Bitcoin's PoW chain for final security." },

  { id: "eth", name: "Ethereum", symbol: "ETH", algo: "pos", layer: "L1", lang: "Solidity, Vyper", why: "Moved from PoW to PoS ('The Merge') to cut energy use by ~99.9% and open the door to sharding and rollup scaling." },
  { id: "ada", name: "Cardano", symbol: "ADA", algo: "pos", layer: "L1", lang: "Plutus (Haskell), Marlowe", why: "The Ouroboros protocol is peer-reviewed and formally proven, matching Cardano's research-first design philosophy." },
  { id: "dot", name: "Polkadot", symbol: "DOT", algo: "pos", layer: "L1", lang: "Rust (ink!)", why: "Nominated PoS lets a shared relay chain validator set secure many independent 'parachains' at once." },
  { id: "avax", name: "Avalanche", symbol: "AVAX", algo: "pos", layer: "L1", lang: "Solidity (C-Chain, EVM)", why: "A PoS-based Avalanche consensus protocol gives sub-second, near-instant finality for its C-Chain smart contracts." },
  { id: "matic", name: "Polygon PoS", symbol: "POL", algo: "pos", layer: "L2", lang: "Solidity (EVM-compatible)", why: "A PoS-secured commit-chain that periodically checkpoints to Ethereum, borrowing its security while scaling throughput." },
  { id: "arb", name: "Arbitrum", symbol: "ARB", algo: "pos", layer: "L2", lang: "Solidity (EVM-compatible)", why: "An optimistic rollup that executes transactions off-chain and posts proofs back to Ethereum's PoS layer for security." },

  { id: "eos", name: "EOS", symbol: "EOS", algo: "dpos", layer: "L1", lang: "C++", why: "21 elected block producers give EOS the high throughput needed for consumer-facing dApps and games." },
  { id: "trx", name: "Tron", symbol: "TRX", algo: "dpos", layer: "L1", lang: "Solidity (TVM, EVM-compatible)", why: "27 Super Representatives keep block times low, tuned for content and media dApps that need speed over decentralization." },

  { id: "bnb", name: "BNB Smart Chain", symbol: "BNB", algo: "poa", layer: "L1", lang: "Solidity (EVM-compatible)", why: "A small, rotating validator set (Parlia PoSA) keeps fees near-zero and blocks fast for EVM-compatible dApps." },
  { id: "vet", name: "VeChain", symbol: "VET", algo: "poa", layer: "L1", lang: "Solidity (EVM-compatible)", why: "Authorized 'Authority Masternodes' give predictable performance enterprises need for supply-chain tracking." },

  { id: "atom", name: "Cosmos Hub", symbol: "ATOM", algo: "bft", layer: "L1", lang: "Rust (CosmWasm), Go", why: "Tendermint BFT gives instant finality, ideal for the hub-and-zone, cross-chain IBC architecture Cosmos is built around." },
  { id: "xrp", name: "XRP Ledger", symbol: "XRP", algo: "bft", layer: "L1", lang: "Hooks (C-like), JavaScript", why: "A Federated Byzantine Agreement variant finalizes in seconds, matching XRPL's goal of fast interbank settlement." },

  { id: "sol", name: "Solana", symbol: "SOL", algo: "poh", layer: "L1", lang: "Rust, C, C++ (via Anchor)", why: "PoH's verifiable clock removes most validator chatter, letting Solana chase extreme, single-global-state throughput." },
];

export default chains;
