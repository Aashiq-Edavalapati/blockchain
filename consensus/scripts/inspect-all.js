import algorithms from "../src/data/algorithms/index.js";
import blockchains from "../src/data/blockchains/index.js";

console.log("Total Algorithms:", algorithms.length);
console.log("Total Blockchains:", blockchains.length);

const results = [];

for (const algo of algorithms) {
  const missingFields = [];
  const requiredFields = [
    "id", "name", "shortName", "iconName", "color", "tagline", "pulseDuration",
    "strength", "tradeoff", "family", "inventor", "introducedYear",
    "description", "overview", "history", "problemSolved", "coreMechanism",
    "stepByStepExplanation", "advantages", "disadvantages", "bestUseCases",
    "limitations", "securityExplanation", "scalabilityExplanation",
    "decentralizationExplanation", "energyConsumption", "validatorType",
    "permissionType", "leaderElection", "forkBehavior", "finalityType",
    "blockProductionMethod", "commonAttacks", "attackResistance",
    "typicalTPS", "typicalBlockTime", "hardwareRequirements",
    "realWorldExamples", "compatibleConsensus", "references",
    "officialDocumentation", "whitepaper", "score"
  ];

  for (const field of requiredFields) {
    if (algo[field] === undefined || algo[field] === null || algo[field] === "" || (Array.isArray(algo[field]) && algo[field].length === 0)) {
      // some fields can be null like variantOf or whitepaper, let's list those if they are missing but required
      missingFields.push(field);
    }
  }

  // Check score fields
  const scoreFields = ["security", "scalability", "decentralization", "energyEfficiency"];
  const missingScores = [];
  if (algo.score) {
    for (const sf of scoreFields) {
      if (algo.score[sf] === undefined || algo.score[sf] === null) {
        missingScores.push(sf);
      }
    }
  } else {
    missingScores.push("score object missing");
  }

  // Find blockchains that match this algorithm
  const matchedBlockchains = blockchains.filter(bc => {
    // exact or substring matching on consensusAlgorithm
    return bc.consensusAlgorithm.toLowerCase().includes(algo.name.toLowerCase()) || 
           bc.consensusAlgorithm.toLowerCase().includes(algo.shortName.toLowerCase()) ||
           algo.realWorldExamples.some(ex => bc.name.toLowerCase().includes(ex.toLowerCase()) || bc.symbol.toLowerCase() === ex.toLowerCase());
  }).map(bc => `${bc.name} (${bc.symbol})`);

  results.push({
    id: algo.id,
    name: algo.name,
    realWorldExamples: algo.realWorldExamples,
    matchedBlockchainsInDb: matchedBlockchains,
    missingFields,
    missingScores
  });
}

console.log(JSON.stringify(results, null, 2));
