import blockchains from "./blockchains/index.js";

const chainMapping = [
  { id: "btc", srcId: "bitcoin", algo: "pow" },
  { id: "ltc", srcId: "litecoin", algo: "pow" },
  { id: "doge", srcId: "dogecoin", algo: "pow" },
  { id: "xmr", srcId: "monero", algo: "pow" },
  { id: "ln", name: "Lightning Network", symbol: "LN", algo: "pow", layer: "L2", lang: "No independent consensus — payment channels over Bitcoin", why: "Moves everyday transfers off-chain into payment channels, settling back to Bitcoin's PoW chain for final security." },
  { id: "eth", srcId: "ethereum", algo: "pos" },
  { id: "ada", srcId: "cardano", algo: "pos" },
  { id: "dot", srcId: "polkadot", algo: "pos" },
  { id: "avax", srcId: "avalanche", algo: "pos" },
  { id: "matic", srcId: "polygon", algo: "pos" },
  { id: "arb", srcId: "arbitrum", algo: "pos" },
  { id: "eos", srcId: "eos", algo: "dpos" },
  { id: "trx", srcId: "tron", algo: "dpos" },
  { id: "bnb", srcId: "bnbChain", algo: "poa" },
  { id: "vet", srcId: "vechain", algo: "poa" },
  { id: "atom", srcId: "cosmos", algo: "tendermint" },
  { id: "xrp", srcId: "xrpl", algo: "fba" },
  { id: "sol", srcId: "solana", algo: "poh" },
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
      };
    }
  }
  return entry;
});

export default chains;
