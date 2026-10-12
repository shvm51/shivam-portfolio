/**
 * Custom illustrative SVG mockups — clearly illustrative, replaceable with
 * real screenshots later. Rendered as decoration (aria-hidden) with a caption.
 */

export function GeospatialVisual() {
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label="Illustrative geospatial dashboard mockup" className="h-auto w-full">
      <rect width="800" height="500" fill="#1e1d1a" />
      {/* map grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <line key={`v${i}`} x1={60 + i * 80} y1="30" x2={60 + i * 80} y2="470" stroke="#f4f1ea" strokeOpacity="0.08" />
      ))}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={`h${i}`} x1="30" y1={40 + i * 66} x2="590" y2={40 + i * 66} stroke="#f4f1ea" strokeOpacity="0.08" />
      ))}
      {/* road polylines */}
      <path d="M40 380 C 200 340, 300 420, 430 360 S 560 300, 590 340" stroke="#f4f1ea" strokeOpacity="0.25" fill="none" strokeWidth="2" />
      <path d="M120 40 C 160 200, 100 320, 220 460" stroke="#f4f1ea" strokeOpacity="0.18" fill="none" strokeWidth="2" />
      <path d="M380 30 C 400 180, 340 300, 480 470" stroke="#f4f1ea" strokeOpacity="0.18" fill="none" strokeWidth="2" />
      {/* heat blobs */}
      <circle cx="240" cy="200" r="52" fill="#ff4d00" opacity="0.28" />
      <circle cx="240" cy="200" r="26" fill="#ff4d00" opacity="0.45" />
      <circle cx="430" cy="330" r="38" fill="#ff4d00" opacity="0.2" />
      <circle cx="150" cy="360" r="24" fill="#ff4d00" opacity="0.3" />
      {/* report pins */}
      {[[240,200],[430,330],[150,360],[350,150],[500,220]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="5" fill="#ff4d00" />
          <circle cx={x} cy={y} r="10" fill="none" stroke="#ff4d00" opacity="0.6" />
        </g>
      ))}
      {/* side panel */}
      <rect x="610" y="30" width="160" height="440" fill="#141311" />
      <text x="630" y="64" fill="#f4f1ea" fontSize="13" fontFamily="monospace" letterSpacing="2">PRIORITY QUEUE</text>
      {[
        ["P-01 · Water main leak", "#ff4d00", 0.95],
        ["P-02 · Road subsidence", "#ff4d00", 0.82],
        ["P-03 · Streetlight outage", "#8e8b82", 0.45],
        ["P-04 · Drain blockage", "#8e8b82", 0.3],
      ].map(([label, color, wgt], i) => (
        <g key={label as string}>
          <rect x="630" y={92 + i * 84} width="120" height="64" fill="#1e1d1a" stroke="#f4f1ea" strokeOpacity="0.15" />
          <circle cx="644" cy={112 + i * 84} r="5" fill={color as string} />
          <text x="656" y={116 + i * 84} fill="#f4f1ea" fontSize="11" fontFamily="monospace">{label}</text>
          <rect x="630" y={128 + i * 84} width="120" height="5" fill="#f4f1ea" opacity="0.12" />
          <rect x="630" y={128 + i * 84} width={120 * (wgt as number)} height="5" fill={color as string} />
        </g>
      ))}
      <text x="40" y="480" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">ILLUSTRATIVE MOCKUP — REPLACE WITH REAL SCREENSHOTS</text>
    </svg>
  );
}

export function MedicalVisual() {
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label="Illustrative medical data dashboard mockup" className="h-auto w-full">
      <rect width="800" height="500" fill="#1e1d1a" />
      {/* risk cards */}
      {[
        ["RISK SCORE", "0.72", "#ff4d00"],
        ["CONFIDENCE", "±0.08", "#f4f1ea"],
        ["SIGNALS", "6 active", "#f4f1ea"],
      ].map(([k, v, c], i) => (
        <g key={k as string}>
          <rect x={40 + i * 180} y="40" width="160" height="110" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
          <text x={60 + i * 180} y="72" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">{k}</text>
          <text x={60 + i * 180} y="120" fill={c as string} fontSize="34" fontFamily="sans-serif" fontWeight="bold">{v}</text>
        </g>
      ))}
      {/* trend line */}
      <rect x="40" y="180" width="720" height="220" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
      <text x="60" y="212" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">RISK TREND — 12 MONTHS</text>
      {Array.from({ length: 6 }).map((_, i) => (
        <line key={i} x1="60" y1={240 + i * 24} x2="740" y2={240 + i * 24} stroke="#f4f1ea" strokeOpacity="0.06" />
      ))}
      <path d="M60 340 C 140 330, 180 300, 260 305 S 380 260, 460 250 S 600 210, 740 190"
        fill="none" stroke="#ff4d00" strokeWidth="3" />
      <path d="M60 340 C 140 330, 180 300, 260 305 S 380 260, 460 250 S 600 210, 740 190 L740 380 L60 380 Z"
        fill="#ff4d00" opacity="0.08" />
      {/* threshold */}
      <line x1="60" y1="250" x2="740" y2="250" stroke="#f4f1ea" strokeDasharray="6 6" opacity="0.4" />
      <text x="700" y="242" fill="#8e8b82" fontSize="10" fontFamily="monospace">REVIEW THRESHOLD</text>
      {/* factor note */}
      <text x="40" y="452" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">TOP FACTORS: HbA1c trend · BP variance · lipid panel · activity drop</text>
      <text x="40" y="478" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">DECISION SUPPORT ONLY — NO DIAGNOSTIC CLAIMS</text>
    </svg>
  );
}

export function SecurityVisual() {
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label="Illustrative threat network graph mockup" className="h-auto w-full">
      <rect width="800" height="500" fill="#1e1d1a" />
      {/* edges */}
      {[
        [400,240,220,150],[400,240,580,150],[400,240,200,360],[400,240,600,360],
        [220,150,120,240],[580,150,680,240],[200,360,140,440],[600,360,660,440],
        [220,150,340,90],[580,150,460,90],[220,150,580,150],
      ].map(([x1,y1,x2,y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f4f1ea" strokeOpacity="0.22" strokeWidth="1.5" />
      ))}
      {/* core */}
      <circle cx="400" cy="240" r="34" fill="#ff4d00" opacity="0.2" />
      <circle cx="400" cy="240" r="16" fill="#ff4d00" />
      <text x="400" y="300" fill="#f4f1ea" fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="2">C2 SUSPECT</text>
      {/* nodes */}
      {[
        [220,150,true],[580,150,true],[200,360,true],[600,360,false],
        [120,240,false],[680,240,false],[140,440,false],[660,440,false],
        [340,90,false],[460,90,false],
      ].map(([x,y,hot], i) => (
        <circle key={i} cx={x as number} cy={y as number} r={hot ? 10 : 7}
          fill={hot ? "#ff4d00" : "none"} stroke={hot ? "#ff4d00" : "#f4f1ea"}
          strokeOpacity={hot ? 1 : 0.5} strokeWidth="2" />
      ))}
      {/* timeline strip */}
      <rect x="40" y="40" width="300" height="54" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
      <text x="60" y="62" fill="#8e8b82" fontSize="10" fontFamily="monospace" letterSpacing="2">EVENTS / 24H</text>
      <text x="60" y="86" fill="#f4f1ea" fontSize="16" fontFamily="monospace">1,248 correlated</text>
      <rect x="460" y="40" width="300" height="54" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
      <text x="480" y="62" fill="#8e8b82" fontSize="10" fontFamily="monospace" letterSpacing="2">OPEN ALERTS</text>
      <text x="480" y="86" fill="#ff4d00" fontSize="16" fontFamily="monospace">7 high severity</text>
      <text x="40" y="480" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">ILLUSTRATIVE — DETAILS PENDING</text>
    </svg>
  );
}

export function AgriVisual() {
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label="Illustrative AgriSaarthi dashboard mockup" className="h-auto w-full">
      <rect width="800" height="500" fill="#1e1d1a" />
      {/* scan panel */}
      <rect x="40" y="40" width="300" height="300" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
      <text x="60" y="72" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">LEAF SCAN</text>
      {/* leaf */}
      <path d="M190 120 C 260 140, 270 220, 190 300 C 110 220, 120 140, 190 120 Z" fill="none" stroke="#f4f1ea" strokeWidth="2" opacity="0.8" />
      <line x1="190" y1="120" x2="190" y2="300" stroke="#f4f1ea" opacity="0.4" />
      {/* scan frame corners */}
      <g stroke="#ff4d00" strokeWidth="3" fill="none">
        <path d="M60 118 L60 100 L78 100" />
        <path d="M302 100 L320 100 L320 118" />
        <path d="M60 302 L60 320 L78 320" />
        <path d="M302 320 L320 320 L320 302" />
      </g>
      <rect x="60" y="270" width="260" height="50" fill="#ff4d00" opacity="0.12" />
      <line x1="60" y1="270" x2="320" y2="270" stroke="#ff4d00" strokeWidth="2" />
      <text x="60" y="356" fill="#f4f1ea" fontSize="13" fontFamily="monospace">Tomato — Early blight risk</text>
      <text x="60" y="378" fill="#ff4d00" fontSize="13" fontFamily="monospace">Confidence 0.87</text>
      {/* stat cards */}
      {[
        ["FARM RISK", "MODERATE", "#f4f1ea"],
        ["IRRIGATION", "2 DAYS", "#f4f1ea"],
        ["MANDI PRICE", "₹2,140/q", "#f4f1ea"],
      ].map(([k, v, c], i) => (
        <g key={k as string}>
          <rect x={380 + i * 130} y="40" width="120" height="96" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
          <text x={396 + i * 130} y="68" fill="#8e8b82" fontSize="10" fontFamily="monospace" letterSpacing="1">{k}</text>
          <text x={396 + i * 130} y="104" fill={c as string} fontSize="17" fontFamily="sans-serif" fontWeight="bold">{v}</text>
        </g>
      ))}
      {/* bar chart */}
      <rect x="380" y="160" width="380" height="180" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
      <text x="400" y="192" fill="#8e8b82" fontSize="11" fontFamily="monospace" letterSpacing="2">7-DAY RISK FORECAST</text>
      {[0.35, 0.5, 0.42, 0.66, 0.58, 0.8, 0.72].map((v, i) => (
        <rect key={i} x={400 + i * 46} y={320 - v * 100} width="30" height={v * 100}
          fill={v > 0.6 ? "#ff4d00" : "#f4f1ea"} opacity={v > 0.6 ? 0.9 : 0.35} />
      ))}
      {/* assistant strip */}
      <rect x="40" y="400" width="720" height="60" fill="#141311" stroke="#f4f1ea" strokeOpacity="0.15" />
      <text x="60" y="426" fill="#8e8b82" fontSize="12" fontFamily="monospace">AI ASSISTANT —</text>
      <text x="200" y="426" fill="#f4f1ea" fontSize="13" fontFamily="sans-serif">“पानी दो दिन बाद दें — मिट्टी में नमी है”</text>
      <text x="60" y="448" fill="#8e8b82" fontSize="11" fontFamily="monospace">EN · HI · MR</text>
    </svg>
  );
}

export function GenericVisual({ title }: { title: string }) {
  return (
    <svg viewBox="0 0 800 500" role="img" aria-label={`Illustrative mockup for ${title}`} className="h-auto w-full">
      <rect width="800" height="500" fill="#1e1d1a" />
      <rect x="40" y="40" width="720" height="420" fill="none" stroke="#f4f1ea" strokeOpacity="0.2" strokeDasharray="8 8" />
      <text x="400" y="250" fill="#8e8b82" fontSize="14" fontFamily="monospace" textAnchor="middle" letterSpacing="3">
        VISUAL COMING SOON
      </text>
    </svg>
  );
}

export function ProjectVisual({ kind, title }: { kind: string; title: string }) {
  switch (kind) {
    case "geospatial":
      return <GeospatialVisual />;
    case "medical":
      return <MedicalVisual />;
    case "security":
      return <SecurityVisual />;
    case "agri":
      return <AgriVisual />;
    default:
      return <GenericVisual title={title} />;
  }
}
