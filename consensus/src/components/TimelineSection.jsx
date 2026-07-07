import { motion } from "framer-motion";
import { Clock, BookOpen, Rocket, Award, FlaskConical } from "lucide-react";
import timeline from "../data/timeline";

const categoryIcons = {
  Foundation: BookOpen,
  Academic: FlaskConical,
  Innovation: Award,
  Launch: Rocket,
};

const categoryColors = {
  Foundation: "#5FD98A",
  Academic: "#8B93FF",
  Innovation: "#F59E0B",
  Launch: "#E84142",
};

export default function TimelineSection() {
  return (
    <div>
      <div className="flex items-center gap-3 mb-3">
        <h3 className="text-base font-semibold tracking-tight">Historical Timeline</h3>
        <span
          className="text-[10px] px-2 py-0.5 rounded font-mono"
          style={{ background: "#8B93FF12", color: "#8B93FF" }}
        >
          {timeline.length} events
        </span>
      </div>
      <p className="text-sm mb-6" style={{ color: "var(--text-2)" }}>
        Key milestones in the evolution of blockchain consensus mechanisms.
      </p>

      <div className="space-y-4">
        {timeline.map((event, i) => {
          const Icon = categoryIcons[event.category] || Clock;
          const catColor = categoryColors[event.category] || "#8B93A7";

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: i * 0.02 }}
            >
              <div
                className="rounded-lg p-4"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: `${catColor}15`, color: catColor }}
                  >
                    <Icon size={15} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-mono text-[10px] font-semibold" style={{ color: catColor }}>
                        {event.date}
                      </span>
                      <span
                        className="text-[9px] px-1.5 py-0.5 rounded font-medium"
                        style={{ background: `${catColor}10`, color: catColor }}
                      >
                        {event.category}
                      </span>
                    </div>
                    <h4 className="text-sm font-semibold">{event.title}</h4>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "var(--text-2)" }}>
                      {event.description}
                    </p>
                    <details className="mt-2">
                      <summary className="text-[10px] font-medium cursor-pointer inline-flex items-center gap-1" style={{ color: catColor }}>
                        Why it matters
                      </summary>
                      <p className="text-xs mt-1.5 leading-relaxed p-3 rounded-lg" style={{ background: "var(--surface-2)", color: "var(--text-2)" }}>
                        {event.importance}
                      </p>
                    </details>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
