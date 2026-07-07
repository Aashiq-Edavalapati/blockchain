import { useState } from "react";
import { Info } from "lucide-react";

export default function InfoTooltip({ text, size = 11 }) {
  const [hovered, setHovered] = useState(false);

  return (
    <span
      className="relative inline-flex items-center justify-center cursor-help shrink-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Info size={size} className="text-white/40 hover:text-white transition-colors" />

      {hovered && (
        <span className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 z-50 p-2.5 text-[10px] leading-relaxed font-semibold text-white bg-[#050505]/95 border border-white/[0.08] rounded-lg shadow-xl w-48 text-left whitespace-normal pointer-events-none block">
          {text}
        </span>
      )}
    </span>
  );
}
