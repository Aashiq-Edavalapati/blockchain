import { motion } from "framer-motion";
import { Boxes, BookOpen } from "lucide-react";
import IconByName from "./IconByName";

export default function Header({ algorithm }) {
  const stagger = 0.06;

  return (
    <header className="pt-10 pb-8 md:pt-14 md:pb-10">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-4 font-mono text-[11px] tracking-[0.15em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        <BookOpen size={13} />
        Educational Explorer
        <span style={{ color: "var(--border)" }}>·</span>
        {algorithm.family}
      </motion.div>

      <div className="flex items-start gap-5 mb-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
          style={{
            background: `${algorithm.color}18`,
            color: algorithm.color,
            border: `1px solid ${algorithm.color}30`,
          }}
        >
          <IconByName name={algorithm.iconName} size={28} />
        </motion.div>

        <div className="min-w-0">
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight tracking-tight"
          >
            {algorithm.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-lg md:text-xl mt-1"
            style={{ color: "var(--accent)" }}
          >
            {algorithm.tagline}
          </motion.p>
        </div>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.18 }}
        className="max-w-3xl text-sm md:text-base leading-relaxed"
        style={{ color: "var(--muted)" }}
      >
        {algorithm.overview || algorithm.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="flex flex-wrap gap-3 mt-6"
      >
        <StatBadge label="Introduced" value={algorithm.introducedYear} />
        <StatBadge label="Finality" value={algorithm.finalityType?.split(" ")[0] || "—"} />
        <StatBadge label="Type" value={algorithm.permissionType} />
      </motion.div>
    </header>
  );
}

function StatBadge({ label, value }) {
  return (
    <div
      className="rounded-xl px-3.5 py-2 text-xs"
      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
    >
      <span className="block text-[10px] uppercase tracking-wider" style={{ color: "var(--muted)" }}>
        {label}
      </span>
      <span className="font-medium mt-0.5 block">{value}</span>
    </div>
  );
}
