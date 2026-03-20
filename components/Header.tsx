"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import type { ReactNode } from "react";
import { destinations } from "@/data/destinations";

const LOGO = "https://www.figma.com/api/mcp/asset/12af7015-7837-42da-8862-cd01296b1ea6";

const VISA_COLOR: Record<string, { bg: string; text: string }> = {
  free:     { bg: "#DCFCE7", text: "#16a34a" },
  easy:     { bg: "#DBEAFE", text: "#2563eb" },
  standard: { bg: "#FCE7F3", text: "#9333ea" },
};

// ── tiny calendar helpers ──────────────────────────────────────────────
function daysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function firstDay(y: number, m: number)    { return new Date(y, m, 1).getDay(); }
function sameDay(a: Date, b: Date) { return a.toDateString() === b.toDateString(); }
function inRange(d: Date, s: Date | null, e: Date | null) {
  if (!s || !e) return false;
  return d > s && d < e;
}
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const DAYS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];

function MonthCalendar({
  year, month, startDate, endDate, hoverDate,
  onDayClick, onDayHover,
}: {
  year: number; month: number;
  startDate: Date | null; endDate: Date | null; hoverDate: Date | null;
  onDayClick: (d: Date) => void; onDayHover: (d: Date | null) => void;
}) {
  const days = daysInMonth(year, month);
  const first = firstDay(year, month);
  const rangeEnd = endDate ?? hoverDate;
  const cells: (Date | null)[] = [...Array(first).fill(null)];
  for (let d = 1; d <= days; d++) cells.push(new Date(year, month, d));

  return (
    <div className="w-[220px]">
      <p className="text-sm font-semibold text-gray-800 text-center mb-3">
        {MONTHS[month]} {year}
      </p>
      <div className="grid grid-cols-7 gap-y-1">
        {DAYS.map((d) => (
          <div key={d} className="text-[10px] text-gray-400 text-center font-medium pb-1">{d}</div>
        ))}
        {cells.map((date, i) => {
          if (!date) return <div key={i} />;
          const isStart = startDate && sameDay(date, startDate);
          const isEnd   = endDate && sameDay(date, endDate);
          const isHover = !endDate && hoverDate && sameDay(date, hoverDate);
          const isIn    = inRange(date, startDate, rangeEnd);
          const isPast  = date < new Date(new Date().setHours(0,0,0,0));
          return (
            <button
              key={i}
              disabled={isPast}
              onMouseEnter={() => !isPast && onDayHover(date)}
              onMouseLeave={() => onDayHover(null)}
              onClick={() => !isPast && onDayClick(date)}
              className={`text-[12px] h-7 w-7 mx-auto rounded-full flex items-center justify-center transition-all
                ${isPast ? "text-gray-300 cursor-default" : "cursor-pointer hover:bg-blue-50"}
                ${isStart || isEnd ? "text-white font-bold" : isIn ? "bg-blue-100 text-blue-700 rounded-none" : isHover ? "bg-blue-50 text-blue-600" : "text-gray-700"}`}
              style={isStart || isEnd ? { background: "#345ee9" } : {}}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Header({ rightContent, onDestSelect }: { rightContent?: ReactNode; onDestSelect?: (slug: string) => void }) {
  const [activeField, setActiveField] = useState<"where" | "when" | "who" | null>(null);
  const [destQuery, setDestQuery]   = useState("");
  const [selectedDest, setSelectedDest] = useState<string | null>(null);
  const [startDate, setStartDate]   = useState<Date | null>(null);
  const [endDate, setEndDate]       = useState<Date | null>(null);
  const [hoverDate, setHoverDate]   = useState<Date | null>(null);
  const [calYear, setCalYear]       = useState(new Date().getFullYear());
  const [calMonth, setCalMonth]     = useState(new Date().getMonth());
  const [adults, setAdults]         = useState(2);
  const [children, setChildren]     = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openField = (field: "where" | "when" | "who") => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveField(field);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveField(null), 220);
  };
  const cancelClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
  };

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setActiveField(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleDayClick = (d: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(d); setEndDate(null);
    } else if (d < startDate) {
      setStartDate(d); setEndDate(null);
    } else {
      setEndDate(d); setActiveField(null);
    }
  };

  const nextMonth = calMonth === 11 ? { y: calYear + 1, m: 0 } : { y: calYear, m: calMonth + 1 };

  const formatDate = (d: Date) => `${d.getDate()} ${MONTHS[d.getMonth()]}`;
  const dateLabel = startDate
    ? endDate ? `${formatDate(startDate)} – ${formatDate(endDate)}` : formatDate(startDate)
    : "Add Dates";
  const guestLabel = adults + children > 0 ? `${adults + children} Guest${adults + children > 1 ? "s" : ""}` : "Add Guests";

  const filteredDests = destinations.filter((d) =>
    d.name.toLowerCase().includes(destQuery.toLowerCase())
  );

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-[#e9e9e9] shadow-[0px_4px_14px_0px_rgba(180,178,178,0.25)]" ref={ref}>
      <div className="flex items-center justify-between px-4 sm:px-6 md:px-8 py-3 md:py-4 w-full">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={LOGO} alt="Instantly Holiday by C&K" style={{ height: "46px", width: "110px", objectFit: "contain" }} />
        </Link>

        {/* Search pill — hidden on mobile */}
        <div className="hidden md:flex flex-col items-center justify-center relative">
          <div className="border border-[#e4e4e4] flex gap-4 items-center pl-6 pr-3 py-2 rounded-[170px]">
            <div className="flex gap-4 items-center w-[596px]">

              {/* WHERE */}
              <button
                className="flex flex-col items-start w-[170px] cursor-pointer px-2 py-1 rounded-xl transition-colors hover:bg-gray-50"
                onClick={() => setActiveField(activeField === "where" ? null : "where")}
                onMouseEnter={() => openField("where")}
                onMouseLeave={scheduleClose}
              >
                <div className="flex flex-col items-start justify-center leading-6 pb-0.5 w-[168px]">
                  <p className="text-[10px] font-medium text-black">WHERE</p>
                  <p className={`text-[14px] font-medium truncate w-full text-left ${selectedDest ? "text-black" : "text-black opacity-40"}`}>
                    {selectedDest ?? "Select Destination"}
                  </p>
                </div>
              </button>

              <div className="w-px self-stretch bg-[#e5e5e5]" />

              {/* WHEN */}
              <button
                className="flex flex-col items-start justify-center leading-6 pb-0.5 w-[170px] cursor-pointer px-2 py-1 rounded-xl transition-colors hover:bg-gray-50"
                onClick={() => setActiveField(activeField === "when" ? null : "when")}
                onMouseEnter={() => openField("when")}
                onMouseLeave={scheduleClose}
              >
                <p className="text-[10px] font-medium text-black">WHEN</p>
                <p className={`text-[14px] font-medium ${startDate ? "text-black" : "text-black opacity-40"}`}>{dateLabel}</p>
              </button>

              <div className="w-px self-stretch bg-[#e5e5e5]" />

              {/* WHO */}
              <button
                className="flex flex-col items-start justify-center leading-6 pb-0.5 w-[170px] cursor-pointer px-2 py-1 rounded-xl transition-colors hover:bg-gray-50"
                onClick={() => setActiveField(activeField === "who" ? null : "who")}
                onMouseEnter={() => openField("who")}
                onMouseLeave={scheduleClose}
              >
                <p className="text-[10px] font-medium text-black">WHO</p>
                <p className={`text-[14px] font-medium ${adults + children > 0 ? "text-black" : "text-black opacity-40"}`}>{guestLabel}</p>
              </button>
            </div>

            {/* Search button */}
            <Link
              href="/explore"
              onClick={() => setActiveField(null)}
              className="flex items-start justify-center px-4 py-2 rounded-[58px] shadow-[0px_4px_14px_0px_rgba(148,148,148,0.25)] w-10"
              style={{ background: "#345ee9" }}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </Link>
          </div>

          {/* ── WHERE dropdown ── */}
          {activeField === "where" && (
            <div
              className="absolute top-full mt-3 left-0 w-[640px] bg-white rounded-2xl shadow-[0px_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-50 p-4"
              style={{ animation: "dropdownSlide 0.22s cubic-bezier(0.34,1.4,0.64,1) both" }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <input
                autoFocus
                value={destQuery}
                onChange={(e) => setDestQuery(e.target.value)}
                placeholder="Search destinations…"
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 mb-4"
              />
              <div className="grid grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1">
                {filteredDests.map((d) => (
                  <button
                    key={d.slug}
                    onClick={() => { setSelectedDest(d.name); setActiveField(null); setDestQuery(""); onDestSelect?.(d.slug); }}
                    className={`relative rounded-xl overflow-hidden text-left group transition-all hover:ring-2 hover:ring-[#345ee9] ${selectedDest === d.name ? "ring-2 ring-[#345ee9]" : ""}`}
                    style={{ height: 110 }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <p className="text-white text-[13px] font-semibold leading-tight">{d.name}</p>
                      <span
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-full mt-0.5 inline-block"
                        style={{ background: VISA_COLOR[d.visa]?.bg, color: VISA_COLOR[d.visa]?.text }}
                      >
                        {d.visaLabel}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ── WHEN dropdown ── */}
          {activeField === "when" && (
            <div
              className="absolute top-full mt-3 left-1/2 -translate-x-1/2 bg-white rounded-2xl shadow-[0px_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-50 p-5"
              style={{ animation: "dropdownSlide 0.22s cubic-bezier(0.34,1.4,0.64,1) both" }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              <div className="flex gap-8">
                <MonthCalendar
                  year={calYear} month={calMonth}
                  startDate={startDate} endDate={endDate} hoverDate={hoverDate}
                  onDayClick={handleDayClick} onDayHover={setHoverDate}
                />
                <MonthCalendar
                  year={nextMonth.y} month={nextMonth.m}
                  startDate={startDate} endDate={endDate} hoverDate={hoverDate}
                  onDayClick={handleDayClick} onDayHover={setHoverDate}
                />
              </div>
              <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
                <button
                  onClick={() => setCalMonth(calMonth === 0 ? 11 : calMonth - 1)}
                  className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
                  </svg>
                  Prev
                </button>
                {startDate && (
                  <button
                    onClick={() => { setStartDate(null); setEndDate(null); }}
                    className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                  >
                    Clear dates
                  </button>
                )}
                <button
                  onClick={() => setCalMonth(calMonth === 11 ? 0 : calMonth + 1)}
                  className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1"
                >
                  Next
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* ── WHO dropdown ── */}
          {activeField === "who" && (
            <div
              className="absolute top-full mt-3 right-16 bg-white rounded-2xl shadow-[0px_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-50 p-5 w-72"
              style={{ animation: "dropdownSlide 0.22s cubic-bezier(0.34,1.4,0.64,1) both" }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
            >
              {[
                { label: "Adults", sub: "Ages 13+", val: adults, set: setAdults },
                { label: "Children", sub: "Ages 2–12", val: children, set: setChildren },
              ].map((row) => (
                <div key={row.label} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{row.label}</p>
                    <p className="text-xs text-gray-400">{row.sub}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => row.set(Math.max(0, row.val - 1))}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors text-lg font-light"
                    >
                      −
                    </button>
                    <span className="w-5 text-center text-sm font-semibold text-gray-800">{row.val}</span>
                    <button
                      onClick={() => row.set(row.val + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-blue-400 hover:text-blue-600 transition-colors text-lg font-light"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={() => setActiveField(null)}
                className="mt-3 w-full py-2.5 rounded-xl text-sm font-semibold text-white transition-opacity hover:opacity-90"
                style={{ background: "#345ee9" }}
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* Mobile: search icon + explore */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => setActiveField(activeField === "where" ? null : "where")}
            className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center"
            style={{ background: "#f5f5f5" }}
          >
            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link
            href="/explore"
            className="flex items-center gap-1 text-white text-sm font-semibold px-3 py-1.5 rounded-[8px] hover:opacity-90 transition-opacity"
            style={{ background: "#345ee9" }}
          >
            Explore
          </Link>
        </div>

        {/* Mobile WHERE dropdown */}
        {activeField === "where" && (
          <div
            className="md:hidden absolute top-full left-4 right-4 mt-2 bg-white rounded-2xl shadow-[0px_8px_40px_rgba(0,0,0,0.12)] border border-gray-100 z-50 p-4"
            style={{ animation: "dropdownSlide 0.22s cubic-bezier(0.34,1.4,0.64,1) both" }}
          >
            <input
              autoFocus
              value={destQuery}
              onChange={(e) => setDestQuery(e.target.value)}
              placeholder="Search destinations…"
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-blue-400 mb-4"
            />
            <div className="grid grid-cols-2 gap-3 max-h-[280px] overflow-y-auto">
              {filteredDests.map((d) => (
                <button
                  key={d.slug}
                  onClick={() => { setSelectedDest(d.name); setActiveField(null); setDestQuery(""); onDestSelect?.(d.slug); }}
                  className={`relative rounded-xl overflow-hidden text-left group transition-all hover:ring-2 hover:ring-[#345ee9] ${selectedDest === d.name ? "ring-2 ring-[#345ee9]" : ""}`}
                  style={{ height: 90 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={d.image} alt={d.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-white text-[12px] font-semibold leading-tight">{d.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Right content */}
        {rightContent ? (
          <div className="hidden md:flex">{rightContent}</div>
        ) : (
          <Link
            href="/explore"
            className="hidden md:flex flex-shrink-0 items-center gap-1 text-white text-base font-semibold px-4 py-2 rounded-[8px] shadow-[0px_4px_14px_0px_rgba(148,148,148,0.25)] transition-opacity hover:opacity-90"
            style={{ background: "#345ee9" }}
          >
            Explore{" "}
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>
        )}
      </div>
    </header>
  );
}
