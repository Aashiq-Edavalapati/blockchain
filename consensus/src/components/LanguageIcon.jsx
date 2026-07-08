import { Code } from "lucide-react";

const SKILL_ICONS_MAP = {
  rust: "rust",
  go: "go",
  golang: "go",
  cpp: "cpp",
  "c++": "cpp",
  solidity: "solidity",
  vyper: "solidity",
  haskell: "haskell",
  plutus: "haskell",
  python: "py",
  javascript: "js",
  typescript: "ts",
  java: "java",
};

// Parses complex descriptive language strings into normalized identifiers & display names
export function extractLanguages(langStr) {
  if (!langStr) return [];
  // Split on both comma and semicolon to separate multiple entries
  const rawParts = langStr.split(/[,;]/);
  const result = [];

  for (const part of rawParts) {
    const lower = part.toLowerCase().trim();
    let matched = null;

    if (lower.includes("solidity")) matched = { id: "solidity", name: "Solidity" };
    else if (lower.includes("vyper")) matched = { id: "solidity", name: "Vyper" };
    else if (lower.includes("rust")) matched = { id: "rust", name: "Rust" };
    else if (lower.includes("golang") || lower.includes("go ")) matched = { id: "go", name: "Go" };
    else if (lower.includes("c++") || lower.includes("cpp")) matched = { id: "cpp", name: "C++" };
    else if (lower.includes("bitcoin script")) matched = { id: "cpp", name: "Bitcoin Script" };
    else if (lower.includes("haskell") || lower.includes("plutus")) matched = { id: "haskell", name: "Haskell" };
    else if (lower.includes("move")) matched = { id: "rust", name: "Move" };
    else if (lower.includes("assemblyscript") || lower.includes("typescript")) matched = { id: "ts", name: "TypeScript" };
    else if (lower.includes("javascript") || lower.includes("js")) matched = { id: "js", name: "JavaScript" };
    else if (lower.includes("typescript")) matched = { id: "ts", name: "TypeScript" };
    else if (lower.includes("java")) matched = { id: "java", name: "Java" };
    else if (lower.includes("python")) matched = { id: "python", name: "Python" };
    else if (lower.includes("cairo")) matched = { id: "py", name: "Cairo" };
    else if (lower.includes("c-like") || lower.includes("hooks")) matched = { id: "cpp", name: "C" };
    
    if (matched) {
      if (!result.some(r => r.name === matched.name)) {
        result.push(matched);
      }
    }
  }

  // Fallback for custom entries that do not map to known logos
  if (result.length === 0 && langStr.trim()) {
    const short = langStr.split("(")[0].trim();
    result.push({ id: null, name: short.length > 22 ? short.slice(0, 20) + "…" : short });
  }

  return result;
}

export default function LanguageIcon({ name, size = 14 }) {
  const normName = name.toLowerCase().trim();
  const iconId = SKILL_ICONS_MAP[normName];

  if (iconId) {
    return (
      <span
        style={{
          width: size,
          height: size,
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0
        }}
      >
        <img
          src={`https://skillicons.dev/icons?i=${iconId}`}
          alt={name}
          style={{ width: size, height: size, objectFit: "contain" }}
          loading="lazy"
        />
      </span>
    );
  }

  return <Code size={size} />;
}
