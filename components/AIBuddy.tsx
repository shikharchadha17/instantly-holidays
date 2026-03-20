"use client";
import { useState, useRef, useEffect } from "react";

const AVATAR = "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=80&q=80";

const replies = [
  "Great choice! Thailand is perfect for first-time travellers. Want me to suggest the best time to visit? 🌴",
  "I'd recommend the Mid Range combo — it includes flights, a 4-star stay, and hassle-free visa processing! ✈️",
  "For a 5-day trip, Bangkok + Phuket combo is the most popular. Shall I show you the itinerary? 🗺️",
  "Visa processing takes 3 working days. I can help you get started right away! 🛂",
  "The best deals right now are on Thailand and Bali. Both have easy visas for Indian passport holders! 🎉",
];

export default function AIBuddy() {
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(true);
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hey, I'm your AI Travel Buddy. Let me know how can I help you 👋" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setTimeout(() => {
      const reply = replies[Math.floor(Math.random() * replies.length)];
      setMessages((prev) => [...prev, { role: "bot", text: reply }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[2000] flex flex-col items-end gap-3">
      {/* Nudge bubble (pre-open teaser) */}
      {!open && nudge && (
        <div
          className="bg-white rounded-2xl px-4 py-3 shadow-[0px_8px_32px_0px_rgba(0,0,0,0.12)] flex items-center gap-3 cursor-pointer hover:shadow-lg transition-shadow"
          style={{ width: 270, animation: "buddySlideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)" }}
          onClick={() => { setOpen(true); setNudge(false); }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={AVATAR} alt="AI Buddy" className="w-9 h-9 rounded-full object-cover flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-gray-700 leading-snug">
              Hey, I&apos;m your AI Travel Buddy. Let me know how can I help you
            </p>
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setNudge(false); }}
            className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
          >
            <svg className="w-3 h-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      )}

      {/* Full chat window */}
      {open && (
        <div
          className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
          style={{ width: 300, maxHeight: 420, animation: "buddySlideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)" }}
        >
          {/* Chat header */}
          <div className="px-4 py-3 flex items-center gap-3 flex-shrink-0" style={{ background: "#07213a" }}>
            <div className="relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={AVATAR} alt="AI Buddy" className="w-8 h-8 rounded-full object-cover" />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#07213a]" />
            </div>
            <div className="flex-1">
              <p className="text-white text-sm font-semibold">AI Travel Buddy</p>
              <p className="text-green-300 text-[10px]">Online now</p>
            </div>
            <button onClick={() => setOpen(false)} className="text-white/60 hover:text-white transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                {m.role === "bot" && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={AVATAR} alt="" className="w-6 h-6 rounded-full object-cover mr-1.5 flex-shrink-0 self-end" />
                )}
                <div
                  className={`text-[12px] px-3 py-2 rounded-2xl max-w-[78%] leading-relaxed ${
                    m.role === "user"
                      ? "text-white rounded-br-sm"
                      : "bg-white text-gray-800 border border-gray-100 shadow-sm rounded-bl-sm"
                  }`}
                  style={m.role === "user" ? { background: "#345ee9" } : {}}
                >
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-3 border-t border-gray-100 bg-white flex gap-2 flex-shrink-0">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              className="flex-1 text-[12px] bg-gray-100 rounded-full px-3 py-2 outline-none"
            />
            <button
              onClick={send}
              className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 hover:opacity-90 transition-opacity"
              style={{ background: "#345ee9" }}
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Avatar button */}
      <button
        onClick={() => { setOpen(!open); setNudge(false); }}
        className="w-12 h-12 rounded-full shadow-lg hover:scale-105 transition-transform relative overflow-hidden border-2"
        style={{ borderColor: "#07213a" }}
        aria-label="AI Travel Buddy"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={AVATAR} alt="AI Buddy" className="w-full h-full object-cover" />
        <span className="absolute top-0.5 right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white" />
      </button>

      <style>{`
        @keyframes buddySlideUp {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}
