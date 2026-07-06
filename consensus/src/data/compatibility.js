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
  const parts = [];
  if (a.algo === b.algo) parts.push(`Both use ${a.algo.toUpperCase()} consensus`);
  else if (getFamily(a.algo) === getFamily(b.algo)) parts.push(`Same ${getFamily(a.algo).replace(/-/g, " ")} family`);
  else parts.push(`Different consensus families (${getFamily(a.algo)} vs ${getFamily(b.algo)})`);

  const aVm = vmCategory(aBc.virtualMachine);
  const bVm = vmCategory(bBc.virtualMachine);
  if (aVm === bVm && aVm !== "none") parts.push(`shared ${aVm.toUpperCase()} VM`);
  else if (aVm !== "none" && bVm !== "none") parts.push(`different VMs (${aVm} vs ${bVm})`);

  if (a.layer !== b.layer) parts.push(`${a.layer}/${b.layer} layer mismatch`);

  if (scores.overall >= 80) parts.push("high interoperability potential");
  else if (scores.overall >= 50) parts.push("moderate interoperability via bridge");
  else parts.push("low interoperability, bridge with significant overhead required");

  return parts.join("; ") + ".";
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
