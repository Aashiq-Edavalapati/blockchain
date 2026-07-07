/* Custom geometric icons representing each consensus algorithm's core concept */

function HexMine({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" fill={`${color}18`} />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  );
}

function StakeVault({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="2" fill={`${color}18`} />
      <circle cx="12" cy="14" r="3" fill={color} />
      <path d="M8 7V5a4 4 0 0 1 8 0v2" />
    </svg>
  );
}

function VoteCheck({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill={`${color}18`} />
      <path d="M8 12l3 3 5-5" />
    </svg>
  );
}

function Handshake({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12a8 8 0 1 1-16 0 8 8 0 0 1 16 0z" fill={`${color}12`} />
      <path d="M8 9h3l1.5 3L14 9h2" />
      <path d="M16 15h-2l-1.5-3L11 15H9" />
    </svg>
  );
}

function ClockTime({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill={`${color}12`} />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function PBFTIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="12" r="3" fill={`${color}18`} />
      <circle cx="12" cy="6" r="3" fill={`${color}18`} />
      <circle cx="12" cy="18" r="3" fill={`${color}18`} />
      <circle cx="18" cy="12" r="3" fill={`${color}18`} />
      <path d="M9 12l2 2 4-4" strokeWidth="1" />
    </svg>
  );
}

function LeaderElect({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill={`${color}12`} />
      <path d="M12 6v2M12 16v2" />
      <path d="M8 12h8" />
      <path d="M12 2l2 2-2 2-2-2 2-2zM12 18l2 2-2 2-2-2 2-2zM6 12l2-2 2 2-2 2-2-2zM14 12l2-2 2 2-2 2-2-2z" />
    </svg>
  );
}

function SnowIcon({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" fill={`${color}12`} />
      <path d="M12 4v16M4 12h16" />
      <path d="M7.8 7.8l8.4 8.4M7.8 16.2l8.4-8.4" />
    </svg>
  );
}

function Ouroboros({ color }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a10 10 0 0 1 10 10" fill={`${color}12`} />
      <path d="M12 22a10 10 0 0 1-10-10" />
      <path d="M12 2a10 10 0 0 0-10 10" />
      <path d="M22 12a10 10 0 0 1-10 10" />
      <circle cx="12" cy="12" r="3" fill={color} />
    </svg>
  );
}

const ICONS = {
  pow: HexMine,
  pos: StakeVault,
  dpos: VoteCheck,
  poa: VoteCheck,
  pbft: PBFTIcon,
  dbft: PBFTIcon,
  fba: Handshake,
  poh: ClockTime,
  avalanche: SnowIcon,
  snowman: SnowIcon,
  snowball: SnowIcon,
  tendermint: Handshake,
  proofOfCapacity: HexMine,
  proofOfBurn: HexMine,
  proofOfElapsedTime: ClockTime,
  proofOfImportance: StakeVault,
  proofOfActivity: HexMine,
  raft: LeaderElect,
  ibft: PBFTIcon,
  clique: LeaderElect,
  aura: LeaderElect,
  parlia: LeaderElect,
  hotstuff: LeaderElect,
  ouroboros: Ouroboros,
  npos: VoteCheck,
  bpos: VoteCheck,
};

export default function ConsensusIcon({ id, color = "var(--accent)", size = 24 }) {
  const Icon = ICONS[id];
  if (!Icon) return null;
  return <span style={{ width: size, height: size, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
    <Icon color={color} />
  </span>;
}
