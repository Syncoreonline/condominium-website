export function SectionDiagram() {
  return (
    <svg
      className="drawing"
      viewBox="0 0 960 440"
      role="img"
      aria-label="Section looking north: ocean, beach, Collins Avenue, the pool court, then the fifteen-story tower."
    >
      <rect width="960" height="440" fill="#efe8da" />
      <text x="32" y="36" className="drawing-kicker">
        Section, looking north
      </text>

      <path d="M0 300 C55 286 120 314 190 300 C230 292 260 300 280 300" fill="none" stroke="#1e3a34" strokeWidth="1.25" />
      <path d="M0 322 C70 308 130 338 210 320" fill="none" stroke="#1e3a34" strokeWidth="1" opacity="0.55" />
      <path d="M250 300 H960" stroke="#1a1814" strokeWidth="1.25" />

      <text x="48" y="250" className="drawing-label">
        Atlantic
      </text>
      <text x="236" y="276" className="drawing-label">
        Beach
      </text>

      <rect x="300" y="286" width="78" height="14" fill="#e4d9c4" stroke="#1a1814" strokeWidth="1" />
      <text x="308" y="276" className="drawing-label">
        Collins
      </text>

      <rect x="430" y="250" width="120" height="50" fill="#f7f3ea" stroke="#1a1814" strokeWidth="1.4" />
      <path d="M446 292 H534" stroke="#7ea8ad" strokeWidth="8" />
      <text x="448" y="240" className="drawing-label">
        Pool court
      </text>

      <rect x="590" y="72" width="150" height="228" fill="#f7f3ea" stroke="#1a1814" strokeWidth="1.6" />
      {Array.from({ length: 15 }, (_, index) => {
        const y = 80 + index * 14
        return (
          <g key={y}>
            <line x1="590" y1={y} x2="740" y2={y} stroke="#1a1814" strokeOpacity="0.28" />
            <rect x="608" y={y + 2} width="86" height="8" fill="#d5e3e1" stroke="#1a1814" strokeOpacity="0.35" />
            <rect x="578" y={y + 1} width="12" height="10" fill="none" stroke="#1a1814" strokeWidth="1" />
          </g>
        )
      })}
      <rect x="612" y="272" width="36" height="28" fill="none" stroke="#1a1814" />
      <text x="400" y="68" className="drawing-label">
        Ocean Park Condominium · 15 floors
      </text>
      <text x="770" y="276" className="drawing-label">
        Bay side
      </text>

      <path d="M168 300 C172 250 180 214 176 176" fill="none" stroke="#1a1814" strokeWidth="1.4" />
      <path d="M176 190 C150 176 128 184 112 170" fill="none" stroke="#1a1814" strokeWidth="1.2" />
      <path d="M176 186 C202 170 222 178 236 164" fill="none" stroke="#1a1814" strokeWidth="1.2" />
      <path d="M176 182 C158 156 164 138 154 122" fill="none" stroke="#1a1814" strokeWidth="1.2" />
      <path d="M176 180 C196 156 210 140 206 122" fill="none" stroke="#1a1814" strokeWidth="1.2" />

      <text x="32" y="410" className="drawing-note">
        A diagram, not a survey. The sand is east of Collins. Bay residences look west.
      </text>
    </svg>
  )
}

export function FloorPlan({ plan, exposure = "Ocean" }) {
  const side = exposure === "Bay" ? "Bay" : "Ocean"
  if (plan === "studio") return <StudioPlan side={side} />
  if (plan === "3br") return <ThreeBedPlan side={side} />
  if (plan === "1br") return <OneBedPlan side={side} />
  return <TwoBedPlan side={side} />
}

function StudioPlan({ side }) {
  return (
    <svg viewBox="0 0 640 420" className="plan" role="img" aria-label={`Typical studio plan, about 700 square feet, with one bath and a balcony toward the ${side.toLowerCase()}.`}>
      <PlanFrame title="Typical studio · about 700 sq ft" />
      <rect x="70" y="70" width="280" height="250" className="room" />
      <rect x="350" y="70" width="110" height="120" className="room" />
      <rect x="350" y="190" width="110" height="130" className="room" />
      <rect x="460" y="70" width="70" height="250" className="balcony" />
      <PlanLabel x="90" y="180">Living / sleeping</PlanLabel>
      <PlanLabel x="366" y="130">Kitchen</PlanLabel>
      <PlanLabel x="374" y="250">Bath</PlanLabel>
      <PlanLabel x="478" y="190" vertical>Balcony</PlanLabel>
      <SideMark x="548" y="190" side={side} />
    </svg>
  )
}

function OneBedPlan({ side }) {
  return (
    <svg viewBox="0 0 640 420" className="plan" role="img" aria-label={`Typical one-bedroom plan with living room, kitchen, bedroom, bath, and a balcony toward the ${side.toLowerCase()}.`}>
      <PlanFrame title="Typical one-bedroom" />
      <rect x="70" y="70" width="230" height="250" className="room" />
      <rect x="300" y="70" width="150" height="120" className="room" />
      <rect x="300" y="190" width="90" height="130" className="room" />
      <rect x="390" y="190" width="60" height="130" className="room" />
      <rect x="450" y="70" width="80" height="250" className="balcony" />
      <PlanLabel x="90" y="180">Living / dining</PlanLabel>
      <PlanLabel x="316" y="130">Kitchen</PlanLabel>
      <PlanLabel x="312" y="250">Bed</PlanLabel>
      <PlanLabel x="404" y="250">Bath</PlanLabel>
      <PlanLabel x="468" y="190" vertical>Balcony</PlanLabel>
      <SideMark x="548" y="190" side={side} />
    </svg>
  )
}

function TwoBedPlan({ side }) {
  return (
    <svg viewBox="0 0 700 460" className="plan" role="img" aria-label={`Typical two-bedroom plan. The balcony faces the ${side.toLowerCase()}.`}>
      <PlanFrame title="Typical two-bedroom" />
      <rect x="70" y="70" width="155" height="110" className="room" />
      <rect x="70" y="180" width="155" height="130" className="room" />
      <rect x="70" y="310" width="155" height="70" className="room" />
      <rect x="225" y="70" width="245" height="175" className="room" />
      <rect x="225" y="245" width="245" height="135" className="room" />
      <rect x="470" y="70" width="90" height="310" className="balcony" />
      <PlanLabel x="86" y="126">Kitchen</PlanLabel>
      <PlanLabel x="86" y="242">Bedroom 2</PlanLabel>
      <PlanLabel x="86" y="348">Bath</PlanLabel>
      <PlanLabel x="244" y="155">Living / dining</PlanLabel>
      <PlanLabel x="244" y="310">Primary</PlanLabel>
      <PlanLabel x="490" y="220" vertical>Balcony</PlanLabel>
      <SideMark x="578" y="220" side={side} />
    </svg>
  )
}

function ThreeBedPlan({ side }) {
  return (
    <svg viewBox="0 0 720 480" className="plan" role="img" aria-label="Typical three-bedroom plan with a primary suite at the northeast and a long east balcony.">
      <PlanFrame title="Typical three-bedroom" />
      <rect x="180" y="78" width="280" height="230" className="room" />
      <rect x="70" y="78" width="110" height="110" className="room" />
      <rect x="70" y="188" width="110" height="120" className="room" />
      <rect x="460" y="78" width="160" height="140" className="room" />
      <rect x="460" y="218" width="160" height="90" className="room" />
      <rect x="180" y="308" width="440" height="70" className="balcony" />
      <PlanLabel x="200" y="180">Living / dining</PlanLabel>
      <PlanLabel x="84" y="128">Kitchen</PlanLabel>
      <PlanLabel x="84" y="240">Bed 2</PlanLabel>
      <PlanLabel x="478" y="140">Primary</PlanLabel>
      <PlanLabel x="478" y="258">Bed 3</PlanLabel>
      <PlanLabel x="360" y="348">{`Balcony · ${side}`}</PlanLabel>
    </svg>
  )
}

function PlanFrame({ title }) {
  return (
    <text x="70" y="42" className="drawing-kicker">
      {title}
    </text>
  )
}

function PlanLabel({ x, y, children, vertical = false }) {
  return (
    <text x={x} y={y} className="plan-label" transform={vertical ? `rotate(-90 ${x} ${y})` : undefined}>
      {children}
    </text>
  )
}

function SideMark({ x, y, side }) {
  return (
    <text x={x} y={y} className="plan-label" transform={`rotate(-90 ${x} ${y})`}>
      {side}
    </text>
  )
}
