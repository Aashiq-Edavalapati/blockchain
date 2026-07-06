import algorithms from "./algorithms/index.js";
import families from "./families.js";

function algorithmToFamily() {
  const map = {};
  for (const f of families) {
    for (const ex of f.examples) {
      const name = ex.name.toLowerCase();
      for (const algo of algorithms) {
        const an = algo.name.toLowerCase();
        const sn = algo.shortName ? algo.shortName.toLowerCase().replace(/[^a-z0-9]/g, "") : "";
        if (name.includes(an) || an.includes(name) || (sn && name.replace(/[^a-z0-9]/g, "").includes(sn))) {
          if (!map[algo.id]) map[algo.id] = f.id;
        }
      }
    }
  }
  return map;
}

const ALGO_FAMILY = algorithmToFamily();

function familyLabel(fid) {
  for (const f of families) {
    if (f.id === fid) return f.name;
  }
  return fid;
}

function parseTps(tpsStr) {
  const digits = (tpsStr || "").replace(/[^0-9]/g, "");
  return parseInt(digits) || 0;
}

function extractEnergyLevel(enStr) {
  const s = (enStr || "").toLowerCase();
  if (s.startsWith("very high")) return 5;
  if (s.startsWith("high")) return 4;
  if (s.startsWith("moderate")) return 3;
  if (s.startsWith("low")) return 2;
  if (s.startsWith("very low") || s.startsWith("negligible")) return 1;
  return 3;
}

function extractEnergyLabel(enStr) {
  const s = (enStr || "")[0].toUpperCase() + (enStr || "").slice(1).split(/[~(]/)[0].trim();
  return s;
}

const comparisons = [];

for (let i = 0; i < algorithms.length; i++) {
  for (let j = i + 1; j < algorithms.length; j++) {
    const a = algorithms[i];
    const b = algorithms[j];

    const aFam = ALGO_FAMILY[a.id] || a.family || "other";
    const bFam = ALGO_FAMILY[b.id] || b.family || "other";
    const sameFam = aFam === bFam;

    const aTps = parseTps(a.typicalTPS);
    const bTps = parseTps(b.typicalTPS);

    const sharedProps = sameFam
      ? `Both belong to the ${familyLabel(aFam)} family; finality types: ${a.finalityType} / ${b.finalityType}`
      : `Different families (${familyLabel(aFam)} vs ${familyLabel(bFam)}); both use ${a.permissionType === b.permissionType ? a.permissionType : "different permission"} model`;

    const majorDiffs =
      `Family: ${familyLabel(aFam)} vs ${familyLabel(bFam)}; ` +
      `Finality: ${a.finalityType} vs ${b.finalityType}; ` +
      `Leader election: ${(a.leaderElection || "").split(";")[0].trim()} vs ${(b.leaderElection || "").split(";")[0].trim()}; ` +
      `Permission model: ${a.permissionType} vs ${b.permissionType}`;

    const fastest = aTps >= bTps ? a : b;
    const slowest = aTps >= bTps ? b : a;
    const ratio = bTps > 0 && aTps > 0
      ? (Math.max(aTps, bTps) / Math.max(1, Math.min(aTps, bTps))).toFixed(1)
      : "N/A";
    const perfCompare = aTps > 0 && bTps > 0
      ? `${fastest.name} is ~${ratio}x faster than ${slowest.name} (${a.typicalTPS} vs ${b.typicalTPS})`
      : `TPS comparison unavailable (${a.typicalTPS} vs ${b.typicalTPS})`;

    const secDiff = a.score.security - b.score.security;
    const secCompare = Math.abs(secDiff) <= 5
      ? `Comparable security (${a.name}: ${a.score.security}, ${b.name}: ${b.score.security})`
      : `${secDiff > 0 ? a.name : b.name} (${secDiff > 0 ? a.score.security : b.score.security}) offers stronger security than ${secDiff > 0 ? b.name : a.name} (${secDiff > 0 ? b.score.security : a.score.security})`;

    const aEn = extractEnergyLevel(a.energyConsumption);
    const bEn = extractEnergyLevel(b.energyConsumption);
    const enCompare = aEn === bEn
      ? `Similar energy consumption (both ${extractEnergyLabel(a.energyConsumption)})`
      : `${aEn < bEn ? a.name : b.name} consumes significantly less energy than ${aEn < bEn ? b.name : a.name}`;

    const migDifficulty = (() => {
      if (sameFam && a.permissionType === b.permissionType) return "Medium — same consensus family simplifies protocol migration";
      if (sameFam) return "Difficult — similar family but different permission models";
      if (aFam === "cft" || bFam === "cft") return "Very difficult — CFT lacks Byzantine tolerance of BFT mechanisms";
      return "Very difficult — different consensus families require fundamental architectural changes";
    })();

    comparisons.push({
      algorithmA: a.id,
      algorithmB: b.id,
      sharedProperties: sharedProps,
      majorDifferences: majorDiffs,
      commonUseCases: `"${a.bestUseCases}" vs "${b.bestUseCases}"`,
      migrationDifficulty: migDifficulty,
      performanceComparison: perfCompare,
      securityComparison: secCompare,
      energyComparison: enCompare,
    });
  }
}

export default comparisons;
