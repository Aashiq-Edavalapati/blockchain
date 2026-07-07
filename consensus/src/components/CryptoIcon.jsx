const SYMBOL_MAP = {
  BTC: "btc", ETH: "eth", ADA: "ada", SOL: "sol", DOT: "dot",
  ATOM: "atom", AVAX: "avax", BNB: "bnb", MATIC: "matic", POL: "matic",
  LTC: "ltc", DOGE: "doge", XMR: "xmr", TRX: "trx", VET: "vet",
  XLM: "xlm", XRP: "xrp", NEO: "neo", XTZ: "xtz", ALGO: "algo",
  NEAR: "near", HBAR: "hbar", FLOW: "flow", EGLD: "egld", CRO: "cro",
  KLAY: "klay", EOS: "eos", ARB: "arb",
};

const FALLBACK_COLORS = {
  SUI: "#4DA2FF", APT: "#00BFA5", BASE: "#0052FF", OP: "#FF0420",
  ZK: "#4C4CFF", STRK: "#F05A2C", ICP: "#3B00B9", CELO: "#35D07F",
  POL: "#8247E5",
};

export default function CryptoIcon({ symbol, size = 20 }) {
  const iconFile = SYMBOL_MAP[symbol];

  if (iconFile) {
    return (
      <span
        style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}
      >
        <img
          src={`/icons/crypto/${iconFile}.svg`}
          alt={symbol}
          style={{ width: size, height: size, objectFit: "contain" }}
          loading="lazy"
        />
      </span>
    );
  }

  const color = FALLBACK_COLORS[symbol] || "var(--text-3)";
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-mono font-semibold"
      style={{
        width: size, height: size, fontSize: Math.max(size * 0.38, 8),
        background: `${color}15`, color,
      }}
    >
      {symbol.slice(0, 2)}
    </span>
  );
}
