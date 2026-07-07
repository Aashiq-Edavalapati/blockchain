import ConsensusIcon from "./ConsensusIcon";

const PILLAR_ICONS = {
  Gauge: (props) => {
    const { size, ...rest } = props;
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4M12 16h.01" />
        <path d="M7.8 9.2a6 6 0 0 0 8.4 0" />
      </svg>
    );
  },
  ShieldCheck: (props) => {
    const { size, ...rest } = props;
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>
        <path d="M12 2l7 4v5c0 5-3.5 9.7-7 11-3.5-1.3-7-6-7-11V6l7-4z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    );
  },
  Network: (props) => {
    const { size, ...rest } = props;
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...rest}>
        <circle cx="12" cy="4" r="2.5" />
        <circle cx="5" cy="18" r="2.5" />
        <circle cx="19" cy="18" r="2.5" />
        <path d="M12 6.5v3a4 4 0 0 1-4 4H5M12 6.5v3a4 4 0 0 0 4 4h3" />
      </svg>
    );
  },
};

export default function IconByName({ name, size = 16, ...rest }) {
  const PillarIcon = PILLAR_ICONS[name];
  if (PillarIcon) {
    return <PillarIcon size={size} {...rest} />;
  }
  return <ConsensusIcon id={name} size={size} color="currentColor" {...rest} />;
}
