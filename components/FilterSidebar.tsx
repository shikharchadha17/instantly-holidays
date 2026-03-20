"use client";
import { Filters } from "@/app/explore/page";
import { VisaType } from "@/data/destinations";

const budgetOptions = ["Under ₹75K", "₹75K – ₹1.2L", "₹1.2L – ₹2L", "₹2L+"];
const durationOptions = ["3–4 Days", "5–7 Days", "8–10 Days", "10+ Days"];
const weatherOptions = ["Warm & Sunny (25–35°C)", "Mild & Pleasant (18–25°C)", "Cold & Snowy (0–15°C)", "Beach Weather", "Festive / Seasonal"];

function toggle<T>(arr: T[], val: T): T[] {
  return arr.includes(val) ? arr.filter((x) => x !== val) : [...arr, val];
}

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  onClose: () => void;
}

export default function FilterSidebar({ filters, onChange, onClose }: Props) {
  const pill = "px-3 py-1.5 rounded-full text-sm font-medium border cursor-pointer transition-all select-none";
  const active = "border-blue-600 bg-blue-600 text-white";
  const inactive = "border-gray-200 bg-white text-gray-700 hover:border-blue-400";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 -right-4 bg-white border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow z-10"
      >
        <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <h3 className="font-bold text-gray-900 text-lg mb-5">Filters</h3>

      {/* Budget */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">Budget</h4>
        <input
          type="text"
          placeholder="Add your Budget Value"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-200 mb-2"
        />
        <div className="flex flex-wrap gap-2">
          {budgetOptions.map((b) => (
            <button
              key={b}
              onClick={() => onChange({ ...filters, budget: toggle(filters.budget, b) })}
              className={`${pill} ${filters.budget.includes(b) ? active : inactive}`}
            >
              {b}
            </button>
          ))}
        </div>
      </div>

      {/* Visa */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">Visa</h4>
        <div className="flex flex-wrap gap-2">
          {(["free", "easy", "standard"] as VisaType[]).map((v) => {
            const labels = { free: "Visa Free", easy: "Easy Visa", standard: "Standard Visa" };
            return (
              <button
                key={v}
                onClick={() => onChange({ ...filters, visa: toggle(filters.visa, v) })}
                className={`${pill} ${filters.visa.includes(v) ? active : inactive}`}
              >
                {labels[v]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flight Preferences */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">Flight Preferences</h4>
        <div className="flex gap-2">
          {["any", "nonstop"].map((f) => {
            const label = f === "any" ? "Any Flights" : "Non-stop Only";
            return (
              <button
                key={f}
                onClick={() => onChange({ ...filters, flights: f })}
                className={`${pill} ${filters.flights === f ? active : inactive}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Trip Duration */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">Trip Duration</h4>
        <div className="flex flex-wrap gap-2">
          {durationOptions.map((d) => (
            <button
              key={d}
              onClick={() => onChange({ ...filters, duration: toggle(filters.duration, d) })}
              className={`${pill} ${filters.duration.includes(d) ? active : inactive}`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Weather */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 text-sm mb-3">Weather</h4>
        <div className="space-y-2">
          {weatherOptions.map((w) => (
            <label key={w} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.weather.includes(w)}
                onChange={() => onChange({ ...filters, weather: toggle(filters.weather, w) })}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-200"
              />
              <span className="text-sm text-gray-700">{w}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => onChange({ visa: [], budget: [], duration: [], flights: "any", weather: [] })}
          className="flex-1 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
        >
          Clear All
        </button>
        <button
          className="flex-1 py-2 text-sm font-semibold text-white rounded-xl transition-opacity hover:opacity-90"
          style={{ background: "#345ee9" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
