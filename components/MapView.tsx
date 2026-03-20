"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { Destination, formatINR } from "@/data/destinations";

const PIN_COLORS: Record<string, string> = {
  free: "#5CBA66",
  easy: "#2AB0FC",
  standard: "#AD5BE7",
};

const VISA_BADGE: Record<string, { bg: string; text: string; label: string }> = {
  free:     { bg: "#DCFCE7", text: "#16a34a", label: "Visa: Free" },
  easy:     { bg: "#e0f0ff", text: "#1d6fb8", label: "Visa: Easy" },
  standard: { bg: "#fde8ff", text: "#9333ea", label: "Visa: Standard" },
};

const STYLE_COLORS: Record<string, { bg: string; text: string }> = {
  "Romantic":       { bg: "#fef2f2", text: "#dc2626" },
  "Hidden Gems":    { bg: "#f0fdf4", text: "#16a34a" },
  "Adventure":      { bg: "#f5f3ff", text: "#7c3aed" },
  "Heritage & Art": { bg: "#fff7ed", text: "#c2410c" },
};

interface HoverState {
  dest: Destination;
  x: number;
  y: number;
}

export default function MapView({ destinations, onSelectDest, flyToSlug }: { destinations: Destination[]; onSelectDest?: (slug: string) => void; flyToSlug?: string | null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
        <p className="text-gray-400 font-medium">Loading map…</p>
      </div>
    );
  }
  return <MapInner destinations={destinations} onSelectDest={onSelectDest} flyToSlug={flyToSlug} />;
}

function MapInner({ destinations, onSelectDest, flyToSlug }: { destinations: Destination[]; onSelectDest?: (slug: string) => void; flyToSlug?: string | null }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const [hovered, setHovered] = useState<HoverState | null>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleHover = useCallback((state: HoverState | null) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (state) {
      setHovered(state);
    } else {
      hoverTimeout.current = setTimeout(() => setHovered(null), 180);
    }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    let map: import("leaflet").Map | null = null;

    (async () => {
      await import("leaflet/dist/leaflet.css");
      const leaflet = await import("leaflet");
      const L = leaflet.default ?? leaflet;
      if (!containerRef.current) return;

      map = L.map(containerRef.current, {
        zoomControl: false,
        attributionControl: true,
      }).setView([20, 80], 4);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap",
      }).addTo(map);

      L.control.zoom({ position: "topright" }).addTo(map);

      destinations.forEach((dest) => {
        if (!L || !map) return;
        const color = PIN_COLORS[dest.visa] ?? "#345ee9";

        // Pin: 44px inner circle + pulse ring — matches Figma size
        const pinHtml = `
          <div style="position:relative;width:54px;height:54px;display:flex;align-items:center;justify-content:center;">
            <div class="pin-pulse" style="
              position:absolute;inset:0;background:${color};border-radius:50%;opacity:0.18;
            "></div>
            <div class="pin-inner" data-color="${color}" style="
              position:relative;width:44px;height:44px;background:${color};border-radius:50%;
              display:flex;align-items:center;justify-content:center;
              box-shadow:0 3px 16px rgba(0,0,0,0.22);cursor:pointer;
              transition:transform 0.32s cubic-bezier(0.34,1.56,0.64,1),box-shadow 0.22s ease;
            ">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          </div>`;

        const icon = L.divIcon({
          className: "",
          html: pinHtml,
          iconSize: [54, 54],
          iconAnchor: [27, 54],
        });

        const marker = L.marker([dest.lat, dest.lng], { icon }).addTo(map!);

        marker.on("mouseover", (e) => {
          if (!map) return;
          const el = marker.getElement();
          const inner = el?.querySelector(".pin-inner") as HTMLElement | null;
          if (inner) {
            inner.style.transform = "scale(1.25)";
            inner.style.boxShadow = `0 6px 28px 2px ${color}66`;
          }
          const pt = map.latLngToContainerPoint(e.latlng);
          handleHover({ dest, x: pt.x, y: pt.y });
        });

        marker.on("mouseout", () => {
          const el = marker.getElement();
          const inner = el?.querySelector(".pin-inner") as HTMLElement | null;
          if (inner) {
            inner.style.transform = "scale(1)";
            inner.style.boxShadow = "0 3px 16px rgba(0,0,0,0.22)";
          }
          handleHover(null);
        });

        marker.on("click", () => {
          const el = marker.getElement();
          const inner = el?.querySelector(".pin-inner") as HTMLElement | null;
          if (!inner) return;
          inner.style.transform = "scale(0.8)";
          setTimeout(() => { if (inner) inner.style.transform = "scale(1.35)"; }, 80);
          setTimeout(() => { if (inner) inner.style.transform = "scale(1.25)"; }, 220);
        });
      });
    })();

    return () => { map?.remove(); mapRef.current = null; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [destinations]);

  // Fly to destination when selected from search
  useEffect(() => {
    if (!flyToSlug || !mapRef.current) return;
    const dest = destinations.find((d) => d.slug === flyToSlug);
    if (!dest) return;
    mapRef.current.flyTo([dest.lat, dest.lng], 6, { animate: true, duration: 1.4 });
  }, [flyToSlug, destinations]);

  // Card positioning — clamp to container
  const cardW = 310;
  const cardH = 310;
  let cardLeft = (hovered?.x ?? 0) + 20;
  let cardTop  = (hovered?.y ?? 0) - cardH / 2;
  if (containerRef.current) {
    const cw = containerRef.current.clientWidth;
    const ch = containerRef.current.clientHeight;
    // Flip left if too close to right edge
    if (cardLeft + cardW > cw - 12) cardLeft = (hovered?.x ?? 0) - cardW - 20;
    cardLeft = Math.max(8, cardLeft);
    cardTop  = Math.max(8, Math.min(cardTop, ch - cardH - 8));
  }

  // Arrow: from pin center → card left/right edge midpoint
  const pinX = hovered?.x ?? 0;
  const pinY = (hovered?.y ?? 0) - 27; // pin center (27 = half of 54px icon)
  // Determine which side the card is on
  const cardOnRight = cardLeft > (hovered?.x ?? 0);
  const arrowEndX = cardOnRight ? cardLeft : cardLeft + cardW;
  const arrowEndY = cardTop + cardH / 2;
  // Gentle curve control point
  const cpx = (pinX + arrowEndX) / 2;
  const cpy = Math.min(pinY, arrowEndY) - 30;
  const arrowPath = `M ${pinX} ${pinY} Q ${cpx} ${cpy} ${arrowEndX} ${arrowEndY}`;

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      onMouseLeave={() => handleHover(null)}
    >
      <style>{`
        @keyframes pinPulse {
          0%  { transform:scale(1);   opacity:0.18; }
          60% { transform:scale(1.9); opacity:0;    }
          100%{ transform:scale(1.9); opacity:0;    }
        }
        .pin-pulse { animation: pinPulse 2.4s ease-out infinite; }

        @keyframes cardSpring {
          0%  { opacity:0; transform:scale(0.9) translateY(6px); }
          55% { opacity:1; transform:scale(1.02) translateY(-1px); }
          80% { transform:scale(0.99); }
          100%{ opacity:1; transform:scale(1) translateY(0); }
        }
        @keyframes drawLine {
          from { stroke-dashoffset: 400; }
          to   { stroke-dashoffset: 0; }
        }
        @keyframes dotPop {
          0%  { r:0; opacity:0; }
          60% { r:5; opacity:1; }
          100%{ r:3.5; opacity:1; }
        }
      `}</style>

      {/* SVG dashed arrow */}
      {hovered && (
        <svg
          key={hovered.dest.slug + "-arrow"}
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 999, width: "100%", height: "100%" }}
        >
          <path
            d={arrowPath}
            fill="none"
            stroke="#f87171"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="8 6"
            style={{
              strokeDashoffset: 0,
              animation: "drawLine 0.5s cubic-bezier(0.4,0,0.2,1) both",
              strokeDasharray: "400",
            }}
          />
          {/* Arrowhead dot at pin end */}
          <circle
            cx={pinX}
            cy={pinY}
            r="3.5"
            fill="#f87171"
            style={{ animation: "dotPop 0.3s 0.35s cubic-bezier(0.34,1.56,0.64,1) both" }}
          />
        </svg>
      )}

      {/* Hover card */}
      {hovered && (
        <div
          key={hovered.dest.slug + "-card"}
          className="absolute z-[1000]"
          style={{
            left: cardLeft,
            top: cardTop,
            width: cardW,
            animation: "cardSpring 0.38s cubic-bezier(0.34,1.56,0.64,1) both",
          }}
          onMouseEnter={() => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); }}
          onMouseLeave={() => handleHover(null)}
        >
          <div className="bg-white rounded-2xl overflow-hidden" style={{ boxShadow: "0px 8px 40px rgba(0,0,0,0.14)" }}>
            {/* Image */}
            <div className="relative" style={{ height: 168 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={hovered.dest.image} alt={hovered.dest.name} className="w-full h-full object-cover" />
              {/* Visa badge */}
              <div
                className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                style={{
                  background: VISA_BADGE[hovered.dest.visa]?.bg,
                  color: VISA_BADGE[hovered.dest.visa]?.text,
                }}
              >
                {VISA_BADGE[hovered.dest.visa]?.label}
              </div>
            </div>

            {/* Body */}
            <div className="px-4 pt-3 pb-4">
              {/* Name */}
              <p className="font-bold text-[18px] text-gray-900 leading-tight mb-2">
                {hovered.dest.name}
              </p>

              {/* Style tags */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {hovered.dest.styles.map((s) => (
                  <span
                    key={s}
                    className="text-[11px] font-medium px-2.5 py-0.5 rounded-full"
                    style={{
                      background: STYLE_COLORS[s]?.bg ?? "#F3F4F6",
                      color: STYLE_COLORS[s]?.text ?? "#374151",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Price */}
              <p className="text-[11px] text-gray-400 mb-0.5">
                Starting Price{" "}
                <span className="text-gray-400">(Including Flight, Hotel &amp; Visa)</span>
              </p>
              <p className="font-bold text-[18px] text-gray-900 mb-3">
                {formatINR(hovered.dest.pricePerPerson)}
                <span className="text-[13px] font-normal text-gray-500"> / person</span>
              </p>

              {/* Button */}
              <button
                className="pointer-events-auto flex items-center justify-center gap-1.5 text-[13px] font-semibold w-full py-2.5 rounded-xl transition-opacity hover:opacity-90 cursor-pointer"
                style={{ background: "#345ee9", color: "#ffffff", border: "none" }}
                onClick={() => onSelectDest ? onSelectDest(hovered.dest.slug) : window.location.assign(`/explore/combos/${hovered.dest.slug}`)}
              >
                Explore Trip ↗
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
