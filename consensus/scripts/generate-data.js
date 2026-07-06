/**
 * Data generation build step.
 *
 * Reads primary sources (blockchains, algorithms, families)
 * and produces derived datasets (search index, statistics, filters)
 * into src/data/generated/.
 *
 * Run:  node scripts/generate-data.js
 *       or  npm run generate
 */

import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "src/data/generated");

// ---------------------------------------------------------------------------
// Import primary sources
// ---------------------------------------------------------------------------

const blockchains = (await import(resolve(ROOT, "src/data/blockchains/index.js"))).default;
const algorithms = (await import(resolve(ROOT, "src/data/algorithms/index.js"))).default;
const families = (await import(resolve(ROOT, "src/data/families.js"))).default;
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const HEADER = "// AUTO-GENERATED — Do not edit. Run `npm run generate` to rebuild.\n\n";

function write(name, code) {
  writeFileSync(resolve(OUT, name), HEADER + code, "utf-8");
  console.log(`  ✓  generated/${name}`);
}

// ---------------------------------------------------------------------------
// 1. searchIndex — flatten every blockchain into a searchable record
// ---------------------------------------------------------------------------

const searchIndex = blockchains.map((bc) => ({
  id: bc.id,
  name: bc.name,
  symbol: bc.symbol,
  consensus: bc.consensusAlgorithm,
  layer: bc.layer,
  family: families
    .filter((f) => f.examples.some((e) => bc.consensusAlgorithm.toLowerCase().includes(e.name.toLowerCase().split("(")[0].trim())))
    .map((f) => f.id)[0] || "other",
  vm: bc.virtualMachine,
  languages: bc.smartContractLanguages,
  launchYear: bc.launchYear,
  tps: bc.TPS,
  blockTime: bc.blockTime,
  finality: bc.finality,
  supportsSmartContracts: bc.supportsSmartContracts,
  evmCompatible: bc.evmCompatible,
  permissioned: bc.permissioned,
  energy: bc.energyConsumption,
  tokenStandard: bc.tokenStandard,
  website: bc.website,
  explorer: bc.explorer,
  whitepaper: bc.whitepaper,
}));

write("searchIndex.js", `const searchIndex = ${JSON.stringify(searchIndex, null, 2)};\n\nexport default searchIndex;`);

// ---------------------------------------------------------------------------
// 2. statistics — aggregate metrics across all blockchains
// ---------------------------------------------------------------------------

const byLayer = {};
const byConsensus = {};
const byVm = {};
const byYear = {};

for (const bc of blockchains) {
  byLayer[bc.layer] = (byLayer[bc.layer] || 0) + 1;
  byConsensus[bc.consensusAlgorithm] = (byConsensus[bc.consensusAlgorithm] || 0) + 1;
  byYear[bc.launchYear] = (byYear[bc.launchYear] || 0) + 1;

  const vm = bc.virtualMachine || "";
  if (vm.toLowerCase().includes("evm")) byVm["EVM"] = (byVm["EVM"] || 0) + 1;
  else if (vm.toLowerCase().includes("wasm")) byVm["WASM"] = (byVm["WASM"] || 0) + 1;
  else if (vm.toLowerCase().includes("bitcoin script")) byVm["Bitcoin Script"] = (byVm["Bitcoin Script"] || 0) + 1;
  else byVm["Other"] = (byVm["Other"] || 0) + 1;
}

const algorithmStats = algorithms.map((algo) => ({
  id: algo.id,
  name: algo.name,
  shortName: algo.shortName,
  security: algo.score.security,
  scalability: algo.score.scalability,
  decentralization: algo.score.decentralization,
  energyEfficiency: algo.score.energyEfficiency,
  avgScore: Math.round((algo.score.security + algo.score.scalability + algo.score.decentralization + algo.score.energyEfficiency) / 4),
  chainsUsing: blockchains.filter((bc) => bc.consensusAlgorithm.toLowerCase().includes(algo.name.toLowerCase().split(" ")[0].toLowerCase())).length,
}));

const statistics = {
  totalBlockchains: blockchains.length,
  totalAlgorithms: algorithms.length,
  totalFamilies: families.length,
  byLayer,
  byConsensus: Object.fromEntries(Object.entries(byConsensus).sort((a, b) => b[1] - a[1])),
  byVm: Object.fromEntries(Object.entries(byVm).sort((a, b) => b[1] - a[1])),
  byLaunchYear: Object.fromEntries(Object.entries(byYear).sort((a, b) => a[0] - b[0])),
  algorithmRankings: algorithmStats.sort((a, b) => b.avgScore - a.avgScore),
  permissionedCount: blockchains.filter((bc) => bc.permissioned).length,
  permissionlessCount: blockchains.filter((bc) => !bc.permissioned).length,
  smartContractCount: blockchains.filter((bc) => bc.supportsSmartContracts).length,
  evmCompatibleCount: blockchains.filter((bc) => bc.evmCompatible).length,
};

write("statistics.js", `const statistics = ${JSON.stringify(statistics, null, 2)};\n\nexport default statistics;`);

// ---------------------------------------------------------------------------
// 3. filters — dynamically-built filter options for the UI
// ---------------------------------------------------------------------------

const filters = {
  layers: [...new Set(blockchains.map((bc) => bc.layer))].sort(),
  consensusAlgorithms: [...new Set(blockchains.map((bc) => bc.consensusAlgorithm))].sort(),
  families: families.map((f) => ({ id: f.id, name: f.name })),
  vmTypes: [...new Set(blockchains.map((bc) => {
    const v = bc.virtualMachine || "";
    if (v.toLowerCase().includes("evm")) return "EVM";
    if (v.toLowerCase().includes("wasm")) return "WASM";
    if (v.toLowerCase().includes("bitcoin script")) return "Bitcoin Script";
    return "Other";
  }))].sort(),
  languages: [...new Set(blockchains.flatMap((bc) => (bc.smartContractLanguages || "").split(",").map((l) => l.trim())))].filter(Boolean).sort(),
  hasSmartContracts: ["All", "Yes", "No"],
  isEvmCompatible: ["All", "Yes", "No"],
  permissioned: ["All", "Permissionless", "Permissioned"],
  launchYears: [...new Set(blockchains.map((bc) => bc.launchYear))].sort((a, b) => b - a),
};

write("filters.js", `const filters = ${JSON.stringify(filters, null, 2)};\n\nexport default filters;`);

console.log(`\nDone — generated ${searchIndex.length} search records, ${algorithmStats.length} algorithm rankings, ${filters.layers.length} layers, ${filters.consensusAlgorithms.length} consensus types.`);
