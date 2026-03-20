import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Stable Unsplash image URLs
const IMG_HERO          = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=1400&q=85";
const IMG_GOA           = "https://images.unsplash.com/photo-1614082242765-7c98ca0f3df3?w=800&q=80";
const IMG_MANALI        = "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800&q=80";
const IMG_RISHIKESH     = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80";
const IMG_JAPAN         = "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&q=80";
const IMG_FRANCE        = "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=900&q=80";
const IMG_MALDIVES_TREND= "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=900&q=80";
const IMG_MALDIVES_VISA = "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=800&q=80";
const IMG_MAURITIUS     = "https://images.unsplash.com/photo-1589979481223-deb893043163?w=800&q=80";
const IMG_NEPAL         = "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&q=80";

function NorthEastIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header />

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="px-10 pt-4">
        <div className="relative overflow-hidden rounded-[46px]" style={{ height: "548px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={IMG_HERO}
            alt="Plan your holiday"
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/55" />
          <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
            <h1 className="font-bold text-white leading-tight drop-shadow-lg" style={{ fontSize: "54px" }}>
              Plan Your Holiday In Minutes
            </h1>
            <p className="mt-3 text-white/90 drop-shadow font-normal" style={{ fontSize: "32px" }}>
              Explore, customize, and book without the wait
            </p>
          </div>
        </div>
      </section>

      {/* ── What We Give ──────────────────────────────────────── */}
      <section className="py-12">
        <div className="max-w-[1224px] mx-auto flex gap-[100px] items-start">
          {/* Left: label + heading */}
          <div className="flex flex-col gap-3 shrink-0 w-[231px]">
            <p className="font-semibold text-[16px] leading-6" style={{ color: "#345ee9" }}>WHAT WE GIVE</p>
            <p className="font-bold text-[32px] text-black leading-6">Best Features </p>
            <p className="font-semibold text-[24px] text-black leading-6">For You</p>
          </div>

          {/* Right: 3 cards */}
          <div className="flex gap-6 items-center">
            {/* Green card */}
            <div
              className="flex flex-col gap-4 p-5 rounded-[12px] w-[320px]"
              style={{ background: "rgba(39,215,109,0.09)", border: "1px solid rgba(39,215,109,0.6)" }}
            >
              <div className="flex items-center justify-center rounded-[30px] w-[60px] h-[60px]" style={{ background: "rgba(39,215,109,0.09)" }}>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="rgba(39,215,109,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/><path d="M6 15h4"/></svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-[20px] text-black leading-6">Instant pricing visibility</p>
                <p className="font-normal text-[16px] text-black opacity-80 leading-6">See real-time prices upfront — no surprises later</p>
              </div>
            </div>

            {/* Blue card */}
            <div
              className="flex flex-col gap-4 p-5 rounded-[12px] w-[320px]"
              style={{ background: "rgba(52,94,233,0.09)", border: "1px solid rgba(52,94,233,0.6)" }}
            >
              <div className="flex items-center justify-center rounded-[30px] w-[60px] h-[60px]" style={{ background: "rgba(52,94,233,0.13)" }}>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="rgba(52,94,233,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M2 9a3 3 0 010-6h20a3 3 0 010 6"/><path d="M2 15a3 3 0 000 6h20a3 3 0 000-6"/><path d="M2 9v6m20-6v6"/></svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-[20px] text-black leading-6">Fast booking confidence</p>
                <p className="font-normal text-[16px] text-black opacity-80 leading-6">Book in seconds with clear, secure checkout</p>
              </div>
            </div>

            {/* Purple card */}
            <div
              className="flex flex-col gap-4 p-5 rounded-[12px] w-[320px]"
              style={{ background: "rgba(173,91,231,0.09)", border: "1px solid rgba(173,91,231,0.6)" }}
            >
              <div className="flex items-center justify-center rounded-[30px] w-[60px] h-[60px]" style={{ background: "rgba(184,98,234,0.13)" }}>
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="rgba(173,91,231,1)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z"/></svg>
              </div>
              <div className="flex flex-col gap-2">
                <p className="font-medium text-[20px] text-black leading-6">AI assisted planning</p>
                <p className="font-normal text-[16px] text-black opacity-80 leading-6">Smart suggestions that plan your trip effortlessly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Weekend Escapes ─────────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-[1224px] mx-auto flex flex-col gap-8">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[14px]">
              <p className="font-semibold text-[44px] text-black leading-6">Weekend Escapes</p>
              <p className="font-medium text-[20px] text-black opacity-60 leading-6">Short trips you can take without long planning</p>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-1 text-white font-semibold text-[20px] px-4 py-2 rounded-[8px] shadow-[0px_4px_14px_0px_rgba(148,148,148,0.25)] hover:opacity-90 transition-opacity"
              style={{ background: "#345ee9" }}
            >
              Explore <NorthEastIcon />
            </Link>
          </div>

          {/* Cards row */}
          <div className="flex gap-4 items-start">
            {/* Goa — tall left */}
            <Link
              href="/explore/combos/goa"
              className="group relative overflow-hidden rounded-[28px] shrink-0"
              style={{ width: "756px", height: "576px" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_GOA} alt="Goa" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute flex items-center justify-between left-6 right-6" style={{ top: "495px" }}>
                <div className="flex flex-col gap-2">
                  <p className="font-semibold text-[28px] text-[#f0f0f0] leading-7">Goa</p>
                  <div className="flex items-center gap-3">
                    <p className="font-medium text-[20px] text-white leading-[22px]">Under ₹10k</p>
                    <span className="bg-white border border-white text-black font-semibold text-[16px] px-2 py-1 rounded-[18px] leading-[18px]">3D/2N</span>
                  </div>
                </div>
                <div className="bg-white flex items-center p-3 rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-12 h-12">
                  <NorthEastIcon />
                </div>
              </div>
            </Link>

            {/* Right: Manali + Rishikesh stacked */}
            <div className="flex flex-col gap-4 flex-1">
              {/* Manali */}
              <Link
                href="/explore/combos/manali"
                className="group relative overflow-hidden rounded-[28px]"
                style={{ height: "280px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_MANALI} alt="Manali" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute flex items-center justify-between left-6 right-6" style={{ top: "199px" }}>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-[28px] text-[#f0f0f0] leading-7">Manali</p>
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-[20px] text-white leading-[22px]">Under ₹20k</p>
                      <span className="bg-white border border-white text-black font-semibold text-[16px] px-2 py-1 rounded-[18px] leading-[18px]">3D/2N</span>
                    </div>
                  </div>
                  <div className="bg-white flex items-center p-3 rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-12 h-12">
                    <NorthEastIcon />
                  </div>
                </div>
              </Link>

              {/* Rishikesh */}
              <Link
                href="/explore/combos/rishikesh"
                className="group relative overflow-hidden rounded-[28px]"
                style={{ height: "280px" }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_RISHIKESH} alt="Rishikesh" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute flex items-center justify-between left-6 right-6" style={{ top: "199px" }}>
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-[28px] text-[#f0f0f0] leading-7">Rishikesh</p>
                    <div className="flex items-center gap-3">
                      <p className="font-medium text-[20px] text-white leading-[22px]">Under ₹20k</p>
                      <span className="bg-white border border-white text-black font-semibold text-[16px] px-2 py-1 rounded-[18px] leading-[18px]">3D/2N</span>
                    </div>
                  </div>
                  <div className="bg-white flex items-center p-3 rounded-[24px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] w-12 h-12">
                    <NorthEastIcon />
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Trending Destinations ────────────────────────────── */}
      <section className="py-16">
        <div className="max-w-[1224px] mx-auto flex flex-col gap-8">
          {/* Heading */}
          <div className="flex flex-col gap-3 items-center text-center w-[505px] mx-auto">
            <p className="font-semibold text-[44px] text-black leading-6">Trending Destinations</p>
            <p className="font-normal text-[24px] text-black opacity-60 leading-6">Hot picks everyone&apos;s planning this season</p>
          </div>

          {/* Ovals */}
          <div className="flex gap-[54px] items-center w-full">
            {/* Japan */}
            <Link href="/explore/combos/japan" className="group relative overflow-hidden rounded-[330px] shrink-0 shadow-[0px_4px_54px_0px_rgba(192,188,188,0.25)]"
              style={{ width: "372px", height: "509px", border: "16px solid rgba(52,94,233,0.15)", background: "white" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_JAPAN} alt="Japan" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(179.86deg, rgba(0,0,0,0) 43.46%, rgba(0,0,0,0.5) 79.9%)" }} />
              <p className="absolute font-semibold text-[32px] text-white text-center leading-6 whitespace-nowrap" style={{ top: "409px", left: "50%", transform: "translateX(-50%)" }}>Japan</p>
            </Link>

            {/* France */}
            <Link href="/explore/combos/paris" className="group relative overflow-hidden rounded-[330px] shrink-0 shadow-[0px_4px_54px_0px_rgba(192,188,188,0.25)]"
              style={{ width: "372px", height: "509px", border: "16px solid rgba(52,94,233,0.15)", background: "white" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_FRANCE} alt="France" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(180.15deg, rgba(0,0,0,0) 49.97%, rgba(0,0,0,0.5) 99.77%)" }} />
              <p className="absolute font-semibold text-[32px] text-white text-center leading-6 whitespace-nowrap" style={{ top: "409px", left: "50%", transform: "translateX(-50%)" }}>France</p>
            </Link>

            {/* Maldives */}
            <Link href="/explore/combos/maldives" className="group relative overflow-hidden rounded-[330px] shrink-0 shadow-[0px_4px_54px_0px_rgba(192,188,188,0.25)]"
              style={{ width: "372px", height: "509px", border: "16px solid rgba(96,170,169,0.37)", background: "white" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={IMG_MALDIVES_TREND} alt="Maldives" className="w-full h-full object-cover absolute inset-0" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(179.39deg, rgba(0,0,0,0) 50.14%, rgba(0,0,0,0.4) 99.39%)" }} />
              <p className="absolute font-semibold text-[32px] text-white text-center leading-6 whitespace-nowrap" style={{ top: "409px", left: "50%", transform: "translateX(-50%)" }}>Maldives</p>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Visa-Free Getaways ──────────────────────────────── */}
      <section className="py-8">
        <div className="max-w-[1224px] mx-auto flex flex-col gap-[45px]">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-[14px]">
              <p className="font-semibold text-[44px] text-black leading-6">Visa-Free Getaways</p>
              <p className="font-normal text-[24px] text-black opacity-60 leading-6">Travel without the visa hassle.</p>
            </div>
            <Link
              href="/explore"
              className="flex items-center gap-1 text-white font-semibold text-[20px] px-4 py-2 rounded-[8px] shadow-[0px_4px_14px_0px_rgba(148,148,148,0.25)] hover:opacity-90 transition-opacity"
              style={{ background: "#345ee9" }}
            >
              Explore <NorthEastIcon />
            </Link>
          </div>

          {/* 3 cards */}
          <div className="grid grid-cols-3 gap-6">
            {/* Maldives */}
            <Link href="/explore/combos/maldives" className="group bg-white rounded-[16px] overflow-hidden shadow-[0px_4px_14px_0px_rgba(159,157,157,0.25)] hover:shadow-xl transition-shadow" style={{ height: "416px" }}>
              <div className="relative overflow-hidden" style={{ height: "328px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_MALDIVES_VISA} alt="Maldives" className="absolute object-cover" style={{ width: "685px", height: "332px", left: "-82px", top: "-4px" }} />
                <div className="absolute top-4 left-4 flex items-center px-2 py-0.5 rounded-[18px]" style={{ background: "#ecfdf3", border: "1px solid #abefc6" }}>
                  <span className="font-semibold text-[14px] text-[#067647] leading-[18px]">30 days <strong>Visa Free</strong></span>
                </div>
              </div>
              <div className="flex items-start justify-between px-4 pt-4" style={{ height: "88px" }}>
                <div className="flex flex-col gap-2 font-semibold text-black">
                  <p className="text-[20px] leading-6">Maldives</p>
                  <p className="text-[18px] leading-6">₹1,05,000 <span className="font-normal">/ person</span></p>
                </div>
              </div>
            </Link>

            {/* Mauritius */}
            <Link href="/explore/combos/mauritius" className="group bg-white rounded-[16px] overflow-hidden shadow-[0px_4px_14px_0px_rgba(159,157,157,0.25)] hover:shadow-xl transition-shadow" style={{ height: "416px" }}>
              <div className="relative overflow-hidden" style={{ height: "328px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_MAURITIUS} alt="Mauritius" className="absolute object-cover" style={{ width: "498px", height: "332px", left: "-82px", top: "-4px" }} />
                <div className="absolute top-4 left-4 flex items-center px-2 py-0.5 rounded-[18px]" style={{ background: "#ecfdf3", border: "1px solid #abefc6" }}>
                  <span className="font-semibold text-[14px] text-[#067647] leading-[18px]">90 days <strong>Visa Free</strong></span>
                </div>
              </div>
              <div className="flex items-start justify-between px-4 pt-4" style={{ height: "88px" }}>
                <div className="flex flex-col gap-2 font-semibold text-black">
                  <p className="text-[20px] leading-6">Mauritius</p>
                  <p className="text-[18px] leading-6">₹99,999 <span className="font-normal">/ person</span></p>
                </div>
              </div>
            </Link>

            {/* Nepal */}
            <Link href="/explore/combos/nepal" className="group bg-white rounded-[16px] overflow-hidden shadow-[0px_4px_14px_0px_rgba(159,157,157,0.25)] hover:shadow-xl transition-shadow" style={{ height: "416px" }}>
              <div className="relative overflow-hidden" style={{ height: "328px" }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={IMG_NEPAL} alt="Nepal" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute top-4 left-4 flex items-center px-2 py-0.5 rounded-[18px]" style={{ background: "#ecfdf3", border: "1px solid #abefc6" }}>
                  <span className="font-semibold text-[14px] text-[#067647] leading-[18px]">No Visa Required</span>
                </div>
              </div>
              <div className="flex items-start justify-between px-4 pt-4" style={{ height: "88px" }}>
                <div className="flex flex-col gap-2 font-semibold text-black">
                  <p className="text-[20px] leading-6">Nepal</p>
                  <p className="text-[18px] leading-6">₹30,000 <span className="font-normal">/ person</span></p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
