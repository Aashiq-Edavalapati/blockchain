import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <div ref={ref}>
      <div className="flex items-center gap-3 mb-4">
        <h3 className="section-heading">Historical Timeline</h3>
        <span
          className="text-xs px-2.5 py-0.5 rounded-full font-mono"
          style={{ background: "rgba(139, 147, 255, 0.15)", color: "#8B93FF" }}
        >
          {timeline.length} events
        </span>
      </div>
      <p className="section-sub mb-8">
        Key milestones in the evolution of blockchain consensus mechanisms.
      </p>

      {/* Progress bar */}
      <div
        className="h-1 rounded-full mb-8 overflow-hidden"
        style={{ background: "rgba(255,255,255,0.06)" }}
      >
        <motion.div
          className="h-full rounded-full"
          style={{ background: "#8B93FF", scaleX, transformOrigin: "left" }}
        />
      </div>

      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-px hidden md:block" style={{ background: "rgba(255,255,255,0.08)" }} />

        <div className="space-y-8">
          {timeline.map((event, i) => {
            const Icon = categoryIcons[event.category] || Clock;
            const catColor = categoryColors[event.category] || "#8B93A7";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="relative pl-0 md:pl-12"
              >
                {/* Dot */}
                <div
                  className="hidden md:flex absolute left-[12px] top-1 w-[15px] h-[15px] rounded-full items-center justify-center"
                  style={{ background: catColor }}
                >
                  <div className="w-[7px] h-[7px] rounded-full" style={{ background: "#0A0D13" }} />
                </div>

                <div
                  className="card-glass p-5 md:p-6"
                  style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.12)" }}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: `${catColor}18`, color: catColor }}
                    >
                      <Icon size={16} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span
                          className="font-mono text-[11px] font-semibold"
                          style={{ color: catColor }}
                        >
                          {event.date}
                        </span>
                        <span
                          className="text-[10px] px-1.5 py-0.5 rounded font-medium"
                          style={{
                            background: `${catColor}12`,
                            color: catColor,
                          }}
                        >
                          {event.category}
                        </span>
                      </div>
                      <h4 className="font-display text-base font-semibold">{event.title}</h4>
                      <p className="text-sm mt-1.5 leading-relaxed" style={{ color: "var(--muted)" }}>
                        {event.description}
                      </p>
                      <details className="mt-2 group">
                        <summary
                          className="text-[11px] font-medium cursor-pointer inline-flex items-center gap-1"
                          style={{ color: catColor }}
                        >
                          Why it matters
                        </summary>
                        <p
                          className="text-xs mt-1.5 leading-relaxed p-3 rounded-lg"
                          style={{ background: "rgba(255,255,255,0.03)", color: "var(--muted)" }}
                        >
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
    </div>
  );
}
