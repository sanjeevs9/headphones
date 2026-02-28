"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useSequence } from "./SequenceContext";

const SCROLL_HEIGHT_MULTIPLIER = 6;

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */
const GOLD = "#c9a96e";
const GOLD_DIM = "rgba(201,169,110,0.3)";
const GOLD_FAINT = "rgba(201,169,110,0.12)";
const TEXT = "#0a0a0a";
const TEXT_MID = "rgba(10,10,10,0.85)";
const TEXT_DIM = "rgba(10,10,10,0.55)";
const TEXT_FAINT = "rgba(10,10,10,0.35)";
const BG = "#08080a";

const FONT_DISPLAY = "var(--font-syne), 'Syne', sans-serif";
const FONT_MONO = "var(--font-mono), 'JetBrains Mono', monospace";

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
        background: BG,
      }}
    >
      <div style={{ position: "relative", width: 80, height: 80, marginBottom: "1.5rem" }}>
        <svg width="80" height="80" viewBox="0 0 80 80" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="40" cy="40" r="36" fill="none" stroke={GOLD_FAINT} strokeWidth="1" />
          <circle
            cx="40"
            cy="40"
            r="36"
            fill="none"
            stroke={GOLD}
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
            fontFamily: FONT_MONO,
            fontSize: "0.9rem",
            fontWeight: 300,
            color: GOLD,
          }}
        >
          {progress}
        </div>
      </div>
      <p
        style={{
          fontSize: "0.55rem",
          letterSpacing: "0.35em",
          textTransform: "uppercase" as const,
          color: TEXT_FAINT,
          fontFamily: FONT_MONO,
          fontWeight: 300,
        }}
      >
        Loading frames
      </p>
    </div>
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
/*  Beat renders — asymmetric left/right editorial layout              */
/* ------------------------------------------------------------------ */

function BeatHero() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* LEFT — massive brand name, bottom-anchored */}
      <div
        style={{
          position: "absolute",
          left: "clamp(2rem, 5vw, 5rem)",
          bottom: "18vh",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.55rem",
            fontWeight: 300,
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: GOLD,
            marginBottom: "1.25rem",
          }}
        >
          mechanical keyboards
        </div>
        <div
          style={{
            width: 48,
            height: 2,
            background: GOLD,
            marginTop: "0.5rem",
          }}
        />
      </div>

      {/* RIGHT — tagline, vertically centered-high */}
      <div
        style={{
          position: "absolute",
          right: "clamp(2rem, 5vw, 5rem)",
          top: "30vh",
          textAlign: "right",
          maxWidth: "18em",
        }}
      >
        <p
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 400,
            fontSize: "clamp(0.7rem, 1.1vw, 0.85rem)",
            lineHeight: 2,
            color: TEXT_MID,
            letterSpacing: "0.02em",
          }}
        >
          Mechanical precision.
          <br />
          Uncompromising design.
          <br />
          <span style={{ color: GOLD }}>
            Built for those who feel
            <br />every keystroke.
          </span>
        </p>
      </div>

      {/* Bottom-right scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: "4vh",
          right: "clamp(2rem, 5vw, 5rem)",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            width: 32,
            height: 1,
            background: `linear-gradient(to right, transparent, ${GOLD_DIM})`,
          }}
        />
        <span
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.5rem",
            fontWeight: 400,
            letterSpacing: "0.35em",
            textTransform: "uppercase" as const,
            color: TEXT_FAINT,
          }}
        >
          scroll
        </span>
        <svg width="12" height="12" viewBox="0 0 12 12" style={{ opacity: 0.5 }}>
          <path d="M6 2 L6 10 M3 7 L6 10 L9 7" stroke={GOLD} strokeWidth="1" fill="none" />
        </svg>
      </div>
    </div>
  );
}

function BeatPrecision() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* RIGHT-anchored text block */}
      <div
        style={{
          position: "absolute",
          right: "clamp(2rem, 5vw, 5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "right",
          maxWidth: "28em",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.5rem",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: GOLD,
            marginBottom: "1.5rem",
          }}
        >
          [ 01 &mdash; precision ]
        </div>

        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: TEXT,
            margin: 0,
            textTransform: "uppercase" as const,
          }}
        >
          Built to
          <br />
          <span style={{ color: GOLD }}>be felt.</span>
        </h2>

        <div
          style={{
            width: 40,
            height: 1,
            background: GOLD,
            margin: "1.5rem 0 1.5rem auto",
          }}
        />

        <p
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 400,
            fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
            lineHeight: 1.9,
            color: TEXT_DIM,
            letterSpacing: "0.01em",
          }}
        >
          Gasket-mounted for softness.
          <br />
          Hot-swappable for freedom.
          <br />
          Every component tuned for perfection.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            justifyContent: "flex-end",
            marginTop: "2rem",
          }}
        >
          {[
            { val: "67", unit: "keys" },
            { val: "1ms", unit: "polling" },
            { val: "75%", unit: "layout" },
          ].map((s) => (
            <div key={s.unit} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: FONT_DISPLAY,
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  color: GOLD,
                  lineHeight: 1,
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: FONT_MONO,
                  fontSize: "0.45rem",
                  fontWeight: 400,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase" as const,
                  color: TEXT_FAINT,
                  marginTop: "0.4rem",
                }}
              >
                {s.unit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeatEngineering() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* LEFT-anchored text block */}
      <div
        style={{
          position: "absolute",
          left: "clamp(2rem, 5vw, 5rem)",
          top: "50%",
          transform: "translateY(-50%)",
          textAlign: "left",
          maxWidth: "28em",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.5rem",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: GOLD,
            marginBottom: "1.5rem",
          }}
        >
          [ 02 &mdash; engineering ]
        </div>

        <h2
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 700,
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            lineHeight: 1,
            letterSpacing: "-0.03em",
            color: TEXT,
            margin: 0,
            textTransform: "uppercase" as const,
          }}
        >
          Layers of
          <br />
          <span style={{ color: GOLD }}>refinement.</span>
        </h2>

        <div
          style={{
            width: 40,
            height: 1,
            background: GOLD,
            margin: "1.5rem 0",
          }}
        />

        <p
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 400,
            fontSize: "clamp(0.65rem, 1vw, 0.8rem)",
            lineHeight: 1.9,
            color: TEXT_DIM,
            letterSpacing: "0.01em",
          }}
        >
          CNC aluminum chassis.
          <br />
          PBT double-shot keycaps.
          <br />
          South-facing RGB — 16.8M colors.
        </p>

        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.5rem",
          }}
        >
          {[
            { layer: "Keycaps", spec: "PBT 1.5mm" },
            { layer: "Switches", spec: "Hot-swap" },
            { layer: "Plate", spec: "Polycarb" },
            { layer: "Case", spec: "CNC Alu" },
          ].map((item, i) => (
            <div
              key={item.layer}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                fontFamily: FONT_MONO,
                fontSize: "0.5rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase" as const,
              }}
            >
              <span style={{ color: GOLD, opacity: 0.7, minWidth: "1.5em" }}>
                0{i + 1}
              </span>
              <div
                style={{
                  width: 12,
                  height: 1,
                  background: i === 3 ? GOLD : GOLD_DIM,
                }}
              />
              <span style={{ color: i === 3 ? GOLD : TEXT_DIM, fontWeight: i === 3 ? 500 : 400 }}>
                {item.layer}
              </span>
              <span style={{ color: TEXT_FAINT, fontWeight: 300 }}>
                {item.spec}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BeatCTA() {
  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      {/* LEFT — price */}
      <div
        style={{
          position: "absolute",
          left: "clamp(2rem, 5vw, 5rem)",
          bottom: "22vh",
        }}
      >
        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.5rem",
            fontWeight: 500,
            letterSpacing: "0.4em",
            textTransform: "uppercase" as const,
            color: GOLD,
            marginBottom: "1rem",
          }}
        >
          available now
        </div>
        <div
          style={{
            fontFamily: FONT_DISPLAY,
            fontWeight: 800,
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            lineHeight: 0.9,
            color: GOLD,
            letterSpacing: "-0.03em",
          }}
        >
          $299
        </div>
        <div
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 400,
            fontSize: "0.55rem",
            color: TEXT_FAINT,
            marginTop: "1rem",
            letterSpacing: "0.1em",
          }}
        >
          Free worldwide shipping &middot; Q2 2026
        </div>
      </div>

      {/* RIGHT — CTA button + details */}
      <div
        style={{
          position: "absolute",
          right: "clamp(2rem, 5vw, 5rem)",
          bottom: "22vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1.5rem",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "1rem",
            fontFamily: FONT_MONO,
            fontSize: "0.5rem",
            fontWeight: 400,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            color: TEXT_DIM,
          }}
        >
          <span>USB-C</span>
          <span style={{ color: GOLD }}>/</span>
          <span>BT 5.1</span>
          <span style={{ color: GOLD }}>/</span>
          <span>2.4GHz</span>
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontSize: "0.6rem",
            fontWeight: 500,
            letterSpacing: "0.25em",
            textTransform: "uppercase" as const,
            color: BG,
            background: GOLD,
            padding: "1rem 2.5rem",
            cursor: "pointer",
          }}
        >
          Pre-order now
        </div>

        <div
          style={{
            fontFamily: FONT_MONO,
            fontWeight: 400,
            fontSize: "0.45rem",
            color: TEXT_FAINT,
            letterSpacing: "0.15em",
            textTransform: "uppercase" as const,
          }}
        >
          30-day returns &middot; 1yr warranty
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */
export default function KeyboardScrollClear() {
  const { activeSequence } = useSequence();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRefs = useRef<(HTMLDivElement | null)[]>([]);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef<number>(-1);
  const loopRef = useRef<number>(0);
  const canvasCtxRef = useRef<CanvasRenderingContext2D | null>(null);
  const canvasSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const frameCountRef = useRef<number>(activeSequence.count);

  const [loaded, setLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Load frames whenever activeSequence changes
  useEffect(() => {
    let active = true;
    let count = 0;
    const frameCount = activeSequence.count;
    frameCountRef.current = frameCount;
    const images: HTMLImageElement[] = [];

    setLoaded(false);
    setLoadProgress(0);
    lastFrameRef.current = -1;

    for (let i = 0; i < frameCount; i++) {
      const img = new window.Image();
      img.src = activeSequence.getPath(i);
      img.onload = img.onerror = () => {
        if (!active) return;
        count++;
        setLoadProgress(Math.round((count / frameCount) * 100));
        if (count === frameCount) {
          imagesRef.current = images;
          setLoaded(true);
        }
      };
      images.push(img);
    }

    return () => {
      active = false;
    };
  }, [activeSequence]);

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
      const frameCount = frameCountRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const scrollRange = container.offsetHeight - window.innerHeight;

        let progress = 0;
        if (scrollRange > 0) {
          progress = Math.min(Math.max(-rect.top / scrollRange, 0), 1);
        }

        const index = Math.min(
          Math.round(progress * (frameCount - 1)),
          frameCount - 1
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
            {/* ====== CLEAR CANVAS — no blur, no scale ====== */}
            <canvas
              ref={canvasRef}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                background: BG,
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
