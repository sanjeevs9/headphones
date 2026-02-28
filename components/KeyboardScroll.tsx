"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const FRAME_COUNT = 183;
const SCROLL_HEIGHT_MULTIPLIER = 6;

function getFramePath(index: number): string {
  const num = String(index).padStart(3, "0");
  return `/ezgif-split/frame_${num}_delay-0.043s.png`;
}

/* ------------------------------------------------------------------ */
/*  Loader                                                             */
/* ------------------------------------------------------------------ */
function Loader({ progress }: { progress: number }) {
  const circumference = 2 * Math.PI * 36;
  const strokeOffset = circumference - (progress / 100) * circumference;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 50,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#08080a",
      }}
    >
      {/* Circular progress */}
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: "1.5rem" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(201,169,110,0.08)" strokeWidth="1" />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke="#c9a96e"
            strokeWidth="1"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeOffset}
            style={{ transition: "stroke-dashoffset 200ms" }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-display), serif",
            fontStyle: "italic",
            fontSize: "1.1rem",
            color: "#c9a96e",
          }}
        >
          {progress}
        </div>
      </div>
      <p
        style={{
          fontSize: "0.6rem",
          letterSpacing: "0.3em",
          textTransform: "uppercase" as const,
          color: "rgba(237,232,224,0.2)",
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 400,
        }}
      >
        Loading frames
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual UI Components for each beat                                 */
/* ------------------------------------------------------------------ */

/* Floating glass card */
function GlassCard({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "rgba(237,232,224,0.04)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(201,169,110,0.1)",
        borderRadius: "16px",
        padding: "1.25rem 1.5rem",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* Animated ring/gauge */
function SpecRing({
  value,
  max,
  label,
  unit,
  size = 72,
}: {
  value: number;
  max: number;
  label: string;
  unit: string;
  size?: number;
}) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / max) * circ;

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem" }}>
      <div style={{ position: "relative", width: size, height: size }}>
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
          <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(201,169,110,0.06)" strokeWidth="2" />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="#c9a96e"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-display), serif",
              fontSize: size > 60 ? "1.2rem" : "0.9rem",
              fontWeight: 500,
              color: "#ede8e0",
              lineHeight: 1,
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "0.5rem",
              color: "rgba(201,169,110,0.6)",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
            }}
          >
            {unit}
          </span>
        </div>
      </div>
      <span
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.6rem",
          fontWeight: 400,
          letterSpacing: "0.15em",
          textTransform: "uppercase" as const,
          color: "rgba(237,232,224,0.35)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* Mini keyboard layout SVG */
function KeyboardLayoutSVG() {
  const rows = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.5],
    [1.5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1.75, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1.75],
    [2.25, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2.25],
    [1.25, 1.25, 1.25, 6.25, 1, 1, 1],
  ];

  const gap = 2;
  const keyH = 14;
  const scale = 4.2;
  let y = 0;

  return (
    <svg
      viewBox="0 0 280 90"
      style={{ width: "100%", maxWidth: 280, height: "auto", opacity: 0.5 }}
    >
      {rows.map((row, ri) => {
        let x = 0;
        const currentY = y;
        y += keyH + gap;
        return row.map((w, ki) => {
          const keyW = w * scale + (w - 1) * 0.5;
          const currentX = x;
          x += keyW + gap;
          const isAccent = (ri === 0 && ki === 0) || (ri === 4 && ki === 3);
          return (
            <rect
              key={`${ri}-${ki}`}
              x={currentX}
              y={currentY}
              width={keyW}
              height={keyH}
              rx={2}
              fill={isAccent ? "rgba(201,169,110,0.15)" : "rgba(237,232,224,0.06)"}
              stroke={isAccent ? "rgba(201,169,110,0.25)" : "rgba(237,232,224,0.08)"}
              strokeWidth={0.5}
            />
          );
        });
      })}
    </svg>
  );
}

/* Feature pill tag */
function FeaturePill({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: "var(--font-body), sans-serif",
        fontSize: "0.55rem",
        fontWeight: 500,
        letterSpacing: "0.15em",
        textTransform: "uppercase" as const,
        color: "#c9a96e",
        border: "1px solid rgba(201,169,110,0.2)",
        borderRadius: 100,
        padding: "0.35rem 0.85rem",
        whiteSpace: "nowrap" as const,
      }}
    >
      {label}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Beat configs                                                       */
/* ------------------------------------------------------------------ */
interface StoryBeat {
  range: [number, number];
  peak: [number, number];
  id: string;
}

const BEATS: StoryBeat[] = [
  { id: "hero", range: [0, 0.2], peak: [0, 0.14] },
  { id: "precision", range: [0.2, 0.45], peak: [0.26, 0.38] },
  { id: "engineering", range: [0.48, 0.75], peak: [0.55, 0.68] },
  { id: "cta", range: [0.8, 1.0], peak: [0.87, 1.0] },
];

function getOpacity(progress: number, beat: StoryBeat): number {
  const [start, end] = beat.range;
  const [peakStart, peakEnd] = beat.peak;
  if (progress < start || progress > end) return 0;
  if (progress >= peakStart && progress <= peakEnd) return 1;
  if (progress < peakStart) return Math.max(0, (progress - start) / (peakStart - start));
  return Math.max(0, 1 - (progress - peakEnd) / (end - peakEnd));
}

/* ------------------------------------------------------------------ */
/*  Beat Renders                                                       */
/* ------------------------------------------------------------------ */

function BeatHero() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: "0 clamp(2rem, 6vw, 6rem)",
        gap: "0",
      }}
    >
      {/* Top feature pills */}
      <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" as const, justifyContent: "center", marginBottom: "2rem" }}>
        <FeaturePill label="75% Layout" />
        <FeaturePill label="Hot-Swap" />
        <FeaturePill label="Gasket Mount" />
      </div>

      {/* Massive brand */}
      <h1
        style={{
          fontFamily: "var(--font-display), serif",
          fontStyle: "italic",
          fontWeight: 300,
          fontSize: "clamp(4rem, 13vw, 11rem)",
          letterSpacing: "-0.05em",
          lineHeight: 0.85,
          color: "#ede8e0",
          margin: 0,
        }}
      >
        WpDev
      </h1>

      {/* Subtitle with keyboard layout */}
      <div style={{ marginTop: "2rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.85rem, 1.6vw, 1.05rem)",
            letterSpacing: "0.04em",
            color: "rgba(237,232,224,0.45)",
            maxWidth: "26em",
            lineHeight: 1.7,
          }}
        >
          Mechanical precision. Uncompromising design.
          <br />
          Built for those who feel every keystroke.
        </p>

        {/* Mini keyboard diagram */}
        <div style={{ width: "min(280px, 60vw)", opacity: 0.7 }}>
          <KeyboardLayoutSVG />
        </div>
      </div>

      {/* Bottom specs row */}
      <div
        style={{
          position: "absolute",
          bottom: "6vh",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "clamp(1rem, 4vw, 3rem)",
          alignItems: "flex-end",
        }}
      >
        <SpecRing value={67} max={100} label="Keys" unit="keys" size={56} />
        <SpecRing value={1} max={5} label="Response" unit="ms" size={56} />
        <SpecRing value={75} max={100} label="Layout" unit="%" size={56} />
      </div>
    </div>
  );
}

function BeatPrecision() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "0 clamp(3rem, 8vw, 8rem)",
        gap: "clamp(2rem, 4vw, 5rem)",
      }}
    >
      {/* Left: Spec cards stack */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", flexShrink: 0 }}>
        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <SpecRing value={67} max={100} label="" unit="keys" size={52} />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#ede8e0",
                }}
              >
                67 Keys
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 300,
                  color: "rgba(237,232,224,0.35)",
                  marginTop: 2,
                }}
              >
                Compact 75% form factor
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <SpecRing value={1} max={10} label="" unit="ms" size={52} />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#ede8e0",
                }}
              >
                1ms Polling
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 300,
                  color: "rgba(237,232,224,0.35)",
                  marginTop: 2,
                }}
              >
                Instant response rate
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <SpecRing value={4000} max={5000} label="" unit="mah" size={52} />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "#ede8e0",
                }}
              >
                4000mAh
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.65rem",
                  fontWeight: 300,
                  color: "rgba(237,232,224,0.35)",
                  marginTop: 2,
                }}
              >
                Wireless endurance
              </div>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Right: Heading + text */}
      <div style={{ textAlign: "right", maxWidth: "24em" }}>
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: "#c9a96e",
            marginBottom: "1rem",
          }}
        >
          Precision
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#ede8e0",
          }}
        >
          Built to
          <br />
          be felt.
        </h2>
        <div style={{ width: 32, height: 1, background: "rgba(201,169,110,0.25)", margin: "1.25rem 0 1.25rem auto" }} />
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
            lineHeight: 1.7,
            color: "rgba(237,232,224,0.4)",
          }}
        >
          Gasket-mounted for softness. Hot-swappable for freedom. Every component tuned for perfection.
        </p>
      </div>
    </div>
  );
}

function BeatEngineering() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "100%",
        padding: "0 clamp(3rem, 8vw, 8rem)",
        gap: "clamp(2rem, 4vw, 5rem)",
      }}
    >
      {/* Left: Heading + text */}
      <div style={{ maxWidth: "24em" }}>
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.3em",
            textTransform: "uppercase" as const,
            color: "#c9a96e",
            marginBottom: "1rem",
          }}
        >
          Engineering
        </div>
        <h2
          style={{
            fontFamily: "var(--font-display), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: "#ede8e0",
          }}
        >
          Layers of
          <br />
          refinement.
        </h2>
        <div style={{ width: 32, height: 1, background: "rgba(201,169,110,0.25)", margin: "1.25rem 0" }} />
        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.8rem, 1.3vw, 0.95rem)",
            lineHeight: 1.7,
            color: "rgba(237,232,224,0.4)",
            marginBottom: "1.5rem",
          }}
        >
          CNC aluminum chassis. PBT double-shot keycaps. South-facing RGB with 16.8 million colors.
        </p>
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" as const }}>
          <FeaturePill label="CNC Aluminum" />
          <FeaturePill label="PBT Caps" />
          <FeaturePill label="South-facing LED" />
        </div>
      </div>

      {/* Right: Exploded material stack cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", flexShrink: 0 }}>
        {[
          { layer: "Keycaps", material: "PBT Double-shot", thickness: "1.5mm" },
          { layer: "Switches", material: "Hot-swappable", thickness: "3-pin / 5-pin" },
          { layer: "Plate", material: "Polycarbonate", thickness: "1.6mm" },
          { layer: "PCB", material: "1.2mm FR4", thickness: "South-facing" },
          { layer: "Case", material: "CNC Aluminum", thickness: "980g" },
        ].map((item, i) => (
          <GlassCard
            key={item.layer}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: "2rem",
              minWidth: 260,
              padding: "0.9rem 1.25rem",
              borderLeft: i === 4 ? "2px solid rgba(201,169,110,0.4)" : "2px solid rgba(201,169,110,0.08)",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: 500,
                  color: "#ede8e0",
                  letterSpacing: "0.02em",
                }}
              >
                {item.layer}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.6rem",
                  fontWeight: 300,
                  color: "rgba(237,232,224,0.3)",
                  marginTop: 2,
                }}
              >
                {item.material}
              </div>
            </div>
            <div
              style={{
                fontFamily: "var(--font-display), serif",
                fontStyle: "italic",
                fontSize: "0.75rem",
                color: "rgba(201,169,110,0.5)",
              }}
            >
              {item.thickness}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function BeatCTA() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        textAlign: "center",
        padding: "0 clamp(2rem, 6vw, 6rem)",
      }}
    >
      <div
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "0.6rem",
          fontWeight: 500,
          letterSpacing: "0.3em",
          textTransform: "uppercase" as const,
          color: "#c9a96e",
          marginBottom: "1.5rem",
        }}
      >
        Available Now
      </div>

      {/* Price in a glass card */}
      <GlassCard
        style={{
          textAlign: "center",
          padding: "2.5rem 4rem",
          borderRadius: "24px",
          border: "1px solid rgba(201,169,110,0.15)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display), serif",
            fontWeight: 400,
            fontSize: "clamp(3rem, 8vw, 5rem)",
            lineHeight: 1,
            color: "#c9a96e",
            letterSpacing: "-0.03em",
          }}
        >
          $299
        </div>
        <div
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.7rem",
            fontWeight: 300,
            color: "rgba(237,232,224,0.35)",
            marginTop: "0.75rem",
            letterSpacing: "0.05em",
          }}
        >
          Free worldwide shipping · Q2 2026
        </div>

        {/* Inline features */}
        <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" as const, justifyContent: "center", marginTop: "1.5rem" }}>
          <FeaturePill label="USB-C" />
          <FeaturePill label="Bluetooth 5.1" />
          <FeaturePill label="2.4GHz" />
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: "2rem",
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
            color: "#08080a",
            background: "#c9a96e",
            padding: "0.9rem 3rem",
            borderRadius: 100,
            cursor: "pointer",
          }}
        >
          Pre-order Now
        </div>
      </GlassCard>

      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 300,
          fontSize: "0.7rem",
          color: "rgba(237,232,224,0.2)",
          marginTop: "1.5rem",
          letterSpacing: "0.03em",
        }}
      >
        30-day returns · 1-year warranty · Secure checkout
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function KeyboardScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(-1);
  const loopRef = useRef<number>(0);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  useEffect(() => {
    let active = true;
    let count = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new window.Image();
      img.src = getFramePath(i);
      img.onload = img.onerror = () => {
        if (!active) return;
        count++;
        setLoadProgress(Math.round((count / FRAME_COUNT) * 100));
        if (count === FRAME_COUNT) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      active = false;
    };
  }, []);

  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (!canvasCtxRef.current) {
      canvasCtxRef.current = canvas.getContext("2d");
    }
    const ctx = canvasCtxRef.current;
    if (!ctx) return;

    const img = imagesRef.current[index];
    if (!img || !img.naturalWidth) return;

    const dpr = window.devicePixelRatio || 1;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (cw === 0 || ch === 0) return;

    if (canvasSizeRef.current.w !== cw || canvasSizeRef.current.h !== ch) {
      canvas.width = cw * dpr;
      canvas.height = ch * dpr;
      canvasSizeRef.current = { w: cw, h: ch };
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const imgAspect = img.naturalWidth / img.naturalHeight;
    const canvasAspect = cw / ch;
    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (imgAspect > canvasAspect) {
      drawH = ch;
      drawW = ch * imgAspect;
      drawX = (cw - drawW) / 2;
      drawY = 0;
    } else {
      drawW = cw;
      drawH = cw / imgAspect;
      drawX = 0;
      drawY = (ch - drawH) / 2;
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    drawFrame(0);
    lastFrameRef.current = 0;

    BEATS.forEach((beat, i) => {
      const el = overlayRefs.current[i];
      if (!el) return;
      const opacity = getOpacity(0, beat);
      el.style.opacity = String(opacity);
      el.style.transform = `translateY(${24 * (1 - opacity)}px)`;
    });

    const tick = () => {
      const container = containerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollRange = container.offsetHeight - window.innerHeight;

        let progress = 0;
        if (scrollRange > 0) {
          progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
        }

        const index = Math.min(
          Math.round(progress * (FRAME_COUNT - 1)),
          FRAME_COUNT - 1
        );

        if (index !== lastFrameRef.current) {
          lastFrameRef.current = index;
          drawFrame(index);
        }

        BEATS.forEach((beat, i) => {
          const el = overlayRefs.current[i];
          if (!el) return;
          const opacity = getOpacity(progress, beat);
          el.style.opacity = String(opacity);
          el.style.transform = `translateY(${24 * (1 - opacity)}px)`;
        });
      }

      loopRef.current = requestAnimationFrame(tick);
    };

    loopRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(loopRef.current);
  }, [loaded, drawFrame]);

  useEffect(() => {
    if (!loaded) return;
    const handleResize = () => {
      canvasSizeRef.current = { w: 0, h: 0 };
      const idx = lastFrameRef.current >= 0 ? lastFrameRef.current : 0;
      drawFrame(idx);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [loaded, drawFrame]);

  const beatComponents = [
    <BeatHero key="hero" />,
    <BeatPrecision key="precision" />,
    <BeatEngineering key="engineering" />,
    <BeatCTA key="cta" />,
  ];

  return (
    <>
      {!loaded && <Loader progress={loadProgress} />}

      <section id="hero" style={{ margin: 0, padding: 0 }}>
        <div
          ref={containerRef}
          style={{ height: `${SCROLL_HEIGHT_MULTIPLIER * 100}vh`, position: "relative" }}
        >
          <div
            style={{
              position: "sticky",
              top: 0,
              height: "100vh",
              width: "100%",
              overflow: "hidden",
            }}
          >
            {/* ====== BLURRED CANVAS BACKGROUND ====== */}
            <canvas
              ref={canvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                background: "#08080a",
                filter: "blur(12px) saturate(1.3) brightness(0.7)",
                transform: "scale(1.08)",
              }}
            />

            {/* Dark overlay */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(8,8,10,0.5)",
                pointerEvents: "none",
              }}
            />

            {/* Vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(ellipse at center, transparent 25%, rgba(8,8,10,0.75) 100%)",
                pointerEvents: "none",
              }}
            />

            {/* Grain texture */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                opacity: 0.035,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "128px 128px",
                pointerEvents: "none",
              }}
            />

            {/* Top + Bottom fades */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "15vh",
                background: "linear-gradient(to bottom, rgba(8,8,10,0.6), transparent)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "25vh",
                background: "linear-gradient(to top, rgba(8,8,10,0.9), transparent)",
                pointerEvents: "none",
              }}
            />

            {/* ====== UI OVERLAYS ====== */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                zIndex: 10,
              }}
            >
              {BEATS.map((beat, i) => (
                <div
                  key={beat.id}
                  ref={(el) => {
                    overlayRefs.current[i] = el;
                  }}
                  style={{
                    position: "absolute",
                    inset: 0,
                    opacity: 0,
                    transform: "translateY(24px)",
                    willChange: "opacity, transform",
                    pointerEvents: "none",
                  }}
                >
                  {beatComponents[i]}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
