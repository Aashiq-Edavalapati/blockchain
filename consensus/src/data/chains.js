import blockchains from "./blockchains/index.js";

const chainMapping = [
  { id: "btc", srcId: "bitcoin", algo: "pow", showInMatrix: true },
  { id: "ltc", srcId: "litecoin", algo: "pow", showInMatrix: true },
  { id: "doge", srcId: "dogecoin", algo: "pow", showInMatrix: true },
  { id: "xmr", srcId: "monero", algo: "pow", showInMatrix: true },
  { id: "ln", name: "Lightning Network", symbol: "LN", algo: "pow", layer: "L2", lang: "No independent consensus — payment channels over Bitcoin", why: "Moves everyday transfers off-chain into payment channels, settling back to Bitcoin's PoW chain for final security.", showInMatrix: false },
  { id: "eth", srcId: "ethereum", algo: "pos", showInMatrix: true },
  { id: "ada", srcId: "cardano", algo: "ouroboros", showInMatrix: true },
  { id: "dot", srcId: "polkadot", algo: "npos", showInMatrix: true },
  { id: "avax", srcId: "avalanche", algo: "avalanche", showInMatrix: true },
  { id: "matic", srcId: "polygon", algo: "pos", showInMatrix: true },
  { id: "arb", srcId: "arbitrum", algo: "pos", showInMatrix: true },
  { id: "eos", srcId: "eos", algo: "dpos", showInMatrix: true },
  { id: "trx", srcId: "tron", algo: "dpos", showInMatrix: true },
  { id: "bnb", srcId: "bnbChain", algo: "parlia", showInMatrix: true },
  { id: "vet", srcId: "vechain", algo: "poa", showInMatrix: true },
  { id: "atom", srcId: "cosmos", algo: "tendermint", showInMatrix: true },
  { id: "xrp", srcId: "xrpl", algo: "fba", showInMatrix: true },
  { id: "sol", srcId: "solana", algo: "poh", showInMatrix: true },
  { id: "xlm", srcId: "stellar", algo: "fba", showInMatrix: true },
  { id: "neo", srcId: "neo", algo: "dbft", showInMatrix: true },
  { id: "fabric", srcId: "hyperledgerFabric", algo: "raft", showInMatrix: false },
  { id: "sawtooth", srcId: "hyperledgerSawtooth", algo: "proofOfElapsedTime", showInMatrix: false },
  { id: "tez", srcId: "tezos", algo: "pos", showInMatrix: true },
  { id: "algo", srcId: "algorand", algo: "pos", showInMatrix: true },
  { id: "near", srcId: "near", algo: "pos", showInMatrix: true },
  { id: "hbar", srcId: "hedera", algo: "hashgraph", showInMatrix: true },
  { id: "sui", srcId: "sui", algo: "hotstuff", showInMatrix: true },
  { id: "apt", srcId: "aptos", algo: "hotstuff", showInMatrix: true },
  { id: "flow", srcId: "flow", algo: "hotstuff", showInMatrix: true },
  { id: "icp", srcId: "internetComputer", algo: "pos", showInMatrix: true },
  { id: "egld", srcId: "multiversx", algo: "pos", showInMatrix: true },
  { id: "celo", srcId: "celo", algo: "ibft", showInMatrix: true },
  { id: "cro", srcId: "cronos", algo: "tendermint", showInMatrix: false },
  { id: "klay", srcId: "klaytn", algo: "ibft", showInMatrix: false },
  { id: "op", srcId: "optimism", algo: "pos", showInMatrix: false },
  { id: "base", srcId: "base", algo: "pos", showInMatrix: false },
  { id: "zksync", srcId: "zksyncEra", algo: "pos", showInMatrix: false },
  { id: "stark", srcId: "starknet", algo: "pos", showInMatrix: false },
  { id: "polyzkevm", srcId: "polygonZkEVM", algo: "pos", showInMatrix: false },
  { id: "xch", srcId: "chia", algo: "proofOfCapacity", showInMatrix: true },
  { id: "xem", srcId: "nem", algo: "proofOfImportance", showInMatrix: true },
  { id: "dcr", srcId: "decred", algo: "proofOfActivity", showInMatrix: true },
  { id: "slm", srcId: "slimcoin", algo: "proofOfBurn", showInMatrix: true },
  { id: "zil", srcId: "zilliqa", algo: "pbft", showInMatrix: true },
  { id: "osmo", srcId: "osmosis", algo: "bpos", showInMatrix: true },
  { id: "avax-c", name: "Avalanche C-Chain", symbol: "AVAX-C", algo: "snowman", layer: "L1", lang: "Solidity, Vyper", why: "EVM-compatible execution environment using Snowman consensus for linear block ordering.", showInMatrix: false },
  { id: "avax-x", name: "Avalanche X-Chain", symbol: "AVAX-X", algo: "snowball", layer: "L1", lang: "None (asset creation and transfer only)", why: "Uses the base Snowball voting engine on a DAG for fast, parallel asset transfers.", showInMatrix: false },
  { id: "goerli", name: "Goerli Testnet (Deprecated)", symbol: "GETH", algo: "clique", layer: "L1", lang: "Solidity, Vyper", why: "Clique Proof of Authority was chosen for testing stability and predictable block times without mining power requirements.", showInMatrix: false },
  { id: "aura-chain", name: "Substrate Solo Chain", symbol: "AURA", algo: "aura", layer: "L1", lang: "Rust (via ink! or Wasm runtimes)", why: "Aura provides simple, slot-based round-robin block production for Substrate-based independent chains.", showInMatrix: false },
];

const chains = chainMapping.map((entry) => {
  if (entry.srcId) {
    const bc = blockchains.find((b) => b.id === entry.srcId);
    if (bc) {
      return {
        id: entry.id,
        name: bc.name,
        symbol: bc.symbol,
        algo: entry.algo,
        layer: bc.layer,
        lang: bc.smartContractLanguages,
        why: bc.whyConsensusChosen,
        showInMatrix: entry.showInMatrix,
      };
    }
  }
  return entry;
});

export default chains;
