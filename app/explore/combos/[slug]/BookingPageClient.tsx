"use client";
import { useState } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AIBuddy from "@/components/AIBuddy";
import { Destination, formatINRFull, TravelStyle } from "@/data/destinations";

/* ── Gallery: [main, top-right, bottom-right] ───────────────────────── */
const GALLERY: Record<string, [string, string, string]> = {
  goa: [
    "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=900&q=80",
    "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=400&q=80",
    "https://images.unsplash.com/photo-1586500036706-41963de24d8b?w=400&q=80",
  ],
  thailand: [
    "https://images.unsplash.com/photo-1528181304800-259b08848526?w=900&q=80",
    "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=400&q=80",
    "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=400&q=80",
  ],
  vietnam: [
    "https://images.unsplash.com/photo-1555921015-5532091f6026?w=900&q=80",
    "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&q=80",
    "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&q=80",
  ],
  srilanka: [
    "https://images.unsplash.com/photo-1588416936097-41850ab3d86d?w=900&q=80",
    "https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400&q=80",
    "https://images.unsplash.com/photo-1564760290292-23341e4df6ec?w=400&q=80",
  ],
  dubai: [
    "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=900&q=80",
    "https://images.unsplash.com/photo-1526495124232-a04e1849168c?w=400&q=80",
    "https://images.unsplash.com/photo-1580674285054-bed31e145f59?w=400&q=80",
  ],
  bali: [
    "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",
    "https://images.unsplash.com/photo-1573790387438-4da905039392?w=400&q=80",
  ],
  singapore: [
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=900&q=80",
    "https://images.unsplash.com/photo-1565967511849-76a60a516170?w=400&q=80",
    "https://images.unsplash.com/photo-1508964942454-1a56651d54ac?w=400&q=80",
  ],
  paris: [
    "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80",
    "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&q=80",
    "https://images.unsplash.com/photo-1478135467691-6a6c581e00ae?w=400&q=80",
  ],
  japan: [
    "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=900&q=80",
    "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&q=80",
    "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80",
  ],
  maldives: [
    "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80",
    "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=400&q=80",
    "https://images.unsplash.com/photo-1559494007-9f5847c49d94?w=400&q=80",
  ],
};

/* ── Flight data ─────────────────────────────────────────────────────── */
interface FlightInfo {
  fromCity: string; fromCode: string;
  toCity: string;   toCode: string;
  depTime: string;  depDate: string;
  arrTime: string;  arrDate: string;
  duration: string; stops: string;
  price: number;
}
const FLIGHTS: Record<string, FlightInfo> = {
  goa:       { fromCity:"New Delhi",fromCode:"DEL",toCity:"Goa",toCode:"GOI",          depTime:"07:00 AM",depDate:"Wed, 28 Sept",arrTime:"09:30 AM",arrDate:"Wed, 28 Sept", duration:"2h 30m", stops:"Non-Stop",price:12000 },
  thailand:  { fromCity:"New Delhi",fromCode:"DEL",toCity:"Bangkok",toCode:"BKK",       depTime:"10:00 PM",depDate:"Wed, 28 Sept",arrTime:"06:30 AM",arrDate:"Thur, 29 Sept",duration:"8h 30m", stops:"Non-Stop",price:29899 },
  vietnam:   { fromCity:"New Delhi",fromCode:"DEL",toCity:"Hanoi",toCode:"HAN",         depTime:"11:30 PM",depDate:"Wed, 28 Sept",arrTime:"07:00 AM",arrDate:"Thur, 29 Sept",duration:"9h 30m", stops:"1 Stop",  price:32000 },
  srilanka:  { fromCity:"New Delhi",fromCode:"DEL",toCity:"Colombo",toCode:"CMB",       depTime:"06:45 AM",depDate:"Wed, 28 Sept",arrTime:"10:00 AM",arrDate:"Wed, 28 Sept", duration:"3h 15m", stops:"Non-Stop",price:18000 },
  dubai:     { fromCity:"New Delhi",fromCode:"DEL",toCity:"Dubai",toCode:"DXB",         depTime:"02:30 AM",depDate:"Wed, 28 Sept",arrTime:"05:00 AM",arrDate:"Wed, 28 Sept", duration:"3h 30m", stops:"Non-Stop",price:20000 },
  bali:      { fromCity:"New Delhi",fromCode:"DEL",toCity:"Bali",toCode:"DPS",          depTime:"09:00 PM",depDate:"Wed, 28 Sept",arrTime:"09:00 AM",arrDate:"Thur, 29 Sept",duration:"12h 00m",stops:"1 Stop",  price:22000 },
  singapore: { fromCity:"New Delhi",fromCode:"DEL",toCity:"Singapore",toCode:"SIN",     depTime:"10:45 PM",depDate:"Wed, 28 Sept",arrTime:"07:30 AM",arrDate:"Thur, 29 Sept",duration:"8h 45m", stops:"Non-Stop",price:25000 },
  paris:     { fromCity:"New Delhi",fromCode:"DEL",toCity:"Paris",toCode:"CDG",         depTime:"10:00 PM",depDate:"Wed, 28 Sept",arrTime:"10:35 AM",arrDate:"Thur, 29 Sept",duration:"9h 35m", stops:"Non-Stop",price:45000 },
  japan:     { fromCity:"New Delhi",fromCode:"DEL",toCity:"Tokyo",toCode:"NRT",         depTime:"06:30 AM",depDate:"Wed, 28 Sept",arrTime:"08:00 PM",arrDate:"Wed, 28 Sept", duration:"11h 30m",stops:"Non-Stop",price:55000 },
  maldives:  { fromCity:"New Delhi",fromCode:"DEL",toCity:"Malé",toCode:"MLE",          depTime:"07:15 AM",depDate:"Wed, 28 Sept",arrTime:"11:45 AM",arrDate:"Wed, 28 Sept", duration:"4h 30m", stops:"Non-Stop",price:30000 },
};

/* ── Hotel data ──────────────────────────────────────────────────────── */
interface HotelInfo {
  name: string; address: string; rating: number; reviews: number; pricePerNight: number;
  images: string[];
}
const HOTEL_IMAGES_DEFAULT = [
  "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800&q=80",
  "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
  "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
];
const HOTELS: Record<string, HotelInfo> = {
  goa:       { name:"Taj Holiday Village Resort",   address:"Sinquerim Beach, Goa",           rating:5,reviews:412,pricePerNight:3899, images:HOTEL_IMAGES_DEFAULT },
  thailand:  { name:"The Peninsula Bangkok",        address:"333 Charoennakorn Rd, Bangkok",   rating:5,reviews:731,pricePerNight:5299, images:HOTEL_IMAGES_DEFAULT },
  vietnam:   { name:"InterContinental Hanoi",       address:"1 Ba Trieu Street, Hanoi",        rating:5,reviews:524,pricePerNight:4199, images:HOTEL_IMAGES_DEFAULT },
  srilanka:  { name:"Shangri-La Colombo",           address:"1 Garden St, Colombo 01",         rating:5,reviews:389,pricePerNight:3699, images:HOTEL_IMAGES_DEFAULT },
  dubai:     { name:"Atlantis The Palm",            address:"Crescent Rd, Palm Jumeirah, Dubai",rating:5,reviews:1204,pricePerNight:8499,images:HOTEL_IMAGES_DEFAULT },
  bali:      { name:"Four Seasons Resort Bali",     address:"Jimbaran, Bali 80361",            rating:5,reviews:668,pricePerNight:5899, images:HOTEL_IMAGES_DEFAULT },
  singapore: { name:"Marina Bay Sands",             address:"10 Bayfront Ave, Singapore",      rating:5,reviews:1537,pricePerNight:6299,images:HOTEL_IMAGES_DEFAULT },
  paris:     { name:"Le Meurice",                   address:"228 Rue de Rivoli, Paris",         rating:5,reviews:843,pricePerNight:9899, images:HOTEL_IMAGES_DEFAULT },
  japan:     { name:"Park Hyatt Tokyo",             address:"3-7-1-2 Nishi Shinjuku, Tokyo",   rating:5,reviews:977,pricePerNight:7499, images:HOTEL_IMAGES_DEFAULT },
  maldives:  { name:"Sun Siyam Iru Veli",           address:"Dhaalu Atoll, Maldives",          rating:5,reviews:612,pricePerNight:12999,images:HOTEL_IMAGES_DEFAULT },
};

/* ── Style pill colours ──────────────────────────────────────────────── */
const STYLE_COLORS: Record<TravelStyle, { bg: string; text: string; border: string }> = {
  "Romantic":       { bg:"#fff0f3", text:"#e11d48", border:"#fda4af" },
  "Hidden Gems":    { bg:"#fdf4ff", text:"#a21caf", border:"#e879f9" },
  "Adventure":      { bg:"#f5f3ff", text:"#7c3aed", border:"#c4b5fd" },
  "Heritage & Art": { bg:"#fff7ed", text:"#c2410c", border:"#fdba74" },
};

/* ── Air India logo block ────────────────────────────────────────────── */
function AirIndiaLogo() {
  return (
    <div className="flex flex-col items-center gap-1 flex-shrink-0">
      {/* Logo circle */}
      <div className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #c8102e 0%, #e8192c 100%)", boxShadow: "0 2px 8px rgba(200,16,46,0.35)" }}>
        {/* Flying swan – Air India's iconic bird */}
        <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
          <path d="M6 22 C8 18, 13 14, 20 13 L28 12 L24 15 L18 15.5 C15 16, 12 18, 10 21 Z" fill="white" opacity="0.95"/>
          <path d="M10 21 C12 19, 15 17.5, 19 17 L25 16.5 L22 19 L16 20 C13 20.5, 11 22, 10 24 Z" fill="white" opacity="0.75"/>
          <circle cx="22" cy="11" r="2" fill="#FFD700"/>
        </svg>
      </div>
      {/* Airline name */}
      <span className="text-[9px] font-bold tracking-wide uppercase" style={{ color: "#c8102e", letterSpacing: "0.04em" }}>Air India</span>
    </div>
  );
}

/* ── Main component ──────────────────────────────────────────────────── */
export default function BookingPageClient({ dest }: { dest: Destination }) {
  const [activeTab, setActiveTab] = useState<"overview" | "inclusions">("overview");
  const [hotelSlide, setHotelSlide] = useState(0);

  const gallery = GALLERY[dest.slug] ?? GALLERY.thailand;
  const flight  = FLIGHTS[dest.slug]  ?? FLIGHTS.thailand;
  const hotel   = HOTELS[dest.slug]   ?? HOTELS.thailand;

  const totalPrice    = dest.midPrice;
  const originalPrice = Math.round(totalPrice * 1.25);
  const savings       = originalPrice - totalPrice;

  return (
    <div className="min-h-screen flex flex-col bg-white pb-[80px] md:pb-0">
      <Header />

      <div className="flex-1 flex flex-col md:flex-row" style={{ maxWidth: 1200, margin: "0 auto", width: "100%", padding: "0 16px" }}>

        {/* ── LEFT COLUMN ─────────────────────────────────────────── */}
        <div className="flex-1 min-w-0 py-6 md:py-8 md:pr-10">

          {/* Breadcrumb */}
          <nav className="text-sm mb-4 flex items-center gap-1">
            <Link href="/" className="font-medium hover:underline" style={{ color:"#345ee9" }}>Home</Link>
            <span className="text-gray-400 mx-1">/</span>
            <Link href="/explore" className="font-medium hover:underline" style={{ color:"#345ee9" }}>Explore</Link>
            <span className="text-gray-400 mx-1">/</span>
            <span className="text-gray-500">{dest.name}</span>
          </nav>

          {/* Title */}
          <h1 className="font-bold text-gray-900 mb-4" style={{ fontSize: 28 }}>{dest.name}</h1>

          {/* Tabs */}
          <div className="flex gap-6 mb-6" style={{ borderBottom: "1px solid #e5e7eb" }}>
            {(["overview", "inclusions"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="capitalize text-sm font-medium pb-3 transition-colors"
                style={{
                  color: activeTab === tab ? "#345ee9" : "#6b7280",
                  borderBottom: activeTab === tab ? "2px solid #345ee9" : "2px solid transparent",
                  marginBottom: -1,
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Photo gallery */}
          <div className="flex gap-2 md:gap-3 mb-5" style={{ height: 200 }}>
            <div className="rounded-xl overflow-hidden" style={{ flex:"62 1 0" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={gallery[0]} alt={dest.name} className="w-full h-full object-cover" />
            </div>
            <div className="hidden sm:flex flex-col gap-2 md:gap-3" style={{ flex:"38 1 0" }}>
              <div className="flex-1 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gallery[1]} alt={dest.name} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 rounded-xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={gallery[2]} alt={dest.name} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Style tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {dest.styles.map((s) => (
              <span
                key={s}
                className="text-xs font-medium px-3 py-1.5 rounded-full border"
                style={{ background: STYLE_COLORS[s]?.bg, color: STYLE_COLORS[s]?.text, borderColor: STYLE_COLORS[s]?.border }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-700 leading-relaxed mb-7">{dest.description}</p>

          {/* ── INCLUSIONS ───────────────────────────────────────── */}
          <h2 className="text-xl font-bold text-gray-900 mb-5">Inclusions</h2>

          {/* Flights */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Flights</h3>
          <div className="rounded-2xl overflow-hidden mb-7" style={{ border:"1px solid #e5e7eb" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom:"1px solid #f3f4f6" }}>
              <span className="text-sm font-semibold text-gray-800">
                {flight.fromCity} → {flight.toCity}
              </span>
              <button
                className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-opacity hover:opacity-80"
                style={{ borderColor:"#345ee9", color:"#345ee9" }}
              >
                Change Flight
              </button>
            </div>

            {/* Main row */}
            <div className="flex items-center gap-4 px-4 py-4">
              <AirIndiaLogo />

              {/* Departure */}
              <div>
                <p className="text-base font-bold text-gray-900 leading-tight">{flight.depTime}</p>
                <p className="text-xs text-gray-500">{flight.fromCity} ({flight.fromCode})</p>
                <p className="text-xs text-gray-400">{flight.depDate}</p>
              </div>

              {/* Duration connector */}
              <div className="flex-1 flex flex-col items-center gap-0.5 px-1">
                <span className="text-[11px] text-gray-400">{flight.duration}</span>
                <div className="relative w-full flex items-center gap-0">
                  <div className="w-2 h-2 rounded-full border-2 flex-shrink-0" style={{ borderColor:"#345ee9" }} />
                  <div className="flex-1" style={{ borderTop:"2px dashed #b4c8fb" }} />
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background:"#345ee9" }} />
                </div>
                <span className="text-[11px] text-gray-400">{flight.stops}</span>
              </div>

              {/* Arrival */}
              <div>
                <p className="text-base font-bold text-gray-900 leading-tight">{flight.arrTime}</p>
                <p className="text-xs text-gray-500">{flight.toCity} ({flight.toCode})</p>
                <p className="text-xs text-gray-400">{flight.arrDate}</p>
              </div>

              {/* Price */}
              <div className="ml-auto text-right">
                <p className="text-base font-bold text-gray-900">{formatINRFull(flight.price)}</p>
                <p className="text-xs text-gray-400">/ person</p>
                <button className="text-xs font-medium mt-0.5 hover:underline" style={{ color:"#345ee9" }}>
                  View Details
                </button>
              </div>
            </div>

            {/* Baggage */}
            <div className="flex items-center gap-2 px-4 py-2.5" style={{ background:"#fff5f5", borderTop:"1px solid #fee2e2" }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f87171" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M9 5H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <p className="text-xs text-gray-600">
                Baggage allowance is{" "}
                <span className="font-bold text-gray-800">20kgs</span>
              </p>
            </div>
          </div>

          {/* Stays */}
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Stays</h3>

          {/* Carousel */}
          <div className="rounded-2xl overflow-hidden" style={{ boxShadow:"0 2px 16px rgba(0,0,0,0.08)" }}>
            <div className="relative" style={{ height: 240 }}>
              {hotel.images.map((img, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={img}
                  src={img}
                  alt="Hotel"
                  className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                  style={{ opacity: hotelSlide === i ? 1 : 0 }}
                />
              ))}

              {/* Prev */}
              <button
                onClick={() => setHotelSlide((s) => (s - 1 + hotel.images.length) % hotel.images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Next */}
              <button
                onClick={() => setHotelSlide((s) => (s + 1) % hotel.images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
              >
                <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {hotel.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHotelSlide(i)}
                    className="rounded-full transition-all duration-300"
                    style={{
                      width: hotelSlide === i ? 22 : 7,
                      height: 7,
                      background: hotelSlide === i ? "white" : "rgba(255,255,255,0.55)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Hotel info */}
            <div className="px-4 py-4 bg-white" style={{ borderTop:"1px solid #f3f4f6" }}>
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="text-base font-bold text-gray-900 leading-tight mb-1">{hotel.name}</p>
                  <div className="flex items-center gap-1 mb-1.5">
                    <svg className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-xs text-gray-500 truncate">{hotel.address}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm font-bold text-gray-800">{hotel.rating}</span>
                    <div className="flex">
                      {Array.from({ length: hotel.rating }).map((_, i) => (
                        <svg key={i} className="w-3.5 h-3.5" fill="#FBBF24" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({hotel.reviews.toLocaleString()} reviews)</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  <button
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg border transition-opacity hover:opacity-80"
                    style={{ borderColor:"#345ee9", color:"#345ee9" }}
                  >
                    Change Hotel
                  </button>
                  <div>
                    <span className="text-base font-bold text-gray-900">{formatINRFull(hotel.pricePerNight)}</span>
                    <span className="text-xs text-gray-400"> / night</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Extra spacing at bottom */}
          <div style={{ height: 80 }} />
        </div>

        {/* ── RIGHT STICKY SIDEBAR ─────────────────────────────────── */}
        <div className="flex-shrink-0 py-0 pb-8 md:py-8 w-full md:w-[300px]">
          <div className="md:sticky" style={{ top: 24 }}>
            <div
              className="rounded-2xl bg-white"
              style={{ border:"1px solid #e8eaed", boxShadow:"0 8px 32px rgba(0,0,0,0.10)" }}
            >
              {/* Costing For header */}
              <div className="px-6 pt-5 pb-4" style={{ borderBottom:"1px solid #f0f0f0" }}>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">Costing For</span>
                  <button className="hover:opacity-70 transition-opacity" style={{ color:"#345ee9" }}>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                  </button>
                </div>
                {/* Date row */}
                <div className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                  <span>28 Sept - 29 Sept</span>
                  <span className="text-gray-300">•</span>
                  <span>2 Adults</span>
                  <span className="text-gray-300">•</span>
                  <span>1 Room</span>
                </div>
              </div>

              {/* Price section */}
              <div className="px-6 py-5">
                <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">Total Price</p>

                {/* Big price */}
                <p className="font-bold text-gray-900 leading-none mb-2" style={{ fontSize:28 }}>
                  {formatINRFull(totalPrice)}
                </p>

                {/* Savings row */}
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-sm text-gray-400 line-through">{formatINRFull(Math.round(totalPrice * 1.25))}/-</span>
                  <span
                    className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                    style={{ background:"#fff4e0", color:"#d97706" }}
                  >
                    20% OFF
                  </span>
                </div>

                {/* View Breakup */}
                <button
                  className="flex items-center gap-1 text-sm font-semibold mb-5 hover:underline"
                  style={{ color:"#345ee9" }}
                >
                  View Breakup
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Book Now */}
                <button
                  className="w-full py-4 rounded-2xl font-bold text-white tracking-wide relative overflow-hidden group"
                  style={{
                    background: "linear-gradient(135deg, #1a3a5c 0%, #07213a 60%, #0d2d4f 100%)",
                    boxShadow: "0 4px 20px rgba(7,33,58,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
                    fontSize: 15,
                  }}
                >
                  {/* shimmer */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.10) 50%, transparent 60%)",
                    }}
                  />
                  <span className="relative flex items-center justify-center gap-2.5">
                    <svg className="w-4 h-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    Confirm &amp; Book
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                  <p className="relative text-[11px] font-normal opacity-60 mt-0.5 tracking-normal">Secure booking · No hidden charges</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile sticky bottom bar ── */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3"
        style={{ boxShadow: "0 -4px 24px rgba(0,0,0,0.10)" }}>
        <div className="flex flex-col flex-1 min-w-0">
          <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wide">Total Price</span>
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900 text-lg leading-tight">{formatINRFull(totalPrice)}</span>
            <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background:"#fff4e0", color:"#d97706" }}>20% OFF</span>
          </div>
          <span className="text-xs text-gray-400 line-through">{formatINRFull(Math.round(totalPrice * 1.25))}</span>
        </div>
        <button
          className="flex-shrink-0 flex flex-col items-center justify-center px-6 py-3 rounded-2xl font-bold text-white relative overflow-hidden group"
          style={{
            background: "linear-gradient(135deg, #1a3a5c 0%, #07213a 60%, #0d2d4f 100%)",
            boxShadow: "0 4px 16px rgba(7,33,58,0.40)",
            minWidth: 140,
          }}
        >
          <span className="flex items-center gap-1.5 text-sm">
            <svg className="w-3.5 h-3.5 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            Confirm &amp; Book
          </span>
          <span className="text-[10px] font-normal opacity-60 mt-0.5">No hidden charges</span>
        </button>
      </div>

      <Footer />
      <AIBuddy />
    </div>
  );
}
