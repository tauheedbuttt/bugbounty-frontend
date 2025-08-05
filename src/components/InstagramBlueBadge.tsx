
import React from "react";

export function InstagramBlueBadge({ className = "", size = 20 }: { className?: string; size?: number }) {
  // SVG that mimics Instagram's blue badge style
  return (
    <span className={className} title="Blue Badge">
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill="none"
        aria-hidden="true"
        style={{ display: "inline", verticalAlign: "middle" }}
      >
        <defs>
          <linearGradient id="ig-blue-badge-gradient" x1="0" y1="0" x2="20" y2="20" gradientUnits="userSpaceOnUse">
            <stop stopColor="#52a7ea" />
            <stop offset="1" stopColor="#2178ed" />
          </linearGradient>
        </defs>
        <circle
          cx="10"
          cy="10"
          r="9"
          fill="url(#ig-blue-badge-gradient)"
          stroke="#fff"
          strokeWidth="1.5"
        />
        <path
          d="M7.8 10.6l1.6 1.6 2.8-3.2"
          stroke="#fff"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
