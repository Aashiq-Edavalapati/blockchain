import chains from "./chains.js";
import blockchains from "./blockchains/index.js";
import families from "./families.js";

function familyLookup() {
  const map = {};
  for (const f of families) {
    for (const ex of f.examples) {
      const lower = ex.name.toLowerCase();
      if (lower.includes("proof of work")) map.pow = f.id;
      if (lower.includes("proof of stake") && !lower.includes("delegated") && !lower.includes("nominated") && !lower.includes("bonded") && !lower.includes("liquid")) map.pos = f.id;
      if (lower.includes("delegated proof of stake")) map.dpos = f.id;
      if (lower.includes("proof of authority") && !lower.includes("staked")) map.poa = f.id;
      if (lower.includes("nominated proof of stake")) map.npos = f.id;
      if (lower.includes("bonded proof of stake")) map.bpos = f.id;
      if (lower.includes("proof of capacity")) map.proofOfCapacity = f.id;
      if (lower.includes("proof of burn")) map.proofOfBurn = f.id;
      if (lower.includes("proof of elapsed time")) map.proofOfElapsedTime = f.id;
      if (lower.includes("proof of importance")) map.proofOfImportance = f.id;
      if (lower.includes("proof of activity")) map.proofOfActivity = f.id;
      if (lower.includes("proof of history")) map.poh = f.id;
      if (lower.includes("practical byzantine")) map.pbft = f.id;
      if (lower.includes("tendermint")) map.tendermint = f.id;
      if (lower.includes("istanbul")) map.ibft = f.id;
      if (lower.includes("hotstuff")) map.hotstuff = f.id;
      if (lower.includes("raft")) map.raft = f.id;
      if (lower.includes("clique")) map.clique = f.id;
      if (lower.includes("aura")) map.aura = f.id;
      if (lower.includes("parlia") || lower.includes("proof of staked authority")) map.parlia = f.id;
      if (lower.includes("avalanche") && f.id === "dag") map.avalanche = f.id;
      if (lower.includes("snowman")) map.snowman = f.id;
      if (lower.includes("snowball")) map.snowball = f.id;
      if (lower.includes("ouroboros")) map.ouroboros = f.id;
      if (lower.includes("dbft") || lower.includes("delegated byzantine")) map.dbft = f.id;
      if (lower.includes("stellar") || lower.includes("xrp")) map.fba = f.id;
    }
  }
  return map;
}

const ALGO_FAMILY = familyLookup();

const BLOCKCHAIN_MAP = {};
for (const bc of blockchains) {
  BLOCKCHAIN_MAP[bc.id] = bc;
}

function bcFor(chainEntry) {
  if (chainEntry._bc) return chainEntry._bc;
  if (chainEntry.srcId) return BLOCKCHAIN_MAP[chainEntry.srcId];
  const found = blockchains.find(b => b.name === chainEntry.name);
  if (found) return found;
  return null;
}

function getFamily(algoId) {
  return ALGO_FAMILY[algoId] || "other";
}

function vmCategory(vm) {
  if (!vm || vm === "None") return "none";
  const v = vm.toLowerCase();
  if (v.includes("evm") || v.includes("ethereum virtual machine")) return "evm";
  if (v.includes("bitcoin script")) return "bitcoin-script";
  if (v.includes("wasm") || v.includes("cosmwasm")) return "wasm";
  if (v.includes("sealevel")) return "sealevel";
  if (v.includes("plutus")) return "plutus";
  return "custom";
}

function langFamily(lang) {
  if (!lang) return "none";
  const l = lang.toLowerCase();
  if (l.includes("solidity") || l.includes("vyper")) return "solidity";
  if (l.includes("rust")) return "rust";
  if (l.includes("bitcoin script")) return "bitcoin-script";
  if (l.includes("plutus") || l.includes("haskell")) return "haskell";
  if (l.includes("cpp") || l.includes("c++")) return "cpp";
  if (l.includes("move")) return "move";
  if (l.includes("cairo")) return "cairo";
  if (l.includes("hooks") || l.includes("c-like")) return "hooks";
  if (l.includes("motoko")) return "motoko";
  if (l.includes("cadence")) return "cadence";
  if (l.includes("michelson")) return "michelson";
  if (l.includes("teal")) return "teal";
  if (l.includes("go")) return "go";
  return "other";
}

function finalityFromDesc(desc) {
  if (!desc) return "unknown";
  const d = desc.toLowerCase();
  if (d.includes("deterministic") || d.includes("immediate") || d.includes("instant")) return "deterministic";
  if (d.includes("economic")) return "economic";
  if (d.includes("probabilistic")) return "probabilistic";
  return "other";
}

function finalityScore(aBc, bBc) {
  const fa = finalityFromDesc(aBc.finality);
  const fb = finalityFromDesc(bBc.finality);
  if (fa === fb) {
    if (fa === "deterministic") return 90;
    if (fa === "economic") return 80;
    if (fa === "probabilistic") return 60;
    return 50;
  }
  if ((fa === "deterministic" || fa === "economic") && (fb === "deterministic" || fb === "economic")) return 70;
  return 30;
}

function smartContractScore(aBc, bBc) {
  const aVm = vmCategory(aBc.virtualMachine);
  const bVm = vmCategory(bBc.virtualMachine);
  const aHas = aBc.supportsSmartContracts === true;
  const bHas = bBc.supportsSmartContracts === true;
  if (!aHas && !bHas) return 90;
  if (!aHas || !bHas) return 20;
  if (aVm === bVm) {
    if (aVm === "evm") return 85;
    return 75;
  }
  if ((aVm === "evm" && (bVm === "wasm" || bVm === "sealevel")) || (bVm === "evm" && (aVm === "wasm" || aVm === "sealevel"))) return 30;
  return 5;
}

function consensusScore(a, b) {
  if (a.algo === b.algo) return 95;
  if (getFamily(a.algo) === getFamily(b.algo)) return 60;
  return 20;
}

function needsBridge(a, aBc, b, bBc) {
  if (a.algo === b.algo && vmCategory(aBc.virtualMachine) === vmCategory(bBc.virtualMachine) && a.layer === b.layer) return false;
  return true;
}

function buildReason(a, b, scores, aBc, bBc) {
  const aId = a.id;
  const bId = b.id;
  const aName = a.name;
  const bName = b.name;
  
  if (aId === bId) {
    return `Self-compatibility on the ${aName} network. Operations run natively on the same ledger, state machine, and consensus layer. Transaction finality, gas mechanisms, and state transition executions are fully unified, requiring no cross-chain message passing or asset wrapping.`;
  }

  // 1. Bitcoin and Lightning Network
  if ((aId === "btc" && bId === "ln") || (aId === "ln" && bId === "btc")) {
    return `The Lightning Network is a native Layer-2 scaling solution constructed directly on the Bitcoin blockchain. It utilizes off-chain payment channels secured by Hash Time-Locked Contracts (HTLCs) and multi-signature scripts on Bitcoin's base layer. Interoperability is trustless; participants can transact instantly and cheaply off-chain, and settle back to Bitcoin's robust SHA-256 Proof of Work consensus for absolute settlement finality.`;
  }

  // 2. Cosmos / Tendermint Ecosystem
  const isCosmosA = aId === "atom" || aId === "osmo" || aId === "cro";
  const isCosmosB = bId === "atom" || bId === "osmo" || bId === "cro";
  if (isCosmosA && isCosmosB) {
    return `Both ${aName} and ${bName} belong to the Cosmos Interchain ecosystem, sharing the Tendermint BFT consensus engine and the Cosmos SDK architecture. Interoperability is natively supported via the Inter-Blockchain Communication (IBC) protocol. IBC establishes trustless, direct communication channels between the chains' light clients, allowing for secure token transfers and cross-chain contract calls without relying on third-party bridge custodians.`;
  }

  // 3. Polkadot / Substrate Ecosystem
  const isSubstrateA = aId === "dot" || aId === "aura-chain";
  const isSubstrateB = bId === "dot" || bId === "aura-chain";
  if (isSubstrateA && isSubstrateB) {
    return `Both networks operate within the Substrate/Polkadot ecosystem. They utilize shared security from Polkadot's Relay Chain (using BABE and GRANDPA consensus) and communicate natively via the Cross-Consensus Messaging (XCM) format. XCM allows for trustless message passing and asset routing across sovereign parachains without external bridging, protected by the Relay Chain's unified validator set.`;
  }

  // 4. Ethereum Layer-2 Rollups to Ethereum L1
  const isL2A = ["arb", "op", "base", "zksync", "stark", "polyzkevm"].includes(aId);
  const isL2B = ["arb", "op", "base", "zksync", "stark", "polyzkevm"].includes(bId);
  if ((aId === "eth" && isL2B) || (bId === "eth" && isL2A)) {
    const l2Name = aId === "eth" ? bName : aName;
    return `${l2Name} is a Layer-2 rollup network designed to scale Ethereum. It batches execution off-chain and posts transaction data or state roots directly to Ethereum Layer 1, inheriting Ethereum's base Proof of Stake consensus security. Interoperability is supported through native canonical rollup bridges. Rollup finality depends on L1 confirmation: optimistic rollups (like Arbitrum/Optimism) require a 7-day fraud-proof challenge window, while ZK-rollups (like zkSync/Starknet) achieve immediate finality once validity proofs are verified on Ethereum.`;
  }

  // 5. Rollup to Rollup
  if (isL2A && isL2B) {
    return `Both networks are Ethereum Layer-2 rollups. Direct communication is limited by their respective rollup finality rules and separate state machines. Interoperability requires cross-L2 messaging networks (like LayerZero, Hop Protocol, or Across) or third-party liquidity bridges. Bridging assets natively requires routing through the Ethereum L1 parent chain, which incurs high gas fees and latency (especially for optimistic rollups due to the 7-day dispute window).`;
  }

  // 6. EVM to EVM L1
  const isEvmA = ["eth", "matic", "bnb", "celo", "klay", "cro"].includes(aId);
  const isEvmB = ["eth", "matic", "bnb", "celo", "klay", "cro"].includes(bId);
  if (isEvmA && isEvmB) {
    return `Both ${aName} and ${bName} run Ethereum Virtual Machine (EVM) execution environments, sharing address formats (ECDSA key pairs), transaction structures, and smart contract bytecode compatibility. While they operate on independent consensus layers (e.g., Ethereum's PoS, Polygon's PoS, BNB's Parlia, or Celo's/Klaytn's IBFT), bridging is highly standardized. Projects can deploy identical Solidity contracts on both sides and interoperate via cross-chain messaging networks (such as Chainlink CCIP, LayerZero, or Axelar) with low integration overhead.`;
  }

  // 7. Bitcoin to Smart Contract Platform
  if (aId === "btc" || bId === "btc") {
    const smartChain = aId === "btc" ? bName : aName;
    return `Interoperability between Bitcoin and ${smartChain} is highly restricted because Bitcoin lacks Turing-complete smart contracts and operates on a UTXO model under SHA-256 Proof of Work consensus. Trustless token transfers are not natively possible. Users must rely on custodial wrapped tokens (like WBTC) or decentralized bridges that utilize threshold cryptography and collateralized lockups (like tBTC). For simple trading, trustless peer-to-peer atomic swaps can be executed using Hash Time-Locked Contracts (HTLCs) via Bitcoin's native Script language.`;
  }

  // 8. Cross-VM Boundaries
  const vmA = vmCategory(aBc.virtualMachine);
  const vmB = vmCategory(bBc.virtualMachine);
  if (vmA !== vmB && vmA !== "none" && vmB !== "none") {
    return `Interoperability between ${aName} and ${bName} crosses a major Virtual Machine boundary (${aBc.virtualMachine} vs ${bBc.virtualMachine}). They utilize completely different smart contract execution engines, compiler toolchains, and programming languages (e.g., Solidity on EVM, Rust on Solana's Sealevel, or Haskell/Plutus on Cardano). Cross-chain messaging requires specialized translation relays and oracle systems (such as Wormhole or LayerZero) to verify state proofs across different consensus models, presenting significant security and engineering complexity.`;
  }

  // 9. General fallback
  const parts = [];
  if (a.algo === b.algo) parts.push(`Both networks utilize ${a.algo.toUpperCase()} consensus`);
  else if (getFamily(a.algo) === getFamily(b.algo)) parts.push(`Both networks belong to the same ${getFamily(a.algo).replace(/-/g, " ")} consensus family`);
  else parts.push(`They run different consensus families (${getFamily(a.algo)} vs ${getFamily(b.algo)})`);

  if (a.layer !== b.layer) parts.push(`a layer mismatch exists (${a.layer} vs ${b.layer})`);
  
  if (scores.overall >= 80) parts.push("resulting in high native interoperability potential");
  else if (scores.overall >= 50) parts.push("requiring a cross-chain bridge with moderate trust assumptions");
  else parts.push("which necessitates wrapped assets and third-party custodians due to low structural compatibility");

  return parts.join(", ") + ". This requires dedicated messaging relays to synchronize transaction state between their independent histories.";
}

const compatibilities = [];

for (let i = 0; i < chains.length; i++) {
  for (let j = i + 1; j < chains.length; j++) {
    const a = chains[i];
    const b = chains[j];

    const aBc = bcFor(a);
    const bBc = bcFor(b);
    if (!aBc || !bBc) continue;

    const cs = consensusScore(a, b);
    const scs = smartContractScore(aBc, bBc);
    const fs = finalityScore(aBc, bBc);

    const sConsensus = a.algo === b.algo;
    const sFamily = getFamily(a.algo) === getFamily(b.algo);
    const sLayer = a.layer === b.layer;
    const sVM = vmCategory(aBc.virtualMachine) === vmCategory(bBc.virtualMachine);
    const sLang = langFamily(a.lang) === langFamily(b.lang);

    const overall = Math.round(cs * 0.35 + scs * 0.35 + fs * 0.2 + (sLayer ? 10 : 0));

    compatibilities.push({
      chainA: a.id,
      chainB: b.id,
      sameConsensus: sConsensus,
      sameFamily: sFamily,
      sameLayer: sLayer,
      sameVM: sVM,
      sameLanguage: sLang,
      bridgeRequired: needsBridge(a, aBc, b, bBc),
      consensusCompatible: cs >= 80 ? "High" : cs >= 50 ? "Medium" : "Low",
      smartContractCompatible: scs >= 80 ? "High" : scs >= 50 ? "Medium" : scs >= 20 ? "Low" : "None",
      finalityCompatible: fs >= 80 ? "High" : fs >= 50 ? "Medium" : "Low",
      overallCompatibilityScore: overall,
      reason: buildReason(a, b, { overall, cs, scs, fs }, aBc, bBc),
    });
  }
}

export default compatibilities;
