export default function HowItWorks({ algorithm }) {
  return (
    <div>
      <div
        className="rounded-xl p-6 mb-6"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <h3 className="text-base font-semibold tracking-tight mb-2">
          How <span style={{ color: algorithm.color }}>{algorithm.shortName}</span> Works
        </h3>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
          {algorithm.coreMechanism}
        </p>
      </div>

      {/* Blockchain-style step blocks */}
      <div className="space-y-0">
        {algorithm.stepByStepExplanation.map((step, i) => (
          <div key={i} className="flex flex-col items-center">
            {/* Step block */}
            <div
              className="rounded-xl p-5 w-full relative"
              style={{
                background: `linear-gradient(135deg, ${algorithm.color}06, var(--surface))`,
                border: `1px solid ${algorithm.color}25`,
                borderLeft: `3px solid ${algorithm.color}`,
              }}
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-mono text-xs font-bold shrink-0"
                  style={{
                    background: `${algorithm.color}15`,
                    color: algorithm.color,
                  }}
                >
                  #{i + 1}
                </div>
                <div className="min-w-0 pt-1">
                  <p className="text-xs font-mono mb-1" style={{ color: algorithm.color }}>
                    STEP_{String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
                    {step}
                  </p>
                </div>
              </div>
            </div>

            {/* Connector arrow to next step */}
            {i < algorithm.stepByStepExplanation.length - 1 && (
              <div className="flex flex-col items-center py-2" style={{ color: `${algorithm.color}44` }}>
                <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                  <path d="M8 0v16M2 10l6 6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
