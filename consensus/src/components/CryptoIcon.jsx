import { useState } from "react";

const SYMBOL_MAP = {
  BTC: "btc", ETH: "eth", ADA: "ada", SOL: "sol", DOT: "dot",
  ATOM: "atom", AVAX: "avax", BNB: "bnb", MATIC: "matic", POL: "matic",
  LTC: "ltc", DOGE: "doge", XMR: "xmr", TRX: "trx", VET: "vet",
  XLM: "xlm", XRP: "xrp", NEO: "neo", XTZ: "xtz", ALGO: "algo",
  NEAR: "near", HBAR: "hbar", FLOW: "flow", EGLD: "egld", CRO: "cro",
  KLAY: "klay", EOS: "eos", ARB: "arb",
  SUI: "sui", APT: "apt", BASE: "base", OP: "op", ZK: "zk", STRK: "strk",
  CELO: "celo", OSMO: "osmo", ICP: "icp", XCH: "xch", XEM: "xem",
  DCR: "dcr", SLM: "slm", LN: "ln", ZIL: "zilliqa",
  "AVAX-C": "avax", "AVAX-X": "avax", GETH: "eth", AURA: "dot"
};

const FALLBACK_COLORS = {
  SUI: "#4DA2FF", APT: "#00BFA5", BASE: "#0052FF", OP: "#FF0420",
  ZK: "#4C4CFF", STRK: "#F05A2C", ICP: "#3B00B9", CELO: "#35D07F",
  POL: "#8247E5", ZIL: "#496CE9",
};

const NAME_MAP = {
  BTC: "Bitcoin",
  LTC: "Litecoin",
  DOGE: "Dogecoin",
  XMR: "Monero",
  LN: "Lightning Network",
  ETH: "Ethereum",
  ADA: "Cardano",
  DOT: "Polkadot",
  AVAX: "Avalanche",
  MATIC: "Polygon",
  POL: "Polygon",
  ARB: "Arbitrum",
  EOS: "EOS",
  TRX: "TRON",
  BNB: "BNB Chain",
  VET: "VeChain",
  ATOM: "Cosmos Hub",
  XRP: "XRP Ledger",
  SOL: "Solana",
  XLM: "Stellar",
  NEO: "NEO",
  XTZ: "Tezos",
  ALGO: "Algorand",
  NEAR: "NEAR Protocol",
  HBAR: "Hedera Hashgraph",
  FLOW: "Flow",
  EGLD: "MultiversX",
  CRO: "Cronos",
  KLAY: "Klaytn",
  SUI: "Sui",
  APT: "Aptos",
  BASE: "Base",
  OP: "Optimism",
  ZK: "zkSync Era",
  STRK: "Starknet",
  CELO: "Celo",
  OSMO: "Osmosis",
  ICP: "Internet Computer",
  XCH: "Chia Network",
  XEM: "NEM",
  DCR: "Decred",
  SLM: "Slimcoin",
  ZIL: "Zilliqa",
  "AVAX-C": "Avalanche C-Chain",
  "AVAX-X": "Avalanche X-Chain",
  GETH: "Goerli Testnet",
  AURA: "Substrate Solo Chain",
};

export default function CryptoIcon({ symbol, size = 20 }) {
  const [hovered, setHovered] = useState(false);
  const iconFile = SYMBOL_MAP[symbol];
  const fullName = NAME_MAP[symbol] || symbol;

  const renderIcon = () => {
    if (iconFile) {
      return (
        <img
          src={`/icons/crypto/${iconFile}.svg`}
          alt={symbol}
          style={{ width: size, height: size, objectFit: "contain" }}
          loading="lazy"
        />
      );
    }

    const displaySymbol = symbol === "None (no native cryptocurrency)" ? "N/A" : symbol;
    const color = FALLBACK_COLORS[displaySymbol] || "var(--text-3)";
    return (
      <span
        className="inline-flex items-center justify-center rounded-full font-mono font-semibold"
        style={{
          width: size, height: size, fontSize: Math.max(size * 0.38, 8),
          background: `${color}15`, color,
        }}
      >
        {displaySymbol.slice(0, 2)}
      </span>
    );
  };

  return (
    <div
      className="relative inline-flex items-center justify-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
        {renderIcon()}
      </span>

      {/* Tooltip */}
      {hovered && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 px-2 py-1 text-[10px] font-bold text-white bg-[#050505] border border-white/[0.08] rounded-lg shadow-lg whitespace-nowrap pointer-events-none transition-all duration-155">
          {fullName}
        </div>
      )}
    </div>
  );
}
