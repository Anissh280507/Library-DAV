export default function DavLogo({ size = 44 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 220"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="DAV College Managing Committee Logo"
    >
      {/* Outer circle */}
      <circle cx="100" cy="100" r="95" fill="white" stroke="#1a1a6e" strokeWidth="4" />
      <circle cx="100" cy="100" r="87" fill="white" stroke="#1a1a6e" strokeWidth="2" />

      {/* Text arc - DAV COLLEGE MANAGING COMMITTEE */}
      <defs>
        <path id="topArc" d="M 15,100 A 85,85 0 0,1 185,100" />
        <path id="bottomArc" d="M 20,110 A 80,80 0 0,0 180,110" />
      </defs>
      <text fill="#1a1a6e" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif" letterSpacing="2">
        <textPath href="#topArc" startOffset="5%">D.A.V. COLLEGE MANAGING COMMITTEE</textPath>
      </text>

      {/* Sun rays */}
      {Array.from({ length: 14 }).map((_, i) => {
        const angle = -90 + (i * 180) / 13;
        const rad = (angle * Math.PI) / 180;
        const x1 = 100 + 38 * Math.cos(rad);
        const y1 = 85 + 38 * Math.sin(rad);
        const x2 = 100 + 55 * Math.cos(rad);
        const y2 = 85 + 55 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1} y1={y1}
            x2={x2} y2={y2}
            stroke={i % 2 === 0 ? "#e63a1e" : "#f5a623"}
            strokeWidth="2.5"
          />
        );
      })}

      {/* Inner circle (sun base) */}
      <ellipse cx="100" cy="92" rx="38" ry="30" fill="#f0f0ff" stroke="#1a1a6e" strokeWidth="1.5" />

      {/* OM symbol */}
      <text
        x="100" y="98"
        textAnchor="middle"
        fontSize="26"
        fill="#f5a623"
        fontFamily="serif"
        fontWeight="bold"
      >
        ॐ
      </text>

      {/* Water waves */}
      <clipPath id="circleClip">
        <ellipse cx="100" cy="92" rx="37" ry="29" />
      </clipPath>
      <g clipPath="url(#circleClip)">
        {[108, 114, 120].map((y, i) => (
          <path
            key={i}
            d={`M 63,${y} q 9,-5 18,0 q 9,5 18,0 q 9,-5 18,0`}
            fill="none"
            stroke={i === 0 ? "#1a6ea8" : "#5baadc"}
            strokeWidth="2"
          />
        ))}
        <rect x="63" y="107" width="74" height="20" fill="#b3dff5" opacity="0.5" />
      </g>

      {/* Olive branches */}
      {/* Left branch */}
      <g transform="translate(55, 148) rotate(-30)">
        {[0, 8, 16, 24, 32].map((x, i) => (
          <ellipse key={i} cx={x} cy={-i * 2} rx="4" ry="2.5" fill="#1a1a6e" transform={`rotate(${i * 10}, ${x}, ${-i * 2})`} />
        ))}
        <line x1="0" y1="0" x2="32" y2="-8" stroke="#1a1a6e" strokeWidth="1.5" />
      </g>
      {/* Right branch */}
      <g transform="translate(145, 148) rotate(30) scale(-1,1)">
        {[0, 8, 16, 24, 32].map((x, i) => (
          <ellipse key={i} cx={x} cy={-i * 2} rx="4" ry="2.5" fill="#1a1a6e" transform={`rotate(${i * 10}, ${x}, ${-i * 2})`} />
        ))}
        <line x1="0" y1="0" x2="32" y2="-8" stroke="#1a1a6e" strokeWidth="1.5" />
      </g>

      {/* Banner ribbon */}
      <path d="M 20,175 Q 100,165 180,175 L 175,195 Q 100,185 25,195 Z" fill="white" stroke="#1a1a6e" strokeWidth="2" />
      <path d="M 20,175 L 8,185 L 25,195" fill="white" stroke="#1a1a6e" strokeWidth="1.5" />
      <path d="M 180,175 L 192,185 L 175,195" fill="white" stroke="#1a1a6e" strokeWidth="1.5" />

      {/* Hatching on banner ends */}
      {[12, 15, 18].map((x, i) => (
        <line key={i} x1={x} y1="177" x2={x - 3} y2="192" stroke="#1a1a6e" strokeWidth="1" />
      ))}
      {[182, 185, 188].map((x, i) => (
        <line key={i} x1={x} y1="177" x2={x + 3} y2="192" stroke="#1a1a6e" strokeWidth="1" />
      ))}

      {/* ESTD 1886 text */}
      <text
        x="100" y="190"
        textAnchor="middle"
        fontSize="13"
        fill="#1a1a6e"
        fontFamily="Arial, sans-serif"
        fontWeight="bold"
        letterSpacing="1"
      >
        ESTD 1886
      </text>
    </svg>
  );
}
