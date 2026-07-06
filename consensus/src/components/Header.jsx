import { motion } from "framer-motion";
import { Boxes } from "lucide-react";

export default function Header() {
  return (
    <header className="px-6 md:px-10 pt-14 pb-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-4 font-mono text-xs tracking-[0.2em] uppercase"
        style={{ color: "var(--muted)" }}
      >
        <Boxes size={14} />
        Protocol Comparison · Six Consensus Families · Eighteen Chains
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.05 }}
        className="font-display text-3xl md:text-5xl font-semibold leading-tight max-w-3xl"
      >
        Consensus Algorithms in Blockchain
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="font-display text-lg md:text-xl mt-1"
        style={{ color: "var(--accent)" }}
      >
        A Comparative Explorer
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mt-4 max-w-2xl text-sm md:text-base"
        style={{ color: "var(--muted)" }}
      >
        Every chain trades off the same three pillars — Scalability, Security and Decentralization — the{" "}
        <span style={{ color: "var(--text)" }}>blockchain trilemma</span>. Pick a consensus family below to see
        how it works, who runs it, and how it stacks up.
      </motion.p>
    </header>
  );
}
