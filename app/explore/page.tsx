"use client";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import DestinationCard from "@/components/DestinationCard";
import FilterSidebar from "@/components/FilterSidebar";
import MapView from "@/components/MapView";
import AIBuddy from "@/components/AIBuddy";
import { destinations, formatINRFull, VisaType, TravelStyle } from "@/data/destinations";

export type Filters = {
  visa: VisaType[];
  budget: string[];
  duration: string[];
  flights: string;
  weather: string[];
};

const defaultFilters: Filters = {
  visa: [],
  budget: [],
  duration: [],
  flights: "any",
  weather: [],
};

const PIN_COLORS: Record<string, string> = {
  free: "#5CBA66",
  easy: "#2AB0FC",
  standard: "#AD5BE7",
};

const VISA_BADGE: Record<VisaType, { bg: string; border: string; text: string; label: string }> = {
  free:     { bg: "#DCFCE7", border: "#86efac", text: "#16a34a", label: "Visa: Free" },
  easy:     { bg: "#f1daff", border: "#e0b0fc", text: "#9c36d7", label: "Visa: Easy" },
  standard: { bg: "#FCE7F3", border: "#f9a8d4", text: "#be185d", label: "Visa: Standard" },
};

const STYLE_COLORS: Record<TravelStyle, { bg: string; text: string }> = {
  "Romantic":       { bg: "#fdeced", text: "#b3051a" },
  "Hidden Gems":    { bg: "#fdecf6", text: "#a50da2" },
  "Adventure":      { bg: "#F5F3FF", text: "#7c3aed" },
  "Heritage & Art": { bg: "#FFF7ED", text: "#c2410c" },
};

export default function ExplorePage() {
  const [view, setView] = useState<"card" | "map">("map");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Open sidebar by default on desktop
  useEffect(() => {
    if (window.innerWidth >= 768) setSidebarOpen(true);
  }, []);
  const [showLegend, setShowLegend] = useState(false);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);

  const selectedDest = selectedSlug ? destinations.find((d) => d.slug === selectedSlug) ?? null : null;

  // Animate in/out
  useEffect(() => {
    if (selectedSlug) {
      // tiny delay so CSS transition triggers
      requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)));
    } else {
      setLightboxVisible(false);
    }
  }, [selectedSlug]);

  const closeLightbox = () => {
    setLightboxVisible(false);
    setTimeout(() => setSelectedSlug(null), 340);
  };

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") closeLightbox(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const filtered = useMemo(() => {
    return destinations.filter((d) => {
      if (filters.visa.length && !filters.visa.includes(d.visa)) return false;
      return true;
    });
  }, [filters]);

  const headerRight = (
    <div className="flex items-center gap-3 flex-shrink-0">
      <div className="relative">
        <button
          onClick={() => setShowLegend((v) => !v)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-gray-300 transition-all"
        >
          <span className="flex gap-1">
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: PIN_COLORS.free }} />
            <span className="w-3 h-3 rounded-full inline-block" style={{ background: PIN_COLORS.standard }} />
          </span>
          Legends
        </button>
        {showLegend && (
          <div className="absolute right-0 top-10 bg-white border border-gray-100 rounded-2xl shadow-lg p-4 w-52 z-50 animate-fade-in">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Visa Type</p>
            {[
              { label: "Visa Free", color: PIN_COLORS.free },
              { label: "Easy Visa", color: PIN_COLORS.easy },
              { label: "Standard Visa", color: PIN_COLORS.standard },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 mb-2">
                <span className="w-4 h-4 rounded-full flex-shrink-0" style={{ background: item.color }} />
                <span className="text-sm text-gray-700">{item.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setView("map")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "map" ? "bg-[#345ee9] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Map
        </button>
        <button
          onClick={() => setView("card")}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm font-medium transition-all ${view === "card" ? "bg-[#345ee9] text-white shadow-sm" : "text-gray-600 hover:text-gray-900"}`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
          Card
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header rightContent={headerRight} />

      {/* Mobile filter toggle */}
      <div className="md:hidden flex items-center justify-between px-4 py-2 bg-white border-b border-gray-100">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 px-3 py-1.5 rounded-full border border-gray-200 bg-white"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M6 8h12M9 12h6" />
          </svg>
          Filters
        </button>
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <button onClick={() => setView("map")} className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${view === "map" ? "bg-[#345ee9] text-white" : "text-gray-600"}`}>
            Map
          </button>
          <button onClick={() => setView("card")} className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-all ${view === "card" ? "bg-[#345ee9] text-white" : "text-gray-600"}`}>
            Card
          </button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-[200] flex">
          <div className="absolute inset-0 bg-black/40" onClick={() => setSidebarOpen(false)} />
          <div className="relative w-72 bg-white h-full overflow-y-auto shadow-xl">
            <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      <div className="flex flex-1 max-w-full px-2 md:px-4 py-2 md:py-4 gap-4" style={{ maxHeight: "calc(100vh - 90px)", overflow: "hidden" }}>
        {/* Desktop sidebar */}
        {sidebarOpen && (
          <div className="hidden md:block w-64 flex-shrink-0 overflow-y-auto">
            <FilterSidebar filters={filters} onChange={setFilters} onClose={() => setSidebarOpen(false)} />
          </div>
        )}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="hidden md:flex flex-shrink-0 self-start mt-2 bg-white border border-gray-200 rounded-full p-2 shadow-sm hover:shadow-md transition-shadow"
          >
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}

        <div className="flex-1 min-w-0 flex flex-col">
          {view === "card" ? (
            <div className="overflow-y-auto flex-1">
              <p className="text-base md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Pick your ideal trip from these awesome combos!</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
                {filtered.map((dest) => (
                  <DestinationCard key={dest.slug} dest={dest} />
                ))}
              </div>
            </div>
          ) : (
            <div className="rounded-xl md:rounded-2xl overflow-hidden border border-gray-200 flex-1">
              <MapView destinations={filtered} onSelectDest={setSelectedSlug} />
            </div>
          )}
        </div>
      </div>

      <AIBuddy />

      {/* ── Lightbox ── */}
      {selectedSlug && selectedDest && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-[3000] transition-all duration-300"
            style={{
              background: lightboxVisible ? "rgba(0,0,0,0.55)" : "rgba(0,0,0,0)",
              backdropFilter: lightboxVisible ? "blur(4px)" : "blur(0px)",
            }}
            onClick={closeLightbox}
          />

          {/* Panel — slides up from bottom */}
          <div
            className="fixed left-0 right-0 bottom-0 z-[3001] flex justify-center"
            style={{
              transition: "transform 0.36s cubic-bezier(0.34,1.20,0.64,1)",
              transform: lightboxVisible ? "translateY(0)" : "translateY(100%)",
            }}
          >
            <div
              className="w-full bg-white overflow-hidden"
              style={{
                maxWidth: 900,
                borderRadius: "24px 24px 0 0",
                maxHeight: "88vh",
                overflowY: "auto",
              }}
            >
              {/* Handle + close */}
              <div className="flex items-center justify-between px-6 pt-4 pb-2 sticky top-0 bg-white z-10 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  {/* Drag handle */}
                  <div className="w-10 h-1 bg-gray-200 rounded-full" />
                  <nav className="text-sm text-gray-500 hidden sm:flex items-center gap-1">
                    <Link href="/" className="transition-colors" style={{ color: "#345ee9" }}>Home</Link>
                    <span className="text-gray-300">/</span>
                    <span className="transition-colors cursor-pointer" style={{ color: "#345ee9" }} onClick={closeLightbox}>Explore</span>
                    <span className="text-gray-300">/</span>
                    <span style={{ color: "#345ee9" }}>Combos</span>
                  </nav>
                </div>
                <button
                  onClick={closeLightbox}
                  className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                >
                  <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="px-6 py-6" style={{ background: "rgba(154,177,252,0.06)" }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6 text-center">
                  Pick your ideal trip from these awesome combos!
                </h2>

                {/* Destination hero */}
                <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "rgba(52,94,233,0.07)" }}>
                  <div className="flex gap-0">
                    <div className="relative flex-shrink-0" style={{ width: 220, height: 190 }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={selectedDest.image}
                        alt={selectedDest.name}
                        className="w-full h-full object-cover"
                        style={{ borderRadius: 16 }}
                      />
                      <div
                        className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-semibold border"
                        style={{
                          background: VISA_BADGE[selectedDest.visa].bg,
                          borderColor: VISA_BADGE[selectedDest.visa].border,
                          color: VISA_BADGE[selectedDest.visa].text,
                        }}
                      >
                        {VISA_BADGE[selectedDest.visa].label}
                      </div>
                    </div>
                    <div className="p-5 flex flex-col justify-center">
                      <h3 className="font-semibold text-gray-900 mb-2" style={{ fontSize: 24 }}>{selectedDest.name}</h3>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {selectedDest.styles.map((s) => (
                          <span
                            key={s}
                            className="text-xs font-medium px-3 py-1 rounded-full"
                            style={{ background: STYLE_COLORS[s]?.bg ?? "#F3F4F6", color: STYLE_COLORS[s]?.text ?? "#374151" }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{selectedDest.description}</p>
                    </div>
                  </div>
                </div>

                {/* Pricing tiers */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { key: "budget", label: "BUDGET FRIENDLY", type: "budget" as const, breakdown: selectedDest.budgetBreakdown, total: selectedDest.budgetPrice },
                    { key: "mid",    label: "MID RANGE",        type: "popular" as const, breakdown: selectedDest.midBreakdown,    total: selectedDest.midPrice    },
                    { key: "prem",   label: "PREMIUM",          type: "premium" as const, breakdown: selectedDest.premiumBreakdown, total: selectedDest.premiumPrice },
                  ].map((tier) => (
                    <div
                      key={tier.key}
                      className="bg-white rounded-2xl overflow-hidden flex flex-col"
                      style={{ boxShadow: "0px 4px 24px rgba(155,151,151,0.22)" }}
                    >
                      {tier.type === "budget" && (
                        <div className="text-gray-500 text-xs font-bold text-center py-2 tracking-wide uppercase" style={{ background: "#f3f4f6" }}>
                          Budget Friendly
                        </div>
                      )}
                      {tier.type === "popular" && (
                        <div className="text-white text-xs font-bold text-center py-2" style={{ background: "#dda116" }}>⭐ Most Popular</div>
                      )}
                      {tier.type === "premium" && (
                        <div className="flex items-center justify-center gap-1.5 text-white text-xs font-bold py-2" style={{ background: "#345ee9" }}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                          PREMIUM
                        </div>
                      )}
                      {[
                        { label: "Flights", val: tier.breakdown.flights },
                        { label: "Stays",   val: tier.breakdown.stays   },
                        { label: "VISA",    val: tier.breakdown.visa    },
                      ].map((row, i) => (
                        <div key={row.label} className="flex justify-between px-4 py-3" style={{ background: i % 2 === 0 ? "#fafafa" : "white" }}>
                          <span className="text-sm text-gray-500">{row.label}</span>
                          <span className="text-sm font-semibold text-gray-800">{row.val === 0 ? "Free" : formatINRFull(row.val)}</span>
                        </div>
                      ))}
                      <div className="px-4 py-3 border-t border-gray-100" style={{ background: "#fafafa" }}>
                        <span className="font-bold text-gray-900" style={{ fontSize: 22 }}>{formatINRFull(tier.total)}</span>
                        <span className="text-sm text-gray-400 ml-1">/ person</span>
                      </div>
                      <div className="px-4 pb-4 pt-2">
                        <Link
                          href={`/explore/combos/${selectedDest.slug}`}
                          className="flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl text-sm font-semibold transition-opacity hover:opacity-90"
                          style={{ background: "#345ee9", color: "white" }}
                          onClick={closeLightbox}
                        >
                          Explore Trip ↗
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
