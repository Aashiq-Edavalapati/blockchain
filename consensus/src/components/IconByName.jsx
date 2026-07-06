import {
  Cpu, Coins, Vote, ShieldCheck, Users, Timer,
  Gauge, Network,
} from "lucide-react";

const iconMap = {
  Cpu, Coins, Vote, ShieldCheck, Users, Timer,
  Gauge, Network,
};

export default function IconByName({ name, size, className, style }) {
  const Icon = iconMap[name] || ShieldCheck;
  return <Icon size={size} className={className} style={style} />;
}
